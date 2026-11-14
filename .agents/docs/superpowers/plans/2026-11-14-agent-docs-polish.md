# Agent Documentation and Workflow Polish Plan

> **Status: complete (2026-11-14).** Root `README.md` now combines current project/reader navigation; the former `目录.md` design remains archived with historical status. Preserve project material and do not turn archive records into current instructions.

**Goal:** Make the project entry points and all active `.agents/` guidance concise, consistent, and usable across Codex, Omarchy OMP, and DeepSeek Harness.

**Architecture:** Keep root `README.md` as the reader/project overview and root `AGENTS.md` as the shared agent contract. Keep `.agents/README.md` as the only agent-material map; retain the former `目录.md` content only as a clearly historical blueprint where it carries unique design history. Make harness workflow documents complementary, skills task-focused, and current state traceable to one live ledger.

**Tech Stack:** Markdown, relative links, existing skill frontmatter; no new runtime or automation dependency.

**Spec:** `.agents/docs/superpowers/specs/2026-11-14-cross-harness-project-layout.md` plus the user's approved directory layout and current request.

## Global Constraints

- Preserve unique manuscript, canon, workspace, and archive material; do not delete uncertain or historical content.
- Shared guidance must not depend on Claude-specific commands or assume all harnesses expose identical skill and multi-agent interfaces.
- Keep reader-facing navigation separate from agent operating instructions.
- Do not create scripts unless a complete, repeated, maintainable operation exists and has a clear owner and invocation path.
- Do not run software tests; validate documentation paths, structure, wording consistency, and diff hygiene.

## Review Focus

- Root `README.md`, root `AGENTS.md`, and `.agents/README.md` each have a distinct audience and should not duplicate whole sections.
- The historical root catalog/`目录.md` material must not appear to be a second active reading index.
- Workflow phases, state transitions, quality gates, session recovery, and multi-agent handoff must point to each other without restating conflicting rules.
- Skill triggers and frontmatter must remain valid, and Markdown examples/templates must not be mistaken for executable scripts.
- Active links and references must resolve after edits; historical Claude material must remain clearly archived.

---

### Task 1: Audit and define source-of-truth boundaries

**Files:** Root `README.md`, root `AGENTS.md`, `.agents/README.md`, `.agents/{canon,harness,skills,workspace,supplements,docs,legacy}/`.

- [x] Compare entry points and indexes; identify duplicated, stale, unclear, or contradictory active statements.
- [x] Review all nine skills and all harness documents; identify complete reusable code separately from examples and report templates.
- [x] Record only verified findings; keep historical audit assertions in their dated scope.

### Task 2: Revise active guidance and route documents

**Files:** Edit only files whose active role needs clarification or correction; retain all unique archive material.

- [x] Keep root reader and agent entry points distinct and remove any second active catalog role.
- [x] Align workflow entry, skill routing, recovery, quality gates, state updates, and harness-specific adaptation.
- [x] Improve skill language and references where evidence shows a specific problem; preserve valid frontmatter and scope.
- [x] Extract a script only if audit confirms a complete, reusable operation with a documented call site. No such skill script was found.

### Task 3: Verify the documentation system

**Files:** All edited guidance plus link targets.

- [x] Resolve all local Markdown links in active project documentation; report archive-only historical links separately.
- [x] Check all nine skill frontmatter blocks and scan for stale active Claude paths, old root `目录.md` links, and conflicting status claims.
- [x] Review `git diff --check` and summarize retained unresolved or historical items without changing their meaning.
