## Exact user prompt

~~~~text
Implement the mini task-list application using the existing Spec Kit tasks.

Read the project constitution, active feature specification, technical plan, supporting design artifacts and tasks.md.

Execute the existing tasks using the installed Spec Kit implementation workflow. Keep the agreed scope and stack:

- React with TypeScript and Vite.
- localStorage.
- Simple CSS without a UI framework.
- Vitest and React Testing Library.
Build the working application, including all specified validation, completion, persistence, accessibility and error-handling behavior.

Do not add extra features or silently change requirements. If a material conflict or missing decision blocks implementation, explain it and ask me.

Respect any checklist gates. Do not mark requirements-quality checklist items complete without actually reviewing them.

Verification:

1. Install the required dependencies.
2. Run the automated tests requested by the plan.
3. Run TypeScript checking.
4. Run the production build.
5. Fix failures within the agreed scope and rerun affected checks.
6. If browser tools are available, verify adding tasks, validation, duplicate task independence, completion, undo and persistence after refresh.
7. Clearly identify any browser checks you could not perform.
Do not report a check as passed unless you actually ran it successfully.

Update task completion markers according to the work actually completed.

Documentation:

Create or update README.md with:

- Prerequisites and exact installation instructions.
- Exact commands to run the app, tests, type checking and production build.
- A short explanation of the app and its local-only persistence.
- The five workshop checkpoints:
01-constitution
02-specify
03-plan
04-tasks
05-implement
- How to inspect checkpoints using git switch --detach <tag>.
- How to compare stages using git diff <earlier-tag> <later-tag>.
- How to return using git switch workshop.
- How to create a branch for live editing from a checkpoint.
- A reminder that switching Git checkpoints does not restore localStorage or installed dependencies.
- How the installed Spec Kit version selects the active feature.
Workshop records:

Create:
docs/workshop/05-implement/prompt.md

Record this exact user prompt and the actual Spec Kit command used.

Create:
docs/workshop/05-implement/result.md

Briefly explain:

- What the implementation produced.
- The main application files.
- Exact verification commands and actual results.
- Any checks still outstanding.
- What to demonstrate during the workshop.
Preserve all previous workshop folders.

Git checkpoint:

Keep this stage directly after the tasks checkpoint in the same linear history.

Commit only intended application files, dependency manifests and lockfile, tests, documentation, updated task markers, related project configuration and workshop records.

Exclude dependencies, build outputs, credentials and unrelated files.

Commit message:
workshop: implement and verify task list

Tag:
05-implement

Do not overwrite existing tags.

Ensure the workshop branch points to the final implementation commit without overwriting unrelated history. Finish on that branch.

Final verification:

- Confirm all five tags exist and identify the stages in order.
- Confirm every stage introduced its own prompt.md and result.md.
- Confirm the earlier checkpoints do not contain future application implementation.
- Confirm the final working tree has no unintended changes.
Report:

1. The exact command to start the app.
2. Test, type-check and build results.
3. Any unperformed manual checks or remaining blockers.
4. A table of the five tags and their commit hashes.
5. Current branch and Git status.
Do not invoke other Spec Kit stages. Then stop.
~~~~

## Actual Spec Kit command used

`/speckit.implement`
