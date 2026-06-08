---
name: implement-mcp-connector
description: Pattern for implementing MCP connector prototypes with error handling, rate limiting, circuit breaker, and health checks
source: auto-skill
extracted_at: '2026-06-08T08:51:44.627Z'
---

# Implement MCP Connector Prototype

## Purpose

Implement a production-ready MCP (Model Context Protocol) connector with proper error handling, rate limiting, circuit breaker, caching, and health checks.

## When to Use

- Implementing a new MCP connector from a connector.json specification
- Adding runtime implementation to an existing connector spec
- Creating connectors that interface with external APIs

## Implementation Pattern

### 1. File Structure

```
connectors/<connector-name>/
├── connector.json          # Specification (already exists)
├── index.js                # MCP server entry point
├── client.js               # HTTP client with error handling
├── cache.js                # TTL cache implementation
└── health-check.js         # Standalone health check script
```

### 2. MCP Server (index.js)

```javascript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { ApiClient } from "./client.js";
import { createCache } from "./cache.js";

const server = new McpServer({
  name: "connector-name",
  version: "1.0.0",
});

// Define tools based on connector.json
server.tool(
  "tool_name",
  "Tool description",
  {
    param1: z.string().describe("Parameter description"),
    param2: z.number().optional().describe("Optional parameter"),
  },
  async (params) => {
    // Check cache first
    const cacheKey = `tool:${JSON.stringify(params)}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      return { content: [{ type: "text", text: JSON.stringify(cached) }] };
    }

    try {
      const result = await client.method(params);
      cache.set(cacheKey, result);
      return { content: [{ type: "text", text: JSON.stringify(result) }] };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }],
        isError: true,
      };
    }
  }
);

// Add health check resource
server.resource("health://status", "health", async () => {
  const healthy = await client.ping();
  return {
    contents: [{
      uri: "health://status",
      text: JSON.stringify({
        status: healthy ? "healthy" : "degraded",
        connector: "connector-name",
        timestamp: new Date().toISOString(),
      }),
    }],
  };
});

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
```

### 3. HTTP Client with Error Handling (client.js)

Key components:

**Rate Limiting** (token bucket):
```javascript
async _waitForRateLimit() {
  const now = Date.now();
  this._requestTimestamps = this._requestTimestamps.filter(t => now - t < 1000);
  if (this._requestTimestamps.length >= this._maxRequestsPerSecond) {
    const waitMs = 1000 - (now - this._requestTimestamps[0]);
    await new Promise(resolve => setTimeout(resolve, waitMs));
  }
  this._requestTimestamps.push(Date.now());
}
```

**Circuit Breaker**:
```javascript
_checkCircuitBreaker() {
  if (!this._circuitOpen) return;
  const elapsed = Date.now() - this._circuitOpenAt;
  if (elapsed >= this._recoveryTimeoutMs) {
    this._circuitOpen = false;
    this._consecutiveFailures = 0;
  } else {
    throw new Error(`Circuit breaker open. Recovery in ${Math.ceil((this._recoveryTimeoutMs - elapsed) / 1000)}s`);
  }
}
```

**Retry with Exponential Backoff**:
```javascript
for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (response.ok) return await response.json();
    
    if (RETRYABLE_STATUS_CODES.includes(response.status) && attempt < this.maxRetries) {
      const delay = Math.min(2000 * Math.pow(2.5, attempt), 30000);
      await new Promise(resolve => setTimeout(resolve, delay));
      continue;
    }
    throw new Error(`HTTP ${response.status}`);
  } catch (error) {
    if (attempt < this.maxRetries) {
      await new Promise(resolve => setTimeout(resolve, 2000 * Math.pow(2.5, attempt)));
      continue;
    }
    throw error;
  }
}
```

**Error Classification**:
- 401/403: Authentication failure → don't retry, notify admin
- 400: Bad request → don't retry, log error
- 404: Not found → return null
- 429/502/503/504: Retryable → retry with backoff
- 500: Server error → retry once

### 4. TTL Cache (cache.js)

```javascript
export function createCache(ttlSeconds) {
  const store = new Map();
  const ttlMs = ttlSeconds * 1000;

  return {
    get(key) {
      const entry = store.get(key);
      if (!entry) return null;
      if (Date.now() - entry.timestamp > ttlMs) {
        store.delete(key);
        return null;
      }
      return entry.data;
    },
    set(key, data) {
      store.set(key, { data, timestamp: Date.now() });
    },
    clear() { store.clear(); },
  };
}
```

### 5. Health Check Script (health-check.js)

```javascript
#!/usr/bin/env node
import { ApiClient } from "./client.js";
import "dotenv/config";

const client = new ApiClient({
  baseUrl: process.env.API_URL,
  apiKey: process.env.API_KEY,
  timeoutMs: 10000,
  maxRetries: 1,
});

try {
  const healthy = await client.ping();
  if (healthy) {
    console.log("[connector] OK: API is reachable");
    process.exit(0);
  } else {
    console.error("[connector] FAIL: API returned unexpected response");
    process.exit(1);
  }
} catch (error) {
  console.error(`[connector] FAIL: ${error.message}`);
  process.exit(1);
}
```

## Checklist

- [ ] Read connector.json to understand tools, auth, rate limits
- [ ] Create index.js with MCP server and tool definitions
- [ ] Create client.js with rate limiting, circuit breaker, retry logic
- [ ] Create cache.js for response caching
- [ ] Create health-check.js for standalone health verification
- [ ] Add environment variables to .env.example
- [ ] Update package.json with connector scripts
- [ ] Update connectors/README.md with implementation status

## Common Pitfalls

1. **Not handling rate limits**: External APIs have rate limits; implement token bucket algorithm
2. **Missing circuit breaker**: Prevent cascading failures when API is down
3. **No caching**: Cache responses to reduce API calls and improve performance
4. **Insufficient error classification**: Different errors need different handling (retry vs. fail-fast)
5. **Hardcoding API keys**: Always use environment variables
6. **Missing health checks**: Provide both MCP resource and standalone script

## Example Implementation

See `connectors/law-database/` for a complete implementation:
- index.js: MCP server with 3 tools (search_laws, get_law_detail, search_cases_by_law)
- client.js: HTTP client with 5 req/s rate limit, circuit breaker (5 failures → 60s open), exponential backoff
- cache.js: TTL cache with 24h default
- health-check.js: Standalone health verification
