import React from "react";
import { motion } from "framer-motion";
import { Brain, ScrollText, Sparkles, Zap } from "lucide-react";

const VEDIC_IMG =
  "https://static.prod-images.emergentagent.com/jobs/edf86df0-a266-40ef-8241-c97f6683d990/images/e142b59a9ede698a90569a204dfd7e47cda94474da67ab6e611da649a2693b79.png";

const CARDS = [
  {
    icon: Brain,
    title: "AI-Powered Predictions",
    desc: "GPT-5.2 reads your birth chart deeply — surfacing patterns no app has shown you before.",
  },
  {
    icon: ScrollText,
    title: "Ancient Vedic Wisdom",
    desc: "Traditional Jyotisha intelligence — Nakshatras, Dashas, Yogas — refined for modern life.",
  },
  {
    icon: Sparkles,
    title: "Personalized Guidance",
    desc: "Every insight is uniquely tailored to your name, birth moment and life context.",
  },
  {
    icon: Zap,
    title: "Instant Clarity",
    desc: "Career, love, marriage, business and future direction — answered in under 60 seconds.",
  },
];

export default function WhySection() {
  return (
    <section
      id="why"
      data-testid="why-section"
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Left intro */}
          <div className="lg:col-span-5">
            <span className="font-accent text-[11px] tracking-[0.3em] uppercase text-[#E5B869]">
              · Why AstroMitra ·
            </span>
            <h2 className="font-heading mt-5 text-4xl font-light leading-tight tracking-tight md:text-5xl">
              Not another horoscope app. <br />
              <span className="text-gold-gradient italic font-accent">A futuristic spiritual mentor.</span>
            </h2>
            <p className="mt-6 max-w-md text-white/60">
              We&apos;ve fused 5,000-year-old Jyotisha with frontier AI to give modern
              seekers the depth of a master astrologer — instantly, privately,
              and beautifully.
            </p>

            <div className="relative mt-10 hidden overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] lg:block">
              <img src={VEDIC_IMG} alt="Vedic astrology motif" className="h-72 w-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 right-5">
                <div className="font-accent text-xs tracking-[0.25em] uppercase text-[#E5B869]">
                  · Jyotisha meets Intelligence ·
                </div>
              </div>
            </div>
          </div>

          {/* Right cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
            {CARDS.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
                whileHover={{ y: -6 }}
                className="bordered-glow group relative overflow-hidden rounded-3xl glass p-7"
                data-testid={`why-card-${i}`}
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#E5B869]/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-50" />
                <div className="relative mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E5B869]/20 to-[#B88A3E]/5 ring-1 ring-[#E5B869]/30">
                  <c.icon className="h-5 w-5 text-[#E5B869]" />
                </div>
                <h3 className="font-heading text-xl text-white">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  {c.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
