# Surface: 首页 (`docs/`)

Visitor mode: Read - Targets: web 1280×800, 390×844 - Direction: 实务指引 + 批注栏 - Updated: 2026-11-01

## Thesis

第一屏说清这套工具是什么、输出都是待律师审查的草稿、一个事项怎么走；向下滚动能进到任一领域或任一 skill。

## Own-world

实务指引的目录页：先讲总则（流程），再分编（领域）。

One memorable idea: 「一个事项怎么走」的纵向流程：总路由 → 动态 intake → 研究闸门 → 专项 skill → 交付 QA，每一步链接到共享流程页。

## Story

站名与声明 → 一个事项怎么走（六步，标题用律师的词，原名放括号）→ 十三个领域（名称、一句话、skill 数）→ 怎么读一个 skill 页 → 标记与术语 → 怎么提意见。

## First viewport

- 1280：站名、一句话、免责声明、流程第一步。
- 390：站名、一句话、免责声明。
- Above the fold（`lint.mjs --above-fold` 实测）: 1280×800 `h1, .notice, .flow > li:first-child`；390×844 `h1, .notice`。

## Form + seed

同 skill 页。领域列表用表格式行，不用图标卡。

## Finish line

- [ ] 1280 第一屏内读到「草稿，需律师审查」的声明与流程第一步
- [ ] 领域列表 13 行，每行名称可点、有 skill 数
- [ ] 390 下流程五步纵向排列，无横向滚动
