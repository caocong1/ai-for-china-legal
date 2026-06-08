#!/usr/bin/env node

/**
 * Managed Agent Runner
 *
 * Loads agent YAML configurations from managed-agent-cookbooks/ and executes them.
 *
 * Usage:
 *   node run-agent.js <agent-name> [options]
 *
 * Options:
 *   --dry-run       Simulate execution without sending notifications
 *   --force         Force execution (ignore schedule check)
 *   --urgent-only   Only process urgent items (for deadline-monitor)
 *   --verbose       Enable verbose logging
 *
 * Examples:
 *   node run-agent.js regulation-monitor
 *   node run-agent.js case-law-monitor --dry-run
 *   node run-agent.js deadline-monitor --urgent-only
 *   node run-agent.js corporate-change-monitor --force --verbose
 */

import { readFileSync, existsSync, mkdirSync, appendFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { parse } from "yaml";
import "dotenv/config";

const __dirname = dirname(new URL(import.meta.url).pathname);
const COOKBOOKS_DIR = resolve(__dirname, "managed-agent-cookbooks");
const LOGS_DIR = resolve(__dirname, "logs");

// --- Argument parsing ---

const args = process.argv.slice(2);
const flags = {
  dryRun: args.includes("--dry-run"),
  force: args.includes("--force"),
  urgentOnly: args.includes("--urgent-only"),
  verbose: args.includes("--verbose"),
};
const agentName = args.find((a) => !a.startsWith("--"));

if (!agentName) {
  console.error("Usage: node run-agent.js <agent-name> [--dry-run] [--force] [--urgent-only] [--verbose]");
  console.error("");
  console.error("Available agents:");
  console.error("  regulation-monitor        法规动态监控 (每天 8:00)");
  console.error("  case-law-monitor           裁判文书监控 (每天 9:00)");
  console.error("  corporate-change-monitor   企业工商变更监控 (每天 10:00)");
  console.error("  deadline-monitor           诉讼时效监控 (每周一 9:00 + 每日 8:30)");
  process.exit(1);
}

// --- Logging ---

function ensureLogDir() {
  if (!existsSync(LOGS_DIR)) {
    mkdirSync(LOGS_DIR, { recursive: true });
  }
}

function log(agent, level, message) {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] [${level}] [${agent}] ${message}`;
  console.log(line);
  if (level === "ERROR" || flags.verbose) {
    ensureLogDir();
    appendFileSync(resolve(LOGS_DIR, `${agent}.log`), line + "\n");
  }
}

// --- Agent loading ---

function loadAgentConfig(name) {
  const yamlPath = resolve(COOKBOOKS_DIR, `${name}.yaml`);
  if (!existsSync(yamlPath)) {
    throw new Error(`Agent config not found: ${yamlPath}`);
  }
  const raw = readFileSync(yamlPath, "utf-8");
  return parse(raw);
}

// --- Schedule checking ---

function shouldRunNow(config) {
  if (flags.force) return true;

  const schedule = config.schedule;
  if (!schedule) return true;

  // Simple cron parsing for common patterns
  const parts = schedule.split(/\s+/);
  if (parts.length < 5) return true;

  const now = new Date();
  const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;

  if (minute !== "*" && parseInt(minute) !== now.getMinutes()) return false;
  if (hour !== "*" && parseInt(hour) !== now.getHours()) return false;
  if (dayOfMonth !== "*" && parseInt(dayOfMonth) !== now.getDate()) return false;
  if (month !== "*" && parseInt(month) !== now.getMonth() + 1) return false;
  if (dayOfWeek !== "*") {
    const dow = parseInt(dayOfWeek);
    if (dow !== now.getDay()) return false;
  }

  return true;
}

// --- Connector resolution ---

function resolveConnector(connectorName) {
  const connectorMap = {
    "law-database": () => import("./connectors/law-database/client.js").then((m) => {
      return new m.LawDatabaseClient({
        baseUrl: process.env.LAW_DB_API_URL || "https://flk.npc.gov.cn/api",
        apiKey: process.env.LAW_DB_API_KEY || "",
        timeoutMs: parseInt(process.env.LAW_DB_TIMEOUT_MS || "30000", 10),
        maxRetries: parseInt(process.env.LAW_DB_MAX_RETRIES || "3", 10),
      });
    }),
  };

  const factory = connectorMap[connectorName];
  if (!factory) {
    return null;
  }
  return factory;
}

// --- Notification ---

async function sendNotification(config, report) {
  const channel = process.env.NOTIFICATION_CHANNEL || "wechat";

  if (flags.dryRun) {
    log(config.name, "INFO", `[DRY RUN] Would send notification via ${channel}`);
    log(config.name, "INFO", `[DRY RUN] Report length: ${report.length} chars`);
    return;
  }

  // Placeholder for actual notification delivery
  // In production, this would integrate with wechat-notify connector
  log(config.name, "INFO", `Notification channel: ${channel}`);
  log(config.name, "INFO", `Recipients: ${(config.recipients || []).join(", ")}`);
  log(config.name, "INFO", `Report generated: ${report.length} chars`);
}

// --- Agent execution ---

async function executeAgent(config) {
  const { name, description, data_sources, input_prompt, output_template, error_handling, escalation_rules, integration } = config;

  log(name, "INFO", `Starting agent: ${description || name}`);
  log(name, "INFO", `Dry run: ${flags.dryRun}, Force: ${flags.force}`);

  // Step 1: Collect data from sources
  log(name, "INFO", "Phase 1: Data collection");
  const collectedData = [];

  if (data_sources?.primary) {
    for (const source of data_sources.primary) {
      log(name, "INFO", `  Querying primary source: ${source.name} (${source.url})`);

      if (source.connector) {
        try {
          const connectorFactory = resolveConnector(source.connector);
          if (connectorFactory) {
            const connector = await connectorFactory;
            log(name, "INFO", `  Connector ${source.connector} loaded`);

            // Execute search based on agent type
            if (name === "regulation-monitor") {
              const keywords = getEnvJson("REGULATION_MONITOR_KEYWORDS") || [];
              const result = await connector.searchLaws({
                keyword: keywords.join(" ") || undefined,
                dateRange: {
                  start: formatDate(daysAgo(1)),
                  end: formatDate(new Date()),
                },
                status: "现行有效",
              });
              collectedData.push({ source: source.name, data: result });
              log(name, "INFO", `  Collected ${result.total || 0} items from ${source.name}`);
            }
          } else {
            log(name, "WARN", `  Connector ${source.connector} not yet implemented`);
          }
        } catch (error) {
          log(name, "ERROR", `  Failed to query ${source.name}: ${error.message}`);

          // Apply error handling rules
          if (error_handling?.source_unavailable) {
            log(name, "INFO", `  Error handling: ${error_handling.source_unavailable.fallback || "no fallback"}`);
          }
        }
      } else {
        log(name, "INFO", `  Source ${source.name} has no connector (web scrape not yet implemented)`);
      }
    }
  }

  // Step 2: Process and analyze data
  log(name, "INFO", "Phase 2: Data analysis");
  const report = generateReport(config, collectedData);

  // Step 3: Check escalation rules
  log(name, "INFO", "Phase 3: Escalation check");
  const escalationItems = checkEscalation(config, collectedData);
  if (escalationItems.immediate.length > 0) {
    log(name, "WARN", `  ${escalationItems.immediate.length} items require immediate notification`);
    for (const item of escalationItems.immediate) {
      log(name, "WARN", `  IMMEDIATE: ${item}`);
    }
  }

  // Step 4: Send notifications
  log(name, "INFO", "Phase 4: Notification");
  await sendNotification(config, report);

  // Step 5: Plugin integration
  if (integration?.plugins) {
    log(name, "INFO", "Phase 5: Plugin integration");
    for (const plugin of integration.plugins) {
      log(name, "INFO", `  Plugin: ${plugin.plugin} → ${plugin.skill} (trigger: ${plugin.trigger})`);
    }
  }

  log(name, "INFO", "Agent execution complete");
  return report;
}

// --- Report generation ---

function generateReport(config, collectedData) {
  const date = formatDate(new Date());
  const template = config.output_template || "# Report {{date}}\n\nNo template configured.";

  let report = template.replace(/\{\{date\}\}/g, date);

  // Count items by impact level (simplified)
  const totalItems = collectedData.reduce((sum, d) => sum + (d.data?.total || 0), 0);
  report = report.replace(/\{\{total_count\}\}/g, String(totalItems));
  report = report.replace(/\{\{high_impact_count\}\}/g, "0");
  report = report.replace(/\{\{medium_impact_count\}\}/g, "0");
  report = report.replace(/\{\{low_impact_count\}\}/g, "0");

  return report;
}

// --- Escalation checking ---

function checkEscalation(config, collectedData) {
  const immediate = [];
  const batch = [];

  const rules = config.escalation_rules;
  if (!rules) return { immediate, batch };

  // Simplified escalation logic
  for (const source of collectedData) {
    if (source.data?.items) {
      for (const item of source.data.items) {
        // Check if any immediate escalation keywords match
        if (rules.immediate_notify) {
          for (const keyword of rules.immediate_notify) {
            if (item.title?.includes(keyword) || item.summary?.includes(keyword)) {
              immediate.push(item.title || "Untitled");
            }
          }
        }
      }
    }
  }

  return { immediate, batch };
}

// --- Utility functions ---

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

function getEnvJson(name) {
  const value = process.env[name];
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

// --- Main ---

async function main() {
  log(agentName, "INFO", `Loading agent config: ${agentName}`);

  let config;
  try {
    config = loadAgentConfig(agentName);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }

  log(agentName, "INFO", `Agent: ${config.description || agentName}`);
  log(agentName, "INFO", `Schedule: ${config.schedule || "manual"}`);

  if (!flags.force && !shouldRunNow(config)) {
    log(agentName, "INFO", "Not scheduled to run now. Use --force to override.");
    process.exit(0);
  }

  const report = await executeAgent(config);

  if (flags.verbose || flags.dryRun) {
    console.log("\n--- Generated Report ---\n");
    console.log(report);
    console.log("\n--- End Report ---\n");
  }
}

main().catch((error) => {
  console.error(`[run-agent] Fatal error: ${error.message}`);
  if (flags.verbose) {
    console.error(error.stack);
  }
  process.exit(1);
});
