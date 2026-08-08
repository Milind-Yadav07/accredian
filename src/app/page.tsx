"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import TrustBar from "@/components/sections/TrustBar";
import Features from "@/components/sections/Features";
import Programs from "@/components/sections/Programs";
import HowItWorks from "@/components/sections/HowItWorks";
import FAQ from "@/components/sections/FAQ";
import Testimonials from "@/components/sections/Testimonials";
import EnquireModal from "@/components/modals/EnquireModal";

export default function Home() {
  const [isEnquireOpen, setIsEnquireOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main>
        <Hero onOpenEnquire={() => setIsEnquireOpen(true)} />
        <Stats />
        <TrustBar />
        <Features />
        <Programs />
        <HowItWorks />
        <FAQ />
        <Testimonials />
      </main>
      <Footer onOpenEnquire={() => setIsEnquireOpen(true)} />
      <EnquireModal
        isOpen={isEnquireOpen}
        onClose={() => setIsEnquireOpen(false)}
      />
    </>
  );
}
