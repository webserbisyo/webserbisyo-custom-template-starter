import { ImageResponse } from "next/og";
import { loadEvent } from "@/platform/load-event";
import { deriveHostIdentity } from "@/template/utils/host-identity";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const data = await loadEvent();
  const identity = deriveHostIdentity((data as any)?.couple || (data as any)?.hostInfo);
  const initial = identity.initials?.[0] || "A";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f7f4ea",
        border: "8px solid #304438",
      }}
    >
      <div
        style={{
          width: "130px",
          height: "130px",
          borderRadius: "50%",
          backgroundColor: "#304438",
          border: "4px solid #c9a86a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "#ffffff", fontSize: "64px", fontWeight: 700, fontFamily: "serif" }}>
          {initial}
        </span>
        <span style={{ color: "#c9a86a", fontSize: "12px", letterSpacing: "2px" }}>ESTATE</span>
      </div>
    </div>,
    { ...size }
  );
}
