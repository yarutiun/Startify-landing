"use client";

import { useState, useEffect } from "react";
import { trackEvent, identifyUser } from "@/lib/amplitude";

const ROTATING_GOALS = [
  "implement authentication",
  "finish my design",
  "clean my room",
  "write that email",
  "start my assignment",
  "build the feature",
];

export default function Hero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [goalIndex, setGoalIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGoalIndex((i) => (i + 1) % ROTATING_GOALS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    trackEvent("hero_waitlist_submitted", { email });
    identifyUser(email);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden noise-bg"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Background blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "600px",
          background:
            "radial-gradient(ellipse at center, rgba(109,40,217,0.18) 0%, rgba(79,70,229,0.08) 45%, transparent 70%)",
          filter: "blur(1px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-10%",
          right: "-10%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(ellipse at center, rgba(34,211,238,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />

      <div
        className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-20 text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8"
          style={{
            background: "rgba(139,92,246,0.1)",
            border: "1px solid rgba(139,92,246,0.25)",
            color: "#a78bfa",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#a78bfa", animation: "pulse 2s infinite" }}
          />
          Early access · Join the waitlist
        </div>

        {/* Headline */}
        <h1 className="font-bold leading-none mb-6" style={{ letterSpacing: "-0.04em" }}>
          <span
            className="block text-white"
            style={{ fontSize: "clamp(48px, 8vw, 96px)" }}
          >
            Stop overthinking.
          </span>
          <span
            className="block gradient-text"
            style={{ fontSize: "clamp(48px, 8vw, 96px)" }}
          >
            Start moving.
          </span>
        </h1>

        {/* Sub */}
        <p
          className="max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-12"
          style={{
            color: "var(--text-secondary)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}
        >
          Startify breaks any goal into{" "}
          <span className="text-white font-medium">one single action</span>. Not a plan.
          Not a list. Just the next step — right now.
        </p>

        {/* Animated goal preview */}
        <div
          className="inline-flex items-center gap-3 px-5 py-3 rounded-xl mb-10"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
          }}
        >
          <span style={{ color: "var(--text-muted)", fontSize: "13px" }}>
            &ldquo;I need to{" "}
          </span>
          <span
            key={goalIndex}
            className="font-medium text-white"
            style={{
              fontSize: "13px",
              animation: "fadeIn 0.5s ease",
            }}
          >
            {ROTATING_GOALS[goalIndex]}
          </span>
          <span style={{ color: "var(--text-muted)", fontSize: "13px" }}>
            but I can&rsquo;t start&rdquo;
          </span>
        </div>

        {/* Email form */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s",
            }}
          >
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "white",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(139,92,246,0.5)";
                e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                trackEvent("hero_email_focused");
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }}
            />
            <button
              type="submit"
              disabled={loading}
              className="glow-btn px-6 py-3 rounded-xl text-sm font-semibold text-white cursor-pointer"
            >
              <span>
                {loading ? "Joining..." : "Get early access →"}
              </span>
            </button>
          </form>
        ) : (
          <div
            className="flex items-center justify-center gap-3 py-3"
            style={{ color: "#4ade80" }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 10L8.5 13.5L15 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-medium">You&rsquo;re on the list! We&rsquo;ll be in touch soon.</span>
          </div>
        )}

        <p
          className="mt-4 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          No spam. Unsubscribe anytime.
        </p>

        {/* Floating demo card */}
        <div
          className="mt-20 flex justify-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s",
          }}
        >
          <HeroStepCard />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "var(--text-muted)" }}
      >
        <span className="text-xs">Scroll to explore</span>
        <div
          className="w-5 h-8 rounded-full flex items-start justify-center pt-2"
          style={{ border: "1.5px solid rgba(255,255,255,0.15)" }}
        >
          <div
            className="w-1 h-2 rounded-full"
            style={{
              background: "rgba(139,92,246,0.7)",
              animation: "scrollDot 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
        @keyframes scrollDot { 0%,100% { transform: translateY(0); opacity: 1; } 50% { transform: translateY(8px); opacity: 0.3; } }
      `}</style>
    </section>
  );
}

function HeroStepCard() {
  const [step, setStep] = useState(0);
  const [stuckCount, setStuckCount] = useState(0);

  const steps = [
    { text: "Open your laptop" },
    { text: "Open your code editor" },
    { text: "Create a new file called auth.js" },
    { text: "Type the first function name" },
  ];

  const handleDone = () => {
    trackEvent("hero_demo_step_done", { step });
    if (step < steps.length - 1) setStep((s) => s + 1);
  };

  const handleStuck = () => {
    trackEvent("hero_demo_step_stuck", { step });
    setStuckCount((c) => c + 1);
  };

  const isComplete = step === steps.length - 1 && stuckCount === 0;

  return (
    <div
      className="relative step-card w-full max-w-sm text-left"
      style={{
        perspective: "1000px",
      }}
    >
      {/* Glow ring */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none cta-glow"
        style={{ borderRadius: "16px" }}
      />

      <div
        className="relative rounded-2xl p-6"
        style={{
          background: "var(--bg-card)",
          border: "1px solid rgba(139,92,246,0.25)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-2 mb-5 pb-4"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
          >
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L13 7L7 13M1 7H13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
            Startify
          </span>
          <div className="ml-auto flex gap-1">
            {steps.map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{
                  background: i <= step ? "#8b5cf6" : "rgba(255,255,255,0.1)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Goal */}
        <div
          className="text-xs mb-4 px-3 py-2 rounded-lg"
          style={{
            background: "rgba(255,255,255,0.03)",
            color: "var(--text-muted)",
            fontStyle: "italic",
          }}
        >
          &ldquo;I need to implement authentication but I feel overwhelmed&rdquo;
        </div>

        {/* Step */}
        <div key={step} style={{ animation: "fadeIn 0.3s ease" }}>
          <div
            className="text-xs font-medium mb-2"
            style={{ color: "#8b5cf6" }}
          >
            Step {step + 1}
          </div>
          <p className="text-base font-semibold text-white mb-5">
            {steps[step].text}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleDone}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              color: "white",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.9";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            ✓ Done
          </button>
          <button
            onClick={handleStuck}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "var(--text-secondary)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            I&rsquo;m stuck
          </button>
        </div>

        {stuckCount > 0 && (
          <div
            className="mt-3 px-3 py-2 rounded-lg text-xs"
            style={{
              background: "rgba(251,191,36,0.08)",
              border: "1px solid rgba(251,191,36,0.15)",
              color: "#fbbf24",
              animation: "fadeIn 0.3s ease",
            }}
          >
            That&rsquo;s okay — just move your hand toward the laptop lid.
          </div>
        )}

        {isComplete && (
          <div
            className="mt-3 px-3 py-2 rounded-lg text-xs font-medium"
            style={{
              background: "rgba(74,222,128,0.08)",
              border: "1px solid rgba(74,222,128,0.15)",
              color: "#4ade80",
              animation: "fadeIn 0.3s ease",
            }}
          >
            🔥 You&rsquo;ve done 4 steps! That&rsquo;s momentum.
          </div>
        )}
      </div>
    </div>
  );
}
