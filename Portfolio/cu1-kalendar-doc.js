const { Document, Packer, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell,
        WidthType, ShadingType, ImageRun, convertInchesToTwip, BorderStyle } = require('docx');
const fs = require('fs');
const F = 'Calibri', NAVY = '1F3864';
const p = (t,o={}) => new Paragraph({ children:[new TextRun({text:t,font:F,size:o.size||21,bold:o.bold,italics:o.italics,color:o.color})],
  alignment:o.align||AlignmentType.JUSTIFIED, spacing:{line:276,before:o.before||0,after:o.after===undefined?130:o.after} });
const h1 = (t) => new Paragraph({ children:[new TextRun({text:t,font:F,size:24,bold:true,color:NAVY})],
  spacing:{before:260,after:130}, border:{bottom:{style:BorderStyle.SINGLE,size:6,color:NAVY}} });
const cell = (t,o={}) => new TableCell({ width:{size:o.w||2000,type:WidthType.DXA},
  shading:o.fill?{type:ShadingType.CLEAR,color:'auto',fill:o.fill}:undefined, margins:{top:50,bottom:50,left:85,right:85},
  children:[new Paragraph({children:[new TextRun({text:String(t),font:F,size:19,bold:o.bold,color:o.color})],spacing:{line:252}})] });
const table = (head,rows,w) => new Table({ width:{size:13000,type:WidthType.DXA}, columnWidths:w, rows:[
  new TableRow({tableHeader:true,children:head.map((h,i)=>cell(h,{w:w[i],bold:true,fill:NAVY,color:'FFFFFF'}))}),
  ...rows.map((r,ri)=>new TableRow({children:r.map((c,i)=>cell(c,{w:w[i],fill:ri%2?'F2F5F9':undefined}))}))]});

const doc = new Document({
  styles:{default:{document:{run:{font:F,size:21}}}},
  sections:[{
    properties:{ page:{ size:{ orientation:'landscape' },
      margin:{top:convertInchesToTwip(0.6),bottom:convertInchesToTwip(0.6),left:convertInchesToTwip(0.6),right:convertInchesToTwip(0.6)} } },
    children:[
      new Paragraph({children:[new TextRun({text:'LAMPIRAN A',font:F,size:22,bold:true,color:'C1272D'})],alignment:AlignmentType.CENTER,spacing:{after:40}}),
      new Paragraph({children:[new TextRun({text:'KALENDAR KANDUNGAN MEDIA SOSIAL',font:F,size:32,bold:true,color:NAVY})],alignment:AlignmentType.CENTER,spacing:{after:40}}),
      new Paragraph({children:[new TextRun({text:'TVET Lipis · April – September 2025',font:F,size:20,color:'555555'})],alignment:AlignmentType.CENTER,spacing:{after:200}}),
      new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:160},
        children:[new ImageRun({type:'png',data:fs.readFileSync('cu1_kalendar.png'),transformation:{width:700,height:512}})]}),
      h1('TEMA KANDUNGAN (CONTENT PILLAR)'),
      table(['Tema','Tujuan','Segmen Sasaran'],[
        ['Peluang Kedua','Menarik lepasan sekolah yang keputusan peperiksaannya tidak melayakkan laluan akademik','Pelajar 17–28'],
        ['Maklumat Ibu Bapa','Memberi kefahaman kepada ibu bapa tentang laluan TVET dan pembiayaan PTPK','Ibu bapa 40–60'],
        ['Miskonsepsi TVET','Menangani tanggapan negatif terhadap pendidikan kemahiran','Pelajar dan ibu bapa'],
        ['Sorotan Program','Memperkenalkan setiap program yang ditawarkan','Pelajar'],
        ['Jelajah Sekolah','Meningkatkan kesedaran pelajar tempatan melalui rakaman aktiviti promosi di sekolah','Pelajar tempatan'],
        ['Kandungan Tempatan','Membina kesedaran jenama melalui kandungan bukan promosi','Umum'],
      ],[2600,7400,3000]),
      h1('FORMAT DAN KEKERAPAN PENERBITAN'),
      table(['Format','Kekerapan','Platform'],[
        ['Video pendek','Sekali setiap dua minggu','TikTok, Instagram Reels, Facebook'],
        ['Poster grafik','Sekali seminggu','Instagram, Facebook'],
        ['Jumlah minimum','Sekurang-kurangnya satu kandungan baharu setiap minggu','Semua platform'],
      ],[3000,4500,5500]),
      p('Nota: Kempen iklan berbayar Meta Ads dimulakan pada April 2025 dan TikTok Ads pada Jun 2025, selari dengan kalendar kandungan organik di atas.',{before:160,italics:true,color:'555555'}),
    ],
  }],
});
Packer.toBuffer(doc).then(b=>{fs.writeFileSync('LAMPIRAN-A-Kalendar-Kandungan-Apr-Sep-2025.docx',b);console.log('done');});
