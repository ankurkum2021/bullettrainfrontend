import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "BTS",
    description: SITE_TAGLINE,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1f3f87",
    lang: "en-IN",
    icons: [
      {
        src: "/brand-logo.png",
        sizes: "1025x227",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}