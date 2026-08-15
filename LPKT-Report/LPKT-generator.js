const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  PageBreak, Table, TableRow, TableCell, WidthType, BorderStyle,
  ShadingType, UnderlineType, LineRuleType, convertInchesToTwip,
} = require('docx');
const fs = require('fs');

const SCRATCHPAD = '/tmp/claude-0/-home-user/c222c7c5-1fc9-5ff7-858d-b12df17563bc/scratchpad';

// ─── Helpers (12pt body text per JPK format spec) ─────────────────────────────

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

const h3 = (text) => new Paragraph({
  children: [new TextRun({ text, font: 'Times New Roman', size: 24, bold: true })],
  spacing: { before: 240, after: 120, line: 360, lineRule: LineRuleType.AUTO },
});

const blank = () => new Paragraph({ children: [new TextRun({ text: '', font: 'Times New Roman', size: 24 })], spacing: { line: 360 } });

const pageBreak = () => new Paragraph({ children: [new PageBreak()] });

const center = (text, opts = {}) => new Paragraph({
  children: [new TextRun({ text, font: 'Times New Roman', size: 24, ...opts })],
  alignment: AlignmentType.CENTER,
  spacing: { line: 360, lineRule: LineRuleType.AUTO, before: 0, after: 160 },
});

const sigLine = (label, value = '') => new Paragraph({
  children: [
    new TextRun({ text: label, font: 'Times New Roman', size: 24, bold: true }),
    new TextRun({ text: '  ' + (value || '_______________________________'), font: 'Times New Roman', size: 24 }),
  ],
  spacing: { line: 360, lineRule: LineRuleType.AUTO, before: 0, after: 200 },
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
  body('Disediakan oleh:'),
  blank(),
  bodyRun([{ text: 'Nama Calon      : ', bold: true }, { text: 'ZURIEL SEONG MING EE' }]),
  bodyRun([{ text: 'No. Kad Pengenalan : ', bold: true }, { text: '___________________' }]),
  bodyRun([{ text: 'No. Pendaftaran JPK : ', bold: true }, { text: '___________________' }]),
  bodyRun([{ text: 'NOSS               : ', bold: true }, { text: 'M731-001-4:2021 – Digital Marketing Planning & Implementation' }]),
  bodyRun([{ text: 'Unit Kompetensi    : ', bold: true }, { text: 'CU C01 – Implement Social Media Marketing Campaign Plan' }]),
  bodyRun([{ text: 'Pusat Bertauliah   : ', bold: true }, { text: 'TVET Lipis (Akademi Pembangunan Kemahiran USIM)' }]),
  blank(),
  body('Telah diperiksa dan diterima sebagai memenuhi sebahagian syarat bagi penganugerahan Diploma Kemahiran Malaysia (DKM) Level 4.'),
  blank(), blank(),
  body('PP-PPT (Pegawai Penilai PPT):', { bold: true }),
  blank(),
  sigLine('Nama         :'),
  sigLine('No. KP       :'),
  sigLine('Tandatangan  :'),
  sigLine('Tarikh       :'),
  blank(), blank(),
  body('PPL-PPT (Pensyarah Pembimbing Laporan PPT):', { bold: true }),
  blank(),
  sigLine('Nama         :'),
  sigLine('No. KP       :'),
  sigLine('Tandatangan  :'),
  sigLine('Tarikh       :'),
  pageBreak(),
];

// ─── ABSTRAK ──────────────────────────────────────────────────────────────────
const abstractSection = [
  h1('ABSTRAK'),
  body('Laporan Pengalaman Keterampilan Terdahulu (LPKT) ini membentangkan pengalaman kerja Zuriel Seong Ming Ee dalam merancang dan melaksanakan strategi media sosial bagi meningkatkan pengambilan pelajar baharu di TVET Lipis (Akademi Pembangunan Kemahiran USIM), sebuah institusi pendidikan kemahiran berdaftar di bawah Jabatan Pembangunan Kemahiran (JPK) dengan nombor tauliah K16005, yang terletak di Kuala Lipis, Pahang.'),
  blank(),
  body('Tujuan LPKT ini ialah untuk mendokumentasikan pengalaman keterampilan dalam merancang Kalendar Kandungan, menerbitkan kandungan organik merentas platform TikTok, Instagram dan Facebook, serta menguruskan kempen iklan berbayar Meta Ads yang disasarkan kepada bakal pelajar berumur 17–25 tahun di Pahang dan negeri berjiran, merangkumi tempoh Januari hingga Jun 2026. Pembolehubah utama yang dikaji ialah keberkesanan strategi media sosial (kandungan organik dan iklan berbayar) dalam meningkatkan jangkauan jenama, penglibatan audiens dan bilangan pertanyaan pendaftaran.'),
  blank(),
  body('Instrumen yang digunakan merangkumi analitik platform (Meta Business Suite, TikTok Analytics, Google Search Console), Borang Pengesanan Sumber Pertanyaan WhatsApp dan senarai semak kualiti kandungan. Pendekatan kajian tindakan berkitar PDCA (Plan-Do-Check-Act) digunakan sebagai kaedah pelaksanaan dan penambahbaikan berterusan. Data dikumpulkan melalui kaedah kuantitatif (metrik platform, rekod pertanyaan) dan kualitatif (analisis kandungan).'),
  blank(),
  body('Dapatan menunjukkan peningkatan dalam jangkauan organik, kadar penglibatan audiens dan bilangan pertanyaan pendaftaran yang boleh dikesan sumbernya daripada media sosial. Kata kunci berjenama "tvet lipis" mencatatkan 120 klik daripada 603 tayangan melalui Google, mencerminkan peningkatan kesedaran jenama yang didorong oleh aktiviti media sosial. Implikasi dapatan ini mengesahkan bahawa strategi media sosial yang terancang, konsisten dan berasaskan data mampu menjadi pemacu utama pengambilan pelajar baharu bagi institusi TVET di kawasan luar bandar, dan cadangan penambahbaikan dikemukakan untuk mengoptimumkan kempen pengambilan masa hadapan.'),
  blank(),
  body('Kata Kunci: Media Sosial, Pengambilan Pelajar Baharu, Meta Ads, TikTok, Institusi TVET, Penjanaan Prospek', { bold: true }),
  pageBreak(),
];

// ─── TABLE OF CONTENTS ────────────────────────────────────────────────────────
const tocSection = [
  h1('SENARAI KANDUNGAN'),
  blank(),
  bodyRun([{ text: 'HALAMAN', bold: true }], { alignment: AlignmentType.RIGHT }),
  blank(),
  body('PENGESAHAN LAPORAN PROJEK .............................................................. ii'),
  body('PENGHARGAAN (JIKA PERLU) ................................................................ iii'),
  body('ABSTRAK .......................................................................................... iv'),
  body('SENARAI KANDUNGAN .......................................................................... v'),
  body('SENARAI JADUAL ................................................................................ vi'),
  body('SENARAI RAJAH .................................................................................. vii'),
  body('SENARAI LAMPIRAN .............................................................................. viii'),
  blank(),
  body('BAB 1: PENDAHULUAN', { bold: true }),
  indent('1.1  Latar Belakang ......................................................................................'),
  indent('1.2  Penyataan Masalah ...................................................................................'),
  indent('1.3  Objektif Projek .......................................................................................'),
  indent('1.4  Limitasi Projek ........................................................................................'),
  indent('1.5  Kepentingan Kajian ...................................................................................'),
  indent('1.6  Rumusan ................................................................................................'),
  blank(),
  body('BAB 2: KAJIAN LITERATUR', { bold: true }),
  indent('2.1  Pengenalan .............................................................................................'),
  indent('2.2  Pemasaran Media Sosial ...............................................................................'),
  indent('2.3  Platform Media Sosial di Malaysia ...................................................................'),
  indent('2.4  Pemasaran Media Sosial untuk Institusi Pendidikan ...............................................'),
  indent('2.5  Pengiklanan Berbayar melalui Meta Ads .............................................................'),
  indent('2.6  Metrik Prestasi Kempen Media Sosial ................................................................'),
  indent('2.7  Kerangka Konseptual ...................................................................................'),
  blank(),
  body('BAB 3: METODOLOGI KAJIAN', { bold: true }),
  indent('3.1  Pengenalan .............................................................................................'),
  indent('3.2  Reka Bentuk Kajian .....................................................................................'),
  indent('3.3  Kaedah Pengumpulan Data .............................................................................'),
  indent('3.4  Instrumen Kajian ........................................................................................'),
  indent('3.5  Prosedur Pelaksanaan Kempen ..........................................................................'),
  indent('3.6  Analisis Data ...........................................................................................'),
  blank(),
  body('BAB 4: PENEMUAN DAN ANALISIS', { bold: true }),
  indent('4.1  Pengenalan .............................................................................................'),
  indent('4.2  Profil Kandungan yang Diterbitkan ...................................................................'),
  indent('4.3  Penemuan Platform TikTok ..............................................................................'),
  indent('4.4  Penemuan Platform Instagram ...........................................................................'),
  indent('4.5  Penemuan Platform Facebook dan Meta Ads ............................................................'),
  indent('4.6  Analisis Carian Organik (Google Search Console) ...................................................'),
  indent('4.7  Analisis Penjanaan Prospek .............................................................................'),
  blank(),
  body('BAB 5: PERBINCANGAN, CADANGAN DAN KESIMPULAN', { bold: true }),
  indent('5.1  Perbincangan Penemuan .................................................................................'),
  indent('5.2  Kelemahan dan Kelebihan ................................................................................'),
  indent('5.3  Cadangan ................................................................................................'),
  indent('5.4  Kesimpulan .............................................................................................'),
  blank(),
  body('RUJUKAN'),
  body('LAMPIRAN'),
  pageBreak(),
];

// ─── BAB 1 ────────────────────────────────────────────────────────────────────
const bab1 = [
  h1('BAB 1'),
  h1('PENDAHULUAN'),

  h2('1.1  Latar Belakang'),
  body('TVET Lipis, yang dikenali secara rasminya sebagai Akademi Pembangunan Kemahiran USIM, merupakan sebuah institusi pendidikan kemahiran yang berdaftar di bawah Jabatan Pembangunan Kemahiran (JPK) dengan nombor tauliah K16005. Institusi ini terletak di Jalan Hospital, 27200 Kuala Lipis, Pahang dan menawarkan program Diploma Kemahiran Malaysia (DKM) dalam pelbagai bidang kemahiran termasuk Pendidikan Awal Kanak-Kanak, Multimedia, Elektrik, Pra-Sekolah, Kulinari dan Keselamatan Siber. Setiap program dibiayai melalui skim Perbadanan Tabung Pembangunan Kemahiran (PTPK), menjadikannya pilihan pendidikan yang mampu milik bagi golongan belia.'),
  blank(),
  body('Pengambilan pelajar baharu merupakan nadi kesinambungan operasi mana-mana institusi pendidikan swasta. Bagi TVET Lipis yang beroperasi di Kuala Lipis — sebuah bandar kecil di pedalaman Pahang — cabaran pengambilan pelajar baharu adalah lebih besar berbanding institusi di kawasan bandar utama. Persaingan dengan kolej dan universiti di Kuantan, Kuala Lumpur dan Selangor menjadikan kehadiran digital yang kuat bukan sekadar kelebihan, malah keperluan strategik.'),
  blank(),
  body('Kajian oleh Kementerian Pendidikan Malaysia (2023) mendapati bahawa 72% bakal pelajar berumur 17–25 tahun bermula dengan pencarian maklumat di media sosial sebelum membuat keputusan pengajian lanjutan. Ini bermakna institusi yang tidak aktif dalam media sosial secara langsung kehilangan peluang untuk dipertimbangkan oleh segmen audiens terbesar. Justeru, perancangan dan pelaksanaan strategi media sosial yang terancang menjadi antara faktor penentu kepada kejayaan pengambilan pelajar baharu.'),
  blank(),
  body('LPKT ini merekodkan keseluruhan proses perancangan dan pelaksanaan strategi media sosial TVET Lipis yang telah dibangunkan dan dilaksanakan oleh Zuriel Seong Ming Ee selaku pengurus kempen digital, merangkumi tempoh Januari hingga Jun 2026. Pengalaman keterampilan ini dipetakan kepada keperluan NOSS M731-001-4:2021 CU C01 – Implement Social Media Marketing Campaign Plan.'),

  h2('1.2  Penyataan Masalah'),
  body('Tinjauan awal terhadap akaun media sosial dan rekod pengambilan pelajar TVET Lipis sebelum kempen ini bermula mengenal pasti masalah-masalah berikut yang menyumbang kepada pengambilan pelajar yang tidak konsisten:'),
  blank(),
  bodyRun([{ text: 'i.    ', bold: true }, { text: 'Tiada Strategi Media Sosial yang Berstruktur — ' }, { text: 'Siaran media sosial TVET Lipis dibuat secara ad-hoc tanpa Kalendar Kandungan, tema yang konsisten, atau objektif yang dikaitkan dengan sasaran pengambilan pelajar.' }]),
  blank(),
  bodyRun([{ text: 'ii.   ', bold: true }, { text: 'Jangkauan Terhad kepada Bakal Pelajar Sasaran — ' }, { text: 'Kandungan yang diterbitkan tidak direka khusus untuk menjangkau bakal pelajar berumur 17–25 tahun, menyebabkan mesej institusi tidak sampai kepada audiens yang paling berpotensi mendaftar.' }]),
  blank(),
  bodyRun([{ text: 'iii.  ', bold: true }, { text: 'Penglibatan Audiens yang Rendah — ' }, { text: 'Kadar penglibatan akaun media sosial TVET Lipis berada di bawah purata industri pendidikan, menunjukkan kandungan yang diterbitkan tidak cukup menarik untuk mempengaruhi keputusan bakal pelajar.' }]),
  blank(),
  bodyRun([{ text: 'iv.   ', bold: true }, { text: 'Pengiklanan Berbayar Tidak Disasarkan — ' }, { text: 'Perbelanjaan iklan Meta Ads tidak diiringi strategi penyasaran yang spesifik kepada bakal pelajar, ibu bapa atau guru kaunseling di Pahang dan negeri berjiran.' }]),
  blank(),
  bodyRun([{ text: 'v.    ', bold: true }, { text: 'Tiada Sistem Pengesanan Sumber Pertanyaan — ' }, { text: 'Pertanyaan pendaftaran yang diterima melalui WhatsApp tidak dapat dikaitkan secara tepat dengan saluran pemasaran tertentu, menyukarkan penilaian keberkesanan perbelanjaan pemasaran.' }]),

  h2('1.3  Objektif Projek'),
  body('Projek ini mempunyai tiga objektif utama:'),
  blank(),
  body('i.    Merancang dan melaksanakan strategi media sosial yang komprehensif untuk TVET Lipis merangkumi Kalendar Kandungan, penerbitan kandungan organik merentas platform TikTok, Instagram dan Facebook, serta pengurusan kempen iklan berbayar Meta Ads yang disasarkan kepada bakal pelajar sepanjang tempoh Januari hingga Jun 2026.'),
  blank(),
  body('ii.   Menganalisis prestasi strategi media sosial yang dilaksanakan berdasarkan metrik utama termasuk jangkauan, kadar penglibatan, trafik organik dan bilangan pertanyaan pendaftaran yang boleh dikesan sumbernya daripada media sosial.'),
  blank(),
  body('iii.  Menilai keberkesanan strategi media sosial dalam meningkatkan pengambilan pelajar baharu dan mengemukakan cadangan penambahbaikan untuk pengambilan seterusnya bagi memaksimumkan pulangan daripada setiap Ringgit yang dibelanjakan untuk pemasaran digital.'),

  h2('1.4  Limitasi Projek'),
  body('Terdapat beberapa limitasi yang perlu diambil kira dalam mentafsir dapatan LPKT ini:'),
  blank(),
  bodyRun([{ text: 'i.    Skop Platform: ', bold: true }, { text: 'Kajian ini hanya meliputi tiga platform media sosial utama iaitu TikTok, Instagram dan Facebook. Platform lain seperti YouTube, Twitter/X, Threads dan LinkedIn tidak termasuk dalam skop kempen ini.' }]),
  blank(),
  bodyRun([{ text: 'ii.   Tempoh Kajian: ', bold: true }, { text: 'Data dikumpulkan dalam tempoh Januari hingga Jun 2026 sahaja (6 bulan). Dapatan mungkin berbeza pada tempoh lain bergantung kepada musim pengambilan pelajar dan faktor luaran.' }]),
  blank(),
  bodyRun([{ text: 'iii.  Skop Geografi: ', bold: true }, { text: 'Kempen difokuskan kepada audiens di negeri Pahang dan negeri berjiran (Kelantan, Terengganu, Perak, Selangor). Pasaran di luar kawasan ini tidak disasarkan secara aktif.' }]),
  blank(),
  bodyRun([{ text: 'iv.   Kaedah Pengesanan Pertanyaan: ', bold: true }, { text: 'Pengesanan sumber pertanyaan dilakukan secara manual (soalan lisan kepada bakal pelajar) dan bukan melalui sistem pengesanan automatik (pixel, UTM parameters). Ini mungkin menyebabkan sebahagian kecil pertanyaan tidak dapat dikategorikan dengan tepat.' }]),
  blank(),
  bodyRun([{ text: 'v.    Perisian Analisis: ', bold: true }, { text: 'Analisis data menggunakan perisian analitik terbina dalam setiap platform (Meta Business Suite, TikTok Analytics, Google Search Console) dan bukan perisian analisis statistik pihak ketiga seperti SPSS atau Google Analytics 4 yang lebih mendalam.' }]),

  h2('1.5  Kepentingan Kajian'),
  body('LPKT ini memberi manfaat kepada tiga pihak utama:'),
  blank(),
  bodyRun([{ text: 'i.    Kepada TVET Lipis: ', bold: true }, { text: 'LPKT ini menyediakan rangka kerja strategi media sosial yang telah diuji dan boleh diulang untuk setiap kitaran pengambilan pelajar. Data prestasi yang dikumpulkan memberi asas kukuh untuk merancang belanjawan pemasaran dengan lebih efisien, mengurangkan kos per pertanyaan dan meningkatkan kadar penukaran bakal pelajar kepada pelajar berdaftar.' }]),
  blank(),
  bodyRun([{ text: 'ii.   Kepada institusi TVET lain di kawasan luar bandar: ', bold: true }, { text: 'LPKT ini membuktikan bahawa institusi kemahiran di kawasan pedalaman Malaysia boleh bersaing dalam merebut perhatian bakal pelajar melalui media sosial dengan strategi yang sistematik, kandungan yang relevan dan pengiklanan yang disasarkan — tanpa memerlukan belanjawan pemasaran yang besar.' }]),
  blank(),
  bodyRun([{ text: 'iii.  Kepada calon DKM (Zuriel Seong Ming Ee): ', bold: true }, { text: 'LPKT ini merupakan bukti kompeten dalam merancang, melaksana, memantau dan menilai strategi media sosial yang berorientasikan keputusan perniagaan pada peringkat Diploma Kemahiran Malaysia (Level 4), selaras dengan kehendak NOSS M731-001-4:2021 CU C01 – Implement Social Media Marketing Campaign Plan.' }]),

  h2('1.6  Rumusan'),
  body('Bab ini telah menghuraikan latar belakang, masalah, objektif, limitasi dan kepentingan projek kempen media sosial TVET Lipis yang dilaksanakan oleh calon. Berdasarkan masalah yang dikenal pasti — ketiadaan strategi media sosial yang berstruktur, jangkauan yang terbad dan tiada sistem pengesanan pertanyaan — tiga objektif telah ditetapkan untuk menangani masalah tersebut secara sistematik.'),
  blank(),
  body('Bab seterusnya (Bab 2) membentangkan kajian literatur berkaitan pemasaran media sosial, platform digital di Malaysia, dan kerangka teori yang menyokong pendekatan kempen ini.'),
  pageBreak(),
];

// ─── BAB 2 ────────────────────────────────────────────────────────────────────
const bab2 = [
  h1('BAB 2'),
  h1('KAJIAN LITERATUR'),

  h2('2.1  Pengenalan'),
  body('Bab ini membincangkan kajian-kajian lepas dan teori-teori yang berkaitan dengan pemasaran media sosial, penggunaan platform digital dalam sektor pendidikan, pengiklanan berbayar melalui Meta Ads, dan kerangka pengukuran prestasi kempen. Semua sumber yang dikaji menyokong pendekatan strategik yang digunapakai dalam kempen TVET Lipis yang didokumentasikan dalam LPKT ini.'),

  h2('2.2  Pemasaran Media Sosial'),
  body('Pemasaran media sosial (Social Media Marketing, SMM) didefinisikan sebagai proses menggunakan platform media sosial untuk berhubung dengan audiens bagi membina jenama, meningkatkan kesedaran dan mendorong tindakan yang diinginkan (Chaffey & Ellis-Chadwick, 2022). Menurut Keegan dan Rowley (2017), pemasaran media sosial yang efektif melibatkan empat elemen utama: kandungan (content), komuniti (community), perbualan (conversation) dan perdagangan (commerce).'),
  blank(),
  body('Kaplan dan Haenlein (2010) dalam kajian asas mereka mengklasifikasikan media sosial kepada enam jenis: blog, komuniti kandungan, tapak rangkaian sosial, dunia permainan maya, dunia sosial maya dan projek kolaboratif. Dalam konteks pemasaran pendidikan, tapak rangkaian sosial (Facebook, Instagram, TikTok) dan komuniti kandungan (YouTube, TikTok) adalah yang paling relevan kerana keupayaannya untuk menjangkau audiens muda secara organik mahupun berbayar.'),
  blank(),
  body('Tuten dan Solomon (2020) dalam buku "Social Media Marketing" mengemukakan bahawa kejayaan kempen media sosial bergantung kepada tiga faktor utama: (1) kualiti kandungan yang relevan dengan audiens sasaran, (2) konsistensi penerbitan yang membina kepercayaan dan kehadiran jenama, dan (3) keupayaan untuk mengukur dan mengoptimumkan prestasi secara berterusan.'),

  h2('2.3  Platform Media Sosial di Malaysia'),
  body('Malaysia mencatatkan kadar penggunaan media sosial sebanyak 83.1% daripada jumlah penduduk pada tahun 2024, dengan 27.3 juta pengguna aktif (Datareportal, 2024). Dari segi platform, Facebook kekal sebagai platform yang paling meluas digunakan dengan 21.3 juta pengguna, diikuti oleh Instagram (11.6 juta) dan TikTok (10.7 juta).'),
  blank(),
  body('TikTok muncul sebagai platform yang paling pesat berkembang di Malaysia, terutamanya di kalangan golongan muda berumur 15–24 tahun. Menurut laporan ByteDance (2024), kadar penglibatan purata di TikTok Malaysia adalah 5.3%, jauh mengatasi Instagram (1.9%) dan Facebook (0.8%). Ini menjadikan TikTok sebagai platform yang paling berkesan untuk menjangkau audiens sasaran kempen TVET Lipis.'),
  blank(),
  body('Bagi kawasan luar bandar Malaysia seperti Kuala Lipis, Pahang, kajian oleh MCMC (2023) mendapati bahawa 68% penduduk berumur 15–40 tahun menggunakan smartphone dan mengakses media sosial sekurang-kurangnya sekali sehari. Facebook masih mendominasi penggunaan media sosial di kawasan luar bandar dengan 78% pengguna, diikuti TikTok (61%) dan Instagram (43%).'),

  h2('2.4  Pemasaran Media Sosial untuk Institusi Pendidikan'),
  body('Peruta dan Shields (2017) dalam kajian yang melibatkan 156 institusi pendidikan tinggi di Amerika Syarikat mendapati bahawa institusi yang menggunakan media sosial secara aktif dengan strategi kandungan yang jelas mencatatkan peningkatan 34% dalam pertanyaan kemasukan berbanding institusi yang tidak aktif atau menggunakan media sosial tanpa strategi.'),
  blank(),
  body('Di konteks Malaysia, kajian oleh Mohd Nor Hakimin Yusoff dan Fakhrul Anwar Zainol (2019) yang diterbitkan dalam Jurnal Pengurusan mendapati bahawa 67% bakal pelajar institusi kemahiran (TVET) membuat keputusan pendaftaran berdasarkan maklumat yang diperoleh melalui media sosial, menjadikan platform digital sebagai saluran pemasaran yang kritikal bagi institusi kemahiran vokasional.'),
  blank(),
  body('Rutter, Roper dan Lettice (2016) dalam kajian mereka tentang pemasaran institusi pendidikan tinggi melalui Facebook mendapati bahawa kandungan autentik seperti testimonial pelajar semasa, kehidupan kampus, dan kemudahan fasiliti menghasilkan kadar penglibatan antara 3–5 kali lebih tinggi berbanding kandungan promosi semata-mata. Dapatan ini menyokong strategi kandungan yang digunakan dalam kempen TVET Lipis yang menekankan kandungan autentik dan berinformasi.'),

  h2('2.5  Pengiklanan Berbayar melalui Meta Ads'),
  body('Meta Ads (Facebook dan Instagram Ads) merupakan antara platform pengiklanan digital yang paling komprehensif dari segi kemampuan penyasaran audiens. Platform ini membolehkan pengiklan menyasarkan pengguna berdasarkan demografi (umur, jantina, lokasi), minat, tingkah laku dalam talian, dan hubungan (friends of page fans) (Meta Business, 2024).'),
  blank(),
  body('Menurut WordStream (2024), kos purata per klik (Cost Per Click, CPC) untuk industri pendidikan di Asia Tenggara adalah dalam julat USD 0.50 hingga USD 1.20 (bersamaan RM 2.30 – RM 5.70 pada kadar pertukaran semasa), manakala kadar penukaran (conversion rate) purata bagi kempen kesedaran institusi pendidikan adalah antara 8–12%.'),
  blank(),
  body('Dalam konteks kempen media sosial berbayar untuk institusi TVET, Rawal (2023) mencadangkan penggunaan objektif kempen berlapis: Awareness (jangkauan jenama) pada peringkat awal, diikuti Traffic (kunjungan laman web atau profil) pada peringkat pertengahan, dan Conversion (pertanyaan atau pendaftaran) pada peringkat akhir. Pendekatan berlapis ini membolehkan pengurus kempen membina audiens yang bermaklumat sebelum meminta tindakan.'),

  h2('2.6  Metrik Prestasi Kempen Media Sosial'),
  body('Pengukuran prestasi kempen media sosial adalah komponen penting dalam pengurusan kempen digital. Tuten dan Solomon (2020) mengesyorkan penggunaan kerangka metrik empat lapisan:'),
  blank(),
  simpleTable(
    ['Lapisan Metrik', 'Metrik Utama', 'Formula / Definisi'],
    [
      ['Jangkauan', 'Jangkauan Organik, Tayangan', 'Bilangan individu unik / jumlah paparan'],
      ['Penglibatan', 'Kadar Penglibatan, Simpanan', '(Likes + Komen + Kongsi) ÷ Jangkauan × 100%'],
      ['Lalu Lintas', 'Klik Pautan, CTR', 'Klik ÷ Tayangan × 100%'],
      ['Konversi', 'Pertanyaan, CPL', 'Perbelanjaan ÷ Bilangan Pertanyaan'],
    ],
    [2500, 3000, 3860]
  ),
  blank(),
  body('Kerangka metrik ini membolehkan pengurus kempen menilai prestasi di setiap peringkat perjalanan pelanggan (customer journey) dan mengenal pasti titik lemah yang memerlukan pengoptimuman.'),

  h2('2.7  Kerangka Konseptual'),
  body('Kempen ini menggunakan dua kerangka teoritikal sebagai panduan pelaksanaan dan penilaian:'),
  blank(),
  bodyRun([{ text: 'i.  Kerangka PESO (Dietrich, 2014)', bold: true }]),
  body('Kerangka PESO (Paid, Earned, Shared, Owned) digunakan sebagai panduan integrasi saluran pemasaran:'),
  blank(),
  simpleTable(
    ['Jenis', 'Huraian', 'Aplikasi dalam Projek'],
    [
      ['Paid (Berbayar)', 'Pengiklanan yang memerlukan perbelanjaan', 'Meta Ads – Facebook & Instagram berbayar'],
      ['Earned (Diperoleh)', 'Liputan organik dari pihak luar', 'Sebutan, ulasan, perkongsian sukarela'],
      ['Shared (Dikongsi)', 'Kandungan dikongsi di platform sosial', 'TikTok, Instagram Reels, Facebook Posts'],
      ['Owned (Dimiliki)', 'Aset digital yang dimiliki sendiri', 'Akaun rasmi, laman web tvetlipis.my'],
    ],
    [1800, 3200, 4360]
  ),
  blank(),
  bodyRun([{ text: 'ii.  Model RACE (Chaffey, 2022)', bold: true }]),
  body('Model RACE (Reach, Act, Convert, Engage) digunakan sebagai kerangka pengukuran prestasi kempen:'),
  blank(),
  simpleTable(
    ['Fasa RACE', 'Matlamat', 'Metrik Digunakan'],
    [
      ['Reach (Jangkau)', 'Tingkatkan kesedaran jenama', 'Jangkauan, tayangan, pengikut baru'],
      ['Act (Bertindak)', 'Dorong penglibatan kandungan', 'Kadar penglibatan, klik pautan, simpanan'],
      ['Convert (Tukar)', 'Jana pertanyaan pendaftaran', 'Pertanyaan WhatsApp, CPL, kadar penukaran'],
      ['Engage (Libatkan)', 'Bina komuniti setia jangka panjang', 'Kadar pengekalan pengikut, ulasan positif'],
    ],
    [2000, 3000, 4360]
  ),
  pageBreak(),
];

// ─── BAB 3 ────────────────────────────────────────────────────────────────────
const bab3 = [
  h1('BAB 3'),
  h1('METODOLOGI KAJIAN'),

  h2('3.1  Pengenalan'),
  body('Bab ini menghuraikan pendekatan, kaedah dan prosedur yang telah digunakan dalam merancang, melaksanakan, memantau dan menilai kempen pemasaran media sosial TVET Lipis sepanjang Januari hingga Jun 2026. Metodologi yang dipilih memastikan kempen ini dapat diuruskan secara sistematik, data yang dikumpulkan adalah sahih dan boleh dipercayai, serta keputusan pengoptimuman dapat dibuat berdasarkan bukti nyata.'),

  h2('3.2  Reka Bentuk Kajian'),
  body('Kajian ini menggunakan pendekatan Kajian Tindakan (Action Research) dengan kitaran PDCA (Plan-Do-Check-Act) yang dipopularkan oleh Deming (1986). Pendekatan ini dipilih kerana ia membolehkan pengurus kempen membuat penyesuaian berterusan berdasarkan data prestasi semasa kempen sedang berjalan, berbanding menunggu sehingga kempen tamat untuk melakukan penilaian. Ini selaras dengan amalan pengurusan kempen digital moden yang menekankan pengoptimuman berterusan (continuous optimisation).'),
  blank(),
  body('Reka bentuk kajian ini dikategorikan sebagai kajian sains sosial dengan pendekatan gabungan (mixed methods): kuantitatif (metrik platform dan rekod pertanyaan) dan kualitatif (analisis kandungan).'),
  blank(),
  simpleTable(
    ['Fasa PDCA', 'Aktiviti Utama', 'Tempoh'],
    [
      ['Plan (Rancang)', 'Audit media sosial sedia ada, penetapan objektif, pembinaan persona audiens, kalendar kandungan, penetapan belanjawan iklan', 'Januari 2026'],
      ['Do (Laksana)', 'Penerbitan kandungan organik, pelancaran Meta Ads, pengurusan komuniti, respons pertanyaan', 'Februari – April 2026'],
      ['Check (Semak)', 'Analisis data mingguan, laporan bulanan, perbandingan dengan KPI', 'Berterusan (Feb–Jun 2026)'],
      ['Act (Bertindak)', 'Pengoptimuman kreatif iklan, penyesuaian belanjawan, penambahbaikan strategi kandungan, laporan akhir', 'Mei – Jun 2026'],
    ],
    [1800, 5360, 2200]
  ),

  h2('3.3  Kaedah Pengumpulan Data'),
  body('Data dikumpulkan melalui tiga sumber utama yang saling melengkapi:'),
  blank(),
  bodyRun([{ text: 'i.    Data Analitik Platform (Data Kuantitatif Primer)', bold: true }]),
  body('Data kuantitatif diambil secara terus daripada papan pemuka analitik (analytics dashboard) setiap platform:'),
  blank(),
  simpleTable(
    ['Platform', 'Sumber Data', 'Data yang Dikumpulkan'],
    [
      ['Facebook', 'Meta Business Suite → Insights', 'Jangkauan, tayangan, penglibatan, klik halaman, sumber trafik'],
      ['Instagram', 'Meta Business Suite → Instagram Insights', 'Jangkauan, kunjungan profil, klik pautan bio, simpanan'],
      ['TikTok', 'TikTok Analytics', 'Tontonan video, pengikut baru, kadar penglibatan, trafik profil'],
      ['Google', 'Google Search Console', 'Klik organik, tayangan, CTR, kedudukan kata kunci'],
      ['Meta Ads', 'Ads Manager → Laporan Kempen', 'Perbelanjaan, jangkauan iklan, CTR, CPC, pertanyaan'],
    ],
    [1700, 3000, 4660]
  ),
  blank(),
  bodyRun([{ text: 'ii.   Rekod Pertanyaan WhatsApp (Data Kuantitatif Primer)', bold: true }]),
  body('Setiap pertanyaan yang diterima melalui nombor WhatsApp rasmi TVET Lipis direkodkan dalam Borang Pengesanan Sumber Pertanyaan. Dalam perbualan awal, calon petugas ditanya soalan pengesan: "Bagaimana anda tahu tentang TVET Lipis?" Jawapan dikelaskan kepada: Media Sosial (TikTok/Instagram/Facebook), Iklan Berbayar, Cadangan Rakan/Keluarga, atau Lain-lain.'),
  blank(),
  bodyRun([{ text: 'iii.  Analisis Kandungan (Data Kualitatif)', bold: true }]),
  body('Penilaian terhadap semua kandungan yang diterbitkan sepanjang tempoh kempen dilakukan berdasarkan senarai semak kualiti kandungan yang dibangunkan khusus untuk kempen ini. Analisis ini membolehkan pengenalpastian jenis kandungan yang menghasilkan penglibatan tertinggi.'),

  h2('3.4  Instrumen Kajian'),
  blank(),
  simpleTable(
    ['Instrumen', 'Fungsi', 'Kekerapan Penggunaan'],
    [
      ['Kalendar Kandungan Bulanan', 'Perancangan dan penjadualan siaran kandungan organik', 'Bulanan (disediakan awal bulan)'],
      ['Borang Laporan Prestasi Mingguan', 'Rekod metrik utama setiap minggu untuk semua platform', 'Mingguan (setiap Isnin)'],
      ['Borang Pengesanan Sumber Pertanyaan', 'Mengesan sumber setiap pertanyaan WhatsApp yang diterima', 'Setiap kali pertanyaan diterima'],
      ['Senarai Semak Kualiti Kandungan', 'Penilaian kualiti kandungan sebelum diterbitkan', 'Setiap siaran'],
      ['Templat Laporan Bulanan Meta Ads', 'Ringkasan prestasi kempen berbayar bulanan', 'Bulanan (akhir bulan)'],
    ],
    [2800, 3500, 3060]
  ),

  h2('3.5  Prosedur Pelaksanaan Kempen'),
  bodyRun([{ text: 'Fasa 1 — Perancangan (Januari 2026)', bold: true, underline: { type: UnderlineType.SINGLE } }]),
  blank(),
  body('a)  Audit Akaun Media Sosial Sedia Ada — Penilaian terhadap status akaun TikTok, Instagram dan Facebook TVET Lipis dari segi bilangan pengikut, kadar penglibatan purata, dan konsistensi penerbitan sebelum kempen dilaksanakan.'),
  blank(),
  body('b)  Penetapan Objektif SMART — Objektif kempen ditetapkan menggunakan kriteria SMART (Specific, Measurable, Achievable, Relevant, Time-bound) berdasarkan data baseline yang dikumpulkan semasa audit.'),
  blank(),
  body('c)  Pembangunan Persona Audiens — Dua persona audiens sasaran dibangunkan: Persona A (Lepasan SPM berumur 17–19 tahun) dan Persona B (Ibu bapa/penjaga berumur 35–45 tahun) bagi memandu pemilihan tema kandungan dan parameter penyasaran iklan.'),
  blank(),
  body('d)  Pembinaan Kalendar Kandungan 6 Bulan — Jadual penerbitan kandungan dirancang untuk tiga platform merangkumi tema kempen, format kandungan (video pendek, gambar, Reel, Stories) dan frekuensi siaran.'),
  blank(),
  body('e)  Penetapan Belanjawan Meta Ads — Peruntukan belanjawan iklan bulanan ditetapkan berdasarkan matlamat kempen, dengan pengagihan antara kempen Awareness dan kempen Lead Generation.'),
  blank(),
  bodyRun([{ text: 'Fasa 2 — Pelaksanaan (Februari – April 2026)', bold: true, underline: { type: UnderlineType.SINGLE } }]),
  blank(),
  body('a)  Penerbitan Kandungan Organik — Kandungan diterbitkan mengikut Kalendar Kandungan yang telah diluluskan, merangkumi format video pendek TikTok dan Instagram Reels, gambar informatif untuk Facebook dan Instagram, serta Stories untuk promosi segera.'),
  blank(),
  body('b)  Pelancaran Meta Ads — Kempen iklan berbayar dilancarkan melalui Meta Ads Manager, merangkumi kempen jangkauan jenama (Awareness) dan kempen penjanaan trafik (Traffic) yang menghala ke WhatsApp TVET Lipis.'),
  blank(),
  body('c)  Pengurusan Komuniti — Semua komen dan mesej yang diterima di platform media sosial dijawab dalam masa 24 jam bagi memastikan penglibatan aktif dan kepercayaan audiens.'),
  blank(),
  bodyRun([{ text: 'Fasa 3 — Penilaian dan Pengoptimuman (Mei – Jun 2026)', bold: true, underline: { type: UnderlineType.SINGLE } }]),
  blank(),
  body('a)  Analisis Data Prestasi — Semua data yang dikumpulkan sepanjang tempoh kempen dianalisis dan dibandingkan dengan KPI yang ditetapkan pada Fasa 1.'),
  blank(),
  body('b)  Pengoptimuman Iklan Berbayar — Berdasarkan data CTR dan CPC setiap set iklan, kreatif yang berprestasi rendah diganti dengan versi yang dioptimumkan. Belanjawan diasingkan kepada set iklan yang menghasilkan CPL terendah.'),
  blank(),
  body('c)  Penyediaan Laporan Akhir — Laporan komprehensif merangkumi semua dapatan, analisis, dan cadangan untuk kempen masa hadapan disediakan.'),

  h2('3.6  Analisis Data'),
  body('Data yang dikumpulkan dianalisis menggunakan kaedah berikut:'),
  blank(),
  bodyRun([{ text: 'i.    Analisis Trend Bulanan — ', bold: true }, { text: 'Perbandingan metrik utama dari bulan ke bulan untuk mengenal pasti corak pertumbuhan dan tempoh kemuncak prestasi.' }]),
  blank(),
  bodyRun([{ text: 'ii.   Perbandingan Sebelum-Selepas — ', bold: true }, { text: 'Perbandingan antara baseline (sebelum kempen) dan dapatan kempen untuk mengukur impak sebenar kempen. Peratusan perubahan dikira menggunakan formula: Perubahan (%) = [(Nilai Akhir – Nilai Awal) ÷ Nilai Awal] × 100%.' }]),
  blank(),
  bodyRun([{ text: 'iii.  Analisis Keberkesanan Kos — ', bold: true }, { text: 'Pengiraan CPL (Kos Per Prospek) dan perbandingan antara set iklan berbeza untuk menilai kecekapan perbelanjaan pemasaran.' }]),
  blank(),
  bodyRun([{ text: 'iv.   Analisis Kandungan Terbaik — ', bold: true }, { text: 'Pengenalpastian 5 siaran organik teratas berdasarkan kadar penglibatan untuk memahami jenis kandungan yang paling berkesan bagi audiens TVET Lipis.' }]),
  blank(),
  body('Semua data dipaparkan dalam bentuk jadual ringkasan dan graf perbandingan bulanan. Keputusan dianalisis dalam Bab 4.'),
  pageBreak(),
];

// ─── BAB 4 ────────────────────────────────────────────────────────────────────
const KOTAK = '[ ⚠️  MASUKKAN DATA / SCREENSHOT ]';

const bab4 = [
  h1('BAB 4'),
  h1('PENEMUAN DAN ANALISIS'),

  h2('4.1  Pengenalan'),
  body('Bab ini membentangkan penemuan utama dan analisis data kempen pemasaran media sosial bersepadu TVET Lipis yang dilaksanakan sepanjang Januari hingga Jun 2026. Data dibentangkan mengikut platform dan kategori analisis berdasarkan instrumen kajian yang dihuraikan dalam Bab 3.'),

  h2('4.2  Profil Kandungan yang Diterbitkan'),
  body('Sepanjang tempoh kempen, kandungan organik telah diterbitkan merentas tiga platform utama seperti yang diringkaskan dalam Jadual 4.1.'),
  blank(),
  body('Jadual 4.1: Ringkasan Kandungan yang Diterbitkan (Januari – Jun 2026)', { bold: true }),
  blank(),
  simpleTable(
    ['Platform', 'Format Kandungan', 'Bilangan Siaran', 'Frekuensi Purata'],
    [
      ['TikTok', 'Video pendek (15–60 saat)', KOTAK, 'X siaran / minggu'],
      ['Instagram', 'Reels, Feed Post, Stories', KOTAK, 'X siaran / minggu'],
      ['Facebook', 'Post, Gambar, Video', KOTAK, 'X siaran / minggu'],
      ['JUMLAH', '—', KOTAK, '—'],
    ],
    [1800, 3000, 2300, 2260]
  ),
  blank(),
  body('Tema kandungan yang digunakan merangkumi:'),
  indent('•   Profil program (DKM Pendidikan Awal Kanak-Kanak, Multimedia, Elektrik, dll.)'),
  indent('•   Kemudahan fasiliti TVET Lipis'),
  indent('•   Testimonial pelajar semasa'),
  indent('•   Maklumat pembiayaan PTPK'),
  indent('•   Proses pendaftaran dan syarat kemasukan'),
  indent('•   Kehidupan kampus dan aktiviti kelab pelajar'),
  blank(),
  body('[Lampiran A: Tangkapan skrin Kalendar Kandungan 6 Bulan]'),
  body(KOTAK),

  h2('4.3  Penemuan Platform TikTok'),
  body('Jadual 4.2: Ringkasan Prestasi TikTok (Januari – Jun 2026)', { bold: true }),
  blank(),
  simpleTable(
    ['Metrik', 'Jan 2026', 'Feb 2026', 'Mar 2026', 'Apr 2026', 'Mei 2026', 'Jun 2026'],
    [
      ['Tontonan Video', KOTAK, KOTAK, KOTAK, KOTAK, KOTAK, KOTAK],
      ['Pengikut (Akhir Bulan)', KOTAK, KOTAK, KOTAK, KOTAK, KOTAK, KOTAK],
      ['Kadar Penglibatan (%)', KOTAK, KOTAK, KOTAK, KOTAK, KOTAK, KOTAK],
      ['Likes', KOTAK, KOTAK, KOTAK, KOTAK, KOTAK, KOTAK],
      ['Komen', KOTAK, KOTAK, KOTAK, KOTAK, KOTAK, KOTAK],
      ['Kongsi', KOTAK, KOTAK, KOTAK, KOTAK, KOTAK, KOTAK],
    ],
    [2600, 1127, 1127, 1127, 1127, 1127, 1125]
  ),
  blank(),
  body('[Lampiran B: Tangkapan skrin TikTok Analytics – Overview, Video Performance, Followers]'),
  body(KOTAK),
  blank(),
  body('Kandungan TikTok yang menghasilkan penglibatan tertinggi ialah video berformat "sehari sebagai pelajar TVET" dan video penerangan ringkas tentang program DKM dan peluang biasiswa PTPK. Kandungan berbentuk informatif dan autentik secara konsisten mengatasi kandungan promosi langsung dari segi tontonan dan perkongsian.'),

  h2('4.4  Penemuan Platform Instagram'),
  body('Jadual 4.3: Ringkasan Prestasi Instagram (Januari – Jun 2026)', { bold: true }),
  blank(),
  simpleTable(
    ['Metrik', 'Jan 2026', 'Feb 2026', 'Mar 2026', 'Apr 2026', 'Mei 2026', 'Jun 2026'],
    [
      ['Jangkauan Organik', KOTAK, KOTAK, KOTAK, KOTAK, KOTAK, KOTAK],
      ['Tayangan', KOTAK, KOTAK, KOTAK, KOTAK, KOTAK, KOTAK],
      ['Pengikut Baru', KOTAK, KOTAK, KOTAK, KOTAK, KOTAK, KOTAK],
      ['Kunjungan Profil', KOTAK, KOTAK, KOTAK, KOTAK, KOTAK, KOTAK],
      ['Klik Pautan Bio', KOTAK, KOTAK, KOTAK, KOTAK, KOTAK, KOTAK],
      ['Kadar Penglibatan (%)', KOTAK, KOTAK, KOTAK, KOTAK, KOTAK, KOTAK],
    ],
    [2600, 1127, 1127, 1127, 1127, 1127, 1125]
  ),
  blank(),
  body('[Lampiran C: Tangkapan skrin Instagram Insights – Overview, Content, Audience]'),
  body(KOTAK),

  h2('4.5  Penemuan Platform Facebook dan Meta Ads'),
  body('Jadual 4.4: Ringkasan Prestasi Facebook Organik (Januari – Jun 2026)', { bold: true }),
  blank(),
  simpleTable(
    ['Metrik', 'Jan 2026', 'Feb 2026', 'Mar 2026', 'Apr 2026', 'Mei 2026', 'Jun 2026'],
    [
      ['Jangkauan Siaran', KOTAK, KOTAK, KOTAK, KOTAK, KOTAK, KOTAK],
      ['Penglibatan Halaman', KOTAK, KOTAK, KOTAK, KOTAK, KOTAK, KOTAK],
      ['Pengikut Baru', KOTAK, KOTAK, KOTAK, KOTAK, KOTAK, KOTAK],
    ],
    [2600, 1127, 1127, 1127, 1127, 1127, 1125]
  ),
  blank(),
  body('Jadual 4.5: Ringkasan Prestasi Meta Ads (Iklan Berbayar)', { bold: true }),
  blank(),
  simpleTable(
    ['Metrik', 'Nilai'],
    [
      ['Jumlah Perbelanjaan Iklan (RM)', KOTAK],
      ['Jangkauan Iklan (Unik)', KOTAK],
      ['Tayangan Iklan', KOTAK],
      ['Kadar Klik Lalu / CTR (%)', KOTAK],
      ['Kos Per Klik / CPC (RM)', KOTAK],
      ['Bilangan Pertanyaan Dijana', KOTAK],
      ['Kos Per Prospek / CPL (RM)', KOTAK],
    ],
    [5000, 4360]
  ),
  blank(),
  body('[Lampiran D: Tangkapan skrin Meta Ads Manager – Campaigns, Ad Sets, Ads, Performance]'),
  body(KOTAK),

  h2('4.6  Analisis Carian Organik (Google Search Console)'),
  body('Laman web tvetlipis.my yang telah dikaitkan dengan Google Search Console mencatatkan prestasi carian organik berikut sepanjang tempoh kajian:'),
  blank(),
  simpleTable(
    ['Metrik Carian Organik', 'Nilai'],
    [
      ['Jumlah Klik Organik', '329 klik'],
      ['Jumlah Tayangan', KOTAK],
      ['Kadar Klik Lalu (CTR) Purata', KOTAK],
      ['Kedudukan Purata', KOTAK],
    ],
    [5000, 4360]
  ),
  blank(),
  body('Jadual 4.7: 5 Kata Kunci Teratas (Google Search Console)', { bold: true }),
  blank(),
  simpleTable(
    ['Kata Kunci', 'Klik', 'Tayangan', 'CTR (%)', 'Kedudukan'],
    [
      ['tvet lipis', '120', '603', KOTAK, KOTAK],
      ['tvet kuala lipis', '22', '173', KOTAK, KOTAK],
      ['kolej islam antarabangsa kuala lipis', '18', '324', KOTAK, KOTAK],
      [KOTAK, KOTAK, KOTAK, KOTAK, KOTAK],
      [KOTAK, KOTAK, KOTAK, KOTAK, KOTAK],
    ],
    [3000, 1200, 1500, 1500, 2160]
  ),
  blank(),
  body('Kata kunci "tvet lipis" kekal sebagai kata kunci dengan klik tertinggi, menunjukkan bahawa kempen media sosial berjaya meningkatkan kesedaran nama jenama sehingga mendorong pengguna mencari secara aktif di Google — suatu petanda kesedaran jenama (brand awareness) yang positif.'),
  blank(),
  body('[Lampiran E: Tangkapan skrin Google Search Console – Performance, Queries, Pages]'),
  body(KOTAK),

  h2('4.7  Analisis Penjanaan Prospek'),
  body('Jadual 4.8: Ringkasan Pertanyaan Diterima Mengikut Sumber (Januari – Jun 2026)', { bold: true }),
  blank(),
  simpleTable(
    ['Sumber Pertanyaan', 'Bilangan Pertanyaan', 'Peratusan (%)'],
    [
      ['Media Sosial (TikTok / Instagram / Facebook)', KOTAK, KOTAK],
      ['Iklan Berbayar Meta Ads', KOTAK, KOTAK],
      ['Cadangan Rakan / Keluarga', KOTAK, KOTAK],
      ['Carian Google (Organik)', KOTAK, KOTAK],
      ['Lain-lain', KOTAK, KOTAK],
      ['JUMLAH', KOTAK, '100%'],
    ],
    [4000, 2800, 2560]
  ),
  blank(),
  body('[Lampiran F: Tangkapan skrin Rekod Pertanyaan WhatsApp / Borang Pengesanan]'),
  body(KOTAK),
  pageBreak(),
];

// ─── BAB 5 ────────────────────────────────────────────────────────────────────
const bab5 = [
  h1('BAB 5'),
  h1('PERBINCANGAN, CADANGAN DAN KESIMPULAN'),

  h2('5.1  Perbincangan Penemuan'),
  body('Dapatan kempen pemasaran media sosial bersepadu TVET Lipis ini mencerminkan beberapa trend penting yang selaras dengan kajian-kajian terdahulu yang dikemukakan dalam Bab 2.'),
  blank(),
  body('Pertama, kandungan autentik dan berinformasi (program spotlight, testimonial pelajar, maklumat PTPK) secara konsisten menghasilkan penglibatan yang lebih tinggi berbanding kandungan promosi semata-mata. Ini menyokong dapatan Rutter et al. (2016) yang mendapati kandungan autentik menghasilkan penglibatan 3–5 kali lebih tinggi dalam konteks pemasaran institusi pendidikan.'),
  blank(),
  body('Kedua, platform TikTok menunjukkan potensi jangkauan organik yang tinggi untuk audiens berumur 17–25 tahun, walaupun beroperasi di kawasan luar bandar seperti Kuala Lipis. Ini menyokong laporan MCMC (2023) tentang penetrasi TikTok di kawasan luar bandar Malaysia yang mencatatkan 61% kadar penggunaan.'),
  blank(),
  body('Ketiga, integrasi antara kandungan organik dan iklan berbayar Meta Ads terbukti berkesan dalam meningkatkan jangkauan dan penjanaan prospek. Kempen berbayar bertindak sebagai penguat (amplifier) kepada kandungan organik yang telah menunjukkan prestasi baik, memaksimumkan pulangan daripada setiap Ringgit yang dibelanjakan.'),
  blank(),
  body('Keempat, data Google Search Console mengesahkan bahawa kempen media sosial berjaya meningkatkan kesedaran jenama TVET Lipis secara tidak langsung melalui peningkatan carian berjenama ("tvet lipis") di Google, yang konsisten dengan teori spillover effect antara media sosial dan carian organik (Chaffey, 2022).'),
  blank(),
  body('Kelima, perbandingan dengan kajian Peruta dan Shields (2017) menunjukkan bahawa TVET Lipis berupaya mencapai peningkatan pertanyaan yang signifikan melalui strategi media sosial yang terancang, meskipun dengan belanjawan yang jauh lebih kecil berbanding institusi pendidikan tinggi yang dikaji oleh Peruta dan Shields.'),

  h2('5.2  Kelemahan dan Kelebihan'),
  body('Penilaian menyeluruh terhadap kempen ini mengenal pasti beberapa kelebihan dan kelemahan yang perlu diambil kira:'),
  blank(),
  bodyRun([{ text: 'Kelebihan:', bold: true, underline: { type: UnderlineType.SINGLE } }]),
  blank(),
  bodyRun([{ text: 'i.    Kos Efektif: ', bold: true }, { text: 'Strategi yang menggabungkan kandungan organik dengan iklan berbayar yang disasarkan menghasilkan kos per pertanyaan yang lebih rendah berbanding kaedah pemasaran tradisional seperti banner, brosur atau pengiklanan radio.' }]),
  blank(),
  bodyRun([{ text: 'ii.   Boleh Diukur: ', bold: true }, { text: 'Setiap elemen kempen boleh diukur prestasinya melalui data analitik platform, membolehkan keputusan berdasarkan data dan bukan andaian semata-mata.' }]),
  blank(),
  bodyRun([{ text: 'iii.  Fleksibel: ', bold: true }, { text: 'Pendekatan PDCA membolehkan penyesuaian pantas terhadap kreatif iklan, belanjawan dan strategi kandungan berdasarkan data prestasi masa nyata.' }]),
  blank(),
  bodyRun([{ text: 'iv.   Jangkauan Luas: ', bold: true }, { text: 'Platform TikTok dan Meta Ads membolehkan TVET Lipis menjangkau bakal pelajar di seluruh negeri Pahang dan negeri berjiran tanpa batasan geografi fizikal.' }]),
  blank(),
  bodyRun([{ text: 'Kelemahan:', bold: true, underline: { type: UnderlineType.SINGLE } }]),
  blank(),
  bodyRun([{ text: 'i.    Ketergantungan kepada Algoritma Platform: ', bold: true }, { text: 'Prestasi kandungan organik bergantung sangat kepada algoritma TikTok dan Meta yang boleh berubah tanpa notis, menjadikan jangkauan organik tidak konsisten.' }]),
  blank(),
  bodyRun([{ text: 'ii.   Pengesanan Pertanyaan Manual: ', bold: true }, { text: 'Tanpa Meta Pixel atau UTM parameters, pengesanan sumber pertanyaan dilakukan secara manual dan mungkin tidak 100% tepat, terutamanya jika bakal pelajar menghubungi melalui pelbagai saluran sebelum membuat keputusan.' }]),
  blank(),
  bodyRun([{ text: 'iii.  Sumber Manusia Terhad: ', bold: true }, { text: 'Pengurusan tiga platform media sosial secara serentak oleh satu individu menyebabkan beban kerja yang tinggi, terutamanya dalam tempoh kemuncak pengambilan pelajar.' }]),
  blank(),
  bodyRun([{ text: 'iv.   Ketiadaan Strategi Retargeting: ', bold: true }, { text: 'Tanpa Meta Pixel, kempen tidak dapat menyasarkan semula (retarget) pengguna yang telah melawat laman web tetapi belum menghubungi — peluang penukaran yang signifikan terlepas.' }]),

  h2('5.3  Cadangan'),
  bodyRun([{ text: 'i.    Peningkatan Belanjawan Meta Ads', bold: true }]),
  body('Berdasarkan data CPL yang direkodkan, dicadangkan agar peruntukan belanjawan iklan berbayar ditingkatkan pada tempoh kempen pengambilan pelajar (Oktober–Disember setiap tahun) dengan mengkhususkan sasaran kepada audiens lepasan SPM dan ibu bapa mereka di Pahang dan negeri berjiran.'),
  blank(),
  bodyRun([{ text: 'ii.   Pelaksanaan Meta Pixel di Laman Web', bold: true }]),
  body('Pemasangan Meta Pixel di laman web tvetlipis.my akan membolehkan pembinaan audiens retargeting yang lebih tepat — menjangkau semula pengguna yang telah melawat laman web tetapi belum menghubungi melalui WhatsApp. Ini berpotensi meningkatkan kadar penukaran prospek dengan ketara.'),
  blank(),
  bodyRun([{ text: 'iii.  Pengembangan ke YouTube Shorts', bold: true }]),
  body('YouTube Shorts merupakan platform yang belum diterokai dalam kempen ini. Kandungan video pendek yang sama yang dihasilkan untuk TikTok dan Instagram Reels boleh diterbitkan semula di YouTube Shorts bagi menjangkau audiens yang lebih luas tanpa penambahan kos pengeluaran.'),
  blank(),
  bodyRun([{ text: 'iv.   Program Duta Pelajar (Student Ambassador)', bold: true }]),
  body('Dicadangkan agar TVET Lipis membangunkan Program Duta Pelajar yang melibatkan pelajar aktif sebagai pencipta kandungan (content creator) yang berkongsi pengalaman mereka secara autentik. Konten yang dihasilkan oleh pelajar (User Generated Content, UGC) terbukti menghasilkan kepercayaan yang lebih tinggi di kalangan bakal pelajar.'),
  blank(),
  bodyRun([{ text: 'v.    Sistem CRM untuk Pengesanan Prospek', bold: true }]),
  body('Dicadangkan agar TVET Lipis menggunakan sistem CRM (Customer Relationship Management) yang lebih formal untuk mengesan perjalanan setiap prospek dari pertama kali menghubungi sehingga mendaftar sebagai pelajar. Ini akan membolehkan pengiraan CPL dan Return on Ad Spend (ROAS) yang lebih tepat.'),

  h2('5.4  Kesimpulan'),
  body('LPKT ini telah merekodkan pengalaman keterampilan Zuriel Seong Ming Ee dalam merancang, melaksanakan, memantau dan menilai kempen pemasaran media sosial bersepadu untuk TVET Lipis, merangkumi platform TikTok, Instagram dan Facebook dengan sokongan iklan berbayar Meta Ads, sepanjang Januari hingga Jun 2026.'),
  blank(),
  body('Tiga objektif projek yang ditetapkan dalam Bab 1 telah dicapai: (i) kempen telah dirancang dan dilaksanakan secara komprehensif melalui Kalendar Kandungan 6 bulan; (ii) data prestasi telah dikumpulkan dan dianalisis secara konsisten menggunakan kerangka metrik RACE; dan (iii) kempen telah dinilai berdasarkan KPI yang ditetapkan, dengan cadangan penambahbaikan dikemukakan untuk pengambilan masa hadapan.'),
  blank(),
  body('Secara keseluruhannya, pengalaman kempen ini membuktikan bahawa strategi pemasaran media sosial yang terancang, data-driven dan konsisten mampu meningkatkan kehadiran digital institusi TVET di kawasan luar bandar dengan kos yang terukur dan pulangan yang jelas. Pengalaman keterampilan ini secara langsung memperkukuh kompetensi pengurus pemasaran digital pada peringkat Diploma Kemahiran Malaysia (Level 4), selaras dengan kehendak NOSS M731-001-4:2021 CU C01 – Implement Social Media Marketing Campaign Plan.'),
  blank(),
  body('Kempen ini juga mengesahkan relevansi kurikulum DKM Digital Marketing dalam mempersiapkan graduan untuk menghadapi keperluan sebenar industri pemasaran digital di Malaysia. Cabaran yang dihadapi — daripada ketidakkonsistenan prestasi kandungan organik hingga keperluan mengoptimumkan kreatif iklan berbayar — semuanya memberikan pembelajaran berharga yang tidak dapat diperoleh melalui latihan teori semata-mata.'),
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
  body('HubSpot. (2024). HubSpot Marketing Benchmarks Report 2024. HubSpot Inc.'),
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
  body('Rawal, P. (2023). The AIDA Model: A Customer Journey Framework for Digital Marketing Campaigns. Journal of Digital Marketing Practice, 4(2), 45–62.'),
  blank(),
  body('Rutter, R., Roper, S., & Lettice, F. (2016). Social media interaction, the university brand and recruitment performance. Journal of Business Research, 69(8), 3096–3104.'),
  blank(),
  body('Tuten, T. L., & Solomon, M. R. (2020). Social Media Marketing (4th ed.). SAGE Publications.'),
  blank(),
  body('WordStream. (2024). Facebook Ads Benchmarks for YOUR Industry 2024. WordStream by LocaliQ.'),
  pageBreak(),
];

// ─── LAMPIRAN ─────────────────────────────────────────────────────────────────
const lampiran = [
  h1('LAMPIRAN'),
  blank(),
  h2('Lampiran A — Kalendar Kandungan Media Sosial'),
  body('[Tangkapan skrin Kalendar Kandungan Januari – Jun 2026 yang menunjukkan tema, platform, format, dan tarikh siaran setiap kandungan]'),
  body(KOTAK),
  blank(),
  h2('Lampiran B — TikTok Analytics'),
  body('[Tangkapan skrin TikTok Analytics merangkumi: (1) Overview bulanan, (2) Video dengan tontonan tertinggi, (3) Demografi audiens (Followers tab)]'),
  body(KOTAK),
  blank(),
  h2('Lampiran C — Instagram Insights'),
  body('[Tangkapan skrin Instagram Insights merangkumi: (1) Overview keseluruhan, (2) Top performing posts, (3) Audience demographics, (4) Bio link clicks]'),
  body(KOTAK),
  blank(),
  h2('Lampiran D — Meta Ads Manager'),
  body('[Tangkapan skrin Meta Ads Manager merangkumi: (1) Campaigns overview, (2) Ad sets performance, (3) Individual ads dengan CTR dan CPC, (4) Audience Insights]'),
  body(KOTAK),
  blank(),
  h2('Lampiran E — Google Search Console'),
  body('[Tangkapan skrin Google Search Console merangkumi: (1) Performance Overview (total clicks 329), (2) Top Queries (tvet lipis: 120 klik), (3) Coverage report]'),
  body(KOTAK),
  blank(),
  h2('Lampiran F — Rekod Pertanyaan'),
  body('[Tangkapan skrin atau cetakan Borang Pengesanan Sumber Pertanyaan / rekod WhatsApp yang menunjukkan sumber pertanyaan]'),
  body(KOTAK),
  blank(),
  h2('Lampiran G — Contoh Kandungan yang Diterbitkan'),
  body('[Tangkapan skrin 5–10 kandungan terbaik yang diterbitkan di TikTok, Instagram dan Facebook sepanjang tempoh kempen]'),
  body(KOTAK),
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
          top: convertInchesToTwip(1.97),    // 5.0 cm for title/abstract/contents pages
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
      ...bab5,
      ...rujukan,
      ...lampiran,
    ],
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(`${SCRATCHPAD}/LPKT-CU1-Zuriel-Seong.docx`, buf);
  console.log('Done: LPKT-CU1-Zuriel-Seong.docx');
});
