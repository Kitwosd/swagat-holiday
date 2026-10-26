import React, { useState } from "react";
import { BLOG_POSTS } from "../data/activitiesData";
import { useData } from "../context/DataContext";
import { ScrollReveal } from "../hooks/useScrollReveal";
import { BookOpen, Calendar, Clock, ArrowRight, X } from "lucide-react";

export default function BlogSection() {
  const { blogPosts } = useData();
  const posts = blogPosts && blogPosts.length > 0 ? blogPosts : BLOG_POSTS;
  const [activeArticle, setActiveArticle] = useState(null);

  return (
    <section
      id="articles"
      className="py-24 bg-slate-50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal
          animation="fade-up"
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue tracking-tight">
            Latest Articles
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Essential preparation, permit updates, gear breakdowns, and route
            comparisons penned by our seasoned expedition guides.
          </p>
        </ScrollReveal>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {posts.map((post, idx) => (
            <ScrollReveal
              key={post.id}
              animation="fade-up"
              delay={idx * 120}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-brand-blue/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-brand-gold" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3
                    onClick={() => setActiveArticle(post)}
                    className="text-base font-bold text-slate-800 group-hover:text-brand-blue transition line-clamp-2 cursor-pointer leading-snug"
                  >
                    {post.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-0">
                <button
                  onClick={() => setActiveArticle(post)}
                  className="w-full text-left text-xs font-bold text-brand-gold group-hover:text-brand-gold-dark flex items-center justify-between pt-3 border-t border-slate-100 cursor-pointer"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Article Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="bg-brand-blue/10 text-brand-blue text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
              {activeArticle.category}
            </span>

            <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-3">
              {activeArticle.title}
            </h3>

            <div className="flex items-center gap-4 text-xs text-slate-400 mb-6 pb-4 border-b border-slate-100">
              <span>Published: {activeArticle.date}</span>
              <span>•</span>
              <span>{activeArticle.readTime}</span>
              <span>•</span>
              <span className="text-brand-green font-semibold">
                Verified by Lead Sherpa
              </span>
            </div>

            <img
              src={activeArticle.image}
              alt={activeArticle.title}
              className="w-full h-64 object-cover rounded-xl mb-6 shadow-md"
            />

            <div className="prose text-sm text-slate-700 space-y-4 leading-relaxed">
              <p className="font-semibold text-slate-800">
                {activeArticle.summary}
              </p>
              <p>
                When planning an expedition across Nepal’s diverse terrain,
                timing, route selection, and local acclimatization practices
                dictate the difference between an ordinary walk and an
                unforgettable life triumph.
              </p>
              <p>
                At Swagat Holidays & Travels, our field teams continually survey
                weather models, trail conditions, and lodge quality before every
                season starts. For personalized route advice or private
                customized itineraries, our Kathmandu operations team is
                available 24/7.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                Have questions regarding this topic?
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="bg-brand-gold hover:bg-brand-gold-dark text-white text-xs font-bold px-4 py-2 rounded-xl transition"
              >
                Close & Return
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
