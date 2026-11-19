import Image from "next/image";
import type { StationExploreItem } from "@/data/station-explore";

export function ExploreItemThumb({ item }: { item: StationExploreItem }) {
  if (!item.image) {
    return <span className="nearby-item-thumb nearby-item-thumb--empty" aria-hidden />;
  }

  return (
    <span className="nearby-item-thumb">
      <Image
        src={item.image.src}
        alt={item.image.alt}
        width={88}
        height={88}
        sizes="88px"
        className="nearby-item-img"
      />
    </span>
  );
}