# 上游差距分析（2026-08）

对照 `.planning/SOURCE_INDEX.md` 分析版本 1.0。钉选日期 2026-08-13。

本仓库初建约 2026-06-03～08，当时只在 README / PROJECT-SUMMARY 点名 `anthropics/claude-for-legal`，**未钉 SHA**。v1.1 `shared/research-gate` 经 `.qwen/skills/integrate-external-skill` 从「外部已测项目」迁入，同样无 SHA。

## 本仓库已有能力（合入前）

- 13 个大陆法插件；顶层 skill 拆子技能；实践配置 CLAUDE.md
- `shared/research-gate`：目录清点、五维检索、L1–L5、两段式抓取
- 官方源：`law-database`（flk）、`rmfyalk`、`wenshu`；`yuandian` 为兜底
- `authoritative-sources.md` §7 已提到国家规章库、司法部行政法规库、国务院政策文件库，但无「何时用哪库」的可执行路由，也无条约/税务/生态环境/党内/国防/最高法发布栏目
- 商事合同：双重严重性、主体资格陷阱、违约金四维；**缺**效力优先门禁、修订方式路由、风险四要素、终稿三件套
- 刑事合规：涉刑强制升级、不提供规避侦查、条号待验证；**缺**输入脱敏红线、定罪量刑**强制跑库**（待验证常停留在标注，未要求本次会话检索）
- 无跨插件「法律推理调度脊柱」（领域插件 + 研究闸门，没有检索→涵摄→论证的共享编排）

## 分源差距

### S1 claude-for-legal（低合入价值）

钉选 `4a6c651889c97cc9140580363c73e0eb17379c2b`。6 月后公开更新以 CLA 与文档措辞为主（含 #104）。插件架构本仓库已吸收。

**本轮**：不改技能正文；只登记 SHA。

### S2 claude-for-legal-ZH（高）

钉选 `68a5e8d2fbb8f70181a1ae48b6840a0d33e5186c`。相对本仓库 6 月快照的便携增量：

| 上游能力 | 本仓库 | 本轮处理 |
|----------|--------|----------|
| `references/contract-review-quality-gates.md`：效力优先、主体授权、八维条款、修订路由、自检四问、三件套、风险四要素 | 合同审查有双重严重性与修改粒度，无效力优先与修订路由树 | **改编合入** `shared/references/contract-review-quality-gates.md`，挂到 `commercial-legal` |
| `criminal-legal` 脱敏红线（真实姓名/单位/案号不进模型） | 无输入脱敏停机规则 | **改编合入** criminal-compliance |
| 定罪量刑/入罪数额禁止捏造，须库核 | 有 `[条号待验证]`，未强制本次会话 `law-database` | **改编合入**；首选 flk / spp.gov.cn / court.gov.cn，不用威科/法宝当首选 |
| `references/agentic-search-routing.md` C1/C2/C3 | 研究闸门是线性五步，无复杂度升级 | **改编合入** research-gate 参考；检索源改为本仓库连接器顺序 |
| Codex 适配器 / 路径隔离到 `claude-for-legal-zh/` | 已有 `scripts/convert-skills.js` | **跳过** |
| 内置刑诉法/合规核心条文摘录 | 本仓库用引用库 + 待验证，避免内置易过时全文 | **跳过**内置法条摘录；改为强制库核 |

### S3 legal-skills-cn / S4 contract-review-pro（冻结）

HEAD 相对 5 月无新提交。S4 方法论经 S2 进入。**本轮只登记。**

### S5 Greater-China-Legal（观察、不合入）

体量大、含港澳台新，超出 `PROJECT.md` Out of Scope。最近提交偏 ROADMAP。**不批量移植。**

### S6 cn-law-hub（高，不 vendoring 脚本）

钉选 `af88c5592366439c7137944df18968dca7f77029`。本仓库已有 flk 连接器，§7 点到 3 个库。缺口是另外 7 个官方源的**路由**，以及：

- 效力状态只允许引用官方字段，禁止从「能打开网页 / 发布近」推断现行有效
- 同名多版本必须标歧义
- 文件类型不得混称（法律 / 行政法规 / 规章 / 党内法规 / 政策 / 条约）

**本轮**：写 `official-source-routing.md`；研究闸门第三步引用。可选安装提示指向上游仓库。不拷贝 Python 爬虫。

### S7 Legal-Skills-Chinese（高，ND 重写）

钉选 `d844a25f6d5e6eff4999774a9ab0f79f7cb9d22d`。许可 CC BY-NC-ND 4.0。

本仓库按**领域插件**切分；该库按**推理原子**切分。缺口不是再做 38 个平行 SKILL.md，而是缺一层调度：何时先检索、何时抽要素、何时做解释争论、何时禁止刑法类推。

**本轮**：自写 `shared/legal-reasoning/SKILL.md` 调度表，映射到已有插件。不复制其步骤原文、触发词或 I/O 模板。

## 明确不做

- 全量场景包移植
- vendoring 未许可脚本
- 逐字复制 ND 技能正文
- 把元典/法宝提升为法规首选
- 为对齐上游而削弱本仓库已有的涉刑升级、规避侦查拒绝、双重严重性

## 本轮落地清单

1. SOURCE_INDEX 钉 SHA
2. 本差距说明
3. 十库路由 + 研究闸门挂钩
4. 合同质量门禁 + commercial-legal 挂钩
5. 刑事脱敏 + 强制库核
6. 法律推理调度脊柱
7. `iterate-reference-sources` 元技能
8. CHANGELOG / README / INSTALL / setup-skills
