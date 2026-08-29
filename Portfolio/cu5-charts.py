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


# ── W01. Lead generation to enrolment — where the mobile channel sits ────────
chain([
    ('LEAD AD',      'Meta and TikTok\nlead generation\ncampaign'),
    ('LEAD FORM',    'Prospect completes\nthe instant form\nin-platform'),
    ('CRM',          'Lead lands in the\nCRM and is assigned\nto a counsellor'),
    ('WHATSAPP',     'Counsellor contacts\nthe prospect one by\none via WABA'),
    ('REGISTRATION', 'Offer letter issued\nand enrolment\ncompleted'),
], [BLUE, BLUE, AMBER, BLUE, BLUE], 'cu5_flow.png')

# ── W02. Broadcast calendar against the recruitment cycle ────────────────────
months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
intensity = [2, 2, 4, 3, 2, 3, 3, 2, 3, 2, 2, 1]
peaks = {2: 'SPM results', 6: 'July intake', 8: 'Open day'}
fig, ax = plt.subplots(figsize=(7.0, 2.15))
cols = [AMBER if i in peaks else BLUE for i in range(12)]
bars = ax.bar(months, intensity, width=0.62, color=cols, zorder=3)
for i, b in enumerate(bars):
    if i in peaks:
        ax.text(b.get_x() + b.get_width() / 2, b.get_height() + 0.18, peaks[i],
                ha='center', fontsize=7.8, color=INK, fontweight='bold')
ax.set_ylim(0, 5.4)
ax.set_ylabel('Broadcasts per month', fontsize=8.6)
ax.set_yticks([0, 2, 4])
ax.tick_params(axis='x', labelsize=8.6, length=0)
ax.yaxis.grid(True, color=GRID, linewidth=0.8, zorder=0)
for s in ('top', 'right'): ax.spines[s].set_visible(False)
ax.set_title('Broadcast frequency follows the recruitment cycle',
             fontsize=10.2, fontweight='bold', color=INK, loc='left', pad=10)
fig.tight_layout(); fig.savefig('cu5_calendar.png', dpi=200); plt.close(fig)

print('charts written')
