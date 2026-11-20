import Image from "next/image";
import type { UpdateArticleImage } from "@/lib/update-images";

type Props = {
  image: UpdateArticleImage;
  priority?: boolean;
  className?: string;
};

export function UpdateArticleImage({ image, priority, className }: Props) {
  const klass = className ? `update-article-image ${className}` : "update-article-image";
  return (
    <figure className={klass}>
      <Image
        src={image.url}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(max-width: 720px) 100vw, min(720px, 92vw)"
        className="update-article-image__img"
        priority={priority}
      />
      <figcaption className="update-article-image__credit">Image: NHSRCL (official programme media)</figcaption>
    </figure>
  );
}