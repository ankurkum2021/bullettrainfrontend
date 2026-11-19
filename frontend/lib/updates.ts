import updatesJson from "@/data/updates.json";
import { fetchNewsArticle, fetchNewsUpdates } from "@/lib/bts-api";

export type CorridorUpdate = {
  id: string;
  title: string;
  date: string;
  teaser?: string;
  summary: string;
  body?: string;
  sourceUrl: string;
  sourceName: string;
  sourceSite?: string;
  stationSlug?: string | null;
};

export function updateTeaser(item: CorridorUpdate): string {
  const t = item.teaser?.trim();
  if (t) return t;
  const s = item.summary.trim();
  if (s.length <= 140) return s;
  return `${s.slice(0, 137).trim()}…`;
}

export function updateDetailPath(id: string): string {
  return `/updates/${id}`;
}

function sortUpdatesNewest(items: CorridorUpdate[]): CorridorUpdate[] {
  return [...items].sort((a, b) => b.date.localeCompare(a.date));
}

export const CORRIDOR_UPDATES: CorridorUpdate[] = updatesJson as CorridorUpdate[];

export function corridorUpdatesByNewest(): CorridorUpdate[] {
  return sortUpdatesNewest(CORRIDOR_UPDATES);
}

export function corridorUpdatesForHome(limit = 6): CorridorUpdate[] {
  return corridorUpdatesByNewest().slice(0, limit);
}

/** Prefer Django `/api/news/`; fall back to bundled JSON when the API is unreachable. */
export async function loadCorridorUpdates(): Promise<CorridorUpdate[]> {
  const remote = await fetchNewsUpdates(100);
  if (remote && remote.length > 0) return sortUpdatesNewest(remote);
  return corridorUpdatesByNewest();
}

export async function loadCorridorUpdatesForHome(limit = 6): Promise<CorridorUpdate[]> {
  const updates = await loadCorridorUpdates();
  return updates.slice(0, limit);
}

export async function loadCorridorUpdateBySlug(slug: string): Promise<CorridorUpdate | null> {
  const article = await fetchNewsArticle(slug);
  if (article) return article;
  const local = CORRIDOR_UPDATES.find((u) => u.id === slug);
  return local ?? null;
}

export function formatUpdateDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}