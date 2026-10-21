# Feature Specification: Task List

**Feature Branch**: `workshop` (existing branch; no feature branch created)

**Created**: 2026-10-21

**Status**: Draft

**Input**: User description: "Small single-user task-list application for a beginner workshop. One-screen app. User adds a task by entering a title and submitting. Titles are trimmed, then must be 1-80 characters; blank or over-length titles are rejected with a clear message and no task is added. New tasks are incomplete; the input is cleared only after a successful save. Duplicate titles are allowed and independent. Tasks can be marked complete and undone, with completion visually distinguished. Tasks and completion persist across refresh in the same browser. Clear empty state. Save failures show an error and preserve prior list/completion state and the entered title as applicable. Unreadable saved data causes a recovery message without silent overwrite; explicit reset only after user confirmation. Accessible labels and keyboard operation. Out of scope: login, backend, cross-device sync, edit, delete, filtering, categories, deadlines, drag/drop."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Add a task (Priority: P1)

A user types a task title into a single input on the one-screen app and submits it. The task appears in the list as incomplete, and the input is cleared so the user can enter another.

**Why this priority**: Adding tasks is the core value; without it nothing else is usable. Alone it forms a viable MVP.

**Independent Test**: Enter a valid title, submit, and confirm a new incomplete task appears and the input is empty.

**Acceptance Scenarios**:

1. **Given** an empty input, **When** the user enters "Buy milk" and submits, **Then** "Buy milk" appears in the list as incomplete and the input is cleared.
2. **Given** the input contains "  Buy milk  " (leading/trailing spaces), **When** the user submits, **Then** the task is shown and stored as "Buy milk".
3. **Given** the input contains exactly 1 character after trimming, **When** the user submits, **Then** the task is added.
4. **Given** the input contains exactly 80 characters after trimming, **When** the user submits, **Then** the task is added.
5. **Given** the input contains 81 characters after trimming, **When** the user submits, **Then** a clear validation message states the 80-character limit, no task is added, and the entered text remains in the input.
6. **Given** the input is empty or only whitespace, **When** the user submits, **Then** a clear validation message states that a title is required, no task is added, and the list is unchanged.
7. **Given** an 80-character title surrounded by extra spaces (more than 80 raw characters), **When** the user submits, **Then** the task is accepted because length is measured after trimming.
8. **Given** a validation message is showing, **When** the user next submits a valid title, **Then** the message is cleared and the task is added.
9. **Given** a task titled "Buy milk" already exists, **When** the user adds "Buy milk" again, **Then** a second, separate incomplete task with the same title is added.

---

### User Story 2 - Mark complete and undo (Priority: P2)

A user marks a task as complete when it is done and can undo that to make it incomplete again. Completed tasks look clearly different from incomplete ones.

**Why this priority**: Tracking progress is the second essential purpose of a task list.

**Independent Test**: With at least one task present, mark it complete, confirm the visual change, then undo and confirm it returns to incomplete.

**Acceptance Scenarios**:

1. **Given** an incomplete task, **When** the user marks it complete, **Then** it is shown as complete in a way that is visually distinct and not conveyed by colour alone.
2. **Given** a complete task, **When** the user undoes completion, **Then** it is shown as incomplete again.
3. **Given** two tasks with identical titles, **When** the user marks one complete, **Then** only that task changes and the other stays incomplete.
4. **Given** several tasks, **When** the user changes one task's completion, **Then** the order and state of the other tasks are unchanged.

---

### User Story 3 - Tasks persist across refresh (Priority: P3)

A user refreshes or reopens the page in the same browser and finds their tasks and each task's completion state exactly as left.

**Why this priority**: Without persistence the list is not useful beyond a single visit, but the app is still demonstrable without it.

**Independent Test**: Add tasks, complete some, refresh the page, and confirm the same tasks, order, and completion states appear.

**Acceptance Scenarios**:

1. **Given** saved tasks with a mix of complete and incomplete states, **When** the user refreshes the page, **Then** all tasks appear in the same order with the same completion states.
2. **Given** duplicate-titled tasks with different completion states, **When** the page is refreshed, **Then** each keeps its own state.
3. **Given** no tasks have ever been saved, **When** the app opens, **Then** a clear empty state is shown (for example, a message that there are no tasks yet and how to add one), not an error.
4. **Given** the list has tasks, **When** the app is opened in a different browser, **Then** those tasks are not present (no cross-browser or cross-device sync).

---

### User Story 4 - Safe handling of save failure (Priority: P4)

When a task or completion change cannot be saved, the user is told what happened and no data is lost or corrupted.

**Why this priority**: Protects user data and trust; it matters only after the main flows work.

**Independent Test**: Simulate a save failure while adding a task and while changing completion; confirm an error appears and prior state is preserved.

**Acceptance Scenarios**:

1. **Given** a valid title is entered, **When** saving fails, **Then** an error message explains the task could not be saved and suggests trying again, the task is not shown as saved, the previously saved list and completion states are unchanged, and the entered title remains in the input.
2. **Given** a task's completion is being changed, **When** saving fails, **Then** an error message is shown and the task's displayed and stored completion state remains as it was before the attempt.
3. **Given** a save failure error is showing, **When** the user retries and saving succeeds, **Then** the change is applied, the error is cleared, and (for adding) the input is cleared.
4. **Given** a save failure, **When** the user refreshes, **Then** the list matches the last successfully saved state.

---

### User Story 5 - Recover from unreadable saved data (Priority: P5)

If previously saved data cannot be read, the user is told clearly, the unreadable data is left untouched, and the user can choose to reset only after explicit confirmation.

**Why this priority**: Rare but must never lead to silent data loss.

**Independent Test**: Corrupt the saved data, open the app, and confirm a recovery message appears, nothing is overwritten, and a reset happens only after confirmation.

**Acceptance Scenarios**:

1. **Given** saved data that cannot be read, **When** the app opens, **Then** a recovery message explains that saved tasks could not be read and offers a reset option; the app does not silently show an empty list as if nothing was saved.
2. **Given** the recovery message is showing, **When** the user takes no action, **Then** the unreadable data is not changed or overwritten, including by any attempt to add or change tasks.
3. **Given** the recovery message is showing, **When** the user chooses reset, **Then** a confirmation prompt appears explaining that saved tasks will be discarded.
4. **Given** the confirmation prompt, **When** the user cancels, **Then** nothing changes and the recovery message remains.
5. **Given** the confirmation prompt, **When** the user confirms, **Then** the saved data is replaced with an empty list, the empty state is shown, and the user can add tasks normally.

---

### User Story 6 - Accessible, keyboard-operable use (Priority: P6)

A user who relies on a keyboard or assistive technology can add tasks, change completion, read messages, and use recovery actions.

**Why this priority**: Required by the project constitution; it applies across all stories.

**Independent Test**: Complete every flow using only the keyboard and verify every control has a meaningful accessible name.

**Acceptance Scenarios**:

1. **Given** the app is open, **When** the user tabs through it, **Then** focus moves in a logical order, is always visible, and reaches the title input, submit control, each task's completion control, and any recovery controls.
2. **Given** the title input has focus, **When** the user presses Enter, **Then** the title is submitted.
3. **Given** a task's completion control has focus, **When** the user activates it with Space or Enter, **Then** completion changes.
4. **Given** any interactive control, **When** inspected by assistive technology, **Then** it has an accessible name describing its purpose, including which task a completion control applies to.
5. **Given** a validation, save, or recovery message appears, **When** it is shown, **Then** it is announced to assistive technology without the user needing to find it.

---

### Edge Cases

- A title of only whitespace characters (including tabs) is treated as blank.
- A title of exactly 80 characters after trimming is accepted; 81 is rejected; internal whitespace is preserved and counts toward length.
- Length is counted in characters as a user perceives them (an accented letter or emoji counts as one character).
- Duplicate titles are allowed, including titles differing only by surrounding whitespace, and remain fully independent.
- Rapid repeated submission creates one task per successful submission, with no partially added entries.
- Validation failure leaves the input text as typed so the user can correct it.
- Save failure leaves both the list and the input as they were so no work is lost.
- Unreadable saved data is never treated as an empty list and never overwritten without explicit user confirmation; while it is unresolved, changes that would overwrite it are not saved.
- Saved data that is present but empty is a normal empty state, not an error.
- Very long lists remain usable on the single screen (the list scrolls; the input stays reachable).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The app MUST present all functionality on a single screen for a single user, with no login.
- **FR-002**: Users MUST be able to add a task by entering a title and submitting it.
- **FR-003**: The system MUST trim leading and trailing whitespace from the title before validation and use the trimmed value as the task title.
- **FR-004**: The system MUST accept titles of 1 to 80 characters after trimming.
- **FR-005**: The system MUST reject blank titles and titles longer than 80 characters after trimming, show a clear validation message distinguishing the two cases, and add no task.
- **FR-006**: Newly added tasks MUST be incomplete.
- **FR-007**: The system MUST clear the title input only after the task was successfully saved; on validation or save failure the entered text MUST remain.
- **FR-008**: The system MUST allow duplicate titles and treat each task as independent.
- **FR-009**: Users MUST be able to mark an incomplete task complete and undo completion of a complete task.
- **FR-010**: Completed tasks MUST be visually distinguishable from incomplete tasks, without relying on colour alone.
- **FR-011**: The system MUST persist all tasks, their order, and their completion states so they remain after a refresh in the same browser.
- **FR-012**: The system MUST show a clear empty state when there are no tasks.
- **FR-013**: When a save fails, the system MUST show an error with a clear next step, keep the last successfully saved list and completion states unchanged, and keep the entered title in the input when the failure occurred while adding.
- **FR-014**: When saved data cannot be read, the system MUST show a recovery message, MUST preserve the unreadable data, and MUST NOT silently treat it as empty or overwrite it.
- **FR-015**: The system MUST offer a reset of saved data only after the user explicitly confirms; cancelling MUST leave everything unchanged.
- **FR-016**: Every interactive control MUST have an accessible name or label describing its purpose, and every control MUST be operable by keyboard with visible focus and logical focus order.
- **FR-017**: Validation, save-failure, and recovery messages MUST be perceivable by assistive technology.
- **FR-018**: The system MUST NOT provide login, a backend, cross-device sync, task editing, task deletion, filtering, categories, deadlines, or drag-and-drop reordering.

### Key Entities

- **Task**: A single to-do item with a title (1-80 characters after trimming), a completion state (incomplete or complete), and a position in the list. Each task is independent of every other task, even with an identical title.
- **Task List**: The ordered collection of tasks shown on the screen and retained between visits in the same browser.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time user can add their first task in under 30 seconds without instructions.
- **SC-002**: 100% of titles of 1-80 characters after trimming are accepted, and 100% of blank or over-80-character titles are rejected with a visible message and no list change.
- **SC-003**: After a refresh, 100% of tasks, their order, and completion states match what was last successfully saved.
- **SC-004**: In every simulated save failure, the visible and stored list match the pre-attempt state and the entered title is retained (when adding).
- **SC-005**: In every unreadable-data scenario, zero saved data is overwritten or discarded without explicit user confirmation.
- **SC-006**: Every workflow (add, complete, undo, recover) can be completed using only the keyboard, and every interactive control has an accessible name.
- **SC-007**: Users can distinguish complete from incomplete tasks at a glance, including when colour perception is limited.

## Assumptions

- Users are individuals using a single browser on one device; data stays local to that browser and is not shared.
- Tasks are displayed in the order they were added (oldest first).
- "Reset" after confirmation discards the unreadable saved data and starts with an empty list; recovering or exporting the unreadable data is out of scope.
- A failed save during a completion change reverts the displayed state to the last saved state.
- Saved data written by a previous visit is expected to be readable; no versioning or migration is required.
- Standard responsive behaviour is assumed sufficient for the single-screen layout.
- Out of scope: login, backend, cross-device sync, editing, deleting, filtering, categories, deadlines, drag-and-drop.

## Open Questions

- None blocking. Non-blocking note: because deletion is out of scope, a task can only be removed via the recovery reset; this is accepted for the workshop.