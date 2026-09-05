import { ImageResponse } from "next/og";
import { loadEvent } from "@/platform/load-event";
import { deriveHostIdentity } from "@/template/utils/host-identity";

export const runtime = "nodejs";
export const alt = "Wedding Celebration Preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const eventResult = await loadEvent();
  const data = (eventResult as any)?.data || eventResult;
  const identity = deriveHostIdentity((data as any)?.couple || (data as any)?.hostInfo);
  const couple = identity.displayName || "Alex & Jamie";
  const date =
    (data as any)?.ceremony?.eventDate ||
    (data as any)?.mainEvent?.eventDate ||
    (data as any)?.eventDateLabel ||
    "Saturday, October 24, 2026";
  const venue =
    (data as any)?.venue?.venueName ||
    (data as any)?.mainEvent?.venueName ||
    "The Glasshouse Conservatory, Sage Estate";
  const photo =
    (data as any)?.couplePhoto ||
    (data as any)?.celebrantPhoto ||
    (data as any)?.assets?.couplePhoto?.url ||
    null;
  const initial = identity.initials?.[0] || "A";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: "#f7f4ea",
        backgroundImage: "radial-gradient(circle at 100% 0%, #ebe6d5 0%, #f7f4ea 70%)",
        padding: "48px",
        fontFamily: "serif",
        position: "relative",
        border: "16px solid #304438",
        boxSizing: "border-box",
      }}
    >
      {/* Inner Antique Brass Border */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          right: "20px",
          bottom: "20px",
          border: "2px solid #c9a86a",
          display: "flex",
          pointerEvents: "none",
        }}
      />

      {/* Left Column: Portrait Arch or Monogram Seal */}
      <div
        style={{
          width: "420px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {photo ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={photo}
            alt={couple}
            style={{
              width: "360px",
              height: "480px",
              objectFit: "cover",
              borderRadius: "180px 180px 16px 16px",
              border: "4px solid #c9a86a",
            }}
          />
        ) : (
          <div
            style={{
              width: "280px",
              height: "280px",
              borderRadius: "50%",
              backgroundColor: "#304438",
              border: "6px solid #c9a86a",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "96px", color: "#c9a86a", fontWeight: "bold", lineHeight: 1 }}>
              {initial}
            </span>
            <span
              style={{
                fontSize: "16px",
                color: "#ffffff",
                letterSpacing: "4px",
                marginTop: "8px",
              }}
            >
              WEDDING
            </span>
          </div>
        )}
      </div>

      {/* Right Column: Editorial Wedding Heading */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "40px",
        }}
      >
        <span
          style={{
            fontSize: "14px",
            letterSpacing: "6px",
            color: "#657a57",
            textTransform: "uppercase",
            marginBottom: "16px",
            fontWeight: 600,
          }}
        >
          The Wedding Celebration Of
        </span>

        <h1
          style={{
            fontSize: "56px",
            color: "#1e2a22",
            lineHeight: 1.1,
            margin: "0 0 16px 0",
            fontWeight: "normal",
          }}
        >
          {couple}
        </h1>

        <span
          style={{
            fontSize: "18px",
            letterSpacing: "4px",
            color: "#8f6a2c",
            textTransform: "uppercase",
            marginBottom: "32px",
            fontWeight: 600,
          }}
        >
          Sage Estate • Autumn Nuptials
        </span>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            borderTop: "1px solid rgba(201, 168, 106, 0.4)",
            paddingTop: "20px",
          }}
        >
          <span style={{ fontSize: "18px", color: "#304438" }}>{date}</span>
          <span style={{ fontSize: "16px", color: "#657a57" }}>{venue}</span>
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  );
}
