## Exact user prompt

~~~~text
Create the technical implementation plan for the existing mini task-list specification.

Read the project constitution and the active feature specification. Preserve the agreed scope and behavior.

Use this stack:

- React with TypeScript and Vite.
- Browser localStorage for persistence.
- Simple CSS without a UI framework.
- Vitest and React Testing Library for automated tests.
Keep the architecture small and understandable for entry-level engineers. Avoid unnecessary dependencies, state-management libraries and abstractions.

Plan the following:

1. A single screen containing the task-entry form, validation messages, empty state and task list.
2. Tasks with independent IDs, a title and a completion flag.
3. Title trimming and validation according to the specification.
4. Adding tasks, completion and undo completion.
5. Loading and saving tasks and completion state.
6. Persistence failure handling that preserves previous state and entered input as applicable.
7. Safe handling of unreadable stored data, with an explicit reset requiring confirmation.
8. Accessible labels, keyboard operation and a visible completion state.
Explicitly include automated tests for:

- Valid titles.
- Empty and whitespace-only titles.
- Leading and trailing whitespace.
- The 80 and 81 character boundaries after trimming.
- Adding a task and clearing the input after a successful save.
- Duplicate titles with independent completion state.
- Completion and undo.
- Loading and saving persisted tasks.
- Save failures without losing previous state or entered input.
- Unreadable saved data and confirmed or cancelled reset behavior.
Include a manual browser check for persistence after an actual page refresh.

Generate the technical plan and supporting design artifacts required by the installed Spec Kit workflow. Use the actual feature paths.

Do not change requirements silently. If a technical constraint conflicts with the specification, report it and stop for clarification.

Do not scaffold the application, install application dependencies, generate implementation tasks or implement code yet.

Workshop records:

Create:
docs/workshop/03-plan/prompt.md

Record this exact user prompt and the actual Spec Kit command used.

After reviewing the plan, create:
docs/workshop/03-plan/result.md

Briefly explain:

- What this stage produced.
- The actual paths of generated or updated files.
- The main technical choices and their purpose.
- The difference between the behavioral specification and this technical plan.
- The main point to show during the workshop.
Preserve previous workshop folders. Do not create folders for later stages.

Git checkpoint:

Keep this stage directly after the specification checkpoint in the same linear history.

Commit only this stage’s intended plan, supporting design artifacts, related configuration or agent-context updates, and workshop records.

Commit message:
workshop: plan task list implementation

Tag:
03-plan

Do not overwrite existing tags or include unrelated changes.

Report the plan path, supporting artifact paths, commit hash, tag, current branch and Git status. Then stop.
~~~~

## Actual Spec Kit command used

`/speckit.plan`
