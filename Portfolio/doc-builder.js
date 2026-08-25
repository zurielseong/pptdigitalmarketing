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

const head = (title, subtitle, ref, date, status) => ([
  letterhead, rule,
  new Paragraph({ children: [new TextRun({ text: title, font: F, size: 30, bold: true, color: NAVY })], alignment: AlignmentType.CENTER, spacing: { after: 60 } }),
  new Paragraph({ children: [new TextRun({ text: subtitle, font: F, size: 20, color: '555555' })], alignment: AlignmentType.CENTER, spacing: { after: 220 } }),
  new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [1560, 3120, 1560, 3120], rows: [
    new TableRow({ children: [cell('Reference',{w:1560,bold:true,fill:'EDF1F7'}), cell(ref,{w:3120}), cell('Prepared by',{w:1560,bold:true,fill:'EDF1F7'}), cell('Zuriel Seong',{w:3120})] }),
    new TableRow({ children: [cell('Date',{w:1560,bold:true,fill:'EDF1F7'}), cell(date,{w:3120}), cell('Position',{w:1560,bold:true,fill:'EDF1F7'}), cell('Marketing Manager',{w:3120})] }),
    new TableRow({ children: [cell('Submitted to',{w:1560,bold:true,fill:'EDF1F7'}), cell('Puan Wan Norizan',{w:3120}), cell('Status',{w:1560,bold:true,fill:'EDF1F7'}), cell(status || 'For approval',{w:3120})] }),
  ]}),
]);

// Sign-off block for a report on completed work — verification, not approval.
const verification = () => ([
  h1('VERIFICATION'),
  p('This report is submitted as a record of work completed. Verification below confirms that the content calendar was implemented and the content described was produced and published.'),
  table(['','Reported By','Verified By','Acknowledged By'], [
    ['Name','Zuriel Seong','',''], ['Position','Marketing Manager','',''],
    ['Signature','','',''], ['Date','','',''],
  ], [1500,2820,2520,2520]),
  p(''),
  p('Verification:      ☐  Verified as implemented            ☐  Verified with comments            ☐  Further evidence required', { bold: true, after: 140 }),
  p('Comments:', { bold: true, after: 100 }),
  p('______________________________________________________________________________', { after: 120 }),
  p('______________________________________________________________________________', { after: 120 }),
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
    ...head('CONTENT CALENDAR IMPLEMENTATION REPORT','E-commerce content production and publishing — TikTok Shop, 2025','ECOM/CU4/W02/2025','[ TARIKH ]','Report on completed work'),
    h1('1.  PURPOSE AND SCOPE'),
    p('This report records the implementation of the e-commerce content calendar for the TikTok Shop channel. It sets out the calendar that was planned, the content that was produced and published against it, and the outcome. Because a product link can be attached to any video, every piece of content published was also a point of sale.'),
    p('Reporting period: September to October 2025.'),

    h1('2.  CONTENT CALENDAR AS PLANNED'),
    sub('2.1   Content pillars'),
    p('Five pillars were set. The mix weighted product-led content most heavily while retaining variety, so the account would not read as purely promotional and lose organic reach.'),
    img('cu4_pillars.png', 420, 194),
    cap('Figure 1 — Monthly content mix by pillar'),
    table(['Pillar','Share','Purpose'], [
      ['Product showcase','30%','Show the shirt — fabric, fit, print detail'],
      ['Styling & fit','25%','Show how the shirt is worn'],
      ['Local identity','20%','Connect the brand to Kuala Lipis'],
      ['Customer & UGC','15%','Build trust through real buyers'],
      ['Promotional','10%','Drive immediate action'],
    ], [2200,1100,6060]),

    sub('2.2   Publishing schedule'),
    p('Two posts per week on a fixed rotation, so each pillar recurs on a predictable cycle. Every post carried the product link, allowing any video to convert regardless of pillar.'),
    table(['Week','Post 1','Post 2'], [
      ['Week 1','Product showcase','Local identity'],
      ['Week 2','Styling & fit','Customer / UGC'],
      ['Week 3','Product showcase','Promotional'],
      ['Week 4','Styling & fit','Local identity'],
    ], [1400,3980,3980]),

    h1('3.  PRODUCTION SCHEDULE AND DELIVERY'),
    table(['Month','Activity planned','Delivered'], [
      ['September 2025','Product photoshoot — two locations, two models','Yes — see 4.1'],
      ['September 2025','Video production — aerial and lifestyle footage','Yes — see 4.2'],
      ['October 2025','Product listing completed and content published','Yes — see 4.3'],
      ['October 2025','Promotional campaign activated','Yes — see 5'],
    ], [2000,4400,2960]),
    fill('[ SAHKAN: tarikh sebenar sesi fotografi dan penerbitan kandungan ]'),

    h1('4.  PRODUCTION RECORD'),
    sub('4.1   Product photoshoot — September 2025'),
    p('A product photoshoot was conducted for the #Kaki strike shirt using two models across two locations, producing images for both the marketplace listing and social content. Shooting in a bowling alley connected the product directly to the Superbowl Lipis brand.'),
    img('ev63.jpeg', 250, 250),
    cap('Figure 2 — Product photography from the September photoshoot'),

    sub('4.2   Video content produced'),
    p('A launch video was produced using aerial footage of Kuala Lipis, published under the local identity pillar. Filming the town from the air ties the brand to its location, which is the basis of the positioning.'),
    img('ev64.jpeg', 175, 380),
    cap('Figure 3 — "SBL New Collection 2025" launch video published to TikTok'),
    img('ev65.jpeg', 175, 380),
    cap('Figure 4 — Additional video content produced for the campaign'),

    sub('4.3   Listing content'),
    p('Photography from the shoot was applied to the marketplace listing, giving the product page and the social content a consistent look.'),
    img('ev66.png', 430, 211),
    cap('Figure 5 — Product listing content published in Seller Centre'),

    h1('5.  PROMOTIONAL CALENDAR EXECUTED'),
    p('Promotional content was scheduled around platform sale events, which carry additional traffic at no extra media cost.'),
    img('ev61.png', 430, 258),
    cap('Figure 6 — New Product Launching promotion: RM55 deal price against RM60–65 original, live from October 2025'),
    table(['Period','Promotional activity','Status'], [
      ['October 2025','New Product Launching — deal price RM55','Live'],
      ['October 2025','TikTok Shop 10.10 Super Sale','Registered'],
      ['October 2025','Flash sale and discount code campaigns','Executed'],
    ], [2000,4900,2460]),

    h1('6.  DELIVERY AGAINST THE CALENDAR'),
    p('The table below summarises each element of the calendar set in Section 2 against what was produced, with the supporting evidence in this report.'),
    table(['Calendar element','Planned','Delivered','Evidence'], [
      ['Product showcase content','Photography of the shirt','Photoshoot completed, two locations','Figure 2'],
      ['Local identity content','Content tying brand to Kuala Lipis','Aerial launch video published','Figure 3'],
      ['Styling & fit content','Shirt shown worn','Model and lifestyle footage','Figures 2, 4'],
      ['Listing content','Product page images','Listing published in Seller Centre','Figure 5'],
      ['Promotional content','Scheduled to sale events','Launch promotion and 10.10 activated','Figure 6'],
    ], [2400,2500,2660,1800]),

    h1('7.  OUTCOME'),
    p('The calendar was implemented as planned. Content produced in September was published in October alongside the completed product listing, and the promotional campaign ran against that content. The launch video recorded 681 views, and the channel converted through the listing during the promotional period.'),
    fill('[ ISI: jumlah pesanan dan jualan bagi tempoh Oktober 2025 — rujuk Seller Centre ]'),
    ...verification(),
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
