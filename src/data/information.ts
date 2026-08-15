export const informationNavigation = [
  { label: "Ringkasan", href: "/informasi" },
  { label: "FAQ", href: "/informasi/faq" },
  { label: "SPMB", href: "/informasi/spmb" },
] as const;

export const informationSources = {
  school: "https://web.smkn2sby.sch.id",
  admission: "https://spmbjatim.net",
  admissionSchedule: "https://spmbjatim.net/informasi/jadwal/index.html",
  admissionTerms: "https://spmbjatim.net/informasi/ketentuan/",
  admissionProcedure: "https://spmbjatim.net/informasi/prosedur/",
} as const;

export const faqCategories = [
  { key: "semua", label: "Semua" },
  { key: "sekolah", label: "Sekolah" },
  { key: "jurusan", label: "Jurusan" },
  { key: "fasilitas", label: "Fasilitas" },
  { key: "spmb", label: "SPMB" },
  { key: "pembayaran", label: "Pembayaran" },
  { key: "kegiatan", label: "Kegiatan siswa" },
] as const;

export type FaqCategory = Exclude<(typeof faqCategories)[number]["key"], "semua">;

export type FaqItem = {
  question: string;
  answer: string;
  category: FaqCategory;
  keywords: readonly string[];
  sourceUrl?: string;
  sourceLabel?: string;
};

export const faqItems: readonly FaqItem[] = [
  {
    question: "Di mana lokasi SMK Negeri 2 Surabaya?",
    answer:
      "SMK Negeri 2 Surabaya berada di Jl. Tentara Genie Pelajar No. 26, Petemon, Kecamatan Sawahan, Kota Surabaya, Jawa Timur.",
    category: "sekolah",
    keywords: ["alamat", "lokasi", "peta", "surabaya"],
    sourceUrl: informationSources.school,
    sourceLabel: "Website sekolah",
  },
  {
    question: "Bagaimana cara menghubungi sekolah?",
    answer:
      "Sekolah dapat dihubungi melalui telepon 031 5343708 atau email smekda.surabaya@gmail.com. Gunakan kanal resmi tersebut untuk pertanyaan yang membutuhkan konfirmasi langsung.",
    category: "sekolah",
    keywords: ["kontak", "telepon", "email", "humas"],
    sourceUrl: informationSources.school,
    sourceLabel: "Website sekolah",
  },
  {
    question: "Program keahlian apa saja yang tersedia?",
    answer:
      "Sekolah mempublikasikan program pada bidang digital dan kreatif, konstruksi, elektronika dan listrik, manufaktur, serta otomotif. Buka katalog Program Keahlian untuk daftar dan profil yang telah diverifikasi.",
    category: "jurusan",
    keywords: ["program", "kompetensi", "keahlian", "jurusan", "konsentrasi"],
    sourceUrl: "https://web.smkn2sby.sch.id/read/3/kompetensi-keahlian",
    sourceLabel: "Sumber program sekolah",
  },
  {
    question: "Bagaimana memilih program keahlian yang sesuai?",
    answer:
      "Mulailah dari minat, jenis aktivitas yang disukai, serta cara belajar yang paling nyaman. Bandingkan fokus belajar dan contoh jalur lanjut pada halaman Program Keahlian, kemudian konfirmasikan ketersediaannya pada SPMB tahun berjalan.",
    category: "jurusan",
    keywords: ["memilih", "minat", "bakat", "karier"],
  },
  {
    question: "Fasilitas praktik apa yang dapat dilihat di website?",
    answer:
      "Galeri awal menampilkan laboratorium listrik, bengkel otomotif, dan teaching factory sepeda motor dari dokumentasi publik sekolah. Galeri akan bertambah setelah aset resmi lainnya tersedia.",
    category: "fasilitas",
    keywords: ["laboratorium", "bengkel", "teaching factory", "praktik"],
    sourceUrl: "https://web.smkn2sby.sch.id",
    sourceLabel: "Dokumentasi sekolah",
  },
  {
    question: "Apakah tersedia tur lingkungan sekolah?",
    answer:
      "Halaman Fasilitas menyediakan orientasi kampus dan galeri dokumentasi. Tur 360 derajat penuh belum tersedia karena membutuhkan aset panorama resmi dari sekolah.",
    category: "fasilitas",
    keywords: ["tur", "virtual", "kampus", "ruangan"],
  },
  {
    question: "Di mana pendaftaran murid baru dilakukan?",
    answer:
      "Pendaftaran sekolah negeri di Jawa Timur dilakukan melalui portal resmi SPMB Jawa Timur. Website sekolah hanya menyediakan ringkasan informasi dan mengarahkan pendaftar ke sistem resmi.",
    category: "spmb",
    keywords: ["daftar", "pendaftaran", "portal", "ppdb"],
    sourceUrl: informationSources.admission,
    sourceLabel: "Portal SPMB Jawa Timur",
  },
  {
    question: "Apakah SPMB Jawa Timur 2026 masih dibuka?",
    answer:
      "Tidak. Berdasarkan jadwal resmi, rangkaian SPMB Jawa Timur 2026 untuk SMK telah selesai pada 4 Juli 2026. Pantau portal resmi untuk pengumuman periode berikutnya.",
    category: "spmb",
    keywords: ["jadwal", "status", "2026", "ditutup"],
    sourceUrl: informationSources.admissionSchedule,
    sourceLabel: "Jadwal resmi SPMB 2026",
  },
  {
    question: "Jalur apa saja yang tersedia pada SPMB 2026?",
    answer:
      "Portal resmi mencantumkan Jalur Domisili, Afirmasi, Mutasi Orang Tua atau Wali, Prestasi Hasil Lomba, dan Nilai Prestasi Akademik. Ketentuan dan kuota berbeda untuk setiap jalur.",
    category: "spmb",
    keywords: ["jalur", "domisili", "afirmasi", "mutasi", "prestasi"],
    sourceUrl: informationSources.admissionTerms,
    sourceLabel: "Ketentuan resmi SPMB 2026",
  },
  {
    question: "Apakah terdapat persyaratan kesehatan untuk calon siswa SMK?",
    answer:
      "Konsentrasi keahlian tertentu dapat memiliki persyaratan khusus seperti tinggi badan atau tidak buta warna. Calon siswa wajib memeriksa ketentuan resmi dan mengikuti verifikasi kesehatan jika dipersyaratkan.",
    category: "spmb",
    keywords: ["kesehatan", "tinggi badan", "buta warna", "tes"],
    sourceUrl: informationSources.admissionTerms,
    sourceLabel: "Ketentuan resmi SPMB 2026",
  },
  {
    question: "Di mana informasi biaya dan pembayaran sekolah dapat diperoleh?",
    answer:
      "Rincian biaya tidak dipublikasikan pada website ini. Hubungi sekolah melalui telepon atau email resmi untuk memperoleh informasi yang benar dan terbaru.",
    category: "pembayaran",
    keywords: ["biaya", "bayar", "pembayaran", "spp"],
  },
  {
    question: "Apakah website ini menerima pembayaran atau meminta transfer?",
    answer:
      "Tidak. Website ini tidak memproses pembayaran dan tidak meminta transfer. Verifikasikan setiap instruksi pembayaran langsung melalui kanal resmi sekolah sebelum melakukan transaksi.",
    category: "pembayaran",
    keywords: ["transfer", "rekening", "penipuan", "transaksi"],
  },
  {
    question: "Di mana saya dapat melihat kegiatan dan prestasi siswa?",
    answer:
      "Buka bagian Siswa untuk melihat karya, prestasi, kunjungan industri, persiapan karier, serta kegiatan sekolah yang telah memiliki sumber publik.",
    category: "kegiatan",
    keywords: ["siswa", "kegiatan", "prestasi", "karya", "ekstrakurikuler"],
  },
] as const;

export const admissionPaths = [
  { code: "01", title: "Domisili", description: "Seleksi berdasarkan domisili dan ketentuan rayon yang berlaku untuk calon murid SMA atau SMK." },
  { code: "02", title: "Afirmasi", description: "Untuk kelompok yang memenuhi ketentuan afirmasi, termasuk keluarga ekonomi tidak mampu dan penyandang disabilitas." },
  { code: "03", title: "Mutasi orang tua/wali", description: "Untuk calon murid yang mengikuti perpindahan tugas orang tua atau wali serta kategori yang diatur dalam juknis." },
  { code: "04", title: "Prestasi hasil lomba", description: "Mempertimbangkan prestasi akademik atau nonakademik yang dapat diverifikasi sesuai ketentuan." },
  { code: "05", title: "Nilai prestasi akademik", description: "Menggunakan komponen nilai akademik yang ditetapkan pada ketentuan SPMB tahun berjalan." },
] as const;

export const admissionTimeline = [
  {
    period: "Maret–Mei 2026",
    title: "Sosialisasi",
    description: "Pengenalan juknis dan persiapan informasi SPMB Jawa Timur 2026.",
  },
  {
    period: "11 Mei–10 Juni 2026",
    title: "Pra-pendaftaran",
    description: "Entry dan verifikasi nilai, pengambilan PIN, validasi dokumen, latihan pendaftaran, serta validasi kesehatan bagi konsentrasi SMK tertentu.",
  },
  {
    period: "11–15 Juni 2026",
    title: "Tahap I · Domisili",
    description: "Pendaftaran, pengumuman, cetak bukti penerimaan, dan daftar ulang jalur domisili SMA/SMK.",
  },
  {
    period: "17–23 Juni 2026",
    title: "Tahap II",
    description: "Jalur afirmasi, mutasi orang tua/wali, serta prestasi hasil lomba untuk SMA/SMK.",
  },
  {
    period: "30 Juni–4 Juli 2026",
    title: "Tahap IV · Akademik SMK",
    description: "Pendaftaran nilai prestasi akademik SMK, pengumuman, daftar ulang, dan pemenuhan kuota.",
  },
] as const;

export const admissionRequirements = [
  "Berusia paling tinggi 21 tahun pada 1 Juli 2026.",
  "Telah menyelesaikan kelas 9 SMP, MTs, atau bentuk lain yang sederajat.",
  "Menyiapkan dokumen kelulusan serta dokumen identitas dan domisili sesuai ketentuan.",
  "Menggunakan data dan dokumen yang otentik serta dapat dibuktikan keasliannya.",
  "Memeriksa persyaratan kesehatan tambahan untuk konsentrasi keahlian SMK tertentu.",
] as const;
