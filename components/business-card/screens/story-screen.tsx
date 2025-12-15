"use client";

import { motion } from "framer-motion";

interface StoryScreenProps {
  onNext: () => void;
  onBack: () => void;
  onRestart?: () => void;
}

export function StoryScreen({ onNext, onBack, onRestart }: StoryScreenProps) {
  
  const handleAddToHomeScreen = () => {
    if (navigator.share) {
      alert("Tap the Share button, then 'Add to Home Screen' to save Setly");
    } else {
      alert("To save Setly: Tap Share → Add to Home Screen");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Setly',
          text: 'Settle into a new place — faster, calmer, together.',
          url: window.location.href
        });
      } catch (err) {
        // User cancelled, that's okay
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard");
    }
  };

  return (
    <div className="h-full flex flex-col bg-white relative overflow-hidden">
      <div className="relative z-10 flex flex-col h-full px-8 py-12">
        <div className="max-w-sm w-full mx-auto flex flex-col h-full justify-between">
          
          {/* The statement */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-1 flex flex-col justify-center text-center -mt-12"
          >
            <h2 className="text-[36px] leading-[1.2] font-bold text-[var(--setly-ink)] mb-6">
              Setly is being built<br />
              for moments like yours
            </h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-base text-[var(--setly-text-secondary)] leading-relaxed"
            >
              A platform to help you settle into a new place —<br />
              faster, calmer, together.
            </motion.p>
          </motion.div>

          {/* Actions with clear hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="space-y-4 mb-6"
          >
            {/* Primary: Keep Setly - gentle emphasis */}
            <button
              onClick={handleAddToHomeScreen}
              className="w-full flex items-center gap-4 p-5 rounded-2xl bg-[var(--setly-primary-blue)]/[0.04] border border-[var(--setly-primary-blue)]/20 hover:border-[var(--setly-primary-blue)]/40 hover:bg-[var(--setly-primary-blue)]/[0.06] active:scale-[0.99] transition-all group shadow-sm shadow-[var(--setly-primary-blue)]/5"
            >
              <div className="w-11 h-11 rounded-xl bg-[var(--setly-primary-blue)]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--setly-primary-blue)]/15 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[var(--setly-primary-blue)]">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                  <polyline points="17 21 17 13 7 13 7 21"/>
                  <polyline points="7 3 7 8 15 8"/>
                </svg>
              </div>
              <div className="flex-1 text-left">
                <div className="text-base font-semibold text-[var(--setly-ink)]">Keep Setly</div>
                <div className="text-sm text-[var(--setly-text-secondary)] mt-0.5">Add to your home screen</div>
              </div>
            </button>

            {/* Secondary actions - subtler */}
            <div className="flex gap-3">
              <button
                onClick={handleShare}
                className="flex-1 flex items-center gap-3 p-4 rounded-xl bg-white border border-[var(--setly-border)] hover:border-[var(--setly-primary-blue)]/30 hover:bg-[var(--setly-primary-blue)]/[0.02] active:scale-[0.99] transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-[var(--setly-primary-blue)]/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--setly-primary-blue)]/10 transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[var(--setly-primary-blue)]">
                    <circle cx="18" cy="5" r="3"/>
                    <circle cx="6" cy="12" r="3"/>
                    <circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-[var(--setly-ink)]">Pass it on</div>
                </div>
              </button>

              <button
                onClick={onNext}
                className="flex-1 flex items-center gap-3 p-4 rounded-xl bg-white border border-[var(--setly-border)] hover:border-[var(--setly-primary-blue)]/30 hover:bg-[var(--setly-primary-blue)]/[0.02] active:scale-[0.99] transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-[var(--setly-primary-blue)]/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--setly-primary-blue)]/10 transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[var(--setly-primary-blue)]">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-[var(--setly-ink)]">Stay in touch</div>
                </div>
              </button>
            </div>
          </motion.div>

          {/* Subtle navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex items-center justify-between text-sm"
          >
            <button
              onClick={onBack}
              className="text-[var(--setly-text-secondary)] hover:text-[var(--setly-ink)] py-2 font-medium transition-colors"
            >
              ← Back
            </button>
            
            {onRestart && (
              <button
                onClick={onRestart}
                className="text-[var(--setly-text-secondary)] hover:text-[var(--setly-ink)] py-2 font-medium transition-colors"
              >
                Start again ↻
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
