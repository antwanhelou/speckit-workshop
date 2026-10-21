---
description: "Implementation tasks for the Task List feature"
---

# Tasks: Task List

**Input**: Design documents from `/specs/001-task-list/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `quickstart.md`

**Tests**: Automated tests are required by the specification and plan; manual browser refresh validation is also required.

**Organization**: Tasks follow the specification's user-story priorities. Every story has an independent test criterion; shared setup and test infrastructure precede story work.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: The task can run in parallel with another task in its phase because it uses a different file and has no unfinished dependency.
- **[Story]**: User-story tasks are labeled `[US1]` through `[US6]`; setup, foundational, and polish tasks have no story label.
- All task descriptions identify the exact file path or paths to change or validate.

## Path Conventions

- Single-project React + TypeScript + Vite application: `src/` and `src/test/` at the repository root.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the planned application scaffold and runtime scripts.

- [ ] T001 Scaffold the React + TypeScript + Vite application and lock its dependencies with the planned entry point and source structure in `package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, and `src/main.tsx`

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Configure the required automated-test infrastructure before story implementation.

- [ ] T002 Configure Vitest with jsdom, React Testing Library, `user-event`, `jest-dom`, test scripts, and test initialization in `package.json`, `vite.config.ts`, and `src/test/setup.ts`

**Checkpoint**: The application scaffold and test environment are ready before user-story work begins.

## Phase 3: User Story 1 - Add a task (Priority: P1) — MVP

**Goal**: Add an incomplete task from a trimmed, valid title, retaining duplicate titles as independent tasks.

**Independent Test**: Submit an ordinary valid title and confirm one incomplete task appears with the trimmed title and the input clears only after the save succeeds.

### Tests for User Story 1

- [ ] T003 [P] [US1] Test valid one-character and ordinary titles, empty and whitespace-only (including tabs), trimming with internal whitespace preserved, exact 80-character acceptance and 81-character rejection after trimming, surrounding whitespace excluded from length, and composed/decomposed accents plus emoji/ZWJ grapheme counting in `src/test/taskTitle.test.ts`
- [ ] T004 [P] [US1] Test invalid blank and over-80-character submissions show validation feedback, add no task, and retain input; test successful add rendering an incomplete task, clearing input only after successful save, and adding equal titles as separate tasks with distinct IDs in `src/test/App.test.tsx`
- [ ] T005 [P] [US1] Test that writing a candidate task list serializes the ordered records without merging duplicate titles in `src/test/taskStorage.test.ts`

### Implementation for User Story 1

- [ ] T006 [P] [US1] Implement title trimming and 1–80 grapheme validation using `Intl.Segmenter` in `src/taskTitle.ts`
- [ ] T007 [P] [US1] Define the `Task` type with independent `id`, trimmed `title`, and `completed` fields, and implement serialization and the stable-key `localStorage` writer for ordered task records in `src/taskStorage.ts`
- [ ] T008 [US1] Implement controlled title entry, validation feedback, task creation with an independent `crypto.randomUUID()` ID, successful-save input clearing, and add coordination in `src/components/TaskForm.tsx` and `src/App.tsx`
- [ ] T009 [US1] Render the ordered task titles and incomplete state in `src/components/TaskList.tsx`

**Checkpoint**: A valid submission creates and displays an independent incomplete task; invalid input does not add a task.

## Phase 4: User Story 2 - Mark complete and undo (Priority: P2)

**Goal**: Toggle one task's completion state without changing other tasks, including tasks with the same title.

**Independent Test**: Complete and undo one of two identically titled tasks; confirm only the selected task changes, its state is apparent without color alone, and list order is unchanged.

### Tests for User Story 2

- [ ] T010 [US2] Test completion and undo, including duplicate titles with distinct IDs, that only the selected task changes, other records and order remain unchanged, and completion has a non-color visual indicator in `src/test/App.test.tsx`

### Implementation for User Story 2

- [ ] T011 [US2] Add per-task completion toggling by ID and a textual completed indicator with non-color styling in `src/components/TaskList.tsx`, `src/App.tsx`, and `src/App.css`

**Checkpoint**: Completion and undo work independently for each task and preserve the rest of the list.

## Phase 5: User Story 3 - Tasks persist across refresh (Priority: P3)

**Goal**: Restore and persist the task list in order with each task's identity and completion state.

**Independent Test**: Load valid saved records and verify their order and states; perform the manual browser refresh check and confirm the list matches the last successful save.

### Tests for User Story 3

- [ ] T012 [P] [US3] Test missing storage as an empty list and valid saved JSON restoring task IDs, titles, order, duplicate titles, and completion flags; verify writes preserve the complete ordered records in `src/test/taskStorage.test.ts`
- [ ] T013 [P] [US3] Test app startup rendering restored records and the normal empty state when no storage key exists in `src/test/App.test.tsx`

### Implementation for User Story 3

- [ ] T014 [US3] Implement storage loading and record validation, requiring each record to have a unique non-empty ID, an already-trimmed title of 1–80 grapheme characters, and a boolean completion value, in `src/taskStorage.ts`
- [ ] T015 [US3] Load persisted tasks at app startup and show the clear no-tasks empty state when the list is empty in `src/App.tsx`
- [ ] T016 [US3] Perform the manual browser refresh check for task order and mixed completion states described in `specs/001-task-list/quickstart.md`

**Checkpoint**: Previously saved tasks reload with their original order, identity, title, and completion state.

## Phase 6: User Story 4 - Safe handling of save failure (Priority: P4)

**Goal**: Report write failures while preserving the last committed list and any typed title.

**Independent Test**: Simulate add and completion write failures; confirm the previous displayed and stored states remain, the add input is retained, and a successful retry applies the change.

### Tests for User Story 4

- [ ] T017 [US4] Test failed add and completion writes preserve the prior list, completion state, stored value, and entered title; verify actionable errors and successful retry behavior in `src/test/App.test.tsx`

### Implementation for User Story 4

- [ ] T018 [US4] Write each candidate list before committing it to React state, retain the input on failed add, retain prior completion state on failure, and display a retry-oriented save error in `src/App.tsx` and `src/taskStorage.ts`

**Checkpoint**: No failed save is displayed as committed, and user-entered text is not lost.

## Phase 7: User Story 5 - Recover from unreadable saved data (Priority: P5)

**Goal**: Preserve unreadable storage and require explicit confirmation before replacing it with an empty list.

**Independent Test**: Load unreadable data, confirm it is not overwritten, cancel a reset without change, then confirm a reset; verify a failed reset write stays in recovery.

### Tests for User Story 5

- [ ] T019 [P] [US5] Test storage read exceptions, malformed JSON, and invalid record shapes enter an unreadable state without changing the raw stored value in `src/test/taskStorage.test.ts`
- [ ] T020 [P] [US5] Test recovery blocks normal mutations, reset cancellation preserves unreadable data, confirmed reset writes an empty list, and reset write failure remains in recovery without overwriting the raw value in `src/test/App.test.tsx`

### Implementation for User Story 5

- [ ] T021 [US5] Implement the recovery message and explicit reset-confirmation UI with confirm and cancel actions in `src/components/RecoveryPanel.tsx`
- [ ] T022 [US5] Distinguish unreadable storage from an empty list, block normal mutations until recovery, and announce recovery and reset failures in `src/App.tsx`
- [ ] T023 [US5] Implement confirmed empty-list persistence and preserve recovery state when the reset write fails in `src/App.tsx` and `src/taskStorage.ts`

**Checkpoint**: Unreadable saved data remains untouched unless the user confirms reset and that write succeeds.

## Phase 8: User Story 6 - Accessible, keyboard-operable use (Priority: P6)

**Goal**: Make form, task controls, feedback, and recovery actions perceivable and operable with assistive technology and keyboard.

**Independent Test**: Use only the keyboard to add a task, toggle completion, read status feedback, and reach recovery actions; verify controls have purpose-specific accessible names and visible focus.

### Tests for User Story 6

- [ ] T024 [US6] Test accessible names, logical keyboard navigation, Enter form submission, keyboard task toggling, visible completion text, and announced validation, save, and recovery status messages in `src/test/App.test.tsx`

### Implementation for User Story 6

- [ ] T025 [US6] Provide a labeled title input, named submit control, and announced validation and save-feedback regions in `src/components/TaskForm.tsx` and `src/App.tsx`
- [ ] T026 [US6] Provide purpose-specific accessible names for each task completion control and retain a textual completion indicator in `src/components/TaskList.tsx`
- [ ] T027 [US6] Make recovery and reset confirmation controls clearly named and keyboard-operable in `src/components/RecoveryPanel.tsx`
- [ ] T028 [US6] Add visible keyboard focus and accessible status styling without color-only meaning in `src/App.css`

**Checkpoint**: All controls and messages are accessible, and the full workflow is keyboard-operable.

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Document app usage and verify the planned quality gates.

- [ ] T029 Write a concise beginner-oriented setup, run, test, and recovery overview in `README.md`
- [ ] T030 Add the TypeScript typecheck command to the project scripts in `package.json`
- [ ] T031 Run the configured typecheck and resolve TypeScript errors using `tsconfig.json`
- [ ] T032 Run the complete Vitest suite with `npm test -- --run` using the script in `package.json`
- [ ] T033 Run the production build with `npm run build` using the build configuration in `vite.config.ts`

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; creates the React + TypeScript + Vite scaffold.
- **Foundational (Phase 2)**: Depends on Setup and blocks all user stories.
- **User Stories (Phases 3–8)**: Follow the specification priority order. The shared app grows incrementally; the dependency list below identifies where earlier behavior is required.
- **Polish (Phase 9)**: Depends on the desired stories being complete.

### User Story Dependencies

- **US1 (P1)**: Starts after Phase 2; no story dependency. This is the MVP.
- **US2 (P2)**: Depends on US1's task records and rendered list.
- **US3 (P3)**: Depends on US1's task write path and US2's completion state, which persistence must restore.
- **US4 (P4)**: Depends on US1's add flow and US2's completion flow to exercise failed writes in both.
- **US5 (P5)**: Depends on US3's load classification and US4's safe-write behavior.
- **US6 (P6)**: Applies across the completed add, completion, persistence, error, and recovery workflows (US1–US5).

### Parallel Opportunities

- Within US1, the title tests, app tests, and storage-write tests use separate files and can be prepared in parallel; the title validator and storage writer also use separate files and can be implemented in parallel before the app flow integrates them.
- Within US3, storage-loading tests and app-startup tests use separate files and can be prepared in parallel.
- Within US5, storage unreadability tests and recovery interaction tests use separate files and can be prepared in parallel.
- Story phases are not generally parallel because they extend shared app behavior in dependency order.

## Parallel Example: User Story 1

```text
Prepare the title-validation tests in src/test/taskTitle.test.ts
Prepare the add-flow tests in src/test/App.test.tsx
Prepare the storage-write tests in src/test/taskStorage.test.ts

After those tests are specified, implement src/taskTitle.ts and src/taskStorage.ts in parallel;
integrate them in src/components/TaskForm.tsx and src/App.tsx afterward.
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 setup and Phase 2 test infrastructure.
2. Complete Phase 3 and validate title rules, successful add, incomplete initial state, duplicate independence, and successful input clearing.
3. Stop and validate US1 independently before adding later behavior.

### Incremental Delivery

1. Add completion and undo (US2), then persistence and the manual refresh check (US3).
2. Add safe save-failure behavior (US4) and unreadable-data recovery (US5).
3. Complete cross-cutting accessibility checks (US6), README, typecheck, test, and production-build verification.
