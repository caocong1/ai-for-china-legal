---
name: integrate-external-skill
description: 从外部 skill 项目汲取可复用能力，整合到当前项目
source: auto-skill
extracted_at: '2026-06-03T08:08:07.477Z'
---

# Integrate External Skill — 整合外部项目能力

将外部 skill 项目（如独立开发的原型、测试项目）中的可复用能力，整合到当前主项目中。

## 适用场景

- 用户说"继续迭代这个项目，你读取一下 XXX 项目，看其中是否有合适可以汲取的东西"
- 需要将一个已完成但独立的项目能力迁移到主项目
- 两个项目有相似的目标和受众（如都是中国法律 AI 项目）

## 完整工作流

### 第一步：深度探索两个项目

**外部项目**：
1. 读取 README.md、PROJECT.md 等顶层文档理解项目目的
2. 探索 skills/ 目录结构，理解架构设计
3. 读取关键 SKILL.md 文件，理解核心工作流
4. 读取 references/ 目录，理解知识库和配置
5. 查找测试材料、学习资料（forward-tests、evaluation）
6. 列出：架构模式、核心能力、独特设计、实测验证过的内容

**当前项目**：
1. 列出所有现有插件和 skill
2. 读取现有核心 skill 的结构
3. 理解当前项目的边界和能力差距
4. 读取 .planning/ROADMAP.md 和 PROJECT.md 了解里程碑状态

### 第二步：对比分析与能力映射

创建对比表：

| 能力 | 外部项目 | 当前项目 | 差距 |
|------|----------|----------|------|
| 研究闸门 | ✅ 强制检索前置 | ❌ 无 | 大 |
| 质量闸门 | ✅ Hard/Soft Gate | ⚠️ 简单检查 | 中 |
| 搜索策略 | ✅ 6 套 playbook | ❌ 无 | 大 |
| 权威来源库 | ✅ 实测 URL | ❌ 无 | 大 |
| 主体资格陷阱 | ✅ 7 类主体清单 | ❌ 无 | 中 |

### 第三步：确定整合范围

与用户确认整合范围（全量/仅核心/仅最核心/先看计划），基于：
- 外部项目中有哪些是**经过实测验证**的（vs 纯设计）
- 当前项目中最急需补齐的差距
- 整合对现有 skill 的侵入程度

### 第四步：创建新文件（Phase A — 共享基础设施）

1. **创建目录结构**
   ```bash
   mkdir -p shared/research-gate/references
   mkdir -p shared/references
   mkdir -p learning-materials/case-name/{case-materials,prompts,evaluation,forward-tests}
   ```

2. **核心 SKILL** — 基于外部项目的路由/入口 skill
   - 保留核心工作流逻辑
   - 简化路径引用（从绝对路径改为相对路径）
   - 添加对 references/ 的引用

3. **References** — 知识库和配置
   - 质量闸门定义
   - 搜索策略 playbook
   - 权威来源列表
   - 引用策略和失败回退链
   - 文书结构模板
   - 特定案件类型的专用 playbook

4. **测试框架**（如外部项目有实测材料）
   - 案例 README（背景、失败样本、正确方向）
   - Gold Rubric（评估标准）
   - Forward Tests（回归测试记录）
   - Prompts（测试提示词集合）

### 第五步：增强现有 skill（Phase B）

对每个需要增强的现有 skill：
1. 在 description 中添加前置条件说明
2. 添加"前置：加载共享资源"章节
3. 引用 shared/ 中的相关文件
4. 添加硬门禁要求（如证据分组、主体资格核查）

### 第六步：更新文档

1. 更新 .planning/PROJECT.md — 新增里程碑记录
2. 更新 CLAUDE.md（如果存在共享基础设施说明）

### 第七步：提交和推送

```bash
git add <新增和修改的文件>
git commit -m "feat(vX.X): integrate from <外部项目名>

- shared/research-gate/ — 研究闸门
- shared/references/ — 共享模板和 playbook
- learning-materials/ — 测试框架
- 增强 <plugin> skills

Source: <外部项目名>, tested against <如果有实测案例>"
git push
```

## 关键决策点

| 决策 | 原则 |
|------|------|
| 什么值得整合 | 必须是**经过实测验证**的，不是纯设计 |
| 引用路径 | 使用相对路径（从当前项目根目录） |
| 冲突处理 | 外部项目的方案 + 当前项目的适配 |
| 文档 | 每个新文件都要有清晰的用途说明 |

## 验证清单

- [ ] 新文件结构一致、互相引用正确
- [ ] 现有 skill 正确引用了 shared/ 资源
- [ ] PROJECT.md 已更新里程碑
- [ ] 已提交并推送到远程仓库
