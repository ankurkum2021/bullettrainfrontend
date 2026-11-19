"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE_NAME } from "@/lib/site";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container header-inner">
        <Link href="/" className="logo">
          <span className="logo-mark" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 16h16M6 16l2-8h8l2 8M8 8V6a2 2 0 012-2h4a2 2 0 012 2v2" />
            </svg>
          </span>
          {SITE_NAME}
        </Link>
        <nav aria-label="Primary">
          <ul className="nav-links">
            <li>
              <Link href="/updates">Updates</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}