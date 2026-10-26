import React, { useState } from "react";
import { api } from "../../../services/api";
import { useData } from "../../../context/DataContext";
import ImageUploadInput from "./ImageUploadInput";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Check,
  Mountain,
  Clock,
  DollarSign,
  Loader2,
} from "lucide-react";

const emptyTrip = {
  id: "",
  slug: "",
  title: "",
  region: "Everest Region",
  regionSlug: "everest-region",
  category: "trek",
  duration: "14 Days",
  durationDays: 14,
  maxAltitude: "5,364 m / 17,598 ft",
  maxAltitudeNum: 5364,
  difficulty: "Moderate to Strenuous",
  difficultyLevel: "strenuous",
  rating: 5.0,
  reviewsCount: 1,
  regularPrice: 1450,
  salePrice: 1290,
  featured: false,
  badge: "Best Seller 2026",
  image:
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
  overview: "",
  bestSeason: "Mar – May & Sep – Dec",
  groupSize: "2 – 12 Trekkers",
  startEnd: "Kathmandu to Kathmandu",
  highlights: [],
  itinerary: [],
  included: [],
  excluded: [],
};

/** array -> newline text for textarea */
const arrayToText = (value) => {
  if (!Array.isArray(value)) return "";
  return value
    .map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object") {
        return item.text ?? item.title ?? item.desc ?? item.description ?? "";
      }
      return String(item ?? "");
    })
    .filter(Boolean)
    .join("\n");
};

/** newline text -> clean string[] */
const textToArray = (text) =>
  (text || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

/**
 * Normalizes any itinerary shape into the canonical
 * { day, title, desc } shape used by the API.
 */
const normalizeItinerary = (itinerary) => {
  if (!Array.isArray(itinerary)) return [];

  return itinerary.map((item, idx) => {
    if (typeof item === "string") {
      return { day: idx + 1, title: item, desc: "" };
    }
    if (!item || typeof item !== "object") {
      return { day: idx + 1, title: "", desc: "" };
    }

    // Accept common aliases but always output { day, title, desc }
    const { dayNumber, heading, name, description, details, text, ...rest } =
      item;

    return {
      ...rest,
      day: item.day ?? dayNumber ?? idx + 1,
      title: item.title ?? heading ?? name ?? "",
      desc: item.desc ?? description ?? details ?? text ?? "",
    };
  });
};

export default function TripsTab() {
  const { trips, destinations, reloadData } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [formData, setFormData] = useState(emptyTrip);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [highlightsText, setHighlightsText] = useState("");
  const [includedText, setIncludedText] = useState("");
  const [excludedText, setExcludedText] = useState("");

  const filteredTrips = trips.filter(
    (t) =>
      t.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.region?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const openCreateModal = () => {
    setEditingTrip(null);
    setFormData({
      ...emptyTrip,
      id: `trip-${Date.now()}`,
      slug: `custom-trek-${Date.now()}`,
    });
    setHighlightsText("");
    setIncludedText("");
    setExcludedText("");
    setError("");
    setModalOpen(true);
  };

  const openEditModal = (trip) => {
    setEditingTrip(trip);
    setFormData({
      ...trip,
      itinerary: normalizeItinerary(trip.itinerary),
    });
    setHighlightsText(arrayToText(trip.highlights));
    setIncludedText(arrayToText(trip.included));
    setExcludedText(arrayToText(trip.excluded));
    setError("");
    setModalOpen(true);
  };

  /* ---------- Itinerary helpers ---------- */

  const addItineraryDay = () => {
    setFormData((prev) => {
      const list = Array.isArray(prev.itinerary) ? prev.itinerary : [];
      return {
        ...prev,
        itinerary: [...list, { day: list.length + 1, title: "", desc: "" }],
      };
    });
  };

  const updateItineraryDay = (index, field, value) => {
    setFormData((prev) => {
      const list = Array.isArray(prev.itinerary) ? [...prev.itinerary] : [];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, itinerary: list };
    });
  };

  const removeItineraryDay = (index) => {
    setFormData((prev) => {
      const list = Array.isArray(prev.itinerary) ? [...prev.itinerary] : [];
      return {
        ...prev,
        itinerary: list
          .filter((_, i) => i !== index)
          .map((item, i) => ({ ...item, day: i + 1 })),
      };
    });
  };

  const handleDelete = async (idOrSlug, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await api.deleteTrip(idOrSlug);
      await reloadData();
    } catch (err) {
      alert(`Error deleting trip: ${err.message}`);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const itinerary = (
        Array.isArray(formData.itinerary) ? formData.itinerary : []
      )
        .map((item, idx) => ({
          day: Number(item.day) || idx + 1,
          title: (item.title || "").trim(),
          desc: (item.desc || "").trim(),
        }))
        .filter((item) => item.title || item.desc)
        .map((item, idx) => ({ ...item, day: item.day || idx + 1 }));

      const payload = {
        ...formData,
        durationDays: Number(formData.durationDays) || 1,
        maxAltitudeNum: Number(formData.maxAltitudeNum) || 0,
        regularPrice: Number(formData.regularPrice) || 0,
        salePrice:
          Number(formData.salePrice) || Number(formData.regularPrice) || 0,
        highlights: textToArray(highlightsText),
        included: textToArray(includedText),
        excluded: textToArray(excludedText),
        itinerary,
      };

      if (editingTrip) {
        await api.updateTrip(editingTrip.id || editingTrip.slug, payload);
      } else {
        await api.createTrip(payload);
      }

      await reloadData();
      setModalOpen(false);
    } catch (err) {
      setError(err.message || "Failed to save trip");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Trekking & Tour Packages
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage packages, pricing, itineraries, and featured badges (
            {trips.length} active trips)
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title or region..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 w-full sm:w-64"
            />
          </div>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Trip</span>
          </button>
        </div>
      </div>

      {/* Trips Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 uppercase font-semibold text-[11px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Trip Info</th>
                <th className="py-3.5 px-4">Region</th>
                <th className="py-3.5 px-4">Duration & Altitude</th>
                <th className="py-3.5 px-4">Pricing</th>
                <th className="py-3.5 px-4">Badge / Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTrips.map((trip) => (
                <tr
                  key={trip.id || trip.slug}
                  className="hover:bg-slate-50/80 transition"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={trip.image}
                        alt={trip.title}
                        className="w-12 h-10 object-cover rounded-lg border border-slate-200 shrink-0"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=200&q=80";
                        }}
                      />
                      <div className="min-w-0">
                        <span className="font-bold text-slate-900 block truncate max-w-xs sm:max-w-sm">
                          {trip.title}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          ID: {trip.id}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md font-medium text-[11px]">
                      {trip.region}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1 text-slate-700 font-medium">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{trip.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500 text-[11px]">
                        <Mountain className="w-3 h-3 text-slate-400" />
                        <span>{trip.maxAltitude}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">
                      ${trip.salePrice || trip.regularPrice}
                      {trip.salePrice && trip.salePrice < trip.regularPrice && (
                        <span className="text-[11px] text-slate-400 line-through ml-1.5 font-normal">
                          ${trip.regularPrice}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col gap-1 items-start">
                      {trip.badge && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                          {trip.badge}
                        </span>
                      )}
                      {trip.featured && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => openEditModal(trip)}
                        className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                        title="Edit Trip"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(trip.id || trip.slug, trip.title)
                        }
                        className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete Trip"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTrips.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-400">
                    No trips match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-200 sticky top-0 bg-white z-10">
              <h3 className="text-base font-bold text-slate-900">
                {editingTrip
                  ? `Edit Trip: ${editingTrip.title}`
                  : "Add New Trip Package"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Trip Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    placeholder="e.g. Everest Base Camp Trek 14-Days"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    placeholder="e.g. everest-base-camp-trek-14-days"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Region *
                  </label>
                  <input
                    type="text"
                    required
                    list="regions-datalist"
                    value={formData.region}
                    onChange={(e) => {
                      const val = e.target.value;
                      const matchedDest = destinations?.find(
                        (d) => d.name?.toLowerCase() === val.toLowerCase()
                      );
                      setFormData({
                        ...formData,
                        region: val,
                        regionSlug: matchedDest
                          ? matchedDest.slug || matchedDest.id
                          : val.toLowerCase().replace(/\s+/g, "-"),
                      });
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    placeholder="e.g. Everest Region"
                  />
                  <datalist id="regions-datalist">
                    {destinations?.map((d) => (
                      <option key={d.id || d.slug} value={d.name} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                  >
                    <option value="trek">Trek</option>
                    <option value="short-trek">Short Trek</option>
                    <option value="tour">Tour</option>
                    <option value="heli">Heli Tour</option>
                    <option value="adventure">Peak Climbing / Adventure</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Duration Text
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    placeholder="e.g. 14 Days"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Duration Days (Number)
                  </label>
                  <input
                    type="number"
                    value={formData.durationDays}
                    onChange={(e) =>
                      setFormData({ ...formData, durationDays: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Regular Price ($)
                  </label>
                  <input
                    type="number"
                    value={formData.regularPrice}
                    onChange={(e) =>
                      setFormData({ ...formData, regularPrice: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Sale Price ($)
                  </label>
                  <input
                    type="number"
                    value={formData.salePrice}
                    onChange={(e) =>
                      setFormData({ ...formData, salePrice: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Max Altitude
                  </label>
                  <input
                    type="text"
                    value={formData.maxAltitude}
                    onChange={(e) =>
                      setFormData({ ...formData, maxAltitude: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    placeholder="e.g. 5,364 m / 17,598 ft"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Badge Text
                  </label>
                  <input
                    type="text"
                    value={formData.badge || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, badge: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    placeholder="e.g. Best Seller 2026"
                  />
                </div>
              </div>

              <ImageUploadInput
                label="Primary Trip Image"
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
              />

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Trip Overview
                </label>
                <textarea
                  rows={3}
                  value={formData.overview || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, overview: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  placeholder="Comprehensive description of the route, highlights, and journey..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Highlights (one per line)
                </label>
                <textarea
                  rows={3}
                  value={highlightsText}
                  onChange={(e) => setHighlightsText(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-sans"
                  placeholder="Scenic mountain flight into Lukla&#10;Acclimatization in Namche Bazaar&#10;Everest Base Camp celebratory moment"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  What's Included (one per line)
                </label>
                <textarea
                  rows={3}
                  value={includedText}
                  onChange={(e) => setIncludedText(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-sans"
                  placeholder="Airport pick-up and drop-off&#10;3 meals a day during the trek&#10;Licensed English-speaking guide&#10;Teahouse accommodation"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  What's Excluded (one per line)
                </label>
                <textarea
                  rows={3}
                  value={excludedText}
                  onChange={(e) => setExcludedText(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-sans"
                  placeholder="International flights&#10;Nepal entry visa fee&#10;Travel insurance&#10;Personal expenses and tips"
                />
              </div>

              {/* Itinerary */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Itinerary (day by day)
                  </label>
                  <button
                    type="button"
                    onClick={addItineraryDay}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 hover:text-amber-700 transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Day</span>
                  </button>
                </div>

                {Array.isArray(formData.itinerary) &&
                formData.itinerary.length > 0 ? (
                  <div className="space-y-2">
                    {formData.itinerary.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="1"
                            value={item.day ?? idx + 1}
                            onChange={(e) =>
                              updateItineraryDay(idx, "day", e.target.value)
                            }
                            className="w-16 shrink-0 px-3 py-2 border border-slate-300 rounded-lg text-xs"
                            placeholder="Day"
                            title="Day number"
                          />
                          <input
                            type="text"
                            value={item.title || ""}
                            onChange={(e) =>
                              updateItineraryDay(idx, "title", e.target.value)
                            }
                            className="flex-1 min-w-0 px-3 py-2 border border-slate-300 rounded-lg text-xs"
                            placeholder="Day title, e.g. Drive Kathmandu to Besisahar"
                          />
                          <button
                            type="button"
                            onClick={() => removeItineraryDay(idx)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition shrink-0"
                            title="Remove Day"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <textarea
                          rows={2}
                          value={item.desc || ""}
                          onChange={(e) =>
                            updateItineraryDay(idx, "desc", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-sans"
                          placeholder="What happens on this day..."
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-400 italic py-1">
                    No itinerary days yet. Click "Add Day" to build the
                    day-by-day plan.
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                  className="w-4 h-4 text-amber-500 rounded border-slate-300 focus:ring-amber-400"
                />
                <label
                  htmlFor="featuredToggle"
                  className="text-xs font-bold text-slate-700 cursor-pointer"
                >
                  Feature this trip on homepage & best-seller carousel
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
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
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingTrip ? "Save Changes" : "Create Package"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
