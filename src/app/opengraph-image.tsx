import { ImageResponse } from "next/og";
import { loadEvent } from "@/platform/load-event";
import { deriveHostIdentity } from "@/template/utils/host-identity";

export const runtime = "nodejs";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage() {
  const result = await loadEvent();
  const data = result.status === "available" ? result.data : null;

  const identity = deriveHostIdentity((data as any)?.hostInfo || (data as any)?.couple);

  const celebrant = identity.displayName || "Sophia Marie Reyes";

  const raw = data as Record<string, unknown> | null;
  const milestone =
    (data?.couple?.kind === "debut" ? data.couple.milestone : null) ||
    (raw?.milestoneAge as string) ||
    "18TH BIRTHDAY GRAND COTILLION";

  const eventDate =
    data?.eventDateLabel ||
    data?.ceremony?.eventDate ||
    (raw?.mainEvent as Record<string, string> | undefined)?.eventDate ||
    "Monday, December 14, 2026";

  const venueName =
    data?.venue?.venueName ||
    (raw?.mainEvent as Record<string, string> | undefined)?.venueName ||
    "The Grand Ballroom, Shangri-La at the Fort";

  const celebrantPhoto =
    data?.assets?.celebrantPhoto?.url || (raw?.celebrantPhoto as string) || null;

  const monogram = identity.monogram || "S";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: "#10050B",
        padding: 24,
        boxSizing: "border-box",
      }}
    >
      {/* Main Banner Card */}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#FAF5F5",
          backgroundImage: "radial-gradient(circle at 75% 35%, #FAF5F5 0%, #F4E0E0 100%)",
          border: "3px solid #D4AF37",
          borderRadius: 8,
          padding: "36px 48px",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {/* Inner hairline border */}
        <div
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            right: 8,
            bottom: 8,
            border: "1px solid rgba(212, 175, 55, 0.4)",
            borderRadius: 4,
            pointerEvents: "none",
          }}
        />

        {/* Left Column: Portrait Arched Frame or Living Coral Seal */}
        <div
          style={{
            width: 340,
            height: 480,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {celebrantPhoto ? (
            <div
              style={{
                width: 320,
                height: 460,
                borderRadius: "160px 160px 16px 16px",
                border: "3px solid #D4AF37",
                overflow: "hidden",
                display: "flex",
                boxShadow: "0 12px 32px rgba(16, 5, 11, 0.15)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={celebrantPhoto}
                alt={celebrant}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          ) : (
            <div
              style={{
                width: 280,
                height: 280,
                borderRadius: "50%",
                backgroundColor: "#E65C4F",
                border: "4px solid #B76E79",
                boxShadow: "0 0 0 6px #D4AF37, 0 12px 28px rgba(16, 5, 11, 0.2)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  right: 10,
                  bottom: 10,
                  borderRadius: "50%",
                  border: "1.5px dashed #D4AF37",
                }}
              />
              <span
                style={{
                  fontSize: 112,
                  fontFamily: "serif",
                  fontWeight: 700,
                  color: "#D4AF37",
                  lineHeight: 1,
                  marginTop: -10,
                }}
              >
                {monogram}
              </span>
              <span
                style={{
                  fontSize: 22,
                  fontFamily: "sans-serif",
                  fontWeight: 600,
                  color: "#FAF5F5",
                  letterSpacing: 6,
                  marginTop: 6,
                }}
              >
                {"• 18 •"}
              </span>
            </div>
          )}
        </div>

        {/* Right Column: Editorial Cotillion Typography */}
        <div
          style={{
            width: 680,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingLeft: 36,
            boxSizing: "border-box",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 12,
            }}
          >
            <div style={{ width: 28, height: 1, backgroundColor: "#D4AF37" }} />
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                fontFamily: "serif",
                color: "#B76E79",
                letterSpacing: 4,
                textTransform: "uppercase",
              }}
            >
              {"OFFICIAL COTILLION INVITATION"}
            </span>
            <div style={{ width: 28, height: 1, backgroundColor: "#D4AF37" }} />
          </div>

          {/* Headline: Celebrant Name */}
          <h1
            style={{
              fontSize: celebrant.length > 22 ? 50 : 58,
              fontWeight: 700,
              fontFamily: "serif",
              color: "#180A12",
              lineHeight: 1.12,
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
            {celebrant}
          </h1>

          {/* Milestone Badge in Living Coral */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 14,
            }}
          >
            <div
              style={{
                backgroundColor: "#E65C4F",
                color: "#FAF5F5",
                padding: "6px 18px",
                borderRadius: 9999,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
                fontFamily: "sans-serif",
              }}
            >
              {milestone}
            </div>
          </div>

          {/* Divider Rule */}
          <div
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "#D4AF37",
              marginTop: 24,
              marginBottom: 20,
            }}
          />

          {/* Event Details: Date & Ballroom Venue */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 18,
                fontFamily: "serif",
                color: "#381E27",
                fontWeight: 600,
                letterSpacing: 0.5,
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                style={{ marginRight: 10, flexShrink: 0 }}
              >
                <path d="M6 0L7.8 4.2L12 6L7.8 7.8L6 12L4.2 7.8L0 6L4.2 4.2L6 0Z" fill="#D4AF37" />
              </svg>
              <span>{eventDate}</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 17,
                fontFamily: "serif",
                color: "#683C49",
                letterSpacing: 0.5,
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                style={{ marginRight: 10, flexShrink: 0 }}
              >
                <path d="M6 0L7.8 4.2L12 6L7.8 7.8L6 12L4.2 7.8L0 6L4.2 4.2L6 0Z" fill="#D4AF37" />
              </svg>
              <span>{venueName}</span>
            </div>
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  );
}
