# Quickstart: Task List Validation

This guide validates the planned application after implementation. It does not
scaffold the project or install dependencies as part of the plan stage.

## Prerequisites

- Node.js 22.12 or later and npm.
- A modern browser with `localStorage`, `Intl.Segmenter`, and `crypto.randomUUID`.
- The application dependencies and scripts installed/configured during the later
  implementation stage.

## Automated validation

From the repository root, after implementation and dependency setup:

```powershell
npm ci
npm test -- --run
npm run typecheck
npm run build
```

Expected outcomes: the Vitest suite passes, including title, persistence, UI,
failure, recovery, and accessibility interaction cases; TypeScript reports no
type errors; the production build completes successfully.

## Manual browser validation

1. Start the Vite development server using the script documented in the eventual
   application `package.json` (normally `npm run dev`) and open its local URL.
2. Confirm the empty state and use only the keyboard to reach the labeled title
   input and submit control.
3. Add two distinct tasks; complete one. Refresh the browser page itself.
4. Confirm both tasks remain in their original order and only the selected task is
   complete. Confirm completion is apparent without relying on color.
5. In browser developer tools, simulate a failed write and verify the existing
   list and entered title remain after the error.
6. In a disposable test profile, put invalid JSON in the app's storage key and
   reload. Confirm the recovery message appears and the stored value is unchanged
   until explicit reset confirmation; cancel and confirm nothing changes, then
   repeat and confirm reset to an empty list.

Do not perform the destructive recovery check against real user data.
