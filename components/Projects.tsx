'use client';

import React from 'react';
import Image from 'next/image';
import { ExternalLink, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

// Swiper Styles Imports
import 'swiper/css';
import 'swiper/css/navigation';

const projects = [
  {
    id: 1,
    title: 'Visit Uva Tourism Portal',
    category: 'Travel & Tourism',
    location: 'Sri Lanka',
    image: '/projects/uva.jpg',
    url: 'https://visituva.lk',
  },
  {
    id: 2,
    title: 'Evolve',
    category: 'E-Commerce',
    location: 'Sri Lanka',
    image: '/projects/Evolve.png',
    url: 'https://evolveshop.lk/',
  },
  {
    id: 3,
    title: 'Asian Lanka Hotelscool',
    category: 'Education & Institute',
    location: 'Sri Lanka',
    image: '/projects/Asain.png',
    url: 'https://asianlankahotelschool.com/',
  },
  {
    id: 4,
    title: 'P.G Martin',
    category: 'Retail & Fashion',
    location: 'Sri Lanka',
    image: '/projects/Martin.png',
    url: 'https://pgmartin.lk/',
  },
  {
    id: 5,
    title: 'Sekkuwa Heritage Villa',
    category: 'Hospitality & Villa',
    location: 'Hikkaduwa',
    image: '/projects/sekkuwa.png',
    url: 'https://sekkuwavilla.lk/',
  },
  {
    id: 6,
    title: 'Living Hope',
    category: 'Non-Profit & Community',
    location: 'Australia',
    image: '/projects/Living.png',
    url: 'https://livinghope.au/',
  },
  {
    id: 7,
    title: 'Lankaun Locked Tours',
    category: 'Tours & Travel',
    location: 'Sri Lanka',
    image: '/projects/tours.png',
    url: 'https://www.lankaunlockedtours.com/',
  },
];

export default function Projects() {
  return (
    <section id="portfolio" className="relative py-20 sm:py-32 bg-slate-100 dark:bg-slate-950/90 transition-colors duration-300 overflow-hidden border-t border-slate-200 dark:border-slate-800/80">
      
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/10 dark:bg-emerald-500/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        
        {/* Section Header - Centered Layout */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-16">
          <span className="inline-block text-xs sm:text-sm font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.2em] mb-2">
            SELECTED WORK
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Recent <span className="text-emerald-500 dark:text-emerald-400">Projects</span>
          </h2>

          {/* Slider Custom Nav Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 mt-6">
            <button className="custom-prev w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-500 transition-colors shadow-sm cursor-pointer">
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button className="custom-next w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-500 transition-colors shadow-sm cursor-pointer">
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          navigation={{
            prevEl: '.custom-prev',
            nextEl: '.custom-next',
          }}
          breakpoints={{
            640: { slidesPerView: 1.15, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          className="w-full !pb-6"
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative rounded-3xl overflow-hidden bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800/80 shadow-lg dark:shadow-none hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
              >
                {/* Safari / Chrome Browser Window Top Header */}
                <div className="px-4 py-3 bg-slate-200/80 dark:bg-slate-900/90 border-b border-slate-300/60 dark:border-slate-800/80 flex items-center justify-between">
                  {/* Window Control Buttons */}
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  
                  {/* Dummy URL Bar */}
                  <div className="px-3 py-0.5 rounded-full bg-white/70 dark:bg-slate-950/70 text-[10px] text-slate-600 dark:text-slate-400 truncate max-w-[140px] sm:max-w-[170px] font-mono">
                    {project.url.replace('https://', '').replace('http://', '')}
                  </div>

                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                </div>

                {/* Project Screenshot Display */}
                {/* aspect-[16/10] යෙදීමෙන් standard screen ratios වලට කඩන්නේ නැතුව හරියටම පෙනේ */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-950">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={95}
                    priority={project.id <= 3}
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    style={{ imageRendering: 'crisp-edges' }}
                    onError={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.display = 'none';
                    }}
                  />
                  
                  {/* Dark Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-50 group-hover:opacity-20 transition-opacity" />
                </div>

                {/* Card Bottom Details */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {project.category && (
                        <>
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                            {project.category}
                          </span>
                          <span className="text-slate-400 text-[10px]">•</span>
                        </>
                      )}
                      <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                        {project.location}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  {/* Visit Live Website Link Indicator */}
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                    <span>Visit Live Website</span>
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}