import { BtsIcon } from "@/components/icons/BtsIcon";
import { ExploreCategoryItemList } from "@/components/explore/ExploreCategoryItemList";
import { ExploreViewAllLink } from "@/components/explore/ExploreViewAllLink";
import type { StationExploreCategory } from "@/data/station-explore";
import { stationBulletTrainName } from "@/lib/station-label";

type Props = {
  category: StationExploreCategory;
  stationSlug: string;
  stationName: string;
  headingLevel?: "h2" | "h4";
  sectionId?: string;
};

export function ExploreCategoryPanel({
  category,
  stationSlug,
  stationName,
  headingLevel = "h4",
  sectionId,
}: Props) {
  const stationLabel = stationBulletTrainName(stationSlug, stationName);
  const title = category.panelTitle ?? `${category.label} near ${stationLabel}`;
  const Heading = headingLevel;
  const sectionKey = sectionId ?? `explore-${stationSlug}-${category.id}`;
  const headingId = `${sectionKey}-heading`;
  const Wrapper = headingLevel === "h2" ? "section" : "div";

  return (
    <Wrapper
      id={headingLevel === "h2" ? sectionKey : undefined}
      className={headingLevel === "h2" ? "explore-category-section" : undefined}
      aria-labelledby={headingLevel === "h2" ? headingId : undefined}
    >
      <div className="nearby-panel-head">
        <Heading id={headingId} className={`with-ico explore-category-title nearby-panel-${headingLevel}`}>
          <BtsIcon name={category.icon} size={headingLevel === "h2" ? 22 : 18} />
          <span className="explore-category-title-text">{title}</span>
        </Heading>
        {category.viewAllLabel && headingLevel === "h4" ? (
          <ExploreViewAllLink
            stationSlug={stationSlug}
            categoryId={category.id}
            label={category.viewAllLabel}
          />
        ) : null}
      </div>

      <ExploreCategoryItemList category={category} carousel={headingLevel === "h2"} />
    </Wrapper>
  );
}