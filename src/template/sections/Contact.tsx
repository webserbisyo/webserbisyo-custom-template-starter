import type { ContactData } from "@/platform/event-template-data";
import { Phone, Mail, User, Sparkles } from "lucide-react";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "../components/ui/BrandIcons";

// PLATFORM DATA — KEEP DYNAMIC.
// DEBUT ROSE GLAM CONTACT & SOCIALS SECTION (VELVET NOIR / PROTOCOL CARD)

export function ContactSection({ data }: { data?: ContactData | null }) {
  if (!data) return null;

  const hasContent = Boolean(
    data.contactPerson?.trim() ||
    data.contactNumber?.trim() ||
    data.email?.trim() ||
    data.facebookUrl?.trim() ||
    data.instagramUrl?.trim() ||
    data.tikTokUrl?.trim()
  );

  if (!hasContent) return null;

  return (
    <section id="contact_socials" className="template-section section-surface-alabaster">
      <div className="template-container">
        <div className="text-center mb-8 space-y-2">
          <span className="text-role-subheading text-[var(--debut-rose-gold,#B76E79)] inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[var(--debut-champagne-gold,#D4AF37)]" />
            <span>CONTACT &amp; COORDINATION</span>
          </span>
          <h2 className="text-role-heading text-[var(--debut-text-noir,#26131C)]">Get in Touch</h2>
        </div>
        <div className="bg-[var(--debut-surface-alabaster,#ffffff)] p-6 sm:p-8 rounded-3xl border border-[var(--debut-rose-gold-border,#E8C4C8)] max-w-xl mx-auto space-y-4 text-sm sm:text-base shadow-card">
          {data.contactPerson && (
            <div className="flex items-center gap-3 text-[var(--debut-text-noir,#26131C)] font-semibold">
              <User className="w-4 h-4 text-[var(--debut-rose-gold,#B76E79)] shrink-0" />
              <span>{data.contactPerson}</span>
            </div>
          )}
          {data.contactNumber && (
            <div className="flex items-center gap-3 text-[var(--debut-text-noir,#26131C)]">
              <Phone className="w-4 h-4 text-[var(--debut-rose-gold,#B76E79)] shrink-0" />
              <a href={`tel:${data.contactNumber}`} className="hover:underline">
                {data.contactNumber}
              </a>
            </div>
          )}
          {data.email && (
            <div className="flex items-center gap-3 text-[var(--debut-text-noir,#26131C)]">
              <Mail className="w-4 h-4 text-[var(--debut-rose-gold,#B76E79)] shrink-0" />
              <a
                href={`mailto:${data.email}`}
                className="text-[var(--debut-bg-coral,#E65C4F)] hover:underline font-medium template-focus-ring"
              >
                {data.email}
              </a>
            </div>
          )}
          {(data.facebookUrl || data.instagramUrl || data.tikTokUrl) && (
            <div className="flex flex-wrap items-center justify-center gap-4 pt-3 border-t border-[var(--debut-rose-gold-subtle)] text-xs">
              {data.facebookUrl && (
                <a
                  href={data.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--debut-bg-coral,#E65C4F)] hover:underline flex items-center gap-1.5 font-medium template-focus-ring"
                >
                  <FacebookIcon className="w-3.5 h-3.5" /> Facebook
                </a>
              )}
              {data.instagramUrl && (
                <a
                  href={data.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--debut-bg-coral,#E65C4F)] hover:underline flex items-center gap-1.5 font-medium template-focus-ring"
                >
                  <InstagramIcon className="w-3.5 h-3.5" /> Instagram
                </a>
              )}
              {data.tikTokUrl && (
                <a
                  href={data.tikTokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--debut-bg-coral,#E65C4F)] hover:underline flex items-center gap-1.5 font-medium template-focus-ring"
                >
                  <TikTokIcon className="w-3.5 h-3.5" /> TikTok
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
