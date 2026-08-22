import rawInstagramPosts from "../../ig.json";

type RawInstagramPost = {
  alt: string;
  displayUrl: string;
  images: string[];
  url: string;
  type: "Image" | "Sidecar" | "Video";
};

export type InstagramPost = {
  id: string;
  dateLabel: string;
  image: {
    src: string;
    alt: string;
  };
  mediaType: "image" | "carousel" | "video";
  permalink: string;
  publishedAt: number;
};

const monthIndexes: Record<string, number> = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const localImagesByPostId: Record<string, string> = {
  DcQVOv8RfO8: "/images/temp-ig/1.jpg",
  DcLBeHEhi6w: "/images/temp-ig/2.webp",
  DcJCnVtoL0q: "/images/temp-ig/3.jpg",
  DcIgNV2RUj_: "/images/temp-ig/4.jpg",
  DcIei0akRMU: "/images/temp-ig/5.jpg",
  DcDpttVor9Y: "/images/temp-ig/6.jpg",
};

function getPublishedAt(alt: string) {
  const match = alt.match(/\bon ([A-Z][a-z]+) (\d{1,2}), (\d{4})\./);

  if (!match) {
    return 0;
  }

  const [, month, day, year] = match;
  const monthIndex = monthIndexes[month];

  if (monthIndex === undefined) {
    return 0;
  }

  return Date.UTC(Number(year), monthIndex, Number(day));
}

function getMediaType(type: RawInstagramPost["type"]): InstagramPost["mediaType"] {
  if (type === "Video") {
    return "video";
  }

  if (type === "Sidecar") {
    return "carousel";
  }

  return "image";
}

function getPostId(url: string) {
  return url.match(/\/p\/([^/]+)/)?.[1] ?? url;
}

export const instagramPosts: InstagramPost[] = (rawInstagramPosts as RawInstagramPost[])
  .map((post) => {
    const id = getPostId(post.url);
    const localImage = localImagesByPostId[id];

    if (!localImage) {
      return null;
    }

    const publishedAt = getPublishedAt(post.alt);
    const dateLabel = publishedAt ? dateFormatter.format(publishedAt) : "Tanggal tidak tersedia";
    const mediaType = getMediaType(post.type);

    return {
      id,
      dateLabel,
      image: {
        src: localImage,
        alt: `Posting ${mediaType === "video" ? "video" : mediaType === "carousel" ? "carousel" : "foto"} Instagram terkait SMKN 2 Surabaya pada ${dateLabel}`,
      },
      mediaType,
      permalink: post.url,
      publishedAt,
    };
  })
  .filter((post): post is InstagramPost => post !== null)
  .sort((firstPost, secondPost) => secondPost.publishedAt - firstPost.publishedAt);
