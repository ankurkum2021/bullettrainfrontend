import { NHSRCL_PROGRESS_SYNC_MANIFEST, nhsrclPhotosForStation } from "@/data/station-progress/nhsrcl-media";
import type { ProgressState, StationProgressStep } from "@/data/station-progress/types";
import type { Station } from "@/data/stations";

type StepDraft = {
  label: string;
  state: ProgressState;
  year: string;
  detail?: string;
};

function buildTimeline(
  slug: string,
  stationName: string,
  live: boolean,
  steps: StepDraft[],
): StationProgressStep[] {
  const photos = nhsrclPhotosForStation(slug, stationName, live);
  return steps.map((step, phaseIndex) => ({
    label: step.label,
    state: step.state,
    year: step.year,
    detail: step.detail,
    image: photos[phaseIndex]!,
  }));
}

const LAND = "Land & corridor alignment";
const CIVIL = "Civil works & station structure";
const TRACK = "Track, OHE & depot systems";
const TEST = "Testing & commissioning";
const PASS = "Passenger service";

/** Per-station programme — years and status from public NHSRCL / government sources. */
const BY_SLUG: Record<string, StepDraft[]> = {
  "mumbai-bkc": [
    {
      label: LAND,
      state: "done",
      year: "2015–17",
      detail: "Southern terminus fixed at underground BKC on the 508 km corridor.",
    },
    {
      label: CIVIL,
      state: "active",
      year: "2022–ongoing",
      detail:
        "21 km underground alignment BKC–Shilphata: NATM rock tunneling and TBM work under Mumbai — NHSRCL's most complex segment.",
    },
    {
      label: TRACK,
      state: "upcoming",
      year: "2027+",
      detail: "Track and systems follow tunnel and station civil completion; no BKC track commissioning date published.",
    },
    {
      label: TEST,
      state: "tbd",
      year: "Not announced",
      detail: "Trial operations depend on Maharashtra tunnel completion and corridor integration.",
    },
    {
      label: PASS,
      state: "tbd",
      year: "Not announced",
      detail: "Full-line passenger service toward ~2029 in public timelines — no BKC-only opening announced.",
    },
  ],
  thane: [
    {
      label: LAND,
      state: "done",
      year: "2015–18",
      detail: "Thane stop and depot land acquisition in the Maharashtra portion of MAHSR.",
    },
    {
      label: CIVIL,
      state: "active",
      year: "2019–ongoing",
      detail: "Thane depot and station civil works; 7 km Thane Creek tunnel linkage in the programme.",
    },
    {
      label: TRACK,
      state: "upcoming",
      year: "2027+",
    },
    {
      label: TEST,
      state: "tbd",
      year: "Not announced",
    },
    {
      label: PASS,
      state: "tbd",
      year: "Not announced",
      detail: "No commercial passenger date for Thane before wider corridor commissioning.",
    },
  ],
  virar: [
    {
      label: LAND,
      state: "done",
      year: "2015–18",
      detail: "Palghar-region alignment on the Mumbai–Vadodara approach.",
    },
    {
      label: CIVIL,
      state: "active",
      year: "2019–ongoing",
      detail: "Elevated viaduct and Virar station civil works along the Maharashtra segment.",
    },
    {
      label: TRACK,
      state: "upcoming",
      year: "2027+",
    },
    {
      label: TEST,
      state: "tbd",
      year: "Not announced",
    },
    {
      label: PASS,
      state: "tbd",
      year: "Not announced",
    },
  ],
  boisar: [
    {
      label: LAND,
      state: "done",
      year: "2015–18",
      detail: "Last Maharashtra stop before entering Gujarat; alignment through Palghar–Boisar belt.",
    },
    {
      label: CIVIL,
      state: "active",
      year: "2019–ongoing",
      detail: "Station and viaduct construction near Tarapur industrial area.",
    },
    {
      label: TRACK,
      state: "upcoming",
      year: "2027+",
    },
    {
      label: TEST,
      state: "tbd",
      year: "Not announced",
    },
    {
      label: PASS,
      state: "tbd",
      year: "Not announced",
    },
  ],
  vapi: [
    {
      label: LAND,
      state: "done",
      year: "2015–20",
      detail: "Valsad district station on the early Gujarat operating segment discussed in NHSRCL briefings.",
    },
    {
      label: CIVIL,
      state: "active",
      year: "2020–ongoing",
      detail: "Civil works on the Surat–Vapi section (97 km civil completion cited in 2025–26 progress reports).",
    },
    {
      label: TRACK,
      state: "upcoming",
      year: "2025–27",
    },
    {
      label: TEST,
      state: "upcoming",
      year: "2026–27",
    },
    {
      label: PASS,
      state: "tbd",
      year: "2027 (corridor target)",
      detail: "May open with first Gujarat commercial phase — no Vapi-specific timetable published.",
    },
  ],
  bilimora: [
    {
      label: LAND,
      state: "done",
      year: "2015–20",
    },
    {
      label: CIVIL,
      state: "done",
      year: "2020–25",
      detail: "Station and viaduct civil works substantially complete on ~50 km Surat–Bilimora section.",
    },
    {
      label: TRACK,
      state: "active",
      year: "2025–26",
      detail:
        "OHE energisation on Surat–Bilimora stretch reported for late November 2026 (construction supply, not passenger service).",
    },
    {
      label: TEST,
      state: "upcoming",
      year: "2026–27",
    },
    {
      label: PASS,
      state: "tbd",
      year: "2027 (corridor target)",
      detail: "Potential stop on first commercial Surat–Bilimora operation — fares not announced.",
    },
  ],
  surat: [
    {
      label: LAND,
      state: "done",
      year: "2015–20",
      detail: "Surat hub and depot on the priority Gujarat main line.",
    },
    {
      label: CIVIL,
      state: "active",
      year: "2019–ongoing",
      detail: "Diamond-inspired station superstructure and depot connectivity — PM site visit reported November 2025 (NHSRCL gallery).",
    },
    {
      label: TRACK,
      state: "active",
      year: "2023–27",
      detail: "Track and OHE on the active segment toward Vapi and Bilimora.",
    },
    {
      label: TEST,
      state: "upcoming",
      year: "2026–27",
    },
    {
      label: PASS,
      state: "tbd",
      year: "Aug 2027 (target)",
      detail:
        "NHSRCL target of 15 August 2027 for initial commercial operation on Surat–Vapi / Surat–Bilimora, subject to safety certification.",
    },
  ],
  bharuch: [
    {
      label: LAND,
      state: "done",
      year: "2015–20",
    },
    {
      label: CIVIL,
      state: "active",
      year: "2020–ongoing",
      detail: "Station taking shape; architectural finishing works shown in NHSRCL construction gallery.",
    },
    {
      label: TRACK,
      state: "upcoming",
      year: "2026–28",
    },
    {
      label: TEST,
      state: "tbd",
      year: "Not announced",
    },
    {
      label: PASS,
      state: "tbd",
      year: "Not announced",
    },
  ],
  vadodara: [
    {
      label: LAND,
      state: "done",
      year: "2015–20",
    },
    {
      label: CIVIL,
      state: "active",
      year: "2020–ongoing",
      detail: "Vadodara bullet train station structure works in NHSRCL progress photos.",
    },
    {
      label: TRACK,
      state: "upcoming",
      year: "2026–28",
    },
    {
      label: TEST,
      state: "upcoming",
      year: "2027–28",
    },
    {
      label: PASS,
      state: "tbd",
      year: "2028 (discussed)",
      detail: "Partial Surat–Ahmedabad opening ~2028 in public timelines — not confirmed for Vadodara alone.",
    },
  ],
  "anand-nadiad": [
    {
      label: LAND,
      state: "done",
      year: "2015–20",
    },
    {
      label: CIVIL,
      state: "active",
      year: "2020–ongoing",
      detail: "Combined Anand/Nadiad stop between Vadodara and Ahmedabad.",
    },
    {
      label: TRACK,
      state: "upcoming",
      year: "2027–29",
    },
    {
      label: TEST,
      state: "tbd",
      year: "Not announced",
    },
    {
      label: PASS,
      state: "tbd",
      year: "Not announced",
    },
  ],
  ahmedabad: [
    {
      label: LAND,
      state: "done",
      year: "2015–17",
      detail: "2017 foundation ceremony held in Ahmedabad; Gujarat hosts 352 km of the corridor.",
    },
    {
      label: CIVIL,
      state: "active",
      year: "2020–ongoing",
      detail: "Viaduct and station civil works in the Ahmedabad metropolitan area.",
    },
    {
      label: TRACK,
      state: "upcoming",
      year: "2026–29",
    },
    {
      label: TEST,
      state: "tbd",
      year: "Not announced",
    },
    {
      label: PASS,
      state: "tbd",
      year: "~2029 (corridor)",
      detail: "Full BKC–Sabarmati passenger window cited around 2029 — station date not split out.",
    },
  ],
  sabarmati: [
    {
      label: LAND,
      state: "done",
      year: "2015–17",
      detail: "Northern terminus and Sabarmati depot in the approved 508 km plan.",
    },
    {
      label: CIVIL,
      state: "active",
      year: "2020–ongoing",
      detail: "Sabarmati River bridge and terminal civil works in NHSRCL Ahmedabad-region updates.",
    },
    {
      label: TRACK,
      state: "upcoming",
      year: "2027–29",
    },
    {
      label: TEST,
      state: "tbd",
      year: "Not announced",
    },
    {
      label: PASS,
      state: "tbd",
      year: "~2029 (corridor)",
      detail: "Timing linked to full-line commissioning at the northern end.",
    },
  ],
};

export function stationProgressSteps(station: Station): StationProgressStep[] {
  const steps = BY_SLUG[station.slug];
  if (!steps) {
    throw new Error(`No progress timeline for station slug: ${station.slug}`);
  }
  return buildTimeline(station.slug, station.name, station.live, steps);
}

/** Files to mirror with `npm run sync-progress-images` (one copy per station phase). */
export const STATION_PROGRESS_SYNC_MANIFEST = NHSRCL_PROGRESS_SYNC_MANIFEST;