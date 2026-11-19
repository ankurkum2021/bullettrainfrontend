"use client";

import { EXPLORE_CORRIDORS, type ExploreCorridor } from "@/data/explore";

type Props = {
  corridor: ExploreCorridor | null;
  stationSlug: string;
  onCorridorChange: (id: string) => void;
  onStationChange: (slug: string) => void;
};

export function CorridorSelect({
  corridor,
  stationSlug,
  onCorridorChange,
  onStationChange,
}: Props) {
  return (
    <div className="cex-controls">
      <div className="cex-field">
        <label htmlFor="cex-corridor">Corridor</label>
        <div className="cex-select-wrap">
          <select
            id="cex-corridor"
            className="cex-select"
            value={corridor?.id ?? ""}
            onChange={(e) => onCorridorChange(e.target.value)}
          >
            {EXPLORE_CORRIDORS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
                {c.lengthKm ? ` (${c.lengthKm} km)` : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="cex-field">
        <label htmlFor="cex-station">Station</label>
        <div className="cex-select-wrap">
          <select
            id="cex-station"
            className="cex-select"
            value={stationSlug}
            disabled={!corridor}
            onChange={(e) => onStationChange(e.target.value)}
          >
            {corridor?.stations.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}