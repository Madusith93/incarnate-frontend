import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClientLogos from "@/components/ClientLogos";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import AccessibilityTool from "@/components/AccessibilityTool";
import ParticlesBackground from "@/components/ParticlesBackground";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 relative overflow-x-hidden">
      {/* Background Interactive Particles */}
      <ParticlesBackground />

      {/* Navigation Header */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Client Logos Section */}
      <ClientLogos />

      {/* Services Section */}
      <Services />

      {/* Projects Section */}
      <Projects />

      {/* Let's Talk Section */}
      <CTA />

      {/* Footer */}
      <Footer />

      {/* Floating Accessibility Widget */}
      <AccessibilityTool />
    </main>
  );
}