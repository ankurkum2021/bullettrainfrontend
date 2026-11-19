import Link from "next/link";
import { ExploreStationSections } from "@/components/explore/ExploreStationSections";
import { BtsIcon } from "@/components/icons/BtsIcon";
import { BtsBreadcrumbs } from "@/components/layout/BtsBreadcrumbs";
import { PageShell } from "@/components/PageShell";
import { JsonLd } from "@/components/JsonLd";
import type { ExploreStationContext } from "@/data/explore";
import type { StationExploreProfile } from "@/data/station-explore";
import { exploreCategoryHref } from "@/lib/explore-anchor";
import { stationExplorePath } from "@/lib/explore-path";
import { stationBulletTrainName } from "@/lib/station-label";
import { stationBySlug } from "@/data/stations";
import { breadcrumbSchema, trainStationSchema, webPageSchema } from "@/lib/seo-schemas";

type Props = ExploreStationContext & {
  title: string;
  description: string;
  profile: StationExploreProfile;
};

export function StationExplorePage({ corridor, station, title, description, profile }: Props) {
  const stationLabel = stationBulletTrainName(station.slug, station.name);
  const path = stationExplorePath(station.slug);
  const stationMeta = stationBySlug(station.slug);

  const jsonLd: Record<string, unknown>[] = [
    webPageSchema({ path, title, description }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Stations", path: "/stations" },
      { name: `Explore ${station.name}`, path },
    ]),
  ];
  if (stationMeta) {
    jsonLd.push({
      "@context": "https://schema.org",
      ...trainStationSchema(stationMeta, { pagePath: path }),
    });
  }

  return (
    <PageShell>
      <JsonLd data={jsonLd} />

      <article className="content-page wrap content-page--explore">
        <BtsBreadcrumbs current={`Explore ${station.name}`} icon="compass" />

        <div className="explore-hero-panel">
          <header className="content-hero content-hero--compact explore-hero">
            <span className="pill with-ico">
              <BtsIcon name="route" size={14} />
              {corridor.shortName}
            </span>
            <h1 className="content-title explore-page-title">{stationLabel}</h1>
            <p className="explore-page-eyebrow">Explore · distances from proposed HSR stop</p>
            <p className="content-lead content-lead--compact explore-page-lead">{profile.lead}</p>
          </header>

          <nav className="explore-quick-links" aria-label="Related station pages">
            <Link href="/#development" className="explore-quick-link with-ico">
              <BtsIcon name="compass" size={14} />
              Corridor explorer
            </Link>
            <Link href={exploreCategoryHref(station.slug, "cabs")} className="explore-quick-link with-ico">
              <BtsIcon name="cab" size={14} />
              Cabs
            </Link>
          </nav>
        </div>

        <ExploreStationSections profile={profile} station={station} />
      </article>
    </PageShell>
  );
}
