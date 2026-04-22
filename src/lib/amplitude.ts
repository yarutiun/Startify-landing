"use client";

import { Identify, identify, setUserId, track } from "@amplitude/unified";

export function initAmplitude() {}

export function trackEvent(
  name: string,
  properties?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;
  track(name, properties);
}

export function identifyUser(email: string) {
  if (typeof window === "undefined") return;
  const identifyEvent = new Identify();
  identifyEvent.set("email", email);
  identifyEvent.set("waitlist_joined_at", new Date().toISOString());
  identify(identifyEvent);
  setUserId(email);
}
