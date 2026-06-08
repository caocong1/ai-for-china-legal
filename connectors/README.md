# MCP 连接器架构文档

## 概述

MCP（Model Context Protocol）连接器是本项目与外部法律数据源之间的标准化接口层。每个连接器封装一个外部数据源的访问逻辑，向插件技能提供统一的工具调用接口。

### 架构设计

```
┌─────────────────────────────────────────────────────────┐
│                    插件技能层                            │
│  commercial-legal / litigation-arbitration / ...        │
└────────────┬────────────────────────────────────────────┘
             │ MCP Tool Call
             ▼
┌─────────────────────────────────────────────────────────┐
│                    MCP 连接器层                          │
│                                                         │
│  ┌─────────┐ ┌─────────┐ ┌──────────┐ ┌─────────────┐  │
│  │ wenshu  │ │  gsxt   │ │law-database│ │wechat-notify│  │
│  └────┬────┘ └────┬────┘ └────┬─────┘ └──────┬──────┘  │
│       │           │           │               │          │
│  ┌────┴────┐ ┌────┴────┐ ┌───┴─────┐ ┌──────┴──────┐   │
│  │trademark│ │ patent  │ │         │ │             │   │
│  └─────────┘ └─────────┘ │         │ │             │   │
└───────────────────────────┴─────────┴─┴─────────────┴───┘
             │
             ▼
┌─────────────────────────────────────────────────────────┐
│                    外部数据源                            │
│  裁判文书网 / 企业信用系统 / 法规数据库 / 企业微信等      │
└─────────────────────────────────────────────────────────┘
```

### 连接器列表

| 连接器 | 目录 | 数据源 | 状态 |
|-------|------|--------|------|
| 裁判文书网 | `wenshu/` | wenshu.court.gov.cn | 配置完成 |
| 企业信用系统 | `gsxt/` | gsxt.gov.cn | 配置完成 |
| 法规数据库 | `law-database/` | flk.npc.gov.cn | ✅ 原型已实现（MCP server + health check） |
| 微信/钉钉通知 | `wechat-notify/` | 企业微信/钉钉 API | 配置完成 |
| 商标查询 | `trademark/` | sbj.cnipa.gov.cn | 配置完成 |
| 专利查询 | `patent/` | pss-system.cnipa.gov.cn | 配置完成 |

---

## 安全规范

### API 密钥管理

1. **禁止硬编码**：所有 API 密钥必须通过环境变量传入，不得写入配置文件或代码
2. **密钥存储**：生产环境使用密钥管理服务（如 HashiCorp Vault、阿里云 KMS）
3. **密钥轮转**：建议每 90 天轮转一次 API 密钥
4. **最小权限**：每个连接器仅申请所需的最小 API 权限
5. **审计日志**：所有 API 调用需记录审计日志，包含调用时间、调用方、请求参数

### 数据传输安全

1. **HTTPS 强制**：所有外部 API 调用必须使用 HTTPS
2. **证书校验**：不得禁用 SSL 证书校验
3. **敏感信息脱敏**：日志中不得包含完整的 API 密钥、当事人个人信息等
4. **数据加密**：本地缓存的敏感数据需使用 AES-256 加密

### 访问控制

1. **IP 白名单**：生产环境连接器仅允许指定 IP 访问外部 API
2. **请求签名**：部分 API 需要请求签名，需按数据源要求实现
3. **Token 刷新**：OAuth 类 Token 需自动刷新，避免因 Token 过期导致服务中断

---

## 错误处理与重试

### 通用错误处理策略

| 错误类型 | HTTP 状态码 | 重试策略 | 降级方案 |
|---------|------------|---------|---------|
| 网络超时 | - | 重试3次，间隔 2/5/15 秒 | 使用缓存数据 |
| 服务不可用 | 502/503/504 | 重试3次，间隔 5/15/30 秒 | 使用备用数据源 |
| 请求限流 | 429 | 按 Retry-After 头等待 | 降低请求频率 |
| 认证失败 | 401/403 | 不重试 | 通知管理员检查密钥 |
| 参数错误 | 400 | 不重试 | 记录错误日志 |
| 资源不存在 | 404 | 不重试 | 返回空结果 |
| 服务端错误 | 500 | 重试1次 | 通知管理员 |

### 重试配置模板

```yaml
retry:
  max_attempts: 3
  initial_delay_ms: 2000
  max_delay_ms: 30000
  backoff_multiplier: 2.5
  retryable_status_codes: [429, 502, 503, 504, 500]
  respect_retry_after_header: true
```

### 熔断机制

当某个数据源连续失败超过阈值时，自动触发熔断，避免无效请求：

```yaml
circuit_breaker:
  failure_threshold: 5
  recovery_timeout_seconds: 60
  half_open_max_requests: 2
```

---

## 限流策略

### 各数据源限流参考

| 数据源 | 请求频率限制 | 日请求量限制 | 并发限制 |
|-------|------------|------------|---------|
| 裁判文书网 | 1次/秒 | 1000次/日 | 2 并发 |
| 企业信用系统 | 2次/秒 | 2000次/日 | 3 并发 |
| 法规数据库 | 5次/秒 | 5000次/日 | 5 并发 |
| 商标查询 | 2次/秒 | 2000次/日 | 3 并发 |
| 专利查询 | 2次/秒 | 2000次/日 | 3 并发 |
| 企业微信 | 30次/分钟 | 无限制 | 10 并发 |

### 限流实现建议

1. **令牌桶算法**：使用令牌桶限流，平滑请求速率
2. **请求队列**：超出限制的请求进入队列等待，不直接丢弃
3. **优先级调度**：紧急请求（如期限提醒）优先于批量请求
4. **分布式限流**：多实例部署时使用 Redis 实现分布式限流

---

## 插件集成模式

### 标准集成流程

```
插件技能 → MCP Tool Call → 连接器 → 外部 API → 数据转换 → 返回结果 → 插件分析
```

### 集成模式分类

#### 1. 查询模式

插件主动调用连接器查询数据：

| 插件技能 | 调用连接器 | 工具 | 场景 |
|---------|-----------|------|------|
| contract-review | law-database | search_laws | 检索合同相关法规 |
| case-strategy | wenshu | search_cases | 检索类似案例 |
| ip-infringement-analysis | trademark | check_similarity | 商标近似比对 |
| ip-infringement-analysis | patent | check_infringement | 专利侵权分析 |
| corporate-due-diligence | gsxt | get_company_detail | 企业尽职调查 |

#### 2. 通知模式

连接器主动推送通知：

| 触发源 | 调用连接器 | 工具 | 场景 |
|-------|-----------|------|------|
| 定时 Agent | wechat-notify | send_template | 发送监控报告 |
| 错误处理 | wechat-notify | send_message | 发送异常告警 |
| 期限提醒 | wechat-notify | send_template | 发送期限预警 |

#### 3. 监控模式

连接器配合定时 Agent 持续监控数据源：

| 定时 Agent | 调用连接器 | 频率 | 目的 |
|-----------|-----------|------|------|
| case-law-monitor | wenshu | 每日 | 采集新裁判文书 |
| regulation-monitor | law-database | 每日 | 采集新法规 |
| corporate-change-monitor | gsxt | 每日 | 采集企业变更 |

---

## 部署清单

### 部署前检查

- [ ] 所有 API 密钥已获取并验证有效
- [ ] 环境变量已配置（推荐使用 `.env` 文件或密钥管理服务）
- [ ] 网络连通性已验证（可访问所有外部 API 地址）
- [ ] IP 白名单已配置（如数据源要求）
- [ ] Node.js >= 18 已安装
- [ ] MCP 运行环境已配置

### 部署步骤

1. **安装依赖**

   ```bash
   npm install
   ```

2. **配置环境变量**

   ```bash
   cp .env.example .env
   # 编辑 .env 文件填写实际配置
   ```

3. **验证连接器**

   ```bash
   node connectors/wenshu/health-check.js
   node connectors/gsxt/health-check.js
   node connectors/law-database/health-check.js
   node connectors/wechat-notify/health-check.js
   node connectors/trademark/health-check.js
   node connectors/patent/health-check.js
   ```

4. **注册 MCP 服务器**

   将各连接器注册到 MCP 配置中：

   ```json
   {
     "mcpServers": {
       "wenshu": { "command": "node", "args": ["connectors/wenshu/index.js"] },
       "gsxt": { "command": "node", "args": ["connectors/gsxt/index.js"] },
       "law-database": { "command": "node", "args": ["connectors/law-database/index.js"] },
       "wechat-notify": { "command": "node", "args": ["connectors/wechat-notify/index.js"] },
       "trademark": { "command": "node", "args": ["connectors/trademark/index.js"] },
       "patent": { "command": "node", "args": ["connectors/patent/index.js"] }
     }
   }
   ```

5. **端到端验证**

   ```bash
   # 测试每个连接器的基本功能
   node test-connectors.js
   ```

### 生产部署注意事项

1. **日志收集**：配置日志收集至集中式日志系统
2. **监控告警**：配置连接器健康检查和异常告警
3. **密钥管理**：使用密钥管理服务替代 `.env` 文件
4. **容器化部署**：建议使用 Docker 容器化部署
5. **负载均衡**：高并发场景下配置多实例和负载均衡

---

## 连接器详细配置

### 裁判文书网连接器

配置文件：`wenshu/connector.json`

```json
{
  "mcpServers": {
    "wenshu": {
      "command": "node",
      "args": ["connectors/wenshu/index.js"],
      "env": {
        "WENSHU_API_URL": "https://wenshu.court.gov.cn/api",
        "WENSHU_API_KEY": "${WENSHU_API_KEY}"
      },
      "tools": [
        "search_cases",
        "get_case_detail",
        "get_case_statistics"
      ]
    }
  }
}
```

| 工具 | 描述 | 参数 |
|------|------|------|
| search_cases | 搜索裁判文书 | 关键词、案由、法院、日期范围 |
| get_case_detail | 获取案件详情 | 案号 |
| get_case_statistics | 获取案件统计 | 案由、法院、时间范围 |

### 企业信用信息公示系统连接器

配置文件：`gsxt/connector.json`

```json
{
  "mcpServers": {
    "gsxt": {
      "command": "node",
      "args": ["connectors/gsxt/index.js"],
      "env": {
        "GSXT_API_URL": "https://gsxt.gov.cn/api",
        "GSXT_API_KEY": "${GSXT_API_KEY}"
      },
      "tools": [
        "search_company",
        "get_company_detail",
        "get_company_changes"
      ]
    }
  }
}
```

| 工具 | 描述 | 参数 |
|------|------|------|
| search_company | 搜索企业信息 | 企业名称/统一社会信用代码 |
| get_company_detail | 获取企业详情 | 企业名称/统一社会信用代码 |
| get_company_changes | 获取企业变更记录 | 企业名称/统一社会信用代码 |

### 法规数据库连接器

配置文件：`law-database/connector.json`

```json
{
  "mcpServers": {
    "law-database": {
      "command": "node",
      "args": ["connectors/law-database/index.js"],
      "env": {
        "LAW_DB_API_URL": "https://api.law-database.cn",
        "LAW_DB_API_KEY": "${LAW_DB_API_KEY}"
      },
      "tools": [
        "search_laws",
        "get_law_detail",
        "search_cases_by_law"
      ]
    }
  }
}
```

| 工具 | 描述 | 参数 |
|------|------|------|
| search_laws | 搜索法律法规 | 关键词、法规类型、发布机构、日期范围 |
| get_law_detail | 获取法规详情 | 法规文号 |
| search_cases_by_law | 根据法规搜索相关案例 | 法规名称/文号 |

### 微信/钉钉通知连接器

配置文件：`wechat-notify/connector.json`

```json
{
  "mcpServers": {
    "wechat-notify": {
      "command": "node",
      "args": ["connectors/wechat-notify/index.js"],
      "env": {
        "WECHAT_CORP_ID": "${WECHAT_CORP_ID}",
        "WECHAT_AGENT_ID": "${WECHAT_AGENT_ID}",
        "WECHAT_SECRET": "${WECHAT_SECRET}"
      },
      "tools": [
        "send_message",
        "send_template",
        "get_user_info"
      ]
    }
  }
}
```

| 工具 | 描述 | 参数 |
|------|------|------|
| send_message | 发送消息通知 | 接收人、消息内容、消息类型 |
| send_template | 发送模板消息 | 接收人、模板ID、模板数据 |
| get_user_info | 获取用户信息 | 用户ID |

### 商标查询连接器

配置文件：`trademark/connector.json`

```json
{
  "mcpServers": {
    "trademark": {
      "command": "node",
      "args": ["connectors/trademark/index.js"],
      "env": {
        "TRADEMARK_API_URL": "https://sbj.cnipa.gov.cn/api"
      },
      "tools": [
        "search_trademark",
        "get_trademark_detail",
        "check_similarity"
      ]
    }
  }
}
```

| 工具 | 描述 | 参数 |
|------|------|------|
| search_trademark | 查询商标 | 商标名称、注册号、分类、申请人 |
| get_trademark_detail | 获取商标详情 | 商标注册号 |
| check_similarity | 商标近似检查 | 待检查商标名称/图形 |

### 专利查询连接器

配置文件：`patent/connector.json`

```json
{
  "mcpServers": {
    "patent": {
      "command": "node",
      "args": ["connectors/patent/index.js"],
      "env": {
        "PATENT_API_URL": "https://pss-system.cnipa.gov.cn/api"
      },
      "tools": [
        "search_patent",
        "get_patent_detail",
        "check_infringement"
      ]
    }
  }
}
```

| 工具 | 描述 | 参数 |
|------|------|------|
| search_patent | 查询专利 | 关键词、专利号、申请人、IPC 分类号 |
| get_patent_detail | 获取专利详情 | 专利号 |
| check_infringement | 专利侵权初步分析 | 待分析技术方案、对比专利号 |
