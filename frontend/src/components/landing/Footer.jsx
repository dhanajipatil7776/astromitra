import React from "react";
import { Instagram, Twitter, Youtube, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="relative border-t border-white/5 bg-[#030305]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E5B869]/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8">
                <div className="absolute inset-0 rounded-full border border-[#E5B869]/60" />
                <div className="absolute inset-[6px] rounded-full bg-gradient-to-br from-[#E5B869] to-[#B88A3E]" />
              </div>
              <span className="font-accent text-lg tracking-[0.18em] text-gold-gradient">
                ASTROMITRA
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">
              Your personalized AI astro guide. Vedic Jyotisha refined by frontier intelligence —
              built for the curious, the searching and the becoming.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Instagram, Twitter, Youtube, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  data-testid={`social-${i}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all hover:border-[#E5B869]/50 hover:text-[#E5B869]"
                  aria-label="social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <div className="font-accent text-[11px] uppercase tracking-[0.25em] text-[#E5B869]">
              Explore
            </div>
            <ul className="mt-5 space-y-3 text-sm">
              {["Why Us", "Features", "How It Works", "Voices"].map((t) => (
                <li key={t}>
                  <a
                    href={`#${t.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-white/55 transition-colors hover:text-white"
                  >
                    {t}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className="font-accent text-[11px] uppercase tracking-[0.25em] text-[#E5B869]">
              Legal
            </div>
            <ul className="mt-5 space-y-3 text-sm">
              {["Privacy Policy", "Terms of Use", "Contact", "Refunds"].map((t) => (
                <li key={t}>
                  <a href="#" className="text-white/55 transition-colors hover:text-white">
                    {t}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-8 md:flex-row md:items-center">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} AstroMitra · Crafted with care under starlight in Bharat.
          </p>
          <p className="font-accent text-[10px] uppercase tracking-[0.3em] text-white/30">
            · Om Tat Sat ·
          </p>
        </div>
      </div>
    </footer>
  );
}
