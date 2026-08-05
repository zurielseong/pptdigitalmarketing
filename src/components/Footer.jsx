import Link from 'next/link'
import { CONTACT } from '@/lib/programs'

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-ink-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center font-black text-black">TL</div>
              <div>
                <div className="text-white font-bold">TVET Lipis</div>
                <div className="text-gold-400 text-xs">Akademi Pembangunan Kemahiran USIM</div>
              </div>
            </div>
            <p className="text-sm text-ink-400 leading-relaxed max-w-sm">Pusat Pendidikan (Edu Hub) di Kuala Lipis yang menawarkan Program TVET Diploma Kemahiran Malaysia. Diiktiraf JPK K16005.</p>
            <div className="mt-4 flex gap-3">
              <a href={CONTACT.tiktok} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-ink-700 hover:bg-gold-500 hover:text-black text-ink-300 flex items-center justify-center transition-colors text-sm font-bold">TK</a>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-ink-700 hover:bg-gold-500 hover:text-black text-ink-300 flex items-center justify-center transition-colors text-sm font-bold">WA</a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Navigasi</h3>
            <ul className="space-y-2 text-sm">
              {[{href:'/program',label:'Program Kami'},{href:'/ppt',label:'Program PPT'},{href:'/fasiliti',label:'Fasiliti'},{href:'/kelab',label:'Kelab Pelajar'},{href:'/hubungi',label:'Hubungi Kami'}].map(l => (
                <li key={l.href}><Link href={l.href} className="text-ink-400 hover:text-gold-400 transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Hubungi Kami</h3>
            <ul className="space-y-3 text-sm text-ink-400">
              <li className="flex gap-2"><span className="text-gold-500 mt-0.5">📍</span><a href={CONTACT.maps} target="_blank" rel="noopener noreferrer" className="hover:text-gold-400">{CONTACT.address}</a></li>
              <li className="flex gap-2"><span className="text-gold-500">📞</span><div><div>{CONTACT.phone1}</div><a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-gold-400">{CONTACT.phone2} (WhatsApp)</a></div></li>
              <li className="flex gap-2"><span className="text-gold-500">✉️</span><a href={`mailto:${CONTACT.email}`} className="hover:text-gold-400">{CONTACT.email}</a></li>
              <li className="flex gap-2"><span className="text-gold-500">🕐</span><span>{CONTACT.hours}</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-ink-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-500">
          <span>© 2026 TVET Lipis. Hak Cipta Terpelihara.</span>
          <span>Akademi Pembangunan Kemahiran USIM · JPK K16005</span>
        </div>
      </div>
    </footer>
  )
}
