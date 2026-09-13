"use client";
// PM CONTROL TOWER — Enterprise Gantt Chart (TeamGantt style)
// Split-panel: task list (left) + timeline bars (right). CPM critical path, today marker,
// weekend shading, dependency arrows, progress fill, zoom levels, collapsible groups.

import { useMemo, useState, useRef } from "react";
import { useApi } from "@/lib/client";
import { LoadingBlock, ErrorBlock, EmptyState, cn } from "@/components/pmct/kit";
import { ChevronRight, ChevronDown, ZoomIn, ZoomOut, Link2 } from "lucide-react";

const CRIT = "#e74c3c";
const TODAY = "#e74c3c";
const WKND = "#f1f5f9";
const COLORS = ["#1999b8", "#e74c3c", "#3498db", "#9b59b6", "#2ecc71", "#e67e22", "#e83e8c"];

export default function GanttChart({ projectId }: { projectId: string }) {
  const data = useApi<any>(`/api/projects/${projectId}/schedule`);
  const [zoom, setZoom] = useState<"day" | "week" | "month">("day");
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [showCrit, setShowCrit] = useState(true);
  const [showDep, setShowDep] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const pxD = zoom === "day" ? 28 : zoom === "week" ? 20 : 80;

  if (data.loading && !data.data) return <LoadingBlock label="Rendering Gantt…" />;
  if (data.error) return <ErrorBlock message={data.error} onRetry={data.refetch} />;

  const tasks: any[] = Array.isArray(data.data?.tasks) ? data.data.tasks : [];
  const dependencies: any[] = Array.isArray(data.data?.dependencies) ? data.data.dependencies : [];
  if (tasks.length === 0) return <EmptyState title="No tasks in the schedule" />;

  // Compute origin and bounds safely
  let origin = Date.now();
  let lastDate = Date.now() + 30 * 86400000;
  try {
    const starts = tasks.map((t: any) => new Date(t.startDate || t.earliestStart || Date.now()).getTime()).filter(Number.isFinite);
    const ends = tasks.map((t: any) => new Date(t.earliestFinish || t.endDate || Date.now()).getTime()).filter(Number.isFinite);
    if (starts.length) origin = Math.min(...starts) - 2 * 86400000;
    if (ends.length) lastDate = Math.max(...ends) + 2 * 86400000;
  } catch { /* fallback already set */ }
  const totalDays = Math.max(1, Math.ceil((lastDate - origin) / 86400000));
  const chartW = totalDays * pxD;
  const toX = (d: string | null | undefined) => { if (!d) return 0; const t = new Date(d).getTime(); return Number.isFinite(t) ? Math.max(0, ((t - origin) / 86400000)) * pxD : 0; };
  const todayX = ((Date.now() - origin) / 86400000) * pxD;

  // Group by WBS prefix
  const groups: { key: string; label: string; items: any[]; color: string }[] = [];
  const seen = new Set<string>();
  let ci = 0;
  for (const t of tasks) {
    const gk = t.wbs?.code?.split(".").slice(0, 2).join(".") || "root";
    if (!seen.has(gk)) { seen.add(gk); groups.push({ key: gk, label: gk, items: [], color: COLORS[ci % COLORS.length] }); ci++; }
    const g = groups.find((x) => x.key === gk);
    if (g) g.items.push(t);
  }

  // Dependency arrows
  const geom = new Map<string, { x1: number; y: number; x2: number }>();
  let row = 0;
  for (const g of groups) {
    if (collapsed.has(g.key)) continue;
    for (const item of g.items) { geom.set(item.id, { x1: toX(item.earliestStart), y: row * 40 + 20, x2: toX(item.earliestFinish) }); row++; }
  }
  const arrows: { d: string; crit: boolean }[] = [];
  if (showDep) {
    for (const dep of dependencies) {
      const from = geom.get(dep.predecessorId);
      const to = geom.get(dep.successorId);
      if (!from || !to) continue;
      arrows.push({ d: `M ${from.x2} ${from.y} L ${from.x2 + 8} ${from.y} L ${from.x2 + 8} ${to.y} L ${to.x1 - 5} ${to.y}`, crit: tasks.find((t: any) => t.id === dep.successorId)?.isCritical || false });
    }
  }

  const criticalCount = tasks.filter((t: any) => t.isCritical).length;
  const avgProgress = tasks.length > 0 ? Math.round(tasks.reduce((s: number, t: any) => s + (t.progress || 0), 0) / tasks.length) : 0;
  const totalRows = groups.reduce((s, g) => s + (collapsed.has(g.key) ? 1 : g.items.length + 1), 0);

  const syncScroll = (src: "list" | "chart") => {
    const s = src === "chart" ? scrollRef.current : listRef.current;
    const t = src === "chart" ? listRef.current : scrollRef.current;
    if (s && t) t.scrollTop = s.scrollTop;
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1">
          <div className="rounded-md border border-slate-200 px-3 py-1.5"><p className="text-[10px] uppercase text-slate-400">Tasks</p><p className="text-sm font-semibold">{tasks.length}</p></div>
          <div className="rounded-md border px-3 py-1.5" style={{ borderColor: "#fca5a5", backgroundColor: "#fef2f2" }}><p className="text-[10px] uppercase text-red-400">Critical path</p><p className="text-sm font-semibold text-red-700">{criticalCount}</p></div>
          <div className="rounded-md border border-slate-200 px-3 py-1.5"><p className="text-[10px] uppercase text-slate-400">Duration</p><p className="text-sm font-semibold">{totalDays}d</p></div>
          <div className="rounded-md border border-slate-200 px-3 py-1.5"><p className="text-[10px] uppercase text-slate-400">Avg progress</p><p className="text-sm font-semibold">{avgProgress}%</p></div>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={() => setShowCrit(!showCrit)} className={cn("px-2 py-1 rounded text-xs font-medium border", showCrit ? "bg-red-50 text-red-700 border-red-200" : "bg-white text-slate-400 border-slate-200")}>Critical</button>
          <button onClick={() => setShowDep(!showDep)} className={cn("px-2 py-1 rounded text-xs font-medium border flex items-center gap-1", showDep ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-white text-slate-400 border-slate-200")}><Link2 className="h-3 w-3" />Deps</button>
          {(["day", "week", "month"] as const).map((z) => (
            <button key={z} onClick={() => setZoom(z)} className={cn("px-2 py-1 rounded text-xs font-medium border capitalize", zoom === z ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-500 border-slate-200")}>
              {z === "day" ? <ZoomIn className="h-3 w-3" /> : z === "month" ? <ZoomOut className="h-3 w-3" /> : z}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 overflow-hidden shadow-sm">
        <div className="flex bg-slate-50 border-b border-slate-200">
          <div className="w-56 shrink-0 border-r border-slate-200 px-3 py-1.5 text-[11px] font-semibold text-slate-500 uppercase">Task</div>
          <div ref={scrollRef} className="flex-1 overflow-x-auto overflow-y-hidden" onScroll={(e) => { if (listRef.current) listRef.current.scrollTop = e.currentTarget.scrollTop; }}>
            <div style={{ width: chartW }} className="relative h-6">
              {Array.from({ length: Math.min(totalDays, 80) }).map((_, i) => {
                const mult = zoom === "day" ? 1 : zoom === "week" ? 5 : 20;
                const day = new Date(origin + i * 86400000 * mult);
                const isWknd = day.getDay() === 0 || day.getDay() === 6;
                return <div key={i} className={cn("absolute top-0 h-full flex items-center justify-center text-[9px]", isWknd ? "text-slate-300" : "text-slate-500")} style={{ left: i * pxD * mult, width: pxD * mult }}>{zoom === "day" ? day.getDate() : day.toISOString().slice(5, 10)}</div>;
              })}
              {todayX > 0 && todayX < chartW && <div className="absolute top-0 h-full z-10" style={{ left: todayX }}><div className="h-full w-0.5" style={{ backgroundColor: TODAY }} /><span className="absolute -top-0.5 -left-4 text-[8px] font-bold px-1 rounded text-white" style={{ backgroundColor: TODAY }}>TODAY</span></div>}
            </div>
          </div>
        </div>
        <div className="flex" style={{ maxHeight: 500 }}>
          <div ref={listRef} className="w-56 shrink-0 border-r border-slate-200 overflow-y-auto bg-white" onScroll={(e) => { if (scrollRef.current) scrollRef.current.scrollTop = e.currentTarget.scrollTop; }}>
            {groups.map((g) => (
              <div key={g.key}>
                <div className="flex items-center gap-1.5 px-2 py-1.5 bg-slate-50 border-b border-slate-100">
                  <button onClick={() => setCollapsed((p) => { const n = new Set(p); if (n.has(g.key)) n.delete(g.key); else n.add(g.key); return n; })}>
                    {collapsed.has(g.key) ? <ChevronRight className="h-3.5 w-3.5 text-slate-400" /> : <ChevronDown className="h-3.5 w-3.5 text-slate-400" />}
                  </button>
                  <span className="text-xs font-semibold text-slate-700 truncate">{g.label}</span>
                </div>
                {!collapsed.has(g.key) && g.items.map((item: any) => (
                  <div key={item.id} className={cn("flex items-center gap-1 px-2 py-1.5 border-b border-slate-50 text-xs", item.isCritical && showCrit && "bg-red-50/30")}>
                    <span className="flex-1 truncate text-slate-600">{item.name || item.code}</span>
                    <span className="w-6 text-right text-slate-400 tabular-nums">{Math.round(item.durationDays || 0)}d</span>
                    <span className={cn("w-7 text-right tabular-nums", (item.progress || 0) >= 100 ? "text-emerald-600" : "text-slate-400")}>{Math.round(item.progress || 0)}%</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div ref={scrollRef} className="flex-1 overflow-x-auto overflow-y-auto relative" onScroll={(e) => { if (listRef.current) listRef.current.scrollTop = e.currentTarget.scrollTop; }}>
            <div style={{ width: chartW, minHeight: totalRows * 40 + 40 }} className="relative">
              {Array.from({ length: totalDays }).map((_, i) => { const day = new Date(origin + i * 86400000); return day.getDay() === 0 || day.getDay() === 6 ? <div key={"w" + i} className="absolute top-0 bottom-0" style={{ left: i * pxD, width: pxD, backgroundColor: WKND }} /> : null; })}
              {showDep && (
                <svg className="absolute top-0 left-0 pointer-events-none z-10" style={{ width: chartW, height: "100%" }}>
                  <defs><marker id="gantt-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="none" stroke="#94a3b8" strokeWidth={1.5} /></marker></defs>
                  {arrows.map((a, i) => <path key={i} d={a.d} stroke={a.crit ? "#e74c3c66" : "#94a3b866"} strokeWidth={1.5} fill="none" markerEnd="url(#gantt-arrow)" />)}
                </svg>
              )}
              {groups.map((g) => (
                <div key={g.key}>
                  {!collapsed.has(g.key) && g.items.map((item: any, idx: number) => {
                    const x = toX(item.earliestStart);
                    const w = Math.max(pxD * 0.5, (item.durationDays || 1) * pxD);
                    const isCrit = item.isCritical && showCrit;
                    const color = isCrit ? CRIT : g.color;
                    return (
                      <div key={item.id} className={cn("absolute flex items-center", isCrit && "bg-red-50/20")} style={{ top: (groups.slice(0, groups.indexOf(g)).reduce((s, pg) => s + (collapsed.has(pg.key) ? 1 : pg.items.length + 1), 0) + idx) * 40, height: 40, left: 0, right: 0 }}>
                        <div className="relative rounded-md shadow-sm flex items-center overflow-visible" style={{ left: x, width: w, height: 18, backgroundColor: color }}>
                          {(item.progress || 0) > 0 && <div className="h-full rounded-l-md bg-white/40" style={{ width: `${Math.min(100, item.progress)}%` }} />}
                        </div>
                        <span className="absolute text-[10px] text-slate-500 whitespace-nowrap" style={{ left: x + w + 6 }}>{item.name}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
              {todayX > 0 && todayX < chartW && <div className="absolute top-0 bottom-0 pointer-events-none z-10" style={{ left: todayX }}><div className="h-full w-0.5" style={{ backgroundColor: TODAY, opacity: 0.6 }} /></div>}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5"><span className="w-4 h-3 rounded" style={{ backgroundColor: CRIT }} />Critical path</span>
        <span className="flex items-center gap-1.5"><span className="w-4 h-3 rounded" style={{ backgroundColor: "#546e7a" }} />Task</span>
        <span className="flex items-center gap-1.5"><span className="w-0.5 h-4" style={{ backgroundColor: TODAY }} />Today</span>
        <span className="flex items-center gap-1.5"><Link2 className="h-3 w-3 text-slate-400" />Dependency</span>
      </div>
    </div>
  );
}
