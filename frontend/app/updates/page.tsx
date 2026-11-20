import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { BtsIcon } from "@/components/icons/BtsIcon";
import { BtsBreadcrumbs } from "@/components/layout/BtsBreadcrumbs";
import { PageShell } from "@/components/PageShell";
import { UpdateCardThumb } from "@/components/updates/UpdateCardThumb";
import { UpdateSourceLine } from "@/components/updates/UpdateSourceLine";
import {
  formatUpdateDate,
  loadCorridorUpdates,
  updateDetailPath,
  updateBrief,
} from "@/lib/updates";

export const revalidate = 300;
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, updatesItemListSchema, webPageSchema } from "@/lib/seo-schemas";

const PAGE_TITLE = "Bullet train updates — NHSRCL & corridor news";
const PAGE_DESCRIPTION =
  "Daily-style feed of Mumbai–Ahmedabad bullet train progress: NHSRCL press releases, PIB items, and construction milestones. Unofficial summary with links to official sources.";

export const metadata = pageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/updates",
  rssFeed: true,
  keywords: [
    "bullet train news",
    "NHSRCL updates",
    "MAHSR progress",
    "bullet train India latest",
  ],
});

export default async function UpdatesPage() {
  const updates = await loadCorridorUpdates();

  return (
    <PageShell>
      <JsonLd
        data={[
          webPageSchema({ path: "/updates", title: PAGE_TITLE, description: PAGE_DESCRIPTION }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Updates", path: "/updates" },
          ]),
          updatesItemListSchema(updates),
        ]}
      />

      <article className="content-page wrap">
        <BtsBreadcrumbs current="Updates" icon="news" />

        <header className="content-hero">
          <span className="pill with-ico">
            <BtsIcon name="news" size={14} />
            Corridor news
          </span>
          <h1 className="content-title with-ico">
            <BtsIcon name="news" size={28} />
            {PAGE_TITLE}
          </h1>
          <p className="content-lead">
            NHSRCL milestones, PIB releases, and tender signals on the MAHSR corridor.{" "}
            <Link href="/stations">All stations</Link>.
          </p>
        </header>

        <ol className="updates-list">
          {updates.map((item) => (
            <li key={item.id} id={item.id} className="update-card update-card--with-thumb">
              <UpdateCardThumb item={item} sizes="(max-width: 640px) 88px, 140px" />
              <div className="update-card__body">
              <time dateTime={item.date} className="update-date with-ico">
                <BtsIcon name="calendar" size={14} />
                {formatUpdateDate(item.date)}
              </time>
              <h2 className="update-title with-ico">
                <BtsIcon name="news" size={18} />
                <Link href={updateDetailPath(item.id)}>{item.title}</Link>
              </h2>
              <p className="update-summary update-summary--brief">{updateBrief(item)}</p>
              <Link href={updateDetailPath(item.id)} className="update-read-more with-ico">
                Read full update
                <BtsIcon name="arrow" size={12} />
              </Link>
              <UpdateSourceLine sourceSite={item.sourceSite} sourceName={item.sourceName} />
              </div>
            </li>
          ))}
        </ol>
      </article>
    </PageShell>
  );
}