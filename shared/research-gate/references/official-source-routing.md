# 官方源十库路由

> 研究闸门在「按序检索」法规时使用本表，决定**去哪个官方库**，以及如何标注效力。
> 方法论参考 cn-law-hub（SOURCE_INDEX S6，SHA `af88c5592366439c7137944df18968dca7f77029`）。本文件只保留路由与纪律，**不包含**其爬虫或脚本。

**法规检索首选仍是本仓库 `law-database` 连接器（国家法律法规数据库 / flk）。** 下表补的是 flk 不收录或收录不全时的官方库。

---

## 何时用哪库

| 问题类型 | 首选官方源 | 本仓库工具 | 备注 |
|----------|------------|------------|------|
| 法律、法律解释、全国人大常委会决定；flk 已收录的行政法规/监察法规/地方性法规/司法解释 | 国家法律法规数据库 `flk.npc.gov.cn` | `law-database`：`search_laws` / `search_law_articles` / `get_law_detail` / `get_article_detail` / `verify_citations` | 动态 SPA，禁止假装 WebFetch 已拿到全文 |
| 部门规章、地方政府规章 | 国家规章库 `www.gov.cn/zhengce/xxgk/gjgzk` | WebSearch `site:gov.cn` + WebFetch；无专用连接器 | flk **不收录**规章，禁止只用 flk 下结论「没有这部规章」 |
| 行政法规对照核验 | 司法部国家行政法规库 `xzfg.moj.gov.cn` | WebFetch / WebSearch | 与 flk 交叉；冲突时陈述冲突并标 `待律师复核` |
| 国务院及各部门政策文件、通知、意见（不是法） | 国务院政策文件库 `sousuo.www.gov.cn/zcwjk` | WebSearch + WebFetch | 政策 ≠ 法律；引用时写明「政策文件」 |
| 双边/多边条约 | 外交条约库 `treaty.mfa.gov.cn` | WebSearch `site:treaty.mfa.gov.cn` + WebFetch | 涉外合同、国际私法、投资保护 |
| 税收规范性文件、公告、批复口径 | 税务法规库 `fgk.chinatax.gov.cn` | WebSearch `site:chinatax.gov.cn` + WebFetch | 涉税合规、虚开/逃税风险分析时强制走本库或标注未检索 |
| 生态环境法律/行政法规/规章 | 生态环境部 `www.mee.gov.cn/ywgz/fgbz/` | WebSearch `site:mee.gov.cn` + WebFetch | 不含环保标准全文库；标准须另标来源 |
| 司法解释、司法文件、最高法通知 | 最高人民法院发布栏目 `www.court.gov.cn/fabu/` | WebFetch（court.gov.cn 金牌 URL）+ `law-database` 交叉 | 案例库用 `rmfyalk`，不要和「发布栏目」混用 |
| 党内法规、党纪处分条例等 | 党内法规库 `www.12371.cn/special/dnfg/` | WebSearch + WebFetch | 仅在用户事项明确涉及党内法规时使用；不得把党规写成国家法律 |
| 国防/军事法规文库公开条目 | 国防部法规文库 `www.mod.gov.cn/gfbw/fgwx/` | WebSearch `site:mod.gov.cn` | 公开范围有限；找不到则标无法获取，禁止编造 |

指导性案例 / 参考案例走 `rmfyalk`；普通裁判文书走 `wenshu`。二者不是上表「法规库」。

---

## 效力状态纪律（强制）

1. 只有官方页面或 API **明确给出**效力字段时，才写「现行有效 / 已废止 / 已修改 / 尚未生效」。
2. 源站没有效力字段时，写「官方页面未明确标注效力状态」，并给出官方 URL、发布机关、发布日期、检索日期。
3. **禁止**因为文件能打开、发布年份近、或搜索摘要写「最新」就推断现行有效。
4. 同名多版本（修订前后、地方与国家重名）必须标歧义，核验修订、废止与施行日期后再引用。
5. 必须区分文件类型：法律、行政法规、地方性法规、规章、司法解释、司法文件、党内法规、政策文件、通知、条约、案例。禁止用「现行法律」统称所有官方文本。
6. 第三方汇编、律所年报、百科只作线索（L5），结论回到上表官方源。

---

## 与现有连接器的关系

```
法律/司法解释条文
  → law-database（flk）
  → 未命中规章：国家规章库
  → 未命中行政法规：司法部行政法规库
  → 引用核验：law-database verify_citations

案例
  → 指导/参考：rmfyalk
  → 普通文书：wenshu
  → 两者不可用：yuandian 兜底（积分耗尽则跳过）
```

专项缺口（条约 / 税务 / 生态环境 / 党内 / 国防 / 政策文件）按上表用 WebSearch + WebFetch，结果写入研究底稿「来源清单」，抓不到则写入「无法获取的来源及原因」。

---

## 可选：安装 cn-law-hub skill

本仓库**不内置**其采集脚本。若律师需要批量下载、跨库法条级爬取或官方 DOCX/PDF 归档，可在当前 Agent 环境**另行安装**：

https://github.com/ZongziForu/cn-law-hub

安装后仍须遵守本文件的效力纪律，且引用结论须能回溯到官方 URL。未安装时，按本表用 `law-database` + WebSearch/WebFetch 即可完成研究闸门，不得假装已跑其脚本。
