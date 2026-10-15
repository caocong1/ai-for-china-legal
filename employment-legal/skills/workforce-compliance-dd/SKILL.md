---
name: employment-workforce-compliance-dd
description: >
  劳动用工合规调查（尽调）报告编排入口。面向「指令文件 + 报告模板 + 底稿资料包」形态的任务：
  三表交叉比对（花名册 / 社保公积金表 / 考勤表）→ 用工形态分类定性（直签 / 派遣 / 外包 / 劳务 /
  实习 / 关联公司交叉用工 / 异地代缴 / 代发薪）→ 劳动合同文本与规章制度逐条审查（以 2025 年
  劳动争议司法解释二和工作地点年度地方标准为基准）→ 重大问题汇总与「待核实事项及待补充资料」附录装配。
  适用于上市公司自查、投资方尽调、集团对子公司或外包用工的合规调查。
  深度内容见 skills/workforce-compliance-dd/<子技能名>/SKILL.md。
argument-hint: "[指令文件 / 资料包目录 / 报告模板路径]"
---

# 劳动用工合规调查报告（编排入口）

> **来源**：案例库 LWC-2026-0006（上市公司本部用工合规调查，116 份底稿，125 页报告）与 LWC-2026-0005 劳动章节的可复用经验。两案均为律师复核稿，人审待回填；本技能固化的是流程与检查清单，不是质量结论。
> 单题审查（一份劳动合同、一份竞业协议）仍用 `hiring-review` / `non-compete-review` 等技能；本技能面向**整家公司或一个用工群体**的调查报告。

---

## 目的

把「资料包 → 可复算的用工口径 → 分类定性 → 文本评析 → 报告 + 附录」做成可恢复、可溯源的流程：每个结论能回到底稿文件与页码，每个未核实事实以条件句进入正文并出现在附录清单。

---

## 前置条件：加载审查立场

读取 `employment-legal/CLAUDE.md`。配置缺失或含 `[PLACEHOLDER]` 时按 `hiring-review` 的「临时模式」规则处理，默认：风险偏好平衡型、立场为被调查公司合规视角、工作地点按资料确认。调查报告的立场由指令文件决定（公司自查 / 投资方 / 集团管理），不得从模板旧稿沿用。

---

## 动态事项确认（先读材料，后提问）

执行 `shared/legal-document-intake/SKILL.md`，并按 `shared/references/due-diligence-playbook.md` 第 1 节判定必答项：

- **受众与立场**：报告面向公司管理层自查，还是投资方 / 贷款人；决定措辞确定性与附录口径；
- **重点关注项**：指令文件列明的（如「假外包真派遣」「社保委托代缴」）优先；无则按本技能默认清单；
- **章节与资料夹对应**：指令文件通常规定「第三部分按资料夹分章、第二部分从正文归纳」，按其顺序执行；
- **可后置项**：尽调期间、出具日期、释义表简称、3 份以内文件的金额 / 日期识别不清 → `deferred_items`，进附录并在交付说明点名。

本类任务为正式对外报告，`execution_profile` 默认 `critical`。开工前必须输出 `INTAKE_DECISION`；指令文件 + 模板 + 资料包齐备时通常为 `ready` + `draft_mode: conditional`，不必澄清。

---

## 共享资源

- `shared/references/due-diligence-playbook.md` — 资料清单、分章底稿、覆盖审计、问题清单三分类的数据结构
- `shared/references/document-delivery-qa.md` — 模板包成稿、渲染 QA、发送包隐私检查
- `shared/research-gate/SKILL.md` — 法条与地方标准联网核对
- `employment-legal/skills/_shared/legal-basis-conventions.md` — 引用规范
- `employment-legal/skills/_shared/labor-law-citations.md` — 引用库（G 节：法释〔2025〕12 号；H 节：劳务派遣）
- `employment-legal/skills/_shared/dispatch-vs-outsourcing-checklist.md` — 派遣 / 外包 / 代缴 / 代发薪定性对照表
- `employment-legal/skills/_shared/local-rules-beijing.md` — 工作地点年度地方标准（北京版；其他城市按同结构维护）

---

## 子技能编排顺序

| 顺序 | 子技能 | 职责 | 路径 | 单独触发 |
|------|-------|------|------|---------|
| 1 | **headcount-reconciliation** | 资料清点、OCR 后台化、三表交叉比对口径固化、差异清单 | `skills/workforce-compliance-dd/headcount-reconciliation/SKILL.md` | `/employment-legal:headcount-reconciliation` |
| 2 | **workforce-classification** | 用工形态分类定性：直签 / 派遣 / 外包 / 劳务 / 实习 / 关联公司交叉用工 / 异地代缴 / 代发薪；协商解除协议审查 | `skills/workforce-compliance-dd/workforce-classification/SKILL.md` | `/employment-legal:workforce-classification` |
| 3 | **contract-policy-review** | 劳动合同文本与规章制度逐条审查，以司法解释二和地方年度标准为基准识别旧规则残留 | `skills/workforce-compliance-dd/contract-policy-review/SKILL.md` | `/employment-legal:contract-policy-review` |
| 4 | **dd-report-assembly** | 先正文后倒推重大问题汇总，附录三分类，模板包成稿，交付说明与 `REVIEW_STATUS` | `skills/workforce-compliance-dd/dd-report-assembly/SKILL.md` | `/employment-legal:dd-report-assembly` |

**顺序说明**：先把人数与用工类型口径固化（否则后面每个比例都会变）→ 再定性 → 再审文本（定性结果决定哪些合同要重点看）→ 最后装配。单独触发第 2 步时须先提供第 1 步的口径表。

---

## 入口级护栏

- **司法解释二基准**：2025-09-01 之后的用工审查以法释〔2025〕12 号重判混同用工、变换主体续签、二倍工资、竞业限制范围与补偿、社保约定无效与补贴返还；旧结论不得沿用。
- **地方标准版本**：最低工资、社保基数、生育假天数按年度版本核对；客户文本中的旧数字是发现项，不是背景。
- **OCR 只定位**：扫描件 OCR 后台执行；识别不清的金额、日期、人名不得按推测填写，标【待核实】并进附录。
- **个人信息**：底稿含身份证号、住址时放内部目录；报告与附录只用工号或脱敏称谓；发送包做正则检查。
- **条件性表述**：代发薪人员是否构成派遣、外包人员此前是否已直接用工等推断性结论，正文用条件句并放附录前列。
- **覆盖审计**：装配前核对资料包每个文件是否被引用（playbook 第 4 节）。

---

## 输出

由 `dd-report-assembly` 组装：

- **报告正文**：按指令文件章节（通常：组织架构与用工概况 / 劳动人事 / 诉讼仲裁与处罚），每章含用工分类表、合同与制度评析、社保公积金分析；
- **重大问题汇总**：从正文倒推，每项注明正文位置与风险等级；
- **附录**：待核实事项及待补充资料（序号 / 事项 / 需提供的资料或说明），「需律师决定」项可识别；
- **交付说明**：占位符清单、目录域刷新提示、未执行事项（外部检索、独立复核）。

工作产物标题继承 `employment-legal/CLAUDE.md` → `## 输出`；成稿恒标「律师复核稿」。

---

## 硬性护栏（不可绕过）

### 动态 Intake 与输出确认

遵循 `shared/legal-document-intake/SKILL.md`：指令文件已明确模板、章节与资料夹对应、保存位置时直接执行，不重复询问；只有受众 / 立场、参考稿排除规则等会改变成果的必须项缺失，或写入目标可能覆盖模板原件时，才输出 `[CLARIFY:]` 并暂停。模板 DOCX 永不覆盖，成稿另存新文件。

### 先检索、后结论

每一处法条、司法解释条号、地方标准数字在写入前经 `shared/research-gate/SKILL.md` 联网核对现行版本；无法核对的标 `[待律师复核]`，不凭记忆写条号或金额。

### 独立复核可观察

交付前按 `shared/legal-document-intake/SKILL.md` 输出 `REVIEW_STATUS`。未做不同模型独立复核时写 `independent_review: skipped` 并给出原因，不得沉默。
