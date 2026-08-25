import re, shutil, zipfile, os

SRC = '/root/.claude/uploads/c222c7c5-1fc9-5ff7-858d-b12df17563bc/35f51653-dkm_portfolio_draft.docx'
WORK = 'draft2'
OUT = 'dkm_portfolio_draft_updated.docx'

path = os.path.join(WORK, 'word/document.xml')
x = open(path, encoding='utf8').read()

# ── 1. Typo fixes, applied only inside text runs ─────────────────────────────
FIXES = [
    ('Calender', 'Calendar'),
    ('Advertisment', 'Advertisement'),
    ('Optimize', 'Optimise'),
]
counts = {}


def fix_run(m):
    t = m.group(1)
    for bad, good in FIXES:
        if bad in t:
            counts[bad] = counts.get(bad, 0) + t.count(bad)
            t = t.replace(bad, good)
    return m.group(0)[:m.group(0).index('>') + 1] + t + '</w:t>'


x = re.sub(r'<w:t(?:\s[^>]*)?>(.*?)</w:t>', fix_run, x, flags=re.S)

# ── 2. Missing competency units ──────────────────────────────────────────────
RPR = ('<w:rPr><w:rFonts w:asciiTheme="majorBidi" w:hAnsiTheme="majorBidi" '
       'w:cstheme="majorBidi"/><w:b/><w:bCs/></w:rPr>')
BLANK = ('<w:p w:rsidR="004B74D3" w:rsidRDefault="004B74D3" w:rsidP="002F0838">'
         '<w:pPr><w:rPr><w:noProof/></w:rPr></w:pPr></w:p>')


def heading(text):
    return (f'<w:p w:rsidR="004B74D3" w:rsidRDefault="004B74D3" w:rsidP="004B74D3">'
            f'<w:pPr>{RPR}</w:pPr><w:r>{RPR}<w:t xml:space="preserve">{text}</w:t></w:r></w:p>')


UNITS = [
    ('CU1 – Implement Social Media Marketing Plan', [
        'WA1: Determine Social Media Marketing Channel',
        'WA2: Plan Social Media Marketing Campaign Content Calendar',
        'WA3: Prepare Social Media Marketing Campaign Plan',
        'WA4: Coordinate Social Media Marketing Campaign Implementation',
        'WA5: Prepare Social Media Paid Advertisement Campaign Proposal',
        'WA6: Optimise Social Media Marketing Campaign Performance',
    ]),
    ('CU2 – Implement Search Engine Optimisation (SEO) Plan', [
        'WA1: Analyse SEO Channel Performance',
        'WA2: Prepare SEO Campaign Plan',
        'WA3: Prepare SEO Improvement Plan',
        'WA4: Coordinate SEO Implementation',
    ]),
    ('CU3 – Implement Search Engine Marketing (SEM) Plan', [
        'WA1: Prepare SEM Campaign Plan',
        'WA2: Implement SEM Campaign Plan',
        'WA3: Optimise SEM Campaign Performance',
    ]),
]

block = []
for cu, was in UNITS:
    block.append(heading(cu))
    for wa in was:
        block.append(heading(wa))
        block.extend([BLANK] * 3)
    block.append(BLANK)
new = ''.join(block)

m = re.search(r'<w:body>', x)
x = x[:m.end()] + new + x[m.end():]

open(path, 'w', encoding='utf8').write(x)

# ── 3. Repackage ─────────────────────────────────────────────────────────────
src = zipfile.ZipFile(SRC)
with zipfile.ZipFile(OUT, 'w', zipfile.ZIP_DEFLATED) as out:
    for item in src.infolist():
        data = open(path, 'rb').read() if item.filename == 'word/document.xml' else src.read(item.filename)
        out.writestr(item, data)

print('typos fixed:', counts)
print('headings added:', sum(1 + len(w) for _, w in UNITS))
print('written:', OUT)
