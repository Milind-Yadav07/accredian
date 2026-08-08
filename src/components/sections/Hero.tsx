"use client";

import { useState, useEffect } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const heroImages = [
  "/home-image1.jpg",
  "/home-image2.jpg",
  "/home-image3.jpg",
  "/home-image4.jpg",
];

interface HeroProps {
  onOpenEnquire?: () => void;
}

export default function Hero({ onOpenEnquire }: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentImageIndex]);

  return (
    <section id="top" className="relative text-white overflow-hidden py-14 md:py-20 min-h-[50vh] md:min-h-[55vh] flex items-center">
      {/* Background Slideshow Images */}
      {heroImages.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out ${
            index === currentImageIndex
              ? "opacity-100 scale-100 z-0"
              : "opacity-0 scale-105 pointer-events-none z-0"
          }`}
          style={{ backgroundImage: `url('${src}')` }}
        />
      ))}

      {/* Dark overlay for optimal text contrast */}
      <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[2px] z-0" />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-4">
            <span className="font-mono text-xs text-[#86BC25] uppercase tracking-wider font-semibold">
              Accredian
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.15] tracking-tight font-bold text-white drop-shadow-md">
            Next-gen expertise,
            <br />
            <span className="italic text-[#86BC25]">built for your</span> enterprise.
          </h1>

          <p className="mt-4 text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto drop-shadow">
            Empower your workforce with enterprise-ready skills in AI, Data Science, and Executive Leadership. We partner with top academic institutions and industry leaders to deliver custom learning pathways that drive real business results.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
            <Button variant="primary" onClick={onOpenEnquire}>
              Enquire Now
            </Button>
            <a href="#cat">
              <Button variant="secondary">Explore tracks</Button>
            </a>
          </div>

          {/* Slideshow indicator dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImageIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentImageIndex
                    ? "w-7 bg-[#86BC25]"
                    : "w-2 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
