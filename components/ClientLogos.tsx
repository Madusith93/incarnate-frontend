'use client';

import React from 'react';
import Image from 'next/image';

const brandLogos = [
  { id: 1, name: 'Brand One', logo: '/logos/logo1.png' },
  { id: 2, name: 'Brand Two', logo: '/logos/logo2.png' },
  { id: 3, name: 'Brand Three', logo: '/logos/logo3.png' },
  { id: 4, name: 'Brand Four', logo: '/logos/logo4.webp' },
  { id: 5, name: 'Brand Five', logo: '/logos/logo5.png' },
  { id: 6, name: 'Brand Six', logo: '/logos/logo6.png' },
  { id: 7, name: 'Brand Seven', logo: '/logos/logo7.png' },
  { id: 8, name: 'Brand Eight', logo: '/logos/logo8.png' },
  { id: 9, name: 'Brand Nine', logo: '/logos/logo9.png' },
  { id: 10, name: 'Brand Ten', logo: '/logos/logo10.png' },
  { id: 11, name: 'Brand Eleven', logo: '/logos/logo11.png' },
  { id: 12, name: 'Brand Twelve', logo: '/logos/logo12.png' },
  { id: 13, name: 'Brand Thirteen', logo: '/logos/logo13.png' },
  { id: 14, name: 'Brand Fourteen', logo: '/logos/logo14.png' },
];

export default function ClientLogos() {
  const duplicatedLogos = [...brandLogos, ...brandLogos];

  return (
    <section className="relative py-16 sm:py-24 bg-slate-100 dark:bg-slate-950/80 transition-colors duration-300 overflow-hidden border-y border-slate-200 dark:border-slate-800/80">
      
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[150px] bg-emerald-500/10 dark:bg-emerald-500/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block text-xs sm:text-sm font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.2em] mb-2">
            TRUSTED BY GROWING BUSINESSES
          </span>
          <h2 className="text-2xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Brands that work with us
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-medium mt-2 max-w-lg mx-auto">
            A few of the innovative companies we&apos;ve helped build, launch, and grow.
          </p>
        </div>

        {/* Marquee Carousel Container with Gradient Side Fades */}
        <div className="relative w-full overflow-hidden group">
          
          {/* Left & Right Fade Shadows for Depth */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-slate-100 dark:from-slate-950 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-slate-100 dark:from-slate-950 to-transparent z-20 pointer-events-none" />

          {/* Scrolling Track */}
          <div className="flex w-max gap-4 sm:gap-6 animate-marquee group-hover:[animation-play-state:paused] py-4">
            {duplicatedLogos.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="w-44 sm:w-56 h-24 sm:h-28 shrink-0 flex items-center justify-center p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:shadow-md hover:shadow-emerald-500/10 transition-all duration-300 group/card"
              >
                {/* Image Box */}
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl bg-white p-2">
                  <Image
                    src={item.logo}
                    alt={item.name}
                    width={200}
                    height={90}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover/card:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.fallback-text')) {
                        const textNode = document.createElement('span');
                        textNode.className = 'fallback-text text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover/card:text-emerald-500 transition-colors text-center px-1';
                        textNode.innerText = item.name;
                        parent.appendChild(textNode);
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}