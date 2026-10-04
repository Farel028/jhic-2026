export interface FacilityItem {
  id: string;
  name: string;
  category: "Laboratorium" | "Bengkel" | "Ruang Kelas" | "Fasilitas Bersama" | "Olahraga";
  location: string;
  capacity?: string;
  description: string;
  image: string;
  isFeatured?: boolean;
}

export const facilityCategories = [
  "Semua Kategori",
  "Laboratorium",
  "Bengkel",
  "Ruang Kelas",
  "Fasilitas Bersama",
  "Olahraga",
] as const;

export type FacilityCategory = (typeof facilityCategories)[number];

export const facilityStats = [
  { value: "30+", label: "Ruang Praktik & Bengkel" },
  { value: "12+", label: "Laboratorium Komputer & Teknis" },
  { value: "4+", label: "Unit Teaching Factory (TEFA)" },
  { value: "2.000+", label: "Siswa Aktif Terfasilitasi" },
] as const;

// Data fasilitas sekolah
export const initialFacilities: FacilityItem[] = [
  {
    id: "gedung-titl",
    name: "Gedung TITL",
    category: "Laboratorium",
    location: "Kompleks Ketenagalistrikan",
    capacity: "36 Siswa",
    description: "Pusat pembelajaran dan praktikum instalasi tenaga listrik.",
    image: "/images/school/gedung-titl.jpeg",
    isFeatured: true,
  },
  {
    id: "bengkel-otomotif",
    name: "Bengkel Otomotif",
    category: "Bengkel",
    location: "Kompleks Bengkel Otomotif",
    capacity: "40 Siswa",
    description: "Praktik servis kendaraan, scanner OBD, mesin uji, dan hidrolik lift.",
    image: "/images/school/bengkel-otomotif.jpeg",
    isFeatured: true,
  },
  {
    id: "bengkel-tpm",
    name: "Bengkel TPM",
    category: "Bengkel",
    location: "Kompleks Bengkel Mesin",
    capacity: "36 Siswa",
    description: "Peralatan bubut, frais, mesin CNC, dan fabrikasi logam presisi.",
    image: "/images/school/bengkel-tpm.png",
    isFeatured: true,
  },
  {
    id: "bengkel-dpib",
    name: "Bengkel DPIB",
    category: "Bengkel",
    location: "Kompleks Gedung Konstruksi",
    capacity: "36 Siswa",
    description: "Praktik pemodelan dan informasi bangunan serta maket konstruksi.",
    image: "/images/school/bengkel-dpib.png",
    isFeatured: true,
  },
  {
    id: "bengkel-tkp",
    name: "Bengkel TKP",
    category: "Bengkel",
    location: "Kompleks Konstruksi Perumahan",
    capacity: "36 Siswa",
    description: "Praktik konstruksi kayu, struktur beton, dan instalasi bangunan perumahan.",
    image: "/images/school/bengkel-tkp.png",
    isFeatured: true,
  },
  {
    id: "tefa-tgp26",
    name: "Teaching Factory Motor TGP 26",
    category: "Bengkel",
    location: "Frontage Kampus Barat",
    capacity: "25 Siswa / Shift",
    description: "Layanan servis sepeda motor riil standar bengkel resmi.",
    image: "/images/school/teaching-factory-motor.jpg",
    isFeatured: true,
  },
  {
    id: "lab-rpl",
    name: "Laboratorium Rekayasa Perangkat Lunak",
    category: "Laboratorium",
    location: "Gedung TI Lt. 3",
    capacity: "36 Siswa",
    description: "Komputasi performa tinggi untuk web, mobile app, dan cloud.",
    image: "/images/school/lab-rpl.jpeg",
  },
  {
    id: "lab-animasi",
    name: "Laboratorium Animasi",
    category: "Laboratorium",
    location: "Gedung Multimedia & Seni",
    capacity: "36 Siswa",
    description: "Studio render 2D/3D, drawing tablet, dan workstation motion graphic.",
    image: "/images/school/animasi.webp",
  },
  {
    id: "lab-dpib",
    name: "Laboratorium Komputer DPIB",
    category: "Laboratorium",
    location: "Gedung Konstruksi Lt. 2",
    capacity: "36 Siswa",
    description: "Studio komputer CAD, BIM, dan perancangan arsitektur digital.",
    image: "/images/school/dpib.webp",
  },
  {
    id: "lab-tav",
    name: "Laboratorium Audio Video (TAV)",
    category: "Laboratorium",
    location: "Gedung Elektronika Lt. 2",
    capacity: "36 Siswa",
    description: "Praktikum sistem audio frekuensi, pemancar, dan elektronika hiburan.",
    image: "/images/school/tav.webp",
  },
  {
    id: "lab-tei",
    name: "Laboratorium Elektronika Industri (TEI)",
    category: "Laboratorium",
    location: "Gedung Elektronika Lt. 1",
    capacity: "36 Siswa",
    description: "Praktikum mikrokontroler, PLC, pneumatik, dan otomasi industri.",
    image: "/images/school/tei.webp",
  },
  {
    id: "lab-tkj",
    name: "Laboratorium Jaringan Komputer & Fiber Optic",
    category: "Laboratorium",
    location: "Gedung TI Lt. 2",
    capacity: "36 Siswa",
    description: "Infrastruktur server, router jaringan enterprise, dan splicing optik.",
    image: "/images/school/tkj.webp",
  },
  {
    id: "perpustakaan-azis",
    name: "Perpustakaan Abdul Azis",
    category: "Fasilitas Bersama",
    location: "Gedung Utama Sayap Timur",
    capacity: "120 Siswa",
    description: "Pusat literasi terpadu, buku kejuruan, dan e-library digital.",
    image: "/images/school/teaching-factory-motor.jpg",
  },
  {
    id: "aula-utama",
    name: "Aula Serbaguna Graha SMEKDA",
    category: "Fasilitas Bersama",
    location: "Gedung Pusat Lt. 1",
    capacity: "600 Orang",
    description: "Ruang serbaguna untuk job fair, expo teknologi, dan pertemuan akbar.",
    image: "/images/school/aula-smekda.jpeg",
  },
  {
    id: "lapangan-olahraga",
    name: "Lapangan Olahraga Multifungsi",
    category: "Olahraga",
    location: "Halaman Pusat Sekolah",
    capacity: "1.000 Siswa",
    description: "Lapangan outdoor basket, futsal, voli, dan upacara bendera.",
    image: "/images/school/lapangan-olahraga.png",
  },
  {
    id: "ruang-teori-ac",
    name: "Ruang Kelas Teori Modern",
    category: "Ruang Kelas",
    location: "Gedung Pembelajaran A & B",
    capacity: "36 Siswa",
    description: "Kelas ber-AC dengan Smart TV interaktif dan audio terintegrasi.",
    image: "/images/school/titl.webp",
  },
];
