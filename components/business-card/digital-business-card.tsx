"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface DigitalBusinessCardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DigitalBusinessCard({ isOpen, onClose }: DigitalBusinessCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleSaveToPhone = async () => {
    // Try PWA first (Add to Home Screen)
    if (typeof window !== 'undefined' && 'BeforeInstallPromptEvent' in window) {
      // PWA install prompt would be triggered here if available
      alert("Tap the Share button, then 'Add to Home Screen' to save Setly");
    } else {
      // Fallback: Download vCard
      downloadVCard();
    }
  };

  const downloadVCard = () => {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:Kiran Revally
N:Revally;Kiran;;;
TITLE:Founder, Setly
EMAIL:setlyhq@gmail.com
URL:https://setly.net
URL;type=LinkedIn:https://linkedin.com/in/kiranrevally
NOTE:From landing to belonging. Helping students and expats settle into a new place — faster, calmer, together.
END:VCARD`;

    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'kiran-revally-setly.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && 'share' in navigator && navigator.share) {
      try {
        await navigator.share({
          title: 'Kiran Revally — Setly',
          text: 'From landing to belonging. Helping students and expats settle into a new place — faster, calmer, together.',
          url: 'https://setly.net'
        });
      } catch (err) {
        // User cancelled
      }
    } else {
      // Fallback: Copy link
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText('https://setly.net');
        alert("Link copied to clipboard");
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Card Container - iOS bottom sheet style */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.8 }}
            className="fixed inset-x-0 bottom-0 z-50 flex items-end justify-center px-4 pb-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-sm">
              {/* Card with flip animation */}
              <div className="relative h-[520px]" style={{ perspective: "1000px" }}>
                <motion.div
                  className="relative w-full h-full"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 30, mass: 1 }}
                >
                  {/* Front Side */}
                  <div
                    className="absolute inset-0 bg-white rounded-3xl shadow-2xl p-8 flex flex-col"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    {/* Close button */}
                    <button
                      onClick={onClose}
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-600">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>

                    {/* Logo / Wordmark */}
                    <div className="mb-8">
                      <div className="text-4xl font-bold text-[var(--setly-primary-blue)]">
                        Setly
                      </div>
                    </div>

                    {/* Tagline */}
                    <div className="flex-1 flex flex-col justify-center -mt-8">
                      <h2 className="text-2xl font-bold text-[var(--setly-ink)] mb-4 leading-tight">
                        From landing to belonging.
                      </h2>
                      
                      <p className="text-base text-[var(--setly-text-secondary)] leading-relaxed mb-8">
                        Helping students and expats settle into a new place — faster, calmer, together.
                      </p>

                      {/* Founder info */}
                      <div className="pt-6 border-t border-gray-200">
                        <p className="text-lg font-semibold text-[var(--setly-ink)]">
                          Kiran Revally
                        </p>
                        <p className="text-sm text-[var(--setly-text-secondary)] mt-1">
                          Founder, Setly
                        </p>
                      </div>
                    </div>

                    {/* Flip hint */}
                    <button
                      onClick={() => setIsFlipped(true)}
                      className="text-center py-3 text-sm text-[var(--setly-text-secondary)]/60 hover:text-[var(--setly-text-secondary)] transition-colors"
                    >
                      Tap to see contact info →
                    </button>
                  </div>

                  {/* Back Side */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-[var(--setly-primary-blue)] to-[#3B6FCC] rounded-3xl shadow-2xl p-8 flex flex-col text-white"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    {/* Close button */}
                    <button
                      onClick={onClose}
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>

                    <div className="flex-1 flex flex-col justify-center space-y-6">
                      {/* Email */}
                      <a
                        href="mailto:setlyhq@gmail.com"
                        className="flex items-center gap-3 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
                      >
                        <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="text-xs opacity-80 mb-1">Email</div>
                          <div className="text-sm font-medium">setlyhq@gmail.com</div>
                        </div>
                      </a>

                      {/* LinkedIn */}
                      <a
                        href="https://linkedin.com/in/kiranrevally"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
                      >
                        <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="text-xs opacity-80 mb-1">LinkedIn</div>
                          <div className="text-sm font-medium">Kiran Revally</div>
                        </div>
                      </a>

                      {/* Philosophy */}
                      <div className="pt-6 border-t border-white/20">
                        <p className="text-sm italic leading-relaxed opacity-90">
                          Start. Evolve. Thrive. Live your way.
                        </p>
                        <p className="text-xs opacity-70 mt-3">
                          Built from lived experience. Not a corporate product.
                        </p>
                      </div>
                    </div>

                    {/* Flip back hint */}
                    <button
                      onClick={() => setIsFlipped(false)}
                      className="text-center py-3 text-sm opacity-60 hover:opacity-100 transition-opacity"
                    >
                      ← Tap to flip back
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Action buttons below card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex gap-3 mt-4"
              >
                <button
                  onClick={handleSaveToPhone}
                  className="flex-1 bg-white text-[var(--setly-ink)] rounded-2xl px-6 py-4 text-base font-semibold shadow-lg hover:shadow-xl active:scale-[0.98] transition-all"
                >
                  Save to Phone
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 bg-white/90 text-[var(--setly-ink)] rounded-2xl px-6 py-4 text-base font-semibold shadow-lg hover:shadow-xl active:scale-[0.98] transition-all"
                >
                  Share
                </button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
