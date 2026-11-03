#!/usr/bin/env python3
"""Which handbook digests are out of date with the skill files they describe.

Every skill and every plugin block in docs/data/skills/parts/*.json records
  source_commit  the repository commit whose skill files the digest describes (full hash)
  source_date    the date of that commit
This script compares those commits with the current checkout. Python standard library and git only.

  python3 scripts/digest-drift.py                  digests whose files changed since their commit: commits and files
  python3 scripts/digest-drift.py --all            also list the digests that are up to date
  python3 scripts/digest-drift.py --diff KEY       the changes to KEY's files since its commit, to rewrite from
  python3 scripts/digest-drift.py --mark KEY ... [--commit REV]
                                                   after updating digests, record REV (default HEAD) as their commit

KEY is <plugin>/<skill> for a skill, <plugin>/plugin for a plugin block, <plugin> for the block and all its
skills, or all. The report also lists skills, steps and library files in the repository that no digest covers.
"""
import glob
import json
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PARTS = os.path.join(ROOT, 'docs', 'data', 'skills', 'parts')


def git(*args):
    r = subprocess.run(['git', *args], cwd=ROOT, capture_output=True, text=True)
    if r.returncode:
        sys.exit(f'git {" ".join(args[:3])}: {r.stderr.strip()}')
    return r.stdout


def exists(path):
    return os.path.exists(os.path.join(ROOT, path))


def load():
    return [(f, json.load(open(f, encoding='utf-8'))) for f in sorted(glob.glob(os.path.join(PARTS, '*.json')))]


def records(parts):
    """(key, label, part file, record, files the digest is written from) for every plugin block and skill."""
    names = {d['plugin_id']: d['plugin']['name'] for _, d in parts if d.get('plugin')}
    out = []
    for f, d in parts:
        pid = d['plugin_id']
        p = d.get('plugin')
        if p:
            files = [p['practice_profile']['file']] if p['practice_profile'].get('file') else []
            files += [lib['file'] for lib in p['shared_libraries']]
            files += [x for x in (f'{pid}/README.md', f'{pid}/.claude-plugin/plugin.json') if exists(x)]
            out.append((f'{pid}/plugin', f'{p["name"]}（领域说明）', f, p, files))
        for s in d['skills']:
            files = list(dict.fromkeys(s['sources'] + [r['file'] for r in s['shared_refs']]))
            out.append((f'{pid}/{s["id"]}', f'{names.get(pid, pid)}／{s["name"]}', f, s, files))
    return out


def uncovered(parts):
    """Skills, steps and library files in the repository that no digest covers yet."""
    skills = {(d['plugin_id'], s['id']) for _, d in parts for s in d['skills']}
    sources = {x for _, d in parts for s in d['skills'] for x in s['sources']}
    libs = {lib['file'] for _, d in parts if d.get('plugin') for lib in d['plugin']['shared_libraries']}
    notes = []
    for path in git('ls-files').splitlines():
        top = re.match(r'([^/.][^/]*)/skills/([^/_][^/]*)/SKILL\.md$', path) or re.match(r'(shared)/([^/]+)/SKILL\.md$', path)
        step = re.match(r'([^/.][^/]*)/skills/([^/_][^/]*)/[^/]+/SKILL\.md$', path)
        if top and (top.group(1), top.group(2)) not in skills:
            notes.append(f'没有摘要的 skill：{path}')
        elif step and (step.group(1), step.group(2)) in skills and path not in sources:
            notes.append(f'没有写进摘要的步骤：{path}')
        elif (re.match(r'[^/.][^/]*/skills/_shared/[^/]+\.md$', path) or re.match(r'shared/(?:[^/]+/)?references/[^/]+\.md$', path)) \
                and path not in libs and not path.endswith('/README.md'):
            notes.append(f'没有登记的引用库：{path}')
    return notes


def drift(rec):
    """(commits since the recorded one, changed files with line counts) — the working tree counts."""
    base, files = rec[3].get('source_commit'), rec[4]
    if not base:
        return None, None
    commits = git('log', '--format=%h %ad %s', '--date=short', f'{base}..HEAD', '--', *files).splitlines()
    changed = []
    for line in git('diff', '--numstat', base, '--', *files).splitlines():
        add, rem, path = line.split('\t', 2)
        changed.append(f'{path}  +{add} -{rem}')
    return commits, changed


def report(parts, show_all):
    recs = records(parts)
    stale, fresh, unknown = [], [], []
    for rec in recs:
        commits, changed = drift(rec)
        if commits is None:
            unknown.append(rec)
        elif commits or changed:
            stale.append((rec, commits, changed))
        else:
            fresh.append(rec)
    n_plugin = sum(1 for r in recs if r[0].endswith('/plugin'))
    print(f'共 {len(recs)} 项（{n_plugin} 个领域说明、{len(recs) - n_plugin} 个 skill）：'
          f'{len(stale)} 项的源文件在记录的提交之后有改动，{len(unknown)} 项没有记录提交，{len(fresh)} 项未变。')
    for (key, label, f, r, _), commits, changed in stale:
        print(f'\n{label}  {key}  （{os.path.basename(f)}，摘要对应 {r["source_commit"][:7]} · {r.get("source_date", "?")}）')
        if commits:
            print('  此后的提交：')
            print('\n'.join('    ' + c for c in commits))
        if changed:
            print('  改动的文件（含未提交的改动）：')
            print('\n'.join('    ' + c for c in changed))
    for key, label, f, _, _ in unknown:
        print(f'\n{label}  {key}  （{os.path.basename(f)}）：没有记录 source_commit')
    notes = uncovered(parts)
    if notes:
        print('\n仓库里有、摘要没覆盖的：')
        print('\n'.join('  ' + n for n in notes))
    if show_all and fresh:
        print('\n未变：')
        for key, label, _, r, _ in fresh:
            print(f'  {label}  {key}  {r["source_commit"][:7]} · {r["source_date"]}')
    return 1 if stale or unknown else 0


def select(recs, keys):
    chosen = []
    for k in keys:
        hit = [r for r in recs if k == 'all' or r[0] == k or r[0].startswith(k.rstrip('/') + '/')]
        if not hit:
            sys.exit(f'没有这一项：{k}（写 <plugin>/<skill>、<plugin>/plugin、<plugin> 或 all）')
        chosen += [r for r in hit if r not in chosen]
    return chosen


def mark(parts, keys, rev):
    commit, date = git('show', '-s', '--format=%H %cs', rev).split()
    files_to_write = set()
    for key, label, f, r, files in select(records(parts), keys):
        dirty = git('status', '--porcelain', '--', *files).strip()
        if dirty:
            print(f'跳过 {key}：源文件有未提交的改动，先提交 skill 的改动再记录\n{dirty}')
            continue
        r['source_commit'], r['source_date'] = commit, date
        files_to_write.add(f)
        print(f'记录 {key} → {commit[:7]} · {date}')
    for f, d in parts:
        if f in files_to_write:
            with open(f, 'w', encoding='utf-8') as fh:
                fh.write(json.dumps(d, ensure_ascii=False, indent=2) + '\n')


def main(argv):
    parts = load()
    if '--mark' in argv:
        rev = 'HEAD'
        if '--commit' in argv:
            i = argv.index('--commit')
            rev = argv[i + 1]
            del argv[i:i + 2]
        keys = [a for a in argv if a != '--mark']
        if not keys:
            sys.exit('--mark 后面写要记录的项')
        mark(parts, keys, rev)
        return 0
    if '--diff' in argv:
        key = argv[argv.index('--diff') + 1]
        for k, label, _, r, files in select(records(parts), [key]):
            print(f'# {label}  {k}  自 {r["source_commit"][:7]} 以来的改动')
            sys.stdout.write(git('diff', r['source_commit'], '--', *files))
        return 0
    return report(parts, '--all' in argv)


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
