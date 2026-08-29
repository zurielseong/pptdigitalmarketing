import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
BLUE, AMBER, RED = '#2F5FC4', '#E08A1E', '#C1272D'
INK, MUTED, GRID = '#1F2937', '#6B7280', '#DDE1E6'
plt.rcParams.update({'font.family':'sans-serif','font.sans-serif':['DejaVu Sans'],
    'axes.edgecolor':GRID,'xtick.color':MUTED,'ytick.color':MUTED,'text.color':INK,
    'figure.facecolor':'white','axes.facecolor':'white'})

# 1. audience by channel — the reason TikTok was chosen
fig, ax = plt.subplots(figsize=(6.0, 2.2))
ch=['TikTok\n@tvet_lipis','Instagram\n@tvet_lipis']; v=[13800,165]
bars=ax.barh([1,0], v, height=0.5, color=[BLUE, RED], zorder=3)
for b,val in zip(bars,v):
    ax.text(val+320, b.get_y()+b.get_height()/2, f'{val:,}', va='center',
            fontsize=11, fontweight='bold', color=INK)
ax.set_yticks([1,0]); ax.set_yticklabels(ch, fontsize=9, color=INK)
ax.set_xlim(0,16800); ax.set_xticks([]); ax.tick_params(axis='y', length=0)
for s in ('top','right','left','bottom'): ax.spines[s].set_visible(False)
ax.set_title('Followers by channel — an 84-fold difference',
             fontsize=10.4, fontweight='bold', color=INK, loc='left', pad=12)
fig.tight_layout(); fig.savefig('cu1_channels.png', dpi=200); plt.close(fig)

# 2. cost per lead by platform
fig, ax = plt.subplots(figsize=(5.6, 2.3))
p=['Meta Ads','TikTok Ads','Combined']; c=[3.83,2.06,3.25]
bars=ax.bar(p, c, width=0.45, color=[AMBER, BLUE, MUTED], zorder=3)
for b,val in zip(bars,c):
    ax.text(b.get_x()+b.get_width()/2, val+0.09, f'RM{val:.2f}', ha='center',
            fontsize=10.2, fontweight='bold', color=INK)
ax.set_ylim(0,4.6); ax.set_ylabel('Cost per lead (RM)', fontsize=8.8)
ax.tick_params(axis='x', labelsize=9, length=0)
ax.yaxis.grid(True, color=GRID, linewidth=0.8, zorder=0)
for s in ('top','right'): ax.spines[s].set_visible(False)
ax.set_title('Cost per lead by platform, April – September 2025',
             fontsize=10.4, fontweight='bold', color=INK, loc='left', pad=10)
fig.tight_layout(); fig.savefig('cu1_cpl.png', dpi=200); plt.close(fig)

# 3. leads by month, Meta vs TikTok — the budget shift
months=['Apr','May','Jun','Jul','Aug','Sep']
meta=[345,133,778,798,226,56]; tik=[0,0,5,560,315,254]
x=np.arange(6); w=0.38
fig, ax = plt.subplots(figsize=(6.6, 2.4))
ax.bar(x-w/2, meta, w, label='Meta Ads', color=AMBER, zorder=3)
ax.bar(x+w/2, tik, w, label='TikTok Ads', color=BLUE, zorder=3)
for i,(m,t) in enumerate(zip(meta,tik)):
    if m: ax.text(i-w/2, m+22, str(m), ha='center', fontsize=7.8, color=INK)
    if t: ax.text(i+w/2, t+22, str(t), ha='center', fontsize=7.8, color=INK)
ax.set_xticks(x); ax.set_xticklabels(months, fontsize=9)
ax.set_ylim(0,960); ax.set_ylabel('Leads', fontsize=8.8)
ax.tick_params(axis='x', length=0)
ax.yaxis.grid(True, color=GRID, linewidth=0.8, zorder=0)
for s in ('top','right'): ax.spines[s].set_visible(False)
ax.legend(frameon=False, fontsize=8.6, loc='upper left')
ax.set_title('Leads by month and platform — TikTok added from June',
             fontsize=10.4, fontweight='bold', color=INK, loc='left', pad=10)
fig.tight_layout(); fig.savefig('cu1_leads.png', dpi=200); plt.close(fig)
print('ok')
