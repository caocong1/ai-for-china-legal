---
name: style-resources
description: 冷启动访谈子技能四：收集风格与资源配置（报告风格/产物位置/工作产物标题），写入 legal-builder-hub/CLAUDE.md 的文书风格与输出章节。可单独触发：/legal-builder-hub:style-resources
argument-hint: ""
---

# 风格与资源访谈（style-resources）

> **所属编排**：`legal-builder-hub/skills/cold-start-interview/SKILL.md`（冷启动访谈）
> **遵循契约**：`legal-builder-hub/skills/_shared/practice-profile-schema.md` 字段映射（§2.7 文书风格）
> **写入目标**：`legal-builder-hub/CLAUDE.md` — `## 文书风格` / `## 输出`
> **分工说明**：身份由 `identity-role-profile` 收集；偏好由 `preference-scope` 收集；安全策略由 `security-escalation` 收集。
> **可单独触发**：`/legal-builder-hub:style-resources`

---

## 目的

收集用户的报告风格偏好和工作产物配置，写入 `legal-builder-hub/CLAUDE.md`，驱动所有技能输出的格式和风格。

---

## 前置

1. **读取 `legal-builder-hub/CLAUDE.md`** — 检查文书风格章节是否已有配置
2. **读取 `legal-builder-hub/skills/_shared/practice-profile-schema.md`** — 字段映射
3. 建议在其他三个子技能完成后运行

---

## 访谈问题清单

### 第一部分：报告风格

**Q1. 安全审查报告的期望风格是什么？**

> 写入：`## 文书风格` → 安全审查报告风格

可选：
- 结构化安全发现清单 + 风险等级 + 修复建议
- 技术审计报告格式（含代码引用和 CVSS 评分）
- 简明管理层摘要 + 详细技术附录
- 其他（请描述）

---

**Q2. 技能评估报告的期望风格是什么？**

> 写入：`## 文书风格` → 技能评估报告风格

可选：
- 功能对比表 + 安全评分 + 社区反馈摘要
- 详细功能测试报告
- 简明推荐清单
- 其他（请描述）

---

**Q3. 安装日志的期望风格是什么？**

> 写入：`## 文书风格` → 安装日志风格

可选：
- 详细安装步骤记录 + 兼容性检查结果 + 配置变更记录
- 简明安装摘要（仅关键步骤）
- 其他（请描述）

---

### 第二部分：工作产物管理

**Q4. 工作产物存放在哪里？**

> 写入：`## 文书风格` → 工作产物存放位置

可选：
- 项目目录（如 `.skills/audit-logs/`）
- 企业文档管理系统
- 指定共享目录
- 其他（请说明路径）

---

**Q5. 您的角色对应的工作产物标题是什么？**

> 写入：`## 输出` → 工作产物标题

根据用户角色自动推荐，用户可自定义：

| 角色 | 默认标题 |
|------|---------|
| 技术角色（开发者/管理员） | 技能安全审查报告 — 技术审查文档 |
| 法律角色（律师/法务） | 技能合规评估笔记 — 非技术结论，供技术人员审查 |

---

## 字段→CLAUDE.md 映射表

| 问题 | 字段 | 写入章节 | 驱动技能 |
|------|------|---------|---------|
| Q1 | 安全审查报告风格 | `## 文书风格` | security-review/review-report-certification |
| Q2 | 技能评估报告风格 | `## 文书风格` | skill-discovery/skill-detail-evaluation |
| Q3 | 安装日志风格 | `## 文书风格` | installation/installation-execution |
| Q4 | 工作产物存放位置 | `## 文书风格` | 所有技能输出路由 |
| Q5 | 工作产物标题 | `## 输出` | 所有技能输出标题 |

---

## 写入说明

1. **不另存独立文件** — 只填充 CLAUDE.md
2. **确认前展示预览** — 展示填充结果确认后写入
3. **版本控制** — CLAUDE.md 纳入 git 版本控制

---

## 重跑说明

- **重跑本子技能**：`/legal-builder-hub:style-resources` — 仅更新文书风格章节
- **直接编辑**：用户可直接编辑 `legal-builder-hub/CLAUDE.md` 文书风格章节
