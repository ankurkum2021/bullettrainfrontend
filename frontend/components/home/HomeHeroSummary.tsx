import Link from "next/link";

/**
 * Crawlable intro on the home hero — complements H1/title without duplicating meta spam.
 */
export function HomeHeroSummary() {
  return (
    <div className="hero-summary">
      <p>
        <strong>Bullet Train Station</strong> is an unofficial guide to India&apos;s high-speed rail
        projects — station construction, viaducts, depots, and systems work sourced from published
        agency and tender releases. We track what is officially announced; we do not invent fares,
        timetables, or opening dates.
      </p>
      <p>
        Pick a corridor and station below, or jump to{" "}
        <Link href="/updates">daily project updates</Link>, the{" "}
        <Link href="/stations">full station directory</Link>, and our{" "}
        <Link href="/opening-date">opening timeline</Link> when passenger service targets are cited.
        Unofficial guide — not affiliated with NHSRCL, Indian Railways, or IRCTC.
      </p>
    </div>
  );
}