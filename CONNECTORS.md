# MCP 连接器说明

AI for China Legal 通过 MCP (Model Context Protocol) 连接器与外部数据源集成。

## 实现状态

| 连接器 | 目录 | 状态 | 说明 |
|--------|------|------|------|
| 法规数据库 | `connectors/law-database/` | ✅ 原型已实现 | HTTP client + MCP server + 缓存 + 健康检查 |
| 元典开放平台 | `connectors/yuandian/` | ✅ 已实现（兜底定位） | MCP server + 缓存 + 健康检查（法规/法条/案例检索 + 幻觉校验）；按调用计点，赠送积分 2026-09 到期后冷藏 |
| 裁判文书网 | `connectors/wenshu/` | ✅ 浏览器自动化实现（实验性） | playwright-core + 本机 Chrome；检索需登录，用户本人扫码后人速检索 |
| 人民法院案例库 | `connectors/rmfyalk/` | ✅ 已实现（需登录） | 权威入库案例检索/详情（站内 JSON API）；共道账号登录后人速检索 |
| 企业信用公示 | `connectors/gsxt/` | 📋 仅规格 | connector.json 已定义，待实现 |
| 商标查询 | `connectors/trademark/` | 📋 仅规格 | connector.json 已定义，待实现 |
| 专利查询 | `connectors/patent/` | 📋 仅规格 | connector.json 已定义，待实现 |
| 微信通知 | `connectors/wechat-notify/` | 📋 仅规格 | connector.json 已定义，待实现 |

## 已实现：法规数据库连接器 (law-database)

- **数据源**: 国家法律法规数据库 (flk.npc.gov.cn)
- **功能**: 法律法规搜索、法条级正文检索、单条法条查询、全文详情、关联案例分析、法律引用核验
- **适用插件**: 所有需要法规检索的插件
- **认证**: Bearer token (LAW_DB_API_KEY)
- **特性**: 重试/熔断/限流/缓存

### 运行

```bash
# 启动 MCP server
node connectors/law-database/index.js

# 健康检查
node connectors/law-database/health-check.js
```

### 环境变量

```bash
LAW_DB_API_URL=https://flk.npc.gov.cn/api    # API 基础地址
LAW_DB_API_KEY=your-api-key                   # API 密钥（必需）
LAW_DB_TIMEOUT_MS=30000                       # 请求超时（毫秒）
LAW_DB_MAX_RETRIES=3                          # 最大重试次数
LAW_DB_CACHE_TTL_SECONDS=86400                # 缓存有效期（秒）
```

## 已实现：元典开放平台连接器 (yuandian)

- **数据源**: 元典开放平台 / 元典智库 (open.chineselaw.com)，渠道等级 B（持牌商业法律数据库）
- **定位**: **兜底/最后选择**。法规检索优先 law-database（A 级官方源、免 Key）；案例检索优先 wenshu 连接器（用户本人会话）与最高法官网指导/典型案例。元典按调用计点——赠送积分 2026-09 到期后不再续费，连接器保留但转入冷藏，仅在官方源与 wenshu 均不可用时启用。
- **功能**: 普通/权威案例关键词检索、案例语义检索、案例详情、法律引用幻觉校验；法规关键词/语义检索、法条检索与详情、法规全文（含历史版本）
- **工具**: `search_cases`、`search_authoritative_cases`、`semantic_search_cases`、`get_case_detail`、`verify_legal_citations`、`search_laws`、`search_law_articles`、`semantic_search_laws`、`get_law_detail`、`get_article_detail`
- **适用插件**: 所有需要案例检索与引用核验的插件
- **认证**: `X-API-Key` 请求头（接口按调用计点）
- **实测说明**（2026-08，真实 Key 验证）: 法规/案例/语义检索与详情接口均可用；`verify_legal_citations`（hall_detect）为 VIP 专属接口，非 VIP 账号返回 403，连接器会如实提示权限受限（不会误删 Key）

### API Key 获取流程（调用时询问 + 临时保存）

密钥解析顺序：工具 `apiKey` 参数 > 环境变量 `YUANDIAN_API_KEY` > 临时密钥文件。

未配置密钥时调用任意工具，连接器返回「需要元典 API Key」提示；技能层随即向用户索取 Key，并以 `apiKey` 参数重试。连接器会把 Key 写入 `os.tmpdir()/yuandian-open-platform.key`（0600 权限，仅当前用户可读），后续调用（含新会话）自动复用，直到系统清理临时目录。Key 不会写入仓库、日志（参数以 `***` 脱敏）或结果缓存。Key 失效（401/403）时连接器自动删除临时文件并重新提示索取。

### 运行

```bash
# 启动 MCP server
node connectors/yuandian/index.js

# 健康检查（探测公开目录端点，不消耗计点）
node connectors/yuandian/health-check.js
```

### 环境变量

```bash
YUANDIAN_API_KEY=                             # 元典 API 密钥（可选；不配置则首次调用时询问用户）
YUANDIAN_BASE_URL=https://open.chineselaw.com # 平台基础地址
YUANDIAN_TIMEOUT_MS=30000                     # 请求超时（毫秒）
```

### MCP 配置

```json
{
  "mcpServers": {
    "yuandian": {
      "command": "node",
      "args": ["connectors/yuandian/index.js"],
      "env": {
        "YUANDIAN_API_KEY": "${YUANDIAN_API_KEY}"
      }
    }
  }
}
```

`env` 中的 `YUANDIAN_API_KEY` 可省略——省略后走"调用时询问用户 + 临时保存"流程。

## 已实现：裁判文书网连接器 (wenshu)（实验性）

- **数据源**: 中国裁判文书网 (wenshu.court.gov.cn)
- **实现方式**: 浏览器自动化（playwright-core 驱动本机 Chrome，不下载浏览器）。⚠️ 该站无公开 API，此前 connector.json 中的 `wenshu.court.gov.cn/api` 端点是占位规格，并不存在。
- **功能**: `search_cases`（关键词/案号 + 案件类型检索）、`get_case_detail`（按 docId 或案号取全文）、`open_login_window` / `check_session` / `close_browser`（会话管理）
- **适用插件**: litigation-legal, ip-legal, commercial-legal

### 登录与合规设计

该站检索要求登录（当前为支付宝扫码）。连接器的红线与 `_lib/http.js` 一致：**永不自动绕过验证码/登录墙**——

1. 登录：`npm run connector:wenshu:login`（或 MCP 工具 `open_login_window`）打开一个**可见** Chrome 窗口，由用户**本人**扫码并完成可能的人机验证
2. 会话保存在本机 `~/.cache/com.sorawatcher.inkstatute/wenshu-profile`（含登录 Cookie，敏感，勿共享）；后续检索 headless 复用该会话
3. 检索中人速操作（步骤间停顿、单页单查、内置互斥队列不并发）；触发验证时返回提示，请用户在可见窗口自行完成
4. 结果列表/详情的 DOM 只能在登录后观察：若解析失败，连接器会把现场 HTML+截图保存到 `~/.cache/com.sorawatcher.inkstatute/wenshu-debug/`，发回即可适配选择器

### MCP 配置

```json
{
  "mcpServers": {
    "wenshu": {
      "command": "node",
      "args": ["connectors/wenshu/index.js"]
    }
  }
}
```

依赖：`npm install`（playwright-core，已在 devDependencies）+ 本机安装 Chrome。

## 已实现：人民法院案例库连接器 (rmfyalk)

- **数据源**: 人民法院案例库 (rmfyalk.court.gov.cn)，A 级权威案例源（2026-08 收录 5521 篇，经最高法筛选，重质量不重数量）
- **实现方式**: 浏览器持久会话 + 页面内 JSON API（`/cpws_al_api/api/cpwsAl/*`）。⚠️ 检索/详情接口需登录（共道统一认证 account.court.gov.cn），匿名调用返回 401；仅收录统计接口匿名可用
- **功能**: `search_cases`（全文/标题/案号/入库编号/关键词/基本案情等字段检索，精确/模糊）、`get_case_detail`（按 gid/案号/入库编号，含基本案情、裁判理由、裁判要旨）、`get_library_stats`（收录统计，匿名）、`open_login_window` / `check_session` / `close_browser`
- **适用插件**: 所有需要权威案例（指导性/参考案例）的插件
- **注意**: 检索返回的 gid 尾部含动态 nonce，跨时间可能失效；案号/入库编号是耐久定位路径（`get_case_detail` 传入后会自动检索定位）

### 登录与合规设计

与 wenshu 连接器同一红线（`_lib/http.js`：永不自动绕过验证码/登录墙）：

1. 登录：`npm run connector:rmfyalk:login`（或 MCP 工具 `open_login_window`）打开**可见** Chrome 窗口，用户本人点击「登录」并完成共道账号认证
2. 会话保存在本机 `~/.cache/com.sorawatcher.inkstatute/rmfyalk-profile`（含登录 Cookie，敏感，勿共享）；后续 headless 复用，API 调用自动携带会话 Cookie + userToken
3. 人速操作；API 返回 401 时提示重新登录，不做任何绕过
4. 离线测试：`RMFYALK_FIXTURES=1` 走罐装响应；`RMFYALK_CAPTURE_DIR=<dir>` 捕获真实响应固化 fixtures

### MCP 配置

```json
{
  "mcpServers": {
    "rmfyalk": {
      "command": "node",
      "args": ["connectors/rmfyalk/index.js"]
    }
  }
}
```

健康检查：`node connectors/rmfyalk/health-check.js`（匿名探测收录统计接口）。

## 待实现连接器

以下连接器已有 `connector.json` 规格定义，但尚无实现代码。

### 企业信用信息公示系统连接器 (gsxt)

- **数据源**: 国家企业信用信息公示系统 (gsxt.gov.cn)
- **功能**: 企业工商信息查询、关联方排查、股权穿透
- **适用插件**: commercial-legal, litigation-legal
- **注意**: 可能有验证码和频率限制

### 商标查询连接器 (trademark)

- **数据源**: 中国商标网 (sbj.cnipa.gov.cn)
- **功能**: 商标近似查询、商标状态监控、异议公告
- **适用插件**: ip-legal

### 专利查询连接器 (patent)

- **数据源**: 中国专利公布公告系统 (pss-system.cnipa.gov.cn)
- **功能**: 专利检索、法律状态查询、侵权初步分析
- **适用插件**: ip-legal

### 微信/钉钉通知连接器 (wechat-notify)

- **数据源**: 企业微信 API / 钉钉开放平台
- **功能**: 通知推送、审批流转、文档分享
- **适用插件**: 所有插件（Agent 通知）

## 连接器配置

在 `.mcp.json` 中配置连接器：

```json
{
  "mcpServers": {
    "law-database": {
      "command": "node",
      "args": ["connectors/law-database/index.js"],
      "env": {
        "LAW_DB_API_KEY": "${LAW_DB_API_KEY}"
      }
    }
  }
}
```

## 连接器降级

当连接器未配置或不可用时，Skill 会优雅降级：
- 案例检索 → 使用训练数据中的已知案例（标注 `[模型知识 — 需验证]`）
- 工商查询 → 要求用户提供工商信息
- 法规检索 → 要求用户提供法规条文

## 数据源策略（2026-08 更新）

**主方案：官方源联邦检索**——一手原文、官方链接、可审计。第三方结果只负责"发现"，最终回官方源确认；每条记录应保存官方 URL、文号/案号、发布机关、效力状态、发布/施行日期、获取时间。

| 数据类型 | 官方源 | 接入状态 |
|---------|--------|---------|
| 法律/行政法规/司法解释 | 国家法律法规数据库 flk.npc.gov.cn | ✅ law-database 连接器 |
| 行政法规 | 国家行政法规库 xzfg.moj.gov.cn（司法部） | 待接入（html-fetch） |
| 部门规章/地方政府规章 | 国家规章库 www.gov.cn/zhengce/xxgk/gjgzk | 待接入（html-fetch） |
| 国务院及部门政策 | 国务院政策文件库 sousuo.www.gov.cn/zcwjk | 待接入 |
| 权威案例 | 人民法院案例库 rmfyalk.court.gov.cn | ✅ rmfyalk 连接器（JSON API；检索/详情需共道账号登录，收录统计匿名可用） |
| 公报案例 | 最高法公报 gongbao.court.gov.cn | 待接入（html-fetch；https 被 WAF 按客户端指纹拦截，用 http 抓取，见 sources.js 备注） |
| 检察指导案例 | 最高检发布厅 spp.gov.cn | 待接入（html-fetch） |
| 普通裁判文书 | 中国裁判文书网 wenshu.court.gov.cn | ✅ wenshu 连接器（按需查询，不做全量镜像） |

**商业库评估**（原则：不为公开网页的二次聚合付费）：

- **北大法宝 MCP** (mcp.pkulaw.com) — 唯一建议试用的商业辅助源：法规时效/版本校验、法条案号识别、官方源漏检补召回；支持 MCP/CLI，自助充值最低档约 18 元，验证无效即停
- **元典开放平台** — 已实现但定位兜底；赠送积分 2026-09 到期后冷藏，不再续费
- **法信** — 人民法院出版社独家内容（理解与适用、审判指导参考）确有增量，但服务协议禁止系统提取/建库，只适合人工查阅，不作数据源
- **法研开放平台 / 法意 MCP** — 个人接入与授权不透明 / 注册建设中，保持观察
- **威科先行 / 律商联讯** — 中国法数据无个人自助 API，不推荐

⚠️ connector.json 中声明的 `https://<gov>/api` 端点仍是占位规格（企业信用公示、商标/专利局等无公开 REST API）；企业工商信息可考虑天眼查/企查查 API（付费）。
