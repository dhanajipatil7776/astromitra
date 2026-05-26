import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, Download, Link2, Share2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import ReadingView from "@/components/landing/ReadingView";
import {
  downloadReadingPdf,
  copyShareLink,
  buildWhatsAppShare,
} from "@/lib/readingShare";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ReadingPage() {
  const { id } = useParams();
  const [reading, setReading] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pdfBusy, setPdfBusy] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await axios.get(`${API}/reading/${id}`);
        if (mounted) setReading(data);
      } catch (e) {
        if (mounted) setError(e?.response?.status === 404 ? "Reading not found" : "Could not load reading");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  const handleCopy = async () => {
    await copyShareLink(reading);
    toast.success("Share link copied ✨");
  };

  const handlePdf = async () => {
    if (!reading) return;
    setPdfBusy(true);
    try {
      await downloadReadingPdf(reading);
      toast.success("Your reading PDF is downloading 🪶");
    } catch {
      toast.error("Could not generate PDF.");
    } finally {
      setPdfBusy(false);
    }
  };

  return (
    <div data-testid="reading-page" className="min-h-screen text-white">
      <div className="mx-auto max-w-4xl px-6 py-10 md:px-12 md:py-16">
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back to AstroMitra
          </Link>
          <div className="flex items-center gap-2 font-accent text-[10px] uppercase tracking-[0.3em] text-[#E5B869]">
            <Sparkles className="h-3 w-3" />
            Shared Reading
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <Loader2 className="h-10 w-10 animate-spin text-[#E5B869]" />
            <p className="mt-6 text-white/55">Pulling your reading from the cosmos…</p>
          </div>
        )}

        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="font-heading text-2xl text-white/80">{error}</p>
            <p className="mt-3 text-sm text-white/50">
              The link may have expired or never existed.
            </p>
            <Link to="/" className="btn-gold mt-8">
              Get your own reading
            </Link>
          </div>
        )}

        {reading && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <ReadingView reading={reading} />

            <div className="mx-auto mt-8 grid max-w-3xl grid-cols-3 gap-2">
              <button
                data-testid="share-copy-link"
                onClick={handleCopy}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80 transition-colors hover:border-[#E5B869]/40 hover:text-white"
              >
                <Link2 className="h-4 w-4 text-[#E5B869]" /> Copy
              </button>
              <a
                data-testid="share-whatsapp"
                href={buildWhatsAppShare(reading)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80 transition-colors hover:border-[#E5B869]/40 hover:text-white"
              >
                <Share2 className="h-4 w-4 text-[#E5B869]" /> Share
              </a>
              <button
                data-testid="download-pdf"
                onClick={handlePdf}
                disabled={pdfBusy}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#E5B869]/30 bg-[#E5B869]/[0.08] px-4 py-3 text-sm font-medium text-[#E5B869] transition-colors hover:bg-[#E5B869]/[0.14] disabled:opacity-60"
              >
                {pdfBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                PDF
              </button>
            </div>

            <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-center">
              <p className="text-sm text-white/65">
                This was generated for{" "}
                <span className="text-[#E5B869]">{reading.name}</span>. Want one
                of your own?
              </p>
              <Link to="/" className="btn-gold mt-4 inline-flex">
                Get my free reading
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
