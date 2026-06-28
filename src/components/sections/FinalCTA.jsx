import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import PremiumCTA from "../ui/PremiumCTA";

export default function FinalCTA({ data, cta }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.fromTo(
        "[data-final-shell]",
        { opacity: 0.01, y: 48, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power4.out",
          immediateRender: false,
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
        },
      );

      gsap.fromTo(
        "[data-final-title]",
        { opacity: 0.01, yPercent: 60, filter: "blur(12px)" },
        {
          opacity: 1,
          yPercent: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power4.out",
          immediateRender: false,
          clearProps: "opacity,transform,filter",
          scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        },
      );

      gsap.fromTo(
        "[data-final-text]",
        { opacity: 0.01, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.18,
          ease: "power3.out",
          immediateRender: false,
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        },
      );
    },
    { scope: ref, dependencies: [reducedMotion] },
  );

  return (
    <section id="final-cta" ref={ref} className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1140px] px-5 md:px-8">
        <div data-final-shell className="relative overflow-hidden rounded-3xl border border-[var(--line)] p-8 text-center md:p-12 lg:p-14">
          {/* Radial glow layers */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(255,30,30,0.14),transparent)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(5,5,5,0.40))]" />

          <div className="relative">
            {/* Wider max-w + text-balance keeps title in ≤2 lines without hardcoded breaks */}
            <h2 data-final-title className="mx-auto max-w-[820px] text-balance font-display text-4xl uppercase leading-[0.92] tracking-[0.01em] text-white text-glow-red md:text-[4.2rem]">
              {data.title}
            </h2>
            <p data-final-text className="mx-auto mt-5 max-w-2xl text-balance text-lg leading-relaxed text-[var(--muted)]">
              {data.text}
            </p>
            <div className="mt-8 flex justify-center">
              <PremiumCTA href={cta.href} label={cta.primaryLabel} ariaLabel={cta.ariaLabel} size="lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
