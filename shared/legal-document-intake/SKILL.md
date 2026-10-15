---
name: legal-document-intake
description: >
  在中国法律研究、合同审查/起草、诉讼文书、法律意见书或律师函开始前，先读取用户材料，
  判断哪些缺失信息会实质改变结论或成稿，只提出必要问题，并生成可恢复的事项摘要。
  适用于 ask_user 交互和人工微信中继；纯机械转换且关键信息已齐全时跳过提问。
---

# 法律事项动态 Intake

## 目标

把「律师发来文字/文件 → 操作员转交 LLM → 律师补充 → 继续执行」变成可恢复流程。
先理解材料，再问会改变成果的问题；不要把固定问卷当作闸门，也不要重复询问文档中已有的信息。

操作员忘记如何发起、恢复或分派任务时，读取
[references/operator-quickstart.md](references/operator-quickstart.md)，其中提供可直接复制的提示词。

## 执行时机

在实质研究、风险结论或文书起草前执行。允许先做只读材料清点和文本提取。

以下情况可直接进入下一技能：

- 请求是纯格式转换、拆分、提取或机械校对，且没有法律判断；
- 用户材料和实践配置已覆盖本次任务的全部实质要点；
- 律师明确授权「按你的判断处理」，且剩余缺口可以用已披露假设安全处理。

## 第一步：重建已知事项

读取用户消息、全部指定文件、会话既有答复和适用实践配置，形成四组状态：

1. `known`：律师明确提供的事实和偏好；
2. `derived`：可从文件、文件名、上下文或配置可靠推出的信息；
3. `material_missing`：不同答案会改变法律路径、立场、修订力度、请求权、风险分配或交付物；
4. `optional_missing`：只影响细节，可使用配置默认值、保守默认值或在成稿中标注待确认。

`derived` 不得再次询问。对推断置信度不足的内容，应改列为 `material_missing`。

## 第二步：决定是否阻断

只有缺失信息满足下列任一条件时，才阻断并询问：

- 可能选错我方身份、文书类型、适用程序或审查范围；
- 会改变重大商业条款、责任边界、解除条件、救济或谈判底线；
- 会导致文书无法执行、引用错误、遗漏强制性规则或侵犯第三方权益；
- 会决定输出是内部特权版本还是拟直接发送对方的外部版本；
- 无法安全确定目标文件、输出格式或保存位置，且写错会覆盖或泄露材料。

金额、期限、输出路径等并非天然阻断项。只有其对本次任务确实重要且无法从材料或配置取得时才询问。

既有文书的内部审阅可以采用条件性继续：若缺口能通过明确假设、条件性结论、批注和证据清单安全处理，将其记入 `deferred_items`，使用 `draft_mode: conditional`，不要求用户先回复。拟直接外发、提交法院/监管机关或要求无保留结论时，核心事实缺口不得后置。

按任务选择问题时，读取 [references/question-routing.md](references/question-routing.md)。
遇到是否应提问的边界情形时，参照 [references/intake-examples.md](references/intake-examples.md)。

## 可观察的 Intake 决策（必须）

完成材料清点和重要性判断后、进入实质研究或正文前，必须在简短进度消息中输出：

```text
[INTAKE_DECISION]
intake_status: ready | clarify
reason: [一句话说明为什么继续或暂停]
draft_mode: complete | conditional | not_applicable
deferred_items:
  - [不阻断但将在正文、批注或待核实清单处理的事项；没有则写 none]
[/INTAKE_DECISION]
```

要求：

- 这是操作员可见的流程凭证，不写入最终法律文书；
- 不复制客户原文，每项只写脱敏短语；
- `ready` 表示直接继续，不让用户额外确认；
- `clarify` 后必须输出 `[CLARIFY:]` 并暂停；
- 纯机械任务可使用 `draft_mode: not_applicable`；
- 不得沉默跳过该决策，也不得为展示该区块而机械制造问题。

## 第三步：提出最小问题集

- 每轮优先 2–5 题；同一轮不要超过 6 题。
- 先问「必须回答」，再列「可按默认值处理」。
- 每题只解决一个决定，使用稳定 `id`，并说明它影响什么。
- 有合理默认值时给出推荐默认；无安全默认值时不要诱导答案。
- 第一轮答复后仅在新事实暴露新的关键分支时再问一次。通常最多两轮。
- 用户已回答或文件已覆盖的题目禁止重复。

### 有 `ask_user` 工具

遵循 `shared/inkstatute-integration/ASK-USER-PROTOCOL.md`，按题目语义设置单选/多选。

### 人工微信中继

没有可用交互工具，或用户需要把问题转发给律师时，输出可直接复制的清单：

```text
[CLARIFY:]
给律师确认（请按序号回复即可）：

必须确认
1. [问题]
   影响：[为何会改变成果]

可按默认值处理
2. [问题]
   建议默认：[默认值]

已从材料确认：[不超过三条的摘要]
[/CLARIFY]
```

输出清单后暂停，不得同时生成结论性文书。`[CLARIFY:]` 未解决前不得声称文书已完成。

## 第四步：合并答复并恢复

用户带回微信答复或宿主返回 `ask_user` 结果后：

1. 按问题 `id` 合并到事项摘要；
2. 标记仍未回答的必须项；
3. 不重复读取/追问已解决项；
4. 必须项全部解决后，从已完成的材料清点阶段继续，而非重新开始；
5. 对律师明确交由模型判断的事项，记录 `assumption_authorized` 及采用的假设。

恢复后维护一份会话内摘要：

```yaml
intake_status: ready | clarify
task_type: contract_review | contract_drafting | litigation | opinion | correspondence | research
draft_mode: complete | conditional | not_applicable
deliverable: "..."
party_role: "..."
audience: internal | external | mixed
confirmed: []
assumptions_authorized: []
deferred_items: []
open_items: []
```

该摘要只用于会话连续性，不得写入客户原文或敏感材料到日志、案例库或遥测。

## 执行建议（可选）

当用户是多模型/多 agent 操作员，或实践配置要求独立复核时，输出与品牌无关的 `execution_profile`：

- `standard`：单一主模型 + 自检；
- `high`：强主模型起草 + 独立模型复核；
- `critical`：材料提取、权威检索、起草、独立复核分角色执行，最后仍由律师人审。

不要猜测用户额度，也不要硬编码模型品牌。需要规划时读取
[references/operator-orchestration.md](references/operator-orchestration.md)。

## 输出与保存位置

若用户已明确格式、源文件和目标位置，禁止重复确认。

若实践配置已有稳定默认值且不会覆盖原件，可采用默认值并在开始前简短说明。只有目标不明、可能覆盖原件、涉及外部发送或存在特权风险时才询问。

任何高风险法律结论和正式对外文书仍须律师复核；动态 intake 只减少无效追问，不降低研究闸门和人审要求。
