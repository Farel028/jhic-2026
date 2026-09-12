export const PLAN = { width: 1333, height: 595, source: '/images/school/denah-canva.png' } as const;
export const categories = {
  animasi: { name: 'Animasi', color: '#ed78b8' },
  rpl: { name: 'RPL', color: '#48c7c5' },
  fasilitas: { name: 'Fasilitas & staf', color: '#245b96' },
  dbip: { name: 'DBIP', color: '#f0dcb5' },
  tkp: { name: 'TKP', color: '#a66c47' },
  ekstra: { name: 'Ekstrakurikuler', color: '#292855' },
  toilet: { name: 'Kamar mandi', color: '#b47cce' },
  gazebo: { name: 'Gazebo', color: '#d9ad38' },
  parkir: { name: 'Parkir', color: '#a6abad' },
  taman: { name: 'Taman', color: '#8bc657' },
} as const;
export type Category = keyof typeof categories;
export type MapRoom = { id: string; name: string; category: Category; x: number; z: number; w: number; d: number; h: number; location: string; note?: string };
const room = (id: string, name: string, category: Category, x: number, z: number, w: number, d: number, location: string, note?: string): MapRoom => ({id,name,category,x,z,w,d,h: id === 'aula-luar' ? 3 : id === 'panggung' ? 8 : category === 'taman' ? 2 : category === 'parkir' ? 3 : category === 'gazebo' ? 20 : 26,location,note});
// Coordinates are traced pixels, not metres. All heights are illustrative.
export const rooms: MapRoom[] = [
  room('panggung','Panggung Aula Luar','fasilitas',601,50,165,62,'Tengah atas'),
  room('aula-luar','Aula Luar','fasilitas',601,112,165,106,'Tengah atas','Atap joglo tersambung dengan Aula Dalam; bentuk dan tinggi atap merupakan ilustrasi.'),
  room('aula-dalam','Aula Dalam','fasilitas',601,218,165,102,'Tengah'),
  room('r07b','R. 07B','rpl',70,225,55,67,'Sayap kiri, ujung atas'),
  room('r07a','R. 07A','rpl',70,292,55,67,'Sayap kiri, bawah R. 07B'),
  ...[[125,57],[182,56],[260,56],[316,56],[372,57],[429,57],[486,56],[542,45]].map(([x,w],i)=>room(`r08-${i+1}`,'R. 08','rpl',x,264,w,56,`Baris atas kiri, posisi ${i+1} dari kiri`,'Kode R. 08 berulang pada gambar sumber; tidak dinomori ulang. Warna RPL mengikuti arahan pengguna.')),
  room('jurnal','Jurnal… (label belum pasti)','ekstra',70,359,55,36,'Sayap paling kiri','Tulisan kecil terbaca sebagian sebagai Jurnal; nama lengkap belum dikonfirmasi.'),
  room('r06','R. 06','animasi',70,395,55,73,'Sayap paling kiri'),
  room('lab-animasi','LAB. ANIMASI','animasi',70,468,55,85,'Sudut kiri bawah'),
  ...[[125,'05'],[182,'04'],[238,'03'],[294,'02']].map(([x,n])=>room(`r${n}`,`R. ${n}`,'animasi',Number(x),481,56,55,'Baris kiri bawah')),
  room('r01','R. 01','rpl',350,481,67,55,'Baris kiri bawah, ujung kanan'),
  room('parkir-guru','P. Guru','parkir',417,337,76,86,'Kiri tengah','Label sumber P. Guru; ditafsirkan sebagai parkir guru dari kategori pengguna.'),
  room('bk-atas','R. BK','fasilitas',415,427,57,40,'Kiri tengah, di atas jalan'),
  room('bk-bawah','R. BK','fasilitas',417,481,55,73,'Kiri tengah, di bawah jalan'),
  room('kepsek','Kepsek','fasilitas',601,390,55,74,'Tengah bawah, kiri'),
  room('belum-terkonfirmasi','Blok tanpa label','fasilitas',656,390,55,46,'Tengah bawah, antara Kepsek dan R. TU','Blok biru pada sumber tidak memiliki label terbaca. Fungsi belum dikonfirmasi.'),
  room('tu','R. TU','fasilitas',711,390,55,74,'Tengah bawah, kanan'),
  room('waka','R. Waka','fasilitas',601,481,55,73,'Tengah paling bawah, kiri'),
  room('tamu','R. Tamu','fasilitas',711,481,55,73,'Tengah paling bawah, kanan'),
  room('meeting','Ruang Meeting','fasilitas',779,264,65,56,'Baris kanan atas, dekat aula'),
  room('guru','Ruang Guru','fasilitas',844,264,169,56,'Baris kanan atas'),
  room('r12','R. 12','dbip',1013,264,104,56,'Baris kanan atas'),
  room('guru-dbip','R. guru dpib','fasilitas',1117,264,41,56,'Baris kanan atas, antara R. 12 dan R. 13','Ejaan label dpib dipertahankan dari sumber. Kategori staf mengikuti fungsi; nama kategori jurusan tetap DBIP sesuai pengguna.'),
  room('r13','R. 13','dbip',1158,264,86,56,'Baris kanan atas'),
  room('lab-kimia','Lab Kimia','fasilitas',1244,258,55,62,'Sudut kanan atas'),
  room('r14','R. 14','dbip',1244,334,55,67,'Sayap kanan'),
  room('r15','R. 15','dbip',1244,401,55,67,'Sayap kanan'),
  room('r16','R. 16','tkp',1244,468,55,84,'Sudut kanan bawah'),
  ...[[952,'21',66],[1018,'20',57],[1075,'19',56],[1131,'18',57],[1188,'17',56]].map(([x,n,w])=>room(`r${n}`,`R. ${n}`,'tkp',Number(x),481,Number(w),55,'Baris kanan bawah')),
  room('mushola','Mushola','fasilitas',897,481,55,73,'Bawah taman tengah'),
  room('band','Band','ekstra',895,427,55,38,'Sudut bawah taman tengah'),
  room('toilet-kiri','Kamar mandi kiri','toilet',336,346,55,72,'Di taman kiri'),
  room('toilet-kanan','Kamar mandi kanan','toilet',979,369,90,49,'Di taman kanan'),
  room('gazebo-kiri','Gazebo kiri','gazebo',167,376,46,47,'Di taman kiri'),
  room('gazebo-tengah','Gazebo tengah','gazebo',814,351,46,47,'Di taman tengah'),
  room('gazebo-kanan','Gazebo kanan','gazebo',1141,357,46,47,'Di taman kanan'),
  room('taman-kiri','Taman kiri','taman',138,334,262,133,'Halaman kiri','Area hijau pada sumber; tanaman tidak dipetakan satu per satu.'),
  room('taman-aula','Taman depan aula','taman',601,334,165,42,'Di bawah Aula Dalam'),
  room('taman-tengah','Taman tengah','taman',779,334,173,133,'Halaman tengah kanan'),
  room('taman-kanan','Taman kanan','taman',966,334,264,133,'Halaman kanan'),
];
export const hallRoof = [
  { x:683.5,z:185,w:179,d:282,base:31,rise:15,topW:105,topD:220 },
  { x:683.5,z:157,w:109,d:108,base:46,rise:32,topW:46,topD:44 },
  { x:683.5,z:157,w:50,d:48,base:78,rise:19,topW:5,topD:9 },
] as const;
export const paths = [
  [125,320,1174,14],[125,334,13,133],[138,467,367,14],
  [400,334,15,133],[549,467,269,14],[860,467,384,14],
  [587,28,14,453],[766,28,13,453],[601,376,165,14],
  [952,334,14,147],[1230,334,14,147],
] as const;
export function searchRooms(query: string, category: Category | 'all' = 'all'): MapRoom[] {
  const term = query.trim().toLocaleLowerCase('id');
  return rooms.filter(r => (category === 'all' || r.category === category) && `${r.name} ${r.location} ${categories[r.category].name}`.toLocaleLowerCase('id').includes(term));
}
