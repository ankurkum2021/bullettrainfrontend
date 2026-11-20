import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { BtsIcon } from "@/components/icons/BtsIcon";
import { BtsBreadcrumbs } from "@/components/layout/BtsBreadcrumbs";
import { PageShell } from "@/components/PageShell";
import { UpdateArticleImage } from "@/components/updates/UpdateArticleImage";
import { UpdateSourceLine } from "@/components/updates/UpdateSourceLine";
import { pageMetadata } from "@/lib/metadata";
import { resolveUpdateImage } from "@/lib/update-images";
import { breadcrumbSchema, newsArticleSchema, webPageSchema } from "@/lib/seo-schemas";
import {
  formatUpdateDate,
  loadCorridorUpdateBySlug,
  loadCorridorUpdates,
  updateMetaDescription,
  updateArticleParagraphs,
  updateBrief,
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
  const hero = resolveUpdateImage(article);
  return pageMetadata({
    title: article.title,
    description: updateMetaDescription(article),
    path: `/updates/${slug}`,
    keywords: ["bullet train news", "MAHSR", article.title],
    ogImage: {
      url: hero.url,
      width: hero.width,
      height: hero.height,
      alt: hero.alt,
    },
  });
}

export default async function UpdateArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await loadCorridorUpdateBySlug(slug);
  if (!article) notFound();

  const bodyParagraphs = updateArticleParagraphs(article);
  const heroImage = resolveUpdateImage(article);
  const lead = updateBrief(article);

  return (
    <PageShell>
      <JsonLd
        data={[
          webPageSchema({
            path: `/updates/${slug}`,
            title: article.title,
            description: updateMetaDescription(article),
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Updates", path: "/updates" },
            { name: article.title, path: `/updates/${slug}` },
          ]),
          newsArticleSchema(article, heroImage.url),
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

        <UpdateArticleImage image={heroImage} priority />

        <p className="update-article-lead">{lead}</p>

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