---
phase: 04-employment-legal-core
plan: "02"
subsystem: employment-legal
tags:
  - termination-review
  - non-compete-review
  - sub-skill-decomposition
  - labor-law
  - chinese-employment-law
dependency_graph:
  requires:
    - "04-01 (_shared 引用库脊柱)"
  provides:
    - "employment-legal/skills/termination-review/* (4 子技能 + 编排入口)"
    - "employment-legal/skills/non-compete-review/* (4 子技能 + 编排入口)"
  affects:
    - "04-03 (其他解雇/入职相关子技能可复用本计划的分工模式)"
tech_stack:
  added: []
  patterns:
    - "sub-skill decomposition with orchestrator entry point"
    - "verified anchor + [待验证] citation discipline"
    - "dual-direction remedy analysis (employer/employee perspective)"
key_files:
  created:
    - employment-legal/skills/termination-review/grounds-legality/SKILL.md
    - employment-legal/skills/termination-review/severance-calculation/SKILL.md
    - employment-legal/skills/termination-review/termination-procedure/SKILL.md
    - employment-legal/skills/termination-review/unlawful-termination-remedy/SKILL.md
    - employment-legal/skills/non-compete-review/personnel-scope-confidentiality/SKILL.md
    - employment-legal/skills/non-compete-review/term-and-compensation/SKILL.md
    - employment-legal/skills/non-compete-review/scope-enforceability/SKILL.md
    - employment-legal/skills/non-compete-review/breach-liability-remedy/SKILL.md
  modified:
    - employment-legal/skills/termination-review/SKILL.md
    - employment-legal/skills/non-compete-review/SKILL.md
decisions:
  - "N/N+1/2N 三情形清晰区分：N（第47条经济补偿）/ +1（代通知金性质为工资不计入N基数）/ 2N（第87条赔偿金，与N互斥不并用）"
  - "解除事由条号全部标 [待验证]（第36/39/40/41/42/46条），已核实锚点仅第47/87条，遵守引用纪律不臆造条号"
  - "竞业限制地方性补偿比例全部标 [管辖 flagged — 需验证地方性规定]，三个月未付补偿解除规则标 [待验证]，不硬写统一数字"
  - "各子技能在前置中明确分工（能不能解 → 给多少 → 怎么解 → 解错了怎么办；谁能被约束 → 多久给多少 → 范围是否合理 → 违约怎么办）"
  - "编排入口改造保留全部入口级护栏：禁止解除情形前置核查 / 临时模式 / 用人单位方/劳动者方立场确认 / 地方性规定识别 / 竞业违约金与服务期违约金分工提示"
metrics:
  duration: "37 minutes"
  completed_date: "2026-06-04"
  tasks_completed: 3
  files_created: 8
  files_modified: 2
---

# Phase 04 Plan 02: 解雇审查与竞业限制深度子技能拆分 Summary

**一句话总结**：将 termination-review（55行浅骨架）和 non-compete-review（54行浅骨架）分别拆为4个可独立触发的深度子技能（每个150+行实质内容），覆盖 N/N+1/2N 三情形计算、禁止解除情形、可执行性三维分析和双向违约救济，原 SKILL.md 改为编排入口。

---

## 交付物

### 解雇审查（termination-review）

共 5 个文件（4 子技能 + 1 编排入口）：

| 文件 | 职责 | 行数（非空） |
|------|------|-----------|
| `termination-review/grounds-legality/SKILL.md` | 「能不能解」：四类解除法定要件 + 禁止解除情形（医疗期/孕产哺乳期/工伤等）核查 | 233 |
| `termination-review/severance-calculation/SKILL.md` | 「给多少」：N（第47条已核实）/ N+1（代通知金）/ 2N（第87条已核实）三情形 + 计算工作表 + 高收入封顶 | 237 |
| `termination-review/termination-procedure/SKILL.md` | 「怎么解才合规」：工会通知/提前通知/代通知金/解除证明/档案社保转移 + 送达合规举证 | 193 |
| `termination-review/unlawful-termination-remedy/SKILL.md` | 「解错了如何救济」：恢复劳动关系 vs 2N（第87条已核实）择一 + 举证责任 + 用人单位风险预防清单 | 226 |
| `termination-review/SKILL.md` | 编排入口：禁止解除情形前置检查 + 子技能顺序表 + 临时模式 + 立场确认 + 入口级护栏 | — |

### 竞业限制审查（non-compete-review）

共 5 个文件（4 子技能 + 1 编排入口）：

| 文件 | 职责 | 行数（非空） |
|------|------|-----------|
| `non-compete-review/personnel-scope-confidentiality/SKILL.md` | 「谁能被约束」：第23条三类人员认定 + 商业秘密三要件 + 保密义务与竞业限制区别 | 176 |
| `non-compete-review/term-and-compensation/SKILL.md` | 「多久给多少」：期限不超2年（第24条已核实）+ 补偿强制性/月度支付 + 地方性比例标 [管辖 flagged] + 三个月解除规则标 [待验证] | 187 |
| `non-compete-review/scope-enforceability/SKILL.md` | 「范围是否合理」：地域/行业/岗位三维可执行性分析 + 过宽不可执行风险 + 择业权平衡 | 189 |
| `non-compete-review/breach-liability-remedy/SKILL.md` | 「违约怎么办」：双向救济（劳动者违约金+继续履行；用人单位违约解除权）+ 违约金调整 + 服务期违约金分工边界 | 226 |
| `non-compete-review/SKILL.md` | 编排入口：临时模式 + 地方性补偿比例识别 + 子技能顺序表 + 与 hiring-review 分工提示 + 已核实锚点护栏 | — |

---

## 法律引用纪律执行

| 锚点 | 状态 | 子技能 |
|------|------|-------|
| 经济补偿 N = 第47条（每满一年一个月工资） | **已核实锚点** | severance-calculation |
| 违法解除赔偿金 2N = 第87条（N标准二倍） | **已核实锚点** | severance-calculation、unlawful-termination-remedy |
| 竞业限制约定（人员/补偿/期限）= 第23-24条 | **已核实锚点** | personnel-scope-confidentiality、term-and-compensation |
| 解除事由（第36/39/40/41/42/46条） | `[待验证]` 描述规则+标注 | grounds-legality |
| 地方性补偿比例（30%–50%等） | `[管辖 flagged — 需验证地方性规定]` | term-and-compensation |
| 三个月未付补偿解除规则 | `[待验证]` | term-and-compensation |
| 竞业违约金（第25条） | `[待验证]` | breach-liability-remedy |

---

## 关键设计决策

### N / N+1 / 2N 三情形区分

本计划明确三情形的**性质差异**（不仅是金额差异）：
- **N**：合法解除的经济补偿（对价性质），来源第47条
- **+1（代通知金）**：替代提前30天通知的**工资性质**对价，不计入N的基数
- **2N**：违法解除的**赔偿金**（惩罚/补偿性质），来源第87条，与N**互斥不并用**

### 竞业限制双向违约救济

`breach-liability-remedy` 子技能实现双向分析：
- **劳动者违约**：违约金（可申请调整） + 继续履行竞业限制（二者可并存）
- **用人单位违约（未付补偿三个月）**：劳动者可解除竞业限制义务 + 追讨欠付补偿 + 不承担违约金

### 编排入口护栏无丢失

原 termination-review/SKILL.md 的五块内容（解雇原因/合法性/经济补偿/程序/风险评估）
已**无丢失地迁移**到对应子技能并深化，原文件改为编排入口保留：
- 禁止解除情形前置核查（医疗期/孕产哺乳期/工伤）
- 立场确认（用人单位方/劳动者方）
- 临时模式与配置文件加载
- 地方性规定识别
- 目的地与特权检查

---

## 偏差记录

### 自动修复

**[Rule 1 - Bug] 修复 termination-procedure 和 unlawful-termination-remedy 的尾部空格**

- **发现于**：整体验证阶段
- **问题**：两个文件的 markdown 表格分隔符行含尾部空格，违反 CLAUDE.md 格式约定
- **修复**：用 sed 清除尾部空格，同时修正在 Edit 操作中意外引入的额外 `|` 字符
- **提交**：da88995

无其他偏差，计划按原设计执行完成。

---

## Known Stubs

无。所有子技能均包含实质内容（步骤/检查清单/输出模板/边界条件/错误处理/法律依据），
无占位符、无 TODO、无空数据源。案例和学说占位符（「待填入」结构）为设计内预期行为——
这些占位符需经法律检索核验后填入，由 `labor-law-citations.md` 的更新规则管理，
不影响子技能的可用性。

---

## Self-Check: PASSED

### 文件存在性检查

```
FOUND: employment-legal/skills/termination-review/grounds-legality/SKILL.md
FOUND: employment-legal/skills/termination-review/severance-calculation/SKILL.md
FOUND: employment-legal/skills/termination-review/termination-procedure/SKILL.md
FOUND: employment-legal/skills/termination-review/unlawful-termination-remedy/SKILL.md
FOUND: employment-legal/skills/termination-review/SKILL.md (edited)
FOUND: employment-legal/skills/non-compete-review/personnel-scope-confidentiality/SKILL.md
FOUND: employment-legal/skills/non-compete-review/term-and-compensation/SKILL.md
FOUND: employment-legal/skills/non-compete-review/scope-enforceability/SKILL.md
FOUND: employment-legal/skills/non-compete-review/breach-liability-remedy/SKILL.md
FOUND: employment-legal/skills/non-compete-review/SKILL.md (edited)
```

### 提交存在性检查

```
FOUND: 4c23207 feat(04-02): 拆分 termination-review 为四个可独立触发的子技能
FOUND: 78563e7 feat(04-02): 拆分 non-compete-review 为四个可独立触发的子技能
FOUND: 6146b92 feat(04-02): 改造 termination-review 与 non-compete-review SKILL.md 为编排入口
FOUND: da88995 fix(04-02): 去除 termination-procedure 与 unlawful-termination-remedy 尾部空格
```
