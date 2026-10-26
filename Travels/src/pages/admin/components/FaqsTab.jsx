import React, { useState } from "react";
import { api } from "../../../services/api";
import { useData } from "../../../context/DataContext";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  HelpCircle,
  Loader2,
  Save,
  Tag,
  Languages,
} from "lucide-react";

const emptyFaq = {
  id: null,
  question: "",
  question_np: "",
  answer: "",
  answer_np: "",
  category: "General",
  category_np: "सामान्य",
  orderIndex: 0,
};

const CATEGORIES = [
  "General",
  "Trekking & Permits",
  "Safety & Health",
  "Gear & Packing",
  "Booking & Payment",
  "Transportation",
];

export default function FaqsTab() {
  const { faqs, reloadData } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [formData, setFormData] = useState(emptyFaq);
  const [activeFormTab, setActiveFormTab] = useState("en"); // "en" | "np"
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const categories = React.useMemo(() => {
    const set = new Set(CATEGORIES);
    (faqs || []).forEach((f) => {
      if (f.category) set.add(f.category);
    });
    return Array.from(set);
  }, [faqs]);

  const filteredFaqs = (faqs || []).filter((item) => {
    const matchesSearch =
      item.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.question_np?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer_np?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat =
      selectedCategory === "all" ||
      (item.category || "General").toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  const openCreateModal = () => {
    setEditingFaq(null);
    setFormData({
      ...emptyFaq,
      orderIndex: (faqs?.length || 0) + 1,
    });
    setActiveFormTab("en");
    setError("");
    setModalOpen(true);
  };

  const openEditModal = (faq) => {
    setEditingFaq(faq);
    setFormData({
      id: faq.id,
      question: faq.question || "",
      question_np: faq.question_np || "",
      answer: faq.answer || "",
      answer_np: faq.answer_np || "",
      category: faq.category || "General",
      category_np: faq.category_np || "सामान्य",
      orderIndex: faq.orderIndex ?? 0,
    });
    setActiveFormTab("en");
    setError("");
    setModalOpen(true);
  };

  const handleDelete = async (id, question) => {
    if (!window.confirm(`Are you sure you want to delete this FAQ: "${question.slice(0, 40)}..."?`)) {
      return;
    }
    try {
      await api.deleteFaq(id);
      await reloadData();
    } catch (err) {
      alert(`Error deleting FAQ: ${err.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim()) {
      setError("Please provide at least the English question and answer.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        question: formData.question.trim(),
        question_np: formData.question_np ? formData.question_np.trim() : null,
        answer: formData.answer.trim(),
        answer_np: formData.answer_np ? formData.answer_np.trim() : null,
        category: formData.category || "General",
        category_np: formData.category_np || null,
        orderIndex: Number(formData.orderIndex) || 0,
      };

      if (editingFaq) {
        await api.updateFaq(editingFaq.id, payload);
      } else {
        await api.createFaq(payload);
      }

      await reloadData();
      setModalOpen(false);
    } catch (err) {
      setError(err.message || "Failed to save FAQ.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <HelpCircle className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions (FAQs)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage FAQs in both <span className="font-semibold text-slate-700">English</span> and <span className="font-semibold text-slate-700">नेपाली (Nepali)</span> with dynamic site switching.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-slate-950 font-bold text-sm shadow-sm hover:shadow transition transform hover:-translate-y-0.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions or answers (EN / NP)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-brand-gold"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              selectedCategory === "all"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Categories ({faqs?.length || 0})
          </button>
          {categories.map((cat) => {
            const count = (faqs || []).filter(
              (f) => (f.category || "General").toLowerCase() === cat.toLowerCase()
            ).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* FAQ Cards List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No FAQs Found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {searchTerm || selectedCategory !== "all"
                ? "Try adjusting your search or category filter to find what you are looking for."
                : "Get started by adding your first FAQ question for travelers."}
            </p>
            <button
              onClick={openCreateModal}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add FAQ
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq, index) => (
            <div
              key={faq.id || index}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 transition flex flex-col md:flex-row md:items-start justify-between gap-4 group"
            >
              <div className="space-y-2.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200/60">
                    <Tag className="w-3 h-3 text-amber-600" />
                    {faq.category || "General"}
                    {faq.category_np && <span className="text-amber-600/80"> / {faq.category_np}</span>}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono text-slate-400 bg-slate-100">
                    Order #{faq.orderIndex ?? index}
                  </span>
                  {faq.question_np && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100">
                      🇳🇵 Nepali Available
                    </span>
                  )}
                </div>

                {/* English Version */}
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-0.5">English</span>
                  <h3 className="text-base font-bold text-slate-900">
                    {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line mt-1">
                    {faq.answer}
                  </p>
                </div>

                {/* Nepali Version (if provided) */}
                {faq.question_np && (
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-indigo-500 block tracking-wider mb-0.5">नेपाली (Nepali)</span>
                    <h4 className="text-sm font-bold text-slate-800">
                      {faq.question_np}
                    </h4>
                    {faq.answer_np && (
                      <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line mt-0.5">
                        {faq.answer_np}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-start pt-2 md:pt-0">
                <button
                  onClick={() => openEditModal(faq)}
                  className="p-2 rounded-xl text-slate-500 hover:text-brand-blue hover:bg-blue-50 border border-slate-200 transition cursor-pointer"
                  title="Edit FAQ"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(faq.id, faq.question)}
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition cursor-pointer"
                  title="Delete FAQ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">
                  {editingFaq ? "Edit FAQ Item" : "Create New FAQ"}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Provide English and optional Nepali translation for seamless bilingual support.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Language Tab Switcher */}
            <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2">
              <button
                type="button"
                onClick={() => setActiveFormTab("en")}
                className={`pb-2.5 px-3 text-xs font-bold transition flex items-center gap-1.5 border-b-2 cursor-pointer ${
                  activeFormTab === "en"
                    ? "border-brand-blue text-brand-blue"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <span>🇬🇧 English</span>
                <span className="text-[10px] text-rose-500 font-bold">*</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveFormTab("np")}
                className={`pb-2.5 px-3 text-xs font-bold transition flex items-center gap-1.5 border-b-2 cursor-pointer ${
                  activeFormTab === "np"
                    ? "border-brand-blue text-brand-blue"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <span>🇳🇵 नेपाली (Nepali)</span>
                {formData.question_np && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                )}
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                  {error}
                </div>
              )}

              {/* English Fields */}
              {activeFormTab === "en" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Question (English) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Do I need trekking permits for the Annapurna Circuit?"
                      value={formData.question}
                      onChange={(e) =>
                        setFormData({ ...formData, question: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Answer (English) *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Provide a comprehensive answer for travelers..."
                      value={formData.answer}
                      onChange={(e) =>
                        setFormData({ ...formData, answer: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-brand-gold leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Category (English)
                      </label>
                      <input
                        type="text"
                        list="category-suggestions"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        placeholder="General"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-brand-gold"
                      />
                      <datalist id="category-suggestions">
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c} />
                        ))}
                      </datalist>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Display Order Index
                      </label>
                      <input
                        type="number"
                        value={formData.orderIndex}
                        onChange={(e) =>
                          setFormData({ ...formData, orderIndex: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-brand-gold"
                      />
                      <span className="text-[10px] text-slate-400 mt-0.5 block">
                        Lower numbers appear first.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Nepali Fields */}
              {activeFormTab === "np" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Question in Nepali (नेपालीमा प्रश्न)
                    </label>
                    <input
                      type="text"
                      placeholder="उदाहरण: अन्नपूर्ण पदयात्राको लागि अनुमति पत्र चाहिन्छ?"
                      value={formData.question_np}
                      onChange={(e) =>
                        setFormData({ ...formData, question_np: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Answer in Nepali (नेपालीमा उत्तर)
                    </label>
                    <textarea
                      rows={5}
                      placeholder="नेपालीमा विस्तृत उत्तर लेख्नुहोस्..."
                      value={formData.answer_np}
                      onChange={(e) =>
                        setFormData({ ...formData, answer_np: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-brand-gold leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Category in Nepali (नेपालीमा वर्ग)
                    </label>
                    <input
                      type="text"
                      value={formData.category_np}
                      onChange={(e) =>
                        setFormData({ ...formData, category_np: e.target.value })
                      }
                      placeholder="सामान्य / पदयात्रा र अनुमति / सुरक्षा र स्वास्थ्य"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setActiveFormTab(activeFormTab === "en" ? "np" : "en")
                  }
                  className="text-xs text-brand-blue hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Languages className="w-3.5 h-3.5" />
                  <span>
                    Switch to {activeFormTab === "en" ? "नेपाली (Nepali)" : "English"} Fields
                  </span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-bold rounded-xl shadow transition cursor-pointer disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>{editingFaq ? "Save Changes" : "Create FAQ"}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
