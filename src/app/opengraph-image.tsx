import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Startify — Beat task paralysis. One step at a time.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#05050a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "800px",
            height: "500px",
            background:
              "radial-gradient(ellipse at center, rgba(99,102,241,0.22) 0%, rgba(167,139,250,0.12) 50%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #6366F1, #4f46e5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1L13 7L7 13M1 7H13"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            style={{
              fontSize: "22px",
              fontWeight: 600,
              color: "white",
              letterSpacing: "-0.5px",
            }}
          >
            Startify
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 800,
            color: "white",
            letterSpacing: "-3px",
            lineHeight: 1,
            textAlign: "center",
            marginBottom: "16px",
          }}
        >
          Beat task paralysis.
        </div>
        <div
          style={{
            fontSize: "72px",
            fontWeight: 800,
            letterSpacing: "-3px",
            lineHeight: 1,
            textAlign: "center",
            marginBottom: "32px",
            background: "linear-gradient(135deg, #6366F1, #A78BFA, #84CC16)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          One step at a time.
        </div>

        {/* Subtext */}
        <div
          style={{
            fontSize: "22px",
            color: "rgba(255,255,255,0.5)",
            textAlign: "center",
            maxWidth: "700px",
            lineHeight: 1.5,
          }}
        >
          ADHD-aware support for procrastination and overwhelm—one tiny action
          you can do with your body, right now.
        </div>

        {/* Step card preview */}
        <div
          style={{
            marginTop: "48px",
            padding: "20px 28px",
            borderRadius: "16px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(167,139,250,0.28)",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div
            style={{ fontSize: "12px", color: "#6366F1", fontWeight: 600 }}
          >
            Step 1
          </div>
          <div style={{ fontSize: "18px", color: "white", fontWeight: 600 }}>
            Stand up and walk to the space
          </div>
          <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
            <div
              style={{
                padding: "6px 16px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #6366F1, #4f46e5)",
                color: "white",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              ✓ Done
            </div>
            <div
              style={{
                padding: "6px 16px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.5)",
                fontSize: "12px",
              }}
            >
              I&apos;m stuck
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
