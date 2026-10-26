import React, { useState } from 'react';
import { api } from '../../../services/api';
import { useData } from '../../../context/DataContext';
import ImageUploadInput from './ImageUploadInput';
import { Plus, Edit2, Trash2, X, MapPin, Loader2 } from 'lucide-react';

const emptyDest = {
  id: '',
  slug: '',
  name: '',
  title: '',
  tag: '',
  elevation: '',
  tripsCount: 0,
  image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
  description: '',
  popularTreks: [],
  highlights: [],
};

export default function DestinationsTab() {
  const { destinations, reloadData } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDest, setEditingDest] = useState(null);
  const [formData, setFormData] = useState(emptyDest);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [highlightsText, setHighlightsText] = useState('');
  const [popularTreksText, setPopularTreksText] = useState('');

  const openCreateModal = () => {
    setEditingDest(null);
    setFormData({
      ...emptyDest,
      id: `region-${Date.now()}`,
      slug: `region-${Date.now()}`,
    });
    setHighlightsText('');
    setPopularTreksText('');
    setError('');
    setModalOpen(true);
  };

  const openEditModal = (dest) => {
    setEditingDest(dest);
    setFormData({ ...dest });
    setHighlightsText(Array.isArray(dest.highlights) ? dest.highlights.join('\n') : '');
    setPopularTreksText(Array.isArray(dest.popularTreks) ? dest.popularTreks.join('\n') : '');
    setError('');
    setModalOpen(true);
  };

  const handleDelete = async (idOrSlug, name) => {
    if (!window.confirm(`Delete region "${name}"?`)) return;
    try {
      await api.deleteDestination(idOrSlug);
      await reloadData();
    } catch (err) {
      alert(`Error deleting destination: ${err.message}`);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const payload = {
        ...formData,
        tripsCount: Number(formData.tripsCount) || 0,
        highlights: highlightsText.split('\n').map((s) => s.trim()).filter(Boolean),
        popularTreks: popularTreksText.split('\n').map((s) => s.trim()).filter(Boolean),
      };

      if (editingDest) {
        await api.updateDestination(editingDest.id || editingDest.slug, payload);
      } else {
        await api.createDestination(payload);
      }

      await reloadData();
      setModalOpen(false);
    } catch (err) {
      setError(err.message || 'Failed to save destination');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Himalayan Destinations & Regions</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage regions displayed on homepage interactive map and regions showcase ({destinations.length} regions)
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Region</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {destinations.map((dest) => (
          <div
            key={dest.id || dest.slug}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col hover:shadow-md transition"
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80';
                }}
              />
              <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                {dest.tag || 'Himalayan Region'}
              </div>
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-bold px-2.5 py-1 rounded-lg">
                {dest.elevation || 'High Altitude'}
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{dest.name}</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{dest.title}</p>
                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  {dest.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">
                  {dest.tripsCount || 0} Package Trips
                </span>

                <div className="inline-flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(dest)}
                    className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                    title="Edit Region"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(dest.id || dest.slug, dest.name)}
                    className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Delete Region"
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
                {editingDest ? `Edit Region: ${editingDest.name}` : 'Add New Himalayan Region'}
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Region Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    placeholder="e.g. Everest Region"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Slug *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    placeholder="e.g. everest-region"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle / Title</label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    placeholder="e.g. Khumbu Valley & Mount Everest"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tagline</label>
                  <input
                    type="text"
                    value={formData.tag || ''}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    placeholder="e.g. Highest Peaks on Earth"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Max Elevation</label>
                  <input
                    type="text"
                    value={formData.elevation || ''}
                    onChange={(e) => setFormData({ ...formData, elevation: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    placeholder="e.g. 8,848 m"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Trips Count</label>
                  <input
                    type="number"
                    value={formData.tripsCount || 0}
                    onChange={(e) => setFormData({ ...formData, tripsCount: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <ImageUploadInput
                label="Region Hero Image"
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
              />

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Highlights (one per line)
                </label>
                <textarea
                  rows={2}
                  value={highlightsText}
                  onChange={(e) => setHighlightsText(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  placeholder="Namche Bazaar&#10;Tengboche Monastery&#10;Kala Patthar"
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
                  <span>{editingDest ? 'Save Changes' : 'Create Region'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
