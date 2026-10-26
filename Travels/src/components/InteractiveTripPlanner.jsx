import React, { useState } from "react";
import { ScrollReveal } from "../hooks/useScrollReveal";
import {
  Sliders,
  Compass,
  Calendar,
  Mountain,
  ArrowRight,
  Sparkles,
  Check,
} from "lucide-react";

export default function InteractiveTripPlanner({
  trips,
  onSelectTrip,
  onOpenPlanTrip,
}) {
  const [season, setSeason] = useState("autumn");
  const [fitness, setFitness] = useState("moderate");
  const [duration, setDuration] = useState("11-15");

  // Filter recommendations
  const recommendations = trips
    .filter((t) => {
      if (duration === "1-5") return t.durationDays <= 5;
      if (duration === "6-10")
        return t.durationDays >= 6 && t.durationDays <= 10;
      if (duration === "11-15")
        return t.durationDays >= 11 && t.durationDays <= 15;
      if (duration === "16+") return t.durationDays >= 16;
      return true;
    })
    .slice(0, 3);

  return (
    <section className="py-20 bg-brand-blue-dark text-white relative overflow-hidden">
      {/* Mountain outline backdrop */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C58B24_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal
          animation="fade-up"
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Find Your Ideal Route
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Answer 3 quick preferences and let our mountain algorithms pair you
            with handcrafted itineraries tailored to your schedule and fitness.
          </p>
        </ScrollReveal>

        {/* Interactive Controls */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/15 max-w-5xl mx-auto shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Preferred Season */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-gold mb-3 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-gold" />
                1. Best Season
              </label>
              <div className="space-y-2">
                {[
                  {
                    id: "autumn",
                    name: "Autumn (Sep – Nov)",
                    note: "Crystal clear views & festival vibes",
                  },
                  {
                    id: "spring",
                    name: "Spring (Mar – May)",
                    note: "Blooming rhododendrons & warm sun",
                  },
                  {
                    id: "winter",
                    name: "Winter (Dec – Feb)",
                    note: "Crisp skies, snow peaks & quiet trails",
                  },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSeason(s.id)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition cursor-pointer ${
                      season === s.id
                        ? "bg-brand-gold text-white border-brand-gold shadow-md font-semibold"
                        : "bg-white/5 border-white/10 text-slate-200 hover:bg-white/10"
                    }`}
                  >
                    <div className="font-bold">{s.name}</div>
                    <div
                      className={`text-[11px] mt-0.5 ${season === s.id ? "text-white/90" : "text-slate-400"}`}
                    >
                      {s.note}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Fitness Level */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-green mb-3 flex items-center gap-1.5">
                <Mountain className="w-4 h-4 text-brand-green" />
                2. Fitness / Experience
              </label>
              <div className="space-y-2">
                {[
                  {
                    id: "easy",
                    name: "Leisure / First-Timer",
                    note: "3–5 hrs walking/day, moderate heights",
                  },
                  {
                    id: "moderate",
                    name: "Active Hiker",
                    note: "5–6 hrs daily walk, good endurance",
                  },
                  {
                    id: "strenuous",
                    name: "High-Altitude Adventurer",
                    note: "6–8 hrs walking, cross 5,000m+ passes",
                  },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFitness(f.id)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition cursor-pointer ${
                      fitness === f.id
                        ? "bg-brand-green text-white border-brand-green shadow-md font-semibold"
                        : "bg-white/5 border-white/10 text-slate-200 hover:bg-white/10"
                    }`}
                  >
                    <div className="font-bold">{f.name}</div>
                    <div
                      className={`text-[11px] mt-0.5 ${fitness === f.id ? "text-white/90" : "text-slate-400"}`}
                    >
                      {f.note}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Trip Duration */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-3 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-amber-300" />
                3. Total Vacation Days
              </label>
              <div className="space-y-2">
                {[
                  {
                    id: "1-5",
                    name: "1 to 5 Days",
                    note: "Poon Hill, Nagarkot or Heli tours",
                  },
                  {
                    id: "6-10",
                    name: "6 to 10 Days",
                    note: "Mardi Himal, Langtang Valley",
                  },
                  {
                    id: "11-15",
                    name: "11 to 15 Days",
                    note: "Everest Base Camp, Manaslu, Annapurna",
                  },
                  {
                    id: "16+",
                    name: "16+ Days",
                    note: "EBC Gokyo, Three Passes, Dolpo",
                  },
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDuration(d.id)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition cursor-pointer ${
                      duration === d.id
                        ? "bg-brand-blue text-white border-white/40 shadow-md font-semibold"
                        : "bg-white/5 border-white/10 text-slate-200 hover:bg-white/10"
                    }`}
                  >
                    <div className="font-bold">{d.name}</div>
                    <div
                      className={`text-[11px] mt-0.5 ${duration === d.id ? "text-white/90" : "text-slate-400"}`}
                    >
                      {d.note}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Dynamic Match Results Preview */}
          <div className="mt-8 pt-6 border-t border-white/15">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-300">
                Top Matches ({recommendations.length} Treks Found)
              </span>
              <button
                onClick={onOpenPlanTrip}
                className="text-xs text-brand-gold hover:text-white transition font-semibold flex items-center gap-1 cursor-pointer mt-2 sm:mt-0"
              >
                <span>Need a 100% custom itinerary? Click here</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => onSelectTrip(rec.id)}
                  className="bg-white/10 hover:bg-white/20 p-3.5 rounded-xl border border-white/15 transition cursor-pointer flex items-center gap-3 group"
                >
                  <img
                    src={rec.image}
                    alt={rec.title}
                    className="w-14 h-14 rounded-lg object-cover shrink-0"
                  />
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-bold text-white group-hover:text-brand-gold transition truncate">
                      {rec.title}
                    </h4>
                    <div className="text-[11px] text-slate-300 flex items-center gap-2 mt-0.5">
                      <span>{rec.duration}</span>
                      <span>•</span>
                      <span className="text-brand-gold font-bold">
                        ${rec.salePrice}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
