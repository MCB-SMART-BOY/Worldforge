# .claude/ — Internal Reference Architecture

This directory contains all internal reference material for the 万构界 project. Everything here is for the **author and Claude Code** — it is NOT reader-facing.

## Why .claude/

- **Clean root**: The project root only shows chapters (`主卷/*/正文/`), README, LICENSE, and chapter index
- **Separation of concerns**: Author tooling lives here; prose lives in `主卷/*/正文/`
- **Claude-native**: Skills, canon, and workspace are all directly accessible to Claude Code

## Directory Map

| Directory | Was | Contains | Key Entry Points |
|---|---|---|---|
| `canon/` | `设定总集/` | Worldbuilding canon (00–23) | `canon/00_总览与使用说明.md`, `canon/15_设定扩展与写作铁律.md` |
| `supplements/` | `卷外配套/` | Teaching practice sheets, milestone tables, term indexes | `supplements/00_配套索引.md` |
| `workspace/` | `主卷/*/` (non-prose) | Per-volume characters, chapter outlines, body design, research notes | `workspace/00_工作区说明.md` |
| `skills/` | `.claude/skills/` | 7 custom Claude Code slash commands | `skills/review-chapter.md` |

## Key Files by Purpose

### Worldbuilding (canon/)
- `00_总览与使用说明.md` — Overview and recommended reading order
- `01_万构界总纲与四相法则.md` — Four phases and four corrosions
- `02_对象层级_机构_域与宿域.md` — Object hierarchy, institutions, domains
- `15_设定扩展与写作铁律.md` — Writing constitution (iron laws)

### Per-Volume Workspace (workspace/XX_YY卷/)
- `00_卷索引.md` — Volume hub (character roster, chapter summaries with one-liners, navigation)
- `人物/` — Character cards (9-section template: basics → narrative → pathology → dao-heart → arc → language → relationships → volume role → one-line summary)
- `章纲/` — Formal chapter outlines and progress tracking
- `正文设计/` — Reading guides, sample scenes, climax drafts, structural design
- `资料/` — Incident prototypes, project archives, legacy asset inventories, bridge retirement calendars, logic reviews

### Skills (skills/)
7 custom skills that encode the project's writing rules into executable checklists and templates.

## Cross-Volume Characters

These characters appear across multiple volumes:
- **苏野平** — 明契卷 → 驭器卷 (协查跨道依赖)
- **程知序** — 明契卷 → 驭器卷、简阵卷
- **闻衡** — 明契卷 → 驭器卷 (校验边界)
- **顾迁衡** — 明契卷 (渡桥人)
- **顾迁舟** — 化形卷 (渡桥人)

## Maintaining This Structure

When adding new content:
1. Worldbuilding → `canon/`
2. Character cards, outlines, design docs, research → `workspace/XX_YY卷/` 
3. Teaching practice sheets → `supplements/XX_YY卷/`
4. New skills → `skills/`

**Never put internal reference material at the project root.** The root is for chapter prose only.
