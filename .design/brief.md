# Brief: Skill 说明站, round 1

**Design read.** 理解为：给执业律师看的一本「skill 实务操作指引」网页版，律师在工作间隙读 10–20 分钟然后用微信回复意见：严谨、可核对、可批注；遵循法律文书与实务手册的惯例，不求新，因为读者每天读的就是这种东西，信任与清晰比辨识度重要。模式：full（首页、领域页、skill 页、索引页、反馈页）。力度：standard+（token、看参考、新上下文评审、一轮修正；不出方案板，因为用户不在线且已选定惯例路线）。

**Referent.** 像一本按条编号的活页实务操作指引，旁边留着给审稿律师写批注的空白：条目有编号、依据有出处、要核对的地方用朱笔标出；不是软件产品的功能介绍页。

**Scene.** 律师在办公室 24 寸显示器或笔记本上白天阅读，偶尔在手机微信里打开；一次读一个 skill 页，边读边把要说的意见发到微信。浅色为默认；跟随系统提供深色。

## Attributes

- 可核对，不是营销式包装：每条规则能追到源文件，数字与法条逐字保留
- 条理分明，不是卡片堆砌：编号、层级、表格，少用框
- 克制，不是多彩：一个强调色（朱砂）只给「律师核对点」与反馈入口
- 中文排版讲究，不是西文模板套中文：宋体标题、黑体正文、禁则、全角标点、等宽英文
- 可打印、可在微信里读，不是只在宽屏好看

## Content

- Available: `docs/data/skills/parts/*.json`（子代理从 SKILL.md 提炼的律师版摘要）、仓库 README / CHANGELOG 的事实、GitHub 源文件链接
- Missing: 无截图、无客户材料；不需要图片

## Constraints for this round

- 纯静态；Python 标准库生成；无外部字体；相对链接
- 一处 CSS、一处 JS；JS 只做复制引用、搜索过滤、目录高亮，去掉 JS 页面仍完整

## References

| Reference | Liked or disliked | What to take or avoid, and why |
| --- | --- | --- |
| 最高法司法解释文本、法律出版社法规汇编 | liked | 条号编号、依据随条、克制的版式 |
| design-skill-lab 的 Skill 套件页 | liked | 工序图 + 分段讲一个 skill；但不照搬其「字架」方向与配色 |
| 通用 SaaS 文档站（左栏树 + 紫色 hero + 图标卡） | disliked | 读者是律师，不是开发者；卡片堆砌降低信任 |

## Deliverables

`docs/` 全站：首页、13 个领域页、1 个共享流程页、69+4 个 skill 页、全部 skill 索引、提意见页；`docs/assets/site.css`、`site.js`；生成器 `scripts/build-docs-site.py`；1280 与 390 截图、lint、对比度矩阵、新上下文评审报告。

## Assumptions

| Assumption | Changes the direction if false? |
| --- | --- |
| 律师主要在电脑上读，手机为次 | no（两端都做） |
| 意见通过微信转述给操作员，不直接用 GitHub | no（两条路都给） |
| Windows 上宋体回退到 SimSun 可接受（仅用于 ≥ 24px 标题） | no（标题可整体换黑体） |

## Questions

无。用户不在线，按上述假设推进并写进 decisions.md。
