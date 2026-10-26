import React from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { useScrollPosition } from '../hooks/useScrollPosition';

export default function FloatingButtons() {
  const { scrollY } = useScrollPosition();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isVisible = scrollY > 350;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* Floating WhatsApp Guide Button */}
      <a
        href="https://wa.me/9779851000000?text=Hello%20Swagat%20Holidays!%20I%20am%20interested%20in%20planning%20a%20trek%20in%20Nepal."
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Chat with Nepali Guide on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
        </span>
        <MessageCircle className="w-6 h-6 fill-white text-emerald-500" />

        {/* Hover Tooltip */}
        <span className="absolute right-full mr-3 whitespace-nowrap bg-slate-900 text-white text-[11px] font-semibold py-1.5 px-3 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition shadow-lg">
          Chat Live with Local Guide
        </span>
      </a>

      {/* Back to Top Smooth Scroll Button */}
      <button
        onClick={scrollToTop}
        className={`w-11 h-11 rounded-full bg-brand-blue hover:bg-brand-blue-dark text-white flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer ${
          isVisible
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 text-brand-gold" />
      </button>
    </div>
  );
}
