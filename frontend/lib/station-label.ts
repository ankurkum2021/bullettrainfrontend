import { stationBySlug } from "@/data/stations";

/** SEO phrase: “{City} bullet train station” */
export function stationBulletTrainName(slug: string, fallbackCityName?: string): string {
  const detailed = stationBySlug(slug);
  if (detailed) return detailed.seoHeading;
  const city = fallbackCityName?.trim() || slug.replace(/-/g, " ");
  return `${city} bullet train station`;
}

export function nearStationPhrase(slug: string, category: string, cityName?: string): string {
  const place = stationBulletTrainName(slug, cityName);
  return `${category} near ${place}`;
}