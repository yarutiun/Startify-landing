"use client";

import { useState, useEffect } from "react";
import { trackEvent } from "@/lib/amplitude";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleCTA = () => {
    trackEvent("nav_cta_clicked");
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(5,5,10,0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(139,92,246,0.12)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L13 7L7 13M1 7H13" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-semibold text-white text-sm tracking-tight">
            StartEngine
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#how-it-works"
            className="text-sm transition-colors"
            style={{ color: "var(--text-secondary)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-secondary)")
            }
          >
            How it works
          </a>
          <a
            href="#demo"
            className="text-sm transition-colors"
            style={{ color: "var(--text-secondary)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-secondary)")
            }
          >
            Demo
          </a>
        </div>

        <button
          onClick={handleCTA}
          className="text-sm font-medium px-4 py-2 rounded-lg cursor-pointer transition-all duration-200"
          style={{
            background: "rgba(139,92,246,0.15)",
            border: "1px solid rgba(139,92,246,0.3)",
            color: "#a78bfa",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(139,92,246,0.25)";
            e.currentTarget.style.borderColor = "rgba(139,92,246,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(139,92,246,0.15)";
            e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)";
          }}
        >
          Join waitlist
        </button>
      </div>
    </nav>
  );
}
