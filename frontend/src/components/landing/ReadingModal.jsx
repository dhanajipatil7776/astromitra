import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Briefcase,
  Heart,
  HeartHandshake,
  Coins,
  Compass,
  Download,
  Link2,
  Share2,
} from "lucide-react";
import { toast } from "sonner";
import ReadingView from "@/components/landing/ReadingView";
import {
  downloadReadingPdf,
  copyShareLink,
  buildWhatsAppShare,
} from "@/lib/readingShare";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const FOCUS_OPTIONS = [
  { key: "career", label: "Career", icon: Briefcase, hint: "Direction, growth, pivots" },
  { key: "love", label: "Love", icon: Heart, hint: "Connection, chemistry, romance" },
  { key: "marriage", label: "Marriage", icon: HeartHandshake, hint: "Partner, timing, harmony" },
  { key: "finance", label: "Finance", icon: Coins, hint: "Wealth flow, money patterns" },
  { key: "life_direction", label: "Life Direction", icon: Compass, hint: "Purpose, dharma, clarity" },
];

const initialForm = {
  name: "",
  date_of_birth: "",
  time_of_birth: "",
  place_of_birth: "",
  focus_area: "",
  question: "",
};

export default function ReadingModal({ open, onOpenChange }) {
  const [step, setStep] = useState(1); // 1 details, 2 focus, 3 loading, 4 result
  const [form, setForm] = useState(initialForm);
  const [reading, setReading] = useState(null);

  const reset = () => {
    setStep(1);
    setForm(initialForm);
    setReading(null);
  };

  const handleClose = (v) => {
    if (!v) {
      setTimeout(reset, 300);
    }
    onOpenChange(v);
  };

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const canProceedStep1 =
    form.name.trim() && form.date_of_birth && form.place_of_birth.trim();

  const submit = async (focus) => {
    const payload = { ...form, focus_area: focus };
    setForm(payload);
    setStep(3);
    try {
      const { data } = await axios.post(`${API}/reading`, payload, {
        timeout: 90000,
      });
      setReading(data);
      setStep(4);
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.detail ||
        "The cosmos is meditating. Please try again in a moment.";
      toast.error(msg);
      setStep(2);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        data-testid="reading-modal"
        className="max-w-2xl border-white/10 bg-[#0a0a14]/95 p-0 text-white shadow-[0_30px_80px_-10px_rgba(229,184,105,0.25)] backdrop-blur-2xl"
      >
        {/* Cosmic accent */}
        <div className="pointer-events-none absolute -top-10 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[#E5B869]/15 blur-3xl" />

        <DialogHeader className="px-7 pt-7">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#E5B869]" />
            <span className="font-accent text-[10px] uppercase tracking-[0.3em] text-[#E5B869]">
              · Free AI Astro Reading ·
            </span>
          </div>
          <DialogTitle className="font-heading text-2xl font-light tracking-tight md:text-3xl">
            {step === 1 && "Tell the stars who you are"}
            {step === 2 && "What does your soul seek?"}
            {step === 3 && "Consulting the cosmos…"}
            {step === 4 && (
              <>
                <span className="text-gold-gradient italic font-accent">
                  {reading?.name}
                </span>
                , your reading.
              </>
            )}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Generate your personalized AI astrology reading by entering birth details and choosing a focus area.
          </DialogDescription>
        </DialogHeader>

        <div className="relative max-h-[70vh] overflow-y-auto px-7 pb-7 pt-2">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="space-y-4"
              >
                <Field label="Full Name" htmlFor="name">
                  <Input
                    id="name"
                    data-testid="input-name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="e.g. Ananya Sharma"
                    className="border-white/10 bg-white/[0.03] focus-visible:ring-[#E5B869]"
                  />
                </Field>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Date of Birth" htmlFor="dob">
                    <Input
                      id="dob"
                      data-testid="input-dob"
                      type="date"
                      value={form.date_of_birth}
                      onChange={(e) => update("date_of_birth", e.target.value)}
                      className="border-white/10 bg-white/[0.03] [color-scheme:dark] focus-visible:ring-[#E5B869]"
                    />
                  </Field>
                  <Field label="Time of Birth" htmlFor="tob" optional>
                    <Input
                      id="tob"
                      data-testid="input-tob"
                      type="time"
                      value={form.time_of_birth}
                      onChange={(e) => update("time_of_birth", e.target.value)}
                      className="border-white/10 bg-white/[0.03] [color-scheme:dark] focus-visible:ring-[#E5B869]"
                    />
                  </Field>
                </div>

                <Field label="Place of Birth" htmlFor="place">
                  <Input
                    id="place"
                    data-testid="input-place"
                    value={form.place_of_birth}
                    onChange={(e) => update("place_of_birth", e.target.value)}
                    placeholder="e.g. Mumbai, India"
                    className="border-white/10 bg-white/[0.03] focus-visible:ring-[#E5B869]"
                  />
                </Field>

                <Field label="Anything specific on your mind?" htmlFor="q" optional>
                  <Textarea
                    id="q"
                    data-testid="input-question"
                    value={form.question}
                    onChange={(e) => update("question", e.target.value)}
                    rows={3}
                    placeholder="e.g. Should I switch jobs this year?"
                    className="resize-none border-white/10 bg-white/[0.03] focus-visible:ring-[#E5B869]"
                  />
                </Field>

                <div className="flex justify-end pt-2">
                  <button
                    data-testid="step1-next"
                    onClick={() => canProceedStep1 && setStep(2)}
                    disabled={!canProceedStep1}
                    className="btn-gold disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
              >
                <p className="text-sm text-white/55">
                  Choose the area where you most want cosmic insight right now.
                </p>
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {FOCUS_OPTIONS.map((opt) => (
                    <button
                      key={opt.key}
                      data-testid={`focus-${opt.key}`}
                      onClick={() => submit(opt.key)}
                      className="group bordered-glow flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition-all hover:bg-white/[0.06]"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E5B869]/10 ring-1 ring-[#E5B869]/30">
                        <opt.icon className="h-5 w-5 text-[#E5B869]" />
                      </div>
                      <div>
                        <div className="font-heading text-white">{opt.label}</div>
                        <div className="text-xs text-white/45">{opt.hint}</div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <button
                    data-testid="step2-back"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center py-12 text-center"
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-[#E5B869]/30 blur-2xl glow-pulse" />
                  <Loader2 className="relative h-12 w-12 animate-spin text-[#E5B869]" />
                </div>
                <p className="mt-8 font-heading text-xl text-white">
                  Reading the planetary winds…
                </p>
                <p className="mt-2 max-w-sm text-sm text-white/55">
                  GPT-5.2 is cross-referencing your kundali with Vedic algorithms.
                  This usually takes 20–40 seconds.
                </p>
              </motion.div>
            )}

            {step === 4 && reading && (
              <ReadingResult reading={reading} onRestart={reset} />
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, htmlFor, optional, children }) {
  return (
    <div>
      <Label htmlFor={htmlFor} className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-white/55">
        {label} {optional && <span className="text-white/30">(optional)</span>}
      </Label>
      {children}
    </div>
  );
}

function ReadingResult({ reading, onRestart }) {
  const [pdfBusy, setPdfBusy] = useState(false);

  const handleCopy = async () => {
    await copyShareLink(reading);
    toast.success("Share link copied to clipboard ✨");
  };

  const handlePdf = async () => {
    setPdfBusy(true);
    try {
      await downloadReadingPdf(reading);
      toast.success("Your reading PDF is downloading 🪶");
    } catch (e) {
      toast.error("Could not generate PDF. Try again.");
    } finally {
      setPdfBusy(false);
    }
  };

  const waLink = buildWhatsAppShare(reading);

  return (
    <motion.div
      key="step4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      data-testid="reading-result"
      className="space-y-6"
    >
      <ReadingView reading={reading} compact />

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        <button
          data-testid="share-copy-link"
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/80 transition-colors hover:border-[#E5B869]/40 hover:text-white"
        >
          <Link2 className="h-4 w-4 text-[#E5B869]" />
          Copy link
        </button>
        <a
          data-testid="share-whatsapp"
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/80 transition-colors hover:border-[#E5B869]/40 hover:text-white"
        >
          <Share2 className="h-4 w-4 text-[#E5B869]" />
          Share
        </a>
        <button
          data-testid="download-pdf"
          onClick={handlePdf}
          disabled={pdfBusy}
          className="col-span-2 flex items-center justify-center gap-2 rounded-xl border border-[#E5B869]/30 bg-[#E5B869]/[0.08] px-4 py-2.5 text-sm font-medium text-[#E5B869] transition-colors hover:bg-[#E5B869]/[0.14] disabled:opacity-60 sm:col-span-1"
        >
          {pdfBusy ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          PDF
        </button>
      </div>

      <div className="flex flex-col items-center gap-3 border-t border-white/5 pt-5 sm:flex-row sm:justify-between">
        <p className="text-xs text-white/40">
          Reading id · {reading.id?.slice(0, 8)}
        </p>
        <button
          data-testid="reading-restart"
          onClick={onRestart}
          className="btn-ghost text-sm"
        >
          Generate another reading
        </button>
      </div>
    </motion.div>
  );
}
