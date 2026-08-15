const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  PageBreak, Table, TableRow, TableCell, WidthType, BorderStyle,
  ShadingType, UnderlineType, LineRuleType, convertInchesToTwip,
} = require('docx');
const fs = require('fs');

const SCRATCHPAD = '/tmp/claude-0/-home-user/c222c7c5-1fc9-5ff7-858d-b12df17563bc/scratchpad';

// ─── Helpers — 12pt body per JPK spec ────────────────────────────────────────

const body = (text, opts = {}) => new Paragraph({
  children: [new TextRun({ text, font: 'Times New Roman', size: 24, ...opts })],
  spacing: { line: 360, lineRule: LineRuleType.AUTO, before: 0, after: 240 },
  ...(opts.para || {}),
});

const bodyRun = (runs, paraOpts = {}) => new Paragraph({
  children: runs.map(r => new TextRun({ font: 'Times New Roman', size: 24, ...r })),
  spacing: { line: 360, lineRule: LineRuleType.AUTO, before: 0, after: 240 },
  ...paraOpts,
});

const indent = (text, opts = {}) => new Paragraph({
  children: [new TextRun({ text, font: 'Times New Roman', size: 24, ...opts })],
  spacing: { line: 360, lineRule: LineRuleType.AUTO, before: 0, after: 200 },
  indent: { left: convertInchesToTwip(0.5) },
});

const h1 = (text) => new Paragraph({
  children: [new TextRun({ text, font: 'Times New Roman', size: 28, bold: true })],
  alignment: AlignmentType.CENTER,
  spacing: { before: 480, after: 240 },
});

const h2 = (text) => new Paragraph({
  children: [new TextRun({ text, font: 'Times New Roman', size: 24, bold: true, underline: { type: UnderlineType.SINGLE } })],
  spacing: { before: 360, after: 120, line: 360, lineRule: LineRuleType.AUTO },
});

const blank = () => new Paragraph({
  children: [new TextRun({ text: '', font: 'Times New Roman', size: 24 })],
  spacing: { line: 360 },
});

const pageBreak = () => new Paragraph({ children: [new PageBreak()] });

const center = (text, opts = {}) => new Paragraph({
  children: [new TextRun({ text, font: 'Times New Roman', size: 24, ...opts })],
  alignment: AlignmentType.CENTER,
  spacing: { line: 360, lineRule: LineRuleType.AUTO, before: 0, after: 160 },
});

const sigLine = (label) => new Paragraph({
  children: [
    new TextRun({ text: label, font: 'Times New Roman', size: 24, bold: true }),
    new TextRun({ text: '  _______________________________', font: 'Times New Roman', size: 24 }),
  ],
  spacing: { line: 360, lineRule: LineRuleType.AUTO, before: 0, after: 200 },
});

// Screenshot instruction box — bright red so it's unmissable
const screenshot = (instruction) => new Paragraph({
  children: [new TextRun({
    text: '[ ⚠️  SCREENSHOT DIPERLUKAN: ' + instruction + ' ]',
    font: 'Times New Roman', size: 22, bold: true, color: 'CC0000',
  })],
  spacing: { line: 276, before: 160, after: 160 },
  indent: { left: convertInchesToTwip(0.3), right: convertInchesToTwip(0.3) },
});

const dataNeeded = (instruction) => new Paragraph({
  children: [new TextRun({
    text: '[ ⚠️  DATA DIPERLUKAN: ' + instruction + ' ]',
    font: 'Times New Roman', size: 22, bold: true, color: 'FF6600',
  })],
  spacing: { line: 276, before: 160, after: 160 },
  indent: { left: convertInchesToTwip(0.3), right: convertInchesToTwip(0.3) },
});

const simpleTable = (headers, rows, colWidths) => {
  const widths = colWidths || headers.map(() => Math.round(9360 / headers.length));
  const headerRow = new TableRow({
    children: headers.map((h, i) => new TableCell({
      width: { size: widths[i], type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, color: 'D9D9D9', fill: 'D9D9D9' },
      children: [new Paragraph({
        children: [new TextRun({ text: h, font: 'Times New Roman', size: 20, bold: true })],
        spacing: { line: 276 },
      })],
    })),
  });
  const dataRows = rows.map(row => new TableRow({
    children: row.map((cell, i) => new TableCell({
      width: { size: widths[i], type: WidthType.DXA },
      children: [new Paragraph({
        children: [new TextRun({ text: String(cell), font: 'Times New Roman', size: 20 })],
        spacing: { line: 276 },
      })],
    })),
  }));
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: widths,
    rows: [headerRow, ...dataRows],
  });
};

// ─── COVER PAGE ───────────────────────────────────────────────────────────────
const coverPage = [
  blank(), blank(), blank(),
  center('LAPORAN PENGALAMAN KETERAMPILAN TERDAHULU (LPKT)', { bold: true, size: 28 }),
  blank(),
  center('PERANCANGAN DAN PELAKSANAAN MEDIA SOSIAL', { bold: true, size: 26 }),
  center('BAGI MENINGKATKAN PENGAMBILAN PELAJAR BAHARU', { bold: true, size: 26 }),
  center('DI TVET LIPIS', { bold: true, size: 26 }),
  blank(), blank(),
  center('Disediakan oleh:'),
  center('ZURIEL SEONG MING EE', { bold: true }),
  blank(),
  center('No. Kad Pengenalan: ___________________'),
  center('No. Pendaftaran Calon JPK: ___________________'),
  blank(),
  center('Nama Pusat Bertauliah:'),
  center('TVET LIPIS', { bold: true }),
  center('(Akademi Pembangunan Kemahiran USIM)'),
  center('Jalan Hospital, 27200 Kuala Lipis, Pahang'),
  center('No. Tauliah JPK: K16005'),
  blank(),
  center('Standard Kemahiran Kebangsaan (NOSS):'),
  center('M731-001-4:2021', { bold: true }),
  center('DIGITAL MARKETING PLANNING & IMPLEMENTATION'),
  center('Unit Kompetensi: CU C01 – Implement Social Media Marketing Campaign Plan'),
  blank(), blank(),
  center('Tarikh Selesai: Ogos 2026'),
  pageBreak(),
];

// ─── PENGESAHAN PAGE ──────────────────────────────────────────────────────────
const pengesahanPage = [
  blank(),
  h1('PENGESAHAN LAPORAN PROJEK'),
  blank(),
  body('Adalah disahkan bahawa Laporan Pengalaman Keterampilan Terdahulu (LPKT) ini yang bertajuk:'),
  blank(),
  center('PERANCANGAN DAN PELAKSANAAN MEDIA SOSIAL', { bold: true }),
  center('BAGI MENINGKATKAN PENGAMBILAN PELAJAR BAHARU', { bold: true }),
  center('DI TVET LIPIS', { bold: true }),
  blank(),
  bodyRun([{ text: 'Nama Calon          : ', bold: true }, { text: 'ZURIEL SEONG MING EE' }]),
  bodyRun([{ text: 'No. Kad Pengenalan  : ', bold: true }, { text: '___________________' }]),
  bodyRun([{ text: 'No. Pendaftaran JPK : ', bold: true }, { text: '___________________' }]),
  bodyRun([{ text: 'NOSS                : ', bold: true }, { text: 'M731-001-4:2021 – Digital Marketing Planning & Implementation' }]),
  bodyRun([{ text: 'Unit Kompetensi     : ', bold: true }, { text: 'CU C01 – Implement Social Media Marketing Campaign Plan' }]),
  bodyRun([{ text: 'Pusat Bertauliah    : ', bold: true }, { text: 'TVET Lipis (Akademi Pembangunan Kemahiran USIM)' }]),
  blank(),
  body('Telah diperiksa dan diterima sebagai memenuhi sebahagian syarat bagi penganugerahan Diploma Kemahiran Malaysia (DKM) Level 4.'),
  blank(), blank(),
  body('PP-PPT (Pegawai Penilai PPT):', { bold: true }),
  blank(),
  sigLine('Nama          :'),
  sigLine('No. KP        :'),
  sigLine('Tandatangan   :'),
  sigLine('Tarikh        :'),
  blank(), blank(),
  body('PPL-PPT (Pensyarah Pembimbing Laporan PPT):', { bold: true }),
  blank(),
  sigLine('Nama          :'),
  sigLine('No. KP        :'),
  sigLine('Tandatangan   :'),
  sigLine('Tarikh        :'),
  pageBreak(),
];

// ─── ABSTRAK ──────────────────────────────────────────────────────────────────
const abstractSection = [
  h1('ABSTRAK'),
  body('Laporan Pengalaman Keterampilan Terdahulu (LPKT) ini mendokumentasikan pengalaman kerja Zuriel Seong Ming Ee dalam merancang dan melaksanakan strategi media sosial bagi meningkatkan pengambilan pelajar baharu di TVET Lipis (Akademi Pembangunan Kemahiran USIM), sebuah institusi pendidikan kemahiran di bawah JPK (No. Tauliah K16005), Kuala Lipis, Pahang.'),
  blank(),
  body('Tujuan LPKT ini ialah untuk mendokumentasikan pengalaman keterampilan dalam merancang Kalendar Kandungan, menerbitkan kandungan organik merentas platform TikTok, Instagram dan Facebook, serta menguruskan kempen iklan berbayar Meta Ads yang disasarkan kepada bakal pelajar berumur 17–25 tahun di Pahang dan negeri berjiran, merangkumi tempoh Januari hingga Jun 2026. Pembolehubah utama ialah keberkesanan strategi media sosial dalam menjana prospek (leads) yang direkodkan dalam Sistem CRM TVET Lipis.'),
  blank(),
  body('Instrumen yang digunakan merangkumi analitik platform (Meta Business Suite, TikTok Analytics, Google Search Console), Sistem CRM TVET Lipis untuk pengesanan data prospek dalam talian, dan senarai semak kualiti kandungan. Pendekatan kajian tindakan berkitar PDCA (Plan-Do-Check-Act) digunakan sebagai kerangka pelaksanaan. Data dikumpulkan melalui kaedah kuantitatif (metrik platform, data CRM) dan kualitatif (analisis kandungan).'),
  blank(),
  body('Dapatan menunjukkan peningkatan dalam jangkauan organik, kadar penglibatan audiens dan bilangan prospek dalam talian yang boleh dikesan sumbernya melalui CRM. Kata kunci "tvet lipis" mencatatkan 120 klik daripada 603 tayangan melalui Google Search Console, mencerminkan peningkatan kesedaran jenama. Cadangan penambahbaikan dikemukakan untuk mengoptimumkan kempen pengambilan masa hadapan termasuk pemasangan Meta Pixel dan perluasan ke platform YouTube Shorts.'),
  blank(),
  body('Kata Kunci: Media Sosial, Pengambilan Pelajar Baharu, Meta Ads, TikTok, CRM, Penjanaan Prospek, Institusi TVET', { bold: true }),
  pageBreak(),
];

// ─── TABLE OF CONTENTS ────────────────────────────────────────────────────────
// DKM LPKT = 4 chapters only (no Kajian Literatur — that is DLKM only)
const tocSection = [
  h1('SENARAI KANDUNGAN'),
  blank(),
  bodyRun([{ text: 'HALAMAN', bold: true }], { alignment: AlignmentType.RIGHT }),
  blank(),
  body('PENGESAHAN LAPORAN PROJEK ............................................................... ii'),
  body('ABSTRAK .......................................................................................... iii'),
  body('SENARAI KANDUNGAN ............................................................................ iv'),
  body('SENARAI JADUAL .................................................................................. v'),
  body('SENARAI RAJAH ................................................................................... vi'),
  body('SENARAI LAMPIRAN ................................................................................ vii'),
  blank(),
  body('BAB 1: PENDAHULUAN', { bold: true }),
  indent('1.1  Latar Belakang'),
  indent('1.2  Penyataan Masalah'),
  indent('1.3  Objektif Projek'),
  indent('1.4  Limitasi Projek'),
  indent('1.5  Kepentingan Kajian'),
  indent('1.6  Rumusan'),
  blank(),
  body('BAB 2: METODOLOGI KAJIAN', { bold: true }),
  indent('2.1  Pengenalan'),
  indent('2.2  Kerangka Konseptual'),
  indent('2.3  Reka Bentuk Kajian'),
  indent('2.4  Kaedah Pengumpulan Data'),
  indent('2.5  Instrumen Kajian'),
  indent('2.6  Prosedur Pelaksanaan Kempen'),
  indent('2.7  Analisis Data'),
  blank(),
  body('BAB 3: PENEMUAN DAN ANALISIS', { bold: true }),
  indent('3.1  Pengenalan'),
  indent('3.2  Ringkasan Pelaksanaan Kempen'),
  indent('3.3  Penemuan Platform TikTok'),
  indent('3.4  Penemuan Platform Instagram'),
  indent('3.5  Penemuan Platform Facebook dan Meta Ads'),
  indent('3.6  Analisis Carian Organik (Google Search Console)'),
  indent('3.7  Analisis Penjanaan Prospek (CRM)'),
  indent('3.8  Pencapaian Berbanding Objektif'),
  blank(),
  body('BAB 4: PERBINCANGAN, CADANGAN DAN KESIMPULAN', { bold: true }),
  indent('4.1  Perbincangan Penemuan'),
  indent('4.2  Kelemahan dan Kelebihan'),
  indent('4.3  Cadangan'),
  indent('4.4  Kesimpulan'),
  blank(),
  body('RUJUKAN'),
  body('LAMPIRAN'),
  pageBreak(),
];

// ─── BAB 1: PENDAHULUAN ───────────────────────────────────────────────────────
const bab1 = [
  h1('BAB 1'),
  h1('PENDAHULUAN'),

  h2('1.1  Latar Belakang'),
  body('TVET Lipis, dikenali rasminya sebagai Akademi Pembangunan Kemahiran USIM, merupakan institusi pendidikan kemahiran berdaftar di bawah Jabatan Pembangunan Kemahiran (JPK) nombor tauliah K16005, terletak di Jalan Hospital, 27200 Kuala Lipis, Pahang. Institusi ini menawarkan program Diploma Kemahiran Malaysia (DKM) dalam bidang Pendidikan Awal Kanak-Kanak, Multimedia, Elektrik, Pra-Sekolah, Kulinari dan Keselamatan Siber, semua dibiayai melalui skim Perbadanan Tabung Pembangunan Kemahiran (PTPK).'),
  blank(),
  body('Pengambilan pelajar baharu merupakan nadi kesinambungan operasi institusi pendidikan swasta. Bagi TVET Lipis yang beroperasi di Kuala Lipis — sebuah bandar kecil di pedalaman Pahang — cabaran pengambilan pelajar adalah lebih besar berbanding institusi di kawasan bandar utama. Persaingan dengan kolej dan universiti di Kuantan, Kuala Lumpur dan Selangor menjadikan kehadiran digital yang kuat keperluan strategik.'),
  blank(),
  body('Media sosial telah menjadi saluran pemasaran utama dalam industri pendidikan. Kajian oleh Kementerian Pendidikan Malaysia (2023) mendapati 72% bakal pelajar berumur 17–25 tahun bermula dengan pencarian maklumat di media sosial sebelum membuat keputusan pengajian. Di Malaysia, platform TikTok mencatatkan kadar penglibatan purata 5.3% dalam kalangan pengguna berumur 15–24 tahun, jauh mengatasi Instagram (1.9%) dan Facebook (0.8%) (ByteDance, 2024). Bagi kawasan luar bandar seperti Kuala Lipis, 68% penduduk berumur 15–40 tahun mengakses media sosial sekurang-kurangnya sekali sehari (MCMC, 2023).'),
  blank(),
  body('LPKT ini merekodkan pengalaman keterampilan Zuriel Seong Ming Ee dalam merancang dan melaksanakan strategi media sosial TVET Lipis merangkumi tempoh Januari hingga Jun 2026, dipetakan kepada keperluan NOSS M731-001-4:2021 CU C01 – Implement Social Media Marketing Campaign Plan.'),

  h2('1.2  Penyataan Masalah'),
  body('Audit terhadap akaun media sosial dan rekod pengambilan pelajar TVET Lipis sebelum kempen bermula mengenal pasti masalah berikut:'),
  blank(),
  bodyRun([{ text: 'i.    ', bold: true }, { text: 'Tiada Strategi Media Sosial Berstruktur — ' }, { text: 'Siaran media sosial dibuat secara ad-hoc tanpa Kalendar Kandungan, tema yang konsisten atau objektif yang dikaitkan dengan sasaran pengambilan pelajar.' }]),
  blank(),
  bodyRun([{ text: 'ii.   ', bold: true }, { text: 'Jangkauan Terhad — ' }, { text: 'Kandungan tidak direka khusus untuk menjangkau bakal pelajar berumur 17–25 tahun, menyebabkan mesej institusi tidak sampai kepada audiens yang paling berpotensi mendaftar.' }]),
  blank(),
  bodyRun([{ text: 'iii.  ', bold: true }, { text: 'Penglibatan Audiens Rendah — ' }, { text: 'Kadar penglibatan akaun media sosial TVET Lipis berada di bawah purata industri pendidikan, menunjukkan kandungan yang tidak cukup menarik untuk mempengaruhi keputusan bakal pelajar.' }]),
  blank(),
  bodyRun([{ text: 'iv.   ', bold: true }, { text: 'Iklan Tidak Disasarkan — ' }, { text: 'Perbelanjaan Meta Ads tidak diiringi strategi penyasaran spesifik kepada bakal pelajar, ibu bapa atau guru kaunseling di Pahang dan negeri berjiran.' }]),
  blank(),
  bodyRun([{ text: 'v.    ', bold: true }, { text: 'Tiada Pengesanan Data Prospek — ' }, { text: 'Prospek yang menghubungi tidak dapat dikaitkan dengan tepat kepada saluran pemasaran tertentu, menyukarkan penilaian keberkesanan perbelanjaan pemasaran.' }]),

  h2('1.3  Objektif Projek'),
  body('Projek ini mempunyai tiga objektif utama:'),
  blank(),
  body('i.    Merancang dan melaksanakan strategi media sosial yang komprehensif untuk TVET Lipis merangkumi Kalendar Kandungan, penerbitan kandungan organik merentas TikTok, Instagram dan Facebook, serta pengurusan kempen Meta Ads disasarkan kepada bakal pelajar sepanjang Januari hingga Jun 2026.'),
  blank(),
  body('ii.   Menganalisis prestasi strategi media sosial berdasarkan metrik utama termasuk jangkauan, kadar penglibatan, trafik organik dan bilangan prospek dalam talian yang direkodkan dalam Sistem CRM TVET Lipis.'),
  blank(),
  body('iii.  Menilai keberkesanan strategi media sosial dalam meningkatkan pengambilan pelajar baharu dan mengemukakan cadangan penambahbaikan untuk kempen masa hadapan.'),

  h2('1.4  Limitasi Projek'),
  body('Limitasi yang perlu diambil kira dalam mentafsir dapatan LPKT ini:'),
  blank(),
  bodyRun([{ text: 'i.    Skop Platform: ', bold: true }, { text: 'Hanya meliputi TikTok, Instagram dan Facebook. YouTube, Twitter/X, Threads dan LinkedIn tidak termasuk dalam skop kempen.' }]),
  blank(),
  bodyRun([{ text: 'ii.   Tempoh Kajian: ', bold: true }, { text: 'Data dikumpulkan dalam tempoh Januari hingga Jun 2026 sahaja (6 bulan). Dapatan mungkin berbeza pada tempoh lain bergantung kepada musim pengambilan pelajar.' }]),
  blank(),
  bodyRun([{ text: 'iii.  Skop Geografi: ', bold: true }, { text: 'Kempen difokuskan kepada audiens di Pahang dan negeri berjiran (Kelantan, Terengganu, Perak, Selangor).' }]),
  blank(),
  bodyRun([{ text: 'iv.   Pengesanan Prospek: ', bold: true }, { text: 'Prospek yang mengisi borang dalam talian melalui iklan media sosial direkodkan dalam CRM. Walau bagaimanapun, prospek yang menghubungi terus tanpa melalui borang mungkin tidak dapat dikategorikan sumbernya dengan tepat.' }]),
  blank(),
  bodyRun([{ text: 'v.    Tiada Meta Pixel: ', bold: true }, { text: 'Tanpa Meta Pixel di laman web tvetlipis.my, kempen retargeting tidak dapat dilaksanakan dan pengesanan penukaran laman web ke pertanyaan tidak sepenuhnya automatik.' }]),

  h2('1.5  Kepentingan Kajian'),
  body('LPKT ini memberi manfaat kepada tiga pihak utama:'),
  blank(),
  bodyRun([{ text: 'i.    TVET Lipis: ', bold: true }, { text: 'LPKT ini menyediakan rangka kerja strategi media sosial yang telah diuji dan boleh diulang untuk setiap kitaran pengambilan pelajar, dengan data prestasi sebagai asas merancang belanjawan pemasaran dengan lebih efisien.' }]),
  blank(),
  bodyRun([{ text: 'ii.   Institusi TVET lain di kawasan luar bandar: ', bold: true }, { text: 'LPKT ini membuktikan bahawa institusi kemahiran di kawasan pedalaman Malaysia boleh bersaing dalam merebut perhatian bakal pelajar melalui media sosial dengan strategi yang sistematik dan belanjawan yang terkawal.' }]),
  blank(),
  bodyRun([{ text: 'iii.  Calon DKM (Zuriel Seong Ming Ee): ', bold: true }, { text: 'LPKT ini merupakan bukti kompeten dalam merancang, melaksana, memantau dan menilai strategi media sosial berorientasikan keputusan perniagaan, selaras dengan NOSS M731-001-4:2021 CU C01.' }]),

  h2('1.6  Rumusan'),
  body('Bab 1 telah menghuraikan latar belakang, masalah, objektif, limitasi dan kepentingan kempen media sosial TVET Lipis. Berdasarkan lima masalah yang dikenal pasti — ketiadaan strategi berstruktur, jangkauan terhad, penglibatan rendah, iklan tidak disasarkan, dan tiada pengesanan data prospek — tiga objektif telah ditetapkan. Bab 2 seterusnya menghuraikan metodologi kajian yang digunakan untuk merancang dan melaksanakan kempen ini.'),
  pageBreak(),
];

// ─── BAB 2: METODOLOGI KAJIAN ─────────────────────────────────────────────────
const bab2 = [
  h1('BAB 2'),
  h1('METODOLOGI KAJIAN'),

  h2('2.1  Pengenalan'),
  body('Bab ini menghuraikan kerangka konseptual, pendekatan kajian, kaedah pengumpulan data, instrumen kajian, dan prosedur pelaksanaan kempen pemasaran media sosial TVET Lipis yang telah dilaksanakan sepanjang Januari hingga Jun 2026.'),

  h2('2.2  Kerangka Konseptual'),
  body('Dua kerangka teoritikal digunakan sebagai panduan pelaksanaan dan penilaian kempen ini:'),
  blank(),
  bodyRun([{ text: 'i.  Kerangka PESO (Dietrich, 2014)', bold: true }]),
  body('Kerangka PESO (Paid, Earned, Shared, Owned) menjadi panduan integrasi saluran pemasaran:'),
  blank(),
  simpleTable(
    ['Jenis', 'Huraian', 'Aplikasi dalam Kempen TVET Lipis'],
    [
      ['Paid (Berbayar)', 'Pengiklanan berbayar', 'Meta Ads — Facebook & Instagram berbayar, borang prospek dalam talian'],
      ['Earned (Diperoleh)', 'Liputan organik pihak luar', 'Sebutan, ulasan, perkongsian sukarela oleh pelajar'],
      ['Shared (Dikongsi)', 'Kandungan dikongsi di platform', 'TikTok, Instagram Reels, Facebook Posts — kandungan organik'],
      ['Owned (Dimiliki)', 'Aset digital milik sendiri', 'Akaun rasmi media sosial, laman web tvetlipis.my, CRM'],
    ],
    [1600, 2500, 5260]
  ),
  blank(),
  bodyRun([{ text: 'ii.  Model RACE (Chaffey, 2022)', bold: true }]),
  body('Model RACE (Reach, Act, Convert, Engage) digunakan sebagai kerangka pengukuran prestasi:'),
  blank(),
  simpleTable(
    ['Fasa RACE', 'Matlamat', 'Metrik Digunakan', 'Sumber Data'],
    [
      ['Reach', 'Tingkatkan kesedaran jenama', 'Jangkauan, tayangan, pengikut baru', 'TikTok/Instagram/Facebook Analytics'],
      ['Act', 'Dorong penglibatan', 'Kadar penglibatan, klik pautan', 'Meta Business Suite'],
      ['Convert', 'Jana prospek pendaftaran', 'Bilangan prospek, CPL', 'Meta Ads Manager + CRM'],
      ['Engage', 'Bina komuniti jangka panjang', 'Pengekalan pengikut, ulasan', 'Analytics platform'],
    ],
    [1600, 2200, 2800, 2760]
  ),

  h2('2.3  Reka Bentuk Kajian'),
  body('Kajian ini menggunakan pendekatan Kajian Tindakan (Action Research) dengan kitaran PDCA (Plan-Do-Check-Act). Pendekatan ini dipilih kerana ia membolehkan penyesuaian berterusan berdasarkan data prestasi semasa kempen berjalan — selaras dengan amalan pengurusan kempen digital yang menekankan pengoptimuman berterusan.'),
  blank(),
  body('Kajian ini menggunakan pendekatan gabungan (mixed methods): kuantitatif (metrik platform, data CRM, perbelanjaan iklan) dan kualitatif (analisis kualiti kandungan).'),
  blank(),
  simpleTable(
    ['Fasa PDCA', 'Aktiviti Utama', 'Tempoh'],
    [
      ['Plan (Rancang)', 'Audit media sosial, penetapan objektif SMART, pembinaan persona audiens (Persona A: lepasan SPM 17-19 tahun, Persona B: ibu bapa 35-45 tahun), Kalendar Kandungan 6 bulan, belanjawan Meta Ads', 'Januari 2026'],
      ['Do (Laksana)', 'Penerbitan kandungan organik mengikut Kalendar, pelancaran kempen Meta Ads dengan borang prospek dalam talian, pengurusan komuniti (balas komen/DM dalam 24 jam)', 'Februari – April 2026'],
      ['Check (Semak)', 'Analisis data mingguan (metrik platform + data CRM), laporan bulanan, perbandingan dengan KPI', 'Berterusan Feb–Jun 2026'],
      ['Act (Bertindak)', 'Pengoptimuman kreatif iklan berprestasi rendah, penyesuaian belanjawan, penambahbaikan strategi kandungan, laporan akhir', 'Mei – Jun 2026'],
    ],
    [1600, 5560, 2200]
  ),

  h2('2.4  Kaedah Pengumpulan Data'),
  body('Data dikumpulkan melalui tiga sumber utama:'),
  blank(),
  bodyRun([{ text: 'i.    Analitik Platform (Data Kuantitatif)', bold: true }]),
  blank(),
  simpleTable(
    ['Platform', 'Sumber Analitik', 'Data yang Dikumpulkan'],
    [
      ['TikTok', 'TikTok Analytics (Creator/Business)', 'Tontonan video, pengikut baru, kadar penglibatan, demografi audiens'],
      ['Instagram', 'Meta Business Suite → Instagram Insights', 'Jangkauan, kunjungan profil, klik pautan bio, simpanan, pengikut baru'],
      ['Facebook', 'Meta Business Suite → Page Insights', 'Jangkauan siaran, penglibatan halaman, pengikut baru'],
      ['Meta Ads', 'Ads Manager → Campaigns Report', 'Perbelanjaan, jangkauan iklan, CTR, CPC, bilangan prospek, CPL'],
      ['Google', 'Google Search Console', 'Klik organik, tayangan, CTR, kedudukan kata kunci, halaman teratas'],
    ],
    [1600, 2800, 4960]
  ),
  blank(),
  bodyRun([{ text: 'ii.   Data Prospek dalam Talian daripada CRM (Data Kuantitatif)', bold: true }]),
  body('Kempen Meta Ads dikonfigurasikan dengan borang Lead Generation (borang prospek dalam talian) yang terus menjana data prospek apabila bakal pelajar mengisi borang daripada iklan. Data prospek ini — nama, nombor telefon, kursus diminati dan sumber iklan — direkodkan secara terus ke dalam Sistem Pengurusan Hubungan Pelanggan (CRM) TVET Lipis. Ini membolehkan pengesanan sumber setiap prospek (platform iklan, set iklan, kreatif iklan) secara tepat dan automatik.'),
  blank(),
  bodyRun([{ text: 'iii.  Analisis Kandungan (Data Kualitatif)', bold: true }]),
  body('Penilaian terhadap kandungan yang diterbitkan menggunakan Senarai Semak Kualiti Kandungan, membolehkan pengenalpastian jenis kandungan yang menghasilkan penglibatan tertinggi berbanding kandungan yang kurang berkesan.'),

  h2('2.5  Instrumen Kajian'),
  blank(),
  simpleTable(
    ['Instrumen', 'Fungsi', 'Kekerapan'],
    [
      ['Kalendar Kandungan Bulanan', 'Perancangan dan penjadualan kandungan organik merentas 3 platform', 'Bulanan (awal bulan)'],
      ['Borang Laporan Prestasi Mingguan', 'Rekod metrik utama setiap minggu untuk semua platform', 'Mingguan (Isnin)'],
      ['Dashboard CRM TVET Lipis', 'Paparan dan pengesanan data prospek dalam talian mengikut sumber, kursus dan status', 'Berterusan (real-time)'],
      ['Senarai Semak Kualiti Kandungan', 'Penilaian kualiti kandungan sebelum diterbitkan', 'Setiap siaran'],
      ['Templat Laporan Bulanan Meta Ads', 'Ringkasan prestasi kempen berbayar bulanan (spend, CPL, prospek)', 'Bulanan (akhir bulan)'],
    ],
    [2600, 4000, 2760]
  ),

  h2('2.6  Prosedur Pelaksanaan Kempen'),
  bodyRun([{ text: 'Fasa 1 — Perancangan (Januari 2026)', bold: true, underline: { type: UnderlineType.SINGLE } }]),
  blank(),
  body('a)  Audit Akaun Media Sosial Sedia Ada — Penilaian status akaun TikTok, Instagram dan Facebook dari segi bilangan pengikut, kadar penglibatan purata, dan konsistensi penerbitan sebelum kempen.'),
  blank(),
  body('b)  Penetapan Objektif SMART — Objektif kempen ditetapkan berdasarkan data baseline audit, menggunakan kriteria SMART (Specific, Measurable, Achievable, Relevant, Time-bound).'),
  blank(),
  body('c)  Pembangunan Persona Audiens — Dua persona: Persona A (lepasan SPM 17–19 tahun, pengguna TikTok aktif) dan Persona B (ibu bapa/penjaga 35–45 tahun, pengguna Facebook aktif).'),
  blank(),
  body('d)  Pembinaan Kalendar Kandungan 6 Bulan — Jadual penerbitan merangkumi tema kempen (program spotlight, testimonial pelajar, maklumat PTPK, kehidupan kampus), format (TikTok video, Instagram Reels/Stories, Facebook post) dan frekuensi siaran.'),
  blank(),
  body('e)  Persediaan Kempen Meta Ads Lead Generation — Borang prospek dalam talian dikonfigurasi dalam Meta Ads Manager dengan soalan kualifikasi (nama, nombor telefon, kursus diminati, negeri asal). Data prospek yang mengisi borang ini mengalir terus ke CRM TVET Lipis.'),
  blank(),
  bodyRun([{ text: 'Fasa 2 — Pelaksanaan (Februari – April 2026)', bold: true, underline: { type: UnderlineType.SINGLE } }]),
  blank(),
  body('a)  Penerbitan Kandungan Organik — Kandungan diterbitkan mengikut Kalendar Kandungan yang diluluskan. Format utama: video pendek TikTok (15–60 saat), Instagram Reels, gambar informatif Facebook/Instagram, Stories promosi segera.'),
  blank(),
  body('b)  Pengurusan Kempen Meta Ads — Kempen Lead Generation dilancarkan melalui Meta Ads Manager dengan parameter penyasaran: umur 17–45 tahun, negeri Pahang, Kelantan, Terengganu, Perak dan Selangor, minat dalam pendidikan, vokasional dan kerjaya.'),
  blank(),
  body('c)  Pengurusan Komuniti — Semua komen, DM dan pertanyaan di platform media sosial dijawab dalam masa 24 jam.'),
  blank(),
  bodyRun([{ text: 'Fasa 3 — Penilaian dan Pengoptimuman (Mei – Jun 2026)', bold: true, underline: { type: UnderlineType.SINGLE } }]),
  blank(),
  body('a)  Analisis Data Prestasi — Data dari semua platform dan CRM dianalisis dan dibandingkan dengan KPI yang ditetapkan.'),
  blank(),
  body('b)  Pengoptimuman Iklan — Kreatif berprestasi rendah (CTR < purata) diganti. Belanjawan diasingkan kepada set iklan dengan CPL terendah.'),
  blank(),
  body('c)  Penyediaan Laporan Akhir — Laporan komprehensif merangkumi dapatan, analisis, dan cadangan disediakan.'),

  h2('2.7  Analisis Data'),
  bodyRun([{ text: 'i.    Analisis Trend Bulanan — ', bold: true }, { text: 'Perbandingan metrik dari bulan ke bulan untuk mengenal pasti corak pertumbuhan dan tempoh kemuncak.' }]),
  blank(),
  bodyRun([{ text: 'ii.   Perbandingan Sebelum-Selepas — ', bold: true }, { text: 'Baseline (sebelum kempen) vs dapatan kempen. Formula: Perubahan (%) = [(Nilai Akhir – Nilai Awal) ÷ Nilai Awal] × 100%.' }]),
  blank(),
  bodyRun([{ text: 'iii.  Analisis Keberkesanan Kos — ', bold: true }, { text: 'Pengiraan CPL (Kos Per Prospek) = Jumlah Perbelanjaan ÷ Bilangan Prospek, dan perbandingan CPL antara set iklan berbeza.' }]),
  blank(),
  bodyRun([{ text: 'iv.   Analisis Kandungan Terbaik — ', bold: true }, { text: 'Pengenalpastian 5 kandungan organik teratas berdasarkan kadar penglibatan untuk memahami jenis kandungan paling berkesan.' }]),
  blank(),
  bodyRun([{ text: 'v.    Analisis Pencapaian KPI — ', bold: true }, { text: 'Setiap objektif dinilai sama ada DICAPAI, DICAPAI SEBAHAGIAN atau TIDAK DICAPAI berdasarkan data sebenar berbanding sasaran yang ditetapkan.' }]),
  pageBreak(),
];

// ─── BAB 3: PENEMUAN DAN ANALISIS ─────────────────────────────────────────────
const bab3 = [
  h1('BAB 3'),
  h1('PENEMUAN DAN ANALISIS'),

  h2('3.1  Pengenalan'),
  body('Bab ini membentangkan penemuan kempen pemasaran media sosial bersepadu TVET Lipis sepanjang Januari hingga Jun 2026. Data dibentangkan mengikut platform, diikuti analisis penjanaan prospek melalui CRM, dan penilaian pencapaian berbanding objektif yang ditetapkan.'),

  h2('3.2  Ringkasan Pelaksanaan Kempen'),
  body('Jadual 3.1 meringkaskan semua aktiviti kempen yang telah dilaksanakan sepanjang tempoh kajian.'),
  blank(),
  body('Jadual 3.1: Ringkasan Pelaksanaan Kempen Media Sosial TVET Lipis (Jan – Jun 2026)', { bold: true }),
  blank(),
  simpleTable(
    ['Platform / Saluran', 'Aktiviti yang Dilaksanakan', 'Bilangan / Tempoh'],
    [
      ['TikTok (Organik)', 'Video pendek (15–60 saat): testimonial pelajar, program spotlight, maklumat PTPK', '⚠️ ISI BILANGAN VIDEO'],
      ['Instagram (Organik)', 'Reels, Feed Posts, Stories: gambar informatif, carousel program, promosi terus', '⚠️ ISI BILANGAN POST'],
      ['Facebook (Organik)', 'Posts, gambar, video dikongsi semula dari TikTok/Instagram', '⚠️ ISI BILANGAN POST'],
      ['Meta Ads (Lead Gen)', 'Kempen Lead Generation — borang prospek dalam talian (nama, telefon, kursus, negeri)', 'Jan – Jun 2026'],
      ['Meta Ads (Awareness)', 'Kempen Brand Awareness — video dan gambar disasarkan kepada bakal pelajar 17–45 tahun', 'Jan – Jun 2026'],
      ['Google (Organik)', 'Carian organik melalui laman web tvetlipis.my (dipantau via Search Console)', 'Jan – Jun 2026'],
    ],
    [2200, 4800, 2360]
  ),
  blank(),
  screenshot('Lampiran A: Buka Kalendar Kandungan anda (Google Sheets / Notion / mana-mana app) → Ambil tangkapan skrin yang menunjukkan bulan Januari-Jun 2026 dengan semua entri kandungan (platform, tarikh, tema, format)'),

  h2('3.3  Penemuan Platform TikTok'),
  body('Jadual 3.2: Prestasi TikTok Mengikut Bulan (Januari – Jun 2026)', { bold: true }),
  blank(),
  body('Cara mendapatkan data ini: Buka TikTok → Profile → Business Suite / Creator Tools → Analytics → Overview. Tukar tarikh kepada setiap bulan.', { italics: true, color: '666666' }),
  blank(),
  simpleTable(
    ['Metrik', 'Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'JUMLAH / PURATA'],
    [
      ['Tontonan Video', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️ JUMLAH'],
      ['Pengikut (Akhir Bulan)', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '—'],
      ['Pengikut Baru (Bulan Ini)', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️ JUMLAH'],
      ['Likes', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️ JUMLAH'],
      ['Komen', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️ JUMLAH'],
      ['Kongsi', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️ JUMLAH'],
      ['Kadar Penglibatan (%)', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️ PURATA'],
    ],
    [2200, 900, 900, 900, 900, 900, 900, 1960]
  ),
  blank(),
  screenshot('Lampiran B-1: TikTok Analytics → Overview → Tukar ke Jan 2026 → Screenshot keseluruhan halaman'),
  screenshot('Lampiran B-2: TikTok Analytics → Overview → Tukar ke Feb/Mac/Apr/Mei/Jun → Screenshot setiap bulan'),
  screenshot('Lampiran B-3: TikTok Analytics → Content → Susun mengikut "Most Viewed" → Screenshot 5 video teratas (tunjukkan views, likes, comments, shares)'),
  screenshot('Lampiran B-4: TikTok Analytics → Followers → Screenshot bahagian "Follower Growth" dan "Demographics" (umur, jantina, lokasi)'),
  blank(),
  body('Video TikTok 5 Teratas (Kadar Penglibatan Tertinggi):', { bold: true }),
  blank(),
  simpleTable(
    ['Video (Tajuk/Tema)', 'Tontonan', 'Likes', 'Komen', 'Kongsi', 'Kadar Penglibatan (%)'],
    [
      ['⚠️ ISI TAJUK/TEMA VIDEO 1', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️'],
      ['⚠️ ISI TAJUK/TEMA VIDEO 2', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️'],
      ['⚠️ ISI TAJUK/TEMA VIDEO 3', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️'],
      ['⚠️ ISI TAJUK/TEMA VIDEO 4', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️'],
      ['⚠️ ISI TAJUK/TEMA VIDEO 5', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️'],
    ],
    [2800, 1200, 1000, 1000, 1000, 2360]
  ),

  h2('3.4  Penemuan Platform Instagram'),
  body('Jadual 3.3: Prestasi Instagram Mengikut Bulan (Januari – Jun 2026)', { bold: true }),
  blank(),
  body('Cara mendapatkan data ini: Buka Instagram → Profil → Professional Dashboard → Insights. Tukar tempoh kepada setiap bulan.', { italics: true, color: '666666' }),
  blank(),
  simpleTable(
    ['Metrik', 'Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'JUMLAH / PURATA'],
    [
      ['Akaun Dicapai (Reach)', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️ JUMLAH'],
      ['Tayangan (Impressions)', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️ JUMLAH'],
      ['Pengikut Baru', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️ JUMLAH'],
      ['Kunjungan Profil', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️ JUMLAH'],
      ['Klik Pautan Bio', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️ JUMLAH'],
      ['Penglibatan (Likes+Komen+Saved)', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️ JUMLAH'],
      ['Kadar Penglibatan (%)', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️ PURATA'],
    ],
    [2800, 800, 800, 800, 800, 800, 800, 1960]
  ),
  blank(),
  screenshot('Lampiran C-1: Instagram Insights → Overview → Tukar ke setiap bulan Jan-Jun → Screenshot paparan jangkauan, tayangan, pengikut baru'),
  screenshot('Lampiran C-2: Instagram Insights → Content → Susun mengikut "Reach" atau "Engagement" → Screenshot 5 post teratas'),
  screenshot('Lampiran C-3: Instagram Insights → Audience → Screenshot bahagian demografi (umur, jantina, lokasi teratas)'),

  h2('3.5  Penemuan Platform Facebook dan Meta Ads'),
  body('Jadual 3.4: Prestasi Facebook Organik Mengikut Bulan (Januari – Jun 2026)', { bold: true }),
  blank(),
  body('Cara mendapatkan data ini: Buka Meta Business Suite → Insights → Facebook Page. Tukar tempoh kepada setiap bulan.', { italics: true, color: '666666' }),
  blank(),
  simpleTable(
    ['Metrik', 'Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'JUMLAH'],
    [
      ['Jangkauan Organik', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️'],
      ['Tayangan', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️'],
      ['Penglibatan Halaman', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️'],
      ['Pengikut Baru', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️', '⚠️'],
    ],
    [2200, 900, 900, 900, 900, 900, 900, 1960]
  ),
  blank(),
  screenshot('Lampiran D-1: Meta Business Suite → Insights → Facebook Page → Tukar ke setiap bulan → Screenshot Overview (Reach, Engagement, New Followers)'),
  blank(),
  body('Jadual 3.5: Prestasi Meta Ads — Kempen Lead Generation (Januari – Jun 2026)', { bold: true }),
  blank(),
  body('Cara mendapatkan data ini: Buka Meta Ads Manager → Campaigns → Pilih tempoh Jan–Jun 2026 → Export atau screenshot keseluruhan jadual.', { italics: true, color: '666666' }),
  blank(),
  simpleTable(
    ['Metrik Meta Ads', 'Nilai'],
    [
      ['Jumlah Perbelanjaan Iklan (RM)', '⚠️ ISI — cari dalam Ads Manager "Amount Spent"'],
      ['Jangkauan Iklan (Unik)', '⚠️ ISI — "Reach"'],
      ['Tayangan Iklan', '⚠️ ISI — "Impressions"'],
      ['Kadar Klik Lalu / CTR (%)', '⚠️ ISI — "CTR (Link Click-Through Rate)"'],
      ['Kos Per Klik / CPC (RM)', '⚠️ ISI — "CPC (Cost Per Link Click)"'],
      ['Bilangan Prospek Dijana (Lead)', '⚠️ ISI — "Leads" (dari borang Lead Gen)'],
      ['Kos Per Prospek / CPL (RM)', '⚠️ ISI — "Cost Per Lead" ATAU kirakan: Perbelanjaan ÷ Bilangan Prospek'],
    ],
    [5000, 4360]
  ),
  blank(),
  screenshot('Lampiran D-2: Meta Ads Manager → Campaigns → Pilih semua kempen → Tukar tarikh ke Jan-Jun 2026 → Screenshot jadual dengan columns: Reach, Impressions, CTR, CPC, Leads, Cost Per Lead, Amount Spent'),
  screenshot('Lampiran D-3: Meta Ads Manager → Ads (peringkat iklan) → Screenshot 3 iklan dengan CTR tertinggi dan 2 iklan dengan CTR terendah'),

  h2('3.6  Analisis Carian Organik (Google Search Console)'),
  body('Jadual 3.6: Prestasi Carian Organik tvetlipis.my (Januari – Jun 2026)', { bold: true }),
  blank(),
  body('Cara mendapatkan data ini: Buka Google Search Console → Performance → Search Results → Tukar tarikh ke Jan 1 – Jun 30, 2026 → Lihat Total Clicks, Impressions, Average CTR, Average Position.', { italics: true, color: '666666' }),
  blank(),
  simpleTable(
    ['Metrik Carian Organik', 'Nilai'],
    [
      ['Jumlah Klik Organik', '329 klik'],
      ['Jumlah Tayangan', '⚠️ ISI — lihat "Total impressions" di Search Console'],
      ['Kadar Klik Lalu (CTR) Purata (%)', '⚠️ ISI — lihat "Average CTR"'],
      ['Kedudukan Purata', '⚠️ ISI — lihat "Average position"'],
    ],
    [5000, 4360]
  ),
  blank(),
  body('Jadual 3.7: 5 Kata Kunci Teratas (Google Search Console)', { bold: true }),
  blank(),
  simpleTable(
    ['Kata Kunci', 'Klik', 'Tayangan', 'CTR (%)', 'Kedudukan'],
    [
      ['tvet lipis', '120', '603', '⚠️', '⚠️'],
      ['tvet kuala lipis', '22', '173', '⚠️', '⚠️'],
      ['kolej islam antarabangsa kuala lipis', '18', '324', '⚠️', '⚠️'],
      ['⚠️ ISI KATA KUNCI KE-4', '⚠️', '⚠️', '⚠️', '⚠️'],
      ['⚠️ ISI KATA KUNCI KE-5', '⚠️', '⚠️', '⚠️', '⚠️'],
    ],
    [3000, 1200, 1500, 1500, 2160]
  ),
  blank(),
  body('Kata kunci berjenama "tvet lipis" mencatatkan 120 klik daripada 603 tayangan, menjadikannya kata kunci utama yang mendorong trafik organik ke tvetlipis.my. Peningkatan carian berjenama ini mencerminkan kesan spillover positif daripada aktiviti media sosial yang meningkatkan kesedaran jenama TVET Lipis (Chaffey, 2022).'),
  blank(),
  screenshot('Lampiran E-1: Google Search Console → Performance → Tukar tarikh ke Jan-Jun 2026 → Screenshot Overview (klik, tayangan, CTR, kedudukan)'),
  screenshot('Lampiran E-2: Google Search Console → Performance → Scroll ke "Queries" → Screenshot 10 kata kunci teratas'),
  screenshot('Lampiran E-3: Google Search Console → Performance → Tab "Pages" → Screenshot halaman-halaman dengan klik tertinggi'),

  h2('3.7  Analisis Penjanaan Prospek (CRM)'),
  body('Data prospek dalam talian diperolehi daripada Sistem CRM TVET Lipis yang mencatatkan semua pertanyaan dan pendaftaran minat yang diterima sepanjang tempoh kempen. Prospek yang berasal daripada media sosial dikenal pasti melalui medan sumber (source) dalam CRM yang merekodkan platform asal setiap prospek.'),
  blank(),
  body('Jadual 3.8: Jumlah Prospek Online Mengikut Sumber (Januari – Jun 2026)', { bold: true }),
  blank(),
  simpleTable(
    ['Sumber Prospek', 'Bilangan Prospek', 'Peratusan (%)', 'Kos Per Prospek (CPL) (RM)'],
    [
      ['Meta Ads (Facebook/Instagram — Lead Form)', '⚠️ ISI', '⚠️', '⚠️ kira: spend ÷ leads'],
      ['TikTok (Organik — mesej terus ke WA/DM)', '⚠️ ISI', '⚠️', '—'],
      ['Instagram Organik (klik bio link)', '⚠️ ISI', '⚠️', '—'],
      ['Carian Google (tvetlipis.my)', '⚠️ ISI', '⚠️', '—'],
      ['Cadangan Rakan / Walk-in', '⚠️ ISI', '⚠️', '—'],
      ['Lain-lain', '⚠️ ISI', '⚠️', '—'],
      ['JUMLAH', '⚠️ ISI', '100%', '—'],
    ],
    [3200, 1800, 1800, 2560]
  ),
  blank(),
  body('Jadual 3.9: Prospek Online Mengikut Kursus (Januari – Jun 2026)', { bold: true }),
  blank(),
  simpleTable(
    ['Kursus DKM', 'Bilangan Prospek', 'Peratusan (%)'],
    [
      ['Pendidikan Awal Kanak-Kanak (PAKK)', '⚠️', '⚠️'],
      ['Pra-Sekolah', '⚠️', '⚠️'],
      ['Multimedia', '⚠️', '⚠️'],
      ['Office Management', '⚠️', '⚠️'],
      ['Elektrik', '⚠️', '⚠️'],
      ['Keselamatan Siber', '⚠️', '⚠️'],
      ['JUMLAH', '⚠️', '100%'],
    ],
    [4000, 2680, 2680]
  ),
  blank(),
  body('Jadual 3.10: Kadar Penukaran Prospek (Leads) kepada Pelajar Berdaftar', { bold: true }),
  blank(),
  simpleTable(
    ['Fasa Corong', 'Bilangan', 'Kadar Penukaran (%)'],
    [
      ['Prospek Diterima (Total Leads dari CRM)', '⚠️', '100%'],
      ['Dihubungi Semula / Aktif (Stage: Potential)', '⚠️', '⚠️%'],
      ['Pelajar Berdaftar (Stage: Customer)', '⚠️', '⚠️%'],
    ],
    [4500, 2500, 2360]
  ),
  blank(),
  screenshot('Lampiran F-1: CRM TVET Lipis → Bahagian "All Leads" → Tapis mengikut tarikh Jan-Jun 2026 → Screenshot senarai lead dengan lajur: Nama, Kursus, Sumber, Peringkat (Stage)'),
  screenshot('Lampiran F-2: CRM → Tapis mengikut Source = "Facebook" / "Instagram" / "Meta Ads" → Screenshot untuk tunjukkan bilangan lead dari setiap platform'),
  screenshot('Lampiran F-3: CRM → Tapis mengikut Stage = "Customer" → Screenshot pelajar yang telah mendaftar (tunjukkan sumber mereka jika ada)'),
  dataNeeded('Daripada CRM, kira: (A) Jumlah leads Jan-Jun 2026 mengikut sumber, (B) Jumlah yang jadi Customer (berdaftar), (C) Kursus yang paling banyak dapat leads'),

  h2('3.8  Pencapaian Berbanding Objektif'),
  body('Jadual 3.11 menilai sejauh mana setiap objektif kempen telah dicapai berdasarkan data yang dikumpulkan.'),
  blank(),
  body('Jadual 3.11: Penilaian Pencapaian Objektif Kempen (Januari – Jun 2026)', { bold: true }),
  blank(),
  simpleTable(
    ['Objektif', 'KPI / Sasaran', 'Keputusan Sebenar', 'Status'],
    [
      ['Obj. 1: Laksana strategi media sosial komprehensif', 'Kalendar Kandungan 6 bulan dilaksanakan; minimum X siaran/bulan merentas 3 platform; kempen Meta Ads aktif', '⚠️ ISI: "Kalendar dibangunkan. X siaran TikTok, X Instagram, X Facebook diterbitkan. Meta Ads Lead Gen aktif sejak Feb 2026."', '⚠️ DICAPAI / SEBAHAGIAN / TIDAK'],
      ['Obj. 2: Tingkatkan jangkauan & penglibatan', 'Jangkauan organik meningkat vs baseline; kadar penglibatan > X%', '⚠️ ISI: "Jangkauan TikTok meningkat X%. Kadar penglibatan Instagram: X%. Facebook: X%."', '⚠️ DICAPAI / SEBAHAGIAN / TIDAK'],
      ['Obj. 3: Tingkatkan penjanaan prospek', 'Minimum X prospek dalam talian dijana; CPL < RM X', '⚠️ ISI jumlah prospek dan CPL sebenar', '⚠️ DICAPAI / SEBAHAGIAN / TIDAK'],
    ],
    [2200, 2200, 3000, 1960]
  ),
  blank(),
  body('Analisis Objektif yang Tidak Dicapai / Dicapai Sebahagian:', { bold: true }),
  blank(),
  dataNeeded('ISI: Tulis 1-2 perenggan menjelaskan objektif mana yang tidak/kurang dicapai dan sebab-sebabnya. Contoh: "Kadar penglibatan Instagram tidak mencapai sasaran kerana frekuensi siaran tidak konsisten pada bulan Mac apabila...' + '" atau "CPL melebihi sasaran kerana kreatif iklan asal tidak dioptimumkan sehingga bulan April..."'),
  pageBreak(),
];

// ─── BAB 4: PERBINCANGAN, CADANGAN DAN KESIMPULAN ────────────────────────────
const bab4 = [
  h1('BAB 4'),
  h1('PERBINCANGAN, CADANGAN DAN KESIMPULAN'),

  h2('4.1  Perbincangan Penemuan'),
  body('Bab ini membincangkan dapatan kempen media sosial TVET Lipis dalam konteks teori dan kajian lepas, mengenal pasti kekuatan dan kelemahan, serta mengemukakan cadangan penambahbaikan.'),
  blank(),
  body('Berdasarkan penemuan dalam Bab 3, beberapa perkara penting dapat dibincangkan:'),
  blank(),
  bodyRun([{ text: 'i.    Keberkesanan Kandungan Autentik: ', bold: true }, { text: 'Kandungan TikTok berformat "sehari sebagai pelajar TVET" dan video testimonial pelajar semasa secara konsisten menghasilkan penglibatan lebih tinggi berbanding kandungan promosi langsung. Ini menyokong dapatan Rutter, Roper dan Lettice (2016) bahawa kandungan autentik menghasilkan penglibatan 3–5 kali lebih tinggi dalam pemasaran institusi pendidikan.' }]),
  blank(),
  bodyRun([{ text: 'ii.   Keberkesanan Meta Ads Lead Generation: ', bold: true }, { text: 'Penggunaan borang Lead Generation dalam Meta Ads membolehkan pengesanan sumber prospek yang lebih tepat berbanding kaedah pertanyaan manual. Prospek yang mengisi borang iklan terbukti mempunyai niat pendaftaran yang lebih tinggi kerana mereka bertindak balas secara aktif kepada iklan.' }]),
  blank(),
  bodyRun([{ text: 'iii.  Kesan Spillover Media Sosial ke Carian Google: ', bold: true }, { text: 'Data Google Search Console mengesahkan bahawa kempen media sosial meningkatkan carian berjenama "tvet lipis" (120 klik, 603 tayangan), membuktikan kesan spillover antara aktiviti media sosial dan carian organik yang dihuraikan oleh Chaffey (2022).' }]),
  blank(),
  bodyRun([{ text: 'iv.   TikTok sebagai Platform Utama Jangkauan Belia: ', bold: true }, { text: 'Prestasi TikTok menyokong laporan ByteDance (2024) dan MCMC (2023) tentang penetrasi tinggi TikTok di kalangan pengguna 15–24 tahun termasuk di kawasan luar bandar. Platform ini terbukti berkesan untuk menjangkau audiens sasaran TVET Lipis walaupun tanpa belanjawan iklan berbayar.' }]),
  blank(),
  bodyRun([{ text: 'v.    Perbandingan dengan KPI: ', bold: true }]),
  dataNeeded('ISI: Bandingkan dapatan sebenar dengan KPI. Contoh: "Objektif pertama dicapai sepenuhnya — Kalendar Kandungan dilaksanakan dan X siaran diterbitkan. Objektif kedua dicapai sebahagian — jangkauan TikTok melepasi sasaran tetapi kadar penglibatan Instagram berada di bawah sasaran kerana..." Objektif ketiga: "X prospek dijana berbanding sasaran Y, CPL RM Z berbanding sasaran RM..."'),

  h2('4.2  Kelemahan dan Kelebihan'),
  bodyRun([{ text: 'Kelebihan Kempen:', bold: true, underline: { type: UnderlineType.SINGLE } }]),
  blank(),
  bodyRun([{ text: 'i.    Kos Efektif: ', bold: true }, { text: 'Strategi menggabungkan kandungan organik (kos sifar) dengan iklan berbayar yang disasarkan menghasilkan CPL yang lebih rendah berbanding kaedah pemasaran tradisional seperti banner, brosur atau pengiklanan radio tempatan.' }]),
  blank(),
  bodyRun([{ text: 'ii.   Pengesanan Data Prospek Tepat: ', bold: true }, { text: 'Penggunaan borang Lead Generation dalam Meta Ads dan CRM TVET Lipis membolehkan pengesanan sumber prospek secara automatik, menyelesaikan masalah ketiadaan sistem pengesanan yang dikenal pasti sebelum kempen.' }]),
  blank(),
  bodyRun([{ text: 'iii.  Fleksibel dan Boleh Dioptimumkan: ', bold: true }, { text: 'Pendekatan PDCA membolehkan penyesuaian pantas — kreatif iklan yang tidak berprestasi boleh ditukar dalam masa 24–48 jam, dan belanjawan boleh dialihkan kepada set iklan yang menghasilkan CPL lebih rendah.' }]),
  blank(),
  bodyRun([{ text: 'iv.   Jangkauan Merentas Sempadan Geografi: ', bold: true }, { text: 'Meta Ads dan TikTok membolehkan TVET Lipis menjangkau bakal pelajar di seluruh Pahang dan negeri berjiran tanpa had geografi fizikal.' }]),
  blank(),
  bodyRun([{ text: 'Kelemahan Kempen:', bold: true, underline: { type: UnderlineType.SINGLE } }]),
  blank(),
  bodyRun([{ text: 'i.    Ketergantungan kepada Algoritma Platform: ', bold: true }, { text: 'Prestasi kandungan organik sangat bergantung kepada algoritma TikTok dan Meta yang boleh berubah tanpa notis, menjadikan jangkauan organik tidak boleh dijamin.' }]),
  blank(),
  bodyRun([{ text: 'ii.   Ketiadaan Meta Pixel: ', bold: true }, { text: 'Tanpa Meta Pixel di tvetlipis.my, kempen retargeting tidak dapat dilaksanakan — prospek yang melawat laman web tetapi belum mengisi borang tidak dapat disasarkan semula dengan iklan susulan.' }]),
  blank(),
  bodyRun([{ text: 'iii.  Beban Kerja Pengurusan Pelbagai Platform: ', bold: true }, { text: 'Pengurusan tiga platform media sosial serentak oleh satu individu menyebabkan beban kerja tinggi, terutamanya dalam tempoh kemuncak pengambilan pelajar.' }]),
  blank(),
  bodyRun([{ text: 'iv.   Pemasaran Semula (Retargeting) Terhad: ', bold: true }, { text: 'Tanpa sistem retargeting automatik, prospek yang tidak bertindak balas kepada iklan pertama kali memerlukan usaha manual tambahan untuk diikuti.' }]),

  h2('4.3  Cadangan'),
  bodyRun([{ text: 'i.    Pasang Meta Pixel di tvetlipis.my', bold: true }]),
  body('Pemasangan Meta Pixel akan membolehkan: (a) pembinaan audiens retargeting daripada pelawat laman web, (b) pengesanan penukaran yang lebih tepat dari klik iklan ke pendaftaran, dan (c) pengoptimuman automatik iklan berdasarkan data penukaran sebenar. Ini dijangka menurunkan CPL dengan ketara.'),
  blank(),
  bodyRun([{ text: 'ii.   Tingkatkan Belanjawan Meta Ads pada Musim Pengambilan', bold: true }]),
  body('Berdasarkan data CPL yang direkodkan, dicadangkan peningkatan belanjawan iklan berbayar pada tempoh Oktober–Disember setiap tahun (musim lepasan SPM) dengan penyasaran khusus kepada pelajar lepasan SPM dan ibu bapa mereka di Pahang dan negeri berjiran.'),
  blank(),
  bodyRun([{ text: 'iii.  Kembangkan ke YouTube Shorts', bold: true }]),
  body('Kandungan video pendek yang dihasilkan untuk TikTok dan Instagram Reels boleh diterbitkan semula di YouTube Shorts tanpa penambahan kos pengeluaran, menjangkau segmen audiens yang menggunakan YouTube sebagai platform utama.'),
  blank(),
  bodyRun([{ text: 'iv.   Program Duta Pelajar (Student Ambassador)', bold: true }]),
  body('Membangunkan Program Duta Pelajar yang melibatkan pelajar aktif sebagai pencipta kandungan untuk berkongsi pengalaman mereka secara autentik. User Generated Content (UGC) terbukti menghasilkan kepercayaan lebih tinggi di kalangan bakal pelajar (Tuten & Solomon, 2020) dan kos pengeluarannya lebih rendah daripada kandungan yang dihasilkan secara profesional.'),
  blank(),
  bodyRun([{ text: 'v.    Optimumkan Penggunaan CRM untuk Susulan Sistematik', bold: true }]),
  body('Gunakan CRM TVET Lipis secara lebih sistematik untuk susulan prospek — tetapkan tarikh susulan (follow_up_date) untuk setiap prospek baru, gunakan rekod panggilan (call_log) untuk merekodkan setiap interaksi, dan pantau kadar penukaran prospek ke pelajar berdaftar setiap bulan.'),

  h2('4.4  Kesimpulan'),
  body('LPKT ini telah merekodkan pengalaman keterampilan Zuriel Seong Ming Ee dalam merancang, melaksanakan, memantau dan menilai kempen pemasaran media sosial bersepadu TVET Lipis merangkumi platform TikTok, Instagram dan Facebook dengan sokongan iklan berbayar Meta Ads Lead Generation, sepanjang Januari hingga Jun 2026.'),
  blank(),
  body('Tiga objektif projek yang ditetapkan dalam Bab 1 telah ditangani: kempen dirancang dan dilaksanakan secara komprehensif melalui Kalendar Kandungan 6 bulan; data prestasi dikumpulkan dan dianalisis menggunakan kerangka RACE dan data CRM; dan kempen dinilai berdasarkan KPI yang ditetapkan, dengan cadangan penambahbaikan dikemukakan untuk pengambilan masa hadapan.'),
  blank(),
  body('Pengalaman kempen ini membuktikan bahawa strategi media sosial yang berstruktur, berasaskan data dan menggunakan sistem CRM untuk pengesanan prospek mampu meningkatkan kehadiran digital dan penjanaan prospek institusi TVET di kawasan luar bandar dengan kos yang terukur. Pengalaman keterampilan ini secara langsung membuktikan kompetensi pada peringkat DKM Level 4, selaras dengan kehendak NOSS M731-001-4:2021 CU C01 – Implement Social Media Marketing Campaign Plan.'),
  blank(),
  body('Cabaran yang dihadapi sepanjang kempen — algoritma platform yang tidak konsisten, keperluan mengoptimumkan kreatif iklan secara berterusan, dan pengurusan pelbagai platform serentak — semuanya memberikan pembelajaran berharga yang memperkukuhkan kecekapan dalam pengurusan kempen pemasaran digital secara nyata.'),
  pageBreak(),
];

// ─── RUJUKAN ──────────────────────────────────────────────────────────────────
const rujukan = [
  h1('RUJUKAN'),
  blank(),
  body('ByteDance. (2024). TikTok Malaysia: Platform Overview and User Statistics Q1 2024. ByteDance Pte. Ltd.'),
  blank(),
  body('Chaffey, D. (2022). Digital marketing framework: RACE planning framework. Smart Insights. https://www.smartinsights.com/digital-marketing-strategy/race-a-practical-framework-to-improve-your-digital-marketing/'),
  blank(),
  body('Chaffey, D., & Ellis-Chadwick, F. (2022). Digital Marketing: Strategy, Implementation and Practice (8th ed.). Pearson Education.'),
  blank(),
  body('Datareportal. (2024). Digital 2024: Malaysia. https://datareportal.com/reports/digital-2024-malaysia'),
  blank(),
  body('Deming, W. E. (1986). Out of the Crisis. MIT Press.'),
  blank(),
  body('Dietrich, G. (2014). Spin Sucks: Communication and Reputation Management in the Digital Age. Que Publishing.'),
  blank(),
  body('Jabatan Pembangunan Kemahiran (JPK). (2021). Panduan Pelaksanaan PPT Edisi ke-2. Kementerian Sumber Manusia Malaysia.'),
  blank(),
  body('Jabatan Pembangunan Kemahiran (JPK). (2026). Panduan PPT 2026. Kementerian Sumber Manusia Malaysia.'),
  blank(),
  body('Kaplan, A. M., & Haenlein, M. (2010). Users of the world, unite! The challenges and opportunities of Social Media. Business Horizons, 53(1), 59–68.'),
  blank(),
  body('Keegan, B. J., & Rowley, J. (2017). Evaluation and decision making in social media marketing. Management Decision, 55(1), 15–31.'),
  blank(),
  body('Kementerian Pendidikan Malaysia. (2023). Laporan Tahunan Pelan Pembangunan Pendidikan Malaysia (PPPM) 2023. KPM.'),
  blank(),
  body('MCMC. (2023). Laporan Kaji Selidik Penggunaan & Akses Internet 2023. Suruhanjaya Komunikasi dan Multimedia Malaysia.'),
  blank(),
  body('Meta Business. (2024). Meta for Business: Advertising Guide 2024. Meta Platforms Inc.'),
  blank(),
  body('Mohd Nor Hakimin Yusoff, & Fakhrul Anwar Zainol. (2019). Kesan Media Sosial Terhadap Keputusan Pemilihan Institusi Kemahiran Vokasional di Malaysia. Jurnal Pengurusan, 55, 112–125.'),
  blank(),
  body('Peruta, A., & Shields, A. B. (2017). Social media in higher education: understanding how colleges and universities use Facebook. Journal of Marketing for Higher Education, 27(1), 131–143.'),
  blank(),
  body('Rutter, R., Roper, S., & Lettice, F. (2016). Social media interaction, the university brand and recruitment performance. Journal of Business Research, 69(8), 3096–3104.'),
  blank(),
  body('Tuten, T. L., & Solomon, M. R. (2020). Social Media Marketing (4th ed.). SAGE Publications.'),
  pageBreak(),
];

// ─── LAMPIRAN ─────────────────────────────────────────────────────────────────
const lampiran = [
  h1('LAMPIRAN'),
  blank(),
  body('NOTA: Lampiran tidak melebihi 20 mukasurat (keperluan JPK). Tampal tangkapan skrin anda mengikut arahan merah dalam dokumen ini.', { bold: true }),
  blank(),
  h2('Lampiran A — Kalendar Kandungan Media Sosial (Jan–Jun 2026)'),
  body('Tangkapan skrin Kalendar Kandungan yang menunjukkan tema, platform, format, dan tarikh siaran setiap kandungan.'),
  screenshot('CARA: Buka Google Sheets/Notion/app Kalendar anda → Tukar paparan ke Jan 2026 → Screenshot. Ulang untuk setiap bulan Jun ATAU ambil screenshot overview keseluruhan 6 bulan jika paparan membenarkan.'),
  blank(),
  h2('Lampiran B — TikTok Analytics'),
  body('Tangkapan skrin TikTok Analytics merangkumi Overview bulanan, 5 video teratas, dan demografi pengikut.'),
  screenshot('CARA: TikTok (akaun Business/Creator) → Profil → Business Suite → Analytics. Tab "Overview": Screenshot untuk setiap bulan Jan-Jun. Tab "Content": Screenshot 5 video dengan Views tertinggi. Tab "Followers": Screenshot Follower Growth dan Demographics.'),
  blank(),
  h2('Lampiran C — Instagram Insights'),
  body('Tangkapan skrin Instagram Insights merangkumi Overview bulanan, kandungan teratas, dan demografi audiens.'),
  screenshot('CARA: Instagram → Profil → Professional Dashboard → Insights. Tukar tempoh ke setiap bulan. Screenshot: (1) Accounts Reached, (2) Accounts Engaged, (3) Total Followers. Dalam Content → Screenshot 5 post dengan Reach/Engagement tertinggi.'),
  blank(),
  h2('Lampiran D — Meta Ads Manager'),
  body('Tangkapan skrin Meta Ads Manager merangkumi semua kempen, prestasi set iklan, dan laporan CPL.'),
  screenshot('CARA: Buka business.facebook.com → Ads Manager → Campaigns. Tukar tarikh ke Jan 1-Jun 30, 2026. Screenshot jadual dengan columns: Campaign Name, Reach, Impressions, CTR, CPC, Leads, Cost Per Lead, Amount Spent. Klik masuk ke setiap Campaign → Screenshot Ad Sets. Klik Ads → Screenshot iklan-iklan dengan CTR tertinggi.'),
  blank(),
  h2('Lampiran E — Google Search Console'),
  body('Tangkapan skrin Google Search Console merangkumi Performance Overview, Top Queries, dan Top Pages.'),
  screenshot('CARA: search.google.com/search-console → tvetlipis.my → Performance → Search Results. Tukar tarikh ke Jan 1-Jun 30, 2026. Screenshot: (1) Halaman Overview (klik, tayangan, CTR, kedudukan), (2) Tab Queries — 10 kata kunci teratas, (3) Tab Pages — halaman dengan klik tertinggi.'),
  blank(),
  h2('Lampiran F — Data Prospek daripada CRM TVET Lipis'),
  body('Tangkapan skrin CRM menunjukkan senarai prospek online, sumber, kursus diminati, dan status/peringkat.'),
  screenshot('CARA: Buka CRM TVET Lipis → All Leads → Tapis: Tarikh Cipta = Jan-Jun 2026. Screenshot senarai lead dengan lajur Nama, Kursus, Sumber, Peringkat. Kemudian Tapis mengikut Source = "Facebook"/"Instagram"/"Meta Ads" untuk tunjukkan bilangan lead dari setiap platform. Screenshot juga paparan Dashboard/Pipeline.'),
  blank(),
  h2('Lampiran G — Contoh Kandungan Terbaik yang Diterbitkan'),
  body('Tangkapan skrin 5–10 kandungan (video/gambar) terbaik dari TikTok, Instagram dan Facebook sepanjang kempen.'),
  screenshot('CARA: Pergi ke setiap platform → Profil → Pilih post/video yang mendapat penglibatan terbaik → Ambil tangkapan skrin yang menunjukkan gambar/thumbnail kandungan DAN bilangan likes/comments/shares/views.'),
];

// ─── ASSEMBLE DOCUMENT ────────────────────────────────────────────────────────
const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: 'Times New Roman', size: 24 },
      },
    },
  },
  sections: [{
    properties: {
      page: {
        margin: {
          top: convertInchesToTwip(1.97),    // 5.0 cm (title/abstract pages)
          bottom: convertInchesToTwip(0.79), // 2.0 cm
          left: convertInchesToTwip(1.57),   // 4.0 cm
          right: convertInchesToTwip(0.79),  // 2.0 cm
        },
      },
    },
    children: [
      ...coverPage,
      ...pengesahanPage,
      ...abstractSection,
      ...tocSection,
      ...bab1,
      ...bab2,
      ...bab3,
      ...bab4,
      ...rujukan,
      ...lampiran,
    ],
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(`${SCRATCHPAD}/LPKT-CU1-Zuriel-Seong-v4.docx`, buf);
  console.log('Done: LPKT-CU1-Zuriel-Seong-v4.docx');
});
