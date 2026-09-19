"use client";
// PM CONTROL TOWER — Boards: Kanban / Calendar / Workload omni-views (Command Center v3.0)
// Mirrors ClickUp/Monday multiple task representations over the same Task entity.

import { useMemo, useState } from "react";
import { useApi, useRealtimeRefetch } from "@/lib/client";
import { PageHeader, StatCard, SectionCard, LoadingBlock, ErrorBlock, EmptyState, StatusChip, SearchInput } from "@/components/pmct/kit";
import { ProjectPicker, useStoredProjectId } from "@/views/plan/shared/ProjectPicker";
import { KanbanBoard, type KanbanTask } from "./shared/KanbanBoard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fmtDate, money } from "@/lib/constants";
import { ChevronLeft, ChevronRight, Columns3, CalendarDays, Flame, Users, AlertTriangle, Layers } from "lucide-react";

interface AgileBoard {
  projects: { id: string; code: string; name: string }[];
  tasks: KanbanTask[];
  summary: { sprintCount: number; backlogCards: number; totalPoints: number };
}
interface CapacityRow {
  resource: { id: string; name: string; employeeCode: string; department: string | null; capacityHoursPerWeek: number };
  cells: { week: string; allocated: number; capacity: number; utilizationPct: number; overallocated: boolean }[];
  totalAllocated: number;
  totalCapacity: number;
  avgUtilizationPct: number;
  peakUtilizationPct: number;
  overallocatedWeeks: number;
}
interface MeetingItem { id: string; title: string; scheduledAt: string; meetingType: string; status: string }

const heatColor = (pct: number, over: boolean) => {
  if (over) return "bg-red-500/85 text-white";
  if (pct >= 90) return "bg-orange-400/80 text-white";
  if (pct >= 70) return "bg-amber-300/80 text-slate-900";
  if (pct >= 40) return "bg-emerald-300/70 text-slate-900";
  if (pct > 0) return "bg-sky-200/70 text-slate-900";
  return "bg-slate-100 text-slate-400";
};

// ---------- Calendar month grid ----------
function WorkCalendar({ tasks, meetings }: { tasks: KanbanTask[]; meetings: MeetingItem[] }) {
  const [monthOffset, setMonthOffset] = useState(0);
  const base = new Date();
  const view = new Date(base.getFullYear(), base.getMonth() + monthOffset, 1);
  const monthStart = new Date(view.getFullYear(), view.getMonth(), 1);
  const monthEnd = new Date(view.getFullYear(), view.getMonth() + 1, 0);
  const startPad = (monthStart.getDay() + 6) % 7; // Monday-first
  const days: { date: Date; inMonth: boolean }[] = [];
  for (let i = startPad; i > 0; i--) days.push({ date: new Date(monthStart.getTime() - i * 86_400_000), inMonth: false });
  for (let d = 1; d <= monthEnd.getDate(); d++) days.push({ date: new Date(view.getFullYear(), view.getMonth(), d), inMonth: true });
  while (days.length % 7 !== 0) {
    const last = days[days.length - 1].date;
    days.push({ date: new Date(last.getTime() + 86_400_000), inMonth: false });
  }

  const dueByDay = new Map<string, KanbanTask[]>();
  for (const t of tasks) {
    if (!t.endDate) continue;
    const key = t.endDate.slice(0, 10);
    dueByDay.set(key, [...(dueByDay.get(key) || []), t]);
  }
  const meetByDay = new Map<string, MeetingItem[]>();
  for (const m of meetings) {
    const key = (m.scheduledAt || "").slice(0, 10);
    if (!key) continue;
    meetByDay.set(key, [...(meetByDay.get(key) || []), m]);
  }
  const todayKey = new Date().toISOString().slice(0, 10);

  return (
    <SectionCard
      title={view.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
      description="Task due dates and meetings on one calendar. Click a task card in Kanban to change its status."
      actions={
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setMonthOffset((o) => o - 1)} aria-label="Previous month"><ChevronLeft className="h-4 w-4" /></Button>
          <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => setMonthOffset(0)}>Today</Button>
          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setMonthOffset((o) => o + 1)} aria-label="Next month"><ChevronRight className="h-4 w-4" /></Button>
        </div>
      }
    >
      <div className="grid grid-cols-7 gap-px bg-slate-200 rounded-lg overflow-hidden border border-slate-200">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d} className="bg-slate-50 text-[10px] font-semibold uppercase tracking-wide text-slate-500 text-center py-1.5">{d}</div>
        ))}
        {days.map(({ date, inMonth }, i) => {
          const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
          const due = dueByDay.get(key) || [];
          const meets = meetByDay.get(key) || [];
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;
          return (
            <div key={i} className={cn("min-h-24 bg-white p-1.5 space-y-1", !inMonth && "bg-slate-50/70", isWeekend && inMonth && "bg-slate-50/50")}>
              <p className={cn("text-[10px] font-semibold tabular-nums text-right", key === todayKey ? "bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center ml-auto" : inMonth ? "text-slate-500" : "text-slate-300")}>
                {date.getDate()}
              </p>
              {meets.slice(0, 1).map((m) => (
                <div key={m.id} className="rounded bg-purple-50 border border-purple-200 px-1 py-0.5 text-[9px] text-purple-800 truncate" title={`${m.title} (${m.meetingType})`}>📅 {m.title}</div>
              ))}
              {due.slice(0, 3).map((t) => (
                <div key={t.id} className={cn("rounded px-1 py-0.5 text-[9px] truncate border",
                  t.status === "COMPLETED" ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                    : t.status === "BLOCKED" ? "bg-red-50 border-red-200 text-red-800"
                      : "bg-blue-50 border-blue-200 text-blue-800")}
                  title={`${t.code} — ${t.name}`}>
                  {t.code} {t.name}
                </div>
              ))}
              {due.length > 3 && <p className="text-[9px] text-slate-400 pl-1">+{due.length - 3} more</p>}
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}

// ---------- Workload heatmap ----------
function WorkloadHeatmap() {
  const [weeks, setWeeks] = useState("8");
  const capacity = useApi<{ rows: CapacityRow[]; summary: Record<string, number> }>(`/api/capacity?weeks=${weeks}`, [weeks]);

  if (capacity.loading) return <LoadingBlock label="Computing capacity…" />;
  if (capacity.error) return <ErrorBlock message={capacity.error} onRetry={capacity.refetch} />;
  const rows = capacity.data?.rows || [];
  if (!rows.length) return <EmptyState title="No active resources" description="Add resources in the Execute module to see the workload heatmap." />;

  const weekHeaders = rows[0]?.cells.map((c) => c.week) || [];
  return (
    <SectionCard
      title="Resource workload heatmap"
      description="Allocated hours vs weekly capacity. Red cells are over-allocated."
      actions={
        <Select value={weeks} onValueChange={setWeeks}>
          <SelectTrigger className="w-36 h-8 text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            {["4", "8", "12", "16", "26"].map((w) => <SelectItem key={w} value={w}>{w} weeks</SelectItem>)}
          </SelectContent>
        </Select>
      }
      bodyClass="p-0"
    >
      <div className="overflow-auto p-4">
        <table className="text-xs border-separate border-spacing-0.5">
          <thead>
            <tr>
              <th className="text-left pr-3 pb-1 text-[10px] uppercase text-slate-400 sticky left-0 bg-white">Resource</th>
              {weekHeaders.map((w) => (
                <th key={w} className="pb-1 text-[9px] font-medium text-slate-400 w-14">{w.slice(5)}</th>
              ))}
              <th className="pb-1 text-[10px] uppercase text-slate-400 pl-2">Avg</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.resource.id}>
                <td className="pr-3 whitespace-nowrap sticky left-0 bg-white">
                  <span className="font-medium text-slate-700">{r.resource.name}</span>
                  <span className="text-[10px] text-slate-400 ml-2">{r.resource.employeeCode}</span>
                </td>
                {r.cells.map((c) => (
                  <td key={c.week} className="p-0">
                    <div
                      className={cn("h-7 rounded flex items-center justify-center text-[10px] font-semibold tabular-nums", heatColor(c.utilizationPct, c.overallocated))}
                      title={`${r.resource.name} · week of ${c.week}: ${c.allocated}h of ${c.capacity}h (${c.utilizationPct}%)`}
                    >
                      {c.allocated > 0 ? c.allocated : ""}
                    </div>
                  </td>
                ))}
                <td className="pl-2 text-right font-semibold tabular-nums">
                  <span className={r.avgUtilizationPct > 100 ? "text-red-600" : r.avgUtilizationPct > 85 ? "text-amber-600" : "text-slate-700"}>{r.avgUtilizationPct}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}

// ---------- Main view ----------
export default function BoardViews() {
  const [tab, setTab] = useState("kanban");
  const [projectId, setProjectId] = useStoredProjectId();
  const [search, setSearch] = useState("");

  const board = useApi<AgileBoard>(projectId ? `/api/agile?projectId=${projectId}` : "/api/agile");
  const meetings = useApi<{ meetings: MeetingItem[] }>(`/api/meetings?from=${new Date().toISOString().slice(0, 10)}&to=${new Date(Date.now() + 60 * 86_400_000).toISOString().slice(0, 10)}`);
  useRealtimeRefetch(board.refetch, ["agile:changed"]);

  const tasks = useMemo(() => {
    const list = board.data?.tasks || [];
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter((t) => t.name.toLowerCase().includes(q) || t.code.toLowerCase().includes(q));
  }, [board.data, search]);

  const filteredMeetings = useMemo(() => (meetings.data?.meetings || []).filter((m) => !projectId || true), [meetings.data, projectId]);

  if (board.error) return <ErrorBlock message={board.error} onRetry={board.refetch} />;

  return (
    <div className="space-y-5">
      <PageHeader
        title="Boards — Kanban · Calendar · Workload"
        subtitle="The same Task entity rendered as drag-and-drop boards, a delivery calendar, and a capacity heatmap — one source of truth, many views."
        breadcrumb={["Home", "Execute", "Boards"]}
        actions={<ProjectPicker value={projectId} onChange={setProjectId} className="w-full sm:w-auto" />}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Task cards" value={tasks.length} icon={<Layers className="h-4 w-4" />} />
        <StatCard label="In progress" value={tasks.filter((t) => t.status === "IN_PROGRESS").length} tone="info" icon={<Columns3 className="h-4 w-4" />} />
        <StatCard label="Blocked" value={tasks.filter((t) => t.status === "BLOCKED").length} tone={tasks.some((t) => t.status === "BLOCKED") ? "bad" : "default"} icon={<AlertTriangle className="h-4 w-4" />} />
        <StatCard label="Story points" value={tasks.reduce((s, t) => s + (t.storyPoints || 0), 0)} icon={<Flame className="h-4 w-4" />} />
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <TabsList className="h-9">
            <TabsTrigger value="kanban" className="text-xs gap-1.5"><Columns3 className="h-3.5 w-3.5" />Kanban</TabsTrigger>
            <TabsTrigger value="calendar" className="text-xs gap-1.5"><CalendarDays className="h-3.5 w-3.5" />Calendar</TabsTrigger>
            <TabsTrigger value="workload" className="text-xs gap-1.5"><Users className="h-3.5 w-3.5" />Workload</TabsTrigger>
          </TabsList>
          {tab === "kanban" && <SearchInput value={search} onChange={setSearch} placeholder="Filter cards…" className="w-56" />}
        </div>

        <TabsContent value="kanban" className="mt-4">
          {board.loading ? <LoadingBlock label="Loading board…" /> : tasks.length === 0
            ? <EmptyState title="No task cards" description="Create tasks in the Plan → Tasks module, or pick another project." />
            : <KanbanBoard tasks={tasks} onMoved={board.refetch} showProject={!projectId} />}
        </TabsContent>

        <TabsContent value="calendar" className="mt-4">
          <WorkCalendar tasks={tasks} meetings={filteredMeetings} />
        </TabsContent>

        <TabsContent value="workload" className="mt-4">
          <WorkloadHeatmap />
        </TabsContent>
      </Tabs>
    </div>
  );
}
