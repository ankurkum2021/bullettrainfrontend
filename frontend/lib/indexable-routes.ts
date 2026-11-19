import type { MetadataRoute } from "next";

/** Hub pages in sitemap + footer crawl links. Station explore URLs are added in `app/sitemap.ts`. */
export const INDEXABLE_ROUTES: {
  path: string;
  label: string;
  description: string;
  changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"];
  priority: number;
}[] = [
  {
    path: "/",
    label: "Home",
    description: "MAHSR corridor explorer — stations, opening timeline, and updates",
    changeFrequency: "daily",
    priority: 1,
  },
  {
    path: "/updates",
    label: "Updates",
    description: "NHSRCL and corridor progress news",
    changeFrequency: "daily",
    priority: 0.85,
  },
  {
    path: "/stations",
    label: "Stations",
    description: "MAHSR station guides and construction progress",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    path: "/opening-date",
    label: "Opening timeline",
    description: "Bullet train kab shuru hogi — official MAHSR opening targets",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    path: "/contact",
    label: "Contact",
    description: "Listings, corrections, and enquiries",
    changeFrequency: "monthly",
    priority: 0.7,
  },
];