import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import PremiumCTA from "../ui/PremiumCTA";

export default function OutcomesA({ data, cta }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.fromTo(
        "[data-out-a-title]",
        { opacity: 0.01, y: 38, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.85,
          ease: "power4.out",
          immediateRender: false,
          clearProps: "opacity,transform,filter",
          scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        },
      );

      gsap.fromTo(
        "[data-out-a-item]",
        { opacity: 0.01, y: 48, scale: 0.93, rotateX: 8, transformPerspective: 800 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.66,
          stagger: { each: 0.1 },
          ease: "back.out(1.5)",
          immediateRender: false,
          clearProps: "opacity,transform",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 74%",
            once: true,
          },
        },
      );
    },
    { scope: ref, dependencies: [reducedMotion] },
  );

  return (
    <section id="outcomes" ref={ref} className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1080px] px-5 md:px-8">
        <h2 data-out-a-title className="max-w-3xl font-display text-3xl uppercase leading-[0.96] tracking-[0.01em] text-white md:text-5xl">
          {data.titlePrefix}{" "}
          <span className="text-[var(--red)] text-glow-red">
            {data.titleHighlight}
          </span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {data.items.map((item) => (
            <article
              key={item.number}
              data-out-a-item="true"
              className="outcome-a-card group relative flex gap-4 overflow-hidden rounded-xl border border-[var(--line)] bg-[rgba(14,14,14,0.88)] p-5 transition-all duration-400 hover:-translate-y-1.5 hover:border-[var(--red)] hover:shadow-[0_0_0_1px_rgba(255,30,30,0.22),0_0_36px_rgba(255,30,30,0.22),inset_0_0_28px_rgba(255,30,30,0.07)] md:p-6"
            >
              {/* Large number */}
              <span className="relative z-[1] font-display text-[3rem] leading-none text-[rgba(255,30,30,0.42)] transition-colors duration-300 group-hover:text-[rgba(255,30,30,0.7)] md:text-[3.4rem]">
                {item.number}
              </span>
              <div className="relative z-[1] self-center">
                <h3 className="font-heading text-[1rem] font-bold leading-tight text-white transition-colors duration-300 group-hover:text-[var(--red-bright)] md:text-[1.05rem]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.84rem] leading-relaxed text-[rgba(255,244,234,0.84)] md:text-[0.88rem]">
                  {item.text}
                </p>
              </div>
              {/* Animated red energy streak on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[var(--red)] via-[var(--red-bright)] to-transparent transition-transform duration-500 group-hover:scale-x-100"
              />
            </article>
          ))}
        </div>

        <div className="mt-10">
          <PremiumCTA
            href={cta.href}
            label={cta.primaryLabel}
            ariaLabel={cta.ariaLabel}
            size="lg"
          />
        </div>
      </div>
    </section>
  );
}
