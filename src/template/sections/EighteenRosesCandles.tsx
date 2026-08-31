"use client";

import { useState } from "react";
import type {
  EighteenRosesCandlesData,
  EighteenTraditionGroup,
} from "@/platform/event-template-data";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/template/components/ui/Tabs";
import { Reveal } from "@/template/components/motion/Reveal";
import { Flower2, Flame, Gift, Sparkles, Heart } from "lucide-react";

// PLATFORM DATA — KEEP DYNAMIC.
// DEBUT ROSE GLAM 18 TRADITIONS (CANVAS B: LIVING CORAL WITH SOLID PURE WHITE ENCLOSURE CARDS)

const TRADITION_ICONS: Record<string, React.ElementType> = {
  roses: Flower2,
  candles: Flame,
  treasures: Gift,
  custom: Heart,
};

export function EighteenRosesCandlesSection({ data }: { data: EighteenRosesCandlesData }) {
  const groups: EighteenTraditionGroup[] = data.groups || [];

  const [activeTab, setActiveTab] = useState<string>(groups[0]?.id || "roses");

  if (groups.length === 0) return null;

  return (
    <section
      id="eighteen_roses_candles"
      className="template-section section-surface-coral pattern-coral relative overflow-x-clip text-white"
    >
      <div className="template-container relative z-10">
        <Reveal direction="up" distance={16}>
          <div className="text-center mb-8 sm:mb-12 space-y-2">
            <span className="text-white font-cinzel font-bold tracking-[0.25em] drop-shadow-sm inline-flex items-center gap-1.5 text-xs sm:text-sm uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#F9F1DC]" />
              <span>THE 18 TRADITIONS // 10</span>
            </span>
            <h2 className="text-role-heading-major text-white tracking-tight">
              The 18 Cotillion Traditions
            </h2>
            <p className="text-role-lead text-[#FFE7E2] max-w-md mx-auto mt-2 leading-relaxed font-serif italic">
              Honoring the cherished escorts, mentors, and loved ones who illuminate the
              debutante&apos;s journey.
            </p>
          </div>
        </Reveal>

        <Reveal direction="up" distance={20} delay={0.1}>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full max-w-4xl mx-auto flex flex-col items-center"
          >
            {/* 3-Way Tab Switcher */}
            <TabsList className="h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 p-1 text-white gap-1 mb-8 shadow-md">
              {groups.map((group) => {
                const IconComponent = TRADITION_ICONS[group.kind] || TRADITION_ICONS.custom;
                const isActive = activeTab === group.id;

                return (
                  <TabsTrigger
                    key={group.id}
                    value={group.id}
                    className={`rounded-full px-5 sm:px-7 py-2 text-xs sm:text-sm font-cinzel font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? "bg-white text-[var(--debut-bg-coral,#E65C4F)] shadow-lg scale-105"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{group.title}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* Tab Contents: Solid Pure White Enclosure Cards */}
            {groups.map((group) => (
              <TabsContent key={group.id} value={group.id} className="w-full">
                <div
                  data-surface="light"
                  className="debut-card-coral-enclosure p-6 sm:p-10 rounded-3xl bg-[var(--debut-surface-alabaster,#ffffff)] text-[var(--debut-text-noir,#26131C)] shadow-2xl"
                >
                  <div className="flex items-center justify-between border-b border-[var(--debut-rose-gold-subtle)] pb-4 mb-6">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--debut-text-noir,#26131C)]">
                      {group.title} Roster
                    </h3>
                    <span className="font-cinzel text-xs font-bold text-[var(--debut-rose-gold,#B76E79)] uppercase tracking-wider">
                      {group.entries.length} Honored Participants
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {group.entries.map((item, idx: number) => (
                      <div
                        key={item.id || idx}
                        className="flex items-center gap-3 p-3.5 rounded-2xl bg-[var(--debut-surface-alabaster-alt,#F4EBEB)] border border-[var(--debut-rose-gold-subtle)] hover:border-[var(--debut-rose-gold,#B76E79)] transition-colors group"
                      >
                        <span className="w-8 h-8 rounded-full bg-[var(--debut-surface-alabaster,#ffffff)] text-[var(--debut-bg-coral,#E65C4F)] border border-[var(--debut-rose-gold-border,#E8C4C8)] font-cinzel text-xs font-bold flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[var(--debut-bg-coral)] group-hover:text-white transition-colors">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0">
                          <p className="font-serif font-bold text-sm sm:text-base text-[var(--debut-text-noir,#26131C)] truncate">
                            {item.name}
                          </p>
                          {item.message && (
                            <p className="text-[11px] font-sans text-[var(--debut-text-muted,#704D5B)] truncate">
                              {item.message}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>
      </div>
    </section>
  );
}
