import {
  EXPLORE_CORRIDORS,
  exploreStationBySlug,
  type ExploreCorridor,
  type ExploreStation,
} from "@/data/explore";
import {
  fetchCorridors,
  fetchStations,
  type BtsCorridor,
  type BtsStation,
} from "@/lib/bts-api";

const PHASE_SORT: Record<BtsCorridor["phase"], number> = {
  under_construction: 0,
  approved: 1,
  proposed: 2,
};

function catalogStationToExplore(
  station: BtsStation,
  corridor: BtsCorridor,
): ExploreStation {
  const known = exploreStationBySlug(station.slug);
  if (known && known.corridor.id === corridor.slug) {
    return { ...known.station, live: station.live };
  }

  const phaseLine =
    corridor.phase === "under_construction"
      ? "Under construction"
      : corridor.phase === "approved"
        ? "Approved corridor"
        : "Proposed / study";

  return {
    slug: station.slug,
    name: station.name,
    live: station.live,
    development: {
      headline: station.live
        ? "On the first expected commercial stretch"
        : `${phaseLine} — stop list may change`,
      body: `${station.name} on ${corridor.name}. Passenger opening not announced unless NHSRCL publishes a date.`,
      milestones: [
        corridor.status || "See official NHSRCL / government releases",
        station.live ? "Flagged live in catalog" : "Not on announced first segment",
      ],
    },
    nearby: [],
  };
}

function apiCorridorToExplore(
  corridor: BtsCorridor,
  stations: BtsStation[],
): ExploreCorridor {
  const staticMatch = EXPLORE_CORRIDORS.find((c) => c.id === corridor.slug);
  const ordered = [...stations]
    .filter((s) => s.corridorSlug === corridor.slug)
    .sort((a, b) => a.order - b.order);

  return {
    id: corridor.slug,
    name: corridor.name,
    shortName: corridor.shortName || staticMatch?.shortName || corridor.name,
    lengthKm: corridor.lengthKm,
    status: corridor.status || staticMatch?.status || "",
    stations: ordered.map((s) => catalogStationToExplore(s, corridor)),
  };
}

function sortCorridors(rows: ExploreCorridor[], api: BtsCorridor[]): ExploreCorridor[] {
  const phaseBySlug = new Map(api.map((c) => [c.slug, c.phase]));
  return [...rows].sort((a, b) => {
    const pa = phaseBySlug.get(a.id) ?? "proposed";
    const pb = phaseBySlug.get(b.id) ?? "proposed";
    const diff = PHASE_SORT[pa] - PHASE_SORT[pb];
    if (diff !== 0) return diff;
    return a.shortName.localeCompare(b.shortName);
  });
}

/** Corridors + stations from Django; falls back to static explore data when the API is down. */
export async function loadExploreCorridors(): Promise<ExploreCorridor[]> {
  const [apiCorridors, apiStations] = await Promise.all([fetchCorridors(), fetchStations()]);

  if (!apiCorridors?.length || !apiStations?.length) {
    return EXPLORE_CORRIDORS;
  }

  const merged = apiCorridors.map((c) => apiCorridorToExplore(c, apiStations));
  return sortCorridors(merged, apiCorridors);
}

export function defaultCorridorSlug(corridors: ExploreCorridor[]): string {
  return corridors.find((c) => c.id === "mahsr")?.id ?? corridors[0]?.id ?? "mahsr";
}

export function defaultStationSlug(corridor: ExploreCorridor): string {
  return (
    corridor.stations.find((s) => s.slug === "surat")?.slug ??
    corridor.stations[0]?.slug ??
    ""
  );
}