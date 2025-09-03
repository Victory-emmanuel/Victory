import { useRef } from "react";
import { motion } from "framer-motion";
import Scene from "../three/Scene";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function HeroSection() {
  const { setActiveSection } = usePortfolio();
  const heroRef = useRef<HTMLDivElement>(null);

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
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center"
    >
      <div className="hero-gradient absolute inset-0 z-0" />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] opacity-50 pointer-events-none">
        <Scene modelType="logo" controlsEnabled={false} />
      </div>

      <div className="container relative z-10 flex flex-col items-center justify-center gap-8 pt-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-2 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.8,
            }}
          >
            <span className="block">Hi, I'm </span>
            <span className="text-gradient">Emmanuel Victory</span>
          </motion.h1>

          <motion.h2
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-6 sm:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Full-Stack Developer
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
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
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.5,
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Button variant="ghost" size="icon" onClick={handleScrollDown}>
            <ArrowDown />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
