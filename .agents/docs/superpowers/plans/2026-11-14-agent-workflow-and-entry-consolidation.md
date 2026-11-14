# Agent Workflow and Project Entry Consolidation Plan

> **Status: completed historical implementation record.** The checked items record the root-entry consolidation and cross-harness migration. For current paths and rules, use the root `AGENTS.md`, root `README.md`, and `.agents/` active guidance; do not treat this plan's checklist as a new task queue.

> **Original execution note:** Preserve existing project material and author edits while applying structural changes.

**Goal:** Establish README as the single project and reader entry, preserve the old chapter blueprint as internal historical material, and make `.agents/` a clear cross-harness workflow home.

**Architecture:** Keep root `AGENTS.md` concise and authoritative for shared rules. Keep detailed runbooks under `.agents/harness/`, optional task procedures under `.agents/skills/`, project truth under `.agents/canon/`, and planning/history records under `.agents/workspace/` or `.agents/docs/`. Preserve legacy content and avoid runtime-specific command assumptions.

**Tech Stack:** Markdown, local relative links, YAML skill frontmatter, shell only for existing operational procedures.

**Spec:** `.agents/docs/superpowers/specs/2026-11-14-cross-harness-project-layout.md`

## Global Constraints

- Do not delete unique project content; relocate and label it when its current role ends.
- Do not change manuscript facts, canon, or chapter mappings while reorganizing agent documentation.
- Keep harness guidance usable across Codex, Omarchy OMP, DeepSeek Harness, and other agents; runtime-specific behavior must be explicitly scoped.
- Skills use `.agents/skills/<skill-id>/SKILL.md` with `name` and `description` frontmatter.

## Review Focus

- Root links to `目录.md` after consolidation: update all active back-links and verify resolution.
- Historical blueprint presented as current reading order: label it historical and point to volume indexes.
- Historical Claude references in `legacy/`: preserve as archive and keep clearly excluded from active guidance.
- Skill code fences mistaken for scripts: retain report templates and examples; extract only complete reusable tools.

### Task 1: Consolidate the root project and reader entry

**Files:** Modify `README.md`, `AGENTS.md`; move the former root `目录.md` to `.agents/workspace/历史蓝图/第一阶段四主卷历史章节蓝图.md`; update chapter navigation and active links.

- [x] Rewrite README as the single public project overview and reading guide, including all eight volumes and known index availability.
- [x] Preserve the catalog's current contents in the historical blueprint file with a clear status banner.
- [x] Update AGENTS routing and backlinks; remove the redundant root catalog after relocating its unique content.
- [x] Update chapter navigation: first four volumes link to their formal index; later volumes link to the README's eight-volume navigation until an index is established.

### Task 2: Establish `.agents/docs/` and align active documentation

**Files:** Move `docs/` under `.agents/docs/`; modify `.agents/README.md`, `.agents/harness/README.md`, all active harness/canon/workspace indexes that reference old paths.

- [x] Keep plans/specs under `.agents/docs/superpowers/{plans,specs}/` and repair links.
- [x] Audit active `.agents/` guidance for stale paths, obsolete volume assumptions, and harness-specific commands; preserve historical archive wording.
- [x] Make workflow entry, recovery, execution, review, and status updates point to one coherent source of truth.

### Task 3: Audit skills and automation boundary

**Files:** `.agents/skills/*/SKILL.md`, `.agents/harness/08_自动化.md`, add `.agents/scripts/` only if a complete reusable script is identified.

- [x] Verify frontmatter and inspect every code fence; distinguish templates/examples from executable scripts.
- [x] Inspect all nine skills; no code fence contains a complete reusable executable script, so no `.agents/scripts/` directory was added.
- [x] Ensure optional skills and shared workflow documentation are described consistently across harnesses.

### Task 4: Verify structure and references

**Files:** All moved or edited Markdown files.

- [x] Verify every active local Markdown link resolves; exclude explicitly historical `legacy/` links from active-path requirements.
- [x] Verify volume directories, source drafts, supplements, canon, workspace, legacy archives, and the historical blueprint remain present.
- [x] Verify skill frontmatter and record the script-extraction decision; final scan found 9 valid skills and 0 structure issues.
