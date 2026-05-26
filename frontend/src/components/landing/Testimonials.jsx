import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Ananya Sharma",
    role: "Product Manager, Bengaluru",
    avatar:
      "https://images.unsplash.com/photo-1764546373114-2d7a87221733?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTV8MHwxfHNlYXJjaHwzfHxpbmRpYW4lMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGRhcmslMjBiYWNrZ3JvdW5kfGVufDB8fHx8MTc3OTgwNDM2NXww&ixlib=rb-4.1.0&q=85",
    text:
      "AstroMitra gave me shocking clarity about my career decisions. The career section felt like a mirror — I quit a job that wasn't aligned within a week.",
  },
  {
    name: "Rohan Iyer",
    role: "Startup Founder, Mumbai",
    avatar:
      "https://images.pexels.com/photos/12552598/pexels-photo-12552598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    text:
      "The relationship insights felt deeply accurate. It picked up nuances I hadn't even articulated to myself. This isn't fortune-telling — it's pattern intelligence.",
  },
  {
    name: "Meera Kapoor",
    role: "Designer, Delhi",
    avatar:
      "https://images.unsplash.com/photo-1638290047807-4c9d389b9aa6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTV8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGRhcmslMjBiYWNrZ3JvdW5kfGVufDB8fHx8MTc3OTgwNDM2NXww&ixlib=rb-4.1.0&q=85",
    text:
      "Feels like talking to a futuristic spiritual mentor. The remedies are modern-friendly — no incense, no panic. Just elegance.",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-accent text-[11px] tracking-[0.3em] uppercase text-[#E5B869]">
            · Voices of the Cosmos ·
          </span>
          <h2 className="font-heading mt-5 text-4xl font-light leading-tight tracking-tight md:text-5xl">
            What the seekers{" "}
            <span className="text-gold-gradient italic font-accent">are saying.</span>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              whileHover={{ y: -6 }}
              className="bordered-glow relative overflow-hidden rounded-3xl glass p-7"
              data-testid={`testimonial-${i}`}
            >
              <Quote className="h-7 w-7 text-[#E5B869]/60" />
              <blockquote className="mt-5 text-[15px] leading-relaxed text-white/75">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-11 w-11 rounded-full object-cover ring-1 ring-[#E5B869]/40"
                  loading="lazy"
                />
                <div>
                  <div className="font-heading text-sm text-white">{t.name}</div>
                  <div className="text-xs text-white/45">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
