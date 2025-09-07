import { useRef, useEffect, useState } from "react";
import { useSpring, animated, useSpringValue } from "@react-spring/web";
import Scene from "../three/Scene";
import OGLCircle from "../three/OGLCircle";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function HeroSection() {
  const { setActiveSection } = usePortfolio();
  const heroRef = useRef<HTMLDivElement>(null);

  // Use intersection observer instead of immediate animation trigger
  const { ref: sectionRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    once: true,
    rootMargin: "-50px",
  });

  // Define all spring animations at component level
  const mainContentSpring = useSpring({
    opacity: isIntersecting ? 1 : 0,
    transform: isIntersecting ? "translateY(0px)" : "translateY(20px)",
    delay: isIntersecting ? 200 : 0,
    config: { tension: 120, friction: 14 },
  });

  const titleSpring = useSpring({
    opacity: isIntersecting ? 1 : 0,
    transform: isIntersecting ? "translateY(0px)" : "translateY(20px)",
    delay: isIntersecting ? 400 : 0,
    config: { tension: 120, friction: 14 },
  });

  const subtitleSpring = useSpring({
    opacity: isIntersecting ? 1 : 0,
    delay: isIntersecting ? 800 : 0,
    config: { tension: 120, friction: 14 },
  });

  const buttonsSpring = useSpring({
    opacity: isIntersecting ? 1 : 0,
    transform: isIntersecting ? "translateY(0px)" : "translateY(20px)",
    delay: isIntersecting ? 1200 : 0,
    config: { tension: 120, friction: 14 },
  });

  const arrowSpring = useSpring({
    opacity: isIntersecting ? 1 : 0,
    transform: isIntersecting ? "translateY(0px)" : "translateY(10px)",
    delay: isIntersecting ? 1500 : 0,
    config: {
      tension: 120,
      friction: 14,
      loop: isIntersecting ? { reverse: true } : false,
    },
  });

  const handleScrollDown = () => {
    setActiveSection("about");
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={(el) => {
        heroRef.current = el;
        sectionRef.current = el;
      }}
      className="relative min-h-screen w-full overflow-hidden flex items-center"
    >
      <div className="hero-gradient absolute inset-0 z-0" />

      {/* OGL 3D Circular Object */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-70 pointer-events-none">
        <OGLCircle size={500} color="#a855f7" segments={64} />
      </div>

      <div className="container relative z-10 flex flex-col items-center justify-center gap-8 pt-16">
        {/* Main content animation */}
        <animated.div style={mainContentSpring} className="text-center">
          <animated.h1
            style={titleSpring}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-2 sm:mb-4"
          >
            <span className="block">Hi, I'm </span>
            <span className="text-gradient">Emmanuel Victory</span>
          </animated.h1>

          <animated.h2
            style={subtitleSpring}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-6 sm:mb-8"
          >
            Full-Stack Developer
          </animated.h2>

          <animated.div
            style={buttonsSpring}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          >
            <Button
              size="default"
              className="px-4 sm:px-8 py-2 text-sm sm:text-base sm:py-6"
              onClick={handleScrollDown}
            >
              View My Work
            </Button>
            <Button
              variant="outline"
              size="default"
              className="px-4 sm:px-8 py-2 text-sm sm:text-base sm:py-6"
              onClick={() => {
                setActiveSection("contact");
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Contact Me
            </Button>
          </animated.div>
        </animated.div>

        {/* Floating arrow animation */}
        <animated.div style={arrowSpring} className="absolute bottom-10">
          <Button variant="ghost" size="icon" onClick={handleScrollDown}>
            <ArrowDown />
          </Button>
        </animated.div>
      </div>
    </section>
  );
}
