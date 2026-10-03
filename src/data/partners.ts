export type FeaturedPartner = {
  name: string;
  fullName: string;
  sector: string;
  scope: readonly string[];
  description: string;
  logo: {
    src: string;
    width: number;
    height: number;
  };
};

export const featuredPartners: readonly FeaturedPartner[] = [
  {
    name: "Samsung",
    fullName: "PT Samsung Electronics Indonesia",
    sector: "Elektronika, Perangkat Cerdas & Teknologi Informasi",
    scope: ["Praktik Kerja Lapangan (PKL)", "Pelatihan Teknisi Perangkat Cerdas", "Sertifikasi Kompetensi Industri"],
    description: "Kemitraan strategis dalam pengembangan kompetensi teknologi elektronika, servis perangkat, dan program magang siswa vokasi.",
    logo: { src: "/images/partners/samsung.webp", width: 400, height: 64 },
  },
  {
    name: "Toyota",
    fullName: "PT Toyota Motor Manufacturing Indonesia & Nasmoco",
    sector: "Otomotif & Manufaktur Kendaraan",
    scope: ["Praktik Kerja Lapangan (PKL)", "Sinkronisasi Kurikulum Teknik Otomotif", "Rekrutmen Tenaga Kerja"],
    description: "Kerja sama industri bidang otomotif untuk standarisasi bengkel praktik, magang siswa, dan penyerapan lulusan teknik kendaraan ringan.",
    logo: { src: "/images/partners/toyota.svg", width: 300, height: 252 },
  },
  {
    name: "Honda",
    fullName: "PT Astra Honda Motor (AHM)",
    sector: "Otomotif Sepeda Motor & Layanan Servis",
    scope: ["Kelas Industri Honda", "Magang Teknisi Sepeda Motor", "Uji Kompetensi Keahlian (UKK)"],
    description: "Penyelarasan kurikulum teknik sepeda motor dengan standar operasional bengkel resmi AHASS dan program beasiswa vokasi.",
    logo: { src: "/images/partners/honda.png", width: 300, height: 272 },
  },
  {
    name: "Yamaha",
    fullName: "PT Yamaha Indonesia Motor Manufacturing",
    sector: "Otomotif & Roda Dua",
    scope: ["Praktek Kerja Industri", "Donasi Mesin Praktik Uji", "Pemberdayaan Teknisi Muda"],
    description: "Dukungan sarana pembelajaran mesin injeksi roda dua dan kesempatan penempatan magang bagi siswa teknik otomotif.",
    logo: { src: "/images/partners/yamaha.svg", width: 300, height: 300 },
  },
  {
    name: "Sharp",
    fullName: "PT Sharp Electronics Indonesia",
    sector: "Elektronika Konsumen & Rumah Tangga",
    scope: ["Magang Siswa PKL", "Guru Tamu Industri", "Standarisasi Servis Audio-Video"],
    description: "Kolaborasi pembelajaran teknik audio-video dan pendingin rumah tangga sesuai standar industri Jepang terkemuka.",
    logo: { src: "/images/partners/sharp.webp", width: 500, height: 71 },
  },
  {
    name: "Toshiba",
    fullName: "Toshiba Consumer Products Indonesia",
    sector: "Teknologi Elektronika & Manufaktur",
    scope: ["Magang Industri", "Kunjungan Industri", "Pengenalan Budaya Kerja 5S"],
    description: "Kerja sama pembekalan budaya kerja industri manufaktur modern dan pelatihan teknik perakitan instrumen elektronika.",
    logo: { src: "/images/partners/toshiba.png", width: 300, height: 174 },
  },
  {
    name: "Kereta Api Indonesia",
    fullName: "PT Kereta Api Indonesia (Persero) - Daop 8 Surabaya",
    sector: "Transportasi Perkeretaapian & Logistik Nasional",
    scope: ["PKL & Magang Balai Yasa / Dipo", "Teknik Mekanikal & Kelistrikan", "Peluang Karier Alumni"],
    description: "Kemitraan pelatihan praktik pemeliharaan sarana dan prasarana perkeretaapian, kelistrikan rel, serta sistem sinyal stasiun.",
    logo: { src: "/images/partners/kai.webp", width: 600, height: 253 },
  },
  {
    name: "PT INKA (Persero)",
    fullName: "PT Industri Kereta Api (Persero)",
    sector: "Manufaktur Sarana Perkeretaapian Terpadu",
    scope: ["Praktik Kerja Industri Khusus", "Fabrikasi & Konstruksi Logam", "Pengembangan Rekayasa Vokasi"],
    description: "Kemitraan strategis dengan BUMN industri manufaktur kereta api Indonesia untuk pengembangan skill pengelasan, fabrikasi presisi, dan perakitan.",
    logo: {
      src: "/images/partners/inka-transparent.webp",
      width: 600,
      height: 188,
    },
  },
] as const;
