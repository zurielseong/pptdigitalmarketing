import { CONTACT } from '@/lib/programs'

export const metadata = {
  title: 'Fasiliti — Kolej & Asrama TVET Lipis',
  description: 'Fasiliti lengkap di TVET Lipis: bilik simulasi taska, makmal komputer, bilik seminar, bilik kuliah, kafeteria, asrama dengan dobi dan dispenser air.',
  alternates: { canonical: 'https://tvetlipis.my/fasiliti' },
}

const COLLEGE = [
  { icon:'👶', name:'Bilik Simulasi Taska', desc:'Bilik simulasi lengkap untuk latihan penjagaan bayi dan kanak-kanak.' },
  { icon:'🏫', name:'Bilik Simulasi Tadika', desc:'Persekitaran tadika sebenar untuk latihan pengajaran prasekolah.' },
  { icon:'💻', name:'Makmal Komputer', desc:'Makmal komputer lengkap untuk program multimedia dan pentadbiran.' },
  { icon:'🎓', name:'Bilik Seminar', desc:'Bilik seminar untuk pembentangan, taklimat dan program khas.' },
  { icon:'📚', name:'Bilik Kuliah', desc:'Bilik kuliah yang selesa dengan kelengkapan audio visual moden.' },
  { icon:'🍽️', name:'Kafeteria', desc:'Kafeteria dengan pelbagai pilihan makanan halal untuk pelajar dan staf.' },
]

const HOSTEL = [
  { icon:'🛏️', name:'Bilik Tidur', desc:'Bilik tidur yang selesa dengan kemudahan asas lengkap.' },
  { icon:'💧', name:'Dispenser Air', desc:'Dispenser air bersih di setiap tingkat.' },
  { icon:'👗', name:'Dobi', desc:'Kemudahan dobi untuk kegunaan pelajar.' },
  { icon:'🔒', name:'Keselamatan', desc:'Sistem keselamatan 24 jam untuk ketenangan pelajar dan wali.' },
  { icon:'🚽', name:'Tandas', desc:'Kemudahan tandas yang bersih dan diselenggara dengan baik.' },
  { icon:'🛏️', name:'Lif', desc:'Lif untuk kemudahan akses ke semua tingkat.' },
]

export default function FasilitiPage() {
  return (
    <>
      <section className="bg-ink-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gold-badge mb-4">Kemudahan Pelajar</div>
          <h1 className="text-4xl font-extrabold text-white">Fasiliti di TVET Lipis</h1>
          <p className="mt-3 text-ink-300 text-lg max-w-2xl">Kemudahan lengkap direka untuk menyokong pengalaman pembelajaran dan kehidupan kampus yang selesa.</p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-10"><div className="w-12 h-12 rounded-2xl bg-gold-500 flex items-center justify-center text-2xl">🏗️</div><div><h2 className="text-2xl font-bold text-ink-900">Fasiliti Kolej</h2><p className="text-ink-500">Level 4, Lipis Centrepoint, Kuala Lipis</p></div></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COLLEGE.map(f => (<div key={f.name} className="card p-6"><div className="text-4xl mb-4">{f.icon}</div><h3 className="font-semibold text-ink-900 mb-2">{f.name}</h3><p className="text-sm text-ink-500 leading-relaxed">{f.desc}</p></div>))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-ink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-10"><div className="w-12 h-12 rounded-2xl bg-ink-900 flex items-center justify-center text-2xl">🏠</div><div><h2 className="text-2xl font-bold text-ink-900">Fasiliti Asrama</h2><p className="text-ink-500">RM 150 / bulan · Bayaran tahunan</p></div></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOSTEL.map(f => (<div key={f.name} className="card p-6"><div className="text-4xl mb-4">{f.icon}</div><h3 className="font-semibold text-ink-900 mb-2">{f.name}</h3><p className="text-sm text-ink-500 leading-relaxed">{f.desc}</p></div>))}
          </div>
          <div className="mt-10 bg-gold-50 rounded-2xl p-8 border border-gold-200 text-center">
            <div className="text-3xl font-extrabold text-gold-600 mb-1">RM 150 / Bulan</div>
            <div className="text-ink-600 mb-6">Yuran penginapan asrama (dibayar secara tahunan)</div>
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-black px-10">Tanya Tentang Asrama</a>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white border-t border-ink-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-4xl mb-4">📍</div>
          <h2 className="text-2xl font-bold text-ink-900 mb-3">Lokasi Kami</h2>
          <p className="text-ink-600 text-lg mb-6">{CONTACT.address}</p>
          <a href={CONTACT.maps} target="_blank" rel="noopener noreferrer" className="btn-gold px-10">Buka Google Maps</a>
        </div>
      </section>
    </>
  )
}
