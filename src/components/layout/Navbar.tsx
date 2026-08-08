"use client";

import { useState, useEffect, useRef } from "react";
import Container from "@/components/ui/Container";

const navItems = [
  { href: "#top", label: "Home" },
  { href: "#stats", label: "Stats" },
  { href: "#clients", label: "Clients" },
  { href: "#accredian-edge", label: "Accredian Edge" },
  { href: "#cat", label: "CAT" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#faqs", label: "FAQs" },
  { href: "#testimonials", label: "Testimonials" },
];

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("Home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isNavClickRef = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      if (isNavClickRef.current) return;

      const scrollPos = window.scrollY + 100;

      for (const item of navItems) {
        const id = item.href.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop - 100;
          const bottom = top + element.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveItem(item.label);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: { href: string; label: string }
  ) => {
    e.preventDefault();
    setActiveItem(item.label);
    setOpen(false);

    isNavClickRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isNavClickRef.current = false;
    }, 1000);

    const id = item.href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white border-b border-gray-200/80 transition-shadow duration-200 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <Container className="flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, navItems[0])}
          className="flex flex-col justify-center leading-none select-none group"
        >
          <span className="font-extrabold text-2xl sm:text-3xl tracking-tight text-[#86BC25] font-sans">
            accredian
          </span>
          <span className="text-[10px] sm:text-[11px] text-gray-500 font-normal tracking-wide mt-0.5">
            credentials that matter
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => {
            const isActive = activeItem === item.label;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`relative py-1 text-[15px] font-medium transition-colors duration-150 ${
                  isActive
                    ? "text-[#86BC25] font-semibold"
                    : "text-slate-800 hover:text-[#86BC25]"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-[2.5px] bg-[#86BC25] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="lg:hidden p-2 rounded-none text-slate-700 hover:bg-gray-100 transition-colors"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span
              className={`h-0.5 bg-slate-800 transition-transform duration-200 origin-center ${
                open ? "translate-y-[8px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 bg-slate-800 transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 bg-slate-800 transition-transform duration-200 origin-center ${
                open ? "-translate-y-[8px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </Container>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="lg:hidden border-t border-gray-100 bg-white shadow-lg">
          <Container className="flex flex-col py-4 gap-1">
            {navItems.map((item) => {
              const isActive = activeItem === item.label;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`px-4 py-3 text-base font-medium rounded-none transition-colors ${
                    isActive
                      ? "text-[#86BC25] bg-emerald-50/50 font-semibold border-l-4 border-[#86BC25]"
                      : "text-slate-800 hover:text-[#86BC25] hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </Container>
        </div>
      )}
    </header>
  );
}
