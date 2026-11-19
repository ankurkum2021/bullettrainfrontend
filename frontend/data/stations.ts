export type Station = {
  slug: string;
  name: string;
  stateCode: "MH" | "GJ";
  stateName: string;
  order: number;
  live: boolean;
  /** Primary on-page H2 — includes search phrases, single URL strategy */
  seoHeading: string;
  summary: string;
  status: string;
  searchPhrases: string[];
  geo?: { lat: number; lng: number };
};

export const MAHSR_CORRIDOR = {
  lengthKm: 508,
  gujaratKm: 352,
  maharashtraKm: 156,
  name: "Mumbai–Ahmedabad High Speed Rail (MAHSR)",
} as const;

export const STATIONS: Station[] = [
  {
    slug: "mumbai-bkc",
    name: "Mumbai BKC",
    stateCode: "MH",
    stateName: "Maharashtra",
    order: 1,
    live: false,
    seoHeading: "Mumbai BKC bullet train station",
    summary:
      "Southern terminus at Bandra Kurla Complex — planned as an underground station on the Maharashtra end of the 508 km MAHSR corridor.",
    status: "Under construction. Passenger service timeline not announced for the Mumbai stretch.",
    searchPhrases: ["Mumbai bullet train station", "BKC bullet train", "Mumbai MAHSR station"],
  },
  {
    slug: "thane",
    name: "Thane",
    stateCode: "MH",
    stateName: "Maharashtra",
    order: 2,
    live: false,
    seoHeading: "Thane bullet train station",
    summary:
      "Intermediate stop in Thane district with a depot planned in the corridor programme. Connects the line into the Mumbai metropolitan region.",
    status: "Under construction. Commercial passenger opening not announced.",
    searchPhrases: ["Thane bullet train station", "Thane MAHSR"],
    geo: { lat: 19.2183, lng: 72.9781 },
  },
  {
    slug: "virar",
    name: "Virar",
    stateCode: "MH",
    stateName: "Maharashtra",
    order: 3,
    live: false,
    seoHeading: "Virar bullet train station",
    summary:
      "Palghar-region stop north of Mumbai on the Maharashtra segment of the bullet train route.",
    status: "Under construction. Opening date not announced.",
    searchPhrases: ["Virar bullet train station"],
    geo: { lat: 19.455, lng: 72.811 },
  },
  {
    slug: "boisar",
    name: "Boisar",
    stateCode: "MH",
    stateName: "Maharashtra",
    order: 4,
    live: false,
    seoHeading: "Boisar bullet train station",
    summary:
      "Last Maharashtra station before the corridor enters Gujarat, near industrial belts including Tarapur MIDC.",
    status: "Under construction. NHSRCL has not announced passenger service here before the wider corridor opens.",
    searchPhrases: ["Boisar bullet train station", "Boisar MAHSR"],
    geo: { lat: 19.803, lng: 72.756 },
  },
  {
    slug: "vapi",
    name: "Vapi",
    stateCode: "GJ",
    stateName: "Gujarat",
    order: 5,
    live: false,
    seoHeading: "Vapi bullet train station",
    summary:
      "Border-town stop in Valsad district, part of the early Gujarat stretch discussed for partial commercial operations.",
    status: "Under construction. Included in public discussion of an initial Gujarat operating segment; exact start date not announced.",
    searchPhrases: ["Vapi bullet train station", "Vapi MAHSR"],
    geo: { lat: 20.389, lng: 72.91 },
  },
  {
    slug: "bilimora",
    name: "Bilimora",
    stateCode: "GJ",
    stateName: "Gujarat",
    order: 6,
    live: true,
    seoHeading: "Bilimora bullet train station",
    summary:
      "Station on the Surat–Bilimora section where overhead equipment (OHE) energisation has been in active commissioning in late 2026.",
    status: "Construction advanced; OHE energisation on the Surat–Bilimora stretch reported for November 2026. Passenger fares and timetables not announced.",
    searchPhrases: ["Bilimora bullet train station", "Bilimora MAHSR", "Surat Bilimora bullet train"],
    geo: { lat: 20.813, lng: 73.018 },
  },
  {
    slug: "surat",
    name: "Surat",
    stateCode: "GJ",
    stateName: "Gujarat",
    order: 7,
    live: true,
    seoHeading: "Surat bullet train station",
    summary:
      "Major Gujarat hub on MAHSR with a depot. Diamond and textile industry visitors are expected to use this stop once services begin.",
    status: "Under advanced construction on the active Gujarat segment. NHSRCL has cited 15 August 2027 as a target for initial commercial operation on the Surat–Vapi / Surat–Bilimora stretch (subject to commissioning).",
    searchPhrases: [
      "Surat bullet train station",
      "Surat MAHSR station",
      "bullet train Surat",
      "सूरत बुलेट ट्रेन स्टेशन",
    ],
    geo: { lat: 21.17, lng: 72.831 },
  },
  {
    slug: "bharuch",
    name: "Bharuch",
    stateCode: "GJ",
    stateName: "Gujarat",
    order: 8,
    live: false,
    seoHeading: "Bharuch bullet train station",
    summary: "Stop in Bharuch district along the Ahmedabad-facing section of the Gujarat main line.",
    status: "Under construction. Opening not announced.",
    searchPhrases: ["Bharuch bullet train station"],
    geo: { lat: 21.705, lng: 72.995 },
  },
  {
    slug: "vadodara",
    name: "Vadodara",
    stateCode: "GJ",
    stateName: "Gujarat",
    order: 9,
    live: false,
    seoHeading: "Vadodara bullet train station",
    summary: "City station linking Vadodara to the high-speed corridor toward Ahmedabad.",
    status: "Under construction. Partial corridor opening toward Ahmedabad has been discussed for 2028; not confirmed as a station opening date.",
    searchPhrases: ["Vadodara bullet train station", "Baroda bullet train"],
    geo: { lat: 22.307, lng: 73.181 },
  },
  {
    slug: "anand-nadiad",
    name: "Anand / Nadiad",
    stateCode: "GJ",
    stateName: "Gujarat",
    order: 10,
    live: false,
    seoHeading: "Anand Nadiad bullet train station",
    summary: "Combined station serving the Anand and Nadiad region between Vadodara and Ahmedabad.",
    status: "Under construction. Opening not announced.",
    searchPhrases: ["Anand bullet train station", "Nadiad bullet train station"],
    geo: { lat: 22.564, lng: 72.928 },
  },
  {
    slug: "ahmedabad",
    name: "Ahmedabad",
    stateCode: "GJ",
    stateName: "Gujarat",
    order: 11,
    live: false,
    seoHeading: "Ahmedabad bullet train station",
    summary: "Primary Gujarat city stop before the northern terminus, on the 352 km Gujarat portion of MAHSR.",
    status: "Under construction. Full corridor commissioning toward early 2029 has been cited in public timelines; station-specific date not announced.",
    searchPhrases: ["Ahmedabad bullet train station", "Ahmedabad MAHSR"],
    geo: { lat: 23.022, lng: 72.571 },
  },
  {
    slug: "sabarmati",
    name: "Sabarmati",
    stateCode: "GJ",
    stateName: "Gujarat",
    order: 12,
    live: false,
    seoHeading: "Sabarmati bullet train station",
    summary:
      "Northern terminus at Sabarmati with a depot in the NHSRCL corridor plan — end of the 508 km line.",
    status: "Under construction. Opening not announced.",
    searchPhrases: ["Sabarmati bullet train station", "Ahmedabad Sabarmati bullet train"],
    geo: { lat: 23.073, lng: 72.594 },
  },
];

export function stationBySlug(slug: string): Station | undefined {
  return STATIONS.find((s) => s.slug === slug);
}