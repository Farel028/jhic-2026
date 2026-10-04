export const PLAN = { width: 1920, height: 1080, source: '/images/school/pelatihan-new.png' } as const;

export const categories = {
  bengkel: { name: 'Bengkel & Studio Kejuruan', color: '#ff66c4' },
  lab: { name: 'Laboratorium Sains', color: '#0284c7' },
  kelas: { name: 'Ruang Teori / Kelas', color: '#facc15' },
  administrasi: { name: 'Kantor, Pimpinan & Guru', color: '#004aad' },
  fasilitas: { name: 'Fasilitas, Ibadah & Kantin', color: '#8b5cf6' },
  lapangan: { name: 'Lapangan Olahraga', color: '#eb991c' },
  taman: { name: 'Taman & Gazebo', color: '#22c55e' },
  parkir: { name: 'Area Parkir Kendaraan', color: '#5d579b' },
  toilet: { name: 'Sanitasi & Toilet', color: '#ec4899' },
  ekstra: { name: 'Ekstrakurikuler & Organisasi', color: '#3b82f6' },
} as const;

export type Category = keyof typeof categories;
export type MapRoom = { id: string; name: string; category: Category; x: number; z: number; w: number; d: number; h: number; location: string; note?: string };

const room = (id: string, name: string, category: Category, x: number, z: number, w: number, d: number, location: string, note?: string): MapRoom => ({
  id,
  name,
  category,
  x,
  z,
  w,
  d,
  h: id === 'aula-luar' ? 6 : id === 'panggung-aula-luar' ? 12 : id === 'aula-dalam' ? 42 : id === 'masjid' ? 38 : id.startsWith('gazebo') ? 14 : category === 'taman' ? 3 : category === 'lapangan' ? 2 : category === 'parkir' ? 3 : category === 'bengkel' ? 34 : category === 'lab' ? 30 : category === 'administrasi' ? 28 : 26,
  location,
  note,
});

// Denah tata letak Pelatihan.new (1920 x 1080) dengan zonasi warna lengkap.
export const rooms: MapRoom[] = [
  room('kantin-b-kios-9', 'Kantin Barat - Kios 9', 'fasilitas', 21, 56, 45, 29, 'Tepi Barat', 'Kios kuliner dan jajanan sehat siswa nomor 9'),
  room('kantin-b-kios-6', 'Kantin Barat - Kios 6', 'fasilitas', 21, 86, 45, 90, 'Tepi Barat', 'Kios kuliner dan jajanan sehat siswa nomor 6'),
  room('kantin-b-kios-3a', 'Kantin Barat - Kios 3A', 'fasilitas', 21, 177, 45, 29, 'Tepi Barat', 'Kios kuliner dan jajanan sehat siswa nomor 3A'),
  room('kantin-b-kios-3b', 'Kantin Barat - Kios 3B', 'fasilitas', 21, 207, 45, 29, 'Tepi Barat', 'Kios kuliner dan jajanan sehat siswa nomor 3B'),
  room('kantin-b-utama', 'Kantin Barat Utama', 'fasilitas', 21, 237, 45, 239, 'Tepi Barat', 'Area pujasera dan kantin utama sayap barat'),
  room('ambalan-pramuka', 'Ruang Ambalan (Pramuka)', 'ekstra', 21, 480, 45, 45, 'Tepi Barat', 'Sekretariat Gugus Depan Gerakan Pramuka Ambalan'),
  room('kompas-1', 'Ruang Kompas 1 (Pencinta Alam)', 'ekstra', 21, 526, 45, 43, 'Tepi Barat', 'Sekretariat Komunitas Pencinta Alam SMEKDA'),
  room('kompas-2', 'Ruang Kompas 2 (Logistik)', 'ekstra', 21, 570, 45, 43, 'Tepi Barat', 'Gudang peralatan outdoor dan perlengkapan ekspedisi'),
  room('parkir-barat-luar', 'Area Parkir Barat (Luar)', 'parkir', 21, 615, 45, 317, 'Barat Daya', 'Lahan parkir kendaraan roda dua siswa dan staf'),
  room('parkir-barat-dalam', 'Area Parkir Barat (Dalam)', 'parkir', 104, 615, 46, 299, 'Barat Daya', 'Lahan parkir kendaraan roda dua sisi dalam'),
  room('lab-animasi', 'LAB. ANIMASI (2D/3D Studio)', 'bengkel', 158, 844, 53, 96, 'Sudut Barat Daya', 'Studio animasi digital, workstation grafis, & pen display'),
  room('r06', 'R. 06', 'kelas', 158, 761, 53, 82, 'Sayap Barat Daya', 'Ruang kelas teori dan kejuruan tingkat'),
  room('r05', 'R. 05', 'kelas', 212, 858, 63, 63, 'Selatan Barat Daya', 'Ruang kelas teori pembelajaran'),
  room('r04', 'R. 04', 'kelas', 276, 858, 63, 63, 'Selatan Barat Daya', 'Ruang kelas teori pembelajaran'),
  room('r03', 'R. 03', 'kelas', 340, 858, 63, 63, 'Selatan Barat Daya', 'Ruang kelas teori pembelajaran'),
  room('r02', 'R. 02', 'kelas', 405, 858, 63, 63, 'Selatan Barat Daya', 'Ruang kelas teori pembelajaran'),
  room('r01', 'R. 01', 'kelas', 470, 858, 63, 63, 'Selatan Barat Daya', 'Ruang kelas teori pembelajaran'),
  room('rbk-selatan', 'R. BK (Bimbingan Konseling)', 'administrasi', 534, 858, 63, 63, 'Selatan Barat Daya', 'Ruang konsultasi karir dan bimbingan konseling siswa'),
  room('jurnalis', 'Ruang Jurnalis', 'ekstra', 158, 698, 53, 62, 'Barat', 'Sekretariat redaksi majalah dan jurnalistik sekolah'),
  room('r07a', 'R. 07A', 'kelas', 158, 635, 53, 62, 'Barat', 'Ruang kelas teori R.07A'),
  room('r07b', 'R. 07B', 'kelas', 158, 572, 53, 62, 'Barat', 'Ruang kelas teori R.07B'),
  room('gudang-barat', 'Gudang Sarpras Barat', 'fasilitas', 158, 510, 53, 61, 'Barat', 'Gudang inventaris sarana dan prasarana sekolah'),
  room('sampah-barat', 'Tempat Pemilahan Sampah (TPS)', 'fasilitas', 158, 448, 53, 61, 'Barat', 'Pusat pengelolaan dan daur ulang sampah terpadu'),
  room('r08-w-1', 'R. 08 (Barat 1)', 'kelas', 158, 115, 53, 65, 'Barat Laut', 'Ruang kelas teori'),
  room('r08-w-2', 'R. 08 (Barat 2)', 'kelas', 158, 181, 53, 65, 'Barat Laut', 'Ruang kelas teori'),
  room('r08-w-3', 'R. 08 (Barat 3)', 'kelas', 158, 247, 53, 65, 'Barat Laut', 'Ruang kelas teori'),
  room('r08-w-4', 'R. 08 (Barat 4)', 'kelas', 158, 313, 53, 65, 'Barat Laut', 'Ruang kelas teori'),
  room('r08-w-5', 'R. 08 (Barat 5)', 'kelas', 158, 380, 53, 67, 'Barat Laut', 'Ruang kelas teori'),
  room('lapangan-1', 'Lapangan Olahraga Utara', 'lapangan', 316, 70, 482, 64, 'Utara Barat', 'Lapangan basket, futsal, dan upacara utara'),
  room('r08-n-1', 'R. 08 (Utara 1)', 'kelas', 316, 136, 120, 62, 'Utara Barat', 'Ruang kelas teori sayap utara'),
  room('r08-n-2', 'R. 08 (Utara 2)', 'kelas', 437, 136, 120, 62, 'Utara Barat', 'Ruang kelas teori sayap utara'),
  room('r08-n-3', 'R. 08 (Utara 3)', 'kelas', 558, 136, 120, 62, 'Utara Barat', 'Ruang kelas teori sayap utara'),
  room('r08-n-4', 'R. 08 (Utara 4)', 'kelas', 679, 136, 119, 62, 'Utara Barat', 'Ruang kelas teori sayap utara'),
  room('toilet-utara', 'Kamar Mandi / Sanitasi Utara', 'toilet', 799, 136, 70, 62, 'Utara Tengah', 'Fasilitas toilet dan sanitasi sayap utara'),
  room('r08-n-5', 'R. 08 (Utara 5)', 'kelas', 893, 136, 51, 62, 'Utara Tengah', 'Ruang kelas teori'),
  room('r08-n-6', 'R. 08 (Utara 6)', 'kelas', 946, 136, 85, 61, 'Utara Tengah', 'Ruang kelas teori'),
  room('r08-n-7', 'R. 08 (Utara 7)', 'kelas', 1032, 136, 85, 62, 'Utara Tengah', 'Ruang kelas teori'),
  room('r08-n-8', 'R. 08 (Utara 8)', 'kelas', 1118, 136, 85, 62, 'Utara Tengah', 'Ruang kelas teori'),
  room('r08-n-9', 'R. 08 (Utara 9)', 'kelas', 1204, 136, 85, 62, 'Utara Tengah', 'Ruang kelas teori'),
  room('r08-n-10', 'R. 08 (Utara 10)', 'kelas', 1290, 136, 85, 62, 'Utara Tengah', 'Ruang kelas teori'),
  room('r08-top-1', 'R. 08 (Atas Tengah 1)', 'kelas', 833, 40, 198, 61, 'Utara Tengah', 'Ruang kelas teori'),
  room('r08-top-2', 'R. 08 (Atas Tengah 2)', 'kelas', 1032, 40, 85, 62, 'Utara Tengah', 'Ruang kelas teori'),
  room('r08-top-3', 'R. 08 (Atas Tengah 3)', 'kelas', 1118, 40, 85, 61, 'Utara Tengah', 'Ruang kelas teori'),
  room('r08-top-4', 'R. 08 (Atas Tengah 4)', 'kelas', 1204, 40, 85, 62, 'Utara Tengah', 'Ruang kelas teori'),
  room('r08-top-5', 'R. 08 (Atas Tengah 5)', 'kelas', 1290, 40, 85, 62, 'Utara Tengah', 'Ruang kelas teori'),
  room('r08-top-6', 'R. 08 (Atas Tengah 6)', 'kelas', 1433, 75, 103, 55, 'Utara Tengah', 'Ruang kelas teori'),
  room('taman-tengah-barat-1', 'Taman Inner Court Barat Laut', 'taman', 316, 218, 212, 188, 'Tengah Barat', 'Taman hijau terbuka dengan vegetasi asri'),
  room('gazebo-1', 'Gazebo Taman Barat Laut', 'taman', 331, 229, 52, 53, 'Tengah Barat', 'Gazebo santai dan ruang diskusi luar ruangan'),
  room('r08-mw-1', 'R. 08 (Tengah Barat 1)', 'kelas', 529, 218, 106, 188, 'Tengah Barat', 'Ruang kelas teori'),
  room('taman-tengah-barat-2', 'Taman Inner Court Barat Tengah', 'taman', 636, 218, 102, 188, 'Tengah Barat', 'Taman hijau terbuka'),
  room('gazebo-2', 'Gazebo Taman Barat Tengah', 'taman', 655, 235, 52, 52, 'Tengah Barat', 'Gazebo santai dan ruang diskusi luar ruangan'),
  room('r08-mid-1', 'R. 08 (Koridor Tengah 1)', 'kelas', 316, 422, 86, 63, 'Pusat Barat', 'Ruang kelas teori'),
  room('r08-mid-2', 'R. 08 (Koridor Tengah 2)', 'kelas', 403, 422, 86, 63, 'Pusat Barat', 'Ruang kelas teori'),
  room('r08-mid-3', 'R. 08 (Koridor Tengah 3)', 'kelas', 490, 422, 86, 63, 'Pusat Barat', 'Ruang kelas teori'),
  room('r08-mid-4', 'R. 08 (Koridor Tengah 4)', 'kelas', 577, 422, 86, 63, 'Pusat Barat', 'Ruang kelas teori'),
  room('r08-mid-5', 'R. 08 (Koridor Tengah 5)', 'kelas', 664, 422, 86, 63, 'Pusat Barat', 'Ruang kelas teori'),
  room('lapangan-2', 'Lapangan Olahraga Tengah Barat', 'lapangan', 276, 501, 278, 107, 'Pusat Barat', 'Lapangan multifungsi voli, badminton, dan senam'),
  room('taman-selatan-barat', 'Taman Inner Court Selatan Barat', 'taman', 226, 691, 299, 151, 'Selatan Barat', 'Taman inner courtyard asri dengan fasilitas santai'),
  room('gazebo-3', 'Gazebo Taman Selatan Barat', 'taman', 260, 739, 51, 53, 'Selatan Barat', 'Gazebo santai dan belajar luar ruangan'),
  room('toilet-barat', 'Kamar Mandi Taman Selatan Barat', 'toilet', 452, 736, 61, 51, 'Selatan Barat', 'Fasilitas sanitasi toilet siswa'),
  room('masjid', 'Masjid Sekolah', 'fasilitas', 957, 431, 186, 164, 'Pusat Kampus', 'Fasilitas peribadatan utama warga sekolah'),
  room('panggung-aula-luar', 'Panggung Aula Luar', 'fasilitas', 754, 502, 185, 34, 'Pusat Kampus', 'Panggung pentas seni dan upacara akbar'),
  room('aula-luar', 'Aula Luar (Joglo)', 'fasilitas', 754, 536, 185, 76, 'Pusat Kampus', 'Aula semi-terbuka beratap joglo tradisional'),
  room('aula-dalam', 'Aula Dalam Serbaguna', 'fasilitas', 754, 612, 185, 63, 'Pusat Kampus', 'Gedung pertemuan utama tertutup & ber-AC'),
  room('taman-masjid-utara', 'Taman Utara Masjid', 'taman', 957, 218, 186, 197, 'Pusat Utara', 'Taman penghijauan dan area wudhu terbuka'),
  room('gazebo-masjid', 'Gazebo Depan Masjid', 'taman', 975, 345, 52, 52, 'Pusat Utara', 'Gazebo istirahat jamaah masjid'),
  room('toilet-masjid', 'Kamar Mandi & Wudhu Masjid', 'toilet', 1065, 345, 75, 65, 'Pusat Utara', 'Fasilitas wudhu dan sanitasi masjid'),
  room('ruang-meeting', 'Ruang Meeting / Rapat Pimpinan', 'administrasi', 956, 612, 72, 62, 'Pusat Tengah', 'Ruang rapat koordinasi dewan guru dan yayasan'),
  room('ruang-guru', 'Ruang Guru Utama', 'administrasi', 1029, 612, 191, 62, 'Pusat Tengah', 'Ruang kerja bersama dewan guru dan pendidik'),
  room('r-guru-dpib', 'Ruang Guru Kejuruan DPIB', 'administrasi', 1282, 612, 60, 62, 'Pusat Tengah', 'Ruang instruktur Desain Pemodelan dan Informasi Bangunan'),
  room('r12', 'R. 12', 'kelas', 1221, 612, 60, 62, 'Pusat Tengah', 'Ruang kelas teori R.12'),
  room('r13-top-1', 'R. 13 (Sub A)', 'kelas', 1453, 543, 31, 34, 'Pusat Tengah', 'Ruang kelas teori R.13 sub-A'),
  room('r13-top-2', 'R. 13 (Sub B)', 'kelas', 1485, 543, 30, 31, 'Pusat Tengah', 'Ruang kelas teori R.13 sub-B'),
  room('r13-top-3', 'R. 13 (Sub C)', 'kelas', 1516, 543, 30, 31, 'Pusat Tengah', 'Ruang kelas teori R.13 sub-C'),
  room('lab-kimia', 'Lab. Sains Kimia', 'lab', 1485, 575, 61, 41, 'Pusat Tengah', 'Laboratorium praktikum kimia'),
  room('lab-fisika', 'Lab. Sains Fisika', 'lab', 1485, 617, 61, 58, 'Pusat Tengah', 'Laboratorium praktikum fisika'),
  room('kepsek', 'Ruang Kepala Sekolah', 'administrasi', 754, 756, 61, 82, 'Kantor Pusat', 'Ruang kerja pimpinan Kepala Sekolah'),
  room('rwaka', 'Ruang Wakil Kepala Sekolah', 'administrasi', 754, 858, 61, 82, 'Kantor Pusat', 'Ruang kerja Wakil Kepala Sekolah'),
  room('rtu', 'Ruang Tata Usaha (TU)', 'administrasi', 878, 756, 61, 82, 'Kantor Pusat', 'Pusat pelayanan administrasi & persuratan'),
  room('rtamu', 'Ruang Tamu Pimpinan', 'administrasi', 879, 858, 60, 81, 'Kantor Pusat', 'Lobi dan ruang penerimaan tamu dinas'),
  room('lobi-admin', 'Lobi & R. BK Manajemen', 'administrasi', 816, 756, 61, 50, 'Kantor Pusat', 'Lobi pelayanan administrasi kantor'),
  room('taman-selatan-tengah', 'Taman Inner Court Selatan Pusat', 'taman', 956, 691, 196, 150, 'Pusat Selatan', 'Ruang terbuka hijau asri'),
  room('gazebo-4', 'Gazebo Taman Pusat Selatan', 'taman', 975, 710, 52, 52, 'Pusat Selatan', 'Gazebo santai dan diskusi siswa'),
  room('studio-band', 'Studio Musik & Band', 'ekstra', 1095, 785, 55, 54, 'Pusat Selatan', 'Studio kedap suara latihan band dan kreasi musik'),
  room('multimedia', 'Studio Multimedia & Komputer', 'bengkel', 1095, 858, 55, 62, 'Pusat Selatan', 'Laboratorium multimedia dan editing video'),
  room('r21', 'R. 21', 'kelas', 1153, 858, 63, 62, 'Tenggara Bawah', 'Ruang kelas teori'),
  room('r20', 'R. 20', 'kelas', 1217, 858, 63, 62, 'Tenggara Bawah', 'Ruang kelas teori'),
  room('r19', 'R. 19', 'kelas', 1281, 858, 63, 62, 'Tenggara Bawah', 'Ruang kelas teori'),
  room('r18', 'R. 18', 'kelas', 1345, 858, 63, 62, 'Tenggara Bawah', 'Ruang kelas teori'),
  room('r17', 'R. 17', 'kelas', 1409, 858, 63, 62, 'Tenggara Bawah', 'Ruang kelas teori'),
  room('r16', 'R. 16', 'kelas', 1473, 858, 63, 62, 'Tenggara Bawah', 'Ruang kelas teori'),
  room('taman-tenggara', 'Taman Inner Court Tenggara', 'taman', 1167, 691, 302, 151, 'Tenggara', 'Taman hijau peneduh ruang kelas'),
  room('gazebo-5', 'Gazebo Taman Tenggara', 'taman', 1355, 715, 52, 52, 'Tenggara', 'Gazebo santai luar ruangan'),
  room('toilet-tenggara', 'Kamar Mandi Taman Tenggara', 'toilet', 1410, 770, 58, 70, 'Tenggara', 'Fasilitas sanitasi toilet siswa'),
  room('lapangan-3', 'Lapangan Olahraga Tengah Timur', 'lapangan', 1166, 486, 286, 120, 'Tengah Timur', 'Lapangan olahraga basket, futsal, dan aktivitas fisik'),
  room('parkir-timur', 'Area Parkir Timur', 'parkir', 1671, 615, 45, 299, 'Batas Timur', 'Area parkir kendaraan dinas dan tamu dinas timur'),
  room('kantin-t-kios-1', 'Kantin Timur - Kios 1', 'fasilitas', 1675, 354, 30, 45, 'Timur', 'Kios kuliner dan jajanan sehat siswa'),
  room('kantin-t-kios-2', 'Kantin Timur - Kios 2', 'fasilitas', 1706, 354, 29, 45, 'Timur', 'Kios kuliner dan jajanan sehat siswa'),
  room('kantin-t-kios-3', 'Kantin Timur - Kios 3', 'fasilitas', 1736, 354, 29, 45, 'Timur', 'Kios kuliner dan jajanan sehat siswa'),
  room('kantin-t-kios-4', 'Kantin Timur - Kios 4', 'fasilitas', 1766, 354, 29, 45, 'Timur', 'Kios kuliner dan jajanan sehat siswa'),
  room('kantin-t-kios-5', 'Kantin Timur - Kios 5', 'fasilitas', 1796, 354, 30, 45, 'Timur', 'Kios kuliner dan jajanan sehat siswa'),
  room('r08-e-1', 'R. 08 (Timur Laut 1)', 'kelas', 1177, 218, 148, 120, 'Timur Laut', 'Ruang kelas teori'),
  room('r08-e-2', 'R. 08 (Timur Laut 2)', 'kelas', 1160, 353, 100, 117, 'Timur Laut', 'Ruang kelas teori'),
  room('r08-e-3', 'R. 08 (Timur Laut 3)', 'kelas', 1267, 353, 100, 117, 'Timur Laut', 'Ruang kelas teori'),
  room('r08-e-4', 'R. 08 (Timur Laut 4)', 'kelas', 1370, 353, 100, 117, 'Timur Laut', 'Ruang kelas teori'),
  room('r08-e-besar', 'Gedung R. 08 Timur Vertikal', 'kelas', 1705, 41, 104, 294, 'Ujung Timur Laut', 'Gedung sayap timur laut bertingkat'),
  room('r08-e-bawah-1', 'R. 08 (Timur Bawah 1)', 'kelas', 1675, 407, 151, 46, 'Timur', 'Ruang kelas teori'),
  room('r08-e-bawah-2', 'R. 08 (Timur Bawah 2)', 'kelas', 1675, 458, 151, 46, 'Timur', 'Ruang kelas teori'),
  room('taman-strip-selatan', 'Taman Jalur Hijau Kelas Bawah', 'taman', 213, 922, 331, 18, 'Selatan Barat Daya', 'Taman peneduh memanjang di bawah ruang kelas R.05-R.01'),
  room('parkir-kelas-11', 'Parkir Kelas 11', 'parkir', 156, 981, 385, 54, 'Selatan Barat Daya', 'Area parkir kendaraan roda dua siswa kelas 11'),
  room('pos-satpam-selatan', 'Pos Satpam Gerbang Depan', 'administrasi', 562, 981, 37, 54, 'Selatan Barat Daya', 'Pos keamanan dan kontrol akses gerbang depan'),
  room('p-guru', 'Pos Pengawas & Piket Guru', 'administrasi', 542, 711, 85, 80, 'Pusat Barat', 'Ruang kerja piket dan pengawas guru'),
  room('rbk-timur', 'Ruang BK Samping Guru', 'administrasi', 540, 797, 64, 44, 'Pusat Barat', 'Layanan bimbingan konseling siswa'),
  room('sungai-depan', 'Sungai & Saluran Air Depan', 'fasilitas', 0, 1041, 1920, 34, 'Frontage Depan', 'Aliran kali pembatas Jl. Tentara Genie Pelajar dengan kompleks sekolah'),
  room('jembatan-utama', 'Jembatan Gerbang Utama', 'fasilitas', 480, 1037, 160, 42, 'Gerbang Depan', 'Jembatan beton berpagar melintasi kali ke gerbang utama sekolah'),
  room('jembatan-timur', 'Jembatan Akses Timur', 'fasilitas', 1640, 1037, 90, 42, 'Gerbang Timur', 'Jembatan penghubung melintasi kali ke area timur sekolah'),
];

export const hallRoof = [
  { x: 846.5, z: 574, w: 185, d: 76, base: 31, rise: 16, topW: 90, topD: 38 },
  { x: 846.5, z: 574, w: 130, d: 54, base: 47, rise: 24, topW: 60, topD: 25 },
  { x: 846.5, z: 574, w: 65, d: 27, base: 71, rise: 16, topW: 10, topD: 8 },
] as const;

export const paths = [
  // Jalan utama keliling perimeter luar
  [10, 10, 1900, 28],
  [10, 1040, 1900, 32],
  [10, 10, 20, 1050],
  [1890, 10, 20, 1050],
  // Koridor jalan paving internal barat (antara 2 parkir barat)
  [66, 10, 38, 1050],
  [150, 10, 8, 1050],
  // Koridor paving horizontal kelas utara
  [215, 105, 1450, 25],
  [215, 205, 1450, 25],
  [215, 410, 1450, 25],
  [215, 488, 1450, 25],
  // Jalan paving lebar sirkulasi Bagian 2 (Canva):
  // 1. Jalan paving keliling Taman Tengah
  [215, 677, 330, 14],
  [215, 842, 330, 16],
  [215, 691, 11, 151],
  [525, 691, 17, 151],
  // 2. Jalan paving lebar antara kelas bawah dan Parkir Kelas 11 (lebar 41px sesuai Canva)
  [150, 940, 450, 41],
  // 3. Akses paving penghubung antara Parkir Kelas 11 dan Pos Satpam
  [541, 981, 21, 54],
  // 4. Plaza pedestrian paving bertitik di dalam gerbang selatan (depan kelas & parkir)
  [150, 981, 410, 54],
  // Koridor vertikal internal lainnya
  [742, 10, 28, 1050],
  [943, 10, 28, 1050],
  [1148, 10, 28, 1050],
  [1455, 10, 28, 1050],
  [1620, 10, 28, 1050],
] as const;

export const specialFeatures = {
  // Mihrab Masjid: Masjid is at x=957, z=431, w=186, d=164
  // Western wall of masjid (facing qibla) is at x=957, z=431..595
  mihrab: { x: 953, z: 513, w: 10, d: 28, h: 28 },
  kolam: { x: 846, z: 710, radius: 20, h: 5 },
  panggungSteps: [
    { x: 846.5, z: 534, w: 180, d: 8, h: 6 },
  ]
} as const;

export function searchRooms(query: string, category: Category | 'all' = 'all'): MapRoom[] {
  const term = query.trim().toLocaleLowerCase('id');
  return rooms.filter(
    (r) =>
      (category === 'all' || r.category === category) &&
      `${r.name} ${r.location} ${categories[r.category].name}`.toLocaleLowerCase('id').includes(term)
  );
}
