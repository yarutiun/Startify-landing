import type { Metadata } from "next";
import KineticLanding from "@/components/themes/KineticLanding";

export const metadata: Metadata = {
  title: "Startify — Kinetic Theme Preview",
  robots: { index: false, follow: false },
};

export default function KineticThemePage() {
  return <KineticLanding />;
}
