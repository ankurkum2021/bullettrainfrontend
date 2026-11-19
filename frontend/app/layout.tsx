import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";
import "../bullettrain.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

const poppinsDisplay = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const defaultTitle = `${SITE_NAME} — India's high-speed rail, station by station`;
const defaultDescription =
  "Unofficial guide to the Mumbai–Ahmedabad bullet train (MAHSR): all stations on one page, opening timeline, and official progress updates.";

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: "%s | Bullet Train Station",
  },
  description: defaultDescription,
  applicationName: SITE_NAME,
  category: "travel",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
    title: defaultTitle,
    description: defaultDescription,
    images: [{ url: "/brand-logo.png", width: 1025, height: 227, alt: "Bullet Train Station logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  icons: {
    icon: [{ url: "/brand-logo.png", type: "image/png" }],
    apple: [{ url: "/brand-logo.png", type: "image/png" }],
  },
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${poppins.variable} ${poppinsDisplay.variable}`}>
      <body className="bts-site">{children}</body>
    </html>
  );
}