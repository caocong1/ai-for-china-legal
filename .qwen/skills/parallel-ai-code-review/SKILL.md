---
name: parallel-ai-code-review
description: Run Claude CLI and Codex CLI in parallel for independent code reviews, consolidate findings, and apply fixes
source: auto-skill
extracted_at: '2026-06-08T16:05:02.390Z'
---

# Parallel Multi-AI Code Review

Run Claude Code CLI and Codex CLI simultaneously for independent project reviews, while conducting your own analysis in parallel. Consolidate findings from all three sources and apply fixes.

## Prerequisites

- `claude` CLI installed (`which claude`)
- `codex` CLI installed (`which codex`)
- Both authenticated and working

## Procedure

### 1. Verify CLI availability

```bash
which claude && claude --version
which codex && codex --version
```

### 2. Launch both CLIs as background tasks

**Claude CLI** — uses `-p` for non-interactive mode, `--dangerously-skip-permissions` for file read access:

```bash
cd /path/to/project && claude -p '<review prompt>' --dangerously-skip-permissions 2>&1 | tee /tmp/claude-review.md &
```

**Codex CLI** — uses `exec` subcommand for non-interactive mode:

```bash
cd /path/to/project && codex exec '<review prompt>' 2>&1 | tee /tmp/codex-review.md &
```

### 3. Review prompt template

Use a structured prompt covering these dimensions (adapt to project type):

```
Review dimensions:
1. Project architecture — directory structure, module decomposition, dependencies
2. Code quality — entry points, error handling, bugs, robustness
3. Configuration — completeness, correctness, consistency
4. Documentation — accuracy, completeness, consistency with code
5. Security — hardcoded secrets, path injection, input validation
6. Maintainability — naming conventions, consistency, extensibility

For each issue: description, severity (HIGH/MEDIUM/LOW), specific fix.
Overall score (1-10) and prioritized improvement checklist.
```

### 4. Conduct your own parallel review

While CLIs run (they take 5-15+ minutes), do your own analysis:

- Read key files: package.json, entry points, configs, docs
- Check directory structure with `find` / `ls`
- Count files, verify claims in documentation
- Run `node --check` on JS files
- Test YAML/JSON parsing
- Look for broken symlinks, missing files, stale references

### 5. Monitor progress

```bash
wc -l /tmp/claude-review.md /tmp/codex-review.md
ps aux | grep -E "claude|codex" | grep -v grep
```

### 6. Read and consolidate findings

Read the tail of each output file for conclusions:

```bash
tail -200 /tmp/codex-review.md
tail -200 /tmp/claude-review.md
```

Create a consolidated findings table with columns:
- Source (Qwen/Codex/Claude)
- Severity (HIGH/MEDIUM/LOW)
- Issue description
- File location
- Fix status (fixed/pending/needs-decision)

### 7. Apply fixes

Prioritize by severity: HIGH first, then MEDIUM, then LOW.

After each fix, verify with:
- `node --check` for JS files
- `python3 -c "import json; json.load(open('file.json'))"` for JSON
- YAML parse test for YAML files
- `git diff --stat` to track all changes

### Key gotchas

- **Claude CLI** takes 10-15+ minutes for deep reviews; output may be empty until it finishes streaming
- **Codex CLI** `exec` mode is read-only by default (sandbox: read-only) — it won't modify files
- Both CLIs may find different issues — Codex tends to find runtime bugs, Claude tends to find architectural issues
- Always verify CLI findings yourself before applying fixes — both can hallucinate file paths or line numbers
- Use `tee` to capture output while CLIs run; output files are append-only streams
