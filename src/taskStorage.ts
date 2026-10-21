import { validateTitle } from "./taskTitle";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export const STORAGE_KEY = "task-list.tasks.v1";

export type LoadResult =
  | { status: "ok"; tasks: Task[] }
  | { status: "unreadable" };

export function createTask(title: string): Task {
  return { id: crypto.randomUUID(), title, completed: false };
}

function isTask(value: unknown): value is Task {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    v.id.length > 0 &&
    typeof v.title === "string" &&
    validateTitle(v.title).ok &&
    v.title === v.title.trim() &&
    typeof v.completed === "boolean"
  );
}

function hasUniqueIds(tasks: Task[]): boolean {
  return new Set(tasks.map((t) => t.id)).size === tasks.length;
}

export function loadTasks(): LoadResult {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return { status: "ok", tasks: [] };
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.every(isTask) || !hasUniqueIds(parsed)) {
      return { status: "unreadable" };
    }
    return { status: "ok", tasks: parsed };
  } catch {
    return { status: "unreadable" };
  }
}

// Returns true only when the write succeeded.
export function saveTasks(tasks: Task[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return true;
  } catch {
    return false;
  }
}
