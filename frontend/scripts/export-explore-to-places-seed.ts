/**
 * Export station explore profiles → data/places-realistic.json for Django import.
 * Uses known landmark / business names; distances stay illustrative.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { STATION_EXPLORE_PROFILES } from "../data/station-explore-profiles";

/** App root: `frontend/` or legacy monorepo root containing `data/`. */
const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const SECTION_KIND: Record<string, string> = {
  cabs: "transport",
  stays: "lodging",
  dining: "food_and_drink",
  midc: "industry",
  diamond: "commerce",
  coastal: "landmark",
  "ahmedabad-biz": "commerce",
  textile: "industry",
  airport: "aviation",
  bkc: "commerce",
  "thane-local": "industry",
  "virar-local": "industry",
  "vapi-gidc": "industry",
  "bharuch-industry": "industry",
  "vadodara-city": "industry",
  "anand-belt": "industry",
  "sabarmati-local": "landmark",
};

function kindForSection(sectionId: string): string {
  return SECTION_KIND[sectionId] ?? "other";
}

const TAGS = "representative-poi,illustrative-distance";

const stations: Record<string, unknown> = {};

for (const [stationSlug, profile] of Object.entries(STATION_EXPLORE_PROFILES)) {
  stations[stationSlug] = {
    lead: profile.lead,
    sections: profile.categories.map((cat) => ({
      slug: cat.id,
      label: cat.label,
      icon: cat.icon,
      panelTitle: cat.panelTitle ?? "",
      places: cat.items.map((item) => ({
        slug: item.id,
        name: item.name,
        kind: kindForSection(cat.id),
        note: item.note,
        distanceKm: item.distanceKm,
        tags: TAGS,
        ...(item.href ? { externalUrl: item.href } : {}),
      })),
    })),
  };
}

const outRealistic = path.join(ROOT, "data", "places-realistic.json");
const payload = {
  meta: {
    description:
      "Representative points of interest per MAHSR stop — real names of landmarks, zones, and businesses; road distances are approximate from the proposed HSR footprint.",
    entityKinds: ["transport", "lodging", "food_and_drink", "industry", "commerce", "landmark", "aviation"],
  },
  stations,
};

fs.writeFileSync(outRealistic, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(`Wrote ${outRealistic} (${Object.keys(stations).length} stations)`);

/** Legacy filename kept for dev-only illustrative sync. */
const outLegacy = path.join(ROOT, "data", "places-seed.json");
fs.writeFileSync(
  outLegacy,
  `${JSON.stringify({ _warning: "Dev copy — production uses places-realistic.json", stations }, null, 2)}\n`,
  "utf8",
);
console.log(`Wrote ${outLegacy}`);