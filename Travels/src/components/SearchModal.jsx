import React, { useState, useEffect, useRef } from 'react';
import { Search, X, MapPin, Clock, ArrowRight, Mountain } from 'lucide-react';

export default function SearchModal({ trips, isOpen, onClose, onSelectTrip }) {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = trips.filter((t) => {
    if (!searchTerm.trim()) return false;
    const term = searchTerm.toLowerCase();
    return (
      t.title.toLowerCase().includes(term) ||
      t.region.toLowerCase().includes(term) ||
      t.difficulty.toLowerCase().includes(term) ||
      t.overview.toLowerCase().includes(term)
    );
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-start justify-center pt-20 sm:pt-28 px-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-200 animate-scale">
        {/* Top Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-brand-gold shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search trips, regions (e.g. Everest, 14 Days, Gokyo, Manaslu)..."
            className="w-full text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-96 overflow-y-auto p-4">
          {!searchTerm.trim() ? (
            <div className="text-center py-8 text-xs text-slate-400">
              <span className="block font-semibold mb-2 text-slate-600">Quick Searches:</span>
              <div className="flex flex-wrap justify-center gap-2">
                {['Everest Base Camp', 'Annapurna Circuit', 'Manaslu', 'Mardi Himal', 'Helicopter'].map((q) => (
                  <button
                    key={q}
                    onClick={() => setSearchTerm(q)}
                    className="bg-slate-100 hover:bg-brand-blue hover:text-white px-3 py-1 rounded-full text-xs text-slate-700 transition cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 block mb-1">
                Matching Trips ({results.length})
              </span>
              {results.map((trip) => (
                <div
                  key={trip.id}
                  onClick={() => {
                    onSelectTrip(trip.id);
                    onClose();
                  }}
                  className="p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-12 h-12 rounded-lg object-cover shrink-0"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 group-hover:text-brand-blue transition">
                        {trip.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-brand-gold" />
                          {trip.region}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {trip.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-brand-gold block">
                      ${trip.salePrice}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-0.5 justify-end">
                      View <ArrowRight className="w-3 h-3 inline" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500 text-xs">
              No matching itineraries found for "{searchTerm}". Try a different keyword or contact our guide team!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
