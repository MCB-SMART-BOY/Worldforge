# Cross-Harness Project Layout Implementation Plan

> **Status: completed historical implementation record.** The checked steps document the prior migration. Current paths and workflow rules live in root `AGENTS.md` and `.agents/README.md`.

> **历史执行记录**：本计划已完成。下方步骤仅记录当时的实施范围与结果；不要将其作为当前待办或运行时指令。后续变更从当前用户目标与根目录 `AGENTS.md` 出发。

**Goal:** Move all eight volumes to the repository root and convert the project guidance, workflow, and skills into a shared Codex / Omarchy OMP / DeepSeek Harness layout.

**Architecture:** Keep one shared root `AGENTS.md`, on-demand `.agents/harness/` references, and standard `.agents/skills/<id>/SKILL.md` skills. Preserve existing project knowledge and archive Claude-only originals where conversion would otherwise discard information.

**Tech Stack:** Markdown, YAML frontmatter, filesystem moves, shell-based path and link inventory.

**Spec:** `.agents/docs/superpowers/specs/2026-11-14-cross-harness-project-layout.md`

## Global Constraints

- Preserve every existing file's content unless a path or harness instruction needs conversion.
- Do not reset, stage, commit, or overwrite the pre-existing uncommitted narrative/review work.
- Do not edit the 804 volume documents' prose.
- Keep one shared source of truth; do not create duplicate harness-specific copies.
- Archive Claude-only settings and old root instructions; do not silently discard them.

## Review Focus

- Relative links from `.claude` knowledge folders to volumes must account for volumes moving one directory upward.
- Existing intra-volume chapter links must remain unchanged and resolve after the folder move.
- Skill IDs and references in workflow tables must match the new skill directory names.
- Historical documents can mention old layout as history, but active instructions must not direct agents to obsolete paths.
- Root instructions must reflect current eight-volume layout without making unsupported claims about chapter mapping or progress.

---

### Task 1: Preserve an inventory and establish shared entry points

**Files:**
- Create: `.agents/docs/superpowers/specs/2026-11-14-cross-harness-project-layout.md`
- Create: `.agents/docs/superpowers/plans/2026-11-14-cross-harness-project-layout.md`
- Create: `AGENTS.md`
- Modify: `README.md`, `.agents/workspace/历史蓝图/第一阶段四主卷历史章节蓝图.md`

- [x] Record volume names/counts, `.claude` areas, skills, and current changed-file counts before moving.
- [x] Add the approved design and this plan without touching existing user work.
- [x] Write concise current project instructions and update root navigation to point at the new layout.

### Task 2: Move volumes and shared project knowledge without loss

**Files:**
- Move: `正文/01_驭器卷` through `正文/08_求式卷` to repository root.
- Move: `.claude/canon`, `.claude/harness`, `.claude/supplements`, `.claude/workspace` under `.agents/`.
- Move: `.claude/README.md` to `.agents/README.md`.
- Archive: old `CLAUDE.md` and `.claude/settings.json` under `.agents/legacy/`.

- [x] Move directories in place, preserving every file and content.
- [x] Create archive notes that state those files are retained for reference and not active shared configuration.
- [x] Confirm source and destination file counts and remove the now-empty `正文/` container.

### Task 3: Convert skills and harness workflow language

**Files:**
- Move: nine flat skill Markdown files to `.agents/skills/<id>/SKILL.md`.
- Modify: `.agents/harness/*.md`, `.agents/canon/*.md`, `.agents/workspace/*.md`, `.agents/supplements/**/*.md`, `.agents/README.md` as needed.

- [x] Convert each skill's command metadata to required `name` and `description` YAML frontmatter; retain and adapt its procedural content.
- [x] Replace Claude slash-command assumptions with harness-neutral instructions to invoke/read the named skill.
- [x] Update active path references from `.claude/` and `正文/` and repair relative links affected by the volume move.
- [x] Keep archived historical sources clearly separated from active workflow guidance.

### Task 4: Finalize references and perform migration audit

**Files:**
- Modify: `AGENTS.md`, `README.md`, `.agents/workspace/历史蓝图/第一阶段四主卷历史章节蓝图.md`, and any remaining active references.

- [x] Search active documents for old layout and Claude-only operational instructions; inspect remaining matches.
- [x] Resolve every local Markdown link in migrated active materials, checking paths from the referring file's new location.
- [x] Compare volume file counts and hashes before/after; all 808 files remain, and the 486 hash changes correspond to migrated link targets.
- [x] Confirm all nine skill IDs have one `SKILL.md`, matching frontmatter, and harness references.
- [x] Record verification results; preserved Claude originals are explicitly archived under `.agents/legacy/`.
