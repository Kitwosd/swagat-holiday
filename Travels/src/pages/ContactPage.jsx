import React, { useState } from 'react';
import { api } from '../services/api';
import { useData } from '../context/DataContext';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2, ShieldCheck, Compass, Map as MapIcon } from 'lucide-react';
import { ScrollReveal } from '../hooks/useScrollReveal';

export default function ContactPage() {
  const { siteContent } = useData();
  const contact = siteContent?.contact_info || {
    phone: '+977-1-4700000',
    mobile: '+977-9851000000',
    email: 'hello@swagattravels.com',
    address: 'Amrit Marg, Thamel, Kathmandu 44600, Nepal',
    whatsapp: '+9779851000000',
    googleMapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.240403164478!2d85.30904037546738!3d27.70986277617997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fcb1555555%3A0x6b13b63b21625d97!2sThamel%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp',
    workingHours: 'Sunday – Friday: 08:30 AM – 06:30 PM (NPT)',
    emergencySupport: '24/7 On-Tour & Mountain SOS Support',
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    destination: 'Everest Region',
    travelMonth: 'Autumn 2026',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      await api.createInquiry({
        type: 'contact',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        tripTitle: formData.destination,
        travelDate: formData.travelMonth,
        message: formData.message,
      });
    } catch (err) {
      console.warn('Contact inquiry save notice:', err.message);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Contact Hero Banner */}
      <div className="relative py-24 bg-brand-blue-dark text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark via-brand-blue-dark/85 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-wider mb-4 border border-brand-gold/30">
            <MessageSquare className="w-3.5 h-3.5" />
            24/7 Local Kathmandu Support
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Contact Our <span className="text-brand-gold">Himalayan Guides</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed">
            Have questions about route difficulty, permit clearance, acclimatization schedules, or private bookings? Talk directly with our local team in Kathmandu.
          </p>
        </div>
      </div>

      {/* Main Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Office Details & WhatsApp */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-brand-blue">
                Kathmandu Operations Headquarters
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Office Location</strong>
                    <span>{contact.address || 'Amrit Marg, Thamel, Post Box: 44600, Kathmandu, Nepal'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Direct / WhatsApp (24/7)</strong>
                    <a href={`tel:${contact.whatsapp || contact.mobile || contact.phone || '+9779851000000'}`} className="text-brand-blue hover:underline font-semibold block">
                      {contact.whatsapp || contact.mobile || contact.phone || '+977 985-1000000'}
                    </a>
                    <span className="text-xs text-slate-400">{contact.emergencySupport || 'Emergency Mountain SOS Hotline'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Official Inquiry Email</strong>
                    <a href={`mailto:${contact.email || 'hello@swagattravels.com'}`} className="text-brand-blue hover:underline font-semibold block">
                      {contact.email || 'hello@swagattravels.com'}
                    </a>
                    <span className="text-xs text-slate-400">Guaranteed response within 6 hours</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Office Working Hours</strong>
                    <span>{contact.workingHours || 'Sunday – Friday: 08:30 AM – 06:30 PM (NPT)'}</span>
                    <span className="text-emerald-600 block font-semibold text-xs mt-0.5">{contact.emergencySupport || '24/7 On-Trek Emergency Support'}</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Action Button */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${(contact.whatsapp || contact.mobile || '+9779851000000').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-md transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>

            {/* Quick Guarantees Box */}
            <div className="bg-brand-blue text-white rounded-3xl p-6 sm:p-7 shadow-lg space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-gold block">
                Travel With Peace of Mind
              </span>
              <h4 className="text-lg font-bold">100% Guaranteed Departures</h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                Once your deposit is confirmed, your journey will run as scheduled. No minimum group size cancellation risks.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Contact & Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-extrabold text-brand-blue">
                Send Us a Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-6">
                Tell us about your dream adventure and our destination specialists will prepare a customized proposal.
              </p>

              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-bold text-emerald-900">Message Received! Namaste!</h4>
                  <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto">
                    Thank you, <strong>{formData.name}</strong>. Our senior guide Pemba will review your message and reply to <strong>{formData.email}</strong> within a few hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-5 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Marcus Lindqvist"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        WhatsApp / Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Your Country / Nationality
                      </label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="e.g. United Kingdom"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Destination of Interest
                      </label>
                      <select
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white text-slate-700"
                      >
                        <option value="Everest Region">Everest Base Camp & Khumbu</option>
                        <option value="Annapurna Region">Annapurna Circuit & Sanctuary</option>
                        <option value="Langtang Region">Langtang & Gosainkunda</option>
                        <option value="Manaslu Region">Manaslu Circuit & Tsum Valley</option>
                        <option value="Mustang & Dolpo">Mustang & Remote Kingdoms</option>
                        <option value="Chitwan Safari">Chitwan Wildlife & Day Tours</option>
                        <option value="Helicopter Tours">Helicopter Tours & Scenic Flights</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Preferred Travel Month
                      </label>
                      <select
                        value={formData.travelMonth}
                        onChange={(e) => setFormData({ ...formData, travelMonth: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white text-slate-700"
                      >
                        <option value="Autumn 2026">Autumn 2026 (Sep – Nov)</option>
                        <option value="Spring 2027">Spring 2027 (Mar – May)</option>
                        <option value="Winter 2026">Winter 2026 (Dec – Feb)</option>
                        <option value="Monsoon 2026">Summer / Rain-shadow 2026</option>
                        <option value="Flexible">I am flexible with dates</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Message / Custom Requests
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your group size, trekking experience, specific dates, or any custom requirements..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry to Local Guides</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Interactive Google Map Location */}
        {contact.googleMapUrl && (
          <div className="mt-14 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-gold mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Kathmandu Head Office Location</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-brand-blue">
                  Visit Us in Thamel, Kathmandu
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {contact.address || 'Amrit Marg, Thamel, Post Box: 44600, Kathmandu, Nepal'}
                </p>
              </div>

              <a
                href={
                  contact.googleMapUrl.includes("http")
                    ? contact.googleMapUrl
                    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        contact.address || "Thamel, Kathmandu, Nepal"
                      )}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition self-start sm:self-auto"
              >
                <Compass className="w-4 h-4 text-brand-blue" />
                <span>Open in Google Maps</span>
              </a>
            </div>

            <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative bg-slate-100">
              <iframe
                title="Google Maps Location - Swagat Holidays & Travels"
                src={contact.googleMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
