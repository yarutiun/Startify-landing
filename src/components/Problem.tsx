"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/amplitude";

const problems = [
  {
    emoji: "🔁",
    title: "You open 12 tabs.",
    subtitle: "Then close all 12.",
    body: "You research the task, read about approaches, watch a video, check Reddit — and still haven't done anything.",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.06)",
    border: "rgba(245,158,11,0.15)",
  },
  {
    emoji: "📋",
    title: "You write the perfect plan.",
    subtitle: "Then ignore it.",
    body: "The plan is beautiful. Color-coded. Prioritized. You're proud of it. Then you do nothing from it for a week.",
    color: "#ec4899",
    bg: "rgba(236,72,153,0.06)",
    border: "rgba(236,72,153,0.15)",
  },
  {
    emoji: "⏳",
    title: "\"Tomorrow I'll actually start.\"",
    subtitle: "You've said this 47 times.",
    body: "The task never gets smaller by waiting. It just gets heavier. The longer you avoid it, the harder starting feels.",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.06)",
    border: "rgba(139,92,246,0.15)",
  },
];

export default function Problem() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          trackEvent("section_viewed", { section: "problem" });
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
      ref={ref}
      className="py-24 px-6"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div
          className="max-w-2xl mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div
            className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{
              color: "#f59e0b",
              background: "rgba(245,158,11,0.08)",
              border: "1px solid rgba(245,158,11,0.15)",
            }}
          >
            Sound familiar?
          </div>
          <h2
            className="font-bold mb-4"
            style={{ fontSize: "clamp(32px, 5vw, 52px)", letterSpacing: "-0.03em" }}
          >
            You know exactly what to do.
            <br />
            <span style={{ color: "var(--text-secondary)" }}>
              You just can&rsquo;t start.
            </span>
          </h2>
          <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
            It&rsquo;s not laziness. It&rsquo;s not lack of discipline. Your brain is just stuck
            in planning mode — and no productivity app fixes that.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {problems.map((p, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 transition-all duration-300"
              style={{
                background: p.bg,
                border: `1px solid ${p.border}`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.6s ease ${0.1 + i * 0.12}s, transform 0.6s ease ${0.1 + i * 0.12}s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div className="text-3xl mb-4">{p.emoji}</div>
              <h3
                className="text-lg font-bold text-white mb-1"
              >
                {p.title}
              </h3>
              <p
                className="text-sm font-semibold mb-3"
                style={{ color: p.color }}
              >
                {p.subtitle}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>

        {/* Bridge */}
        <div
          className="mt-16 text-center"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.5s",
          }}
        >
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "#8b5cf6", animation: "pulse 2s infinite" }}
            />
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              The problem isn&rsquo;t knowledge.{" "}
              <span className="text-white font-medium">
                It&rsquo;s the moment of starting.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
