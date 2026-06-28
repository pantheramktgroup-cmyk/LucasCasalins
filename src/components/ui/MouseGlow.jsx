import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useIsMobile } from "../../hooks/useIsMobile";

/**
 * MouseGlow — global red light/halo that follows the cursor across the whole
 * page. Smoothed with gsap.quickTo (single reused tween, transform-only) and a
 * soft "heat warp" CSS animation for a distorted, energetic feel.
 *
 * - Sits as a fixed background layer (-z-10) so it never covers text.
 * - Disabled on mobile and when prefers-reduced-motion is set.
 * - Works for both A/B variants (mounted once in PageShell).
 */
export default function MouseGlow() {
  const ref = useRef(null);
  const posRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  useGSAP(
    (context, contextSafe) => {
      if (reducedMotion || isMobile) return;
      const pos = posRef.current;
      if (!pos) return;

      gsap.set(pos, {
        xPercent: -50,
        yPercent: -50,
        x: window.innerWidth / 2,
        y: window.innerHeight * 0.4,
      });

      // Smoothed follow — single reused tween per axis (performant).
      const xTo = gsap.quickTo(pos, "x", { duration: 0.75, ease: "power3.out" });
      const yTo = gsap.quickTo(pos, "y", { duration: 0.75, ease: "power3.out" });

      const onMove = contextSafe((event) => {
        xTo(event.clientX);
        yTo(event.clientY);
        gsap.to(pos, { opacity: 1, duration: 0.45, overwrite: "auto" });
      });

      const onLeave = contextSafe(() => {
        gsap.to(pos, { opacity: 0, duration: 0.7, overwrite: "auto" });
      });

      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);

      return () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerdown", onMove);
        document.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: ref, dependencies: [reducedMotion, isMobile] },
  );

  if (reducedMotion || isMobile) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        ref={posRef}
        className="absolute left-0 top-0 h-[680px] w-[680px] opacity-0 will-change-transform"
      >
        <div
          className="mouse-glow-core h-full w-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,30,30,0.24) 0%, rgba(220,40,10,0.11) 38%, transparent 70%)",
            filter: "blur(44px)",
          }}
        />
      </div>
    </div>
  );
}
