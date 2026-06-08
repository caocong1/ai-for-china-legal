---
phase: 02-commercial-legal-core
plan: "01"
subsystem: commercial-legal/skills
tags: [contract-review, citation-spine, sub-skills, chinese-law, civil-code]
dependency_graph:
  requires: []
  provides:
    - commercial-legal/skills/_shared/legal-basis-conventions.md
    - commercial-legal/skills/_shared/civil-code-contract-citations.md
    - commercial-legal/skills/contract-review/risk-identification/SKILL.md
    - commercial-legal/skills/contract-review/clause-revision/SKILL.md
    - commercial-legal/skills/contract-review/negotiation-points/SKILL.md
    - commercial-legal/skills/contract-review/legal-basis/SKILL.md
    - commercial-legal/skills/contract-review/output-formatting/SKILL.md
    - commercial-legal/skills/contract-review/SKILL.md (orchestration entry)
  affects:
    - commercial-legal/skills/contract-drafting (will reuse _shared citations)
    - commercial-legal/skills/liability-analysis (will reuse _shared citations)
tech_stack:
  added: []
  patterns:
    - 法条/案例/学说 三类来源分类规范
    - 待验证标注规则（模型知识/超6月/用户口述/案例默认）
    - 子技能可独立触发模式（kebab-case frontmatter name）
    - 编排入口模式（contract-review 指向五子技能）
key_files:
  created:
    - commercial-legal/skills/_shared/legal-basis-conventions.md
    - commercial-legal/skills/_shared/civil-code-contract-citations.md
    - commercial-legal/skills/contract-review/risk-identification/SKILL.md
    - commercial-legal/skills/contract-review/clause-revision/SKILL.md
    - commercial-legal/skills/contract-review/negotiation-points/SKILL.md
    - commercial-legal/skills/contract-review/legal-basis/SKILL.md
    - commercial-legal/skills/contract-review/output-formatting/SKILL.md
  modified:
    - commercial-legal/skills/contract-review/SKILL.md
decisions:
  - "法律引用脊柱（_shared/legal-basis-conventions.md）作为全插件共享规范，02-02/02-03 直接引用，避免各技能重复维护"
  - "案例引用全部默认标 [待验证]，因模型回忆案号风险极高，须经检索核验后方可去除标注"
  - "contract-review/SKILL.md 改为编排入口，保留入口级护栏（临时模式/合同金额/目的地检查），深度内容拆分至子技能"
  - "修改粒度原则（词<短语<子条款<句子<整条款）完整迁移至 clause-revision 子技能"
metrics:
  duration: "~25min"
  completed_date: "2026-06-04"
  tasks_completed: 3
  tasks_total: 3
  files_created: 7
  files_modified: 1
---

# Phase 02 Plan 01: Citation Spine and Contract Review Decomposition Summary

**One-liner**: 建立民法典合同编引用脊柱（法条/案例/学说三类规范 + 待验证标记）并将 contract-review 拆为五个可独立触发的子技能（风险识别/条款修改/谈判要点/法律依据/输出格式化）。

---

## What Was Built

### Task 1 — 法律引用脊柱（commits: 4c6a0b4）

**`commercial-legal/skills/_shared/legal-basis-conventions.md`**（164行）
- 定义法条/案例/学说三类来源分类规范，含各类格式要求
- 复用 commercial-legal/CLAUDE.md 已有五个来源标签（法宝/法规网站/网络搜索/模型知识/用户提供），不新造冲突标签
- 定义待验证标记规则（5个触发情形：模型知识/超6月/用户口述/案例默认/版本未确认）
- 明确成文法优先原则：「指导性案例仅作参考，不具判例法约束力」，要求标注法院层级四级体系
- 提供引用最小格式汇总表（法条/司法解释/指导案例/学说）

**`commercial-legal/skills/_shared/civil-code-contract-citations.md`**（206行）
- 法条类：民法典合同编核心条文（第469/490/496-498/502/506/509-511/533/562-563/565/577-578/584-585/590-591条），相关司法解释（合同编通则解释、买卖合同解释、担保制度解释），全部标 `[待验证]`
- 案例类：四个占位结构（格式条款/违约金/情势变更/免责条款），含填写说明和案例引用风险警告
- 学说类：三个占位结构（违约金制度/格式条款解释/情势变更与不可抗力区分），含填写说明

### Task 2 — 五个审查子技能（commits: 4eb6466）

| 子技能 | 行数 | 核心内容 |
|-------|-----|---------|
| risk-identification | 293 | 主体资格预检（引用 subject-qualification-traps.md）、交易破坏者、双重严重性（法律风险🔴🟠🟡🟢 + 商业摩擦）、违约金四维、管辖法律差异核查 |
| clause-revision | 222 | 完整修改粒度原则（词<短语<子条款<句子<整条款）、逐条修改建议块（原文/偏离/替换语言/备选）、修改包汇总 |
| negotiation-points | 244 | 硬底线/让步空间/交易筹码三层次推导、大公司vs中小企业差异策略、谈判顺序规划、升级路由 |
| legal-basis | 261 | 引用 legal-basis-conventions.md 和 civil-code-contract-citations.md，法条/案例/学说分类输出，管辖法律差异检查，无静默补充原则，来源标签归属规则 |
| output-formatting | 264 | 完整备忘录（底线+交易破坏者+按风险分类+有利/缺失+法律依据+谈判+审批）、微信群摘要（两行）、修订文档、交付前质量检查、下一步决策树 |

每个子技能均含：YAML frontmatter（name/description/argument-hint）、目的、前置（加载配置+引用规范+引用库）、详细步骤、检查清单、输出模板、边界条件、错误处理、`## 法律依据`（按法条/案例/学说分类）。

### Task 3 — 编排入口改造（commits: 2b0192f）

**`commercial-legal/skills/contract-review/SKILL.md`**
- 顶部添加迁移说明（指向五个子技能路径）
- 更新 description 说明编排角色
- 添加子技能编排顺序表（5行 × 5列：顺序/子技能/职责/路径/单独触发命令）
- 保留入口级护栏：前置条件（加载审查立场）、临时模式、事项上下文、目的地检查、合同金额处理、哪一方确认、交易破坏者优先
- 新增共享资源加载清单（含 _shared 引用规范和引用库）

---

## Deviations from Plan

None - plan executed exactly as written.

---

## Known Stubs

- `civil-code-contract-citations.md` 案例类和学说类为占位结构（含填写说明），需律师通过检索工具填入经核验的具体案例和学说。这是设计意图——案例须经核验才能填入，不是可自动填充的内容。

---

## Self-Check

**Files created:**
- FOUND: commercial-legal/skills/_shared/legal-basis-conventions.md
- FOUND: commercial-legal/skills/_shared/civil-code-contract-citations.md
- FOUND: commercial-legal/skills/contract-review/risk-identification/SKILL.md
- FOUND: commercial-legal/skills/contract-review/clause-revision/SKILL.md
- FOUND: commercial-legal/skills/contract-review/negotiation-points/SKILL.md
- FOUND: commercial-legal/skills/contract-review/legal-basis/SKILL.md
- FOUND: commercial-legal/skills/contract-review/output-formatting/SKILL.md
- FOUND: commercial-legal/skills/contract-review/SKILL.md (modified)

**Commits:**
- FOUND: 4c6a0b4
- FOUND: 4eb6466
- FOUND: 2b0192f

## Self-Check: PASSED
