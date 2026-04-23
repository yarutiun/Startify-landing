"use client";

import { useState, useEffect, useRef } from "react";
import { trackEvent } from "@/lib/amplitude";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tag = "SETUP" | "INSTALL" | "CREATE" | "CODE" | "FOCUS" | "READ" | "MOVE" | "ACTION" | "FLOW";

interface Step {
  text: string;
  hint: string;
  tag: Tag;
  xpReward: number;
  stuckVersion: string;
}

interface Scenario {
  label: string;
  emoji: string;
  goal: string;
  steps: Step[];
  color: string;
}

interface Achievement {
  id: string;
  emoji: string;
  name: string;
  desc: string;
  bonusXp: number;
}

// ─── Static data ──────────────────────────────────────────────────────────────

const LEVELS = [
  { name: "Starter",  emoji: "🌱", min: 0,   color: "#94a3b8" },
  { name: "Moving",   emoji: "🚶", min: 100,  color: "#60a5fa" },
  { name: "In Flow",  emoji: "🏃", min: 250,  color: "#A78BFA" },
  { name: "Machine",  emoji: "⚡", min: 420,  color: "#fbbf24" },
];

const TAG_STYLES: Record<Tag, { bg: string; color: string }> = {
  SETUP:   { bg: "rgba(99,102,241,0.15)",  color: "#6366F1" },
  INSTALL: { bg: "rgba(167,139,250,0.14)",  color: "#A78BFA" },
  CREATE:  { bg: "rgba(167,139,250,0.15)",  color: "#A78BFA" },
  CODE:    { bg: "rgba(132,204,22,0.12)",  color: "#84CC16" },
  FOCUS:   { bg: "rgba(99,102,241,0.1)",  color: "#A78BFA" },
  READ:    { bg: "rgba(167,139,250,0.12)",  color: "#A78BFA" },
  MOVE:    { bg: "rgba(132,204,22,0.1)",  color: "#84CC16" },
  ACTION:  { bg: "rgba(99,102,241,0.12)",  color: "#6366F1" },
  FLOW:    { bg: "rgba(132,204,22,0.12)",  color: "#65a30d" },
};

const ACHIEVEMENT_DEFS: Achievement[] = [
  { id: "first_move",       emoji: "🚀", name: "First Move",       desc: "Broke the paralysis barrier",       bonusXp: 25  },
  { id: "speed_run",        emoji: "⚡", name: "Speed Run",        desc: "Step done in under 3 seconds",      bonusXp: 40  },
  { id: "on_a_roll",        emoji: "🔥", name: "On a Roll",        desc: "3 consecutive steps — no stopping", bonusXp: 50  },
  { id: "overcomer",        emoji: "💪", name: "Overcomer",        desc: "Got stuck and kept going anyway",   bonusXp: 35  },
  { id: "unstoppable",      emoji: "🌊", name: "Unstoppable",      desc: "All steps — zero stuck moments",    bonusXp: 75  },
  { id: "mission_complete", emoji: "🏆", name: "Mission Complete", desc: "Full sequence conquered",           bonusXp: 100 },
];

const SCENARIOS: Scenario[] = [
  {
    label: "Frozen brain", emoji: "🧊",
    goal: "I need to start something important but ADHD paralysis keeps winning",
    color: "#6366F1",
    steps: [
      { text: "Stand up and walk to where the task physically happens", hint: "No output yet—just relocate your body closer to the thing.", tag: "MOVE", xpReward: 50, stuckVersion: "Take five steps in that direction. You can sit back down after." },
      { text: "Set a 2-minute timer and flip your phone face-down", hint: "Two minutes. Face-down removes one dopamine lever.", tag: "FOCUS", xpReward: 50, stuckVersion: "If two minutes feels huge, set 90 seconds instead." },
      { text: "Say the task out loud in one messy sentence", hint: "Swearing optional. Hearing it cuts through internal noise.", tag: "FOCUS", xpReward: 50, stuckVersion: "Whisper it if roommates are home—volume doesn’t matter." },
      { text: "Touch the object you need (keys, sponge, envelope, laptop lid)", hint: "Skin contact only. Still no finished work required.", tag: "ACTION", xpReward: 55, stuckVersion: "Rest your hand on it for three slow breaths." },
      { text: "Until the timer rings, do the tiniest visible piece", hint: "One sentence, one dish, one checkbox—then you can stop guilt-free.", tag: "FLOW", xpReward: 55, stuckVersion: "Shrink again: open the app, unfold the paper, sharpen the pencil." },
    ],
  },
  {
    label: "Studying", emoji: "📚",
    goal: "I need to study for an exam but procrastination keeps pulling me away",
    color: "#A78BFA",
    steps: [
      { text: "Open your materials to the exact page or deck you’re avoiding", hint: "No reading yet—just land on the right spot.", tag: "FOCUS", xpReward: 45, stuckVersion: "If you can’t find the page, open any page in that chapter." },
      { text: "Set a 5-minute timer and read only the first paragraph", hint: "Finger or cursor tracking counts. Stop when the timer ends.", tag: "READ", xpReward: 45, stuckVersion: "Read the first two sentences only if a paragraph feels huge." },
      { text: "On a sticky note, write one honest question about what confused you", hint: "Questions are progress. Answers can wait.", tag: "ACTION", xpReward: 55, stuckVersion: "Write a single word that sums up the confusion instead." },
      { text: "Skim only the section headings for 3 minutes—no deep reading", hint: "Map the territory before your brain demands mastery.", tag: "READ", xpReward: 55, stuckVersion: "Read just the first heading, then stop." },
      { text: "Say one takeaway out loud in a goofy voice", hint: "Humor lowers shame; speaking encodes memory differently.", tag: "FLOW", xpReward: 60, stuckVersion: "Mumble it under your breath if you feel silly—that still counts." },
    ],
  },
  {
    label: "Life admin", emoji: "🏠",
    goal: "I need to tackle boring adult tasks but executive dysfunction says nope",
    color: "#84CC16",
    steps: [
      { text: "Stand up right now. Just stand.",                                     hint: "Phone down. No music. No prep. Just vertical.",                   tag: "MOVE",   xpReward: 40, stuckVersion: "Sit on the very edge of your seat" },
      { text: "Walk to where the chore lives without detouring",                     hint: "No snack stops. No “quick checks.” Ten honest steps.",     tag: "MOVE",   xpReward: 40, stuckVersion: "Take 3 steps toward the sink, desk, or mailbox." },
      { text: "Pick up the ONE item that bothers you most from the floor",           hint: "Not a pile. Not a system. The worst offender. Just that one.",   tag: "ACTION", xpReward: 50, stuckVersion: "Look at the floor for 10 seconds and name the loudest mess." },
      { text: "Put it exactly where it belongs (or start a 'sort later' pile)",     hint: "That item is dealt with. Measurable win.",   tag: "ACTION", xpReward: 50, stuckVersion: "Move it off the floor. Anywhere but the floor." },
      { text: "Set a 5-minute timer. Keep picking up items until it rings.",        hint: "Five minutes of kindness to Future You.", tag: "FLOW",   xpReward: 60, stuckVersion: "Set a 2-minute timer instead—same win, smaller bar." },
    ],
  },
];

const MOTIVATIONAL: Record<number, string> = {
  1: "You broke the resistance. That's the hardest step.",
  2: "Momentum is building. Keep going.",
  3: "3 steps in. You're in flow now 🌊",
  4: "This is what execution feels like. Don't stop.",
  5: "FIVE steps. You are unstoppable.",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getLevel(xp: number) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].min) return i;
  }
  return 0;
}

function getLevelProgress(xp: number) {
  const li = getLevel(xp);
  const next = LEVELS[li + 1];
  if (!next) return 100;
  return Math.min(100, ((xp - LEVELS[li].min) / (next.min - LEVELS[li].min)) * 100);
}

function hexToRgb(hex: string) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!r) return "99,102,241";
  return `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}`;
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function InteractiveDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepStartRef = useRef<number>(Date.now());

  const [visible, setVisible] = useState(false);
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [started, setStarted] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [stuckMode, setStuckMode] = useState(false);
  const [usedStuck, setUsedStuck] = useState(false);
  const [finished, setFinished] = useState(false);

  // Game state
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [earned, setEarned] = useState<Set<string>>(new Set());
  const [toastQueue, setToastQueue] = useState<Achievement[]>([]);
  const [activeToast, setActiveToast] = useState<Achievement | null>(null);
  const [xpFlash, setXpFlash] = useState<number | null>(null);
  const [levelUpFlash, setLevelUpFlash] = useState(false);

  const scenario = SCENARIOS[scenarioIdx];

  // Intersection observer
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); trackEvent("section_viewed", { section: "demo" }); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Toast queue pump
  useEffect(() => {
    if (!activeToast && toastQueue.length > 0) {
      setActiveToast(toastQueue[0]);
      setToastQueue(q => q.slice(1));
    }
  }, [activeToast, toastQueue]);

  useEffect(() => {
    if (!activeToast) return;
    const t = setTimeout(() => setActiveToast(null), 2600);
    return () => clearTimeout(t);
  }, [activeToast]);

  const resetDemo = () => {
    setStarted(false); setStepIdx(0); setStuckMode(false);
    setUsedStuck(false); setFinished(false);
    setXp(0); setStreak(0); setEarned(new Set());
    setToastQueue([]); setActiveToast(null);
    setXpFlash(null); setLevelUpFlash(false);
  };

  const selectScenario = (i: number) => {
    setScenarioIdx(i);
    resetDemo();
    trackEvent("demo_scenario_selected", { scenario: SCENARIOS[i].label });
  };

  const handleStart = () => {
    setStarted(true);
    stepStartRef.current = Date.now();
    trackEvent("demo_started", { scenario: scenario.label });
  };

  const handleDone = () => {
    const elapsed = (Date.now() - stepStartRef.current) / 1000;
    const step = scenario.steps[stepIdx];
    const newStreak = stuckMode ? 1 : streak + 1;
    const newStepIdx = stepIdx + 1;
    const isFinished = newStepIdx >= scenario.steps.length;

    // Calculate XP + achievements in one shot
    let xpGained = step.xpReward;
    const newAchievements: Achievement[] = [];
    const updatedEarned = new Set(earned);

    const tryEarn = (id: string) => {
      if (updatedEarned.has(id)) return;
      const a = ACHIEVEMENT_DEFS.find(x => x.id === id)!;
      updatedEarned.add(id);
      newAchievements.push(a);
      xpGained += a.bonusXp;
    };

    if (stepIdx === 0) tryEarn("first_move");
    if (elapsed < 3) tryEarn("speed_run");
    if (newStreak >= 3) tryEarn("on_a_roll");
    if (usedStuck) tryEarn("overcomer");
    if (isFinished && !usedStuck) tryEarn("unstoppable");
    if (isFinished) tryEarn("mission_complete");

    const oldLevel = getLevel(xp);
    const newXp = xp + xpGained;
    const newLevel = getLevel(newXp);

    setXp(newXp);
    setStreak(newStreak);
    setEarned(updatedEarned);
    setStuckMode(false);
    setXpFlash(xpGained);
    setTimeout(() => setXpFlash(null), 1400);

    if (newLevel > oldLevel) {
      setLevelUpFlash(true);
      setTimeout(() => setLevelUpFlash(false), 2200);
      trackEvent("demo_level_up", { level: LEVELS[newLevel].name });
    }

    if (newAchievements.length > 0) {
      setToastQueue(q => [...q, ...newAchievements]);
      newAchievements.forEach(a => trackEvent("achievement_unlocked", { achievement: a.name, scenario: scenario.label }));
    }

    if (isFinished) {
      setFinished(true);
    } else {
      setStepIdx(newStepIdx);
      stepStartRef.current = Date.now();
    }

    trackEvent("demo_step_done", { step: stepIdx, scenario: scenario.label, xpEarned: xpGained, streak: newStreak });
  };

  const handleStuck = () => {
    setStuckMode(true);
    setUsedStuck(true);
    setStreak(0);
    trackEvent("demo_step_stuck", { step: stepIdx, scenario: scenario.label });
  };

  const handleGotIt = () => {
    setStuckMode(false);
    stepStartRef.current = Date.now();
    trackEvent("demo_stuck_resolved", { step: stepIdx, scenario: scenario.label });
  };

  const levelIdx = getLevel(xp);
  const levelInfo = LEVELS[levelIdx];
  const progress = getLevelProgress(xp);

  return (
    <section
      id="demo"
      ref={sectionRef}
      className="py-24 px-6"
      style={{ background: "var(--bg-primary)", borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div
          className="text-center max-w-2xl mx-auto mb-12"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "opacity .6s ease, transform .6s ease" }}
        >
          <div className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{ color: "#A78BFA", background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.2)" }}>
            Interactive demo
          </div>
          <h2 className="font-bold text-white mb-4" style={{ fontSize: "clamp(32px,5vw,52px)", letterSpacing: "-0.03em" }}>
            Try it. Feel the difference.
          </h2>
          <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
            Pick a real scenario, click through the steps, and watch your XP, streak, and achievements build in real time.
          </p>
        </div>

        <div
          className="grid lg:grid-cols-5 gap-6"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "opacity .6s ease .2s, transform .6s ease .2s" }}
        >
          {/* ── Left panel ── */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Scenario picker */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>
                Choose scenario
              </p>
              <div className="flex flex-col gap-2">
                {SCENARIOS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => selectScenario(i)}
                    className="w-full text-left px-4 py-3 rounded-xl cursor-pointer transition-all duration-200"
                    style={{
                      background: scenarioIdx === i ? `rgba(${hexToRgb(s.color)},0.1)` : "rgba(255,255,255,0.03)",
                      border: `1px solid ${scenarioIdx === i ? `rgba(${hexToRgb(s.color)},0.3)` : "rgba(255,255,255,0.06)"}`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{s.emoji}</span>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold" style={{ color: scenarioIdx === i ? s.color : "white" }}>
                          {s.label}
                        </div>
                        <div className="text-xs truncate mt-0.5" style={{ color: "var(--text-muted)" }}>
                          &ldquo;{s.goal.slice(0, 45)}…&rdquo;
                        </div>
                      </div>
                      {scenarioIdx === i && <div className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.color }} />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Live stats — only after starting */}
            {started && (
              <div
                className="rounded-2xl p-5 flex flex-col gap-4"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", animation: "fadeInUp .4s ease" }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                  Your progress
                </p>

                {/* Level badge + XP bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold transition-all duration-500"
                      style={{
                        background: `rgba(${hexToRgb(levelInfo.color)},0.15)`,
                        border: `1px solid rgba(${hexToRgb(levelInfo.color)},0.3)`,
                        color: levelInfo.color,
                        animation: levelUpFlash ? "levelUpPulse .5s ease" : "none",
                      }}
                    >
                      {levelInfo.emoji} {levelInfo.name}
                      {levelUpFlash && <span style={{ color: "#fbbf24", marginLeft: "4px" }}>↑ LEVEL UP!</span>}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-white">{xp}</span>
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>XP</span>
                      {xpFlash && (
                        <span
                          className="text-xs font-bold"
                          style={{ color: "#84CC16", animation: "xpFloat 1.4s ease forwards" }}
                        >
                          +{xpFlash}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${progress}%`,
                        background: `linear-gradient(90deg, ${levelInfo.color}, ${LEVELS[Math.min(levelIdx + 1, LEVELS.length - 1)].color})`,
                      }}
                    />
                  </div>
                  {LEVELS[levelIdx + 1] && (
                    <p className="text-xs mt-1.5" style={{ color: "var(--text-muted)" }}>
                      {LEVELS[levelIdx + 1].min - xp} XP to {LEVELS[levelIdx + 1].emoji} {LEVELS[levelIdx + 1].name}
                    </p>
                  )}
                </div>

                {/* Streak */}
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-5 h-5 rounded-md flex items-center justify-center text-xs transition-all duration-300"
                        style={{
                          background: i < streak ? "rgba(251,191,36,0.2)" : "rgba(255,255,255,0.05)",
                          border: `1px solid ${i < streak ? "rgba(251,191,36,0.4)" : "rgba(255,255,255,0.08)"}`,
                        }}
                      >
                        {i < streak ? "🔥" : ""}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs" style={{ color: streak > 0 ? "#fbbf24" : "var(--text-muted)" }}>
                    {streak > 0 ? `${streak} step streak!` : "Build your streak"}
                  </span>
                </div>

                {/* Earned achievements */}
                {earned.size > 0 && (
                  <div>
                    <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>Unlocked</p>
                    <div className="flex flex-wrap gap-2">
                      {ACHIEVEMENT_DEFS.filter(a => earned.has(a.id)).map(a => (
                        <div
                          key={a.id}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
                          style={{ background: "rgba(167,139,250,0.12)", border: "1px solid rgba(167,139,250,0.2)", color: "#A78BFA" }}
                          title={`${a.desc} · +${a.bonusXp} bonus XP`}
                        >
                          {a.emoji} {a.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Right panel: App window ── */}
          <div className="lg:col-span-3 flex justify-center">
            <div className="w-full max-w-md relative">
              {/* Achievement toast */}
              {activeToast && (
                <div
                  className="absolute -top-16 left-1/2 z-20 flex items-center gap-3 px-4 py-2.5 rounded-2xl shadow-lg"
                  style={{
                    transform: "translateX(-50%)",
                    background: "linear-gradient(135deg, rgba(167,139,250,0.25), rgba(79,70,229,0.25))",
                    border: "1px solid rgba(167,139,250,0.4)",
                    backdropFilter: "blur(12px)",
                    animation: "toastSlideIn .35s ease, toastFadeOut .4s ease 2.2s forwards",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span className="text-xl">{activeToast.emoji}</span>
                  <div>
                    <p className="text-xs font-bold text-white leading-none">Achievement unlocked!</p>
                    <p className="text-xs mt-0.5" style={{ color: "#A78BFA" }}>{activeToast.name} · +{activeToast.bonusXp} XP</p>
                  </div>
                </div>
              )}

              {/* The window */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "#08080f",
                  border: "1px solid rgba(167,139,250,0.2)",
                  boxShadow: "0 30px 70px rgba(0,0,0,0.6), 0 0 0 1px rgba(167,139,250,0.05)",
                }}
              >
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
                  <span className="mx-auto text-xs font-medium" style={{ color: "var(--text-muted)" }}>Startify</span>
                </div>

                <div className="p-6">
                  {!started ? (
                    <StartScreen scenario={scenario} onStart={handleStart} />
                  ) : finished ? (
                    <FinishedScreen xp={xp} levelIdx={levelIdx} earned={earned} onReset={resetDemo} />
                  ) : (
                    <StepScreen
                      scenario={scenario}
                      stepIdx={stepIdx}
                      stuckMode={stuckMode}
                      completedCount={stepIdx}
                      onDone={handleDone}
                      onStuck={handleStuck}
                      onGotIt={handleGotIt}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:none; } }
        @keyframes toastSlideIn { from { opacity:0; transform:translateX(-50%) translateY(-10px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
        @keyframes toastFadeOut { to { opacity:0; transform:translateX(-50%) translateY(-6px); } }
        @keyframes xpFloat { 0% { opacity:1; transform:translateY(0); } 60% { opacity:1; transform:translateY(-10px); } 100% { opacity:0; transform:translateY(-18px); } }
        @keyframes levelUpPulse { 0%,100% { transform:scale(1); } 50% { transform:scale(1.08); box-shadow:0 0 20px rgba(132,204,22,0.45); } }
        @keyframes stepIn { from { opacity:0; transform:translateX(8px); } to { opacity:1; transform:none; } }
        @keyframes doneFlash { 0%,100% { background:linear-gradient(135deg,#6366F1,#4f46e5); } 50% { background:linear-gradient(135deg,#84CC16,#65a30d); } }
      `}</style>
    </section>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StartScreen({ scenario, onStart }: { scenario: Scenario; onStart: () => void }) {
  return (
    <div className="py-2">
      <p className="text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>Your goal</p>
      <div className="px-4 py-3 rounded-xl text-sm mb-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "white", lineHeight: 1.6 }}>
        &ldquo;{scenario.goal}&rdquo;
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {[
          { icon: "⚡", text: "XP per step" },
          { icon: "🔥", text: "Streak tracking" },
          { icon: "🏆", text: "Achievements" },
        ].map((b, i) => (
          <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs" style={{ background: "rgba(255,255,255,0.04)", color: "var(--text-secondary)" }}>
            <span>{b.icon}</span><span>{b.text}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        className="w-full py-3.5 rounded-xl text-sm font-semibold text-white cursor-pointer transition-all duration-200"
        style={{ background: "linear-gradient(135deg,#6366F1,#4f46e5)" }}
        onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
      >
        Start the execution loop →
      </button>
    </div>
  );
}

function StepScreen({
  scenario, stepIdx, stuckMode, completedCount, onDone, onStuck, onGotIt,
}: {
  scenario: Scenario; stepIdx: number; stuckMode: boolean; completedCount: number;
  onDone: () => void; onStuck: () => void; onGotIt: () => void;
}) {
  const step = scenario.steps[stepIdx];
  const tag = TAG_STYLES[step.tag];

  return (
    <div>
      {/* Step progress dots */}
      <div className="flex items-center gap-2 mb-5">
        {scenario.steps.map((_, i) => (
          <div key={i} className="h-1 rounded-full transition-all duration-500 flex-1"
            style={{ background: i < stepIdx ? "linear-gradient(90deg,#6366F1,#4f46e5)" : i === stepIdx ? "rgba(167,139,250,0.5)" : "rgba(255,255,255,0.07)" }} />
        ))}
        {completedCount > 0 && (
          <span className="ml-1 text-xs font-medium whitespace-nowrap" style={{ color: "#84CC16" }}>
            ✓ {completedCount}
          </span>
        )}
      </div>

      {/* Step content */}
      <div key={stepIdx} style={{ animation: "stepIn .3s ease" }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold" style={{ color: scenario.color }}>
            STEP {stepIdx + 1}
          </span>
          <span className="px-2 py-0.5 rounded text-xs font-semibold" style={{ background: tag.bg, color: tag.color }}>
            {step.tag}
          </span>
        </div>

        <p className="text-base font-bold text-white mb-3" style={{ lineHeight: 1.45 }}>
          {step.text}
        </p>

        <p className="text-sm mb-5" style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
          {step.hint}
        </p>
      </div>

      {/* Motivational message */}
      {stepIdx > 0 && MOTIVATIONAL[stepIdx] && !stuckMode && (
        <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg text-xs" style={{ background: "rgba(167,139,250,0.08)", color: "#A78BFA" }}>
          <span>✦</span>
          <span>{MOTIVATIONAL[stepIdx]}</span>
        </div>
      )}

      {/* Stuck mode */}
      {stuckMode && (
        <div className="mb-4 px-4 py-3 rounded-xl" style={{ background: "rgba(251,191,36,0.07)", border: "1px solid rgba(251,191,36,0.15)", animation: "fadeInUp .3s ease" }}>
          <p className="text-xs font-semibold mb-1" style={{ color: "#fbbf24" }}>Simpler version 👇</p>
          <p className="text-sm text-white mb-3">{step.stuckVersion}</p>
          <button
            onClick={onGotIt}
            className="text-xs font-medium px-3 py-1.5 rounded-lg cursor-pointer"
            style={{ background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.25)", color: "#fbbf24" }}
          >
            Got it, let&rsquo;s continue →
          </button>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onDone}
          className="flex-1 py-3 rounded-xl text-sm font-bold text-white cursor-pointer transition-all duration-200"
          style={{ background: "linear-gradient(135deg,#6366F1,#4f46e5)" }}
          onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "scale(1.01)"; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
        >
          ✓ Done  <span style={{ opacity: 0.7, fontSize: "11px" }}>+{step.xpReward} XP</span>
        </button>
        {!stuckMode && (
          <button
            onClick={onStuck}
            className="flex-1 py-3 rounded-xl text-sm font-medium cursor-pointer transition-all"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-secondary)" }}
            onMouseEnter={e => { e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
          >
            I&rsquo;m stuck
          </button>
        )}
      </div>
    </div>
  );
}

function FinishedScreen({ xp, levelIdx, earned, onReset }: { xp: number; levelIdx: number; earned: Set<string>; onReset: () => void }) {
  const level = LEVELS[levelIdx];
  const earnedList = ACHIEVEMENT_DEFS.filter(a => earned.has(a.id));

  return (
    <div style={{ animation: "fadeInUp .5s ease" }}>
      <div className="text-center mb-5">
        <div className="text-4xl mb-2">🔥</div>
        <p className="text-white font-bold text-lg">Sequence complete!</p>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          You reached <span style={{ color: level.color }}>{level.emoji} {level.name}</span> · <span className="text-white font-semibold">{xp} XP</span>
        </p>
      </div>

      {/* Earned achievements */}
      {earnedList.length > 0 && (
        <div className="mb-5">
          <p className="text-xs font-semibold mb-2.5" style={{ color: "var(--text-muted)" }}>
            Achievements unlocked this session
          </p>
          <div className="grid grid-cols-2 gap-2">
            {earnedList.map(a => (
              <div key={a.id} className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.18)" }}>
                <span className="text-lg">{a.emoji}</span>
                <div>
                  <p className="text-xs font-semibold text-white">{a.name}</p>
                  <p className="text-xs" style={{ color: "#A78BFA" }}>+{a.bonusXp} XP</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="px-3 py-2.5 rounded-xl mb-4 text-xs text-center" style={{ background: "rgba(255,255,255,0.03)", color: "var(--text-muted)" }}>
        In the real app — 50+ achievements, daily streaks, weekly challenges, and an XP leaderboard.
      </div>

      <button
        onClick={onReset}
        className="w-full py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all"
        style={{ background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.2)", color: "#A78BFA" }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(167,139,250,0.18)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(167,139,250,0.1)")}
      >
        Try another scenario ↺
      </button>
    </div>
  );
}
