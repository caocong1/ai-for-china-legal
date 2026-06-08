# legal-builder-hub

> 法律技能中心管理：冷启动访谈、技能发现与推荐、技能注册表管理、安全审查、安装管理。

本插件已完整交付，包含 5 个编排入口和 20 个深度子技能，覆盖法律技能中心（Skill Hub）的全生命周期管理。

## 实践配置文件

**`legal-builder-hub/CLAUDE.md`** 是唯一真相来源，存储用户技术背景、角色画像、技能偏好、安全策略与文书风格偏好。

- 首次使用请运行 `/legal-builder-hub:cold-start-interview` 初始化配置（约 10-15 分钟）
- 用户可直接编辑 `legal-builder-hub/CLAUDE.md`，无需重新运行访谈
- 所有子技能在执行实质性工作前先读取此文件

## 模块与子技能

### 1. 冷启动访谈（cold-start-interview）

初始化或更新 `legal-builder-hub/CLAUDE.md` 实践配置档案。顺序调用四个访谈子技能：

| 子技能 | 功能 | 触发命令 |
|-------|------|---------|
| identity-role-profile | 采集用户身份、技术背景与角色画像 | `/legal-builder-hub:identity-role-profile` |
| preference-scope | 配置技能偏好与工作范围 | `/legal-builder-hub:preference-scope` |
| security-escalation | 配置安全策略与升级偏好 | `/legal-builder-hub:security-escalation` |
| style-resources | 配置风格与资源偏好 | `/legal-builder-hub:style-resources` |

### 2. 技能发现（skill-discovery）

编排四个子技能，帮助用户从技能注册表中搜索、筛选、评估和选择匹配的法律技能：

| 子技能 | 功能 | 触发命令 |
|-------|------|---------|
| skill-search-browse | 搜索与浏览技能注册表 | `/legal-builder-hub:skill-search-browse` |
| skill-detail-evaluation | 查看技能详情与用户评价 | `/legal-builder-hub:skill-detail-evaluation` |
| category-tag-filtering | 按分类和标签筛选技能 | `/legal-builder-hub:category-tag-filtering` |
| recommendation-ranking | 基于相关性和适配度的技能推荐排序 | `/legal-builder-hub:recommendation-ranking` |

### 3. 技能注册表（skill-registry）

编排四个子技能，管理技能注册表的元数据、版本、依赖与发布：

| 子技能 | 功能 | 触发命令 |
|-------|------|---------|
| skill-manifest-management | 管理技能清单文件（SKILL.md、plugin.json）的验证与维护 | `/legal-builder-hub:skill-manifest-management` |
| version-release-management | 语义化版本管理与发布管理 | `/legal-builder-hub:version-release-management` |
| dependency-resolution | 技能依赖解析与冲突检测 | `/legal-builder-hub:dependency-resolution` |
| registry-search-publish | 注册表查询与技能发布 | `/legal-builder-hub:registry-search-publish` |

### 4. 安全审查（security-review）

编排四个子技能，对法律技能进行安装前的强制安全审计：

| 子技能 | 功能 | 触发命令 |
|-------|------|---------|
| static-analysis-scan | 静态代码分析与扫描 | `/legal-builder-hub:static-analysis-scan` |
| permission-scope-review | 权限范围与请求评估 | `/legal-builder-hub:permission-scope-review` |
| data-privacy-assessment | 数据隐私影响评估 | `/legal-builder-hub:data-privacy-assessment` |
| review-report-certification | 安全审查报告与认证决定 | `/legal-builder-hub:review-report-certification` |

### 5. 安装管理（installation）

编排四个子技能，提供技能安装的完整生命周期管理：

| 子技能 | 功能 | 触发命令 |
|-------|------|---------|
| compatibility-check | 安装前兼容性检查 | `/legal-builder-hub:compatibility-check` |
| installation-execution | 执行安装（含完整日志） | `/legal-builder-hub:installation-execution` |
| post-install-configuration | 安装后配置 | `/legal-builder-hub:post-install-configuration` |
| update-uninstall | 安全更新与卸载管理 | `/legal-builder-hub:update-uninstall` |

## 主要斜杠命令

| 命令 | 用途 |
|-----|------|
| `/legal-builder-hub:cold-start-interview` | 初始化或全量更新实践配置档案 |
| `/legal-builder-hub:skill-discovery` | 技能发现与推荐（完整流程） |
| `/legal-builder-hub:skill-registry` | 技能注册表管理（完整流程） |
| `/legal-builder-hub:security-review` | 安全审查（完整流程） |
| `/legal-builder-hub:installation` | 安装管理（完整流程） |

## 核心护栏

安全审查是安装的强制前置条件，以下护栏不可绕过：

| 情形 | 处理 |
|------|------|
| 技能未通过安全审查 | 禁止安装 → 输出标 `[安全审查 — 未通过]` |
| 技能请求超出用户授权范围的权限 | 暂停 → 须用户显式确认 |
| 技能涉及敏感数据访问 | 强制数据隐私评估 |
| 技能版本与当前环境不兼容 | 阻止安装 → 输出兼容性报告 |

## 本插件不做什么

- 不自动安装任何未经用户确认的技能
- 不绕过安全审查流程
- 不保证第三方技能的质量或安全性
- 不替代用户对技能适用性的独立判断
