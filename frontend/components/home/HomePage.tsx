"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PickerDropdown } from "@/components/home/PickerDropdown";
import {
  SelectionSummary,
  StationNearby,
} from "@/components/explore/StationPanels";
import type { ExploreCorridor } from "@/data/explore";
import { stationBySlug } from "@/data/stations";
import { stationBulletTrainName } from "@/lib/station-label";
import { BtsIcon } from "@/components/icons/BtsIcon";
import { BtsShell } from "@/components/layout/BtsShell";
import { SITE_TAGLINE } from "@/lib/site";
import type { StationExploreProfile } from "@/data/station-explore";
import {
  formatUpdateDate,
  updateDetailPath,
  updateTeaser,
  type CorridorUpdate,
} from "@/lib/updates";

type HomePageProps = {
  homeUpdates: CorridorUpdate[];
  corridors: ExploreCorridor[];
  defaultCorridorId: string;
  defaultStationSlug: string;
  initialExploreProfile?: StationExploreProfile;
  initialExploreStationSlug?: string;
};

export function HomePage({
  homeUpdates,
  corridors,
  defaultCorridorId,
  defaultStationSlug,
  initialExploreProfile,
  initialExploreStationSlug,
}: HomePageProps) {
  const [corridorId, setCorridorId] = useState(defaultCorridorId);
  const [stationSlug, setStationSlug] = useState(defaultStationSlug);

  const corridor = useMemo(
    () => corridors.find((c) => c.id === corridorId) ?? corridors[0]!,
    [corridorId, corridors],
  );

  const station = useMemo(
    () => corridor.stations.find((s) => s.slug === stationSlug) ?? corridor.stations[0]!,
    [corridor, stationSlug],
  );

  const onCorridorChange = (id: string) => {
    const next = corridors.find((c) => c.id === id);
    if (!next) return;
    setCorridorId(id);
    setStationSlug(next.stations[0]?.slug ?? "");
  };

  const corridorOptions = corridors.map((c) => ({
    value: c.id,
    label: c.shortName,
    sub: c.status || c.name,
    meta: c.lengthKm ? `${c.lengthKm} km` : undefined,
  }));

  const stationOptions = corridor.stations.map((s) => {
    const detailed = stationBySlug(s.slug);
    const live = s.live ?? detailed?.live;
    return {
      value: s.slug,
      label: stationBulletTrainName(s.slug, s.name),
      sub: detailed?.stateName,
      meta: live ? "First stretch" : undefined,
    };
  });

  const selectedStationLabel = stationBulletTrainName(station.slug, station.name);

  const onStationPick = (slug: string) => {
    setStationSlug(slug);
  };

  return (
    <BtsShell>
        <header className="hero">
          <div className="wrap">
            <h1 className="bts-hero-title">
              <span className="bts-hero-title-line">India&apos;s bullet train,</span>
              <span className="bts-hero-title-accent">station by station</span>
            </h1>
            <p className="lead with-ico">
              <BtsIcon name="compass" size={22} />
              <span>{SITE_TAGLINE}</span>
            </p>
            <div className="picker">
              <PickerDropdown
                label="Corridor"
                value={corridorId}
                options={corridorOptions}
                onChange={onCorridorChange}
                labelIcon={<BtsIcon name="route" size={14} />}
                icon={<BtsIcon name="train" size={16} />}
              />
              <PickerDropdown
                label="Station"
                value={station.slug}
                options={stationOptions}
                onChange={onStationPick}
                labelIcon={<BtsIcon name="pin" size={14} />}
                icon={<BtsIcon name="pin" size={16} />}
              />
            </div>
          </div>
        </header>

        <section className="results wrap" id="development" aria-labelledby="route-heading">
          <div className="route route--explorer">
            <h2 id="route-heading" className="with-ico route-heading">
              <BtsIcon name="route" size={28} />
              <span className="route-title">
                <span className="route-corridor">{corridor.name}</span>
                <span className="route-station">{selectedStationLabel}</span>
              </span>
            </h2>
            <div className="track" role="group" aria-label={`Stations on ${corridor.name}`}>
              {corridor.stations.map((st) => {
                const label = stationBulletTrainName(st.slug, st.name);
                return (
                  <button
                    key={st.slug}
                    type="button"
                    className="stop"
                    aria-current={st.slug === station.slug ? "true" : undefined}
                    aria-label={label}
                    onClick={() => onStationPick(st.slug)}
                  >
                    <b aria-hidden />
                    <span className="stop-name">{st.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="explorer-body" id="explorer-body">
              <SelectionSummary corridor={corridor} station={station} />
              <StationNearby
                station={station}
                initialProfile={
                  station.slug === initialExploreStationSlug ? initialExploreProfile : undefined
                }
                initialStationSlug={initialExploreStationSlug}
              />
            </div>
          </div>
        </section>

        <section className="extra wrap" id="updates">
          <h2 className="with-ico">
            <BtsIcon name="news" size={24} />
            Daily corridor updates
          </h2>
          <p className="lead-sect">
            Curated from official NHSRCL, PIB, and tender sources —{" "}
            <Link href="/updates">full archive</Link>.
          </p>
          <div className="ups">
            {homeUpdates.map((item) => (
              <Link key={item.id} href={updateDetailPath(item.id)} className="up">
                <span className="with-ico">
                  <BtsIcon name="calendar" size={14} />
                  {formatUpdateDate(item.date)}
                </span>
                <h3>{item.title}</h3>
                <p className="up-teaser">{updateTeaser(item)}</p>
              </Link>
            ))}
          </div>
        </section>
    </BtsShell>
  );
}