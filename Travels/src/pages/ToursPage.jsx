import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  Users,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { ScrollReveal } from "../hooks/useScrollReveal";

export const NEPAL_TOURS = [
  {
    id: "chitwan-safari-3",
    slug: "chitwan-national-park-safari-3-days",
    title: "Chitwan National Park Safari 3 Days: Jungle Safari Tour",
    category: "Wildlife & Safari",
    duration: "3 Days / 2 Nights",
    price: "$310",
    originalPrice: "$390",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80",
    overview:
      "Immerse in subtropical jungle wilderness. Track endangered single-horned rhinos, Royal Bengal tigers, and exotic bird species with open 4x4 jeep safaris and dugout canoe river trips.",
    highlights: [
      "Open-top 4x4 Jeep Safari deep into UNESCO Chitwan National Park",
      "Peaceful wooden dugout canoe ride along the Rapti River observing gharials",
      "Traditional Tharu stick dance cultural performance & village walk",
      "All meals, naturalist guide, park permits and deluxe eco-resort included",
    ],
    itinerary: [
      {
        day: 1,
        title: "Scenic Drive to Chitwan & Tharu Village Walk",
        desc: "Drive from Kathmandu or Pokhara to Chitwan. Welcome drink, sunset walk and evening Tharu cultural program.",
      },
      {
        day: 2,
        title: "Full Day Jungle Safari & River Canoe Exploration",
        desc: "Dugout canoe on Rapti River, visit elephant breeding center, and afternoon deep jungle jeep safari.",
      },
      {
        day: 3,
        title: "Morning Bird Watching & Departure",
        desc: "Early morning bird-watching tour with resident naturalist followed by return transfer.",
      },
    ],
  },
  {
    id: "nepal-7-days",
    slug: "nepal-itinerary-7-days-kathmandu-chitwan-pokhara",
    title: "Nepal Itinerary 7 Days: Kathmandu, Chitwan & Pokhara Tour",
    category: "Cultural & Scenic Golden Triangle",
    duration: "7 Days / 6 Nights",
    price: "$890",
    originalPrice: "$1,120",
    image:
      "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?auto=format&fit=crop&w=800&q=80",
    overview:
      "The definitive classic Nepal introductory tour. Experience ancient UNESCO heritage temples in Kathmandu, wild rhinos in Chitwan, and mountain reflections on Phewa Lake in Pokhara.",
    highlights: [
      "Kathmandu UNESCO shrines: Swayambhunath Stupa & Patan Durbar Square",
      "Subtropical wildlife safari in Chitwan National Park with wild rhinos",
      "Breathtaking sunrise over Annapurna & Dhaulagiri massifs from Sarangkot",
      "Boating on Phewa Lake with Machapuchare (Fishtail) reflections",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kathmandu",
        desc: "Airport welcome with traditional marigold garlands and transfer to hotel.",
      },
      {
        day: 2,
        title: "Kathmandu UNESCO World Heritage Sightseeing",
        desc: "Guided tour of Swayambhunath, Boudhanath, and Patan Durbar Square.",
      },
      {
        day: 3,
        title: "Drive to Chitwan National Park",
        desc: "Scenic descent into subtropical lowlands, sunset point and Tharu cultural show.",
      },
      {
        day: 4,
        title: "Full Day Wildlife Safari in Chitwan",
        desc: "Canoeing, jungle walking, and 4x4 open jeep safari tracking rhinos and birds.",
      },
      {
        day: 5,
        title: "Scenic Drive to Pokhara",
        desc: "Travel along the Seti river gorge to Pokhara. Afternoon leisure boating on Phewa Lake.",
      },
      {
        day: 6,
        title: "Sarangkot Sunrise & Pokhara Sightseeing",
        desc: "Early dawn sunrise over Annapurna range, visit Davis Fall and Gupteshwor Cave.",
      },
      {
        day: 7,
        title: "Fly to Kathmandu & Departure",
        desc: "Morning flight back to Kathmandu with airport transfer for onward journey.",
      },
    ],
  },
  {
    id: "nepal-10-days",
    slug: "nepal-itinerary-10-days-kathmandu-pokhara-poon-hill",
    title: "Nepal Itinerary 10 Days: Culture, Pokhara & Poon Hill Trek",
    category: "Culture & Himalayan Trekking",
    duration: "10 Days / 9 Nights",
    price: "$1,050",
    originalPrice: "$1,350",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    overview:
      "The ideal balance of cultural sightseeing and rewarding alpine trekking. Stand atop Poon Hill (3,210m) for the iconic sunrise panorama over Annapurna and Dhaulagiri.",
    highlights: [
      "Witness the iconic golden sunrise over Annapurna & Dhaulagiri from Poon Hill",
      "Trek through lush rhododendron forests and traditional Gurung mountain hamlets",
      "Explore Kathmandu’s medieval temples and Pokhara’s lakeside cafes",
      "Fully guided with licensed Sherpas, porters, and lodge stays",
    ],
    itinerary: [
      {
        day: "1-2",
        title: "Kathmandu Arrival & Cultural Exploration",
        desc: "Arrive, rest, and explore Boudhanath, Pashupatinath, and Kathmandu Durbar Square.",
      },
      {
        day: "3-4",
        title: "Fly to Pokhara & Trek to Tikhedhunga / Ulleri",
        desc: "Short flight to Pokhara, drive to Nayapul, and begin scenic trek through stone-stair villages.",
      },
      {
        day: "5-6",
        title: "Ghorepani & Poon Hill Sunrise (3,210m)",
        desc: "Dawn climb to Poon Hill summit, then traverse to Tadapani and Ghandruk Gurung village.",
      },
      {
        day: "7-8",
        title: "Return to Pokhara & Lakeside Relaxation",
        desc: "Gentle walk to road head, drive to Pokhara for lakeside relaxation, spa and boating.",
      },
      {
        day: "9-10",
        title: "Fly back to Kathmandu & Farewell",
        desc: "Scenic flight to Kathmandu, farewell Nepali dinner with cultural dances and departure.",
      },
    ],
  },
  {
    id: "heli-tours",
    slug: "nepal-helicopter-tours-everest-langtang",
    title: "VIP Helicopter Tours in Nepal (Everest & Langtang Landing)",
    category: "Luxury Aerial Flights",
    duration: "1 Day (3–5 Hours)",
    price: "$950",
    originalPrice: "$1,250",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    overview:
      "Touch down at the foot of Mount Everest or the sacred Langtang valley without weeks of rigorous trekking. Fly in luxury with guaranteed window seats and champagne breakfasts.",
    highlights: [
      "Touchdown landing at Kala Patthar (5,545m) with direct view of Mt. Everest",
      "Breakfast landing on the terrace of Everest View Hotel (3,880m) in Syangboche",
      "Spectacular aerial views of Khumbu Icefall, Ama Dablam, and Lhotse",
      "Supplemental oxygen and certified high-altitude alpine pilot",
    ],
    itinerary: [
      {
        day: 1,
        title: "Kathmandu to Lukla & Everest Base Camp Landing",
        desc: "Early morning helicopter departure from Kathmandu, fuel stop at Lukla, dramatic landing at Kala Patthar / EBC, breakfast at Everest View Hotel, and return to Kathmandu before noon.",
      },
    ],
  },
];

export default function ToursPage({ onOpenPlanTrip }) {
  const [selectedTour, setSelectedTour] = useState(null);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Tours Hero Banner */}
      <div className="relative py-24 bg-brand-blue text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?auto=format&fit=crop&w=1600&q=80)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-brand-blue/80 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Nepal Tours &{" "}
            <span className="text-brand-gold">Cultural Journeys</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-slate-200 text-sm sm:text-base leading-relaxed">
            Experience the vibrant tapestry of Nepal: medieval Newari temples,
            subtropical tiger and rhino safaris, luxury helicopter landings at
            Everest, and serene lakeside retreats.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={onOpenPlanTrip}
              className="px-6 py-3 rounded-full bg-brand-gold hover:bg-brand-gold-dark text-white font-bold text-xs sm:text-sm shadow-lg transition"
            >
              Plan a Custom Tour Itinerary
            </button>
          </div>
        </div>
      </div>

      {/* Main Tours Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {NEPAL_TOURS.map((tour, idx) => (
            <div
              key={tour.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Tour Image */}
              <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover object-center absolute inset-0"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-brand-blue/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
                    {tour.category}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs bg-black/60 backdrop-blur-md p-2.5 rounded-xl">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-gold" />
                    {tour.duration}
                  </span>
                  <span className="font-extrabold text-amber-300">
                    From {tour.price}
                  </span>
                </div>
              </div>

              {/* Tour Content */}
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                      Guaranteed Departure
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-400 line-through">
                        {tour.originalPrice}
                      </span>
                      <span className="text-xl font-extrabold text-brand-blue">
                        {tour.price}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                    {tour.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {tour.overview}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-900 block mb-2">
                      Tour Highlights:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {tour.highlights.map((h, hIdx) => (
                        <div
                          key={hIdx}
                          className="flex items-start gap-2 text-xs text-slate-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-500">
                    Includes private transport, licensed guide & luxury hotels
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={onOpenPlanTrip}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-white font-bold text-xs shadow transition cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Book / Inquire Tour</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
