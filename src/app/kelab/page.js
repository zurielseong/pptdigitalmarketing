import { CONTACT } from '@/lib/programs'

export const metadata = {
  title: 'Kelab & Persatuan Pelajar — TVET Lipis',
  description: 'Kelab dan persatuan aktif di TVET Lipis — MPP, Badan Dakwah & Kerohanian, Kelab Sukan, Kesenian, Alam Sekitar dan Khidmat Masyarakat. Membentuk pelajar yang seimbang dan berketerampilan.',
  alternates: { canonical: 'https://tvetlipis.my/kelab' },
  openGraph: {
    title: 'Kelab & Persatuan Pelajar — TVET Lipis',
    description: 'Kelab dan persatuan aktif di TVET Lipis membentuk pelajar yang seimbang dan berketerampilan.',
    url: 'https://tvetlipis.my/kelab',
    images: [{ url: 'https://tvetlipis.my/og-image.jpg', width: 1200, height: 630 }],
  },
}

const CLUBS = [
  {
    name: 'Majlis Perwakilan Pelajar (MPP)',
    icon: '🏛️',
    description: 'Badan perwakilan rasmi pelajar yang menyuarakan keperluan dan kepentingan pelajar kepada pihak pengurusan. MPP bertanggungjawab merancang dan melaksanakan program pelajar.',
    activities: ['Mesyuarat bersama pengurusan', 'Program orientasi pelajar baru', 'Majlis anugerah pelajar cemerlang'],
  },
  {
    name: 'Badan Dakwah & Kerohanian',
    icon: '🌙',
    description: 'Badan yang menggalakkan amalan Islam dan pembangunan rohani di kalangan warga TVET Lipis melalui program keagamaan yang berimpak tinggi.',
    activities: ['Solat berjemaah & tazkirah', 'Program Ramadan & Aidilfitri', 'Kem motivasi & jati diri'],
  },
  {
    name: 'Kelab Sukan & Rekreasi',
    icon: '⚽',
    description: 'Menggalakkan gaya hidup aktif dan sihat melalui pelbagai aktiviti sukan dan rekreasi. Pelajar diberi peluang bersaing di peringkat antara institusi.',
    activities: ['Futsal, badminton & bola jaring', 'Hari Sukan TVET Lipis', 'Pertandingan antara institusi'],
  },
  {
    name: 'Kelab Kesenian & Kreativiti',
    icon: '🎨',
    description: 'Platform untuk pelajar menyalurkan bakat dan kreativiti dalam bidang seni visual, persembahan dan kraftangan.',
    activities: ['Pertandingan nasyid & dikir barat', 'Pameran karya seni', 'Bengkel kraftangan & multimedia'],
  },
  {
    name: 'Kelab Alam Sekitar',
    icon: '🌿',
    description: 'Menanamkan kesedaran tentang kepentingan menjaga alam sekitar melalui program hijau yang praktikal dan bermakna.',
    activities: ['Gotong-royong & pembersihan', 'Program kitar semula', 'Penanaman pokok & taman herba'],
  },
  {
    name: 'Kelab Khidmat Masyarakat',
    icon: '🤝',
    description: 'Membina nilai murni dan rasa tanggungjawab sosial melalui aktiviti khidmat masyarakat yang memberi impak kepada komuniti setempat.',
    activities: ['Ziarah rumah anak yatim', 'Program tuisyen komuniti', 'Bantuan bencana alam'],
  },
]

export default function KelabPage() {
  return (
    <main>
      <section className="bg-ink-900 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-3">Kehidupan Kampus</p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Kelab & Persatuan<br className="hidden md:block" /> Pelajar
          </h1>
          <p className="text-ink-300 text-lg max-w-2xl mx-auto">
            Di TVET Lipis, kami percaya pembangunan pelajar melampaui bilik darjah.
            Kelab dan persatuan kami membentuk individu yang seimbang, berkeyakinan dan berdaya saing.
          </p>
        </div>
      </section>
      <section className="py-16 px-4 bg-ink-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLUBS.map((club) => (
              <div key={club.name} className="bg-ink-700 rounded-2xl p-6 border border-ink-600 hover:border-gold-500 transition-colors">
                <div className="text-4xl mb-4">{club.icon}</div>
                <h2 className="text-lg font-bold text-white mb-2">{club.name}</h2>
                <p className="text-ink-300 text-sm leading-relaxed mb-4">{club.description}</p>
                <div>
                  <p className="text-gold-400 text-xs font-semibold uppercase tracking-wide mb-2">Aktiviti Utama</p>
                  <ul className="space-y-1">
                    {club.activities.map((act) => (
                      <li key={act} className="text-ink-300 text-sm flex items-start gap-2">
                        <span className="text-gold-500 mt-0.5">▸</span>
                        {act}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-4 bg-ink-900 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-3">Sertai Komuniti Kami</h2>
          <p className="text-ink-300 mb-8">
            Daftar program dan jadilah sebahagian daripada komuniti pelajar TVET Lipis yang aktif dan bersemangat.
          </p>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex"
          >
            Hubungi Kami via WhatsApp
          </a>
        </div>
      </section>
    </main>
  )
}
