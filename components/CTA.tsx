'use client';

import React from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';

export default function CTA() {
  return (
    <section className="relative py-20 sm:py-28 bg-slate-900 dark:bg-slate-950 overflow-hidden border-t border-slate-800">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-6">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Let's Connect</span>
        </div>

        <h2 className="text-3xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
          Let's Talk About <span className="text-emerald-400">Your Project!</span>
        </h2>

        <p className="text-slate-300 dark:text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Use the form to fill out your details and one of our experts will contact you shortly to get more information and send you a free quote. Let's grow your business together!
        </p>

        <a
          href="#contact"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm sm:text-base transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-1 group"
        >
          <span>REQUEST A FREE QUOTE</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}