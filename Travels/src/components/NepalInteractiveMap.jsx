import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ScrollReveal } from "../hooks/useScrollReveal";
import { useLanguage } from "../context/LanguageContext"; // Added this import
import {
  MapPin,
  Compass,
  ArrowRight,
  Mountain,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import nepalMapImg from "../assets/nepal-map.webp";

export const NEPAL_HOTSPOTS = [
  {
    id: "everest",
    name: "Mount Everest & Khumbu Region",
    name_np: "सगरमाथा र खुम्बु क्षेत्र",
    shortName: "Mt Everest",
    shortName_np: "सगरमाथा",
    region: "Sagarmatha National Park, Eastern Nepal",
    region_np: "सगरमाथा राष्ट्रिय निकुञ्ज, पूर्वी नेपाल",
    elevation: "8,848.86 m",
    tag: "Highest Mountain on Earth",
    tag_np: "पृथ्वीको सबैभन्दा अग्लो हिमाल",
    category: "himalayas",
    x: 81,
    y: 63,
    direction: "up",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    description: "The world’s legendary high-altitude paradise. Walk alongside Sherpa legends through Namche Bazaar, Tengboche Monastery, and stand beneath Everest at Base Camp & Kala Patthar.",
    description_np: "विश्वको प्रसिद्ध उच्च हिमाली स्वर्ग। शेर्पा गाउँ नाम्चे बजार, तेन्गबोचे मठ हुँदै सगरमाथा आधार शिविर र कालापत्थरमा पुग्ने अविस्मरणीय यात्रा।",
    topTreks: [
      "Everest Base Camp Trek (14 Days)",
      "EBC Gokyo Lakes Odyssey (19 Days)",
      "Everest Helicopter Return (11 Days)",
    ],
    topTreks_np: [
      "सगरमाथा आधार शिविर ट्रेक (१४ दिन)",
      "EBC गोक्यो ताल यात्रा (१९ दिन)",
      "सगरमाथा हेलिकप्टर फिर्ती (११ दिन)",
    ],
    exploreUrl: "/region/everest",
    bestSeason: "Mar – May & Sep – Dec",
    bestSeason_np: "मार्च – मे र सेप्टेम्बर – डिसेम्बर",
  },
  {
    id: "annapurna",
    name: "Annapurna Sanctuary & Pokhara",
    name_np: "अन्नपूर्ण आधार शिविर र पोखरा",
    shortName: "Annapurna",
    shortName_np: "अन्नपूर्ण",
    region: "Gandaki Province, Central-West Nepal",
    region_np: "गण्डकी प्रदेश, मध्य-पश्चिम नेपाल",
    elevation: "8,091 m",
    tag: "World’s Most Diverse Trail",
    tag_np: "विश्वको सबैभन्दा विविध ट्रेल",
    category: "himalayas",
    x: 47,
    y: 45,
    direction: "down",
    image: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?auto=format&fit=crop&w=800&q=80",
    description: "A breathtaking amphitheater surrounded by Hiunchuli, Machapuchare (Fishtail), and Annapurna I, transitioning from lush subtropical valleys to windswept Tibetan passes like Thorong La.",
    description_np: "हिउँचुली, माछापुच्छ्रे र अन्नपूर्ण प्रथमले घेरिएको लोभलाग्दो उपत्यका, जहाँ हरियो उपोष्णकटिबंधीय वनदेखि थोरोङ ला जस्ता हावाले चिसो तिब्बती भन्ज्याङसम्मको यात्रा हुन्छ।",
    topTreks: [
      "Annapurna Circuit Trek (12 Days)",
      "Annapurna Base Camp Trek (9 Days)",
      "Mardi Himal Ridge Trek (10 Days)",
    ],
    topTreks_np: [
      "अन्नपूर्ण सर्किट ट्रेक (१२ दिन)",
      "अन्नपूर्ण आधार शिविर ट्रेक (९ दिन)",
      "मार्दी हिमाल रिज ट्रेक (१० दिन)",
    ],
    exploreUrl: "/region/annapurna",
    bestSeason: "Mar – May & Oct – Dec",
    bestSeason_np: "मार्च – मे र अक्टोबर – डिसेम्बर",
  },
  {
    id: "mustang",
    name: "Upper Mustang (Lo Manthang)",
    name_np: "माथिल्लो मुस्ताङ (लो मान्थाङ)",
    shortName: "Mustang",
    shortName_np: "मुस्ताङ",
    region: "Rain-Shadow Trans-Himalayas, North",
    region_np: "वर्षा-छाया ट्रान्स-हिमालय, उत्तर",
    elevation: "3,840 m",
    tag: "The Last Forbidden Kingdom",
    tag_np: "अन्तिम प्रतिबन्धित राज्य",
    category: "remote",
    x: 48,
    y: 33,
    direction: "up",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    description: "A timeless Tibetan enclave shielded behind Annapurna and Dhaulagiri. Explore ancient cliff sky-caves, ochre-walled Lo Manthang, medieval monasteries, and surreal red rock canyons.",
    description_np: "अन्नपूर्ण र धौलागिरि पछाडि लुकेको एक शाश्वत तिब्बती क्षेत्र। प्राचीन गुफाहरू, रातो चट्टानले घेरिएको लो मान्थाङ, मध्यकालीन मठहरू, र अद्भुत रातो चट्टानको घाँटीहरूको अन्वेषण गर्नुहोस्।",
    topTreks: [
      "Upper Mustang Forbidden Kingdom (14 Days)",
      "Mustang Overland 4x4 Jeep Tour (10 Days)",
    ],
    topTreks_np: [
      "माथिल्लो मुस्ताङ प्रतिबन्धित राज्य (१४ दिन)",
      "मुस्ताङ ओभरल्याण्ड 4x4 जीप टुर (१० दिन)",
    ],
    exploreUrl: "/region/mustang",
    bestSeason: "May – Oct (Monsoon-free)",
    bestSeason_np: "मे – अक्टोबर (मनसुन-मुक्त)",
  },
  {
    id: "manaslu",
    name: "Manaslu Circuit & Tsum Valley",
    name_np: "मनास्लु सर्किट र त्सुम उपत्यका",
    shortName: "Manaslu",
    shortName_np: "मनास्लु",
    region: "Gorkha District, Central-North Nepal",
    region_np: "गोरखा जिल्ला, मध्य-उत्तर नेपाल",
    elevation: "8,163 m",
    tag: "Untouched Restricted Wilderness",
    tag_np: "अछुतो प्रतिबन्धित जङ्गल",
    category: "remote",
    x: 55,
    y: 47,
    direction: "up",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    description: 'Circumnavigate the dramatic "Mountain of the Spirit" along the wild Budhi Gandaki gorge, cross the snowy 5,106m Larkya La pass, and discover sacred Buddhist Tsum Valley monasteries.',
    description_np: 'बुढी गण्डकीको जङ्गली खोंच हुँदै नाटकीय "आत्माको हिमाल" को वरिपरि घुम्नुहोस्, हिउँले ढाकेको ५,१०६ मिटर अग्लो लार्क्या ला भन्ज्याङ पार गर्नुहोस्, र पवित्र बौद्ध त्सुम उपत्यका मठहरू पत्ता लगाउनुहोस्।',
    topTreks: [
      "Manaslu Circuit Trek (14 Days)",
      "Tsum Valley Sacred Hidden Trek (15 Days)",
    ],
    topTreks_np: [
      "मनास्लु सर्किट ट्रेक (१४ दिन)",
      "त्सुम उपत्यका पवित्र लुकेको ट्रेक (१५ दिन)",
    ],
    exploreUrl: "/region/manaslu",
    bestSeason: "Mar – May & Sep – Nov",
    bestSeason_np: "मार्च – मे र सेप्टेम्बर – नोभेम्बर",
  },
  {
    id: "langtang",
    name: "Langtang Valley & Gosainkunda",
    name_np: "लाङटाङ उपत्यका र गोसाइँकुण्ड",
    shortName: "Langtang",
    shortName_np: "लाङटाङ",
    region: "Langtang National Park, Central Nepal",
    region_np: "लाङटाङ राष्ट्रिय निकुञ्ज, मध्य नेपाल",
    elevation: "7,234 m",
    tag: "Valley of Sacred Glaciers",
    tag_np: "पवित्र हिमनदीको उपत्यका",
    category: "himalayas",
    x: 65.5,
    y: 55.5,
    direction: "up",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80",
    description: "Closest high alpine trek north of Kathmandu. Features soaring granite walls, Tamang heritage trails, yak cheese dairies at Kyanjin Gompa, and holy high-altitude Gosainkunda lakes.",
    description_np: "काठमाडौंको उत्तरमा रहेको सबैभन्दा नजिकको उच्च अल्पाइन ट्रेक। ग्रेनाइटका अग्ला पर्खालहरू, तामाङ सम्पदा ट्रेलहरू, क्याञ्जिन गुम्बामा याक चीज डेयरी, र पवित्र उच्च हिमाली गोसाइँकुण्ड तालहरू।",
    topTreks: [
      "Langtang Valley Trek (10 Days)",
      "Langtang & Gosainkunda Pass (15 Days)",
      "Helambu Scenic Cultural Trek (6 Days)",
    ],
    topTreks_np: [
      "लाङटाङ उपत्यका ट्रेक (१० दिन)",
      "लाङटाङ र गोसाइँकुण्ड भन्ज्याङ (१५ दिन)",
      "हेलम्बु मनोरम सांस्कृतिक ट्रेक (६ दिन)",
    ],
    exploreUrl: "/region/langtang",
    bestSeason: "Mar – May & Sep – Nov",
    bestSeason_np: "मार्च – मे र सेप्टेम्बर – नोभेम्बर",
  },
  {
    id: "dhaulagiri",
    name: "Dhaulagiri Circuit & Hidden Valley",
    name_np: "धौलागिरि सर्किट र लुकेको उपत्यका",
    shortName: "Dhaulagiri",
    shortName_np: "धौलागिरि",
    region: "Dhaulagiri Zone, Western Nepal",
    region_np: "धौलागिरि अञ्चल, पश्चिमी नेपाल",
    elevation: "8,167 m",
    tag: "The Dazzling White Mountain",
    tag_np: "चम्किलो सेतो हिमाल",
    category: "himalayas",
    x: 41,
    y: 42,
    direction: "down",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    description: "A rugged and challenging glacial expedition circumnavigating the 7th highest peak in the world, crossing the challenging French Pass (5,360m) and Dhampus Pass into the Hidden Valley.",
    description_np: "विश्वको सातौं अग्लो हिमालको वरिपरि घुम्ने एक कठिन र चुनौतीपूर्ण हिमनदी अभियान, चुनौतीपूर्ण फ्रेन्च पास (५,३६० मि) र ढम्पुस पास पार गर्दै लुकेको उपत्यकामा प्रवेश।",
    topTreks: [
      "Dhaulagiri Circuit Trek (17 Days)",
      "French Pass High Altitude Traverse (19 Days)",
    ],
    topTreks_np: [
      "धौलागिरि सर्किट ट्रेक (१७ दिन)",
      "फ्रेन्च पास उच्च हिमाली यात्रा (१९ दिन)",
    ],
    exploreUrl: "/region/annapurna",
    bestSeason: "Apr – May & Sep – Nov",
    bestSeason_np: "अप्रिल – मे र सेप्टेम्बर – नोभेम्बर",
  },
  {
    id: "makalu",
    name: "Makalu Barun National Park",
    name_np: "मकालु बरुण राष्ट्रिय निकुञ्ज",
    shortName: "Mt Makalu",
    shortName_np: "मकालु हिमाल",
    region: "Sankhuwasabha District, Eastern Nepal",
    region_np: "संखुवासभा जिल्ला, पूर्वी नेपाल",
    elevation: "8,485 m",
    tag: "Wild Glacial Eden",
    tag_np: "जङ्गली हिमनदी स्वर्ग",
    category: "himalayas",
    x: 88,
    y: 68,
    direction: "up",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    description: "Under the shadow of the 5th highest mountain on Earth, the Barun Valley preserves sheer granite cliffs, cascading waterfalls, hanging glaciers, and rare Himalayan biodiversity.",
    description_np: "पृथ्वीको पाँचौं अग्लो हिमालको छायामुनि, बरुण उपत्यकाले ठाडो ग्रेनाइट चट्टानहरू, झर्ने झरनाहरू, झुण्डिएका हिमनदीहरू, र दुर्लभ हिमाली जैविक विविधतालाई संरक्षण गर्दछ।",
    topTreks: [
      "Makalu Base Camp Trek (18 Days)",
      "Sherpani Col High Pass Traverse (22 Days)",
    ],
    topTreks_np: [
      "मकालु आधार शिविर ट्रेक (१८ दिन)",
      "शेर्पानी कोल उच्च भन्ज्याङ यात्रा (२२ दिन)",
    ],
    exploreUrl: "/region/makalu",
    bestSeason: "Apr – May & Oct – Nov",
    bestSeason_np: "अप्रिल – मे र अक्टोबर – नोभेम्बर",
  },
  {
    id: "kanchenjunga",
    name: "Kanchenjunga Circuit & Border",
    name_np: "कञ्चनजङ्घा सर्किट र सीमा",
    shortName: "Kanchenjunga",
    shortName_np: "कञ्चनजङ्घा",
    region: "Taplejung District, Far Eastern Nepal",
    region_np: "ताप्लेजुङ जिल्ला, सुदूर पूर्वी नेपाल",
    elevation: "8,586 m",
    tag: "World’s 3rd Highest Mountain",
    tag_np: "विश्वको तेस्रो अग्लो हिमाल",
    category: "himalayas",
    x: 96,
    y: 66,
    direction: "up",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    description: "The wild eastern frontier bordering Sikkim and Tibet. Trek through ancient rhododendron forests, lush bamboo jungles, and rugged glacial moraines to North and South Base Camps.",
    description_np: "सिक्किम र तिब्बतको सिमानामा रहेको जङ्गली पूर्वी सीमाना। प्राचीन लालीगुराँसको जङ्गल, हरियो बाँसको जङ्गल, र उबडखाबड हिमनदी मोरेनहरू हुँदै उत्तर र दक्षिण आधार शिविरसम्मको यात्रा।",
    topTreks: [
      "Kanchenjunga Circuit Trek (24 Days)",
      "Kanchenjunga North Base Camp (18 Days)",
    ],
    topTreks_np: [
      "कञ्चनजङ्घा सर्किट ट्रेक (२४ दिन)",
      "कञ्चनजङ्घा उत्तर आधार शिविर (१८ दिन)",
    ],
    exploreUrl: "/treks",
    bestSeason: "Mar – May & Oct – Nov",
    bestSeason_np: "मार्च – मे र अक्टोबर – नोभेम्बर",
  },
  {
    id: "dolpo",
    name: "Upper Dolpo & Shey Phoksundo",
    name_np: "माथिल्लो डोल्पो र शे-फोक्सुण्डो",
    shortName: "Dolpo Region",
    shortName_np: "डोल्पो क्षेत्र",
    region: "Karnali Province, Far Northwest Nepal",
    region_np: "कर्णाली प्रदेश, सुदूर उत्तर-पश्चिम नेपाल",
    elevation: "5,115 m",
    tag: "Mystical Land of Snow Leopard",
    tag_np: "हिमचितुवाको रहस्यमय भूमि",
    category: "remote",
    x: 38,
    y: 30,
    direction: "up",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    description: "One of the most remote and isolated inhabited valleys in the world. Features hypnotic deep turquoise waters of Shey Phoksundo Lake, pre-Buddhist Bonpo monasteries, and rugged yak trails.",
    description_np: "विश्वको सबैभन्दा दुर्गम र एक्लो बस्ती भएको उपत्यका मध्ये एक। शे-फोक्सुण्डो तालको सम्मोहक गहिरो फिरोजी पानी, बुद्धपूर्वकालीन बोन्पो मठहरू, र उबडखाबड याक ट्रेलहरू।",
    topTreks: [
      "Upper Dolpo Remote Odyssey (24 Days)",
      "Shey Phoksundo Alpine Lake Trek (14 Days)",
    ],
    topTreks_np: [
      "माथिल्लो डोल्पो दुर्गम यात्रा (२४ दिन)",
      "शे-फोक्सुण्डो अल्पाइन ताल ट्रेक (१४ दिन)",
    ],
    exploreUrl: "/region/dolpo",
    bestSeason: "May – Sep",
    bestSeason_np: "मे – सेप्टेम्बर",
  },
  {
    id: "chitwan",
    name: "Chitwan National Park Safari",
    name_np: "चितवन राष्ट्रिय निकुञ्ज सफारी",
    shortName: "Chitwan",
    shortName_np: "चितवन",
    region: "Southern Subtropical Terai Lowlands",
    region_np: "दक्षिणी उपोष्णकटिबंधीय तराई तल्लो भूभाग",
    elevation: "415 m",
    tag: "UNESCO Wildlife Safari Reserve",
    tag_np: "युनेस्को वन्यजन्तु सफारी रिजर्व",
    category: "wildlife",
    x: 58,
    y: 78,
    direction: "down",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80",
    description: "Nepal’s premier subtropical wilderness. Track wild single-horned rhinos, elusive Royal Bengal tigers, sloth bears, and Asian elephants on open 4x4 safaris and Rapti river canoe cruises.",
    description_np: "नेपालको प्रमुख उपोष्णकटिबंधीय जङ्गल। खुला 4x4 सफारी र राप्ती नदीको डुङ्गा सवारीमा जङ्गली एक-सिङ्गे गैंडा, दुर्लभ शाही बाघ, स्लोथ भालु, र एसियाली हात्तीहरूको खोजी गर्नुहोस्।",
    topTreks: [
      "Chitwan Jungle Safari Tour (3 Days)",
      "Kathmandu, Pokhara & Chitwan (7 Days)",
    ],
    topTreks_np: [
      "चितवन जङ्गल सफारी टुर (३ दिन)",
      "काठमाडौं, पोखरा र चितवन (७ दिन)",
    ],
    exploreUrl: "/tours",
    bestSeason: "Oct – Mar",
    bestSeason_np: "अक्टोबर – मार्च",
  },
  {
    id: "kathmandu",
    name: "Kathmandu Valley Heritage Shrines",
    name_np: "काठमाडौं उपत्यका सम्पदा स्थलहरू",
    shortName: "Kathmandu",
    shortName_np: "काठमाडौं",
    region: "Capital Region, Bagmati Province",
    region_np: "राजधानी क्षेत्र, बागमती प्रदेश",
    elevation: "1,400 m",
    tag: "7 UNESCO World Heritage Shrines",
    tag_np: "७ युनेस्को विश्व सम्पदा स्थलहरू",
    category: "heritage",
    x: 68,
    y: 68,
    direction: "down",
    image: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?auto=format&fit=crop&w=800&q=80",
    description: "The cultural epicenter of the Himalayas. Marvel at golden stupas of Swayambhunath and Boudhanath, sacred ghats of Pashupatinath, and medieval Newari courtyards of Patan & Bhaktapur.",
    description_np: "हिमालयको सांस्कृतिक केन्द्र। स्वयम्भूनाथ र बौद्धनाथका सुनौलो स्तूपहरू, पशुपतिनाथका पवित्र घाटहरू, र पाटन र भक्तपुरका मध्यकालीन नेवारी आँगनहरूको दर्शन गर्नुहोस्।",
    topTreks: [
      "Kathmandu UNESCO Heritage Tour (1 Day)",
      "Nagarkot Sunrise & Bhaktapur Excursion (2 Days)",
    ],
    topTreks_np: [
      "काठमाडौं युनेस्को सम्पदा टुर (१ दिन)",
      "नगरकोट सूर्योदय र भक्तपुर भ्रमण (२ दिन)",
    ],
    exploreUrl: "/destinations",
    bestSeason: "Year-Round",
    bestSeason_np: "वर्षभरि",
  },
  {
    id: "rara",
    name: "Rara Lake & Western Wilderness",
    name_np: "रारा ताल र पश्चिमी जङ्गल",
    shortName: "Rara Lake",
    shortName_np: "रारा ताल",
    region: "Mugu District, Far-West Himalayas",
    region_np: "मुगु जिल्ला, सुदूर-पश्चिम हिमालय",
    elevation: "2,990 m",
    tag: "Nepal’s Largest Azure Alpine Lake",
    tag_np: "नेपालको सबैभन्दा ठूलो निलो अल्पाइन ताल",
    category: "wildlife",
    x: 23,
    y: 34,
    direction: "up",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    description: 'The "Queen of Himalayan Lakes" reflects clear blue skies and snow-clad peaks. Surrounded by pristine pine and juniper forests, it offers tranquil solitude and untouched nature.',
    description_np: '"हिमाली तालहरूको रानी" ले स्पष्ट निलो आकाश र हिउँले ढाकेका चुचुराहरूको प्रतिबिम्ब देखाउँछ। प्राचीन देवदार र जुनिपर जङ्गलले घेरिएको, यसले शान्त एकान्तता र अछुतो प्रकृति प्रदान गर्दछ।',
    topTreks: [
      "Rara Lake Alpine Wilderness Trek (10 Days)",
      "Jumla to Rara Lake Scenic Trail (8 Days)",
    ],
    topTreks_np: [
      "रारा ताल अल्पाइन जङ्गल ट्रेक (१० दिन)",
      "जुम्ला देखि रारा ताल मनोरम ट्रेल (८ दिन)",
    ],
    exploreUrl: "/destinations",
    bestSeason: "Apr – Jun & Sep – Nov",
    bestSeason_np: "अप्रिल – जुन र सेप्टेम्बर – नोभेम्बर",
  },
];

export default function NepalInteractiveMap({ onSelectRegion }) {
  const { t, isNepali } = useLanguage(); // Added hook
  const [activeSpot, setActiveSpot] = useState(NEPAL_HOTSPOTS[0]);
  const [hoveredSpot, setHoveredSpot] = useState(null);
  const [pinnedSpotId, setPinnedSpotId] = useState(null); // persists after click
  const [selectedFilter, setSelectedFilter] = useState("all");

  const currentSpot = hoveredSpot || activeSpot;

  const filteredHotspots = NEPAL_HOTSPOTS.filter((spot) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "himalayas") return spot.category === "himalayas";
    if (selectedFilter === "remote") return spot.category === "remote";
    if (selectedFilter === "wildlife") return spot.category === "wildlife";
    if (selectedFilter === "heritage") return spot.category === "heritage";
    return true;
  });

  const handleFilterChange = (filterId) => {
    setSelectedFilter(filterId);
    const available = NEPAL_HOTSPOTS.filter((spot) => {
      if (filterId === "all") return true;
      if (filterId === "himalayas") return spot.category === "himalayas";
      if (filterId === "remote") return spot.category === "remote";
      if (filterId === "wildlife") return spot.category === "wildlife";
      if (filterId === "heritage") return spot.category === "heritage";
      return true;
    });
    if (
      available.length > 0 &&
      !available.some((s) => s.id === currentSpot.id)
    ) {
      setActiveSpot(available[0]);
      setHoveredSpot(null);
    }
    if (pinnedSpotId && !available.some((s) => s.id === pinnedSpotId)) {
      setPinnedSpotId(null);
    }
  };

  const filterCategories = [
    { id: "all", label: t("map.filters.all") },
    { id: "himalayas", label: t("map.filters.himalayas") },
    { id: "remote", label: t("map.filters.remote") },
    { id: "wildlife", label: t("map.filters.wildlife") },
    { id: "heritage", label: t("map.filters.heritage") },
  ];

  return (
    <section
      id="nepal-interactive-map"
      className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-900 via-brand-blue-dark to-slate-950 text-white relative overflow-hidden"
    >
      {/* Decorative ambient background glows - hidden on mobile */}
      <div className="hidden sm:block absolute -top-40 -left-40 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden sm:block absolute -bottom-40 -right-40 w-96 h-96 bg-brand-blue-light/20 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden sm:block absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal
          animation="fade-up"
          className="text-center max-w-3xl mx-auto mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            {t("map.title1")} <span className="text-brand-gold">{t("map.title2")}</span>
          </h2>
          <p className="mt-3 text-slate-300 text-xs sm:text-base leading-relaxed">
            {t("map.subtitle")}
          </p>
        </ScrollReveal>

        {/* Filter Category Chips */}
        <ScrollReveal
          animation="fade-up"
          delay={100}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-6 sm:mb-8"
        >
          {filterCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleFilterChange(cat.id)}
              className={`px-3 py-1.5 sm:px-3.5 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-200 cursor-pointer ${
                selectedFilter === cat.id
                  ? "bg-brand-gold text-white shadow-lg shadow-brand-gold/25 sm:scale-105"
                  : "bg-white/10 hover:bg-white/20 text-slate-300 border border-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </ScrollReveal>

        {/* Locked Fixed-Height Container to Prevent Layout Reshaping */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-stretch lg:h-[620px]">
          {/* Main Map Canvas Area (Cols 1-8) */}
          <div className="lg:col-span-8 sm:bg-slate-900/90 sm:backdrop-blur-md sm:rounded-3xl sm:p-6 sm:border sm:border-white/15 sm:shadow-2xl relative flex flex-col justify-between h-[360px] sm:h-[480px] lg:h-full overflow-hidden">
            {/* Map Top Control Bar - hidden on mobile to reduce clutter */}
            <div className="hidden sm:flex items-center justify-between pb-3 border-b border-white/10 text-xs text-slate-400 shrink-0">
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-slate-500">
                  • {t("map.mapHelp")}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1 text-brand-gold font-medium">
                  <Mountain className="w-3.5 h-3.5" /> {t("map.legendHigh")}
                </span>
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" /> {t("map.legendValleys")}
                </span>
              </div>
            </div>

            {/* Nepal Authentic Map Canvas Wrapper */}
            <div className="relative flex-1 w-full my-0 sm:my-2 sm:rounded-2xl sm:overflow-hidden sm:bg-gradient-to-b sm:from-[#061838] sm:via-[#092248] sm:to-[#041026] sm:border sm:border-white/10 flex items-center justify-center p-0 sm:p-4 select-none">
              {/* Subtle Atmospheric Topographic Grid Pattern - desktop only */}
              <div className="hidden sm:block absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_top,#38bdf8_0%,transparent_70%)]" />
              <svg
                className="hidden sm:block absolute inset-0 w-full h-full pointer-events-none opacity-10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="nepal-grid-pattern"
                    width="36"
                    height="36"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 36 0 L 0 0 0 36"
                      fill="none"
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  fill="url(#nepal-grid-pattern)"
                />
              </svg>

              {/* Responsive Container maintaining Nepal Map proportions */}
              <div className="relative w-full max-w-[850px] aspect-[1807/1048] max-h-full flex items-center justify-center">
                {/* Official Nepal Authentic Geography & Provincial Image */}
                <img
                  src={nepalMapImg}
                  alt="Official Map of Nepal with Provinces"
                  className="w-full h-full object-contain filter drop-shadow-[0_12px_30px_rgba(0,0,0,0.65)] pointer-events-none select-none"
                />

                {/* Hotspot Interactive Markers (Spade Himalaya Pin Markers) */}
                {filteredHotspots.map((spot) => {
                  const isCurrent = currentSpot.id === spot.id;
                  const isExpanded =
                    hoveredSpot?.id === spot.id || pinnedSpotId === spot.id;
                  const isDown = spot.direction === "down";

                  return (
                    <button
                      key={spot.id}
                      type="button"
                      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                      className={`nepal-pin-marker ${isDown ? "nepal-pin-marker--down" : "nepal-pin-marker--up"} ${isCurrent ? "active" : ""} ${isExpanded ? "show-extras" : ""}`}
                      onClick={() => {
                        setActiveSpot(spot);
                        setPinnedSpotId(spot.id);
                      }}
                      onMouseEnter={() => setHoveredSpot(spot)}
                      onMouseLeave={() => setHoveredSpot(null)}
                      aria-label={`Inspect ${spot.name}`}
                    >
                      <span
                        className="nepal-pin-marker__label"
                        style={{
                          opacity: isExpanded ? 1 : 0,
                          pointerEvents: isExpanded ? "auto" : "none",
                          transition:
                            "opacity 260ms ease, transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                          transform: isExpanded ? "scale(1)" : "scale(0.75)",
                          transformOrigin: isDown
                            ? "center top"
                            : "center bottom",
                        }}
                      >
                        <span className="nepal-pin-marker__name">
                          {isNepali ? spot.shortName_np : spot.shortName}
                        </span>
                        <span className="nepal-pin-marker__alt">
                          {spot.elevation}
                        </span>
                      </span>
                      <span
                        className="nepal-pin-marker__line"
                        style={{
                          opacity: isExpanded ? 1 : 0,
                          transition: "opacity 200ms ease 80ms",
                        }}
                      />
                      <div className="nepal-pin-marker__dot-wrap">
                        {isExpanded && (
                          <span className="absolute w-5 h-5 rounded-full bg-brand-gold/60 animate-ping pointer-events-none" />
                        )}
                        <span className="nepal-pin-marker__dot" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Location Pills Bar - simplified on mobile */}
            <div className="pt-2 sm:border-t border-white/10 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none shrink-0">
              <span className="text-[10px] sm:text-xs text-slate-400 font-bold shrink-0 mr-1">
                {t("map.hotspotsLabel")}
              </span>
              {NEPAL_HOTSPOTS.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => {
                    setActiveSpot(spot);
                    setPinnedSpotId(spot.id);
                  }}
                  className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                    currentSpot.id === spot.id
                      ? "bg-brand-gold text-white font-bold shadow-sm"
                      : "bg-white/5 hover:bg-white/15 text-slate-300"
                  }`}
                >
                  {isNepali ? spot.shortName_np : spot.shortName}
                </button>
              ))}
            </div>
          </div>

          {/* Hotspot Preview Card & Explore Box (Cols 9-12) */}
          <div className="lg:col-span-4 bg-white text-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl sm:shadow-2xl border border-slate-200 transition-all duration-300 relative flex flex-col justify-between h-[480px] sm:h-[500px] lg:h-full overflow-hidden">
            {/* Top Badge & Header */}
            <div className="shrink-0">
              <div className="flex items-center justify-between mb-1.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-gold/15 text-brand-gold-dark text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                  {isNepali ? currentSpot.tag_np : currentSpot.tag}
                </span>
                <span className="text-[10px] sm:text-xs font-extrabold text-brand-blue bg-brand-blue/5 px-2 py-0.5 rounded-md border border-brand-blue/10">
                  {currentSpot.elevation}
                </span>
              </div>

              {/* Title & Region */}
              <h3 className="text-lg sm:text-xl font-extrabold text-brand-blue tracking-tight truncate leading-tight">
                {isNepali ? currentSpot.name_np : currentSpot.name}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5 truncate">
                <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-gold shrink-0" />
                <span>{isNepali ? currentSpot.region_np : currentSpot.region}</span>
              </p>
            </div>

            {/* Destination Picture */}
            <div className="relative h-32 sm:h-44 shrink-0 rounded-xl sm:rounded-2xl overflow-hidden shadow-md my-2 group">
              <img
                src={currentSpot.image}
                alt={currentSpot.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[10px] sm:text-[11px]">
                <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded font-semibold">
                  {t("map.best")} {isNepali ? currentSpot.bestSeason_np : currentSpot.bestSeason}
                </span>
                <span className="bg-brand-gold px-2 py-0.5 rounded font-bold text-white shadow">
                  {t("map.verified")}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="h-[3.4rem] sm:h-[3.8rem] shrink-0 overflow-hidden">
              <p className="text-[11px] sm:text-[13px] text-slate-600 leading-relaxed line-clamp-3">
                {isNepali ? currentSpot.description_np : currentSpot.description}
              </p>
            </div>

            {/* Featured Routes Box */}
            <div className="pt-2 border-t border-slate-100 shrink-0">
              <span className="text-[10px] sm:text-[11px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                {t("map.featuredRoutes")}
              </span>
              <div className="h-[72px] sm:h-[80px] overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
                {(isNepali ? currentSpot.topTreks_np : currentSpot.topTreks).map((trek, idx) => (
                  <div
                    key={idx}
                    className="text-[11px] sm:text-xs text-slate-700 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/70 flex items-center justify-between"
                  >
                    <span className="font-semibold truncate pr-2">{trek}</span>
                    <span className="text-brand-gold font-bold text-[9px] sm:text-[10px] shrink-0 inline-flex items-center gap-0.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {t("map.guaranteed")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prominent EXPLORE Button */}
            <div className="mt-auto pt-2.5 border-t border-slate-100 shrink-0">
              <Link
                to={currentSpot.exploreUrl}
                className="w-full inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-white font-extrabold text-xs sm:text-sm py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer group"
              >
                <span>{t("map.explore")} {isNepali ? currentSpot.shortName_np : currentSpot.shortName}</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <div className="text-center mt-1">
                <span className="text-[9px] sm:text-[10px] text-slate-400 block truncate">
                  {t("map.exploreBtnBottom")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}