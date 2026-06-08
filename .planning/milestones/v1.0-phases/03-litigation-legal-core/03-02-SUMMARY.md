---
phase: 03-litigation-legal-core
plan: "02"
subsystem: litigation-legal
tags:
  - defense-drafting
  - evidence-management
  - sub-skill-decomposition
  - procedural-defense
  - limitation-defense
  - evidence-three-properties
  - evidence-catalog

dependency_graph:
  requires:
    - "03-01 (litigation-legal/_shared spine: legal-basis-conventions, civil-procedure-citations, practice-profile-schema)"
    - "shared/references/document-structures.md (evidence-catalog three-class template)"
  provides:
    - "defense-drafting: 5 independently-triggerable sub-skills + orchestrator"
    - "evidence-management: 4 independently-triggerable sub-skills + orchestrator"
  affects:
    - "litigation-legal plugin skill set"
    - "All downstream plans referencing defense or evidence skills"

tech_stack:
  added: []
  patterns:
    - "sub-skill decomposition with orchestrator entry point (same pattern as commercial-legal)"
    - "_shared spine citations (civil-procedure-citations + legal-basis-conventions)"
    - "hardgates: evidence-catalog flat-list rejection, limitation defense mandatory-active-assertion"

key_files:
  created:
    - litigation-legal/skills/defense-drafting/defense-strategy/SKILL.md
    - litigation-legal/skills/defense-drafting/jurisdiction-objection/SKILL.md
    - litigation-legal/skills/defense-drafting/substantive-defense/SKILL.md
    - litigation-legal/skills/defense-drafting/procedural-limitation-defense/SKILL.md
    - litigation-legal/skills/defense-drafting/defense-assembly/SKILL.md
    - litigation-legal/skills/evidence-management/evidence-collection/SKILL.md
    - litigation-legal/skills/evidence-management/three-properties-review/SKILL.md
    - litigation-legal/skills/evidence-management/evidence-catalog/SKILL.md
    - litigation-legal/skills/evidence-management/evidence-exchange/SKILL.md
  modified:
    - litigation-legal/skills/defense-drafting/SKILL.md
    - litigation-legal/skills/evidence-management/SKILL.md

decisions:
  - "五答辩子技能命名 kebab-case: defense-strategy / jurisdiction-objection / substantive-defense / procedural-limitation-defense / defense-assembly"
  - "四证据子技能命名 kebab-case: evidence-collection / three-properties-review / evidence-catalog / evidence-exchange"
  - "时效抗辩须主动提出警示置于 procedural-limitation-defense 最顶部，并在 defense-drafting 入口级重复告知"
  - "flat list 硬门禁同时保留在 evidence-catalog 子技能和 evidence-management 编排入口两处"
  - "所有不确定条号均标注 [待验证]，已核实锚点（第188条/15日答辩/举证期）明确标识"

metrics:
  duration: "~50 min"
  completed: "2026-06-04T17:47:14Z"
  tasks_completed: 4
  tasks_total: 4
  files_created: 9
  files_modified: 2
---

# Phase 03 Plan 02: Defense & Evidence Decomposition Summary

**一句话摘要**：答辩与证据从扁平技能深化为9个可独立触发的子技能（5答辩 + 4证据）+ 2个编排入口，时效抗辩须主动提出警示、三大类证据目录硬门禁无丢失保留，引用全部经由 _shared 脊柱。

---

## 完成任务

| 任务 | 说明 | 提交 |
|------|------|------|
| Task 1: 拆分 defense-drafting 为五子技能 | 新建 defense-strategy / jurisdiction-objection / substantive-defense / procedural-limitation-defense / defense-assembly 五个 SKILL.md | 1fade56 |
| Task 2: 改造 defense-drafting/SKILL.md 为编排入口 | 子技能编排顺序表 + 研究闸门 + 入口级护栏 + 时效抗辩告知 | e0f201d |
| Task 3: 拆分 evidence-management 为四子技能 | 新建 evidence-collection / three-properties-review / evidence-catalog / evidence-exchange 四个 SKILL.md | 69b358d |
| Task 4: 改造 evidence-management/SKILL.md 为编排入口 | 三大类硬门禁入口级提示 + 研究闸门 + 四子技能编排表 | 67e1d7d |

---

## 交付物概览

### 答辩状起草（defense-drafting）

| 子技能 | 路径 | 单独触发 | 行数 |
|-------|------|---------|------|
| defense-strategy（答辩策略选择）| `defense-drafting/defense-strategy/SKILL.md` | `/litigation-legal:defense-strategy` | 235 |
| jurisdiction-objection（管辖权异议）| `defense-drafting/jurisdiction-objection/SKILL.md` | `/litigation-legal:jurisdiction-objection` | 271 |
| substantive-defense（实体抗辩）| `defense-drafting/substantive-defense/SKILL.md` | `/litigation-legal:substantive-defense` | 276 |
| procedural-limitation-defense（程序时效抗辩）| `defense-drafting/procedural-limitation-defense/SKILL.md` | `/litigation-legal:procedural-limitation-defense` | 304 |
| defense-assembly（答辩状装配）| `defense-drafting/defense-assembly/SKILL.md` | `/litigation-legal:defense-assembly` | 288 |
| **编排入口** | `defense-drafting/SKILL.md` | `/litigation-legal:defense-drafting` | 156 |

### 证据管理（evidence-management）

| 子技能 | 路径 | 单独触发 | 行数 |
|-------|------|---------|------|
| evidence-collection（证据收集与保管链）| `evidence-management/evidence-collection/SKILL.md` | `/litigation-legal:evidence-collection` | 245 |
| three-properties-review（三性审查）| `evidence-management/three-properties-review/SKILL.md` | `/litigation-legal:three-properties-review` | 271 |
| evidence-catalog（三大类证据目录）| `evidence-management/evidence-catalog/SKILL.md` | `/litigation-legal:evidence-catalog` | 240 |
| evidence-exchange（举证期限与证据交换）| `evidence-management/evidence-exchange/SKILL.md` | `/litigation-legal:evidence-exchange` | 278 |
| **编排入口** | `evidence-management/SKILL.md` | `/litigation-legal:evidence-management` | 140 |

---

## 关键内容要点

### 答辩领域

- **defense-strategy**：仲裁场景特殊识别（有效仲裁协议/或裁或审）+ 逐请求立场决策表 + 时效抗辩须主动提出（早期告知）
- **jurisdiction-objection**：级别/地域/专属/约定管辖全覆盖 + 管辖权异议申请书模板 + 仲裁协议效力异议路径
- **substantive-defense**：承认/否认/抗辩逐请求分析 + 同时/先履行/不安抗辩权 + 违约金调整（第585条）+ 合同效力抗辩
- **procedural-limitation-defense**：第188条3年时效已核实锚点 + 时效中止（第194条）/中断（第195条）逐项排查 + **时效抗辩须主动提出、法院不主动适用——置于顶部显著警示** + 15日答辩期
- **defense-assembly**：完整答辩状格式（答辩人/案由/答辩请求/事实与理由/证据清单/此致）+ 4维交付前质量检查 + 下一步决策树

### 证据领域

- **evidence-collection**：书证/电子数据/证人证言/鉴定全类型 + chain of custody 保管链记录表 + 合法取证原则（非法证据排除）+ 三大类初步归类预标记
- **three-properties-review**：真实性/合法性/关联性三性逐项审查表 + 证明力评估 + 对方证据质证要点起草 + 举证责任分配（谁主张谁举证 + 举证责任倒置）+ 自认风险提示
- **evidence-catalog**：**三大类强制分组硬门禁无丢失保留**（第一类基础交易关系/第二类法律关系及索赔事实/第三类被告违约事实）+ 缺类不得伪造须标记补强 + **flat list 拒绝输出**
- **evidence-exchange**：15日举证期限锚点 + 逾期举证后果（一般不予认可）+ 申请鉴定/证据保全/调查取证须在举证期限内 + 新证据认定规则

---

## 法律引用规范执行情况

| 规则 | 执行情况 |
|------|---------|
| 引用经由 _shared 脊柱 | 全部子技能前置读取 civil-procedure-citations.md + legal-basis-conventions.md |
| 不确定条号标 `[待验证]` | 全部不确定条号均标注，无臆造条号 |
| 已核实锚点 | 《民法典》第188条3年时效、15日答辩期/举证期、仲裁协议独立性、或裁或审均有明确标识 |
| 来源标签 | 全部引用附 `[模型知识 — 需验证]` 等来源标签 |
| 法条/案例/学说分类 | 每个子技能均含 `## 法律依据` 三分类表 |

---

## 偏差记录

**无** — 计划按原设计执行，无架构偏差。所有子技能 150+ 行，超过计划 min_lines 要求。

---

## Known Stubs

无功能性存根。所有子技能为独立可触发的 SKILL.md 文件，无硬编码空值或 TODO 占位符会影响功能触发。法律引用中的「待填入」案例占位符为设计意图（案例引用需检索核验，留给律师填写）。

---

## Threat Flags

无。本计划仅创建/修改 SKILL.md 提示词文件，不引入新的网络端点、认证路径、文件访问模式或数据库 schema 变更。

---

## Self-Check: PASSED

所有11个文件存在，4个提交哈希已验证（1fade56 / e0f201d / 69b358d / 67e1d7d）。
