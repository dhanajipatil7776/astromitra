import React from "react";
import { Star } from "lucide-react";

/**
 * Pure visual component to render a reading. Reused in modal result and share page.
 * Wrap with id="reading-pdf-target" for PDF capture.
 */
export default function ReadingView({ reading, compact = false }) {
  if (!reading) return null;

  const sections = [
    { key: "overview", label: "Cosmic Overview" },
    { key: "career", label: "Career" },
    { key: "love", label: "Love" },
    { key: "finance", label: "Finance" },
    { key: "health", label: "Health & Energy" },
  ];

  return (
    <div
      id="reading-pdf-target"
      className={`relative ${
        compact ? "" : "mx-auto max-w-3xl rounded-3xl border border-white/10 bg-[#0a0a14] p-8 md:p-12"
      } text-white`}
    >
      {/* Header */}
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="font-accent text-[10px] uppercase tracking-[0.3em] text-[#E5B869]">
          · AstroMitra · Personalized Reading ·
        </div>
        <h2 className="font-heading mt-3 text-3xl font-light tracking-tight md:text-4xl">
          For{" "}
          <span className="text-gold-gradient italic font-accent">
            {reading.name}
          </span>
        </h2>
        {reading.sun_sign && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#E5B869]/30 bg-[#E5B869]/[0.06] px-4 py-1.5 text-xs">
            <Star className="h-3 w-3 text-[#E5B869]" />
            <span className="font-accent uppercase tracking-[0.2em] text-[#E5B869]">
              Sun Sign · {reading.sun_sign}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-7">
        {sections.map(
          (s) =>
            reading[s.key] && (
              <div key={s.key}>
                <h4 className="font-accent text-[10px] uppercase tracking-[0.3em] text-[#E5B869]">
                  · {s.label} ·
                </h4>
                <p className="mt-2 text-[15px] leading-relaxed text-white/80">
                  {reading[s.key]}
                </p>
              </div>
            )
        )}

        {reading.remedies?.length > 0 && (
          <div>
            <h4 className="font-accent text-[10px] uppercase tracking-[0.3em] text-[#E5B869]">
              · Vedic Remedies ·
            </h4>
            <ul className="mt-3 space-y-2">
              {reading.remedies.map((r, i) => (
                <li
                  key={i}
                  className="flex gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-sm leading-relaxed text-white/80"
                >
                  <span className="font-accent text-[#E5B869]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {reading.lucky && (
          <div>
            <h4 className="font-accent text-[10px] uppercase tracking-[0.3em] text-[#E5B869]">
              · Your Lucky Stars ·
            </h4>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {["color", "number", "day", "gemstone"].map((k) =>
                reading.lucky[k] ? (
                  <div
                    key={k}
                    className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center"
                  >
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                      {k}
                    </div>
                    <div className="mt-1 font-heading text-sm text-white">
                      {reading.lucky[k]}
                    </div>
                  </div>
                ) : null
              )}
            </div>
            {reading.lucky.mantra && (
              <div className="mt-3 rounded-xl border border-[#E5B869]/20 bg-[#E5B869]/[0.04] p-4 text-center">
                <div className="font-accent text-[10px] uppercase tracking-[0.3em] text-[#E5B869]">
                  · Mantra ·
                </div>
                <p className="mt-2 font-accent italic text-white/90">
                  {reading.lucky.mantra}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-10 border-t border-white/5 pt-5 text-center">
        <p className="font-accent text-[10px] uppercase tracking-[0.3em] text-white/40">
          · Om Tat Sat · astromitra.ai · Reading {reading.id?.slice(0, 8)} ·
        </p>
      </div>
    </div>
  );
}
