import React from "react";
import { ScrollReveal } from "../hooks/useScrollReveal";
import { useLanguage } from "../context/LanguageContext";
import { Phone, Calendar, ArrowRight, ShieldCheck, Heart } from "lucide-react";

export default function CtaBanner({ onOpenPlanTrip }) {
  const { t, isNepali } = useLanguage();

  return (
    <section className="py-20 bg-brand-blue relative overflow-hidden text-white">
      {/* Background Graphic Accents */}
      <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -top-20 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <ScrollReveal animation="fade-up">
          <span className="text-brand-gold font-bold text-xs uppercase tracking-widest block mb-3">
            {isNepali ? "तपाईंको सपनाको यात्रा पर्खिरहेको छ" : "Your Dream Travel Awaits"}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            {isNepali ? "जीवनकै अविस्मरणीय साहसिक यात्राको लागि तयार हुनुहुन्छ?" : "Ready for the Adventure of a Lifetime?"}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-2xl mx-auto font-light leading-relaxed">
            {isNepali
              ? "हाम्रा स्थानीय नेपाली यात्रा विज्ञहरूलाई तपाईंको समय, गति र रुचि अनुसार सुरक्षित र मनमोहक यात्रा तय गर्न दिनुहोस्।"
              : "Let our local Nepali travel architects tailor a safe, breathtaking journey matched to your vision, pace, and schedule."}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenPlanTrip}
              className="bg-brand-gold hover:bg-brand-gold-dark text-white font-bold text-sm px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{t("planYourTrip")}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <a
              href="https://wa.me/9779851000000"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-6 py-4 rounded-full border border-white/25 transition flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-brand-green" />
              <span>{t("sections.askWhatsApp")}</span>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {isNepali ? "कुनै अतिरिक्त बुकिङ शुल्क छैन" : "Zero booking fees"}
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {isNepali ? "१००% स्थानीय गाइड समर्थन" : "100% Local Guide Support"}
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {isNepali ? "२४/७ काठमाडौं उद्धार डेस्क" : "24/7 Kathmandu SOS Desk"}
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
