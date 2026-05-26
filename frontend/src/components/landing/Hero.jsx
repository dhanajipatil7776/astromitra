import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";

const HERO_DASHBOARD =
  "https://static.prod-images.emergentagent.com/jobs/edf86df0-a266-40ef-8241-c97f6683d990/images/d2a1b2b5794d653fc02592f46c2bbdde43946db2854a9bc7a87bad22f130d9ad.png";
const COSMIC_BG =
  "https://static.prod-images.emergentagent.com/jobs/edf86df0-a266-40ef-8241-c97f6683d990/images/753458d5d9d280e930efe08a9683afe5cf5b414c27292235e787d98fee5f37c9.png";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
};

export default function Hero({ onCTAClick }) {
  return (
    <section
      data-testid="hero-section"
      className="relative isolate overflow-hidden pt-12 md:pt-20 pb-24 md:pb-32"
    >
      {/* Cosmic backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <img
          src={COSMIC_BG}
          alt=""
          className="h-full w-full object-cover opacity-40 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030305]/40 to-[#030305]" />
        <div className="absolute inset-0 sacred-grid opacity-30" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-12 lg:grid-cols-12">
        {/* LEFT */}
        <div className="lg:col-span-6">
          <motion.div {...fadeUp}>
            <span className="font-accent text-[11px] tracking-[0.32em] uppercase text-[#E5B869]">
              · Namaste · The Universe Has a Message ·
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="font-heading mt-6 text-5xl font-light leading-[1.02] tracking-tight text-white md:text-6xl lg:text-[4.25rem]"
          >
            Your Future.{" "}
            <span className="text-gold-gradient italic font-accent">Decoded</span>{" "}
            by AI &amp; Ancient Wisdom.
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="mt-7 max-w-xl text-base font-light leading-relaxed text-white/65 md:text-lg"
          >
            Get deeply personalized astrology insights for career, love, marriage,
            finance and life direction — generated instantly by AstroMitra,
            powered by GPT-5.2 and 5,000 years of Vedic Jyotisha.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.3 }}
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <button
              data-testid="hero-cta-primary"
              onClick={onCTAClick}
              className="btn-gold"
            >
              Get Your Astro Reading
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              data-testid="hero-cta-secondary"
              onClick={onCTAClick}
              className="btn-ghost"
            >
              <MessageCircle className="h-4 w-4" />
              Talk to AstroMitra
            </button>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.45 }}
            className="mt-8 flex items-center gap-2 text-xs text-white/45"
          >
            <ShieldCheck className="h-4 w-4 text-[#E5B869]" />
            Trusted guidance for modern lives — 10,000+ readings generated.
          </motion.div>
        </div>

        {/* RIGHT - Dashboard preview */}
        <div className="relative lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative"
          >
            {/* Outer glow */}
            <div className="absolute -inset-10 -z-10">
              <div className="absolute inset-0 rounded-[3rem] bg-[radial-gradient(circle_at_center,rgba(229,184,105,0.25),transparent_60%)] blur-2xl glow-pulse" />
            </div>

            {/* Floating wrapper */}
            <div className="floaty">
              <div className="relative rounded-3xl border border-white/10 bg-white/[0.02] p-2 shadow-[0_30px_80px_-20px_rgba(229,184,105,0.25)] backdrop-blur-xl">
                <img
                  src={HERO_DASHBOARD}
                  alt="AstroMitra dashboard preview"
                  className="w-full rounded-2xl object-cover"
                  loading="eager"
                />
              </div>
            </div>

            {/* Floating chips */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="absolute -left-4 top-8 hidden rounded-2xl border border-white/10 bg-[#0a0a12]/80 px-4 py-3 backdrop-blur-xl sm:flex md:-left-6"
            >
              <div className="flex items-center gap-2 text-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white/70">Live · Kundali synced</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.15 }}
              className="absolute -right-4 bottom-12 hidden rounded-2xl border border-[#E5B869]/30 bg-[#0a0a12]/80 px-4 py-3 backdrop-blur-xl sm:block md:-right-6"
            >
              <div className="text-[10px] uppercase tracking-widest text-[#E5B869]">
                Compatibility
              </div>
              <div className="mt-1 font-heading text-2xl text-white">
                92<span className="text-sm text-white/40">/100</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
