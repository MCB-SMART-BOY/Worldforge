# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Identity

《万构界》(Worldforge) is a Chinese-language novel series set in a world driven by **engineering civilization**, not magic. Each volume personifies a programming language as a "道" (Dao/Path) — C++, Python, Go, Rust — and tells stories about complexity, time, collaboration, debt, and inheritance through their engineering cultures. The core question: **"Do those who come after still have a road to walk?"**

This is a **writing project** — all files are Markdown. There is no build, lint, or test system.

## Repository Rules

- **Never add `Co-Authored-By: Claude` or any AI/Claude attribution to git commits.** All commits are authored solely by the human author. No exceptions.

## Directory Layout

```
万构界/
├── CLAUDE.md                  # Claude Code agent config (this file)
├── README.md                  # Public project overview
├── 目录.md                    # Complete chapter index (480 chapters, 120/卷)
├── LICENSE
├── .gitignore
├── 正文/                      # Chapter prose — the only reader-facing content
│   ├── 01_驭器卷/             # 120 C++ chapters
│   ├── 02_化形卷/             # 120 Python chapters
│   ├── 03_简阵卷/             # 120 Go chapters
│   └── 04_明契卷/             # 120 Rust chapters (+ prologue)
└── .claude/                   # All internal reference material
    ├── README.md              # Internal architecture overview
    ├── settings.json          # Project-level Claude Code config
    ├── harness/               # Harness engineering system (12 files)
    ├── canon/                 # Worldbuilding canon (files 00–24)
    ├── supplements/           # Teaching practice sheets (was 卷外配套/)
    ├── workspace/             # Per-volume characters, outlines, design, research
    │   ├── 00_工作区说明.md
    │   ├── 01_驭器卷/{00_卷索引,人物,章纲,正文设计,资料}/
    │   ├── 02_化形卷/{00_卷索引,人物,章纲,正文设计,资料}/
    │   ├── 03_简阵卷/{00_卷索引,人物,章纲,正文设计,资料}/
    │   └── 04_明契卷/{00_卷索引,人物,章纲,正文设计,资料}/
    └── skills/                # 9 custom Claude Code skills

**Key principle**: Everything outside `正文/` is internal tooling. The root is clean — only chapters, README, LICENSE, and chapter index.

## Available Skills

This project has 9 custom skills in `.claude/skills/`. Each skill encodes the project's writing rules — simultaneously checking **logical correctness** (engineering first) and **dramatic tension** (reader experience).

| Skill | Use | Axis |
|---|---|---|
| `/review-chapter` | Audit a chapter: iron laws + 6-beat structure + **dramatic tension** + reader accessibility | 逻辑 + 张力 |
| `/design-chapter` | Generate a chapter blueprint: 6-step workflow + **tension curve** + reveal rhythm | 逻辑 + 张力 |
| `/gen-character` | Generate a character card: 9-section template + **dramatic conflict potential** | 逻辑 + 张力 |
| `/craft-scene` | **NEW** Scene-level dramatic construction: tension building, reveal timing, emotional beats | 张力 |
| `/gen-entry` | **NEW** Generate world-intro materials: world primer, volume entry, chapter zero, reading guide, glossary-lite | 入门 |
| `/check-canon` | Verify new content doesn't break worldbuilding rules + **reader cognitive load check** | 逻辑 + 入门 |
| `/gen-practice` | Generate a 卷外配套 practice sheet with **narrative scenarios** (not just CLI steps) | 教学 |
| `/audit-volume` | Full-volume review: plot logic + terms + teaching + **pacing & reader journey mapping** | 逻辑 + 张力 |
| `/check-cross-volume` | Verify cross-volume references obey four iron laws + **entry accessibility for new readers** | 逻辑 + 入门 |

## Internal Reference Map

| `.claude/` Directory | Contains |
|---|---|
| `harness/` | Harness engineering system — pipeline, state machine, quality gates, command center |
| `canon/` | Worldbuilding canon: laws, history, terminology, writing iron laws (files 00–24) |
| `supplements/` | Teaching supplements: per-chapter practice sheets, milestone tables, term indexes |
| `workspace/` | Per-volume: character cards, chapter outlines, body design docs, research notes |
| `skills/` | Claude Code skill definitions |

When you need to read worldbuilding rules, start at `.claude/canon/`. When you need character cards or outlines, look in `.claude/workspace/XX_YY卷/`.

## The Four Volumes

| # | Volume | Language | Core Project | Chapters | Status |
|---|---|---|---|---|---|
| 1 | 驭器卷 | C++ | 玄枢 | 120 | ✅ 正文完成 |
| 2 | 化形卷 | Python | 息壤 | 120 | ✅ 正文完成 |
| 3 | 简阵卷 | Go | 驿河 | 120 | ✅ 正文完成 |
| 4 | 明契卷 | Rust | 青炉 | 120 + 序章 | ✅ 正文完成 |

Reading/writing order: **驭器 → 化形 → 简阵 → 明契**

Together: **见病 → 追根 → 反照 → 结账 → 传火** (see the disease in ancient strata → trace the root through modern layers → reflect between platforms → settle the account at the culmination → pass the flame)

## Per-Volume Workspace Structure

Each volume under `.claude/workspace/` follows a five-layer structure:

1. `00_卷索引.md` — Volume hub (character roster, chapter summaries, navigation)
2. `人物/` — Character cards (9-section template)
3. `章纲/` — Formal chapter outlines and progress tracking
4. `正文设计/` — Reading guides, sample scenes, climax drafts, structural design
5. `资料/` — Incident prototypes, project archives, legacy asset inventories

Chapter prose lives at `正文/XX_YY卷/`.

## Core Worldview: 四相 (Four Phases) and 四蚀 (Four Corrosions)

Everything is judged through four phases:
- **式** — structure, boundaries, skeleton, classification
- **流** — resources, runtime, state, cost, contention
- **契** — promises, documentation, tests, rules, collaboration
- **史** — versions, migration, compatibility, release, inheritance

When a phase fails, it becomes a corrosion (蚀):
- **失式** — structural collapse
- **乱流** — resource/state chaos
- **背契** — broken promises
- **断史** — severed history

Accumulated corrosions grow into higher-level pathologies: **黑箱化** (black-boxing), **继承失能** (inheritance failure), **断桥潮** (bridge-breaking tide).

## Writing Iron Laws

These are the constitution. All new content must satisfy them. Full text at `.claude/canon/15_设定扩展与写作铁律.md`.

### Supreme Rulings
1. **先工程，后修辞** — Engineering first, rhetoric second
2. **一切设定都要可失守** — Every worldbuilding element must have a failure mode
3. **一切成长都写成责任升级，不写成战力升级** — All growth is responsibility escalation, never power escalation

### Worldbuilding Constraints
- Never add a fifth phase unless the existing four absolutely cannot explain it
- New concepts must hang off existing skeletons (式/流/契/史/域/层级链/核心机构)
- Every new concept must answer: "what does it look like when it breaks?"
- **Never replace real engineering terms** (Cargo, crate, trait, Result, CI, tracing, service, etc.) — worldbuilding terms explain these things' place in civilization, they do not rename them
- **中文专有名词每次出现必须注英文原名** — All CS/math/engineering terms expressed in Chinese must carry their standard English name on **every** occurrence. Reference: `.claude/canon/24_世界术语-现实工程对照表.md`. Format: "所有权（ownership）", "健康检查（health check）"
- Prioritize engineering conflicts over fantasy confrontations

### Chapter Design Workflow (6 steps)
1. Determine the chapter's core object layer (念/约/图/文/骨/器/阵/门/史)
2. Determine the chapter's core phase (式/流/契/史)
3. Determine the failure mode being fought (失式/乱流/背契/断史)
4. Determine the real engineering topic (e.g., Cargo, ownership, testing, tracing)
5. Write a worldview entry line that bridges engineering and world
6. Return to real engineering terms — the chapter body must use real technical language

### Universal Chapter Structure (6 beats)
1. Problem surfaces first
2. Why it hurts in real engineering
3. Introduce the relevant language feature, toolchain, or method
4. Ground it in a concrete project/artifact
5. Review from team, maintenance, and inheritance perspectives
6. Close with a higher-level judgment

### Cross-Volume Rules
1. Cross-references can only enrich, never make another volume a prerequisite
2. Shared events must be retold from each volume's protagonist's cost and pathology
3. Cross-volume concepts must be adequately explained on first appearance in each volume
4. Volume-end interfaces point to "future amplification" or "reflection from the other side," never "you must read the previous volume first"

### The Three Self-Check Questions (apply to every scene)
1. 🩻 Which of the four corrosions is this scene settling?
2. 😣 On whom does the cost fall?
3. 🛤️ Does this scene make the road more walkable for those who come after?

If you can't answer at least two, the scene likely hasn't connected to the world's core.

## Naming Conventions

- Series name: **万构界** (fixed)
- Volume titles: **《万构界·X卷》** (e.g., 《万构界·明契卷》)
- **Never use** `xx百炼成仙` as a main title — it's a deprecated working name only
- Subtitles carry literary flavor and volume soul; language names go in supplementary descriptions, not titles

## File Naming Patterns

- Chapter files: `第XX章_标题_副标题.md` (e.g., `第01章_凡火未明_问题从何而来.md`)
- Character files: `##_角色类型_暂名XXX.md` (e.g., `01_主角_暂名沈见微.md`)
- Index files: `00_XX索引.md`
- Reference materials: `##_描述性名称.md`

## Current Status (as of 2026-06-19)

All four volumes — **480 chapters complete**. First phase of the 万构界 project finished.

| Volume | Language | Chapters | 章纲 | 正文 |
|---|---|---|---|---|
| 驭器卷 | C++ | 120 | ✅ | ✅ |
| 化形卷 | Python | 120 | ✅ | ✅ |
| 简阵卷 | Go | 120 | ✅ | ✅ |
| 明契卷 | Rust | 120 | ✅ | ✅ |

Current priority tasks:
1. ~~Write prose (正文) — expand all volumes to 120 chapters~~ ✅ DONE
2. 卷外配套 — expand teaching practice sheets for new chapters
3. 全系列审阅 — cross-volume review, terminology consistency, pacing audit
4. 入门材料 — generate world primer, volume entries, reading guides for new readers

## Conflict Resolution Order

When new content conflicts with existing files, defer to:
1. `.claude/canon/01–05` — foundational worldbuilding
2. `.claude/canon/08–12` — volume-level settings (驭器/化形/简阵/明契)
3. `.claude/canon/23` — 120-chapter master blueprint
4. `.claude/canon/24` — CS/math term → English original mapping (铁律四之补充)
5. `.claude/canon/15` — expansion and writing iron laws
