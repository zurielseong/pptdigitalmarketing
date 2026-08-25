import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

BLUE, AMBER, RED = '#2F5FC4', '#E08A1E', '#C1272D'
INK, MUTED = '#1F2937', '#6B7280'
plt.rcParams.update({'font.family':'sans-serif','font.sans-serif':['DejaVu Sans'],
                     'text.color':INK,'figure.facecolor':'white','axes.facecolor':'white'})

def chain(steps, cols, path, figw=8.2):
    n=len(steps)
    fig, ax = plt.subplots(figsize=(figw, 1.95))
    ax.set_xlim(0,100); ax.set_ylim(0,34); ax.axis('off')
    gap=4.2; w=(100-gap*(n-1))/n
    for i,((hd,bd),col) in enumerate(zip(steps,cols)):
        x=i*(w+gap)
        ax.add_patch(FancyBboxPatch((x,2),w,28,boxstyle='round,pad=0,rounding_size=1.5',
                                    linewidth=1.5,edgecolor=col,facecolor='white',zorder=3))
        ax.add_patch(FancyBboxPatch((x,23),w,7,boxstyle='round,pad=0,rounding_size=1.5',
                                    linewidth=0,facecolor=col,zorder=4))
        ax.text(x+w/2,26.4,hd,ha='center',va='center',fontsize=8.4,fontweight='bold',color='white',zorder=5)
        ax.text(x+w/2,12.5,bd,ha='center',va='center',fontsize=7.6,color=INK,linespacing=1.5,zorder=5)
        if i<n-1:
            ax.add_patch(FancyArrowPatch((x+w+0.6,16),(x+w+gap-0.6,16),arrowstyle='-|>',
                                         mutation_scale=11,linewidth=1.3,color=MUTED,zorder=3))
    fig.tight_layout(); fig.savefig(path,dpi=200,bbox_inches='tight'); plt.close(fig)

chain([
    ('BUILD',   'Campaign built\nfrom the calendar\nentry'),
    ('SEGMENT', 'Recipient list\nselected by tag\nbefore sending'),
    ('VERIFY',  'Sent to Staff\nsegment first —\n03:45, 4 Oct'),
    ('SEND',    'Released to the\nfull audience —\n04:06, 4 Oct'),
    ('CONFIRM', 'Delivery and\nengagement read\nfrom the report'),
], [BLUE, BLUE, AMBER, BLUE, BLUE], 'cu6_sendflow.png')
print('ok')
