import React from "react";
import { motion } from "framer-motion";
import { UserCircle2, Sparkles, ScrollText, ArrowRight } from "lucide-react";

const STEPS = [
  {
    icon: UserCircle2,
    n: "01",
    title: "Enter Birth Details",
    desc: "Just your name, date, time and place of birth — encrypted and never shared.",
  },
  {
    icon: Sparkles,
    n: "02",
    title: "AI + Astrology Analysis",
    desc: "GPT-5.2 cross-references your kundali with Vedic algorithms in real time.",
  },
  {
    icon: ScrollText,
    n: "03",
    title: "Receive Personalized Guidance",
    desc: "A cinematic, deeply personal reading lands in seconds. Save, share or revisit anytime.",
  },
];

export default function HowItWorks({ onCTAClick }) {
  return (
    <section
      id="how"
      data-testid="how-it-works"
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-accent text-[11px] tracking-[0.3em] uppercase text-[#E5B869]">
            · How It Works ·
          </span>
          <h2 className="font-heading mt-5 text-4xl font-light leading-tight tracking-tight md:text-5xl">
            Three steps to{" "}
            <span className="text-gold-gradient italic font-accent">cosmic clarity.</span>
          </h2>
        </div>

        <div className="relative mt-20">
          {/* Connector line */}
          <div className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px md:block">
            <div className="mx-auto h-full max-w-5xl bg-gradient-to-r from-transparent via-[#E5B869]/40 to-transparent" />
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.12, duration: 0.7 }}
                className="relative flex flex-col items-center text-center"
                data-testid={`step-${i}`}
              >
                <div className="relative">
                  <div className="absolute inset-0 -z-10 rounded-full bg-[#E5B869]/20 blur-2xl glow-pulse" />
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[#E5B869]/30 bg-[#0a0a12]">
                    <s.icon className="h-9 w-9 text-[#E5B869]" />
                  </div>
                </div>
                <div className="mt-6 font-accent text-xs tracking-[0.3em] text-[#E5B869]">
                  STEP {s.n}
                </div>
                <h3 className="mt-3 font-heading text-2xl font-light text-white">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/55">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <button
            data-testid="how-cta"
            onClick={onCTAClick}
            className="btn-gold"
          >
            Begin My Journey <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
