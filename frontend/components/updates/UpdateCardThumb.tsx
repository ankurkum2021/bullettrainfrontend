import Image from "next/image";
import { resolveUpdateImage, type UpdateArticleImage } from "@/lib/update-images";
import type { CorridorUpdate } from "@/lib/updates";

type Props = {
  item: CorridorUpdate;
  /** Pre-resolved image skips duplicate work in lists. */
  image?: UpdateArticleImage;
  sizes?: string;
};

export function UpdateCardThumb({ item, image, sizes }: Props) {
  const img = image ?? resolveUpdateImage(item);
  return (
    <div className="update-card-thumb">
      <Image
        src={img.url}
        alt=""
        width={img.width}
        height={img.height}
        sizes={sizes ?? "(max-width: 640px) 72px, 120px"}
        className="update-card-thumb__img"
      />
    </div>
  );
}