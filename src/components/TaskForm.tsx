import type { FormEvent } from "react";

interface Props {
  value: string;
  error: string | null;
  disabled: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export default function TaskForm({ value, error, disabled, onChange, onSubmit }: Props) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="task-title">Task title</label>
      <div className="row">
        <input
          id="task-title"
          type="text"
          value={value}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "task-error" : undefined}
          onChange={(e) => onChange(e.target.value)}
        />
        <button type="submit" disabled={disabled}>
          Add task
        </button>
      </div>
      {error && (
        <p id="task-error" role="alert" className="error">
          {error}
        </p>
      )}
    </form>
  );
}
