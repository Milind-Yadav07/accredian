"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import { faqs } from "@/data/content";
import gsap from "gsap";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const stopAutoLoop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Helper to animate plus/minus icons with GSAP
  const animateIcons = useCallback((activeIndex: number | null) => {
    iconRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === activeIndex) {
        gsap.to(el, { rotate: 45, duration: 0.35, ease: "back.out(1.7)" });
      } else {
        gsap.to(el, { rotate: 0, duration: 0.35, ease: "power2.out" });
      }
    });
  }, []);

  // Function to start or restart the 3-second auto-loop from a specified index
  const startAutoLoopFrom = useCallback(
    (startIndex: number) => {
      stopAutoLoop();

      intervalRef.current = setInterval(() => {
        setOpenIndex((prev) => {
          const currentIndex = prev === null ? startIndex : prev;
          const nextIndex = (currentIndex + 1) % faqs.length;

          animateIcons(nextIndex);
          return nextIndex;
        });
      }, 3000);
    },
    [animateIcons]
  );

  // Scroll Triggered Auto-Loop Activation
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          if (!intervalRef.current) {
            startAutoLoopFrom(0);
          }
        } else {
          stopAutoLoop();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      stopAutoLoop();
    };
  }, [startAutoLoopFrom]);

  // Initial Staggered Entrance Animation with GSAP
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gsap-faq-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(
        ".gsap-faq-item",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          delay: 0.2,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Manual Click Toggle: Expands selected heading immediately and restarts 3s auto loop from that heading
  const handleToggle = (index: number) => {
    const nextIndex = openIndex === index ? (index + 1) % faqs.length : index;
    setOpenIndex(nextIndex);
    animateIcons(nextIndex);

    // Restart 3-second auto-loop sequence starting from clicked index
    startAutoLoopFrom(nextIndex);
  };

  return (
    <section id="faqs" ref={containerRef} className="bg-white py-24 border-t border-slate-200 scroll-mt-20">
      <Container className="max-w-3xl">
        <div className="gsap-faq-header">
          <SectionLabel label="Frequently Asked Questions" />
          <h2 className="text-3xl md:text-4xl leading-snug mb-12 font-bold text-slate-900">
            Questions enterprise leaders <span className="italic text-[#709F1E]">frequently</span> ask.
          </h2>
        </div>

        <div className="border-t border-slate-200 divide-y divide-slate-200">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} className="gsap-faq-item py-2">
                <button
                  className="w-full flex items-center justify-between gap-6 py-4 text-left group transition-colors"
                  onClick={() => handleToggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span
                    className={`text-base md:text-lg font-bold transition-colors duration-300 ${
                      isOpen ? "text-[#86BC25]" : "text-slate-900 group-hover:text-[#86BC25]"
                    }`}
                  >
                    {item.q}
                  </span>
                  <span
                    ref={(el) => {
                      iconRefs.current[i] = el;
                    }}
                    className="shrink-0 font-mono text-[#86BC25] text-2xl font-bold inline-block"
                    aria-hidden
                    style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    +
                  </span>
                </button>
                <div
                  id={`faq-panel-${i}`}
                  className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed pb-5 max-w-2xl font-normal">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
