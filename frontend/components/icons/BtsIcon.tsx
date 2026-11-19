export type IconName =
  | "train"
  | "pin"
  | "compass"
  | "calendar"
  | "stations"
  | "cab"
  | "hotel"
  | "restaurant"
  | "cafe"
  | "news"
  | "home"
  | "arrow"
  | "external"
  | "info"
  | "route"
  | "phone"
  | "whatsapp"
  | "hammer"
  | "store"
  | "shield"
  | "flag"
  | "arrow-up";

type Props = {
  name: IconName;
  size?: number;
  className?: string;
};

export function BtsIcon({ name, size = 18, className = "" }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: `bts-ico-svg ${className}`.trim(),
    "aria-hidden": true,
  };

  switch (name) {
    case "train":
      return (
        <svg {...common}>
          <path d="M4 16h16M6 16l1.5-7h9L18 16M7 9V7a2 2 0 012-2h6a2 2 0 012 2v2" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "compass":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M15.5 8.5L14 14l-5.5 1.5L10 10l5.5-1.5z" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="16" rx="2" />
          <path d="M8 3v4M16 3v4M4 10h16" />
        </svg>
      );
    case "stations":
      return (
        <svg {...common}>
          <path d="M4 6h16M4 12h16M4 18h10" />
        </svg>
      );
    case "cab":
      return (
        <svg {...common}>
          <path d="M5 17h14v-6l-2-4H7L5 11v6z" />
          <circle cx="8" cy="17" r="1.5" />
          <circle cx="16" cy="17" r="1.5" />
        </svg>
      );
    case "hotel":
      return (
        <svg {...common}>
          <path d="M4 20V9l8-5 8 5v11" />
          <path d="M9 20v-6h6v6" />
        </svg>
      );
    case "restaurant":
      return (
        <svg {...common}>
          <path d="M8 3v8a3 3 0 006 0V3M11 11v10M18 3v7a2 2 0 01-2 2v8" />
        </svg>
      );
    case "cafe":
      return (
        <svg {...common}>
          <path d="M6 8h10v6a4 4 0 01-4 4H8a2 2 0 01-2-2V8z" />
          <path d="M16 10h1a2 2 0 012 2v1a2 2 0 01-2 2h-1" />
          <path d="M6 20h8" />
        </svg>
      );
    case "news":
      return (
        <svg {...common}>
          <path d="M5 5h14v14H5z" />
          <path d="M8 9h8M8 13h8M8 17h5" />
        </svg>
      );
    case "home":
      return (
        <svg {...common}>
          <path d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-9.5z" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "external":
      return (
        <svg {...common}>
          <path d="M14 5h5v5M10 14L19 5M19 14v5H5V5h5" />
        </svg>
      );
    case "info":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 10v6M12 7h.01" />
        </svg>
      );
    case "route":
      return (
        <svg {...common}>
          <circle cx="6" cy="18" r="2" />
          <circle cx="18" cy="6" r="2" />
          <path d="M8 16l8-8" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`bts-ico-svg ${className}`.trim()}
          aria-hidden
        >
          <path d="M12 2C6.48 2 2 6.03 2 10.87c0 1.74.48 3.4 1.4 4.84L2 22l6.35-1.34c1.33.74 2.85 1.12 4.44 1.12 5.52 0 10-4.03 10-8.88S17.52 2 12 2zm5.07 13.31c-.21.6-1.22 1.13-1.69 1.19-.43.06-.98.09-1.58-.1-.36-.12-1.54-.59-2.65-1.92-1.98-2.45-.78-4.79-.05-5.44.31-.28.81-.41 1.13-.41.13 0 .32 0 .46.11.14.11.36.9.4 1.05.04.14.06.28 0 .4-.06.11-.16.33-.27.54-.1.22-.22.44 0 .72.22.28 1.15 1.82 2.78 2.83 1.92 1.24 3.39 1.67 3.92 1.86.52.19.93.16 1.24-.11.32-.28 1.06-1.03 1.21-1.39.16-.36.32-.3.54-.18.22.12 2.05 1.22 2.41 1.44.36.22.6.33.69.51.09.18.15.98-.06 1.69z" />
        </svg>
      );
    case "hammer":
      return (
        <svg {...common}>
          <path d="M15 12l-3.4 3.4a2.1 2.1 0 01-3-3L12 9" />
          <path d="M17.6 15L22 10.6" />
          <path d="M17.6 3.5L21 7l-3 3-3.5-3.4z" />
          <path d="M12 9l3-3" />
        </svg>
      );
    case "store":
      return (
        <svg {...common}>
          <path d="M2 7l2-4h16l2 4" />
          <path d="M2 7h20v1a3 3 0 006 0M8 8a3 3 0 006 0 3 3 0 006 0V7" />
          <path d="M4 12v9h16v-9M10 21v-5h4v5" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M20 13c0 5-3.5 7.5-7.7 8.9a1 1 0 01-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 011-1c2 0 4.5-1.2 6.2-2.7a1.2 1.2 0 011.6 0C14.5 3.8 17 5 19 5a1 1 0 011 1z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "flag":
      return (
        <svg {...common}>
          <path d="M4 22V4a1 1 0 01.4-.8A6 6 0 018 2c3 0 5 2 8 2a6 6 0 004-1.5v12a6 6 0 01-4 1.5c-3 0-5-2-8-2a6 6 0 00-4 1.5" />
        </svg>
      );
    case "arrow-up":
      return (
        <svg {...common}>
          <path d="M5 12l7-7 7 7" />
          <path d="M12 19V5" />
        </svg>
      );
    default:
      return null;
  }
}

export const ROUTE_ICONS: Record<string, IconName> = {
  "/": "compass",
  "/stations": "stations",
  "/contact": "phone",
  "/opening-date": "calendar",
  "/updates": "news",
};

export const CATEGORY_ICON: Record<string, IconName> = {
  cab: "cab",
  hotel: "hotel",
  restaurant: "restaurant",
  cafe: "cafe",
};