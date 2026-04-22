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
          background: "linear-gradient(135deg, #ff006e, #8338ec, #fb5607)",
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
