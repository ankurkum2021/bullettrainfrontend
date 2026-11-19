import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const DEFAULT_OG_IMAGE = {
  url: "/brand-logo.png",
  width: 1025,
  height: 227,
  alt: `${SITE_NAME} logo`,
} as const;

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
  /** Adds /feed.xml discovery for news pages. */
  rssFeed?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  keywords = [],
  noIndex = false,
  rssFeed = false,
}: PageMetaInput): Metadata {
  const url = `${SITE_URL}${path}`;
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
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
    other: {
      "geo.region": "IN",
    },
  };
}