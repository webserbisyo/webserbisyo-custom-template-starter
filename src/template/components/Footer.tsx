"use client";

import type { EventTemplateData } from "@/platform/event-template-data";
import { EventMonogram } from "./EventMonogram";
import { Reveal } from "./motion/Reveal";
import { MapPin, Phone, Mail } from "lucide-react";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "./ui/BrandIcons";

// PLATFORM DATA — KEEP DYNAMIC.
// DEBUT ROSE GLAM VELVET NOIR COLOPHON FOOTER (CLOSING ANCHOR & DYNAMIC SOCIALS)

export function Footer({ data }: { data: EventTemplateData }) {
  const contact = data.contact;
  const currentYear = new Date().getFullYear();

  const hasSocials = Boolean(contact?.facebookUrl || contact?.instagramUrl || contact?.tikTokUrl);

  return (
    <footer
      id="contact_socials"
      className="section-surface-noir bg-[var(--debut-bg-noir,#10050B)] text-[var(--debut-text-on-noir,#FAF5F5)] border-t border-[var(--debut-rose-gold-subtle)] relative overflow-hidden py-14 sm:py-18 select-none"
    >
      {/* Background ambient radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[var(--debut-bg-coral,#E65C4F)]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="template-container relative z-10 space-y-10 sm:space-y-12 text-center">
        {/* 1. Grand Cotillion Monogram Seal */}
        <Reveal direction="down" distance={16}>
          <div className="flex justify-center">
            <EventMonogram
              groomName={data.couple?.groomName}
              brideName={data.couple?.brideName}
              coupleDisplayName={data.coupleDisplayName}
              milestone={
                data.couple?.kind === "debut" || data.couple?.kind === "birthday"
                  ? (data.couple as { milestone?: string }).milestone
                  : undefined
              }
              variant="footer"
            />
          </div>
        </Reveal>

        {/* 2. Venue Protocol & Contact Box */}
        {(contact?.contactNumber ||
          contact?.email ||
          contact?.contactPerson ||
          data.venue?.venueName ||
          hasSocials) && (
          <Reveal direction="up" distance={20} delay={0.1}>
            <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-3xl bg-[var(--debut-surface-noir,#180812)] border border-[var(--debut-rose-gold-border,#E8C4C8)]/30 space-y-5 text-sm sm:text-base font-sans">
              <span className="text-xs font-cinzel font-bold uppercase tracking-[0.22em] text-[var(--debut-champagne-gold,#D4AF37)] block">
                Ballroom Protocol &amp; Coordination
              </span>

              {contact?.contactPerson && (
                <p className="font-serif font-bold text-lg text-[var(--debut-text-on-noir,#FAF5F5)]">
                  {contact.contactPerson}
                </p>
              )}

              {data.venue?.venueName && (
                <div className="flex items-center justify-center gap-2 text-[var(--debut-text-on-noir,#FAF5F5)] font-semibold">
                  <MapPin className="w-4 h-4 text-[var(--debut-rose-gold,#B76E79)] shrink-0" />
                  <span>
                    {data.venue.venueName} {data.venue.address ? `• ${data.venue.address}` : ""}
                  </span>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-1 text-xs sm:text-sm text-[var(--debut-text-on-noir-muted,#E8C4C8)]">
                {contact?.contactNumber && (
                  <a
                    href={`tel:${contact.contactNumber}`}
                    className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[var(--debut-rose-gold,#B76E79)]" />
                    <span>{contact.contactNumber}</span>
                  </a>
                )}
                {contact?.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[var(--debut-rose-gold,#B76E79)]" />
                    <span>{contact.email}</span>
                  </a>
                )}
              </div>

              {/* Dynamic Social Links */}
              {hasSocials && (
                <div className="flex items-center justify-center gap-3 pt-3 border-t border-[var(--debut-rose-gold-subtle)]">
                  {contact?.facebookUrl && (
                    <a
                      href={contact.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-[var(--debut-bg-noir,#10050B)] text-[var(--debut-text-on-noir-muted,#E8C4C8)] hover:text-white hover:border-[var(--debut-champagne-gold,#D4AF37)] border border-[var(--debut-rose-gold-border,#E8C4C8)]/30 transition-all flex items-center justify-center template-focus-ring cursor-pointer"
                      aria-label="Facebook Profile"
                    >
                      <FacebookIcon className="w-4 h-4" />
                    </a>
                  )}
                  {contact?.instagramUrl && (
                    <a
                      href={contact.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-[var(--debut-bg-noir,#10050B)] text-[var(--debut-text-on-noir-muted,#E8C4C8)] hover:text-white hover:border-[var(--debut-champagne-gold,#D4AF37)] border border-[var(--debut-rose-gold-border,#E8C4C8)]/30 transition-all flex items-center justify-center template-focus-ring cursor-pointer"
                      aria-label="Instagram Profile"
                    >
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                  )}
                  {contact?.tikTokUrl && (
                    <a
                      href={contact.tikTokUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-[var(--debut-bg-noir,#10050B)] text-[var(--debut-text-on-noir-muted,#E8C4C8)] hover:text-white hover:border-[var(--debut-champagne-gold,#D4AF37)] border border-[var(--debut-rose-gold-border,#E8C4C8)]/30 transition-all flex items-center justify-center template-focus-ring cursor-pointer"
                      aria-label="TikTok Profile"
                    >
                      <TikTokIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </Reveal>
        )}

        {/* 3. Colophon & Platform Attribution */}
        <Reveal direction="up" distance={16} delay={0.2}>
          <div className="space-y-2 text-xs text-[var(--debut-text-on-noir-muted,#E8C4C8)] font-sans border-t border-[var(--debut-rose-gold-subtle)] pt-8">
            <p className="flex items-center justify-center gap-1.5">
              <span>Grand Cotillion Royale</span>
              <span>&bull;</span>
              <span>
                &copy; {currentYear} {data.coupleDisplayName || "Sophia Eleanor"}. All Rights
                Reserved.
              </span>
            </p>
            <p className="text-[11px] opacity-80">
              Invitations &amp; RSVP Managed via{" "}
              <a
                href="https://rsvp.webserbisyo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--debut-champagne-gold,#D4AF37)] hover:underline font-semibold"
              >
                WebSerbisyo
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
