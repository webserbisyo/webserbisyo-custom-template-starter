import { ImageResponse } from "next/og";
import { loadEvent } from "@/platform/load-event";
import { deriveHostIdentity } from "@/template/utils/host-identity";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default async function AppleIcon() {
  const result = await loadEvent();
  const data = result.status === "available" ? result.data : null;
  const identity = deriveHostIdentity((data as any)?.hostInfo || (data as any)?.couple);
  const monogram = identity.monogram || "S";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FAF5F5",
        padding: 12,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          backgroundColor: "#E65C4F",
          border: "3px solid #B76E79",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 0 4px #D4AF37, 0 0 0 6px #FAF5F5",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            right: 8,
            bottom: 8,
            borderRadius: "50%",
            border: "1px dashed #D4AF37",
          }}
        />
        <span
          style={{
            fontSize: 64,
            fontFamily: "serif",
            fontWeight: 700,
            color: "#D4AF37",
            lineHeight: 1,
            marginTop: -6,
          }}
        >
          {monogram}
        </span>
        <span
          style={{
            fontSize: 16,
            fontFamily: "sans-serif",
            fontWeight: 600,
            color: "#FAF5F5",
            letterSpacing: 4,
            marginTop: 2,
          }}
        >
          {"18"}
        </span>
      </div>
    </div>,
    {
      ...size,
    }
  );
}
