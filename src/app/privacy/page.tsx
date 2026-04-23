import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Startify collects, uses, and protects your data.",
  robots: { index: true, follow: true },
};

const K = {
  bg:     "#05010f",
  card:   "#120830",
  hot:    "#6366F1",
  purple: "#A78BFA",
  orange: "#84CC16",
  text:   "#ffffff",
  muted:  "rgba(255,255,255,0.55)",
  dim:    "rgba(255,255,255,0.1)",
};

const GRAD = `linear-gradient(135deg,${K.hot},${K.purple},${K.orange})`;

export default function PrivacyPage() {
  const updated = "April 22, 2026";
  const email   = "y.arutiunofff@gmail.com";

  return (
    <div style={{ fontFamily: "var(--font-inter), sans-serif", background: K.bg, color: K.text, minHeight: "100vh" }}>
      <style>{`.legal-link { color: #6366F1; text-decoration: none; font-weight: 700; } .legal-link:hover { text-decoration: underline; }`}</style>
      {/* Top bar */}
      <div style={{ borderBottom: `1px solid ${K.dim}`, background: "rgba(12,5,32,0.95)", backdropFilter: "blur(20px)" }} className="sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-black uppercase tracking-widest transition-opacity hover:opacity-70" style={{ color: K.hot }}>
            ← Startify
          </Link>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: K.muted }}>Privacy Policy</span>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-block text-xs font-black uppercase tracking-widest px-3 py-1 rounded mb-5" style={{ background: `rgba(255,0,110,0.1)`, color: K.hot }}>
            Legal
          </div>
          <h1 style={{ fontSize: "clamp(32px,6vw,56px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: "16px" }}>
            Privacy{" "}
            <span style={{ background: GRAD, backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Policy</span>
          </h1>
          <p style={{ color: K.muted }}>Last updated: {updated}</p>
        </div>

        <div className="flex flex-col gap-10">

          <Section title="Who we are">
            <p>Startify is an AI companion focused on task paralysis, procrastination, and ADHD-style initiation struggles—it helps you turn stuck goals into one small, immediate action. This site is operated by an individual founder reachable at <A href={`mailto:${email}`}>{email}</A>.</p>
          </Section>

          <Section title="What data we collect">
            <p>We collect only what is necessary:</p>
            <ul>
              <li><strong style={{ color: K.text }}>Email address</strong> — when you join the waitlist via the hero or waitlist form on this page. This is the only personally identifiable information we store.</li>
              <li><strong style={{ color: K.text }}>Usage analytics</strong> — anonymous behavioural data via Amplitude (see below). This includes which sections you scroll to, which buttons you click, and how you interact with the interactive demo. No name, no IP stored in our analytics.</li>
            </ul>
            <p>We do <strong style={{ color: K.text }}>not</strong> collect: passwords, payment data, location, device identifiers, or any data from third-party sources.</p>
          </Section>

          <Section title="How we use your email">
            <p>Your email is used for one purpose: to notify you when Startify launches and send relevant product updates. Specifically:</p>
            <ul>
              <li>A launch notification when the product becomes available</li>
              <li>Occasional updates about product development (infrequent, relevant only)</li>
              <li>A response if you contact us directly</li>
            </ul>
            <p>We will never use your email for advertising, sell it to anyone, or share it with third parties beyond the analytics processor listed below.</p>
          </Section>

          <Section title="Amplitude analytics">
            <p>We use <strong style={{ color: K.text }}>Amplitude</strong> to understand how people use this landing page — what sections they read, where they drop off, which demo steps they complete. This helps us build a better product.</p>
            <p>Amplitude receives:</p>
            <ul>
              <li>Anonymous event data (e.g. &ldquo;section_viewed&rdquo;, &ldquo;demo_step_done&rdquo;)</li>
              <li>Your email address when you submit the waitlist form, stored as a user identity in Amplitude so we can associate your behaviour with your signup</li>
              <li>Referrer URL and basic browser/OS metadata (collected by Amplitude automatically)</li>
            </ul>
            <p>Amplitude is our data processor under a Data Processing Agreement. They do not sell your data. Their privacy policy is at <A href="https://amplitude.com/privacy">amplitude.com/privacy</A>.</p>
            <p>Amplitude operates under standard contractual clauses for cross-border data transfers where applicable.</p>
          </Section>

          <Section title="Legal basis for processing">
            <p>We rely on <strong style={{ color: K.text }}>consent</strong> as our legal basis. By submitting your email address, you consent to:</p>
            <ul>
              <li>Receiving a launch notification and product updates from Startify</li>
              <li>Your email being stored in Amplitude linked to your site session</li>
            </ul>
            <p>You can withdraw consent at any time by emailing <A href={`mailto:${email}`}>{email}</A>. We will delete your data within 14 days of such a request.</p>
          </Section>

          <Section title="Data retention">
            <p>We keep your email until:</p>
            <ul>
              <li>You request deletion, or</li>
              <li>The product launches and we migrate to a proper user management system, at which point you will be notified and given the option to convert to a full account or be removed</li>
            </ul>
            <p>Anonymous analytics event data is retained per Amplitude&rsquo;s default retention policy (up to 2 years for free tier).</p>
          </Section>

          <Section title="Your rights">
            <p>Depending on where you live, you may have the right to:</p>
            <ul>
              <li><strong style={{ color: K.text }}>Access</strong> — know what personal data we hold about you</li>
              <li><strong style={{ color: K.text }}>Correction</strong> — fix inaccurate data</li>
              <li><strong style={{ color: K.text }}>Deletion</strong> — have your data removed</li>
              <li><strong style={{ color: K.text }}>Portability</strong> — receive your data in a machine-readable format</li>
              <li><strong style={{ color: K.text }}>Objection</strong> — object to certain processing</li>
            </ul>
            <p>To exercise any right, email <A href={`mailto:${email}`}>{email}</A>. We will respond within 30 days.</p>
          </Section>

          <Section title="Cookies">
            <p>This site does not use first-party cookies. Amplitude may set a cookie or use localStorage to persist an anonymous device identifier across sessions. No consent banner is displayed because we do not use advertising or tracking cookies.</p>
          </Section>

          <Section title="Children">
            <p>This service is not directed at children under 13. We do not knowingly collect data from anyone under 13. If you believe a child has submitted their email, contact us and we will delete it immediately.</p>
          </Section>

          <Section title="Changes to this policy">
            <p>If we make material changes, we will update the &ldquo;Last updated&rdquo; date at the top. As this is a pre-launch page, significant changes are unlikely until full product launch, at which point a comprehensive policy will be published.</p>
          </Section>

          <Section title="Contact">
            <p>Questions, requests, or concerns about this policy:</p>
            <p><A href={`mailto:${email}`}>{email}</A></p>
          </Section>

        </div>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2
        style={{ fontSize: "clamp(18px,3vw,22px)", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: "12px", color: "#ffffff" }}
      >
        {title}
      </h2>
      <div
        className="rounded-2xl p-5 sm:p-6 flex flex-col gap-3"
        style={{ background: "#120830", border: `1px solid rgba(255,255,255,0.07)`, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, fontSize: "0.9rem" }}
      >
        {children}
      </div>
    </section>
  );
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} className="legal-link">{children}</a>;
}
