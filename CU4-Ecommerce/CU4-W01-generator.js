const {
  Document, Packer, Paragraph, TextRun, AlignmentType, PageBreak,
  Table, TableRow, TableCell, WidthType, ShadingType, ImageRun,
  convertInchesToTwip, Footer, PageNumber, BorderStyle,
} = require('docx');
const fs = require('fs');
const SP = '/tmp/claude-0/-home-user/c222c7c5-1fc9-5ff7-858d-b12df17563bc/scratchpad';
const OUT = process.argv[2] || `${SP}/CU4-W01.docx`;
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
      children: [new TextRun({ text: 'E-Commerce Channel Selection Proposal · ECOM/W01 · Page ', font: F, size: 15, color: '999999' }),
                 new TextRun({ children: [PageNumber.CURRENT], font: F, size: 15, color: '999999' })] })] }) },
    children: [
      letterhead, rule,

      new Paragraph({ children: [new TextRun({ text: 'E-COMMERCE CHANNEL SELECTION PROPOSAL', font: F, size: 30, bold: true, color: NAVY })], alignment: AlignmentType.CENTER, spacing: { after: 60 } }),
      new Paragraph({ children: [new TextRun({ text: 'Evaluation and recommendation of an e-commerce platform for Superbowl Lipis', font: F, size: 20, color: '555555' })], alignment: AlignmentType.CENTER, spacing: { after: 220 } }),

      new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [1560, 3120, 1560, 3120],
        rows: [
          new TableRow({ children: [cell('Reference', { w:1560, bold:true, fill:'EDF1F7' }), cell('ECOM/W01/2025-01', { w:3120 }), cell('Prepared by', { w:1560, bold:true, fill:'EDF1F7' }), cell('Zuriel Seong Ming Ee', { w:3120 })] }),
          new TableRow({ children: [cell('Date', { w:1560, bold:true, fill:'EDF1F7' }), cell('[ TARIKH ]', { w:3120 }), cell('Position', { w:1560, bold:true, fill:'EDF1F7' }), cell('Marketing Manager', { w:3120 })] }),
          new TableRow({ children: [cell('Submitted to', { w:1560, bold:true, fill:'EDF1F7' }), cell('[ NAMA PENGURUSAN ]', { w:3120 }), cell('Status', { w:1560, bold:true, fill:'EDF1F7' }), cell('For approval', { w:3120 })] }),
        ] }),

      h1('1.  PURPOSE AND BACKGROUND'),
      p('Superbowl Lipis currently has no online sales channel. Sales are transacted through walk-in and informal messaging. This prevents sales from being measured, gives paid advertising no trackable conversion destination, and leaves no customer or order records.'),
      p('This proposal evaluates five e-commerce platforms and recommends one for adoption. Approval is sought to proceed with account registration and catalogue preparation.'),

      h1('2.  OPTIONS AND EVALUATION CRITERIA'),
      table(['Option', 'Platform'], [
        ['A', 'TikTok Shop — in-app marketplace integrated with TikTok content and ads'],
        ['B', 'Shopee — established Malaysian marketplace'],
        ['C', 'Lazada — regional marketplace with logistics infrastructure'],
        ['D', 'Own website store — self-hosted on WooCommerce or Shopify'],
        ['E', 'Meta Shop — catalogue storefront on Facebook and Instagram'],
      ], [900, 8460]),
      p(''),
      p('Seven criteria were applied. Weightings favour speed of launch and low fixed cost, reflecting current budget and staffing constraints.'),
      table(['Criteria', 'Weight', 'Criteria', 'Weight'], [
        ['Audience alignment', '25%', 'Operational effort', '10%'],
        ['Paid advertising integration', '20%', 'Payment & logistics support', '10%'],
        ['Setup cost', '15%', 'Data & reporting access', '5%'],
        ['Commission & transaction fees', '15%', '', ''],
      ], [2900, 1200, 2900, 1200]),

      h1('3.  EVALUATION RESULTS'),
      img('cu4_chart1.png', 470, 206),
      cap('Figure 1 — Weighted scores across five platform options'),
      img('cu4_chart2.png', 340, 298),
      cap('Figure 2 — Criteria-level comparison of the three highest-scoring options'),

      new Paragraph({ children: [new PageBreak()] }),

      table(['Criteria', 'Wt', 'TikTok Shop', 'Meta Shop', 'Shopee', 'Own site', 'Lazada'], [
        ['Audience alignment', '25%', '5', '4', '3', '2', '2'],
        ['Paid ad integration', '20%', '5', '5', '2', '4', '2'],
        ['Setup cost', '15%', '5', '5', '4', '2', '4'],
        ['Commission & fees', '15%', '3', '5', '3', '5', '3'],
        ['Operational effort', '10%', '4', '4', '3', '2', '3'],
        ['Payment & logistics', '10%', '4', '2', '5', '2', '5'],
        ['Data & reporting', '5%', '4', '4', '3', '5', '3'],
        ['WEIGHTED TOTAL', '100%', '4.50', '4.35', '3.10', '3.00', '2.85'],
      ], [2260, 800, 1400, 1300, 1200, 1200, 1200]),

      h1('4.  RECOMMENDATION'),
      p('TikTok Shop is recommended as the primary e-commerce channel, on four grounds:', { after: 110 }),
      bullet('Superbowl Lipis already holds an active TikTok audience. Selling in the same platform avoids redirecting customers and avoids building a new audience.'),
      bullet('TikTok Ads is already in use. TikTok Shop connects to it natively, giving purchases campaign-level attribution.'),
      bullet('No development, hosting or payment-gateway cost is required before the first sale.'),
      bullet('Product listings attach directly to organic video, so existing content contributes to sales without separate production.'),
      p('Meta Shop scored closely at 4.35 and is proposed as a secondary channel for later consideration, not for immediate implementation.', { before: 110 }),

      h1('5.  IMPLEMENTATION REQUIREMENTS'),
      table(['Item', 'Requirement', 'Responsibility'], [
        ['Account registration', 'Business verification documents, bank details', 'Marketing Manager'],
        ['Product catalogue', 'Product list, pricing, descriptions, photography', 'Marketing team'],
        ['Fulfilment', 'Packing, courier arrangement, dispatch procedure', 'Operations'],
        ['Payment settlement', 'Bank linkage and settlement schedule', 'Finance'],
        ['Performance tracking', 'Reporting format and review frequency', 'Marketing Manager'],
      ], [2100, 4760, 2500]),
      p(''),
      p('[ ISI: anggaran kos permulaan, tempoh pelaksanaan dan sumber diperlukan ]', { bold: true, color: RED, after: 60 }),

      h1('6.  RISKS'),
      table(['Risk', 'Mitigation'], [
        ['Platform account suspension or policy change', 'Keep product and customer data independent of the platform; hold Meta Shop in reserve.'],
        ['Platform dependency limits control over reach', 'Continue developing owned channels alongside the marketplace.'],
        ['Commission erodes margin', 'Review pricing against the fee structure before listing.'],
        ['Fulfilment capacity', 'Start with a limited range and scale once the process is proven.'],
      ], [3400, 5960]),

      h1('7.  APPROVAL'),
      p('Approval authorises commencement of the implementation steps in Section 5.', { after: 160 }),
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
