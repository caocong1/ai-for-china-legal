#!/usr/bin/env node

/**
 * Standalone health check for the law-database connector.
 *
 * Usage:
 *   node connectors/law-database/health-check.js
 *
 * Exit codes:
 *   0 — healthy
 *   1 — unhealthy or configuration error
 */

import { LawDatabaseClient } from "./client.js";
import "dotenv/config";

const API_URL = process.env.LAW_DB_API_URL || "https://flk.npc.gov.cn/api";
const API_KEY = process.env.LAW_DB_API_KEY;

console.log("[law-database] Health check starting...");
console.log(`  API URL: ${API_URL}`);
console.log(`  API Key: ${API_KEY ? "configured" : "NOT SET"}`);

if (!API_KEY) {
  console.error("[law-database] FAIL: LAW_DB_API_KEY is not set.");
  process.exit(1);
}

const client = new LawDatabaseClient({
  baseUrl: API_URL,
  apiKey: API_KEY,
  timeoutMs: 10000,
  maxRetries: 1,
});

try {
  const healthy = await client.ping();
  if (healthy) {
    console.log("[law-database] OK: API is reachable.");
    console.log(`  Timestamp: ${new Date().toISOString()}`);
    process.exit(0);
  } else {
    console.error("[law-database] FAIL: API returned unexpected response.");
    process.exit(1);
  }
} catch (error) {
  console.error(`[law-database] FAIL: ${error.message}`);
  process.exit(1);
}
