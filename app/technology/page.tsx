'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  Code2,
  FileCode2,
  Palette,
  Terminal,
  Layers,
  Server,
  Database,
  Webhook,
  GitBranch,
  Settings2,
  Layout,
  Cloud,
  Sparkles,
  ArrowRight,
  X,
  CheckCircle2,
} from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AccessibilityTool from '@/components/AccessibilityTool';

type Technology = {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
};

const technologies: Technology[] = [
  {
    id: 'html',
    title: 'HTML',
    category: 'Core Web',
    shortDesc: 'The standard markup language used for creating the structure and content of web pages.',
    fullDesc: 'HTML (HyperText Markup Language) is the backbone of all websites, defining structure, semantics, elements, multimedia embedding, and accessible document trees.',
    icon: FileCode2,
    features: ['HTML5 Standard', 'Semantic Markup', 'Web Accessibility (ARIA)', 'SEO Structure'],
  },
  {
    id: 'css',
    title: 'CSS',
    category: 'Core Web',
    shortDesc: 'A stylesheet language that describes the presentation and layout of a document written in HTML or XML.',
    fullDesc: 'CSS handles visual layout, typography, animations, responsive grid system, and modern CSS modules like Tailwind CSS, Flexbox, and CSS Grid.',
    icon: Palette,
    features: ['CSS3 & Modern Layouts', 'Tailwind CSS', 'Responsive Styling', 'Animations & Transitions'],
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    category: 'Core Web',
    shortDesc: 'A versatile programming language that adds interactivity and dynamic behavior to web pages.',
    fullDesc: 'JavaScript brings dynamic logic, DOM manipulation, asynchronous network requests, event handling, and complex client-side engine execution.',
    icon: Terminal,
    features: ['ES6+ Syntax', 'DOM Manipulation', 'Async / Fetch API', 'TypeScript Integration'],
  },
  {
    id: 'frontend-frameworks',
    title: 'Front-end Frameworks',
    category: 'Frontend',
    shortDesc: 'Pre-written code libraries to simplify the development of web interfaces like React, Angular, and Vue.js.',
    fullDesc: 'Powerful front-end reactive user-interface frameworks allowing modular component building, state management, client-side routing, and high performance.',
    icon: Layers,
    features: ['React & Next.js', 'Angular Platform', 'Vue.js Framework', 'Component Architecture'],
  },
  {
    id: 'backend-frameworks',
    title: 'Back-end Frameworks',
    category: 'Backend',
    shortDesc: 'Server-side frameworks to handle business logic and processing (Node.js, Django, Laravel, Rails).',
    fullDesc: 'Robust backend ecosystems capable of high-throughput request handling, business logic, security authentication, background jobs, and API controllers.',
    icon: Server,
    features: ['Node.js & Express', 'Laravel (PHP)', 'Ruby on Rails', 'Django (Python)'],
  },
  {
    id: 'databases',
    title: 'Databases',
    category: 'Backend',
    shortDesc: 'Data storage systems to store and retrieve data like PostgreSQL, MySQL, MongoDB, and SQLite.',
    fullDesc: 'Reliable relational and non-relational database management systems configured for ACID compliance, fast indexing, caching, and scalable architecture.',
    icon: Database,
    features: ['PostgreSQL & MySQL', 'MongoDB (NoSQL)', 'Redis Caching', 'ORM & Migrations'],
  },
  {
    id: 'api',
    title: 'API',
    category: 'Integration',
    shortDesc: 'Interface channels that allow different software applications to communicate and share data seamlessly.',
    fullDesc: 'RESTful and GraphQL API protocols that allow smooth client-server integration, third-party microservice communication, and secure endpoint authentication.',
    icon: Webhook,
    features: ['RESTful Web Services', 'GraphQL APIs', 'Authentication (OAuth/JWT)', 'Swagger Documentation'],
  },
  {
    id: 'vcs',
    title: 'Version Control Systems',
    category: 'DevOps',
    shortDesc: 'Version control tools like Git to track codebase changes, collaborate, and manage releases.',
    fullDesc: 'Distributed code version tracking enabling multi-developer collaboration, feature branching, merge strategies, code review workflows, and commit histories.',
    icon: GitBranch,
    features: ['Git Workflows', 'GitHub & GitLab', 'Branch Management', 'Code Review Audits'],
  },
  {
    id: 'devops-tools',
    title: 'DevOps Tools',
    category: 'DevOps',
    shortDesc: 'Tools assisting in automated building, testing, and deployment (Docker, Jenkins, Kubernetes).',
    fullDesc: 'Automated CI/CD pipelines, container orchestration, server configuration management, and automated testing setups for rapid production deployments.',
    icon: Settings2,
    features: ['Docker Containerization', 'Kubernetes Orchestration', 'CI/CD Pipelines', 'Automated Testing'],
  },
  {
    id: 'responsive-web-design',
    title: 'Responsive Web Design',
    category: 'Design',
    shortDesc: 'Techniques ensuring websites adapt seamlessly across different mobile, tablet, and desktop screen sizes.',
    fullDesc: 'Adaptive layouts, fluid grids, flexible images, and mobile-first design media queries ensuring identical user satisfaction on any screen size.',
    icon: Layout,
    features: ['Mobile-First Design', 'Fluid Grids & Layouts', 'Cross-Browser Support', 'Touch Optimization'],
  },
  {
    id: 'web-servers',
    title: 'Web Servers',
    category: 'DevOps',
    shortDesc: 'Servers such as Apache, Nginx, and LiteSpeed processing and delivering web requests efficiently.',
    fullDesc: 'High-speed server environments configured for reverse proxying, load balancing, SSL termination, static file delivery, and HTTP protocol routing.',
    icon: Server,
    features: ['Nginx Reverse Proxy', 'Apache Server', 'LiteSpeed High Performance', 'SSL & Protocol Security'],
  },
  {
    id: 'cloud-services',
    title: 'Cloud Services',
    category: 'Cloud',
    shortDesc: 'Infrastructure platforms like AWS, Azure, and Google Cloud for hosting and scaling applications.',
    fullDesc: 'Scalable cloud infrastructure provider tools giving elastic computing power, global serverless functions, cloud storage buckets, and server monitoring.',
    icon: Cloud,
    features: ['Amazon Web Services (AWS)', 'Google Cloud Platform', 'Microsoft Azure', 'Auto-Scaling Infrastructure'],
  },
];

const categories = ['All', 'Core Web', 'Frontend', 'Backend', 'Integration', 'DevOps', 'Design', 'Cloud'];

// Animation Variants
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
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardPopUp: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function TechnologyPage() {
  const [activeTech, setActiveTech] = useState<Technology | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTechnologies =
    selectedCategory === 'All'
      ? technologies
      : technologies.filter((t) => t.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col justify-between transition-colors duration-300 relative overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] bg-emerald-500/10 blur-[180px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-10 w-[400px] h-[400px] bg-teal-500/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Main Technologies Content */}
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
              <Sparkles className="w-3.5 h-3.5" /> Modern Stack
            </span>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              Technologies We{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
                Master
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              From web standards and server infrastructure to modern cloud services and DevOps tooling, we build robust systems engineered for long-term scalability.
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
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredTechnologies.map((tech) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={tech.id}
                  variants={cardPopUp}
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  onClick={() => setActiveTech(tech)}
                  className="group relative bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-lg dark:shadow-2xl hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  {/* Subtle Top Hover Accent Bar */}
                  <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div>
                    {/* Header Icon & Tag */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300 shadow-md">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
                        {tech.category}
                      </span>
                    </div>

                    {/* Title & Short Description */}
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {tech.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                      {tech.shortDesc}
                    </p>
                  </div>

                  {/* Learn More Action Footer */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    <span>Explore Overview</span>
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

      {/* Detail Modal */}
      <AnimatePresence>
        {activeTech && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveTech(null)}
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
                onClick={() => setActiveTech(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-md">
                    {React.createElement(activeTech.icon, { className: 'w-7 h-7' })}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">
                      {activeTech.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                      {activeTech.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeTech.fullDesc}
                </p>

                <div className="space-y-3 pt-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Core Capabilities
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeTech.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <button
                    onClick={() => setActiveTech(null)}
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