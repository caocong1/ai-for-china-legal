---
name: cold-start-interview
description: >
  法律援助冷启动访谈编排入口。按 identity-role-profile → service-stance-scope →
  quality-escalation → style-local-resources 顺序编排四个访谈子技能，
  完整初始化实践配置文件（legal-aid/CLAUDE.md）。
  各子技能也可单独触发，只更新配置文件对应章节。
argument-hint: ""
---

# 冷启动访谈（编排入口）

> **迁移说明**：原访谈内容已深化拆分到四个访谈子技能。
> 本文件为编排入口，负责访谈顺序和完整流程概览。
> 子技能路径：`legal-aid/skills/cold-start-interview/<子技能名>/SKILL.md`
>
> 配置输出契约见：`legal-aid/skills/_shared/practice-profile-schema.md`

---

## 目的

通过结构化的四步访谈，收集法律工作者的执业身份、服务立场、质量标准和文书风格，
完整初始化实践配置文件（`legal-aid/CLAUDE.md`）。

配置完成后：
- 所有法律援助技能根据配置文件提供个性化服务
- 每个技能在配置缺失时提供「临时模式」作为无阻塞降级
- 配置可随时重新运行整个访谈或单独更新某一部分

---

## 子技能编排顺序

| 顺序 | 子技能 | 收集内容 | 子技能路径 | 单独触发 |
|-----|-------|---------|----------|---------|
| 1 | **identity-role-profile** | 身份信息、角色类型、所属机构、执业领域 | `skills/cold-start-interview/identity-role-profile/SKILL.md` | `/legal-aid:identity-role-profile` |
| 2 | **service-stance-scope** | 服务类型、法援类型偏好、案件受理优先级、受援人沟通偏好 | `skills/cold-start-interview/service-stance-scope/SKILL.md` | `/legal-aid:service-stance-scope` |
| 3 | **quality-escalation** | 质量标准、重大案件定义、升级触发条件、审批层级 | `skills/cold-start-interview/quality-escalation/SKILL.md` | `/legal-aid:quality-escalation` |
| 4 | **style-local-resources** | 文书风格、本地法援中心/法院/民政资源、经济困难标准 | `skills/cold-start-interview/style-local-resources/SKILL.md` | `/legal-aid:style-local-resources` |

**顺序说明**：身份在前（建立基础上下文）→ 服务立场第二（核心配置）→ 质量标准第三（依赖前两步）→ 文书风格和本地资源最后（补充信息）。

**单独触发**：可单独触发任一子技能，只更新配置文件对应章节。

---

## 完整访谈流程概览

**预计时间**：约 5-10 分钟（完整访谈）；约 2-3 分钟（单个子技能）

**第一步（identity-role-profile）：** 收集法律工作者基本身份信息：
角色类型（法援律师/法援中心工作人员/志愿者）、所属机构、执业领域、所在地区。

**第二步（service-stance-scope）：** 收集服务立场：
服务类型（民事/刑事/行政）、法援类型偏好、案件受理优先级、受援人沟通方式。

**第三步（quality-escalation）：** 配置质量标准：
案件质量要求、重大案件/群体性案件定义、升级触发条件、审批层级。

**第四步（style-local-resources）：** 配置文书风格和本地资源：
文书格式偏好、法援中心信息、常用法院清单、本地经济困难标准。

---

## 输出契约

本访谈的所有子技能共同填充 `legal-aid/CLAUDE.md`（唯一真相来源）。

| CLAUDE.md 章节 | 由哪个子技能填充 |
|--------------|--------------|
| `## 我是谁` | identity-role-profile |
| `## 谁在使用` | identity-role-profile |
| `## 可用集成` | identity-role-profile |
| `## 服务立场` | service-stance-scope |
| `## 质量标准` | quality-escalation |
| `## 文书风格` | style-local-resources |
| `## 本地资源` | style-local-resources |

**字段映射、技能读取契约详见：** `legal-aid/skills/_shared/practice-profile-schema.md`

---

## 后续

### 重跑访谈

- **完整重跑**：运行 `/legal-aid:cold-start-interview`
- **部分更新**：单独触发对应子技能

### 直接编辑

可直接编辑 `legal-aid/CLAUDE.md`，编辑后即时生效。

### 版本控制

配置文件纳入版本控制：
- 查看历史：`git log --oneline legal-aid/CLAUDE.md`
- 回滚：`git checkout <commit-hash> -- legal-aid/CLAUDE.md`
