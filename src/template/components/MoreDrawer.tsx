"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MoreDrawerGroup } from "@/template/navigation/event-navigation";
import { resolveEventHref } from "@/template/navigation/event-navigation";
import {
  X,
  Calendar,
  MapPin,
  Mail,
  Utensils,
  Shirt,
  Heart,
  Info,
  Clock,
  Clock3,
  Users,
  Award,
  Image,
  MessageSquare,
  BookOpen,
  Music,
  Phone,
  Gift,
  Home,
  Flower2,
  Star,
  Crown,
  List,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Calendar,
  MapPin,
  Mail,
  Utensils,
  Shirt,
  Heart,
  Info,
  Clock,
  Clock3,
  Users,
  Award,
  Image,
  MessageSquare,
  BookOpen,
  Music,
  Phone,
  Gift,
  Home,
  Flower2,
  Star,
  Crown,
  List,
};

export type MoreDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  groups: MoreDrawerGroup[];
  coupleDisplayName?: string;
};

export function MoreDrawer({ isOpen, onClose, groups, coupleDisplayName }: MoreDrawerProps) {
  const pathname = usePathname() || "/";
  const isHomePage = pathname === "/" || pathname === "";

  // Handle ESC key press and scroll locking
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    onClose();

    if (anchor === "/rsvp" && pathname === "/rsvp") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (isHomePage && anchor.startsWith("#")) {
      e.preventDefault();
      setTimeout(() => {
        const target = document.querySelector(anchor);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    }
  };

  return (
    <div
      id="sitemap-drawer"
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Complete celebration menu"
    >
      {/* Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Content Panel */}
      <div className="relative w-full max-w-md bg-[var(--debut-surface-alabaster,#FFFFFF)] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300 border-l border-[var(--debut-rose-gold-border,#E8C4C8)]">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--debut-rose-gold-border,#E8C4C8)] bg-[var(--debut-surface-alabaster-alt,#F4EBEB)]/60">
          <span className="text-xs font-cinzel font-bold tracking-[0.22em] text-[var(--debut-rose-gold,#B76E79)] uppercase">
            COTILLION DIRECTORY
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[var(--debut-text-muted,#704D5B)] hover:text-[var(--debut-text-noir,#26131C)] hover:bg-[var(--debut-surface-alabaster-alt)] transition-colors template-focus-ring cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 overscroll-contain select-none font-sans">
          {groups.map((group, gIdx) => (
            <div key={group.title} className="space-y-2.5">
              <h4 className="text-[10px] font-cinzel font-bold uppercase tracking-[0.22em] text-[var(--debut-text-muted,#704D5B)] border-b border-[var(--debut-rose-gold-subtle)] pb-1.5 flex items-center justify-between">
                <span>{group.title}</span>
                <span className="text-[9px] text-[var(--debut-champagne-gold,#D4AF37)]">
                  FOLIO 0{gIdx + 1}
                </span>
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {group.items.map((item) => {
                  const IconComponent = ICON_MAP[item.iconName] || Info;
                  const resolvedHref = resolveEventHref(item.anchor, pathname);

                  return (
                    <Link
                      key={item.key}
                      href={resolvedHref}
                      onClick={(e) => handleLinkClick(e, item.anchor)}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl text-sm text-[var(--debut-text-noir,#26131C)] hover:bg-[var(--debut-surface-alabaster-alt,#F4EBEB)] hover:text-[var(--debut-bg-coral,#E65C4F)] transition-colors border border-transparent hover:border-[var(--debut-rose-gold-border)] template-focus-ring group"
                    >
                      <IconComponent className="w-4 h-4 text-[var(--debut-rose-gold,#B76E79)] group-hover:text-[var(--debut-bg-coral)] shrink-0 transition-colors" />
                      <span className="truncate font-medium text-xs">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Drawer Footer */}
        <div className="px-6 py-4 border-t border-[var(--debut-rose-gold-subtle)] bg-[var(--debut-surface-alabaster-alt,#F4EBEB)]/40 text-center text-xs text-[var(--debut-text-muted,#704D5B)]">
          <p>
            Debut Celebration Royale &bull; RSVP by{" "}
            <a
              href="https://rsvp.webserbisyo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--debut-text-noir,#26131C)] hover:underline font-semibold"
            >
              WebSerbisyo
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
