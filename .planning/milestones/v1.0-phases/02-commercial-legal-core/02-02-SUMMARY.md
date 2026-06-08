---
phase: 02-commercial-legal-core
plan: "02"
subsystem: commercial-legal/cold-start-interview
tags:
  - cold-start-interview
  - practice-profile
  - interview-decomposition
  - skill-schema
dependency_graph:
  requires:
    - 02-01 (legal-basis-conventions.md, civil-code-contract-citations.md)
  provides:
    - commercial-legal/skills/_shared/practice-profile-schema.md
    - commercial-legal/skills/cold-start-interview/identity-team/SKILL.md
    - commercial-legal/skills/cold-start-interview/review-stance/SKILL.md
    - commercial-legal/skills/cold-start-interview/escalation-rules/SKILL.md
    - commercial-legal/skills/cold-start-interview/document-style/SKILL.md
    - commercial-legal/skills/cold-start-interview/jurisdiction-profile/SKILL.md
  affects:
    - commercial-legal/skills/contract-review (reads practice profile)
    - commercial-legal/skills/contract-drafting (reads practice profile)
    - commercial-legal/skills/liability-analysis (reads practice profile)
tech_stack:
  added: []
  patterns:
    - 访谈子技能独立触发模式（单技能单职责 + 编排入口）
    - 散文式配置文件契约（CLAUDE.md 为唯一真相来源）
    - 法律事实合理性检查规则（[前提 flagged — 需验证]）
    - 临时模式降级（配置缺失时无阻塞继续）
key_files:
  created:
    - commercial-legal/skills/_shared/practice-profile-schema.md
    - commercial-legal/skills/cold-start-interview/identity-team/SKILL.md
    - commercial-legal/skills/cold-start-interview/review-stance/SKILL.md
    - commercial-legal/skills/cold-start-interview/escalation-rules/SKILL.md
    - commercial-legal/skills/cold-start-interview/document-style/SKILL.md
    - commercial-legal/skills/cold-start-interview/jurisdiction-profile/SKILL.md
  modified:
    - commercial-legal/skills/cold-start-interview/SKILL.md
decisions:
  - "以 commercial-legal/CLAUDE.md 为唯一真相来源，不引入 profile.json 冲突格式（散文胜于 JSON 用于表达立场与理由；Claude 的文本理解不需要机器解析格式）"
  - "review-stance 为最深子技能，覆盖甲乙双立场六大维度全字段，确保技能读取时总有立场可依"
  - "管辖识别不覆盖现有 CLAUDE.md 模板触发规则，只在其基础上添加律师专项配置"
metrics:
  duration: "约 25 分钟"
  completed: "2026-06-04"
  tasks_completed: 3
  tasks_total: 3
  files_created: 6
  files_modified: 1
---

# Phase 02 Plan 02: 访谈拆分与实践配置文件 Summary

**一句话摘要**：冷启动访谈从单一扁平 SKILL.md 拆分为五个可独立触发的访谈子技能，以 CLAUDE.md 散文模板为唯一真相来源，通过显式的 practice-profile-schema 契约将字段映射、读取规则、临时模式降级和法律事实合理性检查一次性定清楚。

---

## 执行结果

### 完成的任务

| 任务 | 名称 | Commit | 关键文件 |
|-----|------|--------|---------|
| 1 | 定义实践配置文件契约 | fc830b6 | `commercial-legal/skills/_shared/practice-profile-schema.md`（242 行） |
| 2 | 拆分五个访谈子技能 | 76dcb08 | `identity-team`/`review-stance`/`escalation-rules`/`document-style`/`jurisdiction-profile` SKILL.md（共 1153 行） |
| 3 | 改造编排入口 | 8efe711 | `commercial-legal/skills/cold-start-interview/SKILL.md`（113 行，重写） |

---

## 新建/修改文件路径

**新建文件（6 个）：**

- `/home/sorawatcher/workspace/ai-for-china-legal/commercial-legal/skills/_shared/practice-profile-schema.md`
- `/home/sorawatcher/workspace/ai-for-china-legal/commercial-legal/skills/cold-start-interview/identity-team/SKILL.md`
- `/home/sorawatcher/workspace/ai-for-china-legal/commercial-legal/skills/cold-start-interview/review-stance/SKILL.md`
- `/home/sorawatcher/workspace/ai-for-china-legal/commercial-legal/skills/cold-start-interview/escalation-rules/SKILL.md`
- `/home/sorawatcher/workspace/ai-for-china-legal/commercial-legal/skills/cold-start-interview/document-style/SKILL.md`
- `/home/sorawatcher/workspace/ai-for-china-legal/commercial-legal/skills/cold-start-interview/jurisdiction-profile/SKILL.md`

**修改文件（1 个）：**

- `/home/sorawatcher/workspace/ai-for-china-legal/commercial-legal/skills/cold-start-interview/SKILL.md`（改造为编排入口，99 行新增/175 行删除）

---

## 关键交付物说明

### practice-profile-schema.md（242 行）

定义了实践配置文件的完整契约：

1. **架构决策**：CLAUDE.md 为唯一真相来源，不引入与现有体系冲突的 JSON 格式
2. **字段映射表**：五部分访谈字段 → CLAUDE.md 章节 → 读取技能（三列表）
3. **技能读取契约**：配置缺失/含占位符时的临时模式提示格式和默认值
4. **甲方/乙方立场选择**：如何从合同推断立场、不明显时如何询问
5. **重跑/编辑/版本控制**：完整访谈重跑 vs. 单独子技能更新；git 版本管理
6. **法律事实合理性检查**：四条规则（条文号核查、阈值合理性、时效性标记、矛盾回答澄清）

### review-stance/SKILL.md（293 行，最深子技能）

覆盖甲乙双立场的六大维度全字段：

| 维度 | 甲方字段 | 乙方字段 |
|-----|---------|---------|
| 责任限制 | 直接/间接赔偿上限、例外情形 | 责任上限、间接损害排除、可接受例外 |
| 违约金 | 比率标准、可接受备选 | 逾期付款违约金、比率标准 |
| 知识产权 | 委托开发成果归属 | 既有 IP 保留、新开发归属 |
| 数据保护 | 乙方合规要求、数据出境限制 | DPA 模板、额外义务接受度 |
| 期限与终止 | 便利终止权、自动续约 | 最短期限、终止补偿 |
| 管辖争议 | 首选/可接受法院、仲裁 | 首选/可接受法院、仲裁机构 |

### jurisdiction-profile/SKILL.md（250 行）

体现中国化原则中法院层级识别与行业监管特色：

- **四级法院层级**（基层/中院/高院/最高院）+ 管辖金额参考
- **特别管辖区识别**：经济特区（深圳/珠海/汕头/厦门/海南）/ 自贸区 / 民族自治地方 / 港澳台
- **行业监管特色**：列出金融/互联网/电信/医疗/教育/建设等行业的监管机构和常见合规要求

---

## 成功指标验证

- [x] 律师可单独触发任一访谈部分（5 个子技能各有 frontmatter + 独立触发路径）
- [x] 配置文件契约清晰，所有技能从同一处读取（practice-profile-schema + CLAUDE.md 双层）
- [x] review-stance 覆盖甲乙双立场全维度（六维度 × 两立场 = 12 组字段）
- [x] jurisdiction-profile 体现法院层级与管辖识别（四级 + 经济特区/自贸区/港澳台）
- [x] 访谈支持重跑/编辑/版本控制，含法律事实合理性检查（四条规则）
- [x] 全部文件遵守 CLAUDE.md 中国化原则与文件格式约定

---

## Deviations from Plan

None - plan executed exactly as written.

---

## Known Stubs

无。本计划产出为 Markdown 提示词文件（SKILL.md），无数据绑定或 UI 渲染；配置文件字段中的 `[PLACEHOLDER]` 是有意为之的模板占位符，由访谈子技能在执行时填充，不是技术意义上的 stub。

---

## Threat Flags

无新增威胁面。本计划产出均为 Markdown 提示词文件，无新增网络端点、认证路径或文件访问模式。

---

## Self-Check: PASSED

所有新建/修改文件已存在于磁盘：

- `commercial-legal/skills/_shared/practice-profile-schema.md` — FOUND
- `commercial-legal/skills/cold-start-interview/identity-team/SKILL.md` — FOUND
- `commercial-legal/skills/cold-start-interview/review-stance/SKILL.md` — FOUND
- `commercial-legal/skills/cold-start-interview/escalation-rules/SKILL.md` — FOUND
- `commercial-legal/skills/cold-start-interview/document-style/SKILL.md` — FOUND
- `commercial-legal/skills/cold-start-interview/jurisdiction-profile/SKILL.md` — FOUND
- `commercial-legal/skills/cold-start-interview/SKILL.md` — FOUND

Commits: fc830b6, 76dcb08, 8efe711 — all verified in git log.
