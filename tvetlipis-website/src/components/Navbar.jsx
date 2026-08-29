'use client'
import { useState } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { href: '/program', label: 'Program' },
  { href: '/ppt', label: 'PPT' },
  { href: '/fasiliti', label: 'Fasiliti' },
  { href: '/hubungi', label: 'Hubungi' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 bg-ink-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gold-500 flex items-center justify-center font-black text-black text-sm">TL</div>
            <div className="leading-tight">
              <div className="text-white font-bold text-sm tracking-wide">TVET LIPIS</div>
              <div className="text-gold-400 text-xs font-medium">Akademi Pembangunan Kemahiran USIM</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href} className="px-4 py-2 text-sm font-medium text-ink-200 hover:text-gold-400 hover:bg-ink-700 rounded-lg transition-colors">{link.label}</Link>
            ))}
            <a href="https://api.whatsapp.com/send?phone=60164466630&text=Saya%20nak%20tahu%20lebih%20tentang%20program%20di%20TVET%20Lipis!" target="_blank" rel="noopener noreferrer" className="ml-3 btn-gold text-sm py-2 px-5">Daftar Sekarang</a>
          </nav>
          <button className="md:hidden text-white p-2 rounded-lg hover:bg-ink-700" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
        {open && (
          <div className="md:hidden pb-4 border-t border-ink-700 mt-1">
            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block px-4 py-3 text-ink-200 hover:text-gold-400 font-medium">{link.label}</Link>
            ))}
            <div className="px-4 pt-2">
              <a href="https://api.whatsapp.com/send?phone=60164466630&text=Saya%20nak%20tahu%20lebih%20tentang%20program%20di%20TVET%20Lipis!" target="_blank" rel="noopener noreferrer" className="btn-gold w-full justify-center text-sm">Daftar Sekarang</a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
