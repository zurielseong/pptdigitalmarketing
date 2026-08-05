import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PROGRAMS, CONTACT } from '@/lib/programs'

export function generateStaticParams() {
  return PROGRAMS.map(p => ({ slug: p.slug }))
}

export function generateMetadata({ params }) {
  const prog = PROGRAMS.find(p => p.slug === params.slug)
  if (!prog) return {}

  const title = `${prog.name} — Diploma Kemahiran Malaysia Kuala Lipis`
  const description = `${prog.description} Daftar program ${prog.name} di TVET Lipis, Kuala Lipis Pahang. Dibiayai PTPK. JPK K16005.`

  return {
    title,
    description,
    keywords: [
      prog.name,
      `${prog.name} Kuala Lipis`,
      `${prog.name} Pahang`,
      `diploma ${prog.name.toLowerCase()}`,
      prog.level,
      'TVET Lipis',
      'JPK K16005',
      'PTPK',
      ...prog.careers,
    ],
    alternates: { canonical: `https://tvetlipis.my/program/${prog.slug}` },
    openGraph: {
      title,
      description,
      url: `https://tvetlipis.my/program/${prog.slug}`,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: `${prog.name} — TVET Lipis` }],
    },
  }
}

function ProgramJsonLd({ prog }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: prog.name,
    description: prog.description,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'TVET Lipis (Akademi Pembangunan Kemahiran USIM)',
      url: 'https://tvetlipis.my',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Level 4, Lipis Centrepoint, Jalan Pekeliling',
        addressLocality: 'Kuala Lipis',
        addressRegion: 'Pahang',
        postalCode: '27200',
        addressCountry: 'MY',
      },
    },
    educationalCredentialAwarded: prog.level,
    url: `https://tvetlipis.my/program/${prog.slug}`,
    occupationalCategory: prog.careers.join(', '),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

const PROGRAM_FAQS = {
  'pendidikan-awal-kanak-kanak': [
    { q: 'Berapa lama tempoh pengajian program ini?', a: '24 bulan (2 tahun) pengajian sepenuh masa.' },
    { q: 'Adakah program ini dibiayai PTPK?', a: 'Ya, program ini layak mendapat pembiayaan PTPK sepenuhnya.' },
    { q: 'Apakah syarat kelayakan minimum?', a: 'Lulus SPM atau setaraf. Umur 17–35 tahun. Warganegara Malaysia.' },
    { q: 'Apa prospek kerjaya selepas tamat?', a: 'Graduan boleh berkhidmat sebagai Guru Taska, Penyelia Taska, atau mendirikan Taska sendiri.' },
  ],
  'multimedia': [
    { q: 'Berapa lama tempoh pengajian program ini?', a: '24 bulan (2 tahun) pengajian sepenuh masa.' },
    { q: 'Adakah program ini dibiayai PTPK?', a: 'Ya, program ini layak mendapat pembiayaan PTPK sepenuhnya.' },
    { q: 'Apakah syarat kelayakan minimum?', a: 'Lulus SPM atau setaraf. Umur 17–35 tahun. Warganegara Malaysia.' },
    { q: 'Apa yang dipelajari dalam program Multimedia?', a: 'Reka grafik, pembangunan web, animasi, pengeluaran video, dan pemasaran digital.' },
  ],
  'elektrik': [
    { q: 'Berapa lama tempoh pengajian program ini?', a: 'Program SKM Tahap 2 & 3: 12–18 bulan pengajian sepenuh masa.' },
    { q: 'Adakah program ini dibiayai PTPK?', a: 'Ya, program ini layak mendapat pembiayaan PTPK.' },
    { q: 'Apakah syarat kelayakan minimum?', a: 'Lulus PMR/PT3 atau setaraf. Umur 17–35 tahun. Warganegara Malaysia.' },
    { q: 'Apa prospek kerjaya selepas tamat?', a: 'Juruteknik Elektrik, Juruelektrik, Kontraktor Elektrik, atau Juruteknik Penyelenggaraan.' },
  ],
  'pra-sekolah': [
    { q: 'Berapa lama tempoh pengajian program ini?', a: '24 bulan (2 tahun) pengajian sepenuh masa.' },
    { q: 'Adakah program ini dibiayai PTPK?', a: 'Ya, program ini layak mendapat pembiayaan PTPK sepenuhnya.' },
    { q: 'Apakah syarat kelayakan minimum?', a: 'Lulus SPM atau setaraf. Umur 17–35 tahun. Warganegara Malaysia.' },
    { q: 'Apa beza program Pra-Sekolah dengan Pendidikan Awal Kanak-Kanak?', a: 'Program Pra-Sekolah lebih fokus kepada pengurusan dan pentadbiran kelas prasekolah (umur 4–6 tahun), manakala PAKK merangkumi penjagaan kanak-kanak yang lebih muda (bayi hingga 4 tahun).' },
  ],
  'kulinari': [
    { q: 'Bilakah program Kulinari akan dibuka?', a: 'Program ini sedang dalam proses pendaftaran dan akan diumumkan tidak lama lagi. Daftar minat anda sekarang.' },
    { q: 'Apakah yang akan dipelajari?', a: 'Seni masakan profesional, pengurusan dapur, penyediaan makanan, dan keselamatan makanan mengikut piawaian industri.' },
  ],
  'cyber-security': [
    { q: 'Bilakah program Cyber Security akan dibuka?', a: 'Program ini sedang dalam proses pendaftaran dan akan diumumkan tidak lama lagi. Daftar minat anda sekarang.' },
    { q: 'Apakah yang akan dipelajari?', a: 'Keselamatan rangkaian, pengurusan risiko siber, forensik komputer, dan perlindungan sistem maklumat.' },
  ],
}

export default function ProgramDetailPage({ params }) {
  const prog = PROGRAMS.find(p => p.slug === params.slug)
  if (!prog) notFound()

  const faqs = PROGRAM_FAQS[prog.slug] || []
  const isComingSoon = prog.status === 'coming_soon'

  return (
    <>
      <ProgramJsonLd prog={prog} />
      <section className="bg-ink-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-ink-400 mb-6">
            <Link href="/" className="hover:text-gold-400 transition-colors">Utama</Link>
            <span>/</span>
            <Link href="/program" className="hover:text-gold-400 transition-colors">Program</Link>
            <span>/</span>
            <span className="text-ink-200">{prog.name}</span>
          </nav>
          <div className="flex items-start gap-6">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${prog.color} flex items-center justify-center text-4xl flex-shrink-0`}>{prog.icon}</div>
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="gold-badge">{prog.level}</span>
                {isComingSoon ? (
                  <span className="text-xs px-2 py-1 bg-ink-700 text-ink-300 rounded-full font-medium">Akan Datang</span>
                ) : (
                  <span className="text-xs px-2 py-1 bg-green-900/50 text-green-400 rounded-full font-medium">Aktif</span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{prog.name}</h1>
              <p className="mt-2 text-gold-400 font-medium text-lg">{prog.tagline}</p>
              {prog.code !== 'Akan Diumumkan' && (
                <p className="mt-1 text-xs text-ink-400 font-mono">{prog.code}</p>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-ink-900 mb-3">Tentang Program</h2>
                <p className="text-ink-600 leading-relaxed text-base">{prog.description}</p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-ink-900 mb-4">Kelebihan Kursus</h2>
                <ul className="space-y-3">
                  {prog.highlights.map(h => (
                    <li key={h} className="flex gap-3 text-ink-700">
                      <span className="text-gold-500 text-lg leading-tight mt-0.5">✓</span>
                      <span>{h}</span>
                    </li>
                  ))}
                  <li className="flex gap-3 text-ink-700"><span className="text-gold-500 text-lg leading-tight mt-0.5">✓</span><span>Dibiayai sepenuhnya oleh PTPK (tiada beban kewangan semasa pengajian)</span></li>
                  <li className="flex gap-3 text-ink-700"><span className="text-gold-500 text-lg leading-tight mt-0.5">✓</span><span>Sijil diiktiraf JPK K16005 — diterima pakai oleh majikan seluruh Malaysia</span></li>
                </ul>
              </div>
              {!isComingSoon && (
                <div>
                  <h2 className="text-xl font-bold text-ink-900 mb-4">Prospek Pekerjaan</h2>
                  <div className="flex flex-wrap gap-2">
                    {prog.careers.map(c => (
                      <span key={c} className="px-4 py-2 bg-ink-50 text-ink-700 rounded-xl border border-ink-100 text-sm font-medium">{c}</span>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold text-ink-900 mb-4">Syarat Kemasukan</h2>
                <div className="bg-ink-50 rounded-xl p-5 space-y-3">
                  {[
                    ['Kelayakan Minimum', prog.slug === 'elektrik' ? 'Lulus PMR / PT3 atau setaraf' : 'Lulus SPM atau setaraf'],
                    ['Warganegara', 'Malaysia sahaja'],
                    ['Had Umur', '17 – 35 tahun'],
                    ['Pembiayaan', 'Layak memohon PTPK (pinjaman pendidikan)'],
                  ].map(([label, val]) => (
                    <div key={label} className="flex gap-3">
                      <span className="text-ink-400 font-medium text-sm w-40 flex-shrink-0">{label}</span>
                      <span className="text-ink-700 text-sm">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
              {faqs.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-ink-900 mb-4">Soalan Lazim</h2>
                  <div className="space-y-4">
                    {faqs.map(({ q, a }) => (
                      <div key={q} className="border border-ink-100 rounded-xl p-5">
                        <h3 className="font-semibold text-ink-900 mb-2">{q}</h3>
                        <p className="text-ink-600 text-sm leading-relaxed">{a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-4">
                <div className="card p-6 border-2 border-gold-400">
                  <h3 className="font-bold text-ink-900 text-lg mb-1">{isComingSoon ? 'Daftar Minat' : 'Daftar Sekarang'}</h3>
                  <p className="text-sm text-ink-500 mb-4">{isComingSoon ? 'Tinggalkan nama anda — kami akan hubungi bila program ini dibuka.' : 'Hubungi kaunselor kami untuk maklumat lanjut dan borang pendaftaran.'}</p>
                  <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-gold w-full text-center block py-3">WhatsApp Sekarang</a>
                  <div className="mt-4 pt-4 border-t border-ink-100 space-y-2">
                    <a href={`tel:${CONTACT.phone1.replace(/\s/g, '')}`} className="flex items-center gap-2 text-sm text-ink-600 hover:text-gold-500 transition-colors"><span>📞</span><span>{CONTACT.phone1}</span></a>
                    <a href={`tel:${CONTACT.phone2.replace(/\s/g, '')}`} className="flex items-center gap-2 text-sm text-ink-600 hover:text-gold-500 transition-colors"><span>📱</span><span>{CONTACT.phone2}</span></a>
                    <p className="text-xs text-ink-400 mt-1">{CONTACT.hours}</p>
                  </div>
                </div>
                {prog.brochure && (
                  <a href={prog.brochure} target="_blank" rel="noopener noreferrer" className="btn-outline-gold w-full text-center block py-3">Muat Turun Brosur PDF</a>
                )}
                <div className="card p-5 bg-ink-50 border-0">
                  <p className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-3">Program Lain</p>
                  <ul className="space-y-2">
                    {PROGRAMS.filter(p => p.slug !== prog.slug).slice(0, 4).map(p => (
                      <li key={p.slug}>
                        <Link href={`/program/${p.slug}`} className="flex items-center gap-2 text-sm text-ink-600 hover:text-gold-500 transition-colors"><span>{p.icon}</span><span className="truncate">{p.name}</span></Link>
                      </li>
                    ))}
                  </ul>
                  <Link href="/program" className="text-xs text-gold-500 hover:text-gold-600 font-medium mt-3 inline-block">Lihat semua program →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-14 bg-ink-900">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">{isComingSoon ? `Berminat dengan program ${prog.name}?` : `Bersedia untuk mendaftar ${prog.name}?`}</h2>
          <p className="text-ink-300 mb-6">{isComingSoon ? 'Program ini akan dibuka tidak lama lagi. Daftar minat sekarang dan kami akan maklumkan anda terus.' : 'Pendaftaran terbuka sekarang. Hubungi kami dan kami akan bantu proses pendaftaran anda dalam masa 24 jam.'}</p>
          <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-gold px-10 py-3.5 inline-block">{isComingSoon ? 'Daftar Minat Percuma' : 'Daftar Program Ini'}</a>
        </div>
      </section>
    </>
  )
}
