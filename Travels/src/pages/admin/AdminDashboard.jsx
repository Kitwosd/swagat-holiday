import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { api } from "../../services/api";
import TripsTab from "./components/TripsTab";
import DestinationsTab from "./components/DestinationsTab";
import ActivitiesTab from "./components/ActivitiesTab";
import SiteContentTab from "./components/SiteContentTab";
import InquiriesTab from "./components/InquiriesTab";
import TestimonialsTab from "./components/TestimonialsTab";
import FaqsTab from "./components/FaqsTab";
import {
  Compass,
  MapPin,
  Mountain,
  LayoutTemplate,
  Inbox,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  TrendingUp,
  ChevronRight,
  Sparkles,
  MessageSquareQuote,
  HelpCircle,
} from "lucide-react";

export default function AdminDashboard() {
  const { user, logout, isAuthenticated, loading: authLoading } = useAuth();
  const { trips, destinations, activities, faqs } = useData();
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inquiriesCount, setInquiriesCount] = useState(0);
  const navigate = useNavigate();

  // Authentication protection
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/admin/login");
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Load inquiries count for badge
  useEffect(() => {
    if (isAuthenticated) {
      api
        .getInquiries({ status: "pending" })
        .then((res) => {
          if (res.success && res.data) {
            setInquiriesCount(res.data.length);
          }
        })
        .catch(() => {});
    }
  }, [isAuthenticated, activeTab]);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const navItems = [
    { id: "overview", label: "Dashboard Overview", icon: TrendingUp },
    {
      id: "trips",
      label: "Trekking & Tours",
      icon: Mountain,
      badge: trips.length,
    },
    {
      id: "destinations",
      label: "Destinations & Regions",
      icon: MapPin,
      badge: destinations.length,
    },
    {
      id: "activities",
      label: "Activities & Styles",
      icon: Compass,
      badge: activities.length,
    },
    { id: "content", label: "Dynamic Content & Hero", icon: LayoutTemplate },
    {
      id: "faqs",
      label: "Frequently Asked Questions",
      icon: HelpCircle,
      badge: faqs ? faqs.length : null,
    },
    {
      id: "testimonials",
      label: "Guest Testimonials",
      icon: MessageSquareQuote,
      badge: null,
    },
    {
      id: "inquiries",
      label: "Bookings & Inquiries",
      icon: Inbox,
      badge: inquiriesCount > 0 ? `${inquiriesCount} new` : null,
      badgeColor: "bg-amber-500 text-slate-950 font-bold",
    },
  ];

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row selection:bg-brand-gold selection:text-white">
      {/* Mobile Topbar */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between sticky top-0 z-40 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
          <span className="font-bold text-sm">Travels Admin</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 text-slate-300 hover:text-white rounded-lg focus:outline-none"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          mobileMenuOpen ? "block" : "hidden"
        } md:block md:w-64 lg:w-72 bg-slate-900 text-slate-300 flex flex-col shrink-0 min-h-screen md:sticky md:top-0 z-30 transition-all border-r border-slate-800`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800 hidden md:flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-sm text-white leading-tight">
                Admin Console
              </h1>
              <p className="text-[11px] text-slate-500">Himalayan Journeys</p>
            </div>
          </div>
        </div>

        {/* User Card */}
        <div className="p-4 mx-4 my-4 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
          <div className="min-w-0">
            <span className="text-xs font-bold text-white block truncate">
              {user?.name || "Administrator"}
            </span>
            <span className="text-[10px] text-amber-400 block truncate font-mono">
              {user?.email || "admin@travels.com"}
            </span>
          </div>
          <span className="px-1.5 py-0.5 text-[9px] font-bold bg-amber-400/20 text-amber-300 rounded uppercase">
            {user?.role || "Admin"}
          </span>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-4 space-y-1 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  isActive
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 ${isActive ? "text-slate-950" : "text-slate-400"}`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge !== null && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      item.badgeColor ||
                      (isActive
                        ? "bg-slate-950 text-amber-400"
                        : "bg-slate-800 text-slate-400")
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 transition"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-amber-400" />
              <span>View Live Website</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Welcome banner */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden border border-slate-800">
              <div className="relative z-10 max-w-2xl">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Welcome back, {user?.name || "Admin"}
                </h1>
              </div>
            </div>

            {/* Metric KPI cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                onClick={() => setActiveTab("trips")}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer group"
              >
                <div className="flex items-center justify-between text-slate-400 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Packages
                  </span>
                  <Mountain className="w-5 h-5 text-amber-500 group-hover:scale-110 transition" />
                </div>
                <div className="text-2xl font-black text-slate-900">
                  {trips.length}
                </div>
                <span className="text-[11px] text-amber-600 font-medium">
                  Trekking & Tours
                </span>
              </div>

              <div
                onClick={() => setActiveTab("destinations")}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer group"
              >
                <div className="flex items-center justify-between text-slate-400 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Regions
                  </span>
                  <MapPin className="w-5 h-5 text-blue-500 group-hover:scale-110 transition" />
                </div>
                <div className="text-2xl font-black text-slate-900">
                  {destinations.length}
                </div>
                <span className="text-[11px] text-blue-600 font-medium">
                  Regions
                </span>
              </div>

              <div
                onClick={() => setActiveTab("activities")}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer group"
              >
                <div className="flex items-center justify-between text-slate-400 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Activities
                  </span>
                  <Compass className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition" />
                </div>
                <div className="text-2xl font-black text-slate-900">
                  {activities.length}
                </div>
                <span className="text-[11px] text-emerald-600 font-medium">
                  Adventure Styles
                </span>
              </div>

              <div
                onClick={() => setActiveTab("inquiries")}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer group"
              >
                <div className="flex items-center justify-between text-slate-400 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Pending Bookings
                  </span>
                  <Inbox className="w-5 h-5 text-rose-500 group-hover:scale-110 transition" />
                </div>
                <div className="text-2xl font-black text-slate-900">
                  {inquiriesCount}
                </div>
                <span className="text-[11px] text-rose-600 font-medium">
                  Awaiting Reply
                </span>
              </div>
            </div>

            {/* Quick Actions Shortcuts */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-900">
                Quick Dashboard Navigation
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => setActiveTab("trips")}
                  className="p-4 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-200 text-left transition group cursor-pointer"
                >
                  <Mountain className="w-5 h-5 text-amber-500 mb-2 group-hover:scale-110 transition" />
                  <span className="block text-xs font-bold text-slate-900">
                    Manage Trips
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Add, edit pricing, photos, or delete
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("faqs")}
                  className="p-4 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-left transition group cursor-pointer"
                >
                  <HelpCircle className="w-5 h-5 text-indigo-500 mb-2 group-hover:scale-110 transition" />
                  <span className="block text-xs font-bold text-slate-900">
                    Manage FAQs
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Add, edit and organize FAQ answers
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("content")}
                  className="p-4 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-left transition group cursor-pointer"
                >
                  <LayoutTemplate className="w-5 h-5 text-blue-500 mb-2 group-hover:scale-110 transition" />
                  <span className="block text-xs font-bold text-slate-900">
                    Change Hero Content
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Upload hero wallpapers & adjust copy
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("inquiries")}
                  className="p-4 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 text-left transition group cursor-pointer"
                >
                  <Inbox className="w-5 h-5 text-emerald-500 mb-2 group-hover:scale-110 transition" />
                  <span className="block text-xs font-bold text-slate-900">
                    Review Bookings
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Contact travelers and update reservation statuses
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "trips" && <TripsTab />}
        {activeTab === "destinations" && <DestinationsTab />}
        {activeTab === "activities" && <ActivitiesTab />}
        {activeTab === "content" && <SiteContentTab />}
        {activeTab === "faqs" && <FaqsTab />}
        {activeTab === "testimonials" && <TestimonialsTab />}
        {activeTab === "inquiries" && <InquiriesTab />}
      </main>
    </div>
  );
}
