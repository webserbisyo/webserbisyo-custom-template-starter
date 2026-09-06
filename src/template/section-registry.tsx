import React from "react";
import type { EventTemplateData } from "@/platform/event-template-data";
import { HeroHostSection } from "./sections/HeroHost";
import { CountdownSection } from "./sections/Countdown";
import { MusicSection } from "./sections/Music";
import { GallerySection } from "./sections/Gallery";
import { MainEventSection } from "./sections/MainEvent";
import { VenueSection } from "./sections/Venue";
import { SecondaryEventSection } from "./sections/SecondaryEvent";
import { TimelineSection } from "./sections/Timeline";
import { GodparentsSection } from "./sections/Godparents";
import { AttireSection } from "./sections/Attire";
import { ExtraInfoSection } from "./sections/ExtraInfo";
import { RSVPSection } from "./sections/RSVP";
import { GiftsSection } from "./sections/Gifts";
import { GuestbookSection } from "./sections/Guestbook";
import { StoryMessageSection } from "./sections/StoryMessage";
import { ContactSection } from "./sections/Contact";

export type SectionRendererProps = {
  data: EventTemplateData;
  apiBaseUrl?: string;
  accessToken?: string | null;
  isDemoMode?: boolean;
};

export const templateSectionRegistry: Record<
  string,
  (props: SectionRendererProps) => React.ReactNode
> = {
  host_info: ({ data }) => (
    <HeroHostSection
      data={data.couple}
      eventDate={data.ceremony?.eventDate || data.eventDate}
      storyEnabled={data.enabledSectionKeys?.includes("story_message")}
    />
  ),
  countdown: ({ data }) => (
    <CountdownSection
      data={data.countdown}
      eventDate={data.ceremony?.eventDate || data.eventDate || undefined}
      eventTime={data.ceremony?.eventTime || undefined}
    />
  ),
  music_effects: ({ data }) => <MusicSection data={data.music} />,
  gallery: ({ data }) => <GallerySection data={data.gallery} />,
  story_message: ({ data }) => <StoryMessageSection data={data.story} />,
  main_event: ({ data }) => <MainEventSection data={data.ceremony} />,
  venue: ({ data }) => <VenueSection data={data.venue} />,
  secondary_event: ({ data }) => (
    <SecondaryEventSection
      data={data.reception}
      eventDate={data.ceremony?.eventDate || data.eventDate}
    />
  ),
  timeline_program: ({ data }) => <TimelineSection data={data.timeline} />,
  godparents: ({ data }) => <GodparentsSection data={data.godparents} />,
  attire_motif: ({ data }) => <AttireSection data={data.attire} />,
  extra_info: ({ data }) => <ExtraInfoSection data={data.extraInfo} />,
  rsvp_form: ({ data, apiBaseUrl, accessToken, isDemoMode }) => (
    <RSVPSection
      data={data.rsvp}
      eventSlug={data.eventSlug}
      deadlineLabel={data.rsvpDeadlineLabel || data.ceremony?.rsvpDeadline}
      debutantName={
        data.couple?.kind === "baptism"
          ? data.couple.childName || data.couple.displayAs
          : data.coupleDisplayName
      }
      childName={
        data.couple?.kind === "baptism"
          ? data.couple.childName || data.couple.displayAs
          : data.coupleDisplayName
      }
      apiBaseUrl={apiBaseUrl}
      accessToken={accessToken}
      isDemoMode={isDemoMode}
    />
  ),
  gift_details: ({ data }) => <GiftsSection data={data.gifts} />,
  guestbook: ({ data }) => <GuestbookSection data={data.guestbook} />,
  contact_socials: ({ data }) => <ContactSection data={data.contact} />,
};
