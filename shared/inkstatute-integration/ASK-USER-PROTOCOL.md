# 墨律 `ask_user` 澄清问题协议

> **消费者**：墨律桌面端（`lawyer-desktop`）通过 `ask_user` 工具渲染可点击澄清卡片。  
> **维护**：与 `src-tauri/src/skills/router.rs` 中工具 schema 保持同步。

---

## 何时调用

- 正式起草或案情分析前，关键事实缺失（立场、标的、程序阶段、业务类型等）。
- 每轮 2–4 题，调用后宿主暂停等待用户提交。
- 用户消息或「以下是补充信息」答复已覆盖全部要点时，**禁止重复提问**。

## 单选 vs 多选

| 场景 | `allow_multiple` | 示例 |
|------|------------------|------|
| 互斥事实、唯一立场 | `false`（默认） | 代理原告/被告、是否已起诉、金额区间 |
| 可同时成立的类型/范围/关切 | `true` | 业务领域、已接入系统、关切重点、文书风格偏好 |

**规则**：按每题语义单独配置，不要全局强制多选。题干可写「（可多选）」以提示用户，但 UI 是否多选以 `allow_multiple` 为准。

## 工具参数示例

```json
{
  "intro": "起草前需确认以下要点，以便选用合适模板与检索策略。",
  "questions": [
    {
      "id": "party_role",
      "question": "贵方在本交易中是甲方还是乙方？",
      "allow_multiple": false,
      "options": [
        { "label": "甲方", "value": "party_a" },
        { "label": "乙方", "value": "party_b" }
      ]
    },
    {
      "id": "contract_types",
      "question": "本次涉及哪类合同？",
      "allow_multiple": true,
      "options": [
        { "label": "租赁合同", "value": "lease" },
        { "label": "买卖合同", "value": "sale" },
        { "label": "服务合同", "value": "service" }
      ]
    }
  ]
}
```

## 用户答复格式（宿主 → 模型）

用户提交后，宿主以隐藏消息发送：

```
以下是补充信息，请基于这些答案继续推进起草：

1. 贵方在本交易中是甲方还是乙方？
回答：甲方

2. 本次涉及哪类合同？
回答：租赁合同、买卖合同
```

- 单选：`answer` 为单个 `value`。
- 多选：`answer` 为多个 `value` 以 `|` 拼接（如 `lease|sale`）；展示文案为中文标签以 `、` 连接。

## 与各 cold-start skill 的关系

各 plugin 的 cold-start 访谈 SKILL 中「可多选」类问题，在通过 `ask_user` 落地时应设 `allow_multiple: true`；单选题保持默认或显式 `false`。

---

*最后更新：2026-06-14*
