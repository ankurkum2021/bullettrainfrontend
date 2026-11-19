import type { IconName } from "@/components/icons/BtsIcon";
import { EXPLORE_IMAGES, type ExploreImage } from "@/data/explore-images";
import {
  emptyExploreProfile,
  type StationExploreCategory,
  type StationExploreItem,
  type StationExploreProfile,
} from "@/data/station-explore";
import {
  fetchStationPlaces,
  type BtsPlace,
  type BtsPlacePanel,
  type BtsStationPlaces,
} from "@/lib/bts-api";

const KIND_ICON: Record<string, IconName> = {
  transport: "cab",
  lodging: "hotel",
  food_and_drink: "restaurant",
  industry: "store",
  commerce: "pin",
  logistics: "route",
  aviation: "pin",
  landmark: "compass",
  other: "info",
};

const KIND_IMAGE: Record<string, keyof typeof EXPLORE_IMAGES> = {
  transport: "highway",
  lodging: "hotel",
  food_and_drink: "thali",
  industry: "midc",
  commerce: "diamond",
  logistics: "highway",
  aviation: "airport",
  landmark: "hotel",
  other: "highway",
};

function iconForApi(raw: string, kind: string): IconName {
  const mapped = (CATEGORY_ICON_SAFE[raw] ?? KIND_ICON[kind]) as IconName | undefined;
  if (mapped && isIconName(mapped)) return mapped;
  return KIND_ICON[kind] ?? "info";
}

const CATEGORY_ICON_SAFE: Record<string, IconName> = {
  cab: "cab",
  hotel: "hotel",
  restaurant: "restaurant",
  cafe: "cafe",
  pin: "pin",
  midc: "store",
  highway: "route",
  airport: "pin",
  diamond: "pin",
  compass: "compass",
  info: "info",
  store: "store",
  hammer: "hammer",
};

const ICON_NAMES = new Set<IconName>([
  "train",
  "pin",
  "compass",
  "calendar",
  "stations",
  "cab",
  "hotel",
  "restaurant",
  "cafe",
  "news",
  "home",
  "arrow",
  "external",
  "info",
  "route",
  "phone",
  "whatsapp",
  "hammer",
  "store",
  "shield",
  "flag",
  "arrow-up",
]);

function isIconName(value: string): value is IconName {
  return ICON_NAMES.has(value as IconName);
}

function imageForPlace(place: BtsPlace): ExploreImage | undefined {
  const key = KIND_IMAGE[place.kind] ?? "highway";
  return EXPLORE_IMAGES[key];
}

function placeToItem(place: BtsPlace, stationSlug: string): StationExploreItem {
  return {
    id: `${stationSlug}-${place.slug}`,
    name: place.name,
    note: place.note,
    distanceKm: place.distanceKm ?? 0,
    image: imageForPlace(place),
    href: place.externalUrl || undefined,
  };
}

function panelToCategory(panel: BtsPlacePanel, stationSlug: string): StationExploreCategory {
  const first = panel.places[0];
  const kind = first?.kind ?? panel.slug;
  return {
    id: panel.slug,
    label: panel.label,
    icon: iconForApi(panel.icon || first?.kindIcon || "", kind),
    panelTitle: panel.panelTitle || undefined,
    viewAllLabel: `All ${panel.label.toLowerCase()}`,
    items: panel.places.map((p) => placeToItem(p, stationSlug)),
  };
}

export function btsPlacesToExploreProfile(data: BtsStationPlaces): StationExploreProfile {
  const categories = data.panels
    .map((panel) => panelToCategory(panel, data.stationSlug))
    .filter((c) => c.items.length > 0);

  const lead =
    data.lead?.trim() ||
    (categories.length
      ? `Places and services near ${data.stationName} — illustrative distances from the proposed HSR stop.`
      : "");

  return { lead, categories };
}

export function exploreProfileHasListings(profile: StationExploreProfile): boolean {
  return profile.categories.some((c) => c.items.length > 0);
}

/** Explore profile from Django only (no static listing fallback). */
export async function loadStationExploreProfile(
  slug: string,
  cityName?: string,
): Promise<StationExploreProfile> {
  const api = await fetchStationPlaces(slug);
  if (!api?.panels?.length) {
    return emptyExploreProfile(cityName);
  }

  const fromApi = btsPlacesToExploreProfile(api);
  if (exploreProfileHasListings(fromApi)) {
    return fromApi;
  }
  return emptyExploreProfile(cityName);
}

export async function loadExploreProfilesForStations(
  slugs: string[],
  nameBySlug?: Record<string, string>,
): Promise<Record<string, StationExploreProfile>> {
  const unique = [...new Set(slugs)];
  const pairs = await Promise.all(
    unique.map(async (slug) => [
      slug,
      await loadStationExploreProfile(slug, nameBySlug?.[slug]),
    ] as const),
  );
  return Object.fromEntries(pairs);
}