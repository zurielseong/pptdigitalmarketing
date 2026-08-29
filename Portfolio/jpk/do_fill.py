import sys, os, zipfile
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from fill import *

pad = lambda n: str(n).zfill(2)

# evidence register
BUKTI = [('1', 'Resume', '01'),
         ('2', 'Borang Akuan / Dokumen Perakuan Tempoh Pengalaman Kerja', '02'),
         ('3', 'Laporan Projek DKM (LPKT) — Perancangan dan Pelaksanaan Kempen Pemasaran '
               'Media Sosial bagi Meningkatkan Pengambilan Pelajar Baharu di TVET Lipis', '03')]
n = 4
for cu in CUS:
    for i, wa in enumerate(cu['was']):
        BUKTI.append((str(n), f"{cu['kod']} W0{i+1} — {DOCNAMES[cu['kod']][i]}", pad(cu['from'] + i)))
        n += 1

# ══════════════════════════════ JPK/PPT/1.5 ══════════════════════════════════
doc = open('ok/xJPK15/word/document.xml', encoding='utf8').read()

# (A) Maklumat calon
t = tables(doc)[0]
vals = [ID_PPT, NAMA, KP, KOD, TAJUK]
rs = rows(t)
new = [set_row(rs[i], [None, vals[i]], bold={}) for i in range(5)]
doc = replace_table(doc, 0, rebuild(t, new))

# (B) Senarai bukti — clone the blank row out to 37
t = tables(doc)[1]
rs = rows(t)
tpl = blank_row(rs[1])
body = [set_row(tpl, list(b)) for b in BUKTI]
doc = replace_table(doc, 1, rebuild(t, [rs[0]] + body))

# (C) Senarai pengalaman terdahulu
t = tables(doc)[2]
rs = rows(t)
tpl = blank_row(rs[1])
body = []
for cu in CUS:
    body.append(set_row(tpl, [
        [cu['nama'], '', f"{KOD} - {cu['kod']}"],
        ['•  ' + r for r in cu['ring']],
        cu['tempoh'].split('\n'),
    ], bold={}))
doc = replace_table(doc, 2, rebuild(t, [rs[0]] + body))

# (D) Jadual Perbandingan 2
t = tables(doc)[4]
rs = rows(t)
head = rs[:3]
tpl = blank_row(rs[3])
body = []
for i, cu in enumerate(CUS):
    codes = ', '.join(pad(cu['from'] + j) for j in range(len(cu['was'])))
    body.append(set_row(tpl, [
        f'{i+1}.',
        [cu['nama'], '', f"{KOD} - {cu['kod']}"],
        [f"W0{j+1}  {w}" for j, w in enumerate(cu['was'])],
        codes,
        '',
    ], bold={}))
doc = replace_table(doc, 4, rebuild(t, head + body))

repack('ok/JPK15.docx', doc, 'JPK-PPT-1-5_DKM_ZurielSeong.docx')
print('JPK 1.5 written — bukti rows:', len(BUKTI))

# ══════════════════════════════ JPK/PPT/3.5 ══════════════════════════════════
doc = open('ok/xJPK35/word/document.xml', encoding='utf8').read()

# (A) Maklumat calon
t = tables(doc)[0]
rs = rows(t)
new = [set_row(rs[0], [None, ID_PPT], bold={}),
       set_row(rs[1], [None, NAMA], bold={}),
       set_row(rs[2], [None, KP], bold={}),
       set_row(rs[3], [None, ALAMAT], bold={}),
       set_row(rs[4], [None, None, None, TELBIMBIT], bold={})]
doc = replace_table(doc, 0, rebuild(t, new + rs[5:]))

# (B) Maklumat permohonan
t = tables(doc)[1]
rs = rows(t)
doc = replace_table(doc, 1, rebuild(t, [rs[0], set_row(rs[1], [KOD, TAJUK, 'TAHAP 4 (DKM)'], bold={})]))

# C1 core competency list — 6 blank rows, need 7
t = tables(doc)[2]
rs = rows(t)
head, blanks = rs[:3], rs[3:]
tpl = blank_row(blanks[0])
body = [set_row(tpl, ['', f"{KOD} - {cu['kod']}", cu['nama'], '']) for cu in CUS]
doc = replace_table(doc, 2, rebuild(t, head + body))

repack('ok/JPK35.docx', doc, 'JPK-PPT-3-5_DKM_ZurielSeong.docx')
print('JPK 3.5 written — CU rows:', len(CUS))

# ── verify ───────────────────────────────────────────────────────────────────
for f in ('JPK-PPT-1-5_DKM_ZurielSeong.docx', 'JPK-PPT-3-5_DKM_ZurielSeong.docx'):
    x = zipfile.ZipFile(f).read('word/document.xml').decode()
    print('\n===', f)
    for ti, t in enumerate(tables(x)[:6]):
        rr = rows(t)
        print(f'-- t{ti} rows={len(rr)}')
        for r in rr[:4]:
            print('    ', ' || '.join(ctext(c)[:46] for c in cells(r))[:170])
