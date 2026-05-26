import React, { useState } from "react";
import AnnouncementBar from "@/components/landing/AnnouncementBar";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import SocialProof from "@/components/landing/SocialProof";
import WhySection from "@/components/landing/WhySection";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import ReadingModal from "@/components/landing/ReadingModal";

export default function Landing() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);

  return (
    <div data-testid="landing-page" className="relative min-h-screen text-white overflow-x-hidden">
      <AnnouncementBar />
      <Header onCTAClick={openModal} />
      <main>
        <Hero onCTAClick={openModal} />
        <SocialProof />
        <WhySection />
        <FeaturesGrid />
        <HowItWorks onCTAClick={openModal} />
        <Testimonials />
        <FinalCTA onCTAClick={openModal} />
      </main>
      <Footer />
      <ReadingModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}
