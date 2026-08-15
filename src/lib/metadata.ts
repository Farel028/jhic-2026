import type { Metadata } from "next";
import { school } from "@/config/school";

export function withPageTwitter(metadata: Metadata): Metadata {
  return {
    ...metadata,
    twitter: {
      card: "summary",
      title: metadata.openGraph?.title,
      description: metadata.openGraph?.description,
      images: [school.logo.src],
    },
  };
}
