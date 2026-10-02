import type { MetadataRoute } from "next";
import { school } from "@/config/school";
import { extracurricularDetails } from "@/data/extracurriculars";
import { majorDetails } from "@/data/majors";
import { practiceStories } from "@/data/practice-stories";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? school.urls.canonical;
  const aboutRoutes = [
    "/tentang/profil",
    "/tentang/kurikulum",
    "/tentang/fasilitas",
    "/tentang/sejarah",
  ] as const;
  const studentRoutes = [
    "/siswa/ekstrakurikuler",
    "/siswa/karya",
    "/siswa/prestasi",
    "/siswa/lulusan-terbaik",
    "/siswa/alumni",
  ] as const;
  const informationRoutes = ["/informasi/spmb", "/informasi/bkk", "/informasi/pkl", "/produk"] as const;
  const publicationRoutes = ["/berita", "/peta-sekolah"] as const;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  return [
    ...staticRoutes,
    ...aboutRoutes.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "/tentang/profil" ? 0.9 : 0.8,
    })),
    ...studentRoutes.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "/siswa/prestasi" ? 0.9 : 0.8,
    })),
    ...informationRoutes.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...publicationRoutes.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...majorDetails.map((major) => ({
      url: `${baseUrl}/jurusan/${major.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      url: `${baseUrl}/produk/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...extracurricularDetails.map((item) => ({
      url: `${baseUrl}/ekstrakurikuler/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...practiceStories.map((story) => ({
      url: `${baseUrl}/berita/${story.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
