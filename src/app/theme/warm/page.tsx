import type { Metadata } from "next";
import WarmLanding from "@/components/themes/WarmLanding";

export const metadata: Metadata = {
  title: "Startify — Warm Theme Preview",
  robots: { index: false, follow: false },
};

export default function WarmThemePage() {
  return <WarmLanding />;
}
