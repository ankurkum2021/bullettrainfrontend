"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { BtsIcon } from "@/components/icons/BtsIcon";
import { StationProgressTimeline } from "@/components/stations/StationProgressTimeline";
import type { Station } from "@/data/stations";
import { stationExplorePath } from "@/lib/explore-path";
type Props = {
  stations: Station[];
};

function stationFromHash(stations: Station[], hash: string): string {
  const slug = hash.replace(/^#/, "");
  return stations.some((s) => s.slug === slug) ? slug : stations[0]!.slug;
}

export function StationsDirectory({ stations }: Props) {
  const [activeSlug, setActiveSlug] = useState(stations[0]!.slug);

  const syncHash = useCallback(() => {
    setActiveSlug(stationFromHash(stations, window.location.hash));
  }, [stations]);

  useEffect(() => {
    setActiveSlug(stationFromHash(stations, window.location.hash));
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [stations, syncHash]);

  const pick = (slug: string) => {
    setActiveSlug(slug);
    window.history.replaceState(null, "", `#${slug}`);
    document.getElementById("station-detail")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const maharashtra = stations.filter((s) => s.stateCode === "MH");
  const gujarat = stations.filter((s) => s.stateCode === "GJ");

  return (
    <div className="stations-directory">
      <aside className="stations-rail" aria-label="Choose a station">
        <div className="stations-rail-actions">
          <Link href="/#development" className="stations-rail-explore with-ico">
            <BtsIcon name="compass" size={14} />
            Home
          </Link>
          <Link href="/opening-date" className="stations-rail-explore with-ico">
            <BtsIcon name="calendar" size={14} />
            Opening timeline
          </Link>
        </div>

        <StationRailGroup
          title="Maharashtra"
          code="MH"
          stations={maharashtra}
          activeSlug={activeSlug}
          onPick={pick}
        />
        <StationRailGroup
          title="Gujarat"
          code="GJ"
          stations={gujarat}
          activeSlug={activeSlug}
          onPick={pick}
        />
      </aside>

      <div className="stations-main" id="station-detail">
        <StationPanel
          key={activeSlug}
          station={stations.find((s) => s.slug === activeSlug) ?? stations[0]!}
        />
      </div>
    </div>
  );
}

function StationRailGroup({
  title,
  code,
  stations,
  activeSlug,
  onPick,
}: {
  title: string;
  code: string;
  stations: Station[];
  activeSlug: string;
  onPick: (slug: string) => void;
}) {
  return (
    <div className="stations-rail-group">
      <h2 className="stations-rail-heading">
        {title}
        <span className="stations-rail-code">{code}</span>
      </h2>
      <ul className="stations-rail-list">
        {stations.map((s) => {
          const selected = s.slug === activeSlug;
          return (
            <li key={s.slug}>
              <button
                type="button"
                className={`stations-rail-btn${selected ? " is-active" : ""}`}
                aria-current={selected ? "true" : undefined}
                onClick={() => onPick(s.slug)}
              >
                <span className="stations-rail-order">{s.order}</span>
                <span className="stations-rail-name">{s.name}</span>
                {s.live ? <span className="stations-rail-live">Active</span> : null}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function StationPanel({ station }: { station: Station }) {
  return (
    <section
      id={station.slug}
      className="station-panel is-active"
      aria-labelledby={`${station.slug}-heading`}
    >
      <header className="station-panel-head">
        <h2 id={`${station.slug}-heading`} className="station-heading with-ico">
          <BtsIcon name="pin" size={22} />
          {station.seoHeading}
        </h2>
        {station.live ? (
          <span className="station-badge with-ico">
            <BtsIcon name="train" size={12} />
            Active segment
          </span>
        ) : null}
      </header>

      <dl className="station-facts">
        <div>
          <dt>State</dt>
          <dd>
            {station.stateName} ({station.stateCode}) · Stop {station.order} of 12
          </dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{station.status}</dd>
        </div>
      </dl>

      <p className="station-summary">{station.summary}</p>

      <StationProgressTimeline station={station} />

      <p className="station-explore-cta">
        <Link href={stationExplorePath(station.slug)} className="with-ico">
          <BtsIcon name="compass" size={14} />
          Explore hotels, cabs &amp; nearby — {station.name}
        </Link>
      </p>

      <details className="station-more">
        <summary className="with-ico">
          <BtsIcon name="info" size={14} />
          Related searches
        </summary>
        <p className="station-phrases">{station.searchPhrases.join(" · ")}</p>
      </details>
    </section>
  );
}