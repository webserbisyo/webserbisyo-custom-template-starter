import { ImageResponse } from "next/og";
import { loadEvent } from "@/platform/load-event";
import { deriveHostIdentity, extractInitial } from "@/template/utils/host-identity";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default async function Icon() {
  const result = await loadEvent();
  const data = result.status === "available" ? result.data : null;
  const identity = deriveHostIdentity((data as any)?.hostInfo || (data as any)?.couple);
  const initial = identity.monogram?.charAt(0) || extractInitial(identity.displayName) || "S";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        backgroundColor: "#E65C4F",
        border: "1.5px solid #B76E79",
        boxSizing: "border-box",
      }}
    >
      <span
        style={{
          fontSize: 20,
          fontFamily: "serif",
          fontWeight: 700,
          color: "#D4AF37",
          lineHeight: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {initial}
      </span>
    </div>,
    {
      ...size,
    }
  );
}
