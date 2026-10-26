import React, { useState } from "react";
import { DESTINATIONS } from "../data/destinationsData";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";
import { ScrollReveal } from "../hooks/useScrollReveal";
import { MapPin, Mountain, ArrowRight, Compass, Sparkles } from "lucide-react";

export default function DestinationsSection({ onSelectRegion }) {
  const { destinations } = useData();
  const { t, isNepali } = useLanguage();
  const list =
    destinations && destinations.length > 0 ? destinations : DESTINATIONS;
  const [hoveredDest, setHoveredDest] = useState(null);

  return (
    <section
      id="destinations"
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <ScrollReveal animation="fade-left" className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue tracking-tight">
              {t("sections.destinations")}
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              {t("sections.destinationsSub")}
            </p>
          </ScrollReveal>

          <ScrollReveal
            animation="fade-right"
            delay={200}
            className="mt-4 md:mt-0"
          ></ScrollReveal>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {list.map((dest, idx) => (
            <ScrollReveal
              key={dest.id}
              animation="fade-up"
              delay={(idx % 3) * 120}
              className="h-full"
            >
              <div
                onMouseEnter={() => setHoveredDest(dest.id)}
                onMouseLeave={() => setHoveredDest(null)}
                className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-slate-100 transition-all duration-500 h-[380px] flex flex-col justify-end p-6 cursor-pointer"
                onClick={() => onSelectRegion(dest.name)}
              >
                {/* Background Image with Zoom */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url(${dest.image})` }}
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/95 via-brand-blue-dark/50 to-transparent group-hover:via-brand-blue-dark/60 transition-all duration-300" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="bg-brand-gold text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm tracking-wide">
                    {isNepali && dest.tag_np ? dest.tag_np : dest.tag}
                  </span>
                  <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-xs font-semibold">
                    <Mountain className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{isNepali && dest.elevation_np ? dest.elevation_np : dest.elevation}</span>
                  </div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 text-white transform transition-transform duration-300 group-hover:translate-y-0">
                  <div className="text-xs uppercase font-bold tracking-wider text-amber-300 mb-1">
                    {isNepali ? `${dest.tripsCount} वटा पदयात्राहरू` : `${dest.tripsCount} Featured Treks`}
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-amber-200 transition">
                    {isNepali && dest.name_np ? dest.name_np : dest.name}
                  </h3>
                  <p className="mt-2 text-xs text-slate-200 line-clamp-2 leading-relaxed">
                    {isNepali && dest.description_np ? dest.description_np : dest.description}
                  </p>

                  {/* Highlights Tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {dest.highlights && dest.highlights.slice(0, 3).map((h, i) => (
                      <span
                        key={i}
                        className="bg-white/15 backdrop-blur-md text-[10px] text-white font-medium px-2 py-0.5 rounded"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* CTA link */}
                  <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs font-bold text-brand-gold group-hover:text-white transition">
                    <span>{isNepali ? `${dest.name_np || dest.name} का ट्रेकहरू हेर्नुहोस्` : `View ${dest.name} Treks`}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
