import { ImageResponse } from "next/og";
import { loadEvent } from "@/platform/load-event";
import { deriveHostIdentity } from "@/template/utils/host-identity";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const data = await loadEvent();
  const identity = deriveHostIdentity((data as any)?.hostInfo || (data as any)?.couple);
  const initial = identity.initials?.[0] || "M";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#dc2626",
        borderRadius: "50%",
        border: "2px solid rgba(255, 255, 255, 0.6)",
      }}
    >
      <span
        style={{
          color: "#ffffff",
          fontSize: "20px",
          fontWeight: 900,
          fontFamily: "sans-serif",
          lineHeight: 1,
        }}
      >
        {initial}
      </span>
    </div>,
    { ...size }
  );
}
