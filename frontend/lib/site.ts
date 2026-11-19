const DEFAULT_SITE_URL = "https://bullettrainstation.com";

/** Production domain; override for preview builds with NEXT_PUBLIC_SITE_URL. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL).replace(/\/$/, "");
export const SITE_DOMAIN = "bullettrainstation.com";
/** Visible site brand (nav, footer, PWA) — not the domain slug. */
export const SITE_NAME = "Bullet Train Station";
export const SITE_TAGLINE =
  "India's bullet train stations — construction progress, stop guides, and local explorer by station.";

export const ORG_DISCLAIMER =
  "Unofficial guide — not affiliated with NHSRCL, Indian Railways, or IRCTC.";

export const FOOTER_DISCLAIMER = `${ORG_DISCLAIMER} Fares, live train status, and opening dates are listed only from official announcements; otherwise we mark them as not announced.`;