import React, { useState } from "react";
import TripCard from "./TripCard";
import { CATEGORIES } from "../data/tripsData";
import { ScrollReveal } from "../hooks/useScrollReveal";
import { useLanguage } from "../context/LanguageContext";
import { Sparkles, Filter } from "lucide-react";

export default function BestSellingTrips({
  trips,
  onSelectTrip,
  onBookTrip,
  activeFilter,
  setActiveFilter,
  wishlist,
  onToggleWishlist,
}) {
  const { t } = useLanguage();
  const filteredTrips = trips.filter((trip) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "everest")
      return trip.region.toLowerCase().includes("everest");
    if (activeFilter === "annapurna")
      return trip.region.toLowerCase().includes("annapurna");
    if (activeFilter === "manaslu")
      return trip.region.toLowerCase().includes("manaslu");
    if (activeFilter === "short")
      return trip.category === "short-trek" || trip.durationDays <= 5;
    if (activeFilter === "heli") return trip.category === "heli";
    return true;
  });

  return (
    <section
      id="featured-trips"
      className="py-20 bg-slate-50 relative overflow-hidden"
    >
      {/* Decorative mountain background line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal
          animation="fade-up"
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue tracking-tight">
            {t("sections.bestSelling")}
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            {t("sections.bestSellingSub")}
          </p>
        </ScrollReveal>

        {/* Filter Tabs */}
        <ScrollReveal
          animation="fade-up"
          delay={150}
          className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeFilter === cat.id
                  ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20 scale-105"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </ScrollReveal>

        {/* Trips Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTrips.map((trip, idx) => (
            <ScrollReveal
              key={trip.id}
              animation="fade-up"
              delay={(idx % 3) * 150}
              className="h-full"
            >
              <TripCard
                trip={trip}
                onSelectTrip={onSelectTrip}
                onBookTrip={onBookTrip}
                isWishlisted={wishlist.includes(trip.id)}
                onToggleWishlist={onToggleWishlist}
              />
            </ScrollReveal>
          ))}
        </div>

        {filteredTrips.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 mt-8">
            <p className="text-slate-500 font-medium">
              No trips match your current filter selection.
            </p>
            <button
              onClick={() => setActiveFilter("all")}
              className="mt-4 px-4 py-2 bg-brand-blue text-white text-xs font-bold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
