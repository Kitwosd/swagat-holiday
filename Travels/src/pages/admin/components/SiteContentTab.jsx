import React, { useState, useEffect } from "react";
import { api } from "../../../services/api";
import { useData } from "../../../context/DataContext";
import { useLanguage } from "../../../context/LanguageContext"; // Ensure this is imported
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
  const { t, language } = useLanguage(); // Get global language and t function
  
  // Default the editing tab based on current global language
  const [activeLangTab, setActiveLangTab] = useState(language === "np" ? "np" : "en");

  // Sync the editing tab if the global language is toggled from the navbar/footer
  useEffect(() => {
    if (language === "np" || language === "ne") {
      setActiveLangTab("np");
    } else {
      setActiveLangTab("en");
    }
  }, [language]);

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

      setSuccessMsg(t("admin.siteContent.messages.saveSuccess"));
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      setErrorMsg(err.message || t("admin.siteContent.messages.saveError"));
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
            {t("admin.siteContent.langMode.title")}
          </span>
          <p className="text-[11px] text-slate-500">
            {t("admin.siteContent.langMode.description")}
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
            {t("admin.siteContent.langMode.enTab")}
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
            {t("admin.siteContent.langMode.npTab")}
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

      {/* 1. Hero Section Settings */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <LayoutTemplate className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {t("admin.siteContent.hero.title")}
              </h3>
              <p className="text-[11px] text-slate-500">
                {t("admin.siteContent.hero.subtitle")}
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
            <span>{t("admin.siteContent.hero.saveBtn")}</span>
          </button>
        </div>

        <div className="space-y-4">
          {activeLangTab === "en" ? (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t("admin.siteContent.hero.badgeLabel")}
                </label>
                <input
                  type="text"
                  value={heroData.badge || ""}
                  onChange={(e) =>
                    setHeroData({ ...heroData, badge: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  placeholder={t("admin.siteContent.hero.badgePlaceholder")}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t("admin.siteContent.hero.titleLabel")}
                </label>
                <input
                  type="text"
                  value={heroData.title || ""}
                  onChange={(e) =>
                    setHeroData({ ...heroData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                  placeholder={t("admin.siteContent.hero.titlePlaceholder")}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t("admin.siteContent.hero.subtitleLabel")}
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
                  {t("admin.siteContent.hero.badgeLabelNp")}
                </label>
                <input
                  type="text"
                  value={heroData.badge_np || ""}
                  onChange={(e) =>
                    setHeroData({ ...heroData, badge_np: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  placeholder={t("admin.siteContent.hero.badgePlaceholderNp")}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t("admin.siteContent.hero.titleLabelNp")}
                </label>
                <input
                  type="text"
                  value={heroData.title_np || ""}
                  onChange={(e) =>
                    setHeroData({ ...heroData, title_np: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                  placeholder={t("admin.siteContent.hero.titlePlaceholderNp")}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t("admin.siteContent.hero.subtitleLabelNp")}
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
            label={t("admin.siteContent.hero.imageLabel")}
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
                {t("admin.siteContent.stats.title")}
              </h3>
              <p className="text-[11px] text-slate-500">
                {t("admin.siteContent.stats.subtitle")}
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
            <span>{t("admin.siteContent.stats.saveBtn")}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {activeLangTab === "en" ? (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t("admin.siteContent.stats.expLabel")}
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
                  {t("admin.siteContent.stats.successLabel")}
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
                  {t("admin.siteContent.stats.trekkersLabel")}
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
                  {t("admin.siteContent.stats.ratingLabel")}
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
                  {t("admin.siteContent.stats.expLabelNp")}
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
                  {t("admin.siteContent.stats.successLabelNp")}
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
                  {t("admin.siteContent.stats.trekkersLabelNp")}
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
                  {t("admin.siteContent.stats.ratingLabelNp")}
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
                {t("admin.siteContent.contact.title")}
              </h3>
              <p className="text-[11px] text-slate-500">
                {t("admin.siteContent.contact.subtitle")}
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
            <span>{t("admin.siteContent.contact.saveBtn")}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t("admin.siteContent.contact.landlineLabel")}
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
              {t("admin.siteContent.contact.whatsappLabel")}
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
              {t("admin.siteContent.contact.emailLabel")}
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
              {t("admin.siteContent.contact.addressLabel")} {activeLangTab === "np" ? "(नेपालीमा)" : "(English)"}
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
              {t("admin.siteContent.contact.hoursLabel")} {activeLangTab === "np" ? "(नेपालीमा)" : "(English)"}
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
              {t("admin.siteContent.contact.emergencyLabel")} {activeLangTab === "np" ? "(नेपालीमा)" : "(English)"}
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
              {t("admin.siteContent.contact.mapLabel")}
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
              {t("admin.siteContent.contact.mapHelp")}
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