"use client";

import Link from "next/link";
import { BtsIcon } from "@/components/icons/BtsIcon";
import {
  exploreCategoryHref,
  exploreCategorySectionId,
} from "@/lib/explore-anchor";
import { stationExplorePath } from "@/lib/explore-path";

type Props = {
  stationSlug: string;
  categoryId: string;
  label: string;
};

export function ExploreViewAllLink({ stationSlug, categoryId, label }: Props) {
  const href = exploreCategoryHref(stationSlug, categoryId);
  const sectionId = exploreCategorySectionId(stationSlug, categoryId);

  const scrollToSection = () => {
    const el = document.getElementById(sectionId);
    if (!el) return false;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${sectionId}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    return true;
  };

  return (
    <Link
      href={href}
      className="nearby-all-link with-ico"
      onClick={(e) => {
        if (window.location.pathname !== stationExplorePath(stationSlug)) return;
        if (!scrollToSection()) return;
        e.preventDefault();
      }}
    >
      {label}
      <BtsIcon name="arrow" size={14} />
    </Link>
  );
}