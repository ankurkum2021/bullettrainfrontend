import type { ReactNode } from "react";
import { BtsShell } from "@/components/layout/BtsShell";

type Props = {
  children: ReactNode;
};

/** Shared chrome: home-style nav, background, and footer on every page. */
export function PageShell({ children }: Props) {
  return <BtsShell>{children}</BtsShell>;
}