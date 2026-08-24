const {
  Document, Packer, Paragraph, TextRun, AlignmentType, PageBreak,
  Table, TableRow, TableCell, WidthType, ShadingType, LineRuleType,
  convertInchesToTwip, Footer, PageNumber, BorderStyle,
} = require('docx');
const fs = require('fs');
const OUT = process.argv[2] || '/tmp/CU4-W01.docx';
const F = 'Calibri';

const p = (text, o = {}) => new Paragraph({
  children: [new TextRun({ text, font: F, size: o.size || 22, bold: o.bold, italics: o.italics, color: o.color })],
  alignment: o.align || AlignmentType.JUSTIFIED,
  spacing: { line: 300, before: o.before || 0, after: o.after === undefined ? 160 : o.after },
});

const h1 = (t) => new Paragraph({
  children: [new TextRun({ text: t, font: F, size: 28, bold: true, color: '1F3864' })],
  spacing: { before: 320, after: 200 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: '1F3864' } },
});

const h2 = (t) => new Paragraph({
  children: [new TextRun({ text: t, font: F, size: 24, bold: true, color: '2E5B8A' })],
  spacing: { before: 260, after: 140 },
});

const bullet = (t) => new Paragraph({
  children: [new TextRun({ text: t, font: F, size: 22 })],
  bullet: { level: 0 }, spacing: { line: 300, after: 90 },
});

const cell = (t, o = {}) => new TableCell({
  width: { size: o.w || 2000, type: WidthType.DXA },
  shading: o.fill ? { type: ShadingType.CLEAR, color: 'auto', fill: o.fill } : undefined,
  margins: { top: 60, bottom: 60, left: 90, right: 90 },
  children: (Array.isArray(t) ? t : [t]).map(x => new Paragraph({
    children: [new TextRun({ text: String(x), font: F, size: o.size || 20, bold: o.bold, color: o.color })],
    alignment: o.align || AlignmentType.LEFT,
    spacing: { line: 264 },
  })),
});

const table = (head, rows, widths) => new Table({
  width: { size: 9360, type: WidthType.DXA }, columnWidths: widths,
  rows: [
    new TableRow({ tableHeader: true, children: head.map((h, i) => cell(h, { w: widths[i], bold: true, fill: '1F3864', color: 'FFFFFF' })) }),
    ...rows.map(r => new TableRow({ children: r.map((c, i) => cell(c, { w: widths[i] })) })),
  ],
});

const FILL = (t) => new Paragraph({
  children: [new TextRun({ text: t, font: F, size: 20, bold: true, color: 'C00000' })],
  spacing: { before: 80, after: 160 },
});

// ── Document control ─────────────────────────────────────────────────────────
const control = new Table({
  width: { size: 9360, type: WidthType.DXA }, columnWidths: [2400, 6960],
  rows: [
    ['Document Title', 'E-Commerce Channel Selection Proposal'],
    ['Document Reference', 'ECOM/W01/2025-01'],
    ['Competency Unit', 'M731-001-4:2021-C04 — Implement E-Commerce Marketing Plan'],
    ['Work Activity', 'W01 — Determine E-Commerce Channel'],
    ['Version', '1.0'],
    ['Date Prepared', '[ TARIKH ]'],
    ['Prepared By', 'Zuriel Seong Ming Ee, Marketing Manager'],
    ['Submitted To', '[ NAMA / JAWATAN PENGURUSAN ]'],
    ['Status', 'For Management Review and Approval'],
  ].map(r => new TableRow({ children: [cell(r[0], { w: 2400, bold: true, fill: 'DCE4F0' }), cell(r[1], { w: 6960 })] })),
});

const doc = new Document({
  styles: { default: { document: { run: { font: F, size: 22 } } } },
  sections: [{
    properties: { page: { margin: { top: convertInchesToTwip(0.9), bottom: convertInchesToTwip(0.9), left: convertInchesToTwip(1), right: convertInchesToTwip(1) } } },
    footers: { default: new Footer({ children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: 'E-Commerce Channel Selection Proposal  |  ECOM/W01/2025-01  |  Page ', font: F, size: 16, color: '808080' }),
                 new TextRun({ children: [PageNumber.CURRENT], font: F, size: 16, color: '808080' })],
    })] }) },
    children: [
      new Paragraph({ children: [new TextRun({ text: '[ NAMA ORGANISASI ]', font: F, size: 24, bold: true, color: '808080' })], alignment: AlignmentType.CENTER, spacing: { after: 80 } }),
      new Paragraph({ children: [new TextRun({ text: 'E-COMMERCE CHANNEL SELECTION PROPOSAL', font: F, size: 36, bold: true, color: '1F3864' })], alignment: AlignmentType.CENTER, spacing: { after: 80 } }),
      new Paragraph({ children: [new TextRun({ text: 'Evaluation and Recommendation of E-Commerce Platform', font: F, size: 24, color: '2E5B8A' })], alignment: AlignmentType.CENTER, spacing: { after: 320 } }),
      control,
      p(''),

      h1('1.  EXECUTIVE SUMMARY'),
      p('This proposal presents an evaluation of available e-commerce platforms and recommends a preferred channel for the organisation\'s entry into online retail. Five platform options were assessed against seven weighted criteria covering cost, audience fit, operational effort and integration with existing marketing activity.'),
      p('Following the evaluation, TikTok Shop is recommended as the primary e-commerce channel. The recommendation is based principally on the organisation\'s existing audience concentration on TikTok, the platform\'s integration with paid advertising already in use, and its comparatively low barrier to entry in terms of setup cost and technical requirement.'),
      p('Management approval is sought to proceed with account registration, catalogue preparation and the subsequent campaign planning stages set out in Section 8.'),

      h1('2.  BACKGROUND'),
      p('At present the organisation has no centralised online sales channel. Sales are transacted through physical walk-in and informal messaging enquiries. This arrangement presents three operational limitations:'),
      bullet('Sales activity cannot be measured, attributed or forecast with any accuracy.'),
      bullet('Paid advertising has no trackable conversion destination, preventing return on ad spend from being calculated.'),
      bullet('Customer records, order history and repeat-purchase behaviour are not captured in any system.'),
      p('Establishing a formal e-commerce channel addresses all three, and provides the conversion destination required before any paid e-commerce campaign can meaningfully be run.'),

      h1('3.  OBJECTIVES OF CHANNEL SELECTION'),
      p('The selected channel is required to satisfy the following business objectives:'),
      bullet('Provide a functioning online sales and checkout facility.'),
      bullet('Serve as a measurable conversion destination for paid advertising campaigns.'),
      bullet('Capture customer and order data for future marketing use.'),
      bullet('Operate within the organisation\'s available budget and staffing capacity.'),
      bullet('Reach the organisation\'s existing and target customer base without requiring a new audience to be built from zero.'),

      h1('4.  PLATFORM OPTIONS EVALUATED'),
      p('Five platforms were considered. Each was assessed on publicly available platform documentation and on the organisation\'s own operating constraints.'),
      table(['Option', 'Platform', 'Description'], [
        ['A', 'TikTok Shop', 'In-app marketplace integrated with TikTok content and advertising.'],
        ['B', 'Shopee', 'Established Malaysian marketplace with high consumer traffic.'],
        ['C', 'Lazada', 'Regional marketplace with established logistics infrastructure.'],
        ['D', 'Own website store', 'Self-hosted store built on WooCommerce or Shopify.'],
        ['E', 'Facebook / Instagram Shop', 'Catalogue-based storefront within Meta platforms.'],
      ], [900, 2400, 6060]),

      h1('5.  EVALUATION CRITERIA'),
      p('Seven criteria were applied. Weightings reflect the relative importance of each factor to the organisation at this stage of development, where limited budget and staffing make speed of launch and low fixed cost more significant than long-term scalability.'),
      table(['Criteria', 'Weight', 'Rationale'], [
        ['Audience alignment', '25%', 'Whether the organisation\'s existing audience is already active on the platform.'],
        ['Integration with paid advertising', '20%', 'Whether the platform connects natively to advertising channels already in use.'],
        ['Setup cost', '15%', 'Initial cost to establish the store and list products.'],
        ['Commission and transaction fees', '15%', 'Ongoing cost per transaction affecting margin.'],
        ['Operational effort', '10%', 'Staffing effort required to manage listings, orders and fulfilment.'],
        ['Payment and logistics support', '10%', 'Extent of built-in payment processing and delivery integration.'],
        ['Data and reporting access', '5%', 'Availability of sales and customer data for analysis.'],
      ], [2600, 1000, 5760]),

      new Paragraph({ children: [new PageBreak()] }),

      h1('6.  EVALUATION MATRIX'),
      p('Each option was scored from 1 (poor) to 5 (excellent) against each criterion. Weighted scores are the product of the raw score and the criterion weighting.'),
      table(['Criteria', 'Weight', 'A: TikTok Shop', 'B: Shopee', 'C: Lazada', 'D: Own site', 'E: Meta Shop'], [
        ['Audience alignment', '25%', '5', '3', '2', '2', '4'],
        ['Integration with paid ads', '20%', '5', '2', '2', '4', '5'],
        ['Setup cost', '15%', '5', '4', '4', '2', '5'],
        ['Commission / fees', '15%', '3', '3', '3', '5', '5'],
        ['Operational effort', '10%', '4', '3', '3', '2', '4'],
        ['Payment & logistics', '10%', '4', '5', '5', '2', '2'],
        ['Data & reporting', '5%', '4', '3', '3', '5', '4'],
        ['WEIGHTED TOTAL', '100%', '4.50', '3.10', '2.85', '3.00', '4.35'],
      ], [2000, 900, 1400, 1200, 1200, 1300, 1360]),
      p(''),
      p('TikTok Shop returns the highest weighted score at 4.50, followed by Meta Shop at 4.35. The margin between the two is narrow and is driven primarily by audience alignment and native content integration.'),

      h1('7.  RECOMMENDATION'),
      p('It is recommended that TikTok Shop be adopted as the organisation\'s primary e-commerce channel. The recommendation rests on four grounds:'),
      h2('7.1  Existing audience concentration'),
      p('The organisation already maintains an active TikTok presence with an established follower base. Selling within the same platform removes the need to redirect customers elsewhere, and removes the audience-building cost that a standalone website would incur.'),
      h2('7.2  Integration with advertising already in use'),
      p('TikTok Ads is already an active advertising channel for the organisation. TikTok Shop connects natively to it, allowing products to be promoted directly and purchases to be attributed to specific campaigns. This satisfies the requirement for a measurable conversion destination.'),
      h2('7.3  Low barrier to entry'),
      p('Account registration and product listing require no development cost and no third-party hosting. A self-hosted store would require build cost, hosting, payment gateway registration and ongoing maintenance before the first sale could be transacted.'),
      h2('7.4  Native content-to-commerce format'),
      p('Product listings can be attached directly to organic video content. This allows existing content activity to contribute to sales without a separate creative production stream.'),
      h2('7.5  Recommendation on secondary channel'),
      p('It is further recommended that Meta Shop be held as a secondary channel for later consideration, given its close second-place score and the organisation\'s existing Meta advertising activity. It is not proposed for immediate implementation.'),

      h1('8.  IMPLEMENTATION REQUIREMENTS'),
      p('Subject to approval, the following are required to establish the channel:'),
      table(['Item', 'Requirement', 'Responsibility'], [
        ['Account registration', 'Business verification documents and bank account details', 'Marketing Manager'],
        ['Product catalogue', 'Product list, pricing, descriptions and photography', 'Marketing team'],
        ['Fulfilment process', 'Packing, courier arrangement and dispatch procedure', 'Operations'],
        ['Payment settlement', 'Bank account linkage and settlement schedule', 'Finance'],
        ['Performance tracking', 'Reporting format and review frequency', 'Marketing Manager'],
      ], [2200, 4600, 2560]),
      p(''),
      FILL('[ ISI: masukkan anggaran kos permulaan, tempoh pelaksanaan dan sumber yang diperlukan ]'),

      h1('9.  RISKS AND MITIGATION'),
      table(['Risk', 'Impact', 'Mitigation'], [
        ['Platform account suspension or policy change', 'High — channel becomes unavailable', 'Maintain product and customer data independently of the platform; hold a secondary channel in reserve.'],
        ['Platform dependency', 'Medium — limited control over reach', 'Continue building owned channels alongside marketplace presence.'],
        ['Commission erodes margin', 'Medium', 'Review pricing against platform fee structure before listing.'],
        ['Fulfilment capacity', 'Medium', 'Begin with a limited product range and scale once process is proven.'],
      ], [2600, 1800, 4960]),

      new Paragraph({ children: [new PageBreak()] }),

      h1('10.  APPROVAL'),
      p('This proposal is submitted for management review and approval. Approval authorises commencement of the implementation steps set out in Section 8.'),
      p(''),
      table(['', 'Prepared By', 'Reviewed By', 'Approved By'], [
        ['Name', 'Zuriel Seong Ming Ee', '', ''],
        ['Position', 'Marketing Manager', '', ''],
        ['Signature', '', '', ''],
        ['Date', '', '', ''],
      ], [1600, 2800, 2480, 2480]),
      p(''),
      p('Decision:', { bold: true, after: 100 }),
      p('☐   Approved as proposed          ☐   Approved with amendment          ☐   Not approved', { after: 200 }),
      p('Comments / conditions:', { bold: true, after: 100 }),
      p('_________________________________________________________________________________', { after: 140 }),
      p('_________________________________________________________________________________', { after: 140 }),
      p('_________________________________________________________________________________', { after: 140 }),
    ],
  }],
});

Packer.toBuffer(doc).then(b => { fs.writeFileSync(OUT, b); console.log('Done:', OUT); });
