---
name: hiring-review
description: >
  雇佣审查编排入口。编排五个审查子技能（文件定位与必备条款 → 试用期与工时合规 →
  社保公积金与劳动报酬 → 服务期与违约金合法性 → 雇佣审查装配），对照《劳动合同法》
  及相关法规审查雇佣文件，生成具体的风险识别与修改建议。
  深度内容已拆分至子技能目录，见 skills/hiring-review/<子技能名>/SKILL.md。
argument-hint: "[雇佣文件路径或内容]"
---

# 雇佣审查（编排入口）

> **迁移说明**：原雇佣审查深度内容（必备条款九项、试用期分档表、工时与加班费三档、
> 社保公积金、竞业限制、违约金两情形、解除条款、地方性规定、审查备忘录、
> 交付前质量检查）已拆分迁移至五个可独立触发的子技能。
> 本文件为编排入口，负责前置护栏和子技能调用顺序。
> 子技能路径：`employment-legal/skills/hiring-review/<子技能名>/SKILL.md`

---

## 目的

协调五个雇佣审查子技能，对照中国劳动法体系（劳动合同法2012修正/劳动法/劳动争议调解仲裁法/
社会保险法）全面审查雇佣文件，识别法律风险，提供修改建议，保护用人单位和劳动者的合法权益。

---

## 前置条件：加载审查立场

**在阅读文件之前，读取实践配置文件 `employment-legal/CLAUDE.md`。** 如果配置文件缺失或仍有 `[PLACEHOLDER]`，显示以下提示：

> 我注意到你还没有配置劳动人事实践档案——这是让我根据你的审查立场（用人单位方/劳动者方）、
> 风险校准、升级矩阵和工作地点来定制输出的关键。
>
> **两个选择：**
> - 运行 `/employment-legal:cold-start-interview`（约 5 分钟）来配置你的档案，然后我会根据
>   你的真实执业立场进行审查。
> - 说 **「临时模式」**，我会使用通用默认值并在输出上标记 `[临时模式 — 配置你的档案以获得定制输出]`。

### 临时模式

`[临时模式]` 默认值（来自 practice-profile-schema.md）：
- 风险偏好：平衡型
- 审查立场：用人单位方（合规与风险预防视角）
- 管辖法律：中国大陆法律（劳动合同法2012修正）
- 地方性规定：按工作地点逐案确认，须询问工作地点
- 经济补偿：按法定 N 标准（《劳动合同法》第47条，已核实锚点）
- 工作产物标题：使用通用「雇佣审查备忘录」标题

在每个子技能输出和最终备忘录上标记 `[临时模式]`，并在末尾提示：
> 「这是通用默认值运行。运行 `/employment-legal:cold-start-interview` 来获得定制输出。」

---

## 前置：用人单位方/劳动者方立场确认

**在调用任何子技能前确认审查立场：**

1. **从配置文件读取**：读取 `employment-legal/CLAUDE.md` → `## 谁在使用` → 服务对象（用人单位方/劳动者方）
2. **若不明确，询问**：
   > 「在本次雇佣审查中，你代表的是用人单位方（雇主合规视角）还是劳动者方（员工权益主张视角）？」
3. **确认后传入所有子技能**：立场确认后无需在各子技能中重复询问

---

## 前置：工作地点地方性规定标识

读取 `employment-legal/CLAUDE.md` → `## 我们是谁` → 主要工作地点。

若工作地点不明确，询问：
> 「劳动者的工作地点是哪里（城市/地区）？这影响社保基数、最低工资、竞业补偿指引等地方性规定。」

地方性规定在 `hiring-review-assembly` 子技能中集中核查，此处记录工作地点用于传入。

---

## 前置：目的地与特权检查

在生成任何输出之前：
- 若输出面向对方（如员工）或公开渠道，提醒「发送给对方会使律师-当事人特权保护失效，请选择（a）内部特权版本或（b）面向对方的脱敏版本」
- 若为内部流通，使用律师工作产物标题（从配置文件读取）

---

## 子技能编排顺序

律师/HR 可单独触发任一子技能（如只需检查试用期，直接运行第2步），也可通过本入口运行完整审查：

| 顺序 | 子技能 | 职责 | 子技能路径 | 单独触发命令 |
|------|-------|------|----------|------------|
| 1 | **document-mandatory-terms** | 文件定位（六问表）+ 必备条款九项检查（第17条）+ 无固定期限触发识别（第14条） | `skills/hiring-review/document-mandatory-terms/SKILL.md` | `/employment-legal:document-mandatory-terms` |
| 2 | **probation-working-hours** | 试用期分档合规（第19条，已核实）+ 工时制度审查（标准/综合/不定时）+ 加班费三档（150%/200%/300%） | `skills/hiring-review/probation-working-hours/SKILL.md` | `/employment-legal:probation-working-hours` |
| 3 | **social-insurance-wages** | 五险一金法定义务 + 放弃社保无效（🔴）+ 劳动报酬合规 + 二倍工资风险（第82条，已核实）| `skills/hiring-review/social-insurance-wages/SKILL.md` | `/employment-legal:social-insurance-wages` |
| 4 | **service-period-penalty** | 违约金仅两情形限制（第25条）+ 服务期条件与上限（第22条）+ 无效违约金识别（提前离职/未提前通知）| `skills/hiring-review/service-period-penalty/SKILL.md` | `/employment-legal:service-period-penalty` |
| 5 | **hiring-review-assembly** | 地方性规定检查（北上广深等）+ 汇总分级（🔴/🟠/🟡/🟢）+ 审查备忘录组装 + 交付前质量检查 + 下一步决策树 | `skills/hiring-review/hiring-review-assembly/SKILL.md` | `/employment-legal:hiring-review-assembly` |

**顺序说明**：文件定位在前（确定文件属性和审查适用范围）→ 试用期/工时（合同开始阶段高频风险）→ 社保/报酬（强制性法定义务与二倍工资风险）→ 违约金合法性（常见无效条款）→ 装配（地方性规定 + 汇总备忘录）。

**单独触发场景（举例）**：
- 只需检查试用期：`/employment-legal:probation-working-hours [合同内容]`
- 只需评估社保与二倍工资风险：`/employment-legal:social-insurance-wages [合同内容]`
- 只需判断违约金条款是否合法：`/employment-legal:service-period-penalty [违约金条款]`
- 已有各子技能发现，只需组装报告：`/employment-legal:hiring-review-assembly`

---

## 入口级护栏

以下护栏在编排入口层执行，不依赖子技能：

### 竞业限制条款识别

若文件涉及竞业限制条款：
- `service-period-penalty` 子技能负责识别违约金是否属于合法竞业限制情形
- 竞业限制**深度审查**（人员范围/经济补偿/期限不超2年/范围可执行性）须触发 `non-compete-review` 专项技能（04-02）
- 提示：「文件涉及竞业限制，如需深度竞业审查，完成本次雇佣审查后运行 `/employment-legal:non-compete-review`」

### 劳动关系定性优先

若文件类型不明确（非标准劳动合同）：
- 在调用 `document-mandatory-terms` 前确认文件类型
- 若为劳务协议/实习协议/合作协议，先定性是否构成劳动关系，再决定适用劳动合同法的程度

### 地方性规定适用优先级

工作地点确认后，`hiring-review-assembly` 子技能负责核查地方性规定。
常见地方性差异（社保基数/最低工资/竞业补偿指引）在装配步骤前应已确认工作地点。

---

## 共享资源

进入子技能前，本入口统一读取以下共享资源（子技能自身也会读取，此处列出确保编排时已加载）：

- `employment-legal/skills/_shared/legal-basis-conventions.md` — 劳动人事引用规范
- `employment-legal/skills/_shared/labor-law-citations.md` — 劳动合同法/劳动法/争议仲裁法/社保法引用库
- `employment-legal/skills/_shared/practice-profile-schema.md` — 配置读取契约

---

## 输出

完整审查流程由 `hiring-review-assembly` 子技能最终组装，输出：
- **审查备忘录**（默认）：文件定位摘要 + 必备条款 + 风险分级问题列表 + 修改建议 + 下一步决策树
- **风险摘要**（可选）：仅列🔴/🟠问题的简版，适合快速升级
- 工作产物标题继承 `employment-legal/CLAUDE.md` → `## 输出` → `### 工作产物标题`（律师/非律师角色）
