"use client";

import * as amplitude from "@amplitude/analytics-browser";

let initialized = false;

export function initAmplitude() {
  if (initialized || typeof window === "undefined") return;
  const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
  if (!apiKey) return;
  amplitude.init(apiKey, {
    defaultTracking: {
      sessions: true,
      pageViews: true,
      formInteractions: true,
      fileDownloads: false,
    },
  });
  initialized = true;
}

export function trackEvent(
  name: string,
  properties?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;
  amplitude.track(name, properties);
}

export function identifyUser(email: string) {
  if (typeof window === "undefined") return;
  const identifyEvent = new amplitude.Identify();
  identifyEvent.set("email", email);
  identifyEvent.set("waitlist_joined_at", new Date().toISOString());
  amplitude.identify(identifyEvent);
  amplitude.setUserId(email);
}
