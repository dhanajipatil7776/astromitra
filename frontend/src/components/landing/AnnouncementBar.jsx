import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div
      data-testid="announcement-bar"
      className="relative z-40 w-full border-b border-[#E5B869]/15 bg-[#E5B869]/[0.04] backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-[11px] sm:text-xs font-accent tracking-[0.22em] uppercase text-[#E5B869]">
        <Sparkles className="h-3 w-3" />
        <motion.span
          initial={{ opacity: 0.7 }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          AI-Powered Personalized Astrology · Available 24×7 · Instant Guidance
        </motion.span>
        <Sparkles className="h-3 w-3" />
      </div>
    </div>
  );
}
