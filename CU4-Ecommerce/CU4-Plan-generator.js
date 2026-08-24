const {
  Document, Packer, Paragraph, TextRun, AlignmentType, PageBreak,
  Table, TableRow, TableCell, WidthType, ShadingType, ImageRun,
  convertInchesToTwip, Footer, PageNumber, BorderStyle,
} = require('docx');
const fs = require('fs');
const SP = '/tmp/claude-0/-home-user/c222c7c5-1fc9-5ff7-858d-b12df17563bc/scratchpad';
const OUT = process.argv[2] || `${SP}/CU4-Plan.docx`;
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
    ...rows.map((r, ri) => new TableRow({ children: r.map((c, i) => cell(c, { w: w[i], fill: ri % 2 ? 'F2F5F9' : undefined, bold: String(r[0]).startsWith('WEIGHTED') })) })),
  ],
});

const img = (f, w, h) => new Paragraph({
  children: [new ImageRun({ type: 'png', data: fs.readFileSync(`${SP}/${f}`), transformation: { width: w, height: h } })],
  alignment: AlignmentType.CENTER, spacing: { before: 100, after: 60 },
});

const cap = (t) => new Paragraph({
  children: [new TextRun({ text: t, font: F, size: 18, italics: true, color: '666666' })],
  alignment: AlignmentType.CENTER, spacing: { after: 180 },
});

// ── Letterhead ──
const letterhead = new Table({
  width: { size: 9360, type: WidthType.DXA }, columnWidths: [4680, 4680],
  borders: { top:{style:'none'},bottom:{style:'none'},left:{style:'none'},right:{style:'none'},insideHorizontal:{style:'none'},insideVertical:{style:'none'} },
  rows: [new TableRow({ children: [
    new TableCell({ width: { size: 4680, type: WidthType.DXA },
      borders:{top:{style:'none'},bottom:{style:'none'},left:{style:'none'},right:{style:'none'}},
      children: [new Paragraph({ alignment: AlignmentType.LEFT,
        children: [new ImageRun({ type: 'png', data: fs.readFileSync(`${SP}/lh_image1.png`), transformation: { width: 190, height: 62 } })] })] }),
    new TableCell({ width: { size: 4680, type: WidthType.DXA },
      borders:{top:{style:'none'},bottom:{style:'none'},left:{style:'none'},right:{style:'none'}},
      children: [new Paragraph({ alignment: AlignmentType.RIGHT,
        children: [new ImageRun({ type: 'jpg', data: fs.readFileSync(`${SP}/lh_image2.jpg`), transformation: { width: 118, height: 55 } })] })] }),
  ] })],
});

const rule = new Paragraph({ text: '', border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: RED } }, spacing: { before: 60, after: 200 } });

const doc = new Document({
  styles: { default: { document: { run: { font: F, size: 21 } } } },
  sections: [{
    properties: { page: { margin: { top: convertInchesToTwip(0.7), bottom: convertInchesToTwip(0.75), left: convertInchesToTwip(0.85), right: convertInchesToTwip(0.85) } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: 'E-Commerce Marketing Plan Proposal · ECOM/PLAN/2025-01 · Page ', font: F, size: 15, color: '999999' }),
                 new TextRun({ children: [PageNumber.CURRENT], font: F, size: 15, color: '999999' })] })] }) },
    children: [
      letterhead, rule,

      new Paragraph({ children: [new TextRun({ text: 'E-COMMERCE CHANNEL SELECTION PROPOSAL', font: F, size: 30, bold: true, color: NAVY })], alignment: AlignmentType.CENTER, spacing: { after: 60 } }),
      new Paragraph({ children: [new TextRun({ text: 'Channel selection, content plan, campaign plan, implementation and performance framework', font: F, size: 20, color: '555555' })], alignment: AlignmentType.CENTER, spacing: { after: 220 } }),

      new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [1560, 3120, 1560, 3120],
        rows: [
          new TableRow({ children: [cell('Reference', { w:1560, bold:true, fill:'EDF1F7' }), cell('ECOM/PLAN/2025-01', { w:3120 }), cell('Prepared by', { w:1560, bold:true, fill:'EDF1F7' }), cell('Zuriel Seong Ming Ee', { w:3120 })] }),
          new TableRow({ children: [cell('Date', { w:1560, bold:true, fill:'EDF1F7' }), cell('[ TARIKH ]', { w:3120 }), cell('Position', { w:1560, bold:true, fill:'EDF1F7' }), cell('Marketing Manager', { w:3120 })] }),
          new TableRow({ children: [cell('Submitted to', { w:1560, bold:true, fill:'EDF1F7' }), cell('[ NAMA PENGURUSAN ]', { w:3120 }), cell('Status', { w:1560, bold:true, fill:'EDF1F7' }), cell('For approval', { w:3120 })] }),
        ] }),

      h1('PART 1  ·  PURPOSE AND BACKGROUND'),
      p('Superbowl Lipis currently sells its streetwear jersey through walk-in and informal messaging enquiries. There is no online sales channel, which means sales cannot be measured, paid advertising has no trackable purchase destination, and no customer or order record is kept.'),
      p('This proposal recommends adopting TikTok Shop as the sales channel, and sets out the reasoning and the requirements to establish it. Approval is sought to proceed with account registration and product listing.'),

      h1('PART 2  ·  BUSINESS CONTEXT'),
      p('Two facts shape the recommendation:'),
      bullet('Superbowl Lipis sells a single product — the Superbowl jersey streetwear shirt. The channel does not need to support a large catalogue, inventory variants or complex merchandising.'),
      bullet('The brand already maintains an active TikTok account with an established local following, and a promotional video for the shirt has already been produced and posted.'),
      p('The requirement is therefore narrow: a way to sell one product to an audience that is already watching the brand\'s content, without building new infrastructure.'),

      h1('PART 3  ·  CHANNEL SELECTION  (W01)'),
      p('TikTok Shop is recommended as the sales channel for the following reasons.'),

      p('3.1   Native integration with content already published', { bold: true, before: 120, after: 90 }),
      p('A product link can be attached directly to the existing promotional video. The yellow basket icon appears on the video, and viewers move from watching to purchasing without leaving the application. No new content production is required to begin selling.'),
      img('cu4_flow.png', 490, 126),
      cap('Figure 1 — From existing content to completed order'),

      p('3.2   The audience is already on the platform', { bold: true, before: 120, after: 90 }),
      p('The brand\'s followers are local and already engaged with its TikTok content. Selling within the same platform reaches that audience directly. Any other channel would require redirecting them elsewhere, or building a new audience from zero.'),

      p('3.3   No setup cost or technical build', { bold: true, before: 120, after: 90 }),
      p('TikTok Shop requires account registration and a product listing. There is no development work, no hosting, no domain and no separate payment gateway to arrange. Checkout and payment are handled within the platform.'),

      p('3.4   A standalone store is disproportionate for one product', { bold: true, before: 120, after: 90 }),
      p('Building a Shopify or WooCommerce store would involve monthly subscription, domain registration, payment gateway setup, theme configuration and ongoing maintenance — before a single shirt is sold. For a single-product range with no immediate plan to expand the catalogue, that cost and effort is not justified.'),

      h1('PART 3.5  ·  OPTIONS CONSIDERED'),
      table(['Option', 'Assessment'], [
        ['TikTok Shop', 'RECOMMENDED — native to existing content and audience; no setup cost; in-app checkout.'],
        ['Own website (Shopify / WooCommerce)', 'Rejected — highest setup cost and effort; requires building traffic from zero; disproportionate for a single product.'],
        ['Shopee', 'Not pursued — seller registration was not approved.'],
        ['Lazada', 'Not pursued — no existing audience on the platform; would require paid traffic to generate visibility.'],
        ['Meta Shop', 'Held in reserve — brand has a Meta presence, but no native in-app checkout in this market.'],
      ], [2900, 6460]),
      p(''),
      p('Note on platform fees: marketplace commission rates vary by category and change periodically. TikTok Shop is not necessarily the lowest-commission option, and a self-hosted store carries no commission at all. The recommendation rests on integration, audience and setup cost rather than on commission being lowest.', { italics: true, size: 19, color: '555555' }),

      h1('PART 4  ·  CONTENT CALENDAR  (W02)'),
      p('Content is the primary driver of visibility on TikTok. Because the product link attaches to video, every piece of content published is also a potential point of sale. The calendar below sets the content mix and publishing rhythm.'),

      p('4.1   Content pillars', { bold: true, before: 120, after: 90 }),
      p('Five pillars are proposed for a single-product range. The mix weights product-led content most heavily while retaining sufficient variety to avoid the account reading as purely promotional.'),
      img('cu4_pillars.png', 430, 198),
      cap('Figure 2 — Proposed monthly content mix'),
      table(['Pillar', 'Purpose', 'Example'], [
        ['Product showcase', 'Show the shirt itself — fabric, fit, print detail', 'Close-up detail reel, fabric texture'],
        ['Styling & fit', 'Show how the shirt is worn', 'Outfit pairing, sizing on different builds'],
        ['Local identity', 'Connect the brand to Kuala Lipis', 'Local landmarks, hometown pride content'],
        ['Customer & UGC', 'Build trust through real buyers', 'Customer wearing the shirt, unboxing'],
        ['Promotional', 'Drive immediate action', 'Restock announcement, limited offer'],
      ], [1900, 3200, 4260]),

      p('4.2   Publishing schedule', { bold: true, before: 160, after: 90 }),
      table(['Week', 'Post 1', 'Post 2'], [
        ['Week 1', 'Product showcase', 'Local identity'],
        ['Week 2', 'Styling & fit', 'Customer / UGC'],
        ['Week 3', 'Product showcase', 'Promotional'],
        ['Week 4', 'Styling & fit', 'Local identity'],
      ], [1400, 3980, 3980]),
      p('Two posts per week, published on a fixed schedule. Every post carries the product link so that any video can convert regardless of its pillar.', { before: 100 }),

      h1('PART 5  ·  CAMPAIGN PLAN  (W03)'),
      p('5.1   Objectives', { bold: true, after: 90 }),
      table(['Objective', 'Measure', 'Target'], [
        ['Establish the sales channel', 'Store live with product listed', 'Within 3 weeks of approval'],
        ['Generate first sales', 'Orders received', '[ ISI SASARAN ]'],
        ['Build repeat visibility', 'Product page views', '[ ISI SASARAN ]'],
        ['Control acquisition cost', 'Cost per order', '[ ISI SASARAN ]'],
      ], [3000, 3200, 3160]),

      p('5.2   Target audience', { bold: true, before: 160, after: 90 }),
      table(['Segment', 'Description', 'Rationale'], [
        ['Existing followers', 'Current TikTok audience of the brand', 'Already engaged; lowest cost to reach'],
        ['Local — Kuala Lipis & Pahang', 'Residents and those with local ties', 'Brand identity is rooted in the town'],
        ['Streetwear interest — nationwide', 'Younger buyers following streetwear content', 'Expansion audience once local base is proven'],
      ], [2400, 3400, 3560]),

      p('5.3   Positioning and message', { bold: true, before: 160, after: 90 }),
      p('The shirt is positioned as local identity apparel rather than generic streetwear. The message centres on wearing where you are from. This differentiates it from mass-market streetwear and gives the local audience a reason to buy beyond the garment itself.'),

      h1('PART 6  ·  IMPLEMENTATION COORDINATION  (W04)'),
      p('The following sets out task ownership and sequence from approval to first paid campaign.'),
      img('cu4_gantt.png', 470, 176),
      cap('Figure 3 — Implementation timeline from approval'),
      table(['Task', 'Owner', 'Dependency'], [
        ['Account registration and business verification', 'Marketing Manager', 'Business documents from Finance'],
        ['Product photography and listing copy', 'Marketing team', 'Product samples available'],
        ['Attach product link to existing promo video', 'Marketing Manager', 'Store live and product approved'],
        ['Ongoing content production', 'Marketing team', 'Content calendar approved'],
        ['Fulfilment and dispatch process', 'Operations', 'Packaging and courier account'],
        ['Payment settlement setup', 'Finance', 'Bank account linkage'],
        ['Paid campaign activation', 'Marketing Manager', 'Organic sales proven in soft launch'],
      ], [3600, 2600, 3160]),
      p('Paid activity begins only after the soft launch confirms the checkout and fulfilment process works end to end. Spending on traffic before that is avoided.', { before: 100 }),

      h1('PART 7  ·  PAID ADVERTISEMENT PROPOSAL  (W05)'),
      p('7.1   Approach', { bold: true, after: 90 }),
      p('Paid activity runs through TikTok Ads, which is already in use by the organisation. Because the product link sits on organic video, the same creative can be promoted rather than produced separately.'),

      p('7.2   Budget allocation', { bold: true, before: 140, after: 90 }),
      img('cu4_budget.png', 300, 225),
      cap('Figure 4 — Proposed split of paid budget'),
      table(['Allocation', 'Share', 'Purpose'], [
        ['Prospecting', '55%', 'Reach new audiences beyond existing followers'],
        ['Retargeting', '30%', 'Re-reach viewers who watched but did not purchase'],
        ['Creative testing', '15%', 'Test new content against current best performer'],
      ], [2400, 1400, 5560]),
      p('[ ISI: jumlah belanjawan bulanan yang dicadangkan ]', { bold: true, color: RED, before: 110, after: 90 }),

      p('7.3   Success criteria', { bold: true, before: 140, after: 90 }),
      table(['Metric', 'Threshold'], [
        ['Cost per order', 'Below [ ISI ] — the point at which an order remains profitable after commission and fulfilment'],
        ['Return on ad spend', 'Above [ ISI ]'],
        ['Order volume', 'Sufficient to justify continued spend'],
      ], [2600, 6760]),

      h1('PART 8  ·  PERFORMANCE AND OPTIMISATION FRAMEWORK  (W06)'),
      p('Performance is reviewed weekly against the thresholds set in Part 7. The cycle below governs how spending decisions are made during the campaign rather than after it.'),
      img('cu4_loop.png', 430, 181),
      cap('Figure 5 — Weekly optimisation cycle'),

      p('8.1   Metrics monitored', { bold: true, before: 130, after: 90 }),
      table(['Metric', 'Source', 'Frequency'], [
        ['Product page views', 'TikTok Shop Seller Centre', 'Weekly'],
        ['Orders and units sold', 'TikTok Shop Seller Centre', 'Weekly'],
        ['Conversion rate', 'Views to orders', 'Weekly'],
        ['Ad spend and cost per order', 'TikTok Ads Manager', 'Weekly'],
        ['Video views on shoppable content', 'TikTok Analytics', 'Weekly'],
      ], [2900, 3400, 3060]),

      p('8.2   Decision rules', { bold: true, before: 160, after: 90 }),
      table(['Condition', 'Action'], [
        ['Cost per order below threshold for two consecutive weeks', 'Increase budget on the performing ad group'],
        ['Cost per order above threshold for two consecutive weeks', 'Pause the ad group and review creative and targeting'],
        ['Product page views high but orders low', 'Review listing — price, photography, description, stock status'],
        ['A single video outperforms others materially', 'Allocate additional budget to that creative'],
      ], [4400, 4960]),
      p('Decisions are recorded with the date, the data that prompted them and the change made, so that the campaign has a documented optimisation history rather than an undocumented series of adjustments.', { before: 100 }),

      h1('PART 9  ·  RESOURCES REQUIRED'),
      table(['Item', 'Requirement', 'Responsibility'], [
        ['Account registration', 'Business verification documents, bank details', 'Marketing Manager'],
        ['Product catalogue', 'Product list, pricing, descriptions, photography', 'Marketing team'],
        ['Fulfilment', 'Packing, courier arrangement, dispatch procedure', 'Operations'],
        ['Payment settlement', 'Bank linkage and settlement schedule', 'Finance'],
        ['Performance tracking', 'Reporting format and review frequency', 'Marketing Manager'],
      ], [2100, 4760, 2500]),
      p(''),
      p('[ ISI: anggaran kos permulaan, tempoh pelaksanaan dan sumber diperlukan ]', { bold: true, color: RED, after: 60 }),

      h1('PART 10  ·  RISKS'),
      table(['Risk', 'Mitigation'], [
        ['Platform account suspension or policy change', 'Keep product and customer data independent of the platform; hold Meta Shop in reserve.'],
        ['Platform dependency limits control over reach', 'Continue developing owned channels alongside the marketplace.'],
        ['Commission erodes margin', 'Review pricing against the fee structure before listing.'],
        ['Fulfilment capacity', 'Start with a limited range and scale once the process is proven.'],
      ], [3400, 5960]),

      h1('PART 11  ·  APPROVAL'),
      p('Approval authorises commencement of the implementation steps in Part 6 and the budget set out in Part 7.', { after: 160 }),
      table(['', 'Prepared By', 'Reviewed By', 'Approved By'], [
        ['Name', 'Zuriel Seong Ming Ee', '', ''],
        ['Position', 'Marketing Manager', '', ''],
        ['Signature', '', '', ''],
        ['Date', '', '', ''],
      ], [1500, 2820, 2520, 2520]),
      p(''),
      p('Decision:      ☐  Approved            ☐  Approved with amendment            ☐  Not approved', { bold: true, after: 140 }),
      p('Comments:', { bold: true, after: 100 }),
      p('______________________________________________________________________________', { after: 120 }),
      p('______________________________________________________________________________', { after: 120 }),
    ],
  }],
});

Packer.toBuffer(doc).then(b => { fs.writeFileSync(OUT, b); console.log('Done:', OUT); });
