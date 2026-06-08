---
phase: 09-criminal-compliance
plan: "01"
subsystem: criminal-compliance
tags:
  - citation-spine
  - practice-profile
  - risk-assessment
  - sub-skills
  - claude-template
dependency_graph:
  requires: []
  provides:
    - criminal-compliance/skills/_shared/legal-basis-conventions.md
    - criminal-compliance/skills/_shared/criminal-law-citations.md
    - criminal-compliance/skills/_shared/practice-profile-schema.md
    - criminal-compliance/CLAUDE.md
    - criminal-compliance/skills/risk-assessment/industry-crime-identification/SKILL.md
    - criminal-compliance/skills/risk-assessment/position-conduct-risk/SKILL.md
    - criminal-compliance/skills/risk-assessment/risk-level-likelihood/SKILL.md
    - criminal-compliance/skills/risk-assessment/risk-list-control-output/SKILL.md
    - criminal-compliance/skills/risk-assessment/SKILL.md (orchestrator)
  affects:
    - criminal-compliance (09-02, 09-03 可直接引用 _shared 脊柱与 CLAUDE.md)
tech_stack:
  added: []
  patterns:
    - 刑事合规引用脊柱（法条/司法解释/规范性文件/案例/学说 分类 + 待验证纪律）
    - 刑事合规版实践配置文件契约（CLAUDE.md 单一真相来源）
    - 涉刑强制升级契约（凌驾于服务立场之上）
    - 合规边界契约（不可覆盖护栏）
    - 可独立触发的深层子技能拆分（risk-assessment 四子技能）
key_files:
  created:
    - criminal-compliance/skills/_shared/legal-basis-conventions.md
    - criminal-compliance/skills/_shared/criminal-law-citations.md
    - criminal-compliance/skills/_shared/practice-profile-schema.md
    - criminal-compliance/CLAUDE.md
    - criminal-compliance/skills/risk-assessment/industry-crime-identification/SKILL.md
    - criminal-compliance/skills/risk-assessment/position-conduct-risk/SKILL.md
    - criminal-compliance/skills/risk-assessment/risk-level-likelihood/SKILL.md
    - criminal-compliance/skills/risk-assessment/risk-list-control-output/SKILL.md
  modified:
    - criminal-compliance/skills/risk-assessment/SKILL.md (改造为编排入口)
decisions:
  - CLAUDE.md 散文模板作为刑事合规配置唯一真相来源，不引入独立 YAML/JSON 文件
  - 具体罪名条号一律 [条号待验证]，以构成要件描述呈现，不臆造具体罪名条号与法定刑档
  - 涉案企业合规规范性文件一律描述规则 + [待验证 — 快速演进]，不硬写文号
  - 涉刑强制升级护栏凌驾于服务立场之上，不可被任何立场配置覆盖
  - risk-assessment 拆分为四个可独立触发子技能（industry-crime-identification / position-conduct-risk / risk-level-likelihood / risk-list-control-output）
  - 服务立场（事前合规预防/涉案应对）是刑事合规工作核心变量，缺失时默认事前合规预防
metrics:
  duration: 约 2.5 小时（含先前已创建 legal-basis-conventions.md 的工作）
  completed_date: "2026-06-08"
  tasks_completed: 4
  files_created: 8
  files_modified: 1
---

# Phase 09 Plan 01: 刑事合规引用脊柱 + CLAUDE.md 模板 + risk-assessment 拆分 Summary

**一句话概述**：为 criminal-compliance 插件建立全插件复用的刑事合规法律引用脊柱（具体罪名条号一律待验证纪律）、首次新建 CLAUDE.md 实践配置模板（含涉刑强制升级护栏），并将 risk-assessment 从 16 行浅骨架拆分为四个深层可独立触发子技能（每个 176–228 非空行）。

---

## 已完成任务

| 任务 | 名称 | 提交 | 关键产出 |
|-----|------|------|---------|
| 1 | 建立刑事合规法律引用脊柱 | 3817209 | legal-basis-conventions.md (350行) + criminal-law-citations.md (500行) |
| 2 | 建立配置契约 + 新建 CLAUDE.md | b984400 | criminal-compliance/CLAUDE.md (329行) + practice-profile-schema.md (251行) |
| 3 | 拆分 risk-assessment 为四个子技能 | 5074e63 | 四个子技能 SKILL.md，每个 176-228 非空行 |
| 4 | 改造 risk-assessment/SKILL.md 为编排入口 | 41dbaf5 | 编排入口含四子技能调度表与入口级护栏 |

---

## 产出详情

### Task 1：刑事合规法律引用脊柱

**legal-basis-conventions.md**（350行）：
- 来源分类：法律/司法解释/规范性文件/案例/学说 五类，刑事合规语境特化
- 来源标签表：复用五个标准标签，不新造冲突标签
- 待验证标记规则：触发情形表（含具体罪名条号/数额标准/规范性文件文号）
- **具体罪名条号一律待验证纪律章节**：中度把握锚点（30/31/67/68/72/177/15）与具体罪名处理规则
- **涉案企业合规规范性文件快速演进标注纪律章节**
- 成文法优先与案例定位
- 法院/检察机关/公安/监管机构/第三方监督评估机制层级与定位（四级法院、四级检察机关）
- **合规预防与辩护定位章节**：用途声明、绝对禁止列表、涉刑强制升级规则

**criminal-law-citations.md**（500行）：
- A节：刑法总则中度把握锚点（第30/31/67/68/72条，建议复核，含完整规则摘要）
- B节：刑诉法中度把握锚点（第177/15条，建议复核）
- C节：具体罪名七类构成要件占位（税收/金融/职务/商业贿赂/扰乱市场/环境安全/走私，各含完整构成要件描述，条号一律 [条号待验证]）
- D节：涉案企业合规规范性文件规则描述（试点、第三方监督评估机制、听证、认罪认罚，描述规则，标待验证）
- E节：司法解释描述规则（按罪名类型汇总表格，数额描述规则标待验证）
- F节：案例占位结构（四类）
- G节：学说占位（四类学说争议）
- 中度把握锚点汇总表、引用库使用说明、更新规则

### Task 2：配置契约 + CLAUDE.md 模板

**criminal-compliance/CLAUDE.md**（329行，首次新建）：
- 顶部说明：用途声明（合规预防与辩护）、拒绝规避侦查、涉刑强制升级、时效性提示
- `## 我们是谁`：执业角色（律师/合规官/法务/当事人）、主要服务事项、企业画像（行业/规模/业务/涉外/历史涉案/重点刑事风险领域）
- `## 谁在使用`：角色、律师联系人、非律师角色提示、刑事合规特别提示
- `## 可用集成`：检察院/公安/行业监管（税务/市场监管/证监/药监/环保/应急/网信）/第三方监督评估管委会与评估组织
- `## 合规与服务立场`：整体服务立场（五类）/### 合规严格度/### 是否已涉案（刑事合规最关键字段，含强制升级触发说明）
- `## 刑事风险校准`：🔴🟠🟡🟢四级定义与典型触发情形
- `## 升级矩阵`：角色权限表（六类角色）、**强制升级触发条件**（已立案/强制措施/传唤/具体罪名风险/重大涉案/人身自由风险）、非律师角色重大步骤升级表
- `## 文书风格`、`## 输出`（律师/非律师双版标题）
- `## 共享护栏`：六大护栏（合规预防与辩护立场/不提供规避侦查方法/涉刑强制升级/律师审查/时效性触发/目的地特权检查）+ 地方涉案企业合规试点提示

**practice-profile-schema.md**（251行）：
- 配置文件是什么/真相来源（唯一真相来源 CLAUDE.md）、架构决策（不引入独立 YAML/JSON）
- **纠正现有访谈 YAML 表述**：cold-start-interview 末尾「生成 YAML 格式」应理解为填充 CLAUDE.md
- 字段映射表（10组字段 → CLAUDE.md 章节 → 读取技能三列）
- 技能读取契约（标准流程、配置缺失提示、临时模式默认值表）
- 服务立场选择（立场×审查侧重×风险标记×主要输出四列表，护栏不可覆盖说明）
- **涉案情形与强制升级契约**（六类触发情形表，凌驾于服务立场之上）
- **合规边界契约**（五类禁止需求表，标 [合规边界 — 拒绝]，不可被任何立场覆盖）
- 重跑/编辑/版本控制指引
- 法律事实合理性检查（具体罪名条号/数额/文号标待验证处理规则）
- schema 与 CLAUDE.md 章节对照表（11行）

### Task 3：risk-assessment 四个子技能

**industry-crime-identification**（176非空行）：
- 七类行业（制造/贸易/金融/医药/房地产建设/环保敏感/安全生产高危/互联网）高发罪名对照表
- 各罪名构成要件速查框架（保护法益/客观行为/主体/主观/数额规则/行业触发特征/单位犯罪说明）
- 服务立场区分（事前预防=全面扫描；涉案应对=已涉嫌罪名构成要件比对）
- 边界条件（单位与自然人区分/一行多罪/新型业务模式/跨境/已涉案）
- 法律依据：刑法30/31条（建议复核）+ 七类罪名（条号待验证）+ 司法解释描述规则 + 规范性文件 + 案例/学说占位

**position-conduct-risk**（189非空行）：
- 五岗位（采购/销售/财务/高管/法务合规）行为风险点对照表（行为风险点/对应罪名/构成要件关键要素）
- 各岗位红线行为（保守型合规严格度标红）
- 法务/合规岗位共同犯罪边界（明知风险的共犯可能性）
- 单位犯罪责任人员范围分析（直接负责的主管人员 vs 其他直接责任人员，刑法第31条）
- 职务类罪名区分对照表（职务侵占 vs 挪用资金 vs 贪污/挪用公款 — 主体/目的/行为维度）
- 服务立场区分（事前预防侧重红线与制度防范；涉案应对侧重责任切割）

**risk-level-likelihood**（186非空行）：
- 可能性评估（四等级：极高/高/中/低 × 五因素：行为触发程度/内控有效性/监管强度/历史涉案/人员合规意识）
- 影响程度评估（四等级 × 五维度：法定刑档描述规则[待验证]/罚金/人身自由/声誉资质/连锁影响）
- **可能性×影响矩阵**（4×4网格，输出🔴🟠🟡🟢）
- 风险等级定义与处置原则表（含关键风险强制升级规则）
- **是否已现实化分层**（四层：纯风险/苗头/已有线索/已立案，逐层处置策略）
- 从 CLAUDE.md 刑事风险校准章节读取等级定义
- 法律依据：刑法30/31/67/68/72条（建议复核）+ 刑诉法177/15条（建议复核）+ 具体罪名法定刑描述规则

**risk-list-control-output**（228非空行）：
- 汇集三个子技能成果，构建完整刑事风险清单（13列：编号/风险点/罪名构成要件/岗位/业务环节/可能性/影响/等级/已现实化/控制建议/责任部门/整改时限/验收标准）
- 控制建议四级（关键/高/中低/维持），含具体措施类型（制度/审批/禁止清单/留痕/培训）
- 责任部门与整改时限分配表
- **报告目的地与特权/脱敏处理**（内部合规/向检察机关提交/向第三方监督评估提交三版本）
- 完整刑事风险评估报告输出模板（执行摘要/风险清单表/重点详述/待升级清单/控制建议汇总/涉案企业合规衔接）
- 服务立场区分（事前预防=完整风险地图；涉案应对=聚焦已涉嫌问题与整改，衔接 non-prosecution）

### Task 4：risk-assessment 编排入口

改造后的 SKILL.md（126行新增，原10行）：
- 迁移说明指向四个子技能路径
- 前置配置加载（从 CLAUDE.md 读取六类关键字段）
- 临时模式段落（含涉案即强制升级的默认规则）
- **子技能编排顺序表**（四行：子技能名/路径/可单独触发斜杠命令/主要内容）
- 入口级护栏（八项：企业画像/服务立场/合规严格度/涉案情形强制升级/合规预防辩护立场/不提供规避侦查方法/目的地特权检查/地方试点提示）
- 引用基础设施指向三个 _shared 文件

---

## Deviations from Plan

None — plan executed exactly as written. The `legal-basis-conventions.md` was already created in a prior interrupted session and included in Task 1's commit alongside `criminal-law-citations.md`.

---

## Known Stubs

以下文件包含有意为之的占位结构（F节案例、G节学说），这是刑事合规引用库的标准设计——案例须通过最高检/最高法官网核实案号后填入，学说须引用实际文献。这些占位不阻止本计划目标的实现（风险识别与合规预防），后续引用实际案例时填入。

| 占位 | 文件 | 说明 |
|-----|------|------|
| 案例占位（F节） | criminal-law-citations.md | 须通过最高检官网核实案号后填入真实案例 |
| 学说占位（G节） | criminal-law-citations.md | 须引用实际学者著作时填入 |

---

## Threat Flags

无新增安全相关表面（本计划仅创建提示词/技能/配置文件，无网络端点、数据库模式或文件访问路径变更）。

---

## Self-Check: PASSED

所有关键文件存在性与提交哈希验证通过：

```
criminal-compliance/skills/_shared/legal-basis-conventions.md — OK (350行)
criminal-compliance/skills/_shared/criminal-law-citations.md  — OK (500行)
criminal-compliance/skills/_shared/practice-profile-schema.md — OK (251行)
criminal-compliance/CLAUDE.md                                  — OK (329行)
criminal-compliance/skills/risk-assessment/industry-crime-identification/SKILL.md — OK (176非空行)
criminal-compliance/skills/risk-assessment/position-conduct-risk/SKILL.md         — OK (189非空行)
criminal-compliance/skills/risk-assessment/risk-level-likelihood/SKILL.md         — OK (186非空行)
criminal-compliance/skills/risk-assessment/risk-list-control-output/SKILL.md      — OK (228非空行)
criminal-compliance/skills/risk-assessment/SKILL.md (编排入口)                    — OK
```

提交记录：
- 3817209 feat(09-01): 建立刑事合规法律引用脊柱
- b984400 feat(09-01): 新建 CLAUDE.md + 配置契约
- 5074e63 feat(09-01): 拆分四个子技能
- 41dbaf5 feat(09-01): 改造编排入口

JSON 合法性回归验证：PASS（criminal-compliance/**/*.json 全部合法）
