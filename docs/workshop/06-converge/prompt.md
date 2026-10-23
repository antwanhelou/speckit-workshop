## Exact user prompt

~~~~text
Read the
project constitution, active feature specification, technical plan, supporting
artifacts, tasks.md and implemented code.

Use the
installed Spec Kit convergence workflow to assess whether the implementation
satisfies the agreed artifacts.

Preserve the
existing scope and technical choices. Do not add new features.

Keep the
convergence assessment separate from implementation:

- Report findings accurately.
- If gaps remain, append actionable tasks through the
     standard convergence workflow.
- Do not silently repair application code.
- Do not mark unfinished tasks complete.
- Do not claim that tests or browser checks passed
     unless you actually ran them.

Workshop
records:

Create:

docs/workshop/06-converge/prompt.md

Record this
exact user prompt and the actual Spec Kit command used.

Create:

docs/workshop/06-converge/result.md

Briefly
explain:

- What convergence assessed.
- The actual verdict and findings.
- Any tasks appended.
- Checks performed and their actual results.
- The difference between implementing work and
     assessing remaining gaps.
- The main point to show during the workshop.

Preserve all
previous workshop folders and checkpoints.

Git checkpoint:

Start from the
existing completed implementation on the workshop branch. Preserve unrelated
changes and existing tags.

Commit only the
intended convergence artifacts and this stage’s workshop records.

Commit message:

workshop: assess implementation convergence

Tag:

06-converge

Do not
overwrite an existing tag.

If convergence
finds gaps, preserve the findings in this checkpoint and explain which
implementation tasks need to run next. Do not invoke implementation
automatically.

Report:

- Convergence verdict.
- Findings and appended tasks.
- Commit hash and tag.
- Current branch and Git status.

Then stop.
~~~~

## Actual Spec Kit command used

`/speckit.converge`
