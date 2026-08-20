'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  Code,
  Globe,
  Smartphone,
  Sparkles,
  Bot,
  Cpu,
  Search,
  LineChart,
  Boxes,
  Megaphone,
  ArrowRight,
  X,
  CheckCircle2,
} from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AccessibilityTool from '@/components/AccessibilityTool';

type Service = {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
};

const services: Service[] = [
  {
    id: 'web-dev',
    title: 'Web Design & Development',
    category: 'Development',
    shortDesc: 'Custom, high-performing websites built with modern frameworks and responsive design principles.',
    fullDesc: 'We craft stunning, lightning-fast web applications tailored to your brand identity. Using Next.js, React, and Tailwind CSS, we ensure seamless user experience across all devices with peak performance and SEO readiness.',
    icon: Globe,
    features: ['Responsive UI/UX', 'SEO Optimization', 'Next.js & React Expert', 'Custom CMS Solutions'],
  },
  {
    id: 'software-dev',
    title: 'Custom Software Development',
    category: 'Engineering',
    shortDesc: 'Scalable software solutions designed to streamline business workflows and enhance productivity.',
    fullDesc: 'Empower your enterprise with scalable, reliable custom software solutions. From backend API architecture to full-stack management tools, we build robust systems engineered for long-term growth.',
    icon: Code,
    features: ['Cloud Native Architecture', 'API Integration & Design', 'Database Management', 'Enterprise Security'],
  },
  {
    id: 'mobile-apps',
    title: 'Mobile App Development',
    category: 'Engineering',
    shortDesc: 'Native and cross-platform mobile apps delivering seamless experiences on iOS and Android.',
    fullDesc: 'Transform your ideas into interactive mobile applications. We build high-performance iOS and Android applications with clean code, modern UX, and real-time capabilities.',
    icon: Smartphone,
    features: ['Cross-Platform (React Native/Flutter)', 'iOS & Android Native', 'Push Notifications', 'Offline Functionality'],
  },
  {
    id: 'ai-chatbot',
    title: 'Customer Care AI Chatbot',
    category: 'Artificial Intelligence',
    shortDesc: 'Custom trained AI chatbots delivering personalized 24/7 customer care, ordering, and troubleshooting.',
    fullDesc: 'Automate support and boost customer engagement with intelligent AI agents trained on your business data. Provide instant answers, lead generation, and workflow automation around the clock.',
    icon: Bot,
    features: ['24/7 Automated Support', 'Custom Knowledge Training', 'Multi-channel Integration', 'Analytics & Insights'],
  },
  {
    id: 'geo-optimization',
    title: 'Generative Engine Optimization (GEO)',
    category: 'Digital Strategy',
    shortDesc: 'Optimize your digital presence for AI search platforms like ChatGPT, Gemini, and Perplexity.',
    fullDesc: 'Future-proof your brand by ensuring visibility across modern generative AI search engines. We optimize your content structure and citations to get recommended by AI models.',
    icon: Cpu,
    features: ['AI Model Visibility', 'Entity & Knowledge Graphing', 'Content Restructuring', 'Citation Management'],
  },
  {
    id: 'aeo-optimization',
    title: 'Answer Engine Optimization (AEO)',
    category: 'Digital Strategy',
    shortDesc: 'Make your business the trusted answer across AI assistants, voice search, and featured snippets.',
    fullDesc: 'Dominate featured snippets and voice assistant queries. We structure your data and content into authoritative answers that search engines and AI assistants prioritize.',
    icon: Search,
    features: ['Featured Snippets Target', 'Voice Search Readiness', 'Structured Schema Markup', 'Authority Building'],
  },
  {
    id: 'blockchain',
    title: 'Blockchain Solutions',
    category: 'Innovation',
    shortDesc: 'Develop secure blockchain systems, smart contracts, and decentralized applications.',
    fullDesc: 'Leverage decentralized technology to improve transparency, trust, and security in your operations with custom smart contracts and Web3 solutions.',
    icon: Boxes,
    features: ['Smart Contract Audit', 'Decentralized Apps (dApps)', 'Tokenomics & Web3', 'High Security Standards'],
  },
  {
    id: 'digital-marketing',
    title: 'SEO & Growth Marketing',
    category: 'Digital Strategy',
    shortDesc: 'Data-driven SEO strategies, performance marketing, and conversion optimization to boost ROI.',
    fullDesc: 'Drive high-intent traffic and scale your revenue. Our comprehensive SEO and digital marketing campaigns enhance your search rankings and convert visitors into loyal clients.',
    icon: LineChart,
    features: ['Technical SEO Audits', 'Keyword Strategy', 'Conversion Rate Optimization', 'Performance Analytics'],
  },
  {
    id: 'social-media-marketing',
    title: 'Social Media Marketing',
    category: 'Digital Strategy',
    shortDesc: 'Strategic social media campaigns to boost brand engagement and drive qualified leads.',
    fullDesc: 'Maximize your audience reach across social platforms with compelling content strategies, paid campaign management, and active community engagement designed for growth.',
    icon: Megaphone,
    features: ['Content Strategy & Creation', 'Paid Ad Campaigns', 'Audience Growth & Analytics', 'Brand Reputation Management'],
  },
];

const categories = ['All', 'Development', 'Engineering', 'Artificial Intelligence', 'Digital Strategy', 'Innovation'];

// Header animation
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// Container stagger controller
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Card pop-up / reveal animation (Simulating video original transition)
const cardPopUp: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function ServicesPage() {
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredServices = selectedCategory === 'All' 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col justify-between transition-colors duration-300 relative overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] bg-emerald-500/10 blur-[180px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-10 w-[400px] h-[400px] bg-teal-500/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Main Services Section */}
      <main className="flex-grow py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Header Section */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center flex flex-col items-center justify-center space-y-4 max-w-3xl mx-auto pt-8"
          >
            <span className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-semibold tracking-widest uppercase bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" /> What We Offer
            </span>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              Our Modern{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
                Services
              </span>
            </h1>
            
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              From high-impact web design to cutting-edge AI and growth strategies, we deliver future-ready solutions designed to elevate your brand.
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

          {/* Grid with Scroll-Triggered Pop-Up Stagger Animation */}
          <motion.section
            key={selectedCategory}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredServices.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  variants={cardPopUp}
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  onClick={() => setActiveService(service)}
                  className="group relative bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-lg dark:shadow-2xl hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  {/* Subtle Accent Glow Bar */}
                  <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div>
                    {/* Header Icon & Tag */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300 shadow-md">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
                        {service.category}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                      {service.shortDesc}
                    </p>
                  </div>

                  {/* Action Link */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    <span>Learn More</span>
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-emerald-500 group-hover:text-slate-950 flex items-center justify-center transition-all duration-300">
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.section>

        </div>
      </main>

      {/* Service Modal */}
      <AnimatePresence>
        {activeService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveService(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 max-w-2xl w-full shadow-2xl overflow-hidden my-8"
            >
              <button
                onClick={() => setActiveService(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-md">
                    {React.createElement(activeService.icon, { className: 'w-7 h-7' })}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">
                      {activeService.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                      {activeService.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeService.fullDesc}
                </p>

                <div className="space-y-3 pt-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Key Features
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeService.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <button
                    onClick={() => setActiveService(null)}
                    className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-2xl transition-transform active:scale-95 shadow-lg"
                  >
                    Got It
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Accessibility Tool & Footer */}
      <AccessibilityTool />
      <Footer />
    </div>
  );
}