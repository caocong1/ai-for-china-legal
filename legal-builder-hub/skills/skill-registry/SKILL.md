---
name: skill-registry
description: 技能注册表编排入口——协调四个子技能（技能清单管理/版本发布管理/依赖解析/注册表查询与发布）完成技能的注册、版本管理和发布
argument-hint: "[操作类型：查询/发布/版本管理/依赖检查，及技能名称]"
---

# 技能注册表（编排入口）

> **新增模块**：skill-registry 是本次深化新增的编排模块，管理技能的注册、版本、依赖和发布全流程。

---

## 目的

提供技能注册表的完整管理能力：技能清单（SKILL.md/plugin.json）规范校验、语义化版本管理、依赖解析与冲突检测、注册表查询与技能发布。确保注册表中的技能元数据完整、版本可追溯、依赖可解析。

---

## 前置配置读取

**读取 `legal-builder-hub/CLAUDE.md` 以获取以下配置：**

| 配置字段 | 驱动的技能行为 |
|---------|--------------|
| 注册表类型（本地/组织/公共） | 注册表操作范围 |
| 注册表地址 | 远程注册表连接 |
| 发布审核流程 | 发布审批要求 |
| 用户角色 | 可执行的操作类型 |
| 技术背景 | 操作指导详细程度 |

**配置缺失或 PLACEHOLDER 时 — 临时模式** `[临时模式]`：

> - **注册表类型**：本地注册表
> - **发布审核**：人工审核
> - **建议用户运行** `/legal-builder-hub:cold-start-interview` 完善配置

---

## 子技能编排顺序

| 步骤 | 子技能 | 做什么 | 子技能路径 | 单独触发命令 |
|------|-------|-------|----------|------------|
| 1 | **技能清单管理** | 校验和生成 SKILL.md/plugin.json 文件；确保元数据格式合规、字段完整 | `legal-builder-hub/skills/skill-registry/skill-manifest-management/SKILL.md` | `/legal-builder-hub:skill-manifest-management` |
| 2 | **版本发布管理** | 管理语义化版本号（SemVer）；执行版本升降级；生成变更日志；执行发布流程 | `legal-builder-hub/skills/skill-registry/version-release-management/SKILL.md` | `/legal-builder-hub:version-release-management` |
| 3 | **依赖解析** | 解析技能的依赖关系树；检测版本冲突；验证兼容性；生成依赖报告 | `legal-builder-hub/skills/skill-registry/dependency-resolution/SKILL.md` | `/legal-builder-hub:dependency-resolution` |
| 4 | **注册表查询与发布** | 在注册表中搜索技能元数据；发布新版本到注册表；管理发布状态 | `legal-builder-hub/skills/skill-registry/registry-search-publish/SKILL.md` | `/legal-builder-hub:registry-search-publish` |

> **流程说明**：技能开发者发布流程：步骤 1 → 步骤 2 → 步骤 3 → 步骤 4。
> 技能使用者查询流程：直接触发步骤 4 查询。
> 各子技能可**单独触发**。

---

## 入口级护栏

### 1. 元数据完整性

- 发布到注册表的技能须具备完整的元数据（SKILL.md + plugin.json 中的技能注册）
- 元数据不完整的技能不得发布到公共注册表
- 本地注册表可接受开发中版本（标注 `[开发中]`）

### 2. 版本规范

- 版本号须遵循语义化版本（SemVer）：MAJOR.MINOR.PATCH
- MAJOR 版本升级表示不兼容变更
- MINOR 版本升级表示向后兼容的功能新增
- PATCH 版本升级表示向后兼容的问题修复

### 3. 发布安全

- 发布前须确保技能已通过安全审查
- 发布后不可覆盖已发布版本（只能发布新版本号）
- 发布操作须记录审计日志
- 撤销发布须标注原因并通知已安装用户

### 4. 依赖管理

- 技能须声明所有外部依赖（其他技能/库/工具）
- 依赖版本须使用范围声明（如 `>=1.0.0 <2.0.0`），不使用精确版本锁定
- 循环依赖禁止
- 依赖项的许可证兼容性须检查

---

## 与其他模块的衔接

| 需求 | 推荐触发的模块 |
|------|--------------|
| 发布前安全审查 | → `/legal-builder-hub:security-review` |
| 安装已发布技能 | → `/legal-builder-hub:installation` |
| 发现新技能 | → `/legal-builder-hub:skill-discovery` |

---

## 法律依据

| 法律依据 | 核心规则 | 适用场景 |
|---------|---------|---------|
| 《著作权法》（2021年修正） | 软件作品著作权保护 | 技能代码与文档的著作权声明 |
| 《个人信息保护法》（2021年）第13条 | 注册表收集开发者信息须有合法性基础 | 开发者注册信息 |
| 平台技术规范 | SKILL.md/plugin.json 格式规范 | 元数据校验 |

> **引用规范**：`legal-builder-hub/skills/_shared/legal-basis-conventions.md`
> **引用库**：`legal-builder-hub/skills/_shared/skill-hub-citations.md`
