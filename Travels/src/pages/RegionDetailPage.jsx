import React from "react";
import { useParams, Link } from "react-router-dom";
import { TRIPS } from "../data/tripsData";
import { DESTINATIONS } from "../data/destinationsData";
import { useData } from "../context/DataContext";
import TripCard from "../components/TripCard";
import {
  Mountain,
  MapPin,
  Calendar,
  ShieldCheck,
  Compass,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function RegionDetailPage({
  onSelectTrip,
  onBookTrip,
  wishlist,
  onToggleWishlist,
  onOpenPlanTrip,
}) {
  const { regionSlug } = useParams();
  const { trips, destinations } = useData();
  const allTrips = trips && trips.length > 0 ? trips : TRIPS;
  const allDestinations =
    destinations && destinations.length > 0 ? destinations : DESTINATIONS;

  // Find destination info matching slug, id, or name fallback to everest
  const cleanSlug = (regionSlug || "").toLowerCase();
  const destination =
    allDestinations.find(
      (d) =>
        d.id?.toLowerCase() === cleanSlug ||
        d.slug?.toLowerCase() === cleanSlug ||
        d.slug?.toLowerCase().includes(cleanSlug) ||
        d.name?.toLowerCase().includes(cleanSlug) ||
        cleanSlug.includes(d.id?.toLowerCase())
    ) || allDestinations[0];

  // Match trips belonging to this region
  const destName = destination?.name?.toLowerCase().replace(" region", "") || "";
  const destId = destination?.id?.toLowerCase() || "";
  const destSlug = destination?.slug?.toLowerCase() || "";

  const regionTrips = allTrips.filter((t) => {
    const tRegion = (t.region || "").toLowerCase();
    const tRegionSlug = (t.regionSlug || "").toLowerCase();

    return (
      (destId && (tRegion.includes(destId) || tRegionSlug.includes(destId))) ||
      (destName && (tRegion.includes(destName) || tRegionSlug.includes(destName))) ||
      (destSlug && (tRegion.includes(destSlug) || tRegionSlug.includes(destSlug))) ||
      (cleanSlug && (tRegion.includes(cleanSlug) || tRegionSlug.includes(cleanSlug)))
    );
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Region Hero Banner */}
      <div className="relative py-24 bg-brand-blue-dark text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105 opacity-35 mix-blend-overlay"
          style={{ backgroundImage: `url(${destination.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark via-brand-blue-dark/80 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to="/treks"
            className="inline-flex items-center gap-1.5 text-xs text-brand-gold hover:text-white font-bold mb-6 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Nepal Travels</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-wider mb-4 border border-brand-gold/30">
            <Compass className="w-3.5 h-3.5" />
            {destination.tag}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {destination.name}
          </h1>
          <p className="mt-2 text-brand-gold font-bold text-base sm:text-lg">
            {destination.title}
          </p>
          <p className="mt-4 max-w-3xl text-slate-300 text-sm sm:text-base leading-relaxed">
            {destination.description}
          </p>

          {/* Region Key Stats Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-bold">
                Max Peak
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-white">
                {destination.elevation}
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-bold">
                Best Season
              </span>
              <span className="text-sm sm:text-base font-bold text-amber-200">
                Mar – May & Sep – Dec
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-bold">
                Entry Permits
              </span>
              <span className="text-sm sm:text-base font-bold text-emerald-300">
                Included Direct
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Region Packages Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-200 mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-blue">
              Featured {destination.name} Itineraries
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              All routes led by certified local Sherpa guides with guaranteed
              departures and flexible booking.
            </p>
          </div>
          <button
            onClick={onOpenPlanTrip}
            className="px-5 py-2.5 rounded-xl bg-brand-gold text-white font-bold text-xs shadow hover:bg-brand-gold-dark transition"
          >
            Custom {destination.name} Itinerary
          </button>
        </div>

        {regionTrips.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {regionTrips.map((trip) => (
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
        ) : (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
            <Mountain className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-700">
              Custom Routes Available
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
              We arrange customized private guided treks, luxury camping, and
              helicopter tours in the {destination.name}.
            </p>
            <button
              onClick={onOpenPlanTrip}
              className="mt-4 px-6 py-2.5 bg-brand-gold text-white font-bold text-xs rounded-xl shadow"
            >
              Contact Our Destination Specialist
            </button>
          </div>
        )}

        {/* Region Highlights & Travel Guide */}
        <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm">
          <h3 className="text-xl sm:text-2xl font-bold text-brand-blue mb-4">
            Highlights of {destination.name}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {destination.highlights.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
