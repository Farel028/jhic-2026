export const PLAN = { width: 1448, height: 1086, source: '/images/school/denah-arsitektur-timur-bawah.png' } as const;

export const categories = {
  bengkel: { name: 'Bengkel Kejuruan', color: '#f59e0b' },
  lab: { name: 'Laboratorium & Studio', color: '#0284c7' },
  kelas: { name: 'Ruang Teori / Kelas', color: '#facc15' },
  administrasi: { name: 'Kantor & Staf', color: '#1d4ed8' },
  fasilitas: { name: 'Fasilitas & Ibadah', color: '#8b5cf6' },
  lapangan: { name: 'Lapangan Olahraga', color: '#ea580c' },
  taman: { name: 'Taman & RTH', color: '#22c55e' },
  parkir: { name: 'Area Parkir & Akses', color: '#94a3b8' },
  toilet: { name: 'Sanitasi & Toilet', color: '#ec4899' },
  ekstra: { name: 'Ekstrakurikuler', color: '#3b82f6' },
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
  h: id === 'aula-luar' ? 4 : id === 'panggung-aula' ? 10 : id === 'aula-dalam' ? 38 : id === 'mushola-utama' ? 32 : category === 'taman' ? 3 : category === 'lapangan' ? 2 : category === 'parkir' ? 3 : category === 'bengkel' ? 36 : category === 'lab' ? 32 : 26,
  location,
  note,
});

// Koordinat CAD presisi hasil tracing dinding master (skala 1:4, 1448 x 1086 landscape).
export const rooms: MapRoom[] = [
  room('bengkel-mesin', 'Bengkel Mesin (Manufaktur CNC)', 'bengkel', 1271.0, 152.5, 91.8, 193.0, 'Utara Barat', 'Fasilitas manufaktur mesin CNC, bubut, dan milling'),
  room('kantin-baru', 'Kantin Baru', 'fasilitas', 1276.5, 362.5, 80.2, 70.5, 'Utara', 'Kantin sehat siswa dan staf sisi utara'),
  room('gudang-persediaan', 'Gudang Persediaan', 'fasilitas', 1271.0, 503.0, 91.8, 139.0, 'Utara Tengah', 'Gudang logistik dan material kejuruan'),
  room('bengkel-otomotif', 'Bengkel Otomotif', 'bengkel', 1099.0, 143.2, 81.8, 194.8, 'Barat Laut', 'Workshop servis mobil, spooring, & engine tune up'),
  room('r-acc-cat', 'R. Pengecatan (Otomotif)', 'bengkel', 1069.0, 284.0, 30.0, 54.0, 'Barat Laut', 'Ruang oven cat semprot & bodi kendaraan'),
  room('kantor-otomotif', 'Kantor Otomotif', 'administrasi', 1164.5, 349.8, 40.2, 52.0, 'Barat Laut', 'Ruang instruktur dan administrasi kejuruan'),
  room('r-osis-utara', 'R. OSIS (Utara)', 'ekstra', 1033.0, 349.8, 30.0, 35.0, 'Barat Tengah', 'Sekretariat organisasi kesiswaan'),
  room('lab-kreativitas', 'Ruang Lab. Kreativitas', 'lab', 1002.8, 418.2, 60.8, 61.0, 'Tengah Barat Laut', 'Ruang inkubasi riset dan karya siswa'),
  room('r-lab-kreativitas-teori', 'Ruang Teori Lab. Kreativitas', 'kelas', 1063.5, 418.2, 42.0, 61.0, 'Tengah Barat Laut', 'Ruang teori penunjang lab inovasi'),
  room('ruuk-barat', 'R. UKS Barat', 'fasilitas', 973.0, 332.5, 25.0, 30.0, 'Barat Tengah', 'Pos pertolongan pertama & kesehatan'),
  room('bengkel-tsm', 'Bengkel TSM (Sepeda Motor)', 'bengkel', 936.2, 76.2, 46.0, 39.8, 'Sisi Barat', 'Kelas industri dealer resmi Honda & Yamaha'),
  room('bengkel-tkv', 'Bengkel TKV', 'bengkel', 885.2, 76.2, 51.0, 39.8, 'Sisi Barat', 'Praktik kendaraan vokasi'),
  room('bengkel-tkr', 'Bengkel TKR (Mobil)', 'bengkel', 836.8, 76.2, 48.5, 39.8, 'Sisi Barat', 'Kelas industri perbaikan kendaraan ringan'),
  room('bengkel-listrik-1', 'Bengkel Listrik 1', 'bengkel', 915.2, 274.5, 50.0, 39.5, 'Barat', 'Instalasi penerangan & tenaga listrik'),
  room('bengkel-listrik-2', 'Bengkel Listrik 2', 'bengkel', 915.2, 314.0, 50.0, 48.5, 'Barat', 'Pembangkit & panel distribusi daya'),
  room('bengkel-listrik-3', 'Bengkel Listrik 3', 'bengkel', 915.2, 362.5, 50.0, 27.8, 'Barat', 'Pengukuran listrik & kalibrasi'),
  room('bengkel-listrik-4', 'Bengkel Listrik 4', 'bengkel', 915.2, 390.2, 50.0, 32.8, 'Barat', 'Otomasi industri & motor listrik'),
  room('r-oris', 'Ruang ORIS', 'ekstra', 880.2, 375.0, 21.0, 48.0, 'Barat Tengah', 'Ruang kegiatan siswa'),
  room('bengkel-listrik-selatan', 'Bengkel Otomasi & PLC', 'bengkel', 805.5, 375.0, 74.8, 48.0, 'Barat Tengah', 'Laboratorium PLC, SCADA, & mikrokontroler'),
  room('r9-1', 'R9-1', 'kelas', 950.0, 208.8, 50.5, 38.5, 'Sayap Barat R9', 'Ruang kelas teori'),
  room('r9-2', 'R9-2', 'kelas', 900.2, 208.8, 49.8, 38.5, 'Sayap Barat R9', 'Ruang kelas teori'),
  room('r9-3', 'R9-3', 'kelas', 850.2, 208.8, 50.0, 38.5, 'Sayap Barat R9', 'Ruang kelas teori'),
  room('r9-4', 'R9-4', 'kelas', 798.8, 208.8, 51.5, 38.5, 'Sayap Barat R9', 'Ruang kelas teori'),
  room('r9-5', 'R9-5', 'kelas', 746.8, 208.8, 52.0, 38.5, 'Sayap Barat R9', 'Ruang kelas teori'),
  room('toilet-r9', 'Toilet Sayap Barat', 'toilet', 654.8, 208.8, 92.0, 38.5, 'Sayap Barat R9', 'Fasilitas sanitasi toilet siswa'),
  room('r9-6', 'R9-6', 'kelas', 601.2, 208.8, 53.5, 38.5, 'Sayap Barat R9', 'Ruang kelas teori'),
  room('r9-7', 'R9-7', 'kelas', 547.2, 208.8, 54.0, 38.5, 'Sayap Barat R9', 'Ruang kelas teori'),
  room('tangga-r9', 'Tangga & Selasar R9', 'fasilitas', 492.0, 208.8, 55.2, 38.5, 'Sayap Barat R9', 'Akses vertikal lantai dua R9'),
  room('r9-8a', 'R9-8 (Atas)', 'kelas', 436.0, 208.8, 56.0, 38.5, 'Sayap Barat R9', 'Ruang kelas teori'),
  room('r9-8b', 'R9-8 (Bawah)', 'kelas', 378.2, 208.8, 57.8, 38.5, 'Sayap Barat R9', 'Ruang kelas teori'),
  room('r9-9', 'R9-9', 'kelas', 301.8, 208.8, 76.5, 38.5, 'Sayap Barat R9', 'Ruang kelas teori'),
  room('bengkel-bangunan', 'Bengkel Bangunan (TKP/DPIB)', 'bengkel', 169.5, 122.8, 95.8, 235.8, 'Barat Daya', 'Workshop konstruksi kayu, batu, beton, & ukur tanah'),
  room('kios-kantin-selatan', 'Deretan Kios Kantin (1-16)', 'fasilitas', 81.2, 122.8, 24.2, 235.8, 'Batas Selatan', 'Kantin aneka kuliner sehat siswa'),
  room('toilet-kantin-selatan', 'Toilet & Sanitasi Kantin', 'toilet', 81.2, 358.5, 24.2, 40.0, 'Batas Selatan', 'Wastafel dan toilet kantin'),
  room('tps-sekolah', 'Tempat Pengolahan Sampah (TPS)', 'fasilitas', 200.2, 554.8, 43.0, 39.2, 'Selatan', 'Fasilitas pemilahan sampah ramah lingkungan'),
  room('guru-jm', 'Ruang Guru Kejuruan JM', 'administrasi', 582.0, 300.5, 39.5, 56.5, 'Tengah Barat', 'Ruang kerja guru produktif'),
  room('r36', 'R. 36', 'kelas', 566.2, 357.0, 55.2, 53.5, 'Tengah Selatan', 'Ruang kelas teori'),
  room('r33-atas', 'R. 33 (Atas)', 'kelas', 510.8, 357.0, 55.5, 53.5, 'Tengah Selatan', 'Ruang kelas teori'),
  room('r37', 'R. 37', 'kelas', 455.8, 357.0, 55.0, 53.5, 'Tengah Selatan', 'Ruang kelas teori'),
  room('bengkel-av-1', 'Bengkel Audio Video 1 (Studio)', 'bengkel', 400.8, 300.5, 55.0, 56.5, 'Tengah Barat', 'Praktik sistem akustik & tata suara'),
  room('bengkel-av-2', 'Bengkel Audio Video 2 (Elektronika)', 'bengkel', 400.8, 357.0, 55.0, 53.5, 'Tengah Barat', 'Praktik pemancar & instrumentasi elektronika'),
  room('r33-bawah', 'R. 33 (Bawah)', 'kelas', 344.5, 357.0, 56.2, 53.5, 'Tengah Selatan', 'Ruang kelas teori'),
  room('r34', 'R. 34', 'kelas', 301.8, 357.0, 42.8, 53.5, 'Tengah Selatan', 'Ruang kelas teori'),
  room('gong-aula', 'Gong & Selasar Aula', 'fasilitas', 648.5, 393.0, 102.0, 18.8, 'Pusat Kampus', 'Fasilitas instrumen gong upacara'),
  room('panggung-aula', 'Panggung Aula', 'fasilitas', 648.5, 411.8, 102.0, 27.2, 'Pusat Kampus', 'Panggung pementasan seni & upacara akbar'),
  room('aula-luar', 'Aula Luar (Joglo)', 'fasilitas', 648.5, 439.0, 102.0, 107.5, 'Pusat Kampus', 'Aula semi-terbuka beratap joglo tradisional'),
  room('aula-dalam', 'Aula Dalam Serbaguna', 'fasilitas', 648.5, 546.5, 102.0, 70.0, 'Pusat Kampus', 'Gedung pertemuan utama tertutup & ber-AC'),
  room('lapangan-utara', 'Lapangan Olahraga Utara', 'lapangan', 910.5, 479.2, 167.5, 64.5, 'Pusat Tengah Utara', 'Lapangan basket, voli, dan upacara utara'),
  room('mushola-utama', 'Mushola Sekolah', 'fasilitas', 815.8, 479.2, 64.5, 64.5, 'Pusat Tengah', 'Fasilitas ibadah berjamaah warga sekolah'),
  room('toilet-mushola', 'Toilet & Wudhu Mushola', 'toilet', 815.8, 439.0, 64.5, 40.2, 'Pusat Tengah', 'Tempat wudhu dan sanitasi mushola'),
  room('perpustakaan', 'Perpustakaan SMEKDA', 'fasilitas', 815.8, 570.0, 64.5, 47.0, 'Pusat Tengah', 'Pusat literasi digital dan buku referensi'),
  room('r-ups-bp', 'R. UPS & BP', 'administrasi', 753.5, 570.0, 62.2, 47.0, 'Pusat Tengah', 'Bimbingan penyuluhan dan panel UPS pusat'),
  room('lapangan-selatan', 'Lapangan Olahraga Selatan', 'lapangan', 328.0, 479.2, 230.0, 64.5, 'Pusat Tengah Selatan', 'Lapangan futsal & aktivitas jasmani siswa'),
  room('lab-kimia', 'Lab. Kimia', 'lab', 1131.2, 542.5, 49.5, 43.8, 'Tengah Utara', 'Laboratorium praktikum sains kimia'),
  room('lab-fisika', 'Lab. Fisika', 'lab', 1131.2, 586.2, 49.5, 45.2, 'Tengah Utara', 'Laboratorium praktikum sains fisika'),
  room('r14', 'R. 14', 'kelas', 1131.2, 631.5, 49.5, 52.2, 'Koridor Utara', 'Ruang kelas teori'),
  room('r15', 'R. 15', 'kelas', 1131.2, 683.8, 49.5, 51.2, 'Koridor Utara', 'Ruang kelas teori'),
  room('r16-atas', 'R. 16 (Utara)', 'kelas', 1131.2, 735.0, 49.5, 83.5, 'Koridor Utara', 'Ruang kelas teori'),
  room('r17', 'R. 17', 'kelas', 1083.8, 776.8, 47.5, 41.8, 'Sayap Timur', 'Ruang kelas teori'),
  room('r18', 'R. 18', 'kelas', 1039.2, 776.8, 44.5, 41.8, 'Sayap Timur', 'Ruang kelas teori'),
  room('r19', 'R. 19', 'kelas', 994.2, 776.8, 45.0, 41.8, 'Sayap Timur', 'Ruang kelas teori'),
  room('r20', 'R. 20', 'kelas', 949.0, 776.8, 45.2, 41.8, 'Sayap Timur', 'Ruang kelas teori'),
  room('r21', 'R. 21', 'kelas', 886.2, 776.8, 62.8, 41.8, 'Sayap Timur', 'Ruang kelas teori'),
  room('bk-produksi', 'Ruang BK Produksi', 'administrasi', 835.8, 776.8, 50.5, 56.0, 'Sayap Timur', 'Layanan bimbingan karir & unit produksi'),
  room('uks-pusat', 'Kantor UKS / ULS', 'fasilitas', 1248.0, 818.5, 23.0, 40.8, 'Timur Laut', 'Pelayanan kesehatan siswa'),
  room('koperasi-siswa', 'Koperasi Siswa', 'fasilitas', 1248.0, 859.2, 23.0, 47.8, 'Timur Laut', 'Penyedia perlengkapan dan seragam'),
  room('koperasi-guru', 'Koperasi Guru', 'fasilitas', 1248.0, 907.0, 23.0, 50.5, 'Timur Laut', 'Koperasi simpan pinjam & sembako pegawai'),
  room('r-tu', 'R. Tata Usaha (TU)', 'administrasi', 714.2, 708.8, 39.2, 39.0, 'Pusat Kantor', 'Pusat pelayanan administrasi & persuratan'),
  room('r-sidang', 'Ruang Sidang Utama', 'administrasi', 714.2, 747.8, 39.2, 73.5, 'Pusat Kantor', 'Ruang sidang dewan guru dan rapat pleno'),
  room('r-tuk', 'R. TUK (Tempat Uji Kompetensi)', 'administrasi', 679.8, 708.8, 34.5, 39.0, 'Pusat Kantor', 'Tempat asesmen profesi LSP-P1 BNSP'),
  room('r-tata-u', 'R. Tata Tertib', 'administrasi', 679.8, 747.8, 34.5, 16.8, 'Pusat Kantor', 'Ruang ketertiban dan kedisiplinan siswa'),
  room('r-tunggu', 'R. Tunggu Pimpinan', 'administrasi', 679.8, 764.5, 34.5, 56.8, 'Pusat Kantor', 'Lobi tamu dinas & pimpinan'),
  room('r-perkap', 'R. Perlengkapan', 'administrasi', 637.5, 708.8, 42.2, 55.8, 'Pusat Kantor', 'Gudang perlengkapan & inventaris kantor'),
  room('r-waka', 'R. Pimpinan & Waka', 'administrasi', 637.5, 764.5, 42.2, 56.8, 'Pusat Kantor', 'Ruang kerja Kepala Sekolah & Wakil Kepala Sekolah'),
  room('dapur-sekolah', 'Dapur Utama', 'fasilitas', 608.8, 570.0, 16.8, 47.0, 'Tengah Tenggara', 'Penyedia konsumsi dan kegiatan sekolah'),
  room('lab-komputer', 'Lab. Komputer Dasar', 'lab', 514.0, 570.0, 94.8, 47.0, 'Tengah Tenggara', 'Praktik literasi komputer & asesmen nasional'),
  room('lab-rpl-1', 'Lab. RPL 1 (Software Engineering)', 'lab', 410.5, 570.0, 103.5, 47.0, 'Tengah Tenggara', 'Laboratorium rekayasa perangkat lunak'),
  room('lab-rpl-2', 'Lab. RPL 2 (Web & Mobile Dev)', 'lab', 287.8, 570.0, 122.8, 47.0, 'Tengah Tenggara', 'Laboratorium pengembangan web & Android'),
  room('ruang-gong', 'Studio Karawitan & Gamelan', 'ekstra', 243.2, 570.0, 44.5, 47.0, 'Tengah Tenggara', 'Latihan musik tradisional gamelan'),
  room('lab-tkj-1', 'Lab. Jaringan Komputer TKJ', 'lab', 171.2, 570.0, 72.0, 47.0, 'Tengah Tenggara', 'Praktik mikrotik, cisco router, & server'),
  room('papan-guru', 'Papan Guru & Diskusi', 'administrasi', 505.0, 658.5, 46.8, 85.8, 'Tenggara', 'Area diskusi guru dan ruang arsip'),
  room('kantin-siswa-tenggara', 'Kantin Siswa Tenggara', 'fasilitas', 435.5, 658.5, 50.0, 85.8, 'Tenggara', 'Pujasera makan siswa'),
  room('r-guru-utama', 'Ruang Guru Utama', 'administrasi', 499.8, 788.2, 55.0, 80.0, 'Sayap Timur Depan', 'Ruang kerja bersama seluruh dewan guru'),
  room('r01', 'R. 01', 'kelas', 431.8, 788.2, 68.0, 42.8, 'Sayap Timur Depan', 'Ruang kelas teori'),
  room('r02', 'R. 02', 'kelas', 381.5, 788.2, 50.2, 42.8, 'Sayap Timur Depan', 'Ruang kelas teori'),
  room('r03', 'R. 03', 'kelas', 330.8, 788.2, 50.8, 42.8, 'Sayap Timur Depan', 'Ruang kelas teori'),
  room('r04', 'R. 04', 'kelas', 279.8, 788.2, 51.0, 42.8, 'Sayap Timur Depan', 'Ruang kelas teori'),
  room('r05', 'R. 05', 'kelas', 228.8, 788.2, 51.0, 42.8, 'Sayap Timur Depan', 'Ruang kelas teori'),
  room('lab-tkj-selatan', 'Lab. Fiber Optic TKJ', 'lab', 171.2, 560.0, 57.5, 98.5, 'Selatan Depan', 'Praktik penyambungan fiber optic'),
  room('r06', 'R. 06', 'kelas', 171.2, 679.8, 57.5, 64.5, 'Selatan Depan', 'Ruang kelas teori'),
  room('gudang-selatan', 'Gudang Inventaris Selatan', 'fasilitas', 171.2, 744.2, 57.5, 23.2, 'Selatan Depan', 'Penyimpanan peralatan dan inventaris'),
  room('lab-animasi', 'Studio & Lab. Animasi 2D/3D', 'lab', 171.2, 767.5, 57.5, 77.5, 'Sudut Tenggara Depan', 'Studio animasi, render farm, & drawing tablet'),
  room('pos-satpam-utama', 'Pos Satpam Gerbang Depan', 'administrasi', 513.0, 912.5, 40.0, 40.0, 'Gerbang Depan', 'Pos penjagaan & keamanan utama sekolah'),
  room('parkir-motor-siswa', 'Area Parkir Motor Siswa', 'parkir', 81.2, 600.0, 71.8, 245.0, 'Batas Tenggara', 'Lahan parkir tertib kendaraan roda dua siswa'),
];

export const hallRoof = [
  { x: 699.5, z: 492.8, w: 104, d: 110, base: 31, rise: 16, topW: 52, topD: 55 },
  { x: 699.5, z: 492.8, w: 86, d: 92, base: 47, rise: 28, topW: 36, topD: 40 },
  { x: 699.5, z: 492.8, w: 44, d: 48, base: 75, rise: 18, topW: 8, topD: 8 },
] as const;

export const paths = [
  // Frontage Jl. Tentara Genie Pelajar (bawah)
  [40, 890, 1360, 48],
  // Paving drop-off gerbang utama
  [510, 810, 80, 85],
  // Koridor tengah antara aula dan kelas
  [650, 435, 30, 360],
  [750, 435, 30, 360],
  // Koridor sirkulasi laboratorium IT & kelas
  [170, 788, 380, 30],
  // Koridor R9 barat
  [300, 208, 850, 30],
] as const;

export const specialFeatures = {
  mihrab: { x: 815.8, z: 479.2, w: 16, d: 24, h: 28 },
  kolam: { x: 696.0, z: 651.2, radius: 24, h: 5 },
  panggungSteps: [
    { x: 699.5, z: 411.8, w: 102, d: 12, h: 6 },
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
