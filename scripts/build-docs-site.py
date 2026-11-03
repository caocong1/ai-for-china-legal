#!/usr/bin/env python3
"""Build the lawyer-facing skill handbook (docs/) from docs/data/skills/parts/*.json.

Usage: python3 scripts/build-docs-site.py            # validate parts, then write docs/**/index.html
       python3 scripts/build-docs-site.py --check    # validate only

Python standard library only. Styles and script are static files in docs/assets/ (not generated).
Pages: docs/index.html · docs/skills/ (全部索引) · docs/feedback/ (怎么提意见)
       docs/<plugin>/ (领域页) · docs/<plugin>/<skill>/ (skill 页)   — shared 也是一个 <plugin>。
"""
import glob
import html
import json
import os
import re
import sys
import urllib.parse
from datetime import date

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PARTS_DIR = os.path.join(ROOT, 'docs', 'data', 'skills', 'parts')
OUT = os.path.join(ROOT, 'docs')
REPO = 'https://github.com/caocong1/ai-for-china-legal'
BLOB = REPO + '/blob/master/'
SITE_NAME = 'AI for China Legal'
SITE_SUB = 'Skill 说明'
SITE_URL = 'https://caocong1.github.io/ai-for-china-legal/'
TODAY = date.today().isoformat()

sys.path.insert(0, os.path.join(ROOT, 'scripts'))
import importlib.util  # noqa: E402

_spec = importlib.util.spec_from_file_location('validate_skill_digest', os.path.join(ROOT, 'scripts', 'validate-skill-digest.py'))
_val = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_val)

# 分组沿用 README 的分类；顺序即首页顺序。
GROUPS = [
    ('共享流程', '每个事项都要经过的总流程、开工前确认、研究闸门，以及律师反馈的回流机制', ['shared']),
    ('交易与咨询', '', ['commercial-legal', 'data-compliance', 'employment-legal', 'ip-legal', 'ai-governance', 'regulatory-legal']),
    ('诉讼', '', ['litigation-legal']),
    ('中国特有领域', '', ['construction-legal', 'family-legal', 'criminal-compliance']),
    ('学习与实务', '', ['law-student', 'legal-aid']),
    ('生态系统', '', ['legal-builder-hub']),
]
PLUGIN_ORDER = [p for _, _, ps in GROUPS for p in ps]
KIND_LABEL = {'workflow': '流程', 'setup': '配置', 'monitor': '监控', 'shared': '共享流程'}
SHARED_ORDER = ['ai-for-china-legal-workflow', 'legal-document-intake', 'research-gate', 'feedback-refinement']


# ------------------------------------------------------------------ helpers
def esc(s):
    return html.escape(str(s), quote=True)


# Lawyer-facing text is plain Chinese (scripts/validate-skill-digest.py enforces it); only marks and dates need care.
_NOWRAP = re.compile(r'\[[^\[\]\n<>]{1,16}\]|\b\d{4}-\d{1,2}(?:-\d{1,2})?\b')


def inline(s):
    """Escape; keep [待验证]-style marks and dates on one line."""
    return _NOWRAP.sub(lambda m: '<span class="nw">' + m.group(0) + '</span>', esc(s))


_STEP_PREFIX = re.compile(r'^\s*(?:第[一二三四五六七八九十零〇\d]+步|步骤\s*[\d一二三四五六七八九十]+)\s*[：:、.．]?\s*')


_TITLE_PAREN = re.compile(r'^(.+?)([（(][^（）()]{1,30}[）)])\s*$')


def title_html(name):
    """A title whose trailing parenthetical never splits: inline and unbroken on wide screens,
    its own smaller line on narrow ones."""
    m = _TITLE_PAREN.match(name)
    if not m:
        return esc(name)
    return esc(m.group(1)) + '<span class="h1-sub">' + esc(m.group(2)) + '</span>'


def step_name(name):
    """Drop the source's own 第X步 prefix: the page numbers steps itself."""
    cleaned = _STEP_PREFIX.sub('', name)
    return cleaned or name


def _grams(t):
    t = re.sub(r'[\s，。、；：「」『』（）()《》\[\]【】,.;:!?！？—/·“”"\'-]+', '', t)
    return {t[i:i + 2] for i in range(len(t) - 1)}


def related_checks(point, notes):
    """Step notes that a review point restates: bigram overlap ≥ 0.45 for the best match,
    others kept when ≥ max(0.45, 0.6 × best); shown as a hint, never as proof of absence. Calibrated on contract-review against a reviewer's manual mapping."""
    P = _grams(point)
    scored = []
    for key, text in notes:
        T = _grams(text)
        if P and T:
            scored.append((len(P & T) / min(len(P), len(T)), key))
    scored.sort(reverse=True)
    if not scored or scored[0][0] < 0.45:
        return []
    best = scored[0][0]
    keep = [k for v, k in scored if v >= max(0.45, 0.6 * best)]
    return keep[:3] if keep else [scored[0][1]]


def ul(items, cls=''):
    if not items:
        return ''
    c = f' class="{cls}"' if cls else ''
    return f'<ul{c}>' + ''.join(f'<li>{inline(i)}</li>' for i in items) + '</ul>'


def ol(items, cls=''):
    if not items:
        return ''
    c = f' class="{cls}"' if cls else ''
    return f'<ol{c}>' + ''.join(f'<li>{inline(i)}</li>' for i in items) + '</ol>'


_TAIL = re.compile(r'([　-〿一-鿿＀-￯]{6})$')


def glue_tail(h):
    """Keep the last six CJK characters of a paragraph together, so no line ends with one or two characters."""
    return _TAIL.sub(r'<span class="nw">\1</span>', h)


def para(s, cls=''):
    if not s:
        return ''
    c = f' class="{cls}"' if cls else ''
    return f'<p{c}>{glue_tail(inline(s))}</p>'


def maint_block(pairs, files):
    """Identifiers and source files for maintainers, folded away from the lawyer's reading path."""
    meta = '；'.join(f'{esc(k)} <code>{esc(v)}</code>' for k, v in pairs)
    items = ''.join(f'<li><a href="{gh(f)}">{esc(f)}</a></li>' for f in files)
    return (f'<details class="maint"><summary>维护信息（律师可略过）</summary><p class="small">{meta}</p>'
            + (f'<ul class="sources">{items}</ul>' if items else '') + '</details>')


def lib_anchor(path):
    return 'lib-' + re.sub(r'[^a-z0-9]+', '-', path.lower().rsplit('.', 1)[0]).strip('-')


# Every file a skill cites as a shared rule, named from the data itself: source path -> (label, href from site root).
REFS = {}
# skill id -> [(plugin id, plugin name, skill name)]; ids repeat across plugins (contract-review).
SKILLS = {}


def build_refs(plugins):
    for p in plugins:
        pid, pname = p['id'], p['plugin']['name']
        for sk in p['skills']:
            SKILLS.setdefault(sk['id'], []).append((pid, pname, sk['name']))
        REFS[f'{pid}/CLAUDE.md'] = (p['plugin']['practice_profile'].get('name') or f'{pname}实践配置', f'{pid}/index.html#profile')
        for l in p['plugin']['shared_libraries']:
            REFS[l['file']] = (l['name'], f'{pid}/index.html#{lib_anchor(l["file"])}')
        base = 'shared' if pid == 'shared' else f'{pid}/skills'
        for sk in p['skills']:
            REFS[f'{base}/{sk["id"]}/SKILL.md'] = (sk['name'], f'{pid}/{sk["id"]}/index.html')
            for st in sk['steps']:
                if st.get('id'):
                    REFS[f'{base}/{sk["id"]}/{st["id"]}/SKILL.md'] = (
                        f'{sk["name"]} · 第 {st["n"]} 步「{step_name(st["name"])}」', f'{pid}/{sk["id"]}/index.html#step-{st["n"]}')
    return sorted({r['file'] for p in plugins for sk in p['skills'] for r in sk['shared_refs'] if r['file'] not in REFS})


def ref_link(path, r):
    label, href = REFS[path]
    return f'<a href="{r}{href}">{esc(label)}</a>'


def copy_btn(text, label='复制引用', primary=False):
    cls = 'btn btn-copy btn-primary' if primary else 'btn btn-copy'
    return f'<button type="button" class="{cls}" data-copy-text="{esc(text)}">{label}</button>'


def gh(path):
    return BLOB + path


def issue_url(title, body):
    return REPO + '/issues/new?' + urllib.parse.urlencode({'title': title, 'body': body})


def rel(depth):
    return '../' * depth


# ------------------------------------------------------------------ data
def load():
    files = sorted(glob.glob(os.path.join(PARTS_DIR, '*.json')))
    if not files:
        sys.exit('no parts found in ' + PARTS_DIR)
    problems = []
    for f in files:
        problems += _val.validate(f)
    if problems:
        print('\n'.join(problems))
        sys.exit(f'{len(problems)} validation problem(s); fix docs/data/skills/parts first')
    plugins = {}
    for f in files:
        d = json.load(open(f, encoding='utf-8'))
        pid = d['plugin_id']
        p = plugins.setdefault(pid, {'id': pid, 'plugin': None, 'skills': [], 'parts': []})
        p['parts'].append(os.path.basename(f))
        if d.get('plugin'):
            if p['plugin']:
                print(f'warning: plugin block for {pid} appears twice ({f})')
            p['plugin'] = d['plugin']
        p['skills'] += d['skills']
    # 补齐缺 plugin 块的插件（用 marketplace 的名字），并报告
    market = json.load(open(os.path.join(ROOT, '.claude-plugin', 'marketplace.json'), encoding='utf-8'))
    names = {m['name']: m for m in market['plugins']}
    for pid, p in plugins.items():
        if not p['plugin']:
            m = names.get(pid, {})
            print(f'warning: {pid} has no plugin block; using marketplace metadata')
            p['plugin'] = {'name': m.get('displayName', pid), 'tagline': m.get('description', ''), 'summary': m.get('description', ''),
                           'not_for': [], 'shared_libraries': [], 'practice_profile': {'file': f'{pid}/CLAUDE.md', 'sections': [], 'effects': []}}
        p['skills'] = order_skills(pid, p['skills'])
        ids = [s['id'] for s in p['skills']]
        dup = {i for i in ids if ids.count(i) > 1}
        if dup:
            print(f'warning: duplicate skill ids in {pid}: {sorted(dup)}')
    missing = [pid for pid in PLUGIN_ORDER if pid not in plugins]
    if missing:
        print('warning: no data for plugins: ' + ', '.join(missing))
    extra = [pid for pid in plugins if pid not in PLUGIN_ORDER]
    if extra:
        print('warning: plugins not in GROUPS (appended at the end): ' + ', '.join(extra))
    ordered = [plugins[pid] for pid in PLUGIN_ORDER if pid in plugins] + [plugins[pid] for pid in sorted(extra)]
    unnamed = build_refs(ordered)
    if unnamed:
        sys.exit('shared_refs without a name (add the file to its plugin\'s shared_libraries, or drop the ref):\n  ' + '\n  '.join(unnamed))
    return ordered


def order_skills(pid, skills):
    """plugin.json 的顶层顺序；冷启动访谈排最后；shared 用固定顺序。"""
    if pid == 'shared':
        return sorted(skills, key=lambda s: SHARED_ORDER.index(s['id']) if s['id'] in SHARED_ORDER else 99)
    order = []
    pj = os.path.join(ROOT, pid, '.claude-plugin', 'plugin.json')
    if os.path.exists(pj):
        for s in json.load(open(pj, encoding='utf-8')).get('skills', []):
            parts = s.get('path', '').split('/')
            if len(parts) == 3 and parts[0] == 'skills':
                order.append(parts[1])
    def key(s):
        if s['kind'] == 'setup':
            return (1, 0)
        return (0, order.index(s['id']) if s['id'] in order else 50)
    return sorted(skills, key=key)


# ------------------------------------------------------------------ page shell
def shell(*, title, body, depth, description='', current='', crumbs=None, has_rail=False, rail='', lead=''):
    r = rel(depth)
    nav = [('home', '首页', r + 'index.html'), ('skills', '全部 skill', r + 'skills/index.html'),
           ('shared', '共享流程', r + 'shared/index.html'), ('feedback', '怎么提意见', r + 'feedback/index.html')]
    nav_html = ''.join(
        f'<a href="{href}"{" aria-current=\"page\"" if key == current else ""}>{label}</a>' for key, label, href in nav)
    crumb_html = ''
    if crumbs:
        crumb_html = '<nav class="crumbs wrap" aria-label="位置">' + ''.join(
            f'<span><a href="{href}">{esc(label)}</a></span>' if href else f'<span>{esc(label)}</span>' for label, href in crumbs) + '</nav>'
    page_cls = 'page has-rail' if has_rail else 'page'
    rail_html = f'<aside class="rail">{rail}</aside>' if has_rail else ''
    return f'''<!doctype html>
<html lang="zh-Hans" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{esc(title)} · {SITE_NAME} {SITE_SUB}</title>
<meta name="description" content="{esc(description)}">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" media="(prefers-color-scheme: light)" content="#fcfaf7">
<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#1c1915">
<link rel="stylesheet" href="{r}assets/site.css">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23fbfaf8'/%3E%3Ctext x='16' y='23' font-size='20' text-anchor='middle' fill='%23b4392c' font-family='serif' font-weight='700'%3E%E6%B3%95%3C/text%3E%3C/svg%3E">
</head>
<body>
<a class="skip" href="#main">跳到正文</a>
<div id="live" class="vh" role="status" aria-live="polite"></div>
<header class="hd"><div class="wrap hd-in">
  <a class="hd-mark" href="{r}index.html">{SITE_NAME}<small>{SITE_SUB}</small></a>
  <nav class="hd-nav" aria-label="站点">{nav_html}</nav>
</div></header>
{crumb_html}
<main id="main" class="wrap">
<div class="{page_cls}">
{lead}
{rail_html}
<div class="article">
{body}
</div>
</div>
</main>
<footer class="ft"><div class="wrap">
  <p>本站把 <a href="{REPO}">{SITE_NAME}</a> 项目里的 skill 规则改写成给律师看的说明，与 skill 原文不一致时以原文为准。所有 skill 的输出都是供律师审查的草稿，不是法律意见。生成日期 <span class="nw">{TODAY}</span>。</p>
  <p>发现说明与 skill 的实际表现不一致，或对 skill 的规则有意见：见<a href="{r}feedback/index.html">怎么提意见</a>。</p>
</div></footer>
<script src="{r}assets/site.js" defer></script>
</body>
</html>
'''


def write(path, content):
    full = os.path.join(OUT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, 'w', encoding='utf-8') as f:
        f.write(content)


# ------------------------------------------------------------------ skill page
def sec(sid, n, title, inner, extra_cls=''):
    if not inner:
        return ''
    return f'<section class="sec {extra_cls}" id="{sid}"><h2><span class="n">{n}</span>{esc(title)}</h2>{inner}</section>'


def render_skill(plugin, skill, depth=2):
    p = plugin['plugin']
    pid = plugin['id']
    sid = skill['id']
    ref = f'{pid}/{sid}'
    r = rel(depth)
    toc_items = []
    body = []

    # 页头：标题 + 右侧批注栏摘要（本页的记忆点从第一屏开始）
    n_checks = sum(len(st['lawyer_check']) for st in skill['steps'])
    n_steps_with = sum(1 for st in skill['steps'] if st['lawyer_check'])
    n_review = len(skill['review_points'])
    lines = []
    if n_checks:
        lines.append(f'<p><a href="#steps"><b class="num">{n_checks}</b> 条请律师核对</a>，分在 {n_steps_with} 个步骤旁</p>')
    if n_review:
        lines.append(f'<p><a href="#review"><b class="num">{n_review}</b> 条审阅清单</a>，在页末，可一键复制</p>')
    lead_notes = (f'<aside class="lead-notes" aria-label="本页批注"><p class="note-k">本页批注</p>{"".join(lines)}'
                  f'<p class="small">先读概要和审阅清单，再按需看步骤细节。</p></aside>') if lines else ''
    lead = (f'''<header class="lead{" has-notes" if lead_notes else ""}">
  <div class="meta"><span class="kind">{KIND_LABEL.get(skill["kind"], skill["kind"])}</span></div>
  <h1>{title_html(skill["name"])}</h1>
  <p class="tagline">{inline(skill["tagline"])}</p>
  {lead_notes}
</header>''')

    # 1 概要
    n = 0
    def nxt():
        nonlocal n
        n += 1
        return f'{n:02d}'
    inner = '<div class="prose measure">' + para(skill['summary']) + '</div>'
    toc_items.append(('summary', '概要'))
    body.append(sec('summary', nxt(), '概要', inner))

    # 2 适用与边界
    facts = []
    if skill['when']:
        facts.append('<div><h3>适用场景</h3>' + ul(skill['when']) + '</div>')
    if skill['not_for']:
        facts.append('<div><h3>不做什么</h3>' + ul(skill['not_for']) + '</div>')
    if facts:
        toc_items.append(('scope', '适用与边界'))
        body.append(sec('scope', nxt(), '适用与边界', '<div class="facts">' + ''.join(facts) + '</div>'))

    # 3 输入与产出
    facts = []
    if skill['inputs']:
        items = ''.join(
            f'<li>{inline(i["item"])}<span class="req">{"必需" if i.get("required") else "可选"}</span>'
            + (f'<br><span class="small">{inline(i["note"])}</span>' if i.get('note') else '') + '</li>' for i in skill['inputs'])
        facts.append(f'<div><h3>需要提供</h3><ul>{items}</ul></div>')
    if skill['outputs']:
        items = ''.join(
            f'<li><b>{inline(o["name"])}</b>' + (f'<span class="req">读者：{esc(o["audience"])}</span>' if o.get('audience') else '')
            + f'<br><span class="small">{inline(o["structure"])}</span></li>' for o in skill['outputs'])
        facts.append(f'<div><h3>产出</h3><ul>{items}</ul></div>')
    if facts:
        toc_items.append(('io', '输入与产出'))
        body.append(sec('io', nxt(), '输入与产出', '<div class="facts">' + ''.join(facts) + '</div>'))

    # 4 开始前
    parts = []
    if skill['preconditions']:
        parts.append('<h3>前置条件</h3>' + ul(skill['preconditions']))
    if skill['guardrails']:
        parts.append('<h3>硬性规则</h3><dl class="kv measure">' + ''.join(
            f'<dt>{inline(g["name"])}</dt><dd>{inline(g["rule"])}</dd>' for g in skill['guardrails']) + '</dl>')
    if parts:
        toc_items.append(('before', '开始前'))
        body.append(sec('before', nxt(), '开始前', ''.join(parts)))

    # 5 执行步骤（主体）：步骤头 → 批注 → 细节；宽屏批注浮到右栏
    if skill['steps']:
        steps_html = []
        for st in skill['steps']:
            k = st['n']
            name = step_name(st['name'])
            head = f'<h3 id="step-{k}">{inline(name)}</h3>'
            if st.get('standalone'):
                head += '<span class="small">可单独使用</span>'
            top = f'<div class="step-top"><div class="step-head">{head}</div>{para(st["goal"], "step-goal")}</div>'
            parts = []
            if st['actions']:
                parts.append('<div class="step-part"><h4>做法</h4>' + ol(st['actions']) + '</div>')
            if st['rules']:
                parts.append('<div class="step-part"><h4>内置规则</h4>' + ul(st['rules'], 'rules') + '</div>')
            if st['legal_basis']:
                parts.append('<div class="step-part"><h4>法律依据</h4>' + ul(st['legal_basis'], 'law') + '</div>')
            if st['output']:
                parts.append('<div class="step-part output"><h4>产出</h4>' + para(st['output']) + '</div>')
            notes = ''
            if st['lawyer_check']:
                items = ''.join(
                    f'<li class="note" id="check-{k}-{j}"><span class="note-k">核对 {k}.{j}</span>{inline(t)}'
                    + copy_btn(f'【{p["name"]}／{skill["name"]} · 第{k}步 {name} · 核对 {k}.{j}】{t}') + '</li>'
                    for j, t in enumerate(st['lawyer_check'], 1))
                notes = f'<aside class="step-notes" aria-label="步骤 {k} 请律师核对"><h4>请律师核对</h4><ul class="notes">{items}</ul></aside>'
            steps_html.append(f'<li class="step">{top}{notes}<div class="step-detail">{"".join(parts)}</div></li>')
        toc_items.append(('steps', '执行步骤', [(f'step-{st["n"]}', st['n'], step_name(st['name'])) for st in skill['steps']]))
        intro = para(f'共 {len(skill["steps"])} 步，按执行顺序。每步旁边（窄屏在步骤说明之后）是请律师核对的内置判断，可逐条复制。', 'muted')
        body.append(sec('steps', nxt(), '执行步骤', intro + '<ol class="steps">' + ''.join(steps_html) + '</ol>'))

    # 6 法律依据汇总
    if skill['legal_basis']:
        toc_items.append(('law', '主要法律依据'))
        body.append(sec('law', nxt(), '主要法律依据', ul(skill['legal_basis'], 'law') + para('带「待验证」「待律师复核」标记的，是 skill 原文自己标出的未核验引用。', 'small')))

    # 7 共用规则
    if skill['shared_refs']:
        items = ''.join(f'<li>{ref_link(s["file"], r)}<br><span class="small">{inline(s["why"])}</span></li>' for s in skill['shared_refs'])
        toc_items.append(('shared', '依据的共用规则'))
        body.append(sec('shared', nxt(), '依据的共用规则',
                        para('这些法条库、口径和流程由多个 skill 共用；里面的法条或口径有误，通常改那里。', 'muted') + f'<ul class="refs">{items}</ul>'))

    # 8 质量检查 / 9 暂停与升级
    if skill['quality_checks']:
        toc_items.append(('qa', '交付前检查'))
        body.append(sec('qa', nxt(), '交付前检查', ul(skill['quality_checks'])))
    if skill['escalation']:
        toc_items.append(('escalation', '何时暂停或升级'))
        body.append(sec('escalation', nxt(), '何时暂停或升级', ul(skill['escalation'])))

    # 10 审阅清单
    if skill['review_points']:
        note_keys = [(f'{st["n"]}.{j}', t) for st in skill['steps'] for j, t in enumerate(st['lawyer_check'], 1)]
        rev = []
        for j, t in enumerate(skill['review_points'], 1):
            rel_keys = related_checks(t, note_keys)
            label = f'【{p["name"]}／{skill["name"]} · 审阅 {j:02d}】{t}'
            xref = ('<span class="xref">相关批注：' + '、'.join(f'<a href="#check-{k.replace(".", "-")}">核对 {k}</a>' for k in rel_keys) + '</span>') if rel_keys else ''
            rev.append((label, f'<li><span>{inline(t)}{xref}</span>' + copy_btn(label) + '</li>'))
        items = ''.join(h for _, h in rev)
        all_text = '\n'.join(lbl for lbl, _ in rev)
        gh_body = f'页面：{SITE_URL}{pid}/{sid}/\n\n针对哪一条（复制页面上的引用粘贴在此）：\n\n\n意见（同意 / 反对 / 应改为）：\n\n\n依据或实务经验：\n'
        gh_title = f'[skill 意见] {p["name"]}／{skill["name"]}'
        actions = (f'<div class="review-actions" id="review-actions">{copy_btn(all_text, "复制全部审阅条目", primary=True)}'
                   f'<a class="btn" href="{issue_url(gh_title, gh_body)}">在 GitHub 提 issue</a>'
                   f'<a class="btn" href="{r}feedback/index.html">怎么提意见</a>'
                   f'<p class="small">复制后粘到微信发给操作员即可；每条前的编号能让维护者找到对应的规则。</p></div>')
        toc_items.append(('review', '审阅清单'))
        body.append(sec('review', nxt(), '审阅清单',
                        para('请律师重点核对：下面是这个流程内置的法律判断、立场、阈值和清单，每一条都可以同意、反对或补充。条目里「供核对」之后的内容是本站整理时对照现行条文补充的提示，不是 skill 原文。条目下的「相关批注」按文字重合自动匹配到步骤旁的核对条目，可能不全。', 'muted') + f'<ol class="review">{items}</ol>' + actions))

    # 11 示例提示词
    if skill['example_prompts']:
        toc_items.append(('prompts', '示例提示词'))
        body.append(sec('prompts', nxt(), '示例提示词', '<ul class="prompts measure">' + ''.join(f'<li>{inline(t)}</li>' for t in skill['example_prompts']) + '</ul>'))

    # 维护信息：不编号、不进目录
    body.append(maint_block([('skill 标识', ref), ('命令', skill['command'])], skill['sources']))

    def toc_li(item):
        i, t = item[0], item[1]
        sub = item[2] if len(item) > 2 else []
        inner = ('<ol>' + ''.join(f'<li><a href="#{si}"><span class="toc-n num">{sn}</span><span>{inline(st)}</span></a></li>' for si, sn, st in sub) + '</ol>') if sub else ''
        return f'<li><a href="#{i}">{esc(t)}</a>{inner}</li>'
    rail = (f'<details class="toc-box" open><summary>本页目录 · {len(toc_items)} 节</summary>'
            '<nav class="toc" aria-label="本页目录"><h2>本页</h2><ol>' + ''.join(toc_li(x) for x in toc_items) + '</ol></nav></details>')
    crumbs = [('首页', r + 'index.html'), (p['name'], r + f'{pid}/index.html'), (skill['name'], None)]
    return shell(title=f'{skill["name"]}（{p["name"]}）', body=''.join(body), depth=depth, description=skill['tagline'],
                 current='shared' if pid == 'shared' else '', crumbs=crumbs, has_rail=True, rail=rail, lead=lead)


# ------------------------------------------------------------------ plugin page
def skill_table(plugin, depth, with_plugin_col=False):
    r = rel(depth)
    rows = []
    for s in plugin['skills']:
        href = f'{r}{plugin["id"]}/{s["id"]}/index.html'
        search = ' '.join([s['name'], s['command'], s['tagline'], plugin['plugin']['name'], plugin['id'], s['id']] + s['when'][:3]).lower()
        pcol = f'<td>{esc(plugin["plugin"]["name"])}</td>' if with_plugin_col else ''
        rows.append(f'<tr data-search="{esc(search)}">{pcol}<td><span class="name"><a href="{href}">{esc(s["name"])}</a></span> <span class="kind">{KIND_LABEL.get(s["kind"], s["kind"])}</span></td>'
                    f'<td>{inline(s["tagline"])}</td><td class="n num">{len(s["steps"])}</td></tr>')
    head = ('<th>领域</th>' if with_plugin_col else '') + '<th>skill</th><th>做什么</th><th class="n">步骤</th>'
    return f'<table class="skill-list"><thead><tr>{head}</tr></thead><tbody>{"".join(rows)}</tbody></table>'


def render_plugin(plugin, depth=1):
    p = plugin['plugin']
    pid = plugin['id']
    r = rel(depth)
    body = [f'''<header class="lead">
  <h1>{esc(p["name"])}</h1>
  <p class="tagline">{inline(p["tagline"])}</p>
</header>''']
    n = 0

    def nxt():
        nonlocal n
        n += 1
        return f'{n:02d}'
    nsteps = sum(len(s['steps']) for s in plugin['skills'])
    body.append(sec('skills', nxt(), 'Skill 一览', para(f'{len(plugin["skills"])} 个流程，共 {nsteps} 个步骤。点名称看详细说明。', 'muted') + skill_table(plugin, depth)))
    body.append(sec('summary', nxt(), '概要', '<div class="prose measure">' + para(p['summary']) + '</div>'))
    pp = p['practice_profile']
    if pp.get('sections') or pp.get('effects'):
        has_interview = any(sk['kind'] == 'setup' for sk in plugin['skills'])
        intro = pp.get('intro') or ('实践配置记录贵所在本领域的立场与习惯，由冷启动访谈生成，律师也可以直接修改；每个流程开始前都会先读它。' if has_interview
                                    else '这份配置记录这组流程共用的规则与默认做法，律师可以直接阅读和修改；每个流程开始前都会先读它。')
        inner = para(intro, 'measure')
        if pp.get('sections'):
            inner += '<h3>配置哪些内容</h3>' + ul(pp['sections'])
        if pp.get('effects'):
            inner += '<h3>会怎样改变输出</h3>' + ul(pp['effects'])
        body.append(sec('profile', nxt(), pp.get('name') or '实践配置', inner))
    if p['shared_libraries']:
        def used_by(ids):
            links = []
            for i in ids:
                hits = [h for h in SKILLS.get(i, []) if h[0] == pid] or SKILLS.get(i, [])
                links += [f'<a href="{r}{hp}/{i}/index.html">{esc(sn if hp == pid else f"{sn}（{pn}）")}</a>' for hp, pn, sn in hits]
            return f'<br><span class="small">用于：{"、".join(links)}</span>' if links else ''
        items = ''.join(
            f'<li id="{lib_anchor(l["file"])}"><b>{esc(l["name"])}</b><br>{inline(l["what"])}{used_by(l.get("used_by", []))}</li>' for l in p['shared_libraries'])
        body.append(sec('libs', nxt(), '领域引用库', para('本领域各流程共用的法条、口径和规则；法条有误通常改这里。', 'muted') + f'<ul class="refs measure">{items}</ul>'))
    if p['not_for']:
        body.append(sec('notfor', nxt(), '不做什么', ul(p['not_for'])))
    body.append(maint_block([('领域标识', pid)], ([pp['file']] if pp.get('file') else []) + [l['file'] for l in p['shared_libraries']]))
    crumbs = [('首页', r + 'index.html'), (p['name'], None)]
    return shell(title=p['name'], body=''.join(body), depth=depth, description=p['tagline'], current='shared' if pid == 'shared' else '', crumbs=crumbs)


# ------------------------------------------------------------------ index, home, feedback
def render_index(plugins, depth=1):
    groups = []
    for gname, _, pids in GROUPS:
        ps = [p for p in plugins if p['id'] in pids]
        if not ps:
            continue
        inner = ''.join(('' if p['plugin']['name'] == gname else f'<h4><a href="{rel(depth)}{p["id"]}/index.html">{esc(p["plugin"]["name"])}</a></h4>') + skill_table(p, depth) for p in ps)
        groups.append(f'<section class="group"><h3>{esc(gname)}</h3>{inner}</section>')
    extra = [p for p in plugins if p['id'] not in PLUGIN_ORDER]
    if extra:
        groups.append('<section class="group"><h3>其他</h3>' + ''.join(skill_table(p, depth) for p in extra) + '</section>')
    total = sum(len(p['skills']) for p in plugins)
    body = f'''<header class="lead"><h1>全部 skill</h1><p class="tagline">按领域分组。输入名称或关键词（如「竞业」「保函」「问卷」）过滤。</p></header>
<form class="search" role="search" onsubmit="return false"><label class="vh" for="q">过滤 skill</label><input id="q" type="search" placeholder="名称或关键词…" autocomplete="off"><output id="q-count" for="q">共 {total} 个</output></form>
<p class="muted" id="q-empty" hidden>没有匹配的 skill。试试更短的关键词，例如「合同」「劳动」「备案」。</p>
{''.join(groups)}'''
    return shell(title='全部 skill', body=body, depth=depth, description=f'{SITE_NAME} 全部 skill 索引', current='skills', crumbs=[('首页', rel(depth) + 'index.html'), ('全部 skill', None)])


def render_home(plugins):
    shared = next((p for p in plugins if p['id'] == 'shared'), None)
    flow_steps = []
    flow_def = [
        ('ai-for-china-legal-workflow', '自动接管法律事项', '律师发来任务或文件，AI 按内容判断进入法律工作流，不需要说口令；默认按资深大陆律师的工作产物标准办，但不代替签字律师。'),
        ('legal-document-intake', '开工前先问清', '读完全部材料，列出会改变成果的问题，分成必须确认、建议确认、可按默认、材料请求四档；在回复里写明开工前确认结论，然后直接提问，或生成问卷文档发给律师。'),
        ('research-gate', '先检索、后结论', '每个法律问题都同时找支持依据、反向依据和程序上的陷阱；来源分五级，法条逐字核对官方文本，核对不了的标「待律师复核」。'),
        (None, '进入专项流程', '按要交付的文书进入具体领域的流程（合同审查、答辩状、尽调、备案……）。每个流程的步骤、规则和内置判断见各 skill 页。'),
        (None, '交付前检查与复核说明', '不覆盖原件；修订可以逐条接受或拒绝；版式逐页检查后交付。高风险事项写明是否由另一个 AI 模型独立复核。'),
        ('feedback-refinement', '律师意见回流', '律师的评价和修改意见按 skill 归类，只做小范围、可核对的修改，并记成脱敏案例。本站每条「核对」都是为这一步准备的。'),
    ]
    for sid, title, text in flow_def:
        link = ''
        if sid and shared and any(s['id'] == sid for s in shared['skills']):
            link = f' <a href="shared/{sid}/index.html">详细说明</a>'
        flow_steps.append(f'<li><div><h3>{esc(title)}</h3><p>{esc(text)}{link}</p></div></li>')

    rows = []
    for gname, gdesc, pids in GROUPS:
        ps = [p for p in plugins if p['id'] in pids and p['id'] != 'shared']
        if not ps:
            continue
        rows.append(f'<tr><th colspan="3">{esc(gname)}</th></tr>')
        for p in ps:
            rows.append(f'<tr><td><span class="name"><a href="{p["id"]}/index.html">{esc(p["plugin"]["name"])}</a></span></td>'
                        f'<td>{inline(p["plugin"]["tagline"])}</td><td class="n num">{len(p["skills"])}</td></tr>')
    nplugins = len([p for p in plugins if p['id'] != 'shared'])
    nskills = sum(len(p['skills']) for p in plugins)
    nsteps = sum(len(s['steps']) for p in plugins for s in p['skills'])
    body = f'''<header class="lead home-lead">
  <h1><span class="nw">给律师看的</span> <span class="nw">skill 说明</span></h1>
  <p class="tagline">{SITE_NAME} 是一套面向中国大陆律师的法律 AI 工作流。这里按律师能读的方式讲清每个 skill 能做什么、怎么做到、分几步、内置了哪些法律判断，并把可以提意见的地方逐条标出来。</p>
  <p class="notice">所有 skill 的输出都是供律师审查的草稿，不是法律意见，也不替代执业律师的判断。本站只讲工具怎么工作。</p>
  <div class="stats"><span><b class="num">{nplugins}</b>个领域</span><span><b class="num">{nskills}</b>个 skill</span><span><b class="num">{nsteps}</b>个步骤</span></div>
</header>
<section class="sec" id="flow"><h2><span class="n">01</span>一个事项怎么走</h2>
<p class="measure">不论哪个领域，每个法律事项都经过同样的外层流程。专项流程在第 4 步。</p>
<ol class="flow">{''.join(flow_steps)}</ol>
<p class="small">四个共享流程的详细说明：<a href="shared/index.html">共享流程</a>。</p>
</section>
<section class="sec" id="plugins"><h2><span class="n">02</span>十三个领域</h2>
<p class="measure">每个领域一组流程，加一份「实践配置文件」记录贵所的立场。点进领域看 skill 一览；或直接用<a href="skills/index.html">全部 skill</a>页搜索。</p>
<table class="plugins skill-list"><thead><tr><th>领域</th><th>做什么</th><th class="n">skill</th></tr></thead><tbody>{''.join(rows)}</tbody></table>
</section>
<section class="sec" id="howto"><h2><span class="n">03</span>怎么读一个 skill 页</h2>
<div class="legend">
  <div><h3>概要、适用与边界、输入与产出</h3><p>先判断这个流程是不是您要评的那个：它接什么材料、出什么文书、给谁看。</p></div>
  <div><h3>开始前</h3><p>流程开始前一定会做的事（读实践配置、开工前确认、研究闸门），以及不能绕过的硬性规则。</p></div>
  <div><h3>执行步骤</h3><p>主体。每一步写明怎么做、内置了哪些判断标准和阈值、引用哪些法条、产出什么。技术细节已略去，法律上的数字和清单照原文保留。</p></div>
  <div><h3>请律师核对（朱砂色）</h3><p>每一步旁边标出的内置判断，以及页末的审阅清单。每条都可以一键复制成带编号的引用，粘到微信发给操作员。</p></div>
  <div><h3>法律依据与共用规则</h3><p>法条照原文保留书名号与条号；「待验证」是 skill 原文自己的标记。共用规则是多个流程共享的法条库和口径，点名称可以看它收录了什么。</p></div>
</div>
</section>
<section class="sec" id="terms"><h2><span class="n">04</span>常用说法</h2>
<p class="measure">skill 页里反复出现的几个说法，意思如下。</p>
<dl class="kv terms measure">
<dt>请律师核对 / 审阅清单</dt><dd>本站加的批注：前者在每个步骤旁，后者在页末汇总；两者说的是同一件事时，审阅条目下会提示「相关批注」。条目里「供核对」之后的内容，是本站整理时对照现行条文补充的提示，不是 skill 原文。</dd>
<dt>操作员</dt><dd>把律师的需求交给 AI、转发问题和答复的人。可能是律师本人，也可能是助理或负责操作软件的人员。</dd>
<dt><span class="nw">[待验证]</span> <span class="nw">[待律师复核]</span> <span class="nw">[模型知识 — 需验证]</span></dt><dd>skill 原文自己的核验标记，本站原样保留：前两个表示依据未核验或需要律师判断；「模型知识」表示 AI 凭记忆写出、尚未检索核实的依据。</dd>
<dt>实践配置 / 临时模式</dt><dd>每个领域一份实践配置，记录贵所的立场、审查尺度和文书习惯，律师可以直接修改。还没有配置时按通用默认值办理（临时模式），并在成果上注明。</dd>
<dt>冷启动访谈</dt><dd>每个领域首次使用前的配置访谈：问清贵所的立场和习惯，答案写进实践配置。</dd>
<dt>护栏 / 升级 / 强制升级</dt><dd>护栏是 skill 里不能绕过的硬性规则（实践配置里的「共享护栏」一章对本领域所有流程生效）。升级是停下来交给指定的人决定，通常是执业律师或合伙人；实践配置里的「升级矩阵」规定什么情况交给谁。强制升级是不能经配置关闭的情形，如涉嫌犯罪、人身安全风险。</dd>
<dt>风险等级 <span class="nw">[红]</span> <span class="nw">[橙]</span> <span class="nw">[黄]</span> <span class="nw">[绿]</span></dt><dd>关键、高、中等、低四级；各领域的具体口径写在本领域的实践配置里。</dd>
<dt>开工前确认结论</dt><dd>开工前写在回复里的一段说明：直接开工、先问再写还是暂停等答复，理由是什么；四档问题各几个、怎么问；按什么执行强度办；哪些事项暂缓确认。</dd>
<dt>文字版待确认问题清单 / 问卷文档</dt><dd>开工前提问的两种书面形式：前者是按编号列出、可以直接粘到微信的清单；后者是 Word 文件，由操作员转给承办律师填写。</dd>
<dt>必须确认 / 建议确认 / 可按默认 / 材料请求</dt><dd>开工前确认给问题分的四档。只有「必须确认」的问题没有答复时，受影响的部分才暂停起草。</dd>
<dt>执行强度：常规 / 加强 / 最高</dt><dd>按事项风险定的办理方式：常规由 AI 自查；加强由另一个 AI 模型独立复核；最高把材料提取、检索、起草、复核分开做，最后由律师人工审核。</dd>
<dt>复核情况说明</dt><dd>按加强或最高强度办理的事项，交付时写明：是否由另一个 AI 模型独立复核、还有几处分歧未解决、没做的原因；复核意见本身写在《成稿说明》里。</dd>
<dt>《成稿说明》</dt><dd>交付文书时另附给承办律师的内部说明，不随文书发给客户：形成方式、核心结论、客户材料中的问题、发送前请律师关注或确认的事项、法律依据核验情况、检索到但未采用的依据、建议客户补充的材料、复核情况等。</dd>
<dt>来源一级至五级</dt><dd>研究闸门给来源分的等级：法律与司法解释、入库案例与指导性案例、普通裁判文书、监管文件、实务文章；五级只作线索。</dd>
<dt>律师复核稿 / 律师工作产物</dt><dd>成果上的标注，表示这是供律师复核的草稿，不是定稿。部分领域的标题写「受律师-当事人特权保护」，沿用了普通法的说法；中国法下对应的是律师的保密义务，本站照录原文，是否改写请律师提意见。</dd>
<dt>常见缩写</dt><dd>CIIO：关键信息基础设施运营者；PIA：个人信息保护影响评估；DPO：个人信息保护负责人；FTO：自由实施（不侵权）分析；API、SDK：软件接口与开发工具包；LPR：贷款市场报价利率；IRAC：问题—规则—适用—结论的分析方法；PDCA：计划—执行—检查—改进的循环。</dd>
</dl>
</section>
<section class="sec" id="feedback"><h2><span class="n">05</span>怎么提意见</h2>
<p class="measure">对任何一条规则：复制页面上的引用，写上「同意 / 反对 / 应改为」和依据，发给操作员或在 GitHub 提 issue。意见会按<a href="shared/feedback-refinement/index.html">律师反馈精炼</a>流程转成有边界的 skill 修改。格式与示例见<a href="feedback/index.html">怎么提意见</a>。</p>
</section>'''
    return shell(title='首页', body=body, depth=0, description=f'给律师看的 {SITE_NAME} skill 说明：每个 skill 能做什么、怎么做到、步骤和内置判断。', current='home')


def render_feedback(plugins, depth=1):
    r = rel(depth)
    example = '【商事合同／合同审查 · 第1步 风险识别 · 核对 1.2】风险等级把「超出备选范围」定为高风险……\n\n反对。我所实践中……应改为……\n依据：《民法典》第585条第2款；（2023）京03民终××××号。'
    body = f'''<header class="lead"><h1>怎么提意见</h1><p class="tagline">意见要能对回 skill 里的某一条规则，才能变成修改。页面上的每条「核对」和「审阅」都带编号，复制就是现成的引用。</p></header>
<section class="sec" id="what"><h2><span class="n">01</span>提什么</h2>
<ul class="measure">
<li><b>内置假设不对或不全</b>：某个阈值、分级、清单、默认立场与贵所实践不符。</li>
<li><b>法条有误</b>：条号、文号、生效情况、适用范围写错了，或漏了关键司法解释。</li>
<li><b>步骤顺序或缺步</b>：实务上先后应当颠倒，或少了一个必须做的核查。</li>
<li><b>该问没问</b>：开工前应当向律师确认的事项，没有列进开工前确认的问题里。</li>
<li><b>措辞与文书体例</b>：产出文书的结构、口吻、落款与贵所模板不一致。</li>
<li><b>说明与实际表现不一致</b>：本站是摘要；skill 实际交出的成果与这里写的不一样，请一并指出。</li>
</ul></section>
<section class="sec" id="how"><h2><span class="n">02</span>怎么写</h2>
<p class="measure">三行即可：引用、结论、依据。引用从页面复制；结论写「同意 / 反对 / 应改为……」；依据写法条、案号或实务经验。</p>
<pre class="measure">{esc(example)}</pre>
<p class="measure small">一次可以发多条；不同 skill 的意见请分开，每条带自己的引用。不要把客户材料或案情原文写进意见。</p>
</section>
<section class="sec" id="where"><h2><span class="n">03</span>发到哪里</h2>
<ul class="measure">
<li><b>微信发给操作员</b>：最常用。操作员按<a href="{r}shared/feedback-refinement/index.html">律师反馈精炼</a>流程处理。</li>
<li><b>GitHub</b>：每个 skill 页末尾有「在 GitHub 提 issue」按钮，会自动带上页面地址（需要 GitHub 账号）：<a href="{REPO}/issues">项目的意见列表</a>。</li>
<li><b>墨律桌面端</b>：对单次成果点 👍/👎 并留言，会随同步服务汇总。</li>
</ul></section>
<section class="sec" id="then"><h2><span class="n">04</span>之后会发生什么</h2>
<p class="measure">意见按 skill 归类，找到对应的规则，每次只做 1–3 处小范围的替换或追加，每处写明对应哪条意见；不删研究闸门的强制步骤，不编造法条，拿不准的新规则标「待律师复核」。改完至少对照一个真实场景核对，再发布新版本，律师端下次启动时自动更新。来自真实任务的经验脱敏后进入案例库。</p>
</section>'''
    return shell(title='怎么提意见', body=body, depth=depth, description=f'如何对 {SITE_NAME} 的 skill 规则提意见', current='feedback', crumbs=[('首页', r + 'index.html'), ('怎么提意见', None)])


# ------------------------------------------------------------------ main
def main(argv):
    plugins = load()
    if '--check' in argv:
        print(f'OK: {len(plugins)} plugins, {sum(len(p["skills"]) for p in plugins)} skills')
        return 0
    n = 0
    write('index.html', render_home(plugins)); n += 1
    write('skills/index.html', render_index(plugins)); n += 1
    write('feedback/index.html', render_feedback(plugins)); n += 1
    for p in plugins:
        write(f'{p["id"]}/index.html', render_plugin(p)); n += 1
        for s in p['skills']:
            write(f'{p["id"]}/{s["id"]}/index.html', render_skill(p, s)); n += 1
    open(os.path.join(OUT, '.nojekyll'), 'w').close()
    print(f'wrote {n} pages for {len(plugins)} plugins, {sum(len(p["skills"]) for p in plugins)} skills, {sum(len(s["steps"]) for p in plugins for s in p["skills"])} steps')
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
