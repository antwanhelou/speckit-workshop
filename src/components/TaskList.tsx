import type { Task } from "../taskStorage";

interface Props {
  tasks: Task[];
  disabled: boolean;
  onToggle: (id: string) => void;
}

export default function TaskList({ tasks, disabled, onToggle }: Props) {
  if (tasks.length === 0) {
    return <p className="empty">No tasks yet. Add your first task above.</p>;
  }
  return (
    <ul className="tasks">
      {tasks.map((task) => (
        <li key={task.id} className={task.completed ? "done" : undefined}>
          <label>
            <input
              type="checkbox"
              checked={task.completed}
              disabled={disabled}
              onChange={() => onToggle(task.id)}
            />
            <span className="title">{task.title}</span>
          </label>
          {task.completed && <span className="badge">Done</span>}
        </li>
      ))}
    </ul>
  );
}
