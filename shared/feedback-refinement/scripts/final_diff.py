#!/usr/bin/env python3
"""律师定稿比对：把我方成稿与律师定稿按标题路径分节对齐，逐段给出字符级差异（仅用标准库）。

用法：python3 final_diff.py <ours.jsonl> <final.jsonl> <diff.md> <stats.json> [--levels 3]

输入为 docx_blocks.py 的输出。表格按行比较；脚注按正文引用顺序比较
（WPS 回存会重排脚注 id，不能按 id 对齐）。
diff.md 中：「~ (相似度)」为改写段，[-删去-]{+新增+}；「-」为整段删除；「+」为整段新增。
stats.json 给出每节的保留 / 改写 / 删除 / 新增段数与增删字符数，以及整节删除与新增。
"""
import difflib
import json
import re
import sys


def load(path, levels):
    blocks = [json.loads(line) for line in open(path, encoding="utf-8")]
    fns = {b["id"]: b["t"] for b in blocks if b["k"] == "fn"}
    units, order, sec = [], [], [""] * levels
    for b in blocks:
        if b["k"] == "fn":
            continue
        texts = [b["t"]] if b["k"] == "p" else [" | ".join(c.replace("\n", "⏎") for c in r) for r in b["rows"]]
        for t in texts:
            order += re.findall(r"\[\^(\w+)\]", t)
        if b["k"] == "p" and b.get("lvl") is not None and b["lvl"] < levels:
            lv = b["lvl"]
            sec[lv] = b["t"].strip()
            for j in range(lv + 1, levels):
                sec[j] = ""
        key = "/".join(x for x in sec if x)
        for t in texts:
            units.append((key, t.strip()))
    return units, [fns.get(i, "") for i in order]


def norm(t):
    return re.sub(r"\s+", "", re.sub(r"\[\^\w+\]", "", t))


def cdiff(a, b):
    out, dele, ins = [], 0, 0
    for op, i1, i2, j1, j2 in difflib.SequenceMatcher(None, a, b, autojunk=False).get_opcodes():
        if op == "equal":
            s = a[i1:i2]
            out.append(s if len(s) <= 24 else s[:10] + "…" + s[-10:])
            continue
        if op in ("delete", "replace"):
            out.append("[-" + a[i1:i2] + "-]")
            dele += i2 - i1
        if op in ("insert", "replace"):
            out.append("{+" + b[j1:j2] + "+}")
            ins += j2 - j1
    return "".join(out), dele, ins


def group(units):
    g, order = {}, []
    for k, t in units:
        if k not in g:
            g[k] = []
            order.append(k)
        g[k].append(t)
    return g, order


def main(a_path, b_path, out_md, out_json, levels=3):
    ua, fa = load(a_path, levels)
    ub, fb = load(b_path, levels)
    ga, oa = group(ua)
    gb, ob = group(ub)
    md, stats = [], {"sections": [], "deleted_sections": [], "added_sections": []}
    for s in oa:
        if s not in gb:
            stats["deleted_sections"].append([s, sum(len(norm(t)) for t in ga[s])])
            md.append("## [整节删除] " + s)
    for s in ob:
        if s not in ga:
            stats["added_sections"].append([s, sum(len(norm(t)) for t in gb[s])])
            md.append("## [整节新增] " + s)
            md += ["+ " + t for t in gb[s]]
    for s in oa:
        if s not in gb:
            continue
        a, b = ga[s], gb[s]
        na, nb = [norm(x) for x in a], [norm(x) for x in b]
        st = {"sec": s, "eq": 0, "mod": 0, "del": 0, "ins": 0, "cdel": 0, "cins": 0}
        lines = []
        for op, i1, i2, j1, j2 in difflib.SequenceMatcher(None, na, nb, autojunk=False).get_opcodes():
            if op == "equal":
                st["eq"] += i2 - i1
                continue
            used = set()
            for i in range(i1, i2):
                best, br = None, 0.0
                for j in range(j1, j2):
                    if j in used:
                        continue
                    r = difflib.SequenceMatcher(None, na[i], nb[j], autojunk=False).ratio()
                    if r > br:
                        best, br = j, r
                if best is not None and br >= 0.45:
                    used.add(best)
                    d, x, y = cdiff(na[i], nb[best])
                    st["mod"] += 1
                    st["cdel"] += x
                    st["cins"] += y
                    lines.append("~ (%.2f) %s" % (br, d))
                else:
                    st["del"] += 1
                    st["cdel"] += len(na[i])
                    lines.append("- " + a[i])
            for j in range(j1, j2):
                if j not in used:
                    st["ins"] += 1
                    st["cins"] += len(nb[j])
                    lines.append("+ " + b[j])
        stats["sections"].append(st)
        if lines:
            md.append("\n## %s（保留 %d，改写 %d，删除 %d，新增 %d；字符 -%d +%d）" % (
                s, st["eq"], st["mod"], st["del"], st["ins"], st["cdel"], st["cins"]))
            md += lines
    md.append("\n## 脚注（按引用顺序）：我方 %d 条，定稿 %d 条" % (len(fa), len(fb)))
    for op, i1, i2, j1, j2 in difflib.SequenceMatcher(None, [norm(x)[:60] for x in fa], [norm(x)[:60] for x in fb], autojunk=False).get_opcodes():
        if op == "equal":
            for i, j in zip(range(i1, i2), range(j1, j2)):
                if norm(fa[i]) != norm(fb[j]):
                    md.append("~ 脚注%d: %s" % (i + 1, cdiff(norm(fa[i]), norm(fb[j]))[0]))
        else:
            md += ["- 脚注: " + x[:80] for x in fa[i1:i2]] + ["+ 脚注: " + x[:80] for x in fb[j1:j2]]
    open(out_md, "w", encoding="utf-8").write("\n".join(md) + "\n")
    tot = {k: sum(x[k] for x in stats["sections"]) for k in ("eq", "mod", "del", "ins", "cdel", "cins")}
    stats["totals"] = tot
    json.dump(stats, open(out_json, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("段落：保留 %(eq)d，改写 %(mod)d，删除 %(del)d，新增 %(ins)d；字符 -%(cdel)d +%(cins)d" % tot)
    print("整节删除 %d，整节新增 %d" % (len(stats["deleted_sections"]), len(stats["added_sections"])))


if __name__ == "__main__":
    args = [x for x in sys.argv[1:] if not x.startswith("--")]
    lv = 3
    if "--levels" in sys.argv:
        lv = int(sys.argv[sys.argv.index("--levels") + 1])
        args = [x for x in args if x != str(lv)]
    if len(args) != 4:
        sys.exit(__doc__)
    main(*args, levels=lv)
