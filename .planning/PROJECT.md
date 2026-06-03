# PROJECT.md — AI for China Legal

## 项目概述

AI for China Legal 是一套模块化的法律 AI 插件套件，为 Qwen Code、Kimi Code、OpenCode 等 Agent 平台提供端到端的中国大陆法律工作流辅助能力。

## 历史

### v1.0 — 项目骨架 (✅ 已完成)

- 创建了完整的项目骨架
- 13 个插件目录结构
- 3 个核心插件的初始技能文件（商事合同、诉讼仲裁、劳动人事）
- marketplace.json、CLAUDE.md、README.md、QUICKSTART.md、CONNECTORS.md

### v1.1 — 共享法律研究基础设施 (✅ 已完成)

从 `cn-lawyer-docs-skill` 项目汲取经过真实案例测试验证的能力，新增：

- **shared/research-gate/** — 中国法研究闸门（强制检索前置机制）
  - SKILL.md — 核心逻辑（目录清点、五维度搜索、来源分级、反向依据）
  - references/authoritative-sources.md — 实测可访问的权威来源 URL
  - references/quality-gates.md — 研究质量闸门（三层 Gate + 专项附加闸门）
  - references/search-playbooks.md — 专项搜索策略（保函、管辖、主体资格等）
  - references/source-policy.md — 引用策略和失败回退链

- **shared/references/** — 共享模板和 playbook
  - document-structures.md — 诉讼/合同/意见书/函件结构模板
  - guarantee-bond-playbook.md — 保函/担保案件专用 playbook（含裁判共识、OCR 校验、反例预警）
  - subject-qualification-traps.md — 主体资格陷阱清单（7 类主体）

- **learning-materials/** — 真实案例测试框架
  - guohang-chongqing-shuangye/ — 国航重庆诉重庆双业担保案例
    - evaluation/gold-rubric.md — 10 维度评估标准
    - forward-tests/forward-tests.md — 前向测试记录模板
    - prompts/PROMPTS.md — 最小/诊断型提示词

- **现有 skill 增强**：
  - litigation-legal/ 各 skill — 加入研究闸门引用、文书结构模板、质量硬门禁
  - litigation-legal/skills/evidence-management — 加入 3 大类证据分组强制要求
  - commercial-legal/skills/contract-review — 加入主体资格预检和搜索策略引用

## 当前里程碑: v1.1 — 共享法律研究基础设施
