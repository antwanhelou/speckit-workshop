## Exact user prompt

~~~~text
Create the feature specification for a small, single-user task-list application used in a beginner workshop.

Read and follow the existing project constitution.

User goal:
Keep a simple list of tasks and track which ones are complete.

Required behavior:

1. Show the app on one screen.
2. Let the user add a task by entering a title and submitting it.
3. Trim leading and trailing spaces before validation.
4. Accept titles between 1 and 80 characters after trimming.
5. Reject blank titles and titles longer than 80 characters, showing a clear validation message without adding a task.
6. Create new tasks as incomplete.
7. Clear the input after a successful save.
8. Allow duplicate titles, with each task remaining independent.
9. Let the user mark a task complete and undo completion.
10. Visually distinguish completed tasks.
11. Preserve tasks and completion state after refreshing in the same browser.
12. Show a clear empty state when there are no tasks.
13. If saving fails, show an error and retain the previous list, completion state and entered title as applicable.
14. If saved data is unreadable, show a recovery message without silently overwriting it. Allow an explicit reset only after user confirmation.
15. Support accessible labels and keyboard operation.
Out of scope:
Login, backend services, cross-device sync, task editing, task deletion, filtering, categories, deadlines and drag and drop.

Include clear user stories, acceptance scenarios, scope boundaries and edge cases. Include scenarios for adding, validation boundaries, independent duplicate tasks, completion and undo, refresh persistence and storage failures.

Keep this specification focused on user behavior. Do not choose frameworks, libraries, storage APIs or code structure yet.

Resolve requirements using the decisions above. If a material decision is still missing, ask me rather than inventing it. Do not invoke the clarify command.

Do not scaffold the app, install application dependencies, run planning or tasks, or implement application code.

Workshop records:

Create:
docs/workshop/02-specify/prompt.md

Record this exact user prompt and the actual Spec Kit command used.

After reviewing the specification, create:
docs/workshop/02-specify/result.md

Briefly explain:

- What this stage produced.
- The actual paths of generated or updated files.
- The main point to show during the workshop.
- Any remaining unresolved questions.
Preserve the previous stage’s workshop folder. Do not create folders for later stages.

Git checkpoint:

Keep this stage directly after the constitution checkpoint in the same linear history. If Spec Kit switches branches, preserve that history.

Commit only this stage’s intended specification outputs, related metadata or checklist updates, and workshop records.

Commit message:
workshop: define task list specification

Tag:
02-specify

Do not overwrite existing tags or include unrelated changes.

Report the specification path, commit hash, tag, current branch and Git status. Then stop.
~~~~

## Actual Spec Kit command used

`/speckit.specify`
