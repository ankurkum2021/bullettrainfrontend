"use client";

import { useEffect, useState, type ReactNode } from "react";
import { BtsFooter } from "@/components/layout/BtsFooter";
import { BtsNav } from "@/components/layout/BtsNav";

type Props = {
  children: ReactNode;
};

/** Pixels of scroll over which the nav eases light → solid dark blue. */
const NAV_DARKEN_SCROLL_PX = 140;

function navScrollProgress(scrollY: number): number {
  const linear = Math.min(1, Math.max(0, scrollY / NAV_DARKEN_SCROLL_PX));
  return linear * linear * (3 - 2 * linear);
}

export function BtsShell({ children }: Props) {
  const [navScroll, setNavScroll] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const next = navScrollProgress(window.scrollY);
      setNavScroll((prev) => (Math.abs(prev - next) < 0.0008 ? prev : next));
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    const ro = new ResizeObserver(() => update());
    ro.observe(document.documentElement);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      ro.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="bts">
      <BtsNav scrollProgress={navScroll} />
      <main id="top">{children}</main>
      <BtsFooter />
    </div>
  );
}