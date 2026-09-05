import { ImageResponse } from "next/og";
import { loadEvent } from "@/platform/load-event";
import { deriveHostIdentity } from "@/template/utils/host-identity";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const data = await loadEvent();
  const payload = (data as any)?.data || data;
  const identity = deriveHostIdentity(
    (payload as any)?.hostInfo || (payload as any)?.couple || (data as any)?.couple
  );
  const initial = identity.initials?.[0] || "S";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E65C4F",
        borderRadius: "50%",
        border: "2px solid rgba(255, 255, 255, 0.5)",
      }}
    >
      <span
        style={{
          color: "#FFFFFF",
          fontSize: "22px",
          fontWeight: 900,
          fontFamily: "serif",
          lineHeight: 1,
        }}
      >
        {initial}
      </span>
    </div>,
    { ...size }
  );
}
