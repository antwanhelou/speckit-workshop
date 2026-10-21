import { describe, expect, it, vi } from "vitest";
import { createTask, loadTasks, saveTasks, STORAGE_KEY } from "../taskStorage";

describe("taskStorage", () => {
  it("creates incomplete tasks with unique ids", () => {
    const a = createTask("Same");
    const b = createTask("Same");
    expect(a.completed).toBe(false);
    expect(a.id).not.toBe(b.id);
  });

  it("loads an empty list when nothing is saved", () => {
    expect(loadTasks()).toEqual({ status: "ok", tasks: [] });
  });

  it("saves and loads tasks", () => {
    const tasks = [{ id: "1", title: "A", completed: true }];
    expect(saveTasks(tasks)).toBe(true);
    expect(loadTasks()).toEqual({ status: "ok", tasks });
  });

  it("reports unreadable data for bad JSON or wrong shape without changing it", () => {
    const bad = [
      "{oops",
      '{"a":1}',
      '[{"id":1,"title":"x","completed":false}]',
      '[{"id":"","title":"x","completed":false}]',
      '[{"id":"1","title":" x ","completed":false}]',
      `[{"id":"1","title":"${"a".repeat(81)}","completed":false}]`,
      '[{"id":"1","title":"a","completed":false},{"id":"1","title":"b","completed":false}]',
    ];
    for (const raw of bad) {
      localStorage.setItem(STORAGE_KEY, raw);
      expect(loadTasks()).toEqual({ status: "unreadable" });
      expect(localStorage.getItem(STORAGE_KEY)).toBe(raw);
    }
  });

  it("treats a throwing read as unreadable", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("denied");
    });
    expect(loadTasks()).toEqual({ status: "unreadable" });
    vi.restoreAllMocks();
  });

  it("preserves duplicate titles and order when saving", () => {
    const tasks = [
      { id: "a", title: "Same", completed: false },
      { id: "b", title: "Same", completed: true },
    ];
    saveTasks(tasks);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual(tasks);
  });

  it("returns false when saving fails", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("quota");
    });
    expect(saveTasks([])).toBe(false);
    vi.restoreAllMocks();
  });
});
