import {
  NHSRCL_SHARED,
  NHSRCL_STATION_HERO,
  nhsrclUrl,
} from "@/data/station-progress/nhsrcl-media";
import type { CorridorUpdate } from "@/lib/updates";

export type UpdateArticleImage = {
  url: string;
  alt: string;
  width: number;
  height: number;
};

const STATION_ALIASES: Record<string, string> = {
  bkc: "mumbai-bkc",
  mumbai: "mumbai-bkc",
  anand: "anand-nadiad",
  nadiad: "anand-nadiad",
};

function stationSlugFromText(text: string, explicit?: string | null): string | null {
  if (explicit && NHSRCL_STATION_HERO[explicit]) return explicit;
  const low = text.toLowerCase();
  for (const slug of Object.keys(NHSRCL_STATION_HERO)) {
    if (low.includes(slug.replace(/-/g, " ")) || low.includes(slug)) return slug;
  }
  for (const [alias, slug] of Object.entries(STATION_ALIASES)) {
    if (low.includes(alias)) return slug;
  }
  return explicit && NHSRCL_STATION_HERO[explicit] ? explicit : null;
}

function assetFromStation(slug: string): UpdateArticleImage {
  const hero = NHSRCL_STATION_HERO[slug] ?? NHSRCL_STATION_HERO.surat!;
  return {
    url: nhsrclUrl(hero.path),
    alt: hero.label,
    width: hero.width,
    height: hero.height,
  };
}

function sharedAsset(
  key: keyof typeof NHSRCL_SHARED,
  altOverride?: string,
): UpdateArticleImage {
  const asset = NHSRCL_SHARED[key]!;
  return {
    url: nhsrclUrl(asset.path),
    alt: altOverride ?? asset.label,
    width: asset.width,
    height: asset.height,
  };
}

/** NHSRCL media matched to story topic when press pages have no inline hero. */
export function resolveUpdateImage(item: CorridorUpdate): UpdateArticleImage {
  if (item.imageUrl?.trim()) {
    return {
      url: item.imageUrl.trim(),
      alt: item.imageAlt?.trim() || item.title,
      width: item.imageWidth ?? 1600,
      height: item.imageHeight ?? 900,
    };
  }

  const blob = `${item.title} ${item.summary} ${item.id}`.toLowerCase();

  if (/\b(ohe|overhead|energis|electrif|traction substation)\b/.test(blob)) {
    return sharedAsset("ohe01");
  }
  if (/\b(trainset|train 18|b28|rolling stock|in-making)\b/.test(blob)) {
    return sharedAsset("b28Visit01");
  }
  if (/\b(viaduct|bridge|span|tunnel|underground)\b/.test(blob)) {
    return sharedAsset("corridorRail");
  }
  if (/\b(station|concourse|platform|portal beam|superstructure)\b/.test(blob)) {
    const slug = stationSlugFromText(blob, item.stationSlug);
    if (slug) return assetFromStation(slug);
    return sharedAsset("corridor");
  }

  const slug = stationSlugFromText(blob, item.stationSlug);
  if (slug) return assetFromStation(slug);
  return sharedAsset("corridor");
}