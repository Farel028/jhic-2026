export const school = {
  name: "SMK Negeri 2 Surabaya",
  shortName: "SMKN 2 Surabaya",
  identity: "SMEKDA",
  tagline: "SMK Bisa, SMK Hebat, SMKN 2 SBY Smart Berkarakter",
  description:
    "Sekolah menengah kejuruan negeri di Surabaya yang menyiapkan murid melalui pembelajaran vokasi, praktik, dan karya.",
  npsn: "20532203",
  accreditation: "A",
  historicalSince: "1912",
  landArea: "34.500 m²",
  logo: {
    src: "/smkn2sby.png",
    alt: "Logo SMK Negeri 2 Surabaya",
    width: 696,
    height: 790,
  },
  principal: {
    name: "Dr. Dhanu Lukmantoro, S.Kom., ST., M.M.",
    role: "Kepala Sekolah",
    image: {
      src: "/images/school/kepala-sekolah.png",
      alt: "Dr. Dhanu Lukmantoro, Kepala SMK Negeri 2 Surabaya",
      width: 1122,
      height: 1402,
    },
  },
  address: {
    street: "Jl. Tentara Genie Pelajar No. 26",
    district: "Petemon, Sawahan",
    city: "Surabaya",
    province: "Jawa Timur",
    postalCode: "60252",
  },
  contact: {
    phone: "031 5343708",
    phoneHref: "+62315343708",
    email: "smekda.surabaya@gmail.com",
  },
  coordinates: {
    latitude: -7.2584,
    longitude: 112.7256,
  },
  timeZone: "Asia/Jakarta",
  urls: {
    canonical: "https://web.smkn2sby.sch.id",
    smartPortal: "https://smkn2sby.sch.id",
    bkk: "https://bkk.smkn2sby.sch.id",
    admissions: "https://spmbjatim.net",
    instagram: "https://www.instagram.com/smkn2surabaya",
    youtube: "https://www.youtube.com/channel/UCCSWIraIMBHC_q11n55ozQg",
    tiktok: "https://www.tiktok.com/@smknegeri2surabaya",
    x: "https://x.com/smkn2surabaya",
  },
} as const;

export const schoolFacts = [
  { value: school.historicalSince, label: "Akar sejarah sejak" },
  { value: school.accreditation, label: "Akreditasi sekolah" },
  { value: school.landArea, label: "Luas lingkungan sekolah" },
  { value: school.npsn, label: "NPSN" },
] as const;

export const schoolMapUrl = `https://www.google.com/maps/search/?api=1&query=${school.coordinates.latitude},${school.coordinates.longitude}`;
