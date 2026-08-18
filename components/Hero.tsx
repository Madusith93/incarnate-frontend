'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';
import ParticlesBackground from './ParticlesBackground';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-32 pb-20 px-5 sm:px-8 md:px-12 overflow-hidden bg-slate-950 text-white select-none">
      
      {/* 🌟 Background Animation 🌟 */}
      <ParticlesBackground />

      {/* Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[580px] lg:w-[750px] h-[220px] sm:h-[350px] bg-gradient-to-tr from-emerald-500/25 via-teal-500/15 to-cyan-500/10 rounded-full blur-[110px] sm:blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[200px] sm:w-[320px] h-[200px] sm:h-[320px] bg-emerald-500/10 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none z-0" />

      {/* Cyber Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0c_1px,transparent_1px)] bg-[size:28px_28px] sm:bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_50%,#000_75%,transparent_100%)] pointer-events-none z-0" />

      {/* Main Content Area */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center w-full">
        
        {/* Category Tag / Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-slate-900/95 border border-emerald-500/40 text-emerald-400 font-bold text-xs sm:text-sm uppercase tracking-[0.18em] mb-8 sm:mb-10 backdrop-blur-xl shadow-xl shadow-emerald-500/10 hover:border-emerald-500/60 transition-all max-w-[95vw]">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 hidden sm:inline-block" />
          <span className="truncate">WEB DESIGN & DEVELOPMENT AGENCY</span>
        </div>

        {/* Hero Main Heading */}
        <h1 className="font-[family-name:var(--font-sora)] text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.2] sm:leading-[1.15] mb-8 text-white max-w-4xl">
          We build{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            amazing websites
          </span>{' '}
          and robust software applications
        </h1>

      

        {/* Call to Action Button */}
        <div className="flex justify-center w-full sm:w-auto">
          <Link
            href="#portfolio"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 sm:px-10 py-4 rounded-full shadow-xl shadow-emerald-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            VIEW PORTFOLIO 
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* Key Features */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-slate-800/90 grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-5 text-slate-200 text-xs sm:text-sm font-semibold uppercase tracking-wider w-full max-w-4xl">
          <div className="flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-md shadow-sm hover:border-emerald-500/40 transition-colors">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> High Performance
          </div>
          <div className="flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-md shadow-sm hover:border-emerald-500/40 transition-colors">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> QA Standardized
          </div>
          <div className="flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-md shadow-sm hover:border-emerald-500/40 transition-colors">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Scalable Apps
          </div>
        </div>

      </div>
    </section>
  );
}