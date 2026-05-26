import React from "react";
import { motion } from "framer-motion";
import {
  Orbit,
  Briefcase,
  Heart,
  HeartHandshake,
  Coins,
  Sun,
  Flame,
  Bot,
} from "lucide-react";

const FEATURES = [
  { icon: Orbit, title: "Kundali Analysis", desc: "Deep birth-chart decoding — Lagna, planets, dashas and yogas." },
  { icon: Briefcase, title: "Career Predictions", desc: "Dharma path, promotions, business timing and pivot windows." },
  { icon: Heart, title: "Love Compatibility", desc: "Synastry, Guna Milan and emotional chemistry at a glance." },
  { icon: HeartHandshake, title: "Marriage Insights", desc: "When, who, and how — guidance for the most sacred decision." },
  { icon: Coins, title: "Finance & Wealth", desc: "Money patterns, Lakshmi flow and saving rhythms unique to you." },
  { icon: Sun, title: "Daily Horoscope", desc: "Hyper-personalized — never generic Sun-sign clichés again." },
  { icon: Flame, title: "Vedic Remedies", desc: "Modern-friendly rituals, mantras and gemstones that actually fit your life." },
  { icon: Bot, title: "AI Astro Chat", desc: "Ask anything, anytime. Your 24×7 spiritual confidant." },
];

export default function FeaturesGrid() {
  return (
    <section
      id="features"
      data-testid="features-section"
      className="relative py-24 md:py-32"
    >
      <div className="absolute inset-0 -z-10 sacred-grid opacity-30" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#E5B869]/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-accent text-[11px] tracking-[0.3em] uppercase text-[#E5B869]">
            · The Constellation of Features ·
          </span>
          <h2 className="font-heading mt-5 text-4xl font-light leading-tight tracking-tight md:text-5xl">
            Everything you need.{" "}
            <span className="text-gold-gradient italic font-accent">Nothing you don&apos;t.</span>
          </h2>
          <p className="mt-5 text-white/55">
            Eight powerful modules — woven together by AstroMitra&apos;s AI to give you
            a 360° view of your destiny.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="bordered-glow group relative overflow-hidden rounded-3xl glass p-6"
              data-testid={`feature-card-${i}`}
            >
              <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#E5B869]/15 blur-2xl" />
              </div>
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] ring-1 ring-white/10 transition-colors duration-300 group-hover:ring-[#E5B869]/40">
                <f.icon className="h-5 w-5 text-[#E5B869]" />
              </div>
              <h3 className="font-heading text-lg text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
