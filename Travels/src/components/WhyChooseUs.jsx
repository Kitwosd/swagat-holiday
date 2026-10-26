import React from "react";
import { ScrollReveal } from "../hooks/useScrollReveal";
import { useLanguage } from "../context/LanguageContext";
import {
  ShieldCheck,
  BadgeDollarSign,
  Award,
  Smile,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function WhyChooseUs({ onOpenPlanTrip }) {
  const { t, isNepali } = useLanguage();

  const whyUsItems = [
    {
      id: 1,
      title: isNepali ? "दक्ष तथा अनुभवी सल्लाहकार" : "Expert Advisors",
      desc: isNepali
        ? "व्यावसायिक र अनुभवी शेर्पा गाइडहरू जसले तपाईंलाई यात्राका लागि उत्कृष्ट सल्लाह दिन्छन्।"
        : "Professional Expert Guides that give you best advice for your trips.",
      icon: <Award className="w-6 h-6 text-brand-gold" />,
      badgeColor: "bg-brand-gold/10 text-brand-gold-dark border-brand-gold/25",
      pill: isNepali ? "सरकारी लाइसेन्स प्राप्त शेर्पाहरू" : "Govt. Licensed Sherpas",
    },
    {
      id: 2,
      title: isNepali ? "उत्कृष्ट मूल्यको ग्यारेन्टी" : "Best Price Guaranteed",
      desc: isNepali
        ? "प्रतिस्पर्धी मूल्य जसले गुणस्तरमा कुनै सम्झौता नगरी तपाईंको यात्राको पूर्ण मूल्य सुनिश्चित गर्दछ।"
        : "Competitive prices that ensure you get the best value for your travel experience without compromising on quality.",
      icon: <BadgeDollarSign className="w-6 h-6 text-brand-green" />,
      badgeColor:
        "bg-brand-green/10 text-brand-green-dark border-brand-green/25",
      pill: isNepali ? "कुनै बिचौलिया शुल्क छैन" : "Zero Middleman Fees",
    },
    {
      id: 3,
      title: isNepali ? "अविस्मरणीय अनुभव" : "Great Experience",
      desc: isNepali
        ? "जीवनभर याद रहने यात्रा अनुभवहरू, जुन सुरुदेखि अन्त्यसम्म आनन्ददायी बनाउन डिजाइन गरिएको छ।"
        : "Memorable travel experiences designed to create lasting moments and make every journey enjoyable from start to finish.",
      icon: <Smile className="w-6 h-6 text-brand-blue" />,
      badgeColor: "bg-brand-blue/10 text-brand-blue border-brand-blue/20",
      pill: isNepali ? "९९.४% शिखर सफलता" : "99.4% Summit Success",
    },
    {
      id: 4,
      title: isNepali ? "आरामदायी र सुरक्षित यात्रा" : "Comfortable Trips",
      desc: isNepali
        ? "राम्रोसँग योजना गरिएका आरामदायी यात्राहरू जसले तपाईंलाई मानसिक शान्ति र सहजताका साथ यात्रा गर्न दिन्छ।"
        : "Well-planned and comfortable journeys that let you travel with ease, convenience, and peace of mind throughout your trip.",
      icon: <HeartHandshake className="w-6 h-6 text-amber-600" />,
      badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
      pill: isNepali ? "२४/७ काठमाडौं उद्धार डेस्क" : "24/7 Kathmandu SOS Desk",
    },
  ];

  return (
    <section
      id="why-us"
      className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden"
    >
      {/* Decorative ambient background accents using index.css palette */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-brand-gold-light rounded-full blur-3xl pointer-events-none opacity-60" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-brand-green-light rounded-full blur-3xl pointer-events-none opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-stretch">
          {/* Column with 2 Rectangular Images spanning the whole div of "Why Choose Us" */}
          {/* Framed with the color palettes from index.css (brand-blue, brand-gold, brand-green) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <ScrollReveal animation="fade-right" className="h-full">
              <div className="relative h-full min-h-[500px] sm:min-h-[560px] rounded-3xl p-3 sm:p-4 bg-gradient-to-br from-brand-blue via-brand-blue-dark to-slate-900 shadow-2xl border-2 border-brand-gold/40 flex flex-col justify-between overflow-hidden">
                {/* Background decorative corner glowing panels */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/20 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-green/20 rounded-full blur-2xl pointer-events-none" />

                {/* Two Rectangular Images side-by-side spanning the height of the div */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 h-full relative z-10">
                  {/* Rectangular Image 1: High Mountain Expedition / Culture */}
                  <div className="relative rounded-2xl overflow-hidden shadow-lg border border-white/20 group h-full flex flex-col justify-between">
                    <img
                      src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"
                      alt="Mount Everest and Himalayan panoramic peaks"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/90 via-black/25 to-transparent" />

                    {/* Top Palette Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 bg-brand-gold text-white text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow-md tracking-wider">
                        Sherpa Heritage
                      </span>
                    </div>

                    {/* Bottom Label */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-xs font-bold text-amber-200">
                        High Altitude Mastery
                      </div>
                      <div className="text-[11px] text-slate-200 line-clamp-2">
                        Decades of leading successful Himalayan ascents safely.
                      </div>
                    </div>
                  </div>

                  {/* Rectangular Image 2: Trekker with guide on suspension bridge */}
                  <div className="relative rounded-2xl overflow-hidden shadow-lg border border-white/20 group h-full flex flex-col justify-between mt-6 sm:mt-8">
                    <img
                      src="https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?auto=format&fit=crop&w=800&q=80"
                      alt="Trekkers crossing Himalayan suspension bridge"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/90 via-black/25 to-transparent" />

                    {/* Top Palette Badge in brand-green */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 bg-brand-green text-white text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow-md tracking-wider">
                        100% Guaranteed
                      </span>
                    </div>

                    {/* Bottom Label */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-xs font-bold text-emerald-300">
                        Porter Welfare Certified
                      </div>
                      <div className="text-[11px] text-slate-200 line-clamp-2">
                        Fair ethical wages, insurance & warm mountain gear.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Bottom Card spanning both images */}
                <div className="relative z-10 mt-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-brand-gold/30 shadow-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-gold/15 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-6 h-6 text-brand-gold-dark" />
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-brand-blue uppercase tracking-wider">
                        Direct Local Operator
                      </div>
                      <div className="text-xs text-slate-600 font-medium">
                        Nepal Tourism Board & TAAN Registered #1948
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:block text-right">
                    <span className="text-xs font-bold text-brand-green block">
                      99.4%
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">
                      Summit Rate
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: 4 Elements with Why Choose Us and its Super Short Header */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <ScrollReveal animation="fade-left">
              {/* Super Short Header */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold-dark text-xs font-extrabold uppercase tracking-wider mb-2.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                  {isNepali ? "हामीलाई किन रोज्ने?" : "Why Choose Us"}
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue tracking-tight">
                  {isNepali ? "स्वागत होलिडेजको विशेषता" : "The Swagat Advantage"}
                </h2>
                <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
                  {isNepali
                    ? "हामी गहिरो शेर्पा अनुभव र अन्तर्राष्ट्रिय सुरक्षा मापदण्डहरू संयोजन गरेर अविस्मरणीय हिमालयन यात्रा प्रदान गर्दछौं।"
                    : "We combine deep-rooted local Sherpa wisdom with international mountain safety protocols to deliver unforgettable Himalayan journeys."}
                </p>
              </div>

              {/* 4 Elements with Super Short Headers */}
              <div className="space-y-4">
                {whyUsItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-brand-gold/50 shadow-sm hover:shadow-md transition-all duration-300 group flex items-start gap-4"
                  >
                    {/* Icon container */}
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-brand-blue transition">
                          {item.shortHeader}
                        </h3>
                        <span
                          className={`hidden md:block text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${item.badgeColor} shrink-0`}
                        >
                          {item.pill}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Quick Action */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  to="/about"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md transition cursor-pointer"
                >
                  <span>Learn More About Our Team</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={onOpenPlanTrip}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md transition cursor-pointer"
                >
                  <span>Customize Your Trip</span>
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
