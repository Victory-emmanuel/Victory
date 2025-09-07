import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  once?: boolean;
}

interface UseIntersectionObserverReturn {
  ref: React.RefObject<HTMLElement>;
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
}

/**
 * Custom hook for intersection observer functionality
 * Detects when an element comes into view
 * 
 * @param options - Intersection observer options
 * @returns Object containing ref, isIntersecting state, and entry
 */
export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    once = true,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
        setIsIntersecting(entry.isIntersecting);

        // If once is true, disconnect after first intersection
        if (once && entry.isIntersecting) {
          observer.disconnect();
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, once]);

  return { ref, isIntersecting, entry };
}

/**
 * Simplified hook for basic intersection detection
 * Returns just the ref and isIntersecting state
 */
export function useInView(options: UseIntersectionObserverOptions = {}) {
  const { ref, isIntersecting } = useIntersectionObserver(options);
  return { ref, isIntersecting };
}
