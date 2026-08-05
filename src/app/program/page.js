import Link from 'next/link'
import { PROGRAMS, CONTACT } from '@/lib/programs'

export const metadata = {
  title: 'Program Diploma & Sijil Kemahiran Malaysia',
  description:
    'Senarai lengkap program DKM dan SKM di TVET Lipis Kuala Lipis. Pendidikan Awal Kanak-Kanak, Multimedia, Elektrik, Pra-Sekolah, Kulinari, Cyber Security. Dibiayai PTPK.',
  alternates: { canonical: 'https://tvetlipis.my/program' },
}

export default function ProgramPage() {
  const active = PROGRAMS.filter(p => p.status === 'active')
  const coming = PROGRAMS.filter(p => p.status === 'coming_soon')

  return (
    <>
      <section className="bg-ink-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gold-badge mb-4">Program Sepenuh Masa</div>
          <h1 className="text-4xl font-extrabold text-white">Program Diploma & Sijil</h1>
          <p className="mt-3 text-ink-300 text-lg max-w-2xl">
            Semua program diiktiraf JPK K16005, dibiayai PTPK, dengan struktur 70% praktikal untuk memastikan kebolehpasaran graduan.
          </p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {active.map(prog => (
              <div key={prog.slug} className="card overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${prog.color}`} />
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${prog.color} flex items-center justify-center text-3xl flex-shrink-0`}>
                      {prog.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="gold-badge">{prog.level}</span>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">Aktif</span>
                      </div>
                      <h2 className="text-2xl font-bold text-ink-900">
                        <Link href={`/program/${prog.slug}`} className="hover:text-gold-500 transition-colors">
                          {prog.name}
                        </Link>
                      </h2>
                      <p className="text-xs text-ink-400 mt-1 mb-3 font-mono">{prog.code}</p>
                      <p className="text-ink-600 leading-relaxed">{prog.description}</p>
                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold text-ink-900 mb-3">Kelebihan Kursus</h3>
                          <ul className="space-y-2">
                            {prog.highlights.map(h => (
                              <li key={h} className="flex gap-2 text-sm text-ink-600">
                                <span className="text-gold-500 mt-0.5">✓</span>
                                {h}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold text-ink-900 mb-3">Prospek Pekerjaan</h3>
                          <div className="flex flex-wrap gap-2">
                            {prog.careers.map(c => (
                              <span key={c} className="text-xs px-3 py-1.5 bg-ink-50 text-ink-700 rounded-lg border border-ink-100">{c}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-gold text-sm px-6 py-2.5">Daftar Program Ini</a>
                        <Link href={`/program/${prog.slug}`} className="btn-outline-gold text-sm px-6 py-2.5">Maklumat Lanjut</Link>
                        {prog.brochure && (
                          <a href={prog.brochure} target="_blank" rel="noopener noreferrer" className="text-sm px-6 py-2.5 text-ink-600 hover:text-gold-500 transition-colors underline underline-offset-2">Muat Turun Brosur</a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {coming.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold text-ink-500 mb-6 uppercase tracking-wider text-sm">Program Akan Datang</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {coming.map(prog => (
                  <Link key={prog.slug} href={`/program/${prog.slug}`} className="card p-6 opacity-70 hover:opacity-100 transition-opacity block">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${prog.color} flex items-center justify-center text-2xl mb-4`}>{prog.icon}</div>
                    <span className="text-xs px-2 py-0.5 bg-ink-100 text-ink-500 rounded-full font-medium">Akan Datang</span>
                    <h3 className="text-lg font-bold text-ink-700 mt-2">{prog.name}</h3>
                    <p className="text-sm text-ink-500 mt-1">{prog.level}</p>
                    <p className="text-sm text-ink-500 mt-3 leading-relaxed">{prog.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="py-14 bg-ink-50 border-t border-ink-100">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-ink-900 mb-3">Belum Pasti Program Yang Sesuai?</h2>
          <p className="text-ink-500 mb-6">Hubungi kaunselor kami untuk perbincangan percuma. Kami bantu anda pilih bidang yang sesuai dengan minat dan kerjaya.</p>
          <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-gold px-10 py-3.5">Bincang Dengan Kaunselor</a>
        </div>
      </section>
    </>
  )
}
