"use client";

import { useState, useEffect, useRef } from "react";
import { trackEvent } from "@/lib/amplitude";

const DEMO_SCENARIOS = [
  {
    label: "Developer",
    goal: "I need to implement authentication but I feel overwhelmed",
    steps: [
      "Open your laptop",
      "Open your code editor",
      'Create a new file called "auth.js"',
      'Search "JWT authentication example" in browser',
      "Copy the basic JWT example code",
    ],
    stuckFallback: "Just move your cursor to the code editor icon",
    color: "#6366f1",
  },
  {
    label: "Student",
    goal: "I need to study React but I can't start",
    steps: [
      "Open your laptop",
      "Open YouTube or the React docs",
      'Search "React useEffect basics"',
      "Watch the first 2 minutes only",
      "Close all other tabs",
    ],
    stuckFallback: "Just open a new browser tab — nothing else",
    color: "#22d3ee",
  },
  {
    label: "Life admin",
    goal: "I need to clean my room but I keep avoiding it",
    steps: [
      "Stand up from your chair",
      "Walk into your room",
      "Pick up exactly ONE item from the floor",
      "Put it where it belongs",
      "Pick up one more item",
    ],
    stuckFallback: "Just stand up — that's all. Literally just stand.",
    color: "#4ade80",
  },
];

export default function InteractiveDemo() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [stuckMode, setStuckMode] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const scenario = DEMO_SCENARIOS[scenarioIndex];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          trackEvent("section_viewed", { section: "interactive_demo" });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const resetDemo = () => {
    setStarted(false);
    setStepIndex(0);
    setStuckMode(false);
    setCompletedCount(0);
    setFinished(false);
  };

  const handleSelectScenario = (i: number) => {
    setScenarioIndex(i);
    resetDemo();
    trackEvent("demo_scenario_selected", { scenario: DEMO_SCENARIOS[i].label });
  };

  const handleStart = () => {
    setStarted(true);
    trackEvent("demo_started", { scenario: scenario.label });
  };

  const handleDone = () => {
    const next = stepIndex + 1;
    setCompletedCount((c) => c + 1);
    setStuckMode(false);
    trackEvent("demo_step_done", { step: stepIndex, scenario: scenario.label });
    if (next >= scenario.steps.length) {
      setFinished(true);
    } else {
      setStepIndex(next);
    }
  };

  const handleStuck = () => {
    setStuckMode(true);
    trackEvent("demo_step_stuck", { step: stepIndex, scenario: scenario.label });
  };

  const handleGotIt = () => {
    setStuckMode(false);
    trackEvent("demo_stuck_resolved", { step: stepIndex, scenario: scenario.label });
  };

  return (
    <section
      id="demo"
      ref={ref}
      className="py-24 px-6"
      style={{
        background: "var(--bg-primary)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div
          className="text-center max-w-2xl mx-auto mb-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div
            className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{
              color: "#22d3ee",
              background: "rgba(34,211,238,0.08)",
              border: "1px solid rgba(34,211,238,0.15)",
            }}
          >
            Interactive demo
          </div>
          <h2
            className="font-bold text-white mb-4"
            style={{ fontSize: "clamp(32px, 5vw, 52px)", letterSpacing: "-0.03em" }}
          >
            Try it yourself
          </h2>
          <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
            Pick a scenario and experience exactly how StartEngine works. Click
            through the steps — it&rsquo;s real.
          </p>
        </div>

        <div
          className="grid lg:grid-cols-2 gap-8 items-start"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
          }}
        >
          {/* Left: scenario picker */}
          <div>
            <p
              className="text-sm font-medium mb-3"
              style={{ color: "var(--text-secondary)" }}
            >
              Choose your scenario:
            </p>
            <div className="flex flex-col gap-3 mb-8">
              {DEMO_SCENARIOS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectScenario(i)}
                  className="w-full text-left px-5 py-4 rounded-2xl cursor-pointer transition-all duration-200"
                  style={{
                    background:
                      scenarioIndex === i
                        ? `rgba(${hexToRgb(s.color)},0.1)`
                        : "rgba(255,255,255,0.03)",
                    border: `1px solid ${
                      scenarioIndex === i
                        ? `rgba(${hexToRgb(s.color)},0.3)`
                        : "rgba(255,255,255,0.06)"
                    }`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                      style={{
                        background:
                          scenarioIndex === i
                            ? `rgba(${hexToRgb(s.color)},0.2)`
                            : "rgba(255,255,255,0.05)",
                      }}
                    >
                      {i === 0 ? "💻" : i === 1 ? "📚" : "🏠"}
                    </div>
                    <div>
                      <div
                        className="text-sm font-semibold"
                        style={{
                          color: scenarioIndex === i ? s.color : "white",
                        }}
                      >
                        {s.label}
                      </div>
                      <div
                        className="text-xs mt-0.5 line-clamp-1"
                        style={{ color: "var(--text-muted)" }}
                      >
                        &ldquo;{s.goal}&rdquo;
                      </div>
                    </div>
                    {scenarioIndex === i && (
                      <div
                        className="ml-auto w-2 h-2 rounded-full"
                        style={{ background: s.color }}
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* What happens */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid var(--border)",
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-3"
                style={{ color: "var(--text-muted)" }}
              >
                What you&rsquo;ll notice
              </p>
              {[
                "One step at a time — never more",
                'Stuck? It simplifies even further',
                "Each step is physically doable in under 3 min",
              ].map((t, i) => (
                <div key={i} className="flex items-start gap-2.5 mb-2.5">
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(139,92,246,0.2)" }}
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4L3.5 6L6.5 2" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    {t}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: the app */}
          <div className="flex justify-center">
            <div className="w-full max-w-sm">
              <AppWindow
                scenario={scenario}
                started={started}
                stepIndex={stepIndex}
                stuckMode={stuckMode}
                completedCount={completedCount}
                finished={finished}
                onStart={handleStart}
                onDone={handleDone}
                onStuck={handleStuck}
                onGotIt={handleGotIt}
                onReset={resetDemo}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "139,92,246";
  return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`;
}

interface AppWindowProps {
  scenario: (typeof DEMO_SCENARIOS)[0];
  started: boolean;
  stepIndex: number;
  stuckMode: boolean;
  completedCount: number;
  finished: boolean;
  onStart: () => void;
  onDone: () => void;
  onStuck: () => void;
  onGotIt: () => void;
  onReset: () => void;
}

function AppWindow({
  scenario,
  started,
  stepIndex,
  stuckMode,
  completedCount,
  finished,
  onStart,
  onDone,
  onStuck,
  onGotIt,
  onReset,
}: AppWindowProps) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "#0a0a14",
        border: "1px solid rgba(139,92,246,0.2)",
        boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(139,92,246,0.05)",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
        <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
        <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
        <div
          className="mx-auto text-xs font-medium"
          style={{ color: "var(--text-muted)" }}
        >
          StartEngine
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {!started ? (
          <StartScreen scenario={scenario} onStart={onStart} />
        ) : finished ? (
          <FinishedScreen completedCount={completedCount} onReset={onReset} />
        ) : (
          <StepScreen
            scenario={scenario}
            stepIndex={stepIndex}
            stuckMode={stuckMode}
            completedCount={completedCount}
            onDone={onDone}
            onStuck={onStuck}
            onGotIt={onGotIt}
          />
        )}
      </div>
    </div>
  );
}

function StartScreen({
  scenario,
  onStart,
}: {
  scenario: (typeof DEMO_SCENARIOS)[0];
  onStart: () => void;
}) {
  return (
    <div className="py-4">
      <p
        className="text-xs font-medium mb-3"
        style={{ color: "var(--text-muted)" }}
      >
        Your goal
      </p>
      <div
        className="px-4 py-3 rounded-xl text-sm mb-6"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "white",
          lineHeight: 1.6,
        }}
      >
        &ldquo;{scenario.goal}&rdquo;
      </div>
      <button
        onClick={onStart}
        className="w-full py-3.5 rounded-xl text-sm font-semibold text-white cursor-pointer transition-all duration-200"
        style={{
          background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        Let&rsquo;s start →
      </button>
    </div>
  );
}

function StepScreen({
  scenario,
  stepIndex,
  stuckMode,
  completedCount,
  onDone,
  onStuck,
  onGotIt,
}: {
  scenario: (typeof DEMO_SCENARIOS)[0];
  stepIndex: number;
  stuckMode: boolean;
  completedCount: number;
  onDone: () => void;
  onStuck: () => void;
  onGotIt: () => void;
}) {
  return (
    <div>
      {/* Progress */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-1.5">
          {scenario.steps.map((_, i) => (
            <div
              key={i}
              className="h-1 rounded-full transition-all duration-500"
              style={{
                width: i < stepIndex ? "24px" : "8px",
                background: i < stepIndex
                  ? "linear-gradient(90deg, #7c3aed, #4f46e5)"
                  : i === stepIndex
                  ? "rgba(139,92,246,0.5)"
                  : "rgba(255,255,255,0.08)",
              }}
            />
          ))}
        </div>
        {completedCount > 0 && (
          <span
            className="text-xs font-medium"
            style={{ color: "#4ade80" }}
          >
            ✓ {completedCount} done
          </span>
        )}
      </div>

      {/* Step label */}
      <div
        className="text-xs font-semibold mb-1"
        style={{ color: scenario.color }}
      >
        Step {stepIndex + 1} of {scenario.steps.length}
      </div>

      {/* Step text */}
      <div
        key={stepIndex}
        style={{ animation: "fadeIn 0.35s ease" }}
      >
        <p className="text-lg font-bold text-white mb-5" style={{ lineHeight: 1.4 }}>
          {scenario.steps[stepIndex]}
        </p>
      </div>

      {/* Stuck mode */}
      {stuckMode && (
        <div
          className="mb-4 px-4 py-3 rounded-xl text-sm"
          style={{
            background: "rgba(251,191,36,0.08)",
            border: "1px solid rgba(251,191,36,0.15)",
            animation: "fadeIn 0.3s ease",
          }}
        >
          <p
            className="text-xs font-semibold mb-1"
            style={{ color: "#fbbf24" }}
          >
            Simpler version:
          </p>
          <p className="text-sm text-white mb-3">{scenario.stuckFallback}</p>
          <button
            onClick={onGotIt}
            className="text-xs font-medium px-3 py-1.5 rounded-lg cursor-pointer transition-all"
            style={{
              background: "rgba(251,191,36,0.15)",
              border: "1px solid rgba(251,191,36,0.25)",
              color: "#fbbf24",
            }}
          >
            Got it, let&rsquo;s continue →
          </button>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onDone}
          className="flex-1 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
            color: "white",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          ✓ Done
        </button>
        {!stuckMode && (
          <button
            onClick={onStuck}
            className="flex-1 py-3 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "var(--text-secondary)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "white";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-secondary)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            }}
          >
            I&rsquo;m stuck
          </button>
        )}
      </div>
    </div>
  );
}

function FinishedScreen({
  completedCount,
  onReset,
}: {
  completedCount: number;
  onReset: () => void;
}) {
  return (
    <div className="py-4 text-center" style={{ animation: "fadeIn 0.5s ease" }}>
      <div className="text-4xl mb-4">🔥</div>
      <p className="text-white font-bold text-lg mb-2">You did it!</p>
      <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>
        {completedCount} steps completed. That&rsquo;s how momentum starts.
      </p>
      <p
        className="text-xs mb-6"
        style={{ color: "var(--text-muted)" }}
      >
        In the real app, this continues until your task is done.
      </p>
      <button
        onClick={onReset}
        className="w-full py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all"
        style={{
          background: "rgba(139,92,246,0.1)",
          border: "1px solid rgba(139,92,246,0.2)",
          color: "#a78bfa",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(139,92,246,0.15)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(139,92,246,0.1)")}
      >
        Try again ↺
      </button>
    </div>
  );
}
