import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: "40px",
          background: "linear-gradient(135deg, #6366F1, #A78BFA, #84CC16)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 100,
          color: "white",
          fontWeight: 900,
        }}
      >
        ⚡
      </div>
    ),
    { width: 180, height: 180 }
  );
}
