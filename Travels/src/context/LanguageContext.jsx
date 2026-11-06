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
      tailoredTrekPrompt: "Want a tailored private trek?",
      customize: "Customize",
      
      // Missing keys added below
      itineraries: "Itineraries",
      exploreRegion: "Explore Region Page",
      guaranteed: "100% Guaranteed",
      certifiedSherpas: "Certified Sherpa guides.",
      allToursDesc: "Complete sightseeing & culture",
      chitwanSafariDesc: "Rhinos, elephants & Bengal tigers",
      heliToursDesc: "VIP aerial landings at EBC",
      activitiesDesc: "Rafting, paragliding & climbing",
      visaInfo: "Nepal Visa on Arrival & eVisa",
      bestTime: "Best Time to Trek in Nepal",
      permits: "Nepal Trekking Permits Guide",
      altitude: "Altitude Sickness & Health Protocols",
      packing: "Trekking Packing Checklist",
      cost: "How Much Does Trekking Cost?",
      destinationsShowcase: "Destinations Showcase",
      contactGuides: "Contact Our Guides"
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
      scrollToExplore: "Scroll to Explore", 
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

    // Interactive Map Section
    map: {
      title1: "Your Destination",
      title2: "in Nepal",
      subtitle: "Hover or click along Nepal’s geographic regions to preview mountain peaks, glacial valleys, and safari corridors with verified routes.",
      filters: {
        all: "All Hotspots (12)",
        himalayas: "8,000m+ Himalayan Giants",
        remote: "Restricted & Remote Kingdoms",
        wildlife: "Lakes & Wildlife Safari",
        heritage: "Cultural Heritage"
      },
      mapHelp: "Click or hover markers to inspect details",
      legendHigh: "High Himalayas",
      legendValleys: "Valleys & Terai",
      best: "Best:",
      verified: "Verified Route",
      featuredRoutes: "Featured Routes in This Area:",
      guaranteed: "Guaranteed",
      explore: "Explore",
      exploreBtnBottom: "Full itineraries, elevation profiles & guaranteed departure dates",
      hotspotsLabel: "Hotspots:"
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
      saveAmount: "Save ${{amount}}",
      perPerson: "/ person",
      explore: "Explore",
      inquire: "Inquire",
      
      // Missing keys added below
      noTripsMatch: "No trips match your current filter selection.",
      resetFilters: "Reset Filters"
    },

    // Footer
    footer: {
      tagline: "Govt. Licensed Trekking & Mountaineering Agency based in Kathmandu, Nepal. Crafting authentic, safe, and life-changing Himalayan journeys since 2008.",
      quickLinks: "Quick Links",
      popularDestinations: "Top Destinations",
      contactUs: "Contact Our Office",
      copyright: "All rights reserved. Swagat Holidays & Travels Pvt. Ltd.",
    },

    // ADMIN PANEL TRANSLATIONS
    admin: {
      siteContent: {
        messages: {
          saveSuccess: "Changes saved successfully!",
          saveError: "Failed to update section content."
        },
        langMode: {
          title: "Content Language Mode",
          description: "Switch tabs to manage English or Nepali dynamic content.",
          enTab: "🇬🇧 English Content",
          npTab: "🇳🇵 नेपाली (Nepali) Content"
        },
        hero: {
          title: "Homepage Hero Section",
          subtitle: "Headline, subtext, trust badge & main background",
          saveBtn: "Save Hero Changes",
          badgeLabel: "Top Trust Badge Text (English)",
          badgePlaceholder: "e.g. Government Licensed • Sherpa Led • 100% Guaranteed Departures",
          badgeLabelNp: "Top Trust Badge Text (नेपालीमा)",
          badgePlaceholderNp: "उदाहरण: नेपाल सरकारबाट मान्यता प्राप्त • शेर्पा नेतृत्व",
          titleLabel: "Hero Main Heading (English)",
          titlePlaceholder: "e.g. Your Gateway to the Himalayas",
          titleLabelNp: "Hero Main Heading (नेपालीमा मुख्य शीर्षक)",
          titlePlaceholderNp: "उदाहरण: हिमालयको प्रवेशद्वारमा स्वागत छ",
          subtitleLabel: "Hero Tagline / Subtitle (English)",
          subtitleLabelNp: "Hero Tagline / Subtitle (नेपालीमा उप-शीर्षक)",
          imageLabel: "Hero Background Wallpaper (Cloudinary / URL)"
        },
        stats: {
          title: "Animated Stats Counter",
          subtitle: "Key performance metrics shown beneath the hero",
          saveBtn: "Save Stats",
          expLabel: "Years of Experience (English)",
          expLabelNp: "Years of Experience (नेपालीमा)",
          successLabel: "Summit Success Rate (English)",
          successLabelNp: "Summit Success Rate (नेपालीमा)",
          trekkersLabel: "Trekkers Guided Safely (English)",
          trekkersLabelNp: "Trekkers Guided Safely (नेपालीमा)",
          ratingLabel: "Average Client Rating (English)",
          ratingLabelNp: "Average Client Rating (नेपालीमा)"
        },
        contact: {
          title: "Company Contact & Location",
          subtitle: "Phone numbers, email addresses and office coordinates",
          saveBtn: "Save Contact Info",
          landlineLabel: "Office Landline",
          whatsappLabel: "WhatsApp / 24/7 Mobile",
          emailLabel: "Primary Email",
          addressLabel: "Physical Address",
          hoursLabel: "Office Working Hours",
          emergencyLabel: "Emergency Support Text",
          mapLabel: "Google Maps Embed URL (iframe src)",
          mapHelp: "Paste the src URL from Google Maps > Share > Embed a map."
        }
      }
    }
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
      tailoredTrekPrompt: "व्यक्तिगत निजी पदयात्रा चाहनुहुन्छ?",
      customize: "अनुकूलित गर्नुहोस्",

      // Missing keys added below
      itineraries: "यात्रा कार्यक्रमहरू",
      exploreRegion: "क्षेत्र पृष्ठ हेर्नुहोस्",
      guaranteed: "१००% सुनिश्चित",
      certifiedSherpas: "प्रमाणित शेर्पा गाइडहरू।",
      allToursDesc: "पूर्ण दर्शनीय र संस्कृति",
      chitwanSafariDesc: "गैंडा, हात्ती र बाघहरू",
      heliToursDesc: "EBC मा VIP हवाई अवतरण",
      activitiesDesc: "राफ्टिङ, प्याराग्लाइडिङ र आरोहण",
      visaInfo: "नेपाल आगमनमा भिसा र eVisa",
      bestTime: "नेपालमा ट्रेकिङको उत्तम समय",
      permits: "नेपाल ट्रेकिङ अनुमति गाइड",
      altitude: "उचाइ रोग र स्वास्थ्य प्रोटोकल",
      packing: "ट्रेकिङ प्याकिङ चेकलिस्ट",
      cost: "ट्रेकिङको लागत कति हुन्छ?",
      destinationsShowcase: "गन्तव्य प्रदर्शन",
      contactGuides: "हाम्रा गाइडहरूलाई सम्पर्क गर्नुहोस्"
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
      scrollToExplore: "अन्वेषण गर्न तल स्क्रोल गर्नुहोस्", 
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

    // Interactive Map Section
    map: {
      title1: "तपाईंको गन्तव्य",
      title2: "नेपालमा",
      subtitle: "प्रमाणित मार्गहरूसँगै हिमाली चुचुराहरू, हिमनदी उपत्यकाहरू, र सफारी कोरिडोरहरू हेर्नको लागि नेपालको भौगोलिक क्षेत्रहरूमा होभर वा क्लिक गर्नुहोस्।",
      filters: {
        all: "सबै प्रमुख स्थलहरू (१२)",
        himalayas: "८,००० मिटरभन्दा माथिका हिमाली दानवहरू",
        remote: "प्रतिबन्धित र दुर्गम राज्यहरू",
        wildlife: "ताल र वन्यजन्तु सफारी",
        heritage: "सांस्कृतिक सम्पदा"
      },
      mapHelp: "विवरण हेर्न मार्करहरूमा क्लिक वा होभर गर्नुहोस्",
      legendHigh: "उच्च हिमालय",
      legendValleys: "उपत्यका र तराई",
      best: "उत्तम:",
      verified: "प्रमाणित मार्ग",
      featuredRoutes: "यस क्षेत्रका प्रमुख मार्गहरू:",
      guaranteed: "सुनिश्चित",
      explore: "अन्वेषण गर्नुहोस्",
      exploreBtnBottom: "पूर्ण यात्रा कार्यक्रम, उचाइ प्रोफाइल र सुनिश्चित प्रस्थान मितिहरू",
      hotspotsLabel: "प्रमुख स्थलहरू:"
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
      saveAmount: "${{amount}} बचत",
      perPerson: "/ प्रतिव्यक्ति",
      explore: "हेर्नुहोस्",
      inquire: "सोधपुछ",

      // Missing keys added below
      noTripsMatch: "तपाईंको हालको फिल्टरसँग मिल्ने कुनै यात्रा भेटिएन।",
      resetFilters: "फिल्टर रिसेट गर्नुहोस्"
    },

    // Footer
    footer: {
      tagline: "काठमाडौं, नेपालमा आधारित नेपाल सरकार स्वीकृत पदयात्रा तथा पर्वतारोहण एजेन्सी। सन् २००८ देखि सुरक्षित र अविस्मरणीय हिमालयन यात्रा गराउँदै आएको।",
      quickLinks: "द्रुत लिङ्कहरू",
      popularDestinations: "प्रमुख गन्तव्यहरू",
      contactUs: "हाम्रो कार्यालय सम्पर्क",
      copyright: "सर्वाधिकार सुरक्षित। स्वागत होलिडेज एण्ड ट्राभल्स प्रा. लि.",
    },

    // ADMIN PANEL TRANSLATIONS (Nepali)
    admin: {
      siteContent: {
        messages: {
          saveSuccess: "परिवर्तनहरू सफलतापूर्वक बचत भयो!",
          saveError: "खण्ड सामग्री अपडेट गर्न असफल भयो।"
        },
        langMode: {
          title: "सामग्री भाषा मोड",
          description: "अंग्रेजी वा नेपाली डाइनामिक सामग्री प्रबन्ध गर्न ट्याबहरू स्विच गर्नुहोस्।",
          enTab: "🇬🇧 अंग्रेजी सामग्री",
          npTab: "🇳🇵 नेपाली सामग्री"
        },
        hero: {
          title: "गृहपृष्ठ हिरो खण्ड",
          subtitle: "शीर्षक, उप-पाठ, ट्रस्ट ब्याज र मुख्य पृष्ठभूमि",
          saveBtn: "हिरो परिवर्तनहरू बचत गर्नुहोस्",
          badgeLabel: "शीर्ष ट्रस्ट ब्याज पाठ (अंग्रेजी)",
          badgePlaceholder: "e.g. Government Licensed • Sherpa Led • 100% Guaranteed Departures",
          badgeLabelNp: "शीर्ष ट्रस्ट ब्याज पाठ (नेपालीमा)",
          badgePlaceholderNp: "उदाहरण: नेपाल सरकारबाट मान्यता प्राप्त • शेर्पा नेतृत्व",
          titleLabel: "हिरो मुख्य शीर्षक (अंग्रेजी)",
          titlePlaceholder: "e.g. Your Gateway to the Himalayas",
          titleLabelNp: "हिरो मुख्य शीर्षक (नेपालीमा मुख्य शीर्षक)",
          titlePlaceholderNp: "उदाहरण: हिमालयको प्रवेशद्वारमा स्वागत छ",
          subtitleLabel: "हिरो ट्यागलाइन / उप-शीर्षक (अंग्रेजी)",
          subtitleLabelNp: "हिरो ट्यागलाइन / उप-शीर्षक (नेपालीमा उप-शीर्षक)",
          imageLabel: "हिरो पृष्ठभूमि वालपेपर (क्लाउडिनरी / URL)"
        },
        stats: {
          title: "एनिमेटेड तथ्याङ्क काउन्टर",
          subtitle: "हिरो मुनि देखाइएका मुख्य प्रदर्शन मेट्रिक्सहरू",
          saveBtn: "तथ्याङ्कहरू बचत गर्नुहोस्",
          expLabel: "अनुभवको वर्ष (अंग्रेजी)",
          expLabelNp: "अनुभवको वर्ष (नेपालीमा)",
          successLabel: "शिखर सफलता दर (अंग्रेजी)",
          successLabelNp: "शिखर सफलता दर (नेपालीमा)",
          trekkersLabel: "सुरक्षित रूपमा निर्देशित ट्रेकर्स (अंग्रेजी)",
          trekkersLabelNp: "सुरक्षित रूपमा निर्देशित ट्रेकर्स (नेपालीमा)",
          ratingLabel: "औसत ग्राहक मूल्याङ्कन (अंग्रेजी)",
          ratingLabelNp: "औसत ग्राहक मूल्याङ्कन (नेपालीमा)"
        },
        contact: {
          title: "कम्पनी सम्पर्क र स्थान",
          subtitle: "फोन नम्बर, इमेल ठेगाना र कार्यालय निर्देशांकहरू",
          saveBtn: "सम्पर्क जानकारी बचत गर्नुहोस्",
          landlineLabel: "कार्यालय ल्यान्डलाइन",
          whatsappLabel: "व्हाट्सएप / २४/७ मोबाइल",
          emailLabel: "प्राथमिक इमेल",
          addressLabel: "भौतिक ठेगाना",
          hoursLabel: "कार्यालय समय",
          emergencyLabel: "आपतकालीन सहायता पाठ",
          mapLabel: "गुगल नक्सा इम्बेड URL (iframe src)",
          mapHelp: "गुगल नक्सा > साझा गर्नुहोस् > नक्सा इम्बेड गर्नुहोस् बाट src URL टाँस्नुहोस्।"
        }
      }
    }
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
   * and support variable interpolation (e.g., t('saveAmount', { amount: 50 }))
   */
  const t = (keyPath, variables = {}) => {
    const keys = keyPath.split(".");
    let current = translations[language];

    // 1. Find the string in the current language
    for (const k of keys) {
      if (current && current[k] !== undefined) {
        current = current[k];
      } else {
        // Fallback to English if missing in current language
        let fallbackCurrent = translations["en"];
        for (const fbK of keys) {
          if (fallbackCurrent && fallbackCurrent[fbK] !== undefined) {
            fallbackCurrent = fallbackCurrent[fbK];
          } else {
            return keyPath; // Return the key itself if missing in English too
          }
        }
        current = fallbackCurrent;
        break;
      }
    }

    // 2. If it's a string, replace the {{variables}} with actual values
    if (typeof current === "string") {
      let result = current;
      Object.keys(variables).forEach((key) => {
        // Replace all instances of {{key}} with the value
        result = result.split(`{{${key}}}`).join(variables[key]);
      });
      return result;
    }

    // 3. If it's an array or object, just return it
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