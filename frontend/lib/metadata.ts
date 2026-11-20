import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const DEFAULT_OG_IMAGE = {
  url: "/brand-logo.png",
  width: 1025,
  height: 227,
  alt: `${SITE_NAME} logo`,
} as const;

type OgImageInput = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
  /** Adds /feed.xml discovery for news pages. */
  rssFeed?: boolean;
  ogImage?: OgImageInput;
};

function resolveOgImage(ogImage?: OgImageInput) {
  if (!ogImage?.url) return DEFAULT_OG_IMAGE;
  const absolute = ogImage.url.startsWith("http") ? ogImage.url : `${SITE_URL}${ogImage.url}`;
  return {
    url: absolute,
    width: ogImage.width ?? 1200,
    height: ogImage.height ?? 630,
    alt: ogImage.alt ?? SITE_NAME,
  };
}

export function pageMetadata({
  title,
  description,
  path,
  keywords = [],
  noIndex = false,
  rssFeed = false,
  ogImage,
}: PageMetaInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const openGraphImage = resolveOgImage(ogImage);
  const titleField =
    path === "/" ? { absolute: title } : title;
  const ogTitle = path === "/" ? title : `${title} | ${SITE_NAME}`;

  return {
    title: titleField,
    description,
    keywords: keywords.length ? keywords.slice(0, 30) : undefined,
    alternates: {
      canonical: url,
      ...(rssFeed ? { types: { "application/rss+xml": `${SITE_URL}/feed.xml` } } : {}),
    },
    robots: noIndex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
        },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      siteName: SITE_NAME,
      title: ogTitle,
      description,
      images: [openGraphImage],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [openGraphImage.url],
    },
    other: {
      "geo.region": "IN",
    },
  };
}