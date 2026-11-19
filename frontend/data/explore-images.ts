/** Local mirrors from Wikimedia Commons (see public/explore). */
export type ExploreImage = {
  src: string;
  alt: string;
  credit?: string;
};

const credit = "Wikimedia Commons (illustrative)";

export const EXPLORE_IMAGES = {
  diamond: {
    src: "/explore/diamond.jpg",
    alt: "Rough and polished diamonds",
    credit,
  },
  surat: {
    src: "/explore/diamond.jpg",
    alt: "Surat gem trade belt",
    credit,
  },
  midc: {
    src: "/explore/mumbai.jpg",
    alt: "Industrial corridor, Maharashtra",
    credit,
  },
  highway: {
    src: "/explore/mumbai.jpg",
    alt: "National highway corridor",
    credit,
  },
  airport: {
    src: "/explore/ahmedabad-airport.jpg",
    alt: "Regional airport terminal",
    credit,
  },
  thali: {
    src: "/explore/gujarati-thali.jpg",
    alt: "Gujarati thali",
    credit,
  },
  hotel: {
    src: "/explore/hotel.jpg",
    alt: "Business hotel",
    credit,
  },
  ahmedabad: {
    src: "/explore/vadodara.jpg",
    alt: "Gujarat heritage and business district",
    credit,
  },
  textile: {
    src: "/explore/vadodara.jpg",
    alt: "Textile and mill belt",
    credit,
  },
  dairy: {
    src: "/explore/gujarati-thali.jpg",
    alt: "Dairy and cooperative belt",
    credit,
  },
  coastal: {
    src: "/explore/narmada.jpg",
    alt: "Coastal and river belt",
    credit,
  },
  bkc: {
    src: "/explore/mumbai.jpg",
    alt: "Mumbai business district",
    credit,
  },
  river: {
    src: "/explore/narmada.jpg",
    alt: "Narmada river belt",
    credit,
  },
  vadodara: {
    src: "/explore/vadodara.jpg",
    alt: "Vadodara city landmarks",
    credit,
  },
  tea: {
    src: "/explore/gujarati-thali.jpg",
    alt: "Highway tea and snack stop",
    credit,
  },
} as const satisfies Record<string, ExploreImage>;

export type ExploreImageKey = keyof typeof EXPLORE_IMAGES;