# .claude/ — Internal Reference Architecture

This directory contains all internal reference material for the 万构界 project. Everything here is for the **author and Claude Code** — it is NOT reader-facing.

## Why .claude/

- **Clean root**: The project root only shows chapters (`正文/`), README, LICENSE, and chapter index
- **Separation of concerns**: Author tooling lives here; prose lives in `正文/`
- **Claude-native**: Skills, canon, workspace, harness are all directly accessible to Claude Code

## Directory Map

| Directory | Was | Contains | Key Entry Points |
|---|---|---|---|
| `harness/` | 🆕 | **Harness engineering system** — pipeline, state machine, quality gates, command center | `harness/README.md` |
| `canon/` | `设定总集/` | Worldbuilding canon (00–24) | `canon/00_总览与使用说明.md`, `canon/15_设定扩展与写作铁律.md` |
| `skills/` | `.claude/skills/` | 9 custom Claude Code slash commands | `skills/review-chapter.md` |
| `supplements/` | `卷外配套/` | Teaching practice sheets, milestone tables, term indexes | `supplements/00_配套索引.md` |
| `workspace/` | `主卷/*/` (non-prose) | Per-volume characters, chapter outlines, body design, research notes | `workspace/00_工作区说明.md` |

## Architecture

```
┌─────────────────────────────────────────────┐
│               HARNESS (编排层)                │
│  流水线 → 状态机 → 质量门 → 命令中心            │
│  会话协议 · 模板注册 · 进度面板 · 自动化         │
│  集成验证 · 运维手册                            │
└─────────────────────────────────────────────┘
         │            │            │
    ┌────┴────┐  ┌────┴────┐  ┌────┴────┐
    │  CANON  │  │ SKILLS  │  │WORKSPACE│
    │  规则库  │  │  工具集  │  │  工作区  │
    └─────────┘  └─────────┘  └─────────┘
         │            │            │
         └────────────┼────────────┘
                      ▼
              ┌──────────────┐
              │  正文 (产出)   │
              └──────────────┘
```

## Key Files by Purpose

### Harness (harness/) — 🆕 Engineering Workflow System

The harness is the **orchestration layer** that connects canon, skills, and workspace into a systematic engineering pipeline.

| File | Purpose |
|------|---------|
| `harness/README.md` | Harness overview and quick start |
| `harness/00_架构总图.md` | Full system architecture: components, data flow, dependencies |
| `harness/01_流水线.md` | Chapter writing pipeline: 章纲→设计→写作→审阅→提交 |
| `harness/02_状态机.md` | Artifact lifecycle: states and transitions for all output types |
| `harness/03_质量门.md` | Quality gates: pass/fail criteria at each pipeline stage |
| `harness/04_命令中心.md` | Command routing: which task → which skill/tool |
| `harness/05_模板注册表.md` | Central template registry with versions and dependencies |
| `harness/06_会话协议.md` | Session protocol: start, continue, end with minimal context |
| `harness/07_进度面板.md` | Progress dashboard: all 480 chapters tracked |
| `harness/08_自动化.md` | Automation scripts, git hooks, batch operations |
| `harness/09_集成验证.md` | Cross-volume consistency verification |
| `harness/10_运维手册.md` | Maintenance: adding volumes, updating canon, disaster recovery |

### Worldbuilding (canon/)
- `00_总览与使用说明.md` — Overview and recommended reading order
- `01_万构界总纲与四相法则.md` — Four phases and four corrosions
- `02_对象层级_机构_域与宿域.md` — Object hierarchy, institutions, domains
- `15_设定扩展与写作铁律.md` — Writing constitution (iron laws)
- `23_四卷120章总蓝图.md` — 120-chapter master blueprint for all four volumes
- `24_世界术语-现实工程对照表.md` — CS term → English original mapping

### Per-Volume Workspace (workspace/XX_YY卷/)
- `00_卷索引.md` — Volume hub (character roster, chapter summaries with one-liners, progress tracking, navigation)
- `人物/` — Character cards (9-section template)
- `章纲/` — Formal chapter outlines and progress tracking
- `正文设计/` — Reading guides, sample scenes, climax drafts, structural design
- `资料/` — Incident prototypes, project archives, legacy asset inventories, bridge retirement calendars, logic reviews

### Skills (skills/)
9 custom skills that encode the project's writing rules into executable checklists and templates.

### Teaching (supplements/)
Per-volume practice sheets, milestone tables, and term indexes.

## Cross-Volume Characters

These characters appear across multiple volumes:
- **苏野平** — 明契卷 → 驭器卷 (协查跨道依赖)
- **程知序** — 明契卷 → 驭器卷、简阵卷
- **闻衡** — 明契卷 → 驭器卷 (校验边界)
- **顾迁衡** — 明契卷 (渡桥人)
- **顾迁舟** — 化形卷 → 驭器卷 (渡桥人)

## Quick Start: Writing a Chapter

1. Check `harness/07_进度面板.md` → find next chapter to write
2. Check `harness/02_状态机.md` → confirm current state
3. Follow `harness/01_流水线.md` pipeline: Prepare → Design → Write → Review → Commit
4. Pass quality gates at each stage (`harness/03_质量门.md`)
5. Update progress after commit

## Quick Start: Continuing from Last Session

1. Read `harness/06_会话协议.md` §恢复会话
2. Read `harness/07_进度面板.md` → locate unfinished work
3. Start from the earliest chapter with status `待写` or `草稿`

## Maintaining This Structure

When adding new content:
1. Worldbuilding → `canon/`
2. Character cards, outlines, design docs, research → `workspace/XX_YY卷/` 
3. Teaching practice sheets → `supplements/XX_YY卷/`
4. New skills → `skills/`
5. Pipeline/stage/check updates → `harness/`

**Never put internal reference material at the project root.** The root is for chapter prose only.
