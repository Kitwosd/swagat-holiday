import React from 'react';
import Hero from '../components/Hero';
import StatsCounter from '../components/StatsCounter';
import BestSellingTrips from '../components/BestSellingTrips';
import NepalInteractiveMap from '../components/NepalInteractiveMap';
import DestinationsSection from '../components/DestinationsSection';
import WhyChooseUs from '../components/WhyChooseUs';
import ActivitiesSection from '../components/ActivitiesSection';
import InteractiveTripPlanner from '../components/InteractiveTripPlanner';
import TestimonialsSection from '../components/TestimonialsSection';
import BlogSection from '../components/BlogSection';
import FaqSection from '../components/FaqSection';
import CtaBanner from '../components/CtaBanner';

export default function HomePage({
  trips,
  activeFilter,
  setActiveFilter,
  onSelectTrip,
  onBookTrip,
  wishlist,
  onToggleWishlist,
  onOpenPlanTrip,
  onFilterFromHero,
  onSelectRegion,
  onSelectActivity
}) {
  return (
    <>
      {/* Hero Section with Parallax Background & Quick Search */}
      <Hero
        onFilterTrips={onFilterFromHero}
        onOpenPlanTrip={onOpenPlanTrip}
      />

      {/* Floating Animated Counter Stats */}
      <StatsCounter />

      {/* Best Selling for 2026 Trips Section */}
      <BestSellingTrips
        trips={trips}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        onSelectTrip={onSelectTrip}
        onBookTrip={onBookTrip}
        wishlist={wishlist}
        onToggleWishlist={onToggleWishlist}
      />

      {/* Interactive Map of Nepal directly below Best Selling for 2026 */}
      <NepalInteractiveMap />

      {/* "Your Destination in Nepal" Region Showcase */}
      <DestinationsSection onSelectRegion={onSelectRegion} />

      {/* Why Choose Us? (Two rectangular images + 4 elements with super short headers) */}
      <WhyChooseUs onOpenPlanTrip={onOpenPlanTrip} />

      {/* Adventurous Activities Showcase (Pyramid Shape: 1 on first, then 3 then 5 with Shine Overlay) */}
      <ActivitiesSection onSelectActivity={onSelectActivity} />

      {/* Interactive Trip Matcher & Route Planner */}
      <InteractiveTripPlanner
        trips={trips}
        onSelectTrip={onSelectTrip}
        onOpenPlanTrip={onOpenPlanTrip}
      />

      {/* Verified Guest Reviews & TripAdvisor Badges */}
      <TestimonialsSection />

      {/* Latest Himalayan Articles & Travel Guides */}
      <BlogSection />

      {/* Frequently Asked Questions */}
      <FaqSection />

      {/* Call to Action Banner */}
      <CtaBanner onOpenPlanTrip={onOpenPlanTrip} />
    </>
  );
}
