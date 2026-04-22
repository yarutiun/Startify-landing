import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import InteractiveDemo from "@/components/InteractiveDemo";
import Features from "@/components/Features";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <SocialProof />
      <Problem />
      <HowItWorks />
      <InteractiveDemo />
      <Features />
      <Waitlist />
      <Footer />
    </main>
  );
}
