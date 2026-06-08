---
phase: 07-construction-legal
plan: 03
subsystem: construction-legal
tags: [commercial-housing-review, cold-start-interview, plugin-registration, skill-decomposition]
dependency_graph:
  requires: [07-01, 07-02]
  provides: [commercial-housing-review orchestrator, cold-start-interview decomposition, plugin.json 0.2.0]
  affects: [construction-legal plugin, construction-legal/CLAUDE.md consumers]
tech_stack:
  added: []
  patterns: [skill-orchestrator-pattern, cold-start-interview-decomposition, practice-profile-schema]
key_files:
  created:
    - construction-legal/skills/cold-start-interview/risk-escalation/SKILL.md
    - construction-legal/skills/cold-start-interview/style-local-rules/SKILL.md
    - construction-legal/skills/cold-start-interview/identity-project/SKILL.md
    - construction-legal/skills/cold-start-interview/review-stance/SKILL.md
  modified:
    - construction-legal/skills/cold-start-interview/SKILL.md
    - construction-legal/.claude-plugin/plugin.json
decisions:
  - "cold-start-interview 四个子技能均填充 construction-legal/CLAUDE.md（散文模板，非独立 YAML），与 practice-profile-schema 架构决策一致"
  - "plugin.json 升级到 0.2.0，25 条扁平注册（5 编排入口 + 20 子技能），与 ip-legal 注册范式对齐"
metrics:
  duration: "约 20 分钟（续行执行，仅完成剩余子技能创建与注册）"
  completed: "2026-06-05"
  tasks_completed: 2
  files_created: 4
  files_modified: 2
---

# Phase 07 Plan 03: Commercial Housing Review, Interview Decomposition & Plugin Registration Summary

**一句话概述**：cold-start-interview 拆分为四个可独立触发的访谈子技能（含新建 risk-escalation 208行/style-local-rules 216行）并改造编排入口，plugin.json 注册全部 25 个技能升级到 0.2.0。

---

## 完成的工作

### 任务 1+2（已在前序执行中完成）

`commercial-housing-review` 四个子技能与编排入口已在本计划前序运行中完成并提交：

- `presale-license-subject`（预售许可与主体核查）：commit `efebf83`
- `deposit-subscription`（定金与认购书）：commit `efebf83`
- `delivery-breach`（交付与违约/面积误差3%）：commit `efebf83`
- `loan-termination-risk`（贷款解除与风险）：commit `efebf83`
- `commercial-housing-review/SKILL.md`（编排入口）：commit `513b4d6`

### 任务 3：冷启动访谈拆分（本次执行）

提交：`448c8ea`

| 子技能 | 非空行数 | 核心内容 | 写入目标 |
|-------|---------|---------|---------|
| `identity-project` | 181 | 主体画像+项目组合+可用集成结构化问卷；Q1–Q5 五部分共 13 个字段 | `## 我们是谁` / `## 谁在使用` / `## 可用集成` |
| `review-stance` | 181 | 代理立场（发包/承包/中立/购房人侧）+审查严格度+争议倾向+商品房立场；Q1–Q4 共 11 个字段 | `## 审查与争议立场`（含三个子章节） |
| `risk-escalation` | 208 | 四级风险触发情形+角色权限+工程款升级阈值+自动升级清单+诉讼仲裁优先受偿权触发；Q1–Q4 共 14 个字段 | `## 风险校准` / `## 升级矩阵` |
| `style-local-rules` | 216 | 文书风格（审查意见书/工程款函/争议分析/商品房审查）+造价鉴定资源+地方定额偏好+主要业务省市+地方建设主管部门重点关注；Q1–Q7 共 16 个字段 | `## 文书风格` / `## 输出` / `## 共享护栏` |

`cold-start-interview/SKILL.md` 改造为编排入口：
- 纠正旧「生成 YAML 格式」表述为「填充 construction-legal/CLAUDE.md 对应章节」
- 列出四个子技能顺序表（路径/单独触发命令/核心任务）
- 增加临时模式默认值表
- 保留 `name: cold-start-interview` frontmatter，description 更新

### 任务 4：plugin.json 注册与升级（本次执行）

提交：`d81d93c`

- `version` 升级到 `0.2.0`
- `description` 更新为五大模块概述
- `skills` 数组 25 条（5 编排入口 + 20 子技能），全部 path 已验证存在
- JSON 合法性通过 `python3 json.load` 验证

---

## 注册的全部 25 个技能

| 编号 | name | 类型 | 路径 |
|-----|------|------|------|
| 1 | cold-start-interview | 编排入口 | skills/cold-start-interview/SKILL.md |
| 2 | identity-project | 访谈子技能 | skills/cold-start-interview/identity-project/SKILL.md |
| 3 | review-stance | 访谈子技能 | skills/cold-start-interview/review-stance/SKILL.md |
| 4 | risk-escalation | 访谈子技能 | skills/cold-start-interview/risk-escalation/SKILL.md |
| 5 | style-local-rules | 访谈子技能 | skills/cold-start-interview/style-local-rules/SKILL.md |
| 6 | contract-review | 编排入口 | skills/contract-review/SKILL.md |
| 7 | subject-qualification-validity | 施工合同子技能 | skills/contract-review/subject-qualification-validity/SKILL.md |
| 8 | schedule-quality | 施工合同子技能 | skills/contract-review/schedule-quality/SKILL.md |
| 9 | price-settlement | 施工合同子技能 | skills/contract-review/price-settlement/SKILL.md |
| 10 | breach-termination | 施工合同子技能 | skills/contract-review/breach-termination/SKILL.md |
| 11 | payment-dispute | 编排入口 | skills/payment-dispute/SKILL.md |
| 12 | priority-payment-right | 工程款子技能 | skills/payment-dispute/priority-payment-right/SKILL.md |
| 13 | settlement-basis-dual-contract | 工程款子技能 | skills/payment-dispute/settlement-basis-dual-contract/SKILL.md |
| 14 | quality-defense-counterclaim | 工程款子技能 | skills/payment-dispute/quality-defense-counterclaim/SKILL.md |
| 15 | interest-advance-funding | 工程款子技能 | skills/payment-dispute/interest-advance-funding/SKILL.md |
| 16 | bidding-compliance | 编排入口 | skills/bidding-compliance/SKILL.md |
| 17 | mandatory-bidding-scope | 招投标子技能 | skills/bidding-compliance/mandatory-bidding-scope/SKILL.md |
| 18 | bidding-procedure | 招投标子技能 | skills/bidding-compliance/bidding-procedure/SKILL.md |
| 19 | collusion-fraud | 招投标子技能 | skills/bidding-compliance/collusion-fraud/SKILL.md |
| 20 | bid-invalidity-complaint | 招投标子技能 | skills/bidding-compliance/bid-invalidity-complaint/SKILL.md |
| 21 | commercial-housing-review | 编排入口 | skills/commercial-housing-review/SKILL.md |
| 22 | presale-license-subject | 商品房子技能 | skills/commercial-housing-review/presale-license-subject/SKILL.md |
| 23 | deposit-subscription | 商品房子技能 | skills/commercial-housing-review/deposit-subscription/SKILL.md |
| 24 | delivery-breach | 商品房子技能 | skills/commercial-housing-review/delivery-breach/SKILL.md |
| 25 | loan-termination-risk | 商品房子技能 | skills/commercial-housing-review/loan-termination-risk/SKILL.md |

---

## Deviations from Plan

None — plan executed as written. The only deviation is that Tasks 1+2 (commercial-housing-review sub-skills and orchestrator) were completed in a prior run and are already committed. This execution completed the remaining Tasks 3+4.

---

## Known Stubs

None. All created skills contain substantive content (80–216 non-empty lines each). No hardcoded empty values, placeholder text, or unwired data sources were introduced.

---

## Threat Flags

None. This plan creates prompt/skill files only — no network endpoints, auth paths, file access patterns, or schema changes at trust boundaries were introduced.

---

## Self-Check: PASSED

All files verified:

```
construction-legal/skills/cold-start-interview/identity-project/SKILL.md — FOUND (181 lines)
construction-legal/skills/cold-start-interview/review-stance/SKILL.md — FOUND (181 lines)
construction-legal/skills/cold-start-interview/risk-escalation/SKILL.md — FOUND (208 lines)
construction-legal/skills/cold-start-interview/style-local-rules/SKILL.md — FOUND (216 lines)
construction-legal/skills/cold-start-interview/SKILL.md — FOUND (orchestrator, YAML 格式 removed)
construction-legal/.claude-plugin/plugin.json — FOUND (25 skills, version 0.2.0, JSON valid)
```

Commits verified:
- `448c8ea` — cold-start-interview decomposition
- `d81d93c` — plugin.json 0.2.0
