---
phase: "09"
plan: "02"
subsystem: criminal-compliance
tags: [criminal-compliance, non-prosecution, corporate-crime, sub-skill-decomposition, orchestrator-pattern]
dependency_graph:
  requires:
    - "09-01"  # _shared spine (legal-basis-conventions, criminal-law-citations, practice-profile-schema) + CLAUDE.md
  provides:
    - non-prosecution sub-skills (4): applicability-assessment, compliance-plan, third-party-monitoring, application-hearing
    - corporate-crime sub-skills (4): unit-crime-constitution, common-unit-crime-types, internal-control-prevention, incident-response
    - orchestrator entry points (2): non-prosecution/SKILL.md, corporate-crime/SKILL.md
  affects:
    - criminal-compliance plugin: /criminal-compliance:non-prosecution and /criminal-compliance:corporate-crime slash commands now route through orchestrators
    - All 8 new sub-skill paths independently triggerable via /criminal-compliance:<name>
tech_stack:
  added: []
  patterns:
    - orchestrator-entry-point pattern (from commercial-legal/skills/contract-review/SKILL.md benchmark)
    - independently-triggerable sub-skill pattern (YAML frontmatter + standardized sections)
    - _shared spine citation discipline (mid-confidence anchors, [条号待验证], normative document describe-rules pattern)
key_files:
  created:
    - criminal-compliance/skills/non-prosecution/applicability-assessment/SKILL.md
    - criminal-compliance/skills/non-prosecution/compliance-plan/SKILL.md
    - criminal-compliance/skills/non-prosecution/third-party-monitoring/SKILL.md
    - criminal-compliance/skills/non-prosecution/application-hearing/SKILL.md
    - criminal-compliance/skills/corporate-crime/unit-crime-constitution/SKILL.md
    - criminal-compliance/skills/corporate-crime/common-unit-crime-types/SKILL.md
    - criminal-compliance/skills/corporate-crime/internal-control-prevention/SKILL.md
    - criminal-compliance/skills/corporate-crime/incident-response/SKILL.md
  modified:
    - criminal-compliance/skills/non-prosecution/SKILL.md  # rewritten as orchestrator
    - criminal-compliance/skills/corporate-crime/SKILL.md  # rewritten as orchestrator
decisions:
  - "All specific crime article numbers in sub-skills use [条号待验证] label — never hardcode; constituent elements described in prose"
  - "Mid-confidence anchors (Art. 30/31/67/68/72 criminal law, Art. 177/15 CPC) use 建议复核 tag, not [待验证]"
  - "Normative documents (涉案企业合规试点, third-party monitoring mechanism) described as rules + [待验证 — 规范性文件快速演进]"
  - "Mandatory escalation to criminal defense attorney is a non-overridable guard embedded in all sub-skills and orchestrators"
  - "No-evasion guard (不提供规避侦查/毁证/串供方法) embedded at orchestrator level and repeated in incident-response sub-skill"
  - "incident-response/SKILL.md carries prominent declaration above metadata section: compliant path = 依法整改如实供述认罪认罚"
  - "corporate-crime orchestrator routes to non-prosecution orchestrator when incident indicators present"
metrics:
  duration: "~3 hours (across two sessions due to context limit)"
  completed_date: "2026-06-08"
  tasks_completed: 3
  files_created: 10
  files_modified: 0
---

# Phase 09 Plan 02: Non-Prosecution and Corporate-Crime Decomposition Summary

**One-liner:** Decomposed two 18-line skeleton skills into 8 deep sub-skills (178–289 lines each) + 2 orchestrator entry points, with consistent citation discipline, mandatory attorney-escalation guards, and no-evasion guards throughout.

---

## Tasks Completed

| Task | Description | Commit | Files |
|------|-------------|--------|-------|
| 1 | Decompose non-prosecution into 4 independently-triggerable sub-skills | 5538973 | 4 created |
| 2 | Decompose corporate-crime into 4 independently-triggerable sub-skills | de737c4 | 4 created |
| 3 | Rewrite both main SKILL.md files as orchestrator entry points | 0a57962 | 2 modified |

---

## What Was Built

### Task 1: non-prosecution Sub-Skills (4 files)

**`applicability-assessment/SKILL.md`** (237 lines)
- 5-step assessment: evidence collection → 5 applicability conditions (all `[待验证]`) → 3 non-prosecution type comparison table (CPC Art. 177 "建议复核") → leniency 3-element assessment (CPC Art. 15 "建议复核") → penalty range → path recommendation
- Mandatory escalation and [合规边界 — 拒绝] error handling
- ## 法律依据 classified by 法条/司法解释/规范性文件/案例/学说

**`compliance-plan/SKILL.md`** (226 lines)
- 5-step plan: prerequisite confirmation → 6-dimension gap diagnosis (制度/流程/人员/监督/高层/文化) → remediation measures by category → milestone timeline → org support → verifiable outcomes
- "有效合规认定标准" referenced as normative document, `[待验证]`
- Boundary: remediation must be genuine (not formalistic); attorney must review before submission

**`third-party-monitoring/SKILL.md`** (194 lines)
- Cooperation framework for third-party monitoring/evaluation mechanism
- All mechanism rules described without document numbers + `[待验证 — 规范性文件快速演进]`
- Cannot: provide false materials / stage inspections / collude before interviews
- `[地方 flagged]` for regional pilot variations

**`application-hearing/SKILL.md`** (230 lines)
- Mandatory lawyer requirement hardcoded ("律师审查 — 硬性要求")
- "Compliant hearing response framework" with template statements
- Post-decision: compliance commitment fulfillment + 行刑反向衔接 warning
- Hearing Q&A prep table with compliant/non-compliant response examples

### Task 2: corporate-crime Sub-Skills (4 files)

**`unit-crime-constitution/SKILL.md`** (178 lines)
- Art. 30 (unit crime definition) and Art. 31 (double punishment) — both "建议复核"
- Three-element test + unit-crime-vs-personal-crime-using-unit-name identification table
- Responsibility personnel analysis (直接负责主管人员 vs. 其他直接责任人员)
- Single-punishment vs. double-punishment distinction (分则另有规定 cases)

**`common-unit-crime-types/SKILL.md`** (289 lines)
- 7 categories, 19 crime types, ALL article numbers `[条号待验证]`, ALL penalty amounts described as rules `[待验证]`
  - C1: 走私普通货物物品罪
  - C2: 非法吸收公众存款罪, 集资诈骗罪, 操纵证券市场罪, 内幕交易罪
  - C3: 虚开增值税专用发票罪, 逃税罪, 骗取出口退税罪
  - C4: 单位行贿罪, 对非国家工作人员行贿罪, 对单位行贿罪
  - C5: 非法经营罪, 合同诈骗罪, 串通投标罪, 假冒注册商标罪
  - C6: 污染环境罪
  - C7: 重大责任事故罪, 重大劳动安全事故罪
- Industry-to-crime-type risk mapping table

**`internal-control-prevention/SKILL.md`** (192 lines)
- 7 compliance policy categories with priority ratings
- 8 universal red-line behaviors (each with corresponding crime risk + `[条号待验证]`)
- 8 high-risk business processes: 采购/销售/财务税务/招投标/关联交易/对外捐赠/外包/危废
- 5 incompatible role combination (不相容职务分离) table
- Whistleblowing mechanism design elements

**`incident-response/SKILL.md`** (229 lines)
- Prominent no-evasion declaration above metadata section
- Mandatory attorney escalation urgency table: 4 scenarios
- Compliant vs. non-compliant behavior boundary table (5 categories)
- Self-surrender (Art. 67 "建议复核") and meritorious service (Art. 68 "建议复核") paths
- Leniency options table: 4 types
- Unit-individual responsibility division framework
- Routing to non-prosecution orchestrator: condition check table

### Task 3: Orchestrator Entry Points (2 files rewritten)

**`non-prosecution/SKILL.md`** (147 lines)
- Migration note → purpose/flow overview → prerequisites (CLAUDE.md load, cold-start prompt, temp mode with safety warning)
- 7 entry-level guards: enterprise profile, service stance, mandatory escalation (5-row trigger table), compliance-prevention guard, no-evasion guard, privilege/destination check, local pilot notice
- Sub-skill ordering table (4 rows) with path + standalone trigger command for each

**`corporate-crime/SKILL.md`** (149 lines)
- Same structure; service stance uses 事前预防立场 vs. non-prosecution's 涉案不起诉立场
- Routing note: directs to `/criminal-compliance:non-prosecution` when incident indicators present
- 7 entry-level guards identical in structure; incident response emphasizes "事前预防 — 不适用于已涉案直接应对"

---

## Legal Citation Discipline Applied

All sub-skills and orchestrators consistently follow the _shared spine conventions:

| Citation type | Treatment | Example |
|--------------|-----------|---------|
| Mid-confidence general anchors | 已核实锚点 + 建议复核 | 刑法第30/31/67/68/72条, 刑诉法第177/15条 |
| Specific crime article numbers | [条号待验证] + constituent elements in prose | 虚开增值税专用发票罪 [条号待验证] |
| Normative documents (合规试点/第三方评估) | Describe rules, no document numbers | [待验证 — 规范性文件快速演进] |
| Penalty amounts | Described as rules (数额较大/巨大) | [待验证] |

---

## Deviations from Plan

None — plan executed exactly as written. Citation discipline, guard patterns, sub-skill structure, and orchestrator entry-point pattern all followed as specified in the plan and CONTEXT.md.

---

## Known Stubs

None. All sub-skills are substantive content (178–289 lines each), not stubs or placeholders. Orchestrators are routing/guard files by design and reference the sub-skill paths explicitly.

---

## Threat Flags

No new network endpoints, auth paths, file access patterns, or schema changes introduced. This plan is entirely prompt/skill content — no executable code.

---

## Self-Check: PASSED

All 10 skill files found on disk. All 3 task commits (5538973, de737c4, 0a57962) confirmed in git log.
