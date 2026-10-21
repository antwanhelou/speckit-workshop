# Implementation Plan: Task List

**Branch**: `workshop` | **Date**: 2026-10-21 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-task-list/spec.md`

## Summary

Build the specified single-screen, single-user task list as a small React and
TypeScript application served by Vite. Keep the task list in React state and
persist each successful change as JSON in browser `localStorage`. Validate trimmed
titles as 1–80 user-perceived characters using the browser's native
`Intl.Segmenter`. Persist a candidate list before committing it to displayed state,
so failed writes do not discard the prior list or entered title. Treat missing,
unreadable and valid saved data as distinct load states; never write over unreadable
data except after an explicit, confirmed reset.

## Technical Context

**Language/Version**: TypeScript 5+, targeting modern browsers; Node.js 22.12+ for development tooling.

**Primary Dependencies**: React and React DOM; Vite and its React plugin. No UI framework or state-management library.

**Storage**: Browser `localStorage`, one JSON array of task records under one stable application key.

**Testing**: Vitest, jsdom, React Testing Library, `@testing-library/user-event`, and `@testing-library/jest-dom`.

**Target Platform**: A modern desktop or mobile browser on one device; development and preview through Vite.

**Project Type**: Single-project client-side web application.

**Performance Goals**: Immediate local interactions for a beginner-scale task list; no server or concurrency targets.

**Constraints**: No backend, login, sync, or UI framework. Use built-in `Intl.Segmenter` and `crypto.randomUUID`; do not silently fall back to a character count that violates the specification. Storage access, parsing, validation, and writes can fail and must remain explicit.

**Scale/Scope**: One screen and one user's ordered task list. Editing, deletion, filtering, categories, deadlines, and drag-and-drop remain out of scope.

## Constitution Check

**Before design**

- **I. Simplicity**: Pass. The requested stack uses a single client application, plain CSS, and no extra state-management or UI library.
- **II. Accessible Interaction**: Pass. The screen, form, task controls, recovery actions, focus behavior, and status messages are included in the design.
- **III. Validated Input and Actionable Errors**: Pass. Trim and validate before attempting a write; distinguish validation, load, save, and reset errors.
- **IV. Safe Persistence**: Pass. Commit UI state only after a successful write; block normal writes when saved data is unreadable; make reset explicit and confirmed.
- **V. Behavior-Focused Tests**: Pass. Automated coverage is planned for the listed behavior and failure cases, with a real-refresh manual check.
- **VI. Spec-to-Code Consistency**: Pass. Design decisions below trace to the existing requirements and preserve their scope.

**After design**: All six checks still pass. The design adds no framework, service, route, backend, or out-of-scope behavior. The only implementation assumptions are native browser support for grapheme segmentation and UUID generation, and task order matching the specification's recorded assumption.

## Design

### Screen and interaction

Render one page with a heading, a labeled title input and submit button, an announced validation/save message region, an empty-state message when the list is empty, and the ordered task list otherwise. Keep controls in natural document/tab order with visible focus. Each task has its own labeled completion checkbox. Completed tasks show a textual completed indicator and additional non-color styling. A recovery state replaces normal mutation controls when saved data is unreadable; its reset action opens an accessible in-page confirmation with explicit confirm and cancel choices.

### Task and title behavior

Represent each task with a unique ID, trimmed title, and completion boolean; the containing array is the display and persistence order. Generate each ID independently with `crypto.randomUUID()`, never from the title. On submission, trim ECMAScript leading/trailing whitespace, count grapheme clusters with `Intl.Segmenter` configured for `granularity: "grapheme"`, then accept 1–80 inclusive. Keep internal whitespace. Invalid titles produce the relevant message without changing the list or input. A valid title produces a new incomplete task, including when its title duplicates another. Clear the controlled input only after persistence succeeds.

### Persistence and safe failures

Use one stable, documented-in-code `localStorage` key containing a JSON-serialized task array. On startup distinguish a missing key (normal empty list), a readable and valid array, and an access, parse, or shape failure (unreadable-data recovery state). Validate each loaded record's required fields before displaying it. Do not normalize an invalid saved value into an empty list.

For add, completion, undo, and confirmed reset, construct the candidate array without mutating the current array, serialize it, and call `localStorage.setItem` before updating React state. If the write succeeds, commit the candidate; clear the add input only for a successfully saved add. If it throws, retain the previously committed list/completion state and input and show an actionable error. When load is unreadable, block add and completion writes so they cannot overwrite the raw saved value. Reset requires the user to choose reset and then confirm in the UI; only after confirmation attempt to save an empty array. If that write fails, retain the recovery state and raw data.

Keep persistence and title validation as small, directly testable functions; keep React state and screen composition in the app and a few focused components. Avoid a general repository/service layer, global state, and a schema-migration framework.

### Automated test plan

- **Title validation unit tests**: valid 1-character and ordinary titles; empty and whitespace-only values; leading/trailing trim and internal whitespace; exactly 80 accepted and 81 rejected after trimming; surrounding whitespace excluded from the length; accented composed/decomposed characters and emoji/ZWJ graphemes counted as one user-perceived character.
- **Task form tests**: submitting a valid title creates an incomplete task and clears input only after save succeeds; invalid input shows a useful message and is retained; a simulated write exception leaves the entered title and prior task list intact.
- **Task identity/state tests**: duplicate titles produce separately controlled tasks; completing and undoing one changes only its completion flag; a failed completion write leaves the prior displayed state.
- **Persistence tests**: missing storage loads an empty list; valid JSON restores task order, titles, IDs, and completion flags; writes serialize all task data; read access exceptions, malformed JSON, and invalid record shapes enter recovery without overwriting the stored value; write exceptions preserve the last successful value and state.
- **Recovery tests**: reset prompt is keyboard-operable; cancelling leaves raw data untouched; confirming attempts the empty-list write; successful reset shows the empty state and enables normal use; failed reset preserves unreadable data and recovery state.
- **Accessibility tests**: named input and controls, per-task completion labels, keyboard submission/toggling, visible completed text/state, and announced validation, save, and recovery messages.

### Manual browser check

Start the Vite app in a browser, add two tasks, complete one, and refresh the page itself. Confirm both tasks remain in order and only the selected task remains complete. Also verify the empty state in a fresh browser storage profile and keyboard navigation through the form and task controls.

## Project Structure

### Documentation

```text
specs/001-task-list/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── checklists/
    └── requirements.md
```

No `contracts/` directory is needed: this is a browser-only application without a public API or external system contract. `tasks.md` is intentionally not created by the planning stage.

### Source Code (repository root)

```text
package.json
vite.config.ts
tsconfig.json
index.html
src/
├── main.tsx
├── App.tsx
├── App.css
├── taskTitle.ts
├── taskStorage.ts
└── components/
    ├── TaskForm.tsx
    ├── TaskList.tsx
    └── RecoveryPanel.tsx
src/test/
├── setup.ts
├── taskTitle.test.ts
├── taskStorage.test.ts
└── App.test.tsx
```

**Structure Decision**: One Vite React application. `App.tsx` owns the small amount of list/load/error state and coordinates persistence. `taskTitle.ts` owns trimming and grapheme-count validation; `taskStorage.ts` owns local-storage read/write and saved-data validation. The focused components separate form, list, and unreadable-data recovery presentation without creating a broader service or state-management architecture. Tests sit beside the single app's source in `src/test/`.

## Complexity Tracking

No constitution violations. No extra architectural complexity requires an exception.
