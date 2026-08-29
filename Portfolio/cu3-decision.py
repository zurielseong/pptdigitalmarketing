import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
BLUE, RED = '#2F5FC4', '#C1272D'
INK, MUTED, GRID = '#1F2937', '#6B7280', '#DDE1E6'
plt.rcParams.update({'font.family':'sans-serif','font.sans-serif':['DejaVu Sans'],
    'text.color':INK,'figure.facecolor':'white','axes.facecolor':'white'})
fig, ax = plt.subplots(figsize=(6.4, 2.5))
ax.bar([0,1],[1,1],width=0.42,color=[RED,BLUE],zorder=3)
ax.text(0,1.06,'PAUSED',ha='center',fontsize=9.8,fontweight='bold',color=RED)
ax.text(1,1.06,'PRIORITISED',ha='center',fontsize=9.8,fontweight='bold',color=BLUE)
ax.text(0,0.5,'RM150.06 spent\n115 local actions\nNo measurable lead',
        ha='center',va='center',fontsize=8.6,color='white',linespacing=1.8,zorder=5)
ax.text(1,0.5,'RM11,267.97 spent\n3,470 leads\nRM3.25 per lead',
        ha='center',va='center',fontsize=8.6,color='white',linespacing=1.8,zorder=5)
ax.set_xticks([0,1]); ax.set_xticklabels(['Google Ads\nMay – July 2025','Meta and TikTok\nApril – September 2025'],fontsize=9,color=INK)
ax.set_ylim(0,1.3); ax.set_yticks([])
ax.tick_params(axis='x',length=0)
for s in ('top','right','left','bottom'): ax.spines[s].set_visible(False)
ax.set_title('Where the recruitment budget was directed',fontsize=10.3,fontweight='bold',color=INK,loc='left',pad=10)
fig.tight_layout(); fig.savefig('cu3_decision.png',dpi=200)
print('ok')
