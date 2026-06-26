import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function MagneticCTA({ href, label, ariaLabel, className = "" }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const button = ref.current;
      if (!button || reducedMotion) return;

      const pulse = gsap.to(button, {
        scale: 1.02,
        boxShadow: "0 0 0 1px rgba(255,255,255,0.2), 0 0 44px rgba(255,30,30,0.6)",
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const onMove = (event) => {
        const bounds = button.getBoundingClientRect();
        const x = event.clientX - bounds.left - bounds.width / 2;
        const y = event.clientY - bounds.top - bounds.height / 2;
        gsap.to(button, { x: x * 0.14, y: y * 0.16, duration: 0.35, ease: "power3.out" });
      };

      const onLeave = () => {
        gsap.to(button, { x: 0, y: 0, scale: 1, duration: 0.45, ease: "power3.out" });
      };

      button.addEventListener("pointermove", onMove);
      button.addEventListener("pointerleave", onLeave);

      return () => {
        pulse.kill();
        button.removeEventListener("pointermove", onMove);
        button.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: ref },
  );

  return (
    <a
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      className={`cta-shimmer inline-flex items-center gap-3 rounded-full border border-[var(--red-bright)] bg-[var(--red)] px-7 py-4 font-heading text-sm font-bold uppercase tracking-[0.14em] text-white shadow-glow transition duration-300 hover:scale-[1.03] hover:bg-[var(--red-bright)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--red-bright)] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${className}`}
    >
      <span>{label}</span>
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/10">
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </a>
  );
}
