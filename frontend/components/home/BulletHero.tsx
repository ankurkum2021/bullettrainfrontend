"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

type Slide = {
  id: string;
  label: string;
  tone: [string, string, string];
  sun: string;
  title: string;
  text: string;
  stats: [string, string][];
  cta: { label: string; href: string };
};

const SLIDES: Slide[] = [
  {
    id: "overview",
    label: "Overview",
    tone: ["#02040c", "#0f2860", "#3d6fe0"],
    sun: "rgba(106, 142, 245, 0.55)",
    title: "High-speed rail, station by station.",
    text: "Track civil works, systems, and passenger stops as each line moves from plan to platform.",
    stats: [
      ["Stations", "guides & status"],
      ["Updates", "official releases"],
      ["Explorer", "near each stop"],
    ],
    cta: { label: "Pick a station", href: "#development" },
  },
  {
    id: "stations",
    label: "Stations",
    tone: ["#050a18", "#1a3d8f", "#6b9fff"],
    sun: "rgba(122, 166, 255, 0.5)",
    title: "Every stop on the map.",
    text: "Choose a corridor and station to see construction progress, access notes, and what is nearby.",
    stats: [
      ["Directory", "all listed stops"],
      ["Regions", "browse by state"],
      ["Guides", "how to reach"],
    ],
    cta: { label: "Browse corridors", href: "#picker" },
  },
  {
    id: "engineering",
    label: "Engineering",
    tone: ["#010308", "#12306e", "#5b8def"],
    sun: "rgba(91, 141, 239, 0.48)",
    title: "Viaducts, tunnels, and depots.",
    text: "Bridges, underground sections, and maintenance bases — summarized from published agency updates, not guesswork.",
    stats: [
      ["Civil", "viaduct & stations"],
      ["Systems", "track & power"],
      ["Sources", "cited in articles"],
    ],
    cta: { label: "Read construction news", href: "/updates" },
  },
  {
    id: "explore",
    label: "Explore",
    tone: ["#08122a", "#2549a8", "#9ec0ff"],
    sun: "rgba(168, 196, 255, 0.42)",
    title: "Know your stop before the train does.",
    text: "Construction status, stop guides and a local explorer for every station.",
    stats: [
      ["Progress", "viaducts, depots, stations"],
      ["Guides", "how to reach each stop"],
      ["Explorer", "places near the platform"],
    ],
    cta: { label: "Start exploring", href: "#development" },
  },
];

export function BulletHero() {
  const [i, setI] = useState(0);
  const [reduced, setReduced] = useState(false);
  const x0 = useRef<number | null>(null);
  const n = SLIDES.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const f = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);

  const go = useCallback((d: number) => setI((v) => (v + d + n) % n), [n]);

  return (
    <section
      className="bh"
      role="region"
      aria-roledescription="carousel"
      aria-label="India bullet train station highlights"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      onPointerDown={(e) => {
        x0.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (x0.current == null) return;
        const dx = e.clientX - x0.current;
        x0.current = null;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
    >
      <div className="bh-bgs" aria-hidden="true">
        {SLIDES.map((s, k) => (
          <div
            key={s.id}
            className={`bh-bg${k === i ? " on" : ""}`}
            style={
              {
                "--a": s.tone[0],
                "--b": s.tone[1],
                "--c": s.tone[2],
                "--sun": s.sun,
              } as React.CSSProperties
            }
          >
            <div className="bh-sun" />
          </div>
        ))}
      </div>

      <div className="bh-scene" aria-hidden="true">
        <Hills cls="far" />
        <Hills cls="near" />
        <div className="bh-lines">
          {Array.from({ length: 10 }).map((_, k) => (
            <span
              key={k}
              style={
                {
                  "--t": `${10 + k * 7}%`,
                  "--d": `${(k * 0.43) % 2.6}s`,
                  "--w": `${140 + ((k * 61) % 240)}px`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
        <div className="bh-pillars" />
        <div className="bh-deck" />
        <div className="bh-trainwrap">
          <div className="bh-train-pass">
            <div className="bh-train-enter" key={i}>
              <Train />
            </div>
          </div>
        </div>
      </div>

      <div className="bh-inner">
        <h1>
          India&apos;s bullet train,
          <br />
          station by station
        </h1>

        <div className="bh-stage">
          {SLIDES.map((s, k) => (
            <div key={s.id} className={`bh-slide${k === i ? " on" : ""}`} aria-hidden={k !== i}>
              <div className="bh-text">
                <h2>{s.title}</h2>
                <p>{s.text}</p>
                <BulletHeroCta href={s.cta.href} active={k === i}>
                  {s.cta.label}
                </BulletHeroCta>
              </div>
              <dl className="bh-stats">
                {s.stats.map(([big, small]) => (
                  <div key={small}>
                    <dt>{big}</dt>
                    <dd>{small}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>

      <div className="bh-ctrl">
        <div className="bh-tabs" role="tablist" aria-label="Choose slide">
          {SLIDES.map((s, k) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={k === i}
              className={`bh-tab${k === i ? " on" : ""}${k < i ? " done" : ""}`}
              onClick={() => setI(k)}
            >
              <span>{s.label}</span>
              <i
                key={k === i ? `p${i}` : "x"}
                className={k === i && !reduced ? "run" : ""}
                onAnimationEnd={(e) => {
                  if (e.animationName === "bh-fill") go(1);
                }}
              />
            </button>
          ))}
        </div>
        <div className="bh-arrows">
          <button type="button" aria-label="Previous slide" onClick={() => go(-1)}>
            ‹
          </button>
          <button type="button" aria-label="Next slide" onClick={() => go(1)}>
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

function BulletHeroCta({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  const className = "bh-cta";
  const tabIndex = active ? 0 : -1;
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} tabIndex={tabIndex}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} tabIndex={tabIndex}>
      {children}
    </a>
  );
}

function Hills({ cls }: { cls: "far" | "near" }) {
  return (
    <svg className={`bh-hills ${cls}`} viewBox="0 0 1200 200" preserveAspectRatio="none" aria-hidden>
      <path d="M0 110 Q150 20 300 110 T600 110 T900 110 T1200 110 V200 H0Z" />
    </svg>
  );
}

function Train() {
  const uid = useId().replace(/:/g, "");
  const bodyId = `bh-body-${uid}`;
  const stripeId = `bh-stripe-${uid}`;
  const noseId = `bh-nose-${uid}`;
  return (
    <svg className="bh-train" viewBox="-32 42 1464 108" preserveAspectRatio="xMidYMax meet" aria-hidden>
      <defs>
        <linearGradient id={bodyId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4f8ff" />
          <stop offset="0.45" stopColor="#d4e2ff" />
          <stop offset="1" stopColor="#8fb4ff" />
        </linearGradient>
        <linearGradient id={stripeId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1f3f87" />
          <stop offset="0.5" stopColor="#3d6fe0" />
          <stop offset="1" stopColor="#5b8def" />
        </linearGradient>
        <linearGradient id={noseId} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7aa6ff" />
          <stop offset="1" stopColor="#1a3d8f" />
        </linearGradient>
      </defs>
      <path
        d="M0 112 V66 Q20 58 80 56 L1040 54 Q1260 56 1360 84 Q1396 94 1400 104 V112Z"
        fill={`url(#${bodyId})`}
      />
      <path d="M1040 62 Q1240 64 1326 86 L1040 86Z" fill={`url(#${noseId})`} opacity=".95" />
      <rect x="0" y="92" width="1360" height="6" fill={`url(#${stripeId})`} />
      {Array.from({ length: 17 }).map((_, k) => (
        <rect
          key={k}
          x={50 + k * 58}
          y="64"
          width="38"
          height="18"
          rx="5"
          fill={k % 3 === 0 ? "#0b1533" : k % 3 === 1 ? "#1a3d8f" : "#2549a8"}
          opacity=".88"
        />
      ))}
      {[200, 440, 680, 920].map((x) => (
        <rect key={x} x={x} y="58" width="3" height="54" fill="#9ec0ff" />
      ))}
    </svg>
  );
}