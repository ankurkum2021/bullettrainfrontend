import Link from "next/link";
import { BtsIcon, ROUTE_ICONS } from "@/components/icons/BtsIcon";
import { INDEXABLE_ROUTES } from "@/lib/indexable-routes";
import { SITE_NAME } from "@/lib/site";

type Props = {
  className?: string;
  /** Skip home when already on landing page */
  omitHome?: boolean;
};

export function SeoSiteNav({ className = "", omitHome = false }: Props) {
  const routes = omitHome ? INDEXABLE_ROUTES.filter((r) => r.path !== "/") : INDEXABLE_ROUTES;

  return (
    <nav className={`seo-site-nav ${className}`.trim()} aria-label="Site pages">
      <p className="seo-site-nav-title with-ico">
        <BtsIcon name="compass" size={14} />
        Explore {SITE_NAME}
      </p>
      <ul className="seo-site-nav-list">
        {routes.map((route) => (
          <li key={route.path}>
            <Link href={route.path} title={route.description} className="with-ico">
              <BtsIcon name={ROUTE_ICONS[route.path] ?? "stations"} size={14} />
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}