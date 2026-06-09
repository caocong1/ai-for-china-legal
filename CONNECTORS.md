# MCP 连接器说明

AI for China Legal 通过 MCP (Model Context Protocol) 连接器与外部数据源集成。

## 实现状态

| 连接器 | 目录 | 状态 | 说明 |
|--------|------|------|------|
| 法规数据库 | `connectors/law-database/` | ✅ 原型已实现 | HTTP client + MCP server + 缓存 + 健康检查 |
| 裁判文书网 | `connectors/wenshu/` | 📋 仅规格 | connector.json 已定义，待实现 |
| 企业信用公示 | `connectors/gsxt/` | 📋 仅规格 | connector.json 已定义，待实现 |
| 商标查询 | `connectors/trademark/` | 📋 仅规格 | connector.json 已定义，待实现 |
| 专利查询 | `connectors/patent/` | 📋 仅规格 | connector.json 已定义，待实现 |
| 微信通知 | `connectors/wechat-notify/` | 📋 仅规格 | connector.json 已定义，待实现 |

## 已实现：法规数据库连接器 (law-database)

- **数据源**: 国家法律法规数据库 (flk.npc.gov.cn)
- **功能**: 法律法规搜索、详情查询、关联案例分析
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

## 待实现连接器

以下连接器已有 `connector.json` 规格定义，但尚无实现代码。

### 裁判文书网连接器 (wenshu)

- **数据源**: 中国裁判文书网 (wenshu.court.gov.cn)
- **功能**: 案例检索、类案推送、裁判观点分析
- **适用插件**: litigation-legal, ip-legal, commercial-legal
- **注意**: 文书网访问可能有频率限制，部分功能需要注册

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
