# AstroMitra — Premium AI Astrology Landing Page

## Original Problem Statement
Build a world-class, ultra-premium landing page for an Indian AI astrology startup called "AstroMitra" — Apple-level minimalism + Tesla-style futurism + Luxury Indian spiritual aesthetics + AI personalization + Cinematic cosmic storytelling. Plus a working "Free Reading" multi-step form that uses GPT-5.2 to generate a personalized astrology reading.

## User Choices
- Scope: Landing page + working "Free Reading" form
- AI: GPT-5.2 (OpenAI via Emergent Universal Key)
- Language: English with select Hindi/Sanskrit accents (Namaste, dharma, Jyotisha, mantra)
- CTA Action: Open form modal
- Logo: Typographic wordmark (user mentioned having a logo but did not upload)

## Architecture
- **Backend** (FastAPI + MongoDB): `/app/backend/server.py`
  - `GET /api/health` — status check + LLM configured flag
  - `POST /api/reading` — multi-section AI reading via emergentintegrations + GPT-5.2
  - `POST /api/contact` — lead capture
- **Frontend** (React + Tailwind + framer-motion + shadcn): `/app/frontend/src/`
  - `pages/Landing.jsx` — single-page composition
  - `components/landing/` — 10 sections + `ReadingModal.jsx` (4-step flow)
  - Cosmic dark theme, gold gradients, glassmorphism cards, sacred grid bg

## User Personas
1. Young Indian professional seeking career clarity
2. Couples exploring compatibility
3. Startup founder mapping risk windows
4. Spiritually curious Gen-Z

## What's Been Implemented (2026-05-26)
- ✅ Hero with cosmic backdrop + floating dashboard preview + dual CTA
- ✅ Animated announcement bar
- ✅ Social proof stats with animated counters
- ✅ "Why AstroMitra" 4-card section
- ✅ Features grid (8 features)
- ✅ "How It Works" 3-step glowing timeline
- ✅ Testimonials with Indian users
- ✅ Final CTA with rotating zodiac wheel
- ✅ Footer with social + legal
- ✅ Multi-step Reading Modal (details → focus → loading → result)
- ✅ Backend GPT-5.2 integration with structured JSON parsing
- ✅ Sun-sign auto-computation
- ✅ data-testid coverage on all interactive elements
- ✅ Mobile responsive (390px tested)

## Known Limitations
- Demo `EMERGENT_LLM_KEY` may be over budget — user can top up via Profile → Universal Key → Add Balance
- Date/time inputs use native HTML pickers (can be upgraded to shadcn Calendar)
- "Download App" button is currently a placeholder (no real app yet)

## Prioritized Backlog
**P1**
- Replace native date/time picker with shadcn Calendar + custom time picker
- Save & email reading PDF
- Share reading via unique URL (shareability lever)
- WhatsApp opt-in for daily horoscope

**P2**
- Razorpay/Stripe paid in-depth reading
- Authenticated user dashboard with reading history
- Compatibility / Synastry tool (two-person input)
- Three.js animated cosmic background

**P3**
- Multilingual content (Hindi/Tamil/Marathi)
- Astrologer marketplace
- Native iOS/Android app
