import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

BLUE, AMBER, RED = '#2F5FC4', '#E08A1E', '#C1272D'
INK, MUTED, GRID = '#1F2937', '#6B7280', '#DDE1E6'
plt.rcParams.update({
    'font.family': 'sans-serif', 'font.sans-serif': ['DejaVu Sans'],
    'axes.edgecolor': GRID, 'xtick.color': MUTED, 'ytick.color': MUTED,
    'text.color': INK, 'figure.facecolor': 'white', 'axes.facecolor': 'white',
})


def chain(steps, cols, path, figw=8.2):
    """Horizontal box-and-arrow chain."""
    n = len(steps)
    fig, ax = plt.subplots(figsize=(figw, 1.95))
    ax.set_xlim(0, 100); ax.set_ylim(0, 34); ax.axis('off')
    gap = 4.2
    w = (100 - gap * (n - 1)) / n
    for i, ((hd, bd), col) in enumerate(zip(steps, cols)):
        x = i * (w + gap)
        ax.add_patch(FancyBboxPatch((x, 2), w, 28, boxstyle='round,pad=0,rounding_size=1.5',
                                    linewidth=1.5, edgecolor=col, facecolor='white', zorder=3))
        ax.add_patch(FancyBboxPatch((x, 23), w, 7, boxstyle='round,pad=0,rounding_size=1.5',
                                    linewidth=0, facecolor=col, zorder=4))
        ax.text(x + w / 2, 26.4, hd, ha='center', va='center', fontsize=8.4,
                fontweight='bold', color='white', zorder=5)
        ax.text(x + w / 2, 12.5, bd, ha='center', va='center', fontsize=7.6,
                color=INK, linespacing=1.5, zorder=5)
        if i < n - 1:
            ax.add_patch(FancyArrowPatch((x + w + 0.6, 16), (x + w + gap - 0.6, 16),
                                         arrowstyle='-|>', mutation_scale=11,
                                         linewidth=1.3, color=MUTED, zorder=3))
    fig.tight_layout(); fig.savefig(path, dpi=200, bbox_inches='tight'); plt.close(fig)


# ── W04-1. Order pipeline composition ────────────────────────────────────────
segs = [('Completed', 9, BLUE), ('Shipped', 8, AMBER), ('Awaiting shipment', 1, RED)]
fig, ax = plt.subplots(figsize=(6.4, 1.55))
left = 0
for lab, v, col in segs:
    ax.barh([0], [v], left=left, height=0.5, color=col, zorder=3,
            edgecolor='white', linewidth=2)
    ax.text(left + v / 2, 0, str(v), ha='center', va='center', fontsize=11,
            fontweight='bold', color='white', zorder=5)
    if v > 1:
        ax.text(left + v / 2, -0.44, lab, ha='center', va='top', fontsize=8.6,
                color=MUTED, zorder=5)
    left += v
ax.annotate('Awaiting\nshipment (1)', xy=(17.5, 0.28), xytext=(17.0, 0.72),
            fontsize=8.6, color=MUTED, ha='center',
            arrowprops=dict(arrowstyle='-', color=MUTED, linewidth=0.9))
ax.set_xlim(0, 18); ax.set_ylim(-1.0, 1.05)
ax.set_yticks([]); ax.set_xticks([])
for s in ('top', 'right', 'left', 'bottom'): ax.spines[s].set_visible(False)
ax.set_title('18 orders received — all resolved or in progress, none overdue',
             fontsize=10.2, fontweight='bold', color=INK, loc='left', pad=12)
fig.tight_layout(); fig.savefig('cu4_w04_pipeline.png', dpi=200); plt.close(fig)

# ── W04-2. Fulfilment chain ──────────────────────────────────────────────────
chain([
    ('ORDER',     'Order received\nand confirmed in\nSeller Centre'),
    ('LABEL',     'Shipping label\nissued via\nplatform'),
    ('DISPATCH',  'Collected by\nBEST Express,\ncashless'),
    ('SUPPORT',   'Buyer enquiries\nhandled in\nSeller Centre chat'),
    ('COMPLETE',  'Delivery confirmed\nand order marked\ncompleted'),
], [BLUE, BLUE, BLUE, AMBER, BLUE], 'cu4_w04_chain.png')

# ── W06. Optimisation cycle, five steps ──────────────────────────────────────
chain([
    ('MONITOR',  'ROI tracked weekly\nagainst the 2.00\ntarget'),
    ('DIAGNOSE', 'ROI 1.00; RM50 cost\nper order on a\nRM55 item'),
    ('ACT',      'Flash Sale at 9%,\n3–5 October 2025'),
    ('MEASURE',  'Return re-checked\nagainst the same\ntarget'),
    ('DECIDE',   'Paid advertising\ndiscontinued;\nbudget reallocated'),
], [BLUE, BLUE, AMBER, BLUE, RED], 'cu4_w06_cycle.png')

# ── W06. Where the budget went instead ───────────────────────────────────────
fig, ax = plt.subplots(figsize=(6.0, 2.35))
labels = ['TikTok Shop\npaid advertising', 'Organic content\nand offline sales']
vals = [1, 1]
bars = ax.bar(labels, vals, width=0.42, color=[RED, BLUE], zorder=3)
ax.text(0, 1.06, 'DISCONTINUED', ha='center', fontsize=9.5, fontweight='bold', color=RED)
ax.text(1, 1.06, 'PRIORITISED', ha='center', fontsize=9.5, fontweight='bold', color=BLUE)
ax.text(0, 0.5, 'Single SKU\nNo brand recognition\nROI 1.00 vs 2.00 target',
        ha='center', va='center', fontsize=8.4, color='white', linespacing=1.7, zorder=5)
ax.text(1, 0.5, 'Existing local following\nWalk-in at the centre\nNo media cost',
        ha='center', va='center', fontsize=8.4, color='white', linespacing=1.7, zorder=5)
ax.set_ylim(0, 1.28); ax.set_yticks([])
ax.tick_params(axis='x', labelsize=9, length=0, colors=INK)
for s in ('top', 'right', 'left', 'bottom'): ax.spines[s].set_visible(False)
ax.set_title('Channel decision following the review',
             fontsize=10.2, fontweight='bold', color=INK, loc='left', pad=10)
fig.tight_layout(); fig.savefig('cu4_w06_decision.png', dpi=200); plt.close(fig)

print('charts written')
