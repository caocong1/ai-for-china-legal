# 实践配置文件契约（法律技能中心版 Practice Profile Schema）

> 本文件定义 legal-builder-hub 插件的实践配置文件契约：字段定义、存储位置、技能读取规则，以及与 `legal-builder-hub/CLAUDE.md` 实践配置模板的映射关系。
>
> **所有法律技能中心技能通过本契约读取个性化配置。** 冷启动访谈子技能（cold-start-interview）按本契约填充配置文件。

---

## 一、配置文件是什么

### 真相来源

实践配置文件的真相来源是 **`legal-builder-hub/CLAUDE.md`**（散文形式）。该文件：

- 由 `/legal-builder-hub:cold-start-interview` 冷启动访谈生成和更新
- 可由用户直接编辑，编辑后即时生效
- 为所有法律技能中心技能提供个性化设置的读取来源

### 架构决策

**决策：不引入与现有体系冲突的新配置文件格式。**

`legal-builder-hub/CLAUDE.md`（散文模板）是唯一真相来源。

**理由：**

1. 散文格式对用户（包括非技术人员）可读可编辑
2. Claude 的配置读取本质是文本理解，不需要机器解析的结构化格式
3. 避免双重真相来源的维护成本
4. 沿用项目已验证的散文单一真相来源模式

---

## 二、字段映射表

### 2.1 用户画像（identity 字段组）

| 访谈字段 | 配置模板章节 | 读取技能 |
|---------|------------|---------|
| 组织名称、实体类型 | `## 我们是谁` → 组织/律所名称、实体类型 | 所有技能（工作产物标题） |
| 所属行业 | `## 我们是谁` → 所属行业 | skill-discovery（行业推荐）；security-review（行业合规要求） |
| 用户角色（开发者/使用者/管理员） | `## 我们是谁` → 用户角色 | 所有技能（权限判断/功能路由） |
| 技术背景 | `## 我们是谁` → 技术背景 | installation（安装指导详细程度）；security-review（报告深度） |
| 团队规模 | `## 我们是谁` → 团队规模 | installation（部署方案推荐） |
| 执业角色 | `## 谁在使用` → 角色 | 所有技能（工作产物标题选择） |

### 2.2 技能偏好（preference 字段组）

| 访谈字段 | 配置模板章节 | 读取技能 |
|---------|------------|---------|
| 整体技能管理偏好 | `## 技能偏好` → 整体技能管理偏好 | 所有技能（安全口径校准） |
| 关注的法律领域 | `### 技能发现偏好` → 关注的法律领域 | skill-discovery/recommendation-ranking |
| 关注的能力类型 | `### 技能发现偏好` → 关注的能力类型 | skill-discovery/category-tag-filtering |
| 推荐排序偏好 | `### 技能发现偏好` → 推荐排序偏好 | skill-discovery/recommendation-ranking |
| 是否接受未审查技能 | `### 技能发现偏好` → 是否接受未审查技能 | skill-discovery/skill-search-browse（搜索过滤） |

### 2.3 安全审查偏好（security 字段组）

| 访谈字段 | 配置模板章节 | 读取技能 |
|---------|------------|---------|
| 安全审查级别 | `### 安全审查偏好` → 安装前安全审查级别 | security-review（审查深度） |
| 是否允许安装未审查技能 | `### 安全审查偏好` → 是否允许安装未经安全审查的技能 | installation/compatibility-check（安装前置检查） |
| 敏感权限零容忍列表 | `### 安全审查偏好` → 敏感权限零容忍列表 | security-review/permission-scope-review（权限审查） |
| 数据隐私要求 | `### 安全审查偏好` → 数据隐私要求 | security-review/data-privacy-assessment（隐私评估） |

### 2.4 安装偏好（installation 字段组）

| 访谈字段 | 配置模板章节 | 读取技能 |
|---------|------------|---------|
| 默认安装位置 | `### 安装与部署偏好` → 默认安装位置 | installation/installation-execution |
| 自动更新策略 | `### 安装与部署偏好` → 自动更新策略 | installation/update-uninstall |
| 安装前兼容性检查 | `### 安装与部署偏好` → 安装前兼容性检查 | installation/compatibility-check |

### 2.5 风险校准（risk-calibration 字段组）

| 访谈字段 | 配置模板章节 | 读取技能 |
|---------|------------|---------|
| 风险等级定义 | `## 风险校准` → 风险等级表 | 所有技能（安全审查输出风险标注） |

### 2.6 升级矩阵（escalation 字段组）

| 访谈字段 | 配置模板章节 | 读取技能 |
|---------|------------|---------|
| 角色权限表 | `## 升级矩阵` → `### 角色权限表` | 所有技能（权限路由） |
| 自动升级触发条件 | `## 升级矩阵` → `### 自动升级触发条件` | security-review（安全发现升级）；installation（安装失败升级） |

### 2.7 文书风格（document-style 字段组）

| 访谈字段 | 配置模板章节 | 读取技能 |
|---------|------------|---------|
| 安全审查报告风格 | `## 文书风格` → 安全审查报告风格 | security-review/review-report-certification |
| 技能评估报告风格 | `## 文书风格` → 技能评估报告风格 | skill-discovery/skill-detail-evaluation |
| 安装日志风格 | `## 文书风格` → 安装日志风格 | installation/installation-execution |

### 2.8 注册表配置（registry 字段组）

| 访谈字段 | 配置模板章节 | 读取技能 |
|---------|------------|---------|
| 注册表类型 | `## 技能注册表` → 注册表类型 | skill-registry（注册表操作） |
| 注册表地址 | `## 技能注册表` → 注册表地址 | skill-registry/registry-search-publish |
| 发布审核流程 | `## 技能注册表` → 发布审核流程 | skill-registry/version-release-management |

---

## 三、技能读取契约

### 3.1 技能读取时机

在执行任何实质性工作前，每个技能（或其编排入口）必须：

1. 读取 `legal-builder-hub/CLAUDE.md`
2. 检查关键字段是否已填充（不含 `[PLACEHOLDER]`）
3. 根据检查结果选择运行模式

### 3.2 配置缺失或含占位符时的处理

当技能检测到配置文件缺失或关键字段含 `[PLACEHOLDER]` 时，**不得静默使用猜测值**：

**标准提示（配置未完成）：**

> 我注意到你还没有配置法律技能中心实践档案——这是让我根据你的角色、安全偏好和使用场景来定制输出的关键。
>
> **两个选择：**
> - 运行 `/legal-builder-hub:cold-start-interview`（约 5-8 分钟）来配置你的档案
> - 说 **「临时模式」**，我会使用通用默认值——并在每个输出上标记 `[临时模式 — 配置你的法律技能中心档案以获得定制输出]`

### 3.3 临时模式默认值

| 字段 | 临时模式默认值 |
|-----|-------------|
| 整体技能管理偏好 | 平衡型 |
| 用户角色 | 技能使用者 |
| 技术背景 | 有编程经验的法律从业者 |
| 安全审查级别 | 标准审查（权限+隐私） |
| 是否允许安装未审查技能 | 否（强制审查） |
| 推荐排序偏好 | 综合排序 |
| 安装前兼容性检查 | 强制 |
| 自动更新策略 | 手动确认每次更新 |
| 注册表类型 | 本地注册表 |

---

## 四、schema 与 CLAUDE.md 模板章节对照

| schema 字段组 | `legal-builder-hub/CLAUDE.md` 章节 | 对应访谈子技能 |
|-------------|----------------------------------|-------------|
| identity（用户画像） | `## 我们是谁`、`## 谁在使用`、`## 可用集成` | cold-start-interview/identity-role-profile |
| preference（技能偏好） | `## 技能偏好`（含发现偏好/安全审查偏好/安装偏好） | cold-start-interview/preference-scope |
| security（安全审查偏好） | `## 技能偏好` → `### 安全审查偏好` | cold-start-interview/security-escalation |
| risk-calibration（风险校准） | `## 风险校准` | cold-start-interview/security-escalation |
| escalation（升级矩阵） | `## 升级矩阵` | cold-start-interview/security-escalation |
| document-style（文书风格） | `## 文书风格`、`## 输出` | cold-start-interview/style-resources |
| registry（注册表配置） | `## 技能注册表` | cold-start-interview/style-resources |
