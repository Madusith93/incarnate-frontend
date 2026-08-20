'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import {
  ExternalLink,
  Sparkles,
  Globe,
} from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AccessibilityTool from '@/components/AccessibilityTool';

type PortfolioItem = {
  id: string;
  title: string;
  domain: string;
  url: string;
  category: string;
  image: string;
};

// Public folder path එකට මාරු කළ Portfolio Items List එක
const portfolioItems: PortfolioItem[] = [
  { id: '1', title: 'Visit Uva', domain: 'www.visituva.lk', url: 'https://www.visituva.lk', category: 'Travel & Tourism', image: '/images/portfolio/visituva.png' },
  { id: '2', title: 'PG Martin', domain: 'www.pgmartin.com', url: 'https://www.pgmartin.com', category: 'E-Commerce', image: '/images/portfolio/pgmartin.png' },
  { id: '3', title: 'Mirailand', domain: 'www.mirailand.com', url: 'https://www.mirailand.com', category: 'Real Estate', image: '/images/portfolio/mirailand.png' },
  { id: '4', title: 'Lankan Unlocked Tours', domain: 'www.lankanunlockedtours.com', url: 'https://www.lankaunlockedtours.com/', category: 'Travel & Tourism', image: '/images/portfolio/lankanunlockedtours.png' },
  { id: '5', title: 'NOAJ', domain: 'www.noaj.net', url: 'https://www.noaj.net', category: 'Corporate', image: '/images/portfolio/noaj.png' },
  { id: '6', title: 'CFPS Sri Lanka', domain: 'www.cfpsl.lk', url: 'https://www.cfpsl.lk', category: 'Education', image: '/images/portfolio/cfpsl.png' },
  { id: '7', title: 'Green Hill 360 Villa', domain: 'www.greenhill360villa.com', url: 'https://www.greenhill360villa.com', category: 'Hospitality', image: '/images/portfolio/greenhill360villa.png' },
  { id: '8', title: 'Living Hope Australia', domain: 'www.livinghope.au', url: 'https://www.livinghope.au', category: 'Healthcare', image: '/images/portfolio/livinghope.png' },
  { id: '9', title: 'Borcelle Cleaners', domain: 'www.borcellecleaners.co.uk', url: 'https://www.borcellecleaners.co.uk', category: 'Services', image: '/images/portfolio/borcellecleaners.png' },
  { id: '10', title: 'Tyre Plaza Lanka', domain: 'www.tyreplazalanka.com', url: 'https://www.tyreplazalanka.com', category: 'Automotive', image: '/images/portfolio/tyreplazalanka.png' },
  { id: '11', title: 'Sekkuwa Villa', domain: 'www.sekkuwavilla.com', url: 'https://sekkuwavilla.lk/', category: 'Hospitality', image: '/images/portfolio/sekkuwavilla.png' },
  { id: '12', title: 'Australasian Education', domain: 'www.australasian.edu.lk', url: 'https://www.australasian.edu.lk', category: 'Education', image: '/images/portfolio/australasian.png' },
  { id: '13', title: 'Queenswood Cottage', domain: 'www.queenswoodcottage.com', url: 'https://www.queenswoodcottage.com', category: 'Hospitality', image: '/images/portfolio/queenswoodcottage.png' },
  { id: '14', title: 'The Living Villa', domain: 'www.thelivingvilla.com', url: 'https://www.thelivingvilla.com', category: 'Hospitality', image: '/images/portfolio/thelivingvilla.png' },
  { id: '15', title: 'KMDSA', domain: 'www.kmdsa.lk', url: 'https://www.kmdsa.lk', category: 'Corporate', image: '/images/portfolio/kmdsa.png' },
  { id: '16', title: 'Preschool Sri Lanka', domain: 'www.preschoolsrilanka.com', url: 'https://www.preschoolsrilanka.com', category: 'Education', image: '/images/portfolio/preschoolsrilanka.png' },
  { id: '17', title: 'WMA Sri Lanka', domain: 'www.wmasrilanka.lk', url: 'https://www.wmasrilanka.lk', category: 'Corporate', image: '/images/portfolio/wmasrilanka.png' },
  { id: '18', title: 'Asian Lanka Hotel School', domain: 'www.asianlankahotelschool.com', url: 'https://www.asianlankahotelschool.com', category: 'Education', image: '/images/portfolio/asianlankahotelschool.png' },
  { id: '19', title: 'Chemnitz Holdings', domain: 'www.chemnitzholdings.com', url: 'https://www.chemnitzholdings.com', category: 'Corporate', image: '/images/portfolio/chemnitzholdings.jpg' },
  { id: '20', title: 'Tamaki International', domain: 'www.tamakinternational.com', url: 'https://www.tamakinternational.com', category: 'Corporate', image: '/images/portfolio/tamakinternational.jpg' },
  { id: '21', title: 'Hansa Surf', domain: 'www.hansasurf.com', url: 'https://www.hansasurf.com', category: 'Sports & Leisure', image: '/images/portfolio/hansasurf.jpg' },
  { id: '22', title: 'Jay Fernando Coach', domain: 'www.jayfernandocoach.com', url: 'https://www.jayfernandocoach.com', category: 'Personal Brand', image: '/images/portfolio/jayfernandocoach.jpg' },
  { id: '23', title: 'Borcelle Cleaners UK', domain: 'www.borcellecleaners.co.uk', url: 'https://www.borcellecleaners.co.uk', category: 'Services', image: '/images/portfolio/borcellecleaners-uk.jpg' },
  { id: '24', title: 'Deyo', domain: 'www.deyo.lk', url: 'https://www.deyo.lk', category: 'Technology', image: '/images/portfolio/deyo.jpg' },
  { id: '25', title: 'JS Eco Power', domain: 'www.jslecopower.com', url: 'https://www.jslecopower.com', category: 'Energy', image: '/images/portfolio/jslecopower.jpg' },
  { id: '26', title: 'Sid Musica', domain: 'www.sidmusica.com', url: 'https://www.sidmusica.com', category: 'Entertainment', image: '/images/portfolio/sidmusica.jpg' },
  { id: '27', title: 'Alternative One', domain: 'www.alternativeone.com', url: 'https://www.alternativeone.com', category: 'Corporate', image: '/images/portfolio/alternativeone.jpg' },
  { id: '28', title: 'Laughs', domain: 'www.laughs.com', url: 'https://www.laughs.com', category: 'Corporate', image: '/images/portfolio/laughs.jpg' },
  { id: '29', title: 'Evolve Shop', domain: 'www.evolveshop.lk', url: 'https://www.evolveshop.lk', category: 'E-Commerce', image: '/images/portfolio/evolveshop.jpg' },
  { id: '30', title: 'Papare Army', domain: 'www.paparearmy.com', url: 'https://www.paparearmy.com', category: 'Entertainment', image: '/images/portfolio/paparearmy.jpg' },
  { id: '31', title: 'Go Sri Lanka', domain: 'www.go-srilanka.com', url: 'https://www.go-srilanka.com', category: 'Travel & Tourism', image: '/images/portfolio/go-srilanka.jpg' },
  { id: '32', title: 'Social Battalion', domain: 'www.socialbattalion.lk', url: 'https://www.socialbattalion.lk', category: 'Media', image: '/images/portfolio/socialbattalion.jpg' },
  { id: '33', title: 'SPC Cadets', domain: 'www.spccadets.lk', url: 'https://www.spccadets.lk', category: 'Education', image: '/images/portfolio/spccadets.jpg' },
  { id: '34', title: 'Sports Pavilion', domain: 'www.sportspavilion.lk', url: 'https://www.sportspavilion.lk', category: 'News & Media', image: '/images/portfolio/sportspavilion.jpg' },
  { id: '35', title: 'Pinnacle Cinema', domain: 'www.pinnaclema.net.au', url: 'https://www.pinnaclema.net.au', category: 'Services', image: '/images/portfolio/pinnaclema.jpg' },
  { id: '36', title: 'Today News', domain: 'www.todaynews.lk', url: 'https://www.todaynews.lk', category: 'News & Media', image: '/images/portfolio/todaynews.jpg' },
  { id: '37', title: 'News Center', domain: 'www.newscenter.lk', url: 'https://www.newscenter.lk', category: 'News & Media', image: '/images/portfolio/newscenter.jpg' },
  { id: '38', title: 'Asian Lanka Beauty', domain: 'www.asianlankabeauty.com', url: 'https://www.asianlankabeauty.com', category: 'Beauty & Lifestyle', image: '/images/portfolio/asianlankabeauty.jpg' },
  { id: '39', title: 'Wedi Vistara', domain: 'www.wedivistara.com', url: 'https://www.wedivistara.com', category: 'News & Media', image: '/images/portfolio/wedivistara.jpg' },
  { id: '40', title: 'Colombo Times', domain: 'www.colombotimes.lk', url: 'https://www.colombotimes.lk', category: 'News & Media', image: '/images/portfolio/colombotimes.jpg' },
];

const categories = ['All', 'Travel & Tourism', 'Hospitality', 'E-Commerce', 'Education', 'Corporate', 'News & Media'];

// Framer Motion Animation Settings
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const cardPopUp: Variants = {
  hidden: { opacity: 0, y: 35, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems =
    selectedCategory === 'All'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col justify-between transition-colors duration-300 relative overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] bg-emerald-500/10 blur-[180px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-10 w-[400px] h-[400px] bg-teal-500/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Main Portfolio Section */}
      <main className="flex-grow py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header Title Section */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center flex flex-col items-center justify-center space-y-4 max-w-3xl mx-auto pt-6"
          >
            <span className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-semibold tracking-widest uppercase bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" /> What We've Built
            </span>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              Transforming Ideas Into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
                Digital Success
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              From concept to launch, we build impactful digital experiences that drive engagement and business growth.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25 scale-105'
                      : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:bg-emerald-500/10 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.section>

          {/* Cards Grid Section */}
          <motion.section
            key={selectedCategory}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-4"
          >
            {filteredItems.map((item) => (
              <motion.a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={cardPopUp}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="group relative bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur-xl rounded-3xl overflow-hidden shadow-lg dark:shadow-2xl hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Browser Mockup Header & Image Container */}
                <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-slate-900 flex items-center justify-center pt-7 p-3">
                  
                  {/* Browser Bar */}
                  <div className="absolute top-0 left-0 right-0 h-7 bg-slate-900/90 backdrop-blur-md z-20 px-3 flex items-center justify-between border-b border-white/10">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-[10px] text-slate-300 font-mono tracking-wider truncate max-w-[180px]">
                      {item.domain}
                    </span>
                    <Globe className="w-3 h-3 text-slate-400" />
                  </div>

                  {/* Website Image (Full Display without cropping) */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain rounded-b-lg transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Hover "View Site" Pop-Up Overlay */}
                  <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-30">
                    <span className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-2xl shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      View Site <ExternalLink className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Card Bottom Domain Label */}
                <div className="p-5 sm:p-6 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
                  <div>
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                      {item.domain}
                    </h3>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-emerald-500 group-hover:text-slate-950 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-all duration-300 flex-shrink-0">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.section>

        </div>
      </main>

      {/* 3. Floating Accessibility Tool */}
      <AccessibilityTool />

      {/* 4. Footer */}
      <Footer />
    </div>
  );
}