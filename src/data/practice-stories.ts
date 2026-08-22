export type PracticeStory = {
  slug: string;
  category: string;
  title: string;
  description: string;
  date: string;
  year: "2025" | "2026";
  author: string;
  views: number;
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
    slug: "campus-expo-2026",
    category: "Kegiatan · Pendidikan lanjut",
    title: "Campus Expo membantu siswa membaca pilihan setelah lulus",
    description:
      "Siswa mengenal program studi, jalur masuk, beasiswa, dan berbagai kemungkinan pendidikan setelah SMK.",
    date: "6 Maret 2026",
    year: "2026",
    author: "Administrator",
    views: 243,
    image: {
      src: "/images/school/campus-expo-2026.jpg",
      alt: "Dokumentasi Campus Expo SMK Negeri 2 Surabaya tahun 2026",
    },
    introduction:
      "Campus Expo memberi ruang bagi siswa untuk melihat dunia perguruan tinggi lebih dekat dan mulai menyusun rencana setelah menyelesaikan pendidikan di SMEKDA.",
    sections: [
      {
        title: "Mengenal pilihan pendidikan",
        paragraphs: [
          "Informasi mengenai perguruan tinggi, program studi, jalur masuk, dan beasiswa membantu siswa memahami pilihan yang tersedia serta persiapan yang dibutuhkan.",
        ],
      },
      {
        title: "Bertanya sesuai minat",
        paragraphs: [
          "Siswa mengikuti pemaparan dan diskusi untuk menggali bidang studi yang dekat dengan minat, kemampuan, dan tujuan mereka masing-masing.",
        ],
      },
      {
        title: "Merencanakan langkah berikutnya",
        paragraphs: [
          "Kegiatan ini melengkapi pilihan kerja dan wirausaha dengan gambaran pendidikan lanjutan, sehingga siswa dapat menentukan arah secara lebih sadar.",
        ],
      },
    ],
  },
  {
    slug: "peluang-karier-global-2026",
    category: "Karier · Kebekerjaan",
    title: "Membuka wawasan tentang peluang karier global",
    description:
      "Sosialisasi kebekerjaan mengenalkan peluang, persyaratan, dan kesiapan yang diperlukan untuk bekerja di luar negeri.",
    date: "6 Maret 2026",
    year: "2026",
    author: "Administrator",
    views: 255,
    image: {
      src: "/images/school/karier-global-2026.jpg",
      alt: "Sosialisasi peluang karier global bagi siswa SMK Negeri 2 Surabaya",
    },
    introduction:
      "Siswa memperoleh gambaran mengenai kesempatan kerja internasional sekaligus memahami bahwa kompetensi teknis perlu berjalan bersama bahasa, disiplin, dan kesiapan mental.",
    sections: [
      {
        title: "Peluang di beberapa negara",
        paragraphs: [
          "Pemaparan membahas peluang tenaga terampil di Jepang, Jerman, dan Korea Selatan, termasuk tahapan pendaftaran serta program penempatan resmi.",
        ],
      },
      {
        title: "Persiapan lebih dari keterampilan teknis",
        paragraphs: [
          "Penguasaan bahasa asing, kemampuan berkomunikasi, etos kerja, dan pemahaman budaya menjadi bagian penting dari persiapan karier internasional.",
        ],
      },
      {
        title: "Memperluas rencana setelah lulus",
        paragraphs: [
          "Diskusi membantu siswa melihat jalur karier yang lebih luas dan mulai menilai kemampuan apa saja yang perlu diperkuat sejak masih bersekolah.",
        ],
      },
    ],
  },
  {
    slug: "program-sikap-2026",
    category: "Program sekolah · Lingkungan",
    title: "SMEKDA berpartisipasi dalam Program SIKAP Jawa Timur",
    description:
      "Program Sekolah Inovatif Ketahanan Pangan menghubungkan pembelajaran dengan kemandirian, lingkungan, dan gotong royong.",
    date: "26 Januari 2026",
    year: "2026",
    author: "Administrator",
    views: 285,
    image: {
      src: "/images/documentation/youtube-program-sikap-2026.jpg",
      alt: "Kegiatan Program SIKAP SMK Negeri 2 Surabaya tahun 2026",
    },
    introduction:
      "SMKN 2 Surabaya mengikuti peluncuran Program SIKAP yang diselenggarakan serentak untuk satuan pendidikan di Jawa Timur sebagai bagian dari gerakan ketahanan pangan berbasis sekolah.",
    sections: [
      {
        title: "Gerakan bersama satuan pendidikan",
        paragraphs: [
          "Peluncuran melibatkan SMA, SMK, dan SLB dari berbagai kabupaten dan kota untuk mendorong praktik ketahanan pangan yang berkelanjutan di lingkungan pendidikan.",
        ],
      },
      {
        title: "Pembelajaran yang dekat dengan kehidupan",
        paragraphs: [
          "Program ini membawa isu pangan, kemandirian, dan kepedulian lingkungan ke dalam pengalaman belajar yang dapat diterapkan secara nyata.",
        ],
      },
      {
        title: "Karakter melalui praktik",
        paragraphs: [
          "Keterlibatan warga sekolah diarahkan untuk menumbuhkan tanggung jawab, kerja sama, dan kebiasaan menjaga keberlanjutan dari lingkungan terdekat.",
        ],
      },
    ],
  },
  {
    slug: "kunjungan-industri-pocari-tvri-2025",
    category: "Industri · Ketenagalistrikan",
    title: "Melihat kelistrikan industri dari pabrik hingga ruang siaran",
    description:
      "Siswa Teknik Ketenagalistrikan mengamati proses produksi Pocari Sweat dan sistem penyiaran TVRI.",
    date: "25 Januari 2025",
    year: "2025",
    author: "Tim Humas",
    views: 442,
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
    views: 812,
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
    views: 1262,
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
