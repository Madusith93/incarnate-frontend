'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PersonStanding, 
  X, 
  ZoomIn, 
  ZoomOut, 
  MousePointer, 
  Contrast, 
  SunMedium, 
  RotateCcw, 
  Sparkles,
  EyeOff
} from 'lucide-react';

export default function AccessibilityTool() {
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [isInvert, setIsInvert] = useState(false);
  const [isBigCursor, setIsBigCursor] = useState(false);

  // Apply visual enhancements globally
  useEffect(() => {
    const html = document.documentElement;
    html.style.zoom = `${zoom}%`;

    if (isHighContrast) html.classList.add('contrast-150');
    else html.classList.remove('contrast-150');

    if (isGrayscale) html.classList.add('grayscale');
    else html.classList.remove('grayscale');

    if (isInvert) html.classList.add('invert');
    else html.classList.remove('invert');

    if (isBigCursor) document.body.classList.add('cursor-lg');
    else document.body.classList.remove('cursor-lg');
  }, [zoom, isHighContrast, isGrayscale, isInvert, isBigCursor]);

  const resetAll = () => {
    setZoom(100);
    setIsHighContrast(false);
    setIsGrayscale(false);
    setIsInvert(false);
    setIsBigCursor(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Pop-up Accessibility Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-5 text-slate-900 dark:text-white"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <PersonStanding className="w-5 h-5 text-emerald-500" />
                <h3 className="font-bold text-sm tracking-wide">Accessibility Tools</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs font-semibold">
              <button
                onClick={() => setZoom((prev) => Math.min(prev + 10, 130))}
                className="flex items-center gap-2 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/60 hover:bg-emerald-500/10 hover:text-emerald-500 transition-colors text-left"
              >
                <ZoomIn className="w-4 h-4 text-emerald-500" />
                <span>Zoom In ({zoom}%)</span>
              </button>

              <button
                onClick={() => setZoom((prev) => Math.max(prev - 10, 90))}
                className="flex items-center gap-2 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/60 hover:bg-emerald-500/10 hover:text-emerald-500 transition-colors text-left"
              >
                <ZoomOut className="w-4 h-4 text-emerald-500" />
                <span>Zoom Out</span>
              </button>

              <button
                onClick={() => setIsBigCursor(!isBigCursor)}
                className={`flex items-center gap-2 p-3 rounded-2xl transition-colors text-left ${
                  isBigCursor ? 'bg-emerald-500 text-slate-950' : 'bg-slate-100 dark:bg-slate-800/60 hover:bg-emerald-500/10'
                }`}
              >
                <MousePointer className="w-4 h-4" />
                <span>Bigger Cursor</span>
              </button>

              <button
                onClick={() => setIsInvert(!isInvert)}
                className={`flex items-center gap-2 p-3 rounded-2xl transition-colors text-left ${
                  isInvert ? 'bg-emerald-500 text-slate-950' : 'bg-slate-100 dark:bg-slate-800/60 hover:bg-emerald-500/10'
                }`}
              >
                <EyeOff className="w-4 h-4" />
                <span>Invert</span>
              </button>

              <button
                onClick={() => setIsHighContrast(!isHighContrast)}
                className={`flex items-center gap-2 p-3 rounded-2xl transition-colors text-left ${
                  isHighContrast ? 'bg-emerald-500 text-slate-950' : 'bg-slate-100 dark:bg-slate-800/60 hover:bg-emerald-500/10'
                }`}
              >
                <Contrast className="w-4 h-4" />
                <span>Contrast</span>
              </button>

              <button
                onClick={() => setIsGrayscale(!isGrayscale)}
                className={`flex items-center gap-2 p-3 rounded-2xl transition-colors text-left ${
                  isGrayscale ? 'bg-emerald-500 text-slate-950' : 'bg-slate-100 dark:bg-slate-800/60 hover:bg-emerald-500/10'
                }`}
              >
                <SunMedium className="w-4 h-4" />
                <span>Grayscale</span>
              </button>
            </div>

            <button
              onClick={resetAll}
              className="mt-4 w-full py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Settings</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-transform"
        aria-label="Accessibility Menu"
      >
        <PersonStanding className="w-7 h-7" />
      </button>
    </div>
  );
}