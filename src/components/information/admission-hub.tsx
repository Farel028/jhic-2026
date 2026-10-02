"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import { admissionSnapshots } from "@/data/admission-statistics";

type AdmissionTrack = {
  id: string;
  name: string;
  quotaPercent: string;
  quotaDescription: string;
  targetGroup: string;
  rules: string[];
  documents: string[];
};

const admissionTracks: AdmissionTrack[] = [
  {
    id: "akademik",
    name: "Prestasi Nilai Akademik",
    quotaPercent: "65%",
    quotaDescription: "Porsi kuota terbesar untuk jenjang SMK Negeri di Jawa Timur",
    targetGroup: "Lulusan SMP atau MTs berdasarkan nilai gabungan prestasi akademik",
    rules: [
      "Penilaian dihitung dari 60% rerata nilai rapor semester 1 sampai 5 ditambah 40% nilai TKA atau indeks akreditasi sekolah asal.",
      "Mata pelajaran rapor yang dihitung adalah Pendidikan Agama, PPKn, Bahasa Indonesia, Matematika, IPA, IPS, dan Bahasa Inggris.",
      "Calon murid dapat memilih maksimal 3 kompetensi keahlian dalam 1 sekolah atau pada sekolah yang berbeda.",
      "Jalur ini tidak dibatasi oleh zona wilayah administratif tempat tinggal.",
    ],
    documents: [
      "Ijazah atau Surat Keterangan Lulus (SKL) asli",
      "Rapor SMP atau MTs semester 1 sampai 5",
      "Kartu Keluarga (KK) dengan tanggal terbit minimal 1 tahun",
      "Surat Keterangan Sehat dan Bebas Buta Warna dari dokter pemerintah atau puskesmas",
    ],
  },
  {
    id: "afirmasi",
    name: "Jalur Afirmasi",
    quotaPercent: "15%",
    quotaDescription: "Keluarga ekonomi tidak mampu, anak buruh, dan disabilitas",
    targetGroup: "Calon murid dari keluarga ekonomi rentan serta penyandang disabilitas mandiri",
    rules: [
      "Alokasi terdiri dari kuota keluarga tidak mampu (10%), anak buruh (2%), dan penyandang disabilitas fisik ringan (3%).",
      "Penyandang disabilitas diperkenankan memilih jurusan yang memungkinkan keselamatan kerja selama praktik bengkel atau lab.",
      "Calon murid dapat memilih 1 kompetensi keahlian di sekolah yang dituju.",
    ],
    documents: [
      "Kartu Indonesia Pintar (KIP), Kartu Program Keluarga Harapan (PKH), atau bukti kepesertaan penanganan kemiskinan pemerintah",
      "Surat tanda keanggotaan serikat buruh orang tua disertai slip penghasilan resmi bagi anak buruh",
      "Surat keterangan asesmen disabilitas dari tenaga medis atau psikolog bagi penyandang disabilitas",
      "Surat pernyataan orang tua bermeterai mengenai keabsahan dokumen kepesertaan afirmasi",
    ],
  },
  {
    id: "domisili",
    name: "Jalur Domisili SMK",
    quotaPercent: "10%",
    quotaDescription: "Jarak terdekat tempat tinggal ke lingkungan sekolah",
    targetGroup: "Calon murid yang bertempat tinggal di sekitar lokasi SMKN 2 Surabaya",
    rules: [
      "Berbeda dengan jenjang SMA yang memiliki kuota zonasi 50%, kuota domisili SMK adalah 10% karena memprioritaskan peminatan vokasi.",
      "Seleksi diperhitungkan murni berdasarkan jarak lurus tempat tinggal calon murid ke titik koordinat SMKN 2 Surabaya.",
      "Apabila terdapat jarak tempat tinggal yang sama, pemeringkatan didasarkan pada usia calon murid yang lebih tua.",
    ],
    documents: [
      "Kartu Keluarga asli yang diterbitkan paling lambat 1 tahun sebelum tanggal pendaftaran",
      "Ijazah atau Surat Keterangan Lulus (SKL) SMP atau MTs",
      "Surat keterangan sehat dan tidak buta warna sesuai ketentuan jurusan yang dipilih",
    ],
  },
  {
    id: "perpindahan",
    name: "Perpindahan Tugas Orang Tua",
    quotaPercent: "5%",
    quotaDescription: "Mutasi kedinasan orang tua dan anak pendidik atau tenaga kependidikan",
    targetGroup: "Calon murid yang mengikuti mutasi kerja kedinasan orang tua atau anak kandung pegawai sekolah",
    rules: [
      "Berlaku bagi perpindahan kerja kedinasan orang tua antar kabupaten, kota, atau provinsi pada instansi pemerintah, BUMN, BUMD, atau TNI/Polri.",
      "Jalur ini juga mengakomodasi kuota anak kandung guru atau tenaga kependidikan yang bertugas aktif di SMKN 2 Surabaya.",
    ],
    documents: [
      "Surat Keputusan (SK) mutasi kerja kedinasan orang tua dari instansi atau badan usaha yang berwenang",
      "Surat penugasan kepala sekolah bagi anak kandung guru atau tenaga kependidikan",
      "Surat Keterangan Domisili atau Surat Keterangan Pindah Penduduk dari dinas kependudukan setempat",
    ],
  },
  {
    id: "lomba",
    name: "Prestasi Hasil Lomba",
    quotaPercent: "5%",
    quotaDescription: "Kejuaraan akademik, olahraga, seni, sains, dan hafiz Al-Qur'an",
    targetGroup: "Siswa berprestasi kejuaraan tingkat kota, provinsi, nasional, maupun internasional",
    rules: [
      "Sertifikat atau piagam kejuaraan diperoleh selama menempuh pendidikan di jenjang SMP atau MTs dalam 3 tahun terakhir.",
      "Kejuaraan mencakup ajang berjenjang resmi (OSN, O2SN, FLS2N, Gala Siswa) serta ajang non-berjenjang yang telah terkurasi.",
      "Tersedia kuota khusus bagi penghafal Al-Qur'an dengan kualifikasi hafiz minimal 1 juz bersertifikat resmi.",
    ],
    documents: [
      "Sertifikat atau piagam kejuaraan asli yang telah dilegalisasi oleh panitia atau induk organisasi berwenang",
      "Surat keterangan keabsahan sertifikat prestasi dari kepala sekolah asal",
      "Dokumentasi foto penerimaan kejuaraan atau tanda penghargaan resmi",
    ],
  },
];

type ColorBlindRequirement = {
  code: string;
  name: string;
  slug: string;
  isStrict: boolean;
  requirementLabel: string;
  reason: string;
};

const colorBlindGuide: ColorBlindRequirement[] = [
  {
    code: "ANI",
    name: "Animasi",
    slug: "animasi",
    isStrict: true,
    requirementLabel: "Wajib Bebas Buta Warna Penuh",
    reason: "Pewarnaan digital, tata cahaya 3D, dan color grading menuntut identifikasi spektrum visual yang akurat.",
  },
  {
    code: "DPIB",
    name: "Desain Pemodelan dan Informasi Bangunan",
    slug: "desain-pemodelan-informasi-bangunan",
    isStrict: true,
    requirementLabel: "Wajib Bebas Buta Warna Penuh",
    reason: "Penggambaran denah arsitektur memakai standar layer warna teknis untuk membedakan struktur, mekanikal, dan elektrikal.",
  },
  {
    code: "TAV",
    name: "Teknik Audio Video",
    slug: "teknik-audio-video",
    isStrict: true,
    requirementLabel: "Wajib Bebas Buta Warna Penuh",
    reason: "Pembacaan kode warna resistor, komponen mikrokontroler, dan perakitan kabel audio video bertegangan listrik.",
  },
  {
    code: "TEI",
    name: "Teknik Elektronika Industri",
    slug: "teknik-elektronika-industri",
    isStrict: true,
    requirementLabel: "Wajib Bebas Buta Warna Penuh",
    reason: "Instalasi PLC, panel otomasi pabrik, dan kabel instrumen industri berisiko fatal jika terjadi kesalahan sambung.",
  },
  {
    code: "TITL",
    name: "Teknik Instalasi Tenaga Listrik",
    slug: "teknik-instalasi-tenaga-listrik",
    isStrict: true,
    requirementLabel: "Wajib Bebas Buta Warna Penuh",
    reason: "Pedoman Umum Instalasi Listrik (PUIL) menetapkan standar warna ketat untuk kabel fasa, netral, dan pengaman tanah.",
  },
  {
    code: "TPM",
    name: "Teknik Pemesinan",
    slug: "teknik-pemesinan",
    isStrict: true,
    requirementLabel: "Wajib Bebas Buta Warna Penuh",
    reason: "Pengoperasian mesin bubut, frais, dan CNC memerlukan ketelitian membaca lampu indikator keselamatan kerja bengkel.",
  },
  {
    code: "TKR",
    name: "Teknik Kendaraan Ringan",
    slug: "teknik-kendaraan-ringan",
    isStrict: true,
    requirementLabel: "Wajib Bebas Buta Warna Penuh",
    reason: "Diagnosis rangkaian kelistrikan mobil, sistem injeksi elektronik, dan wiring bodi menuntut pembacaan warna kabel.",
  },
  {
    code: "TSM",
    name: "Teknik Sepeda Motor",
    slug: "teknik-sepeda-motor",
    isStrict: true,
    requirementLabel: "Wajib Bebas Buta Warna Penuh",
    reason: "Rangkaian kabel bodi sepeda motor modern menggunakan kombinasi kode warna garis untuk sensor dan pengapian.",
  },
  {
    code: "TKJ",
    name: "Teknik Komputer dan Jaringan",
    slug: "teknik-komputer-dan-jaringan",
    isStrict: true,
    requirementLabel: "Wajib Bebas Buta Warna Penuh",
    reason: "Pemasangan konektor kabel UTP standar T568A dan T568B serta penyambungan serat optik melibatkan 8 warna kabel kecil.",
  },
  {
    code: "RPL",
    name: "Rekayasa Perangkat Lunak",
    slug: "rekayasa-perangkat-lunak",
    isStrict: false,
    requirementLabel: "Buta Warna Parsial Dipertimbangkan",
    reason: "Pembelajaran berfokus pada logika algoritma pemrograman, basis data, dan rekayasa software dengan bantuan alat bantu visual.",
  },
  {
    code: "TKP",
    name: "Teknik Konstruksi dan Perumahan",
    slug: "teknik-konstruksi-dan-perumahan",
    isStrict: false,
    requirementLabel: "Buta Warna Parsial Dipertimbangkan",
    reason: "Pekerjaan konstruksi batu, beton, dan kayu bertoleransi lebih tinggi terhadap persepsi warna dibanding instalasi kelistrikan.",
  },
];

type AdmissionFaq = {
  question: string;
  answer: string;
};

const admissionFaqs: AdmissionFaq[] = [
  {
    question: "Berapa banyak jurusan yang bisa dipilih saat pendaftaran?",
    answer:
      "Pada Jalur Prestasi Nilai Akademik jenjang SMK Negeri, calon murid dapat memilih maksimal 3 kompetensi keahlian dalam 1 sekolah atau tersebar pada sekolah berbeda. Pada Jalur Afirmasi atau Perpindahan Tugas, calon murid hanya dapat memilih 1 kompetensi keahlian.",
  },
  {
    question: "Apakah ada tes fisik, tes akademik mandiri, atau wawancara di sekolah?",
    answer:
      "Untuk seleksi reguler PPDB Jawa Timur, tidak ada tes tulis tambahan di sekolah. Seleksi berlangsung terpusat secara daring melalui sistem provinsi. Pemeriksaan fisik hanya dilakukan saat penyerahan berkas daftar ulang setelah dinyatakan diterima, khususnya verifikasi surat bebas buta warna.",
  },
  {
    question: "Apakah Kartu Keluarga (KK) wajib diterbitkan paling singkat 1 tahun?",
    answer:
      "Ya. Sesuai petunjuk teknis resmi Dinas Pendidikan Provinsi Jawa Timur, Kartu Keluarga wajib berumur paling sedikit 1 tahun sebelum tanggal pendaftaran tahap pertama dimulai. Ketentuan ini berlaku mutlak pada Jalur Domisili dan Jalur Afirmasi.",
  },
  {
    question: "Apakah seluruh proses pendaftaran PPDB di SMKN 2 Surabaya dipungut biaya?",
    answer:
      "Tidak ada pungutan biaya sama sekali. Seluruh tahapan pendaftaran, mulai dari verifikasi dokumen, pengambilan PIN, seleksi daring, hingga daftar ulang di SMKN 2 Surabaya adalah 100% bebas biaya.",
  },
  {
    question: "Bagaimana alur pendaftaran bagi lulusan dari luar Kota Surabaya atau luar Jawa Timur?",
    answer:
      "Lulusan luar Surabaya atau luar Jatim tetap dapat mendaftar. Langkah awal adalah melakukan pra-pendaftaran di portal spmbjatim.net untuk verifikasi nilai rapor semester 1 sampai 5 dan validasi Kartu Keluarga, kemudian memperoleh PIN sebelum periode pendaftaran dibuka.",
  },
  {
    question: "Apakah nilai rapor pada data arsip merupakan batas passing grade mutlak?",
    answer:
      "Bukan. Angka terendah dan tertinggi pada data arsip merupakan catatan statistik penerimaan tahun sebelumnya. Batas kelulusan setiap tahunnya bergerak dinamis mengikuti rerata nilai para pendaftar baru yang masuk ke sistem.",
  },
];

function formatScoreInput(val: string): string {
  const clean = val.replace(",", ".").replace(/[^0-9.]/g, "");
  if (clean.includes(".")) {
    const parts = clean.split(".");
    const intPart = parts[0].slice(0, 2);
    const decPart = parts.slice(1).join("").slice(0, 2);
    return `${intPart}.${decPart}`;
  }
  if (clean.length > 2) {
    return `${clean.slice(0, 2)}.${clean.slice(2, 4)}`;
  }
  return clean.slice(0, 2);
}

export function AdmissionHub() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const [raporInput, setRaporInput] = useState<string>("89.50");
  const [tkaInput, setTkaInput] = useState<string>("90.00");

  const raporScore = useMemo(() => {
    const parsed = parseFloat(raporInput.replace(",", "."));
    return Number.isNaN(parsed) ? 0 : Math.min(100, Math.max(0, parsed));
  }, [raporInput]);

  const tkaScore = useMemo(() => {
    const parsed = parseFloat(tkaInput.replace(",", "."));
    return Number.isNaN(parsed) ? 0 : Math.min(100, Math.max(0, parsed));
  }, [tkaInput]);

  const calculatedComposite = useMemo(() => {
    return Number((raporScore * 0.6 + tkaScore * 0.4).toFixed(2));
  }, [raporScore, tkaScore]);

  const historical2025 = admissionSnapshots.find((s) => s.year === "2025");

  return (
    <div className="space-y-20 lg:space-y-28">
      {/* 1. Tiga Ketentuan Pokok */}
      <dl className="grid border-y border-ink/15 sm:grid-cols-3">
        <div className="border-b border-ink/10 py-6 sm:border-b-0 sm:border-r sm:pr-6">
          <dt className="text-xs font-bold uppercase tracking-wider text-ink-muted">Biaya Registrasi</dt>
          <dd className="mt-2 text-2xl font-extrabold tracking-tight text-ink-strong">100% Bebas Biaya</dd>
          <dd className="mt-1 text-sm font-normal text-ink-muted">Tidak dipungut biaya pada setiap tahapan seleksi</dd>
        </div>
        <div className="border-b border-ink/10 py-6 sm:border-b-0 sm:border-r sm:px-6">
          <dt className="text-xs font-bold uppercase tracking-wider text-ink-muted">Pilihan Keahlian</dt>
          <dd className="mt-2 text-2xl font-extrabold tracking-tight text-ink-strong">Hingga 3 Pilihan</dd>
          <dd className="mt-1 text-sm font-normal text-ink-muted">Dapat dalam 1 sekolah atau sekolah yang berbeda</dd>
        </div>
        <div className="py-6 sm:pl-6">
          <dt className="text-xs font-bold uppercase tracking-wider text-ink-muted">Ketentuan Kesehatan</dt>
          <dd className="mt-2 text-2xl font-extrabold tracking-tight text-ink-strong">Surat Bebas Buta Warna</dd>
          <dd className="mt-1 text-sm font-normal text-ink-muted">Pemeriksaan fisik dokter pemerintah atau puskesmas</dd>
        </div>
      </dl>

      {/* 2. Alokasi 5 Jalur Penerimaan */}
      <section id="jalur-pendaftaran" aria-labelledby="heading-jalur">
        <div className="border-b border-ink/15 pb-6">
          <p className="eyebrow">Alokasi Resmi</p>
          <h2
            id="heading-jalur"
            className="mt-2 text-[clamp(1.9rem,3.4vw,2.8rem)] font-extrabold leading-[1.08] tracking-tight text-ink-strong"
          >
            5 Jalur Penerimaan Siswa Baru
          </h2>
          <p className="mt-3 max-w-3xl text-base font-normal leading-7 text-ink-muted">
            Alokasi kuota dan ketentuan pendaftaran peserta didik baru SMK Negeri.
          </p>
        </div>

        <div className="divide-y divide-ink/15 border-b border-ink/15">
          {admissionTracks.map((track) => (
            <article key={track.id} className="py-10 first:pt-8 last:pb-12">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-strong">
                  Alokasi Kuota: {track.quotaPercent}
                </span>
                <h3 className="mt-1 text-2xl font-extrabold tracking-tight text-ink-strong">
                  {track.name}
                </h3>
                <p className="mt-1 text-sm text-ink-muted">{track.quotaDescription}</p>
              </div>

              <div className="mt-6 grid gap-8 lg:grid-cols-2">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-ink-strong">
                    Ketentuan dan Tata Cara
                  </h4>
                  <ul className="mt-3 space-y-2.5">
                    {track.rules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm font-normal leading-6 text-ink-muted">
                        <span className="font-bold text-primary-strong">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-ink/10 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-ink-strong">
                    Kelengkapan Berkas
                  </h4>
                  <ul className="mt-3 space-y-2.5">
                    {track.documents.map((doc, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm font-normal leading-6 text-ink-muted">
                        <span className="font-bold text-primary-strong">•</span>
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Alur 5 Langkah Pendaftaran */}
      <section id="alur-pendaftaran" aria-labelledby="heading-alur">
        <div className="border-b border-ink/15 pb-6">
          <p className="eyebrow">Tahapan Pelaksanaan</p>
          <h2
            id="heading-alur"
            className="mt-2 text-[clamp(1.9rem,3.4vw,2.8rem)] font-extrabold leading-[1.08] tracking-tight text-ink-strong"
          >
            Alur 5 Langkah Pendaftaran
          </h2>
          <p className="mt-3 max-w-3xl text-base font-normal leading-7 text-ink-muted">
            Tahapan resmi mulai dari verifikasi PIN hingga daftar ulang fisik di kampus.
          </p>
        </div>

        <ol className="mt-8 grid border-b border-ink/15 sm:grid-cols-2 lg:grid-cols-5">
          {[
            {
              step: "01",
              title: "Pengambilan PIN",
              desc: "Unggah KK dan verifikasi nilai rapor SMP di portal spmbjatim.net.",
            },
            {
              step: "02",
              title: "Simulasi Pendaftaran",
              desc: "Latihan pemilihan sekolah dan jurusan sebelum periode resmi.",
            },
            {
              step: "03",
              title: "Pendaftaran Jalur",
              desc: "Pilih jalur dan kompetensi keahlian sesuai jadwal tahapan.",
            },
            {
              step: "04",
              title: "Pengumuman Hasil",
              desc: "Lihat hasil seleksi daring dan unduh bukti penerimaan.",
            },
            {
              step: "05",
              title: "Daftar Ulang Fisik",
              desc: "Hadir ke kampus untuk verifikasi berkas asli dan lapor diri.",
            },
          ].map((item, idx) => (
            <li
              key={item.step}
              className={`border-b border-ink/10 py-6 sm:pr-6 lg:border-b-0 lg:border-r lg:px-5 lg:first:pl-0 lg:last:border-r-0 ${
                idx % 2 === 1 ? "sm:border-r-0 lg:border-r" : ""
              }`}
            >
              <span className="font-mono text-2xl font-black text-primary-strong">{item.step}</span>
              <h3 className="mt-3 text-base font-bold text-ink-strong">{item.title}</h3>
              <p className="mt-2 text-sm font-normal leading-6 text-ink-muted">{item.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 4. Kalkulator Mandiri Nilai Gabungan: Input Teks Bersih Tanpa Arrow/Spinner */}
      <section id="simulasi-nilai" aria-labelledby="heading-simulasi">
        <div className="border-b border-ink/15 pb-6">
          <p className="eyebrow">Simulasi Mandiri</p>
          <h2
            id="heading-simulasi"
            className="mt-2 text-[clamp(1.9rem,3.4vw,2.8rem)] font-extrabold leading-[1.08] tracking-tight text-ink-strong"
          >
            Kalkulator Nilai Gabungan Akademik
          </h2>
          <p className="mt-3 max-w-3xl text-base font-normal leading-7 text-ink-muted">
            Formula seleksi akademik: 60% rerata rapor dan 40% nilai TKA atau indeks sekolah.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-stretch">
          {/* Kolom Kiri: Input Nilai Langsung Tanpa Tombol Arrow/Spinner */}
          <div className="flex flex-col justify-between border border-ink/15 bg-white p-6 sm:p-8">
            <div>
              <div className="border-b border-ink/10 pb-4">
                <h3 className="text-base font-bold text-ink-strong">Parameter Nilai Calon Murid</h3>
                <p className="mt-1 text-sm text-ink-muted">
                  Masukkan nilai rapor dan TKA Anda.
                </p>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="rapor-score" className="text-sm font-bold text-ink-strong">
                      Rerata Nilai Rapor SMP (Semester 1 - 5)
                    </label>
                    <span className="text-xs font-bold text-primary-strong">Bobot 60%</span>
                  </div>
                  <div className="mt-2 border border-ink/20 bg-white focus-within:border-primary-strong">
                    <input
                      id="rapor-score"
                      type="text"
                      inputMode="decimal"
                      maxLength={5}
                      value={raporInput}
                      onChange={(e) => setRaporInput(formatScoreInput(e.target.value))}
                      className="w-full bg-transparent px-4 py-3 text-base font-bold text-ink-strong focus:outline-none"
                      placeholder="89.50"
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-ink-muted">
                    Mata pelajaran: Agama, PPKn, Bahasa Indonesia, Matematika, IPA, IPS, dan Bahasa Inggris.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="tka-score" className="text-sm font-bold text-ink-strong">
                      Nilai TKA / Indeks Sekolah Asal
                    </label>
                    <span className="text-xs font-bold text-primary-strong">Bobot 40%</span>
                  </div>
                  <div className="mt-2 border border-ink/20 bg-white focus-within:border-primary-strong">
                    <input
                      id="tka-score"
                      type="text"
                      inputMode="decimal"
                      maxLength={5}
                      value={tkaInput}
                      onChange={(e) => setTkaInput(formatScoreInput(e.target.value))}
                      className="w-full bg-transparent px-4 py-3 text-base font-bold text-ink-strong focus:outline-none"
                      placeholder="90.00"
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-ink-muted">
                    Berdasarkan nilai tes kemampuan akademik atau rerata indeks akreditasi sekolah asal.
                  </p>
                </div>
              </div>
            </div>

            {/* Hasil Perhitungan Kontras Solid Sesuai Desain Awal */}
            <div className="mt-8 border border-ink/15 bg-ink-strong p-6 text-white">
              <div className="flex items-center justify-between border-b border-white/15 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-white/70">
                  Estimasi Nilai Gabungan
                </span>
                <span className="text-xs text-white/70">
                  (60% × {raporScore.toFixed(2)}) + (40% × {tkaScore.toFixed(2)})
                </span>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-4xl font-black tracking-tight text-white">
                  {calculatedComposite.toLocaleString("id-ID", { minimumFractionDigits: 2 })}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-white/60">
                  Skala 100.00
                </span>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Komparasi 11 Program Keahlian */}
          <div className="flex flex-col justify-between border border-ink/15 bg-white p-6 sm:p-8">
            <div>
              <div className="border-b border-ink/10 pb-4">
                <h3 className="text-base font-bold text-ink-strong">
                  Komparasi Terhadap Nilai Arsip 2025
                </h3>
                <p className="mt-1 text-sm text-ink-muted">
                  Perbandingan dengan nilai terendah arsip 2025.
                </p>
              </div>

              <div className="mt-4 divide-y divide-ink/10">
                {historical2025?.programs.map((item) => {
                  const diff = calculatedComposite - item.lowestScore;
                  const isAbove = diff >= 0;

                  return (
                    <div
                      key={item.program}
                      className="flex items-center justify-between py-2.5"
                    >
                      <div className="pr-4">
                        <p className="text-sm font-bold text-ink-strong">{item.program}</p>
                        <p className="text-xs text-ink-muted">
                          Batas terendah 2025: {item.lowestScore.toFixed(2)} · Pagu: {item.academicQuota}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span
                          className={`text-sm font-bold ${
                            isAbove ? "text-emerald-700" : "text-rose-700"
                          }`}
                        >
                          {isAbove ? `+${diff.toFixed(2)}` : diff.toFixed(2)}
                        </span>
                        <Link
                          href={`/jurusan/${colorBlindGuide.find((g) => g.name.toLowerCase().includes(item.program.toLowerCase()))?.slug ?? "rekayasa-perangkat-lunak"}`}
                          className="text-xs font-semibold text-primary-strong hover:underline"
                        >
                          Lihat
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Ketentuan Bebas Buta Warna */}
      <section id="persyaratan-buta-warna" aria-labelledby="heading-buta-warna">
        <div className="border-b border-ink/15 pb-6">
          <p className="eyebrow">Kesehatan Visual Kejuruan</p>
          <h2
            id="heading-buta-warna"
            className="mt-2 text-[clamp(1.9rem,3.4vw,2.8rem)] font-extrabold leading-[1.08] tracking-tight text-ink-strong"
          >
            Ketentuan Buta Warna Tiap Jurusan
          </h2>
          <p className="mt-3 max-w-3xl text-base font-normal leading-7 text-ink-muted">
            Syarat kesehatan visual demi keselamatan kerja praktik kejuruan.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {colorBlindGuide.map((item) => (
            <article
              key={item.code}
              className="flex flex-col justify-between border border-ink/10 bg-white p-5"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-ink-strong">{item.code}</span>
                  <span
                    className={`text-xs font-extrabold ${
                      item.isStrict ? "text-rose-700" : "text-emerald-700"
                    }`}
                  >
                    {item.requirementLabel}
                  </span>
                </div>

                <h3 className="mt-3 text-base font-bold text-ink-strong">{item.name}</h3>
                <p className="mt-2 text-sm font-normal leading-6 text-ink-muted">{item.reason}</p>
              </div>

              <div className="mt-4 border-t border-ink/10 pt-3">
                <Link
                  href={`/jurusan/${item.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-strong hover:underline"
                >
                  Kurikulum dan profil jurusan
                  <ArrowRightIcon className="size-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. Tanya Jawab Calon Siswa */}
      <section id="faq-ppdb" aria-labelledby="heading-faq">
        <div className="border-b border-ink/15 pb-6">
          <p className="eyebrow">Tanya Jawab</p>
          <h2
            id="heading-faq"
            className="mt-2 text-[clamp(1.9rem,3.4vw,2.8rem)] font-extrabold leading-[1.08] tracking-tight text-ink-strong"
          >
            Pertanyaan Calon Siswa Baru
          </h2>
          <p className="mt-3 max-w-2xl text-base font-normal leading-7 text-ink-muted">
            Pertanyaan seputar proses seleksi dan ketentuan pendaftaran.
          </p>
        </div>

        <div className="mt-6 space-y-3">
          {admissionFaqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;

            return (
              <div
                key={faq.question}
                className="border border-ink/10 bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left text-base font-bold text-ink-strong focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <span>{faq.question}</span>
                  <span
                    className={`flex size-6 shrink-0 items-center justify-center border border-ink/15 text-sm font-bold transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-ink/10 px-5 pb-5 pt-3 text-sm font-normal leading-7 text-ink-muted">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Posko Layanan Sekolah */}
      <section
        id="posko-helpdesk"
        aria-labelledby="heading-helpdesk"
        className="border border-ink/10 bg-ink-strong p-6 text-white sm:p-8 lg:p-10"
      >
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-accent-soft">
              Layanan Informasi Luring
            </span>
            <h2 id="heading-helpdesk" className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
              Posko Pelayanan PPDB SMKN 2 Surabaya
            </h2>
            <p className="mt-3 text-sm font-normal leading-6 text-white/80">
              Layanan konsultasi luring dan verifikasi berkas di kampus SMKN 2 Surabaya.
            </p>

            <div className="mt-5 space-y-2 text-sm font-normal text-white/90">
              <p>Alamat: Ruang Pelayanan SMKN 2 Surabaya, Jl. Tentara Genie Pelajar No. 26, Surabaya</p>
              <p>Waktu Layanan: Hari kerja (Senin sampai Jumat), pukul 08.00 sampai 15.00 WIB</p>
              <p>Telepon Kantor: (031) 5343708</p>
            </div>
          </div>

          <div className="border border-white/15 bg-white/5 p-5">
            <h3 className="text-sm font-bold text-white">Panduan Kehadiran di Posko Sekolah</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Mengenakan pakaian seragam sekolah asal atau pakaian bebas rapi bersepatu.</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Membawa dokumen asli dan salinan fotokopi (Kartu Keluarga, SKL, dan Rapor SMP).</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Mengambil nomor antrean konsultasi di loket pelayanan terpadu sekolah.</span>
              </li>
            </ul>

            <div className="mt-5 flex flex-wrap gap-3 border-t border-white/10 pt-4">
              <a
                href="https://maps.google.com/?q=-7.2584,112.7256"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-10 items-center gap-1.5 border border-white bg-white px-3.5 text-xs font-bold text-ink-strong hover:bg-white/90"
              >
                Peta Lokasi Kampus
                <ArrowUpRightIcon className="size-3" />
              </a>
              <Link
                href="/tentang/fasilitas"
                className="inline-flex min-h-10 items-center border border-white/30 px-3.5 text-xs font-semibold text-white hover:bg-white/10"
              >
                Lihat Sarana dan Bengkel
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
