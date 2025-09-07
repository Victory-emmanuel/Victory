import { useRef } from "react";
import { useSpring, animated, useInView } from "@react-spring/web";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Scene from "../three/Scene";

const frontendSkills = [
  { name: "React / React Native", level: 95 },
  { name: "TypeScript / JavaScript", level: 90 },
  { name: "HTML / CSS / SCSS", level: 85 },
  { name: "Tailwind CSS", level: 90 },
  { name: "Next.js", level: 80 },
];

const backendSkills = [
  { name: "Node.js / Express", level: 85 },
  { name: "Python / Django", level: 75 },
  { name: "MongoDB / PostgreSQL", level: 80 },
  { name: "GraphQL", level: 70 },
  { name: "Supabase", level: 90 },
];

const otherSkills = [
  "Docker",
  "CI/CD",
  "AWS",
  "Git",
  "Agile Methodologies",
  "Jest / Testing",
  "Redux",
  "Figma",
  "UX/UI Design",
  "Three.js",
];

export default function SkillsSection() {
  // Refs for intersection observer
  const titleRef = useRef<HTMLDivElement>(null);
  const frontendRef = useRef<HTMLDivElement>(null);
  const backendRef = useRef<HTMLDivElement>(null);
  const otherRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  // Intersection observer hooks
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });
  const frontendInView = useInView(frontendRef, {
    once: true,
    margin: "-100px",
  });
  const backendInView = useInView(backendRef, { once: true, margin: "-100px" });
  const otherInView = useInView(otherRef, { once: true, margin: "-100px" });
  const sceneInView = useInView(sceneRef, { once: true, margin: "-100px" });

  // Spring animations
  const titleSpring = useSpring({
    opacity: titleInView ? 1 : 0,
    transform: titleInView ? "translateY(0px)" : "translateY(20px)",
    config: { tension: 120, friction: 14 },
  });

  const frontendSpring = useSpring({
    opacity: frontendInView ? 1 : 0,
    transform: frontendInView ? "translateX(0px)" : "translateX(-50px)",
    delay: 200,
    config: { tension: 120, friction: 14 },
  });

  const backendSpring = useSpring({
    opacity: backendInView ? 1 : 0,
    transform: backendInView ? "translateX(0px)" : "translateX(50px)",
    delay: 400,
    config: { tension: 120, friction: 14 },
  });

  const otherSpring = useSpring({
    opacity: otherInView ? 1 : 0,
    transform: otherInView ? "translateY(0px)" : "translateY(50px)",
    delay: 600,
    config: { tension: 120, friction: 14 },
  });

  const sceneSpring = useSpring({
    opacity: sceneInView ? 1 : 0,
    transform: sceneInView ? "scale(1)" : "scale(0.8)",
    delay: 800,
    config: { tension: 120, friction: 14 },
  });

  return (
    <section id="skills" className="py-20 min-h-screen">
      <div className="container">
        <animated.div
          ref={titleRef}
          style={titleSpring}
          className="mb-12 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">My Skills</h2>
          <div className="w-16 sm:w-20 h-1 bg-primary mx-auto mb-6 sm:mb-8"></div>
          <p className="max-w-xl mx-auto text-muted-foreground">
            My tech stack and areas of expertise in development and design.
          </p>
        </animated.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
          <animated.div
            ref={frontendRef}
            style={frontendSpring}
            className="space-y-6"
          >
            <Card className="glass-panel">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center">
                  <span className="text-primary mr-2">&#9632;</span> Frontend
                  Development
                </h3>
                <div className="space-y-4">
                  {frontendSkills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-secondary/40 rounded overflow-hidden">
                        {(() => {
                          const progressSpring = useSpring({
                            width: frontendInView ? `${skill.level}%` : "0%",
                            delay: 300 + index * 100,
                            config: { tension: 120, friction: 14 },
                          });

                          return (
                            <animated.div
                              style={progressSpring}
                              className="h-full bg-gradient-to-r from-primary to-accent"
                            />
                          );
                        })()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center">
                  <span className="text-accent mr-2">&#9632;</span> Backend
                  Development
                </h3>
                <div className="space-y-4">
                  {backendSkills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-secondary/40 rounded overflow-hidden">
                        {(() => {
                          const progressSpring = useSpring({
                            width: frontendInView ? `${skill.level}%` : "0%",
                            delay: 300 + index * 100,
                            config: { tension: 120, friction: 14 },
                          });

                          return (
                            <animated.div
                              style={progressSpring}
                              className="h-full bg-gradient-to-r from-accent to-primary"
                            />
                          );
                        })()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </animated.div>

          <animated.div ref={backendRef} style={backendSpring}>
            <Card className="glass-panel h-full">
              <CardContent className="p-4 sm:p-6 flex flex-col h-full">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center">
                  <span className="text-primary mr-2">&#9632;</span> Other
                  Technologies
                </h3>

                <animated.div
                  ref={sceneRef}
                  style={sceneSpring}
                  className="flex-grow mb-6 relative h-60"
                >
                  <Scene modelType="sphere" controlsEnabled={false} />
                </animated.div>

                <animated.div
                  ref={otherRef}
                  style={otherSpring}
                  className="flex flex-wrap gap-2"
                >
                  {otherSkills.map((skill, index) => {
                    const skillSpring = useSpring({
                      opacity: otherInView ? 1 : 0,
                      transform: otherInView ? "scale(1)" : "scale(0.8)",
                      delay: index * 100,
                      config: { tension: 120, friction: 14 },
                    });

                    return (
                      <animated.span
                        key={index}
                        style={skillSpring}
                        className="px-3 py-1 rounded-full glass-effect text-sm"
                      >
                        {skill}
                      </animated.span>
                    );
                  })}
                </animated.div>
              </CardContent>
            </Card>
          </animated.div>
        </div>

        {(() => {
          const statsRef = useRef<HTMLDivElement>(null);
          const statsInView = useInView(statsRef, {
            once: true,
            margin: "-100px",
          });

          const statsSpring = useSpring({
            opacity: statsInView ? 1 : 0,
            transform: statsInView ? "translateY(0px)" : "translateY(20px)",
            delay: 500,
            config: { tension: 120, friction: 14 },
          });

          return (
            <animated.div ref={statsRef} style={statsSpring}>
              <Card className="glass-panel">
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
                    <div className="text-center p-4">
                      <div className="text-3xl sm:text-4xl font-bold text-primary mb-1 sm:mb-2">
                        5+
                      </div>
                      <p className="text-muted-foreground">Years Experience</p>
                    </div>
                    <div className="text-center p-4">
                      <div className="text-3xl sm:text-4xl font-bold text-primary mb-1 sm:mb-2">
                        20+
                      </div>
                      <p className="text-muted-foreground">
                        Projects Completed
                      </p>
                    </div>
                    <div className="text-center p-4">
                      <div className="text-3xl sm:text-4xl font-bold text-primary mb-1 sm:mb-2">
                        20+
                      </div>
                      <p className="text-muted-foreground">Happy Clients</p>
                    </div>
                    <div className="text-center p-4">
                      <div className="text-3xl sm:text-4xl font-bold text-primary mb-1 sm:mb-2">
                        10+
                      </div>
                      <p className="text-muted-foreground">
                        Open Source Contrib.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </animated.div>
          );
        })()}
      </div>
    </section>
  );
}
