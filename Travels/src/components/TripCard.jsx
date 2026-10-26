import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import {
  Star,
  Clock,
  Mountain,
  Footprints,
  Heart,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

export default function TripCard({
  trip,
  onSelectTrip,
  onBookTrip,
  isWishlisted,
  onToggleWishlist,
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { isNepali, t } = useLanguage();

  const title = isNepali && trip.title_np ? trip.title_np : trip.title;
  const region = isNepali && trip.region_np ? trip.region_np : trip.region;
  const duration = isNepali && trip.duration_np ? trip.duration_np : trip.duration;
  const difficulty = isNepali && trip.difficulty_np ? trip.difficulty_np : trip.difficulty;
  const maxAltitude = isNepali && trip.maxAltitude_np ? trip.maxAltitude_np : trip.maxAltitude;
  const badge = isNepali && trip.badge_np ? trip.badge_np : trip.badge;
  const overview = isNepali && trip.overview_np ? trip.overview_np : trip.overview;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/80 hover:border-brand-gold/40 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1.5">
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] sm:aspect-[16/10] md:aspect-[3/2] overflow-hidden bg-slate-100">
        <img
          src={trip.image}
          alt={title}
          width="640"
          height="400"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          decoding="async"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-wrap gap-1.5 sm:gap-2 items-center">
          {badge && (
            <span className="bg-brand-gold text-white text-[9px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-md tracking-wide">
              {badge}
            </span>
          )}
          <span className="bg-brand-blue/90 text-white text-[9px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full backdrop-blur-sm shadow-md">
            {duration}
          </span>
        </div>

        {/* Top Right Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(trip.id);
          }}
          className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-red-500 backdrop-blur-sm transition shadow-md cursor-pointer"
          aria-label="Add to wishlist"
        >
          <Heart
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-slate-600"
            }`}
          />
        </button>

        {/* Bottom Image Overlay Info */}
        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 flex items-center justify-between text-white text-[10px] sm:text-xs font-medium">
          <span className="bg-black/40 backdrop-blur-md px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[11px]">
            {region}
          </span>
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-1.5 sm:px-2 py-0.5 rounded">
            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold">{trip.rating}</span>
            <span className="text-slate-300 text-[9px] sm:text-[10px]">
              ({trip.reviewsCount})
            </span>
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-3.5 sm:p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Trip Title */}
          <h3
            onClick={() => onSelectTrip(trip.id)}
            className="text-sm sm:text-lg font-bold text-slate-800 group-hover:text-brand-blue transition line-clamp-2 cursor-pointer leading-snug"
          >
            {title}
          </h3>

          {/* Description snippet */}
          <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {overview}
          </p>

          {/* Key Metrics / Specs */}
          <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-100 grid grid-cols-2 gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-slate-600">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <Mountain className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-blue shrink-0" />
              <span className="truncate">{maxAltitude}</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <Footprints className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-green shrink-0" />
              <span className="truncate">{difficulty}</span>
            </div>
          </div>
        </div>

        {/* Pricing & CTA Buttons */}
        <div className="mt-3.5 sm:mt-5 pt-2.5 sm:pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
              <span className="text-[10px] sm:text-xs text-slate-400 line-through">
                ${trip.regularPrice}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-emerald-600 bg-emerald-50 px-1 sm:px-1.5 py-0.5 rounded">
                Save ${trip.regularPrice - trip.salePrice}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[10px] sm:text-xs text-slate-500 font-medium">
                {isNepali ? "सुरुवात" : "From"}
              </span>
              <span className="text-base sm:text-xl font-extrabold text-brand-blue">
                ${trip.salePrice}
              </span>
              <span className="text-[9px] sm:text-[10px] text-slate-400">
                {isNepali ? "/ प्रतिव्यक्ति" : "/ person"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => onSelectTrip(trip.id)}
              className="bg-slate-100 hover:bg-brand-blue hover:text-white text-slate-700 text-[10px] sm:text-xs font-bold py-1.5 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl transition-all duration-200 flex items-center gap-0.5 sm:gap-1 cursor-pointer"
            >
              <span>{isNepali ? "हेर्नुहोस्" : "Explore"}</span>
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
            <button
              onClick={() => onBookTrip(trip)}
              className="bg-brand-gold hover:bg-brand-gold-dark text-white text-[10px] sm:text-xs font-bold py-1.5 sm:py-2.5 px-2.5 sm:px-3 rounded-lg sm:rounded-xl shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
            >
              {isNepali ? "सोधपुछ" : "Inquire"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
