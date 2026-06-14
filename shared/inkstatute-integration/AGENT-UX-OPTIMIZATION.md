# 墨律 Inkstatute Agent UX 优化待办

> **用途**：供 AI 在 `ai-for-china-legal` 项目中读取并优化相关 skill。  
> **消费者**：墨律桌面端（`lawyer-desktop`）通过 skill 路由 + 系统提示调用本仓库技能。  
> **维护**：发现新的 agent 交互缺口时追加条目，优化完成后将状态改为 `done` 并注明关联 skill。

---

## 背景

墨律工作区左侧应持续展示起草流程（研究闸门 → 需求收集 → 类案检索 → 正文起草 → 风险审查）。  
当前桌面端已用 `streamPhase`（`thinking | tool | streaming | review`）驱动五步 UI，但 **agent 行为** 仍与早期产品设计存在差距，需在本仓库 skill 层补齐。

---

## P0 — 必须与产品交互对齐

### 1. 起草前反问（需求收集闸门）`open`

| 字段 | 内容 |
|------|------|
| **产品期望** | 用户给出初稿意图后，agent **先反问 3–6 个结构化问题**（合同类型、立场、金额、期限、交付、争议解决等），信息不足时 **阻断进入正文起草**。 |
| **现有 skill 覆盖** | `commercial-legal/skills/contract-drafting/requirements-intake/SKILL.md` 已有完整问题矩阵与「信息不全须追问」规则；`contract-drafting/SKILL.md` 编排入口写明步骤 1 信息不全时停下追问。 |
| **缺口** | ① 缺少 **跨文书类型**（起诉状、律师函、法律意见书）的统一 intake skill；② Inkstatute 系统提示要求「直接输出 JSON 正文」，与 intake 闸门 **冲突**；③ 无机器可读输出格式（如 `intake_questions[]`）供前端渲染为可点击追问卡片。 |
| **建议优化** | 新建 `shared/inkstatute-integration/legal-document-intake/SKILL.md`（或扩展各 plugin 的 intake 子技能），规定：<br>• 触发条件：用户首次起草且关键字段缺失<br>• 输出 JSON：`{ "mode": "intake", "questions": [{ "id", "text", "priority", "options?" }] }`<br>• 明确 **禁止** 在 `mode=intake` 时输出文书 JSON<br>• 各 plugin 编排入口在步骤 1 引用此约定 |
| **关联 skill** | `contract-drafting/requirements-intake`、`research-gate`、`litigation-legal` 各 matter-intake 类子技能 |

### 2. 完成后建议深入提示词 `open`

| 字段 | 内容 |
|------|------|
| **产品期望** | 文书生成结束后，agent 提供 **3–5 条可一键发送的后续提示**（如「补充违约责任上限」「增加不可抗力」「对照民法典 585 条收紧违约金」）。 |
| **现有 skill 覆盖** | `contract-drafting/output-generation` 含谈判要点、风险提示，但面向 **律师内部工作产物**，无面向终端用户的 **follow-up prompt 清单**；其他文书类型 skill 普遍缺失此段。 |
| **缺口** | 无统一 skill 约定输出 `suggested_prompts[]`；桌面端无法渲染建议芯片。 |
| **建议优化** | 在 `shared/inkstatute-integration/` 增加 `post-draft-follow-ups/SKILL.md`，或在 `output-generation` 末尾增加标准章节：<br>• 输出 JSON 字段：`suggested_prompts: { label, prompt, rationale? }[]`<br>• 按文书类型 + 风险自查结果 **动态生成**（非静态模板）<br>• 与 `risk-self-check` 的 🔴/🟠 项联动 |
| **关联 skill** | `contract-drafting/output-generation`、`contract-drafting/risk-self-check`、各 plugin 编排出口 |

### 3. 流程步骤与 stream phase 对齐 `open`

| 字段 | 内容 |
|------|------|
| **产品期望** | UI 五步：查询法律法规 → 解析交易背景 → 检索类案 → 拟定正文 → 审查风险。 |
| **现有 skill 覆盖** | `research-gate` + `contract-drafting` 五步子技能语义一致，但 **无 phase 标记协议**。 |
| **建议优化** | 在 `shared/inkstatute-integration/` 增加 `streaming-phase-protocol.md`，约定 agent 在工具调用/思考阶段通过结构化注释或 tool result 上报 `phase`，供宿主映射 UI（或由宿主仅依赖现有 `thinking/tool/streaming/review`）。 |

---

## P1 — 增强 agent 智能化（建议纳入 skill）

### 4. 风险预警前置 `open`

在 `requirements-intake` 或 `framework-design` 阶段，根据金额阈值、期限、数据合规、担保等 **自动插入风险预告**（不等全文起草完才提示）。引用 `commercial-legal/CLAUDE.md` 升级矩阵。

### 5. 附件/证据交叉引用 `open`

用户上传材料后，agent 在起草前生成 **事实-证据对照表**（主张 ↔ 附件段落），缺失证据时标注 `[证据待补充]`。可挂在 `shared/research-gate` 之后的新子技能 `fact-evidence-map`。

### 6. 多稿版本差异说明 `open`

修订轮次中，输出 **条款级 diff 摘要**（改了什么、为何改、谈判影响），而不只给新全文。扩展 `output-generation` 或新建 `revision-summary` 子技能。

### 7. 主动合规缺口扫描 `open`

对照 `research-gate` 研究底稿，列出 **未覆盖的强制性规定**（格式：法规 + 条文 + 缺口说明 + 建议条款位置）。可在 `risk-self-check` 前增加 `mandatory-gap-scan` 步骤。

### 8. 对方立场模拟 `open`

在合同起草场景，生成 **对方可能的异议点与反驳论据**（内部备忘录格式），辅助律师谈判准备。可作为 `output-generation` 可选附录。

### 9. 程序时限提醒 `open`

诉讼/行政应对类文书，自动从事实日期推算 **起诉/复议/上诉期限**（带 `[待律师核实]`）。参考 `regulatory-legal` cold-start 中的时限访谈，输出到 `post-draft-follow-ups`。

### 10. 技能路由透明化 `open`

`select_skill` 激活后，在对话中简短说明 **为何选用该 skill、将执行哪几步**（1–2 句），与用户看到的五步进度一致。在 `legal-builder-hub` 或各编排入口 `SKILL.md` 增加「Inkstatute 宿主提示」小节。

---

## P2 — 宿主（lawyer-desktop）侧待配合项

以下不由 skill 单独完成，但优化 skill 时需知：

| 项 | 说明 |
|----|------|
| 反问 UI | 解析 `mode=intake` JSON，渲染可填写的追问卡片 |
| 建议提示 UI | 解析 `suggested_prompts`，渲染为输入框上方芯片，点击即发送 |
| 进度持久化 | 已修复：`draftWorkflowActive` 在解析完成前保持五步可见 |
| 系统提示冲突 | `router.rs` 中「禁止过程说明、直接输出 JSON」需与 intake 闸门 **分模式** 切换 |

---

## 优化验收清单（AI 执行时用）

- [ ] `requirements-intake` 类 skill 在信息不足时 **必定** 输出 intake 模式而非正文
- [ ] 至少 `contract-drafting` 全流程在完成后输出 `suggested_prompts`
- [ ] `research-gate` 与起草编排的步骤顺序在文档中 **显式映射** 到 Inkstatute 五步 UI
- [ ] 新增/修改的 JSON 输出格式在本文件有 **示例**
- [ ] 跨 plugin（诉讼/商事/监管）有统一 intake 与 follow-up 约定或明确例外

---

## JSON 输出示例（待 skill 实现后填入实参）

### Intake 模式

```json
{
  "mode": "intake",
  "skill": "contract-drafting",
  "questions": [
    {
      "id": "party_role",
      "text": "贵方在本交易中是甲方（承租方）还是乙方（出租方）？",
      "priority": "required"
    },
    {
      "id": "rent_amount",
      "text": "月租金与押金金额是多少？付款方式（月付/季付）？",
      "priority": "required"
    }
  ]
}
```

### 完成后建议提示

```json
{
  "mode": "draft_complete",
  "suggested_prompts": [
    {
      "label": "收紧违约金",
      "prompt": "请对照民法典第585条，将违约金调整为合同总价20%并补充实际损失条款"
    },
    {
      "label": "补充房屋现状",
      "prompt": "请增加附件：房屋交接清单与设施状况说明"
    }
  ]
}
```

---

*最后更新：2026-06-10 · 来源：墨律用户反馈（进度条消失、反问与建议提示缺失）*
