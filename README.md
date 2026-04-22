# Startify — Landing Page

AI execution companion that breaks any goal into one single micro-action. Landing page for hypothesis validation.

---

## Quick start

```bash
cp .env.local.example .env.local
# fill in your Amplitude API key
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Theme variants

| URL | Theme |
|-----|-------|
| `/` | Dark — modern dark SaaS (purple/indigo) |
| `/theme/warm` | Warm — cream, earthy, human, coach-like |
| `/theme/kinetic` | Kinetic — neon gradient, aggressive motion |

---

## Deploy to Vercel

1. Push this repo to GitHub
2. Import in [vercel.com](https://vercel.com) → "Add New Project"
3. Set the environment variables below
4. Deploy — Vercel auto-detects Next.js

---

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_AMPLITUDE_API_KEY` | Yes | Amplitude project API key — get it from [amplitude.com](https://amplitude.com) → Project Settings → API Key |
| `NEXT_PUBLIC_SITE_URL` | Optional | Your production URL, e.g. `https://startify.app`. Defaults to `https://startify.app` if unset. Used for sitemap, canonical URLs, and OG tags. |

---

## Amplitude analytics — all tracked events

Every event is sent via `amplitude.track()` from `src/lib/amplitude.ts`. Waitlist signups also call `amplitude.identify()` to attach the email to the user profile, so you can export the full email list from Amplitude.

### Page lifecycle

| Event | When fired | Key properties |
|-------|-----------|----------------|
| `page_viewed` | On every page load (once per session) | `page: "landing"`, `referrer` |

### Hero section

| Event | When fired | Key properties |
|-------|-----------|----------------|
| `hero_email_focused` | User clicks the email input in the hero | — |
| `hero_waitlist_submitted` | User submits the hero email form | `email` |

### Navigation

| Event | When fired | Key properties |
|-------|-----------|----------------|
| `nav_cta_clicked` | User clicks "Join waitlist" in the navbar | `theme` (dark/warm/kinetic) |

### Section visibility (scroll depth)

Each section fires once when it scrolls into view (IntersectionObserver, threshold 15–30%).

| Event | `section` property value |
|-------|--------------------------|
| `section_viewed` | `"problem"` |
| `section_viewed` | `"how_it_works"` |
| `section_viewed` | `"demo"` |
| `section_viewed` | `"gamification"` |
| `section_viewed` | `"features"` |
| `section_viewed` | `"waitlist"` |

### Interactive demo

| Event | When fired | Key properties |
|-------|-----------|----------------|
| `demo_scenario_selected` | User picks Developer / Student / Life admin | `scenario` |
| `demo_started` | User clicks "Start the execution loop" | `scenario` |
| `demo_step_done` | User clicks ✓ Done | `step` (index), `scenario`, `xpEarned`, `streak` |
| `demo_step_stuck` | User clicks "I'm stuck" | `step`, `scenario` |
| `demo_stuck_resolved` | User clicks "Got it, let's continue" | `step`, `scenario` |
| `demo_level_up` | User levels up during the demo | `level` (e.g. `"Moving"`) |

### Achievement system

| Event | When fired | Key properties |
|-------|-----------|----------------|
| `achievement_unlocked` | Any achievement earned in the demo | `achievement` (name), `scenario` |

Achievements that can unlock in the demo:

| Achievement | Trigger |
|-------------|---------|
| `First Move` | Step 1 completed |
| `Speed Run` | Step completed in under 3 seconds |
| `On a Roll` | 3 consecutive steps without getting stuck |
| `Overcomer` | Got stuck at least once, then completed a step |
| `Unstoppable` | All steps completed without getting stuck |
| `Mission Complete` | All 5 steps completed |

### Waitlist section

| Event | When fired | Key properties |
|-------|-----------|----------------|
| `waitlist_email_focused` | User clicks the email field in the waitlist section | — |
| `waitlist_signup` | User submits the waitlist form | `email`, `source: "waitlist_section"`, `timestamp` |

### Footer

| Event | When fired | Key properties |
|-------|-----------|----------------|
| `footer_link_clicked` | User clicks Privacy / Terms / Contact | `link` |

---

## How to read signups in Amplitude

1. Go to **Amplitude → Users** tab
2. Filter by property `email is set`
3. You'll see every user who submitted the waitlist form — email, timestamp, events fired, scroll depth reached

Or use **Amplitude → Charts → Event Segmentation**:
- Event: `waitlist_signup` → Breakdown: `Day` → shows daily signups

To export emails: **Users → Export CSV**.

---

## Project structure

```
src/
  app/
    page.tsx               ← main dark theme landing
    layout.tsx             ← SEO metadata, fonts, analytics init
    globals.css            ← CSS variables, animations
    sitemap.ts             ← auto-generated /sitemap.xml
    robots.ts              ← auto-generated /robots.txt
    opengraph-image.tsx    ← dynamic OG image (edge runtime)
    theme/
      warm/page.tsx        ← /theme/warm route
      kinetic/page.tsx     ← /theme/kinetic route
  components/
    Analytics.tsx          ← initializes Amplitude on mount
    Navbar.tsx
    Hero.tsx
    SocialProof.tsx
    Problem.tsx
    HowItWorks.tsx
    InteractiveDemo.tsx    ← gamified demo: XP, levels, achievements, toasts
    Gamification.tsx       ← addiction loop section
    Features.tsx
    Waitlist.tsx
    Footer.tsx
    themes/
      WarmLanding.tsx      ← complete warm-theme landing
      KineticLanding.tsx   ← complete kinetic-theme landing
  lib/
    amplitude.ts           ← initAmplitude, trackEvent, identifyUser
```
