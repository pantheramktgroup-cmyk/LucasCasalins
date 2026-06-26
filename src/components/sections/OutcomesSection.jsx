import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import MagneticCTA from "../ui/MagneticCTA";

export default function OutcomesSection({ data, cta }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.from("[data-out-item]", {
        autoAlpha: 0,
        y: 28,
        stagger: { each: 0.13 },
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 68%" },
      });
    },
    { scope: ref },
  );

  return (
    <section id="outcomes" ref={ref} className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1120px] px-5 md:px-8">
        <h2 className="max-w-4xl font-display text-4xl uppercase leading-[0.92] tracking-[0.01em] text-white md:text-6xl lg:text-[4rem]">
          {data.titlePrefix}{" "}
          <span className="text-[var(--red)] text-glow-red">{data.titleHighlight}</span>
        </h2>

        {/* Timeline items */}
        <div className="relative mt-12">
          {/* Vertical line */}
          <div className="absolute bottom-0 left-0 top-2 hidden w-px bg-[linear-gradient(180deg,var(--red),rgba(255,30,30,0.08))] md:block" />

          <div className="space-y-0">
            {data.items.map((item) => (
              <article
                key={item.number}
                data-out-item="true"
                className="grid gap-3 border-b border-[var(--line)] py-9 last:border-b-0 md:grid-cols-[96px_1fr] md:gap-8 md:pl-8"
              >
                {/* Big ghost number */}
                <div className="shrink-0">
                  <span className="font-display text-[5rem] leading-none text-[rgba(255,30,30,0.28)] md:text-[6.5rem]">
                    {item.number}
                  </span>
                </div>

                {/* Content */}
                <div className="max-w-2xl self-center">
                  <h3 className="font-heading text-2xl font-bold leading-tight text-[var(--text)] md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-[var(--muted)] md:text-lg">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <MagneticCTA href={cta.href} label={cta.primaryLabel} ariaLabel={cta.ariaLabel} />
        </div>
      </div>
    </section>
  );
}
