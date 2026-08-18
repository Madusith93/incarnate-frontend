'use client';

import React from 'react';
import { 
  Code2, 
  Layout, 
  ShoppingCart, 
  Cpu, 
  Zap,
  Smartphone 
} from 'lucide-react';

const services = [
  {
    icon: Code2,
    title: 'Development',
    description: 'Partner with our experienced team and develop robust software applications, whether you are a start-up or an established business.',
    tag: 'Web & Cloud'
  },
  {
    icon: Layout,
    title: 'Website',
    description: 'Looking to build a new website or transform an existing one that isn’t performing? We create engaging websites that drive enquiries.',
    tag: 'UI/UX Design'
  },
  {
    icon: ShoppingCart,
    title: 'Ecommerce',
    description: 'Feature-rich and conversion-optimised, our eCommerce websites along with our industry leading experience give you complete control.',
    tag: 'Online Store'
  },
  {
    icon: Smartphone,
    title: 'Mobile Applications',
    description: 'Custom iOS and Android mobile apps designed for high performance, smooth user experiences, and seamless cross-platform integration.',
    tag: 'iOS & Android'
  },
  {
    icon: Cpu,
    title: 'System Integration',
    description: 'Seamlessly connecting third-party services, databases, and microservices for enterprise scalable systems.',
    tag: 'Backend Arch'
  },
  {
    icon: Zap,
    title: 'Performance & Speed',
    description: 'Speeding up web vitals, enhancing security, and optimizing codebases for peak user experience and search rankings.',
    tag: 'SEO & Speed'
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-32 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 dark:bg-emerald-500/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Our <span className="text-emerald-500 dark:text-emerald-400">Services</span>
          </h2>
          <div className="w-16 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Services Grid (Balanced 6-Item Grid Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-center">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group relative p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-md dark:shadow-none hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
              >
                {/* Top Bar: Icon & Tag */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  
                  <span className="text-[11px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60">
                    {service.tag}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 text-sm font-normal leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}