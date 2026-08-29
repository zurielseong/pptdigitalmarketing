import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.lines import Line2D

BLUE, AMBER, RED = '#2F5FC4', '#E08A1E', '#C1272D'
INK, MUTED, GRID = '#1F2937', '#6B7280', '#DDE1E6'
plt.rcParams.update({
    'font.family': 'sans-serif', 'font.sans-serif': ['DejaVu Sans'],
    'axes.edgecolor': GRID, 'xtick.color': MUTED, 'ytick.color': MUTED,
    'text.color': INK, 'figure.facecolor': 'white', 'axes.facecolor': 'white',
})

# month index, day label, theme, sent?
sends = [
    (0,  '11 Jan', 'Intake open',        False),
    (1,  '8 Feb',  'Programme',          False),
    (2,  '8 Mar',  'Funding',            False),
    (3,  '12 Apr', 'SPM results',        False),
    (4,  '10 May', 'Programme',          False),
    (5,  '14 Jun', 'Mid-year intake',    False),
    (6,  '12 Jul', 'Alumni outcome',     False),
    (7,  '9 Aug',  'Funding',            False),
    (8,  '13 Sep', 'Open day notice',    False),
    (9,  '4 Oct',  'Open day invite',    True),
    (10, '8 Nov',  'Open day reminder',  False),
    (11, '6 Dec',  'Final intake call',  False),
]
months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

fig, ax = plt.subplots(figsize=(8.4, 1.85))
ax.plot([-0.35, 11.35], [0, 0], color=GRID, linewidth=1.6, zorder=1)
for m, day, theme, sent in sends:
    ax.plot([m], [0], marker='o', markersize=11, zorder=4,
            markerfacecolor=BLUE if sent else 'white',
            markeredgecolor=BLUE, markeredgewidth=1.8)
    ax.annotate(day, (m, 0), xytext=(0, 14), textcoords='offset points',
                ha='center', fontsize=8, fontweight='bold', color=INK)

# the open day the October send promotes
ax.plot([10.5], [0], marker='*', markersize=16, color=AMBER, zorder=5)
ax.annotate('Open day 15 Nov', (10.5, 0), xytext=(0, -19), textcoords='offset points',
            ha='center', fontsize=7.6, fontweight='bold', color=AMBER)

ax.set_xlim(-0.7, 11.7); ax.set_ylim(-1.15, 1.05)
ax.set_xticks([]); ax.set_yticks([])
for s in ('top', 'right', 'left', 'bottom'): ax.spines[s].set_visible(False)
ax.set_title('Email send calendar 2025 — one send per month, Saturdays',
             fontsize=10.4, fontweight='bold', color=INK, loc='left', pad=14)
ax.legend(handles=[
    Line2D([], [], marker='o', linestyle='', markersize=9, markerfacecolor=BLUE,
           markeredgecolor=BLUE, label='Sent — evidenced'),
    Line2D([], [], marker='o', linestyle='', markersize=9, markerfacecolor='white',
           markeredgecolor=BLUE, markeredgewidth=1.6, label='Scheduled'),
], loc='lower center', bbox_to_anchor=(0.5, -0.20), ncol=2, frameon=False, fontsize=8.2)
fig.tight_layout(); fig.savefig('cu6_calendar.png', dpi=200, bbox_inches='tight'); plt.close(fig)

# ── Audience composition by tag ──────────────────────────────────────────────
fig, ax = plt.subplots(figsize=(5.4, 1.5))
segs = [('Student', 73, BLUE), ('Student Program', 16, AMBER), ('Staff', 10, RED)]
left = 0
for lab, v, col in segs:
    ax.barh([0], [v], left=left, height=0.5, color=col, zorder=3,
            edgecolor='white', linewidth=2)
    ax.text(left + v / 2, 0, str(v), ha='center', va='center', fontsize=10,
            fontweight='bold', color='white', zorder=5)
    ax.text(left + v / 2, -0.45, lab, ha='center', va='top', fontsize=8.2,
            color=MUTED, zorder=5)
    left += v
ax.set_xlim(0, 99); ax.set_ylim(-1.0, 0.7)
ax.set_xticks([]); ax.set_yticks([])
for s in ('top', 'right', 'left', 'bottom'): ax.spines[s].set_visible(False)
ax.set_title('Audience by tag — 100 contacts (99 tagged)',
             fontsize=10.2, fontweight='bold', color=INK, loc='left', pad=10)
fig.tight_layout(); fig.savefig('cu6_audience.png', dpi=200); plt.close(fig)

print('charts written')
