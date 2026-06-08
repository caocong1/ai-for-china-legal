---
name: preference-scope
description: 冷启动访谈子技能二：收集技能偏好与范围配置（管理偏好/发现偏好/安装偏好/注册表配置），写入 legal-builder-hub/CLAUDE.md 的偏好章节。可单独触发：/legal-builder-hub:preference-scope
argument-hint: ""
---

# 偏好与范围访谈（preference-scope）

> **所属编排**：`legal-builder-hub/skills/cold-start-interview/SKILL.md`（冷启动访谈）
> **遵循契约**：`legal-builder-hub/skills/_shared/practice-profile-schema.md` 字段映射（§2.2 技能偏好 / §2.4 安装偏好 / §2.8 注册表配置）
> **写入目标**：`legal-builder-hub/CLAUDE.md` — `## 技能偏好`（含发现偏好/安装偏好）/ `## 技能注册表`
> **分工说明**：身份由 `identity-role-profile` 收集；安全策略由 `security-escalation` 收集；风格由 `style-resources` 收集。
> **可单独触发**：`/legal-builder-hub:preference-scope`

---

## 目的

收集用户的技能管理偏好、发现偏好、安装偏好和注册表配置，写入 `legal-builder-hub/CLAUDE.md`，驱动技能推荐、安装行为和注册表操作。

---

## 前置

1. **读取 `legal-builder-hub/CLAUDE.md`** — 检查偏好章节是否已有配置
2. **读取 `legal-builder-hub/skills/_shared/practice-profile-schema.md`** — 字段映射
3. 建议在 `identity-role-profile` 完成后运行

---

## 访谈问题清单

### 第一部分：整体偏好

**Q1. 贵方的整体技能管理偏好是什么？**

> 写入：`## 技能偏好` → 整体技能管理偏好

| 选项 | 含义 |
|------|------|
| 保守型 | 仅安装经过完整安全审查的技能，最高安全级别 |
| 平衡型 | 安全审查与安装效率兼顾 |
| 进取型 | 快速试用社区技能，关键场景仍要求审查 |

---

### 第二部分：技能发现偏好

**Q2. 您关注哪些法律领域？**

> 写入：`### 技能发现偏好` → 关注的法律领域

可选（多选）：商事合同 / 诉讼仲裁 / 劳动人事 / 数据合规 / 知识产权 / 监管合规 / AI 治理 / 建设工程 / 婚姻家事 / 刑事合规 / 法考培训 / 法律援助 / 全部领域

---

**Q3. 您关注哪些能力类型？**

> 写入：`### 技能发现偏好` → 关注的能力类型

可选（多选）：文书审查 / 文书起草 / 法规检索 / 案例分析 / 合规检查 / 期限管理 / 风险评估 / 培训训练 / 全部类型

---

**Q4. 您的推荐排序偏好是什么？**

> 写入：`### 技能发现偏好` → 推荐排序偏好

可选：安全评级优先 / 社区评分优先 / 最近更新优先 / 下载量优先 / 综合排序

---

**Q5. 是否接受未审查技能出现在搜索结果中？**

> 写入：`### 技能发现偏好` → 是否接受未审查技能

可选：是（标注未审查状态）/ 否（仅展示已审查技能）

---

### 第三部分：安装偏好

**Q6. 默认安装位置是什么？**

> 写入：`### 安装与部署偏好` → 默认安装位置

可选：用户目录 `.skills/` / 项目目录 `.skills/` / 自定义路径

---

**Q7. 自动更新策略是什么？**

> 写入：`### 安装与部署偏好` → 自动更新策略

可选：自动更新（仅补丁版本）/ 自动更新（所有版本）/ 手动确认每次更新

---

**Q8. 安装前是否需要兼容性检查？**

> 写入：`### 安装与部署偏好` → 安装前兼容性检查

可选：强制 / 推荐 / 关闭

---

### 第四部分：注册表配置

**Q9. 使用什么类型的注册表？**

> 写入：`## 技能注册表` → 注册表类型

可选：本地注册表 / 组织内部注册表 / 公共社区注册表

---

**Q10. 注册表地址是什么？**

> 写入：`## 技能注册表` → 注册表地址

（本地注册表时无需填写）

---

**Q11. 发布审核流程是什么？**

> 写入：`## 技能注册表` → 发布审核流程

可选：自动审核 / 人工审核 / 社区审核

---

## 字段→CLAUDE.md 映射表

| 问题 | 字段 | 写入章节 | 驱动技能 |
|------|------|---------|---------|
| Q1 | 整体偏好 | `## 技能偏好` | 所有技能安全口径 |
| Q2 | 关注领域 | `### 技能发现偏好` | skill-discovery/recommendation-ranking |
| Q3 | 能力类型 | `### 技能发现偏好` | skill-discovery/category-tag-filtering |
| Q4 | 排序偏好 | `### 技能发现偏好` | skill-discovery/recommendation-ranking |
| Q5 | 未审查技能 | `### 技能发现偏好` | skill-discovery/skill-search-browse |
| Q6 | 安装位置 | `### 安装与部署偏好` | installation/installation-execution |
| Q7 | 更新策略 | `### 安装与部署偏好` | installation/update-uninstall |
| Q8 | 兼容性检查 | `### 安装与部署偏好` | installation/compatibility-check |
| Q9 | 注册表类型 | `## 技能注册表` | skill-registry |
| Q10 | 注册表地址 | `## 技能注册表` | skill-registry/registry-search-publish |
| Q11 | 发布审核 | `## 技能注册表` | skill-registry/version-release-management |

---

## 写入说明

1. **不另存独立文件** — 只填充 CLAUDE.md
2. **确认前展示预览** — 展示填充结果确认后写入
3. **版本控制** — CLAUDE.md 纳入 git 版本控制

---

## 重跑说明

- **重跑本子技能**：`/legal-builder-hub:preference-scope` — 仅更新偏好章节
- **直接编辑**：用户可直接编辑 `legal-builder-hub/CLAUDE.md` 偏好章节
