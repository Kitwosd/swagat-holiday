import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { ACTIVITIES } from "../data/activitiesData";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";
import { ScrollReveal } from "../hooks/useScrollReveal";
import { Compass, Sparkles, ArrowRight, ArrowUpRight } from "lucide-react";

export default function ActivitiesSection({ onSelectActivity }) {
  const navigate = useNavigate();
  const { activities } = useData();
  const { t } = useLanguage();
  const list = activities && activities.length > 0 ? activities : ACTIVITIES;

  // Divide into 3 Pyramid Tiers: 1 on Tier 1, 3 on Tier 2, 5 on Tier 3 (1 + 3 + 5 = 9)
  const tier1 = list.filter((act) => act.tier === 1); // 1 card
  const tier2 = list.filter((act) => act.tier === 2); // 3 cards
  const tier3 = list.filter((act) => act.tier === 3); // 5 cards

  const handleCardClick = (activity) => {
    if (onSelectActivity) {
      onSelectActivity(activity.id);
    }
    navigate(activity.redirectUrl);
  };

  return (
    <section
      id="activities"
      className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-100 relative overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-brand-gold/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Top Header */}
        <ScrollReveal
          animation="fade-up"
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-blue tracking-tight">
            {t("sections.activities")}
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            {t("sections.activitiesSub")}
          </p>
        </ScrollReveal>

        {/* Pyramid Stacking Container: 1 on top, then 3 in middle, then 5 at base */}
        <div className="space-y-6 sm:space-y-8">
          {/* TIER 1 (Apex): Exactly 1 Picture Card (Centered) */}
          <div className="flex justify-center">
            {tier1.map((act) => (
              <ScrollReveal
                key={act.id}
                animation="fade-up"
                className="w-full max-w-2xl"
              >
                <div
                  onClick={() => handleCardClick(act)}
                  className="shine-overlay-card group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border-2 border-brand-gold/30 hover:border-brand-gold bg-slate-900 transition-all duration-500 h-80 sm:h-96 flex flex-col justify-end p-6 sm:p-8 cursor-pointer transform hover:-translate-y-1.5"
                >
                  {/* High Quality Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-z-2"
                    style={{ backgroundImage: `url(${act.image})` }}
                  />

                  {/* Dark Radial Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/95 via-black/40 to-transparent group-hover:from-brand-blue-dark/90 transition-all duration-300" />

                  {/* Top Glowing Apex Tag */}
                  <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between z-10">
                    <span className="inline-flex items-center gap-1.5 bg-brand-gold text-white font-extrabold text-xs uppercase px-3 py-1 rounded-full shadow-lg tracking-wider">
                      Pyramid Summit • {act.subtitle}
                    </span>
                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20 shadow">
                      From {act.priceFrom}
                    </span>
                  </div>

                  {/* Bottom Content */}
                  <div className="relative z-10 text-white">
                    <div className="flex items-center gap-2 text-xs font-semibold text-amber-200 mb-1">
                      <span>{act.count}</span>
                      <span>•</span>
                      <span>Avg: {act.durationAvg}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-amber-200 transition duration-300">
                      {act.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-slate-200 line-clamp-2 leading-relaxed max-w-xl">
                      {act.description}
                    </p>

                    <div className="mt-5 pt-3 border-t border-white/20 flex items-center justify-between text-xs sm:text-sm font-bold text-white group-hover:text-brand-gold transition">
                      <span className="flex items-center gap-1.5">
                        <span>Click to Explore Dedicated Page</span>
                      </span>
                      <div className="w-8 h-8 rounded-full bg-brand-gold group-hover:bg-white text-white group-hover:text-brand-blue flex items-center justify-center transition-all duration-300 shadow">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* TIER 2 (Middle): Exactly 3 Picture Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tier2.map((act, idx) => (
              <ScrollReveal
                key={act.id}
                animation="fade-up"
                delay={idx * 120}
                className="h-full"
              >
                <div
                  onClick={() => handleCardClick(act)}
                  className="shine-overlay-card group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-slate-200/90 hover:border-brand-gold/60 bg-slate-900 transition-all duration-500 h-80 flex flex-col justify-end p-5 sm:p-6 cursor-pointer transform hover:-translate-y-1.5"
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-z-2"
                    style={{ backgroundImage: `url(${act.image})` }}
                  />

                  {/* Dark Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/95 via-black/45 to-transparent group-hover:from-brand-blue-dark/90 transition-all duration-300" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
                      {act.subtitle}
                    </span>
                    <span className="text-[11px] font-semibold bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-white">
                      From {act.priceFrom}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-white">
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-200 transition duration-300">
                      {act.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {act.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs font-bold text-white group-hover:text-brand-gold transition">
                      <span>Explore Dedicated Page</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* TIER 3 (Base): Exactly 5 Picture Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            {tier3.map((act, idx) => (
              <ScrollReveal
                key={act.id}
                animation="fade-up"
                delay={idx * 80}
                className="h-full"
              >
                <div
                  onClick={() => handleCardClick(act)}
                  className="shine-overlay-card group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-slate-200/80 hover:border-brand-gold/60 bg-slate-900 transition-all duration-500 h-72 flex flex-col justify-end p-4 cursor-pointer transform hover:-translate-y-1.5"
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-z-5"
                    style={{ backgroundImage: `url(${act.image})` }}
                  />

                  {/* Dark Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/95 via-black/45 to-transparent group-hover:from-brand-blue-dark/90 transition-all duration-300" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full">
                      {act.subtitle}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-white">
                    <h3 className="text-base font-bold text-white group-hover:text-amber-200 transition duration-300 line-clamp-1">
                      {act.title}
                    </h3>
                    <p className="mt-1 text-[11px] text-slate-300 line-clamp-2 leading-snug">
                      {act.description}
                    </p>

                    <div className="mt-3 pt-2 border-t border-white/15 flex items-center justify-between text-[11px] font-bold text-white group-hover:text-brand-gold transition">
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* View All Activities CTA Footer */}
        <div className="mt-12 text-center">
          <Link
            to="/activities"
            className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-sm px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>View All Adventurous Activities Directory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
