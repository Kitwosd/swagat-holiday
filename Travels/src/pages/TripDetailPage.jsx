import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TRIPS } from '../data/tripsData';
import { useData } from '../context/DataContext';
import { api } from '../services/api';
import { Clock, Mountain, MapPin, Star, ShieldCheck, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';

export default function TripDetailPage({ onOpenPlanTrip, wishlist, onToggleWishlist, onBookTrip }) {
  const { tripId } = useParams();
  const { trips } = useData();
  const allTrips = trips && trips.length > 0 ? trips : TRIPS;

  // Find trip by ID or slug
  const trip = allTrips.find((t) => t.id === tripId || t.slug === tripId) || allTrips[0];
  const [activeDay, setActiveDay] = useState(1);
  const [selectedDate, setSelectedDate] = useState('2026-10-15');
  const [guestCount, setGuestCount] = useState(2);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Related trips
  const relatedTrips = allTrips.filter((t) => t.id !== trip.id && t.region === trip.region).slice(0, 3);

  const handleBooking = async (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    try {
      await api.createInquiry({
        type: 'booking',
        name: 'Traveler (Direct Booking)',
        email: 'traveler@swagatholidays.com',
        tripId: trip.id,
        tripTitle: trip.title,
        travelDate: selectedDate,
        travelers: guestCount,
        budget: `$${(trip.salePrice || trip.regularPrice) * guestCount}`,
        message: `Booking request for ${trip.title} on date ${selectedDate} for ${guestCount} person(s).`,
      });
    } catch (err) {
      console.warn('Booking inquiry save notice:', err.message);
    }
    if (onBookTrip) {
      onBookTrip(trip);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Top Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-brand-blue">Home</Link>
            <span>/</span>
            <Link to="/treks" className="hover:text-brand-blue">Nepal Travels</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold truncate max-w-xs">{trip.title}</span>
          </div>
          <Link to="/treks" className="text-brand-gold hover:underline font-bold flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Travels</span>
          </Link>
        </div>
      </div>

      {/* Hero Banner with Gallery Preview */}
      <div className="relative bg-brand-blue-dark text-white py-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{ backgroundImage: `url(${trip.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark via-brand-blue-dark/85 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-brand-gold text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {trip.badge || 'Best Seller 2026'}
            </span>
            <span className="bg-white/15 backdrop-blur-md text-slate-200 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
              <MapPin className="w-3 h-3 text-brand-gold" />
              {trip.region}
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold px-3 py-1 rounded-full">
              100% Guaranteed Departures
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-4xl">
            {trip.title}
          </h1>

          {/* Quick Metrics Bar */}
          <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-200">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-gold" />
              <span><strong>Duration:</strong> {trip.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mountain className="w-4 h-4 text-brand-gold" />
              <span><strong>Max Altitude:</strong> {trip.maxAltitude}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              <span><strong>Difficulty:</strong> {trip.difficulty}</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-300 font-bold">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{trip.rating}</span>
              <span className="text-slate-300 font-normal">({trip.reviewsCount} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Details & Booking Sidebar Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Details Column (Cols 1-8) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-brand-blue">Trek Overview</h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {trip.overview}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block font-bold">BEST SEASON</span>
                  <span className="font-semibold text-slate-800">{trip.bestSeason}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-bold">GROUP SIZE</span>
                  <span className="font-semibold text-slate-800">{trip.groupSize}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-bold">START / END</span>
                  <span className="font-semibold text-slate-800">{trip.startEnd}</span>
                </div>
              </div>
            </div>

            {/* Highlights Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-brand-blue">Trek Highlights</h2>
              <div className="space-y-2.5">
                {trip.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Day-by-Day Itinerary Accordion */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-brand-blue">Day-by-Day Itinerary</h2>
                <span className="text-xs text-slate-400 font-semibold">{trip.itinerary.length} Days Itinerary</span>
              </div>

              <div className="space-y-3">
                {trip.itinerary.map((dayItem, idx) => {
                  const dayNum = typeof dayItem.day === 'number' ? dayItem.day : idx + 1;
                  const isOpen = activeDay === dayNum;
                  return (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-2xl overflow-hidden transition"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveDay(isOpen ? null : dayNum)}
                        className={`w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold transition cursor-pointer ${
                          isOpen ? 'bg-brand-blue text-white' : 'bg-slate-50 hover:bg-slate-100 text-slate-800'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isOpen ? 'bg-brand-gold text-white' : 'bg-brand-blue text-white'}`}>
                            {dayItem.day}
                          </span>
                          <span>{dayItem.title}</span>
                        </span>
                        <span>{isOpen ? '−' : '+'}</span>
                      </button>

                      {isOpen && (
                        <div className="p-4 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          {dayItem.desc}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Included & Excluded Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inclusions */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-brand-green font-bold text-base mb-1">
                  <CheckCircle2 className="w-5 h-5 text-brand-green" />
                  <h3>What is Included:</h3>
                </div>
                <div className="space-y-2">
                  {trip.included.map((inc, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <span className="text-brand-green font-bold">✓</span>
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exclusions */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-base mb-1">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <h3>What is Excluded:</h3>
                </div>
                <div className="space-y-2">
                  {trip.excluded.map((exc, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="text-red-500 font-bold">✕</span>
                      <span>{exc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking & Inquiry Card (Cols 9-12) */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs text-slate-400 block font-semibold">Special Sale Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-brand-blue">${trip.salePrice}</span>
                    <span className="text-sm text-slate-400 line-through">${trip.regularPrice}</span>
                  </div>
                </div>
                <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-md border border-emerald-200">
                  Save ${trip.regularPrice - trip.salePrice}
                </span>
              </div>

              {bookingSuccess ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-900">Booking Request Sent!</h4>
                  <p className="text-xs text-emerald-700">
                    Our Kathmandu reservation team has held your dates. We will email confirmation and deposit details.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Choose Departure Date
                    </label>
                    <input
                      type="date"
                      required
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Number of Trekkers
                    </label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white"
                    >
                      <option value={1}>1 Trekker (Solo)</option>
                      <option value={2}>2 Trekkers</option>
                      <option value={3}>3 Trekkers</option>
                      <option value={4}>4 Trekkers</option>
                      <option value={6}>6+ Trekkers (Group Discount)</option>
                    </select>
                  </div>

                  <div className="pt-2 pb-1 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>Estimated Total:</span>
                    <span className="text-lg text-brand-gold font-extrabold">${trip.salePrice * guestCount} USD</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-white font-extrabold text-sm shadow-md hover:shadow-lg transition cursor-pointer"
                  >
                    Reserve Now (10% Deposit)
                  </button>

                  <button
                    type="button"
                    onClick={onOpenPlanTrip}
                    className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
                  >
                    Customize This Itinerary
                  </button>
                </form>
              )}

              <div className="pt-2 text-[11px] text-slate-500 space-y-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-green" />
                  <span>Free date change up to 30 days prior</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-green" />
                  <span>Licensed Sherpa & all national park permits</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
