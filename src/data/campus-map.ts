export const PLAN = { width: 1448, height: 1086, source: '/images/school/denah-arsitektur-hd.png' } as const;

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

// Koordinat presisi piksel hasil tracing CAD master HD (resolusi 5792 x 4344, skala 1:4).
export const rooms: MapRoom[] = [
  room('bengkel-mesin', 'Bengkel Mesin', 'bengkel', 1296.8, 91.8, 85.2, 271.0, 'Utara Barat', 'Fasilitas manufaktur mesin CNC, bubut, dan milling'),
  room('kantin-baru', 'Kantin Baru (Utara)', 'fasilitas', 1278.0, 385.0, 117.2, 46.2, 'Utara', 'Kantin sehat sisi utara sekolah'),
  room('gudang-utara', 'Gudang Persediaan', 'fasilitas', 1269.2, 543.0, 141.8, 99.0, 'Utara Tengah', 'Gudang logistik dan material kejuruan'),
  room('bengkel-otomotif', 'Bengkel Otomotif', 'bengkel', 1076.2, 143.2, 102.5, 206.5, 'Barat Laut', 'Workshop servis mobil, spooring, & engine tune up'),
  room('r-acc-cat', 'R. Pengecatan (Otomotif)', 'bengkel', 1056.0, 283.0, 20.2, 37.8, 'Barat Laut', 'Ruang oven cat semprot & bodi kendaraan'),
  room('kantor-bengkel', 'Kantor Otomotif', 'administrasi', 1148.0, 371.2, 56.0, 46.8, 'Barat Laut', 'Ruang instruktur dan administrasi kejuruan'),
  room('osis-utara', 'R. OSIS (Utara)', 'ekstra', 1001.8, 356.0, 44.8, 25.2, 'Barat Tengah', 'Sekretariat organisasi kesiswaan'),
  room('lab-kreativitas', 'Ruang Lab. Kreativitas', 'lab', 1010.0, 418.8, 44.0, 52.2, 'Tengah Barat Laut', 'Ruang inkubasi riset dan karya siswa'),
  room('uks-barat', 'R. UKS Barat', 'fasilitas', 963.2, 336.5, 27.5, 27.2, 'Barat Tengah', 'Pos pertolongan pertama & kesehatan'),
  room('bk-barat', 'R. BK Barat', 'fasilitas', 962.8, 363.8, 28.0, 35.5, 'Barat Tengah', 'Ruang bimbingan konseling'),
  room('bengkel-listrik-1', 'Bengkel Listrik 1', 'bengkel', 899.8, 267.2, 63.2, 48.8, 'Barat', 'Instalasi penerangan & tenaga listrik'),
  room('bengkel-listrik-2', 'Bengkel Listrik 2', 'bengkel', 895.8, 316.0, 67.5, 46.8, 'Barat', 'Pembangkit & panel distribusi tegangan rendah'),
  room('bengkel-listrik-3', 'Bengkel Listrik 3', 'bengkel', 899.5, 363.0, 63.2, 60.0, 'Barat', 'Pengukuran listrik & kalibrasi instrumentasi'),
  room('bengkel-listrik-4', 'Bengkel Listrik 4', 'bengkel', 899.5, 423.0, 63.2, 48.8, 'Barat', 'Otomasi industri & sistem kendali motor'),
  room('rth-barat-laut', 'Taman Bengkel Listrik', 'taman', 749.8, 266.8, 129.2, 123.8, 'Barat', 'Ruang Terbuka Hijau & Gazebo santai'),
  room('osis-selatan', 'R. ORIS', 'ekstra', 866.0, 413.5, 12.2, 54.5, 'Barat Tengah', 'Ruang kegiatan siswa'),
  room('bengkel-listrik-selatan', 'Bengkel Otomasi & PLC', 'bengkel', 767.0, 412.0, 99.0, 56.0, 'Barat Tengah', 'Laboratorium PLC, SCADA, & mikrokontroler'),
  room('bengkel-tsm', 'Bengkel TSM (Sepeda Motor)', 'bengkel', 883.2, 70.5, 50.8, 58.2, 'Sisi Barat', 'Kelas industri dealer resmi Honda & Yamaha'),
  room('bengkel-tkv', 'Bengkel TKV', 'bengkel', 834.0, 70.2, 49.2, 58.2, 'Sisi Barat', 'Praktik kendaraan vokasi'),
  room('bengkel-tkr', 'Bengkel TKR (Mobil)', 'bengkel', 766.5, 70.2, 67.5, 59.8, 'Sisi Barat', 'Kelas industri perbaikan kendaraan ringan'),
  room('r9-1', 'R9-1', 'kelas', 898.0, 205.5, 50.0, 44.5, 'Sayap Barat R9', 'Ruang kelas teori'),
  room('r9-2', 'R9-2', 'kelas', 848.0, 205.5, 50.0, 44.5, 'Sayap Barat R9', 'Ruang kelas teori'),
  room('r9-3', 'R9-3', 'kelas', 796.5, 205.0, 51.5, 44.5, 'Sayap Barat R9', 'Ruang kelas teori'),
  room('r9-4', 'R9-4', 'kelas', 744.5, 204.8, 52.0, 44.8, 'Sayap Barat R9', 'Ruang kelas teori'),
  room('r9-5', 'R9-5', 'kelas', 725.2, 204.8, 19.2, 44.2, 'Sayap Barat R9', 'Ruang kelas teori'),
  room('toilet-r9', 'Toilet Sayap Barat', 'toilet', 632.0, 204.5, 93.2, 47.5, 'Sayap Barat R9', 'Fasilitas sanitasi toilet siswa'),
  room('r9-6', 'R9-6', 'kelas', 578.0, 204.0, 52.0, 43.8, 'Sayap Barat R9', 'Ruang kelas teori'),
  room('r9-7', 'R9-7', 'kelas', 506.0, 203.8, 40.0, 44.0, 'Sayap Barat R9', 'Ruang kelas teori'),
  room('r9-8a', 'R9-8 (Atas)', 'kelas', 433.5, 203.8, 56.8, 43.5, 'Sayap Barat R9', 'Ruang kelas teori'),
  room('r9-8b', 'R9-8 (Bawah)', 'kelas', 375.8, 203.5, 40.2, 43.5, 'Sayap Barat R9', 'Ruang kelas teori'),
  room('r9-9', 'R9-9', 'kelas', 300.2, 194.0, 42.8, 69.2, 'Sayap Barat R9', 'Ruang kelas teori'),
  room('bengkel-bangunan', 'Bengkel Bangunan (TKP/DPIB)', 'bengkel', 168.2, 113.2, 132.2, 316.5, 'Barat Daya', 'Workshop konstruksi kayu, batu, beton, & ukur tanah'),
  room('bengkel-av-tengah', 'Bengkel Audio Video 1', 'bengkel', 419.0, 264.8, 49.0, 128.8, 'Tengah Barat', 'Praktik sistem akustik & elektronika analog'),
  room('bengkel-av-timur', 'Bengkel Audio Video 2', 'bengkel', 398.0, 411.5, 55.0, 54.2, 'Tengah Barat', 'Praktik pemancar & studio elektronika digital'),
  room('guru-jm', 'Ruang Guru Kejuruan JM', 'administrasi', 594.5, 300.5, 36.5, 56.5, 'Tengah Barat', 'Ruang kerja guru produktif'),
  room('kios-kantin-selatan', 'Deretan Kios Kantin (1-16)', 'fasilitas', 36.8, 122.0, 42.0, 307.2, 'Batas Selatan', 'Kantin aneka kuliner sehat siswa'),
  room('toilet-kantin-selatan', 'Toilet & Sanitasi Kantin', 'toilet', 38.0, 429.2, 40.8, 24.0, 'Batas Selatan', 'Wastafel dan toilet kantin'),
  room('tps-sekolah', 'Tempat Pengolahan Sampah (TPS)', 'fasilitas', 243.8, 493.5, 40.5, 33.0, 'Selatan', 'Fasilitas pemilahan sampah ramah lingkungan'),
  room('rth-barat-selatan', 'Jalur Hijau Perimeter Barat', 'taman', 174.5, 27.5, 540.2, 87.0, 'Batas Barat', 'Area sabuk hijau peneduh sekolah'),
  room('taman-tengah-selatan', 'Taman Inner Court Selatan', 'taman', 478.5, 279.8, 102.0, 113.2, 'Tengah Selatan', 'Taman terbuka dan area santai siswa'),
  room('r36', 'R. 36', 'kelas', 564.0, 411.5, 55.2, 54.5, 'Tengah Selatan', 'Ruang kelas teori'),
  room('r33-atas', 'R. 33 (Atas)', 'kelas', 508.2, 411.5, 55.8, 54.5, 'Tengah Selatan', 'Ruang kelas teori'),
  room('r37', 'R. 37', 'kelas', 453.0, 411.5, 55.2, 54.2, 'Tengah Selatan', 'Ruang kelas teori'),
  room('r33-bawah', 'R. 33 (Bawah)', 'kelas', 342.8, 411.0, 55.2, 54.5, 'Tengah Selatan', 'Ruang kelas teori'),
  room('r34', 'R. 34', 'kelas', 284.0, 411.2, 58.8, 54.2, 'Tengah Selatan', 'Ruang kelas teori'),
  room('panggung-aula', 'Panggung Aula', 'fasilitas', 646.8, 413.0, 85.0, 27.2, 'Pusat Kampus', 'Panggung pementasan seni & upacara akbar'),
  room('aula-luar', 'Aula Luar (Joglo)', 'fasilitas', 649.0, 440.2, 75.0, 106.5, 'Pusat Kampus', 'Aula semi-terbuka beratap joglo tradisional'),
  room('aula-dalam', 'Aula Dalam Serbaguna', 'fasilitas', 646.5, 546.8, 77.5, 70.5, 'Pusat Kampus', 'Gedung pertemuan utama tertutup & ber-AC'),
  room('mushola-utama', 'Mushola Sekolah', 'fasilitas', 783.8, 492.2, 63.2, 51.5, 'Pusat Tengah', 'Fasilitas ibadah berjamaah warga sekolah'),
  room('toilet-mushola', 'Toilet & Wudhu Mushola', 'toilet', 869.5, 485.2, 21.8, 48.2, 'Pusat Tengah', 'Tempat wudhu dan sanitasi mushola'),
  room('perpustakaan', 'Perpustakaan SMEKDA', 'fasilitas', 875.0, 569.0, 49.0, 47.2, 'Pusat Tengah', 'Pusat literasi digital dan buku referensi'),
  room('r-ups-bp', 'R. UPS & BP', 'administrasi', 786.0, 569.0, 89.0, 47.2, 'Pusat Tengah', 'Bimbingan penyuluhan dan panel UPS pusat'),
  room('lapangan-utara', 'Lapangan Olahraga Utara', 'lapangan', 812.8, 470.0, 162.2, 74.0, 'Pusat Tengah Utara', 'Lapangan basket, voli, dan upacara utara'),
  room('lapangan-selatan', 'Lapangan Olahraga Selatan', 'lapangan', 285.0, 466.0, 227.8, 88.8, 'Pusat Tengah Selatan', 'Lapangan futsal & aktivitas jasmani siswa'),
  room('lab-kimia', 'Lab. Kimia', 'lab', 1127.2, 545.2, 51.2, 32.8, 'Tengah Utara', 'Laboratorium praktikum sains kimia'),
  room('lab-fisika', 'Lab. Fisika', 'lab', 1127.0, 578.0, 52.0, 37.8, 'Tengah Utara', 'Laboratorium praktikum sains fisika'),
  room('r14', 'R. 14', 'kelas', 1129.5, 631.5, 49.5, 50.5, 'Koridor Utara', 'Ruang kelas teori'),
  room('r15', 'R. 15', 'kelas', 1129.2, 682.0, 49.8, 54.2, 'Koridor Utara', 'Ruang kelas teori'),
  room('r16-atas', 'R. 16 (Utara)', 'kelas', 1129.8, 756.8, 48.8, 90.5, 'Koridor Utara', 'Ruang kelas teori'),
  room('rth-utara', 'Taman Asri Tengah Utara', 'taman', 901.0, 632.0, 228.5, 130.8, 'Tengah Utara', 'Inner courtyard dengan vegetasi peneduh'),
  room('ruang-medis', 'Ruang Medis Taman', 'fasilitas', 906.5, 664.5, 66.0, 33.8, 'Tengah Utara', 'Paviliun medis & istirahat siswa'),
  room('r17', 'R. 17', 'kelas', 1081.8, 777.2, 47.5, 41.0, 'Sayap Timur', 'Ruang kelas teori'),
  room('r18', 'R. 18', 'kelas', 1037.0, 777.2, 44.8, 41.5, 'Sayap Timur', 'Ruang kelas teori'),
  room('r19', 'R. 19', 'kelas', 992.2, 763.0, 44.8, 56.5, 'Sayap Timur', 'Ruang kelas teori'),
  room('r20', 'R. 20', 'kelas', 947.0, 763.0, 45.2, 71.5, 'Sayap Timur', 'Ruang kelas teori'),
  room('r21', 'R. 21', 'kelas', 886.0, 778.0, 61.0, 42.0, 'Sayap Timur', 'Ruang kelas teori'),
  room('bk-produksi', 'Ruang BK Produksi', 'administrasi', 824.5, 779.0, 59.8, 83.2, 'Sayap Timur', 'Layanan bimbingan karir & unit produksi'),
  room('uks-pusat', 'Kantor UKS Pusat', 'fasilitas', 1247.8, 813.8, 22.2, 39.0, 'Timur Laut', 'Pelayanan kesehatan siswa'),
  room('koperasi-siswa', 'Koperasi Siswa', 'fasilitas', 1247.8, 852.8, 22.2, 46.2, 'Timur Laut', 'Penyedia perlengkapan dan seragam'),
  room('koperasi-guru', 'Koperasi Guru', 'fasilitas', 1247.8, 899.0, 22.2, 48.0, 'Timur Laut', 'Koperasi simpan pinjam & sembako pegawai'),
  room('rth-kolam-ticom', 'RTH & Kolam Ikan TI COM', 'taman', 646.0, 617.2, 89.5, 75.0, 'Pusat Kantor', 'Kolam hias dan taman depan ruang sidang'),
  room('r-tuk', 'R. TUK (Tempat Uji Kompetensi)', 'administrasi', 677.8, 709.5, 34.2, 38.2, 'Pusat Kantor', 'Tempat asesmen profesi LSP-P1 BNSP'),
  room('r-tu', 'R. Tata Usaha (TU)', 'administrasi', 677.8, 747.8, 34.8, 31.5, 'Pusat Kantor', 'Pusat pelayanan administrasi & persuratan'),
  room('r-tunggu', 'R. Tunggu Pimpinan', 'administrasi', 677.8, 779.2, 34.8, 54.5, 'Pusat Kantor', 'Lobi tamu dinas & pimpinan'),
  room('r-perkap', 'R. Perlengkapan', 'administrasi', 640.5, 731.2, 37.2, 35.5, 'Pusat Kantor', 'Gudang perlengkapan & inventaris kantor'),
  room('r-waka', 'R. Pimpinan & Waka', 'administrasi', 640.8, 781.0, 37.0, 53.2, 'Pusat Kantor', 'Ruang kerja Kepala Sekolah & Wakil Kepala Sekolah'),
  room('dapur-sekolah', 'Dapur Utama', 'fasilitas', 606.8, 570.0, 23.2, 47.2, 'Tengah Tenggara', 'Penyedia konsumsi dan kegiatan sekolah'),
  room('lab-komputer', 'Lab. Komputer Dasar', 'lab', 504.0, 570.0, 102.8, 47.2, 'Tengah Tenggara', 'Praktik literasi komputer & asesmen nasional'),
  room('lab-rpl-1', 'Lab. RPL 1 (Software Engineering)', 'lab', 381.0, 560.0, 115.0, 57.8, 'Tengah Tenggara', 'Laboratorium rekayasa perangkat lunak'),
  room('lab-rpl-2', 'Lab. RPL 2 (Web & Mobile Dev)', 'lab', 249.0, 570.0, 125.0, 48.2, 'Tengah Tenggara', 'Laboratorium pengembangan web & Android'),
  room('ruang-gong', 'Studio Karawitan & Gamelan', 'ekstra', 226.0, 570.0, 21.0, 48.2, 'Tengah Tenggara', 'Latihan musik tradisional gamelan'),
  room('lab-tkj-1', 'Lab. Jaringan Komputer TKJ', 'lab', 141.0, 570.0, 85.0, 48.0, 'Tengah Tenggara', 'Praktik mikrotik, cisco router, & server'),
  room('papan-guru', 'Papan Guru & Diskusi', 'administrasi', 498.2, 649.2, 53.0, 95.5, 'Tenggara', 'Area diskusi guru dan ruang arsip'),
  room('kantin-siswa-tenggara', 'Kantin Siswa Tenggara', 'fasilitas', 431.0, 651.2, 52.8, 66.8, 'Tenggara', 'Pujasera makan siswa'),
  room('rth-taman-tenggara', 'Taman Kantin Tenggara', 'taman', 226.8, 619.0, 272.0, 153.8, 'Tenggara', 'Taman rimbun tempat istirahat siswa'),
  room('r-guru-utama', 'Ruang Guru Utama', 'administrasi', 497.8, 784.2, 54.2, 85.2, 'Sayap Timur Depan', 'Ruang kerja bersama seluruh dewan guru'),
  room('r01', 'R. 01', 'kelas', 429.5, 785.0, 68.0, 45.2, 'Sayap Timur Depan', 'Ruang kelas teori'),
  room('r02', 'R. 02', 'kelas', 379.0, 771.0, 50.5, 60.2, 'Sayap Timur Depan', 'Ruang kelas teori'),
  room('r03', 'R. 03', 'kelas', 328.5, 771.8, 50.5, 60.2, 'Sayap Timur Depan', 'Ruang kelas teori'),
  room('r04', 'R. 04', 'kelas', 277.2, 772.8, 51.2, 60.2, 'Sayap Timur Depan', 'Ruang kelas teori'),
  room('r05', 'R. 05', 'kelas', 226.0, 788.8, 51.2, 45.0, 'Sayap Timur Depan', 'Ruang kelas teori'),
  room('lab-tkj-selatan', 'Lab. Fiber Optic TKJ', 'lab', 168.8, 555.0, 57.5, 103.8, 'Selatan Depan', 'Praktik penyambungan fiber optic'),
  room('r06', 'R. 06', 'kelas', 168.5, 680.0, 57.8, 71.8, 'Selatan Depan', 'Ruang kelas teori'),
  room('gudang-selatan', 'Gudang Inventaris Selatan', 'fasilitas', 168.5, 751.8, 57.8, 21.0, 'Selatan Depan', 'Penyimpanan peralatan dan inventaris'),
  room('lab-animasi', 'Studio & Lab. Animasi 2D/3D', 'lab', 169.2, 772.8, 57.0, 95.8, 'Sudut Tenggara Depan', 'Studio animasi, render farm, & drawing tablet'),
  room('pos-satpam-utama', 'Pos Satpam Gerbang Depan', 'administrasi', 535.0, 897.5, 34.5, 66.8, 'Gerbang Depan', 'Pos penjagaan & keamanan utama sekolah'),
  room('parkir-depan', 'Area Parkir Mobil & Tamu', 'parkir', 155.2, 902.8, 179.5, 69.2, 'Depan Timur', 'Tempat parkir kendaraan roda empat & tamu dinas'),
  room('taman-depan-timur', 'Area Taman Depan (Frontage)', 'taman', 334.8, 900.5, 200.2, 67.8, 'Depan Timur', 'Jalur hijau pembatas Jl. Tentara Genie Pelajar'),
  room('parkir-motor-siswa', 'Area Parkir Motor Siswa', 'parkir', 104.8, 611.5, 64.5, 261.2, 'Batas Tenggara', 'Lahan parkir tertib kendaraan roda dua siswa'),
];

export const hallRoof = [
  { x: 686, z: 531, w: 90, d: 188, base: 31, rise: 16, topW: 46, topD: 112 },
  { x: 686.5, z: 494, w: 84, d: 106, base: 47, rise: 28, topW: 36, topD: 46 },
  { x: 686.5, z: 494, w: 42, d: 52, base: 75, rise: 18, topW: 8, topD: 8 },
] as const;

export const paths = [
  // Koridor frontage Jl. Tentara Genie Pelajar
  [145, 875, 1160, 48],
  // Koridor barat (bengkel-bengkel & R9)
  [280, 110, 440, 80],
  [110, 110, 50, 780],
  // Koridor sirkulasi tengah utara-selatan
  [715, 245, 36, 480],
  [715, 715, 36, 480],
  // Koridor penghubung administrasi & aula
  [535, 720, 360, 32],
  [535, 805, 360, 32],
  [610, 248, 260, 28],
  [610, 520, 260, 28],
  // Jalur parkir siswa selatan
  [140, 975, 48, 380],
] as const;

export const specialFeatures = {
  // Mihrab Mushola
  mihrab: { x: 798, z: 492, w: 16, d: 24, h: 28 },
  // Kolam Ikan TI COM (silinder)
  kolam: { x: 678, z: 760, radius: 24, h: 5 },
  // Panggung sayap
  panggungSteps: [
    { x: 654, z: 412, w: 8, d: 75, h: 5 },
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
