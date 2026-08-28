// Reusable portfolio document builder — letterhead format agreed with client.
// Usage: node doc-builder.js <docKey> <outPath>
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, PageBreak,
  Table, TableRow, TableCell, WidthType, ShadingType, ImageRun,
  convertInchesToTwip, Footer, PageNumber, BorderStyle,
  HorizontalPositionRelativeFrom, VerticalPositionRelativeFrom, TextWrappingType,
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
// Bordered placeholder box — where the candidate pastes a platform screenshot.
const shot = (t) => new Table({
  width: { size: 9360, type: WidthType.DXA }, columnWidths: [9360],
  borders: {
    top:    { style: BorderStyle.DASHED, size: 6, color: RED },
    bottom: { style: BorderStyle.DASHED, size: 6, color: RED },
    left:   { style: BorderStyle.DASHED, size: 6, color: RED },
    right:  { style: BorderStyle.DASHED, size: 6, color: RED },
  },
  rows: [new TableRow({ children: [new TableCell({
    width: { size: 9360, type: WidthType.DXA },
    margins: { top: 320, bottom: 320, left: 120, right: 120 },
    children: [new Paragraph({
      children: [new TextRun({ text: t, font: F, size: 19, bold: true, color: RED })],
      alignment: AlignmentType.CENTER, spacing: { after: 0 },
    })],
  })] })],
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
// TVET Lipis letterhead — the tvet lipis mark alone, set top right, matching
// the source letterhead where the logo is cropped out of the partner band.
const letterheadTVET = new Table({
  width: { size: 9360, type: WidthType.DXA }, columnWidths: [9360],
  borders: { top:{style:'none'},bottom:{style:'none'},left:{style:'none'},right:{style:'none'},insideHorizontal:{style:'none'},insideVertical:{style:'none'} },
  rows: [new TableRow({ children: [new TableCell({
    width: { size: 9360, type: WidthType.DXA },
    borders:{top:{style:'none'},bottom:{style:'none'},left:{style:'none'},right:{style:'none'}},
    children: [new Paragraph({ alignment: AlignmentType.RIGHT,
      children: [new ImageRun({ type:'png', data: fs.readFileSync(`${SP}/lh_tvet.png`), transformation: { width: 84, height: 84 } })] })],
  })] })],
});
// Black bar down the right page edge, behind the text — as in the source
// letterhead, where it is a drawing shape rather than part of the logo image.
// A4 is 8.268" wide (7561263 EMU); the bar is 0.265" x 2.64", flush right.
const tvetEdgeBar = new Paragraph({
  spacing: { after: 0, line: 20 },
  children: [new ImageRun({
    type: 'png', data: fs.readFileSync(`${SP}/lh_tvet_bar.png`),
    transformation: { width: 25, height: 253 },
    floating: {
      horizontalPosition: { relative: HorizontalPositionRelativeFrom.PAGE, offset: 7318362 },
      verticalPosition: { relative: VerticalPositionRelativeFrom.PAGE, offset: 0 },
      behindDocument: true, allowOverlap: true,
      wrap: { type: TextWrappingType.NONE },
    },
  })],
});
const LETTERHEADS = { sbl: letterhead, tvet: letterheadTVET };
const ruleOf = (color) => new Paragraph({ text: '', border: { bottom: { style: BorderStyle.SINGLE, size: 12, color } }, spacing: { before: 60, after: 200 } });
const rule = ruleOf(RED);
const RULES = { sbl: rule, tvet: ruleOf('000000') };

const head = (d) => ([
  ...(d.lh === 'tvet' ? [tvetEdgeBar] : []),
  LETTERHEADS[d.lh || 'sbl'], RULES[d.lh || 'sbl'],
  new Paragraph({ children: [new TextRun({ text: d.title, font: F, size: 30, bold: true, color: NAVY })], alignment: AlignmentType.CENTER, spacing: { after: 60 } }),
  new Paragraph({ children: [new TextRun({ text: d.subtitle, font: F, size: 20, color: '555555' })], alignment: AlignmentType.CENTER, spacing: { after: 220 } }),
  new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [1560, 3120, 1560, 3120], rows: [
    new TableRow({ children: [cell('Reference',{w:1560,bold:true,fill:'EDF1F7'}), cell(d.ref,{w:3120}), cell('Prepared by',{w:1560,bold:true,fill:'EDF1F7'}), cell('Zuriel Seong',{w:3120})] }),
    new TableRow({ children: [cell('Date',{w:1560,bold:true,fill:'EDF1F7'}), cell(d.date || '[ TARIKH ]',{w:3120}), cell('Position',{w:1560,bold:true,fill:'EDF1F7'}), cell('Marketing Manager',{w:3120})] }),
    new TableRow({ children: [cell('Submitted to',{w:1560,bold:true,fill:'EDF1F7'}), cell(d.submitted || 'Puan Wan Norizan',{w:3120}), cell('Status',{w:1560,bold:true,fill:'EDF1F7'}), cell(d.status || 'For approval',{w:3120})] }),
  ]}),
]);

// Sign-off block for a report on completed work — verification, not approval.
const verification = () => ([
  h1('VERIFICATION'),
  p('This report is submitted as a record of work completed. Verification below confirms that the work described was carried out as reported and that the supporting evidence is a true record.'),
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
// Each entry holds its metadata and its content separately, so the same content
// can be rendered standalone or bound into the compiled CU4 document.
const DOCS = {};

DOCS['cu4-wa1'] = {
  file: 'CU4-WA1-Channel-Selection-Proposal.docx',
  wa: 'W01', partTitle: 'E-COMMERCE CHANNEL SELECTION',
  title: 'E-COMMERCE CHANNEL SELECTION PROPOSAL',
  subtitle: 'Selection of a sales channel for Superbowl Lipis',
  ref: 'ECOM/CU4/W01/2025', date: '[ TARIKH — sebelum penubuhan kedai ]',
  status: 'For approval — pre-launch', signoff: approval,
  content: [
    h1('1.  PURPOSE AND BACKGROUND'),
    p('Superbowl Lipis sells its streetwear jersey through walk-in and informal messaging enquiries. There is no online sales channel, which means sales cannot be measured, paid advertising has no trackable purchase destination, and no customer or order record is kept.'),
    p('This proposal recommends adopting TikTok Shop as the sales channel and sets out the reasoning and the requirements to establish it. Approval is sought to proceed with account registration and product listing.'),

    h1('2.  BUSINESS CONTEXT'),
    p('Two facts shape the recommendation. Superbowl Lipis sells a single product — the Superbowl jersey streetwear shirt — so the channel does not need to support a large catalogue, inventory variants or complex merchandising. And the brand already maintains an active TikTok account with an established local following, with a promotional video for the shirt already produced and posted.'),
    p('The requirement is therefore narrow: a way to sell one product to an audience already watching the brand’s content, without building new infrastructure.'),

    h1('3.  RECOMMENDATION'),
    sub('3.1   Native integration with content already published'),
    p('A product link can be attached directly to the existing promotional video. The yellow basket icon appears on the video and viewers move from watching to purchasing without leaving the application. No new content production is required to begin selling.'),
    img('cu4_flow.png', 450, 116),
    cap('Figure 1 — From existing content to completed order'),
    sub('3.2   The audience is already on the platform'),
    p('The brand’s followers are local and already engaged with its TikTok content. Selling within the same platform reaches that audience directly. Any other channel would require redirecting them elsewhere, or building a new audience from zero.'),
    sub('3.3   No setup cost or technical build'),
    p('TikTok Shop requires account registration and a product listing. There is no development work, no hosting, no domain and no separate payment gateway to arrange. Checkout and payment are handled within the platform.'),
    sub('3.4   A standalone store is disproportionate for one product'),
    p('A Shopify or WooCommerce store would involve monthly subscription, domain registration, payment gateway setup and ongoing maintenance before a single shirt is sold. For a single-product range with no immediate plan to expand, that cost is not justified.'),

    h1('4.  OPTIONS CONSIDERED'),
    table(['Option','Assessment'], [
      ['TikTok Shop','RECOMMENDED — native to existing content and audience; no setup cost; in-app checkout'],
      ['Own website (Shopify / WooCommerce)','Rejected — highest setup cost; requires building traffic from zero'],
      ['Shopee','Not pursued — seller registration was not approved'],
      ['Lazada','Not pursued — no existing audience; would require paid traffic for visibility'],
      ['Meta Shop','Held in reserve — brand has a Meta presence, but no native in-app checkout in this market'],
    ], [3000,6360]),
    p('Note on platform fees: marketplace commission rates vary by category and change periodically. TikTok Shop is not necessarily the lowest-commission option, and a self-hosted store carries no commission at all. The recommendation rests on integration, audience and setup cost rather than on commission being lowest.', { before: 100 }),

    h1('5.  IMPLEMENTATION REQUIREMENTS'),
    table(['Item','Requirement','Responsibility'], [
      ['Account registration','Business verification documents, bank details','Marketing Manager'],
      ['Product catalogue','Product list, pricing, descriptions, photography','Marketing team'],
      ['Fulfilment','Packing, courier arrangement, dispatch procedure','Operations'],
      ['Payment settlement','Bank linkage and settlement schedule','Finance'],
      ['Performance tracking','Reporting format and review frequency','Marketing Manager'],
    ], [2400,4200,2760]),

    h1('6.  RISKS'),
    table(['Risk','Mitigation'], [
      ['Platform account suspension or policy change','Keep product and customer data independent of the platform; hold Meta Shop in reserve'],
      ['Platform dependency limits control over reach','Continue developing owned channels alongside the marketplace'],
      ['Commission erodes margin','Review pricing against the fee structure before listing'],
      ['Fulfilment capacity','Start with a limited range and scale once the process is proven'],
    ], [3400,5960]),
  ],
};

DOCS['cu4-wa2'] = {
  file: 'CU4-WA2-Content-Calendar-Report.docx',
  wa: 'W02', partTitle: 'CONTENT CALENDAR',
  title: 'CONTENT CALENDAR IMPLEMENTATION REPORT',
  subtitle: 'E-commerce content production and publishing — TikTok Shop, 2025',
  ref: 'ECOM/CU4/W02/2025', date: '[ TARIKH ]',
  status: 'Report on completed work', signoff: verification,
  content: [
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
  ],
};

DOCS['cu4-wa3'] = {
  file: 'CU4-WA3-Campaign-Plan.docx',
  wa: 'W03', partTitle: 'CAMPAIGN PLAN',
  title: 'E-COMMERCE CAMPAIGN PLAN',
  subtitle: 'Objectives, audience and measurement — TikTok Shop',
  ref: 'ECOM/CU4/W03/2025', date: '[ TARIKH — sebelum 15 September 2025 ]',
  status: 'For approval — pre-launch', signoff: approval,
  content: [
    p('This plan was prepared before the campaign launched and sets the objectives, audience, phasing and measurement against which it was run. Delivery against it is reported separately under references W04, W05 and W06.', { italics: true, color: '555555' }),
    h1('1.  CAMPAIGN OBJECTIVES'),
    table(['Objective','Measure','Target'], [
      ['Establish the sales channel','Store live with product listed','Before paid activation begins'],
      ['Prove fulfilment end to end','Order received, dispatched and completed','Soft launch gate'],
      ['Control acquisition cost','Return on ad spend','2.00'],
      ['Protect margin','Cost per order','Below the selling price of the item'],
    ], [3000,3200,3160]),
    p('The return target of 2.00 is the controlling figure. Below it an order does not cover advertising plus platform commission and fulfilment, and the sale is made at a loss.', { before: 100 }),

    h1('2.  PRODUCT AND COMMERCIAL PARAMETERS'),
    table(['Parameter','Setting'], [
      ['Product','SBL T-Shirt Oversized / Reka Bentuk Besar Longgar'],
      ['Price','RM60.00 – RM65.00'],
      ['Opening stock','78 units'],
      ['Daily advertising budget','RM30.00'],
      ['Campaign type','GMV Max — gross revenue'],
      ['Fulfilment','Platform shipping (BEST Express)'],
      ['Customer service standard','Response within 12 hours'],
    ], [2600,6760]),

    h1('3.  TARGET AUDIENCE'),
    table(['Segment','Description','Rationale'], [
      ['Existing followers','Current TikTok audience of the brand','Already engaged; lowest cost to reach'],
      ['Local — Kuala Lipis & Pahang','Residents and those with local ties','Brand identity is rooted in the town'],
      ['Streetwear interest — nationwide','Younger buyers following streetwear content','Expansion audience once local base is proven'],
    ], [2400,3400,3560]),
    h1('4.  POSITIONING AND MESSAGE'),
    p('The shirt is positioned as local identity apparel rather than generic streetwear. The message centres on wearing where you are from. This differentiates it from mass-market streetwear and gives the local audience a reason to buy beyond the garment itself.'),
    h1('5.  CAMPAIGN PHASES'),
    img('cu4_gantt.png', 460, 172),
    cap('Figure 1 — Campaign phases from approval'),
    table(['Phase','Activity','Gate'], [
      ['Setup','Account registration, product listing, photography','Store live and product approved'],
      ['Soft launch','Organic content only, product link attached','Checkout and fulfilment proven end to end'],
      ['Paid activation','TikTok Ads promoting shoppable content','Cost per order within threshold'],
      ['Review','Performance assessed against objectives','Decision to continue, adjust or pause'],
    ], [1700,4600,3060]),
    p('Paid activity begins only after soft launch confirms checkout and fulfilment work. Spending on traffic before the process is proven is avoided.', { before: 100 }),
    h1('6.  MEASUREMENT'),
    table(['Metric','Source','Frequency'], [
      ['Orders and units sold','TikTok Shop Seller Centre','Weekly'],
      ['Return on ad spend','TikTok Ads Manager','Weekly'],
      ['Ad spend and cost per order','TikTok Ads Manager','Weekly'],
      ['Order fulfilment and exceptions','TikTok Shop Seller Centre','Weekly'],
    ], [2900,3400,3060]),
    p('Where a metric breaches its target for two consecutive reviews, the cause is diagnosed and a corrective action taken before further budget is committed.', { before: 100 }),

    h1('7.  PLAN STATUS'),
    p('Recorded after the campaign closed, for completeness of the file.'),
    table(['Objective','Outcome','Evidenced in'], [
      ['Establish the sales channel','Store live, product listed and published','ECOM/CU4/W02/2025'],
      ['Prove fulfilment end to end','18 orders received, 9 completed, no exceptions outstanding','ECOM/CU4/W04/2025'],
      ['Control acquisition cost','ROI 1.00 against the 2.00 target — not met','ECOM/CU4/W05/2025'],
      ['Protect margin','Cost per order RM50.00 against a RM55.00 item — not met','ECOM/CU4/W06/2025'],
      ['Review and decide','Paid advertising discontinued; organic and walk-in prioritised','ECOM/CU4/W06/2025'],
    ], [2700,3900,2760]),
  ],
};

DOCS['cu4-wa4'] = {
  file: 'CU4-WA4-Implementation-Coordination-Report.docx',
  wa: 'W04', partTitle: 'IMPLEMENTATION COORDINATION',
  title: 'E-COMMERCE IMPLEMENTATION COORDINATION REPORT',
  subtitle: 'Order management, fulfilment and customer service — TikTok Shop, 2025',
  ref: 'ECOM/CU4/W04/2025', date: '[ TARIKH ]',
  status: 'Report on completed work', signoff: verification,
  content: [
    h1('1.  PURPOSE AND SCOPE'),
    p('This report records how the TikTok Shop channel was operated once live: how orders were received and tracked, how they were fulfilled, and how buyer enquiries were handled. It covers the trading period from the store going live to October 2025.'),
    p('Coordination here means the day-to-day running of the channel — the part that determines whether an order placed actually reaches the buyer.'),

    h1('2.  FULFILMENT PROCESS'),
    p('Every order followed the same defined sequence. Fulfilment used platform shipping rather than a private courier arrangement, so tracking and delivery status were recorded against each order automatically.'),
    img('cu4_w04_chain.png', 460, 105),
    cap('Figure 1 — Order fulfilment sequence'),

    h1('3.  ORDER MANAGEMENT'),
    p('Orders were managed from the Seller Centre order console. Eighteen orders were received across the trading period.'),
    img('cu4_w04_pipeline.png', 430, 104),
    cap('Figure 2 — Order status composition'),
    table(['Status','Orders','Meaning'], [
      ['Completed','9','Delivered and closed'],
      ['Shipped','8','Dispatched and in transit'],
      ['Awaiting shipment','1','Received, not yet dispatched'],
      ['Total','18',''],
    ], [2600,1400,5360]),
    p('The exception queues are the operational measure that matters. At the point of record, all six stood at zero — nothing overdue for shipping, no auto-cancellations pending, no cancellations, no logistics issues and no returns or refunds outstanding.', { before: 100 }),
    img('ev68.png', 450, 258),
    cap('Figure 3 — Seller Centre order console: order pipeline and exception queues at zero'),

    h1('4.  DISPATCH RECORD'),
    p('Dispatch was arranged through the platform, which issued the shipping label and assigned the courier. The record below is for order 580628058928219548, showing platform-issued labelling, BEST Express as carrier, cashless handling and a stated ship-by time.'),
    img('ev69_redacted.png', 250, 342),
    cap('Figure 4 — Platform shipping label, ship-by 3 October 2025 (recipient details redacted)'),
    p('Buyer name, contact number and delivery address have been redacted from this record. The order reference and ship-by date are retained so the document ties to the order console in Figure 3.', { before: 100 }),

    h1('5.  CUSTOMER SERVICE'),
    p('Buyer enquiries were handled in the Seller Centre chat console. Automated greetings and saved FAQ responses covered the questions that recurred — availability, sizing, payment confirmation and collection — so that routine enquiries were answered immediately and staff time went to the rest.'),
    table(['Service measure','Recorded','Standard'], [
      ['12-hour response rate','100%','Platform benchmark for seller responsiveness'],
      ['Average response time','4h 21m 34s','Within the 12-hour window'],
      ['Assigned conversations','6',''],
      ['Automation in use','Chat greeting and FAQ replies',''],
    ], [2900,2900,3560]),
    img('ev67.png', 460, 199),
    cap('Figure 5 — Customer service console: 100% 12-hour response rate, average response 4h 21m 34s'),
    p('The console also shows unreplied and unread conversations at the moment of capture. These sat inside the 12-hour window and are reflected in the average response time rather than being separate failures.', { before: 100 }),

    h1('6.  COORDINATION CONTROLS'),
    table(['What was monitored','Control','Evidence'], [
      ['Orders awaiting dispatch','Ship-by time on each label','Figures 3, 4'],
      ['Shipping exceptions','Action-needed queues reviewed','Figure 3'],
      ['Returns and refunds','Return queue reviewed','Figure 3'],
      ['Buyer enquiries','12-hour response standard','Figure 5'],
      ['Recurring questions','Automated greeting and FAQ replies','Figure 5'],
    ], [2900,3200,3260]),

    h1('7.  OUTCOME'),
    p('The channel operated end to end. Orders were received, dispatched through platform logistics and completed, with no outstanding shipping exceptions, cancellations or refund requests at the point of record, and buyer enquiries answered inside the platform standard.'),
    p('One operational note is carried forward: the collection method had not been configured at the point of record, which the console flags as a prerequisite before shipping. This did not prevent dispatch during the period but was a setup item outstanding.'),
    fill('[ SAHKAN: sama ada kaedah kutipan (collection method) telah dikemas kini selepas tarikh rekod ini ]'),
  ],
};

DOCS['cu4-wa5'] = {
  file: 'CU4-WA5-Paid-Advertisement-Report.docx',
  wa: 'W05', partTitle: 'PAID ADVERTISEMENT',
  title: 'PAID ADVERTISEMENT PROPOSAL AND IMPLEMENTATION RECORD',
  subtitle: 'TikTok Ads for TikTok Shop — Superbowl Lipis, 2025',
  ref: 'ECOM/CU4/W05/2025', date: '[ TARIKH ]',
  status: 'Report on completed work', signoff: verification,
  content: [
    h1('1.  PURPOSE'),
    p('This document sets out the paid advertising proposal prepared for the TikTok Shop product listing, and records the campaign as it was implemented. Part A states the approach, budget and targets set before launch. Part B reports what was delivered against them.'),

    h1('PART A — PROPOSAL'),
    sub('2.1   Approach'),
    p('Advertising ran through TikTok Ads, which the organisation already operates. Because the product link sits on organic video, existing content was promoted directly rather than produced separately for advertising, removing creative production cost from the campaign.'),
    p('The GMV Max campaign type was selected. GMV Max selects creative automatically from authorised posts and manages placement and bidding against a stated return target. This suited a single-product shop with a small budget, where manual ad-group management could not be justified by the spend involved.'),

    sub('2.2   Budget and targets'),
    table(['Parameter','Setting','Basis'], [
      ['Campaign','Product GMV Max — Gross revenue','Automated, revenue-optimised'],
      ['Product','SBL Co. Oversized T-Shirt','Single product listed'],
      ['Daily budget','RM30.00','Contained exposure while the channel was proven'],
      ['Target ROI','2.00','Revenue at twice ad cost, to leave margin after commission and fulfilment'],
      ['Placement','Automatic','Managed by the platform'],
      ['Audience','Users under 18 excluded','Platform requirement for the product category'],
    ], [1900,2700,4760]),
    p('A target ROI of 2.00 was the controlling figure. Below it, an order does not cover advertising plus platform commission and fulfilment, and the sale is made at a loss.', { before: 100 }),

    h1('PART B — IMPLEMENTATION RECORD'),
    sub('3.1   Campaign delivered'),
    p('The campaign ran from 15 September to 14 October 2025 and delivered as follows.'),
    table(['Metric','Result','Against target'], [
      ['Cost','RM50.00','Within the RM30.00 daily budget'],
      ['Orders (SKU)','1','—'],
      ['Gross revenue','RM50.00','—'],
      ['Cost per order','RM50.00','—'],
      ['Return on ad spend (ROI)','1.00','Target 2.00 — not met'],
    ], [2900,2300,4160]),
    shot('[ LAMPIRKAN TANGKAP LAYAR: TikTok Ads Manager → Campaign details, julat tarikh 15 Sept – 14 Okt 2025, menunjukkan Cost, Orders, Cost per order, Gross revenue dan Target ROI ]'),
    cap('Figure 1 — TikTok Ads Manager campaign record'),
    fill('[ SAHKAN: pastikan tangkap layar memaparkan TAHUN (2025) — tetapkan julat tarikh tersuai jika perlu ]'),

    sub('3.2   Delivery against target'),
    img('cu4_w05_target.png', 430, 154),
    cap('Figure 2 — Achieved ROI against the 2.00 target'),
    p('The campaign returned RM1.00 of revenue for every RM1.00 of advertising — half the target. Spend was contained and the channel converted, but not at a rate that covered its own cost.'),

    h1('4.  CONCLUSION'),
    p('The proposal was implemented as specified: the campaign ran on the stated budget, against the stated target, on the stated product. The target was not met. The corrective action taken in response is recorded separately in the campaign performance optimisation report (ECOM/CU4/W06/2025).'),
    p('Following the review recorded in that report, paid advertising on TikTok Shop was discontinued and effort was reallocated to organic content and offline sales. Organic content remained the principal source of orders throughout the period.'),
    fill('[ SAHKAN: hasil jualan RM50.00 berbanding harga tersenarai RM55.00 — nyatakan sama ada baucar digunakan ]'),
  ],
};

DOCS['cu4-wa6'] = {
  file: 'CU4-WA6-Performance-Optimisation-Report.docx',
  wa: 'W06', partTitle: 'PERFORMANCE OPTIMISATION',
  title: 'CAMPAIGN PERFORMANCE OPTIMISATION REPORT',
  subtitle: 'TikTok Shop paid campaign — Superbowl Lipis, September–October 2025',
  ref: 'ECOM/CU4/W06/2025', date: '[ TARIKH ]',
  status: 'Report on completed work', signoff: verification,
  content: [
    h1('1.  PURPOSE AND SCOPE'),
    p('This report records the monitoring of the TikTok Shop paid campaign, the underperformance identified against target, the corrective action taken, its result, and the channel decision that followed. It covers the period 15 September to 14 October 2025.'),

    h1('2.  MONITORING FRAMEWORK'),
    p('Performance was reviewed weekly against targets set before launch, so underperformance could be identified against a stated figure rather than by impression.'),
    table(['Metric','Target','Source','Review'], [
      ['Return on ad spend','2.00','TikTok Ads Manager','Weekly'],
      ['Cost per order','Below item price','TikTok Ads Manager','Weekly'],
      ['Daily spend','RM30.00 ceiling','TikTok Ads Manager','Weekly'],
      ['Orders','TikTok Shop Seller Centre','Seller Centre','Weekly'],
    ], [2500,2000,2600,2260]),

    h1('3.  PERFORMANCE OBSERVED'),
    img('cu4_w05_target.png', 430, 154),
    cap('Figure 1 — Achieved ROI against target'),
    p('Monitoring showed the campaign delivering ROI of 1.00 against a target of 2.00, with cost per order at RM50.00. Spend stayed inside the daily budget, so the shortfall was not a spend-control failure — it was a conversion problem.'),

    h1('4.  DIAGNOSIS'),
    img('cu4_w06_unit.png', 400, 179),
    cap('Figure 2 — Unit economics of the acquired order'),
    p('At RM50.00 cost per order against RM50.00 gross revenue, advertising consumed the entire value of the sale, and platform commission and fulfilment then took the order below break-even. The cause was traced to conversion rate rather than traffic cost: traffic was reaching the listing, but too few viewers completed checkout for the advertising cost to spread across enough orders. Raising the budget would have bought more of the same unprofitable traffic.'),

    h1('5.  CORRECTIVE ACTION — PRICE'),
    p('A Seller Flash Sale was created on 3 October 2025 and ran from 10:37 PM that day to 10:37 PM on 5 October 2025, across all channels. The deal price was set at RM55.00 against an original price of RM60.00–RM65.00, a 9% reduction, on the full stock of 78 units with no purchase limit.'),
    p('A lower price was expected to lift the conversion rate on traffic already being paid for, spreading the same advertising cost across more orders. A smaller margin on more units was preferable to unprofitable acquisition, and the action cost nothing in additional spend.'),
    table(['','Before','After'], [
      ['Price','RM60.00 – RM65.00','RM55.00'],
      ['Discount','—','9% (Seller Flash Sale)'],
      ['Promotion period','—','3 – 5 October 2025'],
      ['Advertising budget','RM30.00 / day','Unchanged'],
      ['Target ROI','2.00','Unchanged'],
    ], [2500,3400,3460]),
    p('Budget and target were deliberately held constant so that any change in performance could be attributed to the price change alone.', { before: 100 }),
    img('ev59.png', 450, 249),
    cap('Figure 3 — Seller Flash Sale as created, 3 October 2025, deal price RM55.00 (9% off)'),

    h1('6.  RESULT OF THE PRICE ACTION'),
    p('The price reduction did not bring the campaign to target. Over the full campaign window the return remained at 1.00 against a target of 2.00, and cost per order remained at RM50.00 — the whole value of the order.'),
    fill('[ SAHKAN: tangkap layar Ads Manager bagi 15 – 30 Sept (sebelum) dan 3 – 14 Okt (selepas) untuk memisahkan kesan jualan kilat ]'),
    p('This result reframed the diagnosis. If a 9% price reduction on a product already priced at the low end of its range does not move conversion, the constraint is not price. It is that the audience reached by paid distribution did not recognise the brand well enough to buy from it.', { before: 100 }),

    h1('7.  SECOND DIAGNOSIS — BRAND RECOGNITION'),
    p('Superbowl Lipis is a localised spin-off from a bowling centre in Kuala Lipis, trading a single product. Paid distribution places that product in front of users selected by interest and demographic, most of whom have no prior contact with the brand. The proposition depends on local identity, which does not survive being shown to a cold national audience.'),
    table(['Constraint','Effect on paid advertising'], [
      ['Single product listed','No scope to shift budget to a better-converting item'],
      ['Brand tied to one locality','Value of the product is not legible to audiences outside it'],
      ['No prior brand recognition','Paid impressions reach users with no basis to trust the seller'],
      ['Small budget','Insufficient to build recognition through frequency'],
    ], [3200,6160]),
    p('Buyer enquiries received during the period support this reading: the questions asked were about cash on delivery and visiting the store, which are the concerns of buyers already close to the business rather than of an audience reached through advertising.', { before: 100 }),

    h1('8.  DECISION — CHANNEL REALLOCATION'),
    p('Paid advertising on TikTok Shop was discontinued. Effort was reallocated to organic content, where the existing local following already engages with the brand, and to walk-in sales at the centre itself, where the local identity that carries the product is present rather than assumed.'),
    img('cu4_w06_decision.png', 420, 165),
    cap('Figure 4 — Channel decision following the review'),
    p('Stopping spend was the correct optimisation here. The diagnosed constraint could not be resolved by any setting inside the ad account, and continued spend would have scaled the loss rather than the result.', { before: 100 }),

    h1('9.  OPTIMISATION CYCLE APPLIED'),
    img('cu4_w06_cycle.png', 460, 105),
    cap('Figure 5 — Monitoring, diagnosis, action, measurement and decision'),

    h1('10.  CONCLUSION AND NEXT ACTION'),
    p('Underperformance was identified against a target set before launch. The first diagnosis pointed to price; the action was taken and measured, and when it did not resolve the shortfall the diagnosis was revised rather than repeated.'),
    table(['Finding','Next action'], [
      ['Paid advertising unprofitable at this scale','Discontinued; no further budget committed'],
      ['Organic reach converts within the local following','Content production continued at no media cost'],
      ['Local identity carries the product','Sales channelled through walk-in at the centre'],
      ['Single SKU limits any paid campaign','Reconsider paid advertising only if the range broadens'],
    ], [3600,5760]),
  ],
};

// ── Compiled CU4 volume — all six work activities bound in one document ──────
const CU4_ORDER = ['cu4-wa1','cu4-wa2','cu4-wa3','cu4-wa4','cu4-wa5','cu4-wa6'];

const pageBreak = () => new Paragraph({ children: [new PageBreak()] });

// Each part opens with the same full letterhead a standalone document carries,
// so any page can be screenshotted straight into the portfolio.
const part = (d) => ([
  pageBreak(),
  ...head(d),
  ...d.content,
  ...(d.signoff ? d.signoff() : []),
]);

DOCS['cu4-full'] = {
  file: 'CU4-Ecommerce-Marketing-Plan-and-Implementation.docx',
  compiled: true,
  body: [
    letterhead, rule,
    new Paragraph({ children: [new TextRun({ text: 'E-COMMERCE MARKETING PLAN', font: F, size: 40, bold: true, color: NAVY })],
      alignment: AlignmentType.CENTER, spacing: { before: 700, after: 40 } }),
    new Paragraph({ children: [new TextRun({ text: 'AND IMPLEMENTATION', font: F, size: 40, bold: true, color: NAVY })],
      alignment: AlignmentType.CENTER, spacing: { after: 120 } }),
    new Paragraph({ children: [new TextRun({ text: 'Superbowl Lipis · TikTok Shop · 2025', font: F, size: 24, color: '555555' })],
      alignment: AlignmentType.CENTER, spacing: { after: 700 } }),
    new Table({ width: { size: 7000, type: WidthType.DXA }, columnWidths: [2400, 4600],
      rows: [
        new TableRow({ children: [cell('Competency Unit',{w:2400,bold:true,fill:'EDF1F7'}), cell('C04 — Implement e-commerce marketing plan',{w:4600})] }),
        new TableRow({ children: [cell('Standard',{w:2400,bold:true,fill:'EDF1F7'}), cell('NOSS M731-001-4:2021, Level 4',{w:4600})] }),
        new TableRow({ children: [cell('Work activities',{w:2400,bold:true,fill:'EDF1F7'}), cell('W01 – W06 (six)',{w:4600})] }),
        new TableRow({ children: [cell('Prepared by',{w:2400,bold:true,fill:'EDF1F7'}), cell('Zuriel Seong Ming Ee, Marketing Manager',{w:4600})] }),
        new TableRow({ children: [cell('Submitted to',{w:2400,bold:true,fill:'EDF1F7'}), cell('Puan Wan Norizan',{w:4600})] }),
        new TableRow({ children: [cell('Date',{w:2400,bold:true,fill:'EDF1F7'}), cell('[ TARIKH ]',{w:4600})] }),
      ]}),

    pageBreak(),
    h1('DOCUMENT REGISTER'),
    p('This volume binds the six documents prepared for Competency Unit C04. Each was produced at the point in the campaign its work activity describes, and each is reproduced here in full.'),
    table(['Part','WA','Document','Type'], [
      ['1','W01','E-Commerce Channel Selection Proposal','Proposal — pre-launch'],
      ['2','W02','Content Calendar Implementation Report','Report'],
      ['3','W03','E-Commerce Campaign Plan','Plan — pre-launch'],
      ['4','W04','Implementation Coordination Report','Report'],
      ['5','W05','Paid Advertisement Proposal and Implementation Record','Proposal and report'],
      ['6','W06','Campaign Performance Optimisation Report','Report'],
    ], [800,900,4700,2960]),

    h1('SUMMARY OF THE CAMPAIGN'),
    p('TikTok Shop was selected as the sales channel because the brand already held an active local audience there and a product link could be attached to content already published. The store was established, a single product listed, content produced in September 2025 and published in October alongside a launch promotion.'),
    p('Eighteen orders were received and fulfilled through platform logistics, with no shipping exceptions, cancellations or refunds outstanding, and buyer enquiries answered at a 100% twelve-hour response rate.'),
    p('A paid campaign ran from 15 September to 14 October 2025 on a RM30.00 daily budget against a return target of 2.00. It returned 1.00 — RM50.00 of advertising for RM50.00 of revenue. A flash sale was activated on 3 October to lift conversion; when that did not move the campaign to target, the constraint was re-diagnosed as brand recognition rather than price, and paid advertising was discontinued in favour of organic content and walk-in sales.'),
    table(['Measure','Result'], [
      ['Orders received','18 (9 completed, 8 shipped, 1 awaiting dispatch)'],
      ['Advertising spend','RM50.00'],
      ['Gross revenue from paid campaign','RM50.00'],
      ['Return on ad spend','1.00 against a target of 2.00'],
      ['Outstanding fulfilment exceptions','None'],
      ['Channel decision','Paid advertising discontinued'],
    ], [3200,6160]),

    ...CU4_ORDER.flatMap(k => part(DOCS[k])),
  ],
};

// ═════════════════════════════ CU5 — MOBILE MARKETING ════════════════════════
// TVET Lipis. Figures throughout are read from the CRM and LuluChat screenshots
// supplied by the candidate; nothing here is estimated.
const M = (o) => Object.assign({ lh: 'tvet', ref: '2025 INTAKES' }, o);

DOCS['cu5-wa1'] = M({
  file: 'CU5-WA1-Mobile-Channel-Selection.docx',
  title: 'MOBILE MARKETING CHANNEL — SELECTION AND IMPLEMENTATION REPORT',
  subtitle: 'WhatsApp Business API via LuluChat — TVET Lipis',
  date: '3-3-2025', submitted: 'General Manager',
  status: 'Report on work done', signoff: approval,
  content: [
    h1('1.  PURPOSE'),
    p('This report records the selection of WhatsApp as the mobile marketing channel for student recruitment, the reasoning behind it, and the account through which it was put into operation.'),

    h1('2.  WHERE THE MOBILE CHANNEL SITS'),
    p('Every prospect originates from a lead generation campaign on Meta or TikTok. The prospect completes an instant form inside the platform, and that form feeds directly into the TVET Lipis CRM at crm.tvetlipis.my. From there the sales team works the list — each prospect is assigned to a counsellor and contacted individually.'),
    img('cu5_flow.png', 460, 105),
    cap('Figure 1 — From lead generation campaign to enrolment'),
    p('The mobile channel is the fourth step. The requirement is therefore specific: reach a named prospect one at a time, hold a two-way conversation about programmes, fees and intake dates, and keep a record of it against the prospect’s CRM entry.', { before: 100 }),

    h1('3.  WHY WHATSAPP'),
    sub('3.1   Reach'),
    p('WhatsApp is the most widely used messaging application among the target audience. A prospect who submits a lead form is contactable there without installing anything or creating an account. Any channel requiring the prospect to adopt something new loses part of the list at the first step.'),
    sub('3.2   Business-grade sending through WABA'),
    p('Contact is made through a WhatsApp Business API account on business number 60108086630, operated under a LuluChat subscription rather than a personal handset. This is what makes the channel workable at the volume the lead campaigns produce.'),
    table(['Requirement','How the WABA account meets it'], [
      ['Several counsellors, one number','Shared inbox; each conversation shows the sending agent — messages are stamped “Sent by Nadiah via luluchat”'],
      ['First contact to a prospect who has not written first','Approved message templates carrying the intake creative'],
      ['A record of what was said','Full conversation history retained against the contact'],
      ['Sorting by interest and stage','Working tabs — New Lead, Hot Lead, Payment — and per-course tags'],
      ['Reaching a segment at once','Broadcast to tagged contacts'],
    ], [3000,6360]),

    h1('4.  OPTIONS CONSIDERED'),
    table(['Option','Assessment'], [
      ['WhatsApp via WABA (LuluChat)','SELECTED — highest reach among the target audience; two-way; multiple counsellors on one number with a retained record'],
      ['Telephone call','Retained as a secondary step — low answer rate on unknown numbers, and nothing is recorded unless the counsellor writes it up'],
      ['SMS','Rejected — one-way, per-message cost, no media, no confirmation of reading'],
      ['Personal WhatsApp handset','Rejected — cannot be shared across counsellors, no templates, and the record leaves with the staff member'],
    ], [2600,6760]),

    h1('5.  CHANNEL AS ESTABLISHED'),
    p('A WhatsApp Business profile was set up under the institution’s name with its address at Level 4 Lipis Centrepoint and the website tvetlipis.my, so a prospect receiving a first message sees a verified business rather than an unknown number.'),
    img('ev70.jpeg', 150, 325),
    cap('Figure 2 — TVET Lipis WhatsApp Business profile'),
    p('The LuluChat console is where the account is worked. At the point of record it held 167 conversations tagged New Lead, 43 Hot Lead and 27 at Payment stage, with each conversation carrying its course tag and its originating channel.', { before: 100 }),
    img('u5.png', 460, 236),
    cap('Figure 3 — LuluChat inbox on business number 60108086630, showing working tabs, course tags and channel of origin'),
  ],
});

DOCS['cu5-wa2'] = M({
  file: 'CU5-WA2-Mobile-Content-Calendar.docx',
  title: 'MOBILE MARKETING CONTENT CALENDAR — IMPLEMENTATION REPORT',
  subtitle: 'Message themes and creatives published — WhatsApp, TVET Lipis',
  date: '3-3-2025', submitted: 'General Manager',
  status: 'Report on work done', signoff: approval,
  content: [
    h1('1.  PRINCIPLE'),
    p('Message timing follows the student recruitment cycle rather than a fixed weekly slot. Content is concentrated where a decision is actually being made — around SPM results, intake openings and the application deadline — because a message sent outside those windows costs the same goodwill and converts less.'),

    h1('2.  MESSAGE THEMES IN USE'),
    table(['Theme','Purpose','Audience'], [
      ['Intake announcement','State the courses open and the entry requirements','Students and parents'],
      ['SPM results follow-up','Reach school leavers at the decision point','Students'],
      ['Programme highlight','Explain one SKM programme and its career path','Students'],
      ['Government funding (PTPK)','Answer the cost question directly','Parents'],
      ['Re-contact','Recover prospects contacted but not yet converted','Students'],
    ], [2400,4200,2760]),

    h1('3.  CREATIVES PUBLISHED'),
    sub('3.1   Intake announcement'),
    p('The intake creative lists the courses open, the entry requirements and the contact number, and is the template attached to first contact with a new lead.'),
    img('u7.jpeg', 150, 212),
    cap('Figure 1 — “Jom Sertai Kemasukan TVET Lipis” — courses and entry requirements'),
    sub('3.2   SPM results follow-up'),
    p('This creative addresses the prospect who did not obtain enough credits, which is the single most common reason a school leaver assumes they cannot continue studying.'),
    img('u8.png', 155, 259),
    cap('Figure 2 — “SPM: Anda Tak Cukup Kredit?” — intake messaging for school leavers'),
    sub('3.3   Programme highlight'),
    p('One programme is explained at a time — the qualification code, what the student learns, the careers it leads to and the articulation route to university.'),
    img('u9.png', 175, 240),
    cap('Figure 3 — Diploma Kandungan Kreatif Multimedia programme sheet'),
    sub('3.4   Government funding'),
    p('Cost is the question that decides most enrolments, so PTPK funding is addressed in its own message rather than buried in a programme sheet.'),
    img('u10.png', 290, 227),
    cap('Figure 4 — PTPK funding: tuition, monthly allowance, transport and laptop allowance'),
    fill('[ SAHKAN: elaun bulanan PTPK — risalah menyatakan RM400/RM600, perbualan menyatakan RM600/RM800 ]'),

    h1('4.  FREQUENCY RULE'),
    p('No more than one broadcast per contact per week, no broadcast to a contact already in an active conversation with a counsellor, and every broadcast carries an opt-out instruction. Over-messaging on WhatsApp produces blocks and reports, which damage the business number permanently.'),
  ],
});

DOCS['cu5-wa3'] = M({
  file: 'CU5-WA3-Mobile-Campaign-Plan.docx',
  title: 'MOBILE MARKETING CAMPAIGN PLAN AND PIPELINE CONTROL',
  subtitle: 'Objectives, segments and stage control — TVET Lipis CRM',
  date: '3-3-2025', submitted: 'Operations Manager',
  status: 'Report on work done', signoff: approval,
  content: [
    h1('1.  OBJECTIVES'),
    table(['Objective','Measure','Target'], [
      ['Contact every lead received','Leads moved from Lead to Contacted','100%'],
      ['Reach the prospect while intent is live','Time from form submission to first message','[ ISI SASARAN ]'],
      ['Convert lead to enrolment','Leads reaching Customer stage','[ ISI SASARAN ]'],
      ['Protect the business number','Blocks and reports','Nil'],
    ], [2900,3300,3160]),
    p('Time to first contact is the metric that matters most. A prospect who submits a form has just made a decision to enquire; the value of that decision decays quickly, and a lead contacted days later is a colder, different lead.', { before: 100 }),

    h1('2.  SEGMENTS'),
    table(['Segment','Message emphasis'], [
      ['Students, 17 – 28','Programme content, career outcome, intake date'],
      ['Parents, 40 – 60','Fees, PTPK funding, accreditation'],
      ['Contacted but not converted','Application deadline and what is still outstanding'],
      ['Not yet eligible','Held until results are released'],
    ], [2700,6660]),

    h1('3.  PIPELINE CONTROL'),
    p('Every prospect sits at exactly one stage in the CRM, and the stage is what determines the next action. Stages are changed by dragging the prospect card, so the pipeline is worked rather than reported.'),
    table(['Stage','Meaning','Next action'], [
      ['Lead','Form submitted, not yet contacted','First WhatsApp message'],
      ['Contacted','Message sent, awaiting reply','Retargeting batch if no reply in 7 days'],
      ['Potential','Replied and interested','Counselling on programme and fees'],
      ['Customer','Registered','Enrolment and documentation'],
      ['Cold','Declined or unreachable','No further contact'],
      ['Email Pool','Exhausted on WhatsApp','Transferred to email marketing'],
      ['KIV','Interested but not yet eligible','Held until results are released'],
    ], [1800,4000,3560]),
    img('cu5_pipeline.png', 420, 159),
    cap('Figure 1 — Prospect pipeline by stage as recorded in the CRM'),
    img('u11.png', 460, 226),
    cap('Figure 2 — TVET Lipis CRM pipeline board; each card carries course, lead source and assigned counsellor'),
    p('Each card records the course applied for, the source that produced the lead — Meta Ads, TikTok Ads, walk-in or word of mouth — and the counsellor who owns it. Source is held on the prospect so that channel performance can be read from the same board that the team works.', { before: 100 }),

    h1('4.  MEASUREMENT'),
    table(['Metric','Source','Frequency'], [
      ['Leads received and contacted','CRM pipeline','Weekly'],
      ['Stage movement','CRM pipeline','Weekly'],
      ['Broadcasts sent and delivered','LuluChat broadcast report','Monthly'],
      ['Leads converted to registration','CRM','Monthly'],
    ], [2900,3400,3060]),
  ],
});

DOCS['cu5-wa4'] = M({
  file: 'CU5-WA4-Mobile-Implementation-Coordination.docx',
  title: 'MOBILE CAMPAIGN IMPLEMENTATION COORDINATION REPORT',
  subtitle: 'Lead contact, broadcasts and counselling — TVET Lipis',
  date: '21 April 2025', submitted: 'Operations Manager',
  status: 'Report on work done', signoff: verification,
  content: [
    h1('1.  SCOPE'),
    p('This report records how the mobile channel was operated: leads worked from the CRM and contacted individually on WhatsApp, broadcasts scheduled and sent, counselling delivered in conversation, and outcomes written back to the prospect record.'),

    h1('2.  TIMELINE OF ACTIVITY'),
    table(['Period','Activity','Record'], [
      ['March 2025','Channel and campaign plan approved; first weekly lead batches recorded','CRM retargeting batches from 2 March 2025'],
      ['April 2025','Campaign in operation; lead contact worked from the pipeline','[ ISI: bilangan siaran dan lead dihubungi bagi April ]'],
      ['May 2025','Weekly lead batches continue to accumulate','Batch dated 18 – 23 May 2025'],
      ['September 2025','Three broadcasts sent, none failed','LuluChat broadcast report'],
      ['November 2025','One-to-one counselling on programme, fees and PTPK','LuluChat conversation, 6 November 2025'],
    ], [1900,4100,3360]),
    fill('[ ISI: lengkapkan baris April 2025 daripada laporan siaran LuluChat bagi bulan tersebut ]'),

    h1('3.  BROADCASTS SENT'),
    p('Broadcasts were composed against a tagged contact segment, previewed, and delivered on a scheduled date. Delivery was confirmed from the platform report rather than assumed.'),
    img('ev74.jpg', 420, 223),
    cap('Figure 1 — Broadcast delivery report: 3 broadcasts completed, 0 failed, 1 – 30 September 2025'),

    h1('4.  LEAD CONTACT AND COUNSELLING'),
    p('Leads arriving from the Meta and TikTok lead form campaigns were worked one by one. Each was assigned to a counsellor, contacted through the business number, and taken through the questions that decide an enrolment — programme content, duration, fees, funding and entry requirements.'),
    p('The record below shows a counselling exchange in which the prospect is identified as interested in Pendidikan Awal Kanak-Kanak and is given the programme duration, the fee of approximately RM20,150, the PTPK allowances available, the entry requirements and the career outcomes — in conversation, without being referred to a form or a brochure.'),
    img('u14.png', 460, 233),
    cap('Figure 2 — Counselling conversation, 6 November 2025: programme, fees, funding and entry requirements answered in thread'),

    h1('5.  COORDINATION CONTROLS'),
    table(['What was controlled','How','Evidence'], [
      ['Every lead is contacted','Counsellor assigned on the CRM card','W03 Figure 2'],
      ['Contact while intent is live','Lead worked from the Lead stage on arrival','W03 Figure 2'],
      ['Nothing is lost after first contact','Stage moved to Contacted; retargeting picks up non-repliers','W06'],
      ['Delivery of every broadcast','Platform delivery report checked after each send','Figure 1'],
      ['Consistency of counselling','Course-specific message templates per programme','Figure 2'],
    ], [2700,3800,2860]),
  ],
});

DOCS['cu5-wa5'] = M({
  file: 'CU5-WA5-Mobile-App-Campaign.docx',
  title: 'MOBILE APPLICATION MARKETING CAMPAIGN REPORT',
  subtitle: 'Recruitment campaign operated through the LuluChat application — TVET Lipis',
  date: '21 April 2025', submitted: 'Operations Manager',
  status: 'Report on work done', signoff: verification,
  content: [
    h1('1.  THE APPLICATION IN USE'),
    p('The mobile marketing campaign is operated through LuluChat, a subscribed messaging application that connects to the institution’s WhatsApp Business API account on number 60108086630. LuluChat is the application through which every prospect message is sent, received, tagged and recorded; it is not an application developed by the institution.'),
    img('u5.png', 460, 236),
    cap('Figure 1 — The LuluChat console operating the TVET Lipis WhatsApp account'),

    h1('2.  WHAT THE APPLICATION IS USED FOR'),
    table(['Function','Use in the campaign'], [
      ['Connected channels','One inbox covering WhatsApp, Instagram and Facebook enquiries'],
      ['Working tabs','New Lead, Hot Lead, Payment — prospects sorted by how close they are to enrolling'],
      ['Course tags','Each conversation tagged by programme, e.g. PAKK, Pra-Sekolah, Multimedia'],
      ['Message templates','Approved first-contact templates carrying the intake creative'],
      ['Quick replies','Saved answers to recurring questions on fees, duration and requirements'],
      ['Agent attribution','Each outgoing message records the counsellor who sent it'],
      ['Broadcast','Scheduled sends to a tagged segment, with a delivery report'],
    ], [2600,6760]),

    h1('3.  CAMPAIGN OPERATED THROUGH THE APPLICATION'),
    table(['Measure','Recorded'], [
      ['Business number','60108086630'],
      ['Conversations at New Lead','167'],
      ['Conversations at Hot Lead','43'],
      ['Conversations at Payment','27'],
      ['Broadcasts completed, September 2025','3 of 3'],
    ], [3400,5960]),
    p('The counts above are the position at the point of record and move continuously as prospects are worked.', { before: 100 }),

    h1('4.  LIMITATION AND NEXT STEP'),
    p('The application covers recruitment up to enrolment. Once a prospect becomes a student there is no owned mobile channel — timetables, results and fee statements are distributed through group chats, which are unsearchable and cannot be addressed to an individual. A student-facing application is proposed as the next step.'),
    fill('[ ISI: anggaran kos pembangunan aplikasi pelajar dan tempoh pelaksanaan, jika ingin diteruskan ]'),
  ],
});

DOCS['cu5-wa6'] = M({
  file: 'CU5-WA6-Mobile-Performance-Optimisation.docx',
  title: 'MOBILE CAMPAIGN PERFORMANCE OPTIMISATION REPORT',
  subtitle: 'Retargeting, contact limits and channel escalation — TVET Lipis',
  date: '[ TARIKH ]', submitted: 'Operations Manager',
  status: 'Report on work done', signoff: verification,
  content: [
    h1('1.  WHAT WAS MONITORED'),
    table(['Metric','Standard','Source'], [
      ['Broadcast delivery','100% completed','LuluChat broadcast report'],
      ['Recipients per broadcast','Segment resolves to a non-zero audience','Broadcast composer'],
      ['Leads without a reply','Escalated after 7 days','CRM retargeting'],
      ['Contacts per prospect','Three WhatsApp attempts maximum','CRM retargeting'],
    ], [2700,3400,3260]),

    h1('2.  FINDING — CONTACTED LEADS WERE NOT BEING WORKED AGAIN'),
    p('The pipeline showed 1,816 prospects at Contacted against 89 at Potential. A prospect who was messaged once and did not reply stayed at Contacted indefinitely — the stage recorded that contact had happened, but nothing caused it to happen again. At the point of record 1,751 leads across 41 weeks were sitting in that condition, the oldest more than 500 days old.'),

    h1('3.  ACTION — A RETARGETING CYCLE WITH A HARD LIMIT'),
    p('A retargeting module was built into the CRM. Leads at Contacted with no reply for seven or more days are grouped into weekly batches and re-contacted in a fixed sequence. Each prospect receives at most three WhatsApp attempts; after the third they leave WhatsApp entirely and move to the Email Pool for email marketing.'),
    img('cu5_retarget.png', 420, 113),
    cap('Figure 1 — Retargeting escalation: three WhatsApp attempts, then email'),
    p('The limit is the point of the design. Continuing to message a prospect who has not answered three times produces blocks and spam reports, and a blocked business number cannot be replaced — every future prospect is lost with it. Moving the contact to email preserves the relationship without spending the number.', { before: 100 }),

    h1('4.  CONTROLS BUILT INTO THE MODULE'),
    table(['Control','Rule'], [
      ['Send size','Maximum 50 leads per broadcast'],
      ['Send spacing','Batches over 50 split into sends at least 2 hours apart'],
      ['Opt-out','Every message carries “Taip STOP untuk berhenti”'],
      ['Batch independence','Each weekly batch downloaded, sent and marked separately'],
      ['Message relevance','Course-specific template per programme rather than one generic message'],
    ], [2400,6960]),
    img('u12.png', 460, 216),
    cap('Figure 2 — CRM retargeting module: Batch A holding 1,751 leads across 41 weeks, with the send limit and opt-out rule enforced on screen'),

    h1('5.  SECOND FINDING — A BROADCAST WITH NO AUDIENCE'),
    p('A broadcast composed against the segment “Contacts with tags” showed a target audience of zero recipients at the point of sending. A broadcast that delivers successfully to nobody still reports as completed, so delivery rate alone does not confirm that a campaign reached anyone. The recipient count is now checked in the composer before every send rather than delivery confirmed after it.'),
    img('ev71.png', 420, 206),
    cap('Figure 3 — Broadcast composer showing the segment resolving to zero recipients'),

    h1('6.  CONCLUSION'),
    p('Two failures were found that the headline metrics concealed: broadcasts reporting full delivery to an empty audience, and 1,751 contacted leads that no process would ever touch again. Both were corrected by moving the control upstream — verifying the audience before sending, and building the follow-up cycle into the CRM so that re-contact happens by rule rather than by memory.'),
    table(['Finding','Action','Status'], [
      ['Contacted leads never re-worked','Weekly retargeting batches, three attempts','Built into the CRM'],
      ['Risk of over-messaging','50 per send, 2-hour spacing, opt-out on every message','Enforced in the module'],
      ['Prospects exhausted on WhatsApp','Escalation to Email Pool for email marketing','Stage active in the pipeline'],
      ['Broadcast delivered to nobody','Recipient count verified before sending','In force'],
    ], [3000,4300,2060]),
  ],
});


// ═════════════════════════════ CU6 — EMAIL MARKETING ═════════════════════════
DOCS['cu6-wa2'] = M({
  file: 'CU6-WA2-Email-Content-Calendar.docx',
  title: 'EMAIL MARKETING CONTENT CALENDAR 2025',
  subtitle: 'Send schedule, segments and campaigns — Mailchimp, TVET Lipis',
  date: '[ TARIKH ]', submitted: 'General Manager',
  status: 'Report on work done', signoff: verification,
  content: [
    h1('1.  PURPOSE'),
    p('This document sets the email send schedule for 2025 — what is sent, to whom, and on what date — and records the campaigns issued against it. Email is the last channel in the recruitment sequence: it carries prospects who have been contacted on WhatsApp without converting, and it carries announcements to enrolled students and staff.'),

    h1('2.  AUDIENCE'),
    p('The Mailchimp audience is held under the name TVET Lipis and stood at 100 contacts, all of them email subscribers, at the point of record. Contacts are tagged so that a send can be addressed to one group rather than the whole list.'),
    img('cu6_audience.png', 380, 106),
    cap('Figure 1 — Audience composition by tag'),
    table(['Tag','Contacts','Used for'], [
      ['Student','73','Programme announcements, intake and event notices'],
      ['Student Program','16','Programme-specific communication'],
      ['Staff','10','Internal notice and pre-send verification'],
      ['Total audience','100',''],
    ], [2400,1400,5560]),
    img('em76.png', 440, 211),
    cap('Figure 2 — Mailchimp audience dashboard, TVET Lipis'),
    img('em77.png', 200, 206),
    cap('Figure 3 — Contacts organised by tag'),

    h1('3.  SEND CALENDAR 2025'),
    p('One send per month, on a Saturday, timed to the recruitment cycle. Saturday was chosen because the audience includes parents, who are more reachable at the weekend than during the working week.'),
    img('cu6_calendar.png', 460, 92),
    cap('Figure 4 — Email send calendar 2025'),
    table(['Month','Send date','Campaign','Segment','Status'], [
      ['January','11 Jan 2025','Intake open — courses and entry requirements','Student','Scheduled'],
      ['February','8 Feb 2025','Programme highlight — Pendidikan Awal Kanak-Kanak','Student','Scheduled'],
      ['March','8 Mar 2025','Government funding (PTPK) — allowances explained','All contacts','Scheduled'],
      ['April','12 Apr 2025','SPM results — options without full credits','Student','Scheduled'],
      ['May','10 May 2025','Programme highlight — Kandungan Kreatif Multimedia','Student','Scheduled'],
      ['June','14 Jun 2025','Mid-year intake reminder','All contacts','Scheduled'],
      ['July','12 Jul 2025','Alumni outcome — where graduates are working','Student','Scheduled'],
      ['August','9 Aug 2025','Funding and fee instalment reminder','All contacts','Scheduled'],
      ['September','13 Sep 2025','Open day — save the date','Student','Scheduled'],
      ['October','4 Oct 2025','Hari Terbuka TVET Lipis — invitation','All contacts (101)','SENT'],
      ['November','8 Nov 2025','Open day — final reminder before 15 Nov','Student','Scheduled'],
      ['December','6 Dec 2025','Final intake call for the year','All contacts','Scheduled'],
    ], [1200,1600,3600,1700,1260]),
    p('Rows marked SENT are evidenced in Section 4. The remainder are the scheduled positions on the calendar.', { before: 100 }),

    h1('4.  CAMPAIGNS ISSUED'),
    p('Two campaigns were issued on Saturday 4 October 2025, both promoting the open day of 15 November 2025. The staff segment was sent first, at 03:45, as a live check on rendering and links; the full audience followed at 04:06 once the staff send had gone through.'),
    table(['Time','Campaign','Segment','Recipients','Opens','Clicks'], [
      ['03:45','Hari Terbuka TVET Lipis 2025','Staff','10','40.0%','30.0%'],
      ['04:06','Hari Terbuka TVET Lipis','Full audience','101','0.0%','0.0%'],
    ], [900,3300,1600,1400,1080,1080]),
    img('em78.png', 440, 230),
    cap('Figure 5 — Campaign record: both sends, 4 October 2025'),
    fill('[ SAHKAN: kempen 101 penerima menunjukkan 0.0% dibuka — sahkan sama ada laporan belum dikemas kini atau penghantaran gagal ]'),

    h1('5.  CAMPAIGN CONTENT'),
    p('The October campaign carried the open day creative and the event detail — 15 November 2025, 10 a.m. to 12 noon, delivered by Zoom webinar — followed by what the session would cover and two call-to-action buttons.'),
    img('em79.png', 440, 224),
    cap('Figure 6 — “Hari Terbuka TVET Lipis” campaign as sent'),

    h1('6.  SENDING RULES'),
    table(['Rule','Reason'], [
      ['One send per contact per month','The list is small; over-sending produces unsubscribes it cannot afford'],
      ['Staff segment first','Rendering and links verified on a live send before the full audience'],
      ['Saturday send','Parents are reachable at the weekend'],
      ['Segment before sending','A send addressed to everyone is relevant to no one'],
      ['Event mail lands 6 weeks ahead','Enough notice to reserve the date, with a reminder closer in'],
    ], [3000,6360]),
  ],
});


DOCS['cu6-wa4'] = M({
  file: 'CU6-WA4-Email-Implementation-Coordination.docx',
  title: 'EMAIL MARKETING IMPLEMENTATION COORDINATION REPORT',
  subtitle: 'Campaign build, segmentation, verification and release — Mailchimp, TVET Lipis',
  date: '[ TARIKH ]', submitted: 'Operations Manager',
  status: 'Report on work done', signoff: verification,
  content: [
    h1('1.  SCOPE'),
    p('This report records how email campaigns were put out: the account they were sent from, the sequence followed on send day, the segments addressed, and how delivery was confirmed. It covers the campaigns issued on 4 October 2025 promoting the open day of 15 November 2025.'),

    h1('2.  SENDING ACCOUNT'),
    p('Sends are made from a Mailchimp account held in the institution’s name, so that campaigns carry the TVET Lipis identity and the audience, tags and campaign history remain with the institution rather than with an individual.'),
    img('em75_redacted.png', 430, 206),
    cap('Figure 1 — Mailchimp account, TVET Lipis (account username redacted)'),

    h1('3.  SEND SEQUENCE'),
    p('Every campaign follows the same five steps. The verification step is the one that matters: the campaign is released to the Staff segment first and only goes to the full audience once that send has gone through cleanly.'),
    img('cu6_sendflow.png', 460, 105),
    cap('Figure 2 — Send-day sequence'),
    table(['Step','What is done','Why'], [
      ['Build','Campaign assembled from the calendar entry','Content is decided in advance, not on send day'],
      ['Segment','Recipient list selected by tag','A send addressed to everyone is relevant to no one'],
      ['Verify','Released to the Staff segment','Rendering, links and sender name checked on a live send'],
      ['Send','Released to the full audience','Only after the verification send has landed'],
      ['Confirm','Delivery and engagement read from the campaign report','Sending is not the same as arriving'],
    ], [1500,4200,3660]),

    h1('4.  CAMPAIGNS COORDINATED — 4 OCTOBER 2025'),
    p('Two campaigns were released 21 minutes apart on Saturday 4 October 2025. The Staff segment received the campaign at 03:45 as the verification send; the full audience followed at 04:06.'),
    table(['Time','Campaign','Segment','Recipients','Opens','Clicks'], [
      ['03:45','Hari Terbuka TVET Lipis 2025','Staff','10','40.0%','30.0%'],
      ['04:06','Hari Terbuka TVET Lipis','Full audience','101','0.0%','0.0%'],
    ], [900,3300,1600,1400,1080,1080]),
    img('em78.png', 440, 230),
    cap('Figure 3 — Campaign record showing both sends, their segments and delivery status'),
    fill('[ SAHKAN: audiens direkodkan 100 kenalan tetapi kempen dihantar kepada 101 penerima — jelaskan perbezaan ]'),
    fill('[ SAHKAN: kempen 101 penerima menunjukkan 0.0% dibuka — sahkan sama ada laporan belum dikemas kini atau penghantaran gagal ]'),

    h1('5.  CONTENT COORDINATED ACROSS CHANNELS'),
    p('The campaign carried the open day creative and the event detail — 15 November 2025, 10 a.m. to 12 noon, by Zoom webinar — followed by what the session would cover and two call-to-action buttons directing the reader to contact the college or open the website.'),
    p('The same event was promoted on WhatsApp and on social media in the same period. Date, time, platform and contact number were taken from a single source so that a prospect meeting the announcement twice on different channels reads the same details, and the college is not contradicting itself.'),
    img('em79.png', 440, 224),
    cap('Figure 4 — Campaign as issued, carrying the open day date, time and platform'),

    h1('6.  COORDINATION CONTROLS'),
    table(['What was controlled','How','Evidence'], [
      ['Campaign identity','Sent from the institution’s own account','Figure 1'],
      ['Right list receives the right message','Segment selected by tag before sending','Figure 3'],
      ['Errors caught before the full send','Staff verification send released first','Figure 3'],
      ['Delivery confirmed, not assumed','Status and engagement read from the campaign report','Figure 3'],
      ['Consistency with other channels','Event detail taken from one source for email, WhatsApp and social','Figure 4'],
      ['Notice period','Invitation issued six weeks before the event','Figures 3, 4'],
    ], [2700,3800,1860]),

    h1('7.  OUTCOME'),
    p('Both campaigns were built, segmented, verified and released on the scheduled date, and the open day they promoted took place on 15 November 2025 as announced. The verification send performed as intended, returning 40% opens and 30% clicks from the Staff segment before the full audience send was released.'),
    p('One item is carried forward for the performance review: the full-audience campaign records no opens against a staff segment that recorded 40%. That is addressed under reference EML/CU6/W06/2025.'),
  ],
});


// ═════════════════════════════ CU2 — SEO ═════════════════════════════════════
DOCS['cu2-wa1'] = M({
  file: 'CU2-WA1-SEO-Channel-Analysis.docx', ref: 'SEO/CU2/W01/2026',
  title: 'SEO CHANNEL PERFORMANCE ANALYSIS',
  subtitle: 'Organic search performance of tvetlipis.my — Google Search Console',
  date: '[ TARIKH ]', submitted: 'General Manager',
  status: 'Report on work done', signoff: verification,
  content: [
    h1('1.  SCOPE'),
    p('This report analyses the organic search performance of tvetlipis.my using Google Search Console. It covers a sixteen-month window from 22 September 2025, with a three-month window used for current query and page detail.'),

    h1('2.  PERFORMANCE RECORDED'),
    table(['Metric','16 months','Last 3 months'], [
      ['Total clicks','1,050','284  (down 8%)'],
      ['Total impressions','14,100','4,100  (up 8%)'],
      ['Average click-through rate','7.4%','—'],
      ['Average position','3.7','—'],
    ], [3200,3100,3060]),
    p('Read on their own these are good numbers. An average position of 3.7 means the site typically appears near the top of the first page, and a click-through rate of 7.4% is healthy. The site is not failing to rank.', { before: 100 }),

    h1('3.  WHAT THE QUERIES SHOW'),
    p('The queries producing that traffic tell a different story. Every one of them is a brand name — the institution, its former name, or its town.'),
    img('cu2_queries.png', 440, 162),
    cap('Figure 1 — Queries leading to the site, last three months'),
    table(['Query','Clicks','Change','Type'], [
      ['tvet lipis','107','up 6%','Brand'],
      ['tvet kuala lipis','24','up 500%','Brand + location'],
      ['kolej islam antarabangsa kuala lipis','13','down 28%','Former name'],
      ['plk lipis','2','up 100%','Brand'],
      ['uia kuala lipis','1','no change','Parent institution'],
    ], [3800,1300,1700,2560]),
    p('No course query appears. Nobody arrives searching for a diploma in early childhood education, a multimedia course, or skills training in Pahang. The site captures demand from people who already know the name and are looking for it; it captures none from people deciding what to study.', { before: 100 }),

    h1('4.  WHERE THE TRAFFIC LANDS'),
    p('All 284 clicks in the three-month window landed on a single page — the home page, recorded in Search Console as UTAMA. Page indexing shows why: of three known pages, one is indexed and two are not.'),
    table(['Indexing status','Pages'], [
      ['Indexed','1'],
      ['Not indexed','2  (two reasons given)'],
      ['Total known pages','3'],
    ], [3400,5960]),
    p('The site therefore has one page competing for every possible search. A single page cannot rank for a course it does not describe, which explains the absence of non-brand queries more simply than any content or authority argument would.', { before: 100 }),

    h1('5.  CONCLUSION'),
    p('The constraint is not ranking ability. The site ranks at position 3.7 for what it has. The constraint is that there is almost nothing to rank — one indexed page, addressing a single audience: people who already know the institution by name.'),
    p('The growth in “tvet kuala lipis” of 500% indicates that local, location-qualified search is rising. That demand is currently met by one general page. Addressing it is the subject of SEO/CU2/W02/2026 and SEO/CU2/W03/2026.'),
    fill('[ LAMPIRKAN: tangkap layar Search Console — Performance 16 bulan, Insights Queries, dan Page indexing ]'),
  ],
});

DOCS['cu2-wa2'] = M({
  file: 'CU2-WA2-SEO-Campaign-Plan.docx', ref: 'SEO/CU2/W02/2026',
  title: 'SEO CAMPAIGN PLAN',
  subtitle: 'Target queries, page structure and measurement — tvetlipis.my',
  date: '[ TARIKH ]', submitted: 'General Manager',
  status: 'For approval', signoff: approval,
  content: [
    h1('1.  OBJECTIVE'),
    p('To win search traffic from prospects who do not yet know TVET Lipis by name — people searching for a course, a qualification or skills training in Pahang — while holding the brand positions the site already occupies.'),

    h1('2.  TARGET QUERIES'),
    p('Two groups. Brand queries are already held and need defending. Non-brand queries are the growth, and none is currently served.'),
    table(['Group','Example queries','Status'], [
      ['Brand','tvet lipis · tvet kuala lipis · kolej islam antarabangsa kuala lipis','Held — position 3.7'],
      ['Course','diploma pendidikan awal kanak-kanak · kursus multimedia · sijil pengurusan halal','Not served'],
      ['Location + course','kolej kemahiran pahang · diploma kuala lipis · kursus tvet pahang','Not served'],
      ['Funding','pembiayaan PTPK · kursus tanpa SPM penuh','Not served'],
    ], [1900,5100,2360]),

    h1('3.  PAGE STRUCTURE'),
    p('A page can only rank for what it is about. One general page cannot answer four different searches, so the plan is one page per subject a prospect actually searches for.'),
    img('cu2_structure.png', 460, 198),
    cap('Figure 1 — Current site against the proposed structure'),
    table(['Page','Query it is built to answer'], [
      ['Home','Brand searches — tvet lipis'],
      ['Diploma Pendidikan Awal Kanak-Kanak','Course name and career pathway'],
      ['Diploma Pendidikan Pra-Sekolah','Course name and career pathway'],
      ['Diploma Kandungan Kreatif Multimedia','Course name and career pathway'],
      ['Sijil Pengurusan Halal','Course name and entry route'],
      ['Yuran dan Pembiayaan PTPK','Cost and funding searches'],
      ['Syarat dan Tarikh Kemasukan','Entry requirement and intake searches'],
      ['Hubungi Kami','Location and contact searches'],
    ], [3400,5960]),

    h1('4.  MEASUREMENT'),
    table(['Metric','Source','Target'], [
      ['Indexed pages','Search Console — Page indexing','All published pages indexed'],
      ['Non-brand queries appearing','Search Console — Queries','[ ISI SASARAN ]'],
      ['Clicks from non-brand queries','Search Console — Performance','[ ISI SASARAN ]'],
      ['Average position, brand queries','Search Console — Performance','Hold at or above 3.7'],
    ], [2900,3400,3060]),
    p('The first metric is the gate. Until a page is indexed it cannot rank, so indexing is verified before any ranking target is judged.', { before: 100 }),
  ],
});

DOCS['cu2-wa3'] = M({
  file: 'CU2-WA3-SEO-Improvement-Plan.docx', ref: 'SEO/CU2/W03/2026',
  title: 'SEO IMPROVEMENT PLAN',
  subtitle: 'Issues identified and corrective actions — tvetlipis.my',
  date: '[ TARIKH ]', submitted: 'General Manager',
  status: 'For approval', signoff: approval,
  content: [
    h1('1.  ISSUES IDENTIFIED'),
    table(['#','Issue','Evidence','Effect'], [
      ['1','Two of three known pages are not indexed','Search Console — Page indexing','Those pages cannot appear in search at all'],
      ['2','Only one page exists to serve every search','All 284 clicks land on the home page','Nothing can rank for a course query'],
      ['3','No non-brand query appears','Queries report','Prospects who do not know the name are not reached'],
      ['4','Former name still draws traffic, and is falling','“kolej islam antarabangsa kuala lipis” down 28%','Traffic lost as the old name fades'],
    ], [600,3000,3000,2760]),

    h1('2.  CORRECTIVE ACTIONS'),
    table(['Issue','Action','Owner'], [
      ['1','Inspect both unindexed URLs, resolve the reason given, request indexing and confirm','Marketing Manager'],
      ['1','Submit a sitemap so new pages are discovered without waiting','Marketing Manager'],
      ['2','Publish one page per programme, per Section 3 of SEO/CU2/W02/2026','Marketing team'],
      ['3','Write page titles and descriptions around the course name, not the institution name','Marketing Manager'],
      ['4','Retain a page naming the former institution so that traffic is redirected rather than lost','Marketing Manager'],
    ], [700,5900,2760]),

    h1('3.  TECHNICAL CONSTRAINT'),
    p('The website is built on Canva and served through Cloudflare. Canva’s site builder gives limited control over page titles, meta descriptions and URL structure compared with a conventional content management system, and this is the most likely reason pages are failing to index.'),
    fill('[ SAHKAN: semak dua sebab “Not indexed” yang dinyatakan dalam Search Console dan catat di sini ]'),
    p('If the platform cannot support a page per programme with editable titles, the constraint is the platform and not the content, and a move to a conventional site should be assessed. That decision is outside this plan and is noted for management.', { before: 100 }),

    h1('4.  SUPPORTING CHANNEL — GOOGLE BUSINESS PROFILE'),
    p('For an institution recruiting locally, the Google Business Profile often outranks the website for location searches and appears above it on the results page. TVET Lipis holds a profile, and it is treated here as part of the same search presence rather than a separate channel.'),
    fill('[ LAMPIRKAN: tangkap layar Google Business Profile Insights — carian, paparan, permintaan arah dan panggilan ]'),

    h1('5.  SEQUENCE'),
    table(['Step','Action','Gate'], [
      ['1','Resolve indexing on existing pages','All known pages indexed'],
      ['2','Publish programme pages','Each page live and indexed'],
      ['3','Rewrite titles and descriptions','Non-brand terms present in titles'],
      ['4','Submit sitemap and re-inspect','Pages discovered automatically'],
      ['5','Review after one full month','Non-brand queries appear in the report'],
    ], [700,5000,3660]),
  ],
});

DOCS['cu2-wa4'] = M({
  file: 'CU2-WA4-SEO-Implementation-Coordination.docx', ref: 'SEO/CU2/W04/2026',
  title: 'SEO IMPLEMENTATION COORDINATION REPORT',
  subtitle: 'Actions carried out and verification — tvetlipis.my',
  date: '[ TARIKH ]', submitted: 'General Manager',
  status: 'Report on work done', signoff: verification,
  content: [
    h1('1.  SCOPE'),
    p('This report records the implementation of the SEO improvement plan: what was changed on the site, how each change was verified, and what the search data showed afterwards.'),

    h1('2.  SET-UP IN PLACE'),
    table(['Item','Status','Evidence'], [
      ['Domain','tvetlipis.my, live','Search Console property'],
      ['Search Console','Property verified and reporting','Performance report, 16 months of data'],
      ['Cloudflare','DNS and delivery in front of the site','Cloudflare dashboard'],
      ['Google Business Profile','Live','GBP Insights'],
    ], [2400,3000,3960]),
    fill('[ LAMPIRKAN: tangkap layar Cloudflare — ringkasan trafik dan Core Web Vitals bagi tvetlipis.my ]'),

    h1('3.  ACTIONS CARRIED OUT'),
    table(['Action','Date','Verification'], [
      ['URL inspection on unindexed pages','[ ISI ]','Search Console — URL inspection result'],
      ['Indexing requested','[ ISI ]','Coverage status changed to indexed'],
      ['Sitemap submitted','[ ISI ]','Sitemaps report shows Success'],
      ['Page titles and descriptions revised','[ ISI ]','Live page source'],
      ['Programme pages published','[ ISI ]','Page indexing count increases'],
    ], [3400,1800,4160]),
    fill('[ ISI: lengkapkan tarikh bagi setiap tindakan yang telah dilaksanakan; tandakan yang belum dilaksanakan sebagai “belum” ]'),

    h1('4.  MOVEMENT OBSERVED'),
    p('Known pages rose from two to three at the end of July 2026, recorded in the page indexing history. Indexed pages remained at one, so the additional page was discovered but not admitted to the index — which is the specific problem the improvement plan addresses.'),
    table(['Measure','Before','After'], [
      ['Known pages','2','3'],
      ['Indexed pages','1','1'],
      ['Non-brand queries','None','[ ISI ]'],
      ['Clicks, 3 months','284','[ ISI ]'],
    ], [3400,2980,2980]),

    h1('5.  COORDINATION CONTROLS'),
    table(['What was controlled','How'], [
      ['A change is not assumed to have worked','Every action verified in Search Console before being closed'],
      ['Indexing precedes ranking','No ranking target judged until the page is indexed'],
      ['Brand positions are not damaged','Average position on brand queries monitored alongside new pages'],
      ['Search presence is treated as one','Website and Google Business Profile reviewed together'],
    ], [3400,5960]),

    h1('6.  STATUS'),
    p('The set-up is in place and measurable. The indexing issue identified in the improvement plan remains open at the date of this report, and is the item carried forward.'),
  ],
});

const CU2_ORDER = ['cu2-wa1','cu2-wa2','cu2-wa3','cu2-wa4'];

DOCS['cu2-full'] = {
  file: 'CU2-SEO-Plan-and-Implementation.docx',
  compiled: true, footer: 'TVET Lipis',
  body: [
    tvetEdgeBar, LETTERHEADS.tvet, RULES.tvet,
    new Paragraph({ children: [new TextRun({ text: 'SEO PLAN', font: F, size: 40, bold: true, color: NAVY })],
      alignment: AlignmentType.CENTER, spacing: { before: 700, after: 40 } }),
    new Paragraph({ children: [new TextRun({ text: 'AND IMPLEMENTATION', font: F, size: 40, bold: true, color: NAVY })],
      alignment: AlignmentType.CENTER, spacing: { after: 120 } }),
    new Paragraph({ children: [new TextRun({ text: 'TVET Lipis · tvetlipis.my · 2025 – 2026', font: F, size: 24, color: '555555' })],
      alignment: AlignmentType.CENTER, spacing: { after: 700 } }),
    new Table({ width: { size: 7000, type: WidthType.DXA }, columnWidths: [2400, 4600], rows: [
      new TableRow({ children: [cell('Competency Unit',{w:2400,bold:true,fill:'EDF1F7'}), cell('C02 — Implement SEO plan',{w:4600})] }),
      new TableRow({ children: [cell('Standard',{w:2400,bold:true,fill:'EDF1F7'}), cell('NOSS M731-001-4:2021, Level 4',{w:4600})] }),
      new TableRow({ children: [cell('Work activities',{w:2400,bold:true,fill:'EDF1F7'}), cell('W01 – W04 (four)',{w:4600})] }),
      new TableRow({ children: [cell('Prepared by',{w:2400,bold:true,fill:'EDF1F7'}), cell('Zuriel Seong Ming Ee, Marketing Manager',{w:4600})] }),
      new TableRow({ children: [cell('Date',{w:2400,bold:true,fill:'EDF1F7'}), cell('[ TARIKH ]',{w:4600})] }),
    ]}),
    pageBreak(),
    h1('DOCUMENT REGISTER'),
    table(['Part','WA','Document','Type'], [
      ['1','W01','SEO Channel Performance Analysis','Report'],
      ['2','W02','SEO Campaign Plan','Plan'],
      ['3','W03','SEO Improvement Plan','Plan'],
      ['4','W04','SEO Implementation Coordination Report','Report'],
    ], [800,900,4700,2960]),
    h1('SUMMARY'),
    p('The site ranks well for what it has — average position 3.7 and a click-through rate of 7.4% across sixteen months, producing 1,050 clicks from 14,100 impressions. Every query producing that traffic is a brand name, and all 284 clicks in the most recent three months landed on a single page.'),
    p('The cause is structural: of three known pages, one is indexed. A single general page cannot rank for a course it does not describe, so prospects searching for a diploma rather than for TVET Lipis by name never reach the site. The plan is one page per subject searched for, with indexing resolved first.'),
    ...CU2_ORDER.flatMap(k => part(DOCS[k])),
  ],
};

const CU5_ORDER = ['cu5-wa1','cu5-wa2','cu5-wa3','cu5-wa4','cu5-wa5','cu5-wa6'];

DOCS['cu5-full'] = {
  file: 'CU5-Mobile-Marketing-Plan-and-Implementation.docx',
  compiled: true, footer: 'TVET Lipis',
  body: [
    tvetEdgeBar, LETTERHEADS.tvet, RULES.tvet,
    new Paragraph({ children: [new TextRun({ text: 'MOBILE MARKETING PLAN', font: F, size: 40, bold: true, color: NAVY })],
      alignment: AlignmentType.CENTER, spacing: { before: 700, after: 40 } }),
    new Paragraph({ children: [new TextRun({ text: 'AND IMPLEMENTATION', font: F, size: 40, bold: true, color: NAVY })],
      alignment: AlignmentType.CENTER, spacing: { after: 120 } }),
    new Paragraph({ children: [new TextRun({ text: 'TVET Lipis · WhatsApp Business · 2025', font: F, size: 24, color: '555555' })],
      alignment: AlignmentType.CENTER, spacing: { after: 700 } }),
    new Table({ width: { size: 7000, type: WidthType.DXA }, columnWidths: [2400, 4600], rows: [
      new TableRow({ children: [cell('Competency Unit',{w:2400,bold:true,fill:'EDF1F7'}), cell('C05 — Implement mobile marketing plan',{w:4600})] }),
      new TableRow({ children: [cell('Standard',{w:2400,bold:true,fill:'EDF1F7'}), cell('NOSS M731-001-4:2021, Level 4',{w:4600})] }),
      new TableRow({ children: [cell('Work activities',{w:2400,bold:true,fill:'EDF1F7'}), cell('W01 – W06 (six)',{w:4600})] }),
      new TableRow({ children: [cell('Prepared by',{w:2400,bold:true,fill:'EDF1F7'}), cell('Zuriel Seong Ming Ee, Marketing Manager',{w:4600})] }),
      new TableRow({ children: [cell('Date',{w:2400,bold:true,fill:'EDF1F7'}), cell('[ TARIKH ]',{w:4600})] }),
    ]}),
    pageBreak(),
    h1('DOCUMENT REGISTER'),
    table(['Part','WA','Document','Type'], [
      ['1','W01','Mobile Marketing Channel Selection','Proposal'],
      ['2','W02','Mobile Marketing Content Calendar','Plan'],
      ['3','W03','Mobile Marketing Campaign Plan','Plan — pre-launch'],
      ['4','W04','Mobile Campaign Implementation Coordination Report','Report'],
      ['5','W05','Mobile Application Marketing Campaign Proposal','Proposal — not implemented'],
      ['6','W06','Mobile Campaign Performance Optimisation Report','Report'],
    ], [800,900,4700,2960]),
    ...CU5_ORDER.flatMap(k => part(DOCS[k])),
  ],
};

const buildBody = (d) => d.compiled ? d.body
  : [...head(d), ...d.content, ...(d.signoff ? d.signoff() : [])];

const key = process.argv[2];
const out = process.argv[3];
if (!DOCS[key]) { console.error('Unknown doc key. Available:', Object.keys(DOCS).join(', ')); process.exit(1); }

const doc = new Document({
  styles: { default: { document: { run: { font: F, size: 21 } } } },
  sections: [{
    properties: { page: { margin: { top: convertInchesToTwip(0.7), bottom: convertInchesToTwip(0.75), left: convertInchesToTwip(0.85), right: convertInchesToTwip(0.85) } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: `${DOCS[key].footer || 'Superbowl Lipis'} · Page `, font: F, size: 15, color: '999999' }),
                 new TextRun({ children: [PageNumber.CURRENT], font: F, size: 15, color: '999999' })] })] }) },
    children: buildBody(DOCS[key]),
  }],
});
Packer.toBuffer(doc).then(b => { fs.writeFileSync(out || DOCS[key].file, b); console.log('Done:', out || DOCS[key].file); });
