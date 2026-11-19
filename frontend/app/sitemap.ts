import type { MetadataRoute } from "next";
import { allExploreStationSlugs } from "@/data/explore";
import { INDEXABLE_ROUTES } from "@/lib/indexable-routes";
import { stationExplorePath } from "@/lib/explore-path";
import { SITE_URL } from "@/lib/site";
import { loadCorridorUpdates, updateDetailPath } from "@/lib/updates";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const updates = await loadCorridorUpdates();

  const hubPages = INDEXABLE_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const explorePages = allExploreStationSlugs().map((slug) => ({
    url: `${SITE_URL}${stationExplorePath(slug)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const articlePages = updates.map((item) => ({
    url: `${SITE_URL}${updateDetailPath(item.id)}`,
    lastModified: new Date(item.date),
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  return [...hubPages, ...explorePages, ...articlePages];
}