import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

const ZODIAC =
  "https://static.prod-images.emergentagent.com/jobs/edf86df0-a266-40ef-8241-c97f6683d990/images/3ed66112a1f4ef82b3515b916b8c731f619a3caba0d5c4e6cbdd333691fe7630.png";

export default function FinalCTA({ onCTAClick }) {
  return (
    <section
      data-testid="final-cta"
      className="relative overflow-hidden py-32 md:py-48"
    >
      {/* Background zodiac wheel */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <img
          src={ZODIAC}
          alt=""
          className="h-[120%] w-auto object-contain opacity-25 mix-blend-screen spin-slow"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#030305_75%)]" />
      </div>

      <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-accent text-[11px] tracking-[0.32em] uppercase text-[#E5B869]"
        >
          · The Stars Are Listening ·
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-heading mt-6 text-5xl font-light leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
        >
          Discover what the universe{" "}
          <span className="text-gold-gradient italic font-accent">has planned</span>{" "}
          for you.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-white/60"
        >
          Your personalized AI astro guide is ready. Begin a free reading and
          step into the most aligned chapter of your life.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            data-testid="final-cta-primary"
            onClick={onCTAClick}
            className="btn-gold"
          >
            Start Free Reading <ArrowRight className="h-4 w-4" />
          </button>
          <button
            data-testid="final-cta-secondary"
            onClick={onCTAClick}
            className="btn-ghost"
          >
            <Download className="h-4 w-4" /> Download App
          </button>
        </motion.div>
      </div>
    </section>
  );
}
