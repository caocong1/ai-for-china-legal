---
name: recover-uncommitted-work
description: 从上一个 AI 会话恢复并提交未提交的工作，按逻辑分组组织提交
source: auto-skill
extracted_at: '2026-06-08T07:00:48.732Z'
---

# 恢复未提交工作 — 从上一个 AI 会话继续

当上一个 AI 会话因达到限制而中断，留下大量未提交的更改时，恢复并提交这些工作。

## 适用场景

- 用户说"继续完成上一个会话的工作"或"读取 XXX session 继续"
- 上一个 AI 会话达到 token/context 限制，未完成提交
- Git 状态显示大量未跟踪和修改的文件
- 需要理解上一个会话做了什么并继续完成

## 完整工作流

### 第一步：定位并读取上一个会话文件

**找到会话文件**：
```bash
# Claude 会话文件位置
find ~/.claude/projects -name "*session-id*" -type f 2>/dev/null
# 或搜索最近的 JSONL 文件
find ~/.claude/projects -name "*.jsonl" -mmin -60 | head -5
```

**读取会话尾部**（了解最后的工作状态）：
```bash
# 查看文件行数
wc -l session-file.jsonl
# 读取最后 50-100 行了解上下文
tail -100 session-file.jsonl | jq -r '.message.content // .toolUseResult.stdout // empty'
```

从会话中提取：
- 最后完成的工作（哪个 phase/plan）
- 正在进行的工作（被中断的任务）
- 待完成的工作（计划中但未开始）
- 使用的 commit 消息风格

### 第二步：检查当前 Git 状态

```bash
# 查看未提交更改的规模
git status --short | wc -l
git status --short | grep "^??" | wc -l  # 未跟踪文件
git status --short | grep "^ M" | wc -l   # 修改文件

# 按目录分组查看
git status --short | awk '{print $2}' | cut -d/ -f1 | sort | uniq -c

# 查看最近的 commit 了解 commit 风格
git log --oneline -10
```

### 第三步：理解项目结构和组织方式

**读取项目规划文件**：
```bash
cat .planning/ROADMAP.md          # 里程碑和阶段
cat .planning/STATE.md            # 当前状态
ls .planning/phases/              # 各阶段目录
```

**理解工作组织方式**：
- 项目按什么维度组织（phase/feature/module）
- 每个 phase 包含什么（plan/summary/skills/config）
- commit 消息的约定（前缀、语言、格式）

### 第四步：按逻辑分组提交

**分组原则**：
1. **按 phase/feature 分组** — 每个 phase 一个或多个 commit
2. **按功能层次分组** — 基础设施 → 核心功能 → 配置/文档
3. **保持 commit 原子性** — 每个 commit 应该是独立可理解的

**典型分组模式**（多阶段项目）：
```bash
# 对每个 phase：
# 1. 基础设施（引用脊柱、配置模板、共享文件）
git add phase-X/skills/_shared/ phase-X/CLAUDE.md
git commit -m "feat(X): 建立引用脊柱 + CLAUDE.md + _shared"

# 2. 核心技能拆分
git add phase-X/skills/*/SKILL.md phase-X/skills/*/*/
git commit -m "feat(X): 拆分 skill-a/skill-b/skill-c 为子技能"

# 3. 注册和升级
git add phase-X/.claude-plugin/plugin.json
git commit -m "feat(X): 注册 N 技能升级 plugin.json 到 0.X.0"
```

**Commit 消息约定**：
- 使用项目已有的风格（中文/英文、前缀格式）
- `feat(X):` 新功能
- `fix(X):` 修复
- `docs(X):` 文档更新
- 保持与历史 commit 一致

### 第五步：更新跟踪文档

```bash
# 更新 ROADMAP.md
# - 标记已完成的 phase
# - 补充 plan 详情（如果有）
git add .planning/ROADMAP.md
git commit -m "docs: 更新 ROADMAP — 标记 phases X-Y 完成"
```

### 第六步：验证完整性

```bash
# 确认所有更改已提交
git status --short  # 应该为空

# 验证每个模块的完整性
for d in module-a module-b module-c; do
  echo "$d: $(find $d/skills -name SKILL.md | wc -l) skills, $(test -f $d/CLAUDE.md && echo 'CLAUDE.md=yes' || echo 'CLAUDE.md=NO')"
done

# 验证 JSON 文件有效性
for f in */.claude-plugin/plugin.json; do
  python3 -c "import json;json.load(open('$f'))" && echo "$f: valid" || echo "$f: INVALID"
done

# 查看本次恢复的 commit 数量
git log --oneline -20 | wc -l
```

## 关键决策点

| 决策 | 原则 |
|------|------|
| 如何分组 commit | 按 phase/feature，保持原子性 |
| commit 消息语言 | 跟随项目已有风格 |
| 是否需要验证 | 必须验证 JSON 有效性和文件完整性 |
| 如何处理部分完成的工作 | 从会话文件推断意图，完成或标记为 TODO |

## 常见陷阱

- **不要盲目提交** — 先理解每个文件的用途和所属 phase
- **不要混合不同 phase 的更改** — 保持 commit 的清晰边界
- **不要忘记更新跟踪文档** — ROADMAP/STATE 需要反映最新状态
- **不要忽略验证** — JSON 无效或文件缺失会导致后续问题

## 输出格式

完成后输出摘要：

```
## 恢复完成

从上一个会话恢复了 N 个 commit：

| Phase | 提交内容 |
|-------|----------|
| X     | 基础设施 + 技能拆分 + 注册 |
| Y     | ... |

最终状态：
- 插件数量：N
- 技能总数：N
- JSON 有效性：全部通过
- Git 状态：干净
```
