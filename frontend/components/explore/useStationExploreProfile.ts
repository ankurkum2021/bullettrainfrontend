"use client";

import { useEffect, useMemo, useState } from "react";
import { emptyExploreProfile, type StationExploreProfile } from "@/data/station-explore";

type PlacesApiResponse = {
  profile: StationExploreProfile;
};

type Options = {
  /** Server-loaded profile for the first selected station (avoids flash). */
  initialProfile?: StationExploreProfile;
  initialStationSlug?: string;
};

export function useStationExploreProfile(
  stationSlug: string,
  stationName: string,
  options?: Options,
): StationExploreProfile {
  const staticFallback = useMemo(
    () => emptyExploreProfile(stationName),
    [stationName],
  );

  const [profile, setProfile] = useState<StationExploreProfile>(() => {
    if (
      options?.initialProfile &&
      options.initialStationSlug &&
      options.initialStationSlug === stationSlug
    ) {
      return options.initialProfile;
    }
    return staticFallback;
  });

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch(`/api/bts/stations/${encodeURIComponent(stationSlug)}/places`);
        if (!res.ok || cancelled) return;
        const data = (await res.json()) as PlacesApiResponse;
        if (data.profile && !cancelled) {
          setProfile(data.profile);
        }
      } catch {
        if (!cancelled) setProfile(staticFallback);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [stationSlug, stationName, staticFallback]);

  return profile;
}