import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TRIPS } from '../data/tripsData';
import { useData } from '../context/DataContext';
import TripCard from '../components/TripCard';
import {
  Compass,
  Search,
  CheckCircle2,
  SlidersHorizontal,
  DollarSign,
  Calendar,
  Sparkles,
  ArrowUpDown,
  X,
  Mountain,
} from 'lucide-react';

export default function TreksPage({ onSelectTrip, onBookTrip, wishlist, onToggleWishlist, onOpenPlanTrip }) {
  const { trips, destinations } = useData();
  const allTrips = trips && trips.length > 0 ? trips : TRIPS;

  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Dynamically derive regions from destinations / trips
  const dynamicRegions = useMemo(() => {
    const list = [{ id: 'all', name: 'All Regions' }];
    const seen = new Set();

    if (destinations && destinations.length > 0) {
      destinations.forEach((d) => {
        const id = d.id || d.slug;
        const name = d.name;
        if (id && name && !seen.has(name.toLowerCase())) {
          seen.add(name.toLowerCase());
          list.push({ id, name });
        }
      });
    }

    allTrips.forEach((t) => {
      if (t.region && !seen.has(t.region.toLowerCase())) {
        seen.add(t.region.toLowerCase());
        list.push({ id: t.regionSlug || t.region.toLowerCase().replace(/\s+/g, '-'), name: t.region });
      }
    });

    return list;
  }, [destinations, allTrips]);

  const regions = dynamicRegions;

  // Filter & Sort trips
  const filteredTrips = useMemo(() => {
    const result = allTrips.filter((trip) => {
      // Region filter
      if (selectedRegion !== 'all') {
        if (!trip.region.toLowerCase().includes(selectedRegion.toLowerCase())) {
          return false;
        }
      }

      // Difficulty filter
      if (selectedDifficulty !== 'all') {
        if (trip.difficultyLevel !== selectedDifficulty) {
          return false;
        }
      }

      // Duration filter
      if (selectedDuration === 'short' && trip.durationDays > 7) return false;
      if (selectedDuration === 'medium' && (trip.durationDays < 8 || trip.durationDays > 14)) return false;
      if (selectedDuration === 'long' && trip.durationDays < 15) return false;

      // Price filter
      const price = trip.salePrice || trip.regularPrice || 0;
      if (selectedPriceRange === 'under-1000' && price >= 1000) return false;
      if (selectedPriceRange === '1000-1500' && (price < 1000 || price > 1500)) return false;
      if (selectedPriceRange === '1500-2000' && (price < 1500 || price > 2000)) return false;
      if (selectedPriceRange === 'above-2000' && price <= 2000) return false;

      // Best Season filter
      if (selectedSeason !== 'all') {
        const seasonStr = (trip.bestSeason || '').toLowerCase();
        if (selectedSeason === 'spring' && !seasonStr.includes('mar') && !seasonStr.includes('apr') && !seasonStr.includes('may') && !seasonStr.includes('spring')) {
          return false;
        }
        if (selectedSeason === 'autumn' && !seasonStr.includes('sep') && !seasonStr.includes('oct') && !seasonStr.includes('nov') && !seasonStr.includes('autumn')) {
          return false;
        }
        if (selectedSeason === 'winter' && !seasonStr.includes('dec') && !seasonStr.includes('jan') && !seasonStr.includes('feb') && !seasonStr.includes('winter')) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = trip.title.toLowerCase().includes(q);
        const matchRegion = trip.region.toLowerCase().includes(q);
        const matchOverview = (trip.overview || '').toLowerCase();
        if (!matchTitle && !matchRegion && !matchOverview.includes(q)) return false;
      }

      return true;
    });

    // Sorting
    return [...result].sort((a, b) => {
      if (sortBy === 'price-low') {
        const priceA = a.salePrice || a.regularPrice || 0;
        const priceB = b.salePrice || b.regularPrice || 0;
        return priceA - priceB;
      }
      if (sortBy === 'price-high') {
        const priceA = a.salePrice || a.regularPrice || 0;
        const priceB = b.salePrice || b.regularPrice || 0;
        return priceB - priceA;
      }
      if (sortBy === 'duration-asc') {
        return (a.durationDays || 0) - (b.durationDays || 0);
      }
      if (sortBy === 'duration-desc') {
        return (b.durationDays || 0) - (a.durationDays || 0);
      }
      if (sortBy === 'rating') {
        return (b.rating || 5) - (a.rating || 5);
      }
      // default 'featured'
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [allTrips, selectedRegion, selectedDifficulty, selectedDuration, selectedPriceRange, selectedSeason, searchQuery, sortBy]);

  const hasActiveFilters =
    selectedRegion !== 'all' ||
    selectedDifficulty !== 'all' ||
    selectedDuration !== 'all' ||
    selectedPriceRange !== 'all' ||
    selectedSeason !== 'all' ||
    searchQuery.trim() !== '';

  const resetFilters = () => {
    setSelectedRegion('all');
    setSelectedDifficulty('all');
    setSelectedDuration('all');
    setSelectedPriceRange('all');
    setSelectedSeason('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Page Hero Banner */}
      <div className="relative py-20 bg-brand-blue-dark text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark via-brand-blue-dark/80 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-wider mb-4 border border-brand-gold/30">
            <Compass className="w-3.5 h-3.5" />
            Himalayan Travels &amp; Journeys
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Nepal Travels &amp; <span className="text-brand-gold">Himalayan Circuits</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed">
            From the high vistas of Everest Base Camp to the sacred hidden trails of Manaslu and Annapurna. Guided by government-certified Sherpas with 100% guaranteed departures.
          </p>

          {/* Quick Region Selector Chips */}
          <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
            {regions.filter((r) => r.id !== 'all').map((r) => (
              <Link
                key={r.id}
                to={`/region/${r.id}`}
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-brand-gold hover:text-white text-xs font-bold transition duration-200 border border-white/10"
              >
                {r.name} →
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Region Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">Region:</span>
          {regions.map((reg) => (
            <button
              key={reg.id}
              onClick={() => setSelectedRegion(reg.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                selectedRegion === reg.id
                  ? 'bg-brand-blue text-white shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {reg.name}
            </button>
          ))}
        </div>

        {/* Robust Multi-Parameter Filters and Search Bar */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/90 mb-10 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search journeys by keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>

            {/* Region Filter */}
            <div>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white text-slate-700 cursor-pointer"
              >
                <option value="all">All Himalayan Regions</option>
                {regions.filter((r) => r.id !== 'all').map((reg) => (
                  <option key={reg.id} value={reg.id}>
                    {reg.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white text-slate-700"
              >
                <option value="all">All Difficulty Levels</option>
                <option value="moderate">Moderate</option>
                <option value="challenging">Challenging</option>
                <option value="strenuous">Strenuous</option>
              </select>
            </div>

            {/* Duration Filter */}
            <div>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white text-slate-700"
              >
                <option value="all">Any Duration</option>
                <option value="short">1 – 7 Days (Short Trips)</option>
                <option value="medium">8 – 14 Days (Standard)</option>
                <option value="long">15+ Days (Expeditions)</option>
              </select>
            </div>
          </div>

          {/* Advanced Filters Expandable Drawer */}
          {showAdvancedFilters && (
            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fadeIn">
              {/* Price Range Filter */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Budget / Price Range
                </label>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white text-slate-700"
                >
                  <option value="all">All Price Ranges</option>
                  <option value="under-1000">Under $1,000</option>
                  <option value="1000-1500">$1,000 – $1,500</option>
                  <option value="1500-2000">$1,500 – $2,000</option>
                  <option value="above-2000">$2,000+</option>
                </select>
              </div>

              {/* Best Season Filter */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Best Travel Season
                </label>
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white text-slate-700"
                >
                  <option value="all">Any Season</option>
                  <option value="spring">Spring (Mar – May)</option>
                  <option value="autumn">Autumn (Sep – Nov)</option>
                  <option value="winter">Winter (Dec – Feb)</option>
                </select>
              </div>

              {/* Sort Order */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white text-slate-700"
                >
                  <option value="featured">Featured / Best Seller</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="duration-asc">Duration: Shortest First</option>
                  <option value="duration-desc">Duration: Longest First</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          )}

          {/* Active Filter Chips and Toggle Button */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-3">
              <span>
                Showing <strong className="text-brand-blue">{filteredTrips.length}</strong> verified packages
              </span>
              <button
                type="button"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="inline-flex items-center gap-1.5 font-bold text-brand-blue hover:text-brand-gold transition cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>{showAdvancedFilters ? "Hide Extra Filters" : "More Filters & Sort"}</span>
              </button>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-brand-gold hover:underline font-bold cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTrips.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              onSelectTrip={onSelectTrip}
              onBookTrip={onBookTrip}
              isWishlisted={wishlist.includes(trip.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>

        {filteredTrips.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <Compass className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-700">No journeys found</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn’t find any packages matching your exact criteria. Try resetting the filters or inquire for a custom route.
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
              >
                Reset Filters
              </button>
              <button
                onClick={onOpenPlanTrip}
                className="px-6 py-2.5 bg-brand-gold text-white font-bold text-xs rounded-xl shadow hover:bg-brand-gold-dark transition"
              >
                Request Custom Itinerary
              </button>
            </div>
          </div>
        )}

        {/* Travel Standards & Ethical Promise */}
        <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-brand-blue">
              Our High Altitude Safety &amp; Travel Standards
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every journey with Swagat Holidays &amp; Travels includes comprehensive safety gear, experienced guides, and ethical porter treatment.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-800">Daily Medical Pulse Checks</h4>
                <p className="text-xs text-slate-500 mt-1">Twice daily pulse oximeter readings track your acclimatization progress.</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-800">Certified Sherpa Leaders</h4>
                <p className="text-xs text-slate-500 mt-1">Government-licensed high altitude experts with Wilderness First Aid mastery.</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-800">Ethical Porter Care</h4>
                <p className="text-xs text-slate-500 mt-1">Strict IPPG standards with fair wages, medical insurance, and proper warm clothing.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
