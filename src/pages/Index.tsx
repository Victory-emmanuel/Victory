import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import QuoteAppointmentSection from "@/components/sections/QuoteAppointmentSection";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const Index = () => {
  // Use intersection observer for page fade-in animation
  const { ref: pageRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    once: true,
    rootMargin: "0px",
  });

  const pageSpring = useSpring({
    opacity: isIntersecting ? 1 : 0,
    config: { tension: 120, friction: 14 },
  });

  return (
    <animated.div ref={pageRef} style={pageSpring} className="min-h-screen">
      <Navigation />
      <HeroSection />
      <QuoteAppointmentSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      {/* <TestimonialsSection /> */}
      <ContactSection />
      <Footer />
    </animated.div>
  );
};

export default Index;
