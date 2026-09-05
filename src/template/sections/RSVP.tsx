"use client";

import { useState, useEffect } from "react";
import type { RsvpData } from "@/platform/event-template-data";
import { formatRsvpDeadline } from "@/template/utils/event-formatting";
import { getSingleHostFirstName } from "@/template/utils/host-identity";
import { submitRsvp, type PublicRsvpPayload } from "@/platform/submit-rsvp";
import { Reveal } from "@/template/components/motion/Reveal";
import {
  Heart,
  Send,
  CheckCircle2,
  User,
  Mail,
  Users,
  MessageSquare,
  Sparkles,
  Phone,
  Utensils,
} from "lucide-react";

// PLATFORM DATA — KEEP DYNAMIC.
// DEBUT ROSE GLAM RSVP FORM (CANVAS A: SATIN ALABASTER WITH HIGH-CONTRAST CARD ENCLOSURE)

export type RSVPSectionProps = {
  data: RsvpData;
  eventSlug?: string;
  deadlineLabel?: string | null;
  debutantName?: string;
  apiBaseUrl?: string;
  accessToken?: string | null;
  isDemoMode?: boolean;
};

export function RSVPSection({
  data,
  eventSlug,
  deadlineLabel,
  debutantName,
  apiBaseUrl,
  accessToken,
  isDemoMode,
}: RSVPSectionProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [attending, setAttending] = useState<"yes" | "no" | null>("yes");
  const [guestsCount, setGuestsCount] = useState(1);
  const [companions, setCompanions] = useState<Array<{ fullName: string; ageLabel: string }>>([]);
  const [dietaryRequirements, setDietaryRequirements] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const celebrantFirstName =
    getSingleHostFirstName(debutantName) || debutantName || "the celebrant";

  const formattedDeadline = deadlineLabel ? formatRsvpDeadline(deadlineLabel) : null;

  // Synchronize companion array length whenever guestsCount changes
  useEffect(() => {
    const needed = Math.max(0, guestsCount - 1);
    setCompanions((prev) => {
      if (prev.length === needed) return prev;
      return Array.from({ length: needed }, (_, i) => prev[i] || { fullName: "", ageLabel: "" });
    });
  }, [guestsCount]);

  const updateCompanion = (index: number, field: "fullName" | "ageLabel", val: string) => {
    setCompanions((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || attending === null) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    const companionPayload =
      attending === "yes" && guestsCount > 1
        ? companions.slice(0, guestsCount - 1).map((c) => ({
            fullName: c.fullName.trim() || undefined,
            ageLabel: c.ageLabel.trim() || undefined,
          }))
        : undefined;

    const payload: PublicRsvpPayload = {
      guestName: name.trim(),
      attendanceStatus: attending === "yes" ? "attending" : "not_attending",
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      companionCount: attending === "yes" ? Math.max(0, guestsCount - 1) : 0,
      companions: companionPayload && companionPayload.length > 0 ? companionPayload : undefined,
      dietaryNotes: dietaryRequirements.trim() || undefined,
      message: message.trim() || undefined,
    };

    try {
      const result = await submitRsvp({
        eventSlug: eventSlug || "event",
        payload,
        apiBaseUrl,
        accessToken,
        isDemoMode,
      });

      if (result.error) {
        setErrorMsg(result.error.message || "Failed to submit RSVP response. Please try again.");
      } else {
        setIsSuccess(true);
      }
    } catch {
      setErrorMsg("Failed to submit RSVP response. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="rsvp_form"
      className="template-section section-surface-alabaster bg-pattern-debut-01 relative overflow-x-clip"
    >
      <div className="template-container-narrow relative z-10">
        <Reveal direction="up" distance={16}>
          <div className="text-center mb-8 sm:mb-12 space-y-2">
            <span className="text-role-subheading text-[var(--debut-rose-gold,#B76E79)] inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--debut-champagne-gold,#D4AF37)]" />
              <span>RSVP &amp; ATTENDANCE // 15</span>
            </span>
            <h2 className="text-role-heading-major text-[var(--debut-text-noir,#26131C)] tracking-tight">
              Confirm Your Presence
            </h2>
            {formattedDeadline ? (
              <p className="text-role-lead text-[var(--debut-text-muted,#704D5B)] max-w-md mx-auto mt-2">
                Kindly respond on or before{" "}
                <strong className="font-bold text-[var(--debut-bg-coral,#E65C4F)] underline">
                  {formattedDeadline}
                </strong>
              </p>
            ) : (
              <p className="text-role-lead text-[var(--debut-text-muted,#704D5B)] max-w-md mx-auto mt-2">
                We look forward to celebrating this 18th birthday cotillion with you.
              </p>
            )}
          </div>
        </Reveal>

        <Reveal direction="up" distance={24} delay={0.1}>
          <div
            data-surface="light"
            className="debut-glass-card bg-[var(--debut-surface-alabaster,#ffffff)] text-[var(--debut-text-noir,#26131C)] border-2 border-[var(--debut-rose-gold-border,#E8C4C8)] p-6 sm:p-10 md:p-12 rounded-3xl shadow-card max-w-xl mx-auto font-sans relative z-10"
          >
            {isSuccess ? (
              <div className="py-8 text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-[var(--debut-bg-coral,#E65C4F)] mx-auto" />
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--debut-text-noir,#26131C)]">
                  RSVP Response Recorded
                </h3>
                <p className="text-base text-[var(--debut-text-muted,#704D5B)] max-w-sm mx-auto font-sans leading-relaxed">
                  Thank you, <strong>{name}</strong>. Your cotillion attendance response has been
                  officially inscribed into the debut registry.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setName("");
                    setEmail("");
                    setPhone("");
                    setDietaryRequirements("");
                    setMessage("");
                    setGuestsCount(1);
                    setCompanions([]);
                  }}
                  className="mt-4 text-xs font-cinzel font-bold uppercase tracking-wider text-[var(--debut-rose-gold,#B76E79)] hover:underline cursor-pointer"
                >
                  Submit Another Response
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Attending Toggle */}
                <div className="space-y-2">
                  <label className="block text-xs font-cinzel font-bold uppercase tracking-wider text-[var(--debut-text-noir,#26131C)]">
                    Will You Attend?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setAttending("yes")}
                      className={`h-12 rounded-2xl font-bold font-sans text-sm flex items-center justify-center gap-2 transition-all border cursor-pointer template-focus-ring btn-press-physics ${
                        attending === "yes"
                          ? "bg-[var(--debut-bg-coral,#E65C4F)] text-white border-[var(--debut-bg-coral)] shadow-md scale-102"
                          : "bg-[var(--debut-surface-alabaster-alt,#F4EBEB)] text-[var(--debut-text-noir,#26131C)] border-[var(--debut-rose-gold-border,#E8C4C8)] hover:bg-[var(--debut-rose-gold-border)]/40"
                      }`}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                      <span>Joyfully Accept</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttending("no")}
                      className={`h-12 rounded-2xl font-bold font-sans text-sm flex items-center justify-center gap-2 transition-all border cursor-pointer template-focus-ring btn-press-physics ${
                        attending === "no"
                          ? "bg-[var(--debut-text-noir,#26131C)] text-white border-[var(--debut-text-noir)] shadow-md scale-102"
                          : "bg-[var(--debut-surface-alabaster-alt,#F4EBEB)] text-[var(--debut-text-noir,#26131C)] border-[var(--debut-rose-gold-border,#E8C4C8)] hover:bg-[var(--debut-rose-gold-border)]/40"
                      }`}
                    >
                      <span>Regretfully Decline</span>
                    </button>
                  </div>
                </div>

                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-cinzel font-bold uppercase tracking-wider text-[var(--debut-text-noir,#26131C)]">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Eleanor Vance & Guest"
                      className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-[var(--debut-rose-gold-border,#E8C4C8)] bg-[var(--debut-surface-alabaster,#ffffff)] text-[var(--debut-text-noir,#26131C)] text-base placeholder:text-[var(--debut-text-muted,#704D5B)]/60 focus:border-[var(--debut-bg-coral,#E65C4F)] focus:outline-hidden template-focus-ring"
                    />
                    <User className="w-4 h-4 text-[var(--debut-text-muted,#704D5B)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Email Address */}
                {data.emailEnabled && (
                  <div className="space-y-1.5">
                    <label className="block text-xs font-cinzel font-bold uppercase tracking-wider text-[var(--debut-text-noir,#26131C)]">
                      Email Address {data.emailRequired ? "*" : ""}
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required={data.emailRequired}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@domain.com"
                        className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-[var(--debut-rose-gold-border,#E8C4C8)] bg-[var(--debut-surface-alabaster,#ffffff)] text-[var(--debut-text-noir,#26131C)] text-base placeholder:text-[var(--debut-text-muted,#704D5B)]/60 focus:border-[var(--debut-bg-coral,#E65C4F)] focus:outline-hidden template-focus-ring"
                      />
                      <Mail className="w-4 h-4 text-[var(--debut-text-muted,#704D5B)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                )}

                {/* Phone Number */}
                {data.phoneEnabled && (
                  <div className="space-y-1.5">
                    <label className="block text-xs font-cinzel font-bold uppercase tracking-wider text-[var(--debut-text-noir,#26131C)]">
                      Phone Number {data.phoneRequired ? "*" : ""}
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required={data.phoneRequired}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+63 912 345 6789"
                        className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-[var(--debut-rose-gold-border,#E8C4C8)] bg-[var(--debut-surface-alabaster,#ffffff)] text-[var(--debut-text-noir,#26131C)] text-base placeholder:text-[var(--debut-text-muted,#704D5B)]/60 focus:border-[var(--debut-bg-coral,#E65C4F)] focus:outline-hidden template-focus-ring"
                      />
                      <Phone className="w-4 h-4 text-[var(--debut-text-muted,#704D5B)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                )}

                {/* Guest Count */}
                {attending === "yes" && data.plusOneEnabled && (
                  <div className="space-y-1.5">
                    <label className="block text-xs font-cinzel font-bold uppercase tracking-wider text-[var(--debut-text-noir,#26131C)]">
                      Number of Guests (Including Yourself)
                    </label>
                    <div className="relative">
                      <select
                        value={guestsCount}
                        onChange={(e) => setGuestsCount(Number(e.target.value))}
                        className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-[var(--debut-rose-gold-border,#E8C4C8)] bg-[var(--debut-surface-alabaster,#ffffff)] text-[var(--debut-text-noir,#26131C)] text-base focus:border-[var(--debut-bg-coral,#E65C4F)] focus:outline-hidden template-focus-ring appearance-none cursor-pointer"
                      >
                        {Array.from(
                          { length: Math.max(1, data.companionLimit || 4) },
                          (_, i) => i + 1
                        ).map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "Guest" : "Guests"}
                          </option>
                        ))}
                      </select>
                      <Users className="w-4 h-4 text-[var(--debut-text-muted,#704D5B)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                )}

                {/* Companion Details Loop */}
                {attending === "yes" &&
                  data.plusOneEnabled &&
                  guestsCount > 1 &&
                  (data.companionNameEnabled || data.companionAgeEnabled) && (
                    <div className="space-y-4 pt-1">
                      <div className="flex items-center gap-2 text-xs font-cinzel font-bold uppercase tracking-wider text-[var(--debut-rose-gold,#B76E79)]">
                        <Users className="w-3.5 h-3.5" />
                        <span>Companion Information</span>
                      </div>
                      <div className="space-y-3">
                        {Array.from({ length: guestsCount - 1 }).map((_, idx) => {
                          const companion = companions[idx] || { fullName: "", ageLabel: "" };
                          return (
                            <div
                              key={idx}
                              className="p-3.5 sm:p-4 rounded-2xl bg-[var(--debut-surface-alabaster-alt,#F4EBEB)]/80 border border-[var(--debut-rose-gold-subtle)] space-y-3"
                            >
                              <div className="flex items-center justify-between text-xs font-cinzel font-bold text-[var(--debut-text-noir,#26131C)]">
                                <span>Guest 0{idx + 2} Details</span>
                                <span className="text-[var(--debut-rose-gold,#B76E79)]">
                                  Companion {idx + 1}
                                </span>
                              </div>
                              <div
                                className={`grid gap-3 ${
                                  data.companionNameEnabled && data.companionAgeEnabled
                                    ? "grid-cols-1 sm:grid-cols-3"
                                    : "grid-cols-1"
                                }`}
                              >
                                {data.companionNameEnabled && (
                                  <div
                                    className={
                                      data.companionAgeEnabled
                                        ? "sm:col-span-2 space-y-1"
                                        : "space-y-1"
                                    }
                                  >
                                    <label className="block text-[11px] font-cinzel font-semibold uppercase tracking-wider text-[var(--debut-text-muted,#704D5B)]">
                                      Companion Name
                                    </label>
                                    <div className="relative">
                                      <input
                                        type="text"
                                        value={companion.fullName}
                                        onChange={(e) =>
                                          updateCompanion(idx, "fullName", e.target.value)
                                        }
                                        placeholder="Full name"
                                        className="w-full h-10 pl-9 pr-3 rounded-xl border border-[var(--debut-rose-gold-border,#E8C4C8)] bg-[var(--debut-surface-alabaster,#ffffff)] text-[var(--debut-text-noir,#26131C)] text-sm placeholder:text-[var(--debut-text-muted,#704D5B)]/60 focus:border-[var(--debut-bg-coral,#E65C4F)] focus:outline-hidden template-focus-ring"
                                      />
                                      <User className="w-3.5 h-3.5 text-[var(--debut-text-muted,#704D5B)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    </div>
                                  </div>
                                )}

                                {data.companionAgeEnabled && (
                                  <div className="space-y-1">
                                    <label className="block text-[11px] font-cinzel font-semibold uppercase tracking-wider text-[var(--debut-text-muted,#704D5B)]">
                                      Age / Category
                                    </label>
                                    <input
                                      type="text"
                                      value={companion.ageLabel}
                                      onChange={(e) =>
                                        updateCompanion(idx, "ageLabel", e.target.value)
                                      }
                                      placeholder="e.g. Adult / 18"
                                      className="w-full h-10 px-3 rounded-xl border border-[var(--debut-rose-gold-border,#E8C4C8)] bg-[var(--debut-surface-alabaster,#ffffff)] text-[var(--debut-text-noir,#26131C)] text-sm placeholder:text-[var(--debut-text-muted,#704D5B)]/60 focus:border-[var(--debut-bg-coral,#E65C4F)] focus:outline-hidden template-focus-ring"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                {/* Dietary Restrictions */}
                {data.foodAllergiesEnabled && (
                  <div className="space-y-1.5">
                    <label className="block text-xs font-cinzel font-bold uppercase tracking-wider text-[var(--debut-text-noir,#26131C)]">
                      Dietary Restrictions &amp; Food Allergies
                    </label>
                    <div className="relative">
                      <textarea
                        rows={2}
                        value={dietaryRequirements}
                        onChange={(e) => setDietaryRequirements(e.target.value)}
                        placeholder="Vegetarian, peanut allergy, gluten sensitivity, etc."
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[var(--debut-rose-gold-border,#E8C4C8)] bg-[var(--debut-surface-alabaster,#ffffff)] text-[var(--debut-text-noir,#26131C)] text-base placeholder:text-[var(--debut-text-muted,#704D5B)]/60 focus:border-[var(--debut-bg-coral,#E65C4F)] focus:outline-hidden template-focus-ring resize-none"
                      />
                      <Utensils className="w-4 h-4 text-[var(--debut-text-muted,#704D5B)] absolute left-3.5 top-3.5 pointer-events-none" />
                    </div>
                  </div>
                )}

                {/* Message to Celebrant */}
                {data.messageToHostEnabled && (
                  <div className="space-y-1.5">
                    <label className="block text-xs font-cinzel font-bold uppercase tracking-wider text-[var(--debut-text-noir,#26131C)]">
                      Message or Blessing for {celebrantFirstName}
                    </label>
                    <div className="relative">
                      <textarea
                        rows={2}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={`Note or blessing for ${celebrantFirstName}...`}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[var(--debut-rose-gold-border,#E8C4C8)] bg-[var(--debut-surface-alabaster,#ffffff)] text-[var(--debut-text-noir,#26131C)] text-base placeholder:text-[var(--debut-text-muted,#704D5B)]/60 focus:border-[var(--debut-bg-coral,#E65C4F)] focus:outline-hidden template-focus-ring resize-none"
                      />
                      <MessageSquare className="w-4 h-4 text-[var(--debut-text-muted,#704D5B)] absolute left-3.5 top-3.5 pointer-events-none" />
                    </div>
                  </div>
                )}

                {errorMsg && <p className="text-xs text-red-600 font-medium">{errorMsg}</p>}

                {/* Submit Button with Shimmer */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-[var(--debut-bg-coral,#E65C4F)] hover:bg-[var(--debut-bg-coral-hover,#D85244)] text-white text-base font-bold uppercase tracking-wider rounded-2xl shadow-floating hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2.5 template-focus-ring cursor-pointer min-h-[52px] btn-press-physics relative overflow-hidden"
                >
                  <div className="absolute inset-0 animate-debut-shimmer pointer-events-none" />
                  <Send className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">
                    {isSubmitting ? "Transmitting RSVP..." : "Send Cotillion RSVP"}
                  </span>
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
