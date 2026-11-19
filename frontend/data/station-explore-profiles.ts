import { EXPLORE_IMAGES, type ExploreImageKey } from "@/data/explore-images";
import type { StationExploreItem, StationExploreProfile } from "@/data/station-explore-types";

function item(
  id: string,
  name: string,
  note: string,
  distanceKm: number,
  imageKey: ExploreImageKey,
  href?: string,
): StationExploreItem {
  return {
    id,
    name,
    note,
    distanceKm,
    image: EXPLORE_IMAGES[imageKey],
    href,
  };
}

function cabsCategory(slug: string, rows: StationExploreItem[]) {
  return {
    id: "cabs",
    label: "Cabs",
    icon: "cab" as const,
    viewAllLabel: "All cabs",
    items: rows,
  };
}

function stays(slug: string, rows: StationExploreItem[]) {
  return {
    id: "stays",
    label: "Stays",
    icon: "hotel" as const,
    viewAllLabel: "All stays",
    items: rows,
  };
}

function dining(slug: string, rows: StationExploreItem[]) {
  return {
    id: "dining",
    label: "Dining",
    icon: "restaurant" as const,
    viewAllLabel: "All restaurants",
    items: rows,
  };
}

export const STATION_EXPLORE_PROFILES: Record<string, StationExploreProfile> = {
  surat: {
    lead: "Diamond belt, airport runs, and business travel around Surat.",
    categories: [
      {
        id: "diamond",
        label: "Diamond & gems",
        icon: "pin",
        panelTitle: "Diamond belt & gem trade near Surat HSR",
        items: [
          item("surat-d1", "Surat Diamond Bourse (DREAM City)", "Rough & polished trade visits; GST cab days", 14.2, "diamond"),
          item("surat-d2", "Varachha Road polishing cluster", "Factory tours — Varachha, Mini Bazaar belt", 9.1, "diamond"),
          item("surat-d3", "Mahidharpura wholesale market", "Multi-stop buyer runs with wait time", 8.4, "diamond"),
          item("surat-d4", "Hira Bourse & Katargam units", "B2B same-day industrial visits", 7.6, "diamond"),
        ],
      },
      cabsCategory("surat", [
        item("surat-t1", "Surat International Airport (STV)", "Terminal pickup — Magdalla", 11.8, "airport"),
        item("surat-t2", "Hazira port & LNG belt", "Corporate plant visit circuit", 28.5, "highway"),
        item("surat-t3", "Sachin GIDC", "Textile and engineering units", 17.6, "midc"),
        item("surat-t4", "Udhna–Pandesara industrial", "Ring Road factory hops", 12.3, "midc"),
      ]),
      stays("surat", [
        item("surat-h1", "Courtyard by Marriott Surat", "Athwa Lines — diamond visitors", 6.8, "hotel"),
        item("surat-h2", "Lords Plaza, Ring Road", "Near NH48 and Varachha approach", 10.9, "hotel"),
        item("surat-h3", "Fairfield by Marriott, Vesu", "VIP Road corporate stays", 14.7, "hotel"),
      ]),
      dining("surat", [
        item("surat-r1", "Kansar Gujarati Thali", "Athwalines — group lunches", 6.2, "thali"),
        item("surat-r2", "Sasumaa Gujarati Dining", "Ghod Dod Road", 7.5, "thali"),
        item("surat-r3", "Jalaram Khichdi & Kathiyawadi", "Athwa post-meeting meals", 6.9, "thali"),
      ]),
    ],
  },
  boisar: {
    lead: "Palghar–Boisar MIDC belt, highway stays, and plant visits — last Maharashtra stop before Gujarat.",
    categories: [
      {
        id: "midc",
        label: "MIDC & industry",
        icon: "train",
        panelTitle: "MIDC & industrial estates near Boisar HSR",
        items: [
          item("boisar-m1", "Boisar MIDC Phase I & II", "Welspun, auto-ancillary, packaging units", 5.8, "midc"),
          item("boisar-m2", "Tarapur MIDC (deep belt)", "Aarti Industries, chemical & steel suppliers", 21.4, "midc"),
          item("boisar-m3", "Palghar industrial area", "Logistics and light engineering", 15.6, "midc"),
          item("boisar-m4", "Indo Arya Logistics Park", "Warehouse and trailer parking runs", 8.9, "midc"),
        ],
      },
      cabsCategory("boisar", [
        item("boisar-t1", "NH48 Mumbai–Vapi pickup points", "Dahanu / Charoti naka hops", 4.5, "highway"),
        item("boisar-t2", "Boisar railway station link", "Interchange until HSR opens", 3.2, "highway"),
        item("boisar-t3", "Vangaon coastal industries", "Same-day Tarapur + Boisar loop", 18.2, "midc"),
      ]),
      stays("boisar", [
        item("boisar-h1", "Hotel Panchvati, Boisar", "Highway halt before Gujarat leg", 4.1, "hotel"),
        item("boisar-h2", "MIDC contractor lodges", "Boisar industrial area", 6.4, "hotel"),
        item("boisar-h3", "Dahanu beach highway stays", "Weekend stopover on NH48", 22.0, "hotel"),
      ]),
      dining("boisar", [
        item("boisar-r1", "Gurukripa Pure Veg, NH48", "Truck-stop thali and snacks", 3.8, "thali"),
        item("boisar-r2", "Pooja Family Restaurant", "Boisar town — Marathi / Gujarati", 4.6, "thali"),
        item("boisar-r3", "Highway dhaba cluster", "Charoti naka", 7.2, "tea"),
      ]),
    ],
  },
  ahmedabad: {
    lead: "SG Highway business belt, airport links, and Old City dining around the HSR stop.",
    categories: [
      {
        id: "ahmedabad-biz",
        label: "Business & textile",
        icon: "compass",
        panelTitle: "SG Highway, GIFT City & textile belt",
        items: [
          item("amd-b1", "GIFT City, Gandhinagar", "IFSC and fintech campus visits", 27.8, "ahmedabad"),
          item("amd-b2", "SG Highway — Prahlad Nagar", "Corporate parks and consulates", 8.6, "textile"),
          item("amd-b3", "Naroda / Odhav textile belt", "Mill and processing units", 11.9, "textile"),
          item("amd-b4", "Sanand auto hub", "OEM and supplier visits", 24.5, "midc"),
        ],
      },
      cabsCategory("ahmedabad", [
        item("amd-t1", "Sardar Vallabhbhai Patel Airport (AMD)", "SVP Airport — Hansol", 12.4, "airport"),
        item("amd-t2", "Sabarmati Ashram & riverfront", "Half-day city circuit", 9.7, "ahmedabad"),
        item("amd-t3", "Gandhinagar Secretariat belt", "Government visit adjoining runs", 26.3, "highway"),
      ]),
      stays("ahmedabad", [
        item("amd-h1", "Hyatt Centric, SG Highway", "Conference stays", 8.2, "hotel"),
        item("amd-h2", "House of MG (Old City)", "Heritage weekend", 10.5, "hotel"),
        item("amd-h3", "Gandhinagar capital hotels", "Adjacent to GIFT visits", 28.0, "hotel"),
      ]),
      dining("ahmedabad", [
        item("amd-r1", "Agashiye — House of MG", "Gujarati thali, Old City", 10.6, "thali"),
        item("amd-r2", "Manek Chowk night market", "Street food after meetings", 11.2, "thali"),
        item("amd-r3", "Vishalla, Vasna", "Rustic Gujarati dining", 13.8, "thali"),
      ]),
    ],
  },
  bilimora: {
    lead: "Gandevi–Bilimora region on the Surat–Bilimora commissioning stretch.",
    categories: [
      {
        id: "coastal",
        label: "Coastal & local",
        icon: "pin",
        items: [
          item("bil-c1", "Gandevi town market", "Valsad district local hops", 6.5, "coastal"),
          item("bil-c2", "Amboli ghat trading posts", "Agricultural belt day trips", 14.0, "coastal"),
          item("bil-c3", "Vansda chikoo belt", "Seasonal orchard visits", 22.0, "coastal"),
        ],
      },
      cabsCategory("bilimora", [
        item("bil-t1", "Surat ↔ Bilimora corridor", "OHE stretch context", 52.0, "highway"),
        item("bil-t2", "Valsad city link", "NH48 interchange", 18.5, "highway"),
      ]),
      stays("bilimora", [
        item("bil-h1", "Highway lodges, Chikhli", "NH48 night halt", 8.3, "hotel"),
        item("bil-h2", "Bilimora town lodges", "Railway side stays", 4.0, "hotel"),
      ]),
      dining("bilimora", [
        item("bil-r1", "Shreeji Dining, Bilimora", "Family Gujarati meals", 3.5, "thali"),
        item("bil-r2", "NH48 dhaba row", "South Gujarat highway", 5.2, "tea"),
      ]),
    ],
  },
  "mumbai-bkc": {
    lead: "BKC underground terminus — South Mumbai, corporate parks, and airport access.",
    categories: [
      {
        id: "bkc",
        label: "BKC & South Mumbai",
        icon: "train",
        items: [
          item("bkc-b1", "Bandra Kurla Complex", "Banking and legal district", 2.1, "bkc"),
          item("bkc-b2", "Nariman Point", "South Mumbai corporate", 7.8, "bkc"),
          item("bkc-b3", "Lower Parel mill district", "Media and startups", 5.4, "bkc"),
        ],
      },
      cabsCategory("mumbai-bkc", [
        item("bkc-t1", "CSMIA T2 airport", "Western Express / BKC link", 11.5, "airport"),
        item("bkc-t2", "Navi Mumbai MIDC", "Airoli / Turbhe plants", 19.0, "midc"),
      ]),
      stays("mumbai-bkc", [
        item("bkc-h1", "Trident, BKC", "Walk-in business stays", 1.8, "hotel"),
        item("bkc-h2", "The Taj Mahal Palace, Colaba", "South Mumbai heritage", 8.5, "hotel"),
      ]),
      dining("mumbai-bkc", [
        item("bkc-r1", "Persian Darbar, BKC", "Lunch meetings", 1.5, "thali"),
        item("bkc-r2", "Britannia & Co., Ballard Estate", "Parsi classics", 6.2, "thali"),
      ]),
    ],
  },
  thane: {
    lead: "Thane depot line — Ghodbunder Road IT belt and Eastern Express links.",
    categories: [
      {
        id: "thane-local",
        label: "Thane belt",
        icon: "pin",
        items: [
          item("thn-l1", "Hiranandani Estate, Powai link", "IT and pharma offices", 12.0, "bkc"),
          item("thn-l2", "Wagle Estate MIDC", "Light engineering visits", 5.5, "midc"),
          item("thn-l3", "Kalwa industrial belt", "Chemical ancillaries", 7.8, "midc"),
        ],
      },
      cabsCategory("thane", [
        item("thn-t1", "Eastern Express Highway", "Mumbai / Kalyan corridor", 3.2, "highway"),
        item("thn-t2", "Thane station interchange", "Central Railway today", 2.0, "highway"),
      ]),
      stays("thane", [
        item("thn-h1", "Viviana mall belt hotels", "Ghodbunder Road", 6.1, "hotel"),
        item("thn-h2", "Hiranandani Meadows stays", "Business traveller default", 9.4, "hotel"),
      ]),
      dining("thane", [
        item("thn-r1", "Paakashala, Thane West", "Gujarati thali", 4.5, "thali"),
        item("thn-r2", "Barista / Highway near Ghodbunder", "Quick meetings", 5.0, "tea"),
      ]),
    ],
  },
  virar: {
    lead: "Vasai–Virar corridor — MIDC access and Western line interchange.",
    categories: [
      {
        id: "virar-local",
        label: "Vasai–Virar",
        icon: "pin",
        items: [
          item("vir-l1", "Vasai MIDC", "Jindal, logistics parks", 8.5, "midc"),
          item("vir-l2", "Naigaon industrial belt", "Warehousing and 3PL", 6.2, "midc"),
          item("vir-l3", "Arnala beach belt", "Weekend coastal hop", 16.0, "coastal"),
        ],
      },
      cabsCategory("virar", [
        item("vir-t1", "Virar railway station", "Western Railway today", 3.0, "highway"),
        item("vir-t2", "NH48 Boisar direction", "Gujarat-bound pickup", 14.0, "highway"),
      ]),
      stays("virar", [
        item("vir-h1", "Highway lodges, Nalasopara", "NH48 side", 7.5, "hotel"),
        item("vir-h2", "Virar town hotels", "Local business stays", 4.2, "hotel"),
      ]),
      dining("virar", [
        item("vir-r1", "Shree Swami Samarth, Virar", "Family vegetarian", 3.8, "thali"),
        item("vir-r2", "Vasai highway dhabas", "Evening meals", 6.0, "tea"),
      ]),
    ],
  },
  vapi: {
    lead: "Vapi GIDC and Silvassa UT — border industry day trips.",
    categories: [
      {
        id: "vapi-gidc",
        label: "Vapi GIDC",
        icon: "train",
        items: [
          item("vap-g1", "Vapi GIDC Phase I–III", "Pharma, paper, chemicals", 4.5, "midc"),
          item("vap-g2", "Silvassa industrial UT", "Tax-free unit tours", 12.0, "midc"),
          item("vap-g3", "Dadra plastics cluster", "Processing and moulding", 9.5, "midc"),
        ],
      },
      cabsCategory("vapi", [
        item("vap-t1", "NH48 border corridor", "Mumbai–Surat axis", 2.5, "highway"),
        item("vap-t2", "Daman beach circuit", "Coastal add-on", 18.0, "coastal"),
      ]),
      stays("vapi", [
        item("vap-h1", "Hotel Glam Imperial", "GIDC guest circuit", 3.8, "hotel"),
        item("vap-h2", "Silvassa resort stays", "UT overnight", 13.5, "hotel"),
      ]),
      dining("vapi", [
        item("vap-r1", "Rajasthani Dhaba, Vapi", "Highway thali", 2.2, "thali"),
        item("vap-r2", "Daman beach shacks", "Seafood weekend", 19.0, "thali"),
      ]),
    ],
  },
  bharuch: {
    lead: "Narmada belt, Dahej PCPIR, and Ankleshwar chemical hub.",
    categories: [
      {
        id: "bharuch-industry",
        label: "Industry & Dahej",
        icon: "train",
        items: [
          item("bhr-i1", "Dahej PCPIR", "Petrochemical zone — long day", 42.0, "midc"),
          item("bhr-i2", "Ankleshwar GIDC", "API and specialty chemicals", 18.5, "midc"),
          item("bhr-i3", "Jambusar agro belt", "Trading and warehousing", 24.0, "coastal"),
        ],
      },
      cabsCategory("bharuch", [
        item("bhr-t1", "Bharuch city ↔ industrial belt", "Plant shift runs", 6.0, "highway"),
        item("bhr-t2", "Golden Bridge area", "Narmada crossing", 4.5, "river"),
      ]),
      stays("bharuch", [
        item("bhr-h1", "Ankleshwar GIDC hotels", "Audit and contractor", 17.0, "hotel"),
        item("bhr-h2", "Bharuch NH8 lodges", "Highway circuit", 5.5, "hotel"),
      ]),
      dining("bharuch", [
        item("bhr-r1", "Tapti riverfront dining", "Bharuch old city", 5.0, "river"),
        item("bhr-r2", "Gujarat dhaba, NH48", "Valsad–Bharuch stretch", 3.2, "thali"),
      ]),
    ],
  },
  vadodara: {
    lead: "Sayajigunj, Makarpura GIDC, and MS University belt.",
    categories: [
      {
        id: "vadodara-city",
        label: "Baroda business",
        icon: "compass",
        items: [
          item("vdr-b1", "Makarpura GIDC", "Engineering and pharma", 6.5, "midc"),
          item("vdr-b2", "Alembic / Gotri corporate", "Pharma HQ visits", 8.0, "vadodara"),
          item("vdr-b3", "Halol industrial (nearby)", "Auto and FMCG suppliers", 22.0, "midc"),
        ],
      },
      cabsCategory("vadodara", [
        item("vdr-t1", "Vadodara Airport (BDQ)", "Harni", 9.5, "airport"),
        item("vdr-t2", "Sayajigunj station area", "Intercity rail today", 3.0, "highway"),
      ]),
      stays("vadodara", [
        item("vdr-h1", "Welcomhotel by ITC, Alkapuri", "Sayajigunj business", 4.5, "hotel"),
        item("vdr-h2", "GenX Vadodara", "Makarpura side", 7.0, "hotel"),
      ]),
      dining("vadodara", [
        item("vdr-r1", "Mandap, Race Course", "Gujarati thali", 4.0, "thali"),
        item("vdr-r2", "Kalyan Restaurant", "Farsan and fast lunch", 3.8, "thali"),
      ]),
    ],
  },
  "anand-nadiad": {
    lead: "Dairy cooperatives, institutes, and NH48 between Vadodara and Ahmedabad.",
    categories: [
      {
        id: "anand-belt",
        label: "Dairy & institutes",
        icon: "pin",
        items: [
          item("an-b1", "Amul Dairy, Anand", "Cooperative campus tours", 5.5, "dairy"),
          item("an-b2", "NDDB headquarters", "Sector policy visits", 6.0, "dairy"),
          item("an-b3", "Dharmsinh Desai University belt", "Nadiad education hub", 9.0, "vadodara"),
        ],
      },
      cabsCategory("anand-nadiad", [
        item("an-t1", "NH48 Vadodara–Ahmedabad", "Express hops", 2.0, "highway"),
        item("an-t2", "Anand railway junction", "Western Railway", 4.5, "highway"),
      ]),
      stays("anand-nadiad", [
        item("an-h1", "Red Avenue, Anand", "Milk belt visitors", 5.2, "hotel"),
        item("an-h2", "Nadiad town lodges", "Institute visits", 10.0, "hotel"),
      ]),
      dining("anand-nadiad", [
        item("an-r1", "Amul Parlour, Anand", "Quick cooperative stop", 5.8, "dairy"),
        item("an-r2", "Gordhan thali, Nadiad", "Local vegetarian", 9.5, "thali"),
      ]),
    ],
  },
  sabarmati: {
    lead: "Northern terminus — Motera, Chandkheda, and Ashram riverfront.",
    categories: [
      {
        id: "sabarmati-local",
        label: "Sabarmati & north Amd",
        icon: "pin",
        items: [
          item("sab-l1", "Sabarmati Ashram", "Gandhi heritage circuit", 8.5, "ahmedabad"),
          item("sab-l2", "Narendra Modi Stadium, Motera", "Event day traffic planning", 6.0, "vadodara"),
          item("sab-l3", "Chandkheda wholesale market", "Trading belt mornings", 5.5, "textile"),
        ],
      },
      cabsCategory("sabarmati", [
        item("sab-t1", "AMD airport via SP Ring Road", "North Ahmedabad link", 14.0, "airport"),
        item("sab-t2", "Sabarmati Riverfront", "Riverfront drive", 7.0, "river"),
      ]),
      stays("sabarmati", [
        item("sab-h1", "Hyatt Regency, Ashram Road", "Riverfront business", 9.0, "hotel"),
        item("sab-h2", "Motera belt hotels", "Stadium and north city", 5.8, "hotel"),
      ]),
      dining("sabarmati", [
        item("sab-r1", "Riverfront cafés", "Evening meetings", 7.5, "tea"),
        item("sab-r2", "Vishala (via Vasna)", "Traditional Gujarati", 13.5, "thali"),
      ]),
    ],
  },
};