import { JsonLd } from "@/components/JsonLd";
import Image from "next/image";
import { BtsBreadcrumbs } from "@/components/layout/BtsBreadcrumbs";
import { PageShell } from "@/components/PageShell";
import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_E164,
  CONTACT_TEL_HREF,
  CONTACT_WHATSAPP_HREF,
} from "@/lib/contact";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo-schemas";

const PAGE_TITLE = "Contact";
const PAGE_DESCRIPTION =
  "Get in touch about the Mumbai–Ahmedabad bullet train guide, station listings, or corrections. Call or WhatsApp.";

export const metadata = pageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/contact",
  keywords: ["contact bullettrainstation", "MAHSR guide contact", "bullet train station enquiries"],
});

export default function ContactPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          webPageSchema({ path: "/contact", title: PAGE_TITLE, description: PAGE_DESCRIPTION }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />

      <article className="content-page wrap">
        <BtsBreadcrumbs current="Contact" icon="store" />

        <header className="content-hero">
          <span className="pill">Contact</span>
          <h1 className="content-title">Contact</h1>
          <p className="content-lead">
            Partner listings, corrections, and corridor questions — call or WhatsApp.
          </p>
        </header>

        <section className="contact-block" aria-label="Phone">
          <p className="contact-row">
            <span className="contact-icons">
              <a
                href={CONTACT_WHATSAPP_HREF}
                className="contact-icon-btn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WhatsApp ${CONTACT_PHONE_E164}`}
              >
                <Image
                  src="/contact/whatsapp.png"
                  alt=""
                  width={960}
                  height={962}
                  className="contact-icon-img"
                />
              </a>
            </span>
            <a href={CONTACT_TEL_HREF} className="contact-display">
              {CONTACT_PHONE_DISPLAY}
            </a>
          </p>
        </section>
      </article>
    </PageShell>
  );
}