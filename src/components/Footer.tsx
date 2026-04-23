"use client";

import { trackEvent } from "@/lib/amplitude";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-12 px-6"
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--bg-secondary)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
            >
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                <path d="M7 1L13 7L7 13M1 7H13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-semibold text-white text-sm">Startify</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-xs" style={{ color: "var(--text-muted)" }}>
            <button
              onClick={() => {
                trackEvent("footer_link_clicked", { link: "privacy" });
              }}
              className="hover:text-white transition-colors cursor-pointer"
              style={{ background: "none", border: "none", color: "inherit" }}
            >
              Privacy
            </button>
            <button
              onClick={() => {
                trackEvent("footer_link_clicked", { link: "terms" });
              }}
              className="hover:text-white transition-colors cursor-pointer"
              style={{ background: "none", border: "none", color: "inherit" }}
            >
              Terms
            </button>
            <a
              href="mailto:hello@startify.app"
              onClick={() => trackEvent("footer_link_clicked", { link: "contact" })}
              className="transition-colors"
              style={{ color: "inherit" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              Contact
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © {year} Startify. All rights reserved.
          </p>
        </div>

        {/* Bottom tagline */}
        <div
          className="mt-8 pt-6 text-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          <p className="text-xs italic" style={{ color: "var(--text-muted)" }}>
            &ldquo;Smaller steps · softer shame · more honest starts.&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
