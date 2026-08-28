import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, Rectangle
from matplotlib.lines import Line2D

BLUE, AMBER, RED = '#2F5FC4', '#E08A1E', '#C1272D'
INK, MUTED, GRID, BAND = '#1F2937', '#6B7280', '#DDE1E6', '#F4F6F9'
plt.rcParams.update({'font.family': 'sans-serif', 'font.sans-serif': ['DejaVu Sans'],
                     'text.color': INK, 'figure.facecolor': 'white'})

# (month label, ads note, [(week date, video pillar or None, poster pillar), ...])
CAL = [
    ('APRIL 2025', 'Meta Ads bermula', [
        ('7 Apr',  'Peluang Kedua',      'Sorotan Program'),
        ('14 Apr', None,                 'Maklumat Ibu Bapa'),
        ('21 Apr', 'Sorotan Program',    'Miskonsepsi TVET'),
        ('28 Apr', None,                 'Kandungan Tempatan'),
    ]),
    ('MEI 2025', '', [
        ('5 Mei',  'Maklumat Ibu Bapa',  'Peluang Kedua'),
        ('12 Mei', None,                 'Sorotan Program'),
        ('19 Mei', 'Miskonsepsi TVET',   'Maklumat Ibu Bapa'),
        ('26 Mei', None,                 'Kandungan Tempatan'),
    ]),
    ('JUN 2025', 'TikTok Ads bermula', [
        ('2 Jun',  'Sorotan Program',    'Peluang Kedua'),
        ('9 Jun',  None,                 'Miskonsepsi TVET'),
        ('16 Jun', 'Peluang Kedua',      'Sorotan Program'),
        ('23 Jun', None,                 'Maklumat Ibu Bapa'),
    ]),
    ('JULAI 2025', 'Puncak prospek', [
        ('7 Jul',  'Jelajah Sekolah',    'Sorotan Program'),
        ('14 Jul', None,                 'Peluang Kedua'),
        ('21 Jul', 'Maklumat Ibu Bapa',  'Jelajah Sekolah'),
        ('28 Jul', None,                 'Miskonsepsi TVET'),
    ]),
    ('OGOS 2025', '', [
        ('4 Ogos',  'Miskonsepsi TVET',  'Kandungan Tempatan'),
        ('11 Ogos', None,                'Sorotan Program'),
        ('18 Ogos', 'Kandungan Tempatan','Peluang Kedua'),
        ('25 Ogos', None,                'Maklumat Ibu Bapa'),
    ]),
    ('SEPTEMBER 2025', 'Panggilan akhir kemasukan', [
        ('1 Sep',  'Sorotan Program',    'Peluang Kedua'),
        ('8 Sep',  None,                 'Jelajah Sekolah'),
        ('15 Sep', 'Peluang Kedua',      'Sorotan Program'),
        ('22 Sep', None,                 'Maklumat Ibu Bapa'),
    ]),
]

nrow, ncol = len(CAL), 4
CW, CH = 24.0, 15.0          # cell size in axis units
LEFT, TOP = 23.0, 7.0        # margins for row labels / header
W = LEFT + ncol * CW
H = TOP + nrow * CH

fig, ax = plt.subplots(figsize=(10.2, 7.4))
ax.set_xlim(0, W); ax.set_ylim(0, H + 7); ax.axis('off')
ax.invert_yaxis()

# header
for c in range(ncol):
    ax.text(LEFT + c * CW + CW / 2, TOP - 1.8, f'MINGGU {c + 1}', ha='center', va='center',
            fontsize=9.5, fontweight='bold', color=MUTED)

for r, (month, note, weeks) in enumerate(CAL):
    y0 = TOP + r * CH
    if r % 2 == 0:
        ax.add_patch(Rectangle((0, y0), W, CH, facecolor=BAND, edgecolor='none', zorder=0))
    ax.text(1.0, y0 + CH / 2 - 1.6, month, ha='left', va='center',
            fontsize=9.2, fontweight='bold', color=INK)
    if note:
        ax.text(1.0, y0 + CH / 2 + 2.4, note, ha='left', va='center',
                fontsize=6.9, color=RED, style='italic')
    for c, (day, vid, post) in enumerate(weeks):
        x0 = LEFT + c * CW
        ax.text(x0 + 1.2, y0 + 2.6, day, ha='left', va='center',
                fontsize=7.8, fontweight='bold', color=MUTED)
        y = y0 + 5.4
        for kind, pillar, col in (('VIDEO', vid, BLUE), ('POSTER', post, AMBER)):
            if not pillar:
                continue
            ax.add_patch(FancyBboxPatch((x0 + 1.0, y), CW - 2.6, 3.9,
                                        boxstyle='round,pad=0,rounding_size=0.7',
                                        facecolor=col, edgecolor='none', zorder=3))
            ax.text(x0 + 2.0, y + 1.95, kind, ha='left', va='center', fontsize=6.2,
                    fontweight='bold', color='white', zorder=4)
            ax.text(x0 + 8.4, y + 1.95, pillar, ha='left', va='center', fontsize=6.9,
                    color='white', zorder=4)
            y += 4.7

# grid lines
for c in range(ncol + 1):
    ax.plot([LEFT + c * CW] * 2, [TOP, TOP + nrow * CH], color=GRID, linewidth=0.9, zorder=2)
for r in range(nrow + 1):
    ax.plot([0, W], [TOP + r * CH] * 2, color=GRID, linewidth=0.9, zorder=2)

ax.text(0, 1.6, 'KALENDAR KANDUNGAN MEDIA SOSIAL', ha='left', va='center',
        fontsize=14, fontweight='bold', color=INK)
ax.text(W, 1.8, 'TVET LIPIS  ·  APRIL – SEPTEMBER 2025', ha='right', va='center',
        fontsize=9.5, color=MUTED)

ax.legend(handles=[
    Line2D([], [], marker='s', linestyle='', markersize=9, color=BLUE,
           label='Video pendek — TikTok, Instagram Reels, Facebook  (dua minggu sekali)'),
    Line2D([], [], marker='s', linestyle='', markersize=9, color=AMBER,
           label='Poster grafik — Instagram, Facebook  (mingguan)'),
], loc='lower left', bbox_to_anchor=(0.0, -0.075), ncol=1, frameon=False, fontsize=8.2,
   handletextpad=0.6, labelspacing=0.5)

fig.tight_layout()
fig.savefig('cu1_kalendar.png', dpi=200, bbox_inches='tight')
print('saved')
