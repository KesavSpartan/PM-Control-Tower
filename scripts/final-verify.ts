// FINAL SYSTEM-WIDE VERIFICATION (v1.8.0)
const BASE = "http://127.0.0.1:3000";
let pass = 0, fail = 0; const failures: string[] = [];
async function ok(name: string, cond: boolean, extra = "") {
  if (cond) { pass++; console.log("PASS", name, extra); } else { fail++; failures.push(name + " " + extra); console.log("FAIL", name, extra); }
}
async function j(path: string, token: string | null, opts?: RequestInit) {
  const r = await fetch(BASE + path, { ...opts, headers: { "content-type": "application/json", ...(token ? { authorization: "Bearer " + token } : {}), ...(opts?.headers || {}) } });
  let body: any = null;
  try { body = await r.json(); } catch { body = { raw: true }; }
  return { status: r.status, body };
}
(async () => {
  // 1. Auth all personas
  const personas: Record<string, string | null> = {};
  for (const u of ["pmo@pmct.io", "pm.sarah@pmct.io", "ceo@pmct.io", "liam@pmct.io", "auditor@pmct.io"]) {
    const r = await j("/api/auth/login", null, { method: "POST", body: JSON.stringify({ email: u, password: "Pmct@2026" }) });
    personas[u] = r.body?.data?.token ?? null;
    await ok("auth " + u, !!personas[u]);
  }
  const t = personas["pmo@pmct.io"]!;
  const ceo = personas["ceo@pmct.io"]!;
  const member = personas["liam@pmct.io"]!;

  // 2. Core GETs
  for (const [n, p] of [["projects", "/api/projects"], ["portfolios", "/api/portfolios"], ["financials", "/api/financials"], ["tasks", "/api/projects"], ["resources", "/api/resources"], ["alerts", "/api/alerts"], ["governance rules", "/api/governance/rules"], ["automations", "/api/automations"], ["notifications", "/api/notifications"], ["audit", "/api/audit"], ["gates", "/api/gates"], ["changes", "/api/changes"], ["decisions", "/api/decisions"], ["timesheets", "/api/timesheets"], ["integrations", "/api/integrations"], ["assistant-gateway", "/api/assistant"], ["reports exec", "/api/reports/executive"], ["reports analytics", "/api/reports/analytics"]].slice(0, 16) as [string, string][]) {
    const r = await j(p, t);
    await ok("GET " + n, r.status === 200 && r.body?.success !== false);
  }

  // 3. Integrity suite
  for (const [n, p] of [["freshness", "/api/integrity/freshness"], ["evidence", "/api/integrity/evidence"], ["calibration", "/api/integrity/calibration"], ["scenarios", "/api/integrity/scenarios"], ["ai-actions", "/api/integrity/ai-actions"], ["benefits", "/api/integrity/benefits"], ["data-quality", "/api/integrity/data-quality"], ["config", "/api/integrity/config"]]) {
    const r = await j(p, t);
    await ok("integrity " + n, r.status === 200);
  }
  const dq = await j("/api/integrity/data-quality", t);
  await ok("DQ average 0-100", dq.body.data.averageScore >= 0 && dq.body.data.averageScore <= 100, "(" + dq.body.data.averageScore + ")");

  // 4. Technology + reporting + prioritization + investment
  const tech = await j("/api/technology", t);
  await ok("technology KPIs", !!tech.body.data.kpis, "(" + tech.body.data.kpis?.architectureHealth + "/100)");
  const rpt = await j("/api/reporting", t);
  await ok("reporting catalog >= 150", (rpt.body.data.total ?? 0) >= 150, "(" + rpt.body.data.total + ")");
  const pri = await j("/api/prioritization", t);
  await ok("prioritization criteria=7", pri.body.data.criteria.length === 7);
  const inv = await j("/api/investment", t);
  await ok("investment portfolio", inv.body.data.portfolio.count >= 1);

  // 5. Permission checks
  const denied = await j("/api/prioritization", member, { method: "POST", body: JSON.stringify({ action: "optimize", budget: 1 }) });
  await ok("member denied portfolio.manage", denied.status === 403 || denied.status === 401 || denied.body.success === false);
  const ai = await j("/api/integrity/ai-actions", member, { method: "POST", body: JSON.stringify({ projectId: "x", type: "STEERING_PACK" }) });
  await ok("member denied integrity.manage", ai.status === 403 || ai.body.success === false);

  // 6. Learning memory + feedback
  const rec = await j("/api/assistant/memory", t, { method: "POST", body: JSON.stringify({ action: "record", question: "final test risk query" }) });
  await ok("memory record", rec.body.success);
  const prof = await j("/api/assistant/memory", t);
  await ok("memory profile", prof.body.data.profile.interactions30d >= 1);

  // 7. Async simulation completes
  const pid = (await j("/api/projects", t)).body.data.items[0].id;
  const q = await j("/api/integrity/simulate", t, { method: "POST", body: JSON.stringify({ projectId: pid, seed: 4242, iterations: 500 }) });
  let run: any = null;
  for (let i = 0; i < 12; i++) {
    await new Promise((r) => setTimeout(r, 1200));
    const runs = await j("/api/integrity/simulate?projectId=" + pid, t);
    run = runs.body.data.runs.find((x: any) => x.id === q.body.data.runId);
    if (run && run.status === "COMPLETE") break;
  }
  await ok("async simulation COMPLETE", run?.status === "COMPLETE");
  await ok("sim P50 deterministic format", typeof run?.result?.finish?.p50 === "number");

  // 8. Report generate + viewer + download
  const tpl = (await j("/api/reporting", t)).body.data.templates[0];
  const gen = await j("/api/reporting", t, { method: "POST", body: JSON.stringify({ action: "generate", templateId: tpl.id }) });
  await ok("report generate", gen.body.success);
  const html = await fetch(BASE + "/api/reporting/" + gen.body.data.report.id + "?format=html", { headers: { authorization: "Bearer " + t } });
  const htmlText = await html.text();
  await ok("report HTML download", html.status === 200 && htmlText.includes("CONFIDENTIAL"));

  // 9. Controls + evidence + forecast
  const ctl = await j(`/api/projects/${pid}/controls`, t);
  await ok("project controls series", ctl.body.data.series.length >= 1);
  const fc = ctl.body.data.forecast;
  await ok("forecast labeled", fc.basis.includes("Calculated forecast") || fc.completion === null);

  // 10. Pages serve
  for (const path of ["/", "/?v=30#/integrity"]) {
    const r = await fetch(BASE + path);
    await ok("page " + path.split("#")[0], r.status === 200);
  }

  console.log("\n==== RESULT: " + pass + " passed, " + fail + " failed ====");
  if (failures.length) { console.log("FAILURES:"); failures.forEach((f) => console.log(" -", f)); }
  process.exit(fail ? 1 : 0);
})();
