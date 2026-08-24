import os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch, Circle
import matplotlib.patheffects as pe

SP = os.environ.get('SP', '.')
NAVY = '#1F3864'
RED = '#C1272D'
GREY = '#6B7280'
LIGHT = '#EDF1F7'
plt.rcParams['font.family'] = 'DejaVu Sans'


def box(ax, x, y, w, h, label, fill, edge, tc='white', fs=9, bold=True):
    ax.add_patch(FancyBboxPatch((x, y), w, h,
                 boxstyle="round,pad=0.012,rounding_size=0.02",
                 facecolor=fill, edgecolor=edge, linewidth=1.3))
    ax.text(x + w / 2, y + h / 2, label, ha='center', va='center',
            fontsize=fs, color=tc, fontweight='bold' if bold else 'normal',
            linespacing=1.45)


def arrow(ax, x1, y1, x2, y2, color=NAVY, lw=1.6):
    ax.add_patch(FancyArrowPatch((x1, y1), (x2, y2), arrowstyle='-|>',
                 mutation_scale=13, color=color, linewidth=lw,
                 shrinkA=0, shrinkB=0))


# ── 1. Complaint handling procedure flow (W01) ─────────────────────────
fig, ax = plt.subplots(figsize=(9.4, 2.55), dpi=210)
ax.set_xlim(0, 10); ax.set_ylim(0, 2.7); ax.axis('off')

steps = [
    ('DETECT', 'complaint seen\non any channel'),
    ('ASSESS', 'severity graded\nL1 / L2 / L3'),
    ('LOG', 'ticket raised\nin register'),
    ('RESPOND', 'public reply\nwithin standard'),
    ('RESOLVE', 'moved offline,\nissue settled'),
    ('REPORT', 'logged, closed,\nsubmitted'),
]
w, h, gap = 1.42, 1.02, 0.28
x0 = 0.22
for i, (t, s) in enumerate(steps):
    x = x0 + i * (w + gap)
    box(ax, x, 1.05, w, h, t, NAVY, NAVY, fs=9.5)
    ax.text(x + w / 2, 0.86, s, ha='center', va='top', fontsize=7.4,
            color=GREY, linespacing=1.45)
    if i < len(steps) - 1:
        arrow(ax, x + w + 0.045, 1.56, x + w + gap - 0.045, 1.56)

ax.text(x0, 2.42, 'Every complaint follows the same six steps regardless of channel',
        fontsize=8.2, color=NAVY, style='italic')
plt.tight_layout(pad=0.15)
plt.savefig(f'{SP}/cu7_flow.png', bbox_inches='tight', facecolor='white')
plt.close()

# ── 2. Severity levels and response standard (W01) ─────────────────────
fig, ax = plt.subplots(figsize=(7.6, 2.9), dpi=210)
levels = ['L3  Serious\nsafety, legal or viral', 'L2  Material\nservice failure', 'L1  Routine\nsingle enquiry']
hours = [1, 4, 12]
colors = [RED, '#E08A2E', NAVY]
bars = ax.barh(levels, hours, color=colors, height=0.52, zorder=3)
for b, hv in zip(bars, hours):
    ax.text(hv + 0.28, b.get_y() + b.get_height() / 2,
            f'{hv} hour' + ('s' if hv > 1 else ''), va='center',
            fontsize=9.5, fontweight='bold', color=b.get_facecolor())
ax.set_xlim(0, 14.5)
ax.set_xlabel('Target time to first public response', fontsize=8.6, color=GREY)
ax.tick_params(axis='y', labelsize=8.4, length=0)
ax.tick_params(axis='x', labelsize=8, colors=GREY)
for s in ['top', 'right', 'left']:
    ax.spines[s].set_visible(False)
ax.spines['bottom'].set_color('#D5DAE2')
ax.grid(axis='x', color='#EDF1F7', zorder=0)
ax.set_axisbelow(True)
plt.tight_layout(pad=0.3)
plt.savefig(f'{SP}/cu7_severity.png', bbox_inches='tight', facecolor='white')
plt.close()

# ── 3. Compliment repurposing routes (W02) ─────────────────────────────
fig, ax = plt.subplots(figsize=(8.4, 3.15), dpi=210)
ax.set_xlim(0, 10); ax.set_ylim(0, 3.35); ax.axis('off')

box(ax, 0.15, 1.28, 1.95, 0.86, 'COMPLIMENT\nRECEIVED', NAVY, NAVY, fs=8.8)
box(ax, 2.72, 1.28, 1.85, 0.86, 'COMPILED\nweekly', '#4A6FA5', '#4A6FA5', fs=8.8)
arrow(ax, 2.16, 1.71, 2.66, 1.71)

outs = [
    (2.68, 'Instagram Story\n— screenshot repost'),
    (1.79, 'TikTok video\n— testimonial overlay'),
    (0.90, 'Facebook post\n— review card'),
    (0.02, 'Website & listing\n— social proof block'),
]
for y, label in outs:
    box(ax, 5.55, y, 4.25, 0.72, label, LIGHT, '#B9C4D4', tc=NAVY, fs=8.2, bold=False)
    arrow(ax, 4.63, 1.71, 5.49, y + 0.36, color='#8A98AC', lw=1.25)

ax.text(0.15, 3.12, 'One compliment, four published placements — scheduled and assigned',
        fontsize=8.2, color=NAVY, style='italic')
plt.tight_layout(pad=0.15)
plt.savefig(f'{SP}/cu7_repurpose.png', bbox_inches='tight', facecolor='white')
plt.close()

# ── 4. Community management weekly cycle (W03) ─────────────────────────
fig, ax = plt.subplots(figsize=(5.9, 5.0), dpi=210)
ax.set_xlim(-1.42, 1.42); ax.set_ylim(-1.42, 1.42)
ax.axis('off'); ax.set_aspect('equal')

import numpy as np
labels = ['MONITOR\ninbox & comments\ndaily',
          'RESPOND\nwithin the\nseverity standard',
          'MEASURE\nfollower trend,\nresponse rate',
          'ADJUST\ncontent and\nroster']
n = len(labels)
r = 0.94
angles = [np.pi / 2 - i * 2 * np.pi / n for i in range(n)]

for i, (a, lab) in enumerate(zip(angles, labels)):
    x, y = r * np.cos(a), r * np.sin(a)
    ax.add_patch(Circle((x, y), 0.415, facecolor=NAVY if i % 2 == 0 else '#4A6FA5',
                        edgecolor='white', linewidth=2.2, zorder=3))
    ax.text(x, y, lab, ha='center', va='center', fontsize=7.6, color='white',
            fontweight='bold', linespacing=1.5, zorder=4)

for i in range(n):
    a1, a2 = angles[i], angles[(i + 1) % n]
    mid = (a1 + a2) / 2
    if abs(a1 - a2) > np.pi:
        mid += np.pi
    ax.add_patch(FancyArrowPatch(
        (r * np.cos(a1), r * np.sin(a1)), (r * np.cos(a2), r * np.sin(a2)),
        connectionstyle="arc3,rad=-0.30", arrowstyle='-|>', mutation_scale=15,
        color='#9AA7BA', linewidth=1.7, shrinkA=56, shrinkB=58, zorder=5))

ax.text(0, 0, 'WEEKLY\nCYCLE', ha='center', va='center', fontsize=9.2,
        color=RED, fontweight='bold', linespacing=1.5)
plt.tight_layout(pad=0.1)
plt.savefig(f'{SP}/cu7_cycle.png', bbox_inches='tight', facecolor='white')
plt.close()

print('charts written')
