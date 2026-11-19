import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { BtsIcon } from "@/components/icons/BtsIcon";
import { BtsBreadcrumbs } from "@/components/layout/BtsBreadcrumbs";
import { PageShell } from "@/components/PageShell";
import { UpdateSourceLine } from "@/components/updates/UpdateSourceLine";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, newsArticleSchema, webPageSchema } from "@/lib/seo-schemas";
import {
  formatUpdateDate,
  loadCorridorUpdateBySlug,
  loadCorridorUpdates,
  updateTeaser,
} from "@/lib/updates";

export const revalidate = 300;
export const dynamicParams = true;

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const updates = await loadCorridorUpdates();
  return updates.map((u) => ({ slug: u.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = await loadCorridorUpdateBySlug(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: updateTeaser(article),
    path: `/updates/${slug}`,
    keywords: ["bullet train news", "MAHSR", article.title],
  });
}

export default async function UpdateArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await loadCorridorUpdateBySlug(slug);
  if (!article) notFound();

  const bodyParagraphs = (article.body || article.summary)
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <PageShell>
      <JsonLd
        data={[
          webPageSchema({
            path: `/updates/${slug}`,
            title: article.title,
            description: updateTeaser(article),
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Updates", path: "/updates" },
            { name: article.title, path: `/updates/${slug}` },
          ]),
          newsArticleSchema(article),
        ]}
      />

      <article className="content-page wrap">
        <BtsBreadcrumbs
          crumbs={[
            { label: "Updates", href: "/updates" },
          ]}
          current={article.title}
          icon="news"
        />

        <header className="content-hero">
          <time dateTime={article.date} className="update-date with-ico">
            <BtsIcon name="calendar" size={14} />
            {formatUpdateDate(article.date)}
          </time>
          <h1 className="content-title">{article.title}</h1>
        </header>

        <div className="update-article-body">
          {bodyParagraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <UpdateSourceLine sourceSite={article.sourceSite} sourceName={article.sourceName} />

        <p className="content-lead content-lead--compact">
          <Link href="/updates" className="with-ico">
            <BtsIcon name="arrow" size={14} />
            All corridor updates
          </Link>
        </p>
      </article>
    </PageShell>
  );
}