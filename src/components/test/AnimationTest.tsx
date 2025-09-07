import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useSpring, animated } from "@react-spring/web";

/**
 * Test component to verify intersection observer and animation functionality
 * This can be temporarily added to any page to test the animations
 */
export default function AnimationTest() {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
    once: true,
    rootMargin: '-50px'
  });

  const testSpring = useSpring({
    opacity: isIntersecting ? 1 : 0,
    transform: isIntersecting ? 'translateY(0px)' : 'translateY(50px)',
    backgroundColor: isIntersecting ? '#10b981' : '#ef4444',
    config: { tension: 120, friction: 14 }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <animated.div
        ref={ref}
        style={testSpring}
        className="w-64 h-64 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg"
      >
        {isIntersecting ? 'In View!' : 'Scroll to see me!'}
      </animated.div>
    </div>
  );
}
