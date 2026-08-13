# 参考来源索引（SOURCE_INDEX）

本文件是外部 Git 参考仓库的**钉选清单**。后续迭代必须先读本表，用 `git ls-remote` 对照 HEAD，再决定是否合入。

- **分析版本**：1.1
- **钉选日期**：2026-08-13
- **迭代技能**：`.qwen/skills/iterate-reference-sources/SKILL.md`
- **差距分析**：`.planning/research/UPSTREAM-GAP-2026-08.md`

本仓库在 2026-06 初建时**未记录**上游 commit SHA。本表从 1.0 起补钉。

## 许可与合入规则

| 许可 | 合入方式 |
|------|----------|
| Apache-2.0 | 可改编合入本仓库技能与参考文档，须在 SOURCE_INDEX 与落地文件中注明来源 |
| CC BY-NC-ND 4.0 | **禁止逐字拷贝** SKILL.md / 检查清单原文；只吸收方法论并**重写**后落地；在本表引用 |
| 未声明许可证 | **不** vendoring 其 `scripts/`、爬虫或可执行代码；可吸收路由表、何时使用、效力标注纪律，并在本表引用 |

**一律不做**：全量搬运 Greater-China-Legal 场景包（含港澳新，超出本仓库大陆法范围）；拷贝 Codex 适配器生成器（本仓库已有 `scripts/convert-skills.js`）；把商业库写成法规首选源。

## 钉选表

| ID | 仓库 | HEAD SHA（2026-08-13） | 许可 | 状态 | 本轮学习焦点 | 落地点 |
|----|------|------------------------|------|------|--------------|--------|
| S1 | [anthropics/claude-for-legal](https://github.com/anthropics/claude-for-legal) | `4a6c651889c97cc9140580363c73e0eb17379c2b` | Apache-2.0 | 持续跟踪 | 插件/技能/实践配置架构；本轮无实质合入（6 月后主要为 CLA 与措辞 PR） | 已体现在 13 插件骨架；本轮不改技能正文 |
| S2 | [CSlawyer1985/claude-for-legal-ZH](https://github.com/CSlawyer1985/claude-for-legal-ZH) | `68a5e8d2fbb8f70181a1ae48b6840a0d33e5186c` | Apache-2.0 | 持续跟踪 | 合同审核质量门禁；刑事脱敏红线；定罪量刑禁止凭记忆；C1/C2/C3 检索升级 | `shared/references/contract-review-quality-gates.md`；`criminal-compliance/`；`shared/research-gate/references/agentic-search-routing.md` |
| S3 | [MapleEve/legal-skills-cn](https://github.com/MapleEve/legal-skills-cn) | `bf5778c72993078a28334c76acd6779c6df38f9d` | Apache-2.0 | **冻结登记** | 2026-05-16 后无更新的冻结 fork；不重复合入 | 仅本表登记 |
| S4 | [CSlawyer1985/contract-review-pro](https://github.com/CSlawyer1985/contract-review-pro) | `6d929befb22d42b092b08276c1ac38e3730340e7` | 未声明 | **冻结登记** | 2026-05-12 冻结；方法论已进入 ZH v1.1.0，经 S2 吸收，不重复搬运 | 仅本表登记 |
| S5 | [vivy-yi/Greater-China-Legal](https://github.com/vivy-yi/Greater-China-Legal) | `5c0ef5fbd7337105c3cc08894f5c4426209254cd` | 未声明 | 观察 | 大陆场景包与 HK/TW/SG 超出范围；最近提交多为 ROADMAP | 仅本表登记；不批量移植 |
| S6 | [ZongziForu/cn-law-hub](https://github.com/ZongziForu/cn-law-hub) | `af88c5592366439c7137944df18968dca7f77029` | 未声明 | 持续跟踪 | 十库路由、何时用哪库、效力状态禁止推断；**不** vendoring `scripts/` | `shared/research-gate/references/official-source-routing.md` |
| S7 | [THUYRan/Legal-Skills-Chinese](https://github.com/THUYRan/Legal-Skills-Chinese) | `d844a25f6d5e6eff4999774a9ab0f79f7cb9d22d` | CC BY-NC-ND 4.0 | 持续跟踪 | 7 类原子能力调度脊柱（检索→事实→解释→推理→论证→风险→文书）；**重写**后映射到本仓库已有插件 | `shared/legal-reasoning/SKILL.md` |

## 来源卡片

### S1 anthropics/claude-for-legal

- **URL**：https://github.com/anthropics/claude-for-legal
- **名称**：Claude for Legal
- **内容**：美国法法律工作流插件套件（plugins / skills / CLAUDE.md 实践配置 / connectors）。本仓库 13 插件的架构模板来源。
- **钉选 SHA**：`4a6c651889c97cc9140580363c73e0eb17379c2b`
- **相对本仓库初建（约 2026-06-03～08）**：之后以 CLA 与文档措辞为主（含 #104），对中国大陆技能正文增量低。
- **合入策略**：继续跟踪；无便携增量则只更新本表 SHA。

### S2 CSlawyer1985/claude-for-legal-ZH

- **URL**：https://github.com/CSlawyer1985/claude-for-legal-ZH
- **名称**：Claude for Legal 中国法版本
- **内容**：13 插件、约 157 技能的中国法适配。2026-07 起含 `criminal-legal`（脱敏、防幻觉、强制外部库核）。共享参考含合同审核质量门禁与 Agentic Search 三层路由。
- **钉选 SHA**：`68a5e8d2fbb8f70181a1ae48b6840a0d33e5186c`
- **合入策略**：改编质量门禁、刑事红线、检索升级路由。跳过 Codex 适配器与路径隔离到 `claude-for-legal-zh/` 的工程改动。法规首选仍为本仓库 `law-database`（flk），不改成元典/法宝优先。

### S3 MapleEve/legal-skills-cn

- **URL**：https://github.com/MapleEve/legal-skills-cn
- **名称**：legal-skills-cn
- **内容**：claude-for-legal 的早期中文 fork。
- **钉选 SHA**：`bf5778c72993078a28334c76acd6779c6df38f9d`
- **合入策略**：冻结登记。HEAD 无新提交则不 diff。

### S4 CSlawyer1985/contract-review-pro

- **URL**：https://github.com/CSlawyer1985/contract-review-pro
- **名称**：contract-review-pro
- **内容**：合同审查原型；方法论已并入 ZH。
- **钉选 SHA**：`6d929befb22d42b092b08276c1ac38e3730340e7`
- **合入策略**：冻结登记。不重复搬运；变更经 S2 观察。

### S5 vivy-yi/Greater-China-Legal

- **URL**：https://github.com/vivy-yi/Greater-China-Legal
- **名称**：Greater-China-Legal
- **内容**：大中华法律技能/场景集合（体量大，含港澳台新）。本仓库范围是中国大陆成文法。
- **钉选 SHA**：`5c0ef5fbd7337105c3cc08894f5c4426209254cd`
- **合入策略**：观察。不批量移植场景。仅当出现可独立抽取、且明确适用大陆法的单点方法论时，另开分析版本记录。

### S6 ZongziForu/cn-law-hub

- **URL**：https://github.com/ZongziForu/cn-law-hub
- **名称**：CN Law Hub
- **内容**：十个官方法规库的检索/核验/下载 skill（NPC flk、国家规章库、外交条约库、国务院政策文件库、司法部行政法规库、党内法规库、国防部法规文库、税务法规库、生态环境部法规规章、最高人民法院发布栏目）。含效力状态纪律与按源路由。
- **钉选 SHA**：`af88c5592366439c7137944df18968dca7f77029`
- **创建时间**：约 2026-06-25（本仓库 v1.0 之后）。
- **合入策略**：吸收「何时用哪库」与效力标注纪律。**禁止**把其 `scripts/` 拷进本仓库。律师可另行安装该 skill；研究闸门只给可选安装提示。

### S7 THUYRan/Legal-Skills-Chinese

- **URL**：https://github.com/THUYRan/Legal-Skills-Chinese
- **名称**：Legal-Skills-Chinese
- **内容**：38 个律师手写原子/复合技能，7 类：信息检索、事实与要素、法律解释、法律推理、论证组织、风险评估、文书与事务。复合编排主线：事实要素 → 概念理解 → 争议识别 → 法条检索 → 案例检索 → 演绎推理 → 格式适用 → 术语规范。
- **钉选 SHA**：`d844a25f6d5e6eff4999774a9ab0f79f7cb9d22d`
- **许可约束**：CC BY-NC-ND 4.0 — 禁止复制其 SKILL.md 正文、触发词、输入输出模板。本仓库只保留**自写**的调度表，把 7 类能力接到已有插件。
- **合入策略**：`shared/legal-reasoning/SKILL.md` 为调度入口，不新增 38 个平行技能文件。

## 迭代记录

| 分析版本 | 日期 | 摘要 |
|----------|------|------|
| 1.0 | 2026-08-13 | 首次钉选 7 库；合入十库路由、合同质量门禁、刑事脱敏与强制库核、法律推理调度脊柱、iterate-reference-sources |
| 1.1 | 2026-08-13 | 护栏接到其余刑事编排入口、施工合同审查、诉讼代理词/答辩、合同起草；劳动/数据/监管实践配置引用十库路由 |

下次迭代：读取本表 → `git ls-remote` → 若 SHA 变化则按 `.qwen/skills/iterate-reference-sources/SKILL.md` 出差距说明并选择性合入 → 更新本表 SHA 与分析版本。

## 下一轮候选（SHA 未变时也可做，非本轮必做）

1. **S2** ZH `references/trial-preparation-framework.md`：改编为诉讼庭审准备共享参考（Apache-2.0），挂到 `litigation-legal` 尚未覆盖的庭审提纲技能——本仓库目前无独立庭审准备顶层 skill。
2. **S2** ZH `knowledge-base-crossref.md`：仅在本仓库引入所级知识库约定后再合入，避免空路径。
3. **S6** cn-law-hub：若其许可变为 OSI 许可，再评估是否把脚本作为**可选外部依赖**（仍不 vendoring 进本仓库）。
4. **S7** Legal-Skills-Chinese：只跟踪七类划分是否增删；**禁止**为对齐而新增 38 个平行 SKILL.md。
5. **S5** Greater-China-Legal：仅当出现可独立抽取且明确适用大陆法的单点方法论时另开分析版本。
6. **S1** claude-for-legal：无便携中国法增量则只更新 SHA。

不在候选内：Codex 适配器、内置易过时法条全文、港澳台新场景包、把元典/法宝提升为法规首选。
