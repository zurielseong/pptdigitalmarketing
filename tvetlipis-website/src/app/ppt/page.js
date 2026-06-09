import { PPT_PROGRAMS, CONTACT } from '@/lib/programs'

export const metadata = {
  title: 'PPT — Pengiktirafan Pencapaian Terdahulu',
  description: 'Program PPT TVET Lipis: Dapatkan Diploma Kemahiran Malaysia melalui pengalaman kerja dalam 6 bulan. Yuran RM4,000.',
  alternates: { canonical: 'https://tvetlipis.my/ppt' },
}

const STEPS = [
  { step:1, icon:'📋', title:'Semak Kelayakan & Daftar', desc:'Pemohon menyemak kelayakan dan mendaftar PPT melalui TVET Lipis.' },
  { step:2, icon:'💻', title:'Sesi Online & Kelas Express', desc:'Pemohon mengikuti sesi taklimat dan bimbingan secara dalam talian.' },
  { step:3, icon:'🏄', title:'Latihan Mock-Up', desc:'Calon menghadiri ke kolej untuk menjalani latihan mock-up bagi penilaian amali.' },
  { step:4, icon:'✅', title:'Penilaian Amali Secara Fizikal', desc:'Pemohon dinilai secara praktikal oleh Pegawai Pengesahan Luaran JPK.' },
]

export default function PPTPage() {
  return (
    <>
      <section className="bg-ink-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gold-badge mb-4">Program PPT</div>
          <h1 className="text-4xl font-extrabold text-white leading-tight">Pengiktirafan Pencapaian<br /><span className="text-gold-400">Terdahulu (PPT)</span></h1>
          <p className="mt-4 text-ink-300 text-lg max-w-2xl">Dapatkan DKM melalui pengalaman kerja anda dalam <strong className="text-white">6 bulan sahaja</strong>.</p>
        </div>
      </section>
      <section className="py-16 bg-gold-50 border-b border-gold-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-ink-900 mb-4">Apa Itu PPT?</h2>
          <p className="text-ink-600 leading-relaxed text-lg">PPT (Pengiktirafan Pencapaian Terdahulu) ialah kaedah untuk mengiktiraf individu yang memiliki pengalaman dan pencapaian terdahulu berdasarkan keperluan <strong>NOSS / SKPK</strong>.</p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[{num:'6 Bulan',sub:'3 bulan SKM + 3 bulan DKM'},{num:'RM 4,000',sub:'RM500 deposit + 3 ansuran'},{num:'100% Online',sub:'Kelas express boleh ulang tonton'}].map(s => (<div key={s.num} className="bg-white rounded-2xl p-5 border border-gold-200"><div className="text-2xl font-extrabold text-gold-600">{s.num}</div><div className="text-sm text-ink-500 mt-1">{s.sub}</div></div>))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-ink-900 mb-2 text-center">Bidang Yang Boleh Diiktiraf</h2>
          <p className="text-ink-500 text-center mb-8">Semak kelayakan anda untuk setiap program.</p>
          <div className="space-y-4">
            {PPT_PROGRAMS.map(prog => (<div key={prog.name} className="card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"><div className="flex items-center gap-4"><div className="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center text-gold-600 text-lg">🎓</div><div><div className="font-semibold text-ink-900">{prog.name}</div><div className="text-sm text-ink-500">Diploma Kemahiran Malaysia · 6 Bulan</div></div></div><a href={prog.form} target="_blank" rel="noopener noreferrer" className="btn-gold text-sm px-6 py-2.5 flex-shrink-0">Semak Kelayakan</a></div>))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-ink-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-2 text-center">Proses Permohonan PPT</h2>
          <p className="text-ink-400 text-center mb-10">4 langkah mudah dari pendaftaran hingga sijil.</p>
          <div className="space-y-4">
            {STEPS.map((step,i) => (<div key={step.step} className="flex gap-5"><div className="flex flex-col items-center"><div className="w-12 h-12 rounded-2xl bg-gold-500 flex items-center justify-center text-black font-extrabold text-lg flex-shrink-0">{step.step}</div>{i<STEPS.length-1 && <div className="w-0.5 h-full mt-2 bg-ink-700" />}</div><div className="pb-6"><div className="text-xl mb-1">{step.icon}</div><div className="font-semibold text-white">{step.title}</div><div className="text-ink-400 text-sm mt-1 leading-relaxed">{step.desc}</div></div></div>))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-ink-900 mb-8 text-center">Yuran Pengajian PPT</h2>
          <div className="card overflow-hidden">
            <div className="bg-gold-500 p-4 text-center"><div className="text-3xl font-extrabold text-black">RM 4,000</div><div className="text-ink-700 font-medium">Jumlah Keseluruhan (SKM + DKM)</div></div>
            <div className="p-6 space-y-3">
              <div className="flex justify-between text-sm py-2 border-b border-ink-100"><span className="text-ink-600">Deposit Awal</span><span className="font-semibold text-ink-900">RM 500</span></div>
              <div className="flex justify-between text-sm py-2 border-b border-ink-100"><span className="text-ink-600">Ansuran</span><span className="font-semibold text-ink-900">3 kali bayaran</span></div>
              <div className="flex justify-between text-sm py-2"><span className="text-ink-600">Pengeluaran KWSP</span><span className="font-semibold text-blue-600">Boleh digunakan</span></div>
            </div>
            <div className="px-6 pb-6"><a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-gold w-full justify-center">Daftar PPT Sekarang</a></div>
          </div>
        </div>
      </section>
    </>
  )
}
