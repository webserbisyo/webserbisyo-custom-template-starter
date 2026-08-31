"use client";

import { useState } from "react";
import type { EighteenRosesCandlesData, TraditionKind } from "@/platform/event-template-data";
import { LedgerPanel } from "@/template/components/containers/LedgerPanel";
import { Reveal } from "@/template/components/motion/Reveal";
import { Sparkles, Flame, Gift, Heart } from "lucide-react";

// PLATFORM DATA — KEEP DYNAMIC.
// SAGE ESTATE 18 TRADITIONS REGISTER (THE 18 ROSES, CANDLES & TREASURES)

function getTraditionIcon(kind: TraditionKind) {
  switch (kind) {
    case "roses":
      return Heart;
    case "candles":
      return Flame;
    case "treasures":
      return Gift;
    default:
      return Sparkles;
  }
}

export function EighteenRosesCandlesSection({ data }: { data: EighteenRosesCandlesData }) {
  const groups = data?.groups?.filter((g) => g && g.entries && g.entries.length > 0) || [];
  const [activeTab, setActiveTab] = useState(0);

  if (groups.length === 0) return null;

  const currentGroup = groups[activeTab] || groups[0];
  const Icon = getTraditionIcon(currentGroup.kind);

  return (
    <section
      id="eighteen_roses_candles"
      className="template-section section-surface-sage relative overflow-x-clip"
    >
      <div className="template-container relative z-10">
        <Reveal direction="up" distance={16}>
          <div className="text-center mb-8 sm:mb-12 space-y-2">
            <span className="text-role-subheading">FOLIO // 10 &bull; THE 18 TRADITIONS</span>
            <h2 className="text-role-heading-quiet text-[var(--wedding-text)] tracking-tight">
              Eighteen Traditions
            </h2>
            <p className="text-role-lead max-w-lg mx-auto mt-2 leading-relaxed">
              Honoring the cherished family, mentors, and friends who illuminate our
              debutante&apos;s journey into adulthood.
            </p>
          </div>
        </Reveal>

        {/* Tradition Group Tabs */}
        {groups.length > 1 && (
          <Reveal direction="up" distance={12} delay={0.05}>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
              {groups.map((grp, idx) => {
                const TabIcon = getTraditionIcon(grp.kind);
                const isActive = idx === activeTab;
                return (
                  <button
                    key={grp.id || idx}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-[0.14em] uppercase transition-all cursor-pointer ${
                      isActive
                        ? "bg-[var(--wedding-primary)] text-[var(--wedding-on-primary)] shadow-soft scale-105"
                        : "estate-glass-light hover:bg-[var(--wedding-surface)] text-[var(--wedding-text)] border"
                    }`}
                  >
                    <TabIcon className="w-3.5 h-3.5" />
                    <span>{grp.title || `Tradition ${idx + 1}`}</span>
                    <span className="text-[10px] opacity-75 font-normal">
                      ({grp.entries.length})
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        )}

        {/* Tradition Entries Grid */}
        <Reveal direction="up" distance={20} delay={0.1}>
          <div className="relative overflow-visible">
            <LedgerPanel
              title={currentGroup.title || "Traditional Honors"}
              subtitle={`A sacred celebration of ${currentGroup.entries.length} special individuals`}
              indexTag={`TRADITION // ${String(activeTab + 1).padStart(2, "0")}`}
              className="bg-[var(--wedding-surface)] shadow-xs relative z-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 pt-2">
                {currentGroup.entries.map((entry, eIdx) => (
                  <div
                    key={entry.id || eIdx}
                    className="p-4 rounded-xl border border-[var(--wedding-border-subtle)] bg-[var(--wedding-surface-subtle,#fcfbf9)] hover:border-[var(--wedding-accent)]/60 transition-all hover:shadow-xs group flex flex-col justify-between"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-[11px] font-mono font-bold text-[var(--wedding-accent-strong,#8f6a2c)] uppercase">
                        #{String(eIdx + 1).padStart(2, "0")}
                      </span>
                      <Icon className="w-3.5 h-3.5 text-[var(--wedding-accent)] opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div>
                      <h4 className="font-serif font-bold text-base text-[var(--wedding-text)] group-hover:text-[var(--wedding-primary)] transition-colors">
                        {entry.name}
                      </h4>
                      {entry.message && (
                        <p className="font-serif italic text-xs text-[var(--wedding-text-muted)] mt-1.5 leading-relaxed">
                          &ldquo;{entry.message}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </LedgerPanel>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
