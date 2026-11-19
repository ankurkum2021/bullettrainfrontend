"use client";

import type { ReactNode } from "react";
import { useMemo } from "react";
import { BtsIcon } from "@/components/icons/BtsIcon";
import { ProgressTimelinePhoto } from "@/components/stations/ProgressTimelinePhoto";
import {
  progressStateHint,
  progressStateLabel,
  stationProgressSteps,
  type ProgressState,
} from "@/data/station-progress";
import type { Station } from "@/data/stations";

function stateIcon(state: ProgressState) {
  switch (state) {
    case "done":
      return "route";
    case "active":
      return "train";
    case "upcoming":
      return "calendar";
    default:
      return "info";
  }
}

type Props = {
  station: Station;
  compact?: boolean;
};

export function StationProgressTimeline({ station, compact }: Props) {
  const steps = useMemo(() => stationProgressSteps(station), [station.slug]);

  return (
    <div className={`station-progress${compact ? " station-progress--compact" : ""}`}>
      <h3 className="station-progress-title with-ico">
        <BtsIcon name="route" size={18} />
        {station.name} — construction progress
      </h3>
      <p className="station-progress-note">
        Images and milestones trace to{" "}
        <a href="https://www.nhsrcl.in/media-gallery.aspx" target="_blank" rel="noopener noreferrer">
          NHSRCL
        </a>{" "}
        (official project owner). We are not affiliated.{" "}
        <code className="station-progress-path">public/progress/{station.slug}/</code> overrides hotlinking when mirrored.
      </p>

      <ul className="station-progress-legend" aria-label="Status legend">
        {(["done", "active", "upcoming", "tbd"] as const).map((state) => (
          <li key={state}>
            <span className={`station-progress-legend-chip station-progress-legend-chip--${state}`}>
              {progressStateLabel(state)}
            </span>
          </li>
        ))}
      </ul>

      <div
        className="station-progress-scroll"
        tabIndex={0}
        role="region"
        aria-label={`Horizontal construction timeline for ${station.name}`}
      >
        <ol
          className="station-progress-tl station-progress-tl--horizontal"
          aria-label={`Progress timeline for ${station.name}`}
        >
          {steps.map((step, i) => (
            <li
              key={`${station.slug}-${step.label}`}
              data-state={step.state}
              className={`is-state-${step.state}`}
            >
              <div className="station-progress-top">
                <time
                  className="station-progress-year"
                  dateTime={step.year.replace(/[^\d–-]/g, "") || undefined}
                >
                  {step.year}
                </time>
                <TimelineNode state={step.state}>
                  <span className="station-progress-marker" aria-hidden>
                    <BtsIcon name={stateIcon(step.state)} size={14} />
                  </span>
                </TimelineNode>
              </div>

              <article className={`station-progress-card station-progress-card--${step.state}`}>
                <ProgressTimelinePhoto image={step.image} />
                <p className="station-progress-label">
                  <span className="station-progress-phase">
                    Phase {i + 1} · {station.name}
                  </span>
                  {step.label}
                </p>
                <p className="station-progress-status">
                  <span className={`station-progress-badge station-progress-badge--${step.state}`}>
                    {progressStateLabel(step.state)}
                  </span>
                  <span className="station-progress-badge-hint">{progressStateHint(step.state)}</span>
                </p>
                {step.detail ? <p className="station-progress-detail">{step.detail}</p> : null}
              </article>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function TimelineNode({ state, children }: { state: ProgressState; children: ReactNode }) {
  return (
    <div className="station-progress-node" data-state={state}>
      {children}
    </div>
  );
}