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
      <div className="template-container-narrow relative z-10">
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
            <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1 font-sans">
              {messages.map((entry, idx) => {
                const initial = (entry.guestName || "G").charAt(0).toUpperCase();
                const rawDate = entry.submittedAt || entry.createdAt;

                return (
                  <div
                    key={entry.id || `msg-${entry.guestName || idx}`}
                    className="debut-glass-card p-5 sm:p-6 rounded-2xl bg-white border border-[var(--debut-rose-gold-border,#E8C4C8)]/80 shadow-xs flex items-start gap-4 text-left transition-all hover:border-[var(--debut-rose-gold,#B76E79)]"
                  >
                    {/* Guest Initial Avatar Badge */}
                    <div className="w-10 h-10 rounded-full bg-[#F4EBEB] text-[var(--debut-bg-coral,#E65C4F)] font-cinzel font-bold text-sm flex items-center justify-center shrink-0 border border-[var(--debut-rose-gold-border,#E8C4C8)] shadow-xs">
                      {initial}
                    </div>

                    {/* Guest Message Content */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-serif font-bold text-base text-[var(--debut-text-noir,#26131C)] truncate">
                          {entry.guestName}
                        </span>
                        {rawDate && (
                          <span className="text-[10px] font-cinzel text-[var(--debut-text-muted,#704D5B)] uppercase shrink-0">
                            {new Date(rawDate).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[var(--debut-text-noir,#26131C)] leading-relaxed font-sans">
                        &ldquo;{entry.message}&rdquo;
                      </p>
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
