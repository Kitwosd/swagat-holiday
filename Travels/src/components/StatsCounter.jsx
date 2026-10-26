import React, { useState, useEffect } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";
import {
  Award,
  Users,
  Mountain,
  ShieldCheck,
  HeartHandshake,
  Compass,
} from "lucide-react";

export default function StatsCounter() {
  const { siteContent } = useData();
  const { t, isNepali } = useLanguage();
  const dynamicStats = siteContent?.company_stats || {};
  const [ref, isVisible] = useScrollReveal({ threshold: 0.3 });
  const [count, setCount] = useState({
    years: 0,
    trekkers: 0,
    success: 0,
    guides: 0,
  });

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 1800; // ms
    const interval = 25;
    const steps = duration / interval;

    const timer = setInterval(() => {
      start++;
      const progress = Math.min(start / steps, 1);
      // Ease out quartic
      const ease = 1 - Math.pow(1 - progress, 4);

      setCount({
        years: Math.floor(
          ease * (parseFloat(dynamicStats.experienceYears) || 18),
        ),
        trekkers: Math.floor(
          ease * (parseFloat(dynamicStats.trekkersGuided) || 12500),
        ),
        success: parseFloat(
          (ease * (parseFloat(dynamicStats.successRate) || 99.4)).toFixed(
            1,
          ),
        ),
        guides: Math.floor(ease * 45),
      });

      if (progress >= 1) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible, dynamicStats]);

  const stats = [
    {
      icon: <Award className="w-8 h-8 text-brand-gold" />,
      value: isNepali && dynamicStats.experienceYears_np ? dynamicStats.experienceYears_np : `${count.years}+`,
      label: t("stats.experienceYears"),
      description: isNepali ? "सन् २०११ देखि हिमालयन पदयात्रा सेवा" : "Pioneering expeditions since 2011",
    },
    {
      icon: <Users className="w-8 h-8 text-emerald-600" />,
      value: isNepali && dynamicStats.trekkersGuided_np ? dynamicStats.trekkersGuided_np : `${count.trekkers.toLocaleString()}+`,
      label: t("stats.trekkersGuided"),
      description: isNepali ? "४८ भन्दा बढी देशका यात्रुहरूलाई सुरक्षित मार्गदर्शन" : "Travelers from over 48 nations guided safely",
    },
    {
      icon: <Mountain className="w-8 h-8 text-brand-blue" />,
      value: isNepali && dynamicStats.successRate_np ? dynamicStats.successRate_np : `${count.success}%`,
      label: t("stats.successRate"),
      description: isNepali ? "उच्च स्तरको उचाइ अनुकूलन र सुरक्षा मापदण्ड" : "Unmatched acclimatization safety protocols",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-amber-600" />,
      value: isNepali ? "४५+" : `${count.guides}+`,
      label: isNepali ? "प्रमाणित शेर्पा गाइडहरू" : "Certified Sherpa Guides",
      description: isNepali ? "सरकारी लाइसेन्स तथा प्राथमिक उपचार प्रमाणित" : "Govt. licensed & wilderness first-aid certified",
    },
  ];

  return (
    <div
      ref={ref}
      className="relative -mt-8 sm:-mt-12 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-4 transition-all duration-700 pt-4 sm:pt-0 ${
                idx !== 0 ? "sm:pl-6" : ""
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 shadow-sm shrink-0">
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-brand-blue tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-slate-800 mt-0.5">
                  {stat.label}
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
