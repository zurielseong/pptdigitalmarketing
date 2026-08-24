const {
  Document, Packer, Paragraph, TextRun, AlignmentType, PageBreak,
  Table, TableRow, TableCell, WidthType, ShadingType, ImageRun,
  convertInchesToTwip, Footer, PageNumber, BorderStyle,
} = require('docx');
const fs = require('fs');
const SP = process.env.SP || '/tmp/claude-0/-home-user/abef9117-a5e1-4765-b37d-eb70737fcc00/scratchpad';
const OUT = process.argv[2] || `${SP}/CU7-Plan.docx`;
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
    ...rows.map((r, ri) => new TableRow({ children: r.map((c, i) => cell(c, { w: w[i], fill: ri % 2 ? 'F2F5F9' : undefined })) })),
  ],
});

const img = (f, w, h) => new Paragraph({
  children: [new ImageRun({ type: f.endsWith('.jpeg') || f.endsWith('.jpg') ? 'jpg' : 'png',
    data: fs.readFileSync(`${SP}/${f}`), transformation: { width: w, height: h } })],
  alignment: AlignmentType.CENTER, spacing: { before: 100, after: 60 },
});

const gap = (t) => new Paragraph({
  children: [new TextRun({ text: '[ BUKTI DIPERLUKAN — ' + t + ' ]', font: F, size: 20, bold: true, color: 'C00000' })],
  alignment: AlignmentType.CENTER, spacing: { before: 240, after: 240 },
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
      children: [new TextRun({ text: 'Online Reputation Management Plan · REP/CU7/2025-01 · Page ', font: F, size: 15, color: '999999' }),
                 new TextRun({ children: [PageNumber.CURRENT], font: F, size: 15, color: '999999' })] })] }) },
    children: [
      letterhead, rule,

      new Paragraph({ children: [new TextRun({ text: 'ONLINE REPUTATION MANAGEMENT PLAN', font: F, size: 30, bold: true, color: NAVY })], alignment: AlignmentType.CENTER, spacing: { after: 60 } }),
      new Paragraph({ children: [new TextRun({ text: 'Complaint handling, compliment handling and community management — Superbowl Lipis', font: F, size: 20, color: '555555' })], alignment: AlignmentType.CENTER, spacing: { after: 220 } }),

      new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [1560, 3120, 1560, 3120],
        rows: [
          new TableRow({ children: [cell('Reference', { w:1560, bold:true, fill:'EDF1F7' }), cell('REP/CU7/2025', { w:3120 }), cell('Prepared by', { w:1560, bold:true, fill:'EDF1F7' }), cell('Zuriel Seong Ming Ee', { w:3120 })] }),
          new TableRow({ children: [cell('Date', { w:1560, bold:true, fill:'EDF1F7' }), cell('[ TARIKH ]', { w:3120 }), cell('Position', { w:1560, bold:true, fill:'EDF1F7' }), cell('Marketing Manager', { w:3120 })] }),
          new TableRow({ children: [cell('Submitted to', { w:1560, bold:true, fill:'EDF1F7' }), cell('[ NAMA PENGURUSAN ]', { w:3120 }), cell('Status', { w:1560, bold:true, fill:'EDF1F7' }), cell('For approval', { w:3120 })] }),
        ] }),

      h1('PART 1  ·  PURPOSE AND SCOPE'),
      p('Customer feedback about Superbowl Lipis is published in places the business does not own — Google reviews, TikTok and Instagram comments, Facebook posts. It is read by people deciding whether to visit or buy, and it stays visible indefinitely.'),
      p('Feedback has so far been answered case by case, by whoever saw it first. There is no severity standard, no record of what was said or how quickly, and no route from a good review to published content. This plan establishes all three, covering complaints (Part 3), compliments (Part 4) and the wider community (Part 5).'),
      p('Approval is sought for the response standards in Part 3, the task assignments in Parts 4 and 5, and the reporting cycle in Part 6.'),

      h1('PART 2  ·  CHANNELS MONITORED'),
      p('Four channels carry public feedback. Each has a named owner and a checking frequency, so that nothing depends on someone happening to notice it.'),
      table(['Channel', 'What appears there', 'Checked', 'Owner'], [
        ['Google Business Profile', 'Star reviews and written reviews', 'Daily', 'Marketing Manager'],
        ['TikTok', 'Video comments, direct messages', 'Daily', 'Marketing team'],
        ['Instagram', 'Post comments, story replies, DMs', 'Daily', 'Marketing team'],
        ['Facebook Page', 'Post comments, page messages', 'Daily', 'Marketing team'],
      ], [2500, 3660, 1400, 1800]),
      p('Google is treated as the priority channel. A review there is permanent, is shown next to the business name in search results, and cannot be removed by the business.', { before: 100 }),
      gap('Google Business Profile — paparan pengurusan menunjukkan profil dituntut dan diurus (nama perniagaan, kategori, waktu operasi, gambar)'),

      h1('PART 3  ·  HANDLING CUSTOMER COMPLAINTS  (W01)'),
      p('3.1   Types and sources', { bold: true, after: 90 }),
      p('Complaints are classified on arrival so that the register can later show where problems cluster rather than only that they occurred.'),
      table(['Type', 'Typical source'], [
        ['Product or food quality', 'Google review, Facebook comment'],
        ['Service or staff conduct', 'Google review, direct message'],
        ['Facility condition or cleanliness', 'Google review, Instagram comment'],
        ['Pricing or billing dispute', 'Direct message, in-person escalated online'],
        ['Delivery or order fulfilment', 'TikTok Shop, direct message'],
      ], [3400, 5960]),

      p('3.2   Severity and response standard', { bold: true, before: 160, after: 90 }),
      p('Severity is graded on public exposure and on how much harm the complaint alleges — not on how strongly it is worded. The grade sets the response deadline.'),
      img('cu7_severity.png', 430, 168),
      cap('Figure 1 — Target time to first public response, by severity level'),
      table(['Level', 'Definition', 'Escalation'], [
        ['L1  Routine', 'One customer, one ordinary dissatisfaction, no wider claim', 'Handled by the team member on duty'],
        ['L2  Material', 'Service failure affecting the visit or order; or a repeat of an L1 already seen', 'Marketing Manager informed same day'],
        ['L3  Serious', 'Safety, hygiene, legal or discrimination allegation; or content gaining traction publicly', 'Management notified before any public reply'],
      ], [1700, 4900, 2760]),
      p('An L3 complaint is never answered by the person who received it. The reply is agreed with management first, because an early wrong answer to a serious allegation is harder to undo than a slow one.', { before: 100 }),

      p('3.3   Handling procedure', { bold: true, before: 160, after: 90 }),
      img('cu7_flow.png', 490, 139),
      cap('Figure 2 — Complaint handling procedure, applied to every channel'),
      p('The public reply acknowledges the complaint and offers a route to resolve it; the resolution itself moves to a private channel. This keeps the customer\'s details out of public view while leaving visible evidence that the business responded.', { before: 90 }),

      p('3.4   Response record', { bold: true, before: 160, after: 90 }),
      p('Every complaint is entered in a register with a ticket reference, so that response time is measurable rather than remembered. The register carries: ticket ID, date received, channel, type, severity, action taken, owner, date closed, and elapsed response time.'),
      gap('ulasan negatif di Google Business Profile berserta balasan pemilik — kedua-duanya dalam satu imej supaya jurang masa balasan kelihatan'),
      gap('aduan di saluran kedua (komen TikTok / Instagram / Facebook) berserta balasan anda'),
      gap('rangkaian penyelesaian secara peribadi (WhatsApp / DM) — tutup nama, nombor telefon dan alamat pelanggan'),
      gap('daftar aduan / tiket — ID tiket, tarikh terima, saluran, jenis, tahap, tindakan, pemilik, tarikh tutup, masa balasan'),

      p('3.5   Complaint report', { bold: true, before: 160, after: 90 }),
      p('A complaint report is submitted to management monthly, and immediately for any L3. It states what was received, what was done, how long it took, and whether the customer\'s position changed after the response.'),
      gap('laporan aduan seperti yang dihantar kepada penyelia, berserta bukti penghantaran bertarikh'),

      h1('PART 4  ·  HANDLING CUSTOMER COMPLIMENTS  (W02)'),
      p('4.1   Why compliments are handled at all', { bold: true, after: 90 }),
      p('A compliment answered and then left in place is worth only the goodwill of the reply. The same compliment republished as content reaches people who were never going to read the review. Compliments are therefore treated as a content source, not only as correspondence.'),

      p('4.2   Compilation and repurposing', { bold: true, before: 140, after: 90 }),
      p('Compliments are collected weekly from all four channels into a single file, then routed to the placements below.'),
      img('cu7_repurpose.png', 470, 176),
      cap('Figure 3 — Routing a compliment from receipt to published content'),
      table(['Placement', 'Form', 'Owner'], [
        ['Instagram Story', 'Screenshot of the review, brand frame, thanks caption', 'Marketing team'],
        ['TikTok video', 'Review text overlaid on relevant footage', 'Marketing team'],
        ['Facebook post', 'Review card graphic', 'Marketing team'],
        ['Website and Google listing', 'Social proof block; reply visible under the review', 'Marketing Manager'],
      ], [2500, 4860, 2000]),

      p('4.3   Schedule and assignment', { bold: true, before: 160, after: 90 }),
      table(['Step', 'Timing', 'Owner'], [
        ['Reply to the compliment publicly', 'Within 24 hours of receipt', 'Team member on duty'],
        ['Add to the compilation file', 'Same week', 'Marketing team'],
        ['Ask permission where a name or face is shown', 'Before publishing', 'Marketing Manager'],
        ['Produce and schedule the content', 'Following week', 'Marketing team'],
        ['Publish', 'Per content calendar', 'Marketing team'],
      ], [3900, 3060, 2400]),
      p('Permission is asked before a reviewer\'s name, photograph or handle is reused. A public review can be quoted, but republishing it as promotional content is a different act and is treated as one.', { before: 100 }),

      p('4.4   Assessing effectiveness', { bold: true, before: 160, after: 90 }),
      p('Republished testimonials are measured against ordinary posts on the same channel over the same period. If testimonial content does not perform at least as well, the format is changed rather than the practice abandoned.'),
      gap('ulasan positif (bintang penuh) di Google Business Profile berserta balasan pemilik'),
      gap('komen pujian di TikTok dan Instagram berserta balasan anda — sekurang-kurangnya dua rangkaian'),
      gap('fail kompilasi pujian daripada pelbagai saluran'),
      gap('kandungan pujian yang telah diterbitkan semula (Story / video / siaran) — versi tersiar, bukan draf'),
      gap('baris kalendar kandungan bagi kandungan testimoni — tarikh, saluran dan orang yang ditugaskan'),
      gap('analitik siaran testimoni tersebut — tontonan, jangkauan atau penglibatan'),
      gap('laporan pujian seperti yang dihantar kepada penyelia, berserta bukti penghantaran bertarikh'),

      h1('PART 5  ·  HANDLING THE ONLINE COMMUNITY  (W03)'),
      p('5.1   Community categories and marketing direction', { bold: true, after: 90 }),
      p('The audience is not one group, and the reason for engaging differs by group. Response priority follows commercial value, not comment volume.'),
      table(['Category', 'Who they are', 'Direction'], [
        ['Customers', 'Have visited or bought', 'Retain — answer first, invite back'],
        ['Local followers', 'Kuala Lipis and Pahang, not yet customers', 'Convert — answer questions about price, hours, location'],
        ['Wider followers', 'Follow the content, unlikely to visit', 'Reach — engage to sustain distribution'],
        ['Detractors', 'Persistently negative or off-topic', 'Contain — reply once, then moderate'],
      ], [1900, 3400, 4060]),

      p('5.2   Communication channels', { bold: true, before: 160, after: 90 }),
      p('Comment threads and direct messages on TikTok, Instagram and Facebook carry the day-to-day community. TikTok LIVE is used where live interaction is appropriate. Podcast and streaming formats are not in use and are not claimed.'),

      p('5.3   Strategies plan', { bold: true, before: 160, after: 90 }),
      table(['Strategy', 'Action'], [
        ['Reply to every question', 'Any comment containing a question is answered — price, hours, availability, location'],
        ['Pin the best comment', 'A pinned comment steers the thread and answers the question most people ask'],
        ['Turn recurring questions into content', 'A question asked three times becomes a post, not a fourth reply'],
        ['Moderate rather than argue', 'Hide abusive or unrelated comments; reply once to criticism, then leave it'],
        ['Reply from the brand account only', 'Personal accounts are not used to respond on the brand\'s behalf'],
      ], [3100, 6260]),

      p('5.4   Cycle, monitoring and assessment', { bold: true, before: 160, after: 90 }),
      img('cu7_cycle.png', 250, 250),
      cap('Figure 4 — Weekly community management cycle'),
      table(['Measure', 'Source', 'Frequency'], [
        ['Comments and messages received', 'Platform inbox', 'Weekly'],
        ['Proportion answered', 'Inbox against replies sent', 'Weekly'],
        ['Time to first reply', 'Complaint and comment register', 'Weekly'],
        ['Follower trend', 'TikTok Analytics, Instagram Insights', 'Monthly'],
        ['Review count and rating', 'Google Business Profile', 'Monthly'],
      ], [3200, 3600, 2560]),
      gap('bilangan pengikut bagi setiap saluran — TikTok, Instagram, Facebook (satu imej setiap platform, tunjukkan nama pengguna)'),
      gap('jumlah mesej dan komen masuk di peti masuk — beban kerja pengurusan komuniti sebenar'),
      gap('bukti moderasi — komen yang disemat, komen yang dibalas, dan komen yang disembunyikan jika ada'),
      gap('saluran siaran langsung atau kumpulan komuniti (TikTok LIVE / WhatsApp / Telegram) — tutup nombor ahli'),
      gap('jadual tugasan pemantauan komuniti — siapa memantau saluran mana, pada hari dan waktu apa'),
      gap('analitik komuniti — trend pengikut dan waktu aktif sepanjang tempoh'),
      gap('laporan strategi komuniti seperti yang dihantar kepada penyelia, berserta bukti penghantaran bertarikh'),

      h1('PART 6  ·  REPORTING'),
      p('Three reports are produced. Each is submitted to management within the time frame stated, and each is filed so that the following month\'s report can be compared against it.'),
      table(['Report', 'Contents', 'Submitted'], [
        ['Complaint report', 'Complaints by type and severity, actions taken, response times, outcomes', 'Monthly; immediately for any L3'],
        ['Compliment report', 'Compliments received, content republished, placements and performance', 'Monthly'],
        ['Community report', 'Volume, proportion answered, follower trend, moderation actions, plan effectiveness', 'Monthly'],
      ], [2100, 5060, 2200]),

      h1('PART 7  ·  RESOURCES AND RISKS'),
      table(['Item', 'Requirement', 'Responsibility'], [
        ['Channel access', 'Admin access to Google, TikTok, Instagram, Facebook', 'Marketing Manager'],
        ['Register and reports', 'Shared file with fixed columns and report format', 'Marketing Manager'],
        ['Staff time', 'Daily monitoring and response across four channels', 'Marketing team'],
        ['Escalation contact', 'Named person reachable for L3 within the hour', 'Management'],
      ], [2100, 4760, 2500]),
      p(''),
      p('[ ISI: anggaran masa staf mingguan dan sebarang kos alat pemantauan ]', { bold: true, color: RED, after: 140 }),
      table(['Risk', 'Mitigation'], [
        ['A serious complaint answered badly under time pressure', 'L3 replies are agreed with management before posting'],
        ['Response depends on one person', 'Named owner per channel with a stated backup'],
        ['Reviews cannot be removed once published', 'Speed and visible resolution, not deletion requests'],
        ['Republishing a review without consent', 'Permission requested before a name or face is reused'],
        ['Complaint volume outgrows manual monitoring', 'Review the register monthly; add saved replies or alerts if volume rises'],
      ], [3400, 5960]),

      h1('PART 8  ·  APPROVAL'),
      p('Approval authorises the response standards in Part 3, the assignments in Parts 4 and 5, and the reporting cycle in Part 6.', { after: 160 }),
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
