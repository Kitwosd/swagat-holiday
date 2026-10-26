import React from "react";
import { useParams, Link } from "react-router-dom";
import { ACTIVITIES } from "../data/activitiesData";
import { TRIPS } from "../data/tripsData";
import { useData } from "../context/DataContext";
import TripCard from "../components/TripCard";
import {
  Compass,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Clock,
  DollarSign,
} from "lucide-react";
import { ScrollReveal } from "../hooks/useScrollReveal";

export default function ActivitiesPage({
  onSelectTrip,
  onBookTrip,
  wishlist,
  onToggleWishlist,
  onOpenPlanTrip,
}) {
  const { activitySlug } = useParams();
  const { activities, trips } = useData();
  const allActivities = activities && activities.length > 0 ? activities : ACTIVITIES;
  const allTrips = trips && trips.length > 0 ? trips : TRIPS;

  // If activitySlug is specified, show single activity detail view
  if (activitySlug) {
    const activity =
      allActivities.find(
        (a) => a.slug === activitySlug || a.id === activitySlug,
      ) || allActivities[0];

    // Filter matching trips
    const matchingTrips = allTrips.filter((t) => {
      if (activity.id === "adventure" || activity.id === "top-seller")
        return true;
      if (activity.id === "short-treks")
        return t.category === "short-trek" || t.durationDays <= 6;
      if (activity.id === "helicopter-tour") return t.category === "heli";
      if (activity.id === "jungle-safari") return t.id.includes("chitwan");
      return true;
    });

    return (
      <div className="bg-slate-50 min-h-screen">
        {/* Activity Detail Hero */}
        <div className="relative py-24 bg-brand-blue-dark text-white overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105 opacity-35 mix-blend-overlay"
            style={{ backgroundImage: `url(${activity.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark via-brand-blue-dark/80 to-transparent" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link
              to="/activities"
              className="inline-flex items-center gap-1.5 text-xs text-brand-gold hover:text-white font-bold mb-6 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Activities</span>
            </Link>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-wider mb-4 border border-brand-gold/30">
              <Compass className="w-3.5 h-3.5" />
              {activity.subtitle}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              {activity.title}
            </h1>

            <p className="mt-4 max-w-3xl text-slate-300 text-sm sm:text-base leading-relaxed">
              {activity.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-xs font-bold">
              <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/15">
                Starting from:{" "}
                <strong className="text-brand-gold text-sm ml-1">
                  {activity.priceFrom}
                </strong>
              </span>
              <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/15">
                Typical Duration:{" "}
                <strong className="text-white text-sm ml-1">
                  {activity.durationAvg}
                </strong>
              </span>
              <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/15">
                Available Departures:{" "}
                <strong className="text-emerald-400 text-sm ml-1">
                  {activity.count}
                </strong>
              </span>
            </div>
          </div>
        </div>

        {/* Activity Content & Matching Trips */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Highlights Box */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm mb-14">
            <h3 className="text-xl font-bold text-brand-blue mb-4">
              What to Expect: {activity.title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activity.highlights.map((h, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    {h}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Trips Grid */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-8">
              <h2 className="text-2xl font-extrabold text-brand-blue">
                Recommended Trips for {activity.title}
              </h2>
              <button
                onClick={onOpenPlanTrip}
                className="px-4 py-2 rounded-xl bg-brand-gold text-white font-bold text-xs shadow hover:bg-brand-gold-dark transition"
              >
                Custom Request
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {matchingTrips.slice(0, 6).map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  onSelectTrip={onSelectTrip}
                  onBookTrip={onBookTrip}
                  isWishlisted={wishlist.includes(trip.id)}
                  onToggleWishlist={onToggleWishlist}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Full Activities Directory Page
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Directory Hero */}
      <div className="relative py-24 bg-brand-blue-dark text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark via-brand-blue-dark/85 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-wider mb-4 border border-brand-gold/30">
            <Compass className="w-3.5 h-3.5" />
            Complete Activities Directory
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Adventurous Activities in{" "}
            <span className="text-brand-gold">Nepal</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed">
            From high-altitude mountaineering peaks and luxury helicopter
            landings to tranquil lake boating and UNESCO living history.
          </p>
        </div>
      </div>

      {/* Activities Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allActivities.map((act) => (
            <div
              key={act.id}
              className="shine-overlay-card bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={act.image}
                    alt={act.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="bg-brand-gold text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow">
                      {act.subtitle}
                    </span>
                    <span className="bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-md">
                      From {act.priceFrom}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold leading-tight group-hover:text-amber-200 transition">
                      {act.title}
                    </h3>
                    <span className="text-xs text-slate-300 mt-1 block">
                      {act.count}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {act.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider block mb-2">
                      Key Highlights:
                    </span>
                    <div className="space-y-1">
                      {act.highlights.slice(0, 3).map((h, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs text-slate-700"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-green shrink-0" />
                          <span className="line-clamp-1">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to={act.redirectUrl}
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs py-3 px-4 rounded-xl shadow transition"
                >
                  <span>Explore {act.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
