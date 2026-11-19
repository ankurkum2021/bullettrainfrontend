const SITE_URLS: Record<string, string> = {
  "nhsrcl.in": "https://www.nhsrcl.in/",
  "pib.gov.in": "https://www.pib.gov.in/",
};

export function officialSourceHref(site: string): string {
  return SITE_URLS[site] ?? "https://www.nhsrcl.in/";
}