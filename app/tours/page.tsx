import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Compass,
  Mountain,
  Camera,
  ArrowRight,
  MessageCircle,
  Clock,
  MapPin,
  Car,
  Aperture,
  Flower2,
  Fish,
} from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AccessibilityTool from '@/components/AccessibilityTool';
import DestinationCard, { Destination } from '@/components/tours/DestinationCard';

export const metadata: Metadata = {
  title: 'Incarnate Tours | Explore More. Experience Deeper.',
  description:
    'Incarnate Tours plans custom trips across Sri Lanka from Haliela — family holidays, wildlife safaris, surf journeys, and Ayurvedic wellness retreats, available 24/7.',
};

const pillars = [
  {
    icon: Compass,
    title: 'Curated Experiences',
    description:
      'Every itinerary is planned around what you actually want to do, not a fixed bus route. Tell us your pace and interests, we build the trip.',
  },
  {
    icon: Mountain,
    title: 'Hidden Destinations',
    description:
      'Alongside the landmarks everyone visits, we take you to the quieter spots most tours skip entirely, like the one on our cover.',
  },
  {
    icon: Camera,
    title: 'Memories That Last Forever',
    description:
      'Local guides, unhurried stops, and routes timed for the best light, so what you bring home is more than a checklist.',
  },
];

// Signature Experiences — Incarnate Tours' own named packages, as posted on their
// LinkedIn page. TODO: add real day-by-day itineraries and pricing once available.
const signatureExperiences = [
  {
    days: '12',
    title: 'Grand Discovery Experience',
    description: 'The full island in one trip - highlands, coast, culture, and wildlife at an unhurried pace.',
  },
  {
    days: '8',
    title: 'Adventure Journey',
    description: 'A tighter loop through Sri Lanka\u2019s most active experiences - surf, hikes, and hill country.',
  },
  {
    days: '10',
    title: 'Wildlife & Nature Tour',
    description: 'Built around national parks and elephant encounters, with the coast and highlands woven in.',
  },
];

const destinations: Destination[] = [
  {
    name: "Mini World's End",
    region: 'Passara, Uva Province',
    description:
      'A quiet forest-edge viewpoint near Lunugala that most visitors never hear about the exact spot featured on our cover photo.',
    image: '/tours/destinations/minis-world-end.jpg',
    featured: true,
  },
  {
    name: 'Bomburu Ella (Perawella Falls)',
    region: 'Uva-Paranagama, near Welimada',
    description:
      'One of Sri Lanka\u2019s most beautiful waterfalls, tucked along the border of Nuwara Eliya and Badulla districts.',
    image: '/tours/destinations/bomburu-ella-falls.jpg',
  },
  {
    name: 'Ella & the Nine Arch Bridge',
    region: 'Uva Province',
    description: 'Misty hill country, tea trails, and one of the most photographed railway bridges in Asia.',
    image: '/tours/destinations/nine-arch-bridge.jpg',
  },
  {
    name: 'Mirissa Coast',
    region: 'Southern Coast',
    description: 'Sun-kissed beaches and the kind of evenings that end a trip well.',
    image: '/tours/destinations/mirissa-coast.jpg',
  },
  {
    name: 'Surf Coast - Arugam Bay, Weligama & Hikkaduwa',
    region: 'East & South Coast',
    description: 'Beginner-friendly beaches to thrilling reef breaks, with sunrise and sunset sessions.',
    image: '/tours/destinations/surf-coast.jpg',
  },
  {
    name: 'Elephant Encounters',
    region: 'Minneriya National Park',
    description: 'Watch elephants roam free in their natural habitat, guided by people who know where to look.',
    image: '/tours/destinations/elephant-encounters.jpg',
  },
];

// Wellness — Ayurveda & Fish Therapy are a distinct, recurring product line in
// Incarnate Tours' own posts, based at their Haliela location.
const wellnessExperiences = [
  {
    icon: Flower2,
    title: 'Ayurvedic Spa',
    description:
      'Full body Ayurvedic massage, herbal steam & detox therapies, and customized treatments for mind-body balance - rooted in centuries-old wisdom.',
  },
  {
    icon: Fish,
    title: 'Fish Therapy',
    description:
      'A natural, chemical-free treatment that exfoliates skin and improves circulation - a calm, hygienic way to unwind after a day on the road.',
  },
];

const trustPoints = [
  { icon: MapPin, label: 'Based in Haliela, Sri Lanka' },
  { icon: Clock, label: 'Available 24/7' },
  { icon: Car, label: 'Transport & hotel bookings included' },
  { icon: Aperture, label: 'Professional photography & videography' },
];

export default function ToursPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 relative overflow-x-hidden">
      <Navbar />

      {/* ---------------------------------------------------------------- */}
      {/* HERO — the banner graphic itself, full-bleed, cropped to keep the
          left-aligned logo/wordmark in frame at every breakpoint */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[2.4/1] bg-slate-950 pt-16">
        <Image
          src="/tours/incarnate-tours-hero.jpg"
          alt="Incarnate Tours — Explore More. Experience Deeper. A hiker on a misty forest road beside the Mini World's End sign in Uva Province, Sri Lanka."
          fill
          priority
          sizes="100vw"
          className="object-cover object-[22%_50%] sm:object-[18%_50%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        {/* Screen-reader heading — the visual heading is baked into the banner image above */}
        <h1 className="sr-only">Incarnate Tours - Explore More. Experience Deeper.</h1>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* INTRO STRIP */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative py-14 sm:py-20 bg-slate-950 border-b border-slate-800/80">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Based in Haliela, Incarnate Tours connects travelers with authentic Sri Lankan experiences -
            family-friendly holidays, romantic escapes, wildlife adventures, and peaceful solo retreats, each
            one custom-built and available around the clock.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mt-10">
            {trustPoints.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-slate-300 text-xs sm:text-sm font-semibold">
                <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* PILLARS — Curated Experiences / Hidden Destinations / Memories */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative py-20 sm:py-28 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 dark:bg-emerald-500/5 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-xs sm:text-sm font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.2em] mb-2">
              Why Travel With Us
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Explore More. <span className="text-emerald-500 dark:text-emerald-400">Experience Deeper.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {pillars.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-md dark:shadow-none hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300 mb-6">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* SIGNATURE EXPERIENCES — Incarnate Tours' own named multi-day packages */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative py-20 sm:py-28 bg-slate-900 dark:bg-slate-950 border-t border-slate-800 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-xs sm:text-sm font-extrabold text-emerald-400 uppercase tracking-[0.2em] mb-2">
              Signature Experiences
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Trips Built <span className="text-emerald-400">Around Your Time</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {signatureExperiences.map(({ days, title, description }) => (
              <div
                key={title}
                className="group p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
              >
                <div className="flex items-baseline gap-2 mb-5">
                  <span className="text-4xl font-extrabold text-emerald-400">{days}</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Days</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* DESTINATIONS */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="destinations"
        className="relative py-20 sm:py-32 bg-slate-100 dark:bg-slate-950/90 transition-colors duration-300 overflow-hidden border-t border-slate-200 dark:border-slate-800/80"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/10 dark:bg-emerald-500/5 blur-[150px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <div className="flex flex-col items-center text-center mb-14 sm:mb-16">
            <span className="inline-block text-xs sm:text-sm font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.2em] mb-2">
              Where We Go
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured <span className="text-emerald-500 dark:text-emerald-400">Destinations</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {destinations.map((destination) => (
              <DestinationCard key={destination.name} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* WELLNESS — Ayurveda & Fish Therapy, based at their Haliela location */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative py-20 sm:py-28 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block text-xs sm:text-sm font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.2em] mb-2">
              Slow Down
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Wellness &amp; <span className="text-emerald-500 dark:text-emerald-400">Ayurveda</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-4 max-w-xl mx-auto">
              Traditional treatments in the peaceful surroundings of Haliela - a natural stop for anyone
              travelling slow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {wellnessExperiences.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-md dark:shadow-none hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300 mb-6">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* QUOTE STRIP */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative py-16 sm:py-20 bg-slate-900 dark:bg-slate-950 border-t border-slate-800 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none" />
        <p className="relative z-10 max-w-2xl mx-auto text-center px-6 text-xl sm:text-2xl font-medium italic text-emerald-200">
          &ldquo;Not all those who wander are lost.&rdquo;
        </p>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* CTA */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative py-20 sm:py-28 bg-slate-900 dark:bg-slate-950 overflow-hidden border-t border-slate-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/20 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-5 sm:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-6">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Plan Your Trip</span>
          </div>

          <h2 className="text-3xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Let&apos;s Plan Your <span className="text-emerald-400">Sri Lankan Adventure</span>
          </h2>

          <p className="text-slate-300 dark:text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-2 leading-relaxed">
            Tell us how long you have and what you want to see, and we&apos;ll put together an itinerary and a
            quote - no obligation.
          </p>
          <p className="text-slate-500 text-xs sm:text-sm mb-10">
            Wildlife trips: also reachable 24/7 on{' '}
            <a
              href="https://wa.me/94773177294"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
            >
              +94 77 317 7294
            </a>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/94756641010"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm sm:text-base transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-1 group"
            >
              <span>CHAT ON WHATSAPP</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              href="/#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-transparent border border-slate-700 hover:border-emerald-500/60 text-slate-200 font-bold text-sm sm:text-base transition-all duration-300"
            >
              <span>USE THE CONTACT FORM</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <AccessibilityTool />
    </main>
  );
}