"use client";

import type { EventTemplateData } from "@/platform/event-template-data";
import { formatEventDateLong } from "@/template/utils/event-formatting";
import { Reveal } from "./motion/Reveal";
import { MapPin, Phone, Mail } from "lucide-react";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "./ui/BrandIcons";

// PLATFORM DATA — KEEP DYNAMIC.
// DEBUT ROSE GLAM VELVET NOIR COLOPHON FOOTER (CLOSING ANCHOR & DYNAMIC SOCIAL CONTRACT LINKS)

export function Footer({ data }: { data: EventTemplateData }) {
  const contact = data.contact;
  const currentYear = new Date().getFullYear();
  const dateFormatted = formatEventDateLong(data.eventDate || data.ceremony?.eventDate);

  const hasSocials = Boolean(contact?.facebookUrl || contact?.instagramUrl || contact?.tikTokUrl);

  const hasCoordinationBox = Boolean(
    contact?.contactNumber || contact?.email || contact?.contactPerson || data.venue?.venueName
  );

  return (
    <footer
      id="contact_socials"
      className="section-surface-noir bg-[#10050B] py-16 px-6 text-center text-[#E8C4C8]/80 border-t border-[#E8C4C8]/20 relative overflow-hidden select-none"
    >
      {/* Background ambient radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[var(--debut-bg-coral,#E65C4F)]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="template-container relative z-10 space-y-8 max-w-2xl mx-auto">
        {/* 1. Grand Cotillion Monogram Seal & Wordmark */}
        <Reveal direction="down" distance={16}>
          <div className="flex flex-col items-center">
            {/* Centered circular rose badge */}
            <div className="w-12 h-12 rounded-full border border-[#E8C4C8]/40 bg-[#1A0A13] flex items-center justify-center text-base shadow-md mx-auto mb-4">
              🌹
            </div>

            <div className="font-cinzel font-bold text-sm sm:text-base tracking-[0.25em] text-[#D4AF37] uppercase mb-2">
              {data.coupleDisplayName || "SOPHIA • 18TH BIRTHDAY"}
            </div>

            <p className="font-serif italic text-xs text-[#E8C4C8]/80 mb-2">
              {data.ceremony?.eventLabel || "The Grand Cotillion Ball"}
              {dateFormatted ? ` • ${dateFormatted}` : ""}
            </p>
          </div>
        </Reveal>

        {/* 2. Ballroom Protocol & Coordination Box */}
        {hasCoordinationBox && (
          <Reveal direction="up" distance={20} delay={0.1}>
            <div className="bg-[#180812] border border-[#E8C4C8]/20 rounded-2xl p-5 sm:p-6 max-w-lg mx-auto space-y-3 text-sm font-sans">
              <span className="text-xs font-cinzel font-bold uppercase tracking-[0.22em] text-[#D4AF37] block">
                Ballroom Protocol &amp; Coordination
              </span>

              {contact?.contactPerson && (
                <p className="font-serif font-bold text-base text-[var(--debut-text-on-noir,#FAF5F5)]">
                  {contact.contactPerson}
                </p>
              )}

              {data.venue?.venueName && (
                <div className="flex items-center justify-center gap-2 text-[var(--debut-text-on-noir,#FAF5F5)] font-medium text-xs sm:text-sm">
                  <MapPin className="w-3.5 h-3.5 text-[var(--debut-rose-gold,#B76E79)] shrink-0" />
                  <span>
                    {data.venue.venueName} {data.venue.address ? `• ${data.venue.address}` : ""}
                  </span>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-1 text-xs text-[#E8C4C8]/90">
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
            </div>
          </Reveal>
        )}

        {/* 3. Dynamic Social Contract Links */}
        {hasSocials && (
          <Reveal direction="up" distance={16} delay={0.15}>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              {contact?.facebookUrl && (
                <a
                  href={contact.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full bg-[#180812] text-[#E8C4C8] hover:text-white hover:border-[#D4AF37] border border-[#E8C4C8]/30 flex items-center justify-center transition-all duration-300 hover:scale-105 template-focus-ring cursor-pointer"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
              )}
              {contact?.instagramUrl && (
                <a
                  href={contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-[#180812] text-[#E8C4C8] hover:text-white hover:border-[#D4AF37] border border-[#E8C4C8]/30 flex items-center justify-center transition-all duration-300 hover:scale-105 template-focus-ring cursor-pointer"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              )}
              {contact?.tikTokUrl && (
                <a
                  href={contact.tikTokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-10 h-10 rounded-full bg-[#180812] text-[#E8C4C8] hover:text-white hover:border-[#D4AF37] border border-[#E8C4C8]/30 flex items-center justify-center transition-all duration-300 hover:scale-105 template-focus-ring cursor-pointer"
                >
                  <TikTokIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </Reveal>
        )}

        {/* 4. Colophon & Platform Attribution */}
        <Reveal direction="up" distance={16} delay={0.2}>
          <div className="space-y-2 text-xs text-[#E8C4C8]/70 font-sans border-t border-[#E8C4C8]/15 pt-8">
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
                className="text-[#D4AF37] hover:underline font-semibold"
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
