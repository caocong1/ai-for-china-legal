# 项目总结 — AI for China Legal

> 更新日期: 2026-06-08
> 参考项目: https://github.com/anthropics/claude-for-legal

---

## 项目现状

AI for China Legal 是一套模块化的法律 AI 插件套件，面向中国大陆法律体系、执业环境和监管要求进行中国化适配。

当前处于 **SKILL.md 定义完成 + 基础设施初步建成** 阶段。

## 已完成的工作

### 1. 研究与解析

- ✅ 克隆并深度解析了 Anthropic `claude-for-legal` 参考项目
- ✅ 生成详细的 ROADMAP.md 解析报告（12 个插件、SKILL.md 格式、MCP 连接器、安全分层）

### 2. 13 个法律插件（全部完成）

| 类别 | 插件 | 顶层 Skills | 含子技能 SKILL.md |
|------|------|------------|-------------------|
| 交易与咨询 | 商事合同 (commercial-legal) | 4 | 23 |
| 交易与咨询 | 数据合规 (data-compliance) | 5 | 25 |
| 交易与咨询 | 劳动人事 (employment-legal) | 6 | 31 |
| 交易与咨询 | 知识产权 (ip-legal) | 5 | 25 |
| 交易与咨询 | AI 治理 (ai-governance) | 5 | 25 |
| 交易与咨询 | 监管合规 (regulatory-legal) | 5 | 25 |
| 诉讼 | 诉讼仲裁 (litigation-legal) | 6 | 32 |
| 中国特有 | 建设工程 (construction-legal) | 5 | 25 |
| 中国特有 | 婚姻家事 (family-legal) | 5 | 25 |
| 中国特有 | 刑事合规 (criminal-compliance) | 5 | 25 |
| 学习与实务 | 法考培训 (law-student) | 5 | 25 |
| 学习与实务 | 法律援助 (legal-aid) | 5 | 25 |
| 生态系统 | 法律技能中心 (legal-builder-hub) | 5 | 25 |
| **合计** | | **66** | **336** |

每个插件包含：
- `.claude-plugin/plugin.json` — 插件元数据
- `CLAUDE.md` — 实践配置文件模板
- `README.md` — 插件说明
- `skills/` — SKILL.md 技能定义（含编排入口 + 子技能）
- `skills/_shared/` — 领域法条引用规范、实践配置 schema

### 3. 共享法律研究基础设施 (v1.1)

- ✅ **研究闸门** (`shared/research-gate/SKILL.md`) — 所有法律文书生成前的强制检索前置机制
- ✅ **质量闸门** (`shared/research-gate/references/quality-gates.md`)
- ✅ **搜索策略** (`shared/research-gate/references/search-playbooks.md`) — 保函、管辖、主体资格等专项 playbook
- ✅ **来源分级** (`shared/research-gate/references/source-policy.md`) — L1-L5 来源分层策略
- ✅ **权威来源** (`shared/research-gate/references/authoritative-sources.md`) — 实测可访问 URL 及抓取方式
- ✅ **文书结构模板** (`shared/references/document-structures.md`)
- ✅ **担保案件 playbook** (`shared/references/guarantee-bond-playbook.md`)
- ✅ **主体资格陷阱** (`shared/references/subject-qualification-traps.md`)
- ✅ **跨平台格式文档** (`shared/cross-platform/`) — 4 个平台的 SKILL-FORMAT.md

### 4. 真实案例测试框架

- ✅ 内部真实任务评测框架 — 案件材料、评分标准、前向测试模板、提示词集

### 5. MCP 连接器

- ✅ `law-database` — 完整实现（HTTP client + MCP server + 缓存 + 健康检查 + 熔断/重试/限流）
- 📋 `wenshu` / `gsxt` / `trademark` / `patent` / `wechat-notify` — connector.json 规格定义完成，待实现

### 6. 定时 Agent

- ✅ 4 个 Agent YAML 配方：法规监控、裁判文书监控、企业变更监控、时效监控
- ✅ `run-agent.js` Agent 运行器（调度检查 + 数据收集 + 报告生成 + 通知）

### 7. 跨平台与部署

- ✅ `scripts/setup-skills.sh` — Qwen Code skill 符号链接注册
- ✅ `scripts/convert-skills.js` — SKILL.md → Kimi Code / OpenCode / Standalone Agent 格式转换
- ✅ `scripts/cleanup-skills.sh` — 卸载脚本

## 文件统计

| 类型 | 数量 |
|------|------|
| 插件目录 | 13 |
| plugin.json | 13 |
| CLAUDE.md（插件级） | 13 |
| README.md（插件级） | 13 |
| SKILL.md（总计） | 337（含 shared/ 1 个） |
| 顶层 skill 模块 | 66 |
| 连接器（有代码） | 1 |
| 连接器（仅规格） | 5 |
| Agent YAML | 4 |
| 共享参考文档 | 8 |
| **项目总文件数** | **约 500+** |

## 待完成工作

| 优先级 | 事项 | 说明 |
|--------|------|------|
| P0 | 5 个连接器实现 | wenshu / gsxt / trademark / patent / wechat-notify 目前仅有 connector.json |
| P1 | Agent 运行时完善 | run-agent.js cron 解析器需支持完整 cron 语法；通知渠道需实际对接 |
| P1 | 测试框架 | 缺少自动化测试，convert-skills.js 和 run-agent.js 无测试覆盖 |
| P2 | 跨平台验证 | convert-skills.js 输出未在 Kimi Code / OpenCode 上实际验证 |
| P2 | AI 治理插件内容充实 | SKILL.md 行数偏少（~118 行 vs 平均 ~250 行） |

## 项目位置

- **参考项目**: `workspace/claude-for-legal-study/`
- **新项目**: `workspace/ai-for-china-legal/`
