---
name: legal-aid-application
description: >
  法律援助申请编排入口。编排四个子技能（援助条件评估 → 申请材料准备 → 申请提交与审查跟踪 → 审查结果应对），
  覆盖法律援助申请全流程。
  深度内容已拆分至子技能目录，见 skills/legal-aid-application/<子技能名>/SKILL.md。
argument-hint: "[当事人信息和案件信息]"
---

# 法律援助申请（编排入口）

> 本子技能组为新增模块，覆盖法律援助从条件评估到审查结果应对的完整申请流程。
> 子技能路径：`legal-aid/skills/legal-aid-application/<子技能名>/SKILL.md`。

---

## 目的

协助当事人完成法律援助申请的完整流程：

1. 评估是否符合法律援助条件
2. 准备申请材料
3. 提交申请并跟踪审查
4. 应对审查结果（补正/不予援助救济）

---

## 前置条件：加载实践配置

**在开始申请流程之前，读取实践配置文件 `legal-aid/CLAUDE.md`。** 如果配置文件缺失：

> 运行 `/legal-aid:cold-start-interview`（约 5 分钟）配置你的实践档案。
> 说 **「临时模式」** 使用通用默认值，输出标记 `[临时模式]`。

---

## 子技能编排顺序

| 顺序 | 子技能 | 职责 | 子技能路径 | 单独触发 |
|------|-------|------|----------|---------|
| 1 | **eligibility-assessment** | 援助条件评估（经济困难·事项范围） | `skills/legal-aid-application/eligibility-assessment/SKILL.md` | `/legal-aid:eligibility-assessment` |
| 2 | **material-preparation** | 申请材料准备 | `skills/legal-aid-application/material-preparation/SKILL.md` | `/legal-aid:material-preparation` |
| 3 | **application-submission-tracking** | 申请提交与审查跟踪 | `skills/legal-aid-application/application-submission-tracking/SKILL.md` | `/legal-aid:application-submission-tracking` |
| 4 | **review-result-response** | 审查结果应对 | `skills/legal-aid-application/review-result-response/SKILL.md` | `/legal-aid:review-result-response` |

**顺序说明**：条件评估在前（确认是否值得申请）→ 材料准备第二（齐备材料）→ 提交跟踪第三（跟踪审查）→ 结果应对最后（补正或救济）。

---

## 与 client-intake 的关系

`client-intake` 中的 `eligibility-preliminary-assessment` 为**初步评估**，
本模块的 `eligibility-assessment` 为**正式评估**，更深入、更系统。

- 若已完成 client-intake 且初评结论为「建议申请」，可直接进入本模块
- 若未做 client-intake，也可单独运行本模块

---

## 入口级护栏

### 紧急情形

若案件存在以下紧急情形，优先处理：
- 即将超过诉讼时效
- 羁押期限即将届满
- 人身安全受威胁

**处理方式**：简化评估流程，优先提交申请。

### 重复申请

若当事人曾申请被拒，须了解前次拒绝原因，针对性改进。

---

## 共享资源加载

- `legal-aid/skills/_shared/legal-basis-conventions.md` — 法律援助引用规范
- `legal-aid/skills/_shared/legal-aid-citations.md` — 法律援助高频引用库

---

## 输出：完整申请流程完成

完整申请流程完成后：
- 条件评估报告
- 申请材料清单和完整材料
- 提交记录
- 审查结果及后续应对方案
