import { school } from "@/config/school";

export function SchoolJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: school.name,
    alternateName: [school.shortName, school.identity],
    url: school.urls.canonical,
    logo: `${school.urls.canonical}${school.logo.src}`,
    email: school.contact.email,
    telephone: school.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: school.address.street,
      addressLocality: school.address.city,
      addressRegion: school.address.province,
      postalCode: school.address.postalCode,
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: school.coordinates.latitude,
      longitude: school.coordinates.longitude,
    },
    sameAs: [
      school.urls.smartPortal,
      school.urls.bkk,
      school.urls.instagram,
      school.urls.youtube,
      school.urls.tiktok,
      school.urls.x,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
