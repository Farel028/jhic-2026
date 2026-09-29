import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.72"],
  output: "standalone",
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/panda/:path*.webm",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, s-maxage=604800, stale-while-revalidate=86400" }],
      },
      {
        source: "/tours/:path*.webm",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, s-maxage=604800, stale-while-revalidate=86400" }],
      },
      {
        source: "/tours/:path*.jpg",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, s-maxage=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
