import { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Logo3D, CodeSphere } from "./Logo3D";

function Loader() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-primary text-sm animate-pulse">Loading...</div>
    </div>
  );
}

interface SceneProps {
  modelType?: "logo" | "sphere";
  cameraPosition?: [number, number, number];
  controlsEnabled?: boolean;
  className?: string;
}

export default function Scene({
  modelType = "logo",
  cameraPosition = [0, 0, 4],
  controlsEnabled = true,
  className = "",
}: SceneProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Simulate loading for smooth transition
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const fadeIn = useSpring({
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded ? "scale(1)" : "scale(0.9)",
    config: { tension: 120, friction: 14 },
  });

  return (
    <div
      className={`w-full h-full flex items-center justify-center ${className}`}
    >
      {!isLoaded ? (
        <Loader />
      ) : (
        <animated.div
          style={fadeIn}
          className="w-full h-full flex items-center justify-center"
        >
          {modelType === "logo" ? <Logo3D /> : <CodeSphere />}
        </animated.div>
      )}
    </div>
  );
}
