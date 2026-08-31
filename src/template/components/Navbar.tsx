"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { EventTemplateData } from "@/platform/event-template-data";
import { buildEventNavigation, resolveEventHref } from "@/template/navigation/event-navigation";
import { EventMonogram } from "./EventMonogram";
import { MoreDrawer } from "./MoreDrawer";
import { Menu } from "lucide-react";

// PLATFORM DATA — KEEP DYNAMIC.
// DEBUT ROSE GLAM INVARIANT HEIGHT NAVBAR (FIXED H-16/H-18 & CALIBRATED FROSTED GLASS)

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
      setHasScrolled(window.scrollY > 20);
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
        className={`fixed top-0 left-0 right-0 z-50 w-full h-16 sm:h-18 transition-[background-color,border-color,box-shadow] duration-300 ${
          isScrolled
            ? "debut-glass-navbar border-b border-[var(--debut-rose-gold-border,#E8C4C8)]/50 shadow-sm"
            : "bg-[var(--debut-bg-alabaster,#FAF5F5)]/80 backdrop-blur-md border-b border-[var(--debut-rose-gold-border,#E8C4C8)]/25"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Zone 1: Wordmark Lockup (shrink-0 prevents line collapse) */}
          <div className="flex items-center shrink-0">
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

          {/* Zone 2: Center Primary Browsing Links (hidden xl:flex prevents horizontal collision) */}
          <nav
            aria-label="Primary browsing navigation"
            className="hidden xl:flex flex-1 items-center justify-center gap-7 text-xs font-bold uppercase tracking-[0.2em] font-cinzel text-[var(--debut-text-noir,#26131C)] select-none whitespace-nowrap"
          >
            {navModel.primaryNavItems.map((item) => {
              const resolvedHref = resolveEventHref(item.anchor, pathname);

              return (
                <Link
                  key={item.key}
                  href={resolvedHref}
                  onClick={(e) => handleAnchorClick(e, item.anchor)}
                  className="py-1 relative text-[var(--debut-text-noir,#26131C)] hover:text-[var(--debut-bg-coral,#E65C4F)] transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100 after:bg-[var(--debut-bg-coral,#E65C4F)] template-focus-ring rounded-xs"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Directory Action Trigger (shrink-0) */}
          <div className="flex items-center justify-end shrink-0">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--debut-rose-gold-border,#E8C4C8)]/60 bg-white/80 text-[var(--debut-text-noir,#26131C)] hover:border-[var(--debut-bg-coral,#E65C4F)] hover:text-[var(--debut-bg-coral,#E65C4F)] transition-all text-xs font-cinzel font-bold tracking-widest uppercase shadow-xs active:scale-95 cursor-pointer template-focus-ring btn-press-physics"
              aria-expanded={drawerOpen}
              aria-controls="sitemap-drawer"
              aria-label="Open complete celebration menu"
            >
              <span>Directory</span>
              <Menu className="w-3.5 h-3.5" />
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
