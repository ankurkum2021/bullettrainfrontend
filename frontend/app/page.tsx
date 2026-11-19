import { HomePage } from "@/components/home/HomePage";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import {
  organizationSchema,
  sitePagesItemListSchema,
  webPageSchema,
  webSiteSchema,
} from "@/lib/seo-schemas";
import {
  defaultCorridorSlug,
  defaultStationSlug as resolveDefaultStationSlug,
  loadExploreCorridors,
} from "@/lib/corridors";
import { loadStationExploreProfile } from "@/lib/places";
import { loadCorridorUpdatesForHome } from "@/lib/updates";
import type { StationExploreProfile } from "@/data/station-explore";

export const revalidate = 300;

const PAGE_TITLE = "Bullet Train Station — India's MAHSR corridor";
const PAGE_DESCRIPTION =
  "Mumbai–Ahmedabad bullet train stations, kab shuru hogi opening timeline, and NHSRCL progress. Every station covered on one SEO-friendly guide — unofficial, not affiliated with NHSRCL.";

export const metadata = pageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/",
  keywords: [
    "bullet train station",
    "bullet train India",
    "MAHSR",
    "Mumbai Ahmedabad bullet train",
    "Surat bullet train station",
    "bullet train kab shuru hogi",
    "NHSRCL updates",
    "hotels near bullet train station",
  ],
});

export default async function Page() {
  const [homeUpdates, corridors] = await Promise.all([
    loadCorridorUpdatesForHome(6),
    loadExploreCorridors(),
  ]);
  const defaultCorridorId = defaultCorridorSlug(corridors);
  const defaultCorridor = corridors.find((c) => c.id === defaultCorridorId) ?? corridors[0]!;
  const initialStationSlug = resolveDefaultStationSlug(defaultCorridor);
  const initialStation = defaultCorridor.stations.find((s) => s.slug === initialStationSlug);
  const initialExploreProfile: StationExploreProfile = await loadStationExploreProfile(
    initialStationSlug,
    initialStation?.name,
  );

  return (
    <>
      <JsonLd
        data={[
          webSiteSchema(),
          organizationSchema(),
          webPageSchema({ path: "/", title: PAGE_TITLE, description: PAGE_DESCRIPTION }),
          sitePagesItemListSchema(),
        ]}
      />
      <HomePage
        homeUpdates={homeUpdates}
        corridors={corridors}
        defaultCorridorId={defaultCorridorId}
        defaultStationSlug={initialStationSlug}
        initialExploreProfile={initialExploreProfile}
        initialExploreStationSlug={initialStationSlug}
      />
    </>
  );
}