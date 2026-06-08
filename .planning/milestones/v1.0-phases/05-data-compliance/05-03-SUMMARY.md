---
phase: 05-data-compliance
plan: "03"
subsystem: data-compliance
tags:
  - network-security-compliance
  - cold-start-interview
  - csl
  - mlps
  - cii
  - plugin-registration
dependency_graph:
  requires:
    - 05-01  # _shared 脊柱 + data-compliance/CLAUDE.md + pia-generation 子技能
    - 05-02  # cross-border-assessment + data-security-compliance 子技能（路径用于注册）
  provides:
    - network-security-compliance（四子技能 + 编排入口）
    - cold-start-interview（四访谈子技能 + 编排入口）
    - plugin.json 0.2.0（注册全部 25 个技能，完成 Phase 5 插件注册）
  affects:
    - data-compliance/.claude-plugin/plugin.json
    - data-compliance/skills/network-security-compliance/（新建）
    - data-compliance/skills/cold-start-interview/（深化拆分）
tech_stack:
  added:
    - network-security-compliance 主技能（CSL 等保/关基/运营者义务/个人信息收集四子技能）
    - cold-start-interview 访谈子技能（identity-team/compliance-stance/risk-escalation/style-cross-border-policy）
  patterns:
    - 编排入口 + 可单独触发子技能（沿用 Phase 2-4 模式）
    - 法律引用分层（已核实锚点明确/待验证标注/行业监管 flagged）
    - 访谈结果写入 CLAUDE.md（散文真相来源，不另存 YAML）
key_files:
  created:
    - data-compliance/skills/network-security-compliance/SKILL.md
    - data-compliance/skills/network-security-compliance/mlps-grading/SKILL.md
    - data-compliance/skills/network-security-compliance/cii-protection/SKILL.md
    - data-compliance/skills/network-security-compliance/operator-obligations/SKILL.md
    - data-compliance/skills/network-security-compliance/personal-info-collection/SKILL.md
    - data-compliance/skills/cold-start-interview/identity-team/SKILL.md
    - data-compliance/skills/cold-start-interview/compliance-stance/SKILL.md
    - data-compliance/skills/cold-start-interview/risk-escalation/SKILL.md
    - data-compliance/skills/cold-start-interview/style-cross-border-policy/SKILL.md
  modified:
    - data-compliance/skills/cold-start-interview/SKILL.md（改造为编排入口，纠正 YAML 表述）
    - data-compliance/.claude-plugin/plugin.json（0.1.0→0.2.0，注册 25 技能）
decisions:
  - 网络安全法合规检查新建四子技能，以 CSL 第21条（等保）和第31条起（关基）为已核实锚点，其余条号一律标待验证
  - 关基认定条件和具体义务条款（关基条例）全部标待验证+行业监管 flagged，避免臆造
  - cold-start-interview 访谈结果写入 data-compliance/CLAUDE.md 散文形式，而非另存 YAML 文件
  - plugin.json 统一注册 25 个技能（5 编排入口 + 20 子技能），每条 name 与 SKILL.md frontmatter 一致
metrics:
  duration: "约 60 分钟"
  completed_date: "2026-06-05"
  tasks: 3
  files_created: 9
  files_modified: 2
---

# Phase 05 Plan 03: 网络安全法合规 + 冷启动访谈拆分 + 插件注册 Summary

**一句话总结**：新建 network-security-compliance（CSL 第21条等保/第31条起关基/运营者义务/个人信息收集四子技能 + 编排入口），拆分 cold-start-interview 为四可独立触发访谈子技能（填充 data-compliance/CLAUDE.md），并将 plugin.json 升级到 0.2.0 注册全部 25 个技能，完成 Phase 5 数据合规插件完整深化。

---

## 完成内容

### Task 1：新建 network-security-compliance 四个子技能 + 编排入口

新建路径：`data-compliance/skills/network-security-compliance/`

| 文件 | 行数（非空）| 关键内容 |
|------|-----------|---------|
| `mlps-grading/SKILL.md` | 216 | CSL 第21条（已核实）等保五级定级、定级备案（待验证）、等级测评（第三级须定期，待验证）、等保2.0安全要求（GB/T 22239 待验证） |
| `cii-protection/SKILL.md` | 205 | CSL 第31条起（已核实）关基识别、关基条例特别义务（待验证）、数据本地化（CSL第37条待验证）、出境须安全评估（DSL第31条已核实） |
| `operator-obligations/SKILL.md` | 196 | 实名制（条号待验证）、日志留存≥六个月（条号待验证，CSL第21条已核实等保义务）、安全技术措施、应急预案、违法信息处置 |
| `personal-info-collection/SKILL.md` | 234 | CSL/PIPL衔接框架（PIPL优先），合法正当必要，最小必要，已核实PIPL锚点（第13-14条/第28-29条/第44-47条），与pia-generation分工 |
| `SKILL.md`（编排入口）| 114 | 四子技能顺序表、CIIO/关基识别护栏、临时模式（CIIO从严推定/等保定级保守）、出境衔接、PIA衔接、时效性提示 |

**法律引用规范遵守情况**：
- 已核实锚点明确使用：CSL 第21条（等保制度）、CSL 第31条起（关基保护）、DSL 第31条（重要数据出境）
- 待验证项均标注：等保定级标准条款、关基认定程序条款、日志留存六个月条号、CSL 第37条本地化条号、等保2.0国标编号（GB/T 22239 等）
- 关基认定均标 `[行业监管 flagged]`，无臆造条号

### Task 2：拆分 cold-start-interview 为四访谈子技能 + 改造编排入口

新建路径：`data-compliance/skills/cold-start-interview/<子技能>/`

| 文件 | 行数（非空）| 填充目标 CLAUDE.md 章节 |
|------|-----------|----------------------|
| `identity-team/SKILL.md` | 162 | `## 我们是谁` / `## 谁在使用` / `## 可用集成`（数据处理者画像、CIIO状态、处理规模、DPO等） |
| `compliance-stance/SKILL.md` | 172 | `## 合规立场`（整体偏好 + 敏感数据政策 + 跨境政策 + 数据安全立场）|
| `risk-escalation/SKILL.md` | 126 | `## 风险校准` / `## 升级矩阵`（角色权限表 + 自动升级触发 + 监管报告触发）|
| `style-cross-border-policy/SKILL.md` | 142 | `## 文书风格` / `## 输出` / `## 共享护栏`（行业监管识别）|

**SKILL.md 改造**：
- 删除「生成数据合规实践配置文件（YAML 格式）」旧表述
- 改为：访谈结果**填充 `data-compliance/CLAUDE.md`** 对应章节（散文真相来源，不另存 YAML）
- 包含完整的子技能编排顺序表、重跑/部分更新/直接编辑/git 版本控制说明

**迁移无丢失**：原有三部分访谈（基本信息/审查立场/文书风格）已无丢失迁移并深化到对应子技能。

### Task 3：plugin.json 升级 0.2.0 + 注册全部 25 技能

| 变更项 | 内容 |
|-------|------|
| version | `0.1.0` → `0.2.0` |
| description | 更新为五大模块完整能力总览 |
| skills 数组 | 新增 25 个条目（5 编排入口 + 20 子技能），每条含 name/path/description |
| JSON 合法性 | Python JSON 解析验证通过，2 空格缩进，文件以换行符结尾 |
| 路径验证 | 所有 25 个 path 指向实际存在的 SKILL.md（python3 验证通过） |

---

## 已核实锚点汇总（本计划）

| 锚点 | 法律依据 | 使用位置 |
|------|---------|---------|
| 网络安全等级保护制度 | CSL 第21条（已核实锚点，建议复核）| mlps-grading、operator-obligations、network-security-compliance |
| 关键信息基础设施安全保护 | CSL 第31条起（已核实锚点，建议复核）| cii-protection、network-security-compliance |
| 重要数据出境须安全评估 | DSL 第31条（已核实锚点，建议复核）| cii-protection、network-security-compliance |
| 个人信息处理合法性基础 | PIPL 第13-14条（已核实）| personal-info-collection |
| 敏感个人信息单独同意 | PIPL 第28-29条（已核实）| personal-info-collection |
| 个人权利（查阅/更正/删除）| PIPL 第44-47条（已核实）| personal-info-collection |

## 待验证项汇总（本计划）

| 待验证项 | 使用位置 |
|---------|---------|
| 等保定级标准具体条款 | mlps-grading |
| 等保备案具体规定（公安部）| mlps-grading |
| 等级测评频率（第三级每年、第四级每半年）| mlps-grading |
| 等保2.0国标编号（GB/T 22239/22240 等）| mlps-grading |
| 关基认定程序（关基条例具体条款）| cii-protection |
| 关基运营者特别义务具体条款（专门安全机构/定期评估等）| cii-protection |
| CSL 第37条（数据本地化条号待验证）| cii-protection |
| 实名制义务具体条号（CSL）| operator-obligations |
| 日志留存≥六个月具体条号（CSL）| operator-obligations |
| 应急预案义务条号（CSL）| operator-obligations |
| CSL 网络运营者个人信息收集规则条号 | personal-info-collection |
| PIPL 第57条（泄露通知义务）| personal-info-collection |

---

## Deviations from Plan

**None** - 计划按原方案执行。

**修复（Rule 1）**：style-cross-border-policy/SKILL.md 第115行有尾部空格，执行验证后发现并修复（commit 2a0bb24）。

---

## 自知存根（Known Stubs）

无阻碍目标达成的存根。访谈子技能中的「写入说明」部分描述了写入 `data-compliance/CLAUDE.md` 的意图，但实际写入是运行时行为（用户触发访谈时），而非编译时行为，这是预期设计而非存根。

---

## 威胁面扫描（Threat Flags）

无新增安全相关网络端点或认证路径。本计划仅新增/修改 Markdown 格式的提示词文件，不引入新的代码执行面或数据存储路径。

---

## Self-Check: PASSED

- [x] data-compliance/skills/network-security-compliance/mlps-grading/SKILL.md — 存在，216 非空行
- [x] data-compliance/skills/network-security-compliance/cii-protection/SKILL.md — 存在，205 非空行
- [x] data-compliance/skills/network-security-compliance/operator-obligations/SKILL.md — 存在，196 非空行
- [x] data-compliance/skills/network-security-compliance/personal-info-collection/SKILL.md — 存在，234 非空行
- [x] data-compliance/skills/network-security-compliance/SKILL.md — 存在，编排入口
- [x] data-compliance/skills/cold-start-interview/identity-team/SKILL.md — 存在，162 非空行
- [x] data-compliance/skills/cold-start-interview/compliance-stance/SKILL.md — 存在，172 非空行
- [x] data-compliance/skills/cold-start-interview/risk-escalation/SKILL.md — 存在，126 非空行
- [x] data-compliance/skills/cold-start-interview/style-cross-border-policy/SKILL.md — 存在，142 非空行
- [x] data-compliance/skills/cold-start-interview/SKILL.md — 改造为编排入口，无「YAML 格式」表述
- [x] data-compliance/.claude-plugin/plugin.json — 0.2.0，25 技能，所有 path 有效，JSON 合法
- [x] Commits: 90f79d7 (Task1) / b0a9673 (Task2) / 00cfcb6 (Task3) / 2a0bb24 (fix)
