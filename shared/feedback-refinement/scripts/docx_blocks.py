#!/usr/bin/env python3
"""把 DOCX 线性化为段落 / 表格行序列，供律师定稿比对使用（仅用 Python 标准库）。

用法：python3 docx_blocks.py <in.docx> <out.jsonl>

输出每行一个 JSON：
  {"k": "p", "lvl": 0|1|...|null, "style": "<样式名>", "t": "<文本，脚注引用写作 [^n]>"}
  {"k": "tbl", "rows": [["单元格", ...], ...]}
  {"k": "fn", "id": "<脚注 id>", "t": "<脚注文本>"}
标题层级取段落或样式的 outlineLvl，或样式名「heading N / 标题 N」。
"""
import json
import re
import sys
import zipfile
import xml.etree.ElementTree as ET

W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"


def style_map(z):
    out = {}
    if "word/styles.xml" not in z.namelist():
        return out
    for s in ET.fromstring(z.read("word/styles.xml")).iter(W + "style"):
        sid = s.get(W + "styleId")
        name_el = s.find(W + "name")
        name = name_el.get(W + "val") if name_el is not None else ""
        lvl = None
        ol = s.find(W + "pPr/" + W + "outlineLvl")
        if ol is not None:
            lvl = int(ol.get(W + "val"))
        else:
            m = re.match(r"(?i)^(heading|标题)\s*(\d)$", name.strip())
            if m:
                lvl = int(m.group(2)) - 1
        out[sid] = (name, lvl)
    return out


def ptext(p):
    parts = []
    for el in p.iter():
        if el.tag == W + "t":
            parts.append(el.text or "")
        elif el.tag == W + "tab":
            parts.append("\t")
        elif el.tag == W + "br" and el.get(W + "type") != "page":
            parts.append("\n")
        elif el.tag == W + "footnoteReference":
            parts.append("[^%s]" % el.get(W + "id"))
    return "".join(parts)


def main(src, dst):
    z = zipfile.ZipFile(src)
    styles = style_map(z)
    body = ET.fromstring(z.read("word/document.xml")).find(W + "body")
    blocks = []
    for el in body:
        if el.tag == W + "p":
            text = ptext(el)
            if not text.strip():
                continue
            ppr = el.find(W + "pPr")
            name, lvl = "", None
            if ppr is not None:
                st = ppr.find(W + "pStyle")
                if st is not None:
                    name, lvl = styles.get(st.get(W + "val"), ("", None))
                ol = ppr.find(W + "outlineLvl")
                if ol is not None and int(ol.get(W + "val")) < 9:
                    lvl = int(ol.get(W + "val"))
            blocks.append({"k": "p", "lvl": lvl, "style": name, "t": text})
        elif el.tag == W + "tbl":
            rows = []
            for tr in el.findall(W + "tr"):
                rows.append(["\n".join(ptext(p) for p in tc.iter(W + "p")).strip() for tc in tr.findall(W + "tc")])
            blocks.append({"k": "tbl", "rows": rows})
    if "word/footnotes.xml" in z.namelist():
        for f in ET.fromstring(z.read("word/footnotes.xml")).findall(W + "footnote"):
            if f.get(W + "type") in ("separator", "continuationSeparator"):
                continue
            blocks.append({"k": "fn", "id": f.get(W + "id"), "t": "".join(t.text or "" for t in f.iter(W + "t")).strip()})
    with open(dst, "w", encoding="utf-8") as fh:
        for b in blocks:
            fh.write(json.dumps(b, ensure_ascii=False) + "\n")
    print("%s: %d blocks" % (src, len(blocks)))


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
