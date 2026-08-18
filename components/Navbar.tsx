'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Technology', href: '#technology' },
  { name: 'Magazine', href: '#magazine' },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentTheme = mounted ? (theme === 'system' ? resolvedTheme : theme) : 'dark';
  const isLight = currentTheme === 'light';

  // Dynamic Background Styles
  const getHeaderStyles = () => {
    if (scrolled) {
      return isLight
        ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm py-3.5'
        : 'bg-slate-950/85 backdrop-blur-md border-b border-emerald-500/10 shadow-sm py-3.5';
    }
    return 'bg-transparent py-5';
  };

  // Dynamic Text Colors for Links & Logo
  const getTextColor = () => {
    if (scrolled && isLight) {
      return 'text-slate-900 hover:text-emerald-600';
    }
    return 'text-slate-100 hover:text-emerald-400';
  };

  const getLogoColor = () => {
    if (scrolled && isLight) {
      return 'text-slate-900';
    }
    return 'text-white';
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getHeaderStyles()}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <Link className="flex items-center gap-2 group" href="/">
          <span className={`text-2xl font-black tracking-wider transition-colors ${getLogoColor()}`}>
            INCARNATE<span className="text-emerald-500">.</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-semibold transition-colors ${getTextColor()}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-4">
          
          {/* Dynamic Theme Toggle Button */}
          {mounted ? (
            <button
              onClick={() => setTheme(isLight ? 'dark' : 'light')}
              className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                scrolled && isLight
                  ? 'border-slate-300 bg-slate-100 text-slate-800 hover:border-emerald-500'
                  : 'border-slate-700/80 bg-slate-900/80 text-slate-200 hover:border-emerald-400'
              }`}
              aria-label="Toggle Theme"
            >
              {isLight ? (
                <Moon className="w-4 h-4 text-emerald-600" />
              ) : (
                <Sun className="w-4 h-4 text-emerald-400" />
              )}
            </button>
          ) : (
            <div className="w-9 h-9 rounded-full border border-slate-700/80 bg-slate-900/80" />
          )}

          {/* Contact CTA Button */}
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.02]"
          >
            Contact <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center gap-3 lg:hidden">
          {mounted && (
            <button
              onClick={() => setTheme(isLight ? 'dark' : 'light')}
              className={`p-2 rounded-full border ${
                scrolled && isLight
                  ? 'border-slate-300 bg-slate-100 text-slate-800'
                  : 'border-slate-700/80 bg-slate-900/80 text-slate-200'
              }`}
            >
              {isLight ? (
                <Moon className="w-4 h-4 text-emerald-600" />
              ) : (
                <Sun className="w-4 h-4 text-emerald-400" />
              )}
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 ${scrolled && isLight ? 'text-slate-900' : 'text-white'}`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 backdrop-blur-xl px-6 py-6 space-y-4 text-white">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold text-slate-200 hover:text-emerald-400"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-block w-full text-center bg-emerald-500 text-slate-950 font-bold text-sm uppercase px-5 py-3 rounded-xl mt-4"
          >
            Contact Us
          </Link>
        </div>
      )}
    </header>
  );
}