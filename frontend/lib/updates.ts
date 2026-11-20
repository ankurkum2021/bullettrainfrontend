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
  imageUrl?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
};

/** Full brief summary for cards and visible list copy (not line-clamped to two lines). */
const MAHSR_CTX =
  "Part of the 508 km MAHSR corridor — confirm dates and figures on the cited NHSRCL or PIB release.";

export function updateBrief(item: CorridorUpdate): string {
  const s = item.summary?.trim();
  if (s) {
    if (s.length < 200 && !s.includes("508 km")) {
      return `${s} ${MAHSR_CTX}`;
    }
    return s;
  }
  const t = item.teaser?.trim();
  if (t) return t;
  return item.title;
}

/** Meta description, RSS, and JSON-LD — one or two complete sentences, ≤160 chars when possible. */
export function updateMetaDescription(item: CorridorUpdate): string {
  const brief = updateBrief(item);
  if (brief.length <= 160) return brief;
  const chunk = brief.slice(0, 157);
  const cut = chunk.lastIndexOf(" ");
  const clipped = cut > 80 ? chunk.slice(0, cut) : chunk;
  return `${clipped}…`;
}

/** @deprecated Prefer updateBrief for UI and updateMetaDescription for metadata. */
export function updateTeaser(item: CorridorUpdate): string {
  return updateMetaDescription(item);
}

/** Brief article paragraphs on detail pages when API body is missing. */
export function updateArticleParagraphs(item: CorridorUpdate): string[] {
  const raw = item.body?.trim();
  if (raw) {
    return raw
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean);
  }

  const when = formatUpdateDate(item.date);
  const source = item.sourceName || "the cited official source";

  return [
    `On ${when}, NHSRCL and allied agencies reported on the Mumbai–Ahmedabad High Speed Rail (MAHSR) programme: ${item.title}.`,
    "The 508 km corridor links Mumbai BKC with Sabarmati via twelve MAHSR stations. Electrification, viaducts, depots, and station civil works are tracked as separate milestones from any passenger launch date NHSRCL may announce later.",
    `This summary is for bullet train station readers and search engines. Cross-check figures and dates with the original release (${source}) before citing them elsewhere.`,
    "Bullet Train Station is unofficial — not affiliated with NHSRCL, Indian Railways, or IRCTC — and does not publish fares, timetables, or opening days that NHSRCL has not announced.",
  ];
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