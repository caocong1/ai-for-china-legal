---
phase: 05-data-compliance
plan: "01"
subsystem: data-compliance
tags: [data-compliance, pipl, dsl, csl, pia, citation-spine, claude-template, sub-skills]
dependency_graph:
  requires: []
  provides:
    - data-compliance/skills/_shared/legal-basis-conventions.md
    - data-compliance/skills/_shared/data-protection-citations.md
    - data-compliance/skills/_shared/practice-profile-schema.md
    - data-compliance/CLAUDE.md
    - data-compliance/skills/pia-generation/trigger-consent-basis/SKILL.md
    - data-compliance/skills/pia-generation/data-mapping-necessity/SKILL.md
    - data-compliance/skills/pia-generation/risk-mitigation-assessment/SKILL.md
    - data-compliance/skills/pia-generation/pia-report-assembly/SKILL.md
    - data-compliance/skills/pia-generation/SKILL.md (orchestrator)
  affects:
    - 05-02 (cross-border-assessment, data-security-compliance) — reads _shared spine + CLAUDE.md
    - 05-03 (network-security-compliance, cold-start-interview) — reads _shared spine + CLAUDE.md
tech_stack:
  added: []
  patterns:
    - 数据合规引用脊柱（_shared citation spine）模式复用 commercial/employment 已验证模式
    - CLAUDE.md 散文单一真相来源（沿用 Phase 2/3/4 模式，无冲突新格式）
    - 四层子技能 PIA 流程：触发情形→数据映射→风险评估→报告组装
    - 临时模式 + 配置读取契约 + CIIO/受托处理者立场选择
key_files:
  created:
    - data-compliance/skills/_shared/legal-basis-conventions.md
    - data-compliance/skills/_shared/data-protection-citations.md
    - data-compliance/skills/_shared/practice-profile-schema.md
    - data-compliance/CLAUDE.md
    - data-compliance/skills/pia-generation/trigger-consent-basis/SKILL.md
    - data-compliance/skills/pia-generation/data-mapping-necessity/SKILL.md
    - data-compliance/skills/pia-generation/risk-mitigation-assessment/SKILL.md
    - data-compliance/skills/pia-generation/pia-report-assembly/SKILL.md
  modified:
    - data-compliance/skills/pia-generation/SKILL.md (浅骨架→编排入口)
decisions:
  - "散文 CLAUDE.md 单一真相来源：不引入冲突新 JSON/YAML 格式，纠正现有访谈「YAML格式」表述"
  - "网信办办法具体条号保守原则：一律描述规则+标待验证，不臆造条号"
  - "CIIO 与受托处理者身份确认前置：不同身份影响义务强度，须在 PIA 执行前从配置文件读取确认"
  - "跨境场景分工：PIA 子技能记录跨境风险维度，深度路径判定交由 cross-border-assessment（05-02）"
metrics:
  duration: ~45分钟
  completed_date: 2026-06-05
  tasks_completed: 4
  tasks_total: 4
  files_created: 8
  files_modified: 1
---

# Phase 05 Plan 01: 数据合规引用脊柱 + CLAUDE.md + PIA 拆分 Summary

**一句话摘要：** 为数据合规插件建立 PIPL/DSL/CSL/网信办办法四层来源分类引用脊柱（含 11 个已核实锚点 + 待验证纪律）、首次创建 data-compliance/CLAUDE.md 实践配置模板（数据处理者画像/CIIO/敏感数据/跨境政策/行业监管），并将 16 行浅骨架 pia-generation 拆分为四个 160-420 行可独立触发的深层子技能 + 编排入口。

---

## 交付物清单

| 文件路径 | 类型 | 关键内容 |
|---------|------|---------|
| `data-compliance/skills/_shared/legal-basis-conventions.md` | 新建 | 来源分类规范：法律/行政法规/部门规章/国家标准/案例/学说六类；五标签表；待验证规则；快速演进时效性强标注；行业监管多头监管定位；引用最小格式 |
| `data-compliance/skills/_shared/data-protection-citations.md` | 新建 | PIPL/DSL/CSL/行政法规/网信办办法/国家标准 引用库；11 个已核实锚点；网信办办法描述规则+待验证；4 类案例占位；4 类学说占位；已核实锚点汇总表；更新规则（每季度复核办法层级）|
| `data-compliance/skills/_shared/practice-profile-schema.md` | 新建 | 数据合规版配置契约；真相来源=data-compliance/CLAUDE.md；纠正访谈 YAML 表述；9 组字段映射（130+ 行映射表）；技能读取契约+临时模式；处理者/受托/CIIO 立场选择；法律事实合理性检查（网信办阈值标待验证）；schema 章节对照表 |
| `data-compliance/CLAUDE.md` | 新建（首次创建）| 数据合规实践配置模板；10 个章节（我们是谁含CIIO/谁在使用/可用集成/合规立场含敏感数据政策+跨境政策+数据安全立场/风险校准/升级矩阵含监管报告触发/文书风格/输出/共享护栏含行业监管识别+时效性触发/事项工作区/种子文档）|
| `data-compliance/skills/pia-generation/trigger-consent-basis/SKILL.md` | 新建 | 360 总行；PIA触发情形（第55条5类）；合法性基础（第13条7类+第14条同意机制）；敏感个人信息单独同意（第28-29条，七类清单）；自动化决策（第24条）；未成年人监护人同意；捆绑同意识别；输出模板+边界条件+错误处理+法律依据 |
| `data-compliance/skills/pia-generation/data-mapping-necessity/SKILL.md` | 新建 | 323 总行；处理活动登记表；个人信息类目清单（17项含敏感标注）；最小必要原则四维度（规则已核实）；最小必要偏离判定表（5类）；数据保存期限合规（含第56条3年已核实）；委托处理/对外提供/共同处理三场景；匿名化/去标识化边界确认 |
| `data-compliance/skills/pia-generation/risk-mitigation-assessment/SKILL.md` | 新建 | 314 总行；风险点识别（第55条评估框架三维度）；风险矩阵（可能性×影响程度4×4）；技术保护措施七类评估表；组织保护措施六类评估表；个人权利（第44-47条）六类响应机制逐项核查；自动化决策说明渠道（第24条）；跨境风险维度记录（分工给cross-border-assessment）|
| `data-compliance/skills/pia-generation/pia-report-assembly/SKILL.md` | 新建 | 421 总行；七部分标准 PIA 报告结构；报告保存义务（第55-56条，3年，已核实）；版本管理；监管检查/合规审计衔接；交付前质量检查清单；整改建议分优先级；两版本策略（内部/监管提交）|
| `data-compliance/skills/pia-generation/SKILL.md` | 改造（浅骨架→编排入口）| frontmatter 更新；迁移说明；目的+整体流程概览；前置加载+临时模式；立场确认；子技能编排顺序表（4子技能路径+单独触发命令）；入口级护栏（敏感识别/行业监管/特权检查/出境衔接/时效性）|

---

## 已核实锚点汇总（本计划确认并使用）

| 锚点 | 法律依据 | 验证状态 |
|------|---------|---------|
| 告知-同意合法性基础与同意规则 | PIPL 第13-14条 | 已核实锚点，建议复核 |
| 敏感个人信息单独同意 | PIPL 第28-29条 | 已核实锚点，建议复核 |
| 自动化决策规则 | PIPL 第24条 | 已核实锚点，建议复核 |
| 跨境提供三路径 | PIPL 第38条 | 已核实锚点，建议复核 |
| 跨境单独同意 | PIPL 第39条 | 已核实锚点，建议复核 |
| 跨境前个人信息保护影响评估 | PIPL 第40条 | 已核实锚点，建议复核 |
| PIA 须进行的情形 | PIPL 第55条 | 已核实锚点，建议复核 |
| 评估报告及记录存3年 | PIPL 第56条 | 已核实锚点，建议复核 |
| 个人权利（查阅/复制/更正/删除） | PIPL 第44-47条 | 已核实锚点，建议复核 |
| 数据分类分级（三级） | DSL 第21条 | 已核实锚点，建议复核 |
| 重要数据出境须安全评估 | DSL 第31条 | 已核实锚点，建议复核 |
| 网络安全等级保护制度 | CSL 第21条 | 已核实锚点，建议复核 |
| 关键信息基础设施安全保护 | CSL 第31条起 | 已核实锚点，建议复核 |

---

## 待验证项（保守纪律执行）

- 网信办办法（出境评估办法/标准合同办法/认证规定/审查办法）的所有具体条号：一律描述规则+标 `[待验证]`
- 国家标准（GB/T）编号、年份、推荐性/强制性：一律标 `[待验证]`
- PIPL 个人信息保护负责人条文（第52条）、合规审计义务（第54条）：标 `[待验证]`
- CSL 数据本地化具体条号（第37条）：标 `[待验证具体条号]`
- 网络数据安全管理条例施行状态：标 `[待验证 — 须核实现行施行状态]`
- 最小必要原则具体条文：规则已核实，具体条号标 `[待验证]`

---

## 偏差记录

无偏差 — 计划按设计完整执行。所有任务的验收标准均满足：
- 每个子技能 150+ 行实质内容（实际：360/323/314/421 总行，250+ 非空行）
- 11 个已核实锚点明确呈现
- 网信办办法条号保守处理（描述规则 + 待验证）
- CLAUDE.md 9 大章节全部完整

---

## Self-Check

### 创建文件验证

- data-compliance/skills/_shared/legal-basis-conventions.md: FOUND
- data-compliance/skills/_shared/data-protection-citations.md: FOUND
- data-compliance/skills/_shared/practice-profile-schema.md: FOUND
- data-compliance/CLAUDE.md: FOUND
- data-compliance/skills/pia-generation/trigger-consent-basis/SKILL.md: FOUND
- data-compliance/skills/pia-generation/data-mapping-necessity/SKILL.md: FOUND
- data-compliance/skills/pia-generation/risk-mitigation-assessment/SKILL.md: FOUND
- data-compliance/skills/pia-generation/pia-report-assembly/SKILL.md: FOUND
- data-compliance/skills/pia-generation/SKILL.md: FOUND (modified)

### 提交验证

- 905a14a: feat(05-01): 建立数据合规法律引用脊柱（来源分类规范 + PIPL/DSL/CSL 引用库）
- 0390fb6: feat(05-01): 新建 data-compliance/CLAUDE.md 实践配置模板 + 数据合规版配置契约
- cca55e3: feat(05-01): 拆分 pia-generation 为四个可独立触发的深层子技能
- 6e59fc3: feat(05-01): 改造 pia-generation/SKILL.md 为编排入口

## Self-Check: PASSED
