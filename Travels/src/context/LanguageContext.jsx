import React, { createContext, useContext, useState, useEffect } from "react";

export const translations = {
  en: {
    // Header & Announcement
    announcement: "NTB & TAAN Registered Operator",
    adminPortal: "Admin Portal",
    customInquiry: "Custom Inquiry",
    emergencySupport: "24/7 Mountain SOS Support",
    planYourTrip: "Plan Your Trip",
    searchPlaceholder: "Search treks, regions, tours...",

    // Navigation
    nav: {
      home: "Home",
      nepalTravels: "Nepal Travels",
      nepalTours: "Nepal Tours",
      travelInfo: "Travel Info",
      company: "Company",
      contact: "Contact",
      regions: "Regions",
      allDestinations: "View All Destinations & Map",
      allTours: "All Nepal Tours",
      culturalTours: "Cultural & Heritage Sightseeing",
      chitwanSafari: "Chitwan Jungle Safari",
      heliTours: "Helicopter Tours in Nepal",
      activities: "Adventurous Activities",
      aboutUs: "About Swagat Holidays",
      whyUs: "Why Travel with Us?",
      reviews: "Traveler Reviews",
      tailoredTrekPrompt: "Want a tailored private trek? Certified Sherpa guides.",
      customize: "Customize",
    },

    // Hero Section
    hero: {
      defaultBadge: "Government Licensed • Sherpa Led • 100% Guaranteed Departures",
      defaultTitle: "Your Gateway to the Himalayas",
      defaultSubtitle: "With years of experience, we craft unforgettable treks, tours and journeys that connect you directly to the heart of the Himalayas.",
      exploreTreks: "Explore Treks",
      planCustomTrip: "Plan Custom Trip",
      destination: "Destination",
      selectRegion: "Select Region",
      activity: "Activity",
      selectActivity: "Select Activity",
      duration: "Duration",
      anyDuration: "Any Duration",
      searchTrips: "Search Trips",
      days1_5: "1 - 5 Days",
      days6_10: "6 - 10 Days",
      days11_15: "11 - 15 Days",
      days16Plus: "16+ Days",
    },

    // Stats
    stats: {
      experienceYears: "Years Experience",
      successRate: "Summit Success",
      trekkersGuided: "Trekkers Guided",
      averageRating: "5-Star Rating",
    },

    // Section Titles
    sections: {
      bestSelling: "Best Selling Himalayan Treks",
      bestSellingSub: "Handcrafted journeys led by government-licensed Sherpas with highest safety standards.",
      destinations: "Featured Himalayan Destinations",
      destinationsSub: "Explore diverse geographical landscapes from alpine valleys to ancient high-altitude forbidden kingdoms.",
      activities: "Choose Your Style of Journey",
      activitiesSub: "From rugged high-pass mountaineering expeditions to luxury helicopter flyovers and tranquil cultural tours.",
      testimonials: "What Our Travelers Say",
      testimonialsSub: "Real feedback from travelers, first-time explorers, and families who walked the high Himalayas with Swagat Holidays & Travels.",
      faqs: "Frequently Asked Questions",
      faqsSub: "Everything you need to know about trekking permits, safety gear, acclimatization, and planning your journey with Swagat.",
      viewAllTrips: "View All Treks & Expeditions",
      viewAllDestinations: "Explore All Destinations",
      faqNeedHelp: "Have a question that is not covered here? Speak directly with our Kathmandu expedition desk.",
      askWhatsApp: "Ask via WhatsApp",
    },

    // Common labels
    common: {
      days: "Days",
      from: "From",
      details: "View Details",
      bookNow: "Book Now",
      readMore: "Read More",
      save: "Save",
      cancel: "Cancel",
      language: "Language",
    },

    // Footer
    footer: {
      tagline: "Govt. Licensed Trekking & Mountaineering Agency based in Kathmandu, Nepal. Crafting authentic, safe, and life-changing Himalayan journeys since 2008.",
      quickLinks: "Quick Links",
      popularDestinations: "Top Destinations",
      contactUs: "Contact Our Office",
      copyright: "All rights reserved. Swagat Holidays & Travels Pvt. Ltd.",
    },
  },

  np: {
    // Header & Announcement
    announcement: "नेपाल पर्यटन बोर्ड र टान दर्ता प्राप्त कम्पनी",
    adminPortal: "प्रशासक पोर्टल",
    customInquiry: "अनुकूलित सोधपुछ",
    emergencySupport: "२४/७ आपतकालीन सहयोग सेवा",
    planYourTrip: "यात्रा योजना बनाउनुहोस्",
    searchPlaceholder: "ट्रेक, क्षेत्र वा यात्रा खोज्नुहोस्...",

    // Navigation
    nav: {
      home: "गृहपृष्ठ",
      nepalTravels: "नेपाल पदयात्रा",
      nepalTours: "नेपाल भ्रमण",
      travelInfo: "यात्रा जानकारी",
      company: "हाम्रो बारेमा",
      contact: "सम्पर्क",
      regions: "क्षेत्रहरू",
      allDestinations: "सबै गन्तव्य र नक्सा हेर्नुहोस्",
      allTours: "सबै नेपाल भ्रमणहरू",
      culturalTours: "सांस्कृतिक र सम्पदा भ्रमण",
      chitwanSafari: "चितवन राष्ट्रिय निकुञ्ज सफारी",
      heliTours: "नेपालमा हेलिकप्टर यात्रा",
      activities: "रोमाञ्चक गतिविधिहरू",
      aboutUs: "स्वागत होलिडेजको बारेमा",
      whyUs: "हामीलाई किन रोज्ने?",
      reviews: "यात्रु समीक्षा",
      tailoredTrekPrompt: "व्यक्तिगत निजी पदयात्रा चाहनुहुन्छ? प्रमाणित शेर्पा गाइडहरू उपलब्ध छन्।",
      customize: "अनुकूलित गर्नुहोस्",
    },

    // Hero Section
    hero: {
      defaultBadge: "नेपाल सरकारबाट मान्यता प्राप्त • शेर्पा नेतृत्व • १००% सुनिश्चित प्रस्थान",
      defaultTitle: "हिमालयको प्रवेशद्वारमा स्वागत छ",
      defaultSubtitle: "लामो अनुभवका साथ हामी तपाईंलाई हिमालयको हृदयसँग जोड्ने अविस्मरणीय पदयात्रा, टुर र साहसिक यात्राहरू प्रदान गर्दछौं।",
      exploreTreks: "पदयात्रा हेर्नुहोस्",
      planCustomTrip: "निजी यात्रा योजना",
      destination: "गन्तव्य",
      selectRegion: "क्षेत्र छान्नुहोस्",
      activity: "गतिविधि",
      selectActivity: "गतिविधि छान्नुहोस्",
      duration: "समय अवधि",
      anyDuration: "कुनै पनि अवधि",
      searchTrips: "यात्रा खोज्नुहोस्",
      days1_5: "१ - ५ दिन",
      days6_10: "६ - १० दिन",
      days11_15: "११ - १५ दिन",
      days16Plus: "१६+ दिन",
    },

    // Stats
    stats: {
      experienceYears: "वर्षको अनुभव",
      successRate: "सफल आरोहण दर",
      trekkersGuided: "मार्गदर्शन गरिएका यात्रु",
      averageRating: "उत्कृष्ट मूल्याङ्कन",
    },

    // Section Titles
    sections: {
      bestSelling: "सबैभन्दा लोकप्रिय हिमालय पदयात्राहरू",
      bestSellingSub: "उच्च सुरक्षा मापदण्डका साथ सरकारी लाइसेन्स प्राप्त शेर्पाहरूद्वारा संचालित यात्राहरू।",
      destinations: "प्रमुख हिमालयन गन्तव्यहरू",
      destinationsSub: "सुन्दर हिमाली उपत्यकाहरूदेखि प्राचीन उच्च हिमाली भूभागहरू सम्मको यात्रा।",
      activities: "आफ्नो यात्रा शैली छान्नुहोस्",
      activitiesSub: "साहसिक हिमाल आरोहणदेखि मनोरम हेलिकप्टर उडान र शान्त सांस्कृतिक भ्रमणसम्म।",
      testimonials: "हाम्रा यात्रुहरूको अनुभव",
      testimonialsSub: "स्वागत होलिडेजसँग हिमालयको यात्रा गरेका यात्रुहरू र परिवारहरूको वास्तविक प्रतिक्रिया।",
      faqs: "प्रायः सोधिने प्रश्नहरू (FAQs)",
      faqsSub: "पदयात्रा अनुमति, सुरक्षा उपकरण, उचाइ अनुकूलन र स्वागतसँग यात्रा योजना बनाउने सम्बन्धी सम्पूर्ण जानकारी।",
      viewAllTrips: "सबै पदयात्रा र अभियानहरू हेर्नुहोस्",
      viewAllDestinations: "सबै गन्तव्यहरू अन्वेषण गर्नुहोस्",
      faqNeedHelp: "यहाँ प्रश्नको उत्तर भेटिएन? हाम्रो काठमाडौं सहायता डेस्कसँग सिधै कुराकानी गर्नुहोस्।",
      askWhatsApp: "ह्वाट्सएपमा सोध्नुहोस्",
    },

    // Common labels
    common: {
      days: "दिन",
      from: "सुरुवात",
      details: "विस्तृत विवरण",
      bookNow: "अहिले बुक गर्नुहोस्",
      readMore: "थप पढ्नुहोस्",
      save: "सुरक्षित गर्नुहोस्",
      cancel: "रद्द गर्नुहोस्",
      language: "भाषा",
    },

    // Footer
    footer: {
      tagline: "काठमाडौं, नेपालमा आधारित नेपाल सरकार स्वीकृत पदयात्रा तथा पर्वतारोहण एजेन्सी। सन् २००८ देखि सुरक्षित र अविस्मरणीय हिमालयन यात्रा गराउँदै आएको।",
      quickLinks: "द्रुत लिङ्कहरू",
      popularDestinations: "प्रमुख गन्तव्यहरू",
      contactUs: "हाम्रो कार्यालय सम्पर्क",
      copyright: "सर्वाधिकार सुरक्षित। स्वागत होलिडेज एण्ड ट्राभल्स प्रा. लि.",
    },
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("travels_language") || "en";
  });

  useEffect(() => {
    localStorage.setItem("travels_language", language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "np" : "en"));
  };

  /**
   * Helper function to safely fetch nested translation values
   * e.g. t('nav.home') or t('hero.exploreTreks')
   */
  const t = (keyPath, fallback = "") => {
    const keys = keyPath.split(".");
    let current = translations[language];

    for (const k of keys) {
      if (current && current[k] !== undefined) {
        current = current[k];
      } else {
        // Fallback to English if translation is missing in selected language
        let fallbackCurrent = translations["en"];
        for (const fbK of keys) {
          if (fallbackCurrent && fallbackCurrent[fbK] !== undefined) {
            fallbackCurrent = fallbackCurrent[fbK];
          } else {
            return fallback || keyPath;
          }
        }
        return fallbackCurrent || fallback || keyPath;
      }
    }

    return current;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        isNepali: language === "np",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
