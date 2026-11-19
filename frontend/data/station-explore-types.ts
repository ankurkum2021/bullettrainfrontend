import type { IconName } from "@/components/icons/BtsIcon";
import type { ExploreImage } from "@/data/explore-images";

export type StationExploreItem = {
  id: string;
  name: string;
  note: string;
  distanceKm: number;
  image?: ExploreImage;
  href?: string;
};

export type StationExploreCategory = {
  id: string;
  label: string;
  icon: IconName;
  panelTitle?: string;
  viewAllLabel?: string;
  items: StationExploreItem[];
};

export type StationExploreProfile = {
  lead: string;
  categories: StationExploreCategory[];
};