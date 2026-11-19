export type BusinessCategory = "cab" | "hotel" | "restaurant" | "cafe";

export type NearbyBusiness = {
  id: string;
  name: string;
  category: BusinessCategory;
  /** Placeholder until real listings */
  note: string;
};

export type ExploreStation = {
  slug: string;
  name: string;
  /** From catalog API when merged server-side. */
  live?: boolean;
  development: {
    headline: string;
    body: string;
    milestones: string[];
  };
  nearby: NearbyBusiness[];
};

export type ExploreCorridor = {
  id: string;
  name: string;
  shortName: string;
  lengthKm: number | null;
  status: string;
  stations: ExploreStation[];
};

const SURAT_TEMPLATE: ExploreStation = {
  slug: "surat",
  name: "Surat",
  development: {
    headline: "Station & viaduct work advancing on the first commercial stretch",
    body:
      "Surat is treated as the anchor for early Gujarat operations. Depot-linked civil works and station superstructure are in progress; passenger interface details are not announced.",
    milestones: [
      "Station box and platform level civil works ongoing",
      "Depot connectivity under the Surat programme",
      "First commercial target on Surat–Vapi / Surat–Bilimora cited for 2027 (official target, not a live timetable)",
    ],
  },
  nearby: [
    { id: "s-cab-1", name: "Surat Airport transfer", category: "cab", note: "GST invoice enquiries welcome" },
    { id: "s-cab-2", name: "Varachha industrial visit cab", category: "cab", note: "B2B corporate runs" },
    { id: "s-hotel-1", name: "Ring Road business hotel", category: "hotel", note: "Near proposed station approach" },
    { id: "s-hotel-2", name: "Athwa / City Light stay", category: "hotel", note: "Diamond belt visitors" },
    { id: "s-rest-1", name: "Gujarati thali dining", category: "restaurant", note: "Varachha & Athwa" },
    { id: "s-cafe-1", name: "Station-side café", category: "cafe", note: "Opening with service TBD" },
  ],
};

const BILIMORA_TEMPLATE: ExploreStation = {
  slug: "bilimora",
  name: "Bilimora",
  development: {
    headline: "Surat–Bilimora section in commissioning focus",
    body:
      "The ~50 km stretch including Bilimora has seen OHE energisation milestones in late 2026. This is construction progress, not passenger opening.",
    milestones: [
      "OHE energisation reported on Surat–Bilimora (~50 km)",
      "Station civil works on the southern Gujarat segment",
      "No public timetable or fare announcement",
    ],
  },
  nearby: [
    { id: "b-cab-1", name: "Bilimora local cab", category: "cab", note: "Surat–Bilimora corridor" },
    { id: "b-hotel-1", name: "Highway stay lodge", category: "hotel", note: "NH48 halts" },
    { id: "b-rest-1", name: "Highway dhaba / family restaurant", category: "restaurant", note: "" },
    { id: "b-cafe-1", name: "Tea & snack stop", category: "cafe", note: "" },
  ],
};

const STUB_NEARBY: NearbyBusiness[] = [
  { id: "x-cab", name: "Local cab partner", category: "cab", note: "" },
  { id: "x-hotel", name: "Business hotel", category: "hotel", note: "" },
  { id: "x-rest", name: "Restaurant", category: "restaurant", note: "" },
  { id: "x-cafe", name: "Café", category: "cafe", note: "" },
];

function stubStation(slug: string, name: string, headline: string): ExploreStation {
  return {
    slug,
    name,
    development: {
      headline,
      body: "Civil and systems work continues on this segment. Passenger opening not announced.",
      milestones: ["Status not independently confirmed", "Passenger opening: not announced"],
    },
    nearby: STUB_NEARBY.map((b) => ({ ...b, id: `${slug}-${b.id}` })),
  };
}

export const EXPLORE_CORRIDORS: ExploreCorridor[] = [
  {
    id: "mahsr",
    name: "Mumbai–Ahmedabad (MAHSR)",
    shortName: "MAHSR",
    lengthKm: 508,
    status: "Under construction — first Gujarat stretch targeted from 2027",
    stations: [
      stubStation("mumbai-bkc", "Mumbai BKC", "Underground southern terminus"),
      stubStation("thane", "Thane", "Maharashtra segment with depot"),
      stubStation("virar", "Virar", "Palghar region stop"),
      stubStation("boisar", "Boisar", "Last stop before Gujarat"),
      stubStation("vapi", "Vapi", "Valsad district — partial service discussion"),
      BILIMORA_TEMPLATE,
      SURAT_TEMPLATE,
      stubStation("bharuch", "Bharuch", "Central Gujarat stop"),
      stubStation("vadodara", "Vadodara", "Central Gujarat city station"),
      stubStation("anand-nadiad", "Anand / Nadiad", "Between Vadodara and Ahmedabad"),
      stubStation("ahmedabad", "Ahmedabad", "Principal northern city stop"),
      stubStation("sabarmati", "Sabarmati", "Northern terminus + depot"),
    ],
  },
  {
    id: "mumbai-hyderabad",
    name: "Mumbai–Hyderabad (proposed)",
    shortName: "Mumbai–Hyderabad",
    lengthKm: null,
    status: "Approved corridor — station list and dates not final",
    stations: [
      stubStation("mumbai", "Mumbai", "Terminus — template"),
      stubStation("pune", "Pune", "Proposed intermediate — template"),
      stubStation("solapur", "Solapur", "Proposed intermediate — template"),
      stubStation("hyderabad", "Hyderabad", "Proposed terminus — template"),
    ],
  },
  {
    id: "delhi-varanasi",
    name: "Delhi–Varanasi (proposed)",
    shortName: "Delhi–Varanasi",
    lengthKm: null,
    status: "Approved corridor — template data only",
    stations: [
      stubStation("delhi", "Delhi", "Northern anchor — template"),
      stubStation("agra", "Agra", "Intermediate — template"),
      stubStation("varanasi", "Varanasi", "Eastern terminus — template"),
    ],
  },
];

export type ExploreStationContext = {
  corridor: ExploreCorridor;
  station: ExploreStation;
};

export function allExploreStationSlugs(): string[] {
  const slugs = new Set<string>();
  for (const corridor of EXPLORE_CORRIDORS) {
    for (const station of corridor.stations) slugs.add(station.slug);
  }
  return [...slugs];
}

export function exploreStationBySlug(slug: string): ExploreStationContext | null {
  for (const corridor of EXPLORE_CORRIDORS) {
    const station = corridor.stations.find((s) => s.slug === slug);
    if (station) return { corridor, station };
  }
  return null;
}
