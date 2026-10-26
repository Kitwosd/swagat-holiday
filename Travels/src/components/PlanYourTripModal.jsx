import React, { useState } from "react";
import { api } from "../services/api";
import { useData } from "../context/DataContext";
import {
  X,
  Calendar,
  Users,
  MapPin,
  Check,
  Shield,
  Sparkles,
} from "lucide-react";

export default function PlanYourTripModal({ isOpen, onClose }) {
  const { destinations } = useData();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "Everest Region",
    duration: "10-14 Days",
    travelers: "2",
    date: "",
    style: "Standard Lodge Trek",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      await api.createInquiry({
        type: "custom_plan",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        tripTitle: `${formData.destination} (${formData.style})`,
        travelDate: formData.date,
        travelers: parseInt(formData.travelers) || 2,
        duration: formData.duration,
        message: `Plan Trip Modal Request:
Style: ${formData.style}
Notes: ${formData.notes || "N/A"}`,
      });
    } catch (err) {
      console.warn("Modal inquiry submit notice:", err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full my-auto shadow-2xl overflow-hidden border border-slate-200 animate-scale relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="p-8 sm:p-12 text-center bg-emerald-50/50">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">
              Custom Trip Request Received!
            </h3>
            <p className="mt-3 text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Namaste {formData.name || "Traveler"}! Our senior expedition
              designer is reviewing your dates for{" "}
              <strong>{formData.destination}</strong>. We will send you a
              personalized day-by-day plan and quote within 4 hours.
            </p>
            <div className="mt-8">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs px-6 py-3 rounded-xl transition cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-2xl font-extrabold text-brand-blue mt-1">
                Plan Your Dream Trip to Nepal
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Tell us your schedule, fitness preferences, and must-see sights.
                We will craft a bespoke itinerary tailored to you with
                guaranteed local prices.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Henderson"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
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
                  placeholder="alex@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
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
                  placeholder="+1 555 0192"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Travel Month / Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Preferred Region
                </label>
                <select
                  value={formData.destination}
                  onChange={(e) =>
                    setFormData({ ...formData, destination: e.target.value })
                  }
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-blue bg-white cursor-pointer"
                >
                  {destinations && destinations.length > 0 ? (
                    destinations.map((d) => (
                      <option key={d.id || d.slug} value={d.name}>
                        {d.name} {d.title ? `(${d.title})` : ""}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="Everest Region">
                        Everest Region (Khumbu)
                      </option>
                      <option value="Annapurna Region">
                        Annapurna Region & Circuit
                      </option>
                      <option value="Manaslu & Tsum">
                        Manaslu Circuit & Tsum Valley
                      </option>
                      <option value="Langtang & Gosainkunda">
                        Langtang & Sacred Lakes
                      </option>
                      <option value="Upper Mustang">
                        Upper Mustang (Lo Manthang)
                      </option>
                      <option value="Jungle & Culture">
                        Chitwan Safari & Kathmandu
                      </option>
                    </>
                  )}
                  <option value="Not Sure / Guide Me">
                    Not Sure — Recommend to Me
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Number of Trekkers
                </label>
                <select
                  value={formData.travelers}
                  onChange={(e) =>
                    setFormData({ ...formData, travelers: e.target.value })
                  }
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-blue bg-white cursor-pointer"
                >
                  <option value="Solo (1 Traveler)">Solo (1 Traveler)</option>
                  <option value="2 (Couple / Friends)">
                    2 (Couple / Friends)
                  </option>
                  <option value="3-5 (Small Group)">3-5 (Small Group)</option>
                  <option value="6-10 (Group / Club)">
                    6-10 (Group / Club)
                  </option>
                  <option value="10+ (Expedition)">10+ (Expedition)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Vision, Fitness & Special Wishes
              </label>
              <textarea
                rows={3}
                placeholder="Tell us about your fitness level, if you want private helicopter transfers, luxury lodge upgrades, or specific pass crossings..."
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-blue"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-brand-gold hover:bg-brand-gold-dark text-white font-bold py-3.5 rounded-xl shadow-lg transition text-xs sm:text-sm cursor-pointer"
              >
                Request Custom Itinerary & Free Quote
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Confidential • No Spam • No obligation to book</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
