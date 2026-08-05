import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFAB from '@/components/WhatsAppFAB'
import JsonLd from '@/components/JsonLd'

export const metadata = {
  metadataBase: new URL('https://tvetlipis.my'),
  title: { default: 'TVET Lipis — Akademi Pembangunan Kemahiran USIM Kuala Lipis', template: '%s | TVET Lipis' },
  description: 'Daftar program Diploma Kemahiran Malaysia (DKM) di TVET Lipis, Kuala Lipis Pahang. Program Pendidikan Awal Kanak-Kanak, Multimedia, Elektrik, Pra-Sekolah. Dibiayai PTPK. JPK K16005.',
  keywords: ['TVET Lipis', 'Akademi Pembangunan Kemahiran USIM', 'kolej kemahiran Kuala Lipis', 'diploma kemahiran Malaysia', 'DKM Pahang', 'SKM Kuala Lipis', 'PTPK', 'JPK K16005', 'PPT pengiktirafan pencapaian terdahulu'],
  openGraph: { type: 'website', locale: 'ms_MY', url: 'https://tvetlipis.my', siteName: 'TVET Lipis', title: 'TVET Lipis — Diploma Kemahiran Malaysia di Kuala Lipis', description: 'Program DKM/SKM di Kuala Lipis Pahang. Dibiayai PTPK. Daftar sekarang!' },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://tvetlipis.my' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ms">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <JsonLd />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFAB />
      </body>
    </html>
  )
}
