import type { ProgressImage } from "@/data/progress-media";
import { STATIONS } from "@/data/stations";

export const NHSRCL_ORIGIN = "https://www.nhsrcl.in";

export const NHSRCL_LINKS = {
  mediaGallery: `${NHSRCL_ORIGIN}/en/media/media-gallery`,
  pressReleases: `${NHSRCL_ORIGIN}/en/media/press-release`,
  projectOverview: `${NHSRCL_ORIGIN}/en/project/project-overview`,
  oheBriefNov2026: `${NHSRCL_ORIGIN}/PressReleaseDetails.aspx?id=252`,
} as const;

/** Encode `/Uploads/.../file name.jpeg` for NHSRCL (spaces and punctuation in filenames). */
export function nhsrclUrl(uploadPath: string): string {
  const path = uploadPath.startsWith("/") ? uploadPath : `/${uploadPath}`;
  const encoded = path
    .split("/")
    .map((part) => (part ? encodeURIComponent(part) : ""))
    .join("/");
  return `${NHSRCL_ORIGIN}${encoded}`;
}

type NhsrclAsset = {
  path: string;
  label: string;
  sourceUrl: string;
  width: number;
  height: number;
};

export const NHSRCL_SHARED: Record<string, NhsrclAsset> = {
  corridor: {
    path: "/Uploads/BannerImages/bullet_train_project_20260603155119.jpg",
    label: "508 km Mumbai–Ahmedabad bullet train corridor programme",
    sourceUrl: NHSRCL_LINKS.projectOverview,
    width: 1920,
    height: 600,
  },
  corridorRail: {
    path: "/Uploads/StationBannerImages/rail-1.jpg",
    label: "High-speed rail corridor infrastructure",
    sourceUrl: NHSRCL_LINKS.projectOverview,
    width: 1200,
    height: 400,
  },
  ohe01: {
    path: "/Uploads/MediaImageGallery/Construction/EN/Energisation of the overhead equipment (OHE) system over Bullet Train viaduct_01_639306049161302400.jpeg",
    label: "OHE energisation on bullet train viaduct (construction milestone)",
    sourceUrl: NHSRCL_LINKS.oheBriefNov2026,
    width: 1600,
    height: 900,
  },
  ohe02: {
    path: "/Uploads/MediaImageGallery/Construction/EN/Energisation of the overhead equipment (OHE) system over Bullet Train viaduct_02_639306048583143008.jpeg",
    label: "Electrification work on MAHSR viaduct",
    sourceUrl: NHSRCL_LINKS.oheBriefNov2026,
    width: 1600,
    height: 900,
  },
  b28Visit01: {
    path: "/Uploads/MediaImageGallery/Visits/EN/Honble Minister of Railways Shri Ashwini Vaishnaw visit to B28 Train Manufacturing Facility on 1st Nov 2026_01_639292266677280798.jpeg",
    label: "B28 trainset manufacturing facility visit",
    sourceUrl: NHSRCL_LINKS.pressReleases,
    width: 1600,
    height: 900,
  },
  b28Visit02: {
    path: "/Uploads/MediaImageGallery/Visits/EN/Honble Minister of Railways Shri Ashwini Vaishnaw visit to B28 Train Manufacturing Facility on 1st Nov 2026_02_639292265992891622.jpeg",
    label: "Rolling stock programme for MAHSR",
    sourceUrl: NHSRCL_LINKS.pressReleases,
    width: 1600,
    height: 900,
  },
};

/** Official station renders on NHSRCL (homepage station carousel, updated 2026). */
export const NHSRCL_STATION_HERO: Record<
  string,
  { path: string; stationPage: string; label: string; width: number; height: number }
> = {
  "mumbai-bkc": {
    path: "/Uploads/BulletTrainStationsMaster/en/Mumbai-HSR-Station_1.jpg",
    stationPage: `${NHSRCL_ORIGIN}/en/station/mumbai-bkc`,
    label: "Mumbai (BKC) high-speed station design",
    width: 1200,
    height: 800,
  },
  thane: {
    path: "/Uploads/BulletTrainStationsMaster/en/Thane-HSR-Station(2)_2.jpg",
    stationPage: `${NHSRCL_ORIGIN}/en/station/thane`,
    label: "Thane bullet train station and depot",
    width: 1200,
    height: 800,
  },
  virar: {
    path: "/Uploads/BulletTrainStationsMaster/en/Virar-HSR-Station_1.jpg",
    stationPage: `${NHSRCL_ORIGIN}/en/station/virar`,
    label: "Virar MAHSR station",
    width: 1200,
    height: 800,
  },
  boisar: {
    path: "/Uploads/BulletTrainStationsMaster/en/Boisar-HSR-Station_1.jpg",
    stationPage: `${NHSRCL_ORIGIN}/en/station/boisar`,
    label: "Boisar bullet train station",
    width: 1200,
    height: 800,
  },
  vapi: {
    path: "/Uploads/BulletTrainStationsMaster/en/Vapi-HSR-Station_1.jpg",
    stationPage: `${NHSRCL_ORIGIN}/en/station/vapi`,
    label: "Vapi bullet train station",
    width: 1200,
    height: 800,
  },
  bilimora: {
    path: "/Uploads/BulletTrainStationsMaster/en/Bilimora-HSR-Station_1.jpg",
    stationPage: `${NHSRCL_ORIGIN}/en/station/bilimora`,
    label: "Bilimora bullet train station",
    width: 1200,
    height: 800,
  },
  surat: {
    path: "/Uploads/BulletTrainStationsMaster/en/Surat-HSR-Station_1.jpg",
    stationPage: `${NHSRCL_ORIGIN}/en/station/surat`,
    label: "Surat bullet train station (diamond-facet design)",
    width: 1200,
    height: 800,
  },
  bharuch: {
    path: "/Uploads/BulletTrainStationsMaster/en/Bharuch-HSR-Station_1.jpg",
    stationPage: `${NHSRCL_ORIGIN}/en/station/bharuch`,
    label: "Bharuch bullet train station",
    width: 1200,
    height: 800,
  },
  vadodara: {
    path: "/Uploads/BulletTrainStationsMaster/en/Vadodara-HSR-Station_2.jpg",
    stationPage: `${NHSRCL_ORIGIN}/en/station/vadodara`,
    label: "Vadodara bullet train station",
    width: 1200,
    height: 800,
  },
  "anand-nadiad": {
    path: "/Uploads/BulletTrainStationsMaster/en/Graphical representation of Station Facade_1.jpg",
    stationPage: NHSRCL_LINKS.projectOverview,
    label: "Anand / Nadiad station area on the corridor",
    width: 1200,
    height: 800,
  },
  ahmedabad: {
    path: "/Uploads/BulletTrainStationsMaster/en/Ahmedabad Station View.png",
    stationPage: `${NHSRCL_ORIGIN}/en/station/ahmedabad`,
    label: "Ahmedabad bullet train station view",
    width: 1200,
    height: 800,
  },
  sabarmati: {
    path: "/Uploads/BulletTrainStationsMaster/en/Sabarmati_Bullet_Train_Station-04_50_1.jpg",
    stationPage: `${NHSRCL_ORIGIN}/en/station/sabarmati`,
    label: "Sabarmati terminus and depot",
    width: 1200,
    height: 800,
  },
};

function heroForSlug(slug: string) {
  return NHSRCL_STATION_HERO[slug] ?? NHSRCL_STATION_HERO.surat!;
}

function toProgressImage(
  slug: string,
  stationName: string,
  phaseIndex: number,
  asset: NhsrclAsset,
  altLabel: string,
): ProgressImage {
  const fullUrl = nhsrclUrl(asset.path);
  const ext = asset.path.toLowerCase().endsWith(".png")
    ? "png"
    : asset.path.toLowerCase().endsWith(".jpeg")
      ? "jpeg"
      : "jpg";
  return {
    id: `${slug}-phase-${phaseIndex}`,
    src: fullUrl,
    remoteFull: fullUrl,
    localSrc: `/progress/${slug}/phase-${phaseIndex}.${ext}`,
    alt: `${stationName} — ${altLabel}`,
    credit: "NHSRCL (National High Speed Rail Corporation)",
    sourceUrl: asset.sourceUrl,
    width: asset.width,
    height: asset.height,
  };
}

/** Five timeline images per station from NHSRCL uploads (current construction/programme art). */
export function nhsrclPhotosForStation(slug: string, stationName: string, live: boolean): ProgressImage[] {
  const hero = heroForSlug(slug);
  const trackKey = live ? "ohe01" : "corridorRail";
  const testKey = live ? "ohe02" : "b28Visit01";
  const sequence = [
    NHSRCL_SHARED.corridor!,
    { path: hero.path, label: hero.label, sourceUrl: hero.stationPage, width: hero.width, height: hero.height },
    NHSRCL_SHARED[trackKey]!,
    NHSRCL_SHARED[testKey]!,
    NHSRCL_SHARED.b28Visit02!,
  ];

  return sequence.map((asset, phaseIndex) => toProgressImage(slug, stationName, phaseIndex, asset, asset.label));
}

export const NHSRCL_PROGRESS_SYNC_MANIFEST = STATIONS.flatMap((station) => {
  const images = nhsrclPhotosForStation(station.slug, station.name, station.live);
  return images.map((img, phaseIndex) => {
    const ext = img.localSrc?.split(".").pop() ?? "jpg";
    return {
      dest: `${station.slug}/phase-${phaseIndex}.${ext}`,
      url: img.remoteFull ?? img.src,
    };
  });
});