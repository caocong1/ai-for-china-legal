#!/usr/bin/env python3
"""Validate docs/data/skills/parts/*.json against docs/data/skills/schema.json (structural check, no deps),
and check that every string a lawyer reads is plain Chinese: no file names, commands, field names,
status values, internal numbering or programming terms.

Usage: python3 scripts/validate-skill-digest.py [file ...]   (default: all parts)
Exit 1 on any error. Prints one line per problem: <file>: <path>: <message>.
"""
import json, sys, glob, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCHEMA = json.load(open(os.path.join(ROOT, 'docs/data/skills/schema.json'), encoding='utf-8'))

TYPES = {'string': str, 'integer': int, 'boolean': bool, 'array': list, 'object': dict}


def check(node, schema, path, out):
    t = schema.get('type')
    if t and not isinstance(node, TYPES[t]) or (t == 'integer' and isinstance(node, bool)):
        out.append(f'{path}: expected {t}, got {type(node).__name__}')
        return
    if 'enum' in schema and node not in schema['enum']:
        out.append(f'{path}: {node!r} not in {schema["enum"]}')
    if t == 'object':
        for k in schema.get('required', []):
            if k not in node:
                out.append(f'{path}: missing required key {k!r}')
        props = schema.get('properties', {})
        for k, v in node.items():
            if k in props:
                check(v, props[k], f'{path}.{k}', out)
            elif props:
                out.append(f'{path}: unknown key {k!r}')
    elif t == 'array':
        items = schema.get('items')
        if items:
            for i, v in enumerate(node):
                check(v, items, f'{path}[{i}]', out)
    elif t == 'string' and not node.strip():
        out.append(f'{path}: empty string')


# ------------------------------------------------------------------ lawyer language
# These keys carry identifiers for maintainers and are not shown in the page body; every other string is read by lawyers.
MAINT_KEYS = {'plugin_id', 'part', 'id', 'command', 'kind', 'n', 'standalone', 'required', 'sources', 'file', 'used_by',
              'source_commit', 'source_date'}

# English a Chinese lawyer reads without help: legal and business abbreviations, standards, licences, products.
ASCII_OK = frozenset("""
AI AIGC API APP App SDK PDF Word Excel PPT WPS OCR GitHub skill
IP FTO PCT IPC SEP FRAND NPE CC GPL LGPL MIT Apache BSD MPL WHOIS CNNIC LOGO NIKE NYKE YUNPENG CLOUD ROC RN ENGLAND SUN GREAT WALL
CIIO PIA DPO GDPR EU ISO IEC GB GF TC260 C2PA
LPR CEO CFO CTO COO HR IT IPO VIE ESG ESOP NDA EPC PPP FIDIC
ICC CIETAC SHIAC BAC HKIAC SIAC SCIA
SaaS ToB ToC ToG B2B B2C B2B2C P2P VIP OA CRM ERP GPS NFT EMS MFA VPN DDoS HTTPS IRAC PDCA A4 TLS AES
""".split())

_PLAIN_BAD = [
    (re.compile(r'`'), '反引号'),
    (re.compile(r'[\w.-]+\.(?:md|json|ya?ml|py|mjs|js|sh|txt|html|docx?|xlsx?|pptx?|csv)\b', re.I), '文件名'),
    (re.compile(r'(?:^|[\s（(「“])/[^\s/]+/'), '路径'),
    (re.compile(r'(?<![\w/])/[a-z]'), '命令或路径'),
    (re.compile(r'[a-z][\w-]*:[a-z]'), '命令或标识'),
    (re.compile(r'https?://|\b[\w-]+\.(?:gov|com|org|net|cn|io)\b'), '网址（写网站的中文名）'),
    (re.compile(r'[A-Za-z0-9]_[A-Za-z0-9]'), '字段名'),
    (re.compile(r'LWC-\d'), '内部案例编号'),
    (re.compile(r'§'), '源文件章节号'),
    (re.compile(r'第[一二三四五六七八九十]+步|原文第'), '步骤引用（用本页编号「第 n 步」）'),
    (re.compile(r'字段|变量|函数|哈希|正则|落盘|渲染|脚本|聚合指纹|子代理|主代理|子技能|斜杠命令|命令行|(?<![时期])限流|布尔|枚举|状态值'
                r'|工作目录|文本镜像|主笔|占位符|路由|执行档|回显|初始化|契约|数据结构|启动参数|步骤参数|参数为「'
                r'|上下文(?:压缩|窗口)|新(?:鲜)?上下文|会话上下文|事项上下文|案件上下文'), '技术用语'),
]
_ASCII_WORD = re.compile(r'(?<![A-Za-z0-9])[A-Za-z][A-Za-z0-9]*')


def lawyer_strings(node, path='$'):
    """(path, text) for every string a lawyer reads."""
    if isinstance(node, dict):
        for k, v in node.items():
            if k not in MAINT_KEYS:
                yield from lawyer_strings(v, f'{path}.{k}')
    elif isinstance(node, list):
        for i, v in enumerate(node):
            yield from lawyer_strings(v, f'{path}[{i}]')
    elif isinstance(node, str):
        yield path, node


def plain_language(data):
    out = []
    for path, s in lawyer_strings(data):
        hits = []
        for rx, why in _PLAIN_BAD:
            m = rx.search(s)
            if m:
                hits.append(f'{why}「{m.group(0).strip()}」')
        words = sorted({w for w in _ASCII_WORD.findall(s) if len(w) > 1 and w not in ASCII_OK})
        if words:
            hits.append('英文「' + ' '.join(words) + '」')
        if hits:
            out.append(f'{path}: 不是律师语言：' + '；'.join(hits) + f' ← {s[:50]}')
    return out


def validate(path):
    out = []
    try:
        data = json.load(open(path, encoding='utf-8'))
    except Exception as e:  # noqa: BLE001
        return [f'{path}: invalid JSON: {e}']
    check(data, SCHEMA, '$', out)
    # semantic checks
    for i, s in enumerate(data.get('skills', [])):
        if isinstance(s, dict):
            steps = s.get('steps', [])
            for j, st in enumerate(steps):
                if isinstance(st, dict) and st.get('n') != j + 1:
                    out.append(f'$.skills[{i}].steps[{j}]: n should be {j + 1}')
            if isinstance(s.get('command'), str) and not s['command'].startswith('/'):
                out.append(f'$.skills[{i}].command: should start with /')
            for src in s.get('sources', []):
                if isinstance(src, str) and not os.path.exists(os.path.join(ROOT, src)):
                    out.append(f'$.skills[{i}].sources: file not found: {src}')
            if len(s.get('review_points', [])) < 3:
                out.append(f'$.skills[{i}].review_points: fewer than 3 items')
            for jp, t in lawyer_strings(s, f'$.skills[{i}]'):
                for m in re.finditer(r'第\s*(\d+)\s*步', t):
                    if not 1 <= int(m.group(1)) <= len(steps):
                        out.append(f'{jp}: 「{m.group(0)}」超出本页步骤数 {len(steps)}（步骤引用用本页编号）')
    # 摘要依据的仓库提交：scripts/digest-drift.py 靠它判断哪些摘要过时
    blocks = ([('$.plugin', data['plugin'])] if isinstance(data.get('plugin'), dict) else []) + \
        [(f'$.skills[{i}]', s) for i, s in enumerate(data.get('skills', [])) if isinstance(s, dict)]
    for jp, rec in blocks:
        if not re.fullmatch(r'[0-9a-f]{40}', str(rec.get('source_commit', ''))):
            out.append(f'{jp}.source_commit: 应为 40 位提交哈希（用 scripts/digest-drift.py --mark 记录）')
        if not re.fullmatch(r'\d{4}-\d{2}-\d{2}', str(rec.get('source_date', ''))):
            out.append(f'{jp}.source_date: 应为 YYYY-MM-DD')
    out += plain_language(data)
    return [f'{os.path.relpath(path, ROOT)}: {m}' for m in out]


def main(argv):
    files = argv or sorted(glob.glob(os.path.join(ROOT, 'docs/data/skills/parts/*.json')))
    problems = []
    for f in files:
        problems += validate(f)
    for p in problems:
        print(p)
    if not problems:
        print(f'OK: {len(files)} file(s) valid')
    return 1 if problems else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
