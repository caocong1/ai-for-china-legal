---
name: cold-start-interview
description: 冷启动访谈编排入口——顺序调用四个访谈子技能，将婚姻家事实践配置填充到 family-legal/CLAUDE.md；子技能可单独触发实现单独更新；访谈结果写入 family-legal/CLAUDE.md 对应章节（非独立 YAML）；贯穿婚姻家事敏感护栏（情绪/家暴/未成年人/强制升级），配置不可省略
argument-hint: "[律所/当事人描述，或直接开始访谈]"
---

# 冷启动访谈编排入口（cold-start-interview）

> **迁移说明**：本技能原浅骨架（三部分访谈：基本信息收集/审查立场设置/文书风格偏好）已拆分迁移并大幅深化为四个子技能。访谈结果填充 `family-legal/CLAUDE.md` 对应章节（非独立格式文件）。
>
> **关键纠正**：访谈结果**填充 `family-legal/CLAUDE.md` 对应章节**（非独立 YAML 文件）。所有访谈输出写入 `family-legal/CLAUDE.md`，不生成单独的 `practice-profile.yaml` 或其他独立 YAML 文件。
>
> 深度内容请参见各子技能：
> - `skills/cold-start-interview/identity-party-profile/SKILL.md`（身份与当事人画像）
> - `skills/cold-start-interview/review-representation-stance/SKILL.md`（审查与代理立场）
> - `skills/cold-start-interview/sensitivity-escalation/SKILL.md`（敏感度与升级）
> - `skills/cold-start-interview/style-local-rules/SKILL.md`（文书风格与地方规定）

---

## 目的

初始化/更新婚姻家事实践配置档案（`family-legal/CLAUDE.md`），使所有 family-legal 技能能够按执业角色、代理立场、敏感度校准、地方性规定进行个性化运行。

**访谈填充内容**：

- `## 我们是谁`（执业角色/事项类型/财产构成/痛点）
- `## 谁在使用`（角色与律师联系人）
- `## 可用集成`（法院/民政/公证/鉴定/妇联资源）
- `## 审查与代理立场`（整体立场/协议审查严格度/诉讼倾向）
- `## 敏感度校准`（家暴/未成年人/情绪危机/涉刑）
- `## 风险校准`（风险等级定义）
- `## 升级矩阵`（强制升级触发条件）
- `## 文书风格`（各类文书风格偏好）
- `## 共享护栏 > ### 地方性规定提示`（彩礼/房产/抚养费地方口径）

---

## 子技能顺序表

以下为冷启动访谈的推荐顺序。各子技能可由本入口顺序调用，也可**单独触发**（支持单独更新某一部分）。

| 顺序 | 子技能 | 主要功能 | 子技能路径 | 单独触发命令 |
|------|--------|---------|---------|------------|
| 1 | **身份与当事人画像** | 采集执业角色/实体类型/事项类型/财产构成/痛点/可用集成资源 | `skills/cold-start-interview/identity-party-profile/SKILL.md` | `/family-legal:identity-party-profile` |
| 2 | **审查与代理立场** | 配置整体代理立场（离婚一方/某继承人/遗嘱人/中立）/协议审查严格度/诉讼倾向 | `skills/cold-start-interview/review-representation-stance/SKILL.md` | `/family-legal:review-representation-stance` |
| 3 | **敏感度与升级** | 配置家暴识别等级/未成年人利益/情绪危机/涉刑风险/强制升级矩阵 | `skills/cold-start-interview/sensitivity-escalation/SKILL.md` | `/family-legal:sensitivity-escalation` |
| 4 | **文书风格与地方规定** | 配置文书风格偏好/法院民政公证资源再确认/彩礼房产抚养费地方裁判口径 | `skills/cold-start-interview/style-local-rules/SKILL.md` | `/family-legal:style-local-rules` |

**顺序说明**：推荐按顺序完成完整访谈，但支持随时调用单个子技能更新特定配置部分。例如：只需更新代理立场时，直接调用 `/family-legal:review-representation-stance`，无需重跑完整访谈。

---

## 访谈结果填充说明

访谈结果**写入 `family-legal/CLAUDE.md`**（散文模板，非 YAML），支持：

- **完整重跑**：`/family-legal:cold-start-interview` 全量更新配置
- **单独更新**：调用任意子技能单独更新对应章节
- **直接编辑**：律师/法务可直接编辑 `family-legal/CLAUDE.md` 修改任何字段
- **git 版本控制**：`git log family-legal/CLAUDE.md` 查看历史版本；`git checkout HEAD~1 family-legal/CLAUDE.md` 回滚

---

## 婚姻家事敏感性说明

> **本节是婚姻家事插件最重要的特有配置，不可在访谈中省略。**

婚姻家事事项的高敏感度体现在三个维度：

**1. 当事人情绪护栏**

婚姻家事当事人常处于情绪危机（离婚冲突、丧亲悲痛、家暴恐惧、抚养争夺）。访谈过程须：

- 措辞**中立、克制、非煽动**，不替当事人作情绪化判断
- 不激化与对方的对立情绪
- 识别情绪危机信号（自我伤害语言/极度绝望）：**立即暂停访谈**，提示心理援助热线

**2. 家暴/人身安全/涉刑强制升级（不可省略）**

识别到家庭暴力、虐待、遗弃、涉刑情形时，敏感度护栏优先于一切其他配置：

- **家暴**：优先人身安全 → 提示人身安全保护令路径 → 强制升级律师 → 暂停访谈
- **涉刑**：暂停常规分析 → 强制升级刑事律师
- **以上护栏不可被代理立场配置覆盖**

**3. 未成年人利益最大化（不可省略）**

涉未成年子女事项须以「最有利于未成年子女」为首要原则（民法典第1084条，建议复核）。此原则不因代理立场改变，是所有 family-legal 技能的固定护栏。

**第3个子技能（sensitivity-escalation）专门固化这些护栏**，访谈时不可跳过。

---

## 法律依据（入口级汇总）

本编排入口主要用于配置访谈，引用说明：

- 「最有利于未成年子女」：民法典第1084条，建议复核 `[模型知识 — 需验证]`
- 家暴相关法律引用（入口级）：民法典第1079/1091条，建议复核；反家庭暴力法，具体条号 `[待验证]`
- 访谈填充目标：`family-legal/CLAUDE.md`；字段映射：`family-legal/skills/_shared/practice-profile-schema.md`
- 引用规范：`family-legal/skills/_shared/legal-basis-conventions.md`
