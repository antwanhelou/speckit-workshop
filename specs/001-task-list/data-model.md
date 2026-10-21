# Data Model: Task List

**Feature**: [spec.md](./spec.md)

## Task

Represents one independently trackable task.

| Field | Meaning | Validation / behavior |
|---|---|---|
| `id` | Unique identity for this task | Non-empty unique string; generated independently for each task. Never derived from the title. |
| `title` | User-visible task title | Trim leading/trailing whitespace before validation and storage; contains 1–80 user-perceived grapheme characters. Internal whitespace is preserved. |
| `completed` | Whether the task is complete | Boolean; new tasks start `false`; user can toggle either direction. |

## Task List

An ordered collection of `Task` records. Array order is the display order and is
preserved when saving and loading. Equal titles are valid and do not identify or
merge records. Updating one task changes only the record with its ID.

## Persisted representation

Persist one JSON-serialized array of task records in the application's stable
`localStorage` key. No key present means no saved list and loads as an empty list.
On load, JSON must parse to an array and every entry must have a unique non-empty
ID, an already-trimmed title of 1–80 grapheme characters, and a boolean completion
value. An unreadable or invalid value is not normalized, deleted, or overwritten
during loading.

## State transitions

- **Add**: valid entered title → create an independent task with `completed: false`
  → write candidate list → on success display it and clear input; on failure keep
  previous list and entered input.
- **Complete / undo**: select one task ID → create candidate list with only that
  record's completion flag changed → write → on success display candidate; on
  failure retain previous displayed and persisted state.
- **Load**: missing key → empty list; valid serialized list → ordered task list;
  storage read, parse, or shape failure → recovery state with raw value preserved.
- **Recovery reset**: unreadable state → request explicit confirmation → if confirmed,
  write empty list → on success show empty state; on cancellation or write failure,
  preserve unreadable data and recovery state.
