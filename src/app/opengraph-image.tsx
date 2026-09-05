import { ImageResponse } from "next/og";
import { loadEvent } from "@/platform/load-event";
import { deriveHostIdentity } from "@/template/utils/host-identity";

export const runtime = "nodejs";
export const alt = "Birthday Mission Dispatch Preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const eventResult = await loadEvent();
  const data = (eventResult as any)?.data || eventResult;
  const identity = deriveHostIdentity((data as any)?.hostInfo || (data as any)?.couple);
  const name = identity.displayName || "Michael";
  const milestone = identity.milestoneText || "10TH BIRTHDAY SPECIAL EDITION";
  const date =
    (data as any)?.ceremony?.eventDate ||
    (data as any)?.mainEvent?.eventDate ||
    (data as any)?.eventDateLabel ||
    "Saturday Celebration";
  const venue =
    (data as any)?.venue?.venueName ||
    (data as any)?.mainEvent?.venueName ||
    "Headquarters Assembly Hall";
  const photo = (data as any)?.assets?.celebrantPhoto?.url || (data as any)?.celebrantPhoto || null;
  const initial = identity.initials?.[0] || "M";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: "#0f172a",
        backgroundImage: "radial-gradient(circle at 100% 0%, #1e293b 0%, #0f172a 75%)",
        padding: "48px",
        fontFamily: "sans-serif",
        position: "relative",
        border: "16px solid #dc2626",
        boxSizing: "border-box",
      }}
    >
      {/* Inner Gold Ink Border */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          right: "20px",
          bottom: "20px",
          border: "3px solid #f59e0b",
          display: "flex",
          pointerEvents: "none",
        }}
      />

      {/* Left Column: Portrait Specimen or Hero Star Seal */}
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
            alt={name}
            style={{
              width: "360px",
              height: "480px",
              objectFit: "cover",
              borderRadius: "16px",
              border: "5px solid #ffffff",
              boxShadow: "10px 10px 0px #000000",
            }}
          />
        ) : (
          <div
            style={{
              width: "280px",
              height: "280px",
              borderRadius: "50%",
              backgroundColor: "#dc2626",
              border: "6px solid #f59e0b",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "10px 10px 0px #000000",
            }}
          >
            <span style={{ fontSize: "100px", color: "#ffffff", fontWeight: 900, lineHeight: 1 }}>
              {initial}
            </span>
            <span
              style={{
                fontSize: "20px",
                color: "#f59e0b",
                fontWeight: 900,
                letterSpacing: "4px",
                marginTop: "8px",
              }}
            >
              HERO HQ
            </span>
          </div>
        )}
      </div>

      {/* Right Column: Comic Action Headline */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "40px",
        }}
      >
        {/* Eyebrow Badge */}
        <div
          style={{
            backgroundColor: "#f59e0b",
            color: "#0f172a",
            padding: "6px 16px",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: 900,
            letterSpacing: "3px",
            textTransform: "uppercase",
            alignSelf: "flex-start",
            marginBottom: "16px",
            border: "2px solid #000000",
            display: "flex",
            alignItems: "center",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="#0f172a"
            style={{ marginRight: 8, flexShrink: 0 }}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span>TOP SECRET MISSION DISPATCH</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="#0f172a"
            style={{ marginLeft: 8, flexShrink: 0 }}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>

        <h1
          style={{
            fontSize: name.length > 15 ? "50px" : "64px",
            color: "#ffffff",
            lineHeight: 1.05,
            margin: "0 0 12px 0",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          {name}
        </h1>

        <span
          style={{
            fontSize: "24px",
            letterSpacing: "3px",
            color: "#f59e0b",
            textTransform: "uppercase",
            marginBottom: "28px",
            fontWeight: 900,
          }}
        >
          {milestone}
        </span>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            backgroundColor: "rgba(30, 41, 59, 0.8)",
            padding: "16px 20px",
            borderRadius: "12px",
            border: "2px solid rgba(245, 158, 11, 0.4)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "18px",
              color: "#f8fafc",
              fontWeight: 700,
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: 10, flexShrink: 0 }}
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{date}</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "16px",
              color: "#cbd5e1",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: 10, flexShrink: 0 }}
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{venue}</span>
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  );
}
