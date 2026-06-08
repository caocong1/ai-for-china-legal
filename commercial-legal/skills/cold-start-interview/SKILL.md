---
name: cold-start-interview
description: >
  商事合同冷启动访谈编排入口。按 identity-team → review-stance → escalation-rules →
  document-style → jurisdiction-profile 顺序编排五个访谈子技能，完整初始化律师的实践配置文件
  （commercial-legal/CLAUDE.md）。各子技能也可单独触发，只更新配置文件对应章节。
  配置完成后，所有商事合同技能（contract-review、contract-drafting、liability-analysis 等）
  自动从 commercial-legal/CLAUDE.md 读取个性化设置。
argument-hint: ""
---

# 冷启动访谈（编排入口）

> **迁移说明**：原访谈内容（五部分问题流、边界条件、错误处理）已深化拆分到五个访谈子技能。
> 本文件为编排入口，负责访谈顺序和完整流程概览。子技能路径：
> `commercial-legal/skills/cold-start-interview/<子技能名>/SKILL.md`
>
> 配置输出契约见：`commercial-legal/skills/_shared/practice-profile-schema.md`

---

## 目的

通过结构化的五步访谈，收集律师的执业立场、审查偏好、升级规则、文书风格和管辖信息，
完整初始化实践配置文件（`commercial-legal/CLAUDE.md`）。

配置完成后：
- 所有商事合同技能根据配置文件提供个性化服务
- 每个技能在配置缺失时提供「临时模式」作为无阻塞降级
- 配置可随时重新运行整个访谈或单独更新某一部分

---

## 子技能编排顺序

| 顺序 | 子技能 | 收集内容 | 子技能路径 | 单独触发 |
|-----|-------|---------|----------|---------|
| 1 | **identity-team** | 律师身份、执业环境、团队结构、可用集成 | `skills/cold-start-interview/identity-team/SKILL.md` | `/commercial-legal:identity-team` |
| 2 | **review-stance** | 风险偏好（保守/平衡/进取）、甲乙方双立场六维度、交易破坏者、可接受备选 | `skills/cold-start-interview/review-stance/SKILL.md` | `/commercial-legal:review-stance` |
| 3 | **escalation-rules** | 升级矩阵（金额阈值、风险等级触发、自动触发条件）、审批人信息 | `skills/cold-start-interview/escalation-rules/SKILL.md` | `/commercial-legal:escalation-rules` |
| 4 | **document-style** | 输出格式偏好、文书语气、法条/案例引用偏好、双语需求、常用模板 | `skills/cold-start-interview/document-style/SKILL.md` | `/commercial-legal:document-style` |
| 5 | **jurisdiction-profile** | 主要管辖法律、地方性法规、法院偏好（含四级法院）、经济特区/自贸区/港澳台、行业合规 | `skills/cold-start-interview/jurisdiction-profile/SKILL.md` | `/commercial-legal:jurisdiction-profile` |

**顺序说明**：身份在前（建立基础上下文）→ 审查立场第二（最核心配置）→ 升级规则第三（依赖前两步的团队层级和立场设置）→ 文书风格第四（独立性强，可分开）→ 管辖法律最后（补充地域和行业维度）。

**单独触发**：律师可单独触发任一子技能，只更新配置文件对应章节，无需重跑整个访谈。例如：
- 只更新审批人信息：`/commercial-legal:escalation-rules`
- 只更新文书风格：`/commercial-legal:document-style`
- 只更新管辖偏好（如开展新业务线）：`/commercial-legal:jurisdiction-profile`

---

## 完整访谈流程概览

**预计时间**：约 5-10 分钟（完整访谈）；约 2-3 分钟（单个子技能）

**第一步（identity-team）：** 收集律师基本身份、团队层级、执业环境（律所/公司法务）、合同管理系统集成状态。独立执业时简化问题流（跳过团队层级细节）。

**第二步（review-stance）：** 最深的子技能。覆盖整体风险偏好以及甲方/乙方双立场的六大维度（责任限制/违约金/知识产权/数据保护/期限终止/管辖争议），逐维度收集「标准立场」「可接受备选」「绝不接受」。

**第三步（escalation-rules）：** 配置升级矩阵：基于金额的分级阈值、基于风险等级的触发规则、自动升级触发条件清单、审批人姓名/角色/联系方式。

**第四步（document-style）：** 配置输出偏好：完整备忘录/管理层摘要/修订文档/组合输出；修订语气（强硬/温和/协商式）；法条引用偏好；案例引用偏好（最高院指导性案例/典型裁判观点）；双语需求；工作产物存放位置。

**第五步（jurisdiction-profile）：** 配置管辖信息：主要法律体系、业务地域分布（识别经济特区/自贸区/民族自治地方）、法院管辖偏好（四级法院层级）或仲裁机构偏好、港澳台处理方式、行业监管特色（网信办/金监局/市场监管总局等）。

---

## 输出契约

本访谈的所有子技能共同填充 `commercial-legal/CLAUDE.md`（唯一真相来源）。

完整配置示意（子技能填充后的 CLAUDE.md 各章节对应关系）：

| CLAUDE.md 章节 | 由哪个子技能填充 |
|--------------|--------------|
| `## 我们是谁` | identity-team |
| `## 谁在使用` | identity-team |
| `## 可用集成` | identity-team |
| `## 审查立场`（甲方+乙方全维度） | review-stance |
| `## 升级矩阵` | escalation-rules |
| `## 文书风格` | document-style |
| `## 输出`（风格偏好补充） | document-style |
| `## 共享护栏` → `### 管辖识别` | jurisdiction-profile |

**字段映射、技能读取契约、重跑/编辑/版本控制规则、法律事实合理性检查规则详见：**
`commercial-legal/skills/_shared/practice-profile-schema.md`

---

## 后续

配置文件初始化完成后：

### 重跑访谈

- **完整重跑**：运行 `/commercial-legal:cold-start-interview`，按顺序重新执行全部五个子技能
- **部分更新**：单独触发对应子技能（见上方编排顺序表），只更新需要变更的章节

### 直接编辑

律师可直接编辑 `commercial-legal/CLAUDE.md`，无需重跑访谈。编辑后即时生效。

### 版本控制

配置文件纳入版本控制（与代码同仓库）：
- 查看历史：`git log --oneline commercial-legal/CLAUDE.md`
- 查看变更：`git diff HEAD~1 commercial-legal/CLAUDE.md`
- 回滚：`git checkout <commit-hash> -- commercial-legal/CLAUDE.md`

### 导出与迁移

将 `commercial-legal/CLAUDE.md` 复制到其他项目或同事的工作目录，即可完成配置迁移。
