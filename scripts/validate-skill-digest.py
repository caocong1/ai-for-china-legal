#!/usr/bin/env python3
"""Validate docs/data/skills/parts/*.json against docs/data/skills/schema.json (structural check, no deps).

Usage: python3 scripts/validate-skill-digest.py [file ...]   (default: all parts)
Exit 1 on any error. Prints one line per problem: <file>: <path>: <message>.
"""
import json, sys, glob, os

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
