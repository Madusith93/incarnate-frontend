'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Award, Users, Code, Search, Sparkles, X, ZoomIn, Play } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AccessibilityTool from '@/components/AccessibilityTool';

type StatItem = {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

type TeamMember = {
  name: string;
  role: string;
  image: string;
};

const stats: StatItem[] = [
  { value: '220+', label: 'Happy Clients', icon: Users },
  { value: '250+', label: 'Web Development', icon: Code },
  { value: '50+', label: 'Web Applications', icon: Award },
  { value: '400+', label: 'SEO Projects', icon: Search },
];

const teamMembers: TeamMember[] = [
  {
    name: 'Pulasthi Wanniarachchi',
    role: 'CEO',
    image: '/team/pulasthi.jpg',
  },
  {
    name: 'Chathuranga Thilakaratne',
    role: 'Tech Lead',
    image: '/team/chathuranga.jpg',
  },
  {
    name: 'Namantha Maduranga',
    role: 'Network & Hardware Engineer',
    image: '/team/namantha.jpeg',
  },
  {
    name: 'Rajesh',
    role: 'Creative Designer',
    image: '/team/rajesh.jpg',
  },
  {
    name: 'Pubudu Adhikari',
    role: 'Creative Designer',
    image: '/team/pubudu.jpg',
  },
  {
    name: 'Shalinga Munasinghe',
    role: 'Senior Software Developer',
    image: '/team/shalinga.jpg',
  },
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: [0.0, 0.0, 0.2, 1] 
    } 
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function AboutPage() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <div className="min-h-screen flex flex-col justify-between transition-colors duration-300 relative overflow-hidden">
      {/* Background Glow Overlay */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* 1. Navigation Bar */}
      <Navbar />

      {/* 2. Main Content */}
      <main className="flex-grow py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-24 sm:space-y-32">
          
          {/* Header Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center flex flex-col items-center justify-center space-y-4 max-w-3xl mx-auto pt-8"
          >
            <div>
              <span className="inline-flex items-center gap-2 text-emerald-500 text-xs sm:text-sm font-semibold tracking-widest uppercase bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full mb-2 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" /> Who We Are
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              About{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                Incarnate
              </span>
            </h1>
            <p className="text-sm sm:text-base opacity-80 leading-relaxed max-w-2xl">
              We build innovative digital experiences, empowering businesses with cutting-edge web development, software engineering, and digital growth strategies.
            </p>
          </motion.section>

          {/* Overview & Our Story Section (Screenshot එකට අනුව එකතු කළ කොටස) */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-8"
          >
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-200">
              Overview
            </h2>

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Overlapping Floating Story Card */}
              <div className="lg:col-span-6 lg:z-10 lg:-mr-16">
                <div className="bg-slate-900/90 border border-slate-800 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-2xl space-y-4">
                  <span className="text-xs font-bold text-emerald-500 tracking-widest uppercase">
                    EST 2010
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                    Our Story
                  </h3>
                  <p className="text-xs sm:text-sm opacity-80 leading-relaxed space-y-3">
                    We are a team of creative professionals working together with you, to convert your precious ideas into a winning certainty. Your website needs to reflect your company's image and products into the world and it must be web design with your customers in mind.
                  </p>
                  <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
                    Incarnate offers you successful website marketing with latest digital marketing trends. We ensure your project communicates effectively to your target audience by designing every last pixel to focus on delivering the right message while making sure your message is outshined from the competition.
                  </p>
                  <div className="pt-2">
                    <button className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center transition-transform duration-300 hover:scale-110 shadow-lg">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Story Right Image */}
              <div className="lg:col-span-6 relative h-[350px] sm:h-[450px] rounded-3xl overflow-hidden border border-slate-800 shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80"
                  alt="Our Story Workspace"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/20" />
              </div>
            </div>
          </motion.section>

          {/* Stats Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="relative group bg-slate-500/5 border border-slate-500/10 rounded-2xl p-6 text-center backdrop-blur-md shadow-sm hover:border-emerald-500/40 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Icon className="w-24 h-24 text-emerald-500" />
                  </div>
                  <h3 className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium opacity-70">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.section>

          {/* CEO Spotlight Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative bg-slate-500/5 border border-slate-500/10 rounded-3xl p-6 sm:p-10 lg:p-12 backdrop-blur-xl shadow-xl overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* CEO Text */}
              <div className="lg:col-span-7 space-y-4 order-2 lg:order-1 text-center lg:text-left">
                <span className="text-xs font-bold text-emerald-500 tracking-widest uppercase bg-emerald-500/10 px-3 py-1 rounded-full inline-block">
                  Leadership
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Mr. Pulasthi Wanniarachchi
                </h2>
                <p className="text-emerald-500 text-sm font-semibold">
                  CEO - Incarnate (Pvt) Ltd
                </p>
                <p className="opacity-80 text-xs sm:text-sm leading-relaxed pt-2">
                  Mr. Pulasthi Wanniarachchi is one of the most proficient and highly competent SEO Engineers in Sri Lanka who dispenses his service to empower and boost online visibility of brands. He is the CEO of Incarnate (Pvt) Ltd, Senior digital marketing consultant, Part-time lecturer for state universities, government and non-government organizations.
                </p>
                <p className="opacity-70 text-xs sm:text-sm leading-relaxed">
                  Specialized in Search Engine Optimization (SEO), Search Engine Marketing (SEM), Social Media Marketing (SMM), and Web Analytics with a high capability to go beyond expectations.
                </p>
              </div>

              {/* CEO Image */}
              <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  onClick={() =>
                    setSelectedMember({
                      name: 'Mr. Pulasthi Wanniarachchi',
                      role: 'CEO - Incarnate (Pvt) Ltd',
                      image: '/team/pulasthi.jpg',
                    })
                  }
                  className="relative w-64 h-72 sm:w-80 sm:h-96 rounded-2xl overflow-hidden border border-emerald-500/30 shadow-2xl group cursor-pointer"
                >
                  <Image
                    src="/team/pulasthi.jpg"
                    alt="Pulasthi Wanniarachchi"
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                  <div className="absolute bottom-4 right-4 bg-emerald-500/20 backdrop-blur-md p-2 rounded-full text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Meet Our Team Section */}
          <section className="space-y-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center space-y-3"
            >
              <span className="text-emerald-500 text-xs font-semibold tracking-widest uppercase">
                The People Behind The Work
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold">
                Meet Our <span className="text-emerald-500">Team</span>
              </h2>
              <p className="text-xs sm:text-sm opacity-75 max-w-xl mx-auto">
                A passionate group of professionals dedicated to delivering exceptional digital experiences.
              </p>
            </motion.div>

            {/* Team Cards Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {teamMembers.map((member, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedMember(member)}
                  className="group relative bg-slate-500/5 border border-slate-500/10 rounded-2xl p-6 text-center backdrop-blur-md hover:border-emerald-500/40 transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden cursor-pointer"
                >
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 mx-auto mb-5 rounded-full overflow-hidden border-2 border-slate-500/20 group-hover:border-emerald-500 transition-colors duration-500 shadow-inner">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ZoomIn className="w-6 h-6 text-emerald-400" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-emerald-500 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-medium opacity-75 mt-1">
                    {member.role}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </section>

        </div>
      </main>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800/80 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-48 h-48 mx-auto mb-4 rounded-2xl overflow-hidden border-2 border-emerald-500/50 shadow-lg">
                <Image
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="text-xl font-bold text-white">
                {selectedMember.name}
              </h3>
              <p className="text-emerald-400 text-xs font-medium mt-1">
                {selectedMember.role}
              </p>
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