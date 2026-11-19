const NHSRCL_PRESS_BASE = "https://www.nhsrcl.in/press-release";

/** Build the public article URL NHSRCL uses for a press-release headline. */
export function slugifyNhsrclPressTitle(title: string): string {
  const normalized = title
    .normalize("NFKD")
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/['']/g, "")
    .toLowerCase();

  return normalized
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function nhsrclPressReleaseUrl(title: string): string {
  return `${NHSRCL_PRESS_BASE}/${slugifyNhsrclPressTitle(title)}`;
}