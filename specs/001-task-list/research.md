# Research: Task List

**Date**: 2026-10-21
**Feature**: [spec.md](./spec.md)

## Decisions

### Application and styling

- **Decision**: Use the requested React + TypeScript + Vite client application and plain CSS; use current mutually compatible stable package versions when the app is scaffolded.
- **Rationale**: This is the smallest direct fit for the specified one-screen browser UI and the workshop's required stack. CSS is sufficient for the layout, focus, empty state, and completion styling.
- **Alternatives considered**: UI framework or component library; rejected because the project is intentionally small and the constitution discourages unnecessary dependencies and abstractions.

### Browser persistence

- **Decision**: Store one JSON-serialized ordered array of task records in `localStorage`, using one stable key. A missing key is an empty list; read access, JSON parsing, or record-shape failures are unreadable-data states.
- **Rationale**: The specification requires persistence in the same browser and no backend or cross-device sync. A single array makes order explicit and keeps duplicate titles independent through IDs.
- **Alternatives considered**: Server/database persistence and IndexedDB; rejected because neither is needed for the specified small single-user list. Treating parse failure as an empty array was rejected because it could overwrite user data.

### Safe state updates

- **Decision**: Build and serialize a candidate list, write it synchronously, and update React state only after the write succeeds. Preserve the controlled input until a successful add write.
- **Rationale**: This makes the successful-storage value the commit point and directly enforces the constitution's no-data-loss rule for write failures.
- **Alternatives considered**: Optimistically update and roll back; rejected because rollback is more complex and risks transiently showing unsaved state. Silently falling back to memory-only operation; rejected because it would make success misleading.

### Title length

- **Decision**: Trim first, then count user-perceived characters with built-in `Intl.Segmenter` using grapheme granularity.
- **Rationale**: This satisfies the specification's explicit examples for accented characters and emoji without adding a dependency. JavaScript UTF-16 `.length` and code-point iteration do not count all combining and joined emoji graphemes as one user-perceived character.
- **Alternatives considered**: `String.length` and `Array.from`; rejected because they disagree with the stated character rule. A third-party grapheme library or custom Unicode segmentation implementation; rejected as unnecessary in the stated modern-browser target.

### Task identity

- **Decision**: Generate each task ID with the browser's native `crypto.randomUUID()`.
- **Rationale**: IDs remain independent even for duplicate titles, with no added package or title-based special cases.
- **Alternatives considered**: Use title as key; rejected because duplicate titles are allowed. Add an ID library; rejected because the browser already provides a suitable API.

### Unreadable-data recovery

- **Decision**: Keep the raw unreadable value untouched, block normal mutations, and present an accessible in-page reset confirmation. On explicit confirmation, save an empty array; if that write fails, remain in recovery.
- **Rationale**: This implements the specification's recovery and confirmation requirements without silently discarding data and keeps the interaction keyboard-operable.
- **Alternatives considered**: Automatically replace malformed content with an empty list; rejected as data loss. Proceed with mutations while unreadable data remains; rejected because subsequent writes would overwrite it.

### Testing

- **Decision**: Use Vitest with jsdom, React Testing Library, `user-event`, and `jest-dom`; supplement automated tests with a manual actual-refresh browser check.
- **Rationale**: These tools directly exercise validation, accessible user interactions, storage failures, and rendered behavior without introducing a full-browser test framework for this small app.
- **Alternatives considered**: Browser automation for every test; deferred because it adds setup and is not necessary for the requested focused unit/component coverage. The real-refresh check remains manual.

## Technical assumptions and risks

- The supported browser set is modern browsers with `Intl.Segmenter`, `crypto.randomUUID`, and `localStorage`. If the workshop needs legacy browser support, this assumption must be revisited rather than silently changing the 80-character rule.
- `localStorage` operations are synchronous but may throw, including due to access restrictions or quota limits. All reads and writes must report such failures in the UI.
- Saved data has no migration/versioning requirement in this feature. Unknown or invalid saved shapes are treated as unreadable and preserved, not migrated or replaced.
- There is no cross-tab synchronization requirement. The feature's scope is one user's list in the same browser.
