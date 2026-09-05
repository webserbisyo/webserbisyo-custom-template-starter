import { ImageResponse } from "next/og";
import { loadEvent } from "@/platform/load-event";
import { deriveHostIdentity } from "@/template/utils/host-identity";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const data = await loadEvent();
  const identity = deriveHostIdentity((data as any)?.hostInfo || (data as any)?.couple);
  const initial = identity.initials?.[0] || "M";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0f172a",
        border: "8px solid #dc2626",
      }}
    >
      <div
        style={{
          width: "130px",
          height: "130px",
          borderRadius: "50%",
          backgroundColor: "#dc2626",
          border: "4px solid #f59e0b",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{ color: "#ffffff", fontSize: "64px", fontWeight: 900, fontFamily: "sans-serif" }}
        >
          {initial}
        </span>
        <span style={{ color: "#f59e0b", fontSize: "14px", fontWeight: 900, letterSpacing: "2px" }}>
          HQ
        </span>
      </div>
    </div>,
    { ...size }
  );
}
