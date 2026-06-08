---
name: document-templates
description: >
  法律文书模板编排入口。编排四个子技能（法律援助申请书 → 委托代理协议/指定辩护函 → 诉讼文书起草 → 结案报告与质量自查），
  覆盖法援常用文书的起草与审核。
  深度内容已拆分至子技能目录，见 skills/document-templates/<子技能名>/SKILL.md。
argument-hint: "[文书类型和案件信息]"
---

# 法律文书模板（编排入口）

> **迁移说明**：原文书模板深度内容已拆分迁移至四个子技能。
> 本文件为编排入口，负责子技能调用和文书类型路由。
> 子技能路径：`legal-aid/skills/document-templates/<子技能名>/SKILL.md`。

---

## 目的

提供法律援助常用文书的模板与起草辅助：

1. 法律援助申请书
2. 委托代理协议 / 指定辩护函
3. 诉讼文书（起诉状/答辩状/代理词/辩护词）
4. 结案报告与质量自查

---

## 前置条件：加载实践配置

**在起草文书之前，读取实践配置文件 `legal-aid/CLAUDE.md`。** 特别关注：
- 文书风格偏好
- 常用格式模板
- 法援中心名称和抬头

如果配置文件缺失：
> 运行 `/legal-aid:cold-start-interview`（约 5 分钟）配置你的实践档案。
> 说 **「临时模式」** 使用通用默认格式。

---

## 子技能编排

| 顺序 | 子技能 | 职责 | 子技能路径 | 单独触发 |
|------|-------|------|----------|---------|
| 1 | **legal-aid-application-form** | 法律援助申请书 | `skills/document-templates/legal-aid-application-form/SKILL.md` | `/legal-aid:legal-aid-application-form` |
| 2 | **power-of-attorney-agreement** | 委托代理协议/指定辩护函 | `skills/document-templates/power-of-attorney-agreement/SKILL.md` | `/legal-aid:power-of-attorney-agreement` |
| 3 | **litigation-document-drafting** | 诉讼文书起草 | `skills/document-templates/litigation-document-drafting/SKILL.md` | `/legal-aid:litigation-document-drafting` |
| 4 | **case-closure-report** | 结案报告与质量自查 | `skills/document-templates/case-closure-report/SKILL.md` | `/legal-aid:case-closure-report` |

**顺序说明**：各子技能可独立使用，按文书需求选择触发。一般案件流程中按上述顺序依次产生。

---

## 入口级护栏

### 文书格式规范

所有文书须遵循：
- 实践配置文件中设定的文书格式偏好
- 当地法援中心的统一格式要求（如有）
- 法院的文书格式要求（如适用）

### 法条引用规范

文书中引用法律条文时，须遵循：
- `legal-aid/skills/_shared/legal-basis-conventions.md` 引用规范
- 所有条文号标注 `[待验证]`
- 不编造条文号

### 敏感信息处理

文书中涉及的当事人个人信息（身份证号、住址等），对外版本须适当脱敏。

---

## 共享资源加载

- `legal-aid/skills/_shared/legal-basis-conventions.md` — 法律援助引用规范
- `legal-aid/skills/_shared/legal-aid-citations.md` — 法律援助高频引用库

---

## 输出：文书生成完成

各子技能独立输出对应文书，继承实践配置文件的文书风格。
