## Exact user prompt

~~~~text
Generate the implementation tasks for the existing mini task-list feature.

Read the project constitution, active feature specification, technical plan and supporting design artifacts.

Follow the existing decisions. Do not introduce new features or change the stack.

Create an actionable tasks.md in the active feature directory using the installed Spec Kit workflow.

The tasks must cover:

- React, TypeScript and Vite project setup.
- Test setup with Vitest and React Testing Library.
- Task data structure and independent identifiers.
- Title trimming and validation.
- Adding tasks and clearing the input after successful saving.
- Independent tasks with duplicate titles.
- Completion and undo completion.
- Persistence after refresh.
- Save-failure handling that preserves previous state and entered input as applicable.
- Unreadable saved data and reset confirmation.
- Accessible controls, validation messages, empty state and completed-task styling.
- Basic README instructions.
- Tests, type checking and production build verification.
Include the automated tests explicitly requested in the technical plan, including title boundaries, persistence errors and reset behavior.

Include a manual browser-refresh check.

Order tasks by dependencies. Make each task concrete enough for an entry-level engineer to understand, while keeping the work list proportional to this small app.

Review coverage against the specification and plan. If they conflict or a material decision is missing, report the issue instead of silently inventing a solution.

Do not scaffold the application, install application dependencies, write application code or tests, or invoke implementation yet. This stage creates the work list only.

Workshop records:

Create:
docs/workshop/04-tasks/prompt.md

Record this exact user prompt and the actual Spec Kit command used.

After reviewing the tasks, create:
docs/workshop/04-tasks/result.md

Briefly explain:

- What this stage produced.
- The actual path of tasks.md.
- How the tasks connect to the specification and plan.
- The main point to show during the workshop.
- Any unresolved coverage gaps.
Preserve previous workshop folders. Do not create the implementation-stage folder yet.

Git checkpoint:

Keep this stage directly after the plan checkpoint in the same linear history.

Commit only this stage’s intended task artifacts and workshop records.

Commit message:
workshop: break implementation into tasks

Tag:
04-tasks

Do not overwrite existing tags or include unrelated changes.

Report the tasks path, commit hash, tag, current branch and Git status. Then stop.
~~~~

## Actual Spec Kit command used

`/speckit.tasks`
