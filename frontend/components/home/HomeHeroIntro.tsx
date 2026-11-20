import { BtsIcon } from "@/components/icons/BtsIcon";
import { HomeHeroSummary } from "@/components/home/HomeHeroSummary";

/** Crawlable intro below the hero banner carousel. */
export function HomeHeroIntro() {
  return (
    <section className="hero-intro-panel" aria-labelledby="hero-intro-heading">
      <h2 id="hero-intro-heading" className="hero-intro-heading with-ico">
        <BtsIcon name="route" size={18} />
        India&apos;s bullet train stops at a glance
      </h2>
      <HomeHeroSummary />
    </section>
  );
}