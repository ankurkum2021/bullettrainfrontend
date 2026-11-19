import { SeoSiteNav } from "@/components/SeoSiteNav";
import { FOOTER_DISCLAIMER, SITE_NAME, SITE_URL } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <SeoSiteNav className="site-footer-nav" omitHome />
        <p className="disclaimer">{FOOTER_DISCLAIMER}</p>
        <div className="footer-meta">
          <span>
            © {new Date().getFullYear()}{" "}
            <a href={SITE_URL}>{SITE_NAME}</a>
          </span>
          <a href="https://www.nhsrcl.in" target="_blank" rel="noopener noreferrer">
            Official NHSRCL site
          </a>
        </div>
      </div>
    </footer>
  );
}