---
name: backfill-phase-tracking
description: Backfill missing GSD phase tracking artifacts when code exists but phase directories are absent
source: auto-skill
extracted_at: '2026-06-08T07:09:25.187Z'
---

# Backfill Missing Phase Tracking

When GSD phase tracking is out of sync — ROADMAP marks phases complete and code exists in the repo, but `.planning/phases/phase-N-*` directories are missing — backfill tracking artifacts instead of re-executing the full discuss → plan → execute cycle.

## When to Use

- `roadmap analyze` shows `disk_status: "no_directory"` for phases marked ✅ Complete in ROADMAP
- Git history confirms committed work for those phases
- Phase directories under `.planning/phases/` are absent

## Detection

```bash
# Check which phases lack directories but have code
gsd_run query roadmap.analyze | jq '.phases[] | select(.disk_status == "no_directory" and .roadmap_complete == true)'
# Verify code exists
git log --oneline --grep="feat(N)" | head -5
ls <phase-dir>/  # e.g., ai-governance/, connectors/
```

## Procedure

### 1. Gather facts per phase

For each missing phase, collect:
- **ROADMAP description** — phase goal, plan breakdown, success criteria
- **Git commits** — `git log --oneline --grep="feat(N)"` to identify what was built
- **Actual code** — `find <plugin-dir>/skills -maxdepth 1 -type d` to count skills and sub-skills
- **Existing phase pattern** — read a neighboring complete phase (e.g., `10-regulatory-legal/`) for artifact structure

### 2. Create phase directory

```bash
mkdir -p .planning/phases/NN-<slug>/
```

### 3. Write artifacts

For each phase, create:

| File | Content |
|------|---------|
| `NN-CONTEXT.md` | Phase name, domain summary from ROADMAP, scope items (derived from plan breakdown) |
| `NN-01-SUMMARY.md` through `NN-0N-SUMMARY.md` | One per plan — list completed items from ROADMAP plan descriptions |
| `NN-VERIFICATION.md` | Frontmatter with `status: passed`, `method: backfill`; checklist of verified items from code |

**CONTEXT.md template:**
```markdown
# NN-CONTEXT.md — <Phase Title>

**Phase**: N
**Name**: <name from ROADMAP>
**Date**: <today>
**Status**: Complete (backfilled)

## Domain

<1-2 paragraph summary from ROADMAP phase goal>

## Scope

- <itemized scope from ROADMAP plan breakdown>
```

**SUMMARY template:**
```markdown
# NN-0X-SUMMARY.md — <Plan title from ROADMAP>

**Status**: ✅ Complete
**Date**: <today>

## Completed

- <items derived from ROADMAP plan description and verified in code>
```

**VERIFICATION template:**
```markdown
---
status: passed
phase: N
date: <today>
method: backfill
---

# Phase N Verification

**Status**: Passed (backfilled — code verified in repo)

## Verified Items

- [x] <each deliverable verified against committed code>
```

### 4. Parallelize with background agents

When backfilling multiple phases, launch one background agent per phase (or group of similar phases) to create directories and write files concurrently.

### 5. Verify GSD picks up changes

After all artifacts are created, confirm GSD now recognizes all phases:

```bash
gsd_run query init.milestone-op
# Should show: "all_phases_complete": true, "completed_phases" == "phase_count"
```

If `all_phases_complete` is still false, re-check that every phase directory has the required artifacts (CONTEXT.md, at least one SUMMARY.md, VERIFICATION.md).

### 6. Handle partial tracking gaps

Sometimes a phase directory exists but is missing specific artifacts (e.g., has PLANs and SUMMARYs but no VERIFICATION.md). Apply the same backfill pattern — create only the missing artifact(s) using the templates above. Check with:

```bash
for d in .planning/phases/*/; do
  phase=$(basename "$d")
  vfile="$d"/*-VERIFICATION.md
  ls $vfile 1>/dev/null 2>&1 || echo "$phase: MISSING VERIFICATION"
done
```

### 7. Update ROADMAP and STATE, then commit

- Ensure ROADMAP.md phase table shows ✅ Complete for all phases
- Update STATE.md frontmatter (`completed_phases`, `percent: 100`, `status: All Phases Complete`)
- Commit: `docs: backfill tracking artifacts for phases NN-MM + update STATE.md to 100%`

### 8. Proceed to lifecycle

Once tracking is consistent, run the standard lifecycle: audit → complete → cleanup.

## Key Principles

- **Never re-execute work that already exists** — backfill is faster and avoids duplicating committed code
- **Derive artifacts from ROADMAP + code** — don't invent details; use the plan descriptions and actual file structure
- **Mark as backfilled** — use `method: backfill` in VERIFICATION frontmatter so future audits know these weren't generated through the standard cycle
- **Match existing patterns** — read a neighboring complete phase directory to ensure consistent artifact structure
