"use client";

import { ExploreCategoryPanel } from "@/components/explore/ExploreCategoryPanel";
import { ExploreCategoryTabs } from "@/components/explore/ExploreCategoryTabs";
import type { ExploreStation } from "@/data/explore";
import type { StationExploreProfile } from "@/data/station-explore";
import { exploreCategorySectionId } from "@/lib/explore-anchor";

type Props = {
  profile: StationExploreProfile;
  station: ExploreStation;
};

export function ExploreStationSections({ profile, station }: Props) {
  const categories = profile.categories.filter((c) => c.items.length > 0);

  return (
    <>
      <ExploreCategoryTabs stationSlug={station.slug} categories={categories} mode="scroll" />
      <div className="explore-station-sections">
        {categories.map((category) => (
          <ExploreCategoryPanel
            key={category.id}
            category={category}
            stationSlug={station.slug}
            stationName={station.name}
            headingLevel="h2"
            sectionId={exploreCategorySectionId(station.slug, category.id)}
          />
        ))}
      </div>
    </>
  );
}