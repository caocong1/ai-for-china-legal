---
phase: 05-data-compliance
plan: "02"
subsystem: data-compliance
tags:
  - cross-border-assessment
  - data-security-compliance
  - pipl
  - dsl
  - skills
  - sub-skills
dependency_graph:
  requires:
    - 05-01 (_shared/data-protection-citations.md, _shared/legal-basis-conventions.md, data-compliance/CLAUDE.md)
  provides:
    - cross-border-assessment/pathway-determination
    - cross-border-assessment/security-assessment-filing
    - cross-border-assessment/standard-contract
    - cross-border-assembly
    - cross-border-assessment/SKILL.md (编排入口)
    - data-security-compliance/data-classification-grading
    - data-security-compliance/important-data-handling
    - data-security-compliance/security-management-system
    - data-security-compliance/risk-assessment-reporting
    - data-security-compliance/SKILL.md (编排入口)
  affects:
    - 05-03 (network-security-compliance — 引用等保/关基衔接，本计划已在分工说明中对接)
tech_stack:
  added: []
  patterns:
    - 深层子技能结构（frontmatter + 标准章节：目的/前置/详细步骤/检查清单/输出模板/边界条件/错误处理/法律依据）
    - 三路径决策树（PIPL第38条安全评估/保护认证/标准合同）
    - DSL三级数据分类分级框架（国家核心数据/重要数据/一般数据）
    - 临时模式 + 配置读取（CLAUDE.md驱动技能行为）
    - 待验证标注约定（[待验证] / [行业监管 flagged]）
key_files:
  created:
    - data-compliance/skills/cross-border-assessment/pathway-determination/SKILL.md
    - data-compliance/skills/cross-border-assessment/security-assessment-filing/SKILL.md
    - data-compliance/skills/cross-border-assessment/standard-contract/SKILL.md
    - data-compliance/skills/cross-border-assessment/cross-border-assembly/SKILL.md
    - data-compliance/skills/data-security-compliance/data-classification-grading/SKILL.md
    - data-compliance/skills/data-security-compliance/important-data-handling/SKILL.md
    - data-compliance/skills/data-security-compliance/security-management-system/SKILL.md
    - data-compliance/skills/data-security-compliance/risk-assessment-reporting/SKILL.md
    - data-compliance/skills/data-security-compliance/SKILL.md
  modified:
    - data-compliance/skills/cross-border-assessment/SKILL.md (改造为编排入口)
decisions:
  - 网信办办法（出境评估办法/标准合同办法）的数量门槛/时限/有效期全部描述规则并标[待验证]，不臆造具体数值
  - 重要数据目录由行业主管部门制定，行业目录未公布时一律按保守标准推定并标[行业监管 flagged]
  - cross-border-assembly 作为三路径的汇总终点（保护认证路径说明+接收方评估+合规清单+报告组装）
  - data-security-compliance 与 cross-border-assessment 通过 important-data-handling 互相衔接（重要数据出境触发安全评估申报）
metrics:
  duration: "约90分钟"
  completed: "2026-06-05T01:51:17Z"
  tasks_completed: 2
  tasks_total: 2
  files_created: 9
  files_modified: 1
---

# Phase 05 Plan 02: 数据出境评估拆分 + 数据安全法合规检查新建 Summary

**一句话概要**：依 PIPL 第38-40条和 DSL 第21/31条将 cross-border-assessment 从16行浅骨架拆分为四个可独立触发的深层子技能（路径判定/安全评估申报/标准合同备案/出境装配），并新建 data-security-compliance 主技能（数据分类分级/重要数据识别/安全管理制度/风险评估报告四子技能 + 各自编排入口），共交付10个 SKILL.md 文件。

---

## 执行摘要

### Task 1: 拆分 cross-border-assessment 为四子技能 + 改造编排入口

**完成状态**：完成 — commit `d3b175a`

将原有16行浅骨架四步纲要（出境数据识别/接收方评估/风险评估/生成评估报告）拆分迁移并深化为四个可独立触发的子技能。所有原有内容均已无丢失地迁移并大幅深化：

| 子技能 | 覆盖原始步骤 | 非空行数 | 核心内容 |
|-------|----------|--------|---------|
| pathway-determination（出境路径判定） | 出境数据识别 → 路径判定核心 | 207 | PIPL第38条三路径决策树、第39条单独同意、第40条PIA、路径选择决策树 |
| security-assessment-filing（安全评估申报） | 风险评估（申报维度） | 222 | 申报情形判断、五维度自评估、申报材料框架、有效期/重新评估 |
| standard-contract（标准合同备案） | 合同签订与备案 | 185 | 适用条件（门槛待验证）、必备条款审查、PIA衔接、省级备案 |
| cross-border-assembly（出境合规装配） | 接收方评估+报告生成 | 225 | 保护认证路径、接收方综合评估、三路径合规清单、报告组装 |
| SKILL.md（编排入口） | 全流程编排 | 105 | 子技能编排顺序表、入口级护栏（CIIO/重要数据/单独同意/行业监管/临时模式/特权检查/时效性） |

### Task 2: 新增 data-security-compliance 四子技能 + 编排入口

**完成状态**：完成 — commit `aafe6cb`

全新建立 data-security-compliance 主技能（《数据安全法》合规检查），覆盖 ROADMAP 第三能力面：

| 子技能 | 非空行数 | 核心内容 |
|-------|--------|---------|
| data-classification-grading（数据分类分级） | 195 | DSL第21条三级（国家核心/重要/一般）、行业目录衔接、PIPL交叉关系、分级清单建立 |
| important-data-handling（重要数据识别与处理） | 193 | DSL第31条出境安全评估（已核实）、重要数据处理者义务（负责人/机构/风险报送）、重要数据台账 |
| security-management-system（数据安全管理制度） | 206 | 全生命周期8阶段管理、组织保障（RACI）、安全教育培训、技术措施清单（加密/访问控制/审计等） |
| risk-assessment-reporting（风险评估与报告） | 256 | 定期风险评估7维度、风险监测机制、安全事件4级分级+应急处置流程、数据交易合规、境外执法调取 |
| SKILL.md（编排入口） | 101 | 子技能编排顺序表、入口级护栏（CIIO/重要数据/行业监管/出境衔接/临时模式/特权检查/时效性） |

---

## 已核实锚点与待验证事项处理

### 已核实（在所有子技能中明确标注「已核实锚点，建议复核」）

| 锚点 | 法律依据 |
|-----|---------|
| 跨境提供三路径 | PIPL（2021年）第38条 |
| 跨境单独同意 | PIPL（2021年）第39条 |
| 跨境前影响评估（PIA） | PIPL（2021年）第40条 |
| PIA应进行的情形 | PIPL（2021年）第55条 |
| PIA报告留存三年 | PIPL（2021年）第56条 |
| 数据分类分级三级制度 | DSL（2021年）第21条 |
| 重要数据出境须安全评估 | DSL（2021年）第31条 |

### 保守处理（全部标注[待验证]）

- 网信办出境评估办法（2022年）的申报数量门槛、评估有效期、重新评估情形：**全部描述规则，不写具体数值**
- 个人信息出境标准合同办法（2023年）的累计出境人数门槛、敏感个人信息人数门槛、备案时限：**全部标[待验证]**
- DSL关于数据安全管理制度、风险评估报送、安全事件报告的具体条款号：**描述规则并标[待验证]**
- 保护认证路径的具体适用条件与认证机构要求：**标[待验证]**
- 重要数据目录（各行业各地区）：**全部标[行业监管 flagged — 需核实主管部门规定]**

---

## 偏差记录

**无偏差** — 计划完全按照规格执行：
- 四个出境子技能 + 编排入口 = 按计划交付
- 四个数据安全子技能 + 编排入口 = 按计划交付
- 所有已核实锚点明确标注，所有待验证项目保守处理
- 原 cross-border-assessment 四步纲要无丢失迁移
- 两个编排入口互相衔接（重要数据出境联动、分工说明清晰）

---

## 已知 Stub

无。所有子技能均包含完整的分析逻辑、检查清单、输出模板，均来自中国数据保护法规内容，不含占位数据。

---

## Threat Flags

| Flag | File | Description |
|------|------|-------------|
| threat_flag: 监管报告义务 | risk-assessment-reporting/SKILL.md | 子技能涵盖向主管部门报告义务，输出文件须区分特权圈与外部目的地（已在护栏中标注） |
| threat_flag: 重要数据出境 | important-data-handling/SKILL.md | 重要数据出境一律安全评估路径，子技能已明确标注🔴并衔接 security-assessment-filing |

---

## 自检

### 文件存在检查

- [x] data-compliance/skills/cross-border-assessment/pathway-determination/SKILL.md
- [x] data-compliance/skills/cross-border-assessment/security-assessment-filing/SKILL.md
- [x] data-compliance/skills/cross-border-assessment/standard-contract/SKILL.md
- [x] data-compliance/skills/cross-border-assessment/cross-border-assembly/SKILL.md
- [x] data-compliance/skills/cross-border-assessment/SKILL.md
- [x] data-compliance/skills/data-security-compliance/data-classification-grading/SKILL.md
- [x] data-compliance/skills/data-security-compliance/important-data-handling/SKILL.md
- [x] data-compliance/skills/data-security-compliance/security-management-system/SKILL.md
- [x] data-compliance/skills/data-security-compliance/risk-assessment-reporting/SKILL.md
- [x] data-compliance/skills/data-security-compliance/SKILL.md

### Commit 检查

- [x] d3b175a: feat(05-02): 拆分 cross-border-assessment 为四子技能 + 改造编排入口
- [x] aafe6cb: feat(05-02): 新增 data-security-compliance 四子技能 + 编排入口

## Self-Check: PASSED
