---
name: skill-manifest-management
description: 技能清单管理——校验和生成 SKILL.md/plugin.json 文件，确保元数据格式合规、字段完整，符合平台技术规范。可单独触发：/legal-builder-hub:skill-manifest-management
argument-hint: "[技能路径或操作类型：校验/生成/修复]"
---

# 技能清单管理（skill-manifest-management）

> **所属编排**：`legal-builder-hub/skills/skill-registry/SKILL.md`（技能注册表）
> **分工说明**：本子技能负责技能元数据文件的规范校验和生成。版本管理由 `version-release-management` 处理；依赖解析由 `dependency-resolution` 处理；注册表操作由 `registry-search-publish` 处理。
> **可单独触发**：`/legal-builder-hub:skill-manifest-management`

---

## 目的

确保技能的清单文件（SKILL.md 和 plugin.json 中的技能注册条目）符合平台技术规范：格式正确、必填字段完整、命名规范合规、描述清晰。为技能发布提供元数据质量保障。

---

## 前置

1. **获取技能文件路径** — 技能目录路径
2. **加载平台技术规范** — SKILL.md 格式规范、plugin.json 格式规范
3. 本子技能可读取和修改技能元数据文件

---

## SKILL.md 规范校验

### 必填结构

| 检查项 | 要求 | 校验规则 |
|-------|------|---------|
| YAML frontmatter | 须存在且格式正确 | 以 `---` 开头和结尾的 YAML 块 |
| `name` 字段 | 须存在且符合命名规范 | 小写字母和连字符（kebab-case） |
| `description` 字段 | 须存在且非空 | 不超过 200 字；中文或英文 |
| `argument-hint` 字段 | 建议存在 | 参数提示信息 |
| 一级标题 | 须存在 | 以 `# ` 开头的标题 |
| 目的章节 | 须存在 | `## 目的` 或 `## Purpose` |
| 工作流章节 | 须存在 | `## 工作流` 或 `## Workflow` |
| 输出章节 | 须存在 | `## 输出` 或 `## Output` |

### 命名规范

```
✅ 正确：contract-review, pia-generation, skill-search-browse
❌ 错误：ContractReview, contract_review, contract.review
```

### 描述质量

| 检查项 | 说明 |
|-------|------|
| 长度适中 | 50-200 字；能清晰说明技能功能 |
| 包含关键信息 | 功能描述 + 适用场景 |
| 不含占位符 | 不得包含 `TODO`、`PLACEHOLDER` 等 |

---

## plugin.json 规范校验

### 插件级字段

| 字段 | 必填 | 校验规则 |
|------|------|---------|
| `name` | 是 | kebab-case；与目录名一致 |
| `version` | 是 | 语义化版本格式（MAJOR.MINOR.PATCH） |
| `description` | 是 | 非空；简明描述插件功能 |
| `author` | 是 | 包含 `name` 字段 |
| `skills` | 是 | 数组；每个元素包含 `name`、`path`、`description` |

### 技能注册条目

| 字段 | 必填 | 校验规则 |
|------|------|---------|
| `name` | 是 | kebab-case；与 SKILL.md 中 name 一致 |
| `path` | 是 | 相对于插件根目录的路径；文件须存在 |
| `description` | 是 | 非空；简明描述技能功能 |

### 路径验证

- `path` 指向的 SKILL.md 文件必须存在
- 子技能的 `path` 须正确指向子目录中的 SKILL.md
- 共享文件的 `path`（如 `_shared/` 下的文件）不须注册在 skills 数组中

---

## 校验报告

```markdown
## 技能清单校验报告

**技能目录**：[路径]
**校验日期**：[日期]

### SKILL.md 校验

| 检查项 | 结果 | 说明 |
|-------|------|------|
| YAML frontmatter | ✅ / ❌ | [说明] |
| name 字段 | ✅ / ❌ | [值] |
| description 字段 | ✅ / ❌ | [值/问题] |
| 命名规范 | ✅ / ❌ | [值] |
| 目的章节 | ✅ / ❌ | [说明] |
| 工作流章节 | ✅ / ❌ | [说明] |
| 输出章节 | ✅ / ❌ | [说明] |

### plugin.json 校验

| 检查项 | 结果 | 说明 |
|-------|------|------|
| 必填字段 | ✅ / ❌ | [缺失字段] |
| 版本号格式 | ✅ / ❌ | [值] |
| 技能路径存在 | ✅ / ❌ | [路径] |
| name 一致性 | ✅ / ❌ | [SKILL.md vs plugin.json] |

### 综合结论

**结论**：[✅ 全部通过 / ⚠️ 存在问题（可修复）/ ❌ 严重问题]

**须修复项**：
- [ ] [修复项1]
- [ ] [修复项2]
```

---

## 自动生成与修复

### 生成 SKILL.md 骨架

对于新建技能，可按规范生成骨架文件：

```markdown
---
name: [技能名称]
description: [技能描述]
argument-hint: "[参数提示]"
---

# [技能标题]

## 目的

[技能目的说明]

## 前置

[前置条件]

## 工作流

1. [步骤一]
2. [步骤二]
3. [步骤三]

## 输出

[输出说明]
```

### 自动修复

| 问题类型 | 可自动修复 | 修复方式 |
|---------|-----------|---------|
| 缺少 YAML frontmatter | 是 | 生成基础 frontmatter |
| 命名不规范 | 是（须确认） | 转换为 kebab-case |
| 缺少章节 | 是 | 添加章节占位符 |
| 路径不一致 | 否 | 须手动修复 |
| 描述含占位符 | 否 | 须开发者补充 |

---

## 边界条件

| 情形 | 处理方式 |
|------|---------|
| SKILL.md 不存在 | 提示创建；提供骨架生成 |
| plugin.json 格式错误（非法 JSON） | 报告解析错误位置；建议修复 JSON 语法 |
| 技能名称冲突 | 提示已存在同名技能；建议使用不同名称 |
| 描述为空 | 阻止发布；要求补充描述 |

---

## 法律依据

| 法律依据 | 核心规则 | 适用场景 |
|---------|---------|---------|
| 平台技术规范 | SKILL.md/plugin.json 格式规范 | 元数据校验标准 |
| 《著作权法》（2021年修正） | 技能命名和描述不侵犯他人著作权 | 命名冲突检查 |

> **引用规范**：`legal-builder-hub/skills/_shared/legal-basis-conventions.md`
> **引用库**：`legal-builder-hub/skills/_shared/skill-hub-citations.md`
