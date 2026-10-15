---
name: commercial-equity-transaction-dd
description: >
  股权交易法律尽职调查报告编排入口。面向投资方 / 受让方对目标公司的资料室尽调：
  资料清单与去重 → 分章事实底稿（每条注明文件与页码，主笔回原件核对）→ 交易程序核查
  （国资 / 外资 / 上市公司 / 经营者集中 / 优先购买权 / 控制权变更触发条款）→ 尽调报告 +
  问题清单三分类 + 编制说明，沿用律所参考稿版式。交易结构为首要澄清项，未答时按一般情形撰写并逐章注明。
  深度内容见 skills/equity-transaction-dd/<子技能名>/SKILL.md。
argument-hint: "[资料室目录] [参考稿 / 模板路径] [委托方与交易结构（如已知）]"
---

# 股权交易法律尽职调查报告（编排入口）

> **来源**：案例库 LWC-2026-0005（国有控股中外合资企业股权交易尽调，354 份资料，125 页报告 + 问题清单 + 编制说明）。律师复核稿，人审待回填；本技能固化流程与检查清单，不固化该案结论。
> 单份合同审查用 `contract-review`；本技能面向**整个目标公司**的资料室尽调。

---

## 目的

把「资料室 → 分章底稿 → 报告」做成可溯源、可覆盖审计、可换模型续写的流程。重大发现要能回到文件与页码；交易结构未知造成的结构性局限要被显式标注，而不是被通用措辞掩盖。

---

## 前置条件：加载审查立场

读取 `commercial-legal/CLAUDE.md`。配置缺失或含 `[PLACEHOLDER]` 时按 `contract-review` 的「临时模式」处理，默认：律师角色、平衡型、中国法律体系。尽调报告的立场由委托方身份决定（投资方 / 受让方 / 贷款人），来自指令而非配置。

---

## 动态事项确认（先读材料，后提问）

执行 `shared/legal-document-intake/SKILL.md`，并按 `shared/references/due-diligence-playbook.md` 第 1 节判定：

- **阻断项**：委托方身份与报告受众；参考稿 / 模板的使用规则（哪些段落不得参考，版式沿用范围）；
- **交易结构**（受让哪一方股权、比例、是否增资、是否取得控制权）：会改变国资程序、外资程序、经营者集中、优先购买权与控制权变更条款分析。可考虑开工前用一个问题澄清；未答时按「一般情形」继续并列为 `deferred_items` 首项，受影响章节逐章注明；
- **可后置项**：基准日 / 出具日期占位；联网外部检索许可（默认不联网并在报告中声明）。

本类任务为正式对外报告，`execution_profile` 默认 `critical`，开工前必须输出 `INTAKE_DECISION`。LWC-2026-0005 读取了 intake 却未输出决策，是已记录的流程缺口。

---

## 共享资源

- `shared/references/due-diligence-playbook.md` — 资料清单、底稿 schema、覆盖审计、问题清单三分类
- `shared/references/document-delivery-qa.md` — 模板复刻、渲染 QA、发送包隐私检查
- `shared/references/subject-qualification-traps.md` — 国企 / 上市公司 / 外商投资企业主体陷阱
- `shared/research-gate/SKILL.md` — 法条原文核对
- `commercial-legal/skills/_shared/legal-basis-conventions.md` — 引用规范
- `commercial-legal/skills/_shared/transaction-procedure-citations.md` — 国资 / 外资 / 公司法 / 经营者集中程序锚点
- `commercial-legal/skills/_shared/civil-code-contract-citations.md` — 重大合同评析引用
- `employment-legal/skills/_shared/dispatch-vs-outsourcing-checklist.md` — 劳动用工章节的外包 / 派遣定性

---

## 子技能编排顺序

| 顺序 | 子技能 | 职责 | 路径 | 单独触发 |
|------|-------|------|------|---------|
| 1 | **data-room-inventory** | 资料室清点、去重、分章映射、提取路径、聚合指纹、覆盖审计 | `skills/equity-transaction-dd/data-room-inventory/SKILL.md` | `/commercial-legal:data-room-inventory` |
| 2 | **chapter-fact-memos** | 分章事实底稿：每条注明文件与页码、原件核对、数字勾稽、版本冲突 | `skills/equity-transaction-dd/chapter-fact-memos/SKILL.md` | `/commercial-legal:chapter-fact-memos` |
| 3 | **transaction-procedure-check** | 国资、外资、上市公司、经营者集中、优先购买权、控制权变更触发条款 | `skills/equity-transaction-dd/transaction-procedure-check/SKILL.md` | `/commercial-legal:transaction-procedure-check` |
| 4 | **dd-report-issue-list** | 报告、问题清单三分类、编制说明；模板复刻与 QA；`REVIEW_STATUS` | `skills/equity-transaction-dd/dd-report-issue-list/SKILL.md` | `/commercial-legal:dd-report-issue-list` |

**顺序说明**：先把资料盘清（否则覆盖审计无基准）→ 底稿（报告的唯一事实来源）→ 程序核查（依赖股权结构、章程、合资合同等底稿）→ 装配。覆盖审计在第 4 步装配前由第 1 步的清单复跑。

---

## 入口级护栏

- **特殊主体即专章**：目标公司或股东为国资、外商投资企业、上市公司时，报告必须有交易程序章节，依据见 `transaction-procedure-citations.md`。
- **核心经营资源依赖提示**：经营权 / 特许、核心资产租赁、融资三者中两项以上来自同一控股股东体系时，摘要合并提示「控制权变更后可能同时失去支撑」，不得分散在三章各说一句。
- **原件核对**：子代理 / OCR 底稿只用于定位；章程条文、决议版本、委派日期、文号、金额由主笔回原件核对后才进报告。
- **数字勾稽**：金额用两个以上独立来源；只有一个来源时写明；假设性测算（如滞纳金）列假设与敏感性。
- **条号来源**：合资合同条号与章程条号不得混用；取不到原文的地方规定与部门文件不写条号。
- **外部检索声明**：未做企业信用、裁判文书、执行、信用中国核验时在方法说明中声明并进问题清单。
- **个人信息**：含身份证号的底稿留内部目录；发送包正则检查。

---

## 输出

由 `dd-report-issue-list` 组装三件：

1. **尽调报告**（律师复核稿）：沿用参考稿章节与版式；管理层摘要从正文倒推；每章「法律评析」小节；
2. **问题清单**：补充资料 / 待说明（事实矛盾）/ 需律师决定三分类；
3. **编制说明**：工作流程、资料来源对照、计算方法、已纠正错误、法条核验表。

交付说明列占位符、外部检索与独立复核执行情况；成稿恒标「律师复核稿」。

---

## 硬性护栏（不可绕过）

### 动态 Intake 与输出确认

遵循 `shared/legal-document-intake/SKILL.md`：资料目录、参考稿、输出目录已明确时直接执行，不重复询问；委托方身份、参考稿排除规则等阻断项缺失，或写入目标可能覆盖参考稿时，才输出 `[CLARIFY:]` 并暂停。参考稿与资料原件永不覆盖。

### 先检索、后结论

每一处法条在写入前经 `shared/research-gate/SKILL.md` 取官方原文核对现行版本；按通行文本引用而未下载原文的条文在问题清单「需律师复核」中列明。

### 独立复核可观察

交付前按 `shared/legal-document-intake/SKILL.md` 输出 `REVIEW_STATUS`；未做不同模型独立复核时写 `skipped` 与原因。
