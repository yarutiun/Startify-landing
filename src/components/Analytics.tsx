"use client";

import { useEffect } from "react";
import { initAmplitude, trackEvent } from "@/lib/amplitude";

export default function Analytics() {
  useEffect(() => {
    initAmplitude();
    trackEvent("page_viewed", {
      page: "landing",
      referrer: document.referrer || "direct",
    });
  }, []);

  return null;
}
