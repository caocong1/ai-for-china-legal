---
name: iterate-reference-sources
description: >
  对照 SOURCE_INDEX 钉选的 GitHub 参考仓库检查更新，按许可规则选择性合入本仓库技能与参考文档。
  在用户要求「继续迭代参考来源 / 看上游有没有更新 / 同步 claude-for-legal、cn-law-hub、Legal-Skills-Chinese」时使用。
---

# Iterate Reference Sources — 参考来源迭代

把外部法律技能仓库的**可移植方法论**合入本仓库，并保持 SHA 可追溯。不要把本技能当成「把别人的 SKILL.md 整文件拷进来」。

权威清单：`.planning/SOURCE_INDEX.md`  
上一轮差距：`.planning/research/UPSTREAM-GAP-*.md`

---

## 适用场景

- 用户说「继续迭代参考来源」「看看那些 GitHub 仓库有没有更新」
- 定期维护：对照钉选 SHA 与上游 HEAD
- 准备新增一个参考仓库到 SOURCE_INDEX

---

## 完整工作流

### 1. 读钉选表

读取 `.planning/SOURCE_INDEX.md`。记下每个源的 URL、SHA、许可、状态（持续跟踪 / 冻结登记 / 观察）、落地点。

冻结源（S3、S4）：`git ls-remote` 一次；SHA 未变则跳过 diff。观察源（S5）：默认不移植，只记录是否出现可独立抽取的大陆法方法论。

### 2. 对照上游 HEAD

对每个持续跟踪源执行：

```bash
git ls-remote https://github.com/<owner>/<repo>.git HEAD
```

| 结果 | 动作 |
|------|------|
| SHA 与表内一致 | 该源本轮不合入，在差距说明写「无新提交」 |
| SHA 变化 | 进入第 3 步 |
| 网络失败 | 重试最多 4 次；仍失败则在差距说明标注「未检出」，禁止假装已同步 |

需要看文件时浅克隆或 `git fetch` 到临时目录，**不要**把上游 `.git` 提交进本仓库。

### 3. 许可检查（先于阅读正文）

| 许可 | 允许 | 禁止 |
|------|------|------|
| Apache-2.0 | 改编后写入本仓库，注明 SOURCE_INDEX ID 与 SHA | 把上游工程路径、Codex 生成器、美国法默认值原样覆盖中国法护栏 |
| CC BY-NC-ND 4.0 | 读懂方法论后**自写**调度/纪律；本表引用 | 逐字复制 SKILL.md、清单、模板 |
| 未声明 / 仅 README | 吸收路由、何时使用、检查项（转述） | vendoring `scripts/`、爬虫、二进制、整目录技能包 |

本仓库范围：中国大陆成文法。港澳台新、全量场景包默认不合入。

### 4. 写差距说明

在 `.planning/research/` 新增或更新 `UPSTREAM-GAP-YYYY-MM.md`（或在旧文件追加「增量」一节）：

| 上游能力 | 本仓库现状 | 便携？ | 建议 |
|----------|------------|--------|------|
| … | … | 是/否 | 合入路径 / 跳过原因 |

只合入**便携**项：纪律、路由、门禁、调度。跳过：依赖上游独有连接器顺序且与本仓库冲突的内容、易过时的内置法条全文、与已有护栏重复的段落。

### 5. 选择性合入

原则：

- 改本仓库已有 skill / 参考文件，而不是平行再造一套同名技能（除非确是新横切能力，如研究闸门）
- 法规首选保持 `law-database`（flk）；案例首选 `rmfyalk` / `wenshu`；`yuandian` 保持兜底
- 刑事：脱敏 + 强制库核；不提供规避侦查的既有红线不得削弱
- 合同：新门禁接到 `commercial-legal/skills/contract-review/SKILL.md` 的共享资源加载
- 新共享 skill 须在 `scripts/setup-skills.sh` 注册，并更新 README / INSTALL 的 skill 计数
- JSON 保持 2 空格；Markdown 无尾空格、文件以换行结束

合入文件顶部或 SOURCE_INDEX 落地点必须能追溯到源 ID + SHA。

### 6. 回写 SOURCE_INDEX

每个有变更的源：

- 更新 HEAD SHA
- 分析版本 +0.1（小合入）或 +1.0（新源 / 许可策略变化）
- 钉选日期改为当天
- 「迭代记录」表追加一行：改了什么、跳过了什么

新增源必须补齐：URL、全名、内容摘要、许可、学习焦点、落地点、SHA。

### 7. 变更记录

`CHANGELOG.md` 的 `[Unreleased]` 写明：钉选/升级了哪些 SHA、合入了哪些纪律、明确未搬运什么。

---

## 与 integrate-external-skill 的分工

| 技能 | 用途 |
|------|------|
| `integrate-external-skill` | 把**本地/已知路径**的外部 skill 项目迁入（研究闸门首次迁入即此路径） |
| `iterate-reference-sources` | 按 **Git URL + 钉选 SHA** 检查公开仓库更新并选择性合入 |

不要用本技能覆盖 `skill-iter-tune` 那种「执行—评分—改提示词」闭环；那是另一类迭代。

---

## 完成定义

- SOURCE_INDEX 的 SHA 与本次 `git ls-remote` 一致（失败源已标注）
- 有差距说明
- 合入项可在 git diff 中对应到许可允许的改编，而非 ND 原文
- setup-skills / README 计数若有新共享 skill 已更新
