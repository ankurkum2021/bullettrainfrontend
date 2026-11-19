"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ProgressImage } from "@/data/progress-media";
import { progressImageFallbackChain } from "@/lib/progress-image-src";

type Props = {
  image: ProgressImage;
};

export function ProgressTimelinePhoto({ image }: Props) {
  const chain = useMemo(() => progressImageFallbackChain(image), [image.id, image.src, image.localSrc, image.remoteFull]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [image.id]);

  const src = chain[index] ?? chain[0]!;

  return (
    <figure className="station-progress-figure">
      <img
        key={`${image.id}-${index}`}
        src={src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="station-progress-img"
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => {
          setIndex((i) => (i < chain.length - 1 ? i + 1 : i));
        }}
      />
      <figcaption>
        <Link href={image.sourceUrl} target="_blank" rel="noopener noreferrer">
          {image.credit}
        </Link>
      </figcaption>
    </figure>
  );
}