import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using Startify.",
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

const GRAD2 = `linear-gradient(135deg,${K.purple},${K.orange})`;

export default function TermsPage() {
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
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: K.muted }}>Terms of Service</span>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-block text-xs font-black uppercase tracking-widest px-3 py-1 rounded mb-5" style={{ background: `rgba(131,56,236,0.1)`, color: K.purple }}>
            Legal
          </div>
          <h1 style={{ fontSize: "clamp(32px,6vw,56px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: "16px" }}>
            Terms of{" "}
            <span style={{ background: GRAD2, backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Service</span>
          </h1>
          <p style={{ color: K.muted }}>Last updated: {updated}</p>
        </div>

        <div className="flex flex-col gap-10">

          <Section title="Overview">
            <p>These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the Startify landing page and waitlist (<A href="https://startify.app">startify.app</A>), operated by an individual founder (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;Startify&rdquo;).</p>
            <p>By accessing this site or submitting your email to the waitlist, you agree to these Terms. If you disagree, please do not use the site.</p>
          </Section>

          <Section title="What Startify currently is">
            <p>Startify is currently a <strong style={{ color: K.text }}>pre-launch landing page</strong>. No application, software, or service is available yet. The site exists to:</p>
            <ul>
              <li>Describe the planned product and its value proposition</li>
              <li>Collect email addresses from people interested in early access</li>
              <li>Demonstrate the product concept via an interactive demo</li>
            </ul>
            <p>Joining the waitlist does not guarantee access to any future product, entitle you to any service, or create any contractual obligation on either side beyond notifying you at launch.</p>
          </Section>

          <Section title="Waitlist participation">
            <p>When you submit your email to the waitlist:</p>
            <ul>
              <li>You consent to receiving a launch notification and occasional product updates from Startify</li>
              <li>You can unsubscribe at any time by contacting <A href={`mailto:${email}`}>{email}</A></li>
              <li>We do not charge, bill, or obligate you in any way</li>
              <li>Being on the waitlist does not guarantee early access, beta access, or any specific pricing</li>
            </ul>
          </Section>

          <Section title="Acceptable use">
            <p>You agree not to:</p>
            <ul>
              <li>Submit false or others&rsquo; email addresses to the waitlist</li>
              <li>Attempt to scrape, reverse-engineer, or attack this site or its infrastructure</li>
              <li>Use automated tools to interact with the site in ways that damage its performance</li>
              <li>Misrepresent your affiliation with Startify</li>
            </ul>
          </Section>

          <Section title="Intellectual property">
            <p>All content on this site — including but not limited to the product name &ldquo;Startify&rdquo;, copy, design, interactive demo, animations, and branding — is owned by or licensed to us.</p>
            <p>You may not copy, reproduce, or redistribute any part of the site without written permission, except as permitted by applicable law (e.g. linking to the site is fine).</p>
          </Section>

          <Section title="Disclaimer of warranties">
            <p>This site and all content on it are provided <strong style={{ color: K.text }}>&ldquo;as is&rdquo; and &ldquo;as available&rdquo;</strong> without warranties of any kind, express or implied.</p>
            <p>We make no warranty that:</p>
            <ul>
              <li>The site will be available at any particular time or uninterrupted</li>
              <li>The described product will be built, launched, or function as described</li>
              <li>Any information on the site is accurate, complete, or current</li>
            </ul>
            <p>The interactive demo is illustrative only and does not represent a functional product.</p>
          </Section>

          <Section title="Limitation of liability">
            <p>To the maximum extent permitted by law, Startify and its founder shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of — or inability to use — this site or its content.</p>
            <p>Our total liability to you for any claim arising from these Terms shall not exceed USD $0, as no consideration has been exchanged.</p>
          </Section>

          <Section title="Third-party services">
            <p>This site uses the following third-party services:</p>
            <ul>
              <li><strong style={{ color: K.text }}>Amplitude</strong> — product analytics. Governed by Amplitude&rsquo;s own terms and privacy policy.</li>
              <li><strong style={{ color: K.text }}>Vercel</strong> — hosting and CDN. Governed by Vercel&rsquo;s terms of service.</li>
            </ul>
            <p>We are not responsible for the practices or content of these third parties.</p>
          </Section>

          <Section title="Changes to these Terms">
            <p>We may update these Terms from time to time. Changes take effect when posted. For material changes we will update the &ldquo;Last updated&rdquo; date above. Continued use of the site after changes constitutes acceptance.</p>
            <p>Once Startify becomes a live product with paying users, comprehensive updated Terms will be published before any commercial relationship begins.</p>
          </Section>

          <Section title="Governing law">
            <p>These Terms are governed by the laws of the jurisdiction where the operator resides. Any disputes will be resolved in the courts of that jurisdiction. If any provision is unenforceable, the remainder of these Terms continues in full effect.</p>
          </Section>

          <Section title="Contact">
            <p>Questions about these Terms:</p>
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
