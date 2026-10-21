import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import RecoveryPanel from "./components/RecoveryPanel";
import { createTask, loadTasks, saveTasks, type Task } from "./taskStorage";
import { validateTitle } from "./taskTitle";

export default function App() {
  const [initial] = useState(loadTasks);
  const [unreadable, setUnreadable] = useState(initial.status === "unreadable");
  const [tasks, setTasks] = useState<Task[]>(initial.status === "ok" ? initial.tasks : []);
  const [title, setTitle] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [resetError, setResetError] = useState<string | null>(null);

  function commit(next: Task[]): boolean {
    if (!saveTasks(next)) {
      setSaveError("Could not save your changes. Your previous tasks are unchanged. Try again.");
      return false;
    }
    setSaveError(null);
    setTasks(next);
    return true;
  }

  function handleAdd() {
    const result = validateTitle(title);
    if (!result.ok) {
      setValidationError(result.message);
      return;
    }
    setValidationError(null);
    if (commit([...tasks, createTask(result.title)])) setTitle("");
  }

  function handleToggle(id: string) {
    commit(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }

  function handleReset() {
    if (saveTasks([])) {
      setTasks([]);
      setUnreadable(false);
      setResetError(null);
    } else {
      setResetError("Could not reset saved tasks. Your saved data is unchanged.");
    }
  }

  return (
    <main>
      <h1>Task List</h1>
      {unreadable && <RecoveryPanel resetError={resetError} onReset={handleReset} />}
      <TaskForm
        value={title}
        error={validationError}
        disabled={unreadable}
        onChange={setTitle}
        onSubmit={handleAdd}
      />
      {saveError && (
        <p role="alert" className="error">
          {saveError}
        </p>
      )}
      <TaskList tasks={tasks} disabled={unreadable} onToggle={handleToggle} />
    </main>
  );
}
