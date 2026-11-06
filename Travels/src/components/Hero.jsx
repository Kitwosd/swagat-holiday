import React, { useState } from "react";
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  Compass,
  ShieldCheck,
  Star,
  Users,
  ArrowRight,
} from "lucide-react";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";

export default function Hero({ onFilterTrips, onOpenPlanTrip }) {
  const { siteContent, destinations } = useData();
  const { t, isNepali } = useLanguage();
  const hero = siteContent?.hero_content || {};
  const { scrollY } = useScrollPosition();
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onFilterTrips({
      destination: selectedDestination,
      activity: selectedActivity,
      duration: selectedDuration,
    });
    const element = document.getElementById("featured-trips");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Parallax transform calculation
  const parallaxOffset = Math.min(scrollY * 0.35, 200);
  const contentFade = Math.max(1 - scrollY / 5000, 0);

  // ✅ FIXED: Separated the logic so it correctly falls back to static translations
  const displayTitle = isNepali
    ? (hero.title_np || t("hero.defaultTitle"))
    : (hero.title || t("hero.defaultTitle"));

  const displaySubtitle = isNepali
    ? (hero.subtitle_np || t("hero.defaultSubtitle"))
    : (hero.subtitle || t("hero.defaultSubtitle"));

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-brand-blue-dark">
      {/* Background Image with Parallax Movement & Dark Gradient Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center will-change-transform scale-105"
        style={{
          backgroundImage: `url('${hero.image || "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=85"}')`,
          transform: `translateY(${parallaxOffset}px)`,
          transition: "transform 0.1s linear",
        }}
      >
        {/* Multilayer gradient overlays for text legibility and rich atmospheric depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-blue-dark/80 via-brand-blue-dark/50 to-brand-blue-dark/95" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/40 to-black/80" />
      </div>

      {/* Floating subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Hero Main Content */}
      <div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center flex flex-col items-center"
        style={{ opacity: contentFade }}
      >
        {/* Section Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight max-w-4xl text-shadow-lg">
          {(() => {
            // Safety check in case displayTitle is undefined
            if (!displayTitle) return null;

            const words = displayTitle.trim().split(" ");
            if (words.length <= 1) {
              return <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-brand-gold to-amber-200">{displayTitle}</span>;
            }
            const lead = words.slice(0, words.length - 1).join(" ");
            const last = words[words.length - 1];
            return (
              <>
                {lead}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-brand-gold to-amber-200">
                  {last}
                </span>
              </>
            );
          })()}
        </h1>

        {/* Tagline / Subtitle */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-200 max-w-3xl leading-relaxed font-light">
          {displaySubtitle}
        </p>

        {/* Interactive Quick Search Box (Currently Commented Out) */}
        {/* <div className="w-full max-w-4xl mt-10 bg-white/95 backdrop-blur-lg p-4 sm:p-5 rounded-2xl shadow-2xl border border-white/40 text-left">
          <form
            onSubmit={handleSearchSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-center"
          >
            <div className="relative">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                {t("hero.search.destinationLabel")}
              </label>
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full bg-slate-100 hover:bg-slate-200/70 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-blue transition cursor-pointer"
              >
                <option value="">{t("hero.search.allDestinations")}</option>
                {destinations && destinations.length > 0 ? (
                  destinations.map((d) => (
                    <option key={d.id || d.slug} value={d.name}>
                      {d.name} {d.title ? `(${d.title})` : ""}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="Everest Region">
                      {t("hero.search.regions.everest")}
                    </option>
                    <option value="Annapurna Region">{t("hero.search.regions.annapurna")}</option>
                    <option value="Manaslu Region">
                      {t("hero.search.regions.manaslu")}
                    </option>
                    <option value="Langtang Region">
                      {t("hero.search.regions.langtang")}
                    </option>
                    <option value="Terai Lowlands">{t("hero.search.regions.terai")}</option>
                  </>
                )}
              </select>
            </div>

            <div className="relative">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-brand-green" />
                {t("hero.search.styleLabel")}
              </label>
              <select
                value={selectedActivity}
                onChange={(e) => setSelectedActivity(e.target.value)}
                className="w-full bg-slate-100 hover:bg-slate-200/70 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-blue transition cursor-pointer"
              >
                <option value="">{t("hero.search.allActivities")}</option>

                <option value="short-trek">{t("hero.search.styles.shortTrek")}</option>
                <option value="heli">{t("hero.search.styles.heli")}</option>
                <option value="tour">{t("hero.search.styles.tour")}</option>
              </select>
            </div>

            <div className="relative">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-brand-blue" />
                {t("hero.search.durationLabel")}
              </label>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full bg-slate-100 hover:bg-slate-200/70 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-blue transition cursor-pointer"
              >
                <option value="">{t("hero.search.anyDuration")}</option>
                <option value="1-5">{t("hero.search.durations.d1_5")}</option>
                <option value="6-10">{t("hero.search.durations.d6_10")}</option>
                <option value="11-15">{t("hero.search.durations.d11_15")}</option>
                <option value="16+">{t("hero.search.durations.d16_plus")}</option>
              </select>
            </div>

            <div className="sm:col-span-2 lg:col-span-1 pt-1 sm:pt-0">
              <label className="hidden lg:block text-[11px] font-bold uppercase text-transparent mb-1">
                Search
              </label>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-brand-gold to-brand-gold-dark hover:from-brand-gold-dark hover:to-brand-gold text-white font-bold py-2.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer transform active:scale-95"
              >
                <Search className="w-4 h-4" />
                <span>{t("hero.search.searchButton")}</span>
              </button>
            </div>
          </form>
        </div> */}
      </div>

      {/* Bottom Scroll Indicator Pill */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-white/60 hover:text-white transition cursor-pointer">
        <span className="text-[10px] tracking-widest uppercase mb-1 font-semibold">
          {t("hero.scrollToExplore")}
        </span>
        <div className="w-5 h-8 border-2 border-white/40 rounded-full flex justify-center pt-1">
          <div className="w-1 h-2 bg-brand-gold rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}