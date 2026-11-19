import Image from "next/image";
import Link from "next/link";
import { SeoSiteNav } from "@/components/SeoSiteNav";
import { BtsIcon } from "@/components/icons/BtsIcon";
import { FOOTER_DISCLAIMER, SITE_NAME, SITE_URL } from "@/lib/site";

export function BtsFooter() {
  const year = new Date().getFullYear();
  const disclaimerLead = "Unofficial guide.";
  const disclaimerBody = FOOTER_DISCLAIMER.replace(/^Unofficial guide —\s*/i, "");

  return (
    <footer className="bts-footer">
      <div className="wrap foot-in">
        <div className="foot-head">
          <Link href="/" className="foot-logo with-ico" aria-label={`${SITE_NAME} home`}>
            <Image src="/brand-logo.png" alt="" width={1025} height={227} className="foot-logo-mark" />
            {SITE_NAME}
          </Link>

          <div className="foot-actions">
            <Link href="/contact" className="foot-get-listed with-ico">
              <BtsIcon name="store" size={16} />
              Get listed
            </Link>
          </div>
        </div>

        <div className="foot-disc" role="note">
          <BtsIcon name="info" size={18} />
          <span>
            <strong>{disclaimerLead}</strong> {disclaimerBody}
          </span>
        </div>

        <SeoSiteNav className="foot-site-nav" omitHome />

        <p className="foot-copy">
          © {year}{" "}
          <a href={SITE_URL} className="foot-bar-link">
              {SITE_NAME}
            </a>
        </p>
      </div>
    </footer>
  );
}