---
name: feedback-refinement
description: 根据墨律律师反馈精炼 ai-for-china-legal 技能文档；分流 App 问题到 lawyer-desktop；发布后打包 skill 包。
argument-hint: "[时间范围|skill名|remote_id 列表，如：过去7天 litigation-legal down反馈]"
---

# 律师反馈精炼（Feedback Refinement）

你是墨律 Inkstatute 的 **服务端技能优化员**。律师在桌面 App 中点 👍/👎 的反馈经同步服务汇总；你的任务是把反馈转化为 **可验证的 SKILL.md 改动**，而不是改模型权重。

可在 Cursor、Codex、Claude Code 等任意本地 AI 编程助手中加载本 SKILL，无特定工具依赖。

## 何时使用

- 收到 `feedback-export.md` 或调用 `GET /api/feedback/export.md`
- 用户说：「根据最近 XXX 反馈更新 skill」「处理某类文书质量 down 反馈」
- 用户提供同一法律任务的多模型成果及律师人工评价，希望沉淀案例并改进工作流
- 律师把我方成稿改定后发回（定稿、改稿、已发客户的版本），希望对比学习、迭代 skill
- Skill 包发布前需要对照真实律师意见做最后一轮修正

## 输入来源

1. **同步服务导出**（推荐）
   ```bash
   curl -H "Authorization: Bearer $SYNC_API_KEY" \
     "http://127.0.0.1:8787/api/feedback/export.md?rating=down&status=open&skill=litigation" \
     -o feedback-export.md
   ```
2. **本地 CLI**
   ```bash
   cd lawyer-desktop/tools/sync-service
   bun run feedback:export -- --rating=down --status=open -o feedback-export.md
   ```
3. **Dev 环境**（仅开发机）：`lawyer-desktop` 内 `Ctrl+Shift+O` 面板的本地 `skill_feedback` 表
4. **人工操作员反馈**：律师经微信/面谈给出的定性评价 + 本地成果文件。律师评价必须原意记录，不用模型分数替代。

## 仓库分流（必做）

| 反馈特征 | 改哪个仓库 |
|----------|------------|
| 法条、案由、结构、检索、文书质量、skill 逻辑 | `ai-for-china-legal` → 对应 `**/SKILL.md` |
| 同步失败、上传、崩溃、设置 UI、outbox | `lawyer-desktop` |
| 不确定 | 默认 skill；App 问题单独开 issue |

处理后在 sync-service 标记 triage：
```bash
curl -X POST -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" \
  -d '{"remote_id":"<uuid>","status":"handled","target_repo":"ai-for-china-legal","notes":"REPLACE 保函路径规则"}' \
  http://127.0.0.1:8787/api/feedback/triage
```

## 工作流

### 0. 脱敏案例捕获

当用户提供本地成果和律师评价时，先生成案例 id，并记录：任务类型、脱敏事项摘要、输入/输出 sha256、模型/推理档、结构指标、律师原意评价、可复用经验和 skill 改动映射。

Intake 审计以会话转录为准，不以模型自述为准：`INTAKE_DECISION` 是否出现在回复中（只在思考里出现记为未输出）；提问方式（直接问 / 问卷文档 / 未问）；题量（必须确认 / 建议确认 / 可默认 / 材料请求）、答复率，以及答复是否改变了成果。LWC-2026-0006、0008 的记录曾把只出现在思考中的判断记成「已输出」。

- 不复制客户合同、提示词全文、案情全文、批注全文或可识别个人信息；
- 文件路径只保留脱敏 label，不写绝对路径；
- 结构指标只用于解释，律师人审标签权重最高；
- 从单次案例提炼窄规则，不把一次偏好扩张为所有案件的绝对规则；
- 若消费者项目已有 `docs/legal-ops/case-library/`，按其 schema 记录；否则只在会话中生成待保存记录并询问目标仓库。

### 0.1 律师定稿比对

律师以我方成稿为底稿改定后发回时，定稿本身就是最完整的反馈。比对步骤：

1. 两稿各抽取为段落 / 表格行序列：`python3 shared/feedback-refinement/scripts/docx_blocks.py <稿.docx> <out.jsonl>`。脚本只用标准库，标题层级取 outlineLvl 或样式名；
2. 按标题路径分节对齐，逐段算字符级差异：`python3 shared/feedback-refinement/scripts/final_diff.py <我方.jsonl> <定稿.jsonl> <diff.md> <stats.json>`。脚注按正文引用顺序比较（WPS 回存会重排脚注 id）；
3. 先看总量：整节删除与新增、保留 / 改写 / 删除 / 新增段数、脚注变化。保留比例高说明结构与写法被接受，删改集中在哪里就是学习重点；
4. 逐条归类：标题与结构、整节删除、过程性内容、风险评级、确定性措辞、指令性措辞、术语、点名与人名、交叉引用、事实更正、依据更正；
5. 分三类，不把定稿当标准答案。律师的删改可能受客户关系、内部考量、时间等现实因素影响，也只是一位律师的做法：
   - **照做**：任何律师都会认同的成稿规范（概率语气、去内部称谓、去重复、人名最小化等），以及事实与依据的更正。更正要回查来源，并检查语料中的同类内容；
   - **偏好**：合理、但也可以有别的做法的取舍（是否评级、附件取舍、用语）。写进实践配置字段，或作为《成稿说明》中的选项，不改默认；
   - **不学**：照做会降低质量或掩盖风险的删改，如删去影响认定的事实、框架要求的内容、实质缺口，或弱化高风险结论。在案例记录中写明不学的理由；
   - 判断线索：删去而未改正的多为取舍；删去的是事实或风险本身时，先考虑情境因素；同一类表述只改了一部分的，多为低优先级偏好；偏好要有第二个事项印证，才改默认；
6. 每类落到具体 skill 文件，写进案例记录的「Skill 改进映射」；律师原样保留的部分同样记录，作为不应改动的写法；
7. 顺带检查定稿本身的残留：删去附件后的悬空引用（「见附件×」）、空表格骨架、已删释义的简称仍在使用、同一表述改了一处漏了别处。在给操作员的回复中列出，不改律师文件。

首次使用：LWC-2026-0010（定稿保留 751 段、改写 120 段、删除 21 段，整节删除 3 个附件，36 条脚注原样保留）。

### 1. 聚类

- 只处理 `rating=down` 且 `status=open`（除非用户指定 remote_id）
- 按 `plugin_name` / `skill_name` / `dimensions` 聚类
- 写出 3–5 条 **问题模式**（每条引用 remote_id）

### 2. 定位 SKILL.md

- 在 `ai-for-china-legal` 中按 plugin 目录找目标 skill
- 诉讼类反馈优先定位：`litigation-legal`、`matter-intake` 等
- 读取 `shared/research-gate/SKILL.md` 确认检索闸门未被破坏

### 3. 有界编辑（禁止整篇重写）

只使用以下格式：

```
REPLACE:旧文本|||新文本
APPEND:追加段落（放在文档末尾）
```

规则：
- 每次 1–3 处编辑，每处 rationale 写清对应哪条反馈
- 不删除 research-gate 强制步骤
- 不编造法条；新增规则用「待律师复核」标注 uncertain 点

### 4. 验证（闸门）

**评测用例**（若相关）：
- 材料：评测专用目录，需通过 `skillopt_eval_data_roots` 授权
- Gold rubric：评测用例内的评分标准
- Gold reference：律师审定样稿
- 在 `lawyer-desktop` dev 环境：`run_eval_case` / SkillOpt 面板，**val 分数必须严格高于基线**

**一般 skill**：
- 至少人工核对 1 条 down 反馈对应的场景是否改善
- 检查 `.claude-plugin/marketplace.json` 仍有效

### 5. 提交与发布

```bash
# ai-for-china-legal 仓库
git add -A && git commit -m "refine(skills): address lawyer feedback on <topic>"

# 打包到 sync-service（在 lawyer-desktop 仓库）
node tools/publish-skill.mjs --root ../ai-for-china-legal --version 2026.06.15.1 --notes "反馈驱动：..."
# 或
.\tools\publish-skill.ps1 -Version "2026.06.15.1" -Root "..\ai-for-china-legal"
```

律师端 App **无需操作**；下次启动会自动拉取新 skill 包。

## 输出格式

完成后向用户报告：

1. **处理的反馈** — remote_id 列表
2. **问题模式** — 聚类摘要
3. **改动文件** — 路径 + REPLACE/APPEND 摘要
4. **验证结果** — val 分数或人工核对结论
5. **发布版本** — manifest version + sha256
6. **Triage** — 已标记 handled 的 remote_id
7. **案例库** — case id、脱敏记录路径及人审标签

## 禁止

- 在律师 App 或生产包中运行 SkillOpt 管理面板逻辑
- 把 GitHub token / sync API 密钥写入 skill 或 App
- 未经律师授权上传/扩散案情全文；案例库默认只保存脱敏摘要、哈希和评价标签

## 相关文档

- `lawyer-desktop/docs/FEEDBACK_OPS.md` — 完整运维流程
- `lawyer-desktop/docs/CLIENT_SYNC.md` — C→C.5→D 架构
- `lawyer-desktop/docs/SKILLOPT.md` — 评分与有界编辑原理
