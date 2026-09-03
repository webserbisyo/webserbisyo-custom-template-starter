import type { GuestbookData, GuestbookMessage } from "@/platform/event-template-data";
import { Reveal } from "@/template/components/motion/Reveal";
import { MessageSquare, Sparkles } from "lucide-react";

// PLATFORM DATA — KEEP DYNAMIC.
// DEBUT ROSE GLAM GUESTBOOK (CANVAS A: SATIN ALABASTER & READ-ONLY INSCRIBED WISHES STREAM)

export type DisplayGuestbookMessage = GuestbookMessage & {
  createdAt?: string;
};

export type GuestbookSectionProps = {
  data: GuestbookData;
  apiBaseUrl?: string;
  accessToken?: string | null;
  isDemoMode?: boolean;
};

export function GuestbookSection({ data }: GuestbookSectionProps) {
  const rawMessages = data?.messages || [];
  const messages: DisplayGuestbookMessage[] = rawMessages as DisplayGuestbookMessage[];

  return (
    <section
      id="guestbook"
      className="template-section section-surface-alabaster pattern-stardust-dot pattern-subtle relative overflow-x-clip"
    >
      <div className="template-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal direction="up" distance={16}>
          <div className="text-center mb-8 sm:mb-12 space-y-2">
            <span className="text-role-subheading text-[var(--debut-rose-gold,#B76E79)] inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--debut-champagne-gold,#D4AF37)]" />
              <span>COTILLION PROTOCOL // INSCRIBED BLESSINGS &amp; WISHES</span>
            </span>
            <h2 className="text-role-heading-major text-[var(--debut-text-noir,#26131C)] tracking-tight">
              {data.sectionTitle || "Debut Wishes"}
            </h2>
            <p className="text-role-lead max-w-md mx-auto mt-2 leading-relaxed text-[var(--debut-text-muted,#704D5B)] font-serif italic">
              {data.sectionIntro || "Leave a warm message for our debutante."}
            </p>
          </div>
        </Reveal>

        <Reveal direction="up" distance={20} delay={0.1}>
          {messages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 font-sans">
              {messages.map((entry, idx) => {
                const initial = (entry.guestName || "G").charAt(0).toUpperCase();
                const rawDate = entry.submittedAt || entry.createdAt;

                return (
                  <div
                    key={entry.id || `msg-${entry.guestName || idx}`}
                    className="debut-glass-card p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/95 border border-[var(--debut-rose-gold-border,#E8C4C8)]/80 hover:border-[var(--debut-rose-gold,#B76E79)] shadow-xs hover:shadow-soft transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      {/* Guest Tile Header */}
                      <div className="flex items-center justify-between gap-3 pb-3 border-b border-[var(--debut-rose-gold-subtle)]">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-full bg-[var(--debut-surface-alabaster-alt,#F4EBEB)] text-[var(--debut-bg-coral,#E65C4F)] font-cinzel font-bold text-sm flex items-center justify-center shrink-0 border border-[var(--debut-rose-gold-border,#E8C4C8)] shadow-xs group-hover:scale-105 transition-transform">
                            {initial}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-serif font-bold text-base text-[var(--debut-text-noir,#26131C)] truncate">
                              {entry.guestName}
                            </h4>
                            {rawDate && (
                              <time className="text-[10px] font-cinzel text-[var(--debut-rose-gold,#B76E79)] uppercase tracking-wider block">
                                {new Date(rawDate).toLocaleDateString(undefined, {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </time>
                            )}
                          </div>
                        </div>
                        <Sparkles className="w-3.5 h-3.5 text-[var(--debut-champagne-gold,#D4AF37)] opacity-40 group-hover:opacity-100 transition-opacity shrink-0" />
                      </div>

                      {/* Dedication Quotation */}
                      <p className="text-sm text-[var(--debut-text-noir,#26131C)] leading-relaxed font-serif italic pt-1">
                        &ldquo;{entry.message}&rdquo;
                      </p>
                    </div>

                    {/* Card Footer Inscription Tag */}
                    <div className="mt-4 pt-2.5 flex items-center justify-end border-t border-[var(--debut-rose-gold-subtle)]/40">
                      <span className="text-[9px] font-cinzel font-bold tracking-[0.2em] text-[var(--debut-rose-gold,#B76E79)]/70 uppercase">
                        COTILLION BLESSING
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-[#F4EBEB]/60 text-center text-sm text-[var(--debut-text-muted,#704D5B)] border border-dashed border-[var(--debut-rose-gold-border)] max-w-md mx-auto">
              <MessageSquare className="w-6 h-6 text-[var(--debut-rose-gold,#B76E79)] mx-auto mb-2" />
              <p>
                {data.emptyStateMessage || "Approved guest wishes will appear here as guests RSVP."}
              </p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
