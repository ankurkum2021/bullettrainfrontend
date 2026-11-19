import type { Metadata } from "next";
import Link from "next/link";
import { BtsIcon } from "@/components/icons/BtsIcon";
import { PageShell } from "@/components/PageShell";
import { SeoSiteNav } from "@/components/SeoSiteNav";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "This page is not on this site. Use the links below for MAHSR stations, opening timeline, and updates.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <PageShell>
      <article className="content-page wrap">
        <h1 className="content-title with-ico">
          <BtsIcon name="info" size={28} />
          Page not found
        </h1>
        <p className="content-lead">
          That URL is not part of this site. Station guides live on a single{" "}
          <Link href="/stations">stations page</Link> (use in-page anchors, not separate city URLs).
        </p>
        <SeoSiteNav />
      </article>
    </PageShell>
  );
}