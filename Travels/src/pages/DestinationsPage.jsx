import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DESTINATIONS } from '../data/destinationsData';
import { useData } from '../context/DataContext';
import NepalInteractiveMap, { NEPAL_HOTSPOTS } from '../components/NepalInteractiveMap';
import { Compass, MapPin, Mountain, ArrowRight, Sparkles, Calendar, ShieldCheck } from 'lucide-react';
import { ScrollReveal } from '../hooks/useScrollReveal';

export default function DestinationsPage({ onOpenPlanTrip }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const { destinations } = useData();

  // Use dynamic destinations from backend/DataContext, fallback to static list
  const baseDestinations = destinations && destinations.length > 0 ? destinations : DESTINATIONS;

  const extraDestinations = [
    {
      id: 'chitwan',
      slug: 'chitwan-region',
      name: 'Chitwan National Park',
      title: 'Subtropical Jungle & Wildlife',
      tag: 'UNESCO Wildlife Sanctuary',
      elevation: '415 m',
      tripsCount: 4,
      image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1000&q=80',
      description: 'Nepal’s premier safari destination. Dense sal forests, Rapti River wetlands, single-horned rhinoceros, Royal Bengal tigers, and Tharu indigenous heritage.',
      popularTreks: ['Chitwan Jungle Safari (3 Days)', 'Kathmandu to Chitwan Overland'],
      highlights: ['Jeep Safaris', 'Rapti Canoe', 'Elephant Breeding Center', 'Tharu Stick Dance']
    },
    {
      id: 'kathmandu',
      slug: 'kathmandu-valley',
      name: 'Kathmandu Valley',
      title: 'Living Heritage & Ancient Shrines',
      tag: '7 UNESCO World Heritage Sites',
      elevation: '1,400 m',
      tripsCount: 8,
      image: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?auto=format&fit=crop&w=1000&q=80',
      description: 'The ancient cradle of Newari architecture, sacred golden stupas at Swayambhunath and Boudhanath, Hindu cremations at Pashupatinath, and historic Durbar Squares.',
      popularTreks: ['Kathmandu Valley Heritage Tour (1 Day)', 'Nagarkot Sunrise Excursion'],
      highlights: ['Swayambhunath', 'Boudhanath Stupa', 'Patan Durbar Square', 'Bhaktapur Medieval City']
    }
  ];

  // Merge so base destinations come first, and extra items are added if not already present
  const allDestinations = [
    ...baseDestinations,
    ...extraDestinations.filter((extra) => !baseDestinations.some((b) => b.id === extra.id || b.slug === extra.slug))
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Destinations Hero Banner */}
      <div className="relative py-24 bg-brand-blue-dark text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark via-brand-blue-dark/85 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-wider mb-4 border border-brand-gold/30">
            <MapPin className="w-3.5 h-3.5" />
            Geographic Destinations Showcase
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Destinations in <span className="text-brand-gold">Nepal</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed">
            From the world’s highest 8,000m summits to medieval Newari palace courtyards and deep subtropical jungles, discover every corner of Nepal.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href="#nepal-interactive-map"
              className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-brand-gold text-white text-xs font-bold transition border border-white/20"
            >
              Interactive Map of Nepal ↓
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Map of Nepal */}
      <NepalInteractiveMap />

      {/* Destinations Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allDestinations.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo with Overlay */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="bg-brand-gold text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow">
                      {dest.tag}
                    </span>
                    <span className="bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                      {dest.elevation}
                    </span>
                  </div>

                  {/* Bottom Image Title */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold leading-tight group-hover:text-amber-200 transition">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">{dest.title}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {dest.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider block mb-2">
                      Key Highlights:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {dest.highlights.map((h, hIdx) => (
                        <span
                          key={hIdx}
                          className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md font-medium"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="p-6 pt-0">
                <Link
                  to={dest.id === 'chitwan' ? '/tours' : `/region/${dest.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs py-3 px-4 rounded-xl shadow transition"
                >
                  <span>Explore {dest.name} Packages</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
