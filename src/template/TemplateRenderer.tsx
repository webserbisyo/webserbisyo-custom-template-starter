"use client";

import type { EventTemplateData } from "@/platform/event-template-data";
import { templateSectionRegistry } from "./section-registry";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { FloatingControls } from "./components/FloatingControls";
import { AudioProvider } from "./components/AudioPlayer";
import { SparkleBokehEmitter } from "./components/decorations/SparkleBokehEmitter";
import { buildEventNavigation } from "./navigation/event-navigation";

export type TemplateRendererProps = {
  data: EventTemplateData;
  apiBaseUrl?: string;
  accessToken?: string | null;
  isDemoMode?: boolean;
};

export function TemplateRenderer({
  data,
  apiBaseUrl,
  accessToken,
  isDemoMode,
}: TemplateRendererProps) {
  const navModel = buildEventNavigation(data);

  return (
    <AudioProvider
      initialMusicLink={data.music?.musicLink}
      initialMusicTitle={data.music?.musicTitle}
      initialShortNote={data.music?.shortNote}
    >
      <div className="min-h-screen flex flex-col bg-[var(--debut-bg-alabaster,#FAF5F5)] text-[var(--debut-text-noir,#26131C)] font-sans antialiased selection:bg-[var(--debut-bg-coral-subtle,#FFF0EE)] selection:text-[var(--debut-bg-coral,#E65C4F)] relative">
        {/* Ambient Drifting Bokeh Particles */}
        <SparkleBokehEmitter />

        <Navbar data={data} />

        <main className="flex-1 pt-16 sm:pt-18 relative z-10">
          {data.orderedSectionKeys
            .filter((key) => key !== "contact_socials")
            .map((key) => {
              const renderSection = templateSectionRegistry[key];
              if (!renderSection) return null;

              return (
                <div key={key}>
                  {renderSection({
                    data,
                    apiBaseUrl,
                    accessToken,
                    isDemoMode,
                  })}
                </div>
              );
            })}
        </main>

        <Footer data={data} />

        {/* Unified Floating Controls Cluster */}
        <FloatingControls items={navModel.dockItems} />
      </div>
    </AudioProvider>
  );
}
