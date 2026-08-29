const { Document, Packer, Paragraph, TextRun, AlignmentType, PageBreak, Table, TableRow,
        TableCell, WidthType, ShadingType, ImageRun, convertInchesToTwip } = require('docx');
const fs = require('fs');
const F='Arial', HD='D9D9D9';
const p=(t,o={})=>new Paragraph({children:[new TextRun({text:t,font:F,size:o.size||20,bold:o.bold,color:o.color})],
  alignment:o.align||AlignmentType.LEFT,spacing:{before:o.before||0,after:o.after===undefined?110:o.after}});
const cell=(t,o={})=>new TableCell({width:{size:o.w||2000,type:WidthType.DXA},
  shading:o.fill?{type:ShadingType.CLEAR,color:'auto',fill:o.fill}:undefined,margins:{top:70,bottom:70,left:100,right:100},
  children:[new Paragraph({children:[new TextRun({text:String(t),font:F,size:o.size||19,bold:o.bold})],alignment:o.align||AlignmentType.LEFT})]});
const nb=()=>new Paragraph({children:[new PageBreak()]});
const img=(f,w,h)=>new Paragraph({children:[new ImageRun({type:'png',data:fs.readFileSync(f),transformation:{width:w,height:h}})],
  alignment:AlignmentType.CENTER,spacing:{before:150,after:150}});
const div=(t)=>([nb(),new Paragraph({text:'',spacing:{after:2900}}),
  new Paragraph({children:[new TextRun({text:t,font:F,size:30,bold:true})],alignment:AlignmentType.CENTER,spacing:{after:220}}),
  new Paragraph({children:[new TextRun({text:'KANDUNGAN DAN SUSUNAN PORTFOLIO',font:F,size:18,color:'666666'})],alignment:AlignmentType.CENTER})]);

const CONTENTS=[
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
 'BORANG PENILAIAN LAPORAN PENGALAMAN KETERAMPILAN TERDAHULU (LPKT)',
];

const body=[
  p('JABATAN PEMBANGUNAN KEMAHIRAN',{size:24,bold:true,align:AlignmentType.CENTER,before:1400}),
  p('KEMENTERIAN SUMBER MANUSIA, MALAYSIA',{size:22,bold:true,align:AlignmentType.CENTER,after:800}),
  p('PORTFOLIO',{size:44,bold:true,align:AlignmentType.CENTER,after:60}),
  p('PENGIKTIRAFAN PENCAPAIAN TERDAHULU (PPT)',{size:24,bold:true,align:AlignmentType.CENTER,after:900}),
  new Table({width:{size:8600,type:WidthType.DXA},columnWidths:[3000,5600],rows:[
    ['NAMA CALON','ZURIEL SEONG MING EE'],
    ['NO. KAD PENGENALAN','980926-56-5571'],
    ['KOD PROGRAM','M731-001-4:2021'],
    ['NAMA PROGRAM','DIGITAL MARKETING PLANNING AND IMPLEMENTATION'],
    ['TAHAP','TAHAP 4 — DIPLOMA KEMAHIRAN MALAYSIA (DKM)'],
  ].map(r=>new TableRow({children:[cell(r[0],{w:3000,bold:true,fill:HD}),cell(r[1],{w:5600})]}))}),

  nb(),
  p('KANDUNGAN DAN SUSUNAN PORTFOLIO',{size:28,bold:true,align:AlignmentType.CENTER,after:300}),
  new Table({width:{size:9400,type:WidthType.DXA},columnWidths:[1000,8400],rows:[
    new TableRow({children:[cell('BIL.',{w:1000,bold:true,fill:HD,align:AlignmentType.CENTER}),cell('PERKARA',{w:8400,bold:true,fill:HD})]}),
    ...CONTENTS.map((c,i)=>new TableRow({children:[cell(String(i+1),{w:1000,align:AlignmentType.CENTER}),cell(c,{w:8400})]})),
  ]}),
];
Packer.toBuffer(new Document({styles:{default:{document:{run:{font:F,size:20}}}},
  sections:[{properties:{page:{margin:{top:convertInchesToTwip(0.8),bottom:convertInchesToTwip(0.7),left:convertInchesToTwip(0.8),right:convertInchesToTwip(0.7)}}},children:body}]}))
 .then(b=>{fs.writeFileSync('part_cover.docx',b);console.log('cover ok');});

// separate divider+attachment parts so each slots between the JPK forms
const mk=(name, items)=>{
  const ch=[];
  items.forEach((it,i)=>{ if(i) ch.push(nb()); ch.push(...div(it.t).slice(1)); if(it.imgs) it.imgs.forEach(g=>{ch.push(nb());ch.push(img(g[0],g[1],g[2]));}); if(it.note) {ch.push(nb());ch.push(p(it.note,{bold:true,color:'C00000',align:AlignmentType.CENTER,before:3000}));} });
  Packer.toBuffer(new Document({styles:{default:{document:{run:{font:F,size:20}}}},
    sections:[{properties:{page:{margin:{top:convertInchesToTwip(0.8),bottom:convertInchesToTwip(0.7),left:convertInchesToTwip(0.8),right:convertInchesToTwip(0.7)}}},children:ch}]}))
   .then(b=>{fs.writeFileSync(name,b);console.log(name,'ok');});
};

mk('part_attach.docx', [
  {t:'SALINAN KAD PENGENALAN', imgs:[['doc_ic.png',330,467]]},
  {t:'SLIP PENDAFTARAN CALON PPT\nDAN PENUGASAN PP-PPT', imgs:[['doc_slip1.png',330,467],['doc_slip2.png',330,467],['doc_slip3.png',330,467]]},
  {t:'SURAT AKUAN PENGESAHAN CALON', imgs:[['doc_akuan.png',350,455]]},
  {t:'SALINAN SKM TERTINGGI YANG DIMILIKI\n(SIJIL KEMAHIRAN MALAYSIA TAHAP 3)', note:'[ LAMPIRKAN SALINAN SIJIL KEMAHIRAN MALAYSIA TAHAP 3 — M731-001-3:2021 ]'},
  {t:'DOKUMEN PERAKUAN TEMPOH PENGALAMAN KERJA\nDALAM BIDANG KEMAHIRAN YANG DIPOHON', imgs:[['doc_pengalaman.png',350,470]]},
  {t:'CARTA ORGANISASI TEMPAT KERJA', imgs:[['doc_carta1.png',430,323],['doc_carta2.png',430,323]]},
  {t:'CARTA PROFIL PEKERJAAN (JPC) /\nCARTA PROFIL KOMPETENSI (CPC)', imgs:[['doc_cpc1.png',440,257],['doc_cpc2.png',440,278],['doc_cpc3.png',440,290]]},
]);
mk('part_div_bukti.docx', [{t:'BUKTI-BUKTI KETERAMPILAN CALON\nMENGIKUT UNIT KOMPETENSI (CU)'}]);
mk('part_div_lpkt.docx', [{t:'BORANG PENILAIAN\nLAPORAN PENGALAMAN KETERAMPILAN TERDAHULU (LPKT)'}]);
