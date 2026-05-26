import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { MessageCircle, Loader2, Check } from "lucide-react";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function WhatsAppOptIn() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim() || phone.replace(/\D/g, "").length < 10) {
      toast.error("Please enter your name and a valid 10-digit phone number.");
      return;
    }
    setBusy(true);
    try {
      const { data } = await axios.post(`${API}/whatsapp/subscribe`, {
        name: name.trim(),
        phone: phone.trim(),
      });
      toast.success(data.message || "Subscribed!");
      setDone(true);
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Could not subscribe. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section data-testid="whatsapp-section" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="bordered-glow relative overflow-hidden rounded-3xl glass p-8 md:p-12"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-[#E5B869]/10 blur-3xl" />

          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/[0.06] px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-emerald-300">
                <MessageCircle className="h-3 w-3" /> WhatsApp · Free
              </div>
              <h2 className="font-heading mt-5 text-3xl font-light leading-tight tracking-tight md:text-4xl">
                Get your daily horoscope on{" "}
                <span className="text-gold-gradient italic font-accent">
                  WhatsApp.
                </span>
              </h2>
              <p className="mt-4 max-w-md text-white/60">
                Wake up to a single, beautifully written cosmic nudge — tailored
                to your sun sign and birth chart. No spam. Unsubscribe anytime
                with a single &ldquo;STOP&rdquo;.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-white/65">
                {[
                  "AI-personalized daily message at 7:30 AM IST",
                  "Vedic remedies + lucky window for the day",
                  "Free forever for early subscribers",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={submit} className="space-y-3">
              {done ? (
                <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.06] p-6 text-center">
                  <Check className="mx-auto h-8 w-8 text-emerald-400" />
                  <p className="mt-3 font-heading text-lg text-white">
                    You&apos;re in, {name}.
                  </p>
                  <p className="mt-1 text-sm text-white/60">
                    Your first horoscope arrives tomorrow at sunrise.
                  </p>
                </div>
              ) : (
                <>
                  <input
                    data-testid="wa-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-white placeholder:text-white/30 focus:border-emerald-400/50 focus:outline-none"
                  />
                  <div className="flex items-stretch gap-2 rounded-2xl border border-white/10 bg-white/[0.03] focus-within:border-emerald-400/50">
                    <span className="flex items-center px-4 text-white/50">
                      +91
                    </span>
                    <input
                      data-testid="wa-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, "").slice(0, 12))}
                      placeholder="98765 43210"
                      className="flex-1 bg-transparent py-3.5 pr-4 text-white placeholder:text-white/30 focus:outline-none"
                    />
                  </div>
                  <button
                    data-testid="wa-subscribe"
                    type="submit"
                    disabled={busy}
                    className="btn-gold w-full justify-center disabled:opacity-60"
                  >
                    {busy ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Subscribing…
                      </>
                    ) : (
                      <>
                        <MessageCircle className="h-4 w-4" /> Send daily horoscope
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-white/40">
                    By subscribing, you agree to receive 1 message/day. No spam, ever.
                  </p>
                </>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
