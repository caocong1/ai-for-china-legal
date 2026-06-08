---
phase: 02-commercial-legal-core
plan: "03"
subsystem: commercial-legal
tags:
  - contract-drafting
  - liability-analysis
  - plugin-registration
  - sub-skill-decomposition
  - chinese-law
dependency_graph:
  requires:
    - 02-01 (legal-basis-conventions, civil-code-contract-citations, contract-review sub-skills)
    - 02-02 (practice-profile-schema, cold-start-interview sub-skills)
  provides:
    - contract-drafting 5 sub-skills (requirements-intake / framework-design / clause-drafting / risk-self-check / output-generation)
    - liability-analysis 4 sub-skills (liability-cap-analysis / penalty-assessment / damages-scope / carveout-review)
    - plugin.json v0.3.0 with all 23 skills registered (4 orchestration entries + 19 sub-skills)
  affects:
    - commercial-legal plugin (all skills now independently triggerable)
tech_stack:
  added: []
  patterns:
    - sub-skill decomposition with orchestration entry pattern
    - shared citation library (civil-code-contract-citations + legal-basis-conventions)
    - practice-profile-schema field reading contract
key_files:
  created:
    - commercial-legal/skills/contract-drafting/requirements-intake/SKILL.md
    - commercial-legal/skills/contract-drafting/framework-design/SKILL.md
    - commercial-legal/skills/contract-drafting/clause-drafting/SKILL.md
    - commercial-legal/skills/contract-drafting/risk-self-check/SKILL.md
    - commercial-legal/skills/contract-drafting/output-generation/SKILL.md
    - commercial-legal/skills/liability-analysis/liability-cap-analysis/SKILL.md
    - commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md
    - commercial-legal/skills/liability-analysis/damages-scope/SKILL.md
    - commercial-legal/skills/liability-analysis/carveout-review/SKILL.md
  modified:
    - commercial-legal/skills/contract-drafting/SKILL.md (改造为编排入口)
    - commercial-legal/skills/liability-analysis/SKILL.md (改造为编排入口)
    - commercial-legal/.claude-plugin/plugin.json (注册全部子技能，version 0.3.0)
decisions:
  - "clause-drafting 中「30%经验值」明确标注为非法定比例，并引用2023年《合同编通则司法解释》待验证，避免模型回忆风险"
  - "damages-scope 和 liability-cap-analysis 的分工：前者界定法律基准赔偿范围（第584条），后者分析合同约定上限的四维含义"
  - "carveout-review 与 liability-cap-analysis 的分工：前者做例外清单全面独立审查，后者做例外与cap的交互分析"
  - "担保主体资格陷阱在 framework-design 中内嵌，与 contract-review/risk-identification 的担保识别形成识别→设计闭环"
metrics:
  duration_minutes: 45
  completed_date: "2026-06-04"
  tasks_completed: 3
  tasks_total: 3
  files_created: 9
  files_modified: 3
---

# Phase 02 Plan 03: 起草与违约责任深度拆分及插件注册 Summary

**一句话**：将 contract-drafting 和 liability-analysis 两个扁平技能深化拆分为 9 个可独立触发的子技能，全部引用民法典合同编共享引用库（577/584/585/506/496-498），并将全部 19 个子技能注册进 plugin.json v0.3.0。

---

## 交付概览

| 交付物 | 类型 | 描述 |
|-------|-----|-----|
| requirements-intake | 新建子技能 | 系统性需求收集，信息不全时主动追问而非默默假设 |
| framework-design | 新建子技能 | 合同框架设计，内嵌担保主体资格陷阱清单（民法典第683条） |
| clause-drafting | 新建子技能 | 逐条起草核心子技能，引用 496-498/506/577/584/585，最深实现 |
| risk-self-check | 新建子技能 | 五维度可勾选风险自查（结构/立场/常见风险/交易破坏者/效力瑕疵） |
| output-generation | 新建子技能 | 整合输出包（草案+起草说明+风险提示+谈判要点+法律依据） |
| liability-cap-analysis | 新建子技能 | 四维责任限制深度分析；基数不明确时标准错误处理 |
| penalty-assessment | 新建子技能 | 违约金合法性（第585条）、无固定30%比例说明、商业影响评估 |
| damages-scope | 新建子技能 | 赔偿范围界定（第584条可预见性规则）、律师费、减损义务（第591条） |
| carveout-review | 新建子技能 | 例外清单全面审查、法律强制例外核查（第506条） |
| contract-drafting/SKILL.md | 改造为编排入口 | 5 个子技能编排顺序表，含事项上下文护栏，语义无丢失 |
| liability-analysis/SKILL.md | 改造为编排入口 | 4 个子技能编排顺序表，含原输出报告骨架，语义无丢失 |
| plugin.json v0.3.0 | 更新注册 | 23 条 skills 记录（4 编排入口 + 19 子技能），全部 path 指向真实文件 |

---

## 任务执行详情

### Task 1: 拆分 contract-drafting

**提交**：`78a5a21` — feat(02-03): 拆分 contract-drafting 为五个可独立触发的起草子技能

**关键设计决策**：
- `requirements-intake`：系统性需求收集矩阵（🔴必须项/🟠重要/🟡视情况），信息不全时阻断而非默默假设
- `framework-design`：内嵌担保主体资格陷阱，引用民法典第683条（国家机关/公益法人不得担保），`[待验证]`
- `clause-drafting`：最深子技能，引用 496/497/498/506/577/584/585/591；关于「30%经验值」明确说明非法定比例，须核查2023年《合同编通则司法解释》
- `risk-self-check`：五维度可勾选检查清单，🔴项阻断提交，`[绝不接受]`项触发强制修改
- `output-generation`：按执业角色选择工作产物标题（律师/非律师），目的地检查（内部版/净化版/摘要版）

**法律引用覆盖**（均引用 _shared/civil-code-contract-citations 对应条文）：
- 《民法典》第469/490/502条（合同成立）
- 《民法典》第496-498条（格式条款）
- 《民法典》第506条（禁止免责）
- 《民法典》第577条（违约责任一般规定）
- 《民法典》第584条（赔偿范围）
- 《民法典》第585条（违约金）
- 《民法典》第591条（减损义务）
- 《民法典》第683条（担保主体资格）
- 《个人信息保护法》、《数据安全法》（数据处理特别条款）

**文件行数**（均满足最低要求）：

| 文件 | 行数 | 最低要求 |
|------|-----|---------|
| requirements-intake/SKILL.md | 204 | — |
| framework-design/SKILL.md | 285 | 50 |
| clause-drafting/SKILL.md | 278 | 60 |
| risk-self-check/SKILL.md | 240 | — |
| output-generation/SKILL.md | 301 | — |

### Task 2: 拆分 liability-analysis

**提交**：`21595c2` — feat(02-03): 拆分 liability-analysis 为四个可独立触发的违约责任子技能

**关键设计决策**：
- `liability-cap-analysis`：从 practice-profile 读责任限制立场；基数不明确的标准错误处理（引用语言+含义A/B+签署前确认）；最坏/可能/最好情形三场景量化
- `penalty-assessment`：第585条全文引用；明确「过分高于损失」无固定30%比例，须核查2023年《合同编通则司法解释》；「定金」vs「订金」区分
- `damages-scope`：第584条三要件分析（时间/主体/对象）；可得利益损失明确纳入；律师费约定建议；减损义务（第591条）
- `carveout-review`：法律强制例外核查（第506条人身损害/重大过失，无论合同写不写均不受 cap 约束）；过宽过窄分析；定义争议分析

**分工关系（与02-01子技能互补）**：
- `contract-review/risk-identification`（识别层）→ `liability-cap-analysis`（分析层，不重叠）
- `contract-review/risk-identification`（识别层）→ `carveout-review`（深度审查层，不重叠）

**文件行数**（均满足最低要求）：

| 文件 | 行数 | 最低要求 |
|------|-----|---------|
| liability-cap-analysis/SKILL.md | 326 | 60 |
| penalty-assessment/SKILL.md | 287 | 50 |
| damages-scope/SKILL.md | 279 | 40 |
| carveout-review/SKILL.md | 291 | 40 |

### Task 3: 更新 plugin.json

**提交**：`37b1ddb` — feat(02-03): 更新 plugin.json 注册全部 19 个子技能，version 0.3.0

**验证结果**：
- `python3` 验证脚本输出：`OK 23 skills`，无 MISSING PATHS，无 UNREGISTERED
- 全 JSON 文件合法性验证：`All JSON files valid`
- 版本：`0.2.0 → 0.3.0`
- 2 空格缩进，文件以换行结尾，无尾部空格

---

## 提交列表

| 哈希 | 类型 | 描述 |
|-----|-----|-----|
| `78a5a21` | feat(02-03) | 拆分 contract-drafting 为五个可独立触发的起草子技能 |
| `21595c2` | feat(02-03) | 拆分 liability-analysis 为四个可独立触发的违约责任子技能 |
| `37b1ddb` | feat(02-03) | 更新 plugin.json 注册全部 19 个子技能，version 0.3.0 |

---

## Deviations from Plan

### Auto-fixed Issues

无需偏差修正。计划执行期间未发现需自动修复的问题。

**补充说明（法律准确性改进，属 Rule 2 — 添加缺失的关键内容）**：

**1. [Rule 2 - Missing Critical Content] 违约金「30%经验值」明确非法定比例**

- **Found during**: Task 1（clause-drafting）和 Task 2（penalty-assessment）
- **Issue**: 计划指出「违约金过高/30%规则，待验证 if unsure」，模型知识中此比例来源于2009年版买卖合同司法解释，2020年修正及2023年合同编通则司法解释后适用情况有变化
- **Fix**: 在两个子技能中明确说明「无固定30%法定比例」，注明须核查2023年《民法典合同编通则若干问题的解释》具体条文，标注 `[待验证]`
- **Files modified**: clause-drafting/SKILL.md, penalty-assessment/SKILL.md

---

## 法律引用质量说明

所有法律依据均遵循 `_shared/legal-basis-conventions.md` 规范：
- 按**法条/案例/学说**三类分类
- 法条均引自 `civil-code-contract-citations.md` 对应条目
- 案例均为占位结构（待检索核验后填入），均标注 `[待验证]`
- 学说均为占位结构，标注 `[待验证]`
- 模型回忆内容均标注 `[模型知识 — 需验证]`

---

## Known Stubs

无阻碍计划目标的 stub。以下为设计上的占位（非技术 stub）：

| 位置 | 说明 | 计划填充时机 |
|-----|-----|-----------|
| 各子技能「案例」章节 | 案例占位结构，待律师通过法宝/裁判文书网检索后填入 | 需律师主动操作，不影响技能可用性 |
| 各子技能「学说」章节 | 学说占位结构，待律师引用时补充 | 同上 |

---

## Threat Flags

无新增安全相关威胁面。本计划仅新增 Markdown 格式提示词文件和 JSON 元数据，无网络端点、认证路径或数据库 schema 变更。

---

## Self-Check: PASSED

**Created files exist:**

- `/home/sorawatcher/workspace/ai-for-china-legal/commercial-legal/skills/contract-drafting/requirements-intake/SKILL.md` — FOUND
- `/home/sorawatcher/workspace/ai-for-china-legal/commercial-legal/skills/contract-drafting/framework-design/SKILL.md` — FOUND
- `/home/sorawatcher/workspace/ai-for-china-legal/commercial-legal/skills/contract-drafting/clause-drafting/SKILL.md` — FOUND
- `/home/sorawatcher/workspace/ai-for-china-legal/commercial-legal/skills/contract-drafting/risk-self-check/SKILL.md` — FOUND
- `/home/sorawatcher/workspace/ai-for-china-legal/commercial-legal/skills/contract-drafting/output-generation/SKILL.md` — FOUND
- `/home/sorawatcher/workspace/ai-for-china-legal/commercial-legal/skills/liability-analysis/liability-cap-analysis/SKILL.md` — FOUND
- `/home/sorawatcher/workspace/ai-for-china-legal/commercial-legal/skills/liability-analysis/penalty-assessment/SKILL.md` — FOUND
- `/home/sorawatcher/workspace/ai-for-china-legal/commercial-legal/skills/liability-analysis/damages-scope/SKILL.md` — FOUND
- `/home/sorawatcher/workspace/ai-for-china-legal/commercial-legal/skills/liability-analysis/carveout-review/SKILL.md` — FOUND

**Commits exist:**
- `78a5a21` — FOUND (contract-drafting sub-skills)
- `21595c2` — FOUND (liability-analysis sub-skills)
- `37b1ddb` — FOUND (plugin.json update)

**Verification scripts:**
- Task 1 automated verification: PASSED
- Task 2 automated verification: PASSED
- Task 3 python3 script: OK 23 skills, no MISSING PATHS, no UNREGISTERED
- Full JSON regression: All JSON files valid
