"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/amplitude";

const ACHIEVEMENTS_SHOWCASE = [
  { emoji: "🚀", name: "First Move",      desc: "Broke the paralysis barrier",        xp: 25,  locked: false },
  { emoji: "🔥", name: "On a Roll",       desc: "3 consecutive steps",                xp: 50,  locked: false },
  { emoji: "💪", name: "Overcomer",       desc: "Stuck and kept going anyway",        xp: 35,  locked: false },
  { emoji: "⚡", name: "Speed Run",       desc: "Step done under 60 seconds",        xp: 40,  locked: true  },
  { emoji: "🌊", name: "Unstoppable",     desc: "5 steps — zero stuck moments",       xp: 75,  locked: true  },
  { emoji: "📅", name: "Week Streak",     desc: "7 days of execution in a row",       xp: 120, locked: true  },
  { emoji: "🎯", name: "Deep Focus",      desc: "10 steps in a single session",       xp: 90,  locked: true  },
  { emoji: "💯", name: "100 Steps",       desc: "100 total steps completed",          xp: 200, locked: true  },
  { emoji: "🦉", name: "Night Owl",       desc: "Execute a task after 10pm",          xp: 45,  locked: true  },
  { emoji: "🌅", name: "Early Bird",      desc: "Start before 8am",                   xp: 45,  locked: true  },
  { emoji: "🔄", name: "Comeback Kid",   desc: "Return after 3 days away",           xp: 60,  locked: true  },
  { emoji: "🤖", name: "Machine Mode",   desc: "20 steps in one session",            xp: 150, locked: true  },
];

const STREAK_WEEK = [
  { day: "Mon", filled: true  },
  { day: "Tue", filled: true  },
  { day: "Wed", filled: true  },
  { day: "Thu", filled: false },
  { day: "Fri", filled: false },
  { day: "Sat", filled: false },
  { day: "Sun", filled: false },
];

const LOOP_STEPS = [
  { icon: "💭", label: "You have a goal",       color: "#94a3b8" },
  { icon: "⚡", label: "One micro-action",       color: "#A78BFA" },
  { icon: "✓",  label: "Done → +XP",            color: "#84CC16" },
  { icon: "🔥", label: "Streak grows",           color: "#fbbf24" },
  { icon: "🏆", label: "Achievement unlocks",   color: "#A78BFA" },
  { icon: "🔁", label: "You crave one more",     color: "#f472b6" },
];

export default function Gamification() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          trackEvent("section_viewed", { section: "gamification" });
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: "var(--bg-primary)", borderTop: "1px solid var(--border)" }}
    >
      {/* Background glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "30%", left: "60%", transform: "translate(-50%,-50%)",
          width: "700px", height: "500px",
          background: "radial-gradient(ellipse, rgba(251,191,36,0.06) 0%, rgba(249,115,22,0.04) 40%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div
          className="max-w-2xl mb-16"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "opacity .6s ease, transform .6s ease" }}
        >
          <div
            className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{ color: "#A78BFA", background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.22)" }}
          >
            Rewards that respect ADHD wiring
          </div>
          <h2 className="font-bold text-white mb-4" style={{ fontSize: "clamp(32px,5vw,52px)", letterSpacing: "-0.03em" }}>
            Finishing micro-steps becomes{" "}
            <span style={{ background: "linear-gradient(135deg,#6366F1,#A78BFA,#84CC16)", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              satisfying
            </span>
          </h2>
          <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
            XP, streaks, and badges borrow the dopamine hits your brain already chases—then point them at laundry, email, study sessions, or life admin instead of shame spirals.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* ── Col 1: Achievement badges ── */}
          <div
            style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)", transition: "opacity .6s ease .1s, transform .6s ease .1s" }}
          >
            <div className="rounded-2xl p-5 h-full" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-white">50+ Achievements</p>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(132,204,22,0.12)", color: "#84CC16", border: "1px solid rgba(132,204,22,0.22)" }}>
                  3 unlocked
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {ACHIEVEMENTS_SHOWCASE.map((a, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2 rounded-xl transition-all duration-200"
                    style={{
                      background: a.locked ? "rgba(255,255,255,0.02)" : "rgba(167,139,250,0.1)",
                      border: `1px solid ${a.locked ? "rgba(255,255,255,0.05)" : "rgba(167,139,250,0.22)"}`,
                      opacity: a.locked ? 0.45 : 1,
                      filter: a.locked ? "grayscale(0.5)" : "none",
                      cursor: "default",
                    }}
                    title={`${a.name} — ${a.desc} · +${a.xp} XP${a.locked ? " (locked)" : ""}`}
                    onMouseEnter={e => { if (a.locked) e.currentTarget.style.opacity = "0.7"; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = a.locked ? "0.45" : "1"; }}
                  >
                    <span className="text-base">{a.locked ? "🔒" : a.emoji}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold truncate" style={{ color: a.locked ? "var(--text-muted)" : "white" }}>
                        {a.name}
                      </p>
                      <p className="text-xs" style={{ color: a.locked ? "var(--text-muted)" : "#A78BFA" }}>
                        +{a.xp} XP
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-xs text-center" style={{ color: "var(--text-muted)" }}>
                Complete the demo above to unlock your first 3 ↑
              </p>
            </div>
          </div>

          {/* ── Col 2: Streak + Loop ── */}
          <div
            className="flex flex-col gap-4"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)", transition: "opacity .6s ease .2s, transform .6s ease .2s" }}
          >
            {/* Streak card */}
            <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-white">Daily Streak</p>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg">🔥</span>
                  <span className="text-lg font-bold text-white">3</span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>days</span>
                </div>
              </div>

              {/* Week heatmap */}
              <div className="flex gap-2 mb-3">
                {STREAK_WEEK.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                    <div
                      className="w-full aspect-square rounded-lg transition-all duration-300"
                      style={{
                        background: d.filled
                          ? "linear-gradient(135deg, #f97316, #fbbf24)"
                          : "rgba(255,255,255,0.05)",
                        border: `1px solid ${d.filled ? "rgba(249,115,22,0.3)" : "rgba(255,255,255,0.07)"}`,
                      }}
                    />
                    <span className="text-xs" style={{ color: "var(--text-muted)", fontSize: "10px" }}>{d.day}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                Miss a day, streak resets. The fear of breaking your streak keeps you executing every day.
              </p>
            </div>

            {/* XP & Level card */}
            <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}>
              <p className="text-sm font-semibold text-white mb-4">Level progression</p>
              <div className="flex flex-col gap-2.5">
                {[
                  { emoji: "🌱", name: "Starter",  xp: "0",    color: "#94a3b8" },
                  { emoji: "🚶", name: "Moving",   xp: "100",  color: "#60a5fa" },
                  { emoji: "🏃", name: "In Flow",  xp: "250",  color: "#A78BFA" },
                  { emoji: "⚡", name: "Machine",  xp: "420+", color: "#fbbf24" },
                ].map((l, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                      style={{ background: `rgba(${hexToRgb(l.color)},0.12)`, border: `1px solid rgba(${hexToRgb(l.color)},0.2)` }}
                    >
                      {l.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-semibold" style={{ color: l.color }}>{l.name}</span>
                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>{l.xp} XP</span>
                      </div>
                      <div className="h-1 rounded-full" style={{ background: `rgba(${hexToRgb(l.color)},0.15)` }}>
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${[25, 55, 80, 100][i]}%`, background: `linear-gradient(90deg, ${l.color}, rgba(${hexToRgb(l.color)},0.6))` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Col 3: The addiction loop ── */}
          <div
            style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)", transition: "opacity .6s ease .3s, transform .6s ease .3s" }}
          >
            <div className="rounded-2xl p-5 h-full" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}>
              <p className="text-sm font-semibold text-white mb-1">The execution loop</p>
              <p className="text-xs mb-5" style={{ color: "var(--text-secondary)" }}>
                Why Startify users come back every day
              </p>

              <div className="relative flex flex-col gap-1">
                {LOOP_STEPS.map((s, i) => (
                  <div key={i} className="relative">
                    <div
                      className="flex items-center gap-3 px-4 py-3 rounded-xl"
                      style={{
                        background: `rgba(${hexToRgb(s.color)},0.07)`,
                        border: `1px solid rgba(${hexToRgb(s.color)},0.15)`,
                      }}
                    >
                      <span className="text-lg w-6 text-center flex-shrink-0">{s.icon}</span>
                      <span className="text-sm font-medium" style={{ color: s.color }}>{s.label}</span>
                    </div>
                    {i < LOOP_STEPS.length - 1 && (
                      <div
                        className="flex justify-center py-0.5"
                        style={{ color: "rgba(255,255,255,0.15)", fontSize: "12px" }}
                      >
                        ↓
                      </div>
                    )}
                  </div>
                ))}

                {/* Loop back arrow */}
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-px" style={{ background: "rgba(244,114,182,0.2)" }} />
                  <span className="text-xs" style={{ color: "#f472b6" }}>loops back</span>
                  <div className="flex-1 h-px" style={{ background: "rgba(244,114,182,0.2)" }} />
                </div>
              </div>

              <div
                className="mt-4 px-3 py-3 rounded-xl text-xs"
                style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.12)", color: "#fbbf24", lineHeight: 1.6 }}
              >
                <span className="font-semibold">The science:</span> Variable rewards (achievements) trigger dopamine release — the same mechanism that makes games impossible to put down. We use it for execution.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function hexToRgb(hex: string) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!r) return "99,102,241";
  return `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}`;
}
