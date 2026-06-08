---
phase: 09-criminal-compliance
plan: "03"
subsystem: criminal-compliance
tags:
  - compliance-system-building
  - cold-start-interview
  - plugin-registration
  - 刑事合规
  - 合规体系建设
dependency_graph:
  requires:
    - 09-01
    - 09-02
  provides:
    - compliance-system-building 主技能（四子技能 + 编排入口）
    - cold-start-interview 四访谈子技能 + 改造编排入口
    - plugin.json 全 25 技能注册（version 0.2.0）
  affects:
    - criminal-compliance 插件（达到 commercial-legal/family-legal 同等深度）
tech_stack:
  added:
    - compliance-system-building（新主技能，四子技能 + 编排入口）
    - cold-start-interview 子技能体系（四访谈子技能）
  patterns:
    - 事前合规体系建设（compliance-system-building）vs 涉案后专项整改（compliance-plan）分工
    - 四维度合规风险识别（业务/岗位/区域/关联方）
    - 三道防线合规组织架构
    - 有效合规四维评估框架
    - 访谈结果写入散文章节（非独立 YAML）
key_files:
  created:
    - criminal-compliance/skills/compliance-system-building/SKILL.md
    - criminal-compliance/skills/compliance-system-building/compliance-risk-identification/SKILL.md
    - criminal-compliance/skills/compliance-system-building/policy-process-design/SKILL.md
    - criminal-compliance/skills/compliance-system-building/organization-training/SKILL.md
    - criminal-compliance/skills/compliance-system-building/effectiveness-evaluation/SKILL.md
    - criminal-compliance/skills/cold-start-interview/identity-enterprise-profile/SKILL.md
    - criminal-compliance/skills/cold-start-interview/compliance-stance-scope/SKILL.md
    - criminal-compliance/skills/cold-start-interview/risk-escalation/SKILL.md
    - criminal-compliance/skills/cold-start-interview/style-regulatory-resources/SKILL.md
  modified:
    - criminal-compliance/skills/cold-start-interview/SKILL.md（改造为编排入口，纠正旧 YAML 表述）
    - criminal-compliance/.claude-plugin/plugin.json（全面重写，25 技能，0.2.0）
decisions:
  - "compliance-system-building（事前合规体系建设）与 non-prosecution/compliance-plan（涉案后专项整改）明确分工，互补不重复"
  - "访谈结果写入 criminal-compliance/CLAUDE.md 散文章节而非独立 YAML 文件（与 family-legal/commercial-legal 架构一致）"
  - "有效合规认定标准属规范性文件，快速演进，一律描述规则+待验证，不硬写文号"
  - "plugin.json 采用扁平注册模式（25条 name+path+description），与 construction-legal/family-legal 对齐"
metrics:
  duration: "约 2 小时"
  completed: "2026-06-08"
  tasks_completed: 3
  tasks_total: 3
  files_created: 9
  files_modified: 2
---

# Phase 09 Plan 03: 合规体系建设+访谈拆分+插件注册 Summary

## 一句话摘要

新建刑事合规体系建设主技能（四子技能 215+ 行各）、拆分冷启动访谈（四子技能 180+ 行各）并注册全部 25 个技能到 plugin.json 0.2.0，使 criminal-compliance 插件达到五大模块二十子技能加五编排入口的完整深度。

---

## 已完成任务

### Task 1: 新增 compliance-system-building 刑事合规体系建设主技能
**提交：** `c5b8388`

**交付物：**

**子技能一：compliance-risk-identification（合规风险识别，215 非空行）**
- 从业务、岗位、区域、关联方四个维度全面梳理企业刑事合规风险
- 构建合规风险地图（重点领域 × 风险点 × 风险敞口 × 优先级），识别七类高发罪名领域
- 明确与 risk-assessment 的分工（本技能=体系化风险底图；risk-assessment=单次事件评估）
- 含五步详细流程、企业全貌梳理表、业务维度风险识别表（10个业务环节）、岗位维度风险识别表（8类岗位）、区域维度与关联方维度识别

**子技能二：policy-process-design（合规制度与流程设计，245 非空行）**
- 四层制度体系（总纲→行为准则→专项制度→操作规程）
- 五个重点领域专项制度详细要素表（反商业贿赂/反垄断/数据合规/安全生产/财税合规）
- 合规审批体系（分级审批 7 类触发条件）+ 禁止性行为清单（7 类刑事红线，含罪名构成要件描述）
- 合规控制点嵌入业务流程（8 个业务环节控制点）
- 明确与 non-prosecution/compliance-plan 的分工（事前体系建设 vs 涉案后专项整改）

**子技能三：organization-training（合规组织与培训，246 非空行）**
- 三档企业规模对应组织设计方案（大型/中型/小型企业）
- 三道防线职责分工表（第一道业务部门/第二道合规风控法律/第三道内审外审）
- 合规组织架构表（合规委员会→CCO→合规部门→业务合规员）含独立性要求
- 四层次分层培训计划（高管/合规专项/业务岗/全员）+ 8 类业务岗培训内容分类
- 合规考核指标与违规问责梯度（四级）+ 合规文化建设要素

**子技能四：effectiveness-evaluation（合规有效性评估与整改，215 非空行）**
- 四维度评估框架（制度健全性/执行有效性/监测发现能力/响应整改能力），各维度 5 个评估指标
- 五类年度合规审计计划（全面审计/专项审计/日常监控/业务自查/外部评估）
- 问题整改闭环八步管理流程（发现→定性→根因→方案→执行→验证→复盘→闭环）
- 有效合规衔接合规不起诉说明（**有效合规认定标准属规范性文件，快速演进，描述规则+待验证，不硬写文号**）

**编排入口：compliance-system-building/SKILL.md**
- 子技能顺序表（四步，含路径、斜杠命令、可单独触发说明）
- 临时模式（含 `[临时模式]` 标注）
- 七条入口级护栏（企业画像确认/涉案强制升级/合规预防与辩护立场/不提供规避侦查方法/与 risk-assessment 衔接/与 non-prosecution 衔接/目的地特权检查）

**法律引用合规性：**
- 单位犯罪第30/31条标「建议复核」
- 具体罪名一律构成要件描述+`[条号待验证]`
- 有效合规认定标准与涉案企业合规规范性文件描述规则+`[待验证 — 规范性文件快速演进]`，无硬写文号

---

### Task 2: 拆分 cold-start-interview 为四个访谈子技能 + 改造编排入口
**提交：** `d9c74dd`

**交付物：**

**子技能一：identity-enterprise-profile（身份与企业画像，234 非空行）**
- A组（执业角色）：7 选项执业角色 + 主要服务事项
- B组（企业画像）：企业名称/行业（10选项）/规模/业务模式/是否涉外/历史涉案/重点风险领域（10选项）/痛点/团队规模
- C组（可用集成）：检察院/公安/行业监管部门（8类）/第三方监督评估/司法鉴定审计
- 完整写入映射（17个字段 → CLAUDE.md 章节）

**子技能二：compliance-stance-scope（合规立场与服务范围，181 非空行）**
- D组（整体服务立场）：6 选项服务立场 + 事前侧重确认
- **E组（是否已涉案）**：三级涉案状态，选「已立案或强制措施」立即强制升级护栏
- F组（合规严格度）：三级严格度 + 各领域特别要求
- G组：涉案/辩护立场补充说明

**子技能三：risk-escalation（风险与升级，184 非空行）**
- H组（风险等级定义）：四级风险等级定义（🔴🟠🟡🟢）+ 默认触发情形确认
- I组（角色权限表）：六类角色权限边界确认
- **J组（强制升级触发条件）**：六条强制升级触发条件逐一向用户明确确认
- **K组（涉案应对合规边界）**：六条绝对拒绝情形向用户明确确认 + 非律师重大步骤升级表

**子技能四：style-regulatory-resources（文书风格与监管资源，202 非空行）**
- L组（文书风格）：四类文书各含多选项风格偏好
- M组（工作产物标题）：律师 vs 非律师角色标题确认
- N组（地方涉案企业合规试点口径）：主要经营地区 + 当地口径说明（标 `[地方 flagged 待验证]`）
- O组（监管资源本地化）：行业监管本地联系补充

**改造后的 cold-start-interview/SKILL.md 编排入口：**
- 子技能顺序表（含路径/斜杠命令/可单独触发/填充章节）
- 写入 CLAUDE.md 散文章节明确说明（**非独立 YAML 文件，旧 YAML 表述已纠正**）
- 支持：完整重跑/单独更新某部分/直接编辑/git 版本控制说明
- 写入前确认、法律事实合理性检查、合规预防与辩护立场护栏

---

### Task 3: plugin.json 注册全部技能并升级到 0.2.0
**提交：** `bcd90c1`

**交付物：**

| 项目 | 结果 |
|-----|------|
| version | `0.1.0` → `0.2.0` |
| 技能总数 | 4（旧）→ 25（5 编排入口 + 20 子技能） |
| JSON 格式 | 2 空格缩进合法，以换行符结尾 |
| 全部路径验证 | 25 个 path 均与实际文件一致（python3 校验通过）|
| description | 概述五大模块二十子技能加五编排入口，体现合规预防立场与涉刑强制升级 |

**五编排入口注册：**
1. `cold-start-interview` — 访谈初始化 CLAUDE.md
2. `risk-assessment` — 单次刑事风险评估
3. `non-prosecution` — 合规不起诉（须律师主导）
4. `corporate-crime` — 单位犯罪预防（双罚制风险）
5. `compliance-system-building` — 事前合规体系建设

**二十子技能注册（各含 description 体现覆盖点与护栏要点）：**
访谈4 + 风险评估4 + 合规不起诉4 + 单位犯罪预防4 + 合规体系建设4

---

## 偏差说明

无计划外偏差。所有任务按计划执行。

---

## 法律引用合规性确认

| 引用类别 | 处理方式 | 验证 |
|---------|---------|------|
| 刑法总则中度把握锚点（第30/31/67/68/72条）| 标「建议复核」 | 通过 |
| 各具体罪名条号（刑法分则）| 构成要件描述+`[条号待验证]` | 通过 |
| 涉案企业合规规范性文件（文号/细节）| 描述规则+`[待验证 — 快速演进]` | 通过 |
| 有效合规认定标准 | 描述规则+`[待验证]`，不硬写文号 | 通过 |
| 司法解释条号与数额标准 | 描述规则+`[待验证]`，不写裸数额 | 通过 |
| 案例案号 | 全部`[待验证]`，标不具判例法约束力 | 通过 |

---

## 刑事合规护栏贯穿确认

| 护栏 | 贯穿情况 |
|-----|---------|
| 合规预防与辩护立场（不替企业作有罪无罪结论）| 所有子技能 ✓ |
| 不提供规避侦查或逃避责任方法（拒绝标 [合规边界 — 拒绝]）| 所有子技能 ✓ |
| 涉刑强制升级刑事辩护律师（标 [强制升级 — 涉刑情形]）| 所有子技能 ✓ |
| 律师审查护栏（非律师重大步骤前须升级）| 所有子技能 ✓ |

---

## 已知 Stubs

无。所有子技能均含完整详细步骤、问卷/检查清单、输出模板、边界条件、错误处理、法律依据章节，无 placeholder 或 TODO 阻碍技能目标实现。

---

## Threat Flags

无新增安全相关威胁面。本计划交付物均为提示词内容（SKILL.md）与插件元数据（plugin.json），不涉及代码、网络端点、数据存储或身份验证路径。

---

## Self-Check: PASSED

**文件存在性：**
- criminal-compliance/skills/compliance-system-building/SKILL.md ✓
- criminal-compliance/skills/compliance-system-building/compliance-risk-identification/SKILL.md ✓
- criminal-compliance/skills/compliance-system-building/policy-process-design/SKILL.md ✓
- criminal-compliance/skills/compliance-system-building/organization-training/SKILL.md ✓
- criminal-compliance/skills/compliance-system-building/effectiveness-evaluation/SKILL.md ✓
- criminal-compliance/skills/cold-start-interview/identity-enterprise-profile/SKILL.md ✓
- criminal-compliance/skills/cold-start-interview/compliance-stance-scope/SKILL.md ✓
- criminal-compliance/skills/cold-start-interview/risk-escalation/SKILL.md ✓
- criminal-compliance/skills/cold-start-interview/style-regulatory-resources/SKILL.md ✓
- criminal-compliance/skills/cold-start-interview/SKILL.md（已改造）✓
- criminal-compliance/.claude-plugin/plugin.json（version 0.2.0，25 技能）✓

**提交记录：**
- c5b8388: feat(09-03): 新增 compliance-system-building 主技能 ✓
- d9c74dd: feat(09-03): 拆分 cold-start-interview ✓
- bcd90c1: feat(09-03): 注册全部 25 个技能升级到 0.2.0 ✓

**JSON 合法性：** python3 json validation PASSED ✓
**Plugin 25 skills 验证：** 25 条目，全部 path 与实际文件一致 PASSED ✓
