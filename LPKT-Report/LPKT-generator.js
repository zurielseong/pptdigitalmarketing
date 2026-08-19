const {
  Document, Packer, Paragraph, TextRun, AlignmentType, PageBreak,
  Table, TableRow, TableCell, WidthType, ShadingType, LineRuleType,
  convertInchesToTwip, ImageRun, Footer, PageNumber,
} = require('docx');
const fs = require('fs');

const SCRATCHPAD = '/tmp/claude-0/-home-user/c222c7c5-1fc9-5ff7-858d-b12df17563bc/scratchpad';
const F = 'Times New Roman';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const body = (text, opts = {}) => new Paragraph({
  children: [new TextRun({ text, font: F, size: 24, ...opts })],
  alignment: AlignmentType.JUSTIFIED,
  spacing: { line: 360, lineRule: LineRuleType.AUTO, before: 0, after: 240 },
});

const bodyRun = (runs) => new Paragraph({
  children: runs.map(r => new TextRun({ font: F, size: 24, ...r })),
  alignment: AlignmentType.JUSTIFIED,
  spacing: { line: 360, lineRule: LineRuleType.AUTO, before: 0, after: 240 },
});

const listItem = (text) => new Paragraph({
  children: [new TextRun({ text, font: F, size: 24 })],
  alignment: AlignmentType.JUSTIFIED,
  spacing: { line: 360, lineRule: LineRuleType.AUTO, before: 0, after: 200 },
  indent: { left: convertInchesToTwip(0.5), hanging: convertInchesToTwip(0.3) },
});

const babTitle = (bab, tajuk) => [
  new Paragraph({
    children: [new TextRun({ text: bab, font: F, size: 24, bold: true })],
    alignment: AlignmentType.CENTER, spacing: { before: 0, after: 240 },
  }),
  new Paragraph({
    children: [new TextRun({ text: tajuk, font: F, size: 24, bold: true })],
    alignment: AlignmentType.CENTER, spacing: { before: 0, after: 480 },
  }),
];

const h2 = (text) => new Paragraph({
  children: [new TextRun({ text, font: F, size: 24, bold: true })],
  spacing: { before: 360, after: 200, line: 360, lineRule: LineRuleType.AUTO },
});

const h3 = (text) => new Paragraph({
  children: [new TextRun({ text, font: F, size: 24, bold: true })],
  spacing: { before: 300, after: 180, line: 360, lineRule: LineRuleType.AUTO },
});

const caption = (text) => new Paragraph({
  children: [new TextRun({ text, font: F, size: 22, bold: true })],
  spacing: { before: 240, after: 120, line: 276 },
});

const note = (text) => new Paragraph({
  children: [new TextRun({ text, font: F, size: 20, italics: true })],
  spacing: { before: 60, after: 240, line: 276 },
});

const blank = () => new Paragraph({ children: [new TextRun({ text: '', font: F, size: 24 })] });
const pageBreak = () => new Paragraph({ children: [new PageBreak()] });

const center = (text, opts = {}) => new Paragraph({
  children: [new TextRun({ text, font: F, size: 24, ...opts })],
  alignment: AlignmentType.CENTER,
  spacing: { line: 360, lineRule: LineRuleType.AUTO, before: 0, after: 160 },
});

const cellP = (text, o = {}) => new Paragraph({
  children: [new TextRun({ text: String(text), font: F, size: 20, bold: !!o.bold })],
  alignment: o.align || AlignmentType.LEFT,
  spacing: { line: 276, before: 40, after: 40 },
});

const table = (headers, rows, widths) => {
  const w = widths || headers.map(() => Math.round(9000 / headers.length));
  const hr = new TableRow({
    tableHeader: true,
    children: headers.map((h, i) => new TableCell({
      width: { size: w[i], type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, color: 'auto', fill: 'D9D9D9' },
      children: [cellP(h, { bold: true })],
    })),
  });
  const dr = rows.map(r => new TableRow({
    children: r.map((c, i) => new TableCell({
      width: { size: w[i], type: WidthType.DXA },
      children: [cellP(c, { align: (i > 0 && /^[\d,.\-—%RM ]+$/.test(String(c))) ? AlignmentType.RIGHT : AlignmentType.LEFT })],
    })),
  }));
  return new Table({ width: { size: 9000, type: WidthType.DXA }, columnWidths: w, rows: [hr, ...dr] });
};

const tocRow = (perkara, halaman, opts = {}) => new TableRow({
  children: [
    new TableCell({
      width: { size: 7400, type: WidthType.DXA },
      borders: { top: { style: 'none' }, bottom: { style: 'none' }, left: { style: 'none' }, right: { style: 'none' } },
      children: [new Paragraph({
        children: [new TextRun({ text: perkara, font: F, size: 24, bold: !!opts.bold })],
        indent: { left: convertInchesToTwip(opts.indent || 0) },
        spacing: { line: 300, before: 40, after: 40 },
      })],
    }),
    new TableCell({
      width: { size: 1600, type: WidthType.DXA },
      borders: { top: { style: 'none' }, bottom: { style: 'none' }, left: { style: 'none' }, right: { style: 'none' } },
      children: [new Paragraph({
        children: [new TextRun({ text: String(halaman), font: F, size: 24, bold: !!opts.bold })],
        alignment: AlignmentType.RIGHT, spacing: { line: 300, before: 40, after: 40 },
      })],
    }),
  ],
});

const img = (file, w, h) => new Paragraph({
  children: [new ImageRun({ data: fs.readFileSync(`${SCRATCHPAD}/${file}`), transformation: { width: w, height: h } })],
  alignment: AlignmentType.CENTER, spacing: { before: 120, after: 120 },
});

// ═══ COVER PAGE ═══════════════════════════════════════════════════════════════
const coverPage = [
  blank(), blank(), blank(),
  center('LAPORAN PROJEK', { bold: true, size: 28 }),
  center('DIPLOMA KEMAHIRAN MALAYSIA', { bold: true, size: 28 }),
  blank(), blank(), blank(), blank(),
  center('PERANCANGAN DAN PELAKSANAAN KEMPEN', { bold: true, size: 28 }),
  center('PEMASARAN MEDIA SOSIAL BAGI MENINGKATKAN', { bold: true, size: 28 }),
  center('PENGAMBILAN PELAJAR BAHARU DI TVET LIPIS', { bold: true, size: 28 }),
  blank(), blank(), blank(), blank(),
  center('ZURIEL SEONG MING EE', { bold: true, size: 28 }),
  blank(), blank(), blank(), blank(), blank(),
  center('M731-001-4:2021', { bold: true, size: 28 }),
  center('DIGITAL MARKETING PLANNING', { bold: true, size: 28 }),
  center('AND IMPLEMENTATION', { bold: true, size: 28 }),
  pageBreak(),
];

// ═══ PENGESAHAN ═══════════════════════════════════════════════════════════════
const pengesahanPage = [
  blank(),
  center('PENGESAHAN LAPORAN PROJEK', { bold: true }),
  blank(), blank(),
  body('Adalah disahkan bahawa Laporan Pengalaman Keterampilan Terdahulu (LPKT) ini yang bertajuk "Perancangan dan Pelaksanaan Kempen Pemasaran Media Sosial bagi Meningkatkan Pengambilan Pelajar Baharu di TVET Lipis" telah disediakan oleh calon dan diperiksa sebagai memenuhi sebahagian syarat penganugerahan Diploma Kemahiran Malaysia.'),
  blank(), blank(),
  body('Nama Calon             : ZURIEL SEONG MING EE'),
  body('No. Kad Pengenalan     : ______________________________'),
  body('Unit Kompetensi        : M731-001-4:2021-C01'),
  body('                              Implement Social Media Marketing Campaign Plan'),
  blank(), blank(), blank(),
  body('Disahkan oleh:'),
  blank(), blank(),
  body('Tandatangan            : ______________________________'),
  body('Nama                   : ______________________________'),
  body('Jawatan                : ______________________________'),
  body('Tarikh                 : ______________________________'),
  pageBreak(),
];

// ═══ PENGHARGAAN ══════════════════════════════════════════════════════════════
const penghargaanPage = [
  blank(),
  center('PENGHARGAAN', { bold: true }),
  blank(),
  body('Setinggi-tinggi penghargaan dan terima kasih diucapkan kepada pihak pengurusan TVET Lipis yang telah memberi kepercayaan dan kebenaran untuk merancang serta melaksanakan kempen pemasaran media sosial yang menjadi asas kepada Laporan Pengalaman Keterampilan Terdahulu (LPKT) ini.'),
  blank(),
  body('Ucapan terima kasih juga ditujukan kepada pasukan pemasaran TVET Lipis yang terlibat secara langsung dalam penghasilan kandungan, pengurusan kempen iklan dan pengendalian sistem rekod prospek sepanjang tempoh enam bulan kempen dijalankan. Kerjasama yang diberikan telah memastikan setiap aktiviti yang dirancang dapat dilaksanakan mengikut jadual.'),
  blank(),
  body('Penghargaan turut dirakamkan kepada Pegawai Penilai dan pihak pusat bertauliah atas bimbingan yang diberikan dalam penyediaan laporan ini, serta kepada keluarga yang sentiasa memberi sokongan sepanjang tempoh penyediaan LPKT ini.'),
  blank(),
  body('Semoga pengalaman dan dapatan yang didokumentasikan dalam laporan ini dapat dimanfaatkan oleh institusi pendidikan kemahiran yang lain.'),
  pageBreak(),
];

// ═══ ABSTRAK ══════════════════════════════════════════════════════════════════
const abstrakPage = [
  blank(),
  center('ABSTRAK', { bold: true }),
  blank(),
  body('Kempen pemasaran media sosial telah dirancang dan dilaksanakan bagi TVET Lipis sepanjang tempoh Januari hingga Jun 2026 bertujuan meningkatkan pengambilan pelajar baharu. Objektif projek ini adalah untuk merancang dan melaksanakan kempen pemasaran media sosial yang berstruktur, menganalisis jangkauan dan penglibatan audiens yang dicapai melalui kempen iklan berbayar, serta menilai keberkesanan kempen dalam menjana prospek pelajar berdasarkan bilangan prospek dan kos bagi setiap prospek. Kempen ini merangkumi penerbitan kandungan organik di TikTok, Instagram dan Facebook berpandukan kalendar kandungan yang dirancang secara bulanan, serta pengurusan kempen iklan berbayar Lead Generation di Meta Ads dan TikTok Ads. Kajian ini menggunakan kaedah kuantitatif, dengan data prestasi direkodkan secara automatik oleh analitik platform, platform pengurusan iklan dan sistem pengurusan hubungan pelanggan institusi sepanjang tempoh kempen. Hasil kajian menunjukkan kempen iklan berbayar menghasilkan 2,370,268 tayangan dan 23,056 klik, serta menjana 3,470 prospek dengan perbelanjaan iklan sebanyak RM11,267.97 iaitu kos purata RM3.25 bagi setiap prospek. Perbandingan antara platform mendapati TikTok Ads mencatatkan kos per prospek RM2.06 berbanding Meta Ads RM3.83, iaitu 46.2% lebih rendah. Sebanyak 76 pelajar telah mendaftar sepanjang tempoh tersebut, dengan 73 daripadanya atau 96.1% berpunca daripada saluran digital. Kos bagi setiap pelajar berdaftar ialah RM154.36, iaitu 69.1% lebih rendah berbanding kos sasaran pengambilan pelajar sebanyak RM500 yang ditetapkan institusi. Kesimpulannya, kempen pemasaran media sosial berjaya mencapai kesemua objektif yang ditetapkan dan terbukti merupakan kaedah pengambilan pelajar yang lebih menjimatkan berbanding kaedah rujukan sedia ada.'),
  pageBreak(),
];

// ═══ ISI KANDUNGAN ════════════════════════════════════════════════════════════
const isiKandungan = [
  blank(),
  center('ISI KANDUNGAN', { bold: true }),
  blank(),
  new Table({
    width: { size: 9000, type: WidthType.DXA },
    columnWidths: [7400, 1600],
    borders: { top: { style: 'none' }, bottom: { style: 'none' }, left: { style: 'none' }, right: { style: 'none' }, insideHorizontal: { style: 'none' }, insideVertical: { style: 'none' } },
    rows: [
      tocRow('PERKARA', 'HALAMAN', { bold: true }),
      tocRow('', ''),
      tocRow('Pengesahan Laporan Projek', 'i'),
      tocRow('Penghargaan', 'ii'),
      tocRow('Abstrak', 'iii'),
      tocRow('Isi Kandungan', 'iv'),
      tocRow('', ''),
      tocRow('BAB 1     PENDAHULUAN', '', { bold: true }),
      tocRow('1.1  Pengenalan', '1', { indent: 0.6 }),
      tocRow('1.2  Penyataan Masalah', '2', { indent: 0.6 }),
      tocRow('1.3  Objektif Projek', '3', { indent: 0.6 }),
      tocRow('1.4  Skop Projek', '3', { indent: 0.6 }),
      tocRow('1.5  Kepentingan Projek', '4', { indent: 0.6 }),
      tocRow('', ''),
      tocRow('BAB 2     METODOLOGI', '', { bold: true }),
      tocRow('2.1  Pengenalan', '5', { indent: 0.6 }),
      tocRow('2.2  Kaedah Analisis', '5', { indent: 0.6 }),
      tocRow('2.3  Instrumen Kajian', '7', { indent: 0.6 }),
      tocRow('2.4  Analisa Data', '8', { indent: 0.6 }),
      tocRow('2.5  Aliran Pelaksanaan Kempen', '9', { indent: 0.6 }),
      tocRow('2.5.1  Perancangan Kalendar Kandungan', '9', { indent: 1.0 }),
      tocRow('2.5.2  Carta Alir Pelaksanaan Kempen', '11', { indent: 1.0 }),
      tocRow('2.5.3  Jadual Pelaksanaan Kempen', '12', { indent: 1.0 }),
      tocRow('', ''),
      tocRow('BAB 3     PENEMUAN DAN ANALISIS', '', { bold: true }),
      tocRow('3.1  Pengenalan', '13', { indent: 0.6 }),
      tocRow('3.2  Hasil Kajian', '13', { indent: 0.6 }),
      tocRow('3.3  Analisis', '14', { indent: 0.6 }),
      tocRow('', ''),
      tocRow('BAB 4     PERBINCANGAN, CADANGAN DAN KESIMPULAN', '', { bold: true }),
      tocRow('4.1  Pengenalan', '20', { indent: 0.6 }),
      tocRow('4.2  Perbincangan', '20', { indent: 0.6 }),
      tocRow('4.3  Cadangan', '22', { indent: 0.6 }),
      tocRow('4.4  Kesimpulan', '23', { indent: 0.6 }),
      tocRow('', ''),
      tocRow('Rujukan', '24', { bold: true }),
      tocRow('Lampiran', '25', { bold: true }),
    ],
  }),
  pageBreak(),
];

// ═══ BAB 1 ════════════════════════════════════════════════════════════════════
const bab1 = [
  ...babTitle('BAB 1', 'PENDAHULUAN'),

  h2('1.1  PENGENALAN'),
  body('Pemasaran media sosial merupakan elemen penting dalam usaha pengambilan pelajar baharu bagi institusi pendidikan kemahiran. Hal ini kerana bakal pelajar pada hari ini mendapatkan maklumat mengenai pilihan pengajian mereka melalui telefon pintar dan media sosial, berbanding kaedah tradisional seperti risalah cetak, iklan akhbar atau lawatan ke sekolah. Melalui media sosial, sesebuah institusi boleh menyampaikan maklumat program, kemudahan kampus dan peluang kerjaya terus kepada bakal pelajar tanpa terikat kepada jarak atau kos perjalanan. Media sosial juga membolehkan setiap perbelanjaan pemasaran diukur dengan tepat, iaitu sesuatu yang sukar dilakukan menerusi kaedah pemasaran konvensional.'),
  body('TVET Lipis merupakan sebuah pusat pendidikan kemahiran yang beroperasi di Kuala Lipis, Pahang. TVET Lipis menawarkan program Diploma Kemahiran Malaysia (DKM) dalam bidang Pendidikan Awal Kanak-Kanak, Pra-Sekolah, Multimedia dan Elektrik, dengan pembiayaan pelajar disediakan melalui skim Perbadanan Tabung Pembangunan Kemahiran (PTPK). Program-program ini disasarkan kepada lepasan sekolah yang ingin memperoleh kemahiran teknikal dan vokasional sebagai laluan kerjaya.'),
  body('Sebagai institusi yang beroperasi di sebuah bandar kecil yang jauh daripada bandar utama, TVET Lipis berdepan dengan cabaran pengambilan pelajar yang lebih besar berbanding institusi di kawasan bandar. Kaedah pemasaran konvensional seperti lawatan ke sekolah dan pameran pendidikan terikat kepada jarak fizikal dan kos perjalanan, manakala kesedaran orang ramai terhadap laluan pendidikan teknikal dan vokasional di wilayah Pantai Timur juga masih rendah berbanding laluan akademik. Media sosial dilihat sebagai saluran yang paling sesuai untuk mengatasi kedua-dua cabaran ini.'),
  body('Sepanjang bulan Januari hingga Jun 2026, satu kempen pemasaran media sosial telah dirancang dan dilaksanakan bagi TVET Lipis. Kempen ini merangkumi penerbitan kandungan organik di platform TikTok, Instagram dan Facebook, serta pengurusan kempen iklan berbayar di Meta Ads dan TikTok Ads yang menggunakan borang prospek dalam talian. Pelaksanaan kempen inilah yang menjadi asas kepada Laporan Pengalaman Keterampilan Terdahulu ini.'),

  h2('1.2  PENYATAAN MASALAH'),
  body('Walaupun TVET Lipis telah mempunyai kehadiran di media sosial sebelum kempen dilaksanakan, beberapa permasalahan telah dikenal pasti. Pertama, jangkauan organik kandungan adalah sangat rendah. Kandungan yang diterbitkan hanya dipaparkan kepada sebahagian kecil pengikut sedia ada, manakala peluang untuk menjangkau audiens yang lebih luas bergantung sepenuhnya kepada sama ada kandungan tersebut terpilih untuk dipaparkan pada laman For You Page (FYP) atau menjadi tular. Keadaan ini tidak boleh dijadikan asas perancangan pemasaran kerana ia tidak dapat dijangka dan tidak dapat dikawal. Kedua, aktiviti media sosial dijalankan secara tidak berstruktur, iaitu tanpa kalendar kandungan, tema yang konsisten atau sasaran audiens yang jelas, menyebabkan kandungan diterbitkan hanya pada musim pengambilan dan tidak berterusan sepanjang tahun. Ketiga, pertanyaan yang diterima daripada bakal pelajar datang secara berselerak melalui pelbagai saluran tanpa direkodkan sumbernya, menyebabkan pihak pengurusan tidak dapat menentukan platform atau kandungan yang benar-benar menghasilkan pendaftaran pelajar.'),

  h2('1.3  OBJEKTIF PROJEK'),
  body('Objektif projek ini bertujuan memberikan panduan yang jelas tentang apa yang ingin dicapai melalui pelaksanaan kempen pemasaran media sosial bagi TVET Lipis. Berikut adalah objektif utama projek ini:'),
  listItem('i.     Merancang dan melaksanakan kempen pemasaran media sosial yang berstruktur merangkumi kalendar kandungan dan kempen iklan berbayar.'),
  listItem('ii.    Menganalisis jangkauan dan penglibatan audiens yang dicapai melalui kempen iklan berbayar.'),
  listItem('iii.   Menilai keberkesanan kempen dalam menjana prospek pelajar berdasarkan bilangan prospek, kos bagi setiap prospek, serta kos bagi setiap pelajar berdaftar berbanding kos sasaran yang ditetapkan institusi.'),

  h2('1.4  SKOP PROJEK'),
  body('Kempen pemasaran media sosial ini dilaksanakan sepanjang tempoh enam bulan bermula Januari sehingga Jun 2026 bagi TVET Lipis. Kempen ini merangkumi penerbitan kandungan organik di platform TikTok, Instagram dan Facebook, serta pengurusan kempen iklan berbayar di Meta Ads dan TikTok Ads yang menggunakan borang prospek dalam talian.'),
  body('Audiens sasaran kempen dibahagikan kepada dua kumpulan. Kumpulan pertama ialah bakal pelajar berumur 17 hingga 28 tahun, iaitu lepasan sekolah dan belia yang mencari laluan pengajian kemahiran. Kumpulan kedua ialah ibu bapa dan penjaga berumur 40 hingga 60 tahun, yang sering terlibat dalam keputusan pemilihan institusi pengajian anak mereka. Kempen iklan berbayar disasarkan secara berasingan kepada kedua-dua kumpulan ini, dengan kandungan dan mesej yang disesuaikan mengikut kumpulan masing-masing.'),
  body('Dari segi geografi, kempen meliputi seluruh Malaysia dengan tumpuan utama kepada negeri Pahang dan wilayah Pantai Timur. Program yang dipromosikan ialah Diploma Kemahiran Malaysia dalam bidang Pendidikan Awal Kanak-Kanak, Pra-Sekolah, Multimedia dan Elektrik. Kesemua prospek yang diterima sepanjang tempoh kempen direkodkan dalam sistem CRM TVET Lipis, manakala data prestasi diperoleh daripada analitik platform serta penyata bil rasmi kedua-dua platform iklan.'),

  h2('1.5  KEPENTINGAN PROJEK'),
  body('Projek ini memberi manfaat kepada beberapa pihak. Bagi TVET Lipis, projek ini menghasilkan satu rangka kerja pemasaran media sosial yang telah diuji dan boleh diulang pada setiap kitaran pengambilan pelajar, lengkap dengan data prestasi sebagai asas merancang belanjawan pemasaran pada masa hadapan. Pihak pengurusan kini dapat mengetahui platform mana yang menghasilkan prospek pada kos yang paling rendah, program mana yang paling diminati, serta negeri mana yang menyumbang bilangan prospek tertinggi.'),
  body('Bagi bakal pelajar pula, kehadiran maklumat program di media sosial memudahkan mereka mengetahui pilihan pengajian kemahiran yang tersedia tanpa perlu hadir ke kampus atau menunggu lawatan sekolah. Maklumat mengenai program, kemudahan dan peluang pembiayaan PTPK dapat diperoleh secara terus melalui telefon pintar.'),
  body('Bagi institusi pendidikan kemahiran yang lain, terutamanya yang beroperasi di kawasan luar bandar, projek ini menunjukkan bahawa pemasaran digital mampu menjangkau bakal pelajar di seluruh negara dengan belanjawan yang terkawal, tanpa bergantung sepenuhnya kepada kaedah pemasaran konvensional yang terhad kepada kawasan sekitar.'),
  body('Bagi calon Diploma Kemahiran Malaysia, projek ini menjadi bukti keterampilan dalam merancang, melaksana, memantau dan menilai kempen pemasaran media sosial secara menyeluruh, selaras dengan kehendak NOSS M731-001-4:2021.'),
  pageBreak(),
];

// ═══ BAB 2 ════════════════════════════════════════════════════════════════════
const bab2 = [
  ...babTitle('BAB 2', 'METODOLOGI'),

  h2('2.1  PENGENALAN'),
  body('Metodologi merupakan bahagian penting dalam sesuatu projek kerana ia menerangkan cara data dikumpulkan, dianalisis dan ditafsirkan bagi mencapai objektif yang telah ditetapkan. Metodologi yang jelas memastikan setiap dapatan yang dilaporkan boleh dirujuk kembali kepada sumber data yang sah, dan bukan berdasarkan andaian atau pemerhatian umum semata-mata.'),
  body('Dalam projek pemasaran media sosial ini, data prestasi direkodkan secara berterusan sepanjang kempen dijalankan. Setiap tontonan video, jangkauan iklan, perbelanjaan dan prospek yang diterima direkodkan secara automatik oleh platform media sosial, platform pengiklanan serta sistem pengurusan hubungan pelanggan (CRM) yang digunakan oleh TVET Lipis. Data ini kemudiannya dikumpulkan dan dianalisis pada akhir tempoh kempen bagi menilai sejauh mana objektif projek telah dicapai.'),
  body('Bab ini seterusnya menerangkan kaedah analisis yang digunakan dalam projek, instrumen pengumpulan data, cara data dianalisis, serta aliran pelaksanaan kempen sepanjang tempoh enam bulan bermula Januari hingga Jun 2026.'),

  h2('2.2  KAEDAH ANALISIS'),
  body('Kaedah analisis yang digunakan dalam projek ini ialah kaedah kuantitatif. Kaedah kuantitatif merujuk kepada analisis yang menggunakan data berbentuk angka yang boleh diukur, dibandingkan dan disahkan. Kesemua data prestasi kempen dalam projek ini adalah berbentuk kuantitatif dan direkodkan secara automatik oleh platform yang digunakan.'),
  body('Metrik yang digunakan dalam analisis ini dibahagikan kepada dua kumpulan mengikut objektif projek, sebagaimana ditunjukkan dalam Jadual 2.1. Istilah dalam bahasa Inggeris turut dinyatakan kerana istilah tersebut merupakan istilah asal yang dipaparkan pada platform media sosial dan platform pengiklanan yang digunakan.'),
  caption('Jadual 2.1: Metrik yang Digunakan dalam Analisis Projek'),
  table(['Metrik', 'Penerangan / Cara Pengiraan'], [
    ['A. METRIK JANGKAUAN DAN PENGLIBATAN (REACH AND ENGAGEMENT METRICS) — OBJEKTIF 2', ''],
    ['Tayangan (Impressions)', 'Jumlah kali iklan atau kandungan dipaparkan kepada pengguna'],
    ['Klik (Clicks)', 'Bilangan kali pengguna menekan iklan atau kandungan'],
    ['Kadar Klik Lalu (Click-Through Rate, CTR)', '(Klik ÷ Tayangan) × 100%'],
    ['Tontonan Video (Video Views)', 'Bilangan kali video ditonton oleh pengguna'],
    ['Bilangan Pengikut (Followers)', 'Bilangan akaun yang mengikuti profil institusi'],
    ['B. METRIK PROSPEK DAN KOS (LEAD AND COST METRICS) — OBJEKTIF 3', ''],
    ['Prospek (Leads)', 'Bilangan borang prospek dalam talian (lead form) yang diisi lengkap'],
    ['Perbelanjaan Iklan (Ad Spend)', 'Jumlah kos iklan berbayar dalam Ringgit Malaysia'],
    ['Kos Per Klik (Cost Per Click, CPC)', 'Perbelanjaan Iklan ÷ Bilangan Klik'],
    ['Kos Per Prospek (Cost Per Lead, CPL)', 'Perbelanjaan Iklan ÷ Bilangan Prospek'],
    ['Kadar Penukaran Prospek (Lead Conversion Rate)', '(Bilangan Pelajar Berdaftar ÷ Bilangan Prospek) × 100%'],
    ['Kos Per Pelajar Berdaftar (Cost Per Acquisition, CPA)', 'Perbelanjaan Iklan ÷ Bilangan Pelajar Berdaftar'],
  ], [4200, 4800]),
  blank(),
  body('Data dianalisis secara deskriptif dengan mengira jumlah keseluruhan, peratusan dan purata bagi setiap metrik. Dua bentuk perbandingan dibuat dalam analisis ini. Pertama, perbandingan antara kedua-dua platform iklan berbayar iaitu Meta Ads dan TikTok Ads, bagi menentukan platform yang menghasilkan prospek pada kos paling rendah. Kedua, perbandingan antara setiap bulan sepanjang tempoh kempen, bagi mengenal pasti perubahan prestasi serta kesan tindakan penambahbaikan yang diambil semasa kempen sedang berjalan.'),

  h2('2.3  INSTRUMEN KAJIAN'),
  body('Instrumen kajian merujuk kepada alat yang digunakan untuk mengumpul data bagi mencapai objektif projek. Dalam projek pemasaran media sosial ini, instrumen yang digunakan terdiri daripada alat perancangan kandungan, alat analitik platform, alat pengurusan iklan, serta sistem rekod prospek. Kesemua instrumen ini merekodkan data secara automatik sepanjang tempoh kempen dijalankan.'),
  caption('Jadual 2.2: Instrumen Kajian dan Data yang Dikumpulkan'),
  table(['Instrumen', 'Fungsi', 'Data yang Dikumpulkan'], [
    ['Kalendar Kandungan (Content Calendar)', 'Merancang dan menjadualkan penerbitan kandungan', 'Tema, format, platform dan tarikh penerbitan'],
    ['Borang Prospek Dalam Talian (Lead Generation Form)', 'Mengumpul maklumat bakal pelajar terus daripada iklan', 'Nama, nombor telefon, kursus diminati dan negeri asal'],
    ['TikTok Analytics', 'Memantau prestasi kandungan di TikTok', 'Tontonan video, pengikut dan penglibatan'],
    ['Meta Ads Manager', 'Menguruskan dan memantau kempen iklan Meta', 'Tayangan, kos per klik, perbelanjaan dan prospek'],
    ['TikTok Ads Manager', 'Menguruskan dan memantau kempen iklan TikTok', 'Tayangan, klik, perbelanjaan dan prospek'],
    ['Penyata Bil Platform (Billing Statement)', 'Mengesahkan jumlah perbelanjaan iklan sebenar', 'Jumlah bayaran bagi Meta Ads dan TikTok Ads'],
    ['Sistem CRM TVET Lipis', 'Merekod dan menyimpan data prospek', 'Prospek mengikut sumber, bulan, kursus dan negeri'],
  ], [2600, 2800, 3600]),
  blank(),
  body('Instrumen utama dalam pengumpulan data prospek ialah borang prospek dalam talian yang dikonfigurasikan dalam kempen Meta Ads dan TikTok Ads. Apabila bakal pelajar melihat iklan dan menekan butang pendaftaran minat, borang tersebut dipaparkan terus di dalam aplikasi tanpa perlu keluar ke laman web lain. Maklumat yang diisi kemudiannya dihantar terus ke sistem CRM TVET Lipis berserta maklumat platform sumbernya. Kaedah ini membolehkan setiap prospek dikenal pasti sumbernya secara automatik, iaitu masalah ketiga yang dikenal pasti dalam Bab 1.'),

  h2('2.4  ANALISA DATA'),
  body('Data yang diperoleh daripada instrumen kajian dianalisis bagi mendapatkan rumusan dan kesimpulan terhadap pencapaian projek. Analisis dibuat mengikut objektif projek yang telah ditetapkan dalam Bab 1, iaitu seperti berikut:'),
  listItem('i.     Merancang dan melaksanakan kempen pemasaran media sosial yang berstruktur — dianalisis berdasarkan saluran media sosial yang dipilih, kalendar kandungan yang dibangunkan, serta kempen organik dan berbayar yang berjaya dilaksanakan sepanjang tempoh enam bulan.'),
  listItem('ii.    Menganalisis jangkauan dan penglibatan audiens — dianalisis berdasarkan bilangan tayangan iklan, klik, kadar klik lalu serta kos per klik yang direkodkan oleh kedua-dua platform pengiklanan.'),
  listItem('iii.   Menilai keberkesanan kempen dalam menjana prospek pelajar — dianalisis berdasarkan bilangan prospek mengikut platform, bulan, kursus dan negeri, kos bagi setiap prospek, kadar penukaran prospek kepada pelajar berdaftar, serta kos bagi setiap pelajar berdaftar berbanding kos sasaran institusi.'),
  body('Hasil analisis dipersembahkan dalam bentuk jadual dan carta. Carta bar digunakan bagi menunjukkan perubahan prestasi mengikut bulan sepanjang tempoh kempen, manakala carta pai digunakan bagi menunjukkan pecahan prospek mengikut kursus. Persembahan data dalam bentuk visual ini memudahkan perbandingan dibuat dan rumusan dicapai terhadap pencapaian setiap objektif projek.'),

  h2('2.5  ALIRAN PELAKSANAAN KEMPEN'),
  body('Pelaksanaan kempen pemasaran media sosial ini dibahagikan kepada enam fasa utama, bermula daripada penentuan saluran media sosial sehingga pengoptimuman prestasi kempen. Setiap fasa mempunyai aktiviti dan hasil kerja yang tersendiri.'),

  h3('2.5.1  Perancangan Kalendar Kandungan'),
  body('Kalendar kandungan merupakan dokumen perancangan yang menentukan tema, format, platform dan tarikh penerbitan bagi setiap kandungan yang akan diterbitkan. Kalendar ini dirancang secara bulanan, iaitu perancangan disediakan pada awal setiap bulan bagi kandungan sepanjang bulan tersebut. Pendekatan bulanan dipilih kerana ia membolehkan penyesuaian dibuat mengikut peristiwa semasa seperti pengumuman keputusan peperiksaan, berbanding perancangan enam bulan sekaligus yang lebih sukar diubah suai.'),
  caption('Jadual 2.3: Tema Kandungan (Content Pillar) yang Digunakan dalam Kempen'),
  table(['Tema Kandungan', 'Tujuan', 'Contoh Kandungan', 'Segmen Sasaran'], [
    ['Motivasi dan peluang kedua', 'Menarik lepasan sekolah yang keputusan peperiksaannya tidak melayakkan laluan akademik', 'Ini adalah peluang kedua anda!', 'Pelajar'],
    ['Maklumat untuk ibu bapa', 'Memberi kefahaman kepada ibu bapa tentang laluan TVET dan pembiayaan PTPK', 'Perhatian Kepada Ibu Bapa', 'Ibu bapa'],
    ['Mematahkan miskonsepsi TVET', 'Menangani tanggapan negatif terhadap pendidikan kemahiran', 'Siapa kata lepasan TVET tak boleh sambung degree?', 'Pelajar dan ibu bapa'],
    ['Sorotan program', 'Memperkenalkan setiap program yang ditawarkan', 'Apa itu motion graphics?', 'Pelajar'],
    ['Jelajah sekolah', 'Meningkatkan kesedaran pelajar tempatan melalui rakaman aktiviti promosi di sekolah', 'Lipis School Tour', 'Pelajar tempatan'],
    ['Kandungan tempatan', 'Membina kesedaran jenama melalui kandungan bukan promosi', 'Tempat Makan Underrated Kuala Lipis', 'Umum'],
  ], [2100, 2800, 2400, 1700]),
  blank(),
  body('Enam tema ini dibahagikan kepada dua kategori mengikut tujuan. Empat tema pertama merupakan kandungan berorientasikan pengambilan pelajar yang menyampaikan maklumat program secara langsung. Dua tema terakhir pula merupakan kandungan berorientasikan kesedaran jenama yang tidak mempromosikan program secara langsung.'),
  body('Tema kandungan tempatan wajar diberi perhatian khusus. Video mengenai tempat makan di Kuala Lipis tidak mempunyai kaitan langsung dengan program yang ditawarkan, namun mencatatkan 99,400 tontonan secara organik. Kandungan sebegini lebih mudah diterima oleh audiens tempatan kerana ia tidak berbentuk iklan, sekali gus membolehkan akaun institusi muncul dalam paparan pengguna di kawasan sekitar. Pendekatan ini digunakan sebagai strategi meningkatkan jangkauan organik tanpa bergantung sepenuhnya kepada kandungan promosi.'),
  caption('Jadual 2.4: Format dan Kekerapan Penerbitan Kandungan'),
  table(['Format Kandungan', 'Kekerapan', 'Platform'], [
    ['Video pendek (short-form video)', 'Sekali setiap dua minggu', 'TikTok, Instagram Reels, Facebook'],
    ['Poster grafik (graphic poster)', 'Sekali seminggu', 'Instagram, Facebook'],
    ['Jumlah minimum', 'Sekurang-kurangnya satu kandungan baharu setiap minggu', 'Semua platform'],
  ], [3000, 3200, 2800]),
  blank(),
  body('Penghasilan kandungan dilaksanakan secara berpasukan. Pengkaji bertindak sebagai pengurus pemasaran yang merancang tema dan menyelaras pelaksanaan, manakala pasukan pemasaran terlibat dalam penghasilan kandungan. Reka bentuk poster grafik disediakan menggunakan perisian Canva, manakala penerbitan kandungan dijadualkan menggunakan fungsi penjadualan (scheduled posting) dalam Meta Business Suite bagi memastikan kandungan diterbitkan mengikut jadual yang ditetapkan.'),
  body('Tema kandungan turut disesuaikan mengikut kitaran pengambilan pelajar. Menjelang tempoh pengumuman keputusan SPM, kandungan lebih tertumpu kepada maklumat program dan syarat kemasukan bagi memenuhi keperluan bakal pelajar yang sedang meninjau pilihan pengajian. Pada bulan-bulan lain, kandungan lebih tertumpu kepada pembinaan kesedaran jenama.'),

  h3('2.5.2  Carta Alir Pelaksanaan Kempen'),
  body('Rajah 2.1 menunjukkan carta alir proses kerja pelaksanaan kempen bermula daripada penentuan saluran sehingga penyediaan laporan akhir. Carta alir ini turut menunjukkan kitaran pemantauan dan pengoptimuman yang berlaku semasa kempen sedang berjalan, di mana prestasi yang tidak mencapai sasaran menyebabkan tindakan penambahbaikan diambil sebelum pelaksanaan diteruskan.'),
  caption('Jadual 2.5: Fasa Pelaksanaan Kempen dan Aktiviti yang Dijalankan'),
  table(['Fasa', 'Aktiviti yang Dijalankan', 'Hasil Kerja'], [
    ['Fasa 1: Penentuan Saluran Media Sosial', 'Menganalisis profil audiens sasaran dan menentukan platform yang paling sesuai. Platform Meta dan TikTok dipilih kerana audiens sasaran aktif menggunakan platform tersebut. LinkedIn tidak dipilih kerana lebih tertumpu kepada golongan profesional, manakala pemasaran e-mel kurang berkesan bagi golongan lepasan sekolah.', 'Senarai saluran terpilih'],
    ['Fasa 2: Penyediaan Pelan Kempen', 'Menetapkan objektif kempen, segmen audiens, lokasi sasaran, tempoh, belanjawan, program yang dipromosikan serta sasaran pencapaian. Kos sasaran pengambilan pelajar ditetapkan pada RM500 berdasarkan kadar yuran ejen sedia ada.', 'Dokumen pelan kempen'],
    ['Fasa 3: Perancangan Kalendar Kandungan', 'Membina kalendar kandungan bulanan merangkumi tema, format, platform dan tarikh penerbitan. Reka bentuk disediakan menggunakan Canva dan penerbitan dijadualkan melalui Meta Business Suite.', 'Kalendar kandungan bulanan'],
    ['Fasa 4: Penyediaan Cadangan Kempen Iklan Berbayar', 'Menyediakan cadangan kempen merangkumi objektif Lead Generation, pengagihan belanjawan, parameter penyasaran, format iklan serta medan maklumat dalam borang prospek.', 'Dokumen cadangan iklan'],
    ['Fasa 5: Penyelarasan Pelaksanaan Kempen', 'Menerbitkan kandungan mengikut kalendar, melancarkan Meta Ads pada Januari 2026 dan TikTok Ads pada Mac 2026 bersempena musim keputusan SPM. Prospek dialirkan terus ke sistem CRM.', 'Kempen aktif dan rekod prospek'],
    ['Fasa 6: Pengoptimuman Prestasi Kempen', 'Memantau prestasi bulanan dan mengambil tindakan penambahbaikan. Kos per prospek yang meningkat menyebabkan kreatif diperbaharui dan saluran TikTok Ads dibuka. Belanjawan diagihkan semula kepada platform berprestasi terbaik.', 'Laporan prestasi bulanan'],
  ], [2200, 4600, 2200]),
  blank(),
  body('[ SISIPKAN RAJAH 2.1: CARTA ALIR PELAKSANAAN KEMPEN DI SINI ]', { bold: true, color: 'C00000' }),
  blank(),

  h3('2.5.3  Jadual Pelaksanaan Kempen'),
  caption('Jadual 2.6: Jadual Pelaksanaan Kempen Januari – Jun 2026'),
  table(['Bil', 'Aktiviti', 'Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun'], [
    ['1', 'Penentuan saluran media sosial', '/', '', '', '', '', ''],
    ['2', 'Penyediaan pelan kempen', '/', '', '', '', '', ''],
    ['3', 'Perancangan kalendar kandungan', '/', '/', '/', '/', '/', '/'],
    ['4', 'Cadangan kempen iklan Meta Ads', '/', '', '', '', '', ''],
    ['5', 'Penerbitan kandungan organik', '/', '/', '/', '/', '/', '/'],
    ['6', 'Pelaksanaan kempen Meta Ads', '/', '/', '/', '/', '/', '/'],
    ['7', 'Cadangan kempen iklan TikTok Ads', '', '/', '', '', '', ''],
    ['8', 'Pelaksanaan kempen TikTok Ads', '', '', '/', '/', '/', '/'],
    ['9', 'Pemantauan prestasi bulanan', '/', '/', '/', '/', '/', '/'],
    ['10', 'Pengoptimuman dan pengagihan belanjawan', '', '/', '/', '/', '/', '/'],
    ['11', 'Analisis dan penyediaan laporan', '', '', '', '', '', '/'],
  ], [600, 3600, 800, 800, 800, 800, 800, 800]),
  note('Petunjuk:  /  menunjukkan tempoh pelaksanaan aktiviti'),
  pageBreak(),
];

// ═══ BAB 3 ════════════════════════════════════════════════════════════════════
const bab3 = [
  ...babTitle('BAB 3', 'PENEMUAN DAN ANALISIS'),

  h2('3.1  PENGENALAN'),
  body('Penemuan dan analisis merupakan bahagian yang membentangkan hasil yang diperoleh daripada pengumpulan data serta menerangkan bagaimana data tersebut ditafsirkan. Bab ini membentangkan penemuan hasil pelaksanaan kempen pemasaran media sosial TVET Lipis sepanjang tempoh Januari hingga Jun 2026.'),
  body('Data yang dibentangkan dalam bab ini diperoleh daripada analitik platform media sosial, platform pengurusan iklan, penyata bil rasmi platform pengiklanan, serta sistem pengurusan hubungan pelanggan (CRM) institusi. Kesemua data direkodkan secara automatik oleh sistem sepanjang tempoh kempen dijalankan.'),
  body('Analisis dalam bab ini disusun mengikut tiga objektif projek yang telah ditetapkan dalam Bab 1. Setiap objektif dibincangkan berdasarkan data sebenar yang direkodkan, dipersembahkan dalam bentuk jadual dan carta, serta diikuti dengan huraian terhadap dapatan yang diperoleh.'),

  h2('3.2  HASIL KAJIAN'),
  body('Kempen pemasaran media sosial TVET Lipis telah dilaksanakan sepanjang enam bulan bermula Januari sehingga Jun 2026, merangkumi penerbitan kandungan organik di tiga platform serta kempen iklan berbayar di dua platform. Ringkasan keseluruhan pencapaian kempen ditunjukkan dalam Jadual 3.1, manakala huraian terperinci bagi setiap objektif dibentangkan dalam seksyen 3.3.'),
  caption('Jadual 3.1: Ringkasan Keseluruhan Pencapaian Kempen (Januari – Jun 2026)'),
  table(['Perkara', 'Pencapaian'], [
    ['Tempoh kempen', 'Januari – Jun 2026 (6 bulan)'],
    ['Platform kandungan organik', 'TikTok, Instagram, Facebook'],
    ['Platform iklan berbayar', 'Meta Ads, TikTok Ads'],
    ['Jumlah tayangan iklan (impressions)', '2,370,268'],
    ['Jumlah klik (clicks)', '23,056'],
    ['Jumlah perbelanjaan iklan (ad spend)', 'RM11,267.97'],
    ['Jumlah prospek dijana (leads)', '3,470'],
    ['Kos purata setiap prospek (CPL)', 'RM3.25'],
    ['Jumlah pelajar berdaftar', '76'],
    ['Kos setiap pelajar berdaftar (CPA)', 'RM154.36'],
  ], [4500, 4500]),
  note('Nota: Perbelanjaan iklan (ad spend), tayangan (impressions) dan klik (clicks) diperoleh daripada Meta Ads Manager dan TikTok Ads Manager, manakala bilangan prospek (leads) diperoleh daripada sistem CRM.'),

  h2('3.3  ANALISIS'),

  h3('Objektif 1: Merancang dan melaksanakan kempen pemasaran media sosial yang berstruktur'),
  caption('Jadual 3.2: Pelaksanaan Kempen Mengikut Saluran (Januari – Jun 2026)'),
  table(['Saluran', 'Jenis', 'Tempoh Pelaksanaan', 'Status'], [
    ['TikTok', 'Kandungan organik', 'Januari – Jun 2026', 'Dilaksanakan'],
    ['Instagram', 'Kandungan organik', 'Januari – Jun 2026', 'Dilaksanakan (127 siaran)'],
    ['Facebook', 'Kandungan organik', 'Januari – Jun 2026', 'Dilaksanakan'],
    ['Meta Ads', 'Iklan berbayar', 'Januari – Jun 2026 (6 bulan)', 'Dilaksanakan'],
    ['TikTok Ads', 'Iklan berbayar', 'Mac – Jun 2026 (4 bulan)', 'Dilaksanakan'],
  ], [1800, 2200, 2800, 2200]),
  blank(),
  body('Objektif pertama telah dicapai. Kempen pemasaran media sosial berjaya dirancang dan dilaksanakan secara berstruktur merentas lima saluran sepanjang tempoh enam bulan. Kalendar kandungan bulanan telah dibangunkan berpandukan enam tema kandungan seperti yang dinyatakan dalam Bab 2, dengan sekurang-kurangnya satu kandungan baharu diterbitkan setiap minggu.'),
  body('Kempen iklan berbayar Meta Ads dilancarkan pada Januari 2026, diikuti dengan pelancaran TikTok Ads pada Mac 2026. Pemilihan bulan Mac bagi pelancaran TikTok Ads adalah keputusan yang dirancang, iaitu bersempena dengan tempoh menghampiri pengumuman keputusan SPM apabila bakal pelajar mula meninjau pilihan pengajian lanjutan.'),
  caption('Jadual 3.3: Kandungan Berprestasi Tertinggi Mengikut Tema'),
  table(['Tema Kandungan', 'Contoh Kandungan', 'Tontonan (video views)'], [
    ['Motivasi dan peluang kedua', 'Ini adalah peluang kedua anda!', '3,800,000'],
    ['Maklumat untuk ibu bapa', 'Perhatian Kepada Ibu Bapa', '502,900'],
    ['Kandungan tempatan', 'Tempat Makan Underrated Kuala Lipis', '99,400'],
  ], [2800, 3800, 2400]),
  blank(),
  body('Kandungan berprestasi tertinggi berasal daripada tiga tema yang berbeza, menunjukkan kalendar kandungan yang dirancang berjaya dilaksanakan dan setiap tema memberi sumbangan tersendiri. Kandungan bertema motivasi disasarkan kepada segmen pelajar, kandungan bertema maklumat ibu bapa kepada segmen ibu bapa, manakala kandungan tempatan berperanan membina kesedaran jenama dalam kalangan audiens setempat.'),

  h3('Objektif 2: Menganalisis jangkauan dan penglibatan audiens'),
  caption('Jadual 3.4: Prestasi Kempen Iklan Berbayar Mengikut Platform'),
  table(['Metrik', 'Meta Ads', 'TikTok Ads', 'Jumlah'], [
    ['Perbelanjaan (ad spend)', 'RM8,936.21', 'RM2,331.76', 'RM11,267.97'],
    ['Tayangan (impressions)', '1,332,527', '1,037,741', '2,370,268'],
    ['Klik (clicks)', '11,765', '11,291', '23,056'],
    ['Kadar klik lalu (CTR)', '0.88%', '1.09%', '0.97%'],
    ['Kos per klik (CPC)', 'RM0.76', 'RM0.21', 'RM0.49'],
    ['Prospek (leads)', '2,336', '1,134', '3,470'],
    ['Kos per prospek (CPL)', 'RM3.83', 'RM2.06', 'RM3.25'],
  ], [3000, 2000, 2000, 2000]),
  note('Nota: Bilangan klik Meta Ads dikira daripada perbelanjaan dibahagikan dengan kos per klik (CPC) yang dilaporkan oleh Meta Ads Manager.'),
  body('Objektif kedua telah dicapai. Kempen iklan berbayar menghasilkan 2,370,268 tayangan dan 23,056 klik sepanjang tempoh enam bulan. Jumlah ini jauh melebihi apa yang mampu dicapai melalui kandungan organik sahaja, memandangkan bilangan pengikut institusi di semua platform hanya kira-kira 13,965 akaun. Dapatan ini menyelesaikan masalah pertama yang dikenal pasti dalam Bab 1, iaitu jangkauan organik yang rendah dan bergantung kepada faktor yang tidak dapat dikawal.'),
  body('Perbandingan antara kedua-dua platform menunjukkan perbezaan kecekapan yang ketara. Kedua-dua platform menghasilkan jumlah klik yang hampir sama iaitu 11,765 bagi Meta Ads dan 11,291 bagi TikTok Ads, namun Meta Ads memerlukan perbelanjaan hampir empat kali ganda untuk mencapainya. Kos per klik TikTok Ads adalah 72.8% lebih rendah manakala kadar klik lalu pula 23.2% lebih tinggi berbanding Meta Ads.'),
  caption('Jadual 3.5: Pengagihan Perbelanjaan Iklan Mengikut Segmen Umur'),
  table(['Segmen Umur', 'Meta Ads (RM)', 'Peratus', 'TikTok Ads (RM)', 'Peratus'], [
    ['18 – 34 tahun (segmen pelajar)', '6,488.25', '72.6%', '2,329.85', '99.9%'],
    ['35 – 64 tahun (segmen ibu bapa)', '2,386.65', '26.7%', '—', '—'],
    ['65 tahun ke atas', '61.08', '0.7%', '—', '—'],
    ['Tidak diketahui', '—', '—', '1.91', '0.1%'],
    ['JUMLAH', '8,936.21', '100%', '2,331.76', '100%'],
  ], [2600, 1800, 1400, 1800, 1400]),
  blank(),
  body('Pengagihan perbelanjaan iklan menunjukkan strategi penyasaran yang berbeza bagi setiap platform. Bagi Meta Ads, belanjawan diagihkan kepada kedua-dua segmen audiens iaitu 72.6% kepada segmen pelajar dan 26.7% kepada segmen ibu bapa. Bagi TikTok Ads pula, keseluruhan belanjawan disasarkan kepada segmen pelajar sahaja tanpa set iklan bagi segmen ibu bapa.'),
  body('Perbezaan ini merupakan keputusan penyasaran yang dibuat berdasarkan profil pengguna setiap platform. Facebook mempunyai kadar penggunaan yang tinggi dalam kalangan golongan dewasa berumur 35 tahun ke atas, menjadikannya saluran yang sesuai untuk menjangkau ibu bapa dan penjaga. TikTok pula didominasi oleh pengguna berumur muda, menjadikannya saluran yang lebih berkesan untuk menjangkau bakal pelajar secara langsung.'),

  h3('Objektif 3: Menilai keberkesanan kempen dalam menjana prospek pelajar'),
  caption('Jadual 3.6: Bilangan Prospek Mengikut Bulan dan Platform'),
  table(['Bulan', 'Meta Ads', 'TikTok Ads', 'Jumlah'], [
    ['Januari 2026', '345', '—', '345'],
    ['Februari 2026', '133', '—', '133'],
    ['Mac 2026', '778', '5', '783'],
    ['April 2026', '798', '560', '1,358'],
    ['Mei 2026', '226', '315', '541'],
    ['Jun 2026', '56', '254', '310'],
    ['JUMLAH', '2,336', '1,134', '3,470'],
  ], [2400, 2200, 2200, 2200]),
  blank(),
  img('Rajah_3.1_Prospek_Bulanan.png', 560, 324),
  caption('Rajah 3.1: Bilangan Prospek Mengikut Bulan dan Platform'),
  body('Bilangan prospek tertinggi dicatatkan pada April 2026 dengan 1,358 prospek, iaitu tempoh selepas pengumuman keputusan SPM apabila bakal pelajar aktif mencari pilihan pengajian. Keputusan melancarkan TikTok Ads pada Mac 2026 terbukti tepat apabila platform tersebut menyumbang 560 prospek pada bulan April sahaja.'),
  body('Menjelang Mei dan Jun 2026, TikTok Ads mengatasi Meta Ads sebagai sumber prospek utama. Dua faktor menyumbang kepada perubahan ini. Pertama, peruntukan belanjawan telah dialihkan kepada TikTok Ads berikutan prestasi yang ditunjukkan pada April. Kedua, TikTok Ads mencatatkan kos per prospek yang lebih rendah sepanjang tempoh kempen iaitu RM2.06 berbanding RM3.83 bagi Meta Ads, menjadikan setiap ringgit yang dibelanjakan menghasilkan lebih banyak prospek. Prestasi Meta Ads turut menurun sebanyak 93% daripada 798 prospek pada April kepada 56 prospek pada Jun.'),
  caption('Jadual 3.7: Bilangan Prospek Mengikut Kursus'),
  table(['Kursus', 'Bilangan Prospek', 'Peratusan'], [
    ['Pendidikan Awal Kanak-Kanak (PAKK)', '1,903', '54.8%'],
    ['Pra-Sekolah', '753', '21.7%'],
    ['Multimedia', '572', '16.5%'],
    ['Elektrik', '240', '6.9%'],
    ['Lain-lain', '2', '0.1%'],
    ['JUMLAH', '3,470', '100%'],
  ], [4200, 2400, 2400]),
  blank(),
  img('Rajah_3.2_Prospek_Kursus.png', 460, 372),
  caption('Rajah 3.2: Bilangan Prospek Mengikut Kursus'),
  body('Kursus Pendidikan Awal Kanak-Kanak mencatatkan permintaan tertinggi dengan 1,903 prospek atau 54.8% daripada keseluruhan. Gabungan program Pendidikan Awal Kanak-Kanak dan Pra-Sekolah pula mewakili 76.5% daripada jumlah prospek, menunjukkan permintaan yang jelas tertumpu kepada bidang pendidikan awal kanak-kanak.'),
  caption('Jadual 3.8: Sepuluh Negeri Tertinggi Mengikut Bilangan Prospek'),
  table(['Negeri', 'Bilangan Prospek'], [
    ['Selangor', '443'], ['Kelantan', '401'], ['Pahang', '293'], ['Johor', '261'],
    ['Terengganu', '186'], ['Kedah', '183'], ['Perak', '173'], ['Sabah', '129'],
    ['Negeri Sembilan', '97'], ['Kuala Lumpur', '76'],
  ], [5400, 3600]),
  blank(),
  body('Prospek diterima daripada seluruh negara termasuk Sabah, membuktikan kempen berjaya mengatasi batasan geografi yang menjadi cabaran utama institusi. Selangor mencatatkan bilangan tertinggi walaupun kempen tidak menjadikan negeri tersebut sebagai tumpuan utama, manakala Pahang sebagai negeri institusi berada di kedudukan ketiga dengan 293 prospek.'),
  caption('Jadual 3.9: Penukaran Prospek kepada Pelajar Berdaftar'),
  table(['Perkara', 'Bilangan', 'Peratusan'], [
    ['Jumlah prospek dijana', '3,470', '100%'],
    ['Jumlah pelajar berdaftar', '76', '2.19%'],
    ['Daripada saluran digital', '73', '96.1%'],
    ['Daripada pemasaran luar talian', '3', '3.9%'],
    ['Kadar penukaran prospek kepada pelajar', '—', '2.10%'],
  ], [4200, 2400, 2400]),
  blank(),
  body('Sebanyak 76 pelajar telah mendaftar sepanjang tempoh Januari hingga Jun 2026, dengan 73 daripadanya berasal daripada saluran digital sama ada secara langsung melalui borang prospek atau melalui cadangan rakan yang mengetahui TVET Lipis menerusi media sosial. Ini bermakna 96.1% pendaftaran pelajar dalam tempoh tersebut berpunca daripada aktiviti pemasaran digital.'),
  body('Kadar penukaran sebanyak 2.10% merupakan angka yang direkodkan sehingga Jun 2026. Angka ini dijangka meningkat kerana sebahagian prospek yang mengisi borang pada awal tahun berkemungkinan hanya membuat keputusan pendaftaran pada suku ketiga atau keempat tahun yang sama.'),
  caption('Jadual 3.10: Kos Bagi Setiap Pelajar Berdaftar Berbanding Kos Sasaran'),
  table(['Perkara', 'Nilai'], [
    ['Jumlah perbelanjaan iklan', 'RM11,267.97'],
    ['Pelajar berdaftar daripada saluran digital', '73'],
    ['Kos bagi setiap pelajar berdaftar (CPA)', 'RM154.36'],
    ['Kos sasaran pengambilan pelajar (target CPA)', 'RM500.00'],
    ['Perbezaan berbanding kos sasaran', '69.1% lebih rendah'],
  ], [5000, 4000]),
  blank(),
  body('Kos sasaran pengambilan pelajar sebanyak RM500 merupakan kadar yuran ejen yang lazimnya dibayar institusi kepada ejen bagi setiap pelajar yang berjaya didaftarkan. Kadar ini telah wujud sebelum kempen dilaksanakan dan digunakan sebagai siling kos dalam cadangan kempen iklan berbayar.'),
  body('Kempen mencatatkan kos sebanyak RM154.36 bagi setiap pelajar berdaftar, iaitu 69.1% lebih rendah daripada kos sasaran. Berbanding membayar yuran ejen bagi 73 pelajar yang sama, kempen ini menjimatkan kira-kira RM25,232. Perlu dinyatakan bahawa kos ini merangkumi perbelanjaan iklan sahaja dan tidak termasuk kos masa kakitangan atau kos pemasaran luar talian.'),
  pageBreak(),
];

// ═══ BAB 4 ════════════════════════════════════════════════════════════════════
const bab4 = [
  ...babTitle('BAB 4', 'PERBINCANGAN, CADANGAN DAN KESIMPULAN'),

  h2('4.1  PENGENALAN'),
  body('Bab ini membincangkan dapatan yang diperoleh dalam Bab 3 dengan lebih mendalam serta mengaitkannya dengan objektif projek dan permasalahan yang dikenal pasti dalam Bab 1. Bab ini juga mengemukakan cadangan penambahbaikan bagi pelaksanaan kempen pemasaran media sosial pada masa hadapan, dan seterusnya merumuskan keseluruhan projek yang telah dilaksanakan.'),

  h2('4.2  PERBINCANGAN'),
  body('Perbincangan ini menumpukan kepada enam dapatan utama yang diperoleh daripada pelaksanaan kempen pemasaran media sosial TVET Lipis.'),
  bodyRun([{ text: 'Kos pengambilan pelajar jauh di bawah kos sasaran institusi. ', bold: true }, { text: 'Dapatan paling ketara ialah kos bagi setiap pelajar berdaftar iaitu RM154.36, berbanding kos sasaran pengambilan pelajar (target cost per acquisition) sebanyak RM500 yang ditetapkan institusi. Angka RM500 ini merupakan yuran ejen (agent commission) yang lazimnya dibayar kepada ejen bagi setiap pelajar yang berjaya didaftarkan. Memandangkan institusi sudah sedia membayar kadar tersebut melalui kaedah rujukan, kadar ini digunakan sebagai siling kos bagi menilai keberkesanan kempen iklan berbayar. Pencapaian 69.1% di bawah kos sasaran bermakna kempen pemasaran media sosial merupakan kaedah pengambilan pelajar yang lebih menjimatkan berbanding kaedah rujukan sedia ada. Bagi 73 pelajar yang mendaftar melalui saluran digital, penjimatan yang diperoleh adalah kira-kira RM25,232.' }]),
  bodyRun([{ text: 'Iklan berbayar menyelesaikan masalah jangkauan organik yang rendah. ', bold: true }, { text: 'Masalah pertama yang dikenal pasti dalam Bab 1 ialah jangkauan organik yang terlalu rendah. Kandungan organik hanya dipaparkan kepada sebahagian kecil pengikut sedia ada, dan peluang untuk menjangkau audiens yang lebih luas bergantung sepenuhnya kepada sama ada kandungan tersebut terpilih untuk dipaparkan pada laman For You Page (FYP) atau menjadi tular. Keadaan ini tidak boleh dijadikan asas perancangan kerana ia tidak dapat dijangka dan tidak dapat dikawal. Kempen iklan berbayar pula menghasilkan 2,370,268 tayangan dan 23,056 klik secara konsisten sepanjang enam bulan. Ini mengesahkan bahawa bagi institusi yang mempunyai asas pengikut yang kecil, iklan berbayar merupakan satu keperluan dan bukan sekadar pilihan tambahan.' }]),
  bodyRun([{ text: 'TikTok Ads lebih cekap berbanding Meta Ads pada setiap peringkat. ', bold: true }, { text: 'Perbandingan antara kedua-dua platform menunjukkan TikTok Ads mencatatkan prestasi yang lebih baik pada setiap metrik kos. Kos per klik TikTok adalah 72.8% lebih rendah, kadar klik lalu 23.2% lebih tinggi, manakala kos per prospek 46.2% lebih rendah. Yang paling ketara, kedua-dua platform menghasilkan jumlah klik yang hampir sama iaitu 11,765 bagi Meta Ads dan 11,291 bagi TikTok Ads, namun Meta Ads memerlukan perbelanjaan hampir empat kali ganda untuk mencapainya. Dapatan inilah yang mendorong pengagihan semula belanjawan kepada TikTok Ads pada Mei dan Jun 2026.' }]),
  bodyRun([{ text: 'Penyasaran disesuaikan mengikut profil pengguna platform. ', bold: true }, { text: 'Kempen tidak menggunakan pendekatan penyasaran yang sama bagi kedua-dua platform. Bagi Meta Ads, sebanyak 72.6% belanjawan disasarkan kepada segmen pelajar dan 26.7% kepada segmen ibu bapa. Bagi TikTok Ads pula, keseluruhan belanjawan disasarkan kepada segmen pelajar sahaja. Pendekatan ini dibuat berdasarkan profil pengguna setiap platform, di mana Facebook mempunyai kadar penggunaan yang tinggi dalam kalangan golongan dewasa manakala TikTok didominasi oleh pengguna yang lebih muda.' }]),
  bodyRun([{ text: 'Permintaan tertumpu kepada dua program. ', bold: true }, { text: 'Data prospek menunjukkan permintaan yang tidak seimbang antara program yang ditawarkan. Kursus Pendidikan Awal Kanak-Kanak menyumbang 54.8% prospek manakala Pra-Sekolah 21.7%, iaitu gabungan 76.5% daripada keseluruhan permintaan. Walau bagaimanapun, angka ini perlu ditafsirkan dengan berhati-hati. Bilangan kandungan yang dihasilkan bagi setiap program adalah lebih kurang sama sepanjang kempen. Perbezaan permintaan ini sebahagiannya berpunca daripada struktur kempen iklan yang digunakan, di mana kesemua program digabungkan dalam satu kempen yang sama dengan set iklan dibahagikan mengikut kumpulan umur sahaja. Dalam struktur sedemikian, algoritma platform akan menyalurkan lebih banyak paparan kepada kandungan yang mencatatkan penglibatan tertinggi, sehingga mengurangkan peluang paparan bagi program lain dalam kempen yang sama.' }]),
  bodyRun([{ text: 'Jangkauan melangkaui batasan geografi. ', bold: true }, { text: 'Prospek diterima daripada seluruh negara termasuk Sabah, dengan Selangor mencatatkan bilangan tertinggi iaitu 443 prospek. Pahang sebagai negeri institusi hanya berada di kedudukan ketiga dengan 293 prospek. Dapatan ini membuktikan pemasaran digital mampu mengatasi kelemahan kedudukan geografi yang selama ini menghadkan keberkesanan kaedah pemasaran konvensional seperti lawatan ke sekolah dan pameran pendidikan.' }]),

  h2('4.3  CADANGAN'),
  body('Berdasarkan dapatan projek, beberapa cadangan penambahbaikan dikemukakan bagi kempen pemasaran media sosial pada masa hadapan.'),
  bodyRun([{ text: 'Pertama, menguji set iklan segmen ibu bapa di TikTok Ads. ', bold: true }, { text: 'Sepanjang kempen ini, segmen ibu bapa hanya disasarkan melalui Meta Ads. Memandangkan bilangan pengguna berumur lebih matang di TikTok semakin meningkat, dan TikTok Ads mencatatkan kos per prospek yang lebih rendah, set iklan bagi segmen ibu bapa wajar diuji di platform tersebut pada kitaran akan datang.' }]),
  bodyRun([{ text: 'Kedua, mengenal pasti punca penurunan prestasi Meta Ads. ', bold: true }, { text: 'Prospek daripada Meta Ads menurun sebanyak 93% daripada 798 pada April kepada 56 pada Jun 2026. Antara punca yang mungkin ialah keletihan kreatif (creative fatigue), iaitu apabila iklan yang sama dipaparkan terlalu kerap sehingga audiens tidak lagi memberi tindak balas. Kreatif iklan baharu perlu dihasilkan dan diuji sebelum kitaran pengambilan seterusnya.' }]),
  bodyRun([{ text: 'Ketiga, menguji kedua-dua platform secara serentak pada awal kempen. ', bold: true }, { text: 'Dalam kempen ini, keseluruhan belanjawan disalurkan kepada Meta Ads pada Januari, manakala TikTok Ads hanya dibuka pada Mac. Bagi kitaran akan datang, kedua-dua platform wajar diuji serentak dengan belanjawan kecil pada minggu pertama kempen. Kos per prospek kemudiannya dibandingkan, dan sebahagian besar belanjawan disalurkan kepada platform yang menunjukkan prestasi lebih baik.' }]),
  bodyRun([{ text: 'Keempat, menstruktur semula kempen iklan mengikut program. ', bold: true }, { text: 'Pada masa ini, kesemua program digabungkan dalam satu kempen dengan set iklan dibahagikan mengikut kumpulan umur sahaja. Struktur ini menyebabkan program-program bersaing untuk mendapatkan paparan dalam belanjawan yang sama, dan algoritma platform akan menumpukan paparan kepada program yang mencatatkan penglibatan tertinggi. Bagi kitaran akan datang, dicadangkan setiap program mempunyai kempen dan peruntukan belanjawan tersendiri. Pendekatan ini memastikan setiap program menerima paparan yang mencukupi, di samping membolehkan prestasi setiap program dinilai secara berasingan.' }]),

  h2('4.4  KESIMPULAN'),
  body('Projek ini telah mencapai ketiga-tiga objektif yang ditetapkan. Kempen pemasaran media sosial berjaya dirancang dan dilaksanakan secara berstruktur merentas lima saluran sepanjang enam bulan, lengkap dengan kalendar kandungan dan kempen iklan berbayar di dua platform. Prestasi kempen dianalisis berdasarkan metrik jangkauan, penglibatan, penjanaan prospek dan kos, manakala keberkesanan kempen dinilai berbanding kos sasaran pengambilan pelajar yang ditetapkan institusi.'),
  body('Kempen ini menghasilkan 3,470 prospek dengan perbelanjaan iklan sebanyak RM11,267.97, iaitu kos purata RM3.25 bagi setiap prospek. Sebanyak 76 pelajar mendaftar sepanjang tempoh tersebut, dengan 73 daripadanya atau 96.1% berpunca daripada saluran digital. Kos bagi setiap pelajar berdaftar ialah RM154.36, iaitu 69.1% lebih rendah berbanding kos sasaran RM500 yang selama ini dibayar sebagai yuran ejen. Ini bermakna kempen pemasaran media sosial bukan sahaja berjaya menjana prospek, malah melakukannya pada kos yang jauh lebih rendah berbanding kaedah pengambilan sedia ada.'),
  body('Pengajaran utama daripada projek ini ialah kecekapan kos sesuatu kempen lebih ditentukan oleh pemilihan platform dan struktur kempen berbanding saiz belanjawan. TikTok Ads menghasilkan jumlah klik yang hampir sama dengan Meta Ads walaupun menggunakan hanya satu perempat daripada perbelanjaan, manakala struktur kempen yang menggabungkan kesemua program dalam satu belanjawan menyebabkan paparan tertumpu kepada program tertentu sahaja. Kedua-dua dapatan ini menunjukkan kepentingan memantau prestasi secara berterusan dan bertindak ke atas data semasa kempen sedang berjalan, bukan hanya selepas kempen tamat.'),
  body('Pengalaman melaksanakan projek ini merangkumi penentuan saluran media sosial, penyediaan pelan kempen, perancangan kalendar kandungan, penyediaan cadangan kempen iklan berbayar, penyelarasan pelaksanaan kempen serta pengoptimuman prestasi kempen, selaras dengan kehendak unit kompetensi M731-001-4:2021-C01, Implement Social Media Marketing Campaign Plan.'),
  pageBreak(),
];

// ═══ RUJUKAN ══════════════════════════════════════════════════════════════════
const rujukan = [
  ...babTitle('', 'RUJUKAN'),
  body('Jabatan Pembangunan Kemahiran. (2021). Panduan Pelaksanaan Pengiktirafan Pencapaian Terdahulu (PPT). Kementerian Sumber Manusia Malaysia.'),
  body('Jabatan Pembangunan Kemahiran. (2021). Standard Kemahiran Pekerjaan Kebangsaan M731-001-4:2021 Digital Marketing Planning and Implementation. Kementerian Sumber Manusia Malaysia.'),
  body('Meta Platforms Ireland Limited. (2026). Penyata Bil Akaun Pengiklanan 494800392480239, 1 Januari hingga 1 Julai 2026.'),
  body('Meta Platforms Inc. (2026). Laporan Prestasi Kempen Meta Ads Manager, 1 Januari hingga 30 Jun 2026.'),
  body('TikTok Pte. Ltd. (2026). Laporan Prestasi Kempen TikTok Ads Manager, 1 Januari hingga 30 Jun 2026.'),
  body('TVET Lipis. (2026). Laporan Data Prospek Sistem CRM, Januari hingga Jun 2026.'),
  pageBreak(),
];

// ═══ LAMPIRAN ═════════════════════════════════════════════════════════════════
const lampiran = [
  ...babTitle('', 'LAMPIRAN'),
  body('Lampiran A     Kalendar Kandungan Media Sosial (Januari – Jun 2026)'),
  body('Lampiran B     Tangkapan Skrin TikTok Analytics'),
  body('Lampiran C     Tangkapan Skrin Instagram Insights'),
  body('Lampiran D     Tangkapan Skrin Meta Ads Manager'),
  body('Lampiran E     Tangkapan Skrin TikTok Ads Manager'),
  body('Lampiran F     Penyata Bil Meta Ads dan TikTok Ads'),
  body('Lampiran G     Tangkapan Skrin Sistem CRM TVET Lipis'),
  body('Lampiran H     Contoh Kandungan Berprestasi Tertinggi'),
];

// ═══ ASSEMBLE ═════════════════════════════════════════════════════════════════
const doc = new Document({
  styles: { default: { document: { run: { font: F, size: 24 } } } },
  sections: [{
    properties: {
      page: {
        margin: {
          top: convertInchesToTwip(0.98),
          bottom: convertInchesToTwip(0.98),
          left: convertInchesToTwip(1.57),
          right: convertInchesToTwip(0.98),
        },
      },
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ children: [PageNumber.CURRENT], font: F, size: 20 })],
        })],
      }),
    },
    children: [
      ...coverPage, ...pengesahanPage, ...penghargaanPage, ...abstrakPage,
      ...isiKandungan, ...bab1, ...bab2, ...bab3, ...bab4, ...rujukan, ...lampiran,
    ],
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(`${SCRATCHPAD}/LPKT-CU1-Zuriel-Seong.docx`, buf);
  console.log('Done: LPKT-CU1-Zuriel-Seong.docx');
});
