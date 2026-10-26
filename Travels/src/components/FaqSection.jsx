import React, { useState } from "react";
import { FAQS } from "../data/activitiesData";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";
import { ScrollReveal } from "../hooks/useScrollReveal";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";

export default function FaqSection() {
  const { faqs } = useData();
  const { t, isNepali } = useLanguage();
  const list = faqs && faqs.length > 0 ? faqs : FAQS;
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal animation="fade-up" className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue tracking-tight">
            {t("sections.faqs")}
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            {t("sections.faqsSub")}
          </p>
        </ScrollReveal>

        {/* Accordion List */}
        <div className="space-y-4">
          {list.map((faq, idx) => {
            const questionText = isNepali && faq.question_np ? faq.question_np : faq.question;
            const answerText = isNepali && faq.answer_np ? faq.answer_np : faq.answer;

            return (
              <ScrollReveal
                key={faq.id || idx}
                animation="fade-up"
                delay={idx * 80}
                className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-100/70 transition"
                >
                  <span className="font-bold text-slate-800 text-sm sm:text-base">
                    {questionText}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      openIdx === idx
                        ? "bg-brand-blue text-white rotate-180"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {openIdx === idx && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-200/60 bg-white whitespace-pre-line">
                    {answerText}
                  </div>
                )}
              </ScrollReveal>
            );
          })}
        </div>

        {/* Need more help footer */}
        <ScrollReveal
          animation="fade-up"
          delay={200}
          className="mt-12 text-center bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-300"
        >
          <p className="text-xs sm:text-sm text-slate-600">
            {t("sections.faqNeedHelp")}
          </p>
          <a
            href="https://wa.me/9779851000000"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-brand-green hover:underline cursor-pointer"
          >
            <span>{t("sections.askWhatsApp")} (+977 985-1000000)</span>
            <span>→</span>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
