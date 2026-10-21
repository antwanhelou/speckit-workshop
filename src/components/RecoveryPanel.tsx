import { useState } from "react";

interface Props {
  resetError: string | null;
  onReset: () => void;
}

export default function RecoveryPanel({ resetError, onReset }: Props) {
  const [confirming, setConfirming] = useState(false);

  return (
    <section role="alert" className="recovery">
      <h2>Saved tasks could not be read</h2>
      <p>
        Your saved data is unchanged. Adding and completing tasks is paused. You can
        reset the saved list to start over, but this permanently removes the unreadable data.
      </p>
      {confirming ? (
        <div>
          <p>Reset saved tasks? This cannot be undone.</p>
          <button
            type="button"
            onClick={() => {
              onReset();
              setConfirming(false);
            }}
          >
            Confirm reset
          </button>{" "}
          <button type="button" onClick={() => setConfirming(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <button type="button" onClick={() => setConfirming(true)}>
          Reset saved tasks
        </button>
      )}
      {resetError && <p className="error">{resetError}</p>}
    </section>
  );
}
