export type {
  StationExploreCategory,
  StationExploreItem,
  StationExploreProfile,
} from "@/data/station-explore-types";

import type { StationExploreProfile } from "@/data/station-explore-types";

/** Shown when the API has no listings yet — not a content fallback. */
export function emptyExploreProfile(cityName?: string): StationExploreProfile {
  const name = cityName?.trim() || "this station";
  return {
    lead: `Listings for ${name} will appear here when loaded from the database.`,
    categories: [],
  };
}

/**
 * @deprecated Runtime UI must use `loadStationExploreProfile` / API only.
 * Export pipeline uses `station-explore-profiles.ts` directly.
 */
export function stationExploreBySlug(slug: string, cityName?: string): StationExploreProfile {
  return emptyExploreProfile(cityName || slug.replace(/-/g, " "));
}