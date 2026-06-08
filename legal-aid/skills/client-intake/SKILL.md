---
name: client-intake
description: >
  客户 intake 编排入口。编排四个子技能（当事人身份核实 → 案件事实收集 → 法援资格初评 → 利益冲突审查与分流），
  完成法援案件当事人的信息收集与初步筛选。
  深度内容已拆分至子技能目录，见 skills/client-intake/<子技能名>/SKILL.md。
argument-hint: "[当事人基本信息或案件简述]"
---

# 客户 intake（编排入口）

> **迁移说明**：原客户 intake 深度内容已拆分迁移至四个子技能。
> 本文件为编排入口，负责子技能调用顺序和入口护栏。
> 子技能路径：`legal-aid/skills/client-intake/<子技能名>/SKILL.md`。

---

## 目的

通过结构化的四步流程，完成法援案件当事人的信息收集、初步筛选和案件分流：

1. 核实当事人身份和基本信息
2. 收集案件事实和相关材料
3. 初步评估是否符合法律援助条件
4. 审查利益冲突并进行案件分流

---

## 前置条件：加载实践配置

**在开始 intake 之前，读取实践配置文件 `legal-aid/CLAUDE.md`。** 如果配置文件缺失或仍有占位符：

> 我注意到你还没有配置你的实践档案——运行 `/legal-aid:cold-start-interview`（约 5 分钟）来配置你的档案。
> 说 **「临时模式」** 使用通用默认值，输出标记 `[临时模式]`。

---

## 子技能编排顺序

| 顺序 | 子技能 | 职责 | 子技能路径 | 单独触发 |
|------|-------|------|----------|---------|
| 1 | **party-identity-verification** | 当事人身份与基本信息核实 | `skills/client-intake/party-identity-verification/SKILL.md` | `/legal-aid:party-identity-verification` |
| 2 | **case-fact-collection** | 案件事实初步收集 | `skills/client-intake/case-fact-collection/SKILL.md` | `/legal-aid:case-fact-collection` |
| 3 | **eligibility-preliminary-assessment** | 法援资格初步评估 | `skills/client-intake/eligibility-preliminary-assessment/SKILL.md` | `/legal-aid:eligibility-preliminary-assessment` |
| 4 | **conflict-check-referral** | 利益冲突审查与案件分流 | `skills/client-intake/conflict-check-referral/SKILL.md` | `/legal-aid:conflict-check-referral` |

**顺序说明**：身份核实在前（确认当事人主体资格）→ 事实收集第二（了解案情）→ 资格评估第三（基于事实和身份判断是否符合法援条件）→ 冲突审查最后（确认可以受理后分流）。

---

## 入口级护栏

### 紧急情形识别

若当事人描述涉及以下紧急情形，在启动完整 intake 前优先处理：
- 即将超过诉讼时效
- 即将超过法定上诉期限
- 涉及人身保护令/人身安全保护令
- 刑事羁押期限即将届满

**处理方式**：标记紧急，优先启动法律援助申请流程（`/legal-aid:legal-aid-application`），简化 intake 步骤。

### 特殊群体识别

识别以下特殊群体，适用特殊沟通规则：
- 未成年人 → 须有法定代理人参与
- 残疾人 → 提供无障碍沟通方式
- 老年人 → 适当放慢节奏，确认理解
- 不通晓当地语言 → 安排翻译

### 批量 intake

若多名当事人同时来访（可能涉及群体性案件），**须立即升级**：
> 检测到可能的群体性案件线索。根据质量标准配置，群体性案件须报告法援中心主任审批。
> 请先单独记录各当事人信息，暂不进入正式 intake 流程。

---

## 共享资源加载

进入子技能前，读取以下共享资源：

- `legal-aid/skills/_shared/legal-basis-conventions.md` — 法律援助引用规范
- `legal-aid/skills/_shared/legal-aid-citations.md` — 法律援助高频引用库

---

## 输出：完整 intake 完成

完整 intake 流程完成后，由 `conflict-check-referral` 子技能汇总输出：
- 当事人信息确认表
- 案件事实摘要
- 法援资格初评结论
- 利益冲突审查结果
- 分流建议（受理/转介/不予受理）

输出继承实践配置文件 `## 输出` 中的工作产物标题。
