"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/amplitude";

const steps = [
  {
    number: "01",
    title: "Tell it your goal",
    desc: "Type whatever is blocking you. No structure needed. Just say what you want to do — or can't get yourself to start.",
    detail: '"I need to implement login but I keep avoiding it"',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    number: "02",
    title: "Get the ONE next step",
    desc: "No plan. No breakdown. Startify gives you exactly one action — the smallest physically possible thing to do right now.",
    detail: "Step 1: Open your laptop",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Do it. Repeat.",
    desc: "Click Done, get the next step. Click Stuck, it simplifies even further. The loop continues until you have momentum.",
    detail: "Step 2 → Step 3 → Step 4 → You've started.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 1l4 4-4 4"/>
        <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
        <path d="M7 23l-4-4 4-4"/>
        <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          trackEvent("section_viewed", { section: "how_it_works" });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="py-24 px-6"
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div
          className="text-center max-w-2xl mx-auto mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div
            className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{
              color: "#8b5cf6",
              background: "rgba(139,92,246,0.08)",
              border: "1px solid rgba(139,92,246,0.15)",
            }}
          >
            How it works
          </div>
          <h2
            className="font-bold text-white mb-4"
            style={{ fontSize: "clamp(32px, 5vw, 52px)", letterSpacing: "-0.03em" }}
          >
            Three steps to unstuck
          </h2>
          <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
            No setup. No onboarding. No configuration. Just type your goal and
            Startify handles the rest.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid md:grid-cols-3 gap-8">
          {/* Connector line */}
          <div
            className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)" }}
          />

          {steps.map((s, i) => (
            <div
              key={i}
              className="relative"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.6s ease ${0.1 + i * 0.15}s, transform 0.6s ease ${0.1 + i * 0.15}s`,
              }}
            >
              {/* Number + icon */}
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(79,70,229,0.2))",
                    border: "1px solid rgba(139,92,246,0.25)",
                    color: "#a78bfa",
                  }}
                >
                  {s.icon}
                </div>
                <span
                  className="font-bold text-2xl"
                  style={{ color: "rgba(139,92,246,0.3)", fontVariantNumeric: "tabular-nums" }}
                >
                  {s.number}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "var(--text-secondary)" }}
              >
                {s.desc}
              </p>

              {/* Example pill */}
              <div
                className="inline-block px-3 py-1.5 rounded-lg text-xs font-mono"
                style={{
                  background: "rgba(139,92,246,0.08)",
                  border: "1px solid rgba(139,92,246,0.15)",
                  color: "#a78bfa",
                }}
              >
                {s.detail}
              </div>
            </div>
          ))}
        </div>

        {/* Key principle callout */}
        <div
          className="mt-16 rounded-2xl p-8 text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(79,70,229,0.05) 100%)",
            border: "1px solid rgba(139,92,246,0.15)",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.55s",
          }}
        >
          <p
            className="text-xl font-semibold text-white mb-2"
            style={{ letterSpacing: "-0.02em" }}
          >
            You never see more than ONE step at a time.
          </p>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            No lists. No plans. No overwhelm. Just the single next action — eliminating
            decision fatigue completely.
          </p>
        </div>
      </div>
    </section>
  );
}
