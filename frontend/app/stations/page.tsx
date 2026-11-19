import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { BtsIcon } from "@/components/icons/BtsIcon";
import { BtsBreadcrumbs } from "@/components/layout/BtsBreadcrumbs";
import { PageShell } from "@/components/PageShell";
import { StationsDirectory } from "@/components/stations/StationsDirectory";
import { MAHSR_CORRIDOR, STATIONS, type Station } from "@/data/stations";
import { pageMetadata } from "@/lib/metadata";
import {
  breadcrumbSchema,
  stationHubSchema,
  webPageSchema,
} from "@/lib/seo-schemas";

const PAGE_TITLE = "All bullet train stations — Mumbai to Ahmedabad (MAHSR)";
const PAGE_DESCRIPTION =
  "Complete list of MAHSR bullet train stations: Mumbai BKC, Thane, Virar, Boisar, Vapi, Bilimora, Surat, Bharuch, Vadodara, Anand, Ahmedabad, and Sabarmati. One guide, every station name.";

const stationKeywords = STATIONS.flatMap((s) => s.searchPhrases);

export const metadata = pageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/stations",
  keywords: [
    "bullet train stations",
    "MAHSR stations",
    "Mumbai Ahmedabad bullet train stops",
    ...stationKeywords.slice(0, 24),
  ],
});

export default function StationsPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          webPageSchema({ path: "/stations", title: PAGE_TITLE, description: PAGE_DESCRIPTION }),
          stationHubSchema(STATIONS),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Stations", path: "/stations" },
          ]),
        ]}
      />

      <article className="content-page wrap content-page--stations">
        <BtsBreadcrumbs current="Stations" icon="stations" />

        <header className="content-hero content-hero--compact">
          <span className="pill with-ico">
            <BtsIcon name="route" size={14} />
            {MAHSR_CORRIDOR.lengthKm} km · {STATIONS.length} stations
          </span>
          <h1 className="content-title with-ico">
            <BtsIcon name="stations" size={26} />
            All MAHSR stations
          </h1>
          <p className="content-lead content-lead--compact">
            Mumbai BKC through Sabarmati — civil works, energisation, and opening targets by stop.
          </p>
        </header>

        <StationsDirectory stations={STATIONS} />

        <section className="stations-seo-archive" aria-label="Full station index for search engines">
          {STATIONS.map((station) => (
            <SeoStationSnippet key={station.slug} station={station} />
          ))}
        </section>

        <p className="stations-back">
          <Link href="/" className="section-link with-ico">
            Back to corridor explorer
            <BtsIcon name="arrow" size={16} />
          </Link>
        </p>
      </article>
    </PageShell>
  );
}

/** Visually collapsed; keeps full copy in the document for crawlers. */
function SeoStationSnippet({ station }: { station: Station }) {
  return (
    <div className="station-seo-snippet" id={`seo-${station.slug}`}>
      <h2 className="station-seo-snippet-title">{station.seoHeading}</h2>
      <p>{station.summary}</p>
      <p>{station.status}</p>
    </div>
  );
}