# Critic brief: AI for China Legal · Skill 说明站, round 1

You are a fresh design critic. Load the critique-design skill (`<design-skill-lab>/skills/critique-design/SKILL.md`)
and follow mode `fresh`. You have not seen how this was made; do not ask. Judge only what the files below show, against the brief and the contracts. Write findings in Chinese (the user's language).

Repo root: `<repo>` (all paths below are relative to it unless absolute).

## Read first

| File | Why |
| --- | --- |
| `.design/PRODUCT.md` | who uses it, their jobs, targets, constraints |
| `.design/brief.md` | the design read, referent, scene, "X, not Y" attributes |
| `.design/surfaces/skill.md`, `.design/surfaces/home.md`, `.design/surfaces/catalog.md` | the contracts: thesis, own-world, story, first viewport, finish line |
| `<design-skill-lab>/skills/critique-design/references/rubric.md` | floor, anchors, gate |
| `.design/system/DESIGN.md` | only to check drift from the system; its prose is not evidence |

## Screenshot manifest (fresh)

Capture set: `.design/shots/final/`, `capture_id` 20261102T044258Z-a687 (frozen). Cite it in every finding. A contact sheet is at `.design/shots/final/contact-sheet.png`. Files are `<route>-<state>-<W>x<H>-<theme>.png`.

| Priority | File | Surface | State | Size @ scale | Theme | What it shows, what to look at |
| --- | --- | --- | --- | --- | --- | --- |
| first | `skill-top-default-1280x800-light.png` | skill 页（商事合同/合同审查） | top | 1280×800 @2 | light | 页头：名称、命令、一句话、概要；左目录栏 |
| first | `skill-steps-default-1280x800-light.png` | skill 页 | scrolled to #steps | 1280×800 @2 | light | 执行步骤：步骤正文与右侧「请律师核对」批注栏是否对齐、可读 |
| first | `skill-steps-default-390x844-light.png` | skill 页 | #steps | 390×844 @2 | light | 窄屏：步骤与内联批注；命令是否折行合理；无横向滚动 |
| first | `home-default-1280x800-light.png` | 首页 | top | 1280×800 @2 | light | 第一屏：站名、一句话、声明、流程第一步 |
| | `home-default-390x844-light.png` | 首页 | top | 390×844 @2 | light | 窄屏首屏 |
| | `home-default-1280x800-dark.png` | 首页 | top | 1280×800 @2 | dark | 深色重映射 |
| | `skill-top-default-390x844-light.png` | skill 页 | top | 390×844 @2 | light | 窄屏页头与目录 |
| | `skill-top-default-1280x800-dark.png` | skill 页 | top | 1280×800 @2 | dark | 深色 |
| | `skill-steps-default-1280x800-dark.png` | skill 页 | #steps | 1280×800 @2 | dark | 深色批注栏 |
| | `skill-steps-default-390x844-dark.png` | skill 页 | #steps | 390×844 @2 | dark | 深色窄屏 |
| | `skill-review-default-1280x800-light.png` | skill 页 | #review | 1280×800 @2 | light | 审阅清单与复制、提 issue 按钮 |
| | `skill-review-default-390x844-light.png` | skill 页 | #review | 390×844 @2 | light | 窄屏审阅清单 |
| | `index-default-1280x800-light.png` | 全部 skill 索引 | top | 1280×800 @2 | light | 搜索框与分组表 |
| | `index-default-390x844-light.png` | 索引 | top | 390×844 @2 | light | 表在窄屏的堆叠 |
| | `plugin-default-1280x800-light.png` | 领域页（商事合同） | top | 1280×800 @2 | light | 概要与 skill 一览 |
| | `plugin-default-390x844-light.png` | 领域页 | top | 390×844 @2 | light | 窄屏 |
| | `feedback-default-1280x800-light.png` | 怎么提意见 | top | 1280×800 @2 | light | 提意见格式示例 |
| | `feedback-default-390x844-light.png` | 怎么提意见 | top | 390×844 @2 | light | 窄屏 |
| | `shared-intake-default-1280x800-light.png` | 共享流程 skill 页（动态 intake） | #steps | 1280×800 @2 | light | 另一类 skill 页的步骤与批注 |
| | `shared-intake-default-390x844-light.png` | 共享流程 skill 页 | #steps | 390×844 @2 | light | 窄屏 |

Designed in build, no design shot: all (this is a static site; judge against the contracts). Build stamp: none (static files); the capture report records each file's source sha256.
You may open the pages yourself at `docs/**/index.html` (file://) to tab through focus, test hover and 200% zoom, and walk the primary task: 「读一个 skill 页，找到一条内置假设，复制它的引用」.

## Claims to verify

Mark each `kept`, `partial` or `missing`.

- 在 1280 的 skill-steps 截图里，步骤 1 的标题、做法列表和右侧第一条「请律师核对」同时可见，核对条目与该步骤顶端对齐。
- 390 下没有横向滚动；最长命令不在 token 中间折行。
- 页面上朱砂色只出现在核对点标记（左线与「核对 n.k」标签、审阅编号）、复制/提意见按钮和当前导航三处。
- 法律依据保留《》与条号，带 [待验证] 的照原样显示。
- 首页第一屏能读到「草稿，需律师审查」的声明和流程第一步。
- 深色模式是重映射而不是反相；文字对比度 ≥ 4.5:1。
- 索引页表在 390 下每行仍是一个可读条目。

## Track B: open only after your Track A findings are written down

- `lint.mjs` output: `.design/critique/2026-11-01-site/lint-skill.txt`, `lint-home.txt`, `lint-index.txt`（已跑：1280 与 390、light 与 dark）
- Contrast matrix: `.design/critique/2026-11-01-site/matrix.txt`（`color_tools.py matrix --from docs/assets/site.css --mode both`）。矩阵把 `--p-paper*` 原色也列成了背景列：浅色文字对深色原色（或反之）的 FAIL 不是页面上会出现的配对；每种模式只看 `--color-bg` / `--color-well` / `--color-accent-subtle` 三列。实心按钮是 `--color-on-accent-fill` 白字压 `--color-accent-fill` / `--color-accent-fill-hover`。
- Capture log: `.design/shots/final/capture-report.json`

## Not included, on purpose

The conversation, the reasoning in decisions.md, drafts, and the author's own scores or opinion of the work. If a judgement seems to need them, write the finding anyway and mark it `needs confirmation`.

## Return

- Write `.design/critique/2026-11-01-site/report.md` from `<design-skill-lab>/skills/critique-design/templates/critique-report.md`, in Chinese; one crop per finding (`NN-<slug>.png`) in the same folder (crop with Python PIL if available, otherwise name the source shot and region).
- Put the disposition first in your reply (`ship`, `fix`, `rebuild` or `recapture`), then at most eight material fixes in order, then the rubric scores.
- Budget: cover every `first` row, then the rest; stop at 60 tool calls and report what was not looked at. Do not modify anything under `docs/` or `scripts/`.
