import React, { useState, useEffect } from "react";
import { api } from "../../../services/api";
import { useData } from "../../../context/DataContext";
import ImageUploadInput from "./ImageUploadInput";
import {
  Save,
  CheckCircle2,
  Loader2,
  Sparkles,
  Phone,
  Award,
  LayoutTemplate,
} from "lucide-react";

export default function SiteContentTab() {
  const { siteContent, updateSiteContentLocally, reloadData } = useData();
  const [activeLangTab, setActiveLangTab] = useState("en"); // "en" | "np"

  // Hero state
  const [heroData, setHeroData] = useState({
    badge: "Government Licensed • Sherpa Led • 100% Guaranteed Departures",
    badge_np: "नेपाल सरकारबाट मान्यता प्राप्त • शेर्पा नेतृत्व • १००% सुनिश्चित प्रस्थान",
    title: "Your Gateway to the Himalayas",
    title_np: "हिमालयको प्रवेशद्वारमा स्वागत छ",
    subtitle:
      "With years of experience, we craft unforgettable treks, tours and journeys that connect you directly to the heart of the Himalayas.",
    subtitle_np:
      "लामो अनुभवका साथ हामी तपाईंलाई हिमालयको हृदयसँग जोड्ने अविस्मरणीय पदयात्रा, टुर र साहसिक यात्राहरू प्रदान गर्दछौं।",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=85",
  });

  // Stats state
  const [statsData, setStatsData] = useState({
    experienceYears: "18+",
    experienceYears_np: "१८+",
    successRate: "99.4%",
    successRate_np: "९९.४%",
    trekkersGuided: "12,500+",
    trekkersGuided_np: "१२,५००+",
    averageRating: "4.98",
    averageRating_np: "४.९८",
  });

  // Contact info
  const [contactData, setContactData] = useState({
    phone: "+977-1-4700000",
    mobile: "+977-9851000000",
    email: "info@swagatholidays.com",
    address: "Thamel Marg, Kathmandu 44600, Nepal",
    address_np: "ठमेल मार्ग, काठमाडौं ४४६००, नेपाल",
    whatsapp: "+9779851000000",
    googleMapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.240403164478!2d85.30904037546738!3d27.70986277617997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fcb1555555%3A0x6b13b63b21625d97!2sThamel%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp",
    workingHours: "Sunday – Friday: 08:30 AM – 06:30 PM (NPT)",
    workingHours_np: "आइतबार – शुक्रबार: ०८:३० बिहान – ०६:३० साँझ (NPT)",
    emergencySupport: "24/7 On-Tour & Travel SOS Support",
    emergencySupport_np: "२४/७ अन-टुर तथा आपतकालीन उद्धार सहायता",
  });

  const [savingKey, setSavingKey] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (siteContent.hero_content) {
      setHeroData((prev) => ({ ...prev, ...siteContent.hero_content }));
    }
    if (siteContent.company_stats) {
      setStatsData((prev) => ({ ...prev, ...siteContent.company_stats }));
    }
    if (siteContent.contact_info) {
      setContactData((prev) => ({ ...prev, ...siteContent.contact_info }));
    }
  }, [siteContent]);

  const saveSection = async (key, data) => {
    try {
      setSavingKey(key);
      setErrorMsg("");
      setSuccessMsg("");

      await api.updateContent(key, data);
      updateSiteContentLocally(key, data);
      await reloadData();

      setSuccessMsg(`Section "${key}" updated successfully! Changes are live.`);
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      setErrorMsg(err.message || "Failed to update section content.");
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Language Switcher Bar for Admin Content Editing */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
            Content Language Mode
          </span>
          <p className="text-[11px] text-slate-500">
            Switch tabs to manage English or नेपाली (Nepali) dynamic content.
          </p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
          <button
            type="button"
            onClick={() => setActiveLangTab("en")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeLangTab === "en"
                ? "bg-brand-blue text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🇬🇧 English Content
          </button>
          <button
            type="button"
            onClick={() => setActiveLangTab("np")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeLangTab === "np"
                ? "bg-brand-blue text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🇳🇵 नेपाली (Nepali) Content
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}
      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
          {errorMsg}
        </div>
      )}
      {/* Top Banner */}
      {/* <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900">
          Dynamic Website Content & Assets
        </h2>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          Update homepage hero titles, background imagery, company statistics
          and office contact details in real-time. Changes are stored in MySQL
          and immediately reflect across the site.
        </p>

        {successMsg && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
            {errorMsg}
          </div>
        )}
      </div> */}

      {/* 1. Hero Section Settings */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <LayoutTemplate className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Homepage Hero Section
              </h3>
              <p className="text-[11px] text-slate-500">
                Headline, subtext, trust badge & main background
              </p>
            </div>
          </div>

          <button
            onClick={() => saveSection("hero_content", heroData)}
            disabled={savingKey === "hero_content"}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition disabled:opacity-50 cursor-pointer"
          >
            {savingKey === "hero_content" ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>Save Hero Changes</span>
          </button>
        </div>

        <div className="space-y-4">
          {activeLangTab === "en" ? (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Top Trust Badge Text (English)
                </label>
                <input
                  type="text"
                  value={heroData.badge || ""}
                  onChange={(e) =>
                    setHeroData({ ...heroData, badge: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  placeholder="e.g. Government Licensed • Sherpa Led • 100% Guaranteed Departures"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Hero Main Heading (English)
                </label>
                <input
                  type="text"
                  value={heroData.title || ""}
                  onChange={(e) =>
                    setHeroData({ ...heroData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                  placeholder="e.g. Your Gateway to the Himalayas"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Hero Tagline / Subtitle (English)
                </label>
                <textarea
                  rows={2}
                  value={heroData.subtitle || ""}
                  onChange={(e) =>
                    setHeroData({ ...heroData, subtitle: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Top Trust Badge Text (नेपालीमा)
                </label>
                <input
                  type="text"
                  value={heroData.badge_np || ""}
                  onChange={(e) =>
                    setHeroData({ ...heroData, badge_np: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  placeholder="उदाहरण: नेपाल सरकारबाट मान्यता प्राप्त • शेर्पा नेतृत्व"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Hero Main Heading (नेपालीमा मुख्य शीर्षक)
                </label>
                <input
                  type="text"
                  value={heroData.title_np || ""}
                  onChange={(e) =>
                    setHeroData({ ...heroData, title_np: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                  placeholder="उदाहरण: हिमालयको प्रवेशद्वारमा स्वागत छ"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Hero Tagline / Subtitle (नेपालीमा उप-शीर्षक)
                </label>
                <textarea
                  rows={2}
                  value={heroData.subtitle_np || ""}
                  onChange={(e) =>
                    setHeroData({ ...heroData, subtitle_np: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </>
          )}

          {/* Hero Background Image with Cloudinary Upload */}
          <ImageUploadInput
            label="Hero Background Wallpaper (Cloudinary / URL)"
            value={heroData.image}
            onChange={(url) => setHeroData({ ...heroData, image: url })}
          />
        </div>
      </div>

      {/* 2. Company Stats */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Animated Stats Counter
              </h3>
              <p className="text-[11px] text-slate-500">
                Key performance metrics shown beneath the hero
              </p>
            </div>
          </div>

          <button
            onClick={() => saveSection("company_stats", statsData)}
            disabled={savingKey === "company_stats"}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition disabled:opacity-50 cursor-pointer"
          >
            {savingKey === "company_stats" ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>Save Stats</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {activeLangTab === "en" ? (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Years of Experience (English)
                </label>
                <input
                  type="text"
                  value={statsData.experienceYears || ""}
                  onChange={(e) =>
                    setStatsData({ ...statsData, experienceYears: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  placeholder="18+"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Summit Success Rate (English)
                </label>
                <input
                  type="text"
                  value={statsData.successRate || ""}
                  onChange={(e) =>
                    setStatsData({ ...statsData, successRate: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  placeholder="99.4%"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Trekkers Guided Safely (English)
                </label>
                <input
                  type="text"
                  value={statsData.trekkersGuided || ""}
                  onChange={(e) =>
                    setStatsData({ ...statsData, trekkersGuided: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  placeholder="12,500+"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Average Client Rating (English)
                </label>
                <input
                  type="text"
                  value={statsData.averageRating || ""}
                  onChange={(e) =>
                    setStatsData({ ...statsData, averageRating: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  placeholder="4.98"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Years of Experience (नेपालीमा)
                </label>
                <input
                  type="text"
                  value={statsData.experienceYears_np || ""}
                  onChange={(e) =>
                    setStatsData({ ...statsData, experienceYears_np: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  placeholder="१८+"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Summit Success Rate (नेपालीमा)
                </label>
                <input
                  type="text"
                  value={statsData.successRate_np || ""}
                  onChange={(e) =>
                    setStatsData({ ...statsData, successRate_np: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  placeholder="९९.४%"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Trekkers Guided Safely (नेपालीमा)
                </label>
                <input
                  type="text"
                  value={statsData.trekkersGuided_np || ""}
                  onChange={(e) =>
                    setStatsData({ ...statsData, trekkersGuided_np: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  placeholder="१२,५००+"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Average Client Rating (नेपालीमा)
                </label>
                <input
                  type="text"
                  value={statsData.averageRating_np || ""}
                  onChange={(e) =>
                    setStatsData({ ...statsData, averageRating_np: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  placeholder="४.९८"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* 3. Contact & Office Info */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Company Contact & Location
              </h3>
              <p className="text-[11px] text-slate-500">
                Phone numbers, email addresses and office coordinates
              </p>
            </div>
          </div>

          <button
            onClick={() => saveSection("contact_info", contactData)}
            disabled={savingKey === "contact_info"}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition disabled:opacity-50 cursor-pointer"
          >
            {savingKey === "contact_info" ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>Save Contact Info</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Office Landline
            </label>
            <input
              type="text"
              value={contactData.phone || ""}
              onChange={(e) =>
                setContactData({ ...contactData, phone: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              WhatsApp / 24/7 Mobile
            </label>
            <input
              type="text"
              value={contactData.whatsapp || ""}
              onChange={(e) =>
                setContactData({ ...contactData, whatsapp: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Primary Email
            </label>
            <input
              type="email"
              value={contactData.email || ""}
              onChange={(e) =>
                setContactData({ ...contactData, email: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Physical Address {activeLangTab === "np" ? "(नेपालीमा)" : "(English)"}
            </label>
            {activeLangTab === "en" ? (
              <input
                type="text"
                value={contactData.address || ""}
                onChange={(e) =>
                  setContactData({ ...contactData, address: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            ) : (
              <input
                type="text"
                value={contactData.address_np || ""}
                onChange={(e) =>
                  setContactData({ ...contactData, address_np: e.target.value })
                }
                placeholder="ठमेल मार्ग, काठमाडौं ४४६००, नेपाल"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Office Working Hours {activeLangTab === "np" ? "(नेपालीमा)" : "(English)"}
            </label>
            {activeLangTab === "en" ? (
              <input
                type="text"
                value={contactData.workingHours || ""}
                onChange={(e) =>
                  setContactData({ ...contactData, workingHours: e.target.value })
                }
                placeholder="Sunday – Friday: 08:30 AM – 06:30 PM (NPT)"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            ) : (
              <input
                type="text"
                value={contactData.workingHours_np || ""}
                onChange={(e) =>
                  setContactData({ ...contactData, workingHours_np: e.target.value })
                }
                placeholder="आइतबार – शुक्रबार: ०८:३० बिहान – ०६:३० साँझ (NPT)"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Emergency Support Text {activeLangTab === "np" ? "(नेपालीमा)" : "(English)"}
            </label>
            {activeLangTab === "en" ? (
              <input
                type="text"
                value={contactData.emergencySupport || ""}
                onChange={(e) =>
                  setContactData({
                    ...contactData,
                    emergencySupport: e.target.value,
                  })
                }
                placeholder="24/7 On-Tour & Travel SOS Support"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            ) : (
              <input
                type="text"
                value={contactData.emergencySupport_np || ""}
                onChange={(e) =>
                  setContactData({
                    ...contactData,
                    emergencySupport_np: e.target.value,
                  })
                }
                placeholder="२४/७ अन-टुर तथा आपतकालीन उद्धार सहायता"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Google Maps Embed URL (iframe src)
            </label>
            <textarea
              rows={3}
              value={contactData.googleMapUrl || ""}
              onChange={(e) =>
                setContactData({ ...contactData, googleMapUrl: e.target.value })
              }
              placeholder="https://www.google.com/maps/embed?pb=..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Paste the{" "}
              <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">
                src
              </code>{" "}
              URL from Google Maps &gt; Share &gt; Embed a map.
            </p>

            {contactData.googleMapUrl && (
              <div className="mt-3 rounded-xl overflow-hidden border border-slate-200 shadow-sm aspect-video max-h-48">
                <iframe
                  title="Google Map Live Admin Preview"
                  src={contactData.googleMapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
