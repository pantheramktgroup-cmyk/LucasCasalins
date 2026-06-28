import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import PremiumCTA from "../ui/PremiumCTA";

/**
 * OutcomesB — Landing B variant.
 * Single-column, full-width horizontal cards. Number left, content right.
 * One card per row for maximum readability and impact.
 */
export default function OutcomesB({ data, cta }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.fromTo(
        "[data-out-b-title]",
        { opacity: 0.01, y: 38, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.85,
          ease: "power4.out",
          immediateRender: false,
          clearProps: "opacity,transform,filter",
          scrollTrigger: { trigger: ref.current, start: "top 78%", once: true },
        },
      );

      gsap.fromTo(
        "[data-out-b-card]",
        { opacity: 0.01, x: -56, y: 24, rotateX: 7, transformPerspective: 800 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotateX: 0,
          duration: 0.72,
          stagger: { each: 0.12 },
          ease: "back.out(1.4)",
          immediateRender: false,
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: ref.current, start: "top 72%", once: true },
        },
      );

      gsap.fromTo(
        "[data-out-b-cta]",
        { opacity: 0.01, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
          delay: 0.62,
          immediateRender: false,
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: ref.current, start: "top 72%", once: true },
        },
      );
    },
    { scope: ref, dependencies: [reducedMotion] },
  );

  return (
    <section id="outcomes" ref={ref} className="py-16 md:py-28">
      <div className="mx-auto w-full max-w-[1100px] px-5 md:px-8">
        {/* Section heading */}
        <div data-out-b-title className="max-w-3xl">
          <h2 className="font-display text-3xl uppercase leading-[0.96] tracking-[0.01em] text-white md:text-5xl">
            {data.titlePrefix}{" "}
            <span className="text-[var(--red)] text-glow-red">
              {data.titleHighlight}
            </span>
          </h2>
          <div
            aria-hidden="true"
            className="mt-5 h-[3px] w-20 rounded-full bg-gradient-to-r from-[var(--red)] to-transparent"
          />
        </div>

        {/* Single-column editorial list — no card borders or backgrounds */}
        <div className="mt-12 flex flex-col">
          {data.items.map((item, idx) => (
            <div
              key={item.number}
              data-out-b-card="true"
              className="group relative flex items-stretch"
            >
              {/* Subtle separator between items (not before first) */}
              {idx > 0 && (
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px"
                  style={{ background: "linear-gradient(90deg, rgba(255,30,30,0.22) 0%, rgba(255,30,30,0.06) 40%, transparent 75%)" }}
                />
              )}

              {/* Number column */}
              <div className="flex w-16 shrink-0 items-center justify-center py-8 md:w-24">
                <span
                  aria-hidden="true"
                  className="font-display text-[2.2rem] leading-none text-[rgba(255,30,30,0.28)] transition-colors duration-300 group-hover:text-[rgba(255,30,30,0.55)] md:text-[3rem]"
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Vertical divider */}
              <div
                aria-hidden="true"
                className="w-px self-stretch"
                style={{ background: "linear-gradient(180deg, transparent 8%, rgba(255,30,30,0.18) 30%, rgba(255,30,30,0.18) 70%, transparent 92%)" }}
              />

              {/* Content */}
              <div className="flex-1 py-8 pl-6 md:pl-8">
                <h3 className="font-heading text-[1.06rem] font-bold uppercase leading-tight tracking-[0.04em] text-white transition-colors duration-300 group-hover:text-[var(--red-bright)] md:text-[1.18rem]">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-2xl text-[0.9rem] leading-relaxed text-[rgba(255,244,234,0.72)] md:text-[0.95rem]">
                  {item.text}
                </p>
              </div>
            </div>
          ))}

          {/* Bottom border under last item */}
          <div
            aria-hidden="true"
            className="h-px w-full"
            style={{ background: "linear-gradient(90deg, rgba(255,30,30,0.12) 0%, transparent 60%)" }}
          />
        </div>

        <div data-out-b-cta className="mt-12">
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

