import { CONTACT } from '@/lib/programs'

export const metadata = {
  title: 'Hubungi Kami — TVET Lipis',
  description: 'Hubungi TVET Lipis. Alamat: Level 4, Lipis Centrepoint, Kuala Lipis. WhatsApp: 016-446 6630.',
  alternates: { canonical: 'https://tvetlipis.my/hubungi' },
}

export default function HubungiPage() {
  return (
    <>
      <section className="bg-ink-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gold-badge mb-4">Hubungi Kami</div>
          <h1 className="text-4xl font-extrabold text-white">Kami Sedia Membantu</h1>
          <p className="mt-3 text-ink-300 text-lg max-w-xl">Ada soalan tentang program, pendaftaran, atau PPT? Jangan teragak-agak untuk menghubungi kami.</p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="card p-6"><div className="text-4xl mb-4">📍</div><h2 className="font-bold text-ink-900 text-lg mb-3">Alamat</h2><p className="text-ink-600">Level 4, Lipis Centrepoint</p><p className="text-ink-600">Jalan Pekeliling, 27200 Kuala Lipis</p><p className="text-ink-600">Pahang, Malaysia</p><a href={CONTACT.maps} target="_blank" rel="noopener noreferrer" className="mt-4 btn-gold text-sm px-5 py-2 inline-flex">Buka Google Maps</a></div>
            <div className="card p-6"><div className="text-4xl mb-4">📞</div><h2 className="font-bold text-ink-900 text-lg mb-3">Telefon / WhatsApp</h2><p className="text-ink-600">{CONTACT.phone1}</p><p className="text-ink-600">{CONTACT.phone2} (WhatsApp)</p><a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-4 btn-gold text-sm px-5 py-2 inline-flex">Hubungi via WhatsApp</a></div>
            <div className="card p-6"><div className="text-4xl mb-4">✉️</div><h2 className="font-bold text-ink-900 text-lg mb-3">E-mel</h2><p className="text-ink-600">{CONTACT.email}</p><a href={`mailto:${CONTACT.email}`} className="mt-4 btn-gold text-sm px-5 py-2 inline-flex">Hantar E-mel</a></div>
            <div className="card p-6"><div className="text-4xl mb-4">🕐</div><h2 className="font-bold text-ink-900 text-lg mb-3">Waktu Pejabat</h2><p className="text-ink-600">Isnin hingga Sabtu</p><p className="text-ink-600">9:00 pagi — 6:00 petang</p><p className="text-ink-600">Ahad: Tutup</p></div>
          </div>
          <div className="mt-10 bg-ink-900 rounded-3xl p-8 text-center">
            <div className="text-5xl mb-4">💬</div>
            <h2 className="text-2xl font-bold text-white mb-3">Cara Paling Cepat: WhatsApp</h2>
            <p className="text-ink-300 max-w-md mx-auto mb-6">Team kami membalas dalam masa 1 jam semasa waktu pejabat.</p>
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-gold px-10 py-4 text-base">WhatsApp Sekarang — 016 446 6630</a>
          </div>
        </div>
      </section>
      <section className="py-12 bg-ink-50 border-t border-ink-100">
        <div className="max-w-xl mx-auto px-4 text-center">
          <p className="text-ink-500 mb-4">Ikuti kami di TikTok untuk konten terkini</p>
          <a href={CONTACT.tiktok} target="_blank" rel="noopener noreferrer" className="btn-black px-8">@tvet_lipis di TikTok</a>
        </div>
      </section>
    </>
  )
}
