// PM CONTROL TOWER — Prioritization & Portfolio Selection API
// GET   /api/prioritization                       — criteria + project scores + ranking
// POST  /api/prioritization {action:"score"}      — save a project's criterion scores (weighted total computed server-side)
// POST  /api/prioritization {action:"optimize", budget, maxProjects?} — budget-constrained selection, saved as a scenario

import { z } from "zod";
import { db } from "@/lib/db";
import { withApi, ok, ApiError, parseBody } from "@/lib/api";
import { writeAudit } from "@/lib/audit";
import { weightedScore, classify, optimizePortfolio, DEFAULT_CRITERIA, Criterion, Candidate } from "@/lib/engines/prioritization";

async function ensureCriteria(): Promise<Criterion[]> {
  let crits = await db.priorityCriterion.findMany({ orderBy: { order: "asc" } });
  if (crits.length === 0) {
    for (let i = 0; i < DEFAULT_CRITERIA.length; i++) {
      const d = DEFAULT_CRITERIA[i];
      await db.priorityCriterion.create({ data: { id: d.id, name: d.name, weight: d.weight, order: i, modelId: "default" } });
    }
    crits = await db.priorityCriterion.findMany({ orderBy: { order: "asc" } });
  }
  return crits.map((c) => ({ id: c.id, name: c.name, weight: c.weight }));
}

export const GET = withApi(async () => {
  const criteria = await ensureCriteria();
  const [projects, scores] = await Promise.all([
    db.project.findMany({ select: { id: true, code: true, name: true, ragStatus: true, currentBudget: true, baselineBudget: true } }),
    db.projectScore.findMany(),
  ]);
  const byId = new Map(scores.map((s) => [s.projectId, s]));
  const rows = projects.map((p) => {
    const s = byId.get(p.id);
    return {
      project: p,
      score: s ? { weightedScore: s.overrideScore ?? s.weightedScore, systemScore: s.weightedScore, classification: classify(s.overrideScore ?? s.weightedScore), overridden: s.overrideScore != null, overrideReason: s.overrideReason, overrideBy: s.overrideBy, scores: JSON.parse(s.scoresJson), costEstimate: s.costEstimate, expectedValue: s.expectedValue } : null,
    };
  }).sort((a, b) => (b.score?.weightedScore ?? -1) - (a.score?.weightedScore ?? -1));
  return ok({ criteria, rows, unscored: rows.filter((r) => !r.score).length });
}, { permission: "portfolio.view", rateLimit: { limit: 240, windowMs: 60_000 } });

const postSchema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("score"), projectId: z.string(),
    scores: z.record(z.string(), z.number().min(0).max(100)),
    costEstimate: z.number().min(0).default(0), expectedValue: z.number().min(0).default(0),
    overrideScore: z.number().min(0).max(100).optional(), overrideReason: z.string().optional(),
  }),
  z.object({ action: z.literal("optimize"), budget: z.number().min(0), maxProjects: z.number().int().min(1).optional(), name: z.string().optional() }),
]);

export const POST = withApi(async (ctx) => {
  const session = ctx.session!;
  const body = await parseBody(ctx.req, postSchema);
  const criteria = await ensureCriteria();

  if (body.action === "score") {
    const weighted = weightedScore(body.scores, criteria);
    const cls = classify(body.overrideScore ?? weighted);
    const score = await db.projectScore.upsert({
      where: { projectId: body.projectId },
      create: {
        projectId: body.projectId, scoresJson: JSON.stringify(body.scores), weightedScore: weighted,
        classification: cls, overrideScore: body.overrideScore ?? null, overrideReason: body.overrideReason ?? null, overrideBy: body.overrideScore != null ? session.name : null,
        costEstimate: body.costEstimate, expectedValue: body.expectedValue,
      },
      update: {
        scoresJson: JSON.stringify(body.scores), weightedScore: weighted, classification: cls,
        ...(body.overrideScore != null ? { overrideScore: body.overrideScore, overrideReason: body.overrideReason ?? null, overrideBy: session.name } : {}),
        costEstimate: body.costEstimate, expectedValue: body.expectedValue,
      },
    });
    await writeAudit({ userId: session.id, userName: session.name, action: "UPDATE", entityType: "ProjectScore", entityId: score.id, entityName: "Project prioritization score", after: { weighted, cls, override: body.overrideScore } });
    return ok({ weightedScore: weighted, classification: cls, overridden: body.overrideScore != null }, 201);
  }

  // optimize
  const scores = await db.projectScore.findMany();
  if (scores.length === 0) throw new ApiError(400, "Score projects before optimizing");
  const projects = await db.project.findMany({ select: { id: true, code: true, name: true } });
  const nameOf = new Map(projects.map((p) => [p.id, p.code]));
  const candidates: Candidate[] = scores.map((s) => ({
    id: s.projectId, name: nameOf.get(s.projectId) ?? s.projectId,
    score: s.overrideScore ?? s.weightedScore, cost: s.costEstimate, expectedValue: s.expectedValue,
  }));
  const result = optimizePortfolio(candidates, body.budget, body.maxProjects);
  const scenario = await db.portfolioScenario.create({
    data: {
      name: body.name ?? `Optimization ${new Date().toISOString().slice(0, 10)} — budget ${body.budget.toLocaleString()}`,
      budget: body.budget, maxProjects: body.maxProjects ?? null,
      selectedJson: JSON.stringify(result.selected), excludedJson: JSON.stringify(result.excluded),
      totalScore: result.totalScore, invested: result.totalCost,
    },
  });
  await writeAudit({ userId: session.id, userName: session.name, action: "CREATE", entityType: "PortfolioScenario", entityId: scenario.id, entityName: scenario.name, after: { budget: body.budget, selected: result.selected.map((d) => d.candidate.name), totalScore: result.totalScore } });
  return ok({ scenarioId: scenario.id, ...result }, 201);
}, { permission: "portfolio.manage", rateLimit: { limit: 60, windowMs: 60_000 } });
