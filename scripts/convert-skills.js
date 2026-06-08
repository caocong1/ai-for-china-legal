#!/usr/bin/env node

/**
 * Cross-platform skill converter.
 *
 * Converts SKILL.md files (Qwen Code / OpenCode format) to other platform formats:
 *   - kimi-code:    prompt.md + HTML comment metadata + manifest.json
 *   - opencode:     skill.yaml with content embedded
 *   - standalone:   agent.json + prompts/system.md + prompts/user-template.md
 *
 * Usage:
 *   node scripts/convert-skills.js --to <platform> --input <dir> --output <dir>
 *   node scripts/convert-skills.js --to kimi --input ./commercial-legal/skills --output ./dist/kimi
 *   node scripts/convert-skills.js --to opencode --input ./commercial-legal/skills --output ./dist/opencode
 *   node scripts/convert-skills.js --to standalone --input ./commercial-legal/skills --output ./dist/agent
 *   node scripts/convert-skills.js --to all --input ./commercial-legal/skills --output ./dist
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from "node:fs";
import { resolve, relative, dirname, basename, join } from "node:path";
import { parse } from "yaml";

// --- Argument parsing ---

const args = process.argv.slice(2);
function getArg(name) {
  const idx = args.indexOf(`--${name}`);
  if (idx === -1 || idx + 1 >= args.length) return null;
  return args[idx + 1];
}

const targetPlatform = getArg("to");
const inputDir = getArg("input");
const outputDir = getArg("output");

if (!targetPlatform || !inputDir || !outputDir) {
  console.error("Usage: node scripts/convert-skills.js --to <platform> --input <dir> --output <dir>");
  console.error("");
  console.error("Platforms: kimi, opencode, standalone, all");
  console.error("");
  console.error("Examples:");
  console.error("  node scripts/convert-skills.js --to kimi --input ./commercial-legal/skills --output ./dist/kimi");
  console.error("  node scripts/convert-skills.js --to all --input ./commercial-legal/skills --output ./dist");
  process.exit(1);
}

const VALID_PLATFORMS = ["kimi", "opencode", "standalone", "all"];
if (!VALID_PLATFORMS.includes(targetPlatform)) {
  console.error(`Error: Invalid platform '${targetPlatform}'. Valid: ${VALID_PLATFORMS.join(", ")}`);
  process.exit(1);
}

// --- SKILL.md parser ---

function parseSkillMd(filePath) {
  const content = readFileSync(filePath, "utf-8");

  // Extract frontmatter
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fmMatch) {
    return { metadata: {}, body: content };
  }

  const frontmatter = parse(fmMatch[1]) || {};
  const body = fmMatch[2];

  return {
    metadata: {
      name: frontmatter.name || basename(dirname(filePath)),
      description: (frontmatter.description || "").replace(/\n/g, " ").trim(),
      argumentHint: frontmatter["argument-hint"] || "",
    },
    body,
  };
}

// --- Find all SKILL.md files ---

function findSkillFiles(dir) {
  const results = [];

  function walk(currentDir) {
    if (!existsSync(currentDir)) return;
    const entries = readdirSync(currentDir);
    for (const entry of entries) {
      const fullPath = join(currentDir, entry);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (entry === "SKILL.md") {
        results.push(fullPath);
      }
    }
  }

  walk(dir);
  return results;
}

// --- Converters ---

function convertToKimi(skill, relPath) {
  const { metadata, body } = skill;
  const safeFileName = relPath.replace(/\//g, "-").replace(/-SKILL\.md$/, "");

  const promptContent = `<!--
@name: ${metadata.name}
@description: ${metadata.description}
@argument-hint: ${metadata.argumentHint}
@version: 1.0.0
-->

${body}`;

  return {
    files: [
      { path: `prompts/${safeFileName}.md`, content: promptContent },
    ],
    manifestEntry: {
      name: metadata.name,
      file: `prompts/${safeFileName}.md`,
      description: metadata.description,
    },
  };
}

function convertToOpenCode(skill, relPath) {
  const { metadata, body } = skill;
  const safeFileName = relPath.replace(/\//g, "-").replace(/-SKILL\.md$/, "");

  const yamlContent = `name: ${metadata.name}
description: ${metadata.description}
argument_hint: "${metadata.argumentHint}"
version: "1.0.0"
content: |
${body.split("\n").map((line) => "  " + line).join("\n")}
`;

  return {
    files: [
      { path: `skills/${safeFileName}.yaml`, content: yamlContent },
    ],
    pluginEntry: {
      name: metadata.name,
      file: `skills/${safeFileName}.yaml`,
    },
  };
}

function convertToStandalone(skill, relPath) {
  const { metadata, body } = skill;
  const agentDir = metadata.name;

  // Split body into system prompt and user template
  const sections = body.split(/^## /m);
  let systemParts = [];
  let userTemplateParts = [];

  for (const section of sections) {
    if (!section.trim()) continue;
    const title = section.split("\n")[0].trim();
    if (["输出模板", "输出格式"].includes(title)) {
      userTemplateParts.push(section);
    } else if (["目的", "详细步骤", "检查清单", "边界条件", "错误处理", "法律依据"].includes(title)) {
      systemParts.push(section);
    } else {
      systemParts.push(section);
    }
  }

  const systemPrompt = `# ${metadata.name}

${metadata.description}

## 角色
你是一个专业的中国法律助手，专注于${metadata.description}相关领域。

${systemParts.map((s) => `## ${s}`).join("\n")}`;

  const userTemplate = `请根据以下输入完成任务：

## 用户输入
{{input}}

${metadata.argumentHint ? `## 参数提示\n${metadata.argumentHint}\n` : ""}
${userTemplateParts.length > 0 ? `## 输出要求\n${userTemplateParts.map((s) => `## ${s}`).join("\n")}` : "## 输出要求\n请按照系统提示词中的输出模板格式输出。"}`;

  const agentJson = {
    name: metadata.name,
    version: "1.0.0",
    description: metadata.description,
    model: "qwen-max",
    system_prompt_file: "prompts/system.md",
    user_template_file: "prompts/user-template.md",
    tools: [],
    parameters: {
      temperature: 0.3,
      max_tokens: 4096,
    },
    input_schema: {
      type: "object",
      properties: {
        input: { type: "string", description: "用户输入" },
      },
      required: ["input"],
    },
  };

  return {
    files: [
      { path: `${agentDir}/agent.json`, content: JSON.stringify(agentJson, null, 2) },
      { path: `${agentDir}/prompts/system.md`, content: systemPrompt },
      { path: `${agentDir}/prompts/user-template.md`, content: userTemplate },
    ],
  };
}

// --- Main ---

function processSkills(skillFiles, inputBase, converter, outputBase) {
  const manifestEntries = [];

  for (const filePath of skillFiles) {
    const relPath = relative(inputBase, filePath);
    const skill = parseSkillMd(filePath);

    console.log(`  Converting: ${relPath} → ${skill.metadata.name}`);

    const result = converter(skill, relPath.replace(/\/SKILL\.md$/, ""));

    for (const file of result.files) {
      const outPath = resolve(outputBase, file.path);
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, file.content, "utf-8");
    }

    if (result.manifestEntry) {
      manifestEntries.push(result.manifestEntry);
    }
  }

  return manifestEntries;
}

function main() {
  const absInput = resolve(inputDir);
  const absOutput = resolve(outputDir);

  if (!existsSync(absInput)) {
    console.error(`Error: Input directory not found: ${absInput}`);
    process.exit(1);
  }

  const skillFiles = findSkillFiles(absInput);
  console.log(`Found ${skillFiles.length} SKILL.md files in ${absInput}`);

  const platforms = targetPlatform === "all" ? ["kimi", "opencode", "standalone"] : [targetPlatform];

  for (const platform of platforms) {
    const platformOutput = targetPlatform === "all" ? join(absOutput, platform) : absOutput;
    console.log(`\nConverting to ${platform}...`);
    mkdirSync(platformOutput, { recursive: true });

    if (platform === "kimi") {
      const entries = processSkills(skillFiles, absInput, convertToKimi, platformOutput);
      // Write manifest.json
      const manifest = {
        name: basename(dirname(absInput)),
        version: "1.0.0",
        skills: entries,
      };
      writeFileSync(join(platformOutput, "manifest.json"), JSON.stringify(manifest, null, 2), "utf-8");
      console.log(`  Wrote manifest.json with ${entries.length} skills`);
    } else if (platform === "opencode") {
      const entries = processSkills(skillFiles, absInput, convertToOpenCode, platformOutput);
      // Write plugin.yaml
      const pluginYaml = `name: ${basename(dirname(absInput))}
version: "1.0.0"
skills:
${entries.map((e) => `  - name: ${e.name}\n    file: ${e.file}`).join("\n")}
`;
      writeFileSync(join(platformOutput, "plugin.yaml"), pluginYaml, "utf-8");
      console.log(`  Wrote plugin.yaml with ${entries.length} skills`);
    } else if (platform === "standalone") {
      processSkills(skillFiles, absInput, convertToStandalone, platformOutput);
    }
  }

  console.log("\nConversion complete.");
}

main();
