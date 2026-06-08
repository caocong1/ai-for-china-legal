---
phase: 07-construction-legal
plan: "02"
subsystem: legal-skills
tags: [construction-legal, payment-dispute, bidding-compliance, chinese-law, sub-skills, orchestrator]

# Dependency graph
requires:
  - phase: 07-01-construction-legal
    provides: "_shared引用脊柱(legal-basis-conventions/construction-law-citations/practice-profile-schema) + construction-legal/CLAUDE.md实践配置模板"
provides:
  - "payment-dispute 四个可独立触发子技能（priority-payment-right/settlement-basis-dual-contract/quality-defense-counterclaim/interest-advance-funding）"
  - "payment-dispute 编排入口（优先受偿权期限预警/代理立场护栏/造价鉴定资源/contract-review分工）"
  - "bidding-compliance 四个可独立触发子技能（mandatory-bidding-scope/bidding-procedure/collusion-fraud/bid-invalidity-complaint）"
  - "bidding-compliance 编排入口（项目类型资金来源确认/行政监督部门识别/立场加载/contract-review分工）"
affects: [07-03-construction-legal, plugin-json-registration]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "sub-skill orchestrator pattern: 原SKILL.md改为编排入口，子技能独立于skills/<parent>/<child>/SKILL.md"
    - "代理立场双向分析: 每个子技能按发包人侧/承包人侧分别给出审查侧重"
    - "待验证标注纪律: 司法解释条号描述规则不写裸条号，规模阈值/期限一律[待验证]"

key-files:
  created:
    - "construction-legal/skills/payment-dispute/priority-payment-right/SKILL.md"
    - "construction-legal/skills/payment-dispute/settlement-basis-dual-contract/SKILL.md"
    - "construction-legal/skills/payment-dispute/quality-defense-counterclaim/SKILL.md"
    - "construction-legal/skills/payment-dispute/interest-advance-funding/SKILL.md"
    - "construction-legal/skills/bidding-compliance/mandatory-bidding-scope/SKILL.md"
    - "construction-legal/skills/bidding-compliance/bidding-procedure/SKILL.md"
    - "construction-legal/skills/bidding-compliance/collusion-fraud/SKILL.md"
    - "construction-legal/skills/bidding-compliance/bid-invalidity-complaint/SKILL.md"
  modified:
    - "construction-legal/skills/payment-dispute/SKILL.md (改造为编排入口)"
    - "construction-legal/skills/bidding-compliance/SKILL.md (改造为编排入口)"

key-decisions:
  - "利息是否纳入优先受偿权范围: 标注存在争议，在诉状中分别列明本金与利息，由法院裁决，不预设结论"
  - "必须招标规模阈值: 一律标[待验证]，不列具体金额，提示核实现行《必须招标的工程建设项目规定》"
  - "刑事风险提示: collusion-fraud子技能涉及串通投标罪，以描述规则呈现，刑事条号标[待验证]并提示升级给律师"

patterns-established:
  - "优先受偿权行使期限预警: payment-dispute编排入口中明确期限临近须自动触发🔴关键预警并升级给律师"
  - "异议前置原则: bid-invalidity-complaint中明确投诉须先提出异议（异议前置），异议答复不满后方可投诉"
  - "行政监督部门按行业对照表: 发改委(综合)/住建(房建市政)/水利/交通按行业分工"

requirements-completed: [PAYMENT-DISPUTE-DECOMP, BIDDING-COMPLIANCE-DECOMP]

# Metrics
duration: ~8h
completed: 2026-06-05
---

# Phase 07 Plan 02: Payment-Dispute & Bidding-Compliance Decomposition Summary

**工程款争议处理拆分为4个深层子技能（优先受偿权/结算依据黑白合同/质量抗辩反索赔/利息垫资，第807条建议复核，司法解释规则描述规则），招投标合规拆分为4个深层子技能（必须招标范围/程序/串通投标/中标无效异议，规模标准条号待验证），两套编排入口含代理立场护栏与子技能分工说明**

## Performance

- **Duration:** ~8 hours
- **Started:** 2026-06-05T00:00:00Z
- **Completed:** 2026-06-05T08:24:35Z
- **Tasks:** 4 (Tasks 1-4, committed in 2 batches)
- **Files modified:** 10 (8 new sub-skills + 2 orchestrators modified)

## Accomplishments

- **工程款争议处理（payment-dispute）**：原 ~18 行浅骨架拆分为 4 个深层子技能（每个 200+ 非空行实质内容），可独立触发（`/construction-legal:priority-payment-right` 等），覆盖优先受偿权成立要件/范围/行使期限（待验证）/顺位/行使方式、结算依据认定/黑白合同备案结算/逾期答复、质量抗辩四要件/反索赔抵销、利息起算时点/垫资效力/本息组装
- **招投标合规（bidding-compliance）**：原 ~18 行浅骨架拆分为 4 个深层子技能（每个 190+ 非空行实质内容），可独立触发，覆盖必须招标三类触发情形/规模标准（阈值待验证）/招标方式、全流程程序合规/评标委员会/废标/合同签订、串通投标横纵向认定/围标陪标信号/弄虚作假/法律后果、中标无效五类情形/异议前置/投诉路径/行政监督部门按行业对照/合同效力衔接
- **编排入口改造**：两个原 SKILL.md 改造为编排入口，含子技能顺序表/代理立场护栏（发包人侧/承包人侧）/入口级护栏（优先受偿权期限预警/项目类型资金来源确认/分工说明/特权检查/地方性规定/时效性提示）

## Task Commits

1. **Task 1+2: payment-dispute 四子技能 + 编排入口** - `0caa79f` (feat)
2. **Task 3+4: bidding-compliance 四子技能 + 编排入口** - `997112d` (feat)

**Plan metadata:** (以下在 docs commit 后填入)

## Files Created/Modified

- `construction-legal/skills/payment-dispute/priority-payment-right/SKILL.md` — 工程价款优先受偿权（成立要件/范围/期限预警/顺位/行使方式；第807条建议复核，司法解释描述规则，期限待验证）261 非空行
- `construction-legal/skills/payment-dispute/settlement-basis-dual-contract/SKILL.md` — 结算依据与黑白合同（备案中标合同结算/逾期答复/未签证变更举证/造价鉴定启动）226 非空行
- `construction-legal/skills/payment-dispute/quality-defense-counterclaim/SKILL.md` — 质量抗辩与反索赔（抗辩四要件/不合格工程款处理/反索赔抵销/举证鉴定）220 非空行
- `construction-legal/skills/payment-dispute/interest-advance-funding/SKILL.md` — 工程款利息与垫资（计付标准/起算时点/垫资效力/本息组装/优先受偿权接口）208 非空行
- `construction-legal/skills/payment-dispute/SKILL.md` — payment-dispute 编排入口（含优先受偿权期限预警/代理立场加载/争议处理倾向/分工说明）
- `construction-legal/skills/bidding-compliance/mandatory-bidding-scope/SKILL.md` — 必须招标范围与方式（三类触发情形/规模标准待验证/招标方式选择/可不招标例外）194 非空行
- `construction-legal/skills/bidding-compliance/bidding-procedure/SKILL.md` — 招标投标程序（公告/资格审查/招标文件/评标委员会/废标/定标/合同签订；期限待验证）212 非空行
- `construction-legal/skills/bidding-compliance/collusion-fraud/SKILL.md` — 串通投标与虚假招标（横纵向串通认定/围标陪标信号/弄虚作假/法律后果含刑事风险提示）195 非空行
- `construction-legal/skills/bidding-compliance/bid-invalidity-complaint/SKILL.md` — 中标无效与异议投诉（五类无效情形/异议前置/投诉期限待验证/行政监督部门按行业/合同效力衔接）212 非空行
- `construction-legal/skills/bidding-compliance/SKILL.md` — bidding-compliance 编排入口（含项目类型资金来源确认/行政监督部门按行业/立场加载/分工说明）

## Decisions Made

- **利息是否纳入优先受偿权范围**：标注存在争议（priority-payment-right 与 interest-advance-funding 协同说明），在诉讼/仲裁申请书中将本金与利息分别列明，由裁决机构确认，不预设结论
- **必须招标规模阈值**：一律标 `[待验证]`，不列具体金额（避免引导律师使用未经验证的数值），提示核实现行《必须招标的工程建设项目规定》
- **串通投标罪刑事风险**：以描述规则呈现（「情节严重时可能构成串通投标罪」），刑事条号标 `[待验证]`，并在子技能中明确提示发现涉嫌犯罪情形须升级给律师

## Deviations from Plan

None — plan executed exactly as written. All 4 tasks completed per specification:
- 8 sub-skills created (4 payment-dispute + 4 bidding-compliance), each 150+ lines of substantive content per plan requirement
- 2 orchestrators updated per plan specification
- All legal citations follow _shared spine, 第807条 labeled 建议复核, 司法解释规则描述规则不写裸条号, 规模阈值/期限/条号一律标待验证

## Known Stubs

None — all sub-skills contain substantive content, no placeholder-only sections. Legal citation stubs (案例占位/学说占位) are intentional structural placeholders per the _shared citation library pattern established in 07-01, not content gaps.

## Threat Flags

None — this plan creates only prompt/skill definition files (SKILL.md), no network endpoints, auth paths, file access patterns, or schema changes.

## Issues Encountered

None — all 4 tasks completed successfully on first attempt. All automated verification checks passed.

## User Setup Required

None — no external service configuration required. Sub-skills are prompt content files.

## Next Phase Readiness

- **07-03 readiness**: payment-dispute and bidding-compliance sub-skill paths are established, ready for plugin.json registration (07-03 task); commercial-housing-review and cold-start-interview can be created in 07-03 following the same sub-skill depth pattern
- **Sub-skill naming**: all 8 sub-skills follow kebab-case naming convention; slash commands are `/construction-legal:<sub-skill-name>` as specified
- **Dependency note**: 07-03 may reference payment-dispute and bidding-compliance orchestrator paths in plugin.json registration; paths are stable after this commit

## Self-Check

### Files Exist
- `construction-legal/skills/payment-dispute/priority-payment-right/SKILL.md` — FOUND (261 non-empty lines)
- `construction-legal/skills/payment-dispute/settlement-basis-dual-contract/SKILL.md` — FOUND (226 non-empty lines)
- `construction-legal/skills/payment-dispute/quality-defense-counterclaim/SKILL.md` — FOUND (220 non-empty lines)
- `construction-legal/skills/payment-dispute/interest-advance-funding/SKILL.md` — FOUND (208 non-empty lines)
- `construction-legal/skills/bidding-compliance/mandatory-bidding-scope/SKILL.md` — FOUND (194 non-empty lines)
- `construction-legal/skills/bidding-compliance/bidding-procedure/SKILL.md` — FOUND (212 non-empty lines)
- `construction-legal/skills/bidding-compliance/collusion-fraud/SKILL.md` — FOUND (195 non-empty lines)
- `construction-legal/skills/bidding-compliance/bid-invalidity-complaint/SKILL.md` — FOUND (212 non-empty lines)

### Commits Exist
- `0caa79f` — FOUND (feat: payment-dispute sub-skills + orchestrator)
- `997112d` — FOUND (feat: bidding-compliance sub-skills + orchestrator)

## Self-Check: PASSED

---
*Phase: 07-construction-legal*
*Completed: 2026-06-05*
