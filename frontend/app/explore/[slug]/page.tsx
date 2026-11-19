import { notFound } from "next/navigation";
import { StationExplorePage } from "@/components/explore/StationExplorePage";
import { allExploreStationSlugs, exploreStationBySlug } from "@/data/explore";
import { loadStationExploreProfile } from "@/lib/places";
import { stationBySlug } from "@/data/stations";
import { stationExplorePath } from "@/lib/explore-path";
import { pageMetadata } from "@/lib/metadata";
import { stationBulletTrainName } from "@/lib/station-label";

type PageProps = { params: Promise<{ slug: string }> };

export const revalidate = 300;

export function generateStaticParams() {
  return allExploreStationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const ctx = exploreStationBySlug(slug);
  if (!ctx) return {};

  const profile = await loadStationExploreProfile(slug, ctx.station.name);
  const label = stationBulletTrainName(slug, ctx.station.name);
  const title = `Explore ${label}`;
  const description = `${profile.lead} ${ctx.station.development.headline}`.trim();

  return pageMetadata({
    title,
    description,
    path: stationExplorePath(slug),
    keywords: [
      title,
      `things near ${ctx.station.name} bullet train station`,
      ...profile.categories.map((c) => `${c.label} near ${ctx.station.name} HSR`),
      ...(stationBySlug(slug)?.searchPhrases.slice(0, 6) ?? []),
    ],
  });
}

export default async function ExploreStationRoute({ params }: PageProps) {
  const { slug } = await params;
  const ctx = exploreStationBySlug(slug);
  if (!ctx) notFound();

  const profile = await loadStationExploreProfile(slug, ctx.station.name);
  const label = stationBulletTrainName(slug, ctx.station.name);
  const title = `Explore ${label}`;
  const description = `${profile.lead} ${ctx.station.development.headline}`.trim();

  return (
    <StationExplorePage
      corridor={ctx.corridor}
      station={ctx.station}
      title={title}
      description={description}
      profile={profile}
    />
  );
}