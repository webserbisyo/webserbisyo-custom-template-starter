"use client";

import { useState } from "react";
import type { GuestbookData, GuestbookMessage } from "@/platform/event-template-data";
import { LedgerPanel } from "@/template/components/containers/LedgerPanel";
import { Reveal } from "@/template/components/motion/Reveal";
import { MessageSquare, Send, User, Sparkles, Heart } from "lucide-react";

// PLATFORM DATA — KEEP DYNAMIC.
// DEBUT ROSE GLAM GUESTBOOK (SATIN ALABASTER & FLOATING WISHES STREAM)

export type DisplayGuestbookMessage = GuestbookMessage & {
  createdAt?: string;
};

export type GuestbookSectionProps = {
  data: GuestbookData;
  apiBaseUrl?: string;
  accessToken?: string | null;
  isDemoMode?: boolean;
};

export function GuestbookSection({
  data,
  apiBaseUrl,
  accessToken,
  isDemoMode,
}: GuestbookSectionProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const initialMessages: DisplayGuestbookMessage[] = data.messages || [];
  const [messages, setMessages] = useState<DisplayGuestbookMessage[]>(initialMessages);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    if (isDemoMode || !apiBaseUrl) {
      setTimeout(() => {
        setMessages((prev) => [
          {
            id: `temp-${Date.now()}`,
            guestName: name.trim(),
            message: message.trim(),
            createdAt: new Date().toISOString(),
          },
          ...prev,
        ]);
        setName("");
        setMessage("");
        setSubmitted(true);
        setIsSubmitting(false);
      }, 500);
      return;
    }

    try {
      const res = await fetch(`${apiBaseUrl}/guestbook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });

      if (!res.ok) throw new Error("Failed to post message.");

      const newEntry = await res.json();
      setMessages((prev) => [
        {
          id: newEntry.id || `msg-${Date.now()}`,
          guestName: newEntry.name || newEntry.guestName || name.trim(),
          message: newEntry.message || message.trim(),
          createdAt: newEntry.createdAt || new Date().toISOString(),
        },
        ...prev,
      ]);
      setName("");
      setMessage("");
      setSubmitted(true);
    } catch {
      setErrorMsg("Failed to post message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <span>FOLIO // 13 &bull; GUESTBOOK &amp; WISHES</span>
            </span>
            <h2 className="text-role-heading-quiet text-[var(--debut-text-noir,#26131C)] tracking-tight">
              {data.sectionTitle || "Debutante Guestbook"}
            </h2>
            {data.sectionIntro && (
              <p className="text-role-lead max-w-md mx-auto mt-2 leading-relaxed text-[var(--debut-text-muted,#704D5B)]">
                {data.sectionIntro}
              </p>
            )}
          </div>
        </Reveal>

        <div className="space-y-8 font-sans">
          {/* Submission Form */}
          <Reveal direction="up" distance={20} delay={0.1}>
            <div className="relative overflow-visible">
              <LedgerPanel
                title="Send Your Warm Wishes"
                indexTag="GUESTBOOK // FORM"
                className="bg-[var(--debut-surface-alabaster,#ffffff)] shadow-card relative z-10"
              >
                {submitted ? (
                  <div className="p-6 rounded-2xl bg-[var(--debut-surface-alabaster-alt,#F4EBEB)] text-center space-y-2 border border-[var(--debut-rose-gold-subtle)]">
                    <Heart className="w-8 h-8 text-[var(--debut-bg-coral,#E65C4F)] mx-auto fill-current" />
                    <h4 className="font-serif text-lg font-bold text-[var(--debut-text-noir,#26131C)]">
                      Thank you for your warm wish!
                    </h4>
                    <p className="text-sm text-[var(--debut-text-muted,#704D5B)]">
                      Your message has been inscribed into the debut record.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-3 text-xs font-cinzel font-bold text-[var(--debut-rose-gold,#B76E79)] hover:underline uppercase tracking-wider cursor-pointer"
                    >
                      Send Another Wish
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                    <div>
                      <label className="block text-xs font-cinzel font-bold uppercase tracking-wider text-[var(--debut-text-noir,#26131C)] mb-1.5">
                        Your Full Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Auntie Carmen & Family"
                          className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-[var(--debut-rose-gold-border,#E8C4C8)] bg-[var(--debut-surface-alabaster,#ffffff)] text-[var(--debut-text-noir,#26131C)] placeholder:text-[var(--debut-text-muted,#704D5B)]/60 text-base focus:border-[var(--debut-bg-coral,#E65C4F)] focus:outline-hidden template-focus-ring"
                        />
                        <User className="w-4 h-4 text-[var(--debut-text-muted,#704D5B)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-cinzel font-bold uppercase tracking-wider text-[var(--debut-text-noir,#26131C)] mb-1.5">
                        Your Birthday Message
                      </label>
                      <div className="relative">
                        <textarea
                          required
                          rows={3}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Share your heartfelt message and blessing for Sophia..."
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[var(--debut-rose-gold-border,#E8C4C8)] bg-[var(--debut-surface-alabaster,#ffffff)] text-[var(--debut-text-noir,#26131C)] placeholder:text-[var(--debut-text-muted,#704D5B)]/60 text-base focus:border-[var(--debut-bg-coral,#E65C4F)] focus:outline-hidden template-focus-ring resize-none"
                        />
                        <MessageSquare className="w-4 h-4 text-[var(--debut-text-muted,#704D5B)] absolute left-3.5 top-3.5 pointer-events-none" />
                      </div>
                    </div>

                    {errorMsg && <p className="text-xs text-red-600 font-medium">{errorMsg}</p>}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 py-3 px-6 bg-[var(--debut-bg-coral,#E65C4F)] hover:bg-[var(--debut-bg-coral-hover,#D85244)] text-white text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 template-focus-ring cursor-pointer min-h-[44px] btn-press-physics"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? "Inscribing..." : "Post Birthday Wish"}</span>
                    </button>
                  </form>
                )}
              </LedgerPanel>
            </div>
          </Reveal>

          {/* Message Stream */}
          <Reveal direction="up" distance={20} delay={0.2}>
            <div className="space-y-4">
              <span className="text-xs font-cinzel font-bold uppercase tracking-[0.2em] text-[var(--debut-rose-gold,#B76E79)] block text-center">
                Recent Inscribed Wishes ({messages.length})
              </span>
              {messages.length > 0 ? (
                <div className="space-y-3.5 max-h-96 overflow-y-auto pr-1">
                  {messages.map((entry) => (
                    <div
                      key={entry.id}
                      className="debut-glass-card p-5 rounded-2xl bg-[var(--debut-surface-alabaster,#ffffff)] border border-[var(--debut-rose-gold-border,#E8C4C8)]/80 shadow-xs space-y-1.5 text-left"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-serif font-bold text-base text-[var(--debut-text-noir,#26131C)]">
                          {entry.guestName}
                        </span>
                        {entry.createdAt && (
                          <span className="text-[10px] font-cinzel text-[var(--debut-text-muted,#704D5B)] uppercase">
                            {new Date(entry.createdAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[var(--debut-text-noir,#26131C)] leading-relaxed font-sans">
                        {entry.message}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-[var(--debut-surface-alabaster-alt,#F4EBEB)]/60 text-center text-xs text-[var(--debut-text-muted,#704D5B)] border border-dashed border-[var(--debut-rose-gold-border)]">
                  {data.emptyStateMessage ||
                    "Be the first to inscribe a birthday wish for the debutante."}
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
