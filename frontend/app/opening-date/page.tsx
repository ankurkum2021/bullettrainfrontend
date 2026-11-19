import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { BtsIcon } from "@/components/icons/BtsIcon";
import { BtsBreadcrumbs } from "@/components/layout/BtsBreadcrumbs";
import { PageShell } from "@/components/PageShell";
import { OPENING_FAQ } from "@/data/opening-faq";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/seo-schemas";

const PAGE_TITLE = "Bullet train kab shuru hogi? Opening date & timeline";
const PAGE_DESCRIPTION =
  "When does India's Mumbai–Ahmedabad bullet train start? Official targets for Surat–Bilimora, Gujarat, and full MAHSR opening — only announced dates, nothing guessed.";

export const metadata = pageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/opening-date",
  keywords: [
    "bullet train kab shuru hogi",
    "bullet train start date",
    "Mumbai Ahmedabad bullet train opening",
    "Surat bullet train start",
    "MAHSR opening date",
    "बुलेट ट्रेन कब शुरू होगी",
  ],
});

export default function OpeningDatePage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          webPageSchema({ path: "/opening-date", title: PAGE_TITLE, description: PAGE_DESCRIPTION }),
          faqSchema([...OPENING_FAQ]),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Opening timeline", path: "/opening-date" },
          ]),
        ]}
      />

      <article className="content-page wrap">
        <BtsBreadcrumbs current="Opening timeline" icon="calendar" />

        <header className="content-hero">
          <span className="pill with-ico">
            <BtsIcon name="calendar" size={14} />
            Kab shuru hogi
          </span>
          <h1 className="content-title with-ico">
            <BtsIcon name="calendar" size={28} />
            {PAGE_TITLE}
          </h1>
          <p className="content-lead">
            This page answers India&apos;s most common bullet train question using{" "}
            <strong>only announced or officially cited targets</strong>. If something has not been
            announced, we say so — we do not invent fares, timetables, or opening days.
          </p>
        </header>

        <section className="prose-block" aria-labelledby="timeline-heading">
          <h2 id="timeline-heading" className="section-title with-ico">
            <BtsIcon name="info" size={20} />
            What officials have said so far
          </h2>
          <ul className="timeline-list">
            <li>
              <strong>Late 2026:</strong> Construction milestones on the Surat–Bilimora section,
              including OHE energisation on the ~50 km stretch (not passenger service).
            </li>
            <li>
              <strong>Target 15 Aug 2027:</strong> Initial commercial operation on the Surat–Vapi /
              Surat–Bilimora section with Indian B28 trainsets (subject to commissioning and safety
              certification).
            </li>
            <li>
              <strong>Around 2028 (discussed):</strong> Partial progression toward Ahmedabad; not a
              confirmed date for every station.
            </li>
            <li>
              <strong>Early 2029 (cited for full corridor):</strong> Full BKC–Sabarmati line in public
              project timelines — station-by-station opening may still vary.
            </li>
            <li>
              <strong>Maharashtra segment:</strong> Thane, Virar, Boisar, and Mumbai BKC are not
              expected to see passenger traffic before the wider corridor catches up (~2029 in
              planning commentary).
            </li>
          </ul>
          <p className="content-note">
            Always verify on{" "}
            <a
              href="https://www.nhsrcl.in"
              rel="noopener noreferrer"
              target="_blank"
              className="with-ico"
            >
              nhsrcl.in
              <BtsIcon name="external" size={12} />
            </a>{" "}
            before you travel or plan stays. See also{" "}
            <Link href="/stations#surat">Surat bullet train station</Link> and{" "}
            <Link href="/stations">all MAHSR stations</Link>.
          </p>
        </section>

        <section className="faq-section" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="section-title with-ico">
            <BtsIcon name="info" size={20} />
            Frequently asked questions
          </h2>
          <dl className="faq-list">
            {OPENING_FAQ.map((item) => (
              <div key={item.question} className="faq-item">
                <dt className="with-ico">
                  <BtsIcon name="info" size={16} />
                  {item.question}
                </dt>
                <dd>{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      </article>
    </PageShell>
  );
}