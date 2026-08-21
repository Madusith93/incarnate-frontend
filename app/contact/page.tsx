'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Sparkles, CheckCircle2, Loader2 } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AccessibilityTool from '@/components/AccessibilityTool';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between transition-colors duration-300 relative overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <Navbar />

      <main className="flex-grow py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto pt-6">
            <span className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-semibold tracking-widest uppercase bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" /> Get In Touch
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              Let’s Build Something{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
                Great Together
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
              Have a project in mind or need assistance? Reach out to our team today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl backdrop-blur-xl flex items-start gap-4 shadow-sm">
              <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Our Address</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  No 71/A, Rosavilla, Badulla Road, Hali-Ela, Sri Lanka
                </p>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl backdrop-blur-xl flex items-start gap-4 shadow-sm">
              <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Email Us</h3>
                <a href="mailto:info@incarnate.lk" className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-emerald-500 transition-colors">
                  info@incarnate.lk
                </a>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl backdrop-blur-xl flex items-start gap-4 shadow-sm">
              <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Call Us</h3>
                <a href="tel:+94771964066" className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-emerald-500 transition-colors">
                  +94 771 964 066
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Google Map with Location Marker */}
            <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 min-h-[380px] shadow-lg">
              <iframe
                title="Incarnate Location"
                src="https://maps.google.com/maps?q=Incarnate%20(Pvt)%20Ltd%2C%20Hali-Ela%2C%20Sri%20Lanka&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                allowFullScreen
                loading="lazy"
              />
            </div>

            <div className="lg:col-span-6 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-center">
              {submitted ? (
                <div className="text-center space-y-4 py-8">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                  <h3 className="text-2xl font-bold">Message Sent!</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Thank you for reaching out. Your message has been received.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs font-semibold text-emerald-500 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Your Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">Contact No</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+94 7X XXX XXXX"
                      className="w-full bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">Message</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your project..."
                      className="w-full bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Send Message <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </main>

      <AccessibilityTool />
      <Footer />
    </div>
  );
}