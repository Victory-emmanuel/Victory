import { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Code, User, FolderOpen, Send, Home } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function Navigation() {
  const {
    activeSection,
    setActiveSection,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  } = usePortfolio();
  const [scrollY, setScrollY] = useState(0);

  // Use intersection observer to detect when navigation should be visible
  const { ref: navRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    once: false, // Allow re-triggering
    rootMargin: "0px 0px -90% 0px", // Trigger when element is near top
  });

  // Update scroll position
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home", icon: <Home size={18} /> },
    { id: "about", label: "About", icon: <User size={18} /> },
    { id: "skills", label: "Skills", icon: <Code size={18} /> },
    { id: "projects", label: "Projects", icon: <FolderOpen size={18} /> },
    { id: "contact", label: "Contact", icon: <Send size={18} /> },
  ];

  const handleItemClick = (section: string) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);

    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Spring animations for navigation
  const navSpring = useSpring({
    opacity: isIntersecting ? 1 : 0,
    transform: isIntersecting ? "translateY(0px)" : "translateY(-20px)",
    backgroundColor: scrollY > 50 ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0)",
    backdropFilter: scrollY > 50 ? "blur(10px)" : "blur(0px)",
    config: { tension: 120, friction: 14 },
  });

  const logoSpring = useSpring({
    transform: "scale(1)",
    config: { tension: 300, friction: 10 },
  });

  return (
    <>
      {/* Hidden element to trigger intersection observer */}
      <div
        ref={navRef}
        className="absolute top-0 left-0 w-full h-20 pointer-events-none"
      />

      {/* Desktop Navigation */}
      <animated.nav
        style={navSpring}
        className="fixed top-0 left-0 right-0 z-50 hidden md:block"
      >
        <div className="container flex items-center justify-between py-4">
          <animated.div
            style={logoSpring}
            className="text-xl font-bold text-gradient flex items-center cursor-pointer"
            onMouseEnter={() => logoSpring.transform.set("scale(1.05)")}
            onMouseLeave={() => logoSpring.transform.set("scale(1)")}
          >
            <img
              src="/logo.png"
              alt="CodeSquid Logo"
              className="w-8 h-8 mr-2 inline-block align-middle"
            />
            CodeSquid
          </animated.div>

          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.id}>
                <Button
                  variant={activeSection === item.id ? "secondary" : "ghost"}
                  size="sm"
                  className="flex gap-2 items-center"
                  onClick={() => handleItemClick(item.id)}
                >
                  {item.icon}
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </animated.nav>

      {/* Mobile Navigation (Top) */}
      {(() => {
        const mobileNavSpring = useSpring({
          opacity: isIntersecting ? 1 : 0,
          transform: isIntersecting ? "translateY(0px)" : "translateY(-20px)",
          config: { tension: 120, friction: 14 },
        });

        return (
          <animated.nav
            style={mobileNavSpring}
            className="fixed top-4 left-2 transform -translate-x-1/2 z-50 md:hidden w-[60%] max-w-sm"
          >
            <div className="glass-effect rounded-full px-2 sm:px-4 py-2 flex items-center justify-between gap-1 sm:gap-2 w-full overflow-hidden">
              {navItems.map((item) => {
                const buttonSpring = useSpring({
                  transform: "scale(1)",
                  config: { tension: 300, friction: 10 },
                });

                return (
                  <animated.button
                    key={item.id}
                    style={buttonSpring}
                    className={`p-1.5 sm:p-2 rounded-full flex-shrink-0 ${
                      activeSection === item.id
                        ? "text-primary bg-secondary/60"
                        : "text-muted-foreground hover:text-primary/80"
                    }`}
                    onMouseDown={() =>
                      buttonSpring.transform.set("scale(0.95)")
                    }
                    onMouseUp={() => buttonSpring.transform.set("scale(1)")}
                    onMouseLeave={() => buttonSpring.transform.set("scale(1)")}
                    onClick={() => handleItemClick(item.id)}
                  >
                    {item.icon}
                  </animated.button>
                );
              })}
            </div>
          </animated.nav>
        );
      })()}
    </>
  );
}
