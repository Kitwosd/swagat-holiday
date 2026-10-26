import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/logo.jpeg";
import { Phone, Mail, MapPin, Check, Send, ArrowUpRight } from "lucide-react";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";

export default function Footer({ onOpenPlanTrip, onSelectRegion }) {
  const { siteContent } = useData();
  const { t, language, toggleLanguage } = useLanguage();
  const contact = siteContent?.contact_info || {
    phone: "+977-1-4700000",
    mobile: "+977-9851000000",
    email: "hello@swagattravels.com",
    address: "Amrit Marg, Thamel, Kathmandu, Nepal",
    whatsapp: "+9779851000000",
  };

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const quickLinks = [
    { label: "About Us", to: "/about" },
    { label: "Why Choose Us", to: "/about#why-us" },
    { label: "Contact Us", to: "/contact" },
    { label: "Travel Blogs", to: "/travel-info" },
    { label: "Nepal Travels", to: "/treks" },
    { label: "Nepal Tours", to: "/tours" },
    { label: "Destinations", to: "/destinations" },
    { label: "Activities", to: "/activities" },
  ];

  const whatsappNumber = (contact.whatsapp || contact.mobile || "+9779851000000").replace(/[^0-9]/g, "");
  const socialLinks = [
    { name: "Facebook", url: "https://facebook.com" },
    { name: "Instagram", url: "https://instagram.com" },
    { name: "Twitter / X", url: "https://twitter.com" },
    { name: "YouTube", url: "https://youtube.com" },
    { name: "LinkedIn", url: "https://linkedin.com" },
    { name: "WhatsApp", url: `https://wa.me/${whatsappNumber}` },
  ];

  const displayPhone = contact.phone || contact.mobile || "+977 985-1000000";
  const rawPhone = (contact.phone || contact.mobile || "+9779851000000").replace(/\s+/g, "");
  const displayEmail = contact.email || "hello@swagattravels.com";
  const displayAddress = contact.address || "Amrit Marg, Thamel, Kathmandu, Nepal";

  const contactItems = [
    {
      icon: MapPin,
      iconColor: "text-brand-gold",
      content: <span>{displayAddress}</span>,
    },
    {
      icon: Phone,
      iconColor: "text-emerald-400",
      content: (
        <a href={`tel:${rawPhone}`} className="hover:text-white transition">
          {displayPhone}
        </a>
      ),
    },
    {
      icon: Mail,
      iconColor: "text-blue-400",
      content: (
        <a
          href={`mailto:${displayEmail}`}
          className="hover:text-white transition break-all"
        >
          {displayEmail}
        </a>
      ),
    },
  ];

  return (
    <footer
      id="contact"
      className="bg-slate-900 text-slate-300 pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-12 border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 pb-10 sm:pb-14 border-b border-slate-800">
          {/* Brand / Logo */}
          <div className="md:col-span-2 lg:col-span-1 border-r-2 pr-10">
            <Link to="/" className="flex items-center gap-3 min-w-0">
              <div className="rounded-xl bg-white p-1.5 shadow border border-brand-gold/30 shrink-0">
                <img
                  src={logoImg}
                  alt="Swagat Holidays & Travels Logo"
                  width="56"
                  height="56"
                  loading="lazy"
                  decoding="async"
                  className="h-11 w-11 sm:h-12 sm:w-12 object-contain"
                />
              </div>
              <div className="min-w-0">
                <span className="text-xl sm:text-2xl font-extrabold text-white tracking-wider block leading-none">
                  SWAGAT
                </span>
                <span className="text-[11px] sm:text-xs uppercase font-bold text-brand-gold tracking-widest block mt-1.5">
                  Holidays &amp; Travels
                </span>
                <span className="text-xs font-semibold italic text-emerald-400 block mt-1">
                  Every Journey begins with Swagat
                </span>
              </div>
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider mb-4 sm:mb-5 border-l-2 border-brand-gold pl-3">
              Quick Links
            </h4>
            <ul className="flex flex-col flex-wrap gap-x-6 gap-y-2.5 md:gap-y-3 text-sm sm:text-[15px] text-slate-400">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="hover:text-brand-gold hover:scale-103 transition block whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Socials */}
          <div>
            <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider mb-4 sm:mb-5 border-l-2 border-emerald-500 pl-3">
              Follow Us
            </h4>
            <ul className="flex flex-col flex-wrap gap-x-6 gap-y-2.5 md:gap-y-3 text-sm sm:text-[15px]">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 font-semibold text-slate-400 hover:text-brand-gold transition-colors duration-200 whitespace-nowrap"
                  >
                    <span>{social.name}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact Us */}
          <div>
            <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider mb-4 sm:mb-5 border-l-2 border-blue-500 pl-3">
              Contact Us
            </h4>
            <ul className="flex flex-row md:flex-col flex-wrap gap-x-6 gap-y-3 md:gap-y-3.5 text-sm sm:text-[15px] text-slate-400">
              {contactItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <li key={idx} className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 ${item.iconColor}`}
                    />
                    {item.content}
                  </li>
                );
              })}
            </ul>

            {/* Newsletter */}
            <div className="mt-5 sm:mt-7 max-w-xs">
              <span className="text-xs sm:text-sm font-bold text-slate-300 block mb-2.5">
                Himalayan Trail Updates &amp; Offers
              </span>
              {subscribed ? (
                <div className="bg-emerald-900/50 border border-emerald-600/50 text-emerald-300 p-3 rounded-lg text-xs sm:text-sm flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Subscribed! Welcome to Swagat family.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex">
                  <input
                    type="email"
                    required
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-800 border border-slate-700 rounded-l-lg px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold w-full min-w-0"
                  />
                  <button
                    type="submit"
                    className="bg-brand-gold hover:bg-brand-gold-dark text-white px-3.5 py-2.5 rounded-r-lg font-bold transition flex items-center justify-center shrink-0 cursor-pointer"
                    aria-label="Subscribe"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-6 sm:pt-8 flex flex-row md:flex-col items-center justify-between text-xs sm:text-sm text-slate-500 gap-3 sm:gap-4 text-center sm:text-left">
          <div className="order-2 sm:order-1 flex items-center gap-3">
            <span>
              © {new Date().getFullYear()} Swagat Holidays &amp; Travels Pvt. Ltd. {t("footer.copyright")}
            </span>
            <button
              onClick={toggleLanguage}
              className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
            >
              🌐 {language === "en" ? "नेपाली (Nepali)" : "English"}
            </button>
          </div>
          <div className="order-1 sm:order-2 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            <Link to="/about" className="hover:text-slate-300 transition">
              About Us
            </Link>
            <span className="text-slate-700">•</span>
            <Link to="/contact" className="hover:text-slate-300 transition">
              Contact
            </Link>
            <span className="text-slate-700">•</span>
            <Link
              to="/destinations"
              className="hover:text-slate-300 transition"
            >
              Destinations
            </Link>
            <span className="text-slate-700">•</span>
            <Link to="/activities" className="hover:text-slate-300 transition">
              Activities
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
