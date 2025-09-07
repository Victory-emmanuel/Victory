import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Illustration, Box, Shape } from "react-zdog";
import { usePortfolio } from "@/context/PortfolioContext";

export function Logo3D() {
  const [rotation, setRotation] = useState(0);
  const [floatOffset, setFloatOffset] = useState(0);
  const { activeSection } = usePortfolio();

  // Animation loop using requestAnimationFrame
  useEffect(() => {
    let animationId: number;
    let startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTime) / 1000;

      // Gentle floating animation
      setFloatOffset(Math.sin(elapsedTime * 0.5) * 10);

      // Rotate based on active section
      if (activeSection === "home") {
        setRotation((prev) => prev + 0.01);
      } else {
        // Slow down rotation when not in focus
        setRotation((prev) => prev + 0.003);
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [activeSection]);

  const springProps = useSpring({
    transform: `translateY(${floatOffset}px) rotateY(${rotation}rad)`,
    config: { tension: 120, friction: 14 },
  });

  return (
    <animated.div style={springProps}>
      <Illustration
        element="svg"
        zoom={4}
        rotate={{ x: 0.2, y: rotation }}
        translate={{ y: floatOffset }}
      >
        <Box
          width={100}
          height={100}
          depth={100}
          color="#a855f7"
          stroke={2}
          fill={true}
        />
        <Shape
          path={[
            { x: -25, y: 0 },
            { x: 25, y: 0 },
            { x: 0, y: -25 },
            { x: 0, y: 25 },
          ]}
          color="#f472b6"
          stroke={3}
          translate={{ z: 60 }}
        />
      </Illustration>
    </animated.div>
  );
}

export function CodeSphere() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let animationId: number;
    let startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTime) / 1000;

      setRotation(elapsedTime * 0.1);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <Illustration element="svg" zoom={4} rotate={{ y: rotation }}>
      <Shape
        path={[
          { x: -40, y: -40 },
          { x: 40, y: -40 },
          { x: 40, y: 40 },
          { x: -40, y: 40 },
        ]}
        color="#8b5cf6"
        stroke={2}
        fill={false}
        closed={true}
      />
      <Shape
        path={[
          { x: -30, y: 0 },
          { x: 30, y: 0 },
        ]}
        color="#8b5cf6"
        stroke={2}
      />
      <Shape
        path={[
          { x: 0, y: -30 },
          { x: 0, y: 30 },
        ]}
        color="#8b5cf6"
        stroke={2}
      />
    </Illustration>
  );
}
