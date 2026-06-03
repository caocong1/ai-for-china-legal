# MCP 连接器配置

## 裁判文书网连接器

```json
{
  "mcpServers": {
    "wenshu": {
      "command": "node",
      "args": ["/path/to/connectors/wenshu/index.js"],
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

### 工具列表

| 工具 | 描述 |
|------|------|
| search_cases | 搜索裁判文书 |
| get_case_detail | 获取案件详情 |
| get_case_statistics | 获取案件统计 |

## 企业信用信息公示系统连接器

```json
{
  "mcpServers": {
    "gsxt": {
      "command": "node",
      "args": ["/path/to/connectors/gsxt/index.js"],
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

### 工具列表

| 工具 | 描述 |
|------|------|
| search_company | 搜索企业信息 |
| get_company_detail | 获取企业详情 |
| get_company_changes | 获取企业变更记录 |

## 法规数据库连接器

```json
{
  "mcpServers": {
    "law-database": {
      "command": "node",
      "args": ["/path/to/connectors/law-database/index.js"],
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

### 工具列表

| 工具 | 描述 |
|------|------|
| search_laws | 搜索法律法规 |
| get_law_detail | 获取法规详情 |
| search_cases_by_law | 根据法规搜索相关案例 |

## 微信/钉钉通知连接器

```json
{
  "mcpServers": {
    "wechat-notify": {
      "command": "node",
      "args": ["/path/to/connectors/wechat-notify/index.js"],
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

### 工具列表

| 工具 | 描述 |
|------|------|
| send_message | 发送消息通知 |
| send_template | 发送模板消息 |
| get_user_info | 获取用户信息 |

## 商标查询连接器

```json
{
  "mcpServers": {
    "trademark": {
      "command": "node",
      "args": ["/path/to/connectors/trademark/index.js"],
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

### 工具列表

| 工具 | 描述 |
|------|------|
| search_trademark | 查询商标 |
| get_trademark_detail | 获取商标详情 |
| check_similarity | 商标近似检查 |

## 专利查询连接器

```json
{
  "mcpServers": {
    "patent": {
      "command": "node",
      "args": ["/path/to/connectors/patent/index.js"],
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

### 工具列表

| 工具 | 描述 |
|------|------|
| search_patent | 查询专利 |
| get_patent_detail | 获取专利详情 |
| check_infringement | 专利侵权初步分析 |
