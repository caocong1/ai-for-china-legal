---
phase: 04-employment-legal-core
plan: "03"
subsystem: employment-legal
tags:
  - leave-management
  - cold-start-interview
  - labor-dispute-handling
  - plugin-registration
  - sub-skill-decomposition
dependency_graph:
  requires:
    - 04-01
    - 04-02
  provides:
    - employment-legal/skills/leave-management/*
    - employment-legal/skills/cold-start-interview/*
    - employment-legal/skills/labor-dispute-handling/*
    - employment-legal/.claude-plugin/plugin.json v0.3.0
  affects:
    - employment-legal 全插件（注册所有技能）
tech_stack:
  added:
    - labor-dispute-handling（劳动争议处理新技能，四子技能）
  patterns:
    - 编排入口 + 可独立触发子技能（沿用 Phase 2/3/04-01/04-02 模式）
    - 访谈结果填充 CLAUDE.md（非 YAML 生成）
    - 已核实锚点 + [待验证] 标注规范
key_files:
  created:
    - employment-legal/skills/leave-management/annual-leave/SKILL.md
    - employment-legal/skills/leave-management/sick-leave-medical-period/SKILL.md
    - employment-legal/skills/leave-management/maternity-female-protection/SKILL.md
    - employment-legal/skills/leave-management/statutory-leave-attendance/SKILL.md
    - employment-legal/skills/cold-start-interview/identity-team/SKILL.md
    - employment-legal/skills/cold-start-interview/review-stance/SKILL.md
    - employment-legal/skills/cold-start-interview/risk-escalation/SKILL.md
    - employment-legal/skills/cold-start-interview/style-local-rules/SKILL.md
    - employment-legal/skills/labor-dispute-handling/dispute-classification-limitation/SKILL.md
    - employment-legal/skills/labor-dispute-handling/mediation-path/SKILL.md
    - employment-legal/skills/labor-dispute-handling/arbitration-path/SKILL.md
    - employment-legal/skills/labor-dispute-handling/litigation-path/SKILL.md
    - employment-legal/skills/labor-dispute-handling/SKILL.md
  modified:
    - employment-legal/skills/leave-management/SKILL.md（改造为编排入口）
    - employment-legal/skills/cold-start-interview/SKILL.md（改造为编排入口，纠正YAML表述）
    - employment-legal/.claude-plugin/plugin.json（0.2.0→0.3.0，注册全部31个技能）
decisions:
  - "leave-management 4子技能分工：annual-leave/sick-leave-medical-period/maternity-female-protection/statutory-leave-attendance，完整覆盖现有61行浅骨架内容并深化"
  - "cold-start-interview YAML表述纠正：访谈结果填充 employment-legal/CLAUDE.md 散文模板，不生成独立 YAML 文件（与 practice-profile-schema 契约一致）"
  - "labor-dispute-handling 时效优先护栏：进入任何路径前必须先经 dispute-classification-limitation 核实时效"
  - "plugin.json 注册全部31个技能（6编排入口+25子技能），未注册 _shared 下的非技能文件"
  - "300%准确表述：合计300%=正常工资100%+另付200%，不写为额外300%"
metrics:
  duration: "约2小时"
  completed_date: "2026-06-05"
  tasks_completed: 4
  files_created: 13
  files_modified: 3
---

# Phase 04 Plan 03: 假期管理拆分+访谈拆分+劳动争议新增+全插件注册 总结

**一句话总结**：将 leave-management（4子技能+编排入口）和 cold-start-interview（4访谈子技能+编排入口）拆分深化，新增 labor-dispute-handling（调解/仲裁/诉讼/时效 4子技能+编排入口），并将 employment-legal 全插件升级至 v0.3.0 并注册所有 31 个技能条目，Phase 4 完整交付可调用的劳动人事技能集。

---

## 交付成果

### 新建/修改文件（共 16 个）

| 文件路径 | 类型 | 关键内容 | 行数 |
|---------|------|---------|------|
| `employment-legal/skills/leave-management/annual-leave/SKILL.md` | 新建 | 5/10/15天分档 + 折算规则 + 未休工资300%（含100%正常工资+另付200%，合计300%） | 195 |
| `employment-legal/skills/leave-management/sick-leave-medical-period/SKILL.md` | 新建 | 医疗期分档（实际+本单位年限组合）+ 病假工资80%下限 + 医疗期内禁止解除衔接 | 198 |
| `employment-legal/skills/leave-management/maternity-female-protection/SKILL.md` | 新建 | 产假98天/难产+15/多胞胎每个+15 + 三期（孕期/产期/哺乳期）特别保护 + 地方奖励假差异标记 | 191 |
| `employment-legal/skills/leave-management/statutory-leave-attendance/SKILL.md` | 新建 | 婚丧假/陪产假/停工留薪期 + 法定节假日300%加班费 + 考勤制度民主程序+无罚款规则 | 224 |
| `employment-legal/skills/leave-management/SKILL.md` | 修改 | 编排入口：四子技能路径+临时模式+地方性/禁止解除衔接护栏 | 66 |
| `employment-legal/skills/cold-start-interview/identity-team/SKILL.md` | 新建 | 身份与团队10问+写入映射→ CLAUDE.md 我们是谁/谁在使用/可用集成 | 121 |
| `employment-legal/skills/cold-start-interview/review-stance/SKILL.md` | 新建 | 用人单位方/劳动者方+雇佣审查立场+解雇N/N+1/2N倾向+竞业配置+合理性检查 | 142 |
| `employment-legal/skills/cold-start-interview/risk-escalation/SKILL.md` | 新建 | 风险等级确认+升级矩阵（角色/条件/自动升级/时效高优先）→ CLAUDE.md | 113 |
| `employment-legal/skills/cold-start-interview/style-local-rules/SKILL.md` | 新建 | 文书风格+地方性规定勾选（按地区标记）→ CLAUDE.md 文书风格/共享护栏 | 129 |
| `employment-legal/skills/cold-start-interview/SKILL.md` | 修改 | 编排入口：四访谈子技能+单独重跑说明+纠正YAML表述（填充CLAUDE.md，非生成YAML） | 65 |
| `employment-legal/skills/labor-dispute-handling/dispute-classification-limitation/SKILL.md` | 新建 | 争议范围认定+仲裁时效1年（第27条已核实）+时效起算/中止/中断/存续期间拖欠报酬特例 | 196 |
| `employment-legal/skills/labor-dispute-handling/mediation-path/SKILL.md` | 新建 | 三类调解组织+调解协议效力+支付令（拖欠报酬/工伤/经济补偿/赔偿金）+时效保全衔接 | 161 |
| `employment-legal/skills/labor-dispute-handling/arbitration-path/SKILL.md` | 新建 | 仲裁前置+一裁终局识别（第47条已核实）+申请书要素/管辖/举证责任倒置 | 215 |
| `employment-legal/skills/labor-dispute-handling/litigation-path/SKILL.md` | 新建 | 不服裁决起诉15日/一裁终局有限救济（劳动者起诉vs用人单位30日撤销申请）+强制执行 | 188 |
| `employment-legal/skills/labor-dispute-handling/SKILL.md` | 新建 | 编排入口：时效优先护栏+用人单位方/劳动者方立场+一裁终局识别+跨插件Deferred说明 | 68 |
| `employment-legal/.claude-plugin/plugin.json` | 修改 | 0.2.0→0.3.0，31个技能条目（6编排入口+25子技能），description更新，JSON合法 | — |

---

## 关键法律内容质量

### 已核实锚点（正确使用）

| 锚点 | 引用位置 | 表述方式 |
|------|---------|---------|
| 劳动仲裁时效1年 = 《劳动争议调解仲裁法》第27条 | dispute-classification-limitation/SKILL.md | **已核实锚点**，标注「已核实锚点，建议复核」 |
| 部分案件一裁终局 = 《劳动争议调解仲裁法》第47条 | arbitration-path/SKILL.md | **已核实锚点**，标注「已核实锚点，建议复核」 |
| 未休年休假300%（含100%正常工资+另付200%） | annual-leave/SKILL.md | 正确表述，明确说明「并非另付300%，合计300%」 |
| 产假98天（+难产+15天/多胞胎每个+15天） | maternity-female-protection/SKILL.md | 已核实规则，具体条号待验证 |
| 医疗期分档（实际+本单位年限组合） | sick-leave-medical-period/SKILL.md | 已核实规则，依据标注[待验证] |

### 不确定条号正确标注 [待验证]

- 15日起诉期限（litigation-path）
- 30日撤销申请期限（litigation-path）
- 撤销法定情形（litigation-path）
- 医疗期分档规章条号（sick-leave-medical-period）
- 争议范围条款条号（dispute-classification-limitation）
- 产假奖励假地方差异（maternity-female-protection，额外标 [管辖 flagged]）

---

## 偏差说明（与计划对比）

**无偏差** — 计划执行完全按照 04-03-PLAN.md，未出现需要记录的偏差。

以下为与计划对照的关键说明：
- plugin.json 注册了 31 个技能（计划称「6编排入口+22子技能=28个」，实际 hiring-review 有 5 个子技能而非计划描述的标准数，总计因 hiring-review 实际为 5 子技能而共 31 条目）；JSON 合法性验证通过，所有 path 指向存在的文件。
- 「生成YAML格式」表述已从 cold-start-interview/SKILL.md 移除，改为明确说明「填充 employment-legal/CLAUDE.md 对应章节」。

---

## 成功标准确认

- [x] 律师/HR 可单独触发任一假期子能力（4）、访谈子能力（4，支持只更新某部分）、争议子能力（4）
- [x] 每个深度子技能含详细步骤/检查清单/输出模板/边界条件/错误处理/法律依据
- [x] 假期子技能 ≥150 行（195/198/191/224），访谈子技能 ≥80 行（121/142/113/129），争议子技能 ≥150 行（196/161/215/188）
- [x] 冷启动访谈结果填充 employment-legal/CLAUDE.md 对应章节，不生成独立 YAML（表述已纠正）
- [x] labor-dispute-handling 提供入职到争议全链路争议解决能力，仲裁时效1年/一裁终局已核实锚点明确
- [x] plugin.json 升级到 0.3.0 并注册全部技能，Phase 4 交付完整可调用的 employment-legal 技能集
- [x] 全部文件遵守 CLAUDE.md 中国化原则与文件格式约定

---

## 提交记录

| 提交哈希 | 类型 | 说明 |
|---------|------|------|
| c51765b | feat(04-03) | 拆分 leave-management 为四个子技能 + 编排入口 |
| fc5c17d | feat(04-03) | 拆分 cold-start-interview 为四个访谈子技能 + 编排入口（纠正YAML表述）|
| 56de29e | feat(04-03) | 新增 labor-dispute-handling 劳动争议处理技能 — 四子技能 + 编排入口 |
| d7f5a53 | feat(04-03) | plugin.json 升级到 0.3.0，注册全部 31 个技能条目 |

---

## Self-Check: PASSED

已验证所有新建文件存在且行数符合要求：
- 4个假期子技能：195/198/191/224 非空行（≥150 OK）
- 4个访谈子技能：121/142/113/129 非空行（≥80 OK）
- 4个争议子技能：196/161/215/188 非空行（≥150 OK）
- plugin.json：合法JSON，版本0.3.0，31个技能条目，所有path验证存在

已验证所有提交存在：c51765b、fc5c17d、56de29e、d7f5a53

## 已知 Stubs

无 — 本计划不涉及 UI 或数据源接入，所有 SKILL.md 内容均为实质内容。

## Threat Flags

无 — 本计划修改为纯提示词/技能定义文件，不涉及网络端点、认证路径、文件访问或数据库操作。
