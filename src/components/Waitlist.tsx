"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent, identifyUser } from "@/lib/amplitude";

export default function Waitlist() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          trackEvent("section_viewed", { section: "waitlist" });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    setError("");
    setLoading(true);

    try {
      trackEvent("waitlist_signup", {
        email,
        source: "waitlist_section",
        timestamp: new Date().toISOString(),
      });
      identifyUser(email);
      await new Promise((r) => setTimeout(r, 800));
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="waitlist"
      ref={ref}
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(109,40,217,0.12) 0%, rgba(79,70,229,0.05) 50%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      <div
        className="relative z-10 max-w-2xl mx-auto text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        {/* Eyebrow */}
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
          Limited early access
        </div>

        <h2
          className="font-bold mb-5"
          style={{ fontSize: "clamp(36px, 6vw, 64px)", letterSpacing: "-0.04em" }}
        >
          <span className="text-white">Ready to stop</span>
          <br />
          <span className="gradient-text">overthinking?</span>
        </h2>

        <p
          className="text-lg mb-10 max-w-lg mx-auto"
          style={{ color: "var(--text-secondary)" }}
        >
          Join the waitlist. Be first to try Startify when we launch.
          No spam — just one email when it&rsquo;s ready.
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 w-full min-h-14 px-4 text-base leading-normal rounded-xl outline-none sm:min-h-0 sm:h-auto sm:py-3.5 sm:text-sm"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "white",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(139,92,246,0.5)";
                trackEvent("waitlist_email_focused");
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }}
            />
            <button
              type="submit"
              disabled={loading}
              className="glow-btn w-full min-h-14 px-6 text-base font-semibold text-white cursor-pointer rounded-xl whitespace-nowrap sm:min-h-0 sm:w-auto sm:py-3.5 sm:text-sm"
            >
              <span>{loading ? "Joining..." : "Get early access →"}</span>
            </button>
          </form>
        ) : (
          <div
            className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl mx-auto max-w-md"
            style={{
              background: "rgba(74,222,128,0.08)",
              border: "1px solid rgba(74,222,128,0.2)",
              animation: "fadeIn 0.5s ease",
            }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "rgba(74,222,128,0.15)" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8L6.5 11.5L13 5" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold" style={{ color: "#4ade80" }}>
                You&rsquo;re on the list!
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                We&rsquo;ll email you when Startify is ready.
              </p>
            </div>
          </div>
        )}

        {error && (
          <p className="mt-3 text-sm" style={{ color: "#f87171" }}>
            {error}
          </p>
        )}

        <p className="mt-4 text-xs" style={{ color: "var(--text-muted)" }}>
          No spam. No credit card. Unsubscribe anytime.
        </p>

        {/* Trust badges */}
        <div
          className="mt-12 flex flex-wrap justify-center gap-6"
          style={{ color: "var(--text-muted)" }}
        >
          {[
            { icon: "🔒", text: "Privacy first" },
            { icon: "⚡", text: "Ships soon" },
            { icon: "🆓", text: "Free to start" },
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <span>{b.icon}</span>
              <span>{b.text}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </section>
  );
}
