// PM CONTROL TOWER — Report subscriptions management
// GET  /api/reporting/subs — user's subscriptions with template names
// POST /api/reporting/subs {templateId, frequency?, format?} — subscribe
// DELETE /api/reporting/subs?id= — unsubscribe

import { z } from "zod";
import { db } from "@/lib/db";
import { withApi, ok, ApiError, parseBody } from "@/lib/api";

export const GET = withApi(async (ctx) => {
  const session = ctx.session!;
  const subs = await db.reportSubscription.findMany({ where: { userId: session.id }, orderBy: { createdAt: "desc" } });
  const templates = await db.reportingTemplate.findMany({ where: { id: { in: subs.map((s) => s.templateId) } }, select: { id: true, name: true, category: true } });
  return ok({ subscriptions: subs, templates });
}, { permission: "reports.view", rateLimit: { limit: 240, windowMs: 60_000 } });

export const POST = withApi(async (ctx) => {
  const session = ctx.session!;
  const body = await parseBody(ctx.req, z.object({
    templateId: z.string(), frequency: z.string().default("MONTHLY"), format: z.string().default("PDF"),
  }));
  const sub = await db.reportSubscription.upsert({
    where: { userId_templateId: { userId: session.id, templateId: body.templateId } },
    create: { userId: session.id, templateId: body.templateId, frequency: body.frequency, format: body.format },
    update: { frequency: body.frequency, format: body.format },
  });
  return ok({ subscription: sub }, 201);
}, { permission: "reports.view", rateLimit: { limit: 60, windowMs: 60_000 } });

export const DELETE = withApi(async (ctx) => {
  const id = ctx.searchParams.get("id");
  if (!id) throw new ApiError(400, "id required");
  await db.reportSubscription.delete({ where: { id } });
  return ok({ unsubscribed: true });
}, { permission: "reports.view", rateLimit: { limit: 60, windowMs: 60_000 } });
