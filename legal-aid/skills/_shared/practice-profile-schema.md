# 实践配置文件契约（Practice Profile Schema）

> 本文件定义 legal-aid 插件的实践配置文件契约：字段定义、存储位置、技能读取规则，以及与 `legal-aid/CLAUDE.md` 实践配置模板的映射关系。
>
> **所有法律援助技能通过本契约读取个性化配置。** 冷启动访谈子技能按本契约填充配置文件。

---

## 一、配置文件是什么

### 真相来源

实践配置文件的真相来源是 **`legal-aid/CLAUDE.md`**（散文形式）。该文件：

- 由 `/legal-aid:cold-start-interview` 冷启动访谈生成和更新
- 可由法律工作者直接编辑（无需重新运行访谈）
- 为所有法律援助技能提供个性化设置的读取来源

### 架构决策

**决策：不引入与现有体系冲突的新配置文件格式。**

`legal-aid/CLAUDE.md` 是唯一真相来源。冷启动访谈产出的配置仅作为「完整配置示意」，访谈实际填充 `legal-aid/CLAUDE.md` 的占位符字段。

**选择理由：**
1. `legal-aid/CLAUDE.md` 已是法律工作者可直接阅读和编辑的人类友好格式
2. 散文格式胜于 JSON/YAML 用于表达「立场」与「为什么」
3. 避免双重真相来源
4. 现有编排入口已从此文件读取配置，模式已验证可行

---

## 二、字段映射表

以下映射表将五个访谈子技能的收集字段，对应到 `legal-aid/CLAUDE.md` 的章节。

### 2.1 身份与角色画像（identity-role-profile 子技能）

| 访谈字段 | 配置模板章节 | 读取技能 |
|---------|------------|---------|
| 姓名/工号/执业证号 | `## 我是谁` → 基本信息 | 所有技能（工作产物标题） |
| 所属机构（法援中心/律所/社会组织） | `## 我是谁` → 所属机构 | 所有技能（文书抬头/落款） |
| 角色类型（法援律师/法援中心工作人员/志愿者） | `## 我是谁` → 角色类型 | client-intake, case-management, document-templates |
| 执业年限 | `## 我是谁` → 执业年限 | 参考值 |
| 主要服务领域 | `## 我是谁` → 主要服务领域 | 所有技能（案件分流） |
| 所在省市（影响地方性规定） | `## 我是谁` → 所在地区 | eligibility-assessment, style-local-resources |

### 2.2 服务立场与范围（service-stance-scope 子技能）

| 访谈字段 | 配置模板章节 | 读取技能 |
|---------|------------|---------|
| 服务类型（民事/刑事/行政） | `## 服务立场` → 服务类型 | client-intake, case-management, legal-aid-application |
| 法援类型偏好（法律咨询/代理/辩护） | `## 服务立场` → 法援类型 | case-docket-assignment, power-of-attorney-agreement |
| 案件受理优先级标准 | `## 服务立场` → 受理优先级 | case-docket-assignment, quality-review-supervision |
| 受援人沟通偏好 | `## 服务立场` → 沟通偏好 | party-identity-verification, case-fact-collection |

### 2.3 质量标准与升级（quality-escalation 子技能）

| 访谈字段 | 配置模板章节 | 读取技能 |
|---------|------------|---------|
| 案件质量标准要求 | `## 质量标准` → 质量要求 | quality-review-supervision, case-closure-report |
| 重大案件定义 | `## 质量标准` → 重大案件定义 | quality-escalation, case-docket-assignment |
| 群体性案件处理规则 | `## 质量标准` → 群体性案件规则 | quality-escalation |
| 升级触发条件 | `## 质量标准` → 升级触发条件 | quality-review-supervision |
| 审批人/升级联系人 | `## 质量标准` → 审批层级 | quality-escalation |

### 2.4 文书风格与本地资源（style-local-resources 子技能）

| 访谈字段 | 配置模板章节 | 读取技能 |
|---------|------------|---------|
| 文书风格偏好 | `## 文书风格` → 风格偏好 | document-templates 全系 |
| 常用法援中心名称与联系方式 | `## 本地资源` → 法援中心 | conflict-check-referral, application-submission-tracking |
| 常用法院清单 | `## 本地资源` → 法院清单 | litigation-document-drafting |
| 本地民政部门联系方式 | `## 本地资源` → 民政部门 | eligibility-assessment, material-preparation |
| 本地经济困难标准 | `## 本地资源` → 经济困难标准 | eligibility-assessment, eligibility-preliminary-assessment |

---

## 三、技能读取契约

### 3.1 技能读取时机

**在执行任何实质性工作之前**，每个技能（或其编排入口）必须：

1. 读取 `legal-aid/CLAUDE.md`
2. 检查关键字段是否已填充（不含 `[PLACEHOLDER]`）
3. 根据检查结果选择运行模式

### 3.2 配置缺失或含占位符时的处理

**提示词（标准格式）：**

> 我注意到你还没有配置你的实践档案——这是让我根据你的角色、服务范围和文书风格来定制输出的关键。
>
> **两个选择：**
> - 运行 `/legal-aid:cold-start-interview`（约 5 分钟）来配置你的档案。
> - 说 **「临时模式」**，我会使用通用默认值——法律援助律师角色、民事法援为主、标准文书风格——并在每个输出上标记 `[临时模式]`。

**临时模式默认值：**

| 字段 | 临时模式默认值 |
|-----|-------------|
| 角色类型 | 法援律师 |
| 服务类型 | 民事法援为主 |
| 质量标准 | 办理法律援助案件程序规定基本要求 |
| 文书风格 | 标准法律文书格式 |
| 地区 | 中国大陆通用（不含地方性差异） |

### 3.3 服务类型选择

对于每个案件，技能须确认服务类型：
1. **从案件信息推断**：若案件描述明显属于民事/刑事/行政
2. **不明显时询问**：「这个法援案件属于哪类——民事、刑事还是行政？」
3. **确认后加载对应配置**

---

## 四、重跑 / 编辑 / 版本控制

### 4.1 重跑访谈

- **完整重跑**：`/legal-aid:cold-start-interview`
- **部分更新**：单独触发某一子技能
  - `/legal-aid:identity-role-profile` — 仅更新身份信息
  - `/legal-aid:service-stance-scope` — 仅更新服务立场
  - `/legal-aid:quality-escalation` — 仅更新质量标准
  - `/legal-aid:style-local-resources` — 仅更新文书风格与本地资源

### 4.2 直接编辑

律师可直接编辑 `legal-aid/CLAUDE.md`，编辑后即时生效。

### 4.3 版本控制

- `legal-aid/CLAUDE.md` 纳入 git 版本控制
- 查看历史：`git log --oneline legal-aid/CLAUDE.md`
- 回滚：`git checkout <commit-hash> -- legal-aid/CLAUDE.md`

---

## 五、法律事实合理性检查

### 5.1 适用范围

在访谈子技能将字段写入配置文件**之前**，对以下类型的用户口述内容进行合理性检查：

- 具体法规条款号
- 经济困难标准金额
- 审查期限等法定时限
- 本地资源联系方式

### 5.2 合理性检查规则

**规则 1：条文号核查**

用户口述条文号时，与训练知识交叉核对。若发现不一致，温和确认。

**规则 2：经济困难标准核查**

用户口述的经济困难标准须与当地公布的最低生活保障标准或法律援助经济困难标准进行比对。

**规则 3：时效性标记**

涉及具体法规的配置字段，若距最后更新日期超过 6 个月，附加标记：`[时效性 flagged — 需验证最新法规]`

---

## 六、schema 与 CLAUDE.md 模板章节对照

| schema 字段组 | `legal-aid/CLAUDE.md` 章节 | 对应访谈子技能 |
|-------------|---------------------------|--------------|
| 我是谁、基本信息 | `## 我是谁` | identity-role-profile |
| 服务类型、法援类型、受理优先级 | `## 服务立场` | service-stance-scope |
| 质量标准、重大案件、升级触发 | `## 质量标准` | quality-escalation |
| 文书风格、本地资源 | `## 文书风格`、`## 本地资源` | style-local-resources |
