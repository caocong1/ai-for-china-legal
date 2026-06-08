---
name: skill-discovery
description: 技能发现编排入口——协调四个子技能（技能搜索与浏览/技能详情与评价/分类标签筛选/推荐排序）完成法律技能的发现、评估和选择
argument-hint: "[描述你需要什么类型的法律技能，如：合同审查/法规检索/案例分析/合规检查]"
---

# 技能发现（编排入口）

> **深化说明**：原 skill-discovery 浅骨架已深化为四个可独立触发的子技能。本文件作为编排入口，协调子技能的顺序与护栏。

---

## 目的

帮助用户在技能注册表中搜索、浏览、筛选、评估和选择适合其法律工作场景的技能。覆盖从需求理解到技能推荐的完整发现流程，确保推荐结果兼顾功能匹配度和安全合规要求。

---

## 前置配置读取

**读取 `legal-builder-hub/CLAUDE.md` 以获取以下配置：**

| 配置字段 | 驱动的技能行为 |
|---------|--------------|
| 关注的法律领域 | 推荐范围与搜索权重 |
| 关注的能力类型 | 分类筛选条件 |
| 推荐排序偏好 | 排序策略选择 |
| 是否接受未审查技能 | 搜索结果过滤规则 |
| 整体技能管理偏好 | 安全审查要求强度 |
| 用户角色 | 功能路由与输出格式 |

**配置缺失或 PLACEHOLDER 时 — 临时模式** `[临时模式]`：

> - **平衡偏好**：推荐综合评分排序，不预设领域偏好
> - **安全优先**：默认仅展示已审查通过的技能
> - **建议用户运行** `/legal-builder-hub:cold-start-interview` 完善配置

---

## 子技能编排顺序

| 步骤 | 子技能 | 做什么 | 子技能路径 | 单独触发命令 |
|------|-------|-------|----------|------------|
| 1 | **分类·标签·筛选** | 根据用户需求确定筛选维度（法律领域/能力类型/安全等级/许可证类型/兼容性），构建筛选条件 | `legal-builder-hub/skills/skill-discovery/category-tag-filtering/SKILL.md` | `/legal-builder-hub:category-tag-filtering` |
| 2 | **技能搜索与浏览** | 执行搜索查询，返回匹配结果列表；支持关键词搜索和浏览式发现 | `legal-builder-hub/skills/skill-discovery/skill-search-browse/SKILL.md` | `/legal-builder-hub:skill-search-browse` |
| 3 | **推荐与排序** | 根据用户画像和偏好对搜索结果排序；提供个性化推荐 | `legal-builder-hub/skills/skill-discovery/recommendation-ranking/SKILL.md` | `/legal-builder-hub:recommendation-ranking` |
| 4 | **技能详情与评价** | 查看候选技能的详细信息：功能说明、安全审查报告、社区评价、兼容性信息、许可证 | `legal-builder-hub/skills/skill-discovery/skill-detail-evaluation/SKILL.md` | `/legal-builder-hub:skill-detail-evaluation` |

> **流程说明**：步骤 1 → 步骤 2 → 步骤 3 → 步骤 4，用户也可从任意步骤开始。
> 各子技能可**单独触发**，无需运行整个编排流程。

---

## 入口级护栏

### 1. 安全优先

> **未经安全审查的技能须明确标注状态**

- 搜索结果中，未审查技能须标注 `[未审查 — 安装前须完成安全审查]`
- 若用户配置为「仅展示已审查技能」，未审查技能从搜索结果中过滤
- 推荐结果中标注每个技能的安全审查状态和等级

### 2. 数据合规

- 技能搜索和推荐过程不收集或分析用户的具体法律案件内容
- 推荐算法不依赖用户个人信息的画像分析（符合 PIPL 最小必要原则）
- 搜索记录仅保存在本地，不上报至注册表或第三方

### 3. 知识产权提示

- 搜索结果中须展示每个技能的许可证类型
- 不同许可证对使用场景有不同限制（如 GPL 要求衍生作品同样开源）
- 技能描述和文档的著作权归属原开发者

---

## 与其他模块的衔接

| 需求 | 推荐触发的模块 |
|------|--------------|
| 选定技能后安装 | → `/legal-builder-hub:installation` |
| 安装前安全审查 | → `/legal-builder-hub:security-review` |
| 查看技能注册表信息 | → `/legal-builder-hub:skill-registry` |

---

## 法律依据

| 法律依据 | 核心规则 | 适用场景 |
|---------|---------|---------|
| 《个人信息保护法》（2021年）第13条 | 搜索推荐不得超出必要范围收集用户信息 | 推荐算法数据使用 |
| 《个人信息保护法》（2021年）第24条 | 自动化决策须保证透明度和公平公正 | 个性化推荐算法 |
| 《著作权法》（2021年修正） | 技能内容著作权保护 | 许可证合规 |

> **引用规范**：`legal-builder-hub/skills/_shared/legal-basis-conventions.md`
> **引用库**：`legal-builder-hub/skills/_shared/skill-hub-citations.md`
