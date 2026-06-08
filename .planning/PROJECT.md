# PROJECT.md — AI for China Legal

## What This Is

AI for China Legal 是一套模块化的法律 AI 插件套件，为 Qwen Code、Kimi Code、OpenCode 等 Agent 平台提供端到端的中国大陆法律工作流辅助能力。v1.0 已交付 13 个法律领域插件（341 个 SKILL.md）、4 个定时 Agent 食谱、6 个 MCP 连接器、4 平台跨平台适配。

## Core Value

为法律从业者提供**可溯源、可验证、有护栏**的 AI 辅助工作流——每个技能输出均标注法律依据来源和待验证标记，关键风险点强制升级给执业律师。

## Requirements

### Validated

- ✓ 13 个法律领域插件（商事合同/诉讼仲裁/劳动人事/数据合规/知识产权/建设工程/婚姻家事/刑事合规/监管合规/AI 治理/法考培训/法律援助/法律技能中心）— v1.0
- ✓ 每个插件含引用脊柱 + 实践配置 + 5 主技能 × 4 子技能 — v1.0
- ✓ 中国法研究闸门（shared/research-gate/）— v1.0
- ✓ 4 个定时 Agent 食谱（裁判文书/法规动态/期限提醒/企业变更）— v1.0
- ✓ 6 个 MCP 连接器（裁判文书/法规/企业信用/商标/专利/微信通知）— v1.0
- ✓ 跨平台适配（Qwen Code / Kimi Code / OpenCode / Standalone）— v1.0

### Active

- [ ] 真实案例端到端测试（使用 learning-materials/ 框架）
- [ ] 插件间联动工作流（如：合同审查 → 诉讼仲裁 → 证据管理）
- [ ] 用户反馈驱动的迭代优化

### Out of Scope

- 非中国大陆法律领域
- 面向终端用户的独立应用（本项目为 Agent 平台插件）
- 实时法律数据库同步（MCP 连接器为按需查询）

## Context

**Shipped v1.0** — 341 SKILL.md files, 13 plugins, 6 connectors, 4 agent recipes.
**Tech stack:** Markdown skill definitions, YAML agent cookbooks, JSON plugin configs, MCP protocol connectors.
**Timeline:** 2026-06-03 → 2026-06-08 (5 days, 191 commits).

## Key Decisions

| Decision | Outcome | Notes |
|----------|---------|-------|
| 每个插件独立引用脊柱 | ✓ Good | 确保法律引用领域隔离、可维护 |
| 子技能拆分模式（4 子技能/主技能） | ✓ Good | 统一粒度，便于独立触发 |
| 待验证标记（条号保守标注） | ✓ Good | 法律条号快速演进，标记避免误导 |
| 强制升级律师护栏 | ✓ Good | 涉刑/人身自由/重大风险强制升级 |
| MCP 连接器按需查询 | ✓ Good | 避免实时同步复杂度 |

## 历史

### v1.0 — AI Legal Assistant Framework (✅ 已完成)

完整交付见 .planning/MILESTONES.md 和 .planning/milestones/v1.0-ROADMAP.md

### v1.1 — 共享法律研究基础设施 (✅ 已完成)

- **shared/research-gate/** — 中国法研究闸门（强制检索前置机制）
- **shared/references/** — 共享模板和 playbook
- **learning-materials/** — 真实案例测试框架

---
*Last updated: 2026-06-08 after v1.0 milestone*
