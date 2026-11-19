import { stationExplorePath } from "@/lib/explore-path";

export function exploreCategorySectionId(stationSlug: string, categoryId: string): string {
  return `explore-${stationSlug}-${categoryId}`;
}

export function exploreCategoryHref(stationSlug: string, categoryId: string): string {
  return `${stationExplorePath(stationSlug)}#${exploreCategorySectionId(stationSlug, categoryId)}`;
}