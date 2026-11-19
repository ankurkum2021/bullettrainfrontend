/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/wikipedia/commons/**",
      },
      {
        protocol: "https",
        hostname: "www.nhsrcl.in",
        pathname: "/Uploads/**",
      },
    ],
  },
  async redirects() {
    const permanent = true;
    /** Legacy per-station paths → single hub + hash (301 preserves equity). */
    const stationAnchor = "/stations#:slug";
    const exploreCategoryRedirects = [
      { source: "/cabs/:slug", destination: "/explore/:slug#explore-:slug-cabs" },
      { source: "/hotels/:slug", destination: "/explore/:slug#explore-:slug-stays" },
      { source: "/restaurants/:slug", destination: "/explore/:slug#explore-:slug-dining" },
      { source: "/cafes/:slug", destination: "/explore/:slug#explore-:slug-dining" },
    ];
    const legacyServiceHubs = [
      { source: "/cabs", destination: "/#development" },
      { source: "/hotels", destination: "/#development" },
      { source: "/restaurants", destination: "/#development" },
      { source: "/cafes", destination: "/#development" },
    ];

    return [
      { source: "/kab-shuru-hogi", destination: "/opening-date", permanent },
      { source: "/bullet-train-opening-date", destination: "/opening-date", permanent },
      { source: "/news", destination: "/updates", permanent },
      { source: "/index.html", destination: "/", permanent },
      ...legacyServiceHubs.map((r) => ({ ...r, permanent })),
      ...exploreCategoryRedirects.map((r) => ({ ...r, permanent })),
      { source: "/station/:slug", destination: stationAnchor, permanent },
      { source: "/stations/:slug", destination: stationAnchor, permanent },
    ];
  },
};

export default nextConfig;
