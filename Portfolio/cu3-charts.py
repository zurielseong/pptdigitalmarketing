import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
BLUE, AMBER, RED = '#2F5FC4', '#E08A1E', '#C1272D'
INK, MUTED, GRID = '#1F2937', '#6B7280', '#DDE1E6'
plt.rcParams.update({'font.family':'sans-serif','font.sans-serif':['DejaVu Sans'],
    'axes.edgecolor':GRID,'xtick.color':MUTED,'ytick.color':MUTED,'text.color':INK,
    'figure.facecolor':'white','axes.facecolor':'white'})

# where the 217 clicks came from
segs=[('Google Search',182,BLUE),('Google partner websites',25,AMBER),('Maps',10,RED)]
fig,ax=plt.subplots(figsize=(6.6,1.6)); left=0
for lab,v,col in segs:
    ax.barh([0],[v],left=left,height=0.5,color=col,zorder=3,edgecolor='white',linewidth=2)
    ax.text(left+v/2,0,str(v),ha='center',va='center',fontsize=10.5,fontweight='bold',color='white',zorder=5)
    left+=v
ax.text(91,-0.42,'Google Search',ha='center',va='top',fontsize=8.6,color=MUTED)
ax.text(194.5,-0.42,'Partner sites',ha='center',va='top',fontsize=8.6,color=MUTED)
ax.annotate('Maps (10)',xy=(212,0.28),xytext=(200,0.75),fontsize=8.4,color=MUTED,ha='center',
            arrowprops=dict(arrowstyle='-',color=MUTED,linewidth=0.9))
ax.set_xlim(0,217); ax.set_ylim(-1.0,1.05); ax.set_xticks([]); ax.set_yticks([])
for s in ('top','right','left','bottom'): ax.spines[s].set_visible(False)
ax.set_title('217 clicks — 25 of them bought outside Google itself',
             fontsize=10.3,fontweight='bold',color=INK,loc='left',pad=12)
fig.tight_layout(); fig.savefig('cu3_clicks.png',dpi=200); plt.close(fig)

# monthly campaign spend
months=['May','June','July','Aug','Sept']; vals=[0,99.14,50.92,0,0]
fig,ax=plt.subplots(figsize=(6.2,2.3))
bars=ax.bar(months,vals,width=0.5,color=[BLUE if v else GRID for v in vals],zorder=3)
for b,v in zip(bars,vals):
    if v: ax.text(b.get_x()+b.get_width()/2,v+3,f'RM{v:,.2f}',ha='center',fontsize=9.6,fontweight='bold',color=INK)
ax.annotate('Campaign paused', xy=(3,2), xytext=(3.35,55), fontsize=8.8, color=RED,
            fontweight='bold', ha='center',
            arrowprops=dict(arrowstyle='->',color=RED,linewidth=1.2))
ax.set_ylim(0,125); ax.set_ylabel('Campaign spend (RM)',fontsize=8.8)
ax.tick_params(axis='x',labelsize=9,length=0)
ax.yaxis.grid(True,color=GRID,linewidth=0.8,zorder=0)
for s in ('top','right'): ax.spines[s].set_visible(False)
ax.set_title('Spend by month, 2025 — the campaign ran for nine weeks',
             fontsize=10.3,fontweight='bold',color=INK,loc='left',pad=10)
fig.tight_layout(); fig.savefig('cu3_spend.png',dpi=200); plt.close(fig)
print('ok')
