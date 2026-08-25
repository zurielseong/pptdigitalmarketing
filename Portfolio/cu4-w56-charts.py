import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

BLUE, RED = '#2F5FC4', '#C1272D'
INK, MUTED, GRID = '#1F2937', '#6B7280', '#DDE1E6'
plt.rcParams.update({
    'font.family': 'sans-serif',
    'font.sans-serif': ['DejaVu Sans'],
    'axes.edgecolor': GRID, 'axes.labelcolor': MUTED,
    'xtick.color': MUTED, 'ytick.color': MUTED,
    'text.color': INK, 'figure.facecolor': 'white', 'axes.facecolor': 'white',
})

# ── 1. ROI achieved against target ───────────────────────────────────────────
fig, ax = plt.subplots(figsize=(5.6, 2.0))
ax.barh([0], [1.00], height=0.42, color=RED, zorder=3)
ax.axvline(2.00, color=INK, linestyle='--', linewidth=1.4, zorder=4)
ax.text(2.06, 0.30, 'Target ROI  2.00', fontsize=9, color=INK, va='center')
ax.text(0.94, 0, '1.00', fontsize=11, color='white', fontweight='bold',
        ha='right', va='center', zorder=5)
ax.text(0.06, 0, 'Achieved', fontsize=9.5, color='white', ha='left',
        va='center', zorder=5)
ax.set_xlim(0, 2.6); ax.set_ylim(-0.6, 0.6)
ax.set_yticks([]); ax.set_xticks([0, 0.5, 1.0, 1.5, 2.0, 2.5])
ax.set_xlabel('Return on ad spend (ROI)', fontsize=9)
ax.xaxis.grid(True, color=GRID, linewidth=0.8, zorder=0)
for s in ('top', 'right', 'left'): ax.spines[s].set_visible(False)
ax.set_title('Campaign delivered at half of the ROI target',
             fontsize=10.5, fontweight='bold', color=INK, loc='left', pad=10)
fig.tight_layout(); fig.savefig('cu4_w05_target.png', dpi=200); plt.close(fig)

# ── 2. Unit economics of the acquired order ──────────────────────────────────
fig, ax = plt.subplots(figsize=(5.6, 2.5))
labels = ['Gross revenue per order', 'Advertising cost per order']
vals = [50.0, 50.0]
bars = ax.bar(labels, vals, width=0.44, color=[BLUE, RED], zorder=3)
for b, v in zip(bars, vals):
    ax.text(b.get_x() + b.get_width()/2, v + 1.6, f'RM{v:,.2f}',
            ha='center', fontsize=10.5, fontweight='bold', color=INK)
ax.set_ylim(0, 64)
ax.set_ylabel('RM', fontsize=9)
ax.yaxis.grid(True, color=GRID, linewidth=0.8, zorder=0)
for s in ('top', 'right'): ax.spines[s].set_visible(False)
ax.set_title('Advertising consumed the whole order value',
             fontsize=10.5, fontweight='bold', color=INK, loc='left', pad=10)
ax.tick_params(axis='x', labelsize=9, length=0)
fig.tight_layout(rect=[0, 0.13, 1, 1])
fig.text(0.5, 0.045, 'Margin before platform commission and fulfilment: RM0.00',
         ha='center', fontsize=9.5, color=RED, fontweight='bold')
fig.savefig('cu4_w06_unit.png', dpi=200); plt.close(fig)

# ── 3. Optimisation cycle ────────────────────────────────────────────────────
steps = [
    ('MONITOR',  'Weekly review of\nROI against the\n2.00 target'),
    ('DIAGNOSE', 'ROI 1.00; cost per\norder RM50 on a\nRM55 item'),
    ('ACT',      'Seller Flash Sale\nat 8% to lift the\nconversion rate'),
    ('MEASURE',  'Re-check ROI and\ncost per order\nafter the change'),
]
fig, ax = plt.subplots(figsize=(7.4, 1.9))
ax.set_xlim(0, 100); ax.set_ylim(0, 34); ax.axis('off')
w, gap = 21.0, 5.3
cols = [BLUE, BLUE, RED, MUTED]
for i, ((head, body), col) in enumerate(zip(steps, cols)):
    x = i * (w + gap)
    ax.add_patch(FancyBboxPatch((x, 2), w, 28, boxstyle='round,pad=0,rounding_size=1.6',
                                linewidth=1.6, edgecolor=col, facecolor='white', zorder=3))
    ax.add_patch(FancyBboxPatch((x, 23), w, 7, boxstyle='round,pad=0,rounding_size=1.6',
                                linewidth=0, facecolor=col, zorder=4))
    ax.text(x + w/2, 26.4, head, ha='center', va='center', fontsize=9,
            fontweight='bold', color='white', zorder=5)
    ax.text(x + w/2, 12.5, body, ha='center', va='center', fontsize=8.2,
            color=INK, linespacing=1.5, zorder=5)
    if i < 3:
        ax.add_patch(FancyArrowPatch((x + w + 0.8, 16), (x + w + gap - 0.8, 16),
                                     arrowstyle='-|>', mutation_scale=13,
                                     linewidth=1.4, color=MUTED, zorder=3))
fig.tight_layout(); fig.savefig('cu4_w06_cycle.png', dpi=200,
                                bbox_inches='tight'); plt.close(fig)

print('charts written')
