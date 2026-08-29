import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

BLUE, AMBER, RED = '#2F5FC4', '#E08A1E', '#C1272D'
INK, MUTED, GRID = '#1F2937', '#6B7280', '#DDE1E6'
plt.rcParams.update({'font.family': 'sans-serif', 'font.sans-serif': ['DejaVu Sans'],
                     'axes.edgecolor': GRID, 'xtick.color': MUTED, 'ytick.color': MUTED,
                     'text.color': INK, 'figure.facecolor': 'white', 'axes.facecolor': 'white'})

# ── 1. Queries — every one of them is a brand term ───────────────────────────
q = [('tvet lipis', 107), ('tvet kuala lipis', 24),
     ('kolej islam antarabangsa kuala lipis', 13), ('plk lipis', 2), ('uia kuala lipis', 1)]
labels = [a for a, _ in q][::-1]
vals = [b for _, b in q][::-1]
fig, ax = plt.subplots(figsize=(6.8, 2.5))
bars = ax.barh(range(len(vals)), vals, height=0.6, color=BLUE, zorder=3)
for b, v in zip(bars, vals):
    ax.text(v + 2, b.get_y() + b.get_height() / 2, str(v), va='center',
            fontsize=9.5, fontweight='bold', color=INK)
ax.set_yticks(range(len(labels)))
ax.set_yticklabels(labels, fontsize=8.8, color=INK)
ax.set_xlim(0, 125); ax.set_xlabel('Clicks, last 3 months', fontsize=8.6)
ax.tick_params(axis='y', length=0)
ax.xaxis.grid(True, color=GRID, linewidth=0.8, zorder=0)
for s in ('top', 'right', 'left'): ax.spines[s].set_visible(False)
ax.set_title('Every query that brings traffic is a brand name',
             fontsize=10.4, fontweight='bold', color=INK, loc='left', pad=10)
ax.text(1.0, -0.30, 'No course or qualification search appears at all',
        transform=ax.transAxes, ha='right', fontsize=8.6, color=RED, fontweight='bold')
fig.tight_layout(); fig.savefig('cu2_queries.png', dpi=200); plt.close(fig)

# ── 2. Current site vs proposed structure ────────────────────────────────────
fig, ax = plt.subplots(figsize=(8.0, 3.5))
ax.set_xlim(0, 100); ax.set_ylim(0, 62); ax.axis('off'); ax.invert_yaxis()

def box(x, y, w, h, label, col, fill=False, fs=7.6, bold=False):
    ax.add_patch(FancyBboxPatch((x, y), w, h, boxstyle='round,pad=0,rounding_size=1.2',
                                linewidth=1.4, edgecolor=col,
                                facecolor=col if fill else 'white', zorder=3))
    ax.text(x + w / 2, y + h / 2, label, ha='center', va='center', fontsize=fs,
            color='white' if fill else INK, fontweight='bold' if bold else 'normal', zorder=4)

ax.text(0, 3, 'SEKARANG  ·  1 halaman', fontsize=9.2, fontweight='bold', color=RED)
box(0, 7, 34, 9, 'UTAMA — tvetlipis.my', RED, fill=True, fs=8.4, bold=True)
ax.text(0, 21, 'Semua 284 klik mendarat di sini', fontsize=7.6, color=MUTED, style='italic')
ax.text(0, 26, '1 daripada 3 halaman diindeks', fontsize=7.6, color=RED, style='italic')

ax.text(56, 3, 'DICADANGKAN  ·  8 halaman', fontsize=9.2, fontweight='bold', color=BLUE)
box(56, 7, 34, 8, 'UTAMA', BLUE, fill=True, fs=8.2, bold=True)
prog = ['Diploma Pendidikan Awal Kanak-Kanak', 'Diploma Pendidikan Pra-Sekolah',
        'Diploma Kandungan Kreatif Multimedia', 'Sijil Pengurusan Halal',
        'Yuran dan Pembiayaan PTPK', 'Syarat dan Tarikh Kemasukan',
        'Hubungi Kami']
y = 18
for p in prog:
    box(60, y, 34, 5.2, p, BLUE, fs=6.6)
    ax.add_patch(FancyArrowPatch((58, 15.4), (60, y + 2.6), arrowstyle='-',
                                 linewidth=0.9, color=GRID, zorder=2))
    y += 6.0

ax.add_patch(FancyArrowPatch((37, 11.5), (53, 11.5), arrowstyle='-|>',
                             mutation_scale=14, linewidth=1.6, color=MUTED, zorder=3))
fig.tight_layout(); fig.savefig('cu2_structure.png', dpi=200, bbox_inches='tight'); plt.close(fig)

print('charts written')
