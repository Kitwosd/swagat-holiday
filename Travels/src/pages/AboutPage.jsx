import React from 'react';
import { Award, ShieldCheck, HeartHandshake, Smile, CheckCircle2, Star, Users, MapPin, ArrowRight } from 'lucide-react';
import { REVIEWS } from '../data/activitiesData';
import { useData } from '../context/DataContext';

export default function AboutPage({ onOpenPlanTrip }) {
  const { reviews } = useData();
  const list = reviews && reviews.length > 0 ? reviews : REVIEWS;
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* About Hero Banner */}
      <div className="relative py-24 bg-brand-blue-dark text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark via-brand-blue-dark/85 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-wider mb-4 border border-brand-gold/30">
            <Award className="w-3.5 h-3.5" />
            Local Sherpa Heritage & Passion
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            About Swagat & <span className="text-brand-gold">Spade Himalaya</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed">
            Founded by high-altitude Sherpas born in the shadow of Mount Everest, we craft authentic, ethically guided Himalayan adventures with 100% guaranteed departures.
          </p>
        </div>
      </div>

      {/* Company Story & Mission */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs uppercase font-extrabold tracking-wider text-brand-gold block">
              Every Journey Begins With Welcome
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue leading-tight">
              Rooted in the Mountains. Driven by Genuine Hospitality.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              In Sanskrit and Nepali, <span className="text-brand-gold font-bold italic">Swagat</span> means "Welcome from the Heart". For over 15 years, our mission has been to connect global adventurers directly with the authentic spirit of the Himalayas, bypassing foreign middlemen and delivering safe, life-changing journeys.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every trek we operate is led by government-licensed Nepali guides and high-altitude Sherpa leaders who possess generational knowledge of trails, weather patterns, and mountain medicine.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <span className="text-2xl font-extrabold text-brand-blue block">15+ Years</span>
                <span className="text-xs text-slate-500 font-medium">Himalayan Route Leadership</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <span className="text-2xl font-extrabold text-brand-gold block">99.4%</span>
                <span className="text-xs text-slate-500 font-medium">Summit & Pass Success Rate</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
              alt="Himalayan Mountain Guide"
              className="rounded-3xl shadow-xl w-full h-80 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?auto=format&fit=crop&w=600&q=80"
              alt="Sherpa village in Solukhumbu"
              className="rounded-3xl shadow-xl w-full h-80 object-cover mt-8"
            />
          </div>
        </div>

        {/* 4 Pillars Section */}
        <div id="why-us" className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase text-brand-gold tracking-wider block mb-1">
              Core Principles
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-blue">
              Why Travel with Us?
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              Four pillars that guide every expedition we operate across Nepal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <Award className="w-8 h-8 text-brand-gold mb-4" />
              <h4 className="text-lg font-bold text-slate-900">Expert Advisors</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Govt. licensed Nepali guides and Sherpas with Wilderness Medical certifications and decades of trail wisdom.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <ShieldCheck className="w-8 h-8 text-brand-green mb-4" />
              <h4 className="text-lg font-bold text-slate-900">Best Price Guaranteed</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Direct local operator pricing with complete transparency. Save 20% to 40% with zero middleman commissions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <Smile className="w-8 h-8 text-brand-blue mb-4" />
              <h4 className="text-lg font-bold text-slate-900">Great Experience</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Small intimate groups (max 10-12), thoughtful acclimatization profiles, and authentic Sherpa cultural encounters.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <HeartHandshake className="w-8 h-8 text-amber-600 mb-4" />
              <h4 className="text-lg font-bold text-slate-900">Comfortable Trips & Safety</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                24/7 Kathmandu emergency coordination, daily morning/evening oxygen checks, and strict IPPG porter welfare compliance.
              </p>
            </div>
          </div>
        </div>

        {/* Accreditations & Memberships */}
        <div className="bg-brand-blue text-white rounded-3xl p-8 sm:p-10 mb-20">
          <div className="max-w-2xl mb-6">
            <h4 className="text-xl sm:text-2xl font-bold">Government Accreditations & Memberships</h4>
            <p className="text-xs sm:text-sm text-slate-200 mt-1">
              Fully licensed, bonded, and audited operator under the Ministry of Culture, Tourism and Civil Aviation, Nepal.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold text-center">
            <div className="bg-white/10 p-4 rounded-xl border border-white/10">Nepal Tourism Board (NTB)</div>
            <div className="bg-white/10 p-4 rounded-xl border border-white/10">Trekking Agencies' Association (TAAN)</div>
            <div className="bg-white/10 p-4 rounded-xl border border-white/10">Nepal Mountaineering Assoc. (NMA)</div>
            <div className="bg-white/10 p-4 rounded-xl border border-white/10">Kathmandu Porter Welfare (KEEP)</div>
          </div>
        </div>

        {/* Traveler Reviews */}
        <div id="reviews" className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase text-brand-gold tracking-wider block mb-1">
              Testimonials
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-blue">
              What Travelers Say About Us
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {list.map((review) => (
              <div
                key={review.id}
                className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    "{review.quote}"
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">{review.name}</h5>
                    <span className="text-xs text-slate-500">{review.country} • {review.trip}</span>
                  </div>
                  <span className="text-[11px] text-slate-400">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
