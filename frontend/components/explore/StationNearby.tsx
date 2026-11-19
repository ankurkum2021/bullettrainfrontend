"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ExploreStation } from "@/data/explore";
import { ExploreCategoryPanel } from "@/components/explore/ExploreCategoryPanel";
import { useStationExploreProfile } from "@/components/explore/useStationExploreProfile";
import type { StationExploreCategory, StationExploreProfile } from "@/data/station-explore";
import { BtsIcon } from "@/components/icons/BtsIcon";
import { stationExplorePath } from "@/lib/explore-path";
import { stationBulletTrainName } from "@/lib/station-label";

function firstCategoryId(categories: StationExploreCategory[]): string {
  return categories[0]?.id ?? "";
}

type StationNearbyProps = {
  station: ExploreStation;
  initialProfile?: StationExploreProfile;
  initialStationSlug?: string;
};

export function StationNearby({
  station,
  initialProfile,
  initialStationSlug,
}: StationNearbyProps) {
  const stationLabel = stationBulletTrainName(station.slug, station.name);
  const exploreHref = stationExplorePath(station.slug);
  const profile = useStationExploreProfile(station.slug, station.name, {
    initialProfile,
    initialStationSlug,
  });

  const [activeId, setActiveId] = useState(() => firstCategoryId(profile.categories));

  useEffect(() => {
    const ids = profile.categories.filter((c) => c.items.length > 0).map((c) => c.id);
    setActiveId((prev) => (ids.includes(prev) ? prev : firstCategoryId(profile.categories)));
  }, [station.slug, profile.categories]);

  const categories = profile.categories.filter((c) => c.items.length > 0);
  const active = categories.find((c) => c.id === activeId) ?? categories[0];
  const panelId = `nearby-panel-${station.slug}-${active?.id ?? "none"}`;

  if (!active) {
    return (
      <article className="nearby-hub">
        <header className="nearby-hub-head">
          <div className="nearby-hub-title-row">
            <h3 className="with-ico nearby-hub-title">
              <BtsIcon name="compass" size={20} />
              Near {stationLabel}
            </h3>
            <Link href={exploreHref} className="nearby-explore-link with-ico">
              Explore
              <BtsIcon name="arrow" size={14} />
            </Link>
          </div>
        </header>
        <p className="nearby-empty">Nothing listed yet.</p>
      </article>
    );
  }

  return (
    <article className="nearby-hub">
      <header className="nearby-hub-head">
        <div className="nearby-hub-title-row">
          <h3 className="with-ico nearby-hub-title">
            <BtsIcon name="compass" size={20} />
            Near {stationLabel}
          </h3>
          <Link href={exploreHref} className="nearby-explore-link with-ico">
            Explore
            <BtsIcon name="arrow" size={14} />
          </Link>
        </div>
        <p className="nearby-hub-lead">{profile.lead}</p>
      </header>

      <div className="tabs" role="tablist" aria-label={`Explore near ${station.name}`}>
        {categories.map((cat) => {
          const selected = cat.id === active.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              id={`nearby-tab-${station.slug}-${cat.id}`}
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              className="with-ico"
              onClick={() => setActiveId(cat.id)}
            >
              <BtsIcon name={cat.icon} size={14} />
              {cat.label}
            </button>
          );
        })}
      </div>

      <section
        id={panelId}
        role="tabpanel"
        aria-labelledby={`nearby-tab-${station.slug}-${active.id}`}
        className="nearby-panel"
      >
        <ExploreCategoryPanel
          category={active}
          stationSlug={station.slug}
          stationName={station.name}
          headingLevel="h4"
        />
      </section>
    </article>
  );
}