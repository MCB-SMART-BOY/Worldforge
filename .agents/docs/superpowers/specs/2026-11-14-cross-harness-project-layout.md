# 跨 Harness 项目布局设计

> **状态：已实施的历史设计记录。** 此文档保留迁移前的目标和约束；如其中的路径或规则描述与当前根 `AGENTS.md`、`.agents/README.md`、`.agents/harness/` 不同，以现行指引为准。

## 目标

将小说项目整理为 Codex、Omarchy OMP、DeepSeek Harness 可共用的一份项目指令、设定、工作流和技能资料，并将八卷从 `正文/` 移至项目根目录。

## 目录方案

```text
AGENTS.md
01_驭器卷/ … 08_求式卷/
.agents/
  canon/
  harness/
  skills/<skill-id>/SKILL.md
  supplements/
  workspace/
  legacy/
```

- 根 `AGENTS.md` 是短入口，说明项目结构、硬性写作规则、资料优先级和任务到流程/技能的路由。
- `.agents/harness/` 保存完整手册、状态机、质量门、进度资料和操作流程；由入口按需引导读取。
- `.agents/skills/<skill-id>/SKILL.md` 保存可选择调用的九项能力，每份含 `name`、`description` frontmatter。
- `.agents/canon/`、`supplements/`、`workspace/` 保留现有内容和相对层级。
- 原 `CLAUDE.md`、Claude `settings.json` 及无法安全通用化的旧材料移入 `.agents/legacy/` 归档，不让过时兼容文件成为活动入口。
- 所有卷目录直接位于根目录，名称与卷号不变；卷内文件名和正文内容不因搬迁而改动。

## 迁移约束

1. 搬迁前后文件内容必须保留；除明确的指令格式转换和路径修复外，不编辑小说正文。
2. 不清理任何已有未提交更改，不重置、不暂存、不提交。
3. 不复制成多套 harness 专属规则；只在确实有 harness 原生运行时配置需求时新增专属配置。
4. 批量路径更新必须核对上下文和链接层级，不能仅以全局替换结果作为成功依据。
5. 原设计阶段以 `.claude/workspace/正文全卷审校进度.md` 所载内容作为迁移证据；该文件现位于 `.agents/workspace/正文全卷审校进度.md`。历史快照不提升为当前状态。
6. 不删除 Claude 设置：将其归档并标明不作为共享设置加载。旧 `CLAUDE.md` 归档；新 `AGENTS.md` 以现行资料重写。

## 验收标准

- 八卷在根目录，`正文/` 已空且不再作为路径前缀使用。
- `.agents/` 包含原设定、工作区、补充材料和 harness 手册；九项技能使用标准目录结构和 frontmatter。
- 根入口不含 Claude 专属命令或陈旧四卷/480章现状。
- 活动文档中不存在误导性的 `.claude/`、`正文/`、slash-command-only 工作流路径；归档中的历史原文可保留旧称并被明确标记为 archive。
- 所有迁移相关 Markdown 本地链接目标均可解析，目录索引和 README 入口指向新位置。
- 卷正文文件数、相对顺序和迁移前一致；不因本次架构迁移改正文内容。
