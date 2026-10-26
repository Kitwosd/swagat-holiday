import React, { useState } from "react";
import { api } from "../../../services/api";
import { useData } from "../../../context/DataContext";
import ImageUploadInput from "./ImageUploadInput";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Star,
  Quote,
  CheckCircle2,
  Loader2,
  Save,
  MessageSquareQuote,
  Sparkles,
} from "lucide-react";

const emptyReview = {
  id: null,
  name: "",
  country: "",
  trip: "",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  rating: 5,
  quote: "",
  date: "October 2026",
  verified: true,
};

export default function TestimonialsTab() {
  const { reviews, siteContent, updateSiteContentLocally, reloadData } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [formData, setFormData] = useState(emptyReview);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Section Header Data
  const [sectionData, setSectionData] = useState({
    title: "What Our Travelers Say",
    title_np: "हाम्रा यात्रुहरूको अनुभव",
    subtitle:
      "Real feedback from travelers, first-time explorers, and families who traveled the high Himalayas with Swagat Holidays & Travels.",
    subtitle_np:
      "स्वागत होलिडेजसँग हिमालयको यात्रा गरेका यात्रुहरू र परिवारहरूको वास्तविक प्रतिक्रिया।",
    ratingBadge: "5.0 / 5.0",
    rankText: "Ranked #1 on TripAdvisor & Google Reviews",
    rankText_np: "ट्रिपएडभाइजर र गुगल समीक्षामा नम्बर १",
  });
  const [savingSection, setSavingSection] = useState(false);
  const [sectionSuccess, setSectionSuccess] = useState("");

  React.useEffect(() => {
    if (siteContent?.testimonials_section) {
      setSectionData((prev) => ({ ...prev, ...siteContent.testimonials_section }));
    }
  }, [siteContent]);

  const saveSectionHeader = async (e) => {
    e.preventDefault();
    try {
      setSavingSection(true);
      await api.updateContent("testimonials_section", sectionData);
      updateSiteContentLocally("testimonials_section", sectionData);
      setSectionSuccess("Testimonials header updated live!");
      setTimeout(() => setSectionSuccess(""), 4000);
    } catch (err) {
      alert(`Error updating header: ${err.message}`);
    } finally {
      setSavingSection(false);
    }
  };

  const openCreateModal = () => {
    setEditingReview(null);
    setFormData({
      ...emptyReview,
      date: new Date().toLocaleString("en-US", { month: "long", year: "numeric" }),
    });
    setError("");
    setModalOpen(true);
  };

  const openEditModal = (rev) => {
    setEditingReview(rev);
    setFormData({
      ...rev,
      rating: Number(rev.rating) || 5,
      verified: rev.verified !== false,
    });
    setError("");
    setModalOpen(true);
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete review from "${name}"?`)) return;
    try {
      await api.deleteReview(id);
      await reloadData();
    } catch (err) {
      alert(`Error deleting review: ${err.message}`);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const payload = {
        name: formData.name.trim(),
        country: formData.country.trim(),
        trip: formData.trip.trim(),
        avatar: formData.avatar,
        rating: Number(formData.rating) || 5,
        quote: formData.quote.trim(),
        date: formData.date.trim(),
        verified: Boolean(formData.verified),
      };

      if (!payload.name || !payload.quote) {
        throw new Error("Guest name and testimonial quote are required.");
      }

      if (editingReview?.id) {
        await api.updateReview(editingReview.id, payload);
      } else {
        await api.createReview(payload);
      }

      await reloadData();
      setModalOpen(false);
    } catch (err) {
      setError(err.message || "Failed to save review");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Guest Testimonials & Reviews
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage customer feedback displayed on the homepage. Edit quotes, ratings, guest country flags, and header copy.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Testimonial</span>
        </button>
      </div>

      {/* Section Header Controls */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <MessageSquareQuote className="w-4 h-4 text-brand-gold" />
            <h3 className="text-sm font-bold text-slate-900">
              Section Header & Badges
            </h3>
          </div>
          {sectionSuccess && (
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> {sectionSuccess}
            </span>
          )}
        </div>

        <form onSubmit={saveSectionHeader} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Section Heading
              </label>
              <input
                type="text"
                value={sectionData.title || ""}
                onChange={(e) =>
                  setSectionData({ ...sectionData, title: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Rating Badge
                </label>
                <input
                  type="text"
                  value={sectionData.ratingBadge || ""}
                  onChange={(e) =>
                    setSectionData({ ...sectionData, ratingBadge: e.target.value })
                  }
                  placeholder="5.0 / 5.0"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Rank / Platform Text
                </label>
                <input
                  type="text"
                  value={sectionData.rankText || ""}
                  onChange={(e) =>
                    setSectionData({ ...sectionData, rankText: e.target.value })
                  }
                  placeholder="Ranked #1 on TripAdvisor"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Section Subtitle / Description
            </label>
            <textarea
              rows={2}
              value={sectionData.subtitle || ""}
              onChange={(e) =>
                setSectionData({ ...sectionData, subtitle: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            />
          </div>

          <button
            type="submit"
            disabled={savingSection}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition disabled:opacity-50 cursor-pointer"
          >
            {savingSection ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>Save Section Header</span>
          </button>
        </form>
      </div>

      {/* Testimonials Grid / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex text-amber-400">
                  {[...Array(Number(rev.rating) || 5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[11px] text-slate-400 mr-2">{rev.date}</span>
                  <button
                    onClick={() => openEditModal(rev)}
                    className="p-1 text-slate-400 hover:text-brand-blue rounded hover:bg-slate-100 transition"
                    title="Edit Review"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(rev.id, rev.name)}
                    className="p-1 text-slate-400 hover:text-red-600 rounded hover:bg-slate-100 transition"
                    title="Delete Review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-700 italic leading-relaxed mb-4">
                "{rev.quote}"
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-9 h-9 rounded-full object-cover border border-brand-gold/40 shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <span className="truncate">{rev.name}</span>
                    {rev.verified && (
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    )}
                  </h4>
                  <span className="text-[10px] text-slate-500 block truncate">
                    {rev.country}
                  </span>
                </div>
              </div>

              <span className="text-[10px] font-semibold text-brand-blue bg-blue-50 px-2 py-0.5 rounded shrink-0">
                {rev.trip}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 relative my-8">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {editingReview ? "Edit Testimonial" : "Add New Testimonial"}
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Fill in client experience details and quote.
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                {error}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Traveler Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Marcus Lindqvist"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Country & Flag
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    placeholder="e.g. Sweden 🇸🇪"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Trip / Package Completed
                  </label>
                  <input
                    type="text"
                    value={formData.trip}
                    onChange={(e) =>
                      setFormData({ ...formData, trip: e.target.value })
                    }
                    placeholder="e.g. Everest Base Camp 14-Days"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Date / Month
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    placeholder="e.g. October 2026"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Star Rating (1 - 5)
                  </label>
                  <select
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({ ...formData, rating: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                    <option value={2}>⭐⭐ (2 Stars)</option>
                    <option value={1}>⭐ (1 Star)</option>
                  </select>
                </div>

                <div className="pt-5">
                  <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={formData.verified}
                      onChange={(e) =>
                        setFormData({ ...formData, verified: e.target.checked })
                      }
                      className="rounded border-slate-300 text-brand-gold focus:ring-brand-gold"
                    />
                    <span>Verified Traveler Badge</span>
                  </label>
                </div>
              </div>

              <ImageUploadInput
                label="Traveler Avatar Photo"
                value={formData.avatar}
                onChange={(url) => setFormData({ ...formData, avatar: url })}
              />

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Testimonial Quote *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.quote}
                  onChange={(e) =>
                    setFormData({ ...formData, quote: e.target.value })
                  }
                  placeholder="What did the client say about their journey, guide, and experience?"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-brand-gold hover:bg-brand-gold-dark text-white text-xs font-bold rounded-xl shadow transition disabled:opacity-50"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingReview ? "Save Changes" : "Create Review"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
