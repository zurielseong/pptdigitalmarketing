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
  ...head(d.title, d.subtitle, d.ref, d.date, d.status),
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

const buildBody = (d) => d.compiled ? d.body
  : [...head(d.title, d.subtitle, d.ref, d.date, d.status), ...d.content, ...(d.signoff ? d.signoff() : [])];

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
    children: buildBody(DOCS[key]),
  }],
});
Packer.toBuffer(doc).then(b => { fs.writeFileSync(out || DOCS[key].file, b); console.log('Done:', out || DOCS[key].file); });
