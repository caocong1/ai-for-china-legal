---
phase: 04-employment-legal-core
plan: "01"
subsystem: employment-legal
tags:
  - labor-law
  - citation-spine
  - hiring-review
  - sub-skills
  - practice-profile

dependency_graph:
  requires: []
  provides:
    - employment-legal/skills/_shared/legal-basis-conventions.md
    - employment-legal/skills/_shared/labor-law-citations.md
    - employment-legal/skills/_shared/practice-profile-schema.md
    - employment-legal/skills/hiring-review/document-mandatory-terms/SKILL.md
    - employment-legal/skills/hiring-review/probation-working-hours/SKILL.md
    - employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md
    - employment-legal/skills/hiring-review/service-period-penalty/SKILL.md
    - employment-legal/skills/hiring-review/hiring-review-assembly/SKILL.md
    - employment-legal/skills/hiring-review/SKILL.md
  affects:
    - employment-legal（全插件 _shared 引用脊柱）
    - 04-02（termination-review/non-compete-review 将引用 _shared 脊柱）
    - 04-03（leave-management/cold-start-interview/labor-dispute-handling 将引用 _shared 脊柱）

tech_stack:
  added: []
  patterns:
    - 引用脊柱（citation spine）：法条/案例/学说三类分类 + 待验证标记 + 已核实锚点
    - 配置契约（practice profile schema）：CLAUDE.md 单一真相来源 + 字段映射 + 技能读取契约
    - 深度子技能拆分：213行扁平技能 → 5个可独立触发子技能（200+非空行各）+ 编排入口

key_files:
  created:
    - employment-legal/skills/_shared/legal-basis-conventions.md
    - employment-legal/skills/_shared/labor-law-citations.md
    - employment-legal/skills/_shared/practice-profile-schema.md
    - employment-legal/skills/hiring-review/document-mandatory-terms/SKILL.md
    - employment-legal/skills/hiring-review/probation-working-hours/SKILL.md
    - employment-legal/skills/hiring-review/social-insurance-wages/SKILL.md
    - employment-legal/skills/hiring-review/service-period-penalty/SKILL.md
    - employment-legal/skills/hiring-review/hiring-review-assembly/SKILL.md
  modified:
    - employment-legal/skills/hiring-review/SKILL.md

decisions:
  - 劳动法引用脊柱（_shared）沿用 Phase 2/3 citation spine 模式，适配劳动法语境（仲裁前置/地方性规定/竞业限制地方指引）
  - CLAUDE.md 单一真相来源：不引入新 JSON/YAML 格式，纠正 cold-start-interview 「生成 YAML」表述
  - 已核实锚点8条明确标注，其余条号标 [待验证]，无臆造条号
  - 服务期/竞业分工：service-period-penalty 识别违约金合法性，non-compete-review（04-02）负责竞业深度审查

metrics:
  duration_seconds: 2059
  completed_date: "2026-06-04"
  task_count: 4
  file_count: 9
---

# Phase 4 Plan 01: 劳动法引用脊柱建立 + hiring-review 深度子技能拆分 Summary

**One-liner**：建立劳动合同法/劳动法/争议仲裁法/社保法引用脊柱（8条已核实锚点）和实践配置契约，将213行扁平 hiring-review 拆为5个可独立触发的深度子技能（每个200+非空行）。

---

## 完成的任务

### Task 1: 建立劳动法律引用脊柱

**提交**：`83812cd`

**创建**：
- `employment-legal/skills/_shared/legal-basis-conventions.md`（207行）：劳动人事法律依据引用规范，包含来源分类三类（法条/案例/学说）、五标签表（复用 CLAUDE.md 现有标签）、待验证标记规则、地方性规定标注（北上广深等）、仲裁委 + 四级法院定位。
- `employment-legal/skills/_shared/labor-law-citations.md`（333行）：可复用劳动人事高频引用库，覆盖6个法律法规：劳动合同法（2012修正）/ 劳动法 / 劳动争议调解仲裁法 / 社会保险法 / 职工带薪年休假条例 / 女职工劳动保护特别规定。含8条已核实锚点、4类占位案例、4类占位学说、已核实锚点汇总表、引用库使用说明。

**已核实锚点（8条，明确标注）**：

| 锚点 | 法律依据 |
|------|---------|
| 经济补偿 N | 《劳动合同法》第47条 |
| 违法解除赔偿金 2N | 《劳动合同法》第87条 |
| 未订书面合同二倍工资 | 《劳动合同法》第82条 |
| 无固定期限劳动合同触发 | 《劳动合同法》第14条 |
| 试用期上限分档 | 《劳动合同法》第19条 |
| 竞业限制（人员/补偿/期限≤2年） | 《劳动合同法》第23-24条 |
| 劳动仲裁时效1年 | 《劳动争议调解仲裁法》第27条 |
| 部分案件一裁终局 | 《劳动争议调解仲裁法》第47条 |

---

### Task 2: 建立劳动法版实践配置文件契约

**提交**：`a7e0c46`

**创建**：
- `employment-legal/skills/_shared/practice-profile-schema.md`（263行）：包含真相来源与架构决策（不引入新格式/纠正访谈「生成 YAML」表述）、字段映射表（8组：身份/雇佣审查立场/竞业配置/解雇立场/风险校准/升级矩阵/文书风格/地方性规定）、技能读取契约（临时模式默认值表）、用人单位方/劳动者方立场选择逻辑、重跑/编辑/版本控制、法律事实合理性检查（4条规则含竞业期限不超2年/试用期上限等）、schema 与 CLAUDE.md 章节对照表。

---

### Task 3: 拆分 hiring-review 为五个子技能

**提交**：`2f708f7`

**创建5个子技能（均含 YAML frontmatter + 200+非空行实质内容）**：

| 子技能 | 核心内容 | 非空行数 |
|-------|---------|---------|
| document-mandatory-terms | 六问定位表 + 第17条九项必备条款逐项检查 + 第14条无固定期限触发识别 + 非劳动合同文件劳动关系定性 | 236 |
| probation-working-hours | 第19条试用期分档表（已核实）+ 试用期工资检查（第20条）+ 工时三制审查 + 加班费三档（150%/200%/300%，已核实规则）| 202 |
| social-insurance-wages | 五险法定义务 + 放弃社保无效（🔴）+ 社保补贴代替缴纳（🟠）+ 劳动报酬合规 + 第82条二倍工资专项分析（已核实锚点）| 212 |
| service-period-penalty | 第25条违约金仅两情形（已核实规则）+ 第22条服务期条件与上限（计算示例）+ 提前离职/未提前通知违约金无效（🔴）| 200 |
| hiring-review-assembly | 地方性规定表（北上广深等）+ 各子技能发现汇总与分级 + 审查备忘录结构 + 竞业限制深度审查提示 + 交付前质量检查 | 205 |

**现有 hiring-review/SKILL.md 213行深度内容迁移状况**：

| 原有内容 | 迁移至 |
|---------|-------|
| 第一步：定位（六问表） | document-mandatory-terms 步骤1 |
| 第二步：必备条款九项 | document-mandatory-terms 步骤3 |
| 3.1 试用期分档表 | probation-working-hours 步骤1 |
| 3.2 工时制度与加班费 | probation-working-hours 步骤2 |
| 3.3 社保公积金 | social-insurance-wages 步骤1-2 |
| 3.4 竞业限制（初步） | service-period-penalty 步骤4（分工说明） |
| 3.5 违约金两情形 | service-period-penalty 步骤1-3 |
| 3.6 劳动合同解除 | hiring-review-assembly（提示触发 termination-review，04-02） |
| 第四步：地方性规定 | hiring-review-assembly 步骤2 |
| 第五步：组装备忘录 | hiring-review-assembly 步骤5 |
| 交付前质量检查 | hiring-review-assembly 步骤6 |

---

### Task 4: 改造 hiring-review/SKILL.md 为编排入口

**提交**：`3da80d9`

**修改**：`employment-legal/skills/hiring-review/SKILL.md`（146行）改造为编排入口：
- 迁移说明（顶部）指向5个子技能路径
- 前置护栏：配置文件加载 + 临时模式 + 用人单位方/劳动者方立场确认 + 工作地点 + 目的地特权检查
- 子技能编排顺序表（5个子技能路径 + 单独触发命令 + 职责说明）
- 入口级护栏：竞业限制条款识别 + 劳动关系定性优先 + 地方性规定适用优先级
- 共享资源列表（_shared 三文件）

---

## 提交记录

| Hash | 类型 | 说明 |
|------|------|------|
| `83812cd` | feat | 建立劳动法律引用脊柱（来源分类规范 + 引用库） |
| `a7e0c46` | feat | 建立劳动法版实践配置文件契约 |
| `2f708f7` | feat | 拆分 hiring-review 为五个可独立触发的子技能 |
| `3da80d9` | feat | 改造 hiring-review/SKILL.md 为编排入口 |

---

## Deviations from Plan

None — 计划按原定执行，无偏差。所有条文纪律已遵守：已核实锚点8条明确标注，其余不确定条号（第39/40/41/46/25/22/36条）标 `[待验证]`，无臆造条号。

---

## Known Stubs

无妨碍计划目标实现的存根。以下为预期的「占位待填入」结构：
- 各子技能中的案例类（4类/子技能）为占位结构，须经检索核验后填入——这是设计意图，非缺陷
- 各子技能中的学说类（1-2类/子技能）为占位结构——同上

---

## Self-Check: PASSED

验证结果：
- 9个文件全部存在 ✅
- 4个任务提交均存在（83812cd / a7e0c46 / 2f708f7 / 3da80d9）✅
- 已核实锚点全部在 labor-law-citations.md 中明确标注 ✅
- JSON 合法性验证通过（employment-legal/**/*.json）✅
- 无尾部空格、以换行符结尾、markdown 表格列数一致 ✅
