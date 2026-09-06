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

  const celebrant = identity.displayName || "Liam Santos";

  const raw = data as Record<string, unknown> | null;
  const milestone =
    (data?.couple?.kind === "baptism" ? "THE HOLY BAPTISM" : null) ||
    (raw?.milestoneAge as string) ||
    "THE HOLY BAPTISM";

  const eventDate =
    data?.eventDateLabel ||
    data?.ceremony?.eventDate ||
    (raw?.mainEvent as Record<string, string> | undefined)?.eventDate ||
    "Monday, December 14, 2026";

  const venueName =
    data?.venue?.venueName ||
    (raw?.mainEvent as Record<string, string> | undefined)?.venueName ||
    "San Agustin Church, Intramuros";

  const celebrantPhoto =
    data?.assets?.celebrantPhoto?.url || (raw?.celebrantPhoto as string) || null;

  const monogram = identity.monogram || "L";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: "#0B1329",
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
          backgroundColor: "#F8FAFC",
          backgroundImage: "radial-gradient(circle at 75% 35%, #F8FAFC 0%, #E0F2FE 100%)",
          border: "3px solid #D97706",
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
            border: "1px solid rgba(217, 119, 6, 0.4)",
            borderRadius: 4,
            pointerEvents: "none",
          }}
        />

        {/* Left Column: Portrait Arched Frame or Celestial Seal */}
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
                border: "3px solid #D97706",
                overflow: "hidden",
                display: "flex",
                boxShadow: "0 12px 32px rgba(11, 19, 41, 0.15)",
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
                backgroundColor: "#0284C7",
                border: "4px solid #BAE6FD",
                boxShadow: "0 0 0 6px #D97706, 0 12px 28px rgba(11, 19, 41, 0.2)",
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
                  border: "1.5px dashed #D97706",
                }}
              />
              <span
                style={{
                  fontSize: 112,
                  fontFamily: "serif",
                  fontWeight: 700,
                  color: "#FEF3C7",
                  lineHeight: 1,
                  marginTop: -10,
                }}
              >
                {monogram}
              </span>
              <span
                style={{
                  fontSize: 18,
                  fontFamily: "sans-serif",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  letterSpacing: 4,
                  marginTop: 6,
                }}
              >
                {"• CHRISTENING •"}
              </span>
            </div>
          )}
        </div>

        {/* Right Column: Editorial Christening Typography */}
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
            <div style={{ width: 28, height: 1, backgroundColor: "#D97706" }} />
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                fontFamily: "serif",
                color: "#0284C7",
                letterSpacing: 4,
                textTransform: "uppercase",
              }}
            >
              {"OFFICIAL CHRISTENING INVITATION"}
            </span>
            <div style={{ width: 28, height: 1, backgroundColor: "#D97706" }} />
          </div>

          {/* Headline: Celebrant Name */}
          <h1
            style={{
              fontSize: celebrant.length > 22 ? 50 : 58,
              fontWeight: 700,
              fontFamily: "serif",
              color: "#0F172A",
              lineHeight: 1.12,
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
            {celebrant}
          </h1>

          {/* Milestone Badge in Sky Blue */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 14,
            }}
          >
            <div
              style={{
                backgroundColor: "#0284C7",
                color: "#FFFFFF",
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
              backgroundColor: "#D97706",
              marginTop: 24,
              marginBottom: 20,
            }}
          />

          {/* Event Details: Date & Sanctuary Venue */}
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
                color: "#0F172A",
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
                <path d="M6 0L7.8 4.2L12 6L7.8 7.8L6 12L4.2 7.8L0 6L4.2 4.2L6 0Z" fill="#D97706" />
              </svg>
              <span>{eventDate}</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 17,
                fontFamily: "serif",
                color: "#475569",
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
                <path d="M6 0L7.8 4.2L12 6L7.8 7.8L6 12L4.2 7.8L0 6L4.2 4.2L6 0Z" fill="#D97706" />
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
