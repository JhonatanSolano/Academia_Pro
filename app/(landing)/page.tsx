"use client";

import { useState } from "react";
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
import LoginModal from "@/components/auth/LoginModal";

export default function LandingPage() {
  const [loginOpen, setLoginOpen] = useState(false);
  const openLogin = () => setLoginOpen(true);

  return (
    <>
      <Navbar onLoginClick={openLogin} />
      <main>
        <HeroSection onLoginClick={openLogin} />
        <ProblemSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection onLoginClick={openLogin} />
        <TrustSection />
        <FaqSection />
        <CtaSection onLoginClick={openLogin} />
      </main>
      <Footer />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
