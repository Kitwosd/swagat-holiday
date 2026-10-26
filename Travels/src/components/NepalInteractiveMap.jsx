import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ScrollReveal } from "../hooks/useScrollReveal";
import {
  MapPin,
  Compass,
  ArrowRight,
  Mountain,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import nepalMapImg from "../assets/nepal-map.webp";

export const NEPAL_HOTSPOTS = [
  {
    id: "everest",
    name: "Mount Everest & Khumbu Region",
    shortName: "Mt Everest",
    region: "Sagarmatha National Park, Eastern Nepal",
    elevation: "8,848.86 m",
    tag: "Highest Mountain on Earth",
    category: "himalayas",
    x: 81,
    y: 63,
    direction: "up",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    description:
      "The world’s legendary high-altitude paradise. Walk alongside Sherpa legends through Namche Bazaar, Tengboche Monastery, and stand beneath Everest at Base Camp & Kala Patthar.",
    topTreks: [
      "Everest Base Camp Trek (14 Days)",
      "EBC Gokyo Lakes Odyssey (19 Days)",
      "Everest Helicopter Return (11 Days)",
    ],
    exploreUrl: "/region/everest",
    bestSeason: "Mar – May & Sep – Dec",
  },
  {
    id: "annapurna",
    name: "Annapurna Sanctuary & Pokhara",
    shortName: "Annapurna",
    region: "Gandaki Province, Central-West Nepal",
    elevation: "8,091 m",
    tag: "World’s Most Diverse Trail",
    category: "himalayas",
    x: 47,
    y: 45,
    direction: "down",
    image:
      "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?auto=format&fit=crop&w=800&q=80",
    description:
      "A breathtaking amphitheater surrounded by Hiunchuli, Machapuchare (Fishtail), and Annapurna I, transitioning from lush subtropical valleys to windswept Tibetan passes like Thorong La.",
    topTreks: [
      "Annapurna Circuit Trek (12 Days)",
      "Annapurna Base Camp Trek (9 Days)",
      "Mardi Himal Ridge Trek (10 Days)",
    ],
    exploreUrl: "/region/annapurna",
    bestSeason: "Mar – May & Oct – Dec",
  },
  {
    id: "mustang",
    name: "Upper Mustang (Lo Manthang)",
    shortName: "Mustang",
    region: "Rain-Shadow Trans-Himalayas, North",
    elevation: "3,840 m",
    tag: "The Last Forbidden Kingdom",
    category: "remote",
    x: 48,
    y: 33,
    direction: "up",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    description:
      "A timeless Tibetan enclave shielded behind Annapurna and Dhaulagiri. Explore ancient cliff sky-caves, ochre-walled Lo Manthang, medieval monasteries, and surreal red rock canyons.",
    topTreks: [
      "Upper Mustang Forbidden Kingdom (14 Days)",
      "Mustang Overland 4x4 Jeep Tour (10 Days)",
    ],
    exploreUrl: "/region/mustang",
    bestSeason: "May – Oct (Monsoon-free)",
  },
  {
    id: "manaslu",
    name: "Manaslu Circuit & Tsum Valley",
    shortName: "Manaslu",
    region: "Gorkha District, Central-North Nepal",
    elevation: "8,163 m",
    tag: "Untouched Restricted Wilderness",
    category: "remote",
    x: 55,
    y: 47,
    direction: "up",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    description:
      'Circumnavigate the dramatic "Mountain of the Spirit" along the wild Budhi Gandaki gorge, cross the snowy 5,106m Larkya La pass, and discover sacred Buddhist Tsum Valley monasteries.',
    topTreks: [
      "Manaslu Circuit Trek (14 Days)",
      "Tsum Valley Sacred Hidden Trek (15 Days)",
    ],
    exploreUrl: "/region/manaslu",
    bestSeason: "Mar – May & Sep – Nov",
  },
  {
    id: "langtang",
    name: "Langtang Valley & Gosainkunda",
    shortName: "Langtang",
    region: "Langtang National Park, Central Nepal",
    elevation: "7,234 m",
    tag: "Valley of Sacred Glaciers",
    category: "himalayas",
    x: 65.5,
    y: 55.5,
    direction: "up",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80",
    description:
      "Closest high alpine trek north of Kathmandu. Features soaring granite walls, Tamang heritage trails, yak cheese dairies at Kyanjin Gompa, and holy high-altitude Gosainkunda lakes.",
    topTreks: [
      "Langtang Valley Trek (10 Days)",
      "Langtang & Gosainkunda Pass (15 Days)",
      "Helambu Scenic Cultural Trek (6 Days)",
    ],
    exploreUrl: "/region/langtang",
    bestSeason: "Mar – May & Sep – Nov",
  },
  {
    id: "dhaulagiri",
    name: "Dhaulagiri Circuit & Hidden Valley",
    shortName: "Dhaulagiri",
    region: "Dhaulagiri Zone, Western Nepal",
    elevation: "8,167 m",
    tag: "The Dazzling White Mountain",
    category: "himalayas",
    x: 41,
    y: 42,
    direction: "down",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    description:
      "A rugged and challenging glacial expedition circumnavigating the 7th highest peak in the world, crossing the challenging French Pass (5,360m) and Dhampus Pass into the Hidden Valley.",
    topTreks: [
      "Dhaulagiri Circuit Trek (17 Days)",
      "French Pass High Altitude Traverse (19 Days)",
    ],
    exploreUrl: "/region/annapurna",
    bestSeason: "Apr – May & Sep – Nov",
  },
  {
    id: "makalu",
    name: "Makalu Barun National Park",
    shortName: "Mt Makalu",
    region: "Sankhuwasabha District, Eastern Nepal",
    elevation: "8,485 m",
    tag: "Wild Glacial Eden",
    category: "himalayas",
    x: 88,
    y: 68,
    direction: "up",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    description:
      "Under the shadow of the 5th highest mountain on Earth, the Barun Valley preserves sheer granite cliffs, cascading waterfalls, hanging glaciers, and rare Himalayan biodiversity.",
    topTreks: [
      "Makalu Base Camp Trek (18 Days)",
      "Sherpani Col High Pass Traverse (22 Days)",
    ],
    exploreUrl: "/region/makalu",
    bestSeason: "Apr – May & Oct – Nov",
  },
  {
    id: "kanchenjunga",
    name: "Kanchenjunga Circuit & Border",
    shortName: "Kanchenjunga",
    region: "Taplejung District, Far Eastern Nepal",
    elevation: "8,586 m",
    tag: "World’s 3rd Highest Mountain",
    category: "himalayas",
    x: 96,
    y: 66,
    direction: "up",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    description:
      "The wild eastern frontier bordering Sikkim and Tibet. Trek through ancient rhododendron forests, lush bamboo jungles, and rugged glacial moraines to North and South Base Camps.",
    topTreks: [
      "Kanchenjunga Circuit Trek (24 Days)",
      "Kanchenjunga North Base Camp (18 Days)",
    ],
    exploreUrl: "/treks",
    bestSeason: "Mar – May & Oct – Nov",
  },
  {
    id: "dolpo",
    name: "Upper Dolpo & Shey Phoksundo",
    shortName: "Dolpo Region",
    region: "Karnali Province, Far Northwest Nepal",
    elevation: "5,115 m",
    tag: "Mystical Land of Snow Leopard",
    category: "remote",
    x: 38,
    y: 30,
    direction: "up",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    description:
      "One of the most remote and isolated inhabited valleys in the world. Features hypnotic deep turquoise waters of Shey Phoksundo Lake, pre-Buddhist Bonpo monasteries, and rugged yak trails.",
    topTreks: [
      "Upper Dolpo Remote Odyssey (24 Days)",
      "Shey Phoksundo Alpine Lake Trek (14 Days)",
    ],
    exploreUrl: "/region/dolpo",
    bestSeason: "May – Sep",
  },
  {
    id: "chitwan",
    name: "Chitwan National Park Safari",
    shortName: "Chitwan",
    region: "Southern Subtropical Terai Lowlands",
    elevation: "415 m",
    tag: "UNESCO Wildlife Safari Reserve",
    category: "wildlife",
    x: 58,
    y: 78,
    direction: "down",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80",
    description:
      "Nepal’s premier subtropical wilderness. Track wild single-horned rhinos, elusive Royal Bengal tigers, sloth bears, and Asian elephants on open 4x4 safaris and Rapti river canoe cruises.",
    topTreks: [
      "Chitwan Jungle Safari Tour (3 Days)",
      "Kathmandu, Pokhara & Chitwan (7 Days)",
    ],
    exploreUrl: "/tours",
    bestSeason: "Oct – Mar",
  },
  {
    id: "kathmandu",
    name: "Kathmandu Valley Heritage Shrines",
    shortName: "Kathmandu",
    region: "Capital Region, Bagmati Province",
    elevation: "1,400 m",
    tag: "7 UNESCO World Heritage Shrines",
    category: "heritage",
    x: 68,
    y: 68,
    direction: "down",
    image:
      "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?auto=format&fit=crop&w=800&q=80",
    description:
      "The cultural epicenter of the Himalayas. Marvel at golden stupas of Swayambhunath and Boudhanath, sacred ghats of Pashupatinath, and medieval Newari courtyards of Patan & Bhaktapur.",
    topTreks: [
      "Kathmandu UNESCO Heritage Tour (1 Day)",
      "Nagarkot Sunrise & Bhaktapur Excursion (2 Days)",
    ],
    exploreUrl: "/destinations",
    bestSeason: "Year-Round",
  },
  {
    id: "rara",
    name: "Rara Lake & Western Wilderness",
    shortName: "Rara Lake",
    region: "Mugu District, Far-West Himalayas",
    elevation: "2,990 m",
    tag: "Nepal’s Largest Azure Alpine Lake",
    category: "wildlife",
    x: 23,
    y: 34,
    direction: "up",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    description:
      'The "Queen of Himalayan Lakes" reflects clear blue skies and snow-clad peaks. Surrounded by pristine pine and juniper forests, it offers tranquil solitude and untouched nature.',
    topTreks: [
      "Rara Lake Alpine Wilderness Trek (10 Days)",
      "Jumla to Rara Lake Scenic Trail (8 Days)",
    ],
    exploreUrl: "/destinations",
    bestSeason: "Apr – Jun & Sep – Nov",
  },
];

export default function NepalInteractiveMap({ onSelectRegion }) {
  const [activeSpot, setActiveSpot] = useState(NEPAL_HOTSPOTS[0]);
  const [hoveredSpot, setHoveredSpot] = useState(null);
  const [pinnedSpotId, setPinnedSpotId] = useState(null); // persists after click
  const [selectedFilter, setSelectedFilter] = useState("all");

  const currentSpot = hoveredSpot || activeSpot;

  const filteredHotspots = NEPAL_HOTSPOTS.filter((spot) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "himalayas") return spot.category === "himalayas";
    if (selectedFilter === "remote") return spot.category === "remote";
    if (selectedFilter === "wildlife") return spot.category === "wildlife";
    if (selectedFilter === "heritage") return spot.category === "heritage";
    return true;
  });

  const handleFilterChange = (filterId) => {
    setSelectedFilter(filterId);
    const available = NEPAL_HOTSPOTS.filter((spot) => {
      if (filterId === "all") return true;
      if (filterId === "himalayas") return spot.category === "himalayas";
      if (filterId === "remote") return spot.category === "remote";
      if (filterId === "wildlife") return spot.category === "wildlife";
      if (filterId === "heritage") return spot.category === "heritage";
      return true;
    });
    if (
      available.length > 0 &&
      !available.some((s) => s.id === currentSpot.id)
    ) {
      setActiveSpot(available[0]);
      setHoveredSpot(null);
    }
    if (pinnedSpotId && !available.some((s) => s.id === pinnedSpotId)) {
      setPinnedSpotId(null);
    }
  };

  return (
    <section
      id="nepal-interactive-map"
      className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-900 via-brand-blue-dark to-slate-950 text-white relative overflow-hidden"
    >
      {/* Decorative ambient background glows - hidden on mobile */}
      <div className="hidden sm:block absolute -top-40 -left-40 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden sm:block absolute -bottom-40 -right-40 w-96 h-96 bg-brand-blue-light/20 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden sm:block absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal
          animation="fade-up"
          className="text-center max-w-3xl mx-auto mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Your Destination <span className="text-brand-gold">in Nepal</span>
          </h2>
          <p className="mt-3 text-slate-300 text-xs sm:text-base leading-relaxed">
            Hover or click along Nepal’s geographic regions to preview mountain
            peaks, glacial valleys, and safari corridors with verified routes.
          </p>
        </ScrollReveal>

        {/* Filter Category Chips */}
        <ScrollReveal
          animation="fade-up"
          delay={100}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-6 sm:mb-8"
        >
          {[
            { id: "all", label: "All Hotspots (12)" },
            { id: "himalayas", label: "8,000m+ Himalayan Giants" },
            { id: "remote", label: "Restricted & Remote Kingdoms" },
            { id: "wildlife", label: "Lakes & Wildlife Safari" },
            { id: "heritage", label: "Cultural Heritage" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleFilterChange(cat.id)}
              className={`px-3 py-1.5 sm:px-3.5 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-200 cursor-pointer ${
                selectedFilter === cat.id
                  ? "bg-brand-gold text-white shadow-lg shadow-brand-gold/25 sm:scale-105"
                  : "bg-white/10 hover:bg-white/20 text-slate-300 border border-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </ScrollReveal>

        {/* Locked Fixed-Height Container to Prevent Layout Reshaping */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-stretch lg:h-[620px]">
          {/* Main Map Canvas Area (Cols 1-8) */}
          {/* MOBILE: no bg, no border, no rounded, no shadow, no padding */}
          <div className="lg:col-span-8 sm:bg-slate-900/90 sm:backdrop-blur-md sm:rounded-3xl sm:p-6 sm:border sm:border-white/15 sm:shadow-2xl relative flex flex-col justify-between h-[360px] sm:h-[480px] lg:h-full overflow-hidden">
            {/* Map Top Control Bar - hidden on mobile to reduce clutter */}
            <div className="hidden sm:flex items-center justify-between pb-3 border-b border-white/10 text-xs text-slate-400 shrink-0">
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-slate-500">
                  • Click or hover markers to inspect details
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1 text-brand-gold font-medium">
                  <Mountain className="w-3.5 h-3.5" /> High Himalayas
                </span>
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" /> Valleys & Terai
                </span>
              </div>
            </div>

            {/* Nepal Authentic Map Canvas Wrapper */}
            {/* MOBILE: transparent, no border, no padding, no rounded, no bg */}
            <div className="relative flex-1 w-full my-0 sm:my-2 sm:rounded-2xl sm:overflow-hidden sm:bg-gradient-to-b sm:from-[#061838] sm:via-[#092248] sm:to-[#041026] sm:border sm:border-white/10 flex items-center justify-center p-0 sm:p-4 select-none">
              {/* Subtle Atmospheric Topographic Grid Pattern - desktop only */}
              <div className="hidden sm:block absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_top,#38bdf8_0%,transparent_70%)]" />
              <svg
                className="hidden sm:block absolute inset-0 w-full h-full pointer-events-none opacity-10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="nepal-grid-pattern"
                    width="36"
                    height="36"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 36 0 L 0 0 0 36"
                      fill="none"
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  fill="url(#nepal-grid-pattern)"
                />
              </svg>

              {/* Responsive Container maintaining Nepal Map proportions */}
              <div className="relative w-full max-w-[850px] aspect-[1807/1048] max-h-full flex items-center justify-center">
                {/* Official Nepal Authentic Geography & Provincial Image */}
                <img
                  src={nepalMapImg}
                  alt="Official Map of Nepal with Provinces"
                  className="w-full h-full object-contain filter drop-shadow-[0_12px_30px_rgba(0,0,0,0.65)] pointer-events-none select-none"
                />

                {/* Hotspot Interactive Markers (Spade Himalaya Pin Markers) */}
                {filteredHotspots.map((spot) => {
                  const isCurrent = currentSpot.id === spot.id;
                  const isExpanded =
                    hoveredSpot?.id === spot.id || pinnedSpotId === spot.id;
                  const isDown = spot.direction === "down";

                  return (
                    <button
                      key={spot.id}
                      type="button"
                      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                      className={`nepal-pin-marker ${isDown ? "nepal-pin-marker--down" : "nepal-pin-marker--up"} ${isCurrent ? "active" : ""} ${isExpanded ? "show-extras" : ""}`}
                      onClick={() => {
                        setActiveSpot(spot);
                        setPinnedSpotId(spot.id);
                      }}
                      onMouseEnter={() => setHoveredSpot(spot)}
                      onMouseLeave={() => setHoveredSpot(null)}
                      aria-label={`Inspect ${spot.name}`}
                    >
                      <span
                        className="nepal-pin-marker__label"
                        style={{
                          opacity: isExpanded ? 1 : 0,
                          pointerEvents: isExpanded ? "auto" : "none",
                          transition:
                            "opacity 260ms ease, transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                          transform: isExpanded ? "scale(1)" : "scale(0.75)",
                          transformOrigin: isDown
                            ? "center top"
                            : "center bottom",
                        }}
                      >
                        <span className="nepal-pin-marker__name">
                          {spot.shortName}
                        </span>
                        <span className="nepal-pin-marker__alt">
                          {spot.elevation}
                        </span>
                      </span>
                      <span
                        className="nepal-pin-marker__line"
                        style={{
                          opacity: isExpanded ? 1 : 0,
                          transition: "opacity 200ms ease 80ms",
                        }}
                      />
                      <div className="nepal-pin-marker__dot-wrap">
                        {isExpanded && (
                          <span className="absolute w-5 h-5 rounded-full bg-brand-gold/60 animate-ping pointer-events-none" />
                        )}
                        <span className="nepal-pin-marker__dot" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Location Pills Bar - simplified on mobile */}
            <div className="pt-2 sm:border-t border-white/10 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none shrink-0">
              <span className="text-[10px] sm:text-xs text-slate-400 font-bold shrink-0 mr-1">
                Hotspots:
              </span>
              {NEPAL_HOTSPOTS.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => {
                    setActiveSpot(spot);
                    setPinnedSpotId(spot.id);
                  }}
                  className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                    currentSpot.id === spot.id
                      ? "bg-brand-gold text-white font-bold shadow-sm"
                      : "bg-white/5 hover:bg-white/15 text-slate-300"
                  }`}
                >
                  {spot.shortName}
                </button>
              ))}
            </div>
          </div>

          {/* Hotspot Preview Card & Explore Box (Cols 9-12) - STRICT FIXED HEIGHT BUDGET */}
          <div className="lg:col-span-4 bg-white text-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl sm:shadow-2xl border border-slate-200 transition-all duration-300 relative flex flex-col justify-between h-[480px] sm:h-[500px] lg:h-full overflow-hidden">
            {/* Top Badge & Header (Fixed Budget: ~70px) */}
            <div className="shrink-0">
              <div className="flex items-center justify-between mb-1.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-gold/15 text-brand-gold-dark text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                  {currentSpot.tag}
                </span>
                <span className="text-[10px] sm:text-xs font-extrabold text-brand-blue bg-brand-blue/5 px-2 py-0.5 rounded-md border border-brand-blue/10">
                  {currentSpot.elevation}
                </span>
              </div>

              {/* Title & Region */}
              <h3 className="text-lg sm:text-xl font-extrabold text-brand-blue tracking-tight truncate leading-tight">
                {currentSpot.name}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5 truncate">
                <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-gold shrink-0" />
                <span>{currentSpot.region}</span>
              </p>
            </div>

            {/* Destination Picture (Fixed Budget: 170px) */}
            <div className="relative h-32 sm:h-44 shrink-0 rounded-xl sm:rounded-2xl overflow-hidden shadow-md my-2 group">
              <img
                src={currentSpot.image}
                alt={currentSpot.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[10px] sm:text-[11px]">
                <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded font-semibold">
                  Best: {currentSpot.bestSeason}
                </span>
                <span className="bg-brand-gold px-2 py-0.5 rounded font-bold text-white shadow">
                  Verified Route
                </span>
              </div>
            </div>

            {/* Description (Fixed Budget: h-[3.8rem] line-clamp-3) */}
            <div className="h-[3.4rem] sm:h-[3.8rem] shrink-0 overflow-hidden">
              <p className="text-[11px] sm:text-[13px] text-slate-600 leading-relaxed line-clamp-3">
                {currentSpot.description}
              </p>
            </div>

            {/* Featured Routes Box (Fixed Budget: h-[84px] scrollbar-thin) */}
            <div className="pt-2 border-t border-slate-100 shrink-0">
              <span className="text-[10px] sm:text-[11px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                Featured Routes in This Area:
              </span>
              <div className="h-[72px] sm:h-[80px] overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
                {currentSpot.topTreks.map((trek, idx) => (
                  <div
                    key={idx}
                    className="text-[11px] sm:text-xs text-slate-700 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/70 flex items-center justify-between"
                  >
                    <span className="font-semibold truncate pr-2">{trek}</span>
                    <span className="text-brand-gold font-bold text-[9px] sm:text-[10px] shrink-0 inline-flex items-center gap-0.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Guaranteed
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prominent EXPLORE Button (Fixed Budget: ~70px) */}
            <div className="mt-auto pt-2.5 border-t border-slate-100 shrink-0">
              <Link
                to={currentSpot.exploreUrl}
                className="w-full inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-white font-extrabold text-xs sm:text-sm py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer group"
              >
                <span>Explore {currentSpot.shortName}</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <div className="text-center mt-1">
                <span className="text-[9px] sm:text-[10px] text-slate-400 block truncate">
                  Full itineraries, elevation profiles & guaranteed departure
                  dates
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
