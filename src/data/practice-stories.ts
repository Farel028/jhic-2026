export type PracticeStory = {
  slug: string;
  category: string;
  title: string;
  description: string;
  date: string;
  year: "2025";
  author: string;
  image: {
    src: string;
    alt: string;
  };
  introduction: string;
  sections: readonly {
    title: string;
    paragraphs: readonly string[];
  }[];
};

export const practiceStories: readonly PracticeStory[] = [
  {
    slug: "kunjungan-industri-pocari-tvri-2025",
    category: "Industri · Ketenagalistrikan",
    title: "Melihat kelistrikan industri dari pabrik hingga ruang siaran",
    description:
      "Siswa Teknik Ketenagalistrikan mengamati proses produksi Pocari Sweat dan sistem penyiaran TVRI.",
    date: "25 Januari 2025",
    year: "2025",
    author: "Tim Humas",
    image: {
      src: "/images/school/kunjungan-industri-2025.jpg",
      alt: "Siswa SMK Negeri 2 Surabaya mengikuti kunjungan industri tahun 2025",
    },
    introduction:
      "Kunjungan industri membawa pembelajaran kelistrikan keluar dari ruang kelas. Siswa melihat bagaimana sistem tenaga mendukung dua lingkungan kerja yang berbeda: produksi minuman dan penyiaran televisi.",
    sections: [
      {
        title: "Kelistrikan dalam proses produksi",
        paragraphs: [
          "Di pabrik Pocari Sweat, siswa mempelajari alur produksi, pengelolaan energi, dan teknologi kelistrikan yang menjaga operasi berskala besar tetap berjalan. Diskusi bersama teknisi membantu mereka menghubungkan materi sekolah dengan kebutuhan kerja di lapangan.",
        ],
      },
      {
        title: "Dari ruang kontrol TVRI",
        paragraphs: [
          "Kunjungan berikutnya memperlihatkan peran perangkat kelistrikan pada sistem penyiaran. Siswa mengamati ruang kontrol dan memahami bahwa kestabilan listrik menjadi bagian penting dari kelancaran siaran.",
        ],
      },
      {
        title: "Membawa konteks kembali ke sekolah",
        paragraphs: [
          "Pengalaman di dua lokasi memberi gambaran bahwa kompetensi kelistrikan digunakan lintas industri. Kegiatan ini menjadi penghubung antara teori, praktik, dan pilihan karier setelah lulus.",
        ],
      },
    ],
  },
  {
    slug: "hibah-alat-praktik-titl-2025",
    category: "Praktik · TITL",
    title: "Peralatan baru untuk memperkuat praktik kelistrikan",
    description:
      "Hibah alat dan pelatihan dari CV Dar Al Ilmi menambah pengalaman praktik siswa kelas XI TITL.",
    date: "25 Januari 2025",
    year: "2025",
    author: "Tim Humas",
    image: {
      src: "/images/school/fasilitas-listrik-2025.jpeg",
      alt: "Peralatan praktik kelistrikan bersama guru SMK Negeri 2 Surabaya",
    },
    introduction:
      "Jurusan Teknik Instalasi Tenaga Listrik menerima peralatan praktik dari CV Dar Al Ilmi. Dukungan tersebut dilanjutkan dengan pelatihan agar siswa memahami penggunaan alat dalam konteks pekerjaan kelistrikan.",
    sections: [
      {
        title: "Peralatan untuk pembelajaran",
        paragraphs: [
          "Peralatan yang diserahkan mencakup alat ukur listrik, perangkat instalasi, dan perlengkapan pendukung praktik. Seluruhnya digunakan untuk memperkuat pembelajaran yang membutuhkan pengalaman langsung.",
        ],
      },
      {
        title: "Pelatihan bagi siswa TITL",
        paragraphs: [
          "Setelah serah terima, siswa kelas XI mengikuti pelatihan penggunaan alat. Mereka mempelajari fungsi, cara pengoperasian, serta penerapannya pada pekerjaan yang ditemui di industri kelistrikan.",
        ],
      },
      {
        title: "Kolaborasi dengan mitra",
        paragraphs: [
          "Keterlibatan mitra membantu sekolah menjaga praktik pembelajaran tetap dekat dengan perkembangan alat dan kebutuhan tenaga kerja. Peralatan baru juga memberi ruang latihan yang lebih relevan bagi siswa.",
        ],
      },
    ],
  },
  {
    slug: "tes-praktik-htec-otomotif-2025",
    category: "Praktik · Otomotif",
    title: "Uji keterampilan otomotif dengan standar industri",
    description:
      "Tes praktik HTEC menguji keterampilan perawatan, perbaikan, dan diagnosis kendaraan siswa Otomotif.",
    date: "25 Januari 2025",
    year: "2025",
    author: "Tim Humas",
    image: {
      src: "/images/school/bengkel-otomotif-2025.jpeg",
      alt: "Siswa melaksanakan tes praktik di bengkel otomotif SMK Negeri 2 Surabaya",
    },
    introduction:
      "Siswa jurusan Otomotif mengikuti Tes Praktik HTEC di bengkel sekolah. Evaluasi ini mengukur kemampuan teknis sekaligus cara siswa bekerja secara teliti dan efisien.",
    sections: [
      {
        title: "Keterampilan yang diuji",
        paragraphs: [
          "Peserta menghadapi pekerjaan pada sistem kelistrikan, mesin, perawatan kendaraan, dan diagnosis gangguan. Peralatan bengkel digunakan untuk menyelesaikan tugas seperti yang mereka temui dalam lingkungan kerja.",
        ],
      },
      {
        title: "Pendampingan selama proses",
        paragraphs: [
          "Guru jurusan dan pengawas HTEC mendampingi pelaksanaan tes. Selain mengukur hasil akhir, kegiatan ini menilai pemahaman prosedur dan kemampuan memecahkan masalah.",
        ],
      },
      {
        title: "Menyiapkan langkah setelah lulus",
        paragraphs: [
          "Pengalaman evaluasi berbasis praktik membantu siswa mengenali standar kerja industri otomotif. Hasilnya menjadi bekal untuk memperbaiki kompetensi sebelum memasuki dunia kerja.",
        ],
      },
    ],
  },
] as const;

export function getPracticeStoryBySlug(slug: string) {
  return practiceStories.find((story) => story.slug === slug);
}
