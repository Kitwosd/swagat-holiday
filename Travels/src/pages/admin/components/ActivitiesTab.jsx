import React, { useState } from "react";
import { api } from "../../../services/api";
import { useData } from "../../../context/DataContext";
import ImageUploadInput from "./ImageUploadInput";
import { Plus, Edit2, Trash2, X, Compass, Loader2 } from "lucide-react";

const emptyActivity = {
  id: "",
  slug: "",
  redirectUrl: "",
  title: "",
  subtitle: "",
  count: "10+ Trips",
  tier: 2,
  image:
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
  description: "",
  highlights: [],
  priceFrom: "$500",
  durationAvg: "7–12 Days",
};

export default function ActivitiesTab() {
  const { activities, reloadData } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAct, setEditingAct] = useState(null);
  const [formData, setFormData] = useState(emptyActivity);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [highlightsText, setHighlightsText] = useState("");

  const openCreateModal = () => {
    setEditingAct(null);
    setFormData({
      ...emptyActivity,
      id: `act-${Date.now()}`,
      slug: `activity-${Date.now()}`,
    });
    setHighlightsText("");
    setError("");
    setModalOpen(true);
  };

  const openEditModal = (act) => {
    setEditingAct(act);
    setFormData({ ...act });
    setHighlightsText(
      Array.isArray(act.highlights) ? act.highlights.join("\n") : "",
    );
    setError("");
    setModalOpen(true);
  };

  const handleDelete = async (idOrSlug, title) => {
    if (!window.confirm(`Delete activity "${title}"?`)) return;
    try {
      await api.deleteActivity(idOrSlug);
      await reloadData();
    } catch (err) {
      alert(`Error deleting activity: ${err.message}`);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const payload = {
        ...formData,
        tier: Number(formData.tier) || 2,
        highlights: highlightsText
          .split("\n")
          .map((h) => h.trim())
          .filter(Boolean),
      };

      if (editingAct) {
        await api.updateActivity(editingAct.id || editingAct.slug, payload);
      } else {
        await api.createActivity(payload);
      }

      await reloadData();
      setModalOpen(false);
    } catch (err) {
      setError(err.message || "Failed to save activity");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Adventurous Activities & Trip Styles
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage pyramid activity categories displayed on homepage and
            activities directory ({activities.length} activities)
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Activity</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {activities.map((act) => (
          <div
            key={act.id || act.slug}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col hover:shadow-md transition"
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={act.image}
                alt={act.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80";
                }}
              />
              <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-full">
                Tier {act.tier} Pyramid
              </div>
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-bold px-2.5 py-1 rounded-lg">
                From {act.priceFrom}
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{act.title}</span>
                </h3>
                <p className="text-xs text-amber-700 font-semibold mt-0.5">
                  {act.subtitle}
                </p>
                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  {act.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">
                  {act.count} • {act.durationAvg}
                </span>

                <div className="inline-flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(act)}
                    className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                    title="Edit Activity"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(act.id || act.slug, act.title)}
                    className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Delete Activity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-200 sticky top-0 bg-white z-10">
              <h3 className="text-base font-bold text-slate-900">
                {editingAct
                  ? `Edit Activity: ${editingAct.title}`
                  : "Add New Activity"}
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
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    placeholder="e.g. Helicopter Tours in Nepal"
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
                    placeholder="e.g. helicopter-tour"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, subtitle: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    placeholder="e.g. VIP Aerial Landings"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Pyramid Tier (1 = Apex, 2 = Mid, 3 = Base)
                  </label>
                  <select
                    value={formData.tier}
                    onChange={(e) =>
                      setFormData({ ...formData, tier: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                  >
                    <option value={1}>Tier 1 (Apex - 1 card)</option>
                    <option value={2}>Tier 2 (Middle - 3 cards)</option>
                    <option value={3}>Tier 3 (Base - 5 cards)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Price From
                  </label>
                  <input
                    type="text"
                    value={formData.priceFrom || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, priceFrom: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    placeholder="e.g. $950"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Average Duration
                  </label>
                  <input
                    type="text"
                    value={formData.durationAvg || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, durationAvg: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    placeholder="e.g. 3–5 Hours"
                  />
                </div>
              </div>

              <ImageUploadInput
                label="Activity Display Image"
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
              />

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingAct ? "Save Changes" : "Create Activity"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
