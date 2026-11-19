import { INDEXABLE_ROUTES } from "@/lib/indexable-routes";
import { stationExplorePath } from "@/lib/explore-path";
import { ORG_DISCLAIMER, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import type { Station } from "@/data/stations";

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_TAGLINE,
    inLanguage: "en-IN",
    publisher: organizationSchema(),
  };
}

export function organizationSchema() {
  return {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: ORG_DISCLAIMER,
  };
}

export function webPageSchema({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${SITE_URL}${path}`,
    isPartOf: { "@type": "WebSite", url: SITE_URL, name: SITE_NAME },
    inLanguage: "en-IN",
  };
}

/** One crawlable URL; each station is a ListItem with a fragment URL for discoverability. */
export function stationHubSchema(stations: Station[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Mumbai–Ahmedabad bullet train stations (MAHSR)",
    description:
      "All twelve passenger stations on the 508 km MAHSR corridor, from Mumbai BKC to Sabarmati.",
    numberOfItems: stations.length,
    itemListElement: stations.map((station, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: station.seoHeading,
      url: `${SITE_URL}${stationExplorePath(station.slug)}`,
      item: trainStationSchema(station, { pagePath: stationExplorePath(station.slug) }),
    })),
  };
}

export function trainStationSchema(station: Station, opts?: { pagePath?: string }) {
  const pagePath = opts?.pagePath ?? `/stations#${station.slug}`;
  return {
    "@type": "TrainStation",
    name: station.name,
    description: station.summary,
    url: `${SITE_URL}${pagePath}`,
    ...(station.geo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: station.geo.lat,
            longitude: station.geo.lng,
          },
        }
      : {}),
    containedInPlace: {
      "@type": "State",
      name: station.stateName,
    },
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/** Helps crawlers discover the small set of indexable URLs from the home page. */
export function sitePagesItemListSchema() {
  const pages = INDEXABLE_ROUTES.filter((r) => r.path !== "/");
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Bullet Train Station site pages",
    numberOfItems: pages.length,
    itemListElement: pages.map((page, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: page.label,
      description: page.description,
      url: `${SITE_URL}${page.path}`,
    })),
  };
}

export function newsArticleSchema(article: {
  id: string;
  title: string;
  summary: string;
  date: string;
  sourceUrl: string;
  body?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.summary,
    articleBody: article.body || article.summary,
    datePublished: article.date,
    url: `${SITE_URL}/updates/${article.id}`,
    mainEntityOfPage: `${SITE_URL}/updates/${article.id}`,
    isAccessibleForFree: true,
    inLanguage: "en-IN",
    publisher: organizationSchema(),
    citation: article.sourceUrl,
    isBasedOn: article.sourceUrl,
  };
}

export function updatesItemListSchema(
  items: { id: string; title: string; summary: string; date: string; sourceUrl: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Bullet train corridor updates",
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "NewsArticle",
        headline: item.title,
        description: item.summary,
        datePublished: item.date,
        url: `${SITE_URL}/updates/${item.id}`,
        mainEntityOfPage: `${SITE_URL}/updates/${item.id}`,
        isAccessibleForFree: true,
        publisher: organizationSchema(),
        citation: item.sourceUrl,
      },
    })),
  };
}