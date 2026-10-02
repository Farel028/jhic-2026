export type GraduateCategory = "industri" | "ptn" | "wirausaha";

export type TopGraduate = {
  id: string;
  name: string;
  graduationYear: number;
  majorCode: string;
  majorName: string;
  currentRole: string;
  organization: string;
  category: GraduateCategory;
  achievement: string;
  summary: string;
  quote: string;
};

export const graduateCategories: readonly { id: GraduateCategory | "all"; label: string }[] = [
  { id: "all", label: "Semua Kategori" },
  { id: "industri", label: "BUMN & Manufaktur Industri" },
  { id: "ptn", label: "Pendidikan Tinggi (PTN)" },
  { id: "wirausaha", label: "Teknologi & Wirausaha" },
] as const;

export const graduateStats = [
  {
    metric: "88.4%",
    label: "Tingkat Keterserapan Lulusan",
    detail: "Bekerja di industri mitra, melanjutkan ke PTN, dan merintis usaha mandiri.",
  },
  {
    metric: "120+",
    label: "Mitra Industri Resmi",
    detail: "Kerja sama BUMN, korporat multinasional, dan asosiasi profesi.",
  },
  {
    metric: "35+",
    label: "Tahun Bursa Kerja Khusus",
    detail: "Penyaluran dan rekrutmen terpusat terakreditasi Disnaker.",
  },
] as const;

export const topGraduates: readonly TopGraduate[] = [
  {
    id: "dimas-tri-prasetyo",
    name: "Dimas Tri Prasetyo",
    graduationYear: 2022,
    majorCode: "TPM",
    majorName: "Teknik Permesinan",
    currentRole: "Lead CNC Machining Specialist",
    organization: "PT Industri Kereta Api (Persero) - Madiun",
    category: "industri",
    achievement: "Peraih Medali Emas LKS Nasional Bidang CNC Milling",
    summary:
      "Mengawasi proses manufaktur komponen presisi kereta rel listrik dan ekspor bogie kereta api untuk proyek transportasi massal nasional.",
    quote:
      "Disiplin bengkel SMEKDA Surabaya sejak kelas X menanamkan standar presisi mikro yang ternyata menjadi modal utama di lantai pabrik manufaktur kereta api.",
  },
  {
    id: "nadia-safira",
    name: "Nadia Safira",
    graduationYear: 2023,
    majorCode: "RPL",
    majorName: "Rekayasa Perangkat Lunak",
    currentRole: "Frontend Software Engineer",
    organization: "PT Telkom Indonesia (Persero) Tbk",
    category: "industri",
    achievement: "Finalis Nasional Kompetisi AI & Coding Kementerian BUMN",
    summary:
      "Mengembangkan antarmuka sistem enterprise monitoring jaringan telekomunikasi skala nasional berbasis TypeScript dan arsitektur micro-frontend.",
    quote:
      "Kurikulum industri berbasis proyek nyata di lab RPL membuat adaptasi dengan tim engineer profesional berjalan mulus tanpa rasa canggung.",
  },
  {
    id: "bagas-arya-ramadhan",
    name: "Bagas Arya Ramadhan",
    graduationYear: 2021,
    majorCode: "DPIB",
    majorName: "Desain Pemodelan dan Informasi Bangunan",
    currentRole: "BIM Modeler & Visualizer",
    organization: "PT Wijaya Karya (Persero) Tbk",
    category: "industri",
    achievement: "Sertifikasi Internasional Autodesk Certified Professional",
    summary:
      "Bertanggung jawab dalam pemodelan Building Information Modeling (BIM) struktur bentang lebar pada proyek pembangunan infrastruktur bandar udara.",
    quote:
      "Kombinasi gambar teknik konvensional dan software BIM canggih yang diajarkan guru-guru DPIB sangat diakui oleh para konsultan perencana.",
  },
  {
    id: "firman-syahputra",
    name: "Firman Syahputra",
    graduationYear: 2023,
    majorCode: "TITL",
    majorName: "Teknik Instalasi Tenaga Listrik",
    currentRole: "Mahasiswa Teknik Elektro",
    organization: "Institut Teknologi Sepuluh Nopember (ITS)",
    category: "ptn",
    achievement: "Diterima Jalur Prestasi SNBP & Juara IARC PLC Nasional",
    summary:
      "Melanjutkan studi sarjana dengan beasiswa prestasi dan aktif mengembangkan riset otomasi renewable energy berbasis PLC dan inverter terdistribusi.",
    quote:
      "Pengalaman praktikum di lab instalasi tenaga dan sistem kendali PLC SMEKDA memberi fondasi matematika teknik dan logika rangkaian yang sangat kuat.",
  },
  {
    id: "alvina-rahmawati",
    name: "Alvina Rahmawati",
    graduationYear: 2022,
    majorCode: "ANI",
    majorName: "Animasi",
    currentRole: "3D Character Animator & Rigger",
    organization: "Lumine Studio - Jakarta",
    category: "wirausaha",
    achievement: "Kontributor Serial Animasi Bioskop Indonesia 2024",
    summary:
      "Mengerjakan rigging karakter dan animasi 3D gerak realistis untuk film layar lebar serta seri animasi televisi bertaraf internasional.",
    quote:
      "Di studio animasi SMEKDA, kami dilatih bekerja dalam pipeline produksi sesungguhnya. Kami belajar bahwa disiplin deadline sama pentingnya dengan kepekaan estetika.",
  },
  {
    id: "rizky-kurniawan",
    name: "Rizky Kurniawan",
    graduationYear: 2021,
    majorCode: "TKR",
    majorName: "Teknik Kendaraan Ringan",
    currentRole: "Senior Diagnostic Technician",
    organization: "PT Toyota Astra Motor",
    category: "industri",
    achievement: "Top 3 National Technical Skill Contest Toyota Indonesia",
    summary:
      "Mendiagnosis sistem kelistrikan injeksi elektronik, hybrid powertrain, dan kalibrasi sensor keselamatan Advanced Driver Assistance System (ADAS).",
    quote:
      "Kelas industri Toyota di SMEKDA menghadirkan standarisasi dealer resmi langsung ke sekolah, sehingga hari pertama kerja sudah terasa seperti hari biasa di bengkel sekolah.",
  },
  {
    id: "fajar-dwi-wicaksono",
    name: "Fajar Dwi Wicaksono",
    graduationYear: 2024,
    majorCode: "TKJ",
    majorName: "Teknik Komputer dan Jaringan",
    currentRole: "Mahasiswa Teknologi Rekayasa Jaringan",
    organization: "Politeknik Elektronika Negeri Surabaya (PENS)",
    category: "ptn",
    achievement: "Pemegang Sertifikasi MTCNA & Medali LKS Cyber Security",
    summary:
      "Mendalami keamanan siber dan cloud computing di kampus vokasi terbaik Indonesia setelah meraih predikat lulusan terbaik jurusan TKJ.",
    quote:
      "Fasilitas server rack dan perangkat routerboard di SMEKDA memberi jam terbang riil yang jarang dimiliki lulusan setingkat sekolah menengah.",
  },
  {
    id: "hendra-wijaya",
    name: "Hendra Wijaya",
    graduationYear: 2020,
    majorCode: "TEI",
    majorName: "Teknik Elektronika Industri",
    currentRole: "Founder & Hardware Engineer",
    organization: "Surabaya Agrotech Solusindo",
    category: "wirausaha",
    achievement: "Penerima Hibah Inovasi Startup Kemenperin RI",
    summary:
      "Mendirikan startup teknologi peranti cerdas Internet of Things (IoT) untuk pemantauan nutrisi dan kelembapan otomatis pada perkebunan hidroponik komersial.",
    quote:
      "Jiwa wirausaha teknologi ditumbuhkan lewat program unit produksi SMEKDA. Kami diajarkan bukan cuma merakit rangkaian, tapi menyelesaikan masalah nyata masyarakat.",
  },
] as const;
