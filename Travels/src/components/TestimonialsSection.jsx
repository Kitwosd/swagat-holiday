import React from "react";
import { REVIEWS } from "../data/activitiesData";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";
import { ScrollReveal } from "../hooks/useScrollReveal";
import { Star, Quote, CheckCircle2, MessageSquare } from "lucide-react";

export default function TestimonialsSection() {
  const { reviews, siteContent } = useData();
  const { t, isNepali } = useLanguage();
  const list = reviews && reviews.length > 0 ? reviews : REVIEWS;
  const testimonialsInfo = siteContent?.testimonials_section || {};

  const title = isNepali && testimonialsInfo.title_np
    ? testimonialsInfo.title_np
    : (testimonialsInfo.title || t("sections.testimonials"));

  const subtitle = isNepali && testimonialsInfo.subtitle_np
    ? testimonialsInfo.subtitle_np
    : (testimonialsInfo.subtitle || t("sections.testimonialsSub"));

  const rankText = isNepali && testimonialsInfo.rankText_np
    ? testimonialsInfo.rankText_np
    : (testimonialsInfo.rankText || (isNepali ? "ट्रिपएडभाइजर र गुगल समीक्षामा नम्बर १" : "Ranked #1 on TripAdvisor & Google Reviews"));

  return (
    <section id="reviews" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal
          animation="fade-up"
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue tracking-tight">
            {title}
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            {subtitle}
          </p>

          <div className="mt-6 inline-flex items-center gap-3 bg-slate-50 border border-slate-200 px-5 py-2 rounded-full">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <span className="hidden md:block text-xs font-bold text-slate-800">
              {testimonialsInfo.ratingBadge || "5.0 / 5.0"}
            </span>
            <span className="text-slate-400 text-xs">|</span>
            <span className="text-xs text-slate-600 font-medium">
              {rankText}
            </span>
          </div>
        </ScrollReveal>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {list.map((rev, idx) => (
            <ScrollReveal
              key={rev.id}
              animation="fade-up"
              delay={idx * 150}
              className="bg-slate-50 hover:bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 hover:border-brand-gold/40 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400">{rev.date}</span>
                </div>

                <div className="relative mb-4">
                  <Quote className="w-8 h-8 text-brand-gold/20 absolute -top-3 -left-3 pointer-events-none" />
                  <p className="text-sm text-slate-700 leading-relaxed italic relative z-10">
                    "{isNepali && rev.quote_np ? rev.quote_np : rev.quote}"
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    loading="lazy"
                    decoding="async"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-brand-gold shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-[11px] sm:text-sm font-bold text-slate-800 flex items-center gap-1">
                      <span className="truncate">{rev.name}</span>
                      <CheckCircle2
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 shrink-0"
                        title="Verified Traveler"
                      />
                    </h4>
                    <span className="text-[10px] sm:text-xs text-slate-500 block truncate">
                      {isNepali && rev.country_np ? rev.country_np : rev.country}
                    </span>
                  </div>
                </div>

                <div className="sm:text-right shrink-0 pl-10 sm:pl-0">
                  <span className="text-[9px] sm:text-[11px] font-semibold text-brand-blue bg-blue-50 px-1.5 sm:px-2 py-0.5 rounded inline-block">
                    {isNepali && rev.trip_np ? rev.trip_np : rev.trip}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
