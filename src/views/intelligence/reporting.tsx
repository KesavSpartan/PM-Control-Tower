"use client";
// PM CONTROL TOWER — Enterprise Reporting Center (v1.6.0)
// Library (177 searchable templates) · Generated reports · Subscriptions · History.

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { api, useApi } from "@/lib/client";
import { money, num } from "@/lib/constants";
import {
  PageHeader, SectionCard, StatCard, StatusChip, LoadingBlock, ErrorBlock, EmptyState, Button, Badge, Input, cn,
} from "@/components/pmct/kit";
import { BookOpen, Play, Star, Clock, FileBarChart } from "lucide-react";

interface Tpl { id: string; code: string; name: string; description: string; category: string; audience: string; kpis: string; charts: string; tables: string; frequency: string; runCount: number }
interface LibraryData { templates: Tpl[]; categories: { category: string; count: number }[]; total: number }
interface GenReport { id: string; templateName: string; category: string; generatedBy: string; period: string; createdAt: string; narrative: string | null; dataJson: string }

const SECTIONS = ["Library", "My Reports", "Report Builder", "Board Packs", "Scheduled", "Subscriptions", "History", "Administration"] as const;

export default function ReportingCenterView() {
  const [section, setSection] = useState<(typeof SECTIONS)[number]>("Library");
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [lastReport, setLastReport] = useState<{ templateName: string; kpis: Record<string, unknown>; narrative: string; rag: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [favs, setFavs] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    return JSON.parse(window.localStorage.getItem("pmct.report.favs") || "[]");
  });

  const query = `/api/reporting?${q ? `q=${encodeURIComponent(q)}&` : ""}${cat ? `category=${cat}&` : ""}`;
  const lib = useApi<LibraryData>(section === "Library" ? query : null);
  const history = useApi<{ reports: GenReport[] }>(section === "History" || section === "My Reports" ? "/api/reporting?history=1" : null);

  const toggleFav = (id: string) => {
    const next = favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id];
    setFavs(next);
    window.localStorage.setItem("pmct.report.favs", JSON.stringify(next));
  };

  const generate = async (tpl: Tpl) => {
    setBusy(true);
    try {
      const res = await api.post<{ report: { templateName: string; kpis: Record<string, unknown>; narrative: string; rag: string } }>("/api/reporting", { action: "generate", templateId: tpl.id });
      setLastReport(res.report);
      toast.success(`${tpl.name} generated from live data`);
    } catch (e) { toast.error(e instanceof Error ? e.message : "Generation failed"); } finally { setBusy(false); }
  };

  const shown = useMemo(() => lib.data?.templates ?? [], [lib.data]);

  return (
    <div className="space-y-5">
      <PageHeader
        io="reports"
        title="Reporting Center"
        subtitle="177 enterprise report templates across 7 categories — every report computed from live operational data."
        breadcrumb={["Home", "Intelligence", "Reporting Center"]}
      />

      <div className="flex flex-wrap items-center gap-2">
        {SECTIONS.map((s) => (
          <button key={s} onClick={() => setSection(s)}
            className={cn("px-3 py-1.5 rounded-md text-sm font-medium border transition-colors",
              section === s ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200 hover:border-blue-300")}>
            {s}
          </button>
        ))}
      </div>

      {/* LIBRARY */}
      {section === "Library" && (
        !lib.data ? <LoadingBlock label="Loading template library…" /> : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <StatCard label="Templates" value={177} sub="7 categories · all audiences" />
              <StatCard label="Executive" value={lib.data.categories.find((c) => c.category === "EXECUTIVE")?.count ?? 0} sub="CEO/board" />
              <StatCard label="Finance" value={lib.data.categories.find((c) => c.category === "FINANCE")?.count ?? 0} sub="CFO" />
              <StatCard label="PMO" value={lib.data.categories.find((c) => c.category === "PMO")?.count ?? 0} sub="governance" />
            </div>
            <div className="flex flex-wrap gap-3">
              <Input className="h-9 w-full sm:w-72 bg-white" placeholder="Search reports — 'budget', 'risk', 'CEO'…" value={q} onChange={(e) => setQ(e.target.value)} />
              <div className="flex flex-wrap gap-1.5">
                <button onClick={() => setCat("")} className={cn("px-2.5 py-1 rounded-md text-xs font-medium border", cat === "" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200")}>All</button>
                {lib.data.categories.map((c) => (
                  <button key={c.category} onClick={() => setCat(c.category)} className={cn("px-2.5 py-1 rounded-md text-xs font-medium border", cat === c.category ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200")}>
                    {c.category} ({c.count})
                  </button>
                ))}
              </div>
            </div>
            {shown.length === 0 ? <EmptyState title="No templates match" description="Adjust search or category." /> : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {shown.slice(0, 60).map((t) => (
                  <div key={t.id} className="rounded-lg border border-slate-200 bg-white p-3.5 shadow-sm flex flex-col">
                    <div className="flex items-start gap-2">
                      <FileBarChart className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                      <p className="font-medium text-slate-800 text-sm leading-snug flex-1">{t.name}</p>
                      <button onClick={() => toggleFav(t.id)} aria-label="Favorite">
                        <Star className={cn("h-4 w-4", favs.includes(t.id) ? "fill-amber-400 text-amber-400" : "text-slate-300")} />
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 flex-1">{t.description}</p>
                    <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                      <Badge variant="outline" className="border-slate-200 text-slate-500">{t.category}</Badge>
                      <Badge variant="outline" className="border-slate-200 text-slate-500">{t.audience}</Badge>
                      <Badge variant="outline" className="border-slate-200 text-slate-400">{t.frequency.toLowerCase()}</Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Button size="sm" disabled={busy} onClick={() => void generate(t)}><Play className="h-3.5 w-3.5 mr-1" />Generate</Button>
                      <span className="text-[11px] text-slate-400">{t.runCount} run{t.runCount === 1 ? "" : "s"}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {shown.length > 60 && <p className="text-xs text-slate-400 text-center">Showing 60 of {shown.length} — refine the search to narrow.</p>}
          </div>
        )
      )}

      {/* MY REPORTS / HISTORY */}
      {(section === "My Reports" || section === "History") && (
        !history.data ? <LoadingBlock /> : (
          <SectionCard title={section === "History" ? "Report history" : "My generated reports"} description="Every generation is recorded with period, generator and narrative.">
            {history.data.reports.length === 0 ? <EmptyState title="No reports generated yet" description="Generate one from the Library." /> : (
              <div className="space-y-2">
                {history.data.reports.map((r) => (
                  <div key={r.id} className="rounded-lg border border-slate-200 p-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium text-slate-800 flex-1">{r.templateName}</p>
                      <Badge variant="outline" className="border-slate-200 text-slate-500">{r.category}</Badge>
                      <span className="text-xs text-slate-400">{r.period.replace(/_/g, " ").toLowerCase()} · {new Date(r.createdAt).toLocaleString()} · by {r.generatedBy}</span>
                    </div>
                    {r.narrative && <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">{r.narrative}</p>}
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        )
      )}

      {/* LAST GENERATED — live result panel */}
      {lastReport && (
        <SectionCard title={`Last generated — ${lastReport.templateName}`} description="Computed from live operational data just now" actions={<StatusChip status={lastReport.rag} />}>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-3">
            {Object.entries(lastReport.kpis).slice(0, 12).map(([k, v]) => (
              <div key={k} className="rounded-md border border-slate-200 p-2.5">
                <p className="text-[10px] uppercase text-slate-400 truncate">{k}</p>
                <p className="text-sm font-semibold text-slate-800 tabular-nums">{typeof v === "number" ? (v > 1000 ? money(v) : num(v, 2)) : String(v ?? "—")}</p>
              </div>
            ))}
          </div>
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-3">
            <p className="text-[10px] uppercase text-slate-400 mb-1">AI Executive Commentary — from actual report data</p>
            <p className="text-sm text-slate-700">{lastReport.narrative}</p>
          </div>
        </SectionCard>
      )}

      {/* OTHER SECTIONS — honest status */}
      {["Report Builder", "Board Packs", "Scheduled", "Subscriptions", "Administration"].includes(section) && (
        <SectionCard title={section} description="Phase B/C of the Reporting Center roadmap">
          <EmptyState
            title={`${section} — scheduled for the next build phase`}
            description={section === "Report Builder"
              ? "Visual drag-and-drop builder (KPI, chart, table, text components) — Phase C. The template API it will render against is live."
              : section === "Board Packs"
                ? "Multi-report board pack composer with cover, commentary and export — Phase C. The Leadership Pack in Reports provides the interim workflow."
                : "Distribution, subscriptions UI and template administration land with the builder phase; the subscription model + API already exist."}
          />
        </SectionCard>
      )}
    </div>
  );
}
