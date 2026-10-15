---
name: commercial-contract-review
description: >
  合同审查编排入口。编排五个审查子技能（风险识别 → 法律依据 → 条款修改建议 → 谈判要点 → 输出格式化），
  对照团队实践配置文件审查 inbound 合同，生成具体的修改建议语言并路由到合适的审批人。
  由 /commercial-legal:contract-review 在检测到合同时自动加载。
  深度内容已拆分至子技能目录，见 skills/contract-review/<子技能名>/SKILL.md。
argument-hint: "[合同文件路径或内容]"
---

# 合同审查（编排入口）

> **迁移说明**：原合同审查深度内容（主体资格预检、违约金四维分析、管辖法律差异检查、修改粒度、备忘录组装、交付前质量检查）已拆分迁移至五个子技能。本文件为编排入口，负责前置护栏和子技能调用顺序。子技能路径：`commercial-legal/skills/contract-review/<子技能名>/SKILL.md`。

---

## 事项上下文

**事项上下文。** 检查实践级别 CLAUDE.md 中的 `## 事项工作区` 部分。如果未启用（默认），则使用实践级上下文。如果已启用且没有活跃事项，询问：「这个审查属于哪个事项？运行事项工作区功能（如已集成）切换到对应事项，或说 `practice-level`。」加载活跃事项的 `matter.md` 获取事项级上下文，输出写入事项文件夹。

## 动态事项确认（先读材料，后提问）

加载实践配置后、调用 `risk-identification` 前，执行 `shared/legal-document-intake/SKILL.md`。

- 先完整读取合同、附件、用户文字和既有修订，建立 `known / derived / material_missing / optional_missing`；
- 实践配置中的具体值作为默认；`视情况而定` 表示本事项相关时才询问，不等于配置失败；
- 只问会改变乙方/甲方立场、修订力度、谈判范围、法律路径或内外部版本的问题；
- 每轮优先 2–5 题。人工操作员需要微信沟通时，输出可直接转发的 `[CLARIFY:]` 清单并暂停；
- 用户带回答案后合并到事项摘要，从当前阶段继续，不得重复提问。

合同审查常见候选问题见 `shared/legal-document-intake/references/question-routing.md`，但不得机械全问。

### 目的地检查

优先从用户请求和实践配置推断目的地。仅当内部特权稿、业务摘要或拟直接发送对方的外部修订稿之间存在实质歧义时才询问。外部版本必须去除内部评级、谈判底线和特权标题；详细净化由 `output-formatting` 执行。

---

## 前置条件：加载审查立场

**在阅读合同之前，读取实践配置文件 `commercial-legal/CLAUDE.md`。** 如果配置文件缺失或仍有占位符，显示以下提示：

> 我注意到你还没有配置你的实践档案——这是让我根据你的执业立场、升级规则和文书风格来定制输出的关键。
>
> **两个选择：**
> - 运行 `/commercial-legal:cold-start-interview`（约 2 分钟）来配置你的档案，然后我会根据你的真实审查立场进行审查。
> - 说 **「临时模式」**，我会使用通用默认值——中国法律体系、中等风险偏好、律师角色、无特定审查立场——并在每个输出上标记 `[临时模式 — 配置你的档案以获得定制输出]`。

### 临时模式

如果用户说「临时模式」，正常运行审查，使用以下通用默认值：中等风险偏好，律师角色，中国法律体系，无特定审查立场（标记常见的甲方/乙方风险——无限责任、无数据泄露例外、不明确的违约金、自动续约无通知等）。在审阅者注释和每个发现块上标记 `[临时模式]`。在输出末尾附加：
> 「这是一次通用默认值运行。运行 `/commercial-legal:cold-start-interview` 来获得根据你的真实审查立场、管辖法律、风险偏好定制的输出。约 2 分钟。」

---

## 子技能编排顺序

律师可单独触发任一子技能（见「单独触发」说明），也可通过本入口运行完整审查流程：

| 顺序 | 子技能 | 职责 | 子技能路径 | 单独触发 |
|------|-------|------|----------|---------|
| 1 | **risk-identification** | 条款级风险识别：主体资格预检、交易破坏者、双重严重性、违约金四维、管辖差异核查 | `skills/contract-review/risk-identification/SKILL.md` | `/commercial-legal:risk-identification` |
| 2 | **legal-basis** | 法律依据：按法条/案例/学说分类，来源标签，待验证标注，管辖法律差异检查 | `skills/contract-review/legal-basis/SKILL.md` | `/commercial-legal:legal-basis` |
| 3 | **clause-revision** | 逐条修改建议：最小粒度修改语言，备选方案，修改包汇总 | `skills/contract-review/clause-revision/SKILL.md` | `/commercial-legal:clause-revision` |
| 4 | **negotiation-points** | 谈判策略与底线：硬底线/让步空间/筹码，对方类型差异，升级路由 | `skills/contract-review/negotiation-points/SKILL.md` | `/commercial-legal:negotiation-points` |
| 5 | **output-formatting** | 输出格式化：完整备忘录/微信摘要/修订文档，交付前质量检查，下一步决策树 | `skills/contract-review/output-formatting/SKILL.md` | `/commercial-legal:output-formatting` |

**顺序说明**：风险识别在前（确定问题范围）→ 法律依据第二（为后续修改提供法条依据）→ 修改建议第三（基于法条生成替换语言）→ 谈判策略第四（从修改结果推导谈判路线图）→ 输出格式化最后（汇总组装交付文件）。

**单独触发场景**：律师可在不运行完整流程时，单独触发任一子技能。例如：
- 只需快速风险扫描：`/commercial-legal:risk-identification [合同]`
- 只需查找特定条款的法律依据：`/commercial-legal:legal-basis [合同] --issue 违约金条款`
- 已有风险识别，只需生成修改语言：`/commercial-legal:clause-revision [合同]`

---

## 共享资源加载

进入子技能前，读取以下共享资源（子技能自身也会读取，此处列出确保编排时已加载）：

- `shared/references/subject-qualification-traps.md` — 主体资格陷阱清单（risk-identification 引用）
- `shared/research-gate/references/search-playbooks.md` — 搜索策略（涉担保/主体资格/管辖时使用）
- `shared/research-gate/references/quality-gates.md` — 研究质量闸门（合同审查附加闸门）
- `commercial-legal/skills/_shared/legal-basis-conventions.md` — 法律引用规范（legal-basis 引用）
- `commercial-legal/skills/_shared/civil-code-contract-citations.md` — 民法典合同编引用库（legal-basis 引用）

---

## 入口级护栏

以下护栏在编排入口层执行，不依赖子技能：

### 合同金额处理

先从正文、附件、订单或计价公式计算/归纳金额。只有金额会影响本次审批路由、责任上限或修订策略且无法从材料取得时才询问。金额对本次工作不构成实质影响时，标记「金额未确认，审批路由待律师判断」并继续，不得因固定问卷阻断全文审查。

### 哪一方

优先从用户明确指令和合同角色推断我方立场；只有存在合理歧义时才询问：「在这个协议中，[机构] 是哪一方、希望保护谁？」不得重复询问用户已经明确的「代表甲方/乙方」。

### 交易破坏者优先

若 risk-identification 发现交易破坏者，在继续后续子技能前标记并告知律师。此问题不解决则后续子技能结果参考意义有限。

---

## 输出：完整审查流程完成

完整审查流程由 `output-formatting` 子技能最终组装，包含：
- 完整备忘录（默认）：风险 + 修改建议 + 法律依据 + 谈判要点 + 审批路由
- 微信群摘要（可选）：两行摘要格式
- 修订文档（可选）：带修订标记

输出继承实践配置文件 `## 输出` 中的工作产物标题和静默模式规则。本备忘录和基础协议可能受律师-当事人特权保护；仅在特权圈内分发。

---

## 硬性护栏（不可绕过）

### 输出与落盘确认

遵循 `shared/legal-document-intake/SKILL.md` 的动态规则：

- 用户已明确 Word/修订稿/备忘录及目标路径时直接执行，不重复反问；
- 实践配置已有「源文件同目录、新建后缀」等安全默认且不会覆盖原件时，可采用默认并简短说明；
- 只有格式或目标仍不明、可能覆盖原件、涉及外部发送或特权泄露时才阻断确认；
- 永远不覆盖原件，除非用户明确指定覆盖。

### 先检索、后结论

在给出任何法律结论、条款建议或风险判断之前：

1. 优先使用可用的检索工具核对**现行有效**的法律法规、司法解释及指导性案例（注意修订、修正与废止情况）；
2. 无检索工具或无法核实时，必须在结论处明确标注「未经检索核实，请以现行有效文本为准」；
3. 禁止凭记忆断言法条编号、发文文号或生效日期。
