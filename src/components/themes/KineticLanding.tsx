"use client";

import { useState, useEffect } from "react";
import { trackEvent, identifyUser } from "@/lib/amplitude";

/* ── Design tokens ─────────────────────────────────────────────────────────── */
const K = {
  bg:       "#05010f",
  surface:  "#0c0520",
  card:     "#120830",
  hot:      "#ff006e",
  purple:   "#8338ec",
  orange:   "#fb5607",
  neon:     "#00f5d4",
  text:     "#ffffff",
  muted:    "rgba(255,255,255,0.45)",
  dim:      "rgba(255,255,255,0.12)",
};

/* ── Shared gradient ─── */
const GRAD = `linear-gradient(135deg,${K.hot},${K.purple},${K.orange})`;
const GRAD2 = `linear-gradient(135deg,${K.purple},${K.neon})`;

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

/* ── Inline CSS animations ───────────────────────────────────────────────── */
function KineticStyles() {
  return (
    <style>{`
      @keyframes k-pulse { 0%,100%{opacity:.6} 50%{opacity:1} }
      @keyframes k-orb { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-30px) scale(1.05)} 66%{transform:translate(-20px,20px) scale(0.95)} }
      @keyframes k-slide-up { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:none} }
      @keyframes k-glow { 0%,100%{box-shadow:0 0 20px rgba(255,0,110,.3)} 50%{box-shadow:0 0 50px rgba(255,0,110,.6),0 0 90px rgba(131,56,236,.3)} }
      @keyframes k-scan { from{transform:translateY(-100%)} to{transform:translateY(200%)} }
      @keyframes k-ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
      @keyframes k-step-in { from{opacity:0;transform:translateX(12px)} to{opacity:1;transform:none} }
      @keyframes k-xp { 0%{opacity:1;transform:translateY(0)} 100%{opacity:0;transform:translateY(-20px)} }
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
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ background: scrolled ? "rgba(5,1,15,0.9)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? `1px solid rgba(255,0,110,0.15)` : "1px solid transparent" }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative w-7 h-7 flex items-center justify-center" style={{ animation: "k-glow 3s infinite" }}>
            <div className="absolute inset-0 rounded-full" style={{ background: GRAD, opacity: 0.25 }} />
            <span className="relative text-xs font-black" style={{ color: K.hot }}>⚡</span>
          </div>
          <span className="font-black text-sm tracking-tight">Startify</span>
        </div>
        <button
          onClick={() => { trackEvent("nav_cta_clicked", { theme: "kinetic" }); document.getElementById("k-waitlist")?.scrollIntoView({ behavior: "smooth" }); }}
          className="text-xs font-black px-5 py-2 rounded-full cursor-pointer transition-all uppercase tracking-widest"
          style={{ background: GRAD, color: "white", boxShadow: `0 0 20px rgba(255,0,110,0.35)` }}
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
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [vis, setVis] = useState(false);
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
      {/* Animated gradient orbs */}
      <div className="absolute pointer-events-none" style={{ top: "15%", left: "15%", width: "600px", height: "600px", borderRadius: "50%", background: `radial-gradient(circle, rgba(255,0,110,0.15), transparent 65%)`, animation: "k-orb 8s ease-in-out infinite" }} />
      <div className="absolute pointer-events-none" style={{ bottom: "10%", right: "10%", width: "500px", height: "500px", borderRadius: "50%", background: `radial-gradient(circle, rgba(131,56,236,0.12), transparent 65%)`, animation: "k-orb 11s ease-in-out infinite reverse" }} />
      <div className="absolute pointer-events-none" style={{ top: "50%", left: "60%", width: "300px", height: "300px", borderRadius: "50%", background: `radial-gradient(circle, rgba(0,245,212,0.08), transparent 65%)`, animation: "k-orb 14s ease-in-out infinite" }} />

      {/* Scan line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <div className="absolute w-full h-1" style={{ background: `linear-gradient(90deg,transparent,${K.hot},transparent)`, animation: "k-scan 4s linear infinite" }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-16 text-center" style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: "opacity .7s ease, transform .7s ease" }}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
          style={{ background: `rgba(255,0,110,0.1)`, border: `1px solid rgba(255,0,110,0.3)`, color: K.hot }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: K.hot, animation: "k-pulse 1.5s infinite" }} />
          Early access live
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: "clamp(52px,9vw,108px)", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 0.9, marginBottom: "28px" }}>
          <span style={{ display: "block", color: K.text }}>STOP</span>
          <span style={{ display: "block", background: GRAD, backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>THINKING.</span>
          <span style={{ display: "block", color: K.text }}>START</span>
          <span style={{ display: "block", background: GRAD2, backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>MOVING.</span>
        </h1>

        <p className="text-lg md:text-xl mb-10 max-w-xl mx-auto" style={{ color: K.muted, lineHeight: 1.6 }}>
          The AI execution system that breaks any goal into <strong style={{ color: K.text }}>one single action</strong>. No plans. No lists. Just the next step — right now.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" required placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}
              className="flex-1 px-4 py-3.5 rounded-xl text-sm outline-none"
              style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${K.dim}`, color: K.text }}
              onFocus={e => (e.currentTarget.style.borderColor = K.hot)}
              onBlur={e => (e.currentTarget.style.borderColor = K.dim)}
            />
            <button type="submit" className="px-6 py-3.5 rounded-xl text-sm font-black text-white cursor-pointer uppercase tracking-wider transition-all"
              style={{ background: GRAD, boxShadow: `0 0 30px rgba(255,0,110,0.4)` }}
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
          <div className="flex gap-8 whitespace-nowrap" style={{ animation: "k-ticker 18s linear infinite" }}>
            {[...Array(2)].map((_, ri) => (
              <span key={ri} className="flex gap-8">
                {["XP SYSTEM", "STREAKS", "50+ ACHIEVEMENTS", "LEVEL UP", "ADAPTIVE AI", "ZERO FRICTION", "ONE STEP AT A TIME", "MOMENTUM ENGINE"].map((t, i) => (
                  <span key={i} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest" style={{ color: i % 2 === 0 ? K.hot : K.purple }}>
                    ◆ {t}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* Hero step card */}
        <div className="mt-14 flex justify-center">
          <KineticStepCard />
        </div>
      </div>
    </section>
  );
}

function KineticStepCard() {
  const [step, setStep] = useState(0);
  const [xp, setXp] = useState(0);
  const [flash, setFlash] = useState<number | null>(null);
  const steps = ["Open VS Code in your project", "Run: npm install jsonwebtoken", "Create src/middleware/auth.js", "Type: const jwt = require('jsonwebtoken')"];
  const handleDone = () => {
    const gain = 50;
    setXp(x => x + gain);
    setFlash(gain);
    setTimeout(() => setFlash(null), 1200);
    if (step < steps.length - 1) setStep(s => s + 1);
  };
  return (
    <div className="relative w-full max-w-sm text-left rounded-2xl overflow-hidden" style={{ background: K.card, border: `1px solid rgba(255,0,110,0.2)`, boxShadow: `0 0 60px rgba(255,0,110,0.08), 0 30px 60px rgba(0,0,0,0.5)`, animation: "k-glow 4s infinite" }}>
      {/* Gradient top strip */}
      <div className="h-0.5 w-full" style={{ background: GRAD }} />
      {/* XP bar */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between" style={{ borderBottom: `1px solid ${K.dim}` }}>
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider" style={{ color: K.hot }}>Startify</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-black" style={{ color: K.text }}>{xp} XP</span>
          {flash && <span className="text-xs font-black" style={{ color: K.neon, animation: "k-xp .8s ease forwards" }}>+{flash}</span>}
        </div>
      </div>
      <div className="h-1" style={{ background: K.dim }}>
        <div className="h-full transition-all duration-500" style={{ width: `${Math.min(100, xp / 2)}%`, background: GRAD }} />
      </div>
      <div className="p-5">
        <div className="text-xs font-black mb-1 uppercase tracking-widest" style={{ color: K.hot }}>Step {step + 1}</div>
        <p className="text-base font-bold text-white mb-4" style={{ lineHeight: 1.4, animation: "k-step-in .3s ease" }} key={step}>{steps[step]}</p>
        <div className="flex gap-2">
          <button onClick={handleDone} className="flex-1 py-3 rounded-xl text-sm font-black text-white cursor-pointer uppercase tracking-wider transition-all" style={{ background: GRAD, boxShadow: `0 0 20px rgba(255,0,110,0.3)` }} onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 40px rgba(255,0,110,0.5)`)} onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px rgba(255,0,110,0.3)`)}>
            DONE ✓
          </button>
          <button className="flex-1 py-3 rounded-xl text-sm font-bold cursor-pointer uppercase tracking-wider" style={{ background: K.dim, color: K.muted, border: `1px solid rgba(255,255,255,0.08)` }}>
            Stuck
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Problem ─────────────────────────────────────────────────────────────── */
function KineticProblem() {
  return (
    <section className="py-20 px-6" style={{ background: K.surface, borderTop: `1px solid ${K.dim}` }}>
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-12">
          <div className="inline-block text-xs font-black uppercase tracking-widest mb-4 px-3 py-1 rounded" style={{ background: `rgba(255,0,110,0.1)`, color: K.hot }}>The problem</div>
          <h2 style={{ fontSize: "clamp(32px,5vw,60px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1, color: K.text, marginBottom: "16px" }}>
            YOU KNOW<br /><span style={{ background: GRAD, backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>WHAT TO DO.</span><br />
            <span style={{ color: K.muted }}>SO WHY CAN'T</span><br />
            <span style={{ color: K.muted }}>YOU START?</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { n: "01", title: "The research spiral", body: "12 tabs. YouTube. Reddit. You've been preparing for hours. You haven't started.", color: K.hot },
            { n: "02", title: "The perfect plan", body: "Beautiful task breakdown. Color-coded. Priority matrix. Ignored for a week.", color: K.purple },
            { n: "03", title: "Tomorrow mindset", body: "You've said \"tomorrow I'll start\" 47 times. It never gets lighter. Only heavier.", color: K.orange },
          ].map((p, i) => (
            <div key={i} className="relative rounded-2xl p-6 overflow-hidden" style={{ background: K.card, border: `1px solid rgba(255,255,255,0.06)` }}>
              <div className="absolute top-0 left-0 w-full h-0.5" style={{ background: p.color }} />
              <div className="text-5xl font-black mb-3 opacity-20" style={{ color: p.color }}>{p.n}</div>
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
  return (
    <section className="py-20 px-6" style={{ background: K.bg, borderTop: `1px solid ${K.dim}` }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 style={{ fontSize: "clamp(32px,5vw,60px)", fontWeight: 900, letterSpacing: "-0.04em", color: K.text, marginBottom: "16px" }}>
            HOW IT <span style={{ background: GRAD2, backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>WORKS</span>
          </h2>
          <p style={{ color: K.muted }}>Three steps. Zero friction. Total execution.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n: "01", icon: "💬", title: "Drop your goal", desc: "Type what you want to do. No structure needed. Just the problem in your head.", color: K.hot },
            { n: "02", icon: "⚡", title: "Get ONE step", desc: "Not a plan. Not a list. One immediate physical action. That's your only job.", color: K.purple },
            { n: "03", icon: "🔁", title: "Execute. Repeat.", desc: "Done → next step. Stuck → it simplifies. XP and streak build with every click.", color: K.neon },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl p-6" style={{ background: K.card, border: `1px solid rgba(255,255,255,0.06)` }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{s.icon}</span>
                <span className="text-2xl font-black opacity-30" style={{ color: s.color }}>{s.n}</span>
              </div>
              <h3 className="font-black text-white mb-2 uppercase tracking-tight text-lg">{s.title}</h3>
              <p className="text-sm" style={{ color: K.muted, lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Demo ─────────────────────────────────────────────────────────────────── */
function KineticDemo() {
  const [xp, setXp] = useState(0);
  const [step, setStep] = useState(0);
  const [streak, setStreak] = useState(0);
  const [flash, setFlash] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  const steps = [
    { text: "Open VS Code in your project folder", hint: "Editor first. No Google.", xp: 50 },
    { text: "Open terminal → npm install jsonwebtoken", hint: "One command. Hit enter.", xp: 50 },
    { text: "Create: src/middleware/auth.js", hint: "Empty file. It needs to exist.", xp: 50 },
    { text: "Type: const jwt = require('jsonwebtoken')", hint: "One import. You've started.", xp: 55 },
    { text: "Write: function verifyToken(token) { return null }", hint: "Skeleton. Foundation laid.", xp: 55 },
  ];

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2000); };

  const handleDone = () => {
    const gain = steps[step].xp;
    const ns = streak + 1;
    setXp(x => x + gain);
    setStreak(ns);
    setFlash(gain);
    setTimeout(() => setFlash(null), 1200);
    if (ns === 3) showToast("🔥 ON A ROLL! +50 XP BONUS");
    if (step < steps.length - 1) setStep(s => s + 1);
  };

  return (
    <section className="py-20 px-6" style={{ background: K.surface, borderTop: `1px solid ${K.dim}` }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 900, letterSpacing: "-0.04em", color: K.text, marginBottom: "12px" }}>
            FEEL THE <span style={{ background: GRAD, backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>LOOP</span>
          </h2>
          <p style={{ color: K.muted }}>Click through. Watch the XP and streak build. Feel the pull.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 max-w-4xl mx-auto">
          {/* App */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl overflow-hidden" style={{ background: K.card, border: `1px solid rgba(255,0,110,0.2)`, boxShadow: `0 0 60px rgba(131,56,236,0.1)` }}>
              <div className="h-0.5" style={{ background: GRAD }} />
              <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: `1px solid ${K.dim}` }}>
                <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
                <span className="mx-auto text-xs font-black uppercase tracking-widest" style={{ color: K.muted }}>Startify</span>
              </div>
              <div className="p-5">
                {!started ? (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: K.muted }}>Your goal</p>
                    <div className="px-4 py-3 rounded-xl text-sm mb-5" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${K.dim}`, color: K.text, lineHeight: 1.6 }}>
                      &ldquo;I need to implement auth but I keep putting it off&rdquo;
                    </div>
                    <button onClick={() => setStarted(true)} className="w-full py-3.5 rounded-xl text-sm font-black text-white cursor-pointer uppercase tracking-widest"
                      style={{ background: GRAD, boxShadow: `0 0 30px rgba(255,0,110,0.35)` }}>
                      IGNITE →
                    </button>
                  </div>
                ) : (
                  <div>
                    {/* XP bar */}
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black" style={{ color: K.hot }}>{xp} XP</span>
                      {flash && <span className="text-xs font-black" style={{ color: K.neon, animation: "k-xp 1s ease forwards" }}>+{flash}</span>}
                    </div>
                    <div className="h-1.5 rounded-full mb-4" style={{ background: K.dim }}>
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, xp / 3)}%`, background: GRAD }} />
                    </div>
                    {toast && (
                      <div className="mb-3 px-3 py-2 rounded-lg text-xs font-black text-center uppercase tracking-wider" style={{ background: `rgba(255,0,110,0.1)`, border: `1px solid rgba(255,0,110,0.25)`, color: K.hot }}>
                        {toast}
                      </div>
                    )}
                    <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: K.hot }}>STEP {step + 1}</div>
                    <p key={step} className="text-base font-bold text-white mb-2" style={{ lineHeight: 1.4, animation: "k-step-in .3s ease" }}>{steps[step].text}</p>
                    <p className="text-sm mb-4" style={{ color: K.muted }}>{steps[step].hint}</p>
                    <div className="flex gap-2">
                      <button onClick={handleDone} className="flex-1 py-3 rounded-xl text-sm font-black text-white cursor-pointer uppercase tracking-wider transition-all"
                        style={{ background: GRAD, boxShadow: `0 0 20px rgba(255,0,110,0.3)` }}
                        onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 40px rgba(255,0,110,0.5)`)}
                        onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px rgba(255,0,110,0.3)`)}>
                        DONE +{steps[step].xp}XP
                      </button>
                      <button className="flex-1 py-3 rounded-xl text-sm font-bold cursor-pointer uppercase" style={{ background: K.dim, color: K.muted }}>
                        STUCK
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <div className="rounded-2xl p-4" style={{ background: K.card, border: `1px solid ${K.dim}` }}>
              <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: K.muted }}>Your streak</p>
              <div className="flex gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex-1 h-8 rounded-lg flex items-center justify-center text-sm transition-all duration-300"
                    style={{ background: i < streak ? `rgba(255,0,110,0.2)` : K.dim, border: `1px solid ${i < streak ? "rgba(255,0,110,0.4)" : "rgba(255,255,255,0.06)"}` }}>
                    {i < streak ? "🔥" : ""}
                  </div>
                ))}
              </div>
              {streak > 0 && <p className="text-xs font-black mt-2" style={{ color: K.hot }}>🔥 {streak} STEP STREAK</p>}
            </div>
            <div className="rounded-2xl p-4 flex-1" style={{ background: K.card, border: `1px solid ${K.dim}` }}>
              <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: K.muted }}>Achievements</p>
              {[
                { emoji: "🚀", name: "First Move", locked: false },
                { emoji: "🔥", name: "On a Roll", locked: streak < 3 },
                { emoji: "🌊", name: "Unstoppable", locked: true },
                { emoji: "🏆", name: "Machine Mode", locked: true },
              ].map((a, i) => (
                <div key={i} className="flex items-center gap-2 mb-2" style={{ opacity: a.locked ? 0.35 : 1 }}>
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

/* ── Gamification ─────────────────────────────────────────────────────────── */
function KineticGamification() {
  return (
    <section className="py-20 px-6" style={{ background: K.bg, borderTop: `1px solid ${K.dim}` }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs font-black uppercase tracking-widest mb-4 px-3 py-1 inline-block rounded" style={{ background: `rgba(251,86,7,0.1)`, color: K.orange }}>Addiction by design</div>
            <h2 style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 900, letterSpacing: "-0.04em", color: K.text, marginBottom: "16px", lineHeight: 1 }}>
              EXECUTION<br />
              <span style={{ background: GRAD, backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>BECOMES A</span><br />
              HIGH.
            </h2>
            <p className="mb-6 text-lg" style={{ color: K.muted, lineHeight: 1.7 }}>
              Every completed step triggers a dopamine hit. Streaks create daily pull. Achievements unlock unexpectedly — the same variable reward mechanism that makes games impossible to quit.
            </p>
            <div className="flex flex-col gap-2">
              {["XP for every step completed", "Streaks reset if you skip a day", "50+ achievement badges with surprise unlocks", "Level up: Starter → Moving → In Flow → Machine"].map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-sm" style={{ color: K.muted }}>
                  <span style={{ color: K.hot, fontWeight: 900 }}>→</span> {f}
                </div>
              ))}
            </div>
          </div>
          <div>
            {/* Addiction loop */}
            <div className="rounded-2xl p-6" style={{ background: K.card, border: `1px solid rgba(255,0,110,0.15)` }}>
              <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: K.muted }}>The execution addiction loop</p>
              <div className="flex flex-col gap-1">
                {[
                  { icon: "💭", text: "You have a goal",     c: K.muted  },
                  { icon: "⚡", text: "One micro-action",    c: K.purple },
                  { icon: "✓",  text: "Done → +XP",          c: K.neon   },
                  { icon: "🔥", text: "Streak grows",         c: "#fbbf24" },
                  { icon: "🏆", text: "Achievement unlocks",  c: K.orange },
                  { icon: "🔁", text: "You crave one more",   c: K.hot    },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl" style={{ background: `rgba(${i === 5 ? "255,0,110" : "255,255,255"},0.04)`, border: `1px solid rgba(${i === 5 ? "255,0,110" : "255,255,255"},0.06)` }}>
                      <span className="text-lg w-6 text-center">{s.icon}</span>
                      <span className="text-sm font-bold" style={{ color: s.c }}>{s.text}</span>
                    </div>
                    {i < 5 && <div className="text-center text-xs opacity-25">↓</div>}
                  </div>
                ))}
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-px" style={{ background: `rgba(255,0,110,0.2)` }} />
                  <span className="text-xs font-bold" style={{ color: K.hot }}>loops forever</span>
                  <div className="flex-1 h-px" style={{ background: `rgba(255,0,110,0.2)` }} />
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
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent("waitlist_signup", { email, theme: "kinetic" });
    identifyUser(email);
    await new Promise(r => setTimeout(r, 600));
    setSubmitted(true);
  };
  return (
    <section id="k-waitlist" className="relative py-28 px-6 text-center overflow-hidden" style={{ background: K.surface }}>
      <div className="absolute pointer-events-none inset-0">
        <div className="absolute" style={{ top: "20%", left: "30%", width: "400px", height: "400px", borderRadius: "50%", background: `radial-gradient(circle,rgba(255,0,110,0.1),transparent 60%)`, animation: "k-orb 7s infinite" }} />
      </div>
      <div className="relative z-10 max-w-xl mx-auto">
        <h2 style={{ fontSize: "clamp(40px,7vw,80px)", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 0.9, marginBottom: "20px" }}>
          <span style={{ display: "block", color: K.text }}>READY</span>
          <span style={{ display: "block", background: GRAD, backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>TO GO?</span>
        </h2>
        <p className="text-lg mb-8" style={{ color: K.muted }}>Get early access. One email. No spam.</p>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input type="email" required placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}
              className="flex-1 px-4 py-3.5 rounded-xl text-sm outline-none"
              style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${K.dim}`, color: K.text }}
              onFocus={e => (e.currentTarget.style.borderColor = K.hot)}
              onBlur={e => (e.currentTarget.style.borderColor = K.dim)}
            />
            <button type="submit" className="px-6 py-3.5 rounded-xl text-sm font-black text-white cursor-pointer uppercase tracking-widest transition-all"
              style={{ background: GRAD, boxShadow: `0 0 30px rgba(255,0,110,0.4)` }}
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
function KineticFooter() {
  return (
    <footer className="py-8 px-6 text-center" style={{ background: K.bg, borderTop: `1px solid ${K.dim}` }}>
      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>
        © {new Date().getFullYear()} Startify · Stop thinking. Start moving.
      </p>
    </footer>
  );
}
