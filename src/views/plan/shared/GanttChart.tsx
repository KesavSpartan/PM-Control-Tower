"use client";
// PM CONTROL TOWER — Enterprise Gantt Chart (TeamGantt-style)
// Split-panel: task list (left) + timeline bars (right). CPM critical path in red,
// dependency arrows (SVG), progress fill, today marker, weekend shading, phase grouping,
// zoom levels (day/week/month), RAG indicators, collapsible groups.

import { useMemo, useState, useRef, useCallback } from "react";
import { useApi } from "@/lib/client";
import { LoadingBlock, ErrorBlock, EmptyState, cn } from "@/components/pmct/kit";
import { DAY_MS } from "@/lib/constants";
import { ChevronRight, ChevronDown, ZoomIn, ZoomOut, Link2 } from "lucide-react";

const PHASE_COLORS = ["#1999b8", "#e74c3c", "#3498db", "#9b59b6", "#2ecc71", "#e67e22", "#e83e8c", "#1abc9c", "#f39c12", "#34495e"];
const CRITICAL_COLOR = "#e74c3c";
const NORMAL_COLOR = "#546e7a";
const SUMMARY_COLOR = "#37474f";
const TODAY_COLOR = "#e74c3c";
const WEEKEND_COLOR = "#f1f5f9";

interface GanttTask { id: string; code: string; name: string; status: string; durationDays: number; progress: number; isCritical: boolean; isSummary: boolean; totalFloat: number; earliestStart: string | null; earliestFinish: string | null; latestStart: string | null; latestFinish: string | null; startDate: string | null; endDate: string | null; wbs?: { id: string; code: string; name: string } | null }
interface GanttDep { predecessorId: string; successorId: string; depType: string; lagDays: number }
interface GanttData { tasks: GanttTask[]; deps: GanttDep[]; criticalCount: number; summary: { totalTasks: number; criticalTasks: { id: string }[]; projectFinish: string | null; avgProgress: number } }
type Zoom = "day" | "week" | "month";

export default function GanttChart({ projectId }: { projectId: string }) {
  const data = useApi<GanttData>(`/api/projects/${projectId}/schedule`);
  const [zoom, setZoom] = useState<Zoom>("day");
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [showCritical, setShowCritical] = useState(true);
  const [showDeps, setShowDeps] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const pxD = zoom === "day" ? 28 : zoom === "week" ? 20 : 80;

  const view = useMemo(() => {
    if (!data.data) return null;
    const d = data.data as GanttData;
    const leaves = d.tasks.filter((t) => !t.isSummary);
    const dates = leaves.map((t) => new Date(t.earliestStart ?? Date.now()).getTime()).filter(Number.isFinite);
    const efDates = leaves.map((t) => new Date(t.earliestFinish ?? Date.now()).getTime()).filter(Number.isFinite);
    const origin = (dates.length ? Math.min(...dates) : Date.now()) - 2 * 86_400_000;
    const maxD = efDates.length ? Math.max(...efDates) : Date.now() + 30 * 86_400_000;
    const totalDays = Math.ceil((maxD - origin) / 86_400_000) + 5;
    const toX = (date: string | null) => date ? Math.max(0, ((new Date(date).getTime() - origin) / 86_400_000)) * pxD : 0;
    const groups: { key: string; label: string; tasks: GanttTask[]; color: string }[] = [];
    const seen = new Map<string, number>();
    let ci = 0;
    for (const t of d.tasks) {
      const gk = t.wbs?.code?.split(".").slice(0, 2).join(".") ?? "root";
      if (!seen.has(gk)) { seen.set(gk, ci); groups.push({ key: gk, label: t.wbs?.name ?? gk, tasks: [], color: PHASE_COLORS[ci % PHASE_COLORS.length] }); ci++; }
      groups.find((g) => g.key === gk)!.tasks.push(t);
    }
    return { d, origin, totalDays, toX, groups, chartW: totalDays * pxD };
  }, [data.data, pxD]);

  if (data.loading && !data.data) return <LoadingBlock label="Rendering Gantt chart…" />;
  if (data.error) return <ErrorBlock message={data.error} onRetry={data.refetch} />;
  if (!view || view.d.tasks.length === 0) return <EmptyState title="No schedule tasks" description="Add tasks to see the Gantt chart." />;
  const { d, origin, toX, groups, chartW, totalDays } = view;
  const todayX = ((Date.now() - origin) / 86_400_000) * pxD;

  const depPaths = useMemo(() => {
    if (!showDeps) return [];
    const geoms = new Map<string, { x1: number; y: number; x2: number }>();
    let row = 0;
    for (const g of groups) { if (collapsed.has(g.key)) continue; for (const t of g.tasks) { geoms.set(t.id, { x1: toX(t.earliestStart), y: row * 40 + 20, x2: toX(t.earliestFinish) }); row++; } }
    const paths: { d: string; c: boolean }[] = [];
    for (const dep of d.deps) {
      const f = geoms.get(dep.predecessorId), to = geoms.get(dep.successorId);
      if (!f || !to) continue;
      const isCrit = d.tasks.find((t) => t.id === dep.successorId)?.isCritical ?? false;
      paths.push({ d: `M ${f.x2} ${f.y} L ${f.x2 + 8} ${f.y} L ${f.x2 + 8} ${to.y} L ${to.x1 - 4} ${to.y}`, c: isCrit });
    }
    return paths;
  }, [groups, collapsed, showDeps, d.deps, toX]);

  const barH = 18, rowH = 40;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1">
          <div className="rounded-md border border-slate-200 px-3 py-1.5"><p className="text-[10px] uppercase text-slate-400">Tasks</p><p className="text-sm font-semibold">{d.summary.totalTasks}</p></div>
          <div className="rounded-md border border-red-200 px-3 py-1.5 bg-red-50"><p className="text-[10px] uppercase text-red-400">Critical path</p><p className="text-sm font-semibold text-red-700">{d.criticalCount} tasks</p></div>
          <div className="rounded-md border border-slate-200 px-3 py-1.5"><p className="text-[10px] uppercase text-slate-400">Duration</p><p className="text-sm font-semibold">{totalDays}d</p></div>
          <div className="rounded-md border border-slate-200 px-3 py-1.5"><p className="text-[10px] uppercase text-slate-400">Avg progress</p><p className="text-sm font-semibold">{Math.round(d.summary.avgProgress)}%</p></div>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={() => setShowCritical(!showCritical)} className={cn("px-2 py-1 rounded text-xs font-medium border", showCritical ? "bg-red-50 text-red-700 border-red-200" : "bg-white text-slate-400 border-slate-200")}>Critical</button>
          <button onClick={() => setShowDeps(!showDeps)} className={cn("px-2 py-1 rounded text-xs font-medium border flex items-center gap-1", showDeps ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-white text-slate-400 border-slate-200")}><Link2 className="h-3 w-3" />Deps</button>
          {(["day", "week", "month"] as Zoom[]).map((z) => (
            <button key={z} onClick={() => setZoom(z)} className={cn("px-2 py-1 rounded text-xs font-medium border capitalize", zoom === z ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-500 border-slate-200")}>
              {z === "day" ? <ZoomIn className="h-3 w-3" /> : z === "month" ? <ZoomOut className="h-3 w-3" /> : z}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 overflow-hidden shadow-sm">
        {/* Timeline header */}
        <div className="flex bg-slate-50 border-b border-slate-200">
          <div className="w-56 shrink-0 border-r border-slate-200 px-3 py-1.5 text-[11px] font-semibold text-slate-500 uppercase">Task</div>
          <div ref={scrollRef} className="flex-1 overflow-x-auto overflow-y-hidden" onScroll={(e) => { if (listRef.current) listRef.current.scrollTop = e.currentTarget.scrollTop; }}>
            <div style={{ width: chartW }} className="relative h-6">
              {Array.from({ length: Math.min(totalDays, zoom === "day" ? 60 : zoom === "week" ? 40 : 20) }).map((_, i) => {
                const mult = zoom === "day" ? 1 : zoom === "week" ? 5 : 20;
                const day = new Date(origin + i * DAY_MS * mult);
                const isWknd = day.getDay() === 0 || day.getDay() === 6;
                return <div key={i} className={cn("absolute top-0 h-full flex items-center justify-center text-[9px]", isWknd ? "text-slate-300" : "text-slate-500")} style={{ left: i * pxD * mult, width: pxD * mult }}>{zoom === "day" ? day.getDate() : day.toISOString().slice(5, 10)}</div>;
              })}
              {todayX > 0 && todayX < chartW && <div className="absolute top-0 h-full" style={{ left: todayX }}><div className="h-full w-0.5" style={{ backgroundColor: TODAY_COLOR }} /><span className="absolute -top-0.5 -left-4 text-[8px] font-bold px-1 rounded" style={{ backgroundColor: TODAY_COLOR, color: "#fff" }}>TODAY</span></div>}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex relative" style={{ maxHeight: 520 }}>
          <div ref={listRef} className="w-56 shrink-0 border-r border-slate-200 overflow-y-auto bg-white" onScroll={(e) => { if (scrollRef.current) scrollRef.current.scrollTop = e.currentTarget.scrollTop; }}>
            {groups.map((g) => (
              <div key={g.key}>
                <div className="flex items-center gap-1.5 px-2 py-1.5 bg-slate-50 border-b border-slate-100">
                  <button onClick={() => setCollapsed((p) => { const n = new Set(p); if (n.has(g.key)) n.delete(g.key); else n.add(g.key); return n; })}>
                    {collapsed.has(g.key) ? <ChevronRight className="h-3.5 w-3.5 text-slate-400" /> : <ChevronDown className="h-3.5 w-3.5 text-slate-400" />}
                  </button>
                  <span className="text-xs font-semibold text-slate-700 truncate">{g.label}</span>
                </div>
                {!collapsed.has(g.key) && g.tasks.map((t) => (
                  <div key={t.id} className={cn("flex items-center gap-1.5 px-2 py-1.5 border-b border-slate-50 text-xs", t.isCritical && showCritical && "bg-red-50/50")}>
                    <span className="w-4 text-slate-300 text-[10px]">{t.code.slice(-2)}</span>
                    <span className={cn("flex-1 truncate", t.isCritical && showCritical ? "font-medium text-red-700" : "text-slate-600")}>{t.name}</span>
                    <span className="w-8 text-right text-slate-400 tabular-nums">{Math.round(t.durationDays)}d</span>
                    <span className={cn("w-8 text-right tabular-nums", t.progress >= 100 ? "text-emerald-600" : t.progress > 0 ? "text-blue-600" : "text-slate-300")}>{Math.round(t.progress)}%</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div ref={scrollRef} className="flex-1 overflow-x-auto overflow-y-auto" onScroll={(e) => { if (listRef.current) listRef.current.scrollTop = e.currentTarget.scrollTop; }}>
            <div style={{ width: chartW, minHeight: groups.reduce((s, g) => s + (collapsed.has(g.key) ? 1 : g.tasks.length + 1), 0) * rowH + 20 }} className="relative">
              {Array.from({ length: totalDays }).map((_, i) => { const day = new Date(origin + i * 86_400_000); return day.getDay() === 0 || day.getDay() === 6 ? <div key={"w" + i} className="absolute top-0 bottom-0" style={{ left: i * pxD, width: pxD, backgroundColor: WEEKEND_COLOR }} /> : null; })}
              {showDeps && (
                <svg className="absolute top-0 left-0 pointer-events-none z-10" style={{ width: chartW, height: "100%" }}>
                  <defs><marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="none" stroke="#94a3b8" strokeWidth={1.5} /></marker></defs>
                  {depPaths.map((p, i) => <path key={i} d={p.d} stroke={p.c ? "#e74c3c99" : "#94a3b899"} strokeWidth={1.5} fill="none" markerEnd="url(#arrow)" />)}
                </svg>
              )}
              {(() => { let row = 0; return groups.map((g) => { const rows: React.ReactNode[] = []; if (!collapsed.has(g.key)) { for (const t of g.tasks) { const x = toX(t.earliestStart); const w = Math.max(pxD * 0.5, (t.durationDays || 1) * pxD); const color = t.isSummary ? SUMMARY_COLOR : t.isCritical && showCritical ? CRITICAL_COLOR : g.color; rows.push(<div key={t.id} className={cn("absolute flex items-center", t.isCritical && showCritical && "bg-red-50/30")} style={{ top: row * rowH, height: rowH, left: 0, right: 0 }}><div className="relative rounded-md shadow-sm flex items-center" style={{ left: x, width: w, height: barH, backgroundColor: color }}>{!t.isSummary && t.progress > 0 && <div className="h-full rounded-l-md bg-white/40" style={{ width: `${Math.min(100, t.progress)}%` }} />}{!t.isSummary && <span className="absolute -right-1 translate-x-full ml-2 text-[10px] text-slate-500 whitespace-nowrap pl-1">{t.name}</span>}</div></div>); row++; } } else { row++; } return rows; }); })()}
              {todayX > 0 && todayX < chartW && <div className="absolute top-0 bottom-0 pointer-events-none z-10" style={{ left: todayX }}><div className="h-full w-0.5" style={{ backgroundColor: TODAY_COLOR, opacity: 0.6 }} /></div>}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5"><span className="w-4 h-3 rounded" style={{ backgroundColor: CRITICAL_COLOR }} />Critical path</span>
        <span className="flex items-center gap-1.5"><span className="w-4 h-3 rounded" style={{ backgroundColor: NORMAL_COLOR }} />Task</span>
        <span className="flex items-center gap-1.5"><span className="w-4 h-3 rounded" style={{ backgroundColor: SUMMARY_COLOR }} />Summary</span>
        <span className="flex items-center gap-1.5"><span className="w-4 h-1 rounded" style={{ backgroundColor: TODAY_COLOR }} />Today</span>
        <span className="flex items-center gap-1.5"><Link2 className="h-3 w-3 text-slate-400" />Dependency</span>
      </div>
    </div>
  );
}
