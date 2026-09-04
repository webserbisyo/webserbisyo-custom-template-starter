"use client";

import { useEffect } from "react";
import type { MusicData } from "@/platform/event-template-data";
import { useAudio } from "@/template/components/AudioPlayer";
import { Reveal } from "@/template/components/motion/Reveal";
import { parseMusicMeta } from "@/template/utils/music-meta";
import { motion, useReducedMotion } from "motion/react";
import { Play, Pause, Square, Music4, Sparkles } from "lucide-react";

// PLATFORM DATA — KEEP DYNAMIC.
// DEBUT ROSE GLAM CELEBRATION SOUNDTRACK (SATIN ALABASTER & ROSE GOLD VINYL)

export function MusicSection({ data }: { data: MusicData }) {
  const shouldReduceMotion = useReducedMotion();
  const { playbackState, isPlaying, play, pause, stop, setMusicData } = useAudio();

  const link = data.musicLink;
  const playLabel = data.playButtonLabel || "Play Debut Song";
  const note = data.shortNote;

  useEffect(() => {
    if (link) {
      setMusicData(link, data.musicTitle, data.shortNote);
    }
  }, [link, data.musicTitle, data.shortNote, setMusicData]);

  if (!link && !data.musicTitle) return null;

  const { displayTitle, displayArtist } = parseMusicMeta(data.musicTitle);

  return (
    <section
      id="music_effects"
      className="template-section section-surface-alabaster bg-pattern-debut-03 template-section-compact text-center relative overflow-x-clip"
    >
      <div className="template-container-narrow relative z-10">
        <Reveal direction="up" distance={16}>
          <div className="mb-6 space-y-2">
            <span className="text-role-subheading text-[var(--debut-rose-gold,#B76E79)] inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--debut-champagne-gold,#D4AF37)]" />
              <span>COTILLION SOUNDTRACK</span>
            </span>
            <h2 className="text-role-heading text-[var(--debut-text-noir,#26131C)]">
              Debut Celebration Soundtrack
            </h2>
          </div>
        </Reveal>

        <Reveal direction="up" distance={20} delay={0.1}>
          <div
            data-surface="light"
            className="debut-glass-card p-6 sm:p-8 rounded-3xl border border-[var(--debut-rose-gold-border,#E8C4C8)] max-w-md mx-auto shadow-card relative overflow-visible text-[var(--debut-text-noir,#26131C)]"
          >
            {/* Spinning Rose Gold Vinyl Disc */}
            <div className="relative w-28 h-28 mx-auto mb-6 flex items-center justify-center z-10">
              {/* Pulsating outer gold ring */}
              {isPlaying && !shouldReduceMotion && (
                <div className="absolute inset-0 rounded-full border-2 border-[var(--debut-bg-coral,#E65C4F)] scale-110 animate-ping pointer-events-none opacity-60" />
              )}

              {/* Spinning vinyl disc */}
              <motion.div
                animate={{ rotate: !shouldReduceMotion && isPlaying ? 360 : 0 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="w-full h-full rounded-full bg-gradient-to-br from-[var(--debut-bg-noir,#10050B)] via-[#180812] to-[var(--debut-bg-noir,#10050B)] border-2 border-[var(--debut-rose-gold,#B76E79)] shadow-xl flex items-center justify-center relative group"
              >
                {/* Concentric record grooves */}
                <div className="absolute inset-2 rounded-full border border-[var(--debut-rose-gold)]/20 pointer-events-none" />
                <div className="absolute inset-4 rounded-full border border-[var(--debut-rose-gold)]/20 pointer-events-none" />
                <div className="absolute inset-6 rounded-full border border-[var(--debut-rose-gold)]/20 pointer-events-none" />

                {/* Center label with Music4 beamed note */}
                <div className="w-10 h-10 rounded-full bg-[var(--debut-champagne-soft,#F9F1DC)] flex items-center justify-center shadow-inner">
                  <Music4
                    className="w-4 h-4 text-[var(--debut-bg-noir,#10050B)]"
                    aria-hidden="true"
                  />
                </div>
              </motion.div>
            </div>

            {/* Live Equalizer Wave Bars when playing */}
            {isPlaying && !shouldReduceMotion && (
              <div className="flex items-center justify-center gap-1 mb-4 h-4">
                {[0.4, 0.8, 0.3, 1, 0.6, 0.9, 0.5, 0.7].map((heightScale, i) => (
                  <motion.span
                    key={i}
                    animate={{ scaleY: [heightScale, 1.2, heightScale * 0.5, heightScale] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8 + (i % 3) * 0.2,
                      ease: "easeInOut",
                    }}
                    className="w-1 h-4 bg-[var(--debut-bg-coral,#E65C4F)] rounded-full origin-bottom"
                  />
                ))}
              </div>
            )}

            {/* Connected Song Title */}
            <h3
              className="font-serif font-bold text-[var(--debut-text-noir,#26131C)] text-xl sm:text-2xl mb-1 truncate"
              title={displayTitle}
            >
              {displayTitle}
            </h3>

            {displayArtist && (
              <p className="text-xs font-cinzel font-bold uppercase tracking-[0.2em] text-[var(--debut-rose-gold,#B76E79)] mb-4">
                {displayArtist}
              </p>
            )}

            {note && (
              <p className="text-sm text-[var(--debut-text-muted,#704D5B)] italic max-w-xs mx-auto mb-6 leading-relaxed font-serif">
                &ldquo;{note}&rdquo;
              </p>
            )}

            {link && (
              <div className="flex justify-center items-center gap-3 pt-2 font-sans">
                {isPlaying ? (
                  <button
                    type="button"
                    onClick={pause}
                    className="py-3 px-6 bg-[var(--debut-bg-coral,#E65C4F)] hover:bg-[var(--debut-bg-coral-hover,#D85244)] text-white text-sm font-semibold rounded-xl transition-all shadow-md flex items-center gap-2 template-focus-ring cursor-pointer min-h-[44px] btn-press-physics"
                    aria-label="Pause song"
                  >
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Pause</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={play}
                    className="py-3 px-6 bg-[var(--debut-bg-coral,#E65C4F)] hover:bg-[var(--debut-bg-coral-hover,#D85244)] text-white text-sm font-semibold rounded-xl transition-all shadow-md flex items-center gap-2 template-focus-ring cursor-pointer min-h-[44px] btn-press-physics"
                    aria-label={playbackState === "paused" ? "Resume song" : playLabel}
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{playbackState === "paused" ? "Resume" : playLabel}</span>
                  </button>
                )}

                {(playbackState === "playing" || playbackState === "paused") && (
                  <button
                    type="button"
                    onClick={stop}
                    className="py-3 px-5 bg-[var(--debut-surface-alabaster-alt,#F4EBEB)] hover:bg-[var(--debut-rose-gold-border,#E8C4C8)]/50 text-[var(--debut-text-noir,#26131C)] text-sm font-medium rounded-xl transition-colors flex items-center gap-2 template-focus-ring cursor-pointer border border-[var(--debut-rose-gold-subtle)] min-h-[44px] btn-press-physics"
                    aria-label="Stop song"
                  >
                    <Square className="w-4 h-4 fill-current" />
                    <span>Stop</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
