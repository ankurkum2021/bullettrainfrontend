import { PageShell } from "@/components/PageShell";
import { Skeleton, SkeletonBar } from "@/components/skeleton/Skeleton";

type ContentVariant = "directory" | "stack";

function ContentSkeletonInner({
  label,
  variant,
  className,
}: {
  label: string;
  variant: ContentVariant;
  className: string;
}) {
  return (
    <div className={className} aria-busy="true" aria-live="polite" aria-label={label}>
      <SkeletonBar className="bts-skeleton-breadcrumb" width="10rem" height="0.875rem" />
      <SkeletonBar width="6rem" height="1.75rem" />
      <SkeletonBar width="min(24rem, 85%)" height="2rem" />
      <SkeletonBar width="min(40rem, 100%)" height="1rem" />
      {variant === "stack" ? (
        <div className="bts-skeleton-stack">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="bts-skeleton-card" />
          ))}
        </div>
      ) : (
        <div className="stations-directory bts-skeleton-directory">
          <Skeleton className="bts-skeleton-rail" />
          <Skeleton className="bts-skeleton-main-panel" />
        </div>
      )}
    </div>
  );
}

export function SkeletonScreen({ label = "Loading page" }: { label?: string }) {
  return (
    <PageShell>
      <div className="bts-skeleton-screen wrap" aria-busy="true" aria-live="polite" aria-label={label}>
        <SkeletonBar className="bts-skeleton-breadcrumb" width="8rem" height="0.875rem" />
        <SkeletonBar width="min(28rem, 80%)" height="2.25rem" />
        <SkeletonBar width="min(36rem, 95%)" height="1rem" />
        <SkeletonBar width="min(32rem, 88%)" height="1rem" />
        <Skeleton className="bts-skeleton-block bts-skeleton-block--tall" />
      </div>
    </PageShell>
  );
}

export function HomeExplorerSkeletonBody() {
  return (
    <div className="bts-skeleton-screen" aria-busy="true" aria-live="polite" aria-label="Loading corridor explorer">
      <header className="hero">
        <div className="wrap">
          <SkeletonBar width="min(32rem, 92%)" height="2.75rem" />
          <SkeletonBar width="min(28rem, 85%)" height="1.125rem" />
          <div className="picker bts-skeleton-picker">
            <Skeleton className="bts-skeleton-field" />
            <Skeleton className="bts-skeleton-field" />
          </div>
        </div>
      </header>
      <section className="results wrap">
        <div className="route route--explorer bts-skeleton-route">
          <SkeletonBar width="70%" height="2rem" />
          <div className="bts-skeleton-track">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="bts-skeleton-stop" />
            ))}
          </div>
          <div className="explorer-body">
            <div className="facts">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="bts-skeleton-fact" />
              ))}
            </div>
            <Skeleton className="bts-skeleton-nearby" />
          </div>
        </div>
      </section>
    </div>
  );
}

export function HomePageSkeleton() {
  return (
    <PageShell>
      <HomeExplorerSkeletonBody />
    </PageShell>
  );
}

export function ContentPageSkeleton({ variant = "directory" }: { variant?: ContentVariant }) {
  return (
    <PageShell>
      <ContentSkeletonInner label="Loading page" variant={variant} className="content-page wrap bts-skeleton-screen" />
    </PageShell>
  );
}

export function StationsPageSkeleton() {
  return <ContentPageSkeleton variant="directory" />;
}

export function ServicePageSkeleton() {
  return (
    <PageShell>
      <div className="content-page wrap bts-skeleton-screen" aria-busy="true" aria-live="polite" aria-label="Loading listings">
        <SkeletonBar className="bts-skeleton-breadcrumb" width="8rem" height="0.875rem" />
        <SkeletonBar width="min(22rem, 80%)" height="2rem" />
        <div className="stations-directory bts-skeleton-directory">
          <Skeleton className="bts-skeleton-rail" />
          <div className="bts-skeleton-service-main">
            <SkeletonBar width="55%" height="1.25rem" />
            <SkeletonBar width="90%" height="1rem" />
            <div className="bts-skeleton-service-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="bts-skeleton-service-item" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export function ExplorePageSkeleton() {
  return (
    <PageShell>
      <div className="content-page wrap bts-skeleton-screen" aria-busy="true" aria-live="polite" aria-label="Loading station explore">
        <SkeletonBar className="bts-skeleton-breadcrumb" width="12rem" height="0.875rem" />
        <SkeletonBar width="5rem" height="1.5rem" />
        <SkeletonBar width="min(26rem, 90%)" height="2rem" />
        <SkeletonBar width="min(36rem, 100%)" height="1rem" />
        <div className="bts-skeleton-quick-links">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="bts-skeleton-pill" />
          ))}
        </div>
        <Skeleton className="bts-skeleton-card" />
        <div className="bts-skeleton-stack">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="bts-skeleton-section" />
          ))}
        </div>
      </div>
    </PageShell>
  );
}

export function UpdatesPageSkeleton() {
  return (
    <PageShell>
      <ContentSkeletonInner label="Loading updates" variant="stack" className="content-page wrap bts-skeleton-screen" />
    </PageShell>
  );
}

export function OpeningDatePageSkeleton() {
  return (
    <PageShell>
      <div className="content-page wrap bts-skeleton-screen" aria-busy="true" aria-live="polite" aria-label="Loading opening timeline">
        <SkeletonBar className="bts-skeleton-breadcrumb" width="10rem" height="0.875rem" />
        <SkeletonBar width="6rem" height="1.75rem" />
        <SkeletonBar width="min(22rem, 88%)" height="2rem" />
        <SkeletonBar width="min(40rem, 100%)" height="1rem" />
        <div className="bts-skeleton-stack">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="bts-skeleton-card" />
          ))}
        </div>
      </div>
    </PageShell>
  );
}

export function ContactPageSkeleton() {
  return (
    <PageShell>
      <div className="content-page wrap bts-skeleton-screen" aria-busy="true" aria-live="polite" aria-label="Loading contact">
        <SkeletonBar className="bts-skeleton-breadcrumb" width="8rem" height="0.875rem" />
        <SkeletonBar width="min(16rem, 60%)" height="2rem" />
        <SkeletonBar width="min(32rem, 95%)" height="1rem" />
        <Skeleton className="bts-skeleton-card" />
      </div>
    </PageShell>
  );
}