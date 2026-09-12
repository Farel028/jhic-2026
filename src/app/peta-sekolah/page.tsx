import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbJsonLd } from '@/components/seo/breadcrumb-json-ld';
import { withPageTwitter } from '@/lib/metadata';
import CampusMap from '@/features/campus-map/campus-map';
import styles from '@/features/campus-map/campus-map.module.css';

export const metadata: Metadata = withPageTwitter({
  title:'Peta Sekolah Interaktif',
  description:'Jelajahi denah SMK Negeri 2 Surabaya dalam 3D. Cari ruang, lihat kategori, dan bandingkan dengan gambar denah asli.',
  alternates:{canonical:'/peta-sekolah'},
  openGraph:{title:'Peta Sekolah SMK Negeri 2 Surabaya',description:'Denah interaktif ruang dan area sekolah berdasarkan gambar sumber.',url:'/peta-sekolah'},
});
export default function SchoolMapPage(){
  return <main id="konten-utama" className={styles.page}>
    <BreadcrumbJsonLd items={[{name:'Beranda',path:'/'},{name:'Peta Sekolah',path:'/peta-sekolah'}]}/>
    <nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/">Beranda</Link><span aria-hidden="true">/</span><span aria-current="page">Peta Sekolah</span></nav>
    <header className={styles.intro}><h1>Temukan ruang.<br/>Kenali sekolah.</h1><p>Jelajahi denah tiga dimensi, dari ruang belajar hingga taman. Pilih ruang untuk melihat detailnya.</p></header>
    <CampusMap/>
  </main>;
}
