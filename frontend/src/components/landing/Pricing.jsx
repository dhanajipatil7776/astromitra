import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Crown, Check, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const INCLUSIONS = [
  "60-page personalized Kundali deep dive PDF",
  "Dasha & Antardasha timeline — next 7 years mapped",
  "Career, marriage & wealth windows with exact dates",
  "Custom remedies + gemstone prescription",
  "Live 30-min voice call with senior astrologer",
];

export default function Pricing() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email.");
      return;
    }
    setBusy(true);
    try {
      await axios.post(`${API}/notify`, { email, product: "kundali_deep_dive" });
      toast.success("You're on the list. We'll alert you the moment it goes live ✨");
      setDone(true);
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Could not save. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section
      id="pricing"
      data-testid="pricing-section"
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-accent text-[11px] tracking-[0.3em] uppercase text-[#E5B869]">
            · Going Deeper ·
          </span>
          <h2 className="font-heading mt-5 text-4xl font-light leading-tight tracking-tight md:text-5xl">
            For when a reading{" "}
            <span className="text-gold-gradient italic font-accent">
              isn&apos;t enough.
            </span>
          </h2>
          <p className="mt-5 text-white/60">
            Once a quarter, AstroMitra releases a full Kundali Deep Dive — AI-mapped, astrologer-reviewed,
            and stunningly produced. Limited to 100 seekers per cohort.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Free tier */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bordered-glow relative overflow-hidden rounded-3xl glass p-8"
            data-testid="plan-free"
          >
            <div className="font-accent text-[10px] uppercase tracking-[0.3em] text-white/50">
              · The Spark ·
            </div>
            <h3 className="font-heading mt-3 text-2xl text-white">Free AI Reading</h3>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-heading text-5xl text-white">₹0</span>
              <span className="text-sm text-white/40">/ always</span>
            </div>
            <ul className="mt-7 space-y-2.5 text-sm text-white/70">
              {[
                "Personalized AI reading in 5 sections",
                "5 Vedic remedies + lucky stars",
                "Shareable link & PDF download",
                "Daily WhatsApp horoscope",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs text-white/40">
              Already included. Scroll up to begin →
            </p>
          </motion.div>

          {/* Premium tier */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative overflow-hidden rounded-3xl border border-[#E5B869]/40 bg-gradient-to-br from-[#E5B869]/[0.08] to-transparent p-8 shadow-[0_20px_60px_-15px_rgba(229,184,105,0.25)]"
            data-testid="plan-premium"
          >
            {/* Glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-[#E5B869]/15 blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="font-accent text-[10px] uppercase tracking-[0.3em] text-[#E5B869]">
                  · The Deep Dive ·
                </div>
                <div className="inline-flex items-center gap-1 rounded-full border border-[#E5B869]/40 bg-[#E5B869]/[0.06] px-2.5 py-1 text-[10px] uppercase tracking-widest text-[#E5B869]">
                  <Crown className="h-3 w-3" /> Most Loved
                </div>
              </div>
              <h3 className="font-heading mt-3 text-2xl text-white">
                Kundali Deep Dive
              </h3>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-heading text-5xl text-gold-gradient">₹699</span>
                <span className="text-sm text-white/50 line-through">₹1,999</span>
                <span className="ml-2 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-emerald-300">
                  Founding offer
                </span>
              </div>

              <ul className="mt-7 space-y-2.5 text-sm text-white/80">
                {INCLUSIONS.map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#E5B869]" />
                    {t}
                  </li>
                ))}
              </ul>

              <form onSubmit={submit} className="mt-7 space-y-2">
                {done ? (
                  <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.06] p-4 text-center text-sm text-white/80">
                    <Check className="mx-auto mb-1 h-5 w-5 text-emerald-400" />
                    You&apos;re on the waitlist. We&apos;ll email you the moment we open.
                  </div>
                ) : (
                  <>
                    <input
                      data-testid="pricing-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-white placeholder:text-white/30 focus:border-[#E5B869]/50 focus:outline-none"
                    />
                    <button
                      data-testid="pricing-notify"
                      type="submit"
                      disabled={busy}
                      className="btn-gold w-full justify-center disabled:opacity-60"
                    >
                      {busy ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Saving…
                        </>
                      ) : (
                        "Notify me when live"
                      )}
                    </button>
                    <p className="text-center text-[11px] text-white/40">
                      Launching soon · Payments via Razorpay (UPI / Cards / NetBanking)
                    </p>
                  </>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
