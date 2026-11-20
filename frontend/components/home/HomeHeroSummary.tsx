import Link from "next/link";

/**
 * Crawlable intro on the home hero — complements H1/title without duplicating meta spam.
 */
export function HomeHeroSummary() {
  return (
    <div className="hero-summary">
      <p>
        India&apos;s bullet train network centers on the{" "}
        <strong>Mumbai–Ahmedabad High Speed Rail (MAHSR)</strong> corridor — a 508 km{" "}
        <strong>NHSRCL</strong> line from Mumbai BKC to Sabarmati with Japanese Shinkansen
        technology, viaducts, depots, and twelve stations from Thane and Virar through Surat,
        Bilimora, Vapi, Bharuch, Vadodara, and Ahmedabad. Construction milestones,{" "}
        <strong>overhead line equipment (OHE)</strong> energisation, traction substations, and
        station civil works are reported as they are announced; we do not invent fares, timetables,
        or opening days.
      </p>
      <p>
        Use the corridor picker below to explore every stop on MAHSR and other planned high-speed
        routes. Read{" "}
        <Link href="/updates">bullet train news and NHSRCL updates</Link>, the full{" "}
        <Link href="/stations">MAHSR station list</Link>, and our{" "}
        <Link href="/opening-date">MAHSR opening timeline</Link> for officially cited passenger
        service targets. This site is an unofficial guide — not affiliated with NHSRCL,
        Indian Railways, or IRCTC.
      </p>
    </div>
  );
}