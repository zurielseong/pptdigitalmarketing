// JPK PPT forms for DKM — NOSS M731-001-4:2021, Digital Marketing Planning and Implementation
const { Document, Packer, Paragraph, TextRun, AlignmentType, PageBreak, Table, TableRow,
        TableCell, WidthType, ShadingType, ImageRun, convertInchesToTwip, BorderStyle,
        VerticalAlign, Footer, PageNumber } = require('docx');
const fs = require('fs');
const F = 'Arial', HD = 'D9D9D9';

const p = (t, o = {}) => new Paragraph({
  children: [new TextRun({ text: t, font: F, size: o.size || 19, bold: o.bold, italics: o.italics, color: o.color })],
  alignment: o.align || AlignmentType.LEFT, spacing: { line: 250, before: o.before || 0, after: o.after === undefined ? 90 : o.after },
});
const bul = (t) => new Paragraph({
  children: [new TextRun({ text: t, font: F, size: 17 })],
  bullet: { level: 0 }, spacing: { line: 230, after: 55 },
});
const cell = (t, o = {}) => new TableCell({
  width: { size: o.w || 2000, type: WidthType.DXA },
  columnSpan: o.span, verticalAlign: VerticalAlign.CENTER,
  shading: o.fill ? { type: ShadingType.CLEAR, color: 'auto', fill: o.fill } : undefined,
  margins: { top: 60, bottom: 60, left: 80, right: 80 },
  children: Array.isArray(t) ? t : [new Paragraph({
    children: [new TextRun({ text: String(t), font: F, size: o.size || 17, bold: o.bold, color: o.color })],
    alignment: o.align || AlignmentType.LEFT, spacing: { line: 230, after: 0 },
  })],
});
const table = (rows, w) => new Table({ width: { size: 9500, type: WidthType.DXA }, columnWidths: w, rows });
const hrow = (cells, w) => new TableRow({ tableHeader: true, children: cells.map((c, i) => cell(c, { w: w[i], bold: true, fill: HD, align: AlignmentType.CENTER })) });
const row = (cells, w, o = {}) => new TableRow({ children: cells.map((c, i) => cell(c, { w: w[i], ...(o[i] || {}) })) });

const title = (t, o = {}) => new Paragraph({
  children: [new TextRun({ text: t, font: F, size: o.size || 22, bold: true })],
  alignment: AlignmentType.CENTER, spacing: { before: o.before || 0, after: o.after === undefined ? 120 : o.after },
});
const formCode = (c) => new Paragraph({
  children: [new TextRun({ text: c, font: F, size: 15 })],
  alignment: AlignmentType.RIGHT, spacing: { after: 60 },
});
const sechead = (t) => new Paragraph({
  children: [new TextRun({ text: t, font: F, size: 19, bold: true })],
  spacing: { before: 220, after: 100 },
});
const nb = () => new Paragraph({ children: [new PageBreak()] });
const img = (f, w, h) => new Paragraph({
  children: [new ImageRun({ type: 'png', data: fs.readFileSync(f), transformation: { width: w, height: h } })],
  alignment: AlignmentType.CENTER, spacing: { before: 120, after: 120 },
});
const divider = (t) => ([
  nb(),
  new Paragraph({ text: '', spacing: { after: 2600 } }),
  new Paragraph({ children: [new TextRun({ text: t, font: F, size: 30, bold: true })],
    alignment: AlignmentType.CENTER, spacing: { after: 200 } }),
  new Paragraph({ children: [new TextRun({ text: 'KANDUNGAN DAN SUSUNAN PORTFOLIO', font: F, size: 18, color: '666666' })],
    alignment: AlignmentType.CENTER }),
]);

// ── candidate ────────────────────────────────────────────────────────────────
const NAMA = 'ZURIEL SEONG MING EE';
const KP = '980926-56-5571';
const KOD = 'M731-001-4:2021';
const TAJUK = 'DIGITAL MARKETING PLANNING AND IMPLEMENTATION';

// ── NOSS structure ───────────────────────────────────────────────────────────
const CUS = [
  { kod: 'C01', nama: 'IMPLEMENT SOCIAL MEDIA MARKETING CAMPAIGN PLAN', from: 4, tempoh: '5 TAHUN\n(Mei 2021 – kini)',
    was: ['Determine Social Media Marketing Channel','Plan Social Media Marketing Campaign Content Calendar',
          'Prepare Social Media Marketing Campaign Plan','Coordinate Social Media Marketing Campaign Implementation',
          'Prepare Social Media Paid Advertisement Campaign Proposal','Optimise Social Media Marketing Campaign Performance'],
    ring: [
      'Mendapat pengalaman CU ini semasa menentukan saluran media sosial bagi kempen pengambilan pelajar TVET Lipis, dengan membandingkan saiz audiens sedia ada antara TikTok (13,800 pengikut) dan Instagram (165 pengikut) sebelum menetapkan TikTok sebagai saluran organik utama dan Meta sebagai saluran penjanaan prospek berbayar.',
      'Mendapat pengalaman CU ini semasa merancang kalendar kandungan bagi tempoh April hingga September 2025, merangkumi enam tema kandungan, format video pendek dan poster grafik, serta jadual penerbitan mingguan bagi TikTok, Instagram dan Facebook.',
      'Mendapat pengalaman CU ini semasa menyediakan pelan kempen yang menetapkan objektif, segmen audiens (pelajar 17–28 tahun dan ibu bapa 40–60 tahun), lokasi sasaran, tempoh, belanjawan serta penanda aras kos pengambilan pelajar sebanyak RM500.',
      'Mendapat pengalaman CU ini semasa menyelaras pelaksanaan kempen di TVET Lipis — menerbitkan kandungan mengikut kalendar, melancarkan Meta Ads pada April 2025 dan TikTok Ads pada Jun 2025, serta memastikan setiap prospek disalurkan terus ke Sistem CRM melalui borang prospek segera.',
      'Mendapat pengalaman CU ini semasa menyediakan cadangan kempen iklan berbayar dengan pengagihan belanjawan RM11,267.97 antara Meta Ads dan TikTok Ads, parameter sasaran mengikut umur dan lokasi, serta sasaran kos setiap pelajar berdaftar di bawah RM500.',
      'Mendapat pengalaman CU ini semasa mengoptimumkan prestasi kempen melalui semakan bulanan, mengenal pasti kos setiap prospek TikTok (RM2.06) lebih rendah berbanding Meta (RM3.83), dan memindahkan belanjawan antara platform. Kempen menjana 3,470 prospek dan 76 pelajar berdaftar pada kos RM154.36 setiap pelajar.',
    ] },
  { kod: 'C02', nama: 'IMPLEMENT SEARCH ENGINE OPTIMISATION (SEO) PLAN', from: 10, tempoh: '5 TAHUN\n(Mei 2021 – kini)',
    was: ['Analyse SEO Channel Performance','Prepare SEO Campaign Plan','Prepare SEO Improvement Plan','Coordinate SEO Implementation'],
    ring: [
      'Mendapat pengalaman CU ini semasa menganalisis prestasi saluran carian organik laman web tvetlipis.my menggunakan Google Search Console bagi tempoh 16 bulan — 1,050 klik, 14,100 tayangan, kadar klik 7.4% dan kedudukan purata 3.7 — serta mengenal pasti bahawa kesemua pertanyaan carian adalah istilah jenama sahaja.',
      'Mendapat pengalaman CU ini semasa menyediakan pelan kempen SEO yang menyasarkan pertanyaan bukan jenama seperti nama program dan istilah lokasi, disokong penyelidikan kata kunci, serta mencadangkan struktur satu halaman bagi setiap program.',
      'Mendapat pengalaman CU ini semasa menyediakan pelan penambahbaikan SEO — mengenal pasti masalah pengindeksan “Crawled – currently not indexed”, punca kandungan dipaparkan sebagai grafik dan bukan teks, serta menetapkan tindakan pembetulan mengikut urutan kebergantungan.',
      'Mendapat pengalaman CU ini semasa menyelaras pelaksanaan SEO — mengesahkan hak milik laman dalam Search Console, menguruskan Cloudflare, membina Profil Perniagaan Google (748 interaksi pelanggan), serta memantau status pengindeksan halaman.',
    ] },
  { kod: 'C03', nama: 'IMPLEMENT SEARCH ENGINE MARKETING (SEM) PLAN', from: 14, tempoh: '2 TAHUN\n(2024 – kini)',
    was: ['Prepare SEM Campaign Plan','Implement SEM Campaign Plan','Optimise SEM Campaign Performance'],
    ring: [
      'Mendapat pengalaman CU ini semasa menyediakan pelan kempen SEM bagi TVET Lipis — menetapkan objektif kedudukan carian bagi istilah kategori dan nama program, memilih jenis kempen Smart campaign, serta menetapkan penanda aras kos pengambilan pelajar di bawah RM500.',
      'Mendapat pengalaman CU ini semasa melaksanakan kempen Google Ads “Hub Pendidikan TVET Kemahiran” pada akaun 245-694-3044 dari 26 Mei hingga 28 Julai 2025, dengan perbelanjaan RM150.06 menghasilkan 7,267 tayangan, 217 klik dan 115 tindakan setempat.',
      'Mendapat pengalaman CU ini semasa memantau prestasi kempen, mengenal pasti bahawa penjejakan penukaran tidak dikonfigurasi dan halaman pendaratan tidak mempunyai borang pertanyaan, serta memutuskan untuk memindahkan belanjawan kepada pemasaran media sosial yang menjana prospek pada RM3.25 setiap satu.',
    ] },
  { kod: 'C04', nama: 'IMPLEMENT E-COMMERCE MARKETING PLAN', from: 17, tempoh: '2 TAHUN\n(2024 – kini)',
    was: ['Determine E-Commerce Channel','Plan E-Commerce Marketing Campaign Content Calendar','Prepare E-Commerce Campaign Plan',
          'Coordinate E-Commerce Campaign Implementation','Prepare E-Commerce Paid Advertisement Campaign Proposal','Optimise E-Commerce Marketing Campaign Performance'],
    ring: [
      'Mendapat pengalaman CU ini semasa menentukan saluran e-dagang bagi Superbowl Lipis, memilih TikTok Shop atas asas integrasi terus dengan kandungan sedia ada, audiens tempatan yang telah wujud serta ketiadaan kos pembinaan platform.',
      'Mendapat pengalaman CU ini semasa merancang kalendar kandungan e-dagang — menetapkan lima tema kandungan, menjalankan sesi fotografi produk pada September 2025, menghasilkan video pelancaran koleksi, dan menyelaras penerbitan dengan promosi Oktober 2025.',
      'Mendapat pengalaman CU ini semasa menyediakan pelan kempen e-dagang yang menetapkan objektif, segmen audiens, fasa pelaksanaan dan kaedah pengukuran bagi kedai TikTok Shop.',
      'Mendapat pengalaman CU ini semasa menyelaras pelaksanaan kedai — menguruskan 18 pesanan melalui Seller Centre, menyediakan label penghantaran melalui logistik platform, serta mengekalkan kadar maklum balas pelanggan 100% dalam tempoh 12 jam.',
      'Mendapat pengalaman CU ini semasa menyediakan cadangan kempen iklan berbayar TikTok Ads jenis GMV Max dengan belanjawan harian RM30.00 dan sasaran pulangan iklan 2.00.',
      'Mendapat pengalaman CU ini semasa mengoptimumkan prestasi kempen — mengenal pasti pulangan sebenar 1.00 berbanding sasaran 2.00, mengaktifkan Jualan Kilat pada 3 Oktober 2025 sebagai tindakan pembetulan, dan seterusnya menghentikan iklan berbayar apabila kekangan dikenal pasti sebagai pengiktirafan jenama dan bukan harga.',
    ] },
  { kod: 'C05', nama: 'IMPLEMENT MOBILE MARKETING PLAN', from: 23, tempoh: '2 TAHUN\n(2024 – kini)',
    was: ['Determine Mobile Marketing Channel','Plan Mobile Marketing Campaign Content Calendar','Prepare Mobile Marketing Campaign Plan',
          'Coordinate Mobile Marketing Campaign Implementation','Prepare Mobile Application (App) Marketing Campaign Proposal','Optimise Mobile Marketing Campaign Performance'],
    ring: [
      'Mendapat pengalaman CU ini semasa menentukan saluran pemasaran mudah alih bagi TVET Lipis, memilih WhatsApp melalui akaun WhatsApp Business API (nombor perniagaan 60108086630) di bawah langganan LuluChat, berbanding SMS dan telefon.',
      'Mendapat pengalaman CU ini semasa merancang kalendar kandungan siaran mengikut kitaran pengambilan pelajar, merangkumi tema pengumuman kemasukan, susulan keputusan SPM, sorotan program dan pembiayaan PTPK.',
      'Mendapat pengalaman CU ini semasa menyediakan pelan kempen mudah alih — menetapkan objektif, segmen prospek, standard maklum balas, serta kawalan peringkat prospek dalam Sistem CRM (Lead, Contacted, Potential, Customer, Cold, Email Pool, KIV).',
      'Mendapat pengalaman CU ini semasa menyelaras pelaksanaan — menghubungi prospek satu persatu daripada CRM melalui WhatsApp, menghantar siaran berjadual, dan merekodkan hasil perbualan pada rekod prospek.',
      'Mendapat pengalaman CU ini semasa mengendalikan kempen pemasaran melalui aplikasi mudah alih LuluChat, termasuk pengurusan tab prospek, tag program, templat mesej pertama dan penghantaran siaran.',
      'Mendapat pengalaman CU ini semasa mengoptimumkan prestasi kempen — mengenal pasti 1,751 prospek yang telah dihubungi tetapi tidak pernah dihubungi semula, dan membina modul penyasaran semula dalam CRM dengan had tiga percubaan WhatsApp sebelum prospek dipindahkan ke pemasaran e-mel.',
    ] },
  { kod: 'C06', nama: 'IMPLEMENT EMAIL MARKETING PLAN', from: 29, tempoh: '2 TAHUN\n(2024 – kini)',
    was: ['Prepare Email Marketing Customer List','Plan Email Marketing Campaign Content Calendar','Prepare Email Marketing Campaign Plan',
          'Coordinate Email Marketing Campaign Implementation','Prepare Email Paid Advertisement Campaign Proposal','Optimise Email Marketing Campaign Performance'],
    ring: [
      'Mendapat pengalaman CU ini semasa menyediakan senarai pelanggan e-mel TVET Lipis dalam platform Mailchimp — 100 kenalan yang dilabel mengikut kumpulan Student (73), Student Program (16) dan Staff (10).',
      'Mendapat pengalaman CU ini semasa merancang kalendar kandungan e-mel bagi tahun 2025, satu penghantaran sebulan pada hari Sabtu, diselaraskan dengan kitaran pengambilan pelajar.',
      'Mendapat pengalaman CU ini semasa menyediakan pelan kempen e-mel yang menetapkan objektif, segmen penerima, tema kandungan dan kaedah pengukuran.',
      'Mendapat pengalaman CU ini semasa menyelaras pelaksanaan kempen “Hari Terbuka TVET Lipis” pada 4 Oktober 2025 — penghantaran pengesahan kepada segmen Staff (10 penerima) pada 03:45 sebelum penghantaran penuh kepada 101 penerima pada 04:06, serta penyelarasan butiran acara merentas saluran WhatsApp dan media sosial.',
      'Mendapat pengalaman CU ini semasa menyediakan cadangan promosi berbayar bagi kempen e-mel dan penyelarasannya dengan saluran pemasaran lain.',
      'Mendapat pengalaman CU ini semasa mengoptimumkan prestasi kempen e-mel melalui semakan kadar buka dan kadar klik selepas setiap penghantaran, serta penambahbaikan segmen penerima.',
    ] },
  { kod: 'C07', nama: 'MANAGE ONLINE REPUTATION', from: 35, tempoh: '5 TAHUN\n(Mei 2021 – kini)',
    was: ['Handle Online Customer Complaint','Handle Online Customer Compliment','Handle Online Community'],
    ring: [
      'Mendapat pengalaman CU ini semasa mengendalikan aduan pelanggan dalam talian melalui komen media sosial, mesej terus dan ulasan Google, termasuk memberi maklum balas serta menyelesaikan isu yang dibangkitkan.',
      'Mendapat pengalaman CU ini semasa mengendalikan pujian dan ulasan positif pelanggan dalam talian, memberi penghargaan serta menggunakan maklum balas tersebut sebagai kandungan sosial.',
      'Mendapat pengalaman CU ini semasa menguruskan komuniti dalam talian — menyederhanakan komen, menjawab pertanyaan awam dan mengekalkan nada komunikasi rasmi institusi merentas platform TikTok, Instagram dan Facebook.',
    ] },
];

const DOCNAMES = {
  C01: ['Social Media Channel Selection Report','Social Media Content Calendar Report','Social Media Campaign Plan',
        'Campaign Implementation Coordination Report','Paid Advertisement Proposal and Implementation Record','Campaign Performance Optimisation Report'],
  C02: ['SEO Channel Performance Analysis','SEO Campaign Plan','SEO Improvement Plan','SEO Implementation Coordination Report'],
  C03: ['SEM Campaign Plan','SEM Campaign Implementation Report','SEM Campaign Performance Optimisation Report'],
  C04: ['E-Commerce Channel Selection Proposal','Content Calendar Implementation Report','E-Commerce Campaign Plan',
        'Implementation Coordination Report','Paid Advertisement Proposal and Implementation Record','Campaign Performance Optimisation Report'],
  C05: ['Mobile Marketing Channel Selection Report','Mobile Marketing Content Calendar Report','Mobile Marketing Campaign Plan',
        'Mobile Campaign Implementation Coordination Report','Mobile Application Marketing Campaign Report','Mobile Campaign Performance Optimisation Report'],
  C06: ['Email Marketing Customer List','Email Marketing Content Calendar 2025','Email Marketing Campaign Plan',
        'Email Marketing Implementation Coordination Report','Email Paid Advertisement Campaign Proposal','Email Marketing Performance Optimisation Report'],
  C07: ['Online Customer Complaint Handling Record','Online Customer Compliment Handling Record','Online Community Management Record'],
};

const pad = (n) => String(n).padStart(2, '0');

// ── (B) evidence list ────────────────────────────────────────────────────────
const buktiRows = [];
let bil = 1;
buktiRows.push(['1','Resume','01']);
buktiRows.push(['2','Borang Akuan / Dokumen Perakuan Tempoh Pengalaman Kerja','02']);
buktiRows.push(['3','Laporan Projek DKM (LPKT) — Perancangan dan Pelaksanaan Kempen Pemasaran Media Sosial bagi Meningkatkan Pengambilan Pelajar Baharu di TVET Lipis','03']);
bil = 4;
CUS.forEach(cu => {
  cu.was.forEach((wa, i) => {
    buktiRows.push([String(bil), `${cu.kod} W0${i + 1} — ${DOCNAMES[cu.kod][i]}`, pad(cu.from + i)]);
    bil++;
  });
});

// ── build ────────────────────────────────────────────────────────────────────
const W4 = [1900, 2900, 1900, 2800];
const body = [];

// cover
body.push(
  title('JABATAN PEMBANGUNAN KEMAHIRAN', { size: 24, before: 700 }),
  title('KEMENTERIAN SUMBER MANUSIA, MALAYSIA', { size: 22, after: 700 }),
  title('PORTFOLIO PENGIKTIRAFAN PENCAPAIAN TERDAHULU (PPT)', { size: 28, after: 600 }),
  table([
    row(['NAMA CALON', NAMA], [3000, 6500], { 0: { bold: true, fill: HD } }),
    row(['NO. KAD PENGENALAN', KP], [3000, 6500], { 0: { bold: true, fill: HD } }),
    row(['KOD PROGRAM', KOD], [3000, 6500], { 0: { bold: true, fill: HD } }),
    row(['NAMA PROGRAM', TAJUK], [3000, 6500], { 0: { bold: true, fill: HD } }),
    row(['TAHAP', 'TAHAP 4 — DIPLOMA KEMAHIRAN MALAYSIA (DKM)'], [3000, 6500], { 0: { bold: true, fill: HD } }),
  ], [3000, 6500]),
);

// contents
body.push(nb(), title('KANDUNGAN DAN SUSUNAN PORTFOLIO', { size: 26, after: 250 }));
const contents = [
  'BORANG PERMOHONAN PERSIJILAN KEMAHIRAN MALAYSIA MELALUI KAEDAH PENGIKTIRAFAN PENCAPAIAN TERDAHULU (PPT)',
  'SALINAN KAD PENGENALAN',
  'SLIP PENDAFTARAN CALON PPT DAN PENUGASAN PP-PPT',
  'SURAT AKUAN PENGESAHAN CALON',
  'SALINAN SKM TERTINGGI YANG DIMILIKI (SKM TAHAP 3)',
  'DOKUMEN PERAKUAN TEMPOH PENGALAMAN KERJA DALAM BIDANG KEMAHIRAN YANG DIPOHON',
  'CARTA ORGANISASI TEMPAT KERJA',
  'CARTA PROFIL PEKERJAAN (JPC) / CARTA PROFIL KOMPETENSI (CPC)',
  'LAPORAN PENILAIAN KETERAMPILAN CALON MELALUI KAEDAH PPT (PENILAIAN PORTFOLIO)',
  'BUKTI-BUKTI KETERAMPILAN CALON MENGIKUT UNIT KOMPETENSI (CU)',
  'LAPORAN PENGALAMAN KETERAMPILAN TERDAHULU (LPKT)',
];
body.push(table([
  hrow(['BIL.', 'PERKARA'], [1100, 8400]),
  ...contents.map((c, i) => row([String(i + 1), c], [1100, 8400], { 0: { align: AlignmentType.CENTER } })),
], [1100, 8400]));

// ── JPK/PPT/3.5 ──────────────────────────────────────────────────────────────
body.push(...divider('BORANG PERMOHONAN PERSIJILAN KEMAHIRAN MALAYSIA\nMELALUI KAEDAH PENGIKTIRAFAN PENCAPAIAN TERDAHULU (PPT)'));
body.push(nb(), formCode('JPK/PPT/3/5-2021'),
  title('JABATAN PEMBANGUNAN KEMAHIRAN', { size: 20 }),
  title('Kementerian Sumber Manusia, Malaysia', { size: 18, after: 160 }),
  title('PERMOHONAN PERSIJILAN KEMAHIRAN MALAYSIA', { size: 20 }),
  title('MELALUI KAEDAH PENGIKTIRAFAN PENCAPAIAN TERDAHULU (PPT)', { size: 20, after: 200 }),
  sechead('(A)  MAKLUMAT CALON (Diisi oleh calon)'),
  table([
    row(['NO. PENDAFTARAN', '500872', 'Pengesahan Calon\n\nAdalah dengan ini, saya mengesahkan bahawa segala maklumat ini adalah betul.\n\n\n..............................\nTandatangan'], [2400, 4100, 3000], { 0: { bold: true, fill: HD } }),
    row(['NAMA PENUH', NAMA], [2400, 7100], { 0: { bold: true, fill: HD } }),
    row(['NO. KAD PENGENALAN\n(SILA BAWA KAD PENGENALAN ASAL)', KP], [2400, 7100], { 0: { bold: true, fill: HD } }),
    row(['ALAMAT SURAT-MENYURAT', 'No. 60, Taman Permai, 27200 Kuala Lipis, Pahang'], [2400, 7100], { 0: { bold: true, fill: HD } }),
    row(['No. Telefon (Bimbit)', '[ ISI ]'], [2400, 7100], { 0: { bold: true, fill: HD } }),
  ], [2400, 7100]),
  sechead('(B)  MAKLUMAT PERMOHONAN PERSIJILAN (Diisi oleh calon)'),
  table([
    row(['Kod NOSS', KOD], [2400, 7100], { 0: { bold: true, fill: HD } }),
    row(['Tajuk NOSS', TAJUK], [2400, 7100], { 0: { bold: true, fill: HD } }),
    row(['Tahap', 'TAHAP 4 (DKM)'], [2400, 7100], { 0: { bold: true, fill: HD } }),
    row(['Kaedah persijilan', 'Mengikut Tahap  [ √ ]        Single Tier  [   ]        Modular  [   ]'], [2400, 7100], { 0: { bold: true, fill: HD } }),
  ], [2400, 7100]),
  sechead('C1:  PENILAIAN PORTFOLIO'),
  p('Arahan : Tandakan ( √ ) bagi CU/ Duti yang TERAMPIL atau ( x ) jika TIDAK TERAMPIL', { size: 17 }),
  p('KOMPETENSI TERAS (CORE COMPETENCY)', { bold: true, size: 17, before: 100 }),
  table([
    hrow(['Kod CU / Duti\n(Dilengkapkan oleh Calon)', 'Unit Kompetensi (CU) / Nama Duti\n(Dilengkapkan oleh Calon)', 'Tanda ( √ / x )\n(Diisi oleh PPL-PPT)'], [2400, 5100, 2000]),
    ...CUS.map(cu => row([`${KOD} - ${cu.kod}`, cu.nama, ''], [2400, 5100, 2000])),
  ], [2400, 5100, 2000]),
  p('Nota: NOSS M731-001-4:2021 tidak mempunyai kompetensi elektif. Kesemua tujuh (7) unit kompetensi di atas adalah kompetensi teras.', { size: 16, italics: true, before: 120, color: '444444' }),
);

// ── attachments ──────────────────────────────────────────────────────────────
body.push(...divider('SALINAN KAD PENGENALAN'), nb(), img('doc_ic.png', 300, 425));
body.push(...divider('SLIP PENDAFTARAN CALON PPT DAN PENUGASAN PP-PPT'), nb(),
  img('doc_slip1.png', 300, 425), nb(), img('doc_slip2.png', 300, 425), nb(), img('doc_slip3.png', 300, 425));
body.push(...divider('SURAT AKUAN PENGESAHAN CALON'), nb(), img('doc_akuan.png', 330, 429));
body.push(...divider('SALINAN SKM TERTINGGI YANG DIMILIKI\n(SIJIL KEMAHIRAN MALAYSIA TAHAP 3)'), nb(),
  p('[ LAMPIRKAN SALINAN SIJIL KEMAHIRAN MALAYSIA TAHAP 3 — M731-001-3:2021 DIGITAL MARKETING OPERATION ]', { bold: true, color: 'C00000', align: AlignmentType.CENTER, before: 2000 }));
body.push(...divider('DOKUMEN PERAKUAN TEMPOH PENGALAMAN KERJA\nDALAM BIDANG KEMAHIRAN YANG DIPOHON'), nb(), img('doc_pengalaman.png', 330, 443));
body.push(...divider('CARTA ORGANISASI TEMPAT KERJA'), nb(),
  p('[ LAMPIRKAN CARTA ORGANISASI TVET LIPIS ]', { bold: true, color: 'C00000', align: AlignmentType.CENTER, before: 2000 }));
body.push(...divider('CARTA PROFIL PEKERJAAN (JPC) /\nCARTA PROFIL KOMPETENSI (CPC)'), nb(),
  p('[ LAMPIRKAN CPC BAGI M731-001-4:2021 — DIGITAL MARKETING PLANNING AND IMPLEMENTATION ]', { bold: true, color: 'C00000', align: AlignmentType.CENTER, before: 2000 }));

// ── JPK/PPT/1.5 ──────────────────────────────────────────────────────────────
body.push(...divider('LAPORAN PENILAIAN KETERAMPILAN CALON\nMELALUI KAEDAH PENGIKTIRAFAN PENCAPAIAN TERDAHULU (PPT)\n(PENILAIAN PORTFOLIO)'));
body.push(nb(), formCode('JPK/PPT/1/5-2021'),
  title('JABATAN PEMBANGUNAN KEMAHIRAN', { size: 20 }),
  title('Kementerian Sumber Manusia, Malaysia', { size: 18, after: 160 }),
  title('LAPORAN PENILAIAN KETERAMPILAN CALON', { size: 20 }),
  title('MELALUI KAEDAH PENGIKTIRAFAN PENCAPAIAN TERDAHULU (PPT)', { size: 20 }),
  title('(Penilaian Portfolio)', { size: 18, after: 200 }),
  sechead('(A)  MAKLUMAT CALON (Diisi oleh calon)'),
  table([
    row(['NO. ID PPT', '500872', 'Pengesahan Calon\n\nAdalah dengan ini, saya mengesahkan bahawa segala maklumat ini adalah betul.\n\n\n..............................\n(Tandatangan)'], [2400, 4100, 3000], { 0: { bold: true, fill: HD } }),
    row(['NAMA PENUH\n(DENGAN HURUF BESAR)', NAMA], [2400, 7100], { 0: { bold: true, fill: HD } }),
    row(['NO. KAD PENGENALAN', KP], [2400, 7100], { 0: { bold: true, fill: HD } }),
    row(['KOD NOSS', KOD], [2400, 7100], { 0: { bold: true, fill: HD } }),
    row(['TAJUK NOSS', TAJUK], [2400, 7100], { 0: { bold: true, fill: HD } }),
  ], [2400, 7100]),
  sechead('(B)  SENARAI BUKTI-BUKTI KETERAMPILAN CALON (Diisi oleh calon)'),
  table([
    hrow(['Bil', 'Nama Bukti Keterampilan', 'Kod Bukti'], [900, 7000, 1600]),
    ...buktiRows.map(r => row(r, [900, 7000, 1600], { 0: { align: AlignmentType.CENTER }, 2: { align: AlignmentType.CENTER } })),
  ], [900, 7000, 1600]),
  p('Nota: *Sila kemukakan lampiran tambahan jika ruangan tidak mencukupi.', { size: 16, italics: true, before: 100 }),
);

// (C) prior experience
body.push(nb(), sechead('(C)  SENARAI PENGALAMAN TERDAHULU (Diisi oleh calon)'));
body.push(table([
  hrow(['DUTI / UNIT KOMPETENSI (CU)', 'RINGKASAN PENGALAMAN KERJA\n(Merangkumi kerja-kerja atau aktiviti yang telah dijalankan dan tempat / lokasi pengalaman diperolehi)', 'TAHUN /\nTEMPOH\nPENGALAMAN'], [2200, 5700, 1600]),
  ...CUS.map(cu => new TableRow({ children: [
    cell(`${cu.nama}\n\n${KOD} - ${cu.kod}`, { w: 2200, bold: true }),
    cell(cu.ring.map(t => bul(t)), { w: 5700 }),
    cell(cu.tempoh, { w: 1600, align: AlignmentType.CENTER }),
  ] })),
], [2200, 5700, 1600]));
body.push(p('Nota: Tempoh pengalaman dikira dari 2 Mei 2021 seperti dinyatakan dalam Borang Akuan (Kod Bukti 02).', { size: 16, italics: true, before: 100 }));

// (D) comparison table 2
body.push(nb(), sechead('(D)  JADUAL PERBANDINGAN STANDARD DENGAN BUKTI-BUKTI KETERAMPILAN CALON'));
body.push(p('(ii)  Jadual Perbandingan 2 (bagi NOSS format baharu sahaja)', { bold: true, size: 18 }));
const wD = [700, 2500, 4100, 1200, 1000];
const dRows = [hrow(['Bil.', 'Competency Unit (CU)', 'Work Activities (WA)', 'Senarai\nKod Bukti', 'Ulasan\nPP-PPT'], wD),
  new TableRow({ children: [cell('CORE COMPETENCY', { w: 9500, span: 5, bold: true, fill: HD, align: AlignmentType.CENTER })] })];
CUS.forEach((cu, i) => {
  const codes = cu.was.map((_, j) => pad(cu.from + j)).join(', ');
  dRows.push(new TableRow({ children: [
    cell(String(i + 1), { w: wD[0], align: AlignmentType.CENTER }),
    cell(`${cu.nama}\n\n${KOD} - ${cu.kod}`, { w: wD[1] }),
    cell(cu.was.map((w, j) => bul(`W0${j + 1}  ${w}`)), { w: wD[2] }),
    cell(codes, { w: wD[3], align: AlignmentType.CENTER }),
    cell('', { w: wD[4] }),
  ] }));
});
body.push(table(dRows, wD));
body.push(p('Nota: *Sila kemukakan lampiran tambahan jika ruangan tidak mencukupi.', { size: 16, italics: true, before: 100 }));

// (E) & (F) for PP-PPT
body.push(nb(), sechead('(E)  LAPORAN AKTIVITI DAN PENILAIAN BUKTI-BUKTI KETERAMPILAN CALON (Diisi oleh PP-PPT)'));
body.push(table([
  hrow(['Bil.', 'Keterangan Aktiviti Kaunseling & Penilaian', 'Tindakan / Cadangan PP-PPT'], [800, 4600, 4100]),
  ...[1, 2, 3].map(n => row([String(n), '\n\n', 'Tandatangan : ..........................\nTarikh :            Masa :            Tempat :'], [800, 4600, 4100], { 0: { align: AlignmentType.CENTER } })),
], [800, 4600, 4100]));
body.push(sechead('(F)  PENILAIAN BUKTI-BUKTI KETERAMPILAN (Diisi oleh PP-PPT)'));
body.push(table([
  hrow(['Bil.', 'Jenis Penilaian', 'Ulasan PP-PPT'], [800, 5000, 3700]),
  row(['1', 'Pembangunan Portfolio:\ni.  Pemahaman terhadap keperluan NOSS, sistem dan kaedah pelaksanaan PPT serta persijilan\nii. Bukti-bukti kompetensi memenuhi keperluan Standard (sahih, boleh percaya dan mencukupi)\niii. Susun atur portfolio mengikut format', ''], [800, 5000, 3700], { 0: { align: AlignmentType.CENTER } }),
  row(['2', 'Sesi Soal Jawab:\ni.  Tahap pengetahuan memenuhi keperluan Standard\nii. Mampu menerangkan setiap tugasan yang dilaksanakan\niii. Pengetahuan/pengalaman sesuai dengan program yang dipohon\niv. Penilaian penampilan, personaliti dan kemahiran berkomunikasi\nv.  Amalan keselamatan', ''], [800, 5000, 3700], { 0: { align: AlignmentType.CENTER } }),
  row(['3', 'Lawatan Di Tempat Kerja', ''], [800, 5000, 3700], { 0: { align: AlignmentType.CENTER } }),
], [800, 5000, 3700]));
body.push(p('\nPengesahan Penilaian:  (Tandatangan & Cop Pengesahan PP-PPT)', { bold: true, before: 200 }));
body.push(p('Tarikh penilaian : ....................        Masa : ....................        Tempat Penilaian : ....................'));

// ── evidence dividers per CU ─────────────────────────────────────────────────
body.push(...divider('BUKTI-BUKTI KETERAMPILAN CALON\nMENGIKUT UNIT KOMPETENSI (CU)'));
CUS.forEach(cu => {
  body.push(...divider(`${cu.kod} — ${cu.nama}`));
  body.push(nb(), p(`Kod Bukti bagi unit kompetensi ini: ${cu.was.map((_, j) => pad(cu.from + j)).join(', ')}`, { bold: true, before: 200 }));
  body.push(table([
    hrow(['Kod Bukti', 'Work Activity (WA)', 'Dokumen Bukti'], [1400, 4000, 4100]),
    ...cu.was.map((w, j) => row([pad(cu.from + j), `W0${j + 1}  ${w}`, DOCNAMES[cu.kod][j]], [1400, 4000, 4100], { 0: { align: AlignmentType.CENTER } })),
  ], [1400, 4000, 4100]));
  body.push(p('[ SISIPKAN DOKUMEN BUKTI BAGI CU INI SELEPAS HALAMAN INI ]', { bold: true, color: 'C00000', align: AlignmentType.CENTER, before: 300 }));
});

// ── JPK/PPT/2.5 ──────────────────────────────────────────────────────────────
body.push(...divider('LAPORAN PENGALAMAN KETERAMPILAN TERDAHULU (LPKT)'));
body.push(nb(), formCode('JPK/PPT/2/5-2021'),
  title('JABATAN PEMBANGUNAN KEMAHIRAN', { size: 20 }),
  title('Kementerian Sumber Manusia, Malaysia', { size: 18, after: 160 }),
  title('BORANG PENILAIAN', { size: 20 }),
  title('LAPORAN PENGALAMAN KETERAMPILAN TERDAHULU (LPKT)', { size: 20 }),
  title('(Borang ini hendaklah diisi oleh PPL-PPT)', { size: 17, after: 200 }),
  sechead('(A)  MAKLUMAT CALON (Diisi oleh calon)'),
  table([
    row(['NO. PENDAFTARAN', '500872', 'Pengesahan Calon\n\nAdalah dengan ini, saya mengesahkan bahawa segala maklumat ini adalah betul.\n\n\n..............................\nTandatangan'], [2400, 4100, 3000], { 0: { bold: true, fill: HD } }),
    row(['NAMA PENUH', NAMA], [2400, 7100], { 0: { bold: true, fill: HD } }),
    row(['NO. KAD PENGENALAN\n(Sila bawa kad pengenalan asal)', KP], [2400, 7100], { 0: { bold: true, fill: HD } }),
    row(['KOD NOSS', KOD], [2400, 7100], { 0: { bold: true, fill: HD } }),
    row(['TAJUK NOSS', TAJUK], [2400, 7100], { 0: { bold: true, fill: HD } }),
    row(['Tajuk LPKT', 'Perancangan dan Pelaksanaan Kempen Pemasaran Media Sosial bagi Meningkatkan Pengambilan Pelajar Baharu di TVET Lipis'], [2400, 7100], { 0: { bold: true, fill: HD } }),
    row(['Tarikh Penilaian', ''], [2400, 7100], { 0: { bold: true, fill: HD } }),
  ], [2400, 7100]),
  p('Nota: Bahagian penilaian (skala pemarkahan penulisan LPKT, pembentangan dan sesi soal jawab) diisi oleh PPL-PPT semasa sesi penilaian.', { size: 16, italics: true, before: 160, color: '444444' }),
);

const doc = new Document({
  styles: { default: { document: { run: { font: F, size: 19 } } } },
  sections: [{
    properties: { page: { margin: { top: convertInchesToTwip(0.7), bottom: convertInchesToTwip(0.6), left: convertInchesToTwip(0.7), right: convertInchesToTwip(0.6) } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ children: [PageNumber.CURRENT], font: F, size: 15, color: '888888' })] })] }) },
    children: body,
  }],
});
Packer.toBuffer(doc).then(b => {
  fs.writeFileSync('PORTFOLIO-PPT-DKM-Zuriel-Seong.docx', b);
  console.log('Done. Bukti codes:', buktiRows.length);
});
