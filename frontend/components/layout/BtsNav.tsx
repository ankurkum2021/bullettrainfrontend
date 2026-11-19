"use client";

import { BtsIcon, type IconName } from "@/components/icons/BtsIcon";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";
import { SITE_NAME } from "@/lib/site";

const LINKS: {
  href: string;
  label: string;
  icon: IconName;
  match: (p: string) => boolean;
}[] = [
  { href: "/#development", label: "Explore", icon: "compass", match: (p) => p === "/" },
  { href: "/stations", label: "Stations", icon: "stations", match: (p) => p === "/stations" },
  {
    href: "/opening-date",
    label: "Opening",
    icon: "calendar",
    match: (p) => p === "/opening-date",
  },
];

type Props = { scrollProgress: number };

export function BtsNav({ scrollProgress }: Props) {
  const pathname = usePathname() ?? "/";
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const navStyle = { "--nav-scroll": String(scrollProgress) } as CSSProperties;

  return (
    <nav
      className="nav--scroll"
      style={navStyle}
      data-nav-dark={scrollProgress >= 0.12 ? "" : undefined}
      data-nav-solid={scrollProgress >= 0.88 ? "" : undefined}
    >
      <div className="wrap nav-wrap">
        <div className={`bar${menuOpen ? " bar--menu-open" : ""}`}>
          <Link href="/" className="brand" onClick={() => setMenuOpen(false)}>
            <Image
              src="/brand-logo.png"
              alt=""
              width={1025}
              height={227}
              className="brand-logo"
              priority
            />
            <span className="brand-text">{SITE_NAME}</span>
          </Link>

          <button
            type="button"
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="site-nav-links"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>

          <div id="site-nav-links" className={`links${menuOpen ? " is-open" : ""}`}>
            {LINKS.map(({ href, label, icon, match }) => (
              <Link
                key={href}
                href={href}
                className={`with-ico${match(pathname) ? " cur" : ""}`}
                aria-current={match(pathname) ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                <BtsIcon name={icon} size={16} />
                {label}
              </Link>
            ))}
            <Link
              href="/updates"
              className={`with-ico${pathname === "/updates" ? " cur" : ""}`}
              aria-current={pathname === "/updates" ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              <BtsIcon name="news" size={16} />
              Updates
            </Link>
            <Link
              href="/contact"
              className={`cta with-ico${pathname === "/contact" ? " cur" : ""}`}
              aria-current={pathname === "/contact" ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              <BtsIcon name="store" size={16} />
              Get listed
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}