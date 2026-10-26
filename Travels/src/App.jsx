import React, { useState, useEffect } from "react";

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollProgressBar from "./components/ScrollProgressBar";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";
import TripDetailModal from "./components/TripDetailModal";
import SearchModal from "./components/SearchModal";
import PlanYourTripModal from "./components/PlanYourTripModal";
import { TRIPS } from "./data/tripsData";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider, useData } from "./context/DataContext";
import { LanguageProvider } from "./context/LanguageContext";

// Admin Pages
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";

// Client Pages
import HomePage from "./pages/HomePage";
import TreksPage from "./pages/TreksPage";
import RegionDetailPage from "./pages/RegionDetailPage";
import ToursPage from "./pages/ToursPage";
import DestinationsPage from "./pages/DestinationsPage";
import TravelInfoPage from "./pages/TravelInfoPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PlanYourTripPage from "./pages/PlanYourTripPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import TripDetailPage from "./pages/TripDetailPage";

function AppContent() {
  const { trips: dataTrips, destinations } = useData();
  const [trips, setTrips] = useState(dataTrips || TRIPS);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [planTripModalOpen, setPlanTripModalOpen] = useState(false);
  const [wishlist, setWishlist] = useState(["ebc-14"]);
  const navigate = useNavigate();
  const location = useLocation();

  // Keep local trips in sync with DataContext trips
  useEffect(() => {
    if (dataTrips && dataTrips.length > 0) {
      setTrips(dataTrips);
    }
  }, [dataTrips]);

  const isAdminRoute = location.pathname.startsWith("/admin");

  // Handle wishlist toggle
  const handleToggleWishlist = (tripId) => {
    setWishlist((prev) =>
      prev.includes(tripId)
        ? prev.filter((id) => id !== tripId)
        : [...prev, tripId],
    );
  };

  // Open trip detail modal by trip id
  const handleOpenTripModal = (tripId) => {
    const found = trips.find((t) => t.id === tripId || t.slug === tripId);
    if (found) {
      setSelectedTrip(found);
    }
  };

  // Filter trips from Hero quick search bar
  const handleFilterFromHero = ({ destination, activity, duration }) => {
    let filtered = dataTrips || TRIPS;

    if (destination) {
      filtered = filtered.filter((t) =>
        t.region.toLowerCase().includes(destination.toLowerCase()),
      );
    }

    if (activity) {
      filtered = filtered.filter((t) => t.category === activity);
    }

    if (duration) {
      if (duration === "1-5")
        filtered = filtered.filter((t) => t.durationDays <= 5);
      else if (duration === "6-10")
        filtered = filtered.filter(
          (t) => t.durationDays >= 6 && t.durationDays <= 10,
        );
      else if (duration === "11-15")
        filtered = filtered.filter(
          (t) => t.durationDays >= 11 && t.durationDays <= 15,
        );
      else if (duration === "16+")
        filtered = filtered.filter((t) => t.durationDays >= 16);
    }

    setTrips(filtered.length > 0 ? filtered : dataTrips || TRIPS);
    setActiveFilter("all");

    const element = document.getElementById("featured-trips");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle selecting region
  const handleSelectRegion = (regionName) => {
    const term = (regionName || "").toLowerCase();
    const foundDest = destinations?.find(
      (d) =>
        d.name?.toLowerCase() === term ||
        d.id?.toLowerCase() === term ||
        d.slug?.toLowerCase() === term ||
        term.includes(d.name?.toLowerCase()) ||
        term.includes(d.id?.toLowerCase())
    );

    if (foundDest) {
      navigate(`/region/${foundDest.id || foundDest.slug}`);
      return;
    }

    if (term.includes("everest")) {
      navigate("/region/everest");
    } else if (term.includes("annapurna")) {
      navigate("/region/annapurna");
    } else if (term.includes("manaslu")) {
      navigate("/region/manaslu");
    } else if (term.includes("langtang")) {
      navigate("/region/langtang");
    } else if (term.includes("mustang")) {
      navigate("/region/mustang");
    } else {
      navigate("/treks");
    }
  };

  // Handle clicking an activity
  const handleSelectActivity = (activityId) => {
    navigate(`/activities/${activityId}`);
  };

  // If on Admin routes, render clean admin interface without client navigation/footer
  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-50 selection:bg-brand-gold selection:text-white">
      {/* Route changes scroll to top */}
      <ScrollToTop />

      {/* Top Reading Progress Bar */}
      <ScrollProgressBar />

      {/* Navigation Bar with Logo & Mega Dropdown */}
      <Navbar
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenPlanTrip={() => setPlanTripModalOpen(true)}
        onSelectRegion={handleSelectRegion}
        onOpenTripModal={handleOpenTripModal}
      />

      {/* Main Routed Content Area */}
      <main className="flex-grow">
        <Routes>
          {/* Admin routes accessible from anywhere */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/*" element={<AdminDashboard />} />

          {/* Home Route */}
          <Route
            path="/"
            element={
              <HomePage
                trips={trips}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                onSelectTrip={handleOpenTripModal}
                onBookTrip={(trip) => setSelectedTrip(trip)}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
                onOpenPlanTrip={() => setPlanTripModalOpen(true)}
                onFilterFromHero={handleFilterFromHero}
                onSelectRegion={handleSelectRegion}
                onSelectActivity={handleSelectActivity}
              />
            }
          />

          {/* Dedicated Page for Nepal Treks */}
          <Route
            path="/treks"
            element={
              <TreksPage
                onSelectTrip={handleOpenTripModal}
                onBookTrip={(trip) => setSelectedTrip(trip)}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
                onOpenPlanTrip={() => setPlanTripModalOpen(true)}
              />
            }
          />

          {/* Dedicated Pages for Each Himalayan Region */}
          <Route
            path="/region/:regionSlug"
            element={
              <RegionDetailPage
                onSelectTrip={handleOpenTripModal}
                onBookTrip={(trip) => setSelectedTrip(trip)}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
                onOpenPlanTrip={() => setPlanTripModalOpen(true)}
              />
            }
          />

          {/* Dedicated Page for Nepal Tours */}
          <Route
            path="/tours"
            element={
              <ToursPage onOpenPlanTrip={() => setPlanTripModalOpen(true)} />
            }
          />

          {/* Dedicated Page for Destinations */}
          <Route
            path="/destinations"
            element={
              <DestinationsPage
                onOpenPlanTrip={() => setPlanTripModalOpen(true)}
              />
            }
          />

          {/* Dedicated Page for Travel Info */}
          <Route
            path="/travel-info"
            element={
              <TravelInfoPage
                onOpenPlanTrip={() => setPlanTripModalOpen(true)}
              />
            }
          />

          {/* Dedicated Page for Company / About Us */}
          <Route
            path="/about"
            element={
              <AboutPage onOpenPlanTrip={() => setPlanTripModalOpen(true)} />
            }
          />

          {/* Dedicated Page for Contact Us */}
          <Route path="/contact" element={<ContactPage />} />

          {/* Dedicated Page for Plan Your Trip Custom Builder */}
          <Route path="/plan-your-trip" element={<PlanYourTripPage />} />

          {/* Dedicated Page for Adventurous Activities */}
          <Route
            path="/activities"
            element={
              <ActivitiesPage
                onSelectTrip={handleOpenTripModal}
                onBookTrip={(trip) => setSelectedTrip(trip)}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
                onOpenPlanTrip={() => setPlanTripModalOpen(true)}
              />
            }
          />
          <Route
            path="/activities/:activitySlug"
            element={
              <ActivitiesPage
                onSelectTrip={handleOpenTripModal}
                onBookTrip={(trip) => setSelectedTrip(trip)}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
                onOpenPlanTrip={() => setPlanTripModalOpen(true)}
              />
            }
          />

          {/* Dedicated Full Page for Any Trip Detail */}
          <Route
            path="/trip/:tripId"
            element={
              <TripDetailPage
                onOpenPlanTrip={() => setPlanTripModalOpen(true)}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
                onBookTrip={(trip) => setSelectedTrip(trip)}
              />
            }
          />
          <Route
            path="/trips/:tripId"
            element={
              <TripDetailPage
                onOpenPlanTrip={() => setPlanTripModalOpen(true)}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
                onBookTrip={(trip) => setSelectedTrip(trip)}
              />
            }
          />

          {/* Fallback to Home */}
          <Route
            path="*"
            element={
              <HomePage
                trips={trips}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                onSelectTrip={handleOpenTripModal}
                onBookTrip={(trip) => setSelectedTrip(trip)}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
                onOpenPlanTrip={() => setPlanTripModalOpen(true)}
                onFilterFromHero={handleFilterFromHero}
                onSelectRegion={handleSelectRegion}
                onSelectActivity={handleSelectActivity}
              />
            }
          />
        </Routes>
      </main>

      {/* Footer with Accreditations, Office Details & Newsletter */}
      <Footer
        onOpenPlanTrip={() => setPlanTripModalOpen(true)}
        onSelectRegion={handleSelectRegion}
      />

      {/* Floating Buttons: Back to Top & WhatsApp Guide */}
      <FloatingButtons />

      {/* Interactive Trip Details Modal */}
      {selectedTrip && (
        <TripDetailModal
          trip={selectedTrip}
          onClose={() => setSelectedTrip(null)}
          onBookDirect={() => {}}
        />
      )}

      {/* Live Search Modal */}
      <SearchModal
        trips={trips}
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectTrip={handleOpenTripModal}
      />

      {/* Plan Your Trip Custom Builder Modal */}
      <PlanYourTripModal
        isOpen={planTripModalOpen}
        onClose={() => setPlanTripModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </DataProvider>
    </AuthProvider>
  );
}
