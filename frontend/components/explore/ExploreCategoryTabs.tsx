"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { BtsIcon } from "@/components/icons/BtsIcon";
import type { StationExploreCategory } from "@/data/station-explore";
import { exploreCategoryHref, exploreCategorySectionId } from "@/lib/explore-anchor";

type Props = {
  stationSlug: string;
  categories: StationExploreCategory[];
  /** On explore page: scroll to section. On home hub: link to explore + hash. */
  mode: "scroll" | "navigate";
};

export function ExploreCategoryTabs({ stationSlug, categories, mode }: Props) {
  const [activeId, setActiveId] = useState(() => categories[0]?.id ?? "");

  const scrollToCategory = useCallback(
    (categoryId: string) => {
      const id = exploreCategorySectionId(stationSlug, categoryId);
      const el = document.getElementById(id);
      if (!el) return;
      setActiveId(categoryId);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${id}`);
    },
    [stationSlug],
  );

  useEffect(() => {
    if (mode !== "scroll" || categories.length === 0) return;

    const syncFromHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash) return;
      const match = categories.find((c) => hash === exploreCategorySectionId(stationSlug, c.id));
      if (match) {
        setActiveId(match.id);
        requestAnimationFrame(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: "auto", block: "start" });
        });
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [mode, stationSlug, categories]);

  if (categories.length === 0) return null;

  return (
    <div
      className="tabs explore-category-tabs"
      role="tablist"
      aria-label="Explore categories"
    >
      {categories.map((cat) => {
        const selected = mode === "scroll" && cat.id === activeId;
        const content = (
          <>
            <BtsIcon name={cat.icon} size={14} />
            {cat.label}
          </>
        );

        if (mode === "navigate") {
          return (
            <Link
              key={cat.id}
              href={exploreCategoryHref(stationSlug, cat.id)}
              role="tab"
              className="with-ico explore-category-tab"
            >
              {content}
            </Link>
          );
        }

        return (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            className="with-ico explore-category-tab"
            onClick={() => scrollToCategory(cat.id)}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}