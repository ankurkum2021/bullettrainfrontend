import type { CorridorUpdate } from "@/lib/updates";

const DEFAULT_API_ORIGIN = "http://127.0.0.1:8000";

export function btsApiOrigin(): string {
  const raw = process.env.BTS_API_URL?.trim();
  if (raw) return raw.replace(/\/$/, "");
  return DEFAULT_API_ORIGIN;
}

function revalidateSeconds(): number {
  const raw = process.env.BTS_API_REVALIDATE?.trim();
  const n = raw ? Number(raw) : 300;
  return Number.isFinite(n) && n >= 0 ? n : 300;
}

type NewsListResponse = { updates?: CorridorUpdate[] };

export async function fetchNewsUpdates(limit = 50): Promise<CorridorUpdate[] | null> {
  const url = `${btsApiOrigin()}/api/news/?limit=${limit}`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as NewsListResponse;
    if (!Array.isArray(data.updates)) return null;
    return data.updates;
  } catch {
    return null;
  }
}

export async function fetchNewsArticle(slug: string): Promise<CorridorUpdate | null> {
  const url = `${btsApiOrigin()}/api/news/${encodeURIComponent(slug)}/`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as CorridorUpdate;
  } catch {
    return null;
  }
}

export type BtsCorridor = {
  slug: string;
  name: string;
  shortName: string;
  lengthKm: number | null;
  phase: "under_construction" | "approved" | "proposed";
  status: string;
};

export type BtsStation = {
  slug: string;
  name: string;
  corridorSlug: string;
  stateCode: string;
  order: number;
  live: boolean;
};

type CorridorListResponse = { corridors?: BtsCorridor[] };
type StationListResponse = { stations?: BtsStation[] };

export async function fetchCorridors(): Promise<BtsCorridor[] | null> {
  const url = `${btsApiOrigin()}/api/corridors/`;
  try {
    const res = await fetch(url, { next: { revalidate: revalidateSeconds() } });
    if (!res.ok) return null;
    const data = (await res.json()) as CorridorListResponse;
    return Array.isArray(data.corridors) ? data.corridors : null;
  } catch {
    return null;
  }
}

export type BtsPlaceKind = {
  slug: string;
  label: string;
  icon: string;
  description: string;
};

export type BtsPlace = {
  slug: string;
  name: string;
  note: string;
  distanceKm: number | null;
  externalUrl: string;
  kind: string;
  kindLabel: string;
  kindIcon: string;
  sectionSlug: string | null;
  sectionLabel: string | null;
  tags: string[];
  stationSlug: string;
};

export type BtsPlacePanel = {
  slug: string;
  label: string;
  icon: string;
  panelTitle: string;
  places: BtsPlace[];
};

export type BtsStationPlaces = {
  stationSlug: string;
  stationName: string;
  corridorSlug: string;
  lead?: string;
  panels: BtsPlacePanel[];
};

/** Places change often in dev/admin — avoid caching stale empty payloads. */
function liveCatalogFetchInit(): RequestInit {
  return { cache: "no-store" };
}

export async function fetchPlaceKinds(): Promise<BtsPlaceKind[] | null> {
  const url = `${btsApiOrigin()}/api/place-kinds/`;
  try {
    const res = await fetch(url, { next: { revalidate: revalidateSeconds() } });
    if (!res.ok) return null;
    const data = (await res.json()) as { kinds?: BtsPlaceKind[] };
    return Array.isArray(data.kinds) ? data.kinds : null;
  } catch {
    return null;
  }
}

export async function fetchPlaces(params?: {
  station?: string;
  kind?: string;
  corridor?: string;
}): Promise<BtsPlace[] | null> {
  const qs = new URLSearchParams();
  if (params?.station) qs.set("station", params.station);
  if (params?.kind) qs.set("kind", params.kind);
  if (params?.corridor) qs.set("corridor", params.corridor);
  const query = qs.toString();
  const url = `${btsApiOrigin()}/api/places/${query ? `?${query}` : ""}`;
  try {
    const res = await fetch(url, liveCatalogFetchInit());
    if (!res.ok) return null;
    const data = (await res.json()) as { places?: BtsPlace[] };
    return Array.isArray(data.places) ? data.places : null;
  } catch {
    return null;
  }
}

export async function fetchStationPlaces(stationSlug: string): Promise<BtsStationPlaces | null> {
  const url = `${btsApiOrigin()}/api/stations/${encodeURIComponent(stationSlug)}/places/`;
  try {
    const res = await fetch(url, liveCatalogFetchInit());
    if (!res.ok) return null;
    return (await res.json()) as BtsStationPlaces;
  } catch {
    return null;
  }
}

export async function fetchStations(corridorSlug?: string): Promise<BtsStation[] | null> {
  const qs = corridorSlug ? `?corridor=${encodeURIComponent(corridorSlug)}` : "";
  const url = `${btsApiOrigin()}/api/stations/${qs}`;
  try {
    const res = await fetch(url, { next: { revalidate: revalidateSeconds() } });
    if (!res.ok) return null;
    const data = (await res.json()) as StationListResponse;
    return Array.isArray(data.stations) ? data.stations : null;
  } catch {
    return null;
  }
}