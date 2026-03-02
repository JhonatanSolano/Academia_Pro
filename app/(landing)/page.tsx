import {
  Navbar,
  HeroSection,
  ProblemSection,
  FeaturesSection,
  HowItWorksSection,
  PricingSection,
  TrustSection,
  FaqSection,
  CtaSection,
  Footer,
} from "@/components/landing";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <TrustSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
