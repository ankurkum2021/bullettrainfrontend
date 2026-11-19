import type { CSSProperties, ReactNode } from "react";

type SkeletonProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export function Skeleton({ className = "", style, children }: SkeletonProps) {
  return (
    <span className={`bts-skeleton ${className}`.trim()} style={style} aria-hidden>
      {children}
    </span>
  );
}

export function SkeletonBar({ className = "", width = "100%", height = "1rem" }: { className?: string; width?: string | number; height?: string | number }) {
  return <Skeleton className={`bts-skeleton-bar ${className}`} style={{ width, height }} />;
}