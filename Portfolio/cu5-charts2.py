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


# ── W03. CRM pipeline as recorded ────────────────────────────────────────────
stages = ['Lead', 'Contacted', 'Potential', 'Customer', 'Cold']
vals = [4184, 1816, 89, 58, 8]
fig, ax = plt.subplots(figsize=(6.6, 2.5))
bars = ax.barh(range(len(stages))[::-1], vals, height=0.58, color=BLUE, zorder=3)
for i, (b, v) in enumerate(zip(bars, vals)):
    inside = v > 600
    ax.text(v - 60 if inside else v + 70, b.get_y() + b.get_height() / 2, f'{v:,}',
            ha='right' if inside else 'left', va='center', fontsize=10,
            fontweight='bold', color='white' if inside else INK, zorder=5)
ax.set_yticks(range(len(stages))[::-1]); ax.set_yticklabels(stages, fontsize=9.4, color=INK)
ax.set_xlim(0, 4700); ax.set_xticks([])
ax.tick_params(axis='y', length=0)
for s in ('top', 'right', 'bottom', 'left'): ax.spines[s].set_visible(False)
ax.set_title('Prospect pipeline by stage — TVET Lipis CRM',
             fontsize=10.4, fontweight='bold', color=INK, loc='left', pad=12)
fig.tight_layout(); fig.savefig('cu5_pipeline.png', dpi=200); plt.close(fig)

# ── W06. Retargeting escalation ──────────────────────────────────────────────
chain([
    ('BATCH A',    'No reply for\n7+ days\nWhatsApp'),
    ('BATCH B',    'Second attempt\nWhatsApp'),
    ('BATCH C',    'Third and final\nWhatsApp attempt'),
    ('EMAIL POOL', 'Moved off WhatsApp\nto email marketing'),
], [AMBER, AMBER, AMBER, BLUE], 'cu5_retarget.png', figw=7.0)

print('charts written')
