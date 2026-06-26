import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function SmoothScrollProvider({ children }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      lerp: 0.1,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    lenis.on("scroll", ScrollTrigger.update);
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return children;
}
