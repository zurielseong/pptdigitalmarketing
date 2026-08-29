export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        '@id': 'https://tvetlipis.my/#organization',
        name: 'Akademi Pembangunan Kemahiran USIM Kuala Lipis (TVET Lipis)',
        alternateName: ['TVET Lipis', 'Kolej Islam Antarabangsa Kuala Lipis'],
        url: 'https://tvetlipis.my',
        telephone: ['+60108086630', '+60164466630'],
        email: 'admission.tvetlipis@gmail.com',
        address: { '@type': 'PostalAddress', streetAddress: 'Level 4, Lipis Centrepoint, Jalan Pekeliling', addressLocality: 'Kuala Lipis', addressRegion: 'Pahang', postalCode: '27200', addressCountry: 'MY' },
        sameAs: ['https://www.tiktok.com/@tvet_lipis'],
        description: 'Akademi Pembangunan Kemahiran USIM Kuala Lipis menawarkan program DKM/SKM dalam pelbagai bidang. Diiktiraf JPK K16005. Pembiayaan PTPK tersedia.',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Berapa yuran pengajian di TVET Lipis?', acceptedAnswer: { '@type': 'Answer', text: 'Yuran pendaftaran RM500. Yuran pengajian dibiayai sepenuhnya oleh PTPK. Yuran admin RM500 untuk 2 tahun. Penginapan asrama RM150 sebulan.' } },
          { '@type': 'Question', name: 'Apakah syarat kemasukan program diploma TVET Lipis?', acceptedAnswer: { '@type': 'Answer', text: 'Berumur 16 hingga 35 tahun, boleh membaca, mengira dan menulis, lepasan PT3/SPM/STPM/Tahfiz dan Pondok.' } },
          { '@type': 'Question', name: 'Apakah itu PPT di TVET Lipis?', acceptedAnswer: { '@type': 'Answer', text: 'PPT membolehkan individu berpengalaman mendapat DKM tanpa belajar dari awal. Tempoh 6 bulan, yuran RM4,000.' } },
        ],
      },
    ],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
