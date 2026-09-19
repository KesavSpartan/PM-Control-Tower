"use client";
// PM CONTROL TOWER — Shared Kanban board (Command Center v3.0)
// Status-column kanban with dnd-kit drag & drop; used by Boards and Agile views.

import { useState } from "react";
import {
  DndContext, DragOverlay, PointerSensor, useDraggable, useDroppable, useSensor, useSensors,
  type DragEndEvent, type DragStartEvent,
} from "@dnd-kit/core";
import { toast } from "sonner";
import { api } from "@/lib/client";
import { TASK_STATUS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { StatusChip } from "@/components/pmct/kit";
import { CalendarCheck2, GripVertical, Loader2 } from "lucide-react";

export interface KanbanTask {
  id: string;
  code: string;
  name: string;
  status: string;
  priority: string;
  progress: number;
  storyPoints: number;
  sprintId: string | null;
  epicId: string | null;
  endDate: string | null;
  projectId: string;
  project?: { id: string; code: string; name: string } | null;
  assignee?: { id: string; name: string; avatarColor: string } | null;
}

const COLUMN_STYLES: Record<string, string> = {
  NOT_STARTED: "bg-slate-50 border-slate-200",
  IN_PROGRESS: "bg-blue-50/60 border-blue-200",
  COMPLETED: "bg-emerald-50/60 border-emerald-200",
  BLOCKED: "bg-red-50/60 border-red-200",
  CANCELLED: "bg-slate-100/80 border-slate-200",
};

function TaskCard({ task, showProject }: { task: KanbanTask; showProject: boolean }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: task.id });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        "group rounded-lg border bg-white p-2.5 shadow-sm cursor-grab active:cursor-grabbing select-none",
        isDragging ? "opacity-40 ring-2 ring-blue-400" : "hover:shadow-md hover:border-blue-300"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-mono font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded px-1 py-0.5">{task.code}</span>
            {task.storyPoints > 0 && (
              <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 rounded-full px-1.5 py-0.5" title="Story points">{task.storyPoints} pts</span>
            )}
            {showProject && task.project && (
              <span className="text-[10px] text-slate-500 truncate max-w-28">{task.project.code}</span>
            )}
          </div>
          <p className="text-xs font-medium text-slate-800 mt-1 leading-snug line-clamp-2">{task.name}</p>
        </div>
        <GripVertical className="h-3.5 w-3.5 text-slate-300 shrink-0 mt-0.5 group-hover:text-slate-400" />
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-1.5">
          {task.assignee ? (
            <span
              className="h-5 w-5 rounded-full text-[8px] font-bold text-white flex items-center justify-center"
              style={{ backgroundColor: task.assignee.avatarColor || "#1e3a5f" }}
              title={task.assignee.name}
            >
              {task.assignee.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
            </span>
          ) : (
            <span className="h-5 w-5 rounded-full bg-slate-100 border border-slate-200 text-[8px] text-slate-400 flex items-center justify-center">—</span>
          )}
          {task.progress > 0 && <span className="text-[10px] text-slate-400 tabular-nums">{Math.round(task.progress)}%</span>}
        </div>
        {task.endDate && (
          <span className="flex items-center gap-1 text-[10px] text-slate-400">
            <CalendarCheck2 className="h-3 w-3" />
            {task.endDate.slice(0, 10)}
          </span>
        )}
      </div>
    </div>
  );
}

function Column({ status, tasks, showProject }: { status: string; tasks: KanbanTask[]; showProject: boolean }) {
  const { setNodeRef, isOver } = useDroppable({ id: `col-${status}` });
  return (
    <div className={cn("flex flex-col rounded-xl border min-w-[240px] w-[240px] shrink-0 max-h-full", COLUMN_STYLES[status] || "bg-slate-50 border-slate-200")}>
      <div className="flex items-center justify-between px-3 pt-2.5 pb-1.5">
        <StatusChip status={status} />
        <span className="text-[10px] font-semibold text-slate-400 tabular-nums">{tasks.length}</span>
      </div>
      <div ref={setNodeRef} className={cn("flex-1 overflow-y-auto px-2 pb-2 space-y-2 rounded-b-xl transition-colors", isOver && "ring-2 ring-inset ring-blue-400 bg-blue-50/40")}>
        {tasks.map((t) => <TaskCard key={t.id} task={t} showProject={showProject} />)}
        {tasks.length === 0 && (
          <div className="h-16 rounded-lg border border-dashed border-slate-300/70 flex items-center justify-center text-[11px] text-slate-400">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
}

export function KanbanBoard({
  tasks, onMoved, showProject = true, readOnly = false,
}: {
  tasks: KanbanTask[];
  onMoved?: (taskId: string, newStatus: string) => void;
  showProject?: boolean;
  readOnly?: boolean;
}) {
  const [dragId, setDragId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const dragTask = tasks.find((t) => t.id === dragId) || null;
  const byStatus = (s: string) => tasks.filter((t) => (t.status || "NOT_STARTED") === s);

  const onDragStart = (e: DragStartEvent) => setDragId(String(e.active.id));

  const onDragEnd = async (e: DragEndEvent) => {
    setDragId(null);
    const { active, over } = e;
    if (!over || readOnly) return;
    const overId = String(over.id);
    if (!overId.startsWith("col-")) return;
    const newStatus = overId.slice(4);
    const task = tasks.find((t) => t.id === String(active.id));
    if (!task || task.status === newStatus) return;

    // Optimistic move
    const previous = task.status;
    task.status = newStatus;
    setSaving(true);
    try {
      await api.patch("/api/agile", { taskId: task.id, status: newStatus });
      onMoved?.(task.id, newStatus);
      toast.success(`${task.code} → ${newStatus.replace(/_/g, " ").toLowerCase()}`);
    } catch (err) {
      task.status = previous;
      toast.error(err instanceof Error ? err.message : "Move failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative">
      {saving && <Loader2 className="h-4 w-4 animate-spin text-blue-600 absolute top-0 right-0 z-10" />}
      <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="flex gap-3 overflow-x-auto pb-3 items-start max-h-[calc(100vh-320px)]">
          {TASK_STATUS.map((s) => <Column key={s} status={s} tasks={byStatus(s)} showProject={showProject} />)}
        </div>
        <DragOverlay>
          {dragTask ? (
            <div className="w-[236px] rounded-lg border border-blue-300 bg-white p-2.5 shadow-xl opacity-95 rotate-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded px-1 py-0.5">{dragTask.code}</span>
                <span className="text-xs font-medium text-slate-800 truncate">{dragTask.name}</span>
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
