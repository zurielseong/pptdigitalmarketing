import Link from 'next/link'
import { PROGRAMS, CONTACT } from '@/lib/programs'

const STATS = [
  { value: '6', label: 'Program Ditawarkan' },
  { value: '70%', label: 'Pembelajaran Praktikal' },
  { value: 'PTPK', label: 'Pembiayaan Tersedia' },
  { value: 'JPK', label: 'Diiktiraf K16005' },
]

const TESTIMONIALS = [
  { name: 'Afiah Damia inti Saparudin', program: 'Alumni Pendidikan Awal Kanak-Kanak', quote: 'Saya nak berterima kasih kepada pihak pengurusan sebab telah menyediakan fasiliti yang mencukupi selama saya belajar di sini selama 2 tahun.' },
  { name: 'Nur Aiya Aivee Binti Budi Kartono', program: 'Alumni Pendidikan Awal Kanak-Kanak', quote: 'Saya ingin berterima kasih kepada pihak kolej yang telah menyediakan tempat kediaman yang selesa dan kemudahan dari segi pembelajaran.' },
  { name: 'Qisna Athirah Binti Hasnan', program: 'Alumni Pendidikan Awal Kanak-Kanak', quote: 'Pengalaman paling bermakna ialah saya dapat mengenal kawan-kawan dan pensyarah yang banyak menolong dan membantu saya di kolej dari awal hingga akhir.' },
  { name: 'Nurul Farisya Binti Ramlan', program: 'Alumni Pengurusan Pentadbiran', quote: 'Sepanjang 2 tahun di sini, banyak pengalaman antaranya belajar perkara baru. Kepada adik-adik semoga maju jaya dan teruskan semangat.' },
]

const FAQS = [
  { q: 'Adakah ini program belajar dari awal?', a: 'Tidak. Program sepenuh masa adalah pengajian biasa selama 2–2.5 tahun. Program PPT pula adalah kaedah pengiktirafan pengalaman kerja sedia ada.' },
  { q: 'Berapa yuran pengajian?', a: 'Yuran pendaftaran RM500. Yuran pengajian dibiayai sepenuhnya oleh PTPK. Yuran admin RM500 untuk 2 tahun. Penginapan asrama RM150 sebulan.' },
  { q: 'Apakah syarat kemasukan?', a: 'Berumur 16–35 tahun, boleh membaca, mengira dan menulis, lepasan PT3/SPM/STPM/Tahfiz & Pondok.' },
  { q: 'Berapa lama tempoh pengajian?', a: '2–2.5 tahun. Pelajar memperoleh SKM dan DKM. Struktur 70% praktikal, 30% teori.' },
  { q: 'Boleh terus ambil DKM tanpa SKM?', a: 'Tidak. Pelajar wajib lulus SKM (Tahap 3) terlebih dahulu sebelum melanjutkan ke DKM (Tahap 4).' },
]

export default function HomePage() {
  const activePrograms = PROGRAMS.filter(p => p.status === 'active')
  const comingPrograms = PROGRAMS.filter(p => p.status === 'coming_soon')
  return (
    <>
      <section className="relative bg-ink-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ink-900 via-ink-800 to-ink-900" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="gold-badge mb-6">Pendaftaran Dibuka 2026</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">Sedang Mencari <span className="text-gold-400">Diploma?</span><br />Jom Pilih TVET Lipis!</h1>
            <p className="mt-6 text-lg md:text-xl text-ink-300 max-w-2xl leading-relaxed">TVET Lipis berperanan sebagai Pusat Pendidikan (Edu Hub) di Kuala Lipis yang menawarkan Program TVET Diploma Kemahiran Malaysia. Dibiayai PTPK. Diiktiraf JPK K16005.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/program" className="btn-gold text-base px-8 py-3.5">Lihat Program</Link>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-outline-gold text-base px-8 py-3.5">Tanya via WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gold-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(s => (<div key={s.label} className="text-center"><div className="text-3xl font-extrabold text-black">{s.value}</div><div className="text-sm font-medium text-ink-700 mt-1">{s.label}</div></div>))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="gold-badge mb-3">Program Sepenuh Masa</div>
            <h2 className="section-title">Program Diploma & Sijil Ditawarkan</h2>
            <p className="section-subtitle mx-auto text-center">Pilih bidang yang sesuai dengan minat dan kerjaya anda. Semua program diiktiraf JPK dan dibiayai PTPK.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {activePrograms.map(prog => (
              <div key={prog.slug} className="card p-6 flex gap-5">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${prog.color} flex items-center justify-center text-2xl flex-shrink-0`}>{prog.icon}</div>
                <div className="flex-1 min-w-0">
                  <span className="gold-badge mb-2">{prog.level}</span>
                  <h3 className="font-bold text-ink-900 text-lg leading-tight">{prog.name}</h3>
                  <p className="text-xs text-ink-400 mt-1 mb-3">{prog.code}</p>
                  <p className="text-sm text-ink-600 leading-relaxed line-clamp-2">{prog.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">{prog.careers.slice(0,3).map(c => (<span key={c} className="text-xs px-2 py-1 bg-ink-50 text-ink-600 rounded-md">{c}</span>))}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center"><Link href="/program" className="btn-black px-8">Lihat Semua Program & Kerjaya →</Link></div>
        </div>
      </section>
      <section className="py-20 bg-ink-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="gold-badge mb-4">Program PPT</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Nak Guna Pengalaman Kerja<br />untuk Dapatkan Diploma?</h2>
          <p className="text-ink-300 text-lg max-w-2xl mx-auto mb-8">PPT (Pengiktirafan Pencapaian Terdahulu) adalah penyelesaiannya — 6 bulan sahaja.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-10">
            {[{num:'6 Bulan',label:'Tempoh Program'},{num:'RM 4,000',label:'Yuran Keseluruhan'},{num:'3 Program',label:'Bidang Tersedia'}].map(s => (<div key={s.label} className="bg-ink-800 rounded-2xl p-6"><div className="text-2xl font-extrabold text-gold-400">{s.num}</div><div className="text-ink-300 text-sm mt-1">{s.label}</div></div>))}
          </div>
          <Link href="/ppt" className="btn-gold px-10 py-4 text-base">Ketahui Lebih Lanjut Tentang PPT →</Link>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><div className="gold-badge mb-3">Testimoni</div><h2 className="section-title">Apa Kata Alumni Kami</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map(t => (<div key={t.name} className="card p-6"><div className="text-gold-400 text-3xl mb-4">“</div><p className="text-ink-600 leading-relaxed italic mb-6">{t.quote}</p><div><div className="font-semibold text-ink-900">{t.name}</div><div className="text-sm text-gold-600">{t.program}</div></div></div>))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-ink-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><div className="gold-badge mb-3">FAQ</div><h2 className="section-title">Soalan Lazim</h2></div>
          <div className="space-y-4">
            {FAQS.map(faq => (<details key={faq.q} className="card p-5 group"><summary className="font-semibold text-ink-900 cursor-pointer list-none flex justify-between items-center">{faq.q}<span className="text-gold-500 text-xl">+</span></summary><p className="mt-3 text-ink-600 leading-relaxed">{faq.a}</p></details>))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gradient-to-r from-gold-600 to-gold-400">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-black mb-3">#TVETlipisPilihanAnda</h2>
          <p className="text-ink-800 text-lg mb-8">Pendaftaran 2026 dibuka sekarang. Jangan tunggu lagi — tempat adalah terhad.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-black px-10 py-4 text-base">WhatsApp Sekarang</a>
            <Link href="/program" className="inline-flex items-center justify-center px-10 py-4 rounded-lg font-semibold border-2 border-black text-black hover:bg-black hover:text-gold-400 transition-all duration-200 text-base">Lihat Program</Link>
          </div>
        </div>
      </section>
    </>
  )
}
