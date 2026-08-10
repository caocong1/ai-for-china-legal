# MCP 连接器说明

AI for China Legal 通过 MCP (Model Context Protocol) 连接器与外部数据源集成。

## 实现状态

| 连接器 | 目录 | 状态 | 说明 |
|--------|------|------|------|
| 法规数据库 | `connectors/law-database/` | ✅ 原型已实现 | HTTP client + MCP server + 缓存 + 健康检查 |
| 元典开放平台 | `connectors/yuandian/` | ✅ 原型已实现 | MCP server + 缓存 + 健康检查（法规/法条/案例检索 + 幻觉校验） |
| 裁判文书网 | `connectors/wenshu/` | ✅ 浏览器自动化实现（实验性） | playwright-core + 本机 Chrome；检索需登录，用户本人扫码后人速检索 |
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
- **定位**: **案例检索主渠道**——裁判文书网维护中不可达，元典提供普通/权威案例检索、案例语义检索与按案号查详情；其幻觉校验接口可核验案号真实性。法规检索请优先 law-database（A 级官方源、免 Key），元典法规接口作兜底。
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

## 数据源说明

⚠️ **重要提示**：connector.json 中声明的 `https://<gov>/api` 端点是占位规格。中国政府数据源（裁判文书网、企业信用公示、商标/专利局等）通常不提供公开的 REST API。实际接入建议：

1. **北大法宝** (pkulaw.com) — 持牌法规数据库，提供 API
2. **威科先行** (law.wkinfo.com.cn) — 持牌法律信息平台
3. **OpenLaw** (openlaw.cn) — 裁判文书开放平台
4. **天眼查/企查查** — 企业工商信息 API（付费）
