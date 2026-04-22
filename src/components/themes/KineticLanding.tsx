"use client";

import { useState, useEffect } from "react";
import { trackEvent, identifyUser } from "@/lib/amplitude";

/* ── Design tokens ─────────────────────────────────────────────────────────── */
const K = {
  bg:      "#05010f",
  surface: "#0c0520",
  card:    "#120830",
  hot:     "#ff006e",
  purple:  "#8338ec",
  orange:  "#fb5607",
  neon:    "#00f5d4",
  text:    "#ffffff",
  muted:   "rgba(255,255,255,0.45)",
  dim:     "rgba(255,255,255,0.12)",
};

const GRAD  = `linear-gradient(135deg,${K.hot},${K.purple},${K.orange})`;
const GRAD2 = `linear-gradient(135deg,${K.purple},${K.neon})`;

const TICKER_ITEMS = ["XP SYSTEM", "STREAKS", "50+ ACHIEVEMENTS", "LEVEL UP", "ADAPTIVE AI", "ZERO FRICTION", "ONE STEP AT A TIME", "MOMENTUM ENGINE"];

export default function KineticLanding() {
  return (
    <div style={{ fontFamily: "var(--font-inter), sans-serif", background: K.bg, color: K.text, minHeight: "100vh", overflowX: "hidden" }}>
      <KineticStyles />
      <KineticNav />
      <KineticHero />
      <KineticProblem />
      <KineticHowItWorks />
      <KineticDemo />
      <KineticGamification />
      <KineticWaitlist />
      <KineticFooter />
    </div>
  );
}

/* ── Animations ─────────────────────────────────────────────────────────────── */
function KineticStyles() {
  return (
    <style>{`
      @keyframes k-pulse  { 0%,100%{opacity:.6} 50%{opacity:1} }
      @keyframes k-orb    { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-30px) scale(1.05)} 66%{transform:translate(-20px,20px) scale(0.95)} }
      @keyframes k-glow   { 0%,100%{box-shadow:0 0 20px rgba(255,0,110,.3)} 50%{box-shadow:0 0 50px rgba(255,0,110,.6),0 0 90px rgba(131,56,236,.3)} }
      @keyframes k-scan   { from{transform:translateY(-100%)} to{transform:translateY(200vh)} }
      @keyframes k-ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
      @keyframes k-step-in { from{opacity:0;transform:translateX(10px)} to{opacity:1;transform:none} }
      @keyframes k-xp     { 0%{opacity:1;transform:translateY(0)} 100%{opacity:0;transform:translateY(-24px)} }
      @keyframes k-complete { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }
      @keyframes k-stuck-in { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:none} }
      .k-hover-card { transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease; }
      .k-hover-card:hover { transform: translateY(-4px); }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
      }
    `}</style>
  );
}

/* ── Nav ─────────────────────────────────────────────────────────────────── */
function KineticNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(5,1,15,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid rgba(255,0,110,0.15)` : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 flex items-center justify-center flex-shrink-0 rounded-full" style={{ background: GRAD, boxShadow: `0 0 18px rgba(255,0,110,0.45)`, animation: "k-glow 3s infinite" }}>
            <span className="text-sm font-black text-white">⚡</span>
          </div>
          <span className="font-black tracking-tight" style={{ fontSize: "17px", background: GRAD, backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Startify</span>
        </div>
        <button
          onClick={() => { trackEvent("nav_cta_clicked", { theme: "kinetic" }); document.getElementById("k-waitlist")?.scrollIntoView({ behavior: "smooth" }); }}
          className="text-xs font-black px-5 rounded-full cursor-pointer transition-all uppercase tracking-widest"
          style={{ background: GRAD, color: "white", boxShadow: `0 0 20px rgba(255,0,110,0.35)`, minHeight: "44px" }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 40px rgba(255,0,110,0.6)`)}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px rgba(255,0,110,0.35)`)}
        >
          Join
        </button>
      </div>
    </nav>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────────── */
function KineticHero() {
  const [email, setEmail]       = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [vis, setVis]           = useState(false);

  useEffect(() => { setTimeout(() => setVis(true), 80); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent("hero_waitlist_submitted", { email, theme: "kinetic" });
    identifyUser(email);
    await new Promise(r => setTimeout(r, 600));
    setSubmitted(true);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: K.bg }}>
      <div className="absolute pointer-events-none" style={{ top: "15%", left: "10%", width: "min(600px,80vw)", height: "min(600px,80vw)", borderRadius: "50%", background: `radial-gradient(circle,rgba(255,0,110,0.15),transparent 65%)`, animation: "k-orb 8s ease-in-out infinite" }} />
      <div className="absolute pointer-events-none" style={{ bottom: "10%", right: "5%", width: "min(500px,70vw)", height: "min(500px,70vw)", borderRadius: "50%", background: `radial-gradient(circle,rgba(131,56,236,0.12),transparent 65%)`, animation: "k-orb 11s ease-in-out infinite reverse" }} />
      <div className="absolute pointer-events-none" style={{ top: "50%", left: "55%", width: "min(300px,50vw)", height: "min(300px,50vw)", borderRadius: "50%", background: `radial-gradient(circle,rgba(0,245,212,0.08),transparent 65%)`, animation: "k-orb 14s ease-in-out infinite" }} />
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <div className="absolute w-full h-1" style={{ background: `linear-gradient(90deg,transparent,${K.hot},transparent)`, animation: "k-scan 4s linear infinite" }} />
      </div>

      <div
        className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-16 text-center"
        style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: "opacity .7s ease, transform .7s ease" }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8" style={{ background: `rgba(255,0,110,0.1)`, border: `1px solid rgba(255,0,110,0.3)`, color: K.hot }}>
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: K.hot, animation: "k-pulse 1.5s infinite" }} />
          Early access live
        </div>

        {/* 2-line headline */}
        <h1 style={{ fontSize: "clamp(40px,9vw,108px)", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 0.92, marginBottom: "28px" }}>
          <span style={{ display: "block", background: GRAD, backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>STOP THINKING.</span>
          <span style={{ display: "block", color: K.text }}>START MOVING.</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl mb-10 max-w-xl mx-auto" style={{ color: K.muted, lineHeight: 1.6 }}>
          The AI execution system that breaks any goal into <strong style={{ color: K.text }}>one single action</strong>. No plans. No lists. <strong style={{ color: K.text }}>Just the next step — right now.</strong>
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email" required placeholder="your@email.com" value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={e => { trackEvent("hero_email_focused"); e.currentTarget.style.borderColor = K.hot; }}
              onBlur={e => (e.currentTarget.style.borderColor = K.dim)}
              className="flex-1 px-4 rounded-xl text-sm outline-none"
              style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${K.dim}`, color: K.text, height: "52px" }}
            />
            <button type="submit" className="px-6 rounded-xl text-sm font-black text-white cursor-pointer uppercase tracking-wider transition-all"
              style={{ background: GRAD, boxShadow: `0 0 30px rgba(255,0,110,0.4)`, height: "52px", flexShrink: 0 }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 50px rgba(255,0,110,0.65)`)}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 30px rgba(255,0,110,0.4)`)}>
              GO →
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-center gap-2 py-3" style={{ color: K.neon }}>
            <span>✓</span><span className="font-bold">You&rsquo;re on the list!</span>
          </div>
        )}

        {/* Ticker tape */}
        <div className="mt-14 overflow-hidden" style={{ borderTop: `1px solid ${K.dim}`, borderBottom: `1px solid ${K.dim}`, padding: "10px 0" }}>
          <div style={{ display: "flex", width: "max-content", animation: "k-ticker 20s linear infinite" }}>
            {[0, 1].map(ri => (
              <div key={ri} style={{ display: "flex", gap: "2.5rem", paddingRight: "2.5rem" }}>
                {TICKER_ITEMS.map((t, i) => (
                  <span key={i} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.7rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.12em", whiteSpace: "nowrap", color: i % 2 === 0 ? K.hot : K.purple }}>
                    ◆ {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          <KineticStepCard />
        </div>
      </div>
    </section>
  );
}

/* ── Helpers ─────────────────────────────────────────────────────────────── */
function formatTime(sec: number): string {
  if (sec < 60) return `${sec} sec`;
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return s > 0 ? `${m} min ${s} sec` : `${m} min`;
}

/* ── Step card (hero) ─────────────────────────────────────────────────────── */
const HERO_STEPS = [
  {
    text:    "Open VS Code in your project",
    stuck:   "Press ⌘+Space (Mac) or Win key (Windows), type 'VS Code', hit Enter. Don't open any file yet — just launch the app. That's the whole step.",
    time:    "~15 sec",
    seconds: 15,
  },
  {
    text:    "Run: npm install jsonwebtoken",
    stuck:   "In VS Code, press ⌃+` to open the terminal. Click inside it. Type: npm install jsonwebtoken — then hit Enter. It'll take ~10 seconds.",
    time:    "~30 sec",
    seconds: 30,
  },
  {
    text:    "Create src/middleware/auth.js",
    stuck:   "In the VS Code sidebar, right-click the src folder → New Folder → name it 'middleware'. Then right-click that folder → New File → name it 'auth.js'. Leave it empty.",
    time:    "~20 sec",
    seconds: 20,
  },
  {
    text:    "Type: const jwt = require('jsonwebtoken')",
    stuck:   "Click inside the auth.js file. You're on line 1. Type exactly: const jwt = require('jsonwebtoken') — you can copy-paste. Don't worry what it means yet.",
    time:    "~10 sec",
    seconds: 10,
  },
];

function KineticStepCard() {
  const [step, setStep]         = useState(0);
  const [xp, setXp]             = useState(0);
  const [flash, setFlash]       = useState<number | null>(null);
  const [done, setDone]         = useState(false);
  const [stuck, setStuck]       = useState(false);
  const [totalSec, setTotalSec] = useState(0);

  const handleDone = () => {
    setStuck(false);
    const gain = 50;
    setXp(x => x + gain);
    setFlash(gain);
    setTotalSec(t => t + HERO_STEPS[step].seconds);
    setTimeout(() => setFlash(null), 1200);
    if (step < HERO_STEPS.length - 1) setStep(s => s + 1);
    else setDone(true);
  };

  return (
    <div className="relative w-full text-left rounded-2xl overflow-hidden" style={{ maxWidth: "min(380px,100%)", background: K.card, border: `1px solid rgba(255,0,110,0.2)`, boxShadow: `0 0 60px rgba(255,0,110,0.08),0 30px 60px rgba(0,0,0,0.5)`, animation: "k-glow 4s infinite" }}>
      <div className="h-0.5 w-full" style={{ background: GRAD }} />
      <div className="px-4 pt-3 pb-2 flex items-center justify-between" style={{ borderBottom: `1px solid ${K.dim}` }}>
        <span className="text-xs font-black uppercase tracking-wider" style={{ color: K.hot }}>Startify</span>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-black" style={{ color: K.text }}>{xp} XP</span>
          {flash !== null && <span className="text-xs font-black" style={{ color: K.neon, animation: "k-xp .8s ease forwards" }}>+{flash}</span>}
        </div>
      </div>
      <div className="h-1" style={{ background: K.dim }}>
        <div className="h-full transition-all duration-500" style={{ width: `${Math.min(100, xp / 2)}%`, background: GRAD }} />
      </div>
      <div className="p-5">
        {done ? (
          <div className="text-center py-2" style={{ animation: "k-complete .4s ease" }}>
            <div className="text-3xl mb-2">🏆</div>
            <p className="font-black text-white mb-1">Mission Complete!</p>
            <p className="text-xs mb-0.5" style={{ color: K.neon }}>{xp} XP earned</p>
            <p className="text-xs" style={{ color: K.muted }}>Done in <span style={{ color: K.neon, fontWeight: 700 }}>{formatTime(totalSec)}</span></p>
          </div>
        ) : (
          <>
            {/* Step label + time badge */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: K.hot }}>Step {step + 1}</span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-black" style={{ background: `rgba(0,245,212,0.08)`, border: `1px solid rgba(0,245,212,0.2)`, color: K.neon }}>
                ⏱ {HERO_STEPS[step].time}
              </span>
            </div>
            <p className="text-base font-bold text-white mb-3" key={step} style={{ lineHeight: 1.4, animation: "k-step-in .3s ease" }}>
              {HERO_STEPS[step].text}
            </p>
            {/* Running total */}
            {totalSec > 0 && (
              <p className="text-xs mb-3" style={{ color: K.muted }}>
                Time so far: <span style={{ color: K.neon, fontWeight: 700 }}>{formatTime(totalSec)}</span>
              </p>
            )}
            {stuck && (
              <div className="mb-3 rounded-xl p-3.5" key={`stuck-${step}`} style={{ background: `rgba(131,56,236,0.08)`, border: `1px solid rgba(131,56,236,0.25)`, animation: "k-stuck-in .25s ease" }}>
                <p className="text-xs font-black uppercase tracking-widest mb-1.5" style={{ color: K.purple }}>How to unblock</p>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{HERO_STEPS[step].stuck}</p>
              </div>
            )}
            <div className="flex gap-2">
              <button onClick={handleDone} className="flex-1 rounded-xl text-sm font-black text-white cursor-pointer uppercase tracking-wider transition-all"
                style={{ background: GRAD, boxShadow: `0 0 20px rgba(255,0,110,0.3)`, minHeight: "48px" }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 40px rgba(255,0,110,0.5)`)}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px rgba(255,0,110,0.3)`)}>
                DONE ✓
              </button>
              <button onClick={() => setStuck(s => !s)} className="flex-1 rounded-xl text-sm font-bold cursor-pointer uppercase tracking-wider transition-all"
                style={{ background: stuck ? `rgba(131,56,236,0.15)` : K.dim, color: stuck ? K.purple : K.muted, border: `1px solid ${stuck ? "rgba(131,56,236,0.35)" : "rgba(255,255,255,0.08)"}`, minHeight: "48px" }}>
                {stuck ? "Got it" : "Stuck?"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Problem ─────────────────────────────────────────────────────────────── */
function KineticProblem() {
  const cards = [
    { n: "01", title: "The research spiral", body: "12 tabs. YouTube. Reddit. You've been preparing for hours. You haven't started.", color: K.hot,    shadow: "rgba(255,0,110,0.2)" },
    { n: "02", title: "The perfect plan",    body: "Beautiful task breakdown. Color-coded. Priority matrix. Ignored for a week.",         color: K.purple, shadow: "rgba(131,56,236,0.2)" },
    { n: "03", title: "Tomorrow mindset",   body: "You've said \"tomorrow I'll start\" 47 times. It never gets lighter. Only heavier.",  color: K.orange, shadow: "rgba(251,86,7,0.2)" },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" style={{ background: K.surface, borderTop: `1px solid ${K.dim}` }}>
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-10 sm:mb-12">
          <div className="inline-block text-xs font-black uppercase tracking-widest mb-4 px-3 py-1 rounded" style={{ background: `rgba(255,0,110,0.1)`, color: K.hot }}>The problem</div>
          <h2 style={{ fontSize: "clamp(30px,5vw,60px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05, color: K.text, marginBottom: "16px" }}>
            YOU KNOW<br />
            <span style={{ background: GRAD, backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>WHAT TO DO.</span><br />
            <span style={{ color: K.muted }}>SO WHY CAN&rsquo;T</span><br />
            <span style={{ color: K.muted }}>YOU START?</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cards.map((p, i) => (
            <div key={i} className="k-hover-card relative rounded-2xl p-6 overflow-hidden"
              style={{ background: K.card, border: `1px solid rgba(255,255,255,0.07)` }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(${p.color === K.hot ? "255,0,110" : p.color === K.purple ? "131,56,236" : "251,86,7"},0.35)`; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 50px ${p.shadow}`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
            >
              <div className="absolute top-0 left-0 w-full h-0.5" style={{ background: p.color }} />
              <div className="text-5xl font-black mb-3" style={{ color: p.color, opacity: 0.55 }}>{p.n}</div>
              <h3 className="font-black text-white mb-2 uppercase tracking-tight">{p.title}</h3>
              <p className="text-sm" style={{ color: K.muted, lineHeight: 1.7 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── How it works ─────────────────────────────────────────────────────────── */
function KineticHowItWorks() {
  const steps = [
    { n: "01", icon: "💬", title: "Drop your goal",   desc: "Type what you want to do. No structure needed. Just the problem in your head.",       color: K.hot,    shadow: "rgba(255,0,110,0.2)" },
    { n: "02", icon: "⚡", title: "Get ONE step",     desc: "Not a plan. Not a list. One immediate physical action. That's your only job.",          color: K.purple, shadow: "rgba(131,56,236,0.2)" },
    { n: "03", icon: "🔁", title: "Execute. Repeat.", desc: "Done → next step. Stuck → it simplifies. XP and streak build with every click.",        color: K.neon,   shadow: "rgba(0,245,212,0.15)" },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" style={{ background: K.bg, borderTop: `1px solid ${K.dim}` }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-14">
          <h2 style={{ fontSize: "clamp(30px,5vw,60px)", fontWeight: 900, letterSpacing: "-0.04em", color: K.text, marginBottom: "16px" }}>
            HOW IT <span style={{ background: GRAD2, backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>WORKS</span>
          </h2>
          <p style={{ color: K.muted }}>Three steps. Zero friction. Total execution.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-5 sm:gap-6">
          {steps.map((s, i) => (
            <div key={i} className="k-hover-card rounded-2xl p-6"
              style={{ background: K.card, border: `1px solid rgba(255,255,255,0.07)` }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(${s.color === K.hot ? "255,0,110" : s.color === K.purple ? "131,56,236" : "0,245,212"},0.35)`; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 50px ${s.shadow}`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{s.icon}</span>
                <span className="text-xl sm:text-2xl font-black" style={{ color: s.color, opacity: 0.7 }}>{s.n}</span>
              </div>
              <h3 className="font-black text-white mb-2 uppercase tracking-tight text-base sm:text-lg">{s.title}</h3>
              <p className="text-sm" style={{ color: K.muted, lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Demo ─────────────────────────────────────────────────────────────────── */
const DEMO_STEPS = [
  {
    text:    "Open VS Code in your project folder",
    hint:    "Editor first. No Google.",
    xp:      50,
    stuck:   "Press ⌘+Space, type 'VS Code', hit Enter. Just opening the app counts. Don't open a file yet.",
    time:    "~15 sec",
    seconds: 15,
  },
  {
    text:    "Open terminal → npm install jsonwebtoken",
    hint:    "One command. Hit enter.",
    xp:      50,
    stuck:   "In VS Code: press ⌃+` to open the terminal. Paste: npm install jsonwebtoken. Hit Enter. Done in 10 seconds.",
    time:    "~30 sec",
    seconds: 30,
  },
  {
    text:    "Create: src/middleware/auth.js",
    hint:    "Empty file. It needs to exist.",
    xp:      50,
    stuck:   "Right-click the src folder in VS Code sidebar → New Folder → 'middleware'. Then right-click it → New File → 'auth.js'. Leave it empty.",
    time:    "~20 sec",
    seconds: 20,
  },
  {
    text:    "Type: const jwt = require('jsonwebtoken')",
    hint:    "One import. You've started.",
    xp:      55,
    stuck:   "Click inside auth.js. Line 1. Copy-paste this exactly: const jwt = require('jsonwebtoken') — that's your whole step.",
    time:    "~10 sec",
    seconds: 10,
  },
  {
    text:    "Write: function verifyToken(token) { return null }",
    hint:    "Skeleton. Foundation laid.",
    xp:      55,
    stuck:   "Below the require line, type: function verifyToken(token) { return null } — it's a placeholder. It doesn't work yet. That's fine.",
    time:    "~25 sec",
    seconds: 25,
  },
];

function KineticDemo() {
  const [xp, setXp]               = useState(0);
  const [step, setStep]           = useState(0);
  const [streak, setStreak]       = useState(0);
  const [flash, setFlash]         = useState<number | null>(null);
  const [toast, setToast]         = useState<string | null>(null);
  const [started, setStarted]     = useState(false);
  const [completed, setCompleted] = useState(false);
  const [stuck, setStuck]         = useState(false);
  const [totalSec, setTotalSec]   = useState(0);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2200); };

  const handleDone = () => {
    setStuck(false);
    const gain = DEMO_STEPS[step].xp;
    const ns = streak + 1;
    setXp(x => x + gain);
    setStreak(ns);
    setFlash(gain);
    setTotalSec(t => t + DEMO_STEPS[step].seconds);
    setTimeout(() => setFlash(null), 1200);
    if (ns === 3) showToast("🔥 ON A ROLL! +50 XP BONUS");
    if (step >= DEMO_STEPS.length - 1) setCompleted(true);
    else setStep(s => s + 1);
  };

  const handleStuck = () => setStuck(s => !s);

  const achievements = [
    { emoji: "🚀", name: "First Move",   locked: xp === 0 },
    { emoji: "🔥", name: "On a Roll",    locked: streak < 3 },
    { emoji: "🌊", name: "Unstoppable",  locked: !completed },
    { emoji: "🏆", name: "Machine Mode", locked: !completed || xp < 260 },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" style={{ background: K.surface, borderTop: `1px solid ${K.dim}` }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 style={{ fontSize: "clamp(30px,5vw,52px)", fontWeight: 900, letterSpacing: "-0.04em", color: K.text, marginBottom: "12px" }}>
            FEEL THE <span style={{ background: GRAD, backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>LOOP</span>
          </h2>
          <p style={{ color: K.muted }}>Click through. Watch the XP and streak build. Feel the pull.</p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-5 sm:gap-6 max-w-4xl mx-auto">
          {/* App window */}
          <div className="w-full lg:col-span-3 order-1">
            <div className="rounded-2xl overflow-hidden" style={{ background: K.card, border: `1px solid rgba(255,0,110,0.2)`, boxShadow: `0 0 60px rgba(131,56,236,0.1)` }}>
              <div className="h-0.5" style={{ background: GRAD }} />
              <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: `1px solid ${K.dim}` }}>
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: "#ff5f57" }} />
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: "#febc2e" }} />
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: "#28c840" }} />
                <span className="mx-auto text-xs font-black uppercase tracking-widest" style={{ color: K.muted }}>Startify</span>
              </div>
              <div className="p-4 sm:p-5">
                {!started ? (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: K.muted }}>Your goal</p>
                    <div className="px-4 py-3 rounded-xl text-sm mb-5" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${K.dim}`, color: K.text, lineHeight: 1.6 }}>
                      &ldquo;I need to implement auth but I keep putting it off&rdquo;
                    </div>
                    <button onClick={() => setStarted(true)} className="w-full rounded-xl text-sm font-black text-white cursor-pointer uppercase tracking-widest"
                      style={{ background: GRAD, boxShadow: `0 0 30px rgba(255,0,110,0.35)`, minHeight: "52px" }}>
                      IGNITE →
                    </button>
                  </div>
                ) : completed ? (
                  <div className="text-center py-4" style={{ animation: "k-complete .4s ease" }}>
                    <div className="text-4xl mb-3">🏆</div>
                    <p className="font-black text-white text-lg mb-3 uppercase tracking-tight">Mission Complete!</p>
                    {/* Time highlight */}
                    <div className="rounded-xl px-4 py-3 mb-3" style={{ background: `rgba(0,245,212,0.06)`, border: `1px solid rgba(0,245,212,0.18)` }}>
                      <p className="text-xs uppercase tracking-widest font-black mb-1" style={{ color: "rgba(0,245,212,0.5)" }}>Total time</p>
                      <p className="text-2xl font-black" style={{ color: K.neon }}>{formatTime(totalSec)}</p>
                      <p className="text-xs mt-1" style={{ color: K.muted }}>Full auth middleware started.</p>
                    </div>
                    <p className="text-xs mb-4" style={{ color: K.muted }}>{xp} XP · {streak} step streak</p>
                    <button onClick={() => { setXp(0); setStep(0); setStreak(0); setStarted(false); setCompleted(false); setStuck(false); setTotalSec(0); }}
                      className="px-5 rounded-lg text-xs font-black uppercase tracking-widest cursor-pointer"
                      style={{ background: K.dim, color: K.muted, border: `1px solid rgba(255,255,255,0.08)`, minHeight: "40px" }}>
                      Try again
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black" style={{ color: K.hot }}>{xp} XP</span>
                      {flash !== null && <span className="text-xs font-black" style={{ color: K.neon, animation: "k-xp 1s ease forwards" }}>+{flash}</span>}
                    </div>
                    <div className="h-1.5 rounded-full mb-4" style={{ background: K.dim }}>
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, xp / 3)}%`, background: GRAD }} />
                    </div>
                    {toast && (
                      <div className="mb-3 px-3 py-2 rounded-lg text-xs font-black text-center uppercase tracking-wider" style={{ background: `rgba(255,0,110,0.1)`, border: `1px solid rgba(255,0,110,0.25)`, color: K.hot }}>
                        {toast}
                      </div>
                    )}
                    {/* Step label + time badge */}
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black uppercase tracking-widest" style={{ color: K.hot }}>STEP {step + 1} / {DEMO_STEPS.length}</span>
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-black" style={{ background: `rgba(0,245,212,0.08)`, border: `1px solid rgba(0,245,212,0.2)`, color: K.neon }}>
                        ⏱ {DEMO_STEPS[step].time}
                      </span>
                    </div>
                    <p key={step} className="text-base font-bold text-white mb-1" style={{ lineHeight: 1.4, animation: "k-step-in .3s ease" }}>
                      {DEMO_STEPS[step].text}
                    </p>
                    <p className="text-sm mb-2" style={{ color: K.muted }}>{DEMO_STEPS[step].hint}</p>
                    {/* Running total */}
                    {totalSec > 0 && (
                      <p className="text-xs mb-3" style={{ color: K.muted }}>
                        Time so far: <span style={{ color: K.neon, fontWeight: 700 }}>{formatTime(totalSec)}</span>
                        <span style={{ color: "rgba(255,255,255,0.25)", marginLeft: "6px" }}>· that&rsquo;s nothing</span>
                      </p>
                    )}

                    {/* Stuck panel */}
                    {stuck && (
                      <div key={`stuck-${step}`} className="mb-3 rounded-xl p-3.5" style={{ background: `rgba(131,56,236,0.08)`, border: `1px solid rgba(131,56,236,0.25)`, animation: "k-stuck-in .25s ease" }}>
                        <p className="text-xs font-black uppercase tracking-widest mb-1.5" style={{ color: K.purple }}>How to unblock</p>
                        <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>{DEMO_STEPS[step].stuck}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button onClick={handleDone} className="flex-1 rounded-xl text-sm font-black text-white cursor-pointer uppercase tracking-wider transition-all"
                        style={{ background: GRAD, boxShadow: `0 0 20px rgba(255,0,110,0.3)`, minHeight: "48px" }}
                        onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 40px rgba(255,0,110,0.5)`)}
                        onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px rgba(255,0,110,0.3)`)}>
                        DONE +{DEMO_STEPS[step].xp}XP
                      </button>
                      <button onClick={handleStuck} className="flex-1 rounded-xl text-sm font-bold cursor-pointer uppercase tracking-wider transition-all"
                        style={{ background: stuck ? `rgba(131,56,236,0.15)` : K.dim, color: stuck ? K.purple : K.muted, border: `1px solid ${stuck ? "rgba(131,56,236,0.35)" : "rgba(255,255,255,0.08)"}`, minHeight: "48px" }}>
                        {stuck ? "Got it" : "Stuck?"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats panel */}
          <div className="w-full lg:col-span-2 order-2 flex flex-row lg:flex-col gap-3">
            {/* Time invested */}
            <div className="rounded-2xl p-4" style={{ background: K.card, border: `1px solid rgba(0,245,212,0.15)` }}>
              <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: "rgba(0,245,212,0.5)" }}>Time invested</p>
              <p className="text-xl font-black" style={{ color: totalSec > 0 ? K.neon : K.dim }}>
                {totalSec > 0 ? formatTime(totalSec) : "0 sec"}
              </p>
              <p className="text-xs mt-1" style={{ color: K.muted }}>
                {totalSec === 0
                  ? "click done to start"
                  : totalSec < 60
                  ? "under a minute in ✓"
                  : "keeping momentum ✓"}
              </p>
            </div>
            <div className="flex-1 rounded-2xl p-4" style={{ background: K.card, border: `1px solid ${K.dim}` }}>
              <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: K.muted }}>Streak</p>
              <div className="flex gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex-1 rounded-lg flex items-center justify-center text-sm transition-all duration-300"
                    style={{ height: "32px", background: i < streak ? `rgba(255,0,110,0.2)` : K.dim, border: `1px solid ${i < streak ? "rgba(255,0,110,0.4)" : "rgba(255,255,255,0.06)"}` }}>
                    {i < streak ? "🔥" : ""}
                  </div>
                ))}
              </div>
              {streak > 0 && <p className="text-xs font-black mt-2" style={{ color: K.hot }}>🔥 {streak} STEP STREAK</p>}
            </div>
            <div className="flex-1 rounded-2xl p-4" style={{ background: K.card, border: `1px solid ${K.dim}` }}>
              <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: K.muted }}>Achievements</p>
              {achievements.map((a, i) => (
                <div key={i} className="flex items-center gap-2 mb-2 transition-all duration-300" style={{ opacity: a.locked ? 0.3 : 1 }}>
                  <span>{a.locked ? "🔒" : a.emoji}</span>
                  <span className="text-xs font-bold" style={{ color: a.locked ? K.muted : K.text }}>{a.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Momentum / Gamification ──────────────────────────────────────────────── */
function KineticGamification() {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-hidden" style={{ background: K.bg, borderTop: `1px solid ${K.dim}` }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div className="text-xs font-black uppercase tracking-widest mb-4 px-3 py-1.5 inline-block rounded" style={{ background: `rgba(0,245,212,0.08)`, color: K.neon }}>
              Built for momentum
            </div>
            <h2 style={{ fontSize: "clamp(30px,5vw,56px)", fontWeight: 900, letterSpacing: "-0.04em", color: K.text, marginBottom: "16px", lineHeight: 1.0 }}>
              EVERY STEP<br />
              <span style={{ background: GRAD, backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>BUILDS ON</span><br />
              THE LAST.
            </h2>
            <p className="mb-6 text-base sm:text-lg" style={{ color: K.muted, lineHeight: 1.7 }}>
              Small wins stack up. Streak tracking turns consistency into a habit. Achievements mark real progress milestones — the kind you can actually feel. The system is designed to make starting feel easier than stopping.
            </p>
            <div className="flex flex-col gap-2.5">
              {[
                "XP for every step completed",
                "Streak tracking builds a daily rhythm",
                "50+ achievement badges at key milestones",
                "Level up: Starter → Moving → In Flow → Machine",
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-3 text-sm" style={{ color: K.muted }}>
                  <span style={{ color: K.neon, fontWeight: 900, flexShrink: 0, marginTop: "1px" }}>→</span>
                  {f}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="rounded-2xl p-5 sm:p-6" style={{ background: K.card, border: `1px solid rgba(0,245,212,0.12)` }}>
              <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: K.muted }}>The execution loop</p>
              <div className="flex flex-col gap-1">
                {[
                  { icon: "💭", text: "You have a goal",         c: K.muted   },
                  { icon: "⚡", text: "One micro-action",        c: K.purple  },
                  { icon: "✓",  text: "Done → +XP",              c: K.neon    },
                  { icon: "🔥", text: "Streak grows",             c: "#fbbf24" },
                  { icon: "🏆", text: "Achievement unlocked",     c: K.orange  },
                  { icon: "🚀", text: "Next step is ready",       c: K.hot     },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
                      style={{ background: `rgba(${i === 5 ? "255,0,110" : "255,255,255"},0.04)`, border: `1px solid rgba(${i === 5 ? "255,0,110" : "255,255,255"},0.06)` }}>
                      <span className="text-lg w-6 text-center flex-shrink-0">{s.icon}</span>
                      <span className="text-sm font-bold" style={{ color: s.c }}>{s.text}</span>
                    </div>
                    {i < 5 && <div className="text-center text-xs opacity-25 leading-none">↓</div>}
                  </div>
                ))}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 h-px" style={{ background: `rgba(0,245,212,0.2)` }} />
                  <span className="text-xs font-bold" style={{ color: K.neon }}>keeps going</span>
                  <div className="flex-1 h-px" style={{ background: `rgba(0,245,212,0.2)` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Waitlist ─────────────────────────────────────────────────────────────── */
function KineticWaitlist() {
  const [email, setEmail]         = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent("waitlist_signup", { email, source: "waitlist_section", timestamp: Date.now(), theme: "kinetic" });
    identifyUser(email);
    await new Promise(r => setTimeout(r, 600));
    setSubmitted(true);
  };

  return (
    <section id="k-waitlist" className="relative py-24 sm:py-28 px-4 sm:px-6 text-center overflow-hidden" style={{ background: K.surface, borderTop: `1px solid ${K.dim}` }}>
      <div className="absolute pointer-events-none" style={{ top: "10%", left: "50%", transform: "translateX(-50%)", width: "min(500px,100vw)", height: "min(500px,100vw)", borderRadius: "50%", background: `radial-gradient(circle,rgba(255,0,110,0.1),transparent 60%)`, animation: "k-orb 7s infinite" }} />
      <div className="relative z-10 max-w-lg mx-auto">
        <h2 style={{ fontSize: "clamp(36px,7vw,80px)", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 0.9, marginBottom: "20px" }}>
          <span style={{ display: "block", color: K.text }}>READY</span>
          <span style={{ display: "block", background: GRAD, backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>TO GO?</span>
        </h2>
        <p className="text-base sm:text-lg mb-8" style={{ color: K.muted }}>Get early access. One email. No spam.</p>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input type="email" required placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}
              onFocus={e => { trackEvent("waitlist_email_focused"); e.currentTarget.style.borderColor = K.hot; }}
              onBlur={e => (e.currentTarget.style.borderColor = K.dim)}
              className="flex-1 px-4 rounded-xl text-sm outline-none"
              style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${K.dim}`, color: K.text, height: "52px" }}
            />
            <button type="submit" className="px-6 rounded-xl text-sm font-black text-white cursor-pointer uppercase tracking-widest transition-all"
              style={{ background: GRAD, boxShadow: `0 0 30px rgba(255,0,110,0.4)`, height: "52px", flexShrink: 0 }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 50px rgba(255,0,110,0.65)`)}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 30px rgba(255,0,110,0.4)`)}>
              GO →
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-center gap-2 py-3" style={{ color: K.neon }}>
            <span>✓</span><span className="font-bold">You&rsquo;re in. We&rsquo;ll be in touch.</span>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Footer ───────────────────────────────────────────────────────────────── */
const CONTACT_EMAIL = "y.arutiunofff@gmail.com";

function KineticFooter() {
  const [showContact, setShowContact] = useState(false);
  const [copied, setCopied]           = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <>
      {showContact && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(10px)" }}
          onClick={() => setShowContact(false)}>
          <div className="relative w-full rounded-2xl p-6 text-left"
            style={{ maxWidth: "400px", background: K.card, border: `1px solid rgba(255,0,110,0.25)`, boxShadow: `0 0 80px rgba(255,0,110,0.12),0 40px 80px rgba(0,0,0,0.6)` }}
            onClick={e => e.stopPropagation()}>
            <div className="absolute top-0 left-0 w-full h-0.5 rounded-t-2xl" style={{ background: GRAD }} />
            <button onClick={() => setShowContact(false)}
              className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full text-xs font-black cursor-pointer transition-all"
              style={{ background: K.dim, color: K.muted }}
              onMouseEnter={e => (e.currentTarget.style.color = K.text)}
              onMouseLeave={e => (e.currentTarget.style.color = K.muted)}>
              ✕
            </button>
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: K.hot }}>Contact</p>
            <p className="font-black text-white text-lg mb-1 uppercase tracking-tight">Say hello.</p>
            <p className="text-sm mb-5" style={{ color: K.muted, lineHeight: 1.6 }}>Got a question or feedback? Copy the email below.</p>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-3" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${K.dim}` }}>
              <span className="flex-1 text-sm font-bold text-white select-all">{CONTACT_EMAIL}</span>
            </div>
            <button onClick={copyEmail} className="w-full rounded-xl text-sm font-black uppercase tracking-widest cursor-pointer transition-all"
              style={{ background: copied ? GRAD2 : GRAD, boxShadow: copied ? `0 0 30px rgba(0,245,212,0.3)` : `0 0 30px rgba(255,0,110,0.35)`, minHeight: "52px", color: "white" }}>
              {copied ? "✓ COPIED TO CLIPBOARD" : "COPY EMAIL"}
            </button>
          </div>
        </div>
      )}

      <footer className="py-8 px-4 sm:px-6" style={{ background: K.bg, borderTop: `1px solid ${K.dim}` }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>
            © {new Date().getFullYear()} Startify · Stop thinking. Start moving.
          </p>
          <div className="flex items-center gap-5">
            {[{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }].map(link => (
              <a key={link.label} href={link.href}
                onClick={() => trackEvent("footer_link_clicked", { link: link.label.toLowerCase() })}
                className="text-xs font-bold uppercase tracking-wider transition-colors"
                style={{ color: "rgba(255,255,255,0.2)" }}
                onMouseEnter={e => (e.currentTarget.style.color = K.hot)}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}>
                {link.label}
              </a>
            ))}
            <button onClick={() => { trackEvent("footer_link_clicked", { link: "contact" }); setShowContact(true); }}
              className="text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors bg-transparent border-0 p-0"
              style={{ color: "rgba(255,255,255,0.2)" }}
              onMouseEnter={e => (e.currentTarget.style.color = K.hot)}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}>
              Contact
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
