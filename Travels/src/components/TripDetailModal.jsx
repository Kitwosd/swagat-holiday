import React, { useState } from "react";
import {
  X,
  Check,
  Clock,
  Mountain,
  Footprints,
  Calendar,
  Users,
  Star,
  Shield,
  ArrowRight,
  Phone,
  Mail,
} from "lucide-react";

import { api } from "../services/api";

export default function TripDetailModal({ trip, onClose, onBookDirect }) {
  const [activeTab, setActiveTab] = useState("itinerary");
  const [activeDay, setActiveDay] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelDate: "",
    travelersCount: "2",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  if (!trip) return null;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    api.createInquiry(formData);
    setFormData({
      name: "",
      email: "",
      phone: "",
      travelDate: "",
      travelersCount: "2",
      message: "",
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full my-auto max-h-[92vh] overflow-hidden shadow-2xl flex flex-col relative animate-scale">
        {/* Top Header Bar */}
        <div className="relative bg-slate-900 text-white p-6 shrink-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 scale-105"
            style={{ backgroundImage: `url(${trip.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-dark via-brand-blue-dark/90 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition cursor-pointer z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-brand-gold text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                {trip.region}
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full">
                {trip.difficulty}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight">
              {trip.title}
            </h2>

            {/* Quick Specs Ticker */}
            <div className="mt-4 flex flex-wrap gap-4 sm:gap-6 text-xs text-slate-200">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-gold" />
                <span>{trip.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mountain className="w-4 h-4 text-amber-300" />
                <span>Max: {trip.maxAltitude}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>Best: {trip.bestSeason}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-white">{trip.rating}</span>
                <span className="text-slate-300">
                  ({trip.reviewsCount} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 shrink-0 overflow-x-auto text-xs sm:text-sm font-semibold">
          {[
            { id: "itinerary", label: "Day-by-Day Itinerary" },
            { id: "overview", label: "Highlights & Overview" },
            { id: "inclusions", label: "What's Included / Excluded" },
            { id: "book", label: "Inquire & Book Now" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3.5 px-4 border-b-2 transition whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? "border-brand-gold text-brand-blue font-bold bg-white"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-grow space-y-6">
          {/* TAB 1: ITINERARY */}
          {activeTab === "itinerary" && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500 font-medium pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>Detailed Day-by-Day Route Progression</span>
                <span className="text-brand-green font-semibold">
                  Includes Medical Pulse Checks
                </span>
              </div>

              <div className="space-y-3">
                {trip.itinerary.map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 hover:bg-slate-50 transition"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="bg-brand-blue text-white text-xs font-bold px-2 py-0.5 rounded shrink-0">
                        Day {item.day}
                      </span>
                      <h4 className="text-sm font-bold text-slate-800">
                        {item.title}
                      </h4>
                    </div>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 pl-11 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-slate-800 mb-2">
                  Trip Overview
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {trip.overview}
                </p>
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-800 mb-3">
                  Key Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {trip.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100"
                    >
                      <Check className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 leading-relaxed">
                <span className="font-bold block mb-1">
                  Acclimatization & Physical Preparation:
                </span>
                This trek features calculated rest days to guarantee safe
                red-blood-cell altitude adaptation. Prior cardiovascular
                endurance training (jogging, stair climbing, hiking) 4–6 weeks
                prior is recommended.
              </div>
            </div>
          )}

          {/* TAB 3: INCLUSIONS */}
          {activeTab === "inclusions" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-5">
                <h4 className="text-sm font-bold text-emerald-900 mb-4 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700" />
                  What is Included
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-700">
                  {trip.included.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-rose-50/60 border border-rose-200 rounded-xl p-5">
                <h4 className="text-sm font-bold text-rose-900 mb-4 flex items-center gap-2">
                  <X className="w-4 h-4 text-rose-700" />
                  What is Excluded
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-700">
                  {trip.excluded.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: BOOKING / INQUIRY */}
          {activeTab === "book" && (
            <div>
              {submitted ? (
                <div className="text-center py-10 bg-emerald-50 rounded-2xl border border-emerald-200 p-8">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-emerald-900">
                    Inquiry Received with Swagat!
                  </h3>
                  <p className="text-sm text-emerald-800 mt-2 max-w-md mx-auto">
                    Thank you, {formData.name || "Traveler"}! Our senior travel
                    Expedition manager will review your dates and email you a
                    customized itinerary with exact quotes within 4 hours.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 px-6 py-2.5 bg-brand-blue text-white rounded-xl text-xs font-bold hover:bg-brand-blue-dark transition cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-500 block">
                        Selected Package
                      </span>
                      <span className="text-sm font-bold text-brand-blue">
                        {trip.title}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-500 block">
                        Rate per trekker
                      </span>
                      <span className="text-lg font-extrabold text-brand-gold">
                        ${trip.salePrice}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. John Doe"
                        className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="john@example.com"
                        className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+1 555 123 4567"
                        className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Estimated Travel Date
                      </label>
                      <input
                        type="date"
                        value={formData.travelDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            travelDate: e.target.value,
                          })
                        }
                        className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-blue"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Special Requirements / Questions
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Number of trekkers, fitness concerns, private tour preference..."
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-blue"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-gold hover:bg-brand-gold-dark text-white font-bold py-3.5 rounded-xl shadow-md transition cursor-pointer text-sm"
                  >
                    Submit Booking Inquiry
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom Actions Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>
              Guaranteed best local rate • No credit card required to inquire
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="text-xs font-semibold text-slate-600 hover:text-slate-800 px-3 py-2 cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => setActiveTab("book")}
              className="bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition cursor-pointer"
            >
              Book / Inquire Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
