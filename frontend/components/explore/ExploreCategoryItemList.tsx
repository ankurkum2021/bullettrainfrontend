"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ExploreItemCard } from "@/components/explore/ExploreItemCard";
import { BtsIcon } from "@/components/icons/BtsIcon";
import type { StationExploreCategory } from "@/data/station-explore";

const CAROUSEL_MIN_ITEMS = 4;

type Props = {
  category: StationExploreCategory;
  carousel?: boolean;
};

export function ExploreCategoryItemList({ category, carousel = false }: Props) {
  const listRef = useRef<HTMLUListElement>(null);
  const useCarousel = carousel && category.items.length >= CAROUSEL_MIN_ITEMS;
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const syncEdges = useCallback(() => {
    const el = listRef.current;
    if (!el || !useCarousel) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
  }, [useCarousel]);

  useEffect(() => {
    if (!useCarousel) return;
    const el = listRef.current;
    if (!el) return;
    syncEdges();
    el.addEventListener("scroll", syncEdges, { passive: true });
    const ro = new ResizeObserver(syncEdges);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", syncEdges);
      ro.disconnect();
    };
  }, [useCarousel, syncEdges, category.items.length]);

  const scrollStep = (dir: -1 | 1) => {
    const el = listRef.current;
    if (!el) return;
    const gap = parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap || "12") || 12;
    const slide = el.querySelector<HTMLElement>(":scope > li");
    const step = slide ? slide.offsetWidth + gap : el.clientWidth * 0.9;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const list = (
    <ul
      ref={useCarousel ? listRef : undefined}
      className={`nearby-list${useCarousel ? " explore-nearby-carousel" : ""}`}
    >
      {category.items.map((item) => (
        <li key={item.id}>
          <ExploreItemCard item={item} categoryLabel={category.label} icon={category.icon} />
        </li>
      ))}
    </ul>
  );

  if (!useCarousel) return list;

  return (
    <div className="explore-category-carousel">
      <div className="explore-carousel-controls" aria-hidden={false}>
        <button
          type="button"
          className="explore-carousel-btn"
          aria-label={`Previous ${category.label} listings`}
          disabled={!canPrev}
          onClick={() => scrollStep(-1)}
        >
          <BtsIcon name="arrow" size={18} className="explore-carousel-btn-ico explore-carousel-btn-ico--prev" />
        </button>
        <button
          type="button"
          className="explore-carousel-btn"
          aria-label={`Next ${category.label} listings`}
          disabled={!canNext}
          onClick={() => scrollStep(1)}
        >
          <BtsIcon name="arrow" size={18} className="explore-carousel-btn-ico" />
        </button>
      </div>
      {list}
    </div>
  );
}