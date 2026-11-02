# Surface: 领域页与全部索引 (`docs/<plugin>/`, `docs/skills/`)

Visitor mode: Read - Targets: web 1280×800, 390×844 - Direction: 实务指引 + 批注栏 - Updated: 2026-11-01

## Thesis

律师在一分钟内找到要看的 skill：领域页按领域列出 skill 与配置、引用库；索引页跨领域按名称、命令、一句话过滤。

## Own-world

法规汇编的分编目录与总索引。

One memorable idea: 索引表的每一行就是一条可点的「条目」：名称、命令（等宽）、一句话、步骤数，无图标。

## Story

领域页：领域名与一句话 → skill 列表 → 概要 → 实践配置会改变什么 → 领域引用库 → 不做什么。索引页：搜索框 → 按领域分组的表。

## First viewport

- 1280：领域名、一句话、skill 列表前三行。索引页：搜索框与第一组。
- Above the fold: 1280×720 `h1, .search`；390×844 `h1, .search`。

## Form + seed

同 skill 页。搜索为纯客户端过滤，无 JS 时表仍完整显示。

## Finish line

- [ ] 索引页搜索「竞业」只剩竞业限制相关行，其余组标题隐藏
- [ ] 领域页 skill 行在 390 下仍是一行一个条目，命令可换行
