// Reusable portfolio document builder — letterhead format agreed with client.
// Usage: node doc-builder.js <docKey> <outPath>
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, PageBreak,
  Table, TableRow, TableCell, WidthType, ShadingType, ImageRun,
  convertInchesToTwip, Footer, PageNumber, BorderStyle,
} = require('docx');
const fs = require('fs');
const SP = '/tmp/claude-0/-home-user/c222c7c5-1fc9-5ff7-858d-b12df17563bc/scratchpad';
const F = 'Calibri';
const NAVY = '1F3864', RED = 'C1272D';

const p = (t, o = {}) => new Paragraph({
  children: [new TextRun({ text: t, font: F, size: o.size || 21, bold: o.bold, italics: o.italics, color: o.color })],
  alignment: o.align || AlignmentType.JUSTIFIED,
  spacing: { line: 276, before: o.before || 0, after: o.after === undefined ? 130 : o.after },
});
const h1 = (t) => new Paragraph({
  children: [new TextRun({ text: t, font: F, size: 24, bold: true, color: NAVY })],
  spacing: { before: 260, after: 130 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: NAVY } },
});
const sub = (t) => new Paragraph({
  children: [new TextRun({ text: t, font: F, size: 21, bold: true })],
  spacing: { before: 180, after: 90 },
});
const bullet = (t) => new Paragraph({
  children: [new TextRun({ text: t, font: F, size: 21 })],
  bullet: { level: 0 }, spacing: { line: 276, after: 70 },
});
const cell = (t, o = {}) => new TableCell({
  width: { size: o.w || 2000, type: WidthType.DXA },
  shading: o.fill ? { type: ShadingType.CLEAR, color: 'auto', fill: o.fill } : undefined,
  margins: { top: 50, bottom: 50, left: 85, right: 85 },
  children: [new Paragraph({
    children: [new TextRun({ text: String(t), font: F, size: o.size || 19, bold: o.bold, color: o.color })],
    alignment: o.align || AlignmentType.LEFT, spacing: { line: 252 },
  })],
});
const table = (head, rows, w) => new Table({
  width: { size: 9360, type: WidthType.DXA }, columnWidths: w,
  rows: [
    new TableRow({ tableHeader: true, children: head.map((h, i) => cell(h, { w: w[i], bold: true, fill: NAVY, color: 'FFFFFF' })) }),
    ...rows.map((r, ri) => new TableRow({ children: r.map((c, i) => cell(c, { w: w[i], fill: ri % 2 ? 'F2F5F9' : undefined })) })),
  ],
});
const img = (f, w, h) => new Paragraph({
  children: [new ImageRun({ type: f.match(/\.jpe?g$/) ? 'jpg' : 'png', data: fs.readFileSync(`${SP}/${f}`), transformation: { width: w, height: h } })],
  alignment: AlignmentType.CENTER, spacing: { before: 100, after: 60 },
});
const cap = (t) => new Paragraph({
  children: [new TextRun({ text: t, font: F, size: 18, italics: true, color: '666666' })],
  alignment: AlignmentType.CENTER, spacing: { after: 180 },
});
const fill = (t) => new Paragraph({
  children: [new TextRun({ text: t, font: F, size: 20, bold: true, color: RED })],
  spacing: { before: 100, after: 150 },
});

const letterhead = new Table({
  width: { size: 9360, type: WidthType.DXA }, columnWidths: [4680, 4680],
  borders: { top:{style:'none'},bottom:{style:'none'},left:{style:'none'},right:{style:'none'},insideHorizontal:{style:'none'},insideVertical:{style:'none'} },
  rows: [new TableRow({ children: [
    new TableCell({ width: { size: 4680, type: WidthType.DXA },
      borders:{top:{style:'none'},bottom:{style:'none'},left:{style:'none'},right:{style:'none'}},
      children: [new Paragraph({ alignment: AlignmentType.LEFT,
        children: [new ImageRun({ type:'png', data: fs.readFileSync(`${SP}/lh_image1.png`), transformation: { width: 190, height: 62 } })] })] }),
    new TableCell({ width: { size: 4680, type: WidthType.DXA },
      borders:{top:{style:'none'},bottom:{style:'none'},left:{style:'none'},right:{style:'none'}},
      children: [new Paragraph({ alignment: AlignmentType.RIGHT,
        children: [new ImageRun({ type:'jpg', data: fs.readFileSync(`${SP}/lh_image2.jpg`), transformation: { width: 118, height: 55 } })] })] }),
  ] })],
});
const rule = new Paragraph({ text: '', border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: RED } }, spacing: { before: 60, after: 200 } });

const head = (title, subtitle, ref, date) => ([
  letterhead, rule,
  new Paragraph({ children: [new TextRun({ text: title, font: F, size: 30, bold: true, color: NAVY })], alignment: AlignmentType.CENTER, spacing: { after: 60 } }),
  new Paragraph({ children: [new TextRun({ text: subtitle, font: F, size: 20, color: '555555' })], alignment: AlignmentType.CENTER, spacing: { after: 220 } }),
  new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [1560, 3120, 1560, 3120], rows: [
    new TableRow({ children: [cell('Reference',{w:1560,bold:true,fill:'EDF1F7'}), cell(ref,{w:3120}), cell('Prepared by',{w:1560,bold:true,fill:'EDF1F7'}), cell('Zuriel Seong',{w:3120})] }),
    new TableRow({ children: [cell('Date',{w:1560,bold:true,fill:'EDF1F7'}), cell(date,{w:3120}), cell('Position',{w:1560,bold:true,fill:'EDF1F7'}), cell('Marketing Manager',{w:3120})] }),
    new TableRow({ children: [cell('Submitted to',{w:1560,bold:true,fill:'EDF1F7'}), cell('Puan Wan Norizan',{w:3120}), cell('Status',{w:1560,bold:true,fill:'EDF1F7'}), cell('For approval',{w:3120})] }),
  ]}),
]);

const approval = () => ([
  h1('APPROVAL'),
  table(['','Prepared By','Reviewed By','Approved By'], [
    ['Name','Zuriel Seong','',''], ['Position','Marketing Manager','',''],
    ['Signature','','',''], ['Date','','',''],
  ], [1500,2820,2520,2520]),
  p(''),
  p('Decision:      ☐  Approved            ☐  Approved with amendment            ☐  Not approved', { bold: true, after: 140 }),
  p('Comments:', { bold: true, after: 100 }),
  p('______________________________________________________________________________', { after: 120 }),
  p('______________________________________________________________________________', { after: 120 }),
]);

// ─────────────────────────────────────────────────────────────────────────────
const DOCS = {};

DOCS['cu4-wa2'] = {
  file: 'CU4-WA2-Content-Calendar.docx',
  body: [
    ...head('E-COMMERCE CONTENT CALENDAR','Content planning for TikTok Shop — Superbowl Lipis','ECOM/CU4/W02/2025','[ TARIKH ]'),
    h1('1.  PURPOSE'),
    p('This calendar sets the content themes, formats and publishing schedule for the TikTok Shop channel. Because a product link can be attached to any video, every piece of content published is also a potential point of sale. The calendar therefore governs both marketing reach and sales opportunity.'),
    h1('2.  CONTENT PILLARS'),
    p('Five pillars are used. The mix weights product-led content most heavily while retaining variety, so the account does not read as purely promotional and lose organic reach.'),
    img('cu4_pillars.png', 420, 194),
    cap('Figure 1 — Monthly content mix by pillar'),
    table(['Pillar','Share','Purpose','Example'], [
      ['Product showcase','30%','Show the shirt — fabric, fit, print detail','Close-up detail reel'],
      ['Styling & fit','25%','Show how the shirt is worn','Outfit pairing, sizing'],
      ['Local identity','20%','Connect the brand to Kuala Lipis','Local landmarks, hometown content'],
      ['Customer & UGC','15%','Build trust through real buyers','Customer wearing the shirt, unboxing'],
      ['Promotional','10%','Drive immediate action','Restock, limited offer, sale event'],
    ], [1800,900,3200,3460]),
    h1('3.  PUBLISHING SCHEDULE'),
    p('Two posts per week on a fixed schedule. Every post carries the product link so any video can convert regardless of pillar.'),
    table(['Week','Post 1','Post 2'], [
      ['Week 1','Product showcase','Local identity'],
      ['Week 2','Styling & fit','Customer / UGC'],
      ['Week 3','Product showcase','Promotional'],
      ['Week 4','Styling & fit','Local identity'],
    ], [1400,3980,3980]),
    h1('4.  MONTHLY PLAN'),
    p('The calendar runs alongside platform sale events, which carry additional traffic at no extra media cost.'),
    table(['Month','Focus','Platform event'], [
      ['August','Channel launch — product showcase weighted','—'],
      ['September','Styling and local identity content','9.9 Sale'],
      ['October','Promotional weighting increased','10.10 Super Sale'],
      ['November','Customer and UGC content','11.11 Sale'],
      ['December','Year-end promotional','12.12 Sale'],
    ], [1600,4760,3000]),
    fill('[ ISI: sahkan bulan sebenar kempen dijalankan dan acara platform yang disertai ]'),
    ...approval(),
  ],
};

DOCS['cu4-wa3'] = {
  file: 'CU4-WA3-Campaign-Plan.docx',
  body: [
    ...head('E-COMMERCE CAMPAIGN PLAN','Objectives, audience and measurement — TikTok Shop','ECOM/CU4/W03/2025','[ TARIKH ]'),
    h1('1.  CAMPAIGN OBJECTIVES'),
    table(['Objective','Measure','Target'], [
      ['Establish the sales channel','Store live with product listed','Within 3 weeks of approval'],
      ['Generate first sales','Orders received','[ ISI SASARAN ]'],
      ['Build product visibility','Product page views','[ ISI SASARAN ]'],
      ['Control acquisition cost','Cost per order','[ ISI SASARAN ]'],
    ], [3000,3200,3160]),
    h1('2.  TARGET AUDIENCE'),
    table(['Segment','Description','Rationale'], [
      ['Existing followers','Current TikTok audience of the brand','Already engaged; lowest cost to reach'],
      ['Local — Kuala Lipis & Pahang','Residents and those with local ties','Brand identity is rooted in the town'],
      ['Streetwear interest — nationwide','Younger buyers following streetwear content','Expansion audience once local base is proven'],
    ], [2400,3400,3560]),
    h1('3.  POSITIONING AND MESSAGE'),
    p('The shirt is positioned as local identity apparel rather than generic streetwear. The message centres on wearing where you are from. This differentiates it from mass-market streetwear and gives the local audience a reason to buy beyond the garment itself.'),
    h1('4.  CAMPAIGN PHASES'),
    img('cu4_gantt.png', 460, 172),
    cap('Figure 1 — Campaign phases from approval'),
    table(['Phase','Activity','Gate'], [
      ['Setup','Account registration, product listing, photography','Store live and product approved'],
      ['Soft launch','Organic content only, product link attached','Checkout and fulfilment proven end to end'],
      ['Paid activation','TikTok Ads promoting shoppable content','Cost per order within threshold'],
      ['Review','Performance assessed against objectives','Decision to continue, adjust or pause'],
    ], [1700,4600,3060]),
    p('Paid activity begins only after soft launch confirms checkout and fulfilment work. Spending on traffic before the process is proven is avoided.', { before: 100 }),
    h1('5.  MEASUREMENT'),
    table(['Metric','Source','Frequency'], [
      ['Product page views','TikTok Shop Seller Centre','Weekly'],
      ['Orders and units sold','TikTok Shop Seller Centre','Weekly'],
      ['Conversion rate','Views to orders','Weekly'],
      ['Ad spend and cost per order','TikTok Ads Manager','Weekly'],
    ], [2900,3400,3060]),
    ...approval(),
  ],
};

DOCS['cu4-wa5'] = {
  file: 'CU4-WA5-Paid-Advertisement-Proposal.docx',
  body: [
    ...head('PAID ADVERTISEMENT CAMPAIGN PROPOSAL','TikTok Ads for TikTok Shop — Superbowl Lipis','ECOM/CU4/W05/2025','[ TARIKH ]'),
    h1('1.  PURPOSE'),
    p('This proposal seeks approval for paid advertising spend to promote the TikTok Shop product listing. Organic content has established the channel; paid activity is proposed to extend reach beyond existing followers.'),
    h1('2.  APPROACH'),
    p('Advertising runs through TikTok Ads, which the organisation already operates. Because the product link sits on organic video, existing content can be promoted directly rather than produced separately for advertising. This removes creative production cost from the campaign.'),
    h1('3.  BUDGET ALLOCATION'),
    img('cu4_budget.png', 290, 218),
    cap('Figure 1 — Proposed allocation of paid budget'),
    table(['Allocation','Share','Purpose'], [
      ['Prospecting','55%','Reach new audiences beyond existing followers'],
      ['Retargeting','30%','Re-reach viewers who watched but did not purchase'],
      ['Creative testing','15%','Test new content against the current best performer'],
    ], [2400,1400,5560]),
    fill('[ ISI: jumlah belanjawan bulanan yang dicadangkan ]'),
    h1('4.  TARGETING'),
    table(['Parameter','Setting'], [
      ['Age','18 – 34'],
      ['Location','Malaysia, with priority on Pahang and surrounding states'],
      ['Interest','Streetwear, local fashion, lifestyle content'],
      ['Placement','TikTok in-feed, attached to shoppable video'],
    ], [2600,6760]),
    h1('5.  SUCCESS CRITERIA'),
    table(['Metric','Threshold'], [
      ['Cost per order','Below [ ISI ] — the point at which an order remains profitable after commission and fulfilment'],
      ['Return on ad spend','Above [ ISI ]'],
      ['Order volume','Sufficient to justify continued spend'],
    ], [2600,6760]),
    p('Spend is reviewed weekly against these thresholds. Ad groups exceeding the cost-per-order threshold for two consecutive weeks are paused and reviewed.', { before: 100 }),
    h1('6.  RISK'),
    table(['Risk','Mitigation'], [
      ['Cost per order exceeds margin','Weekly review with a defined pause threshold'],
      ['Creative fatigue reduces performance','Creative testing allocation maintained at 15%'],
      ['Stock runs out during campaign','Stock level checked before budget increases'],
    ], [3400,5960]),
    ...approval(),
  ],
};

const key = process.argv[2];
const out = process.argv[3];
if (!DOCS[key]) { console.error('Unknown doc key. Available:', Object.keys(DOCS).join(', ')); process.exit(1); }

const doc = new Document({
  styles: { default: { document: { run: { font: F, size: 21 } } } },
  sections: [{
    properties: { page: { margin: { top: convertInchesToTwip(0.7), bottom: convertInchesToTwip(0.75), left: convertInchesToTwip(0.85), right: convertInchesToTwip(0.85) } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: 'Superbowl Lipis · Page ', font: F, size: 15, color: '999999' }),
                 new TextRun({ children: [PageNumber.CURRENT], font: F, size: 15, color: '999999' })] })] }) },
    children: DOCS[key].body,
  }],
});
Packer.toBuffer(doc).then(b => { fs.writeFileSync(out || DOCS[key].file, b); console.log('Done:', out || DOCS[key].file); });
