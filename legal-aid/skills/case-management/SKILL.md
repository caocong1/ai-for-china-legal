---
name: case-management
description: >
  法援案件管理编排入口。编排四个子技能（案件登记与指派 → 案件进展跟踪 → 质量审查与监督 → 结案归档与统计），
  覆盖法援案件从受理到归档的全流程管理。
  深度内容已拆分至子技能目录，见 skills/case-management/<子技能名>/SKILL.md。
argument-hint: "[案件编号或案件信息]"
---

# 法援案件管理（编排入口）

> **迁移说明**：原案件管理深度内容已拆分迁移至四个子技能。
> 本文件为编排入口，负责子技能调用顺序和入口护栏。
> 子技能路径：`legal-aid/skills/case-management/<子技能名>/SKILL.md`。

---

## 目的

通过结构化的四步流程，管理法援案件从受理到归档的完整生命周期：

1. 案件登记与指派承办人
2. 案件进展跟踪与节点管理
3. 质量审查与监督
4. 结案归档与统计

---

## 前置条件：加载实践配置

**在开始案件管理之前，读取实践配置文件 `legal-aid/CLAUDE.md`。** 如果配置文件缺失：

> 运行 `/legal-aid:cold-start-interview`（约 5 分钟）配置你的实践档案。
> 说 **「临时模式」** 使用通用默认值，输出标记 `[临时模式]`。

---

## 子技能编排顺序

| 顺序 | 子技能 | 职责 | 子技能路径 | 单独触发 |
|------|-------|------|----------|---------|
| 1 | **case-docket-assignment** | 案件登记与指派 | `skills/case-management/case-docket-assignment/SKILL.md` | `/legal-aid:case-docket-assignment` |
| 2 | **case-progress-tracking** | 案件进展跟踪 | `skills/case-management/case-progress-tracking/SKILL.md` | `/legal-aid:case-progress-tracking` |
| 3 | **quality-review-supervision** | 质量审查与监督 | `skills/case-management/quality-review-supervision/SKILL.md` | `/legal-aid:quality-review-supervision` |
| 4 | **case-closure-archiving** | 结案归档与统计 | `skills/case-management/case-closure-archiving/SKILL.md` | `/legal-aid:case-closure-archiving` |

**顺序说明**：登记指派在前（案件进入系统）→ 进展跟踪第二（日常监控）→ 质量审查第三（过程监督）→ 结案归档最后（终结与总结）。

---

## 入口级护栏

### 重大案件识别

若案件属于重大案件或群体性案件，在登记时即触发升级规则：

> ⚠️ **重大案件标记**：根据质量标准配置，本案属于重大/群体性案件。
> 须报告法援中心主任审批，经集体讨论后确定承办方案。

### 超期预警

检查案件是否接近或超过法定办理期限：
- 审查期限（收到申请后 [期限待验证]）
- 案件办理期限（根据案件类型不同）
- 上诉期限（判决15日/裁定10日 `[待验证]`）

### 受援人变更

若涉及更换承办律师或受援人变更，须记录变更原因并更新案件信息。

---

## 共享资源加载

进入子技能前，读取以下共享资源：

- `legal-aid/skills/_shared/legal-basis-conventions.md` — 法律援助引用规范
- `legal-aid/skills/_shared/legal-aid-citations.md` — 法律援助高频引用库

---

## 输出：完整案件管理流程完成

完整管理流程完成后，由 `case-closure-archiving` 子技能汇总：
- 案件登记信息
- 进展跟踪记录
- 质量审查结果
- 结案归档材料清单
- 统计分析数据

输出继承实践配置文件 `## 输出` 中的工作产物标题。
