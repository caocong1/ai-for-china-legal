#!/usr/bin/env node

/**
 * law-database MCP Connector
 *
 * MCP server for the National Laws & Regulations Database (flk.npc.gov.cn).
 * Provides tools: search_laws, get_law_detail, search_cases_by_law.
 *
 * Usage:
 *   node connectors/law-database/index.js
 *
 * Environment variables:
 *   LAW_DB_API_URL   — API base URL (default: https://flk.npc.gov.cn/api)
 *   LAW_DB_API_KEY   — API key (required)
 *   LAW_DB_TIMEOUT_MS — Request timeout in ms (default: 30000)
 *   LAW_DB_MAX_RETRIES — Max retry attempts (default: 3)
 *   LAW_DB_CACHE_TTL_SECONDS — Cache TTL in seconds (default: 86400)
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { LawDatabaseClient } from "./client.js";
import { createCache } from "./cache.js";

const API_URL = process.env.LAW_DB_API_URL || "https://flk.npc.gov.cn/api";
const API_KEY = process.env.LAW_DB_API_KEY;
const TIMEOUT_MS = parseInt(process.env.LAW_DB_TIMEOUT_MS || "30000", 10);
const MAX_RETRIES = parseInt(process.env.LAW_DB_MAX_RETRIES || "3", 10);
const CACHE_TTL = parseInt(process.env.LAW_DB_CACHE_TTL_SECONDS || "86400", 10);

if (!API_KEY) {
  console.error("[law-database] ERROR: LAW_DB_API_KEY environment variable is required.");
  process.exit(1);
}

const client = new LawDatabaseClient({
  baseUrl: API_URL,
  apiKey: API_KEY,
  timeoutMs: TIMEOUT_MS,
  maxRetries: MAX_RETRIES,
});

const cache = createCache(CACHE_TTL);

const server = new McpServer({
  name: "law-database",
  version: "1.0.0",
});

// --- Tool: search_laws ---
server.tool(
  "search_laws",
  "根据关键词、法规类型、发布机构等条件搜索法律法规",
  {
    keyword: z.string().optional().describe("搜索关键词"),
    lawType: z
      .enum(["法律", "行政法规", "部门规章", "地方性法规", "地方政府规章", "司法解释", "规范性文件"])
      .optional()
      .describe("法规类型"),
    issuingAuthority: z.string().optional().describe("发布机构（如：全国人大、国务院、最高人民法院）"),
    dateRange: z
      .object({
        start: z.string().describe("起始日期 YYYY-MM-DD"),
        end: z.string().describe("结束日期 YYYY-MM-DD"),
      })
      .optional()
      .describe("发布日期范围"),
    status: z
      .enum(["现行有效", "已修改", "已废止", "尚未生效"])
      .optional()
      .describe("法规状态"),
    page: z.number().int().default(1).describe("页码"),
    pageSize: z.number().int().default(20).describe("每页数量"),
  },
  async (params) => {
    const cacheKey = `search:${JSON.stringify(params)}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      return { content: [{ type: "text", text: JSON.stringify(cached, null, 2) }] };
    }

    try {
      const result = await client.searchLaws(params);
      cache.set(cacheKey, result);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                total: result.total,
                page: params.page,
                pageSize: params.pageSize,
                results: result.items,
              },
              null,
              2
            ),
          },
        ],
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `搜索失败: ${error.message}` }],
        isError: true,
      };
    }
  }
);

// --- Tool: get_law_detail ---
server.tool(
  "get_law_detail",
  "根据法规文号获取法律法规全文及详细信息",
  {
    documentNumber: z.string().optional().describe("法规文号（如：主席令第XX号）"),
    lawName: z.string().optional().describe("法规名称"),
    includeHistory: z.boolean().default(false).describe("是否包含修订历史"),
    includeRelatedCases: z.boolean().default(false).describe("是否包含关联案例"),
  },
  async (params) => {
    if (!params.documentNumber && !params.lawName) {
      return {
        content: [{ type: "text", text: "错误: 必须提供 documentNumber 或 lawName 中的至少一个" }],
        isError: true,
      };
    }

    const cacheKey = `detail:${params.documentNumber || params.lawName}:${params.includeHistory}:${params.includeRelatedCases}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      return { content: [{ type: "text", text: JSON.stringify(cached, null, 2) }] };
    }

    try {
      const result = await client.getLawDetail(params);
      cache.set(cacheKey, result);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    } catch (error) {
      return {
        content: [{ type: "text", text: `获取法规详情失败: ${error.message}` }],
        isError: true,
      };
    }
  }
);

// --- Tool: search_cases_by_law ---
server.tool(
  "search_cases_by_law",
  "根据法律法规查找引用该法规的裁判文书",
  {
    lawName: z.string().optional().describe("法规名称"),
    documentNumber: z.string().optional().describe("法规文号"),
    articleNumber: z.string().optional().describe("条文编号（如：第一百四十三条）"),
    courtLevel: z.enum(["基层", "中级", "高级", "最高"]).optional().describe("法院层级"),
    page: z.number().int().default(1).describe("页码"),
    pageSize: z.number().int().default(20).describe("每页数量"),
  },
  async (params) => {
    if (!params.lawName && !params.documentNumber) {
      return {
        content: [{ type: "text", text: "错误: 必须提供 lawName 或 documentNumber 中的至少一个" }],
        isError: true,
      };
    }

    const cacheKey = `cases:${JSON.stringify(params)}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      return { content: [{ type: "text", text: JSON.stringify(cached, null, 2) }] };
    }

    try {
      const result = await client.searchCasesByLaw(params);
      cache.set(cacheKey, result);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                total: result.total,
                page: params.page,
                pageSize: params.pageSize,
                results: result.items,
              },
              null,
              2
            ),
          },
        ],
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `搜索相关案例失败: ${error.message}` }],
        isError: true,
      };
    }
  }
);

// --- Health check resource ---
server.resource("health://status", "health", async () => {
  try {
    const healthy = await client.ping();
    return {
      contents: [
        {
          uri: "health://status",
          text: JSON.stringify({
            status: healthy ? "healthy" : "degraded",
            connector: "law-database",
            version: "1.0.0",
            timestamp: new Date().toISOString(),
            api: healthy ? "reachable" : "unreachable",
          }),
        },
      ],
    };
  } catch (error) {
    return {
      contents: [
        {
          uri: "health://status",
          text: JSON.stringify({
            status: "unhealthy",
            connector: "law-database",
            version: "1.0.0",
            timestamp: new Date().toISOString(),
            error: error.message,
          }),
        },
      ],
    };
  }
});

// --- Start server ---
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[law-database] MCP server started on stdio");
}

main().catch((error) => {
  console.error("[law-database] Fatal error:", error);
  process.exit(1);
});
