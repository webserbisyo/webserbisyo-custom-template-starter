"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { EventTemplateData } from "@/platform/event-template-data";
import { buildEventNavigation, resolveEventHref } from "@/template/navigation/event-navigation";
import { EventMonogram } from "./EventMonogram";
import { MoreDrawer } from "./MoreDrawer";
import { Menu, Heart } from "lucide-react";

export function Navbar({ data }: { data: EventTemplateData }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const pathname = usePathname() || "/";
  const isHomePage = pathname === "/" || pathname === "";

  const navModel = buildEventNavigation(data);
  const isScrolled = !isHomePage || hasScrolled;

  useEffect(() => {
    const handleScroll = () => {
      if (!isHomePage) return;
      setHasScrolled(window.scrollY > 32);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    if (isHomePage && anchor.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(anchor);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHomePage) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        data-scrolled={isScrolled ? "true" : "false"}
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "debut-glass-navbar py-2 sm:py-2.5"
            : "bg-white/40 backdrop-blur-xs py-3 sm:py-3.5 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Zone 1: Left Monogram */}
          <div className="flex items-center min-w-[120px] sm:min-w-[160px]">
            <Link
              href="/"
              onClick={handleHomeClick}
              className="template-focus-ring rounded-lg inline-flex items-center group"
              aria-label={`Home - ${data.coupleDisplayName || "Debut Celebration"}`}
            >
              <EventMonogram
                groomName={data.couple?.groomName}
                brideName={data.couple?.brideName}
                coupleDisplayName={data.coupleDisplayName}
                milestone={
                  data.couple?.kind === "debut" || data.couple?.kind === "birthday"
                    ? (data.couple as { milestone?: string }).milestone
                    : undefined
                }
                variant="nav"
              />
            </Link>
          </div>

          {/* Zone 2: Center Primary Browsing Links */}
          <nav
            aria-label="Primary browsing navigation"
            className="hidden md:flex flex-1 items-center justify-center gap-6 lg:gap-8 text-xs font-bold uppercase tracking-[0.2em] font-cinzel text-[var(--debut-text-noir)] select-none"
          >
            {navModel.primaryNavItems.map((item) => {
              const resolvedHref = resolveEventHref(item.anchor, pathname);

              return (
                <Link
                  key={item.key}
                  href={resolvedHref}
                  onClick={(e) => handleAnchorClick(e, item.anchor)}
                  className="py-2 relative text-[var(--debut-text-noir)] hover:text-[var(--debut-bg-coral)] transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100 after:bg-[var(--debut-bg-coral)] template-focus-ring rounded-xs"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Right Action & Menu Trigger */}
          <div className="flex items-center justify-end gap-2.5 min-w-[120px] sm:min-w-[160px]">
            <a
              href="/rsvp"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--debut-bg-coral)] hover:bg-[var(--debut-bg-coral-hover)] text-white text-xs font-bold font-sans uppercase tracking-wider transition-all shadow-xs hover:shadow-md active:scale-95 template-focus-ring btn-press-physics"
            >
              <Heart className="w-3.5 h-3.5 fill-white/20" />
              <span>RSVP</span>
            </a>

            <button
              onClick={() => setDrawerOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[var(--debut-text-noir)] hover:bg-[var(--debut-surface-alabaster-alt)] transition-all duration-200 border border-[var(--debut-rose-gold-border)]/60 template-focus-ring cursor-pointer"
              aria-expanded={drawerOpen}
              aria-controls="sitemap-drawer"
              aria-label="Open complete celebration menu"
            >
              <span className="hidden lg:inline text-[11px] font-bold uppercase tracking-[0.2em] font-cinzel">
                Folio
              </span>
              <Menu className="w-4 h-4 text-[var(--debut-rose-gold)]" />
            </button>
          </div>
        </div>
      </header>

      {/* Overflow Sitemap Drawer */}
      <MoreDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        groups={navModel.moreGroups}
        coupleDisplayName={data.coupleDisplayName}
      />
    </>
  );
}
