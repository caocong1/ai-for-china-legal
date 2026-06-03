# 中国大陆法律源 — 实测可访问性与引用策略

**验证日期**: 2026-05-26
**验证环境**: WebFetch（HTML → markdown）+ WebSearch（headless Linux）

---

## 1. 法律源优先级

| 级别 | 类型 | 首选源 | 抓取方式 | 状态 |
|------|------|--------|----------|------|
| L1 | 法律/司法解释全文 | `www.court.gov.cn/zixun/xiangqing/{id}.html` | WebFetch | ✅ 全文可抓 |
| L1 | 行政法规/部门规章 | `www.gov.cn/gongbao/.../content_{id}.html` | WebFetch | ⚠️ 已索引，待直测 |
| L1(备份) | 法律法规 | `flk.npc.gov.cn` | ❌ 不可直接抓 | 动态 SPA |
| L2 | 入库案例 | `rmfyalk.court.gov.cn` | WebFetch 首页✅ | ⚠️ 详情页待测 |
| L2 | 指导/公报/典型案例 | `www.court.gov.cn/shenpan/gengduo/` 等 | WebFetch | ✅ |
| L3 | 裁判文书网 | `wenshu.court.gov.cn` | ❌ 维护中 | 转地方法院 |
| L3(替代) | 地方法院公开判决 | 各省高院/中院/金融法院官网 | WebFetch + site: | ✅ |
| L4 | 监管文件 | `www.gov.cn`、各监管局 | WebFetch + site: | ✅ |
| L5 | 律所文章 | zhonglun.com, junhe.com, grandall.com.cn | WebFetch | ⚠️ 部分 timeout |
| L5 | 法律公众号 | `mp.weixin.qq.com` | ❌ 直链不稳 | 搜狗微信 fallback |

## 2. 经实测的金牌 URL

以下 URL 经 WebFetch 实测能拿到全文，可在 skill 模板中直接引用：

| 法规/解释 | URL | 用途 |
|-----------|-----|------|
| 担保制度解释（法释〔2020〕28号） | `https://www.court.gov.cn/zixun/xiangqing/282721.html` | 第21条管辖、第25条保证方式 |
| 独立保函司法解释（法释〔2016〕24号） | `https://www.court.gov.cn/zixun-xiangqing-31291.html` | 第1条开立主体限于银行/非银金融机构 |

> 注：`/zixun-xiangqing-{id}.html`（旧式）和 `/zixun/xiangqing/{id}.html`（新式）两套 URL 都有效。

## 3. 关键入库案例编号

| 编号 | 主题 | 用途 |
|------|------|------|
| `2024-10-2-358-001` | 独立保函主体资格认定（担保公司不属于银行/非银金融机构） | 保函案件首选依据 |

## 4. 关键监管源

| 文件 | 找法 | 关键作用 |
|------|------|----------|
| 非银行金融机构行政许可事项实施办法（金融监管总局令〔2023〕第3号） | WebSearch `site:gov.cn` | 划定"非银行金融机构"范围，不含融资担保公司 |
| 融资担保公司监督管理条例（国务院令第683号） | WebSearch `site:gov.cn` | 融资担保公司业务范围，不含开立独立保函 |
| 招标投标法 + 实施条例 | WebSearch `site:gov.cn` | 投标保证金、弄虚作假依据 |
| 民法典 第686-693条（保证）+ 第388条（担保合同） | court.gov.cn 或 site:gov.cn | 保证合同主体规则、保证方式 |
| 民事诉讼法 第24条 | site:gov.cn | 合同纠纷管辖：被告住所地/合同履行地 |

## 5. 头部律所文章源（仅作线索）

| 律所 | URL |
|------|-----|
| 中伦 | zhonglun.com |
| 君合 | junhe.com |
| 金杜 | kmferguson.com |
| 大成 | grandall.com.cn |
| 康达 | kangdalawyers.com |
| 天同 | tiantonglaw.com |

## 6. 重测信号

以下信号出现时，应重测并更新验证日期：

- WebFetch `court.gov.cn` 任一示例 URL 返回 4xx/5xx
- `flk.npc.gov.cn` 重新可被 WebFetch 抓到内容（可能改为 SSR）
- `wenshu.court.gov.cn` 恢复正常
- 有 X server 环境可用（届时可测试 chrome-devtools 抓取动态页）
