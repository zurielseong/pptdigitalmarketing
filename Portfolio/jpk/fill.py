import re, html, zipfile, os, shutil

# ── low-level docx table helpers ─────────────────────────────────────────────
def spans(s, tag):
    """Yield (start, end) of each top-level <tag>...</tag> in s."""
    out, i, depth, start = [], 0, 0, None
    o, c = f'<{tag}', f'</{tag}>'
    while i < len(s):
        no = s.find(o, i); nc = s.find(c, i)
        if no != -1 and (nc == -1 or no < nc):
            j = no + len(o)
            if j < len(s) and s[j] in ' >/':
                if depth == 0: start = no
                depth += 1
            i = no + len(o)
        elif nc != -1:
            depth -= 1
            if depth == 0: out.append((start, nc + len(c)))
            i = nc + len(c)
        else:
            break
    return out

def cells(row):
    return [row[a:b] for a, b in spans(row, 'w:tc')]

def rows(tbl):
    return [tbl[a:b] for a, b in spans(tbl, 'w:tr')]

def tables(doc):
    return [doc[a:b] for a, b in spans(doc, 'w:tbl')]

def ctext(c):
    return html.unescape(re.sub(r'<[^>]+>', '', ''.join(re.findall(r'<w:t[^>]*>.*?</w:t>', c, re.S)))).strip()

DEFAULT_RPR = ('<w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/>'
               '<w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr>')

def para(text, rpr, ppr=''):
    r = f'<w:r>{rpr}<w:t xml:space="preserve">{html.escape(text)}</w:t></w:r>' if text else ''
    return f'<w:p>{ppr}{r}</w:p>'

def set_cell(cell, lines, bold=False, sz=None):
    """Replace paragraphs in the cell, reusing the cell's own run formatting."""
    if isinstance(lines, str): lines = [lines]
    ps = spans(cell, 'w:p')
    if not ps: return cell
    first = cell[ps[0][0]:ps[0][1]]
    m = re.search(r'<w:pPr>.*?</w:pPr>', first, re.S)
    ppr = m.group(0) if m else ''
    # the run formatting the form itself intends for this cell
    rm = re.search(r'<w:rPr>.*?</w:rPr>', ppr, re.S) if ppr else None
    rpr = rm.group(0) if rm else DEFAULT_RPR
    if bold and '<w:b/>' not in rpr:
        rpr = rpr.replace('<w:rPr>', '<w:rPr><w:b/>', 1)
    if not bold:
        rpr = rpr.replace('<w:b/>', '').replace('<w:bCs/>', '')
    body = ''.join(para(l, rpr, ppr) for l in lines) or para('', rpr, ppr)
    return cell[:ps[0][0]] + body + cell[ps[-1][1]:]

def set_row(row, values, bold=None, sz=16):
    """values: list aligned to cells; None leaves the cell untouched."""
    cs = spans(row, 'w:tc')
    out, prev = '', 0
    for i, (a, b) in enumerate(cs):
        out += row[prev:a]
        c = row[a:b]
        if i < len(values) and values[i] is not None:
            c = set_cell(c, values[i], bold=(bold or {}).get(i, False), sz=sz)
        out += c
        prev = b
    return out + row[prev:]

def blank_row(row):
    return set_row(row, [''] * len(spans(row, 'w:tc')))

def replace_table(doc, idx, newtbl):
    sp = spans(doc, 'w:tbl')
    a, b = sp[idx]
    return doc[:a] + newtbl + doc[b:]

def rebuild(tbl, newrows):
    sp = spans(tbl, 'w:tr')
    return tbl[:sp[0][0]] + ''.join(newrows) + tbl[sp[-1][1]:]

def repack(src_docx, doc_xml, out_docx):
    src = zipfile.ZipFile(src_docx)
    with zipfile.ZipFile(out_docx, 'w', zipfile.ZIP_DEFLATED) as z:
        for it in src.infolist():
            z.writestr(it, doc_xml.encode('utf8') if it.filename == 'word/document.xml' else src.read(it.filename))

# ── candidate data ───────────────────────────────────────────────────────────
NAMA, KP = 'ZURIEL SEONG MING EE', '980926-56-5571'
KOD, TAJUK = 'M731-001-4:2021', 'DIGITAL MARKETING PLANNING AND IMPLEMENTATION'
ID_PPT = '500872'
ALAMAT = 'No. 60, Taman Permai, 27200 Kuala Lipis, Pahang'
TELBIMBIT = '010-808 6630'

exec(open(os.path.join(os.path.dirname(__file__), 'cudata.py')).read())
