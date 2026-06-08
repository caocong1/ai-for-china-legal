---
phase: 08-family-legal
plan: "03"
subsystem: family-legal
tags:
  - property-division
  - cold-start-interview
  - plugin-registration
  - family-law
  - civil-code
dependency_graph:
  requires:
    - 08-01 (_shared 引用脊柱/family-law-citations/practice-profile-schema/CLAUDE.md/divorce-agreement 子技能)
    - 08-02 (inheritance/will-drafting 子技能路径用于注册)
  provides:
    - property-division 财产分割方案主技能（四子技能 + 编排入口）
    - cold-start-interview 拆分（四访谈子技能 + 更新编排入口）
    - plugin.json 0.2.0 注册全部 25 技能
  affects:
    - family-legal 插件完整度（全部 5 主技能拆分完成）
tech_stack:
  added:
    - "property-division 财产分割方案技能树（5 文件）"
    - "cold-start-interview 访谈子技能（4 文件）"
  patterns:
    - "sub-skill decomposition (orchestrator + 4 sub-skills per module)"
    - "practice-profile CLAUDE.md integration pattern"
    - "代理立场驱动分析 (主张方/被主张方/中立)"
    - "婚姻家事敏感护栏 (家暴/未成年人/涉刑强制升级)"
key_files:
  created:
    - "family-legal/skills/property-division/SKILL.md"
    - "family-legal/skills/property-division/community-property-identification/SKILL.md"
    - "family-legal/skills/property-division/special-asset-division/SKILL.md"
    - "family-legal/skills/property-division/division-principles-care/SKILL.md"
    - "family-legal/skills/property-division/concealed-asset-remedy/SKILL.md"
    - "family-legal/skills/cold-start-interview/identity-party-profile/SKILL.md"
    - "family-legal/skills/cold-start-interview/review-representation-stance/SKILL.md"
    - "family-legal/skills/cold-start-interview/sensitivity-escalation/SKILL.md"
    - "family-legal/skills/cold-start-interview/style-local-rules/SKILL.md"
  modified:
    - "family-legal/skills/cold-start-interview/SKILL.md"
    - "family-legal/.claude-plugin/plugin.json"
decisions:
  - "property-division 与 divorce-agreement/property-division-clauses 分工明确：本技能侧重法律性质认定与方案设计，协议条款拟定在 divorce-agreement 侧"
  - "cold-start-interview 旧 YAML 表述已纠正为填充 family-legal/CLAUDE.md（非独立文件）"
  - "司法解释具体条号一律待验证，中度把握锚点（1062/1063/1065/1087/1088/1090/1091/1092）标建议复核"
  - "家暴/涉刑/未成年人强制升级护栏凌驾于所有代理立场配置，不可被覆盖"
metrics:
  duration_minutes: 19
  completed_date: "2026-06-05"
  tasks_completed: 4
  files_created: 10
  files_modified: 2
---

# Phase 08 Plan 03: 财产分割方案与访谈拆分及插件注册 Summary

**一句话总结**：新增 property-division 财产分割方案主技能（4子技能，覆盖共同财产认定/特殊财产房产股权/照顾原则1087-1091条/隐匿转移救济1092条），拆分 cold-start-interview 为4个访谈子技能（填充 family-legal/CLAUDE.md 而非 YAML），注册全部25技能并升级 plugin.json 到 0.2.0。

---

## 完成情况

| 任务 | 状态 | 提交 |
|-----|------|------|
| Task 1: 新增 property-division 四个子技能 | ✅ 完成 | 5ecd2cc |
| Task 2: 创建 property-division 编排入口 | ✅ 完成 | 81e789d |
| Task 3: 拆分 cold-start-interview 为四个子技能 + 编排入口 | ✅ 完成 | 44db69e |
| Task 4: plugin.json 注册全部技能升级到 0.2.0 | ✅ 完成 | ee44106 |

---

## 新建/修改文件清单

### 新建文件（10 个）

**property-division 技能树（5 文件）：**

- `family-legal/skills/property-division/SKILL.md`（编排入口，154 非空行）
- `family-legal/skills/property-division/community-property-identification/SKILL.md`（共同财产认定，218 非空行）
- `family-legal/skills/property-division/special-asset-division/SKILL.md`（特殊财产分割，203 非空行）
- `family-legal/skills/property-division/division-principles-care/SKILL.md`（分割原则与照顾，222 非空行）
- `family-legal/skills/property-division/concealed-asset-remedy/SKILL.md`（隐藏转移救济，204 非空行）

**cold-start-interview 子技能（4 文件，均含写入 CLAUDE.md 映射）：**

- `family-legal/skills/cold-start-interview/identity-party-profile/SKILL.md`（身份与当事人画像，147 非空行）
- `family-legal/skills/cold-start-interview/review-representation-stance/SKILL.md`（审查与代理立场，164 非空行）
- `family-legal/skills/cold-start-interview/sensitivity-escalation/SKILL.md`（敏感度与升级，157 非空行）
- `family-legal/skills/cold-start-interview/style-local-rules/SKILL.md`（文书风格与地方规定，164 非空行）

### 修改文件（2 个）

- `family-legal/skills/cold-start-interview/SKILL.md`（改造为编排入口，旧 YAML 表述已纠正）
- `family-legal/.claude-plugin/plugin.json`（version 0.1.0 → 0.2.0，skills 数组 4 → 25 条）

---

## 内容质量验证

### property-division 子技能覆盖

| 子技能 | 核心锚点 | 司法解释规则 | 护栏 |
|-------|---------|-----------|-----|
| community-property-identification | 第1062/1063/1065条（建议复核） | 婚后还贷增值/父母出资赠与（描述规则，`[待验证]`） | 代理立场调整；未知来源推定共同财产 |
| special-asset-division | 第1062/1063条（建议复核） | 房产婚后还贷增值分割规则（描述规则，`[待验证]`） | 隐匿转移识别；涉刑强制升级 |
| division-principles-care | 第1087/1088/1090/1091条（建议复核） | 「与他人同居」认定（描述规则，`[待验证]`） | **家暴强制升级**；未成年人利益最大化 |
| concealed-asset-remedy | 第1092条（建议复核） | 离婚后再次分割时效（描述规则，`[待验证]`） | 紧急保全提示；涉刑升级 |

### cold-start-interview 子技能填充映射

| 子技能 | 填充 CLAUDE.md 章节 |
|-------|-----------------|
| identity-party-profile | `## 我们是谁` / `## 谁在使用` / `## 可用集成` |
| review-representation-stance | `## 审查与代理立场`（含协议审查严格度/诉讼倾向） |
| sensitivity-escalation | `## 敏感度校准` / `## 风险校准` / `## 升级矩阵` |
| style-local-rules | `## 文书风格` / `## 输出` / `## 共享护栏 > 地方性规定提示` |

### plugin.json 注册验证

- **版本**：0.2.0 ✓
- **技能总数**：25 条 ✓（5 编排入口 + 20 子技能）
- **全部路径存在**：25/25 ✓
- **JSON 合法性**：python3 json.load 通过 ✓

---

## 法律引用纪律遵守情况

- **中度把握锚点**（第1062/1063/1065/1087/1088/1090/1091/1092条）：全部标「建议复核」✓
- **司法解释条号**：全部以描述规则呈现，标 `[待验证]` ✓
- **旧法条号**：未使用任何原婚姻法/继承法旧条号 ✓
- **案例案号**：占位结构，标 `[待验证]` ✓

---

## 婚姻家事敏感护栏覆盖

| 护栏类型 | 覆盖范围 |
|---------|---------|
| 家暴识别与强制升级 | 所有 property-division 子技能前置与错误处理；division-principles-care 专项处理第1091条；cold-start-interview/sensitivity-escalation 固化配置；编排入口入口级护栏 |
| 未成年人利益最大化 | 所有编排入口入口级护栏；division-principles-care 涉子女财产提示；sensitivity-escalation 强制升级触发 |
| 当事人情绪护栏 | 所有子技能前置说明；编排入口贯穿全程条款 |
| 涉刑强制升级 | 所有技能错误处理表 |
| 代理立场边界 | 护栏凌驾于所有代理立场，practice-profile-schema 第四章明确 |

---

## 偏差记录

无偏差——计划完全按照规划执行。

Cold-start-interview 编排入口中，迁移说明中原有「YAML 格式」字眼在发现后立即修正（纠正说明改为「填充 CLAUDE.md」），符合 practice-profile-schema 架构决策。

---

## 已知存根（Stubs）

- `family-law-citations.md` F 部分案例占位结构（F1-F4）：占位待实际案号填入后核验——这是有意设计的占位，须通过中国裁判文书网检索核验后填充
- 所有子技能「案例/学说」章节：`[待填入：...]` 结构，使用前须核验案号
- CLAUDE.md 中的阈值占位符（如「重大财产分割超过 [PLACEHOLDER — 如：50万]」）：需由用户配置

---

## 威胁扫描

新建/修改文件均为提示词内容文件（.md），无新增网络端点、认证路径或文件访问模式。无威胁标记。

---

## 自检结果

### 检查文件存在

所有 11 个创建/修改文件均已确认存在。

### 检查提交存在

| 提交 | 信息 |
|-----|------|
| 5ecd2cc | feat(08-03): 新增 property-division 四个可独立触发的子技能 |
| 81e789d | feat(08-03): 创建 property-division 财产分割方案编排入口 |
| 44db69e | feat(08-03): 拆分 cold-start-interview 为四个访谈子技能 + 更新编排入口 |
| ee44106 | feat(08-03): plugin.json 注册全部 25 个技能并升级到 0.2.0 |

## Self-Check: PASSED
