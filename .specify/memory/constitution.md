<!--
Sync Impact Report
Version change: unratified → 1.0.0 (initial adoption)
Modified principles: none
Added principles: I. Simplicity; II. Accessible Interaction; III. Validated Input and
Actionable Errors; IV. Safe Persistence; V. Behavior-Focused Tests; VI. Spec-to-Code
Consistency
Added sections: Scope and Constraints; Development Workflow
Removed sections: none
Follow-up TODOs: none
-->
# Task-List Application Constitution

## Core Principles

### I. Simplicity
The application MUST remain small and understandable to entry-level engineers.
Dependencies and abstractions MUST be limited to those needed for agreed behavior,
and each additional dependency or abstraction MUST have a documented justification.

### II. Accessible Interaction
Every interactive control MUST have an accessible name or label that communicates
its purpose. All functionality MUST be operable using a keyboard, with visible focus
and a logical focus order.

### III. Validated Input and Actionable Errors
The application MUST validate user input before changing or saving task data. When
input is invalid or an operation fails, it MUST explain what happened and give the
user a clear next step. Errors MUST NOT be silently discarded.

### IV. Safe Persistence
If saving fails, the application MUST preserve the user's current in-memory data
and MUST NOT replace or delete the last successfully stored data. If stored data
cannot be read or parsed, the application MUST report that condition explicitly,
preserve the unreadable data, and provide a recovery choice; it MUST NOT silently
treat the data as empty or overwrite it without user direction.

### V. Behavior-Focused Tests
Automated tests MUST cover agreed application behavior and relevant edge cases,
including validation, persistence failures, unreadable stored data, and accessible
keyboard interactions where applicable. Tests MUST be updated when agreed behavior
changes.

### VI. Spec-to-Code Consistency
Specifications, technical plans, implementation tasks, tests, and code MUST describe
the same agreed behavior. Changes that make them inconsistent MUST update the
affected artifacts in the same change; unresolved differences MUST be surfaced
before implementation proceeds.

## Scope and Constraints

This project teaches Spec-Driven Development by building a small task-list
application. The application MUST remain within that teaching scope. No particular
framework, storage mechanism, or architecture is mandated by this constitution;
choices MUST satisfy the core principles and be justified by the agreed requirements.

## Development Workflow

Work MUST progress from agreed specification to technical plan, implementation
tasks, and implementation. Each stage MUST use the preceding agreed artifacts,
record decisions needed by the next stage, and keep relevant tests aligned with
the specified behavior. Scope changes MUST be reflected in affected artifacts
before implementation relies on them.

## Governance

This constitution governs project specifications, plans, tasks, implementation,
and review. Amendments MUST be proposed as explicit changes, reviewed and approved
by the project owner, and reflected in any affected project artifacts. Every
specification, plan, task list, implementation, and review MUST check compliance;
any requested exception MUST be documented and approved before it is applied.

Constitution versions follow semantic versioning. A MAJOR increment is required
for backward-incompatible governance changes or removal/redefinition of a
principle. A MINOR increment is required for a new principle or materially expanded
guidance. A PATCH increment is required for clarifications and non-semantic
wording corrections.

**Version**: 1.0.0 | **Ratified**: 2026-10-21 | **Last Amended**: 2026-10-21
