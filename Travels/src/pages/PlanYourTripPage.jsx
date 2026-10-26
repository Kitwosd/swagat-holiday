import React, { useState } from "react";
import { api } from "../services/api";
import {
  Calendar,
  Compass,
  Mountain,
  Users,
  DollarSign,
  Send,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { ScrollReveal } from "../hooks/useScrollReveal";
import { useData } from "../context/DataContext";

export default function PlanYourTripPage() {
  const { destinations } = useData();
  debugger;
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: "Everest Region",
    style: "Trek with Tea House Lodges",
    duration: "10–14 Days",
    travelers: "2 Travelers",
    travelMonth: "Autumn (Sep – Nov 2026)",
    budget: "Standard ($1,000 – $1,500/person)",
    accommodation: "Deluxe Teahouses & 3-Star Hotels",
    fullName: "",
    email: "",
    phone: "",
    country: "",
    specialRequests: "",
  });
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCompleted(true);
    try {
      await api.createInquiry({
        type: "custom_plan",
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        tripTitle: `${formData.destination} (${formData.style})`,
        duration: formData.duration,
        budget: formData.budget,
        message: `Plan Your Trip Submission:
Style: ${formData.style}
Accommodation: ${formData.accommodation}
Travel Month: ${formData.travelMonth}
Travelers: ${formData.travelers}
Special Requests: ${formData.specialRequests || "None"}`,
      });
    } catch (err) {
      console.warn("Custom trip inquiry submit notice:", err.message);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Banner */}
      <div className="relative py-20 bg-brand-blue-dark text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark via-brand-blue-dark/85 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Plan Your Custom{" "}
            <span className="text-brand-gold">Himalayan Trip</span>
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed">
            Customize every detail of your trek or tour with our senior Sherpa
            route planners. Zero booking fees, 100% personalized.
          </p>
        </div>
      </div>

      {/* Interactive Builder */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl">
          {isCompleted ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-blue">
                Your Custom Journey Request is Submitted!
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong>. Our head Sherpa
                guide will craft a bespoke day-by-day itinerary with exact cost
                breakdown and email it to <strong>{formData.email}</strong>{" "}
                within 12 hours.
              </p>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-left text-xs text-slate-700 space-y-2 mt-6">
                <div>
                  <strong>Destination:</strong> {formData.destination}
                </div>
                <div>
                  <strong>Trip Style:</strong> {formData.style}
                </div>
                <div>
                  <strong>Duration:</strong> {formData.duration} (
                  {formData.travelers})
                </div>
                <div>
                  <strong>Timing:</strong> {formData.travelMonth}
                </div>
              </div>
              <button
                onClick={() => {
                  setIsCompleted(false);
                  setStep(1);
                }}
                className="mt-6 px-6 py-2.5 bg-brand-gold text-white font-bold text-xs rounded-xl shadow"
              >
                Build Another Itinerary
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Step 1: Destination & Style */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-brand-blue mb-1">
                    Step 1: Choose Your Preferred Region & Style
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Select the primary region you wish to explore in Nepal.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {(destinations && destinations.length > 0
                      ? destinations.map((d) => d.name)
                      : [
                          "Everest Region",
                          "Annapurna Region",
                          "Langtang Valley",
                          "Manaslu Circuit",
                          "Upper Mustang",
                          "Chitwan Wildlife",
                        ]
                    ).map((dest) => (
                      <button
                        type="button"
                        key={dest}
                        onClick={() =>
                          setFormData({ ...formData, destination: dest })
                        }
                        className={`p-3.5 rounded-xl border text-xs font-bold text-left transition cursor-pointer ${
                          formData.destination === dest
                            ? "bg-brand-blue text-white border-brand-blue shadow-md"
                            : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        {dest}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Trip Style */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Trip Style / Travel Pace
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "Trek with Tea House Lodges",
                      "Luxury Helicopter & Scenic Flights",
                      "Cultural Sightseeing & Heritage",
                      "Wildlife Safari & Nature Trails",
                    ].map((style) => (
                      <button
                        type="button"
                        key={style}
                        onClick={() => setFormData({ ...formData, style })}
                        className={`p-3.5 rounded-xl border text-xs font-semibold text-left transition cursor-pointer ${
                          formData.style === style
                            ? "bg-brand-gold text-white border-brand-gold shadow-md font-bold"
                            : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Duration & Travelers */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Ideal Duration
                    </label>
                    <select
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white text-slate-700"
                    >
                      <option value="1–5 Days">1 – 5 Days (Short Break)</option>
                      <option value="6–9 Days">
                        6 – 9 Days (Poon Hill / Mardi)
                      </option>
                      <option value="10–14 Days">
                        10 – 14 Days (EBC / Annapurna)
                      </option>
                      <option value="15–20 Days">
                        15 – 20 Days (Three Passes / Manaslu)
                      </option>
                      <option value="21+ Days">
                        21+ Days (Remote Odyssey)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Group Size
                    </label>
                    <select
                      value={formData.travelers}
                      onChange={(e) =>
                        setFormData({ ...formData, travelers: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white text-slate-700"
                    >
                      <option value="Solo Traveler">
                        Solo Traveler (1 Person)
                      </option>
                      <option value="2 Travelers">
                        2 Travelers (Couple / Friends)
                      </option>
                      <option value="3–5 Travelers">
                        3 – 5 Travelers (Small Group)
                      </option>
                      <option value="6–10 Travelers">6 – 10 Travelers</option>
                      <option value="10+ Travelers">
                        10+ Travelers (Private Group)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Target Travel Window
                    </label>
                    <select
                      value={formData.travelMonth}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          travelMonth: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white text-slate-700"
                    >
                      <option value="Autumn (Sep – Nov 2026)">
                        Autumn (Sep – Nov 2026)
                      </option>
                      <option value="Spring (Mar – May 2027)">
                        Spring (Mar – May 2027)
                      </option>
                      <option value="Winter (Dec 2026 – Feb 2027)">
                        Winter (Dec 2026 – Feb 2027)
                      </option>
                      <option value="Summer / Monsoon 2026">
                        Summer / Monsoon 2026
                      </option>
                    </select>
                  </div>
                </div>

                {/* Step 4: Contact Details */}
                <div className="pt-6 border-t border-slate-200 space-y-4">
                  <h3 className="text-xl font-bold text-brand-blue mb-1">
                    Step 2: Where Should We Send Your Itinerary Proposal?
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        placeholder="e.g. Dr. Sarah Jenkins"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="sarah@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        WhatsApp / Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+44 7700 900000"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Nationality / Country
                      </label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) =>
                          setFormData({ ...formData, country: e.target.value })
                        }
                        placeholder="United Kingdom"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Notes, Fitness Level, or Special Requests
                    </label>
                    <textarea
                      rows={3}
                      value={formData.specialRequests}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specialRequests: e.target.value,
                        })
                      }
                      placeholder="e.g. We want a private bathroom wherever possible, vegan meal options, and extra acclimatization day..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-white font-extrabold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Generate & Send My Tailored Itinerary</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
