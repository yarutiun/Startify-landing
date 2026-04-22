"use client";

import { useState, useEffect } from "react";
import { trackEvent, identifyUser } from "@/lib/amplitude";

export default function WarmLanding() {
  return (
    <div style={{ fontFamily: "var(--font-inter), Georgia, serif", background: "#faf6f1", color: "#1a1208", minHeight: "100vh" }}>
      <WarmNav />
      <WarmHero />
      <WarmProblem />
      <WarmHowItWorks />
      <WarmDemo />
      <WarmGamification />
      <WarmWaitlist />
      <WarmFooter />
    </div>
  );
}

// ─────────────────────────────────────────
//  Nav
// ─────────────────────────────────────────
function WarmNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ background: scrolled ? "rgba(250,246,241,0.92)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? "1px solid rgba(200,160,100,0.2)" : "1px solid transparent" }}>
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#e8572a" }}>
            <span style={{ color: "white", fontSize: "14px", fontWeight: 700 }}>→</span>
          </div>
          <span className="font-bold text-sm tracking-tight" style={{ color: "#1a1208" }}>Startify</span>
        </div>
        <button
          onClick={() => { trackEvent("nav_cta_clicked", { theme: "warm" }); document.getElementById("warm-waitlist")?.scrollIntoView({ behavior: "smooth" }); }}
          className="text-sm font-semibold px-4 py-2 rounded-full cursor-pointer transition-all"
          style={{ background: "#e8572a", color: "white" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#d4450f")}
          onMouseLeave={e => (e.currentTarget.style.background = "#e8572a")}
        >
          Join waitlist
        </button>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────
//  Hero
// ─────────────────────────────────────────
function WarmHero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent("hero_waitlist_submitted", { email, theme: "warm" });
    identifyUser(email);
    await new Promise(r => setTimeout(r, 600));
    setSubmitted(true);
  };

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden" style={{ background: "linear-gradient(160deg,#fdf8f2 0%,#faf0e4 50%,#fdf5ec 100%)" }}>
      {/* Decorative blob */}
      <div className="absolute pointer-events-none" style={{ top: "0", right: "0", width: "500px", height: "500px", background: "radial-gradient(ellipse at top right,rgba(232,87,42,0.07),transparent 60%)" }} />
      <div className="absolute pointer-events-none" style={{ bottom: "0", left: "10%", width: "300px", height: "300px", background: "radial-gradient(ellipse,rgba(245,158,11,0.06),transparent 60%)" }} />

      {/* Squiggle decoration */}
      <div className="absolute top-24 right-20 opacity-10 pointer-events-none hidden lg:block">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <path d="M20 60 Q40 20 60 60 Q80 100 100 60" stroke="#e8572a" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </svg>
      </div>

      <div className="max-w-3xl mx-auto text-center" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)", transition: "opacity .7s ease, transform .7s ease" }}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8" style={{ background: "rgba(232,87,42,0.1)", border: "1px solid rgba(232,87,42,0.2)", color: "#c43d0d" }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#e8572a" }} />
          Early access — join the waitlist
        </div>

        <h1 className="font-bold mb-6" style={{ fontSize: "clamp(44px,7vw,88px)", letterSpacing: "-0.04em", lineHeight: 1, color: "#1a1208" }}>
          You know what<br />
          <span style={{ color: "#e8572a" }}>to do.</span><br />
          <span style={{ color: "#78350f", opacity: 0.7 }}>So why can't you start?</span>
        </h1>

        <p className="text-lg md:text-xl mb-10 max-w-xl mx-auto" style={{ color: "#78350f", lineHeight: 1.7 }}>
          Startify gives you <strong style={{ color: "#1a1208" }}>one single action</strong> — the smallest possible step you can take right now. No plans. Just movement.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email" required placeholder="your@email.com" value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 px-4 py-3.5 rounded-xl text-sm outline-none"
              style={{ background: "white", border: "1.5px solid rgba(120,53,15,0.15)", color: "#1a1208" }}
              onFocus={e => (e.currentTarget.style.borderColor = "#e8572a")}
              onBlur={e => (e.currentTarget.style.borderColor = "rgba(120,53,15,0.15)")}
            />
            <button type="submit" className="px-6 py-3.5 rounded-xl text-sm font-bold text-white cursor-pointer transition-all"
              style={{ background: "#e8572a", boxShadow: "0 4px 20px rgba(232,87,42,0.35)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#d4450f")}
              onMouseLeave={e => (e.currentTarget.style.background = "#e8572a")}
            >
              Get early access →
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-center gap-2 py-3" style={{ color: "#16a34a" }}>
            <span>✓</span><span className="font-semibold">You&rsquo;re on the list! We&rsquo;ll be in touch.</span>
          </div>
        )}
        <p className="mt-3 text-xs" style={{ color: "rgba(120,53,15,0.5)" }}>No spam. Unsubscribe anytime.</p>

        {/* App preview card */}
        <div className="mt-16 flex justify-center">
          <WarmStepCard />
        </div>
      </div>
    </section>
  );
}

function WarmStepCard() {
  const [step, setStep] = useState(0);
  const steps = ["Open your laptop", "Open your code editor", "Create a new file", "Write the first function"];
  return (
    <div className="w-full max-w-xs text-left rounded-2xl p-6 shadow-xl" style={{ background: "white", border: "1.5px solid rgba(120,53,15,0.12)", boxShadow: "0 20px 60px rgba(120,53,15,0.12)" }}>
      <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: "1px solid rgba(120,53,15,0.08)" }}>
        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "#e8572a" }}>→</div>
        <span className="text-xs font-semibold" style={{ color: "#78350f" }}>Startify</span>
        <div className="ml-auto flex gap-1">
          {steps.map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: i <= step ? "#e8572a" : "rgba(120,53,15,0.12)" }} />)}
        </div>
      </div>
      <p className="text-xs mb-3" style={{ color: "#78350f", fontStyle: "italic" }}>
        &ldquo;Implement authentication but overwhelmed&rdquo;
      </p>
      <p className="text-xs font-bold mb-1" style={{ color: "#e8572a" }}>Step {step + 1}</p>
      <p className="text-base font-bold mb-4" style={{ color: "#1a1208", lineHeight: 1.4 }}>{steps[step]}</p>
      <div className="flex gap-2">
        <button onClick={() => { if (step < steps.length - 1) setStep(s => s + 1); }} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white cursor-pointer" style={{ background: "#e8572a" }}>✓ Done</button>
        <button className="flex-1 py-2.5 rounded-xl text-sm font-medium cursor-pointer" style={{ background: "rgba(120,53,15,0.06)", color: "#78350f", border: "1px solid rgba(120,53,15,0.1)" }}>I&rsquo;m stuck</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
//  Problem
// ─────────────────────────────────────────
function WarmProblem() {
  return (
    <section className="py-20 px-6" style={{ background: "#fdf5ec" }}>
      <div className="max-w-5xl mx-auto">
        <div className="max-w-xl mb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#e8572a" }}>Sound familiar?</p>
          <h2 className="font-bold mb-4" style={{ fontSize: "clamp(28px,4vw,44px)", letterSpacing: "-0.03em", color: "#1a1208" }}>
            Your brain knows what to do.<br /><span style={{ color: "#78350f" }}>Your hands just won&rsquo;t start.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { emoji: "🌀", title: "The research spiral", body: "Open 12 tabs. Read everything. Do nothing. It's not laziness — your brain is just stuck in preparation mode.", color: "#e8572a" },
            { emoji: "📋", title: "The perfect plan", body: "You make a beautiful plan. Color-coded. Prioritized. Then you ignore it for a week because starting still feels hard.", color: "#f59e0b" },
            { emoji: "⏳", title: "\"Tomorrow, I'll start\"", body: "You've told yourself this 47 times. The task doesn't get lighter. It just gets heavier the longer you wait.", color: "#78350f" },
          ].map((p, i) => (
            <div key={i} className="rounded-2xl p-6" style={{ background: "white", border: "1.5px solid rgba(120,53,15,0.08)", boxShadow: "0 2px 20px rgba(120,53,15,0.05)" }}>
              <div className="text-3xl mb-3">{p.emoji}</div>
              <h3 className="font-bold mb-2" style={{ color: "#1a1208" }}>{p.title}</h3>
              <p className="text-sm" style={{ color: "#78350f", lineHeight: 1.7 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
//  How it works
// ─────────────────────────────────────────
function WarmHowItWorks() {
  return (
    <section className="py-20 px-6" style={{ background: "#faf6f1", borderTop: "1px solid rgba(120,53,15,0.08)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="font-bold mb-3" style={{ fontSize: "clamp(28px,4vw,44px)", letterSpacing: "-0.03em", color: "#1a1208" }}>Three steps. That&rsquo;s all.</h2>
          <p style={{ color: "#78350f", lineHeight: 1.7 }}>No setup. No onboarding. No method selection. Just type your goal and start moving.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: "1", title: "Tell it your goal", desc: "Just type what you want to do or can't get started on. No structure required.", ex: '"I need to implement login but I keep putting it off"' },
            { n: "2", title: "Get ONE next step", desc: "Not a plan. Not a breakdown. One single physical action you can do right now.", ex: "Step 1: Open VS Code in your project folder" },
            { n: "3", title: "Do it. Repeat.", desc: "Click Done → next step. Click Stuck → it simplifies. Keep going until you have momentum.", ex: "Step 2 → Step 3 → … → You've started." },
          ].map((s, i) => (
            <div key={i} className="relative">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black mb-4" style={{ background: "#e8572a", color: "white" }}>{s.n}</div>
              <h3 className="text-lg font-bold mb-2" style={{ color: "#1a1208" }}>{s.title}</h3>
              <p className="text-sm mb-3" style={{ color: "#78350f", lineHeight: 1.7 }}>{s.desc}</p>
              <code className="text-xs block px-3 py-2 rounded-lg" style={{ background: "rgba(232,87,42,0.08)", color: "#c43d0d" }}>{s.ex}</code>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
//  Demo (simplified warm version)
// ─────────────────────────────────────────
function WarmDemo() {
  const [xp, setXp] = useState(0);
  const [step, setStep] = useState(0);
  const [streak, setStreak] = useState(0);
  const [started, setStarted] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const steps = [
    { text: "Open VS Code in your project folder", hint: "Editor first. No research yet.", tag: "SETUP", xp: 50 },
    { text: "Open terminal → npm install jsonwebtoken", hint: "One command. Done.", tag: "INSTALL", xp: 50 },
    { text: "Create: src/middleware/auth.js", hint: "Empty is fine. It just needs to exist.", tag: "CREATE", xp: 50 },
    { text: "Type: const jwt = require('jsonwebtoken')", hint: "One import. You've started the implementation.", tag: "CODE", xp: 55 },
    { text: "Write: function verifyToken(token) { return null }", hint: "Skeleton. Foundation laid.", tag: "CODE", xp: 55 },
  ];

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const handleDone = () => {
    const gained = steps[step].xp;
    const newStreak = streak + 1;
    setXp(x => x + gained);
    setStreak(newStreak);
    if (newStreak === 3) showToast("🔥 On a Roll! 3 steps straight");
    if (step < steps.length - 1) setStep(s => s + 1);
  };

  return (
    <section className="py-20 px-6" style={{ background: "white", borderTop: "1px solid rgba(120,53,15,0.08)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="font-bold mb-3" style={{ fontSize: "clamp(28px,4vw,44px)", letterSpacing: "-0.03em", color: "#1a1208" }}>Try it yourself</h2>
          <p style={{ color: "#78350f" }}>Click through the steps. Watch your XP and streak build in real time.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 items-start max-w-3xl mx-auto">
          {/* App window */}
          <div className="rounded-2xl overflow-hidden shadow-xl" style={{ border: "1.5px solid rgba(120,53,15,0.12)" }}>
            <div className="px-4 py-3 flex items-center gap-2" style={{ background: "#faf6f1", borderBottom: "1px solid rgba(120,53,15,0.08)" }}>
              <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
              <span className="mx-auto text-xs font-medium" style={{ color: "#78350f" }}>Startify</span>
            </div>
            <div className="p-5 bg-white">
              {!started ? (
                <div>
                  <p className="text-xs mb-2 font-medium" style={{ color: "#78350f" }}>Your goal</p>
                  <div className="px-4 py-3 rounded-xl text-sm mb-5" style={{ background: "#faf6f1", border: "1px solid rgba(120,53,15,0.1)", color: "#1a1208" }}>
                    &ldquo;I need to implement authentication but I feel overwhelmed&rdquo;
                  </div>
                  <button onClick={() => setStarted(true)} className="w-full py-3.5 rounded-xl text-sm font-bold text-white cursor-pointer" style={{ background: "#e8572a" }}>Start the execution loop →</button>
                </div>
              ) : (
                <div>
                  <div className="flex gap-1 mb-4">
                    {steps.map((_, i) => <div key={i} className="flex-1 h-1 rounded-full" style={{ background: i < step ? "#e8572a" : i === step ? "rgba(232,87,42,0.3)" : "rgba(120,53,15,0.08)" }} />)}
                  </div>
                  {toast && (
                    <div className="mb-3 px-3 py-2 rounded-lg text-xs font-semibold text-center" style={{ background: "rgba(232,87,42,0.1)", color: "#e8572a", animation: "fadeIn .3s ease" }}>
                      {toast}
                    </div>
                  )}
                  <span className="text-xs font-bold" style={{ color: "#e8572a" }}>Step {step + 1} · {steps[step].tag}</span>
                  <p className="text-base font-bold my-2" style={{ color: "#1a1208", lineHeight: 1.4 }}>{steps[step].text}</p>
                  <p className="text-sm mb-4" style={{ color: "#78350f" }}>{steps[step].hint}</p>
                  <div className="flex gap-2">
                    <button onClick={handleDone} className="flex-1 py-3 rounded-xl text-sm font-bold text-white cursor-pointer" style={{ background: "#e8572a" }}>
                      ✓ Done <span style={{ opacity: 0.7, fontSize: "11px" }}>+{steps[step].xp} XP</span>
                    </button>
                    <button className="flex-1 py-3 rounded-xl text-sm cursor-pointer" style={{ background: "rgba(120,53,15,0.06)", color: "#78350f", border: "1px solid rgba(120,53,15,0.1)" }}>I&rsquo;m stuck</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          {started && (
            <div className="flex flex-col gap-3">
              <div className="rounded-2xl p-4" style={{ background: "#faf6f1", border: "1px solid rgba(120,53,15,0.1)" }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#78350f" }}>Progress</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold" style={{ color: "#1a1208" }}>{xp} XP</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(232,87,42,0.1)", color: "#e8572a" }}>Starter 🌱</span>
                </div>
                <div className="h-2 rounded-full" style={{ background: "rgba(120,53,15,0.1)" }}>
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, xp)}%`, background: "linear-gradient(90deg,#e8572a,#f59e0b)" }} />
                </div>
              </div>
              <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: "#faf6f1", border: "1px solid rgba(120,53,15,0.1)" }}>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-5 h-5 rounded text-xs flex items-center justify-center" style={{ background: i < streak ? "rgba(232,87,42,0.15)" : "rgba(120,53,15,0.06)", border: `1px solid ${i < streak ? "rgba(232,87,42,0.3)" : "rgba(120,53,15,0.08)"}` }}>
                      {i < streak ? "🔥" : ""}
                    </div>
                  ))}
                </div>
                <span className="text-xs" style={{ color: streak > 0 ? "#e8572a" : "#78350f" }}>{streak > 0 ? `${streak} step streak!` : "Build your streak"}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
//  Gamification
// ─────────────────────────────────────────
function WarmGamification() {
  return (
    <section className="py-20 px-6" style={{ background: "#fdf5ec", borderTop: "1px solid rgba(120,53,15,0.08)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#e8572a" }}>Built to be addictive</p>
            <h2 className="font-bold mb-4" style={{ fontSize: "clamp(28px,4vw,44px)", letterSpacing: "-0.03em", color: "#1a1208" }}>
              Finishing tasks becomes a habit you actually <em>want</em>
            </h2>
            <p className="mb-6" style={{ color: "#78350f", lineHeight: 1.7 }}>
              Startify uses the same reward mechanisms as your favorite games — XP, streaks, and achievement badges — but channels them into real-world execution.
            </p>
            <div className="flex flex-col gap-3">
              {[
                { emoji: "⚡", text: "Earn XP for every step you complete" },
                { emoji: "🔥", text: "Streaks keep you executing every day" },
                { emoji: "🏆", text: "50+ achievement badges to unlock" },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: "white", border: "1px solid rgba(120,53,15,0.1)" }}>
                  <span className="text-xl">{f.emoji}</span>
                  <span className="text-sm font-medium" style={{ color: "#1a1208" }}>{f.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { emoji: "🚀", name: "First Move", locked: false },
              { emoji: "🔥", name: "On a Roll", locked: false },
              { emoji: "💪", name: "Overcomer", locked: false },
              { emoji: "🌊", name: "Unstoppable", locked: true },
              { emoji: "📅", name: "Week Streak", locked: true },
              { emoji: "⚡", name: "Speed Run", locked: true },
              { emoji: "🎯", name: "Deep Focus", locked: true },
              { emoji: "💯", name: "100 Steps", locked: true },
              { emoji: "🤖", name: "Machine", locked: true },
            ].map((a, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 p-3 rounded-2xl text-center transition-all" style={{ background: a.locked ? "rgba(120,53,15,0.04)" : "white", border: `1px solid ${a.locked ? "rgba(120,53,15,0.08)" : "rgba(232,87,42,0.2)"}`, opacity: a.locked ? 0.5 : 1 }}>
                <span className="text-2xl">{a.locked ? "🔒" : a.emoji}</span>
                <span className="text-xs font-semibold" style={{ color: a.locked ? "#78350f" : "#1a1208" }}>{a.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
//  Waitlist
// ─────────────────────────────────────────
function WarmWaitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent("waitlist_signup", { email, theme: "warm" });
    identifyUser(email);
    await new Promise(r => setTimeout(r, 600));
    setSubmitted(true);
  };
  return (
    <section id="warm-waitlist" className="py-24 px-6 text-center" style={{ background: "#1a1208" }}>
      <div className="max-w-xl mx-auto">
        <h2 className="font-bold mb-4" style={{ fontSize: "clamp(32px,5vw,52px)", letterSpacing: "-0.04em", color: "white" }}>
          Ready to start?
        </h2>
        <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
          Join the waitlist. We&rsquo;ll email you when Startify is ready.
        </p>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input type="email" required placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}
              className="flex-1 px-4 py-3.5 rounded-xl text-sm outline-none"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "white" }}
              onFocus={e => (e.currentTarget.style.borderColor = "#e8572a")}
              onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
            />
            <button type="submit" className="px-6 py-3.5 rounded-xl text-sm font-bold text-white cursor-pointer" style={{ background: "#e8572a" }}>
              Get early access →
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-center gap-2 py-3" style={{ color: "#4ade80" }}>
            <span>✓</span><span className="font-semibold">You&rsquo;re on the list!</span>
          </div>
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
//  Footer
// ─────────────────────────────────────────
function WarmFooter() {
  return (
    <footer className="py-8 px-6 text-center" style={{ background: "#1a1208", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
        © {new Date().getFullYear()} Startify · <em>&ldquo;Reduce thinking → reduce step size → increase action frequency.&rdquo;</em>
      </p>
    </footer>
  );
}
