export type FeaturedPartner = {
  name: string;
  logo: {
    src: string;
    width: number;
    height: number;
  };
};

export const featuredPartners: readonly FeaturedPartner[] = [
  {
    name: "Samsung",
    logo: { src: "/images/partners/samsung.webp", width: 400, height: 64 },
  },
  {
    name: "Toyota",
    logo: { src: "/images/partners/toyota.webp", width: 300, height: 252 },
  },
  {
    name: "Honda",
    logo: { src: "/images/partners/honda.webp", width: 300, height: 272 },
  },
  {
    name: "Yamaha",
    logo: { src: "/images/partners/yamaha.webp", width: 300, height: 300 },
  },
  {
    name: "Sharp",
    logo: { src: "/images/partners/sharp.webp", width: 500, height: 71 },
  },
  {
    name: "Toshiba",
    logo: { src: "/images/partners/toshiba.webp", width: 300, height: 174 },
  },
  {
    name: "Kereta Api Indonesia",
    logo: { src: "/images/partners/kai.webp", width: 600, height: 253 },
  },
  {
    name: "PT INKA (Persero)",
    logo: {
      src: "/images/partners/inka-transparent.webp",
      width: 600,
      height: 188,
    },
  },
] as const;
