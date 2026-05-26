import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Header({ onCTAClick }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Why Us", href: "#why" },
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <header
      data-testid="site-header"
      className={`sticky top-0 z-30 transition-all duration-500 ${
        scrolled ? "bg-[#030305]/80 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
        <a href="#" data-testid="brand-logo" className="flex items-center gap-2">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="relative h-8 w-8"
          >
            <div className="absolute inset-0 rounded-full border border-[#E5B869]/60" />
            <div className="absolute inset-1 rounded-full border border-[#E5B869]/30" />
            <div className="absolute inset-[6px] rounded-full bg-gradient-to-br from-[#E5B869] to-[#B88A3E]" />
          </motion.div>
          <span className="font-accent text-lg tracking-[0.18em] text-gold-gradient">
            ASTROMITRA
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm text-white/70 transition-colors hover:text-[#E5B869]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          data-testid="header-cta"
          onClick={onCTAClick}
          className="btn-gold !py-2.5 !px-5 text-sm"
        >
          Free Reading
        </button>
      </div>
    </header>
  );
}
