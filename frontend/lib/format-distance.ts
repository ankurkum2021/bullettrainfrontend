/** Illustrative road distance from proposed HSR stop — not routing API. */
export function formatExploreDistance(km: number): string {
  if (km < 1) return `~${Math.round(km * 1000)} m`;
  return km < 10 ? `~${km.toFixed(1)} km` : `~${Math.round(km)} km`;
}