import Link from "next/link";
import { ExploreItemThumb } from "@/components/explore/ExploreItemThumb";
import { BtsIcon } from "@/components/icons/BtsIcon";
import type { StationExploreCategory, StationExploreItem } from "@/data/station-explore";
import { formatExploreDistance } from "@/lib/format-distance";

type Props = {
  item: StationExploreItem;
  categoryLabel: string;
  icon: StationExploreCategory["icon"];
};

export function ExploreItemCard({ item, categoryLabel, icon }: Props) {
  const inner = (
    <>
      <ExploreItemThumb item={item} />
      <div className="nearby-item-body">
        <div className="nearby-item-text">
          <strong>{item.name}</strong>
          {item.note ? <span>{item.note}</span> : null}
        </div>
        <div className="nearby-item-meta">
          {typeof item.distanceKm === "number" ? (
            <span className="nearby-item-distance">{formatExploreDistance(item.distanceKm)}</span>
          ) : null}
          <span className="tag with-ico">
            <BtsIcon name={icon} size={12} />
            {categoryLabel}
          </span>
        </div>
      </div>
    </>
  );

  if (item.href) {
    return (
      <Link href={item.href} className="item nearby-item nearby-item--rich">
        {inner}
      </Link>
    );
  }

  return <div className="item nearby-item nearby-item--rich nearby-item--static">{inner}</div>;
}