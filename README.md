# Task List (Spec Kit workshop)

A small, single-user task-list app built with React, TypeScript and Vite to teach Spec-Driven Development. You can add tasks, mark them complete and undo completion. Tasks are saved only in your browser's `localStorage`: nothing is sent to a server, and data is not shared between browsers or devices.

If saved data is unreadable, the app shows a recovery message, leaves the data untouched, and only resets it after you confirm.

## Prerequisites

- Node.js 22.12 or newer (includes npm)
- Git

## Install

```powershell
npm ci
```

Use `npm install` if you have no `package-lock.json` yet.

## Commands

| Purpose | Command |
|---|---|
| Run the app (prints a local URL, usually http://localhost:5173/) | `npm run dev` |
| Run the automated tests once | `npm test` |
| Type-check | `npm run typecheck` |
| Production build | `npm run build` |

## Workshop checkpoints

Each stage is a Git tag on the `workshop` branch, in order:

1. `01-constitution`
2. `02-specify`
3. `03-plan`
4. `04-tasks`
5. `05-implement`

Inspect a checkpoint (read-only, detached HEAD):

```powershell
git switch --detach 03-plan
```

Compare two stages:

```powershell
git diff 02-specify 03-plan
```

Return to the latest work:

```powershell
git switch workshop
```

Create a branch for live editing from a checkpoint:

```powershell
git switch -c my-live-edit 03-plan
```

Switching checkpoints does **not** restore your browser's `localStorage` or your installed dependencies (`node_modules`). Clear site data manually if old tasks are in the way, and re-run `npm ci` after checking out a checkpoint that changes `package.json`.

## How Spec Kit selects the active feature

The installed Spec Kit (1.2.3.dev0) reads `.specify/feature.json`, which holds `{"feature_directory": "specs/001-task-list"}`. Its scripts use that folder for the spec, plan, tasks and related artifacts. It is not derived from the Git branch name, so the `workshop` branch works with the `001-task-list` feature.

Workshop stage prompts and results live in `docs/workshop/`.
