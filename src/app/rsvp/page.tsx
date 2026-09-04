import { loadEvent } from "@/platform/load-event";
import { RSVPSection } from "@/template/sections/RSVP";
import { Navbar } from "@/template/components/Navbar";
import { Footer } from "@/template/components/Footer";
import { SparkleBokehEmitter } from "@/template/components/decorations/SparkleBokehEmitter";

export type RsvpPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function RsvpPage({ searchParams }: RsvpPageProps) {
  const query = await searchParams;
  const result = await loadEvent(query);

  if (result.status === "available") {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--debut-bg-alabaster,#FAF5F5)] text-[var(--debut-text-noir,#26131C)] font-sans antialiased relative">
        <SparkleBokehEmitter />
        <Navbar data={result.data} />
        <main className="flex-1 py-12 pt-24 relative z-10 bg-pattern-debut-03">
          <RSVPSection
            data={result.data.rsvp}
            apiBaseUrl={result.env.apiBaseUrl}
            accessToken={query.access ? String(query.access) : null}
            isDemoMode={result.env.designMode}
          />
        </main>
        <Footer data={result.data} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--debut-bg-alabaster,#FAF5F5)] p-6 text-center text-[var(--debut-text-noir,#26131C)]">
      <div className="max-w-md w-full debut-glass-card p-8 rounded-3xl border border-[var(--debut-rose-gold-border,#E8C4C8)] shadow-card">
        <p className="text-sm font-medium">{result.message}</p>
      </div>
    </div>
  );
}
