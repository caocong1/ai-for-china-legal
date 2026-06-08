---
phase: 08-family-legal
plan: "02"
subsystem: family-legal
tags:
  - inheritance
  - will-drafting
  - sub-skills
  - orchestration
  - civil-code-succession
dependency_graph:
  requires:
    - 08-01 (_shared/legal-basis-conventions.md, _shared/family-law-citations.md, _shared/practice-profile-schema.md, family-legal/CLAUDE.md)
  provides:
    - family-legal/skills/inheritance/* (4 sub-skills + orchestration entry)
    - family-legal/skills/will-drafting/* (4 sub-skills + orchestration entry)
  affects:
    - 08-03 (property-division and cold-start-interview will reference these sub-skill paths)
tech_stack:
  added: []
  patterns:
    - Deep sub-skill decomposition (per Phase 2-7 pattern)
    - Standalone triggerable sub-skills with YAML frontmatter
    - Orchestration entry with guardrails and temp-mode
    - _shared spine citation pattern (family-law-citations + legal-basis-conventions)
key_files:
  created:
    - family-legal/skills/inheritance/legal-succession-order/SKILL.md
    - family-legal/skills/inheritance/testate-succession-validity/SKILL.md
    - family-legal/skills/inheritance/estate-scope-debt/SKILL.md
    - family-legal/skills/inheritance/subrogation-transmission/SKILL.md
    - family-legal/skills/will-drafting/will-form-selection/SKILL.md
    - family-legal/skills/will-drafting/testamentary-capacity-intent/SKILL.md
    - family-legal/skills/will-drafting/content-reserved-share/SKILL.md
    - family-legal/skills/will-drafting/witnessing-effectiveness/SKILL.md
  modified:
    - family-legal/skills/inheritance/SKILL.md (rewritten as orchestration entry)
    - family-legal/skills/will-drafting/SKILL.md (rewritten as orchestration entry)
decisions:
  - "代位继承与转继承区分：代位=被继承人死亡前先死；转继承=继承开始后遗产分割前死亡，性质不同"
  - "公证遗嘱不再优先效力：民法典取消原继承法下公证遗嘱优先规则，数份遗嘱以最后订立的为准，须在每个相关子技能中说明"
  - "必留份双要件：缺乏劳动能力且没有生活来源，两要件须同时满足，否则不触发必留份保护"
  - "打印遗嘱每页签名：第1136条要求遗嘱人和见证人在每一页签名，是打印遗嘱最常见的无效陷阱，须重点提示"
  - "遗嘱能力时间节点：能力以立遗嘱时为准，立遗嘱时有能力其后丧失不影响效力"
metrics:
  duration: "约 2 小时"
  completed: "2026-06-05"
  tasks_completed: 4
  tasks_total: 4
  files_created: 8
  files_modified: 2
---

# Phase 8 Plan 02: 继承权分析与遗嘱起草拆分为深层子技能 Summary

将 inheritance（继承权分析）和 will-drafting（遗嘱起草）两个约 16 行浅骨架主技能拆分为 8 个可独立触发的深层子技能（各 224-304 非空行）加 2 个编排入口，覆盖民法典继承编第1119-1163条核心规则，含代理立场差异化、敏感情形护栏与婚姻家事法律引用_shared脊柱。

---

## Tasks Completed

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | 拆分 inheritance 为四个子技能 | f8c280f | legal-succession-order / testate-succession-validity / estate-scope-debt / subrogation-transmission |
| 2 | 创建 inheritance 编排入口 | 77e2bb2 | family-legal/skills/inheritance/SKILL.md |
| 3 | 拆分 will-drafting 为四个子技能 | 52d1f47 | will-form-selection / testamentary-capacity-intent / content-reserved-share / witnessing-effectiveness |
| 4 | 创建 will-drafting 编排入口 | 01d0dba | family-legal/skills/will-drafting/SKILL.md |
| — | 修复 will-form-selection 尾部空格 | a43ccf3 | will-form-selection/SKILL.md |

---

## Inheritance Sub-Skills Delivered

### legal-succession-order（法定继承顺序与份额）— 304 非空行
- 第一顺序（配偶子女父母扩大定义含养子女/有扶养关系继子女）+ 第二顺序（民法典第1127条，建议复核）
- 同顺序份额均等原则与三类酌情多分少分情形（第1130条，建议复核）
- 丧偶儿媳/女婿第一顺序继承地位（第1129条，建议复核）
- 丧失继承权（第1125条）含涉刑强制升级
- 代理立场区分：代理第一/二顺序继承人/丧偶儿媳女婿时的举证侧重

### testate-succession-validity（遗嘱继承效力）— 273 非空行
- 四层继承优先顺位（遗赠扶养协议 > 遗嘱 > 法定继承，清偿税款和债务优先于分配）
- 遗嘱有效要件综合审查（形式+能力+意思真实+内容合法）
- 数份遗嘱最后为准（民法典第1142条）+ **公证遗嘱不再优先修订说明**
- 遗赠扶养协议优先（第1158条，建议复核）+ 受遗赠人接受时限（描述规则）
- 遗嘱部分无效情形与衔接法定继承的规则
- 代理立场区分：主张有效方与无效方的举证策略

### estate-scope-debt（遗产范围与债务清偿）— 291 非空行
- 遗产范围正向认定（第1122条，建议复核）+ 反向排除表（指定受益人保险金/人身权/配偶份额）
- 先析产后继承（夫妻共同财产析产步骤，第1062/1063条）
- 债务限额清偿原则（第1161条，建议复核）+ 清偿顺序表
- 放弃继承与债务清偿关系（含虚假放弃逃债识别）
- 无人继承归属（第1160条，建议复核）
- 代理立场区分：继承人（限额保护）vs 债权人（范围最大化）

### subrogation-transmission（代位继承与转继承）— 248 非空行
- 代位继承触发条件（第1128条，建议复核）+ 适用场景表 + 份额计算示例
- 转继承触发条件（继承开始后遗产分割前死亡）+ 转移规则
- **代位vs转继承对比表**（时间点/主体/份额/性质/遗嘱影响）
- 丧失继承权五种情形（第1125条，建议复核）+ 涉刑强制升级
- 代理立场区分：代位/转继承人份额主张 vs 其他继承人抗辩

---

## Will-Drafting Sub-Skills Delivered

### will-form-selection（遗嘱形式选择）— 224 非空行
- 六种法定遗嘱形式要件对照表（第1134-1139条，均建议复核）
- **民法典修订：公证遗嘱不再优先效力**（与原继承法的规则对比）
- 形式选择决策表（按书写能力/危急情况/财产复杂度推荐）
- 各形式常见无效陷阱（打印遗嘱每页签名陷阱重点标注）
- 多份遗嘱管理建议

### testamentary-capacity-intent（遗嘱能力与意思表示）— 242 非空行
- 完全民事行为能力要件 + 能力时间节点判断（立遗嘱时为准）
- 高龄遗嘱人特别核查表 + 间歇性精神障碍者处理规则
- 欺诈/胁迫信号识别清单（陪同控制/遗嘱内容偏差等）
- 伪造篡改效力（第1143条，建议复核）
- **能力存疑或受胁迫时强制暂停并升级律师的流程**（含标准提示模板）

### content-reserved-share（遗嘱内容与必留份）— 244 非空行
- 先析产确定处分范围（遗嘱只能处分遗嘱人个人财产）
- 处分范围核查表（可处分 vs 不可处分）
- **必留份双要件（缺乏劳动能力且没有生活来源须同时满足）**（第1141条，建议复核）
- 典型必留份受益人情形表 + 违反必留份后果处理
- 附义务遗嘱条款起草要点（第1144条，建议复核）
- 遗赠与遗嘱继承对比（接受方式不同重点提示）

### witnessing-effectiveness（见证与生效）— 235 非空行
- 见证人资格排除清单（第1140条，建议复核）+ 合格见证人正向标准
- 各遗嘱形式见证与生效要件核对表（含打印遗嘱每页签名重点标注）
- 「在场见证」解析（全程在场、亲眼见证、独立见证）+ 远程见证争议说明
- 遗产管理人与遗嘱执行人对比（第1145条，建议复核）
- 遗嘱保管方式建议 + 遗嘱生效时间（遗嘱人死亡时生效）
- 见证人不适格/形式要件缺失时的强制复核流程

---

## Orchestration Entries Delivered

### inheritance/SKILL.md（继承权分析编排入口）— 120 非空行
- 编排顺序：遗产范围析产 → 遗嘱效力 → 法定继承顺序 → 代位转继承
- 代理立场加载（某继承人侧/中立）+ 临时模式（敏感度最高）
- 入口级护栏：当事人画像确认、涉刑强制升级、丧失继承权争议须法院认定
- **丧亲情绪护栏**（中立克制非煽动、识别危机信号）
- 公证/不动产登记路径提示、地方性规定、时效性提示

### will-drafting/SKILL.md（遗嘱起草编排入口）— 126 非空行
- 编排顺序：遗嘱能力 → 形式选择 → 内容必留份 → 见证生效
- 代理立场遗嘱人侧 + 文书风格严谨 + 临时模式（敏感度最高）
- 立遗嘱人画像确认 + **遗嘱能力与真实意思核查（任何能力存疑或受胁迫强制升级）**
- 必留份与处分范围先析产提示
- 公证路径提示（含公证遗嘱不再优先的修订说明）

---

## Legal Citation Quality

所有子技能均遵守继承编法律引用纪律：

- **中度把握锚点**（标「已核实锚点（中度把握），建议复核」）：
  - 遗产范围 = 第1122条
  - 法定继承顺序 = 第1127条
  - 六种遗嘱形式 = 第1134-1139条
  - 必留份 = 第1141条
  - 遗赠扶养协议优先 = 第1158条
- **继承编其他锚点**（标「建议复核」）：
  - 代位继承 = 第1128条
  - 丧偶儿媳女婿 = 第1129条
  - 份额均等照顾 = 第1130条
  - 丧失继承权 = 第1125条
  - 数份遗嘱最后为准 = 第1142条
  - 遗嘱无效情形 = 第1143条
  - 附义务遗嘱 = 第1144条
  - 见证人资格 = 第1140条
  - 遗产管理人 = 第1145条
  - 债务限额清偿 = 第1161条
  - 无人继承归属 = 第1160条
- **司法解释**：所有继承编司法解释(一)规则一律描述规则呈现，条号标 `[待验证]`
- **旧法条号**：无任何原继承法条号（第3/10/19条等），一律使用民法典继承编新条号

---

## Deviations from Plan

None — 计划完整执行，无架构变更，无自动修复偏差。

---

## Known Stubs

无影响技能目标的 stub。以下为设计内的占位符（案例/学说占位，待实际检索填充）：

- 所有子技能 `## 法律依据` 的 F 类（案例）和 G 类（学说）为占位结构，案号标 `[待验证]`，符合_shared引用库规范，不阻塞技能运行。

---

## Threat Flags

None — 本计划不引入任何新网络端点、认证路径或文件访问模式。全部内容为提示词/文档类文件（SKILL.md），无代码变更。

---

## Self-Check: PASSED

All 10 files verified (8 created + 2 modified):

- `family-legal/skills/inheritance/legal-succession-order/SKILL.md` — FOUND (304 non-empty lines)
- `family-legal/skills/inheritance/testate-succession-validity/SKILL.md` — FOUND (273 non-empty lines)
- `family-legal/skills/inheritance/estate-scope-debt/SKILL.md` — FOUND (291 non-empty lines)
- `family-legal/skills/inheritance/subrogation-transmission/SKILL.md` — FOUND (248 non-empty lines)
- `family-legal/skills/inheritance/SKILL.md` — FOUND (120 non-empty lines)
- `family-legal/skills/will-drafting/will-form-selection/SKILL.md` — FOUND (224 non-empty lines)
- `family-legal/skills/will-drafting/testamentary-capacity-intent/SKILL.md` — FOUND (242 non-empty lines)
- `family-legal/skills/will-drafting/content-reserved-share/SKILL.md` — FOUND (244 non-empty lines)
- `family-legal/skills/will-drafting/witnessing-effectiveness/SKILL.md` — FOUND (235 non-empty lines)
- `family-legal/skills/will-drafting/SKILL.md` — FOUND (126 non-empty lines)

Commits verified:
- f8c280f: feat(08-02): 拆分 inheritance 为四个深层子技能 — FOUND
- 77e2bb2: feat(08-02): 改造 inheritance/SKILL.md 为编排入口 — FOUND
- 52d1f47: feat(08-02): 拆分 will-drafting 为四个深层子技能 — FOUND
- 01d0dba: feat(08-02): 改造 will-drafting/SKILL.md 为编排入口 — FOUND
- a43ccf3: style(08-02): 修复 will-form-selection/SKILL.md 尾部空格 — FOUND

JSON validation: PASSED (no JSON files modified, regression test passed)
Trailing whitespace: NONE
File endings: All files end with newline (0x0a)
