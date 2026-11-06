import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  Award,
  Calendar,
  Compass,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import logoImg from "../assets/logo.jpeg";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar({
  onOpenSearch,
  onOpenPlanTrip,
  onSelectRegion,
  onOpenTripModal,
}) {
  const { trips: liveTrips, destinations: liveDestinations } = useData();
  const { language, toggleLanguage, t, isNepali } = useLanguage();
  const { isScrolled } = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileTreksOpen, setMobileTreksOpen] = useState(false);
  const [activeMegaTab, setActiveMegaTab] = useState("everest");
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Fully translated region tabs
  const regionTabs = [
    {
      id: "everest",
      name: "Everest Region",
      name_np: "सोलुखुम्बु (एभरेष्ट) क्षेत्र",
      path: "/region/everest",
      trips: [
        { title: "Everest Base Camp Trek 14-Days", title_np: "सगरमाथा आधार शिविर ट्रेक (१४ दिन)", id: "ebc-14", duration: "14 Days", duration_np: "१४ दिन", price: "$1,290" },
        { title: "Everest Base Camp Gokyo Trek 19-Days", title_np: "सगरमाथा आधार शिविर गोक्यो ट्रेक (१९ दिन)", id: "ebc-gokyo-19", duration: "19 Days", duration_np: "१९ दिन", price: "$1,620" },
        { title: "Everest Heli Return Trek 11-Days", title_np: "सगरमाथा हेलि रिटर्न ट्रेक (११ दिन)", id: "ebc-14", duration: "11 Days", duration_np: "११ दिन", price: "$1,850" },
        { title: "Everest View & Panorama Trek 8-Days", title_np: "एभरेष्ट भ्यु र पानोरमा ट्रेक (८ दिन)", id: "ebc-14", duration: "8 Days", duration_np: "८ दिन", price: "$850" },
      ],
    },
    {
      id: "annapurna",
      name: "Annapurna Region",
      name_np: "अन्नपूर्ण क्षेत्र",
      path: "/region/annapurna",
      trips: [
        { title: "Annapurna Circuit Trek 12-Days", title_np: "अन्नपूर्ण सर्किट ट्रेक (१२ दिन)", id: "act-12", duration: "12 Days", duration_np: "१२ दिन", price: "$950" },
        { title: "Mardi Himal Trek 10-Days", title_np: "मार्दी हिमाल ट्रेक (१० दिन)", id: "mardi-10", duration: "10 Days", duration_np: "१० दिन", price: "$680" },
        { title: "Ghorepani Poon Hill Trek 4-Days", title_np: "घोरेपानी पुन हिल ट्रेक (४ दिन)", id: "poon-hill-4", duration: "4 Days", duration_np: "४ दिन", price: "$395" },
        { title: "Annapurna Base Camp Trek 9-Days", title_np: "अन्नपूर्ण आधार शिविर ट्रेक (९ दिन)", id: "act-12", duration: "9 Days", duration_np: "९ दिन", price: "$780" },
      ],
    },
    {
      id: "langtang",
      name: "Langtang Region",
      name_np: "लाङटाङ क्षेत्र",
      path: "/region/langtang",
      trips: [
        { title: "Langtang Valley Trek 10-Days", title_np: "लाङटाङ उपत्यका ट्रेक (१० दिन)", id: "langtang-10", duration: "10 Days", duration_np: "१० दिन", price: "$750" },
        { title: "Langtang Valley Helicopter Tour (1 Day)", title_np: "लाङटाङ उपत्यका हेलिकप्टर टुर (१ दिन)", id: "heli-langtang", duration: "1 Day", duration_np: "१ दिन", price: "$950" },
        { title: "Langtang & Holy Gosaikunda Lakes 15-Days", title_np: "लाङटाङ र पवित्र गोसाइँकुण्ड ताल (१५ दिन)", id: "langtang-10", duration: "15 Days", duration_np: "१५ दिन", price: "$1,050" },
        { title: "Helambu Scenic Cultural Trek 6-Days", title_np: "हेलम्बु मनोरम सांस्कृतिक ट्रेक (६ दिन)", id: "langtang-10", duration: "6 Days", duration_np: "६ दिन", price: "$520" },
      ],
    },
    {
      id: "manaslu",
      name: "Manaslu Region",
      name_np: "मनास्लु क्षेत्र",
      path: "/region/manaslu",
      trips: [
        { title: "Manaslu Circuit Trek 14-Days", title_np: "मनास्लु सर्किट ट्रेक (१४ दिन)", id: "mct-14", duration: "14 Days", duration_np: "१४ दिन", price: "$1,150" },
        { title: "Tsum Valley Sacred Hidden Trek 15-Days", title_np: "त्सुम उपत्यका पवित्र लुकेको ट्रेक (१५ दिन)", id: "mct-14", duration: "15 Days", duration_np: "१५ दिन", price: "$1,280" },
        { title: "Manaslu & Annapurna Combined 22-Days", title_np: "मनास्लु र अन्नपूर्ण संयुक्त (२२ दिन)", id: "mct-14", duration: "22 Days", duration_np: "२२ दिन", price: "$1,890" },
      ],
    },
    {
      id: "mustang",
      name: "Mustang & Remote",
      name_np: "मुस्ताङ र दुर्गम",
      path: "/region/mustang",
      trips: [
        { title: "Upper Mustang Forbidden Kingdom 14-Days", title_np: "माथिल्लो मुस्ताङ प्रतिबन्धित राज्य (१४ दिन)", id: "act-12", duration: "14 Days", duration_np: "१४ दिन", price: "$1,750" },
        { title: "Mustang Overland Jeep Tour 10-Days", title_np: "मुस्ताङ ओभरल्याण्ड जीप टुर (१० दिन)", id: "act-12", duration: "10 Days", duration_np: "१० दिन", price: "$1,480" },
        { title: "Upper Dolpo Remote Odyssey 24-Days", title_np: "माथिल्लो डोल्पो दुर्गम यात्रा (२४ दिन)", id: "mct-14", duration: "24 Days", duration_np: "२४ दिन", price: "$2,950" },
      ],
    },
    {
      id: "makalu",
      name: "Makalu Region",
      name_np: "मकालु क्षेत्र",
      path: "/region/makalu",
      trips: [
        { title: "Makalu Base Camp Trek 18-Days", title_np: "मकालु आधार शिविर ट्रेक (१८ दिन)", id: "mct-14", duration: "18 Days", duration_np: "१८ दिन", price: "$1,950" },
        { title: "Sherpani Col High Pass Traverse 22-Days", title_np: "शेर्पानी कोल उच्च भन्ज्याङ यात्रा (२२ दिन)", id: "mct-14", duration: "22 Days", duration_np: "२२ दिन", price: "$2,850" },
      ],
    },
    {
      id: "dolpo",
      name: "Dolpo Region",
      name_np: "डोल्पो क्षेत्र",
      path: "/region/dolpo",
      trips: [
        { title: "Upper Dolpo Remote Odyssey 24-Days", title_np: "माथिल्लो डोल्पो दुर्गम यात्रा (२४ दिन)", id: "mct-14", duration: "24 Days", duration_np: "२४ दिन", price: "$2,950" },
        { title: "Shey Phoksundo Alpine Lake Trek 14-Days", title_np: "शे-फोक्सुण्डो अल्पाइन ताल ट्रेक (१४ दिन)", id: "mct-14", duration: "14 Days", duration_np: "१४ दिन", price: "$1,680" },
      ],
    },
  ];

  // Merge live destinations and live trips dynamically
  const mergedRegionTabs = React.useMemo(() => {
    const tabs = [...regionTabs];

    if (liveDestinations && liveDestinations.length > 0) {
      liveDestinations.forEach((dest) => {
        const destId = dest.id || dest.slug;
        const existing = tabs.find(
          (t) => t.id === destId || t.name.toLowerCase() === dest.name.toLowerCase()
        );
        if (!existing) {
          tabs.push({
            id: destId,
            name: dest.name,
            name_np: dest.name_np || dest.name,
            path: `/region/${destId}`,
            trips: [],
          });
        }
      });
    }

    if (liveTrips && liveTrips.length > 0) {
      return tabs.map((tab) => {
        const matchedTrips = liveTrips.filter(
          (t) =>
            t.region?.toLowerCase().includes(tab.id.toLowerCase()) ||
            t.region?.toLowerCase().includes(tab.name.toLowerCase().replace(" region", "")) ||
            t.regionSlug?.toLowerCase().includes(tab.id.toLowerCase())
        );

        if (matchedTrips.length > 0) {
          return {
            ...tab,
            trips: matchedTrips.map((t) => ({
              title: t.title,
              title_np: t.title_np || t.title,
              id: t.id || t.slug,
              duration: t.duration || `${t.durationDays} Days`,
              duration_np: t.duration_np || `${t.durationDays} दिन`,
              price: t.salePrice ? `$${t.salePrice}` : t.regularPrice ? `$${t.regularPrice}` : "$1,290",
            })),
          };
        }
        return tab;
      });
    }

    return tabs;
  }, [liveDestinations, liveTrips, regionTabs]);

  const activeTabsList = mergedRegionTabs;

  const handleTripClick = (tripId) => {
    if (onOpenTripModal) {
      onOpenTripModal(tripId);
    } else {
      navigate(`/trip/${tripId}`);
    }
  };

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-brand-blue-dark text-slate-200 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-5 text-slate-300">
            <span className="flex items-center gap-1.5 text-brand-gold font-medium">
              <Award className="w-3.5 h-3.5 text-brand-gold shrink-0" />
              <span>{t("announcement")}</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5 hover:text-white transition">
              <Phone className="w-3.5 h-3.5 text-brand-gold shrink-0" />
              <a href="tel:+9779851000000" className="underline decoration-brand-gold/60">
                +977 985-1000000
              </a>
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5 hover:text-white transition">
              <Mail className="w-3.5 h-3.5 text-brand-gold shrink-0" />
              <a href="mailto:hello@swagattravels.com">hello@swagattravels.com</a>
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition cursor-pointer text-[11px] font-semibold border border-white/15"
            >
              <span>🌐</span>
              <span>{language === "en" ? "नेपाली" : "English"}</span>
            </button>
            <span className="text-slate-600">•</span>
            <Link to="/admin/login" className="text-slate-400 hover:text-brand-gold transition flex items-center gap-1 font-medium cursor-pointer">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>{t("adminPortal")}</span>
            </Link>
            <span className="text-slate-600">•</span>
            <Link to="/plan-your-trip" className="text-brand-gold hover:text-white transition font-semibold cursor-pointer">
              {t("customInquiry")} →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header
        className={`sticky top-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-2.5 sm:py-3 text-slate-800 border-b border-slate-200/80"
            : "bg-brand-blue text-white py-3 sm:py-3.5 shadow-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 md:gap-3 group shrink-0 min-w-0">
            <div className="relative overflow-hidden rounded-md sm:rounded-lg bg-white p-0.5 sm:p-1 shadow-sm border border-brand-gold/30 group-hover:border-brand-gold transition duration-300 shrink-0">
              <img src={logoImg} alt="Swagat Holidays & Travels Logo" className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-9 lg:w-9 object-contain rounded-sm sm:rounded" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className={`hidden md:block text-base sm:text-lg md:text-xl font-black tracking-wider leading-none transition ${isScrolled ? "text-brand-blue" : "text-white"}`}>
                SWAGAT
              </span>
              <span className="hidden md:block text-[9px] sm:text-[10px] font-bold text-brand-gold uppercase tracking-widest leading-tight mt-0.5 truncate">
                Holidays &amp; Travels
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
            <Link to="/" className={`px-3 py-2 text-sm font-semibold rounded-lg transition ${isActive("/") ? (isScrolled ? "text-brand-blue font-bold bg-slate-100" : "text-brand-gold font-bold bg-white/10") : isScrolled ? "text-slate-700 hover:text-brand-blue hover:bg-slate-100" : "text-slate-100 hover:text-brand-gold hover:bg-white/10"}`}>
              {t("nav.home")}
            </Link>

            {/* Mega Menu */}
            <div className="relative group">
              <Link to="/treks" className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg transition ${isActive("/treks") || isActive("/region") ? (isScrolled ? "text-brand-blue font-bold bg-slate-100" : "text-brand-gold font-bold bg-white/10") : isScrolled ? "text-slate-700 hover:text-brand-blue hover:bg-slate-100" : "text-slate-100 hover:text-brand-gold hover:bg-white/10"}`}>
                <span>{t("nav.nepalTravels")}</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 text-brand-gold" />
              </Link>

              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[820px] bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50 mt-1">
                <div className="flex">
                  <div className="w-5/12 bg-slate-50/90 border-r border-slate-200 p-2.5 space-y-1">
                    <div className="text-[11px] uppercase font-bold text-slate-400 px-3 py-1.5 tracking-wider">
                      {t("nav.regions")}
                    </div>
                    {activeTabsList.map((tab) => (
                      <div
                        key={tab.id}
                        onMouseEnter={() => setActiveMegaTab(tab.id)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition flex items-center justify-between cursor-pointer ${activeMegaTab === tab.id ? "bg-brand-blue text-white shadow-sm" : "text-slate-700 hover:bg-slate-200/70 hover:text-brand-blue"}`}
                      >
                        <Link to={tab.path} className="flex-1 font-semibold text-xs sm:text-sm">
                          {isNepali ? tab.name_np : tab.name}
                        </Link>
                        <span className={`text-xs ${activeMegaTab === tab.id ? "text-brand-gold font-bold" : "text-slate-400"}`}>→</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-slate-200">
                      <Link to="/destinations" className="block text-xs font-bold text-brand-gold hover:text-brand-gold-dark px-3 py-1.5 transition">
                        {t("nav.allDestinations")} →
                      </Link>
                    </div>
                  </div>

                  <div className="w-7/12 p-5 bg-white flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                        <h4 className="text-sm font-bold text-brand-blue">
                          {isNepali ? activeTabsList.find((t) => t.id === activeMegaTab)?.name_np : activeTabsList.find((t) => t.id === activeMegaTab)?.name} {t("nav.itineraries")}
                        </h4>
                        <Link to={activeTabsList.find((t) => t.id === activeMegaTab)?.path || "/treks"} className="text-xs text-brand-gold hover:text-brand-gold-dark font-bold cursor-pointer">
                          {t("nav.exploreRegion")} →
                        </Link>
                      </div>

                      <div className="space-y-2">
                        {activeTabsList.find((t) => t.id === activeMegaTab)?.trips.map((trip, idx) => (
                          <div key={idx} onClick={() => handleTripClick(trip.id)} className="p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 hover:border-slate-200 flex items-center justify-between transition cursor-pointer group/item">
                            <div className="pr-3">
                              <div className="text-xs font-semibold text-slate-800 group-hover/item:text-brand-blue transition line-clamp-1">
                                {isNepali ? trip.title_np : trip.title}
                              </div>
                              <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                                <span className="bg-slate-100 px-1.5 py-0.5 rounded font-medium">
                                  {isNepali ? trip.duration_np : trip.duration}
                                </span>
                                <span className="text-emerald-700 font-semibold">
                                  {t("nav.guaranteed")}
                                </span>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-[10px] text-slate-400 block">{t("common.from")}</span>
                              <span className="text-xs font-bold text-brand-gold">{trip.price}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 bg-brand-gold-light/40 p-2.5 rounded-xl flex items-center justify-between">
                      <div className="text-[11px] text-slate-700">
                        <span className="font-bold text-brand-blue">{t("nav.tailoredTrekPrompt")}</span>{" "}
                        {t("nav.certifiedSherpas")}
                      </div>
                      <Link to="/plan-your-trip" className="text-xs bg-brand-gold text-white px-3 py-1 rounded-lg font-bold hover:bg-brand-gold-dark transition shadow-sm">
                        {t("nav.customize")}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nepal Tours Dropdown */}
            <div className="relative group">
              <Link to="/tours" className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg transition ${isActive("/tours") ? (isScrolled ? "text-brand-blue font-bold bg-slate-100" : "text-brand-gold font-bold bg-white/10") : isScrolled ? "text-slate-700 hover:text-brand-blue hover:bg-slate-100" : "text-slate-100 hover:text-brand-gold hover:bg-white/10"}`}>
                <span>{t("nav.nepalTours")}</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 text-brand-gold" />
              </Link>
              <div className="absolute top-full left-0 w-64 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 p-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50 mt-1">
                <Link to="/tours" className="block px-3 py-2 rounded-lg text-xs hover:bg-slate-100 hover:text-brand-blue">
                  <span className="font-bold block text-sm">{t("nav.allTours")}</span>
                  <span className="text-slate-400">{t("nav.allToursDesc")}</span>
                </Link>
                <Link to="/tours" className="block px-3 py-2 rounded-lg text-xs hover:bg-slate-100 hover:text-brand-blue">
                  <span className="font-bold block text-sm">{t("nav.chitwanSafari")}</span>
                  <span className="text-slate-400">{t("nav.chitwanSafariDesc")}</span>
                </Link>
                <Link to="/activities/helicopter-tour" className="block px-3 py-2 rounded-lg text-xs hover:bg-slate-100 hover:text-brand-blue">
                  <span className="font-bold block text-sm">{t("nav.heliTours")}</span>
                  <span className="text-slate-400">{t("nav.heliToursDesc")}</span>
                </Link>
                <Link to="/activities" className="block px-3 py-2 rounded-lg text-xs hover:bg-slate-100 hover:text-brand-blue">
                  <span className="font-bold block text-sm">{t("nav.activities")}</span>
                  <span className="text-slate-400">{t("nav.activitiesDesc")}</span>
                </Link>
              </div>
            </div>

            {/* Travel Info Dropdown */}
            <div className="relative group">
              <Link to="/travel-info" className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg transition ${isActive("/travel-info") ? (isScrolled ? "text-brand-blue font-bold bg-slate-100" : "text-brand-gold font-bold bg-white/10") : isScrolled ? "text-slate-700 hover:text-brand-blue hover:bg-slate-100" : "text-slate-100 hover:text-brand-gold hover:bg-white/10"}`}>
                <span>{t("nav.travelInfo")}</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 text-brand-gold" />
              </Link>
              <div className="absolute top-full left-0 w-64 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 p-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50 mt-1">
                <Link to="/travel-info" className="block px-3 py-2 rounded-lg text-xs text-slate-700 hover:bg-slate-100 hover:text-brand-blue font-medium">{t("nav.visaInfo")}</Link>
                <Link to="/travel-info" className="block px-3 py-2 rounded-lg text-xs text-slate-700 hover:bg-slate-100 hover:text-brand-blue font-medium">{t("nav.bestTime")}</Link>
                <Link to="/travel-info" className="block px-3 py-2 rounded-lg text-xs text-slate-700 hover:bg-slate-100 hover:text-brand-blue font-medium">{t("nav.permits")}</Link>
                <Link to="/travel-info" className="block px-3 py-2 rounded-lg text-xs text-slate-700 hover:bg-slate-100 hover:text-brand-blue font-medium">{t("nav.altitude")}</Link>
                <Link to="/travel-info" className="block px-3 py-2 rounded-lg text-xs text-slate-700 hover:bg-slate-100 hover:text-brand-blue font-medium">{t("nav.packing")}</Link>
                <Link to="/travel-info" className="block px-3 py-2 rounded-lg text-xs text-slate-700 hover:bg-slate-100 hover:text-brand-blue font-medium">{t("nav.cost")}</Link>
              </div>
            </div>

            {/* Company Dropdown */}
            <div className="relative group">
              <Link to="/about" className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg transition ${isActive("/about") ? (isScrolled ? "text-brand-blue font-bold bg-slate-100" : "text-brand-gold font-bold bg-white/10") : isScrolled ? "text-slate-700 hover:text-brand-blue hover:bg-slate-100" : "text-slate-100 hover:text-brand-gold hover:bg-white/10"}`}>
                <span>{t("nav.company")}</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 text-brand-gold" />
              </Link>
              <div className="absolute top-full left-0 w-56 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 p-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50 mt-1">
                <Link to="/about" className="block px-3 py-2 rounded-lg text-xs text-slate-700 hover:bg-slate-100 hover:text-brand-blue font-medium">{t("nav.aboutUs")}</Link>
                <Link to="/about#why-us" className="block px-3 py-2 rounded-lg text-xs text-slate-700 hover:bg-slate-100 hover:text-brand-blue font-medium">{t("nav.whyUs")}</Link>
                <Link to="/about#reviews" className="block px-3 py-2 rounded-lg text-xs text-slate-700 hover:bg-slate-100 hover:text-brand-blue font-medium">{t("nav.reviews")}</Link>
                <Link to="/destinations" className="block px-3 py-2 rounded-lg text-xs text-slate-700 hover:bg-slate-100 hover:text-brand-blue font-medium">{t("nav.destinationsShowcase")}</Link>
                <Link to="/contact" className="block px-3 py-2 rounded-lg text-xs text-slate-700 hover:bg-slate-100 hover:text-brand-blue font-medium">{t("nav.contactGuides")}</Link>
              </div>
            </div>

            {/* Contact */}
            <Link to="/contact" className={`px-3 py-2 text-sm font-semibold rounded-lg transition ${isActive("/contact") ? (isScrolled ? "text-brand-blue font-bold bg-slate-100" : "text-brand-gold font-bold bg-white/10") : isScrolled ? "text-slate-700 hover:text-brand-blue hover:bg-slate-100" : "text-slate-100 hover:text-brand-gold hover:bg-white/10"}`}>
              {t("nav.contact")}
            </Link>
          </nav>

          {/* Right Header Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            <button onClick={onOpenSearch} className={`hidden md:flex p-2 sm:p-2.5 rounded-full transition cursor-pointer items-center justify-center ${isScrolled ? "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-brand-blue" : "bg-white/10 text-white hover:bg-white/20"}`}>
              <Search className="w-4 h-4" />
            </button>

            <button onClick={toggleLanguage} className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer border ${isScrolled ? "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300" : "bg-white/10 hover:bg-white/20 text-white border-white/20"}`}>
              <span>🌐</span>
              <span className="text-[11px] font-semibold">{language === "en" ? "नेपाली" : "English"}</span>
            </button>

            <Link to="/plan-your-trip" className="bg-brand-gold hover:bg-brand-gold-dark text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{t("planYourTrip")}</span>
            </Link>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`lg:hidden p-2 rounded-lg transition ${isScrolled ? "text-slate-800 hover:bg-slate-100" : "text-white hover:bg-white/10"}`}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-slate-900/60 backdrop-blur-sm flex justify-end">
          <div className="w-4/5 max-w-sm bg-white h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 min-w-0">
                  <img src={logoImg} alt="Swagat Logo" className="h-7 w-7 sm:h-8 sm:w-8 object-contain shrink-0" />
                  <span className="font-black text-brand-blue tracking-wide truncate">SWAGAT</span>
                </Link>
                <div className="flex items-center gap-2">
                  <button onClick={toggleLanguage} className="px-2.5 py-1 text-xs font-bold rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300">
                    🌐 {language === "en" ? "नेपाली" : "English"}
                  </button>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-md text-slate-500 hover:bg-slate-100">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="py-4 space-y-2">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold text-slate-800 hover:text-brand-blue py-1.5">{t("nav.home")}</Link>

                <div className="py-1">
                  <div onClick={() => setMobileTreksOpen(!mobileTreksOpen)} className="flex items-center justify-between text-sm font-bold text-slate-800 hover:text-brand-blue py-1.5 cursor-pointer">
                    <span>{t("nav.nepalTravels")}</span>
                    <ChevronDown className={`w-4 h-4 text-brand-gold transition-transform ${mobileTreksOpen ? "rotate-180" : ""}`} />
                  </div>
                  {mobileTreksOpen && (
                    <div className="pl-3 space-y-1.5 border-l-2 border-brand-gold/30 mt-1 mb-2">
                      <Link to="/treks" onClick={() => setMobileMenuOpen(false)} className="block text-xs font-bold text-brand-gold py-1">
                        {t("sections.viewAllTrips")} →
                      </Link>
                      {activeTabsList.map((r) => (
                        <Link key={r.id} to={r.path} onClick={() => setMobileMenuOpen(false)} className="block text-xs text-slate-600 hover:text-brand-blue py-0.5">
                          {isNepali ? r.name_np : r.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link to="/tours" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold text-slate-800 hover:text-brand-blue py-1.5">{t("nav.nepalTours")}</Link>
                <Link to="/destinations" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold text-slate-800 hover:text-brand-blue py-1.5">{t("nav.allDestinations")}</Link>
                <Link to="/activities" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold text-slate-800 hover:text-brand-blue py-1.5">{t("nav.activities")}</Link>
                <Link to="/travel-info" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold text-slate-800 hover:text-brand-blue py-1.5">{t("nav.travelInfo")}</Link>
                <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold text-slate-800 hover:text-brand-blue py-1.5">{t("nav.aboutUs")}</Link>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold text-slate-800 hover:text-brand-blue py-1.5">{t("nav.contact")}</Link>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-3">
              <Link to="/plan-your-trip" onClick={() => setMobileMenuOpen(false)} className="w-full block bg-brand-gold hover:bg-brand-gold-dark text-white font-bold py-3 rounded-xl transition text-center shadow-md cursor-pointer text-sm">
                {t("planYourTrip")}
              </Link>
              <div className="text-center text-xs text-slate-500">Call / WhatsApp: +977 985-1000000</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}