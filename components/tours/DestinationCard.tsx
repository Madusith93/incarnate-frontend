'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, ArrowUpRight } from 'lucide-react';

export interface Destination {
  name: string;
  region: string;
  description: string;
  /** Path under /public, e.g. "/tours/destinations/ella.jpg". Leave null to show the placeholder tile. */
  image: string | null;
  featured?: boolean;
}

export default function DestinationCard({ destination }: { destination: Destination }) {
  const { name, region, description, image, featured } = destination;

  return (
    <div
      className={`group relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900/80 border transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full ${
        featured
          ? 'border-emerald-500/60 shadow-lg shadow-emerald-500/10 dark:shadow-emerald-500/5 lg:col-span-2'
          : 'border-slate-200/80 dark:border-slate-800 shadow-md dark:shadow-none hover:border-emerald-500/50 dark:hover:border-emerald-500/50'
      }`}
    >
      {/* Image / Placeholder */}
      <div className={`relative w-full overflow-hidden bg-slate-950 ${featured ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          // Placeholder tile — swap for a real photo by adding an `image` path to the destinations array
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-800 via-slate-900 to-emerald-950">
            <MapPin className="w-7 h-7 text-emerald-500/50" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Photo coming soon
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent" />

        {featured && (
          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-widest">
            From our cover shot
          </span>
        )}

        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
          <div>
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-emerald-300">
              <MapPin className="w-3 h-3" /> {region}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-1">{name}</h3>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{description}</p>
        <a
          href={`https://wa.me/94756641010?text=${encodeURIComponent(`Hi! I'd like to ask about a trip to ${name}.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
        >
          <span>Ask about this trip</span>
          <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
}