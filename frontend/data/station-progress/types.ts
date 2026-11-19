import type { ProgressImage } from "@/data/progress-media";

export type ProgressState = "done" | "active" | "upcoming" | "tbd";

export type StationProgressStep = {
  label: string;
  state: ProgressState;
  year: string;
  detail?: string;
  image: ProgressImage;
};

const STATE_LABEL: Record<ProgressState, string> = {
  done: "Complete",
  active: "In progress",
  upcoming: "Next",
  tbd: "Not announced",
};

const STATE_HINT: Record<ProgressState, string> = {
  done: "Finished per public NHSRCL reports",
  active: "Construction active on this phase now",
  upcoming: "Next phase in the station programme",
  tbd: "No published schedule for this phase",
};

export function progressStateLabel(state: ProgressState): string {
  return STATE_LABEL[state];
}

export function progressStateHint(state: ProgressState): string {
  return STATE_HINT[state];
}