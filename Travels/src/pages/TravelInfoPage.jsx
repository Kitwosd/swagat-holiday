import React, { useState } from 'react';
import { Compass, FileText, Calendar, ShieldCheck, HeartPulse, Backpack, DollarSign, CheckCircle2 } from 'lucide-react';

export default function TravelInfoPage({ onOpenPlanTrip }) {
  const [activeTab, setActiveTab] = useState('visa');

  const tabs = [
    { id: 'visa', label: 'Nepal Visa on Arrival', icon: <FileText className="w-4 h-4" /> },
    { id: 'best-time', label: 'Best Time to Trek', icon: <Calendar className="w-4 h-4" /> },
    { id: 'permits', label: 'Trekking Permits & Rules', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'altitude', label: 'Altitude Sickness & Safety', icon: <HeartPulse className="w-4 h-4" /> },
    { id: 'packing', label: 'Packing List & Gear Guide', icon: <Backpack className="w-4 h-4" /> },
    { id: 'costs', label: 'Trekking Costs & Budget', icon: <DollarSign className="w-4 h-4" /> }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Travel Info Hero */}
      <div className="relative py-24 bg-brand-blue-dark text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark via-brand-blue-dark/85 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-wider mb-4 border border-brand-gold/30">
            <Compass className="w-3.5 h-3.5" />
            Himalayan Travel Resource Center
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Nepal Travel Info & <span className="text-brand-gold">Practical Guide</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed">
            Everything you need to know before you fly: visa regulations, best seasons, permits, altitude acclimatization protocols, and packing essentials.
          </p>
        </div>
      </div>

      {/* Main Content with Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-slate-200 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-brand-blue text-white shadow-md'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: Nepal Visa on Arrival */}
        {activeTab === 'visa' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
            <div className="max-w-3xl">
              <span className="text-xs uppercase font-extrabold tracking-wider text-brand-gold block mb-1">
                Entry Requirements
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-blue">
                Nepal Tourist Visa on Arrival & Online Application
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
                Nepal offers a hassle-free Visa on Arrival for almost all international travelers arriving at Tribhuvan International Airport (KTM) in Kathmandu or land borders.
              </p>
            </div>

            {/* Visa Fees Table */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-xs font-bold uppercase text-slate-500 block mb-1">15 Days Tourist Visa</span>
                <span className="text-3xl font-extrabold text-brand-blue">$30 USD</span>
                <p className="text-xs text-slate-500 mt-2">Ideal for short treks, day tours, and city excursions.</p>
              </div>
              <div className="p-6 rounded-2xl bg-brand-gold/10 border border-brand-gold/30 text-center">
                <span className="text-xs font-bold uppercase text-brand-gold-dark block mb-1">30 Days Tourist Visa</span>
                <span className="text-3xl font-extrabold text-brand-gold-dark">$50 USD</span>
                <p className="text-xs text-slate-600 mt-2">Recommended for Everest Base Camp, Annapurna Circuit & Manaslu.</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-xs font-bold uppercase text-slate-500 block mb-1">90 Days Tourist Visa</span>
                <span className="text-3xl font-extrabold text-brand-blue">$125 USD</span>
                <p className="text-xs text-slate-500 mt-2">For multi-circuit expeditions and mountaineering summits.</p>
              </div>
            </div>

            {/* Steps & Checklist */}
            <div className="border-t border-slate-100 pt-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Required Documents for Visa:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                  <span>Passport with at least 6 months validity from entry date</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                  <span>At least two blank passport pages for visa stamp</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                  <span>Cash in USD, EUR, GBP, or credit card for visa fee payment</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                  <span>Online pre-arrival form completed within 15 days before flight</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Best Time to Trek */}
        {activeTab === 'best-time' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
            <div className="max-w-3xl">
              <span className="text-xs uppercase font-extrabold tracking-wider text-brand-gold block mb-1">
                Seasonal Weather Guide
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-blue">
                Best Time to Trek in Nepal (Month by Month)
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
                Nepal experiences four distinct trekking seasons. The two prime peak seasons are Autumn (Sep–Nov) and Spring (Mar–May).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-amber-900">Autumn (September – November)</h3>
                  <span className="text-xs bg-amber-200 text-amber-900 px-2.5 py-1 rounded-md font-bold">Peak Season #1</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Crystal-clear post-monsoon blue skies, sharp panoramic visibility of 8,000m peaks, and pleasant daytime temperatures. Nights are crisp and cool. The most popular season for Everest and Annapurna.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-emerald-900">Spring (March – May)</h3>
                  <span className="text-xs bg-emerald-200 text-emerald-900 px-2.5 py-1 rounded-md font-bold">Peak Season #2</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Wild blooming rhododendrons blanket the hillsides in vibrant scarlet and pink. Warmer climbing conditions, lively Everest expedition camps, and longer daylight hours for walking.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-blue-900">Winter (December – February)</h3>
                  <span className="text-xs bg-blue-200 text-blue-900 px-2.5 py-1 rounded-md font-bold">Lower Altitude Treks</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Sunny dry days with zero crowds, though nights above 4,000m drop well below freezing (-15°C). Ideal for Ghorepani Poon Hill, Mardi Himal, Kathmandu Valley, and Chitwan Safari.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-purple-50/60 border border-purple-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-purple-900">Monsoon (June – August)</h3>
                  <span className="text-xs bg-purple-200 text-purple-900 px-2.5 py-1 rounded-md font-bold">Rain-Shadow Treks</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  While most of Nepal sees tropical rains, the trans-Himalayan rain-shadow regions of Upper Mustang and Upper Dolpo remain dry, sunny, and perfect for trekking!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Permits */}
        {activeTab === 'permits' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
            <div className="max-w-3xl">
              <span className="text-xs uppercase font-extrabold tracking-wider text-brand-gold block mb-1">
                Regulations & Permissions
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-blue">
                Nepal Trekking Permits Guide 2026
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
                When you book with us, all compulsory permits, TIMS cards, national park entries, and restricted area government clearances are 100% arranged and included in your package.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-brand-gold shrink-0 mt-1" />
                <div>
                  <h4 className="text-base font-bold text-slate-900">Sagarmatha National Park & Khumbu Entry (Everest)</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Cost: NPR 3,000 + Khumbu Pasang Lhamu Rural Municipality fee (NPR 2,000). Processed directly in Lukla and Monjo.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-brand-green shrink-0 mt-1" />
                <div>
                  <h4 className="text-base font-bold text-slate-900">Annapurna Conservation Area Permit (ACAP)</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Cost: NPR 3,000. Covers Annapurna Circuit, ABC, Mardi Himal, and Poon Hill. Supports conservation and local trails.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-brand-blue shrink-0 mt-1" />
                <div>
                  <h4 className="text-base font-bold text-slate-900">Restricted Area Permits (Manaslu, Mustang, Dolpo)</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Requires minimum of 2 trekkers and a government-licensed Nepali guide. Manaslu: $100/week (Autumn) or $75/week (Spring). Upper Mustang: $500 for first 10 days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Altitude Sickness */}
        {activeTab === 'altitude' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
            <div className="max-w-3xl">
              <span className="text-xs uppercase font-extrabold tracking-wider text-brand-gold block mb-1">
                Health & Safety Protocols
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-blue">
                Altitude Sickness & Acclimatization Rules
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
                Acute Mountain Sickness (AMS) can affect anyone regardless of age or physical fitness. Our itineraries strictly follow scientific acclimatization profiles with a 99.4% success rate.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-brand-blue text-base">Climb High, Sleep Low</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  During scheduled rest days in Namche Bazaar (3,440m) and Dingboche (4,410m), we hike higher during the afternoon and descend to sleep, triggering red blood cell production.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-brand-blue text-base">Daily Oxygen Checks</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Your Sherpa guide takes morning and evening pulse oximeter readings and records your heart rate and blood oxygen saturation to detect early signs of hypoxia.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-brand-blue text-base">Hydration Formula</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Drink 3 to 4 liters of clean water and warm garlic broth daily. Avoid alcohol and tobacco above 3,000m to maintain proper blood viscosity.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Packing List */}
        {activeTab === 'packing' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
            <div className="max-w-3xl">
              <span className="text-xs uppercase font-extrabold tracking-wider text-brand-gold block mb-1">
                Equipment Checklist
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-blue">
                Nepal Trekking Packing List
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
                Pack light! Your porter carries your main 80L duffel bag (max 15 kg / 33 lbs), while you carry only a 25–30L daypack with your water, camera, and rain layer.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-base font-bold text-brand-blue mb-3">Complimentary Gear Provided by Us:</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green" />
                    <span>Heavy-duty -20°C four-season down sleeping bag</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green" />
                    <span>High-loft windproof down jacket with hood</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green" />
                    <span>80L waterproof expedition duffel bag</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green" />
                    <span>Trekking route map & medical first-aid kit</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-base font-bold text-brand-blue mb-3">Items You Should Bring:</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                    <span>Broken-in waterproof hiking boots with ankle support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                    <span>Thermal base layer tops & bottoms (merino wool)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                    <span>Polarized sunglasses (Category 3 or 4 UV protection)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                    <span>Headlamp with spare batteries, power bank & toiletries</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Costs */}
        {activeTab === 'costs' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
            <div className="max-w-3xl">
              <span className="text-xs uppercase font-extrabold tracking-wider text-brand-gold block mb-1">
                Transparency & Value
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-blue">
                How Much Does It Cost to Trek in Nepal?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
                As a direct local operator based in Kathmandu, our all-inclusive packages save you 20% to 40% compared to overseas agencies with zero hidden fees.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-brand-gold uppercase block">Short Treks (4–6 Days)</span>
                <span className="text-2xl font-bold text-brand-blue mt-1 block">$390 – $680</span>
                <p className="text-xs text-slate-500 mt-2">Poon Hill, Mardi Himal, Helambu. Includes guide, porter, meals & private road transport.</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-brand-gold uppercase block">Standard Treks (10–14 Days)</span>
                <span className="text-2xl font-bold text-brand-blue mt-1 block">$950 – $1,350</span>
                <p className="text-xs text-slate-500 mt-2">Everest Base Camp, Annapurna Circuit, Langtang. Includes domestic Lukla flights & permits.</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-brand-gold uppercase block">Remote Expeditions (14–24 Days)</span>
                <span className="text-2xl font-bold text-brand-blue mt-1 block">$1,450 – $2,950</span>
                <p className="text-xs text-slate-500 mt-2">Upper Mustang, Manaslu, Dolpo. Includes expensive special government restricted area permits.</p>
              </div>
            </div>
          </div>
        )}

        {/* Inquire CTA */}
        <div className="mt-14 bg-brand-blue text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Have More Questions About Traveling in Nepal?</h3>
            <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-xl">
              Our Kathmandu travel specialists and head Sherpa guides are available 24/7 on WhatsApp or email to assist your planning.
            </p>
          </div>
          <button
            onClick={onOpenPlanTrip}
            className="px-6 py-3.5 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-white font-bold text-sm shadow-md transition shrink-0"
          >
            Inquire With Our Guides
          </button>
        </div>
      </div>
    </div>
  );
}
