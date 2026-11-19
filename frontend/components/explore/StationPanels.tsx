"use client";

import {
  type ExploreCorridor,
  type ExploreStation,
} from "@/data/explore";
import { BtsIcon } from "@/components/icons/BtsIcon";
import { stationBySlug } from "@/data/stations";
import { stationBulletTrainName } from "@/lib/station-label";

export { StationNearby } from "@/components/explore/StationNearby";

export function SelectionSummary({
  corridor,
  station,
}: {
  corridor: ExploreCorridor;
  station: ExploreStation;
}) {
  const detailed = stationBySlug(station.slug);
  const stationLabel = stationBulletTrainName(station.slug, station.name);

  return (
    <div className="facts">
      <div className="fact">
        <span className="fact-label with-ico">
          <BtsIcon name="train" size={14} />
          Corridor
        </span>
        <strong>{corridor.shortName}</strong>
        <em>
          {corridor.lengthKm ? `${corridor.lengthKm} km` : "Length not announced"} ·{" "}
          {corridor.stations.length} stations
          {corridor.status ? ` · ${corridor.status}` : ""}
        </em>
      </div>
      <div className="fact">
        <span className="fact-label with-ico">
          <BtsIcon name="pin" size={14} />
          Station
        </span>
        <strong>{stationLabel}</strong>
        <em>{detailed ? detailed.stateName : "Station list not final"}</em>
      </div>
      <div className="fact">
        <span className="fact-label with-ico">
          <BtsIcon name="info" size={14} />
          Progress
        </span>
        <strong>{station.development.headline}</strong>
        <em>{detailed?.status ?? station.development.milestones[0]}</em>
      </div>
    </div>
  );
}