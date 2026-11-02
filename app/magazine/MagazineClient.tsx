'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowLeft, Share2, Sparkles, BookOpen, Clock, Tag } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AccessibilityTool from '@/components/AccessibilityTool';

interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  /** sanitized HTML from the CMS */
  content: string;
}


export default function MagazineClient({ articles, heading, introHtml }: { articles: Article[]; heading: string; introHtml: string }) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const topThreeArticles = articles.slice(0, 3);
  const remainingArticles = articles.slice(3);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <AnimatePresence mode="wait">
          {selectedArticle ? (
            <motion.div
              key="article-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Magazine
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Article Detailed Section */}
                <div className="lg:col-span-2 space-y-6 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="space-y-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 rounded-full uppercase">
                      <Tag className="w-3 h-3" /> {selectedArticle.category}
                    </span>
                    <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
                      {selectedArticle.title}
                    </h1>
                    {selectedArticle.subtitle && (
                      <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-medium">
                        {selectedArticle.subtitle}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 pt-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" /> {selectedArticle.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" /> {selectedArticle.readTime}
                        </span>
                      </div>
                      <button className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
                        <Share2 className="w-4 h-4" /> Share Article
                      </button>
                    </div>
                  </div>

                  <div className="relative aspect-video rounded-2xl overflow-hidden shadow-inner">
                    <img
                      src={selectedArticle.image}
                      alt={selectedArticle.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div
                    className="cms-prose pt-4 text-slate-700 dark:text-slate-300"
                    dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                  />
                </div>

                {/* Facebook Sidebar */}
                <div className="space-y-6">
                  <div className="sticky top-24 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-800">
                      <svg className="w-5 h-5 fill-blue-600" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      <span>Incarnate Facebook Page</span>
                    </div>
                    <div className="w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 min-h-[420px] flex items-center justify-center">
                      <iframe
                        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fincarnatelk&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
                        width="100%"
                        height="450"
                        style={{ border: "none", overflow: "hidden" }}
                        scrolling="no"
                        frameBorder="0"
                        allowFullScreen={true}
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="magazine-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              {/* Header Title */}
              <div className="text-center space-y-3 max-w-2xl mx-auto">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 rounded-full uppercase border border-emerald-200 dark:border-emerald-800/50">
                  <Sparkles className="w-3.5 h-3.5" /> Incarnate Insights
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight flex items-center justify-center gap-3">
                  <BookOpen className="w-8 h-8 text-emerald-500" /> {heading}
                </h1>
                <div className="text-slate-600 dark:text-slate-400 text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: introHtml }} />
              </div>

              {/* Top 3 Featured Articles Section (Prominent Layout) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Main Featured Hero Article (Spans 7 Cols) */}
                {topThreeArticles[0] && (
                  <div
                    key={topThreeArticles[0].id}
                    onClick={() => setSelectedArticle(topThreeArticles[0])}
                    className="group cursor-pointer lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-emerald-500/30 dark:border-emerald-500/20 shadow-md hover:shadow-2xl hover:border-emerald-500/60 transition-all duration-300 flex flex-col relative"
                  >
                    <div className="relative h-72 sm:h-96 overflow-hidden">
                      <img
                        src={topThreeArticles[0].image}
                        alt={topThreeArticles[0].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                      <span className="absolute top-4 left-4 bg-emerald-500 text-white text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                        {topThreeArticles[0].category}
                      </span>
                    </div>
                    <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between -mt-12 relative z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md mx-4 mb-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-emerald-600 dark:text-emerald-400">
                          <span>{topThreeArticles[0].date}</span>
                          <span>•</span>
                          <span>{topThreeArticles[0].readTime}</span>
                        </div>
                        <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-emerald-500 transition-colors leading-snug">
                          {topThreeArticles[0].title}
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base line-clamp-3 leading-relaxed">
                          {topThreeArticles[0].excerpt}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                          Read Full Story →
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Side Featured Articles (Spans 5 Cols) */}
                <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
                  {topThreeArticles.slice(1, 3).map((art) => (
                    <div
                      key={art.id}
                      onClick={() => setSelectedArticle(art)}
                      className="group cursor-pointer bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row h-full"
                    >
                      <div className="relative w-full sm:w-2/5 min-h-[180px] sm:min-h-full overflow-hidden">
                        <img
                          src={art.image}
                          alt={art.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                          {art.category}
                        </span>
                      </div>
                      <div className="p-5 sm:w-3/5 space-y-2 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                            <span>{art.date}</span>
                            <span>•</span>
                            <span>{art.readTime}</span>
                          </div>
                          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-500 transition-colors line-clamp-2 leading-snug">
                            {art.title}
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-2">
                            {art.excerpt}
                          </p>
                        </div>
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:underline pt-2 inline-block">
                          Read Article →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Remaining Articles Grid */}
              <div className="space-y-6 pt-8 border-t border-slate-200 dark:border-slate-800">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">More Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {remainingArticles.map((art) => (
                    <div
                      key={art.id}
                      onClick={() => setSelectedArticle(art)}
                      className="group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={art.image}
                          alt={art.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">
                            {art.category}
                          </span>
                          <h3 className="font-bold text-base group-hover:text-emerald-500 transition-colors line-clamp-2">
                            {art.title}
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-2">
                            {art.excerpt}
                          </p>
                        </div>
                        <div className="text-xs text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800/50 flex justify-between items-center">
                          <span>{art.date}</span>
                          <span>{art.readTime}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
      <AccessibilityTool />
    </div>
  );
}