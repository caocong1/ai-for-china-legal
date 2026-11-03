---
version: alpha
name: AI for China Legal · Skill 说明站
description: 给执业律师读的 skill 实务指引网页：纸、墨、朱砂三种颜色角色，宋体标题、黑体正文、律师语言，右侧批注栏。
colors:
  surface: "#FCFAF7"
  surface-raised: "#F4F0EB"
  on-surface: "#2C2823"
  muted: "#524C44"
  outline: "#787067"
  primary: "#B4392C"
  on-primary: "#FFFFFF"
  error: "#B4392C"
  on-error: "#FFFFFF"
typography:
  display:
    fontFamily: "Songti SC, STSong, Noto Serif CJK SC, SimSun, Georgia, serif"
    fontSize: 40px
    fontWeight: 700
    lineHeight: "1.25"
    letterSpacing: 0px
  title:
    fontFamily: "Songti SC, STSong, Noto Serif CJK SC, SimSun, Georgia, serif"
    fontSize: 32px
    fontWeight: 700
    lineHeight: "1.25"
    letterSpacing: 0px
  heading:
    fontFamily: "Songti SC, STSong, Noto Serif CJK SC, SimSun, Georgia, serif"
    fontSize: 25px
    fontWeight: 700
    lineHeight: "1.25"
    letterSpacing: 0px
  body-md:
    fontFamily: "-apple-system, PingFang SC, Microsoft YaHei UI, Noto Sans CJK SC, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: "1.75"
    letterSpacing: 0px
  label-md:
    fontFamily: "-apple-system, PingFang SC, Microsoft YaHei UI, Noto Sans CJK SC, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: "1.5"
    letterSpacing: 0px
  code:
    fontFamily: "ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: 14px
    fontWeight: 400
    lineHeight: "1.5"
    letterSpacing: 0px
rounded:
  none: 0px
  control: 2px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  xxl: 64px
components:
  button-copy:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    typography: "{typography.label-md}"
    rounded: "{rounded.control}"
    padding: 12px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.control}"
    padding: 16px
  button-primary-hover:
    backgroundColor: "#A0362A"
    textColor: "{colors.on-primary}"
  note:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: 16px
---

# AI for China Legal · Skill 说明站

## Overview

像一本按条编号的实务操作指引，旁边留着给审稿律师写批注的空白。读者是执业律师，在办公室白天读一个 skill 页，边读边把意见发到微信；Read 模式。每页的一个记忆点是「批注栏」：每个步骤旁边浮着朱砂色的「请律师核对」条目，每条可一键复制成带编号的引用。系统的实现是 `docs/assets/site.css`（token 与组件都在那一个文件里），本文件描述它。

## Colors

克制（Restrained）：纸与墨承担一切，朱砂只标记批注——核对条目与页头批注栏的左线和标签、审阅编号、每页唯一的实心按钮（复制全部审阅条目）、当前导航与当前目录项；链接悬停与焦点环作为状态也用朱砂。频率预算：纸面与井格约 85%，墨色文字约 14%，朱砂不到 1%。没有第二个彩色，没有状态色；kind 标签用描边文字而非彩色。暗色不是反相：纸面换成暖黑（oklch 0.215），墨色换成暖白，朱砂换到 ramp 的 dark-600 做文字、dark-400 做实心按钮。

## Typography

标题宋体（Songti SC → STSong → Noto Serif CJK SC → SimSun → Georgia），只用于 ≥ 20px 的标题、站名、首页流程编号；正文系统黑体（-apple-system/PingFang SC → Microsoft YaHei UI → Noto Sans CJK SC），16px / 1.75，行长上限 38em；正文只用律师语言，标识（skill id、命令、文件路径）只出现在页末折叠的维护信息里，等宽。字号 14 / 16 / 20 / 25 / 32 / 40（导语与三级标题同为 20，靠字体、字重与颜色区分），字重 400 / 600 / 700。所有阅读文字（正文、批注、规则列表、表格、声明、术语表）为 16；14 只给界面部件（导航、面包屑、目录、按钮、说明、交叉引用、维护信息），两者在颜色和位置上也不同。标题 `font-synthesis-weight: none`：Windows 回退到只有一个字重的 SimSun 时不合成粗体。`lang="zh-Hans"`、`line-break: strict`、`text-autospace: normal`、`font-synthesis-style: none`（中文不斜体，强调用字重）。数字用 `tabular-nums`。

## Layout

内容宽 1200px，页边距 24px（手机 16px）。skill 页在 ≥ 1200px 为「目录栏 184px + 正文」两栏，目录栏粘性；每个步骤在 ≥ 1024px 为「步骤正文 + 批注栏 272px」两栏，批注与步骤顶端对齐；< 1024px 批注内联在步骤之后，< 1200px 目录折成井格里的两列。间距 4/8/12/16/24/32/48/64/96：段内 12，段间 16–24，节间 64，节标题下 16。

## Elevation & Depth

没有阴影，没有层级。只有两种面：纸（页面）与井格（表头、提示词底、窄屏目录）。暗色下井格比纸面更亮一级。

## Shapes

直角为主；只有控件（按钮、代码片、输入框、kind 标签）用 2px。边线 1px；批注左线 2px 朱砂；当前导航 2px 底线。

## Components

- 按钮 `.btn`：描边、2px 圆角、高 32px（触屏 44px）；每页唯一的实心按钮 `.btn-primary` 是审阅清单下的「复制全部审阅条目」（朱砂实心白字）；复制成功后文字变「已复制」并以朱砂描边 1.6 秒。
- 步骤 `.step`：编号「步骤 n」等宽灰字 + 宋体标题（去掉源文件自带的「第X步」）+ 可单独使用时的灰字标注 + 目标；DOM 顺序为 目标 → 批注 → 细节（做法、内置规则、法律依据、产出）；≥1024 用网格把批注放到右栏并与步骤顶端对齐。
- 批注 `.note`：2px 朱砂左线、「核对 n.k」朱砂小标、14px 次要文字、复制按钮。
- 审阅清单 `.review`：两位数朱砂编号、条目、复制按钮；底部「复制全部」「在 GitHub 提 issue」「怎么提意见」。
- 目录 `.toc`：2px 左线，当前项朱砂；「执行步骤」下列出步骤名（编号悬挂）；窄屏收进 `<details>`（「本页目录 · N 节」），宽屏常开。
- 页头批注栏 `.lead-notes`：宽屏在标题右侧、与步骤批注栏同列；写核对条数与审阅条数，各链到对应位置。
- 交叉引用 `.xref`：审阅条目下写「相关批注：核对 n.k」（按字符二元组重合度自动匹配：最佳 ≥ 0.45，其余 ≥ max(0.45, 0.6×最佳)）；匹配不到就不写，页内说明「自动匹配，可能不全」；不进复制的引用。
- 标题括注 `.h1-sub`：宽屏行内不折断，窄屏另起一行、20px。
- 文字：正文是律师语言，没有要特殊排版的标识；`[待验证]` 这类方括号标记与日期不折行；段落末尾六个汉字粘在一起，不留单字末行。
- 共用规则 `.refs`：中文名（链到所在领域页的引用库条目或对应的 skill、步骤）+ 一句说明。
- 维护信息 `.maint`：页末 `<details>`，默认收起；skill 标识、命令、源文件链接，14px 灰字，不编号、不进目录。
- 表 `.skill-list`：名称加粗 + kind 标签；手机下每行堆叠为块。
- 首页流程 `.flow`：宋体大号编号 + 标题 + 一句话。

## Do's and Don'ts

- Do 让每一页上的朱砂只出现在核对条目、复制/提意见按钮和当前导航。
- Do 把法条照原文保留《》与条号，带「待验证」的照原样显示。
- Do 把变量、方法、条件写成律师在所里说的话；技术机制写一句结果。
- Don't 用图标、emoji、阴影、彩色标签或卡片堆砌。
- Don't 在正文里出现文件名、命令、字段名、状态值、内部编号（校验脚本拦截），也不出现「子技能 / 路由 / 字段」这类开发者用语。
- Don't 让任何文字小于 14px。

## Motion

只有按钮与链接的颜色过渡 120ms linear；`prefers-reduced-motion: reduce` 下关闭。

## Modes and themes

浅色为默认，随系统进入深色（`color-scheme: light dark` + `light-dark()`），没有切换按钮。不支持 `light-dark()` 的引擎（Safari < 17.5、Chrome < 123、Firefox < 120，以及基于它们的微信等内置浏览器）由 `@supports not (color: light-dark(#000, #fff))` 块重新声明全部颜色角色，浅色与深色各一套；原色一律写成 hex，旧引擎也能解析。打印：隐藏导航、按钮、目录；批注内联；源文件链接后附地址。

## Contrast

color_tools.py 计算（WCAG 2.x），2026-11-01：

| Foreground | Background | Mode | Ratio | Use |
| --- | --- | --- | --- | --- |
| #2c2823 text | #fcfaf7 paper | light | 14.01 | 正文 |
| #2c2823 text | #f4f0eb well | light | 12.94 | 表头、提示词 |
| #524c44 text-2 | #fcfaf7 paper | light | 8.14 | 次要文字、批注 |
| #655e55 text-3 | #fcfaf7 paper | light | 6.13 | 说明、来源 |
| #655e55 text-3 | #f4f0eb well | light | 5.63 | 井格里的说明 |
| #b4392c accent | #fcfaf7 paper | light | 5.64 | 核对标签、编号、当前导航 |
| #b4392c accent | #f4f0eb well | light | 5.20 | 井格里的朱砂 |
| #ffffff on-accent-fill | #b4392c fill | light | 5.90 | 实心按钮 |
| #ffffff on-accent-fill | #a0362a fill-hover | light | 6.87 | 实心按钮悬停 |
| #787067 border-strong | #fcfaf7 paper | light | 4.66 | 控件边界（≥ 3） |
| #f1eeea text | #1c1915 paper | dark | 15.14 | 正文 |
| #e0d8cd text-2 | #1c1915 paper | dark | 12.40 | 次要文字 |
| #c9c1b7 text-3 | #25221e well | dark | 8.89 | 井格里的说明 |
| #ec8070 accent | #1c1915 paper | dark | 6.58 | 朱砂文字 |
| #ec8070 accent | #25221e well | dark | 5.95 | 井格里的朱砂 |
| #ffffff on-accent-fill | #b4392c fill | dark | 5.90 | 实心按钮 |
| #ffffff on-accent-fill | #a0362a fill-hover | dark | 6.87 | 实心按钮悬停 |
| #aaa298 border-strong | #1c1915 paper | dark | 6.95 | 控件边界 |

装饰细线 #c9c1b7（浅）/ #655e55（深）不承担边界，不计最低值。

## Not covered

- 没有搜索引擎级的全文检索，索引页只按名称、一句话和关键词过滤。
- 没有评论系统；意见经微信或 GitHub issue 回流。
- Windows 上标题宋体回退到 SimSun 的渲染未实测（已关闭合成粗体，SimSun 以常规字重显示）。
- 旧引擎回退块只在现代 Chromium 里强制开启验证过（关闭全部 `light-dark()` 后渲染与正常一致），未在真实旧版 iOS 微信里打开过。
