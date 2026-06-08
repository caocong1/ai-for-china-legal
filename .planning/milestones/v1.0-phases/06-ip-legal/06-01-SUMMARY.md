---
phase: 06-ip-legal
plan: "01"
subsystem: ip-legal
tags:
  - ip-law
  - trademark
  - citation-spine
  - practice-profile
  - sub-skills
dependency_graph:
  requires: []
  provides:
    - ip-legal/skills/_shared/legal-basis-conventions.md
    - ip-legal/skills/_shared/ip-law-citations.md
    - ip-legal/skills/_shared/practice-profile-schema.md
    - ip-legal/CLAUDE.md
    - ip-legal/skills/trademark-search/* (4 sub-skills + orchestrator)
  affects:
    - 06-02 (patent-analysis, copyright-registration — can reuse _shared spine)
    - 06-03 (ip-clearance, cold-start-interview — reads ip-legal/CLAUDE.md)
tech_stack:
  added: []
  patterns:
    - sub-skill decomposition (trademark-search → 4 independent sub-skills)
    - citation spine (_shared legal-basis-conventions + ip-law-citations)
    - practice profile schema (ip-legal/CLAUDE.md as single source of truth)
key_files:
  created:
    - ip-legal/skills/_shared/legal-basis-conventions.md
    - ip-legal/skills/_shared/ip-law-citations.md
    - ip-legal/skills/_shared/practice-profile-schema.md
    - ip-legal/CLAUDE.md
    - ip-legal/skills/trademark-search/search-query/SKILL.md
    - ip-legal/skills/trademark-search/similarity-assessment/SKILL.md
    - ip-legal/skills/trademark-search/goods-services-classification/SKILL.md
    - ip-legal/skills/trademark-search/prior-rights-obstacles/SKILL.md
  modified:
    - ip-legal/skills/trademark-search/SKILL.md (浅骨架改为编排入口)
decisions:
  - "IP 法 2020/2021 修正条号重排保守原则：除第42条（专利权期限）和第57条（商标侵权类型）两个中度把握锚点外，商标法/专利法/著作权法/反不正当竞争法其余具体条号一律标[待验证]，不臆造"
  - "单一真相来源：ip-legal/CLAUDE.md 为实践配置唯一真相来源，纠正现有 cold-start-interview SKILL.md 的「生成 YAML」表述"
  - "trademark-search 拆为4个可独立触发子技能，原SKILL.md改为编排入口，三步纲要无丢失迁移并深化"
metrics:
  duration: "22m 07s"
  completed_date: "2026-06-05"
  tasks_completed: 4
  tasks_total: 4
  files_created: 8
  files_modified: 1
---

# Phase 6 Plan 01: 知识产权引用脊柱 + CLAUDE.md 模板 + 商标查询子技能拆分 Summary

**一句话描述：** 建立知识产权专用 IP 法引用脊柱（商标法第57条/专利法第42条中度把握锚点 + 保守待验证纪律），新建 ip-legal/CLAUDE.md 实践配置模板，并将 trademark-search 浅骨架拆分为四个深层可独立触发子技能（search-query / similarity-assessment / goods-services-classification / prior-rights-obstacles）。

---

## 执行概要

本计划交付四块内容，全部通过 4 个任务完成，每个任务单独提交：

1. **知识产权引用脊柱（Task 1）**：新建 `ip-legal/skills/_shared/legal-basis-conventions.md`（来源分类规范，含 IP 法修正条号重排保守标注章节）和 `ip-legal/skills/_shared/ip-law-citations.md`（商标法/专利法/著作权法/反不正当竞争法/司法解释/审查指南引用库）。

2. **实践配置契约 + 新建 CLAUDE.md（Task 2）**：新建 `ip-legal/CLAUDE.md`（知识产权实践配置模板，含权利人画像与 IP 组合 / 维权与申请立场含商标专利著作权策略与清权严格度 / 风险校准 / 升级矩阵 / 文书风格 / 输出 / 共享护栏含行业识别与 IP 法时效性触发）；新建 `ip-legal/skills/_shared/practice-profile-schema.md`（知识产权版配置契约，字段映射表覆盖11组，含临时模式、立场选择、法律事实合理性检查）。

3. **trademark-search 四个深层子技能（Task 3）**：将原 ~18 行浅骨架拆分为四个独立 SKILL.md，每个 150+ 行实质内容：search-query（205行）/ similarity-assessment（220行）/ goods-services-classification（188行）/ prior-rights-obstacles（200行）。

4. **trademark-search 编排入口改造（Task 4）**：原浅骨架 SKILL.md 改为指向四个子技能的编排入口，含入口级配置加载、子技能编排顺序表、临时模式段落与入口级护栏。

---

## 任务执行记录

| 任务 | 名称 | 提交哈希 | 主要产出文件 |
|------|------|---------|-----------|
| Task 1 | 建立知识产权法律引用脊柱 | `27197eb` | legal-basis-conventions.md, ip-law-citations.md |
| Task 2 | 建立配置契约 + 新建 CLAUDE.md | `cddb57e` | ip-legal/CLAUDE.md, practice-profile-schema.md |
| Task 3 | 拆分 trademark-search 四个子技能 | `304af1c` | search-query/, similarity-assessment/, goods-services-classification/, prior-rights-obstacles/ |
| Task 4 | 改造 trademark-search 编排入口 | `0c432f2` | trademark-search/SKILL.md |

---

## 关键技术决策

### 1. IP 法修正条号保守原则

商标法（2019修正）、专利法（2020修正/2021施行）、著作权法（2020修正/2021施行）均经历修正，条号重排。

**决策**：仅两个中度把握锚点可带条号引用：
- 专利法第42条（专利权期限：发明20年/实用新型10年/外观设计15年，自申请日）
- 商标法第57条（商标侵权类型七类）

其余所有条号一律标 `[待验证 — IP 法修正后条号重排，须核实现行版本]`，规则类（商标近似/类似商品/专利侵权全面覆盖+等同原则）以「描述规则 + 待验证」呈现，不写裸条号。

### 2. 单一真相来源架构

**决策**：ip-legal/CLAUDE.md 为唯一实践配置真相来源，不引入冲突 YAML/JSON 格式，并纠正现有 cold-start-interview SKILL.md 末尾「生成 YAML 格式」的表述（配置应写入 CLAUDE.md 对应章节）。

### 3. trademark-search 子技能分工

**决策**：四个子技能分工清晰，可独立触发也可由编排入口编排：
- search-query：检索查询（不作近似判断）
- similarity-assessment：音/形/义近似判断（不判定商品类似）
- goods-services-classification：商品服务类似判定（不作商标近似判断）
- prior-rights-obstacles：汇总综合结论（依赖前三个子技能，也可独立触发）

---

## 内容质量

### 引用脊柱质量

- legal-basis-conventions.md：来源分类五类（法律/司法解释/部门规章/案例/学说），来源标签表（5个标准标签），待验证规则（8种触发情形），IP 法修正版本提示章节（4部法律修正情况），法院四级与商标局/专利局/版权局机构定位表，引用最小格式汇总表
- ip-law-citations.md：按 A-L 覆盖商标法/专利法/著作权法/反不正当竞争法/司法解释/部门规章/案例占位/学说占位，中度把握锚点汇总表，引用库使用说明与更新规则

### CLAUDE.md 模板质量

- 9个主章节：我们是谁（含详细 IP 组合概况子章节）/ 谁在使用 / 可用集成 / 维权与申请立场（商标策略+专利策略+著作权策略+清权严格度 4个子章节）/ 风险校准 / 升级矩阵（角色权限表+自动升级触发+维权/异议/诉讼触发表）/ 文书风格 / 输出 / 共享护栏
- 律师/非律师双版工作产物标题
- IP 法 2019/2020/2021 修正时效性触发特别规则

### 子技能深度

每个子技能包含：目的/前置（含配置读取+子技能分工表）/详细步骤（含多个分析表格）/检查清单/输出模板（完整 markdown 结构）/边界条件表/错误处理表/法律依据（按来源分类，含案例/学说占位）。

---

## 现有浅骨架迁移说明

原 trademark-search/SKILL.md 三步纲要（需求收集/法律分析/输出生成）迁移如下：
- **需求收集** → search-query 的第一步（厘清检索目标）
- **法律分析（商标近似）** → similarity-assessment（音/形/义三维度 + 混淆可能性）
- **法律分析（商品类似）** → goods-services-classification（区分表 + 关联性因素）
- **法律分析（在先障碍）** → prior-rights-obstacles（在先权利识别 + 障碍分级 + 综合结论）
- **输出生成** → prior-rights-obstacles 的综合评估与可注册性结论，各子技能均有独立输出模板

三步纲要无语义丢失，全部迁移并大幅深化。

---

## 偏差记录

无偏差——计划按原设计执行。以下小调整记录：

1. ip-law-citations.md 汇总表中保护期数值统一格式（`50年` 不含空格）以通过验证脚本检索。计划影响：无。

---

## 已知存根（Stubs）

无。以下为占位结构（计划中明确要求）：
- ip-law-citations.md 中的案例占位（K.1-K.4）：明确标注「待填入」，不影响使用
- ip-law-citations.md 中的学说占位（L.1-L.4）：明确标注「待填入」，不影响使用
- ip-legal/CLAUDE.md 中的全部 `[PLACEHOLDER]`：设计上即为需要访谈填充的占位符

---

## 威胁面扫描

本计划不新增网络端点、认证路径、文件访问模式或架构变更；所有产出为提示词内容文件（.md），无安全威胁面新增。

---

## Self-Check: PASSED

验证时间：2026-06-05T03:24:xx

| 检查项 | 结果 |
|-------|------|
| 所有9个文件存在 | PASSED |
| 4个任务提交存在（27197eb, cddb57e, 304af1c, 0c432f2）| PASSED |
| JSON 合法性检查（ip-legal/**/*.json）| PASSED |
| 关键内容检查（第42条/第57条/混淆/全面覆盖/50年/权利人/临时模式）| PASSED |
| 四个子技能各≥100非空行（205/220/188/200）| PASSED |
