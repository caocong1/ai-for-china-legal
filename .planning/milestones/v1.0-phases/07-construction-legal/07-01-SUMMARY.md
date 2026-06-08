---
phase: 07-construction-legal
plan: 01
subsystem: construction-legal
tags: [citation-spine, claude-template, contract-review, sub-skills, construction-law]
dependency_graph:
  requires: []
  provides:
    - construction-legal/skills/_shared/legal-basis-conventions.md
    - construction-legal/skills/_shared/construction-law-citations.md
    - construction-legal/skills/_shared/practice-profile-schema.md
    - construction-legal/CLAUDE.md
    - construction-legal/skills/contract-review/subject-qualification-validity/SKILL.md
    - construction-legal/skills/contract-review/schedule-quality/SKILL.md
    - construction-legal/skills/contract-review/price-settlement/SKILL.md
    - construction-legal/skills/contract-review/breach-termination/SKILL.md
    - construction-legal/skills/contract-review/SKILL.md (orchestrator)
  affects:
    - 07-02 payment-dispute 和 bidding-compliance 深化（直接复用 _shared 脊柱与 CLAUDE.md）
    - 07-03 commercial-housing-review 和 cold-start-interview 深化（直接复用 _shared 脊柱与 CLAUDE.md）
tech_stack:
  added: []
  patterns:
    - 建设工程法律引用脊柱（来源分类规范 + 引用库 + 中度把握锚点保守标注）
    - 建设工程实践配置契约（CLAUDE.md 散文模板 + 字段映射 + 临时模式）
    - 深层子技能拆分模式（编排入口 + 四个可独立触发子技能）
    - 按代理立场区分审查侧重（发包人/承包人/中立/购房人侧）
key_files:
  created:
    - construction-legal/skills/_shared/legal-basis-conventions.md
    - construction-legal/skills/_shared/construction-law-citations.md
    - construction-legal/skills/_shared/practice-profile-schema.md
    - construction-legal/CLAUDE.md
    - construction-legal/skills/contract-review/subject-qualification-validity/SKILL.md
    - construction-legal/skills/contract-review/schedule-quality/SKILL.md
    - construction-legal/skills/contract-review/price-settlement/SKILL.md
    - construction-legal/skills/contract-review/breach-termination/SKILL.md
  modified:
    - construction-legal/skills/contract-review/SKILL.md (改造为编排入口)
decisions:
  - 复用 ip-legal 同名文件为骨架改编建设工程版引用规范，不从头新建
  - 沿用 CLAUDE.md 散文模板作为唯一真相来源，不引入独立 YAML/JSON 格式
  - 纠正现有 cold-start-interview 末尾「YAML 格式」表述为写入 CLAUDE.md
  - 四个子技能均可单独触发，不绑定完整流程
  - 通则锚点复用 Phase 2 已核实结论，不重新回溯
metrics:
  duration: "~20 minutes"
  completed_date: "2026-06-05"
  tasks: 4
  files: 9
---

# Phase 7 Plan 01: 建设工程引用脊柱 + CLAUDE.md 模板 + 施工合同审查拆分 Summary

**一句话摘要**：建立建设工程全插件复用的法律引用脊柱（来源分类规范 + 民法典第788-808条/建筑法/招标投标法/城市房地产管理法/施工合同司法解释(一)/商品房买卖司法解释 引用库）、新建 construction-legal/CLAUDE.md 实践配置模板（发包人/承包人/中立/购房人侧立场）、建设工程版配置契约，并将 contract-review 拆分为四个 150+ 行深层子技能（主体资质与合同效力/工期与质量/价款与结算/违约与解除）。

---

## Completed Tasks

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | 建立建设工程法律引用脊柱 | 10ecdb4 | legal-basis-conventions.md, construction-law-citations.md |
| 2 | 建立实践配置契约 + 新建 CLAUDE.md | cbc36c6 | CLAUDE.md, practice-profile-schema.md |
| 3 | 拆分 contract-review 为四个子技能 | a046d60 | subject-qualification-validity/, schedule-quality/, price-settlement/, breach-termination/ |
| 4 | 改造 contract-review/SKILL.md 为编排入口 | c38082f | contract-review/SKILL.md |

---

## What Was Built

### Task 1: 建设工程法律引用脊柱

**legal-basis-conventions.md**（来源分类规范）：
- 六类来源分类：法律/司法解释/行政法规/部门规章/案例/学说，各含格式要求与强制标注规则
- 来源标签表（五个标准标签，不新造冲突标签）
- 待验证标记规则（九种触发情形，含法院层级与机构定位表）
- 司法解释具体条号保守标注章节（施工合同司法解释经历(一)(二)整合与修订，条号易变；中度把握锚点汇总表）
- 成文法优先原则与案例辅助定位
- 法院层级（建设工程争议金额大通常由中院一审 + 仲裁亦常见）与住建部/地方住建/造价鉴定/招标监督机构定位
- 验证资源（住建部/全国建筑市场监管公共服务平台/中国招标投标公共服务平台/最高法/裁判文书网/北大法宝）

**construction-law-citations.md**（引用库）：
- 五类组织：法条 / 司法解释 / 行政法规与部门规章 / 案例 / 学说
- 中度把握锚点（标「已核实，建议复核」）：建设工程合同定义=第788条、竣工验收=第799条、优先受偿权=第807条、整章=第788-808条
- 通则锚点（复用 Phase 2 已核实结论）：违约金调整=第585条第2款、**竞合=第588条（注意不是第585条第2款，已核实纠正高风险错误）**、损害赔偿=第583条、可预见=第584条、法定解除=第563条、情势变更=第533条、保证=第681/686条
- 建筑法/招标投标法/城市房地产管理法规则（条号全部标 `[待验证]`，描述规则）
- 施工合同司法解释(一) 规则（黑白合同/无效折价补偿/优先受偿权范围期限/工期质量/垫资/实际施工人权利/解除，全部描述规则，条号 `[待验证]`）
- 商品房买卖司法解释规则（面积误差3%/逾期交房/定金/按揭解除/一房二卖，全部描述规则，条号 `[待验证]`）
- 四类占位案例（黑白合同/无效折价补偿/优先受偿权/商品房逾期）
- 三类占位学说（优先受偿权性质/垫资性质/黑白合同实质性内容认定）
- 中度把握锚点汇总表 + 引用库使用说明（更新规则强调司法解释条号易变，每次引用前须核实）

### Task 2: 实践配置契约 + 新建 CLAUDE.md

**construction-legal/CLAUDE.md**（新建，建设工程实践配置模板）：
- 顶部时效性提示（建设工程司法解释修订频繁）
- 「我们是谁」：主体画像 + 建设工程角色（发包人/承包人/监理/购房人代理）+ 项目类型组合
- 「谁在使用」：角色 + 非律师提示
- 「可用集成」：造价鉴定机构/质量检测/全国建筑市场监管平台/招投标平台/网签备案/裁判文书网
- 「审查与争议立场」：整体代理立场（核心变量）+ 合同审查严格度 + 争议处理倾向（含优先受偿权行使）+ 商品房审查立场
- 「风险校准」：四级（🔴🟠🟡🟢）含建设工程典型触发情形
- 「升级矩阵」：角色权限表 + 自动升级触发（合同无效/工程款重大/优先受偿权期限临近/解除通知/群体退房）+ 诉讼/仲裁/优先受偿权触发表
- 「文书风格」与「输出」：律师/非律师双版标题 + 审查者注释块（含司法解释条号待验证提示）+ 下一步决策树
- 「共享护栏」：时效性触发（司法解释修订）+ 验证用户陈述法律事实 + 来源标签规范 + 目的地特权检查 + 项目类型识别表 + 地方性规定提示

**practice-profile-schema.md**（配置契约）：
- 唯一真相来源声明（construction-legal/CLAUDE.md，不引入冲突新格式）
- 纠正现有 cold-start-interview「生成 YAML 格式」表述
- 字段映射表（14 个字段组，涵盖主体画像/整体代理立场/合同审查严格度/争议处理倾向/商品房审查立场/风险校准/升级矩阵/文书风格/造价鉴定资源/项目类型识别/地方性规定提示）
- 技能读取契约（读取→检查占位符→选模式）+ 标准缺失提示 + 临时模式默认值表
- 代理立场选择规则（四立场的审查侧重差异表）+ 立场缺失禁止自行假设
- 重跑/编辑/版本控制（git log/diff/checkout）
- 法律事实合理性检查（六种触发情形 + 写入原则）
- Schema 与 CLAUDE.md 章节对照表

### Task 3: 四个深层子技能

**subject-qualification-validity/SKILL.md**（211 行）：
- 发包人主体合法性核查（施工许可/规划许可/必须招标）
- 承包人资质核查（资质类别/等级/有效期/专业分包/挂靠，全国建筑市场监管平台查询）
- 七类无效情形清单表（无资质/超资质/未招标/中标无效/转包/违法分包/挂靠/黑白合同）
- 黑白合同识别：五维度实质性内容比对表（价款/工期/质量/工程范围/支付节点）
- 无效合同折价补偿路径（竣工验收合格→可折价补偿；含法律依据描述规则）
- 按代理立场区分：发包人侧（无效抗辩）/承包人侧（折价补偿 + 第807条优先受偿权）
- 完整的检查清单、输出模板、边界条件（7种）、错误处理（5种）

**schedule-quality/SKILL.md**（199 行）：
- 工期节点与顺延审查：开工条件/工期合理性/六类顺延事由分析表（含立场区分）
- 竣工验收：民法典第799条（中度把握锚点，建议复核）+ 拟制竣工日/擅自使用规则（司法解释描述规则，条号待验证）
- 质量标准与保修期：法定保修期对照表（地基基础/屋面/水电等，条号待验证，合同约定不得低于法定）
- 按代理立场：发包人侧（工期违约追责/质量缺陷追责）/承包人侧（顺延签证权利/不合理工期抗辩/质保金返还）
- 完整的检查清单、输出模板、边界条件（6种）、错误处理（4种）

**price-settlement/SKILL.md**（208 行）：
- 四种计价方式对比与风险分析（固定总价包死价/固定单价/可调价/成本加酬金，含立场视角）
- 变更签证有效性五要素（权限/时限/内容完整性/监理确认/发包人确认）+ 未签证变更举证路径
- 结算依据：合同约定/竣工图/送审价/审定价 + 黑白合同以白合同结算（司法解释描述规则，待验证）+ 逾期不答复条款效力分析
- 进度款支付节点审查 + 质保金预留比例核查（法定上限待验证）+ 返还条件与期限
- 按代理立场：发包人侧（控价/审价时限管理）/承包人侧（足额结算/签证留痕/逾期不答复条款）
- 完整的检查清单、输出模板、边界条件（6种）、错误处理（4种）

**breach-termination/SKILL.md**（196 行）：
- 五类违约类型识别表（工期/质量/付款违约/擅自分包/承包人停工）
- 违约金调整：第585条第2款（建议复核）+ 司法实践裁量标准（描述规则，待验证）
- 竞合规则：第588条（建议复核，**注意不是第585条第2款**，含显式说明防止回退）
- 法定解除：第563条（建议复核）+ 司法解释特别解除情形（发包人/承包人各自，描述规则，待验证）
- 解除后已完工程处理（移交/价款/材料/损失赔偿第583/584条/优先受偿权第807条）
- 按代理立场：发包人侧（违约追责/解除/防范优先受偿权对抗）/承包人侧（法定解除权/已完工程价款/优先受偿权行使）
- 完整的检查清单、输出模板、边界条件（7种）、错误处理（4种）

### Task 4: 编排入口改造

**contract-review/SKILL.md**（145 行，原 18 行）：
- 顶部迁移说明（指向四个子技能路径）
- 子技能编排顺序表（四行：步骤/名称/核心任务/路径/斜杠命令）
- 临时模式（中立审查/保守型/律师角色）
- 入口级护栏全部保留：代理立场加载（核心护栏，四立场审查方向说明）/合同审查严格度/主体画像与项目类型确认/目的地特权检查/payment-dispute 衔接提示（优先受偿权行使期限）/地方性规定提示/时效性提示

---

## Deviations from Plan

None — plan executed exactly as written. 中度把握锚点（第788/799/807条 + 通则 588/585条第2款/563/533/681/686）均正确引用，无回退已知错误。

---

## Known Stubs

无阻碍计划目标实现的 stubs。引用库中的案例与学说为**占位结构**（含填写说明），这是设计意图，后续可通过检索核验填充：

| 占位类型 | 文件 | 原因 |
|---------|------|------|
| 案例占位（4类） | construction-law-citations.md | 案号需人工检索核验，模型回忆案号风险高 |
| 学说占位（3类） | construction-law-citations.md | 学说需人工填入完整出处 |

---

## Threat Flags

无新增安全相关网络端点或信任边界，本计划仅为 Markdown 内容文件，不含应用代码或 API。

---

## Self-Check: PASSED

```bash
# 文件存在性
construction-legal/skills/_shared/legal-basis-conventions.md — FOUND
construction-legal/skills/_shared/construction-law-citations.md — FOUND
construction-legal/skills/_shared/practice-profile-schema.md — FOUND
construction-legal/CLAUDE.md — FOUND
construction-legal/skills/contract-review/subject-qualification-validity/SKILL.md — FOUND
construction-legal/skills/contract-review/schedule-quality/SKILL.md — FOUND
construction-legal/skills/contract-review/price-settlement/SKILL.md — FOUND
construction-legal/skills/contract-review/breach-termination/SKILL.md — FOUND
construction-legal/skills/contract-review/SKILL.md — FOUND (orchestrator)

# Commits
10ecdb4 — feat(07-01): Task 1 FOUND
cbc36c6 — feat(07-01): Task 2 FOUND
a046d60 — feat(07-01): Task 3 FOUND
c38082f — feat(07-01): Task 4 FOUND

# Key content checks
第788条、第799条、第807条 — FOUND in construction-law-citations.md
第588条 + 第585条 — FOUND (correct, no regression)
黑白合同、折价补偿、优先受偿 — FOUND
必须招标 — FOUND
发包人 — FOUND in CLAUDE.md
临时模式 — FOUND in contract-review/SKILL.md
转包、黑白合同、折价补偿 — FOUND in subject-qualification-validity
竣工验收 — FOUND in schedule-quality
结算、质保金 — FOUND in price-settlement
解除 — FOUND in breach-termination
JSON validity — PASSED
Trailing whitespace — NONE
```
