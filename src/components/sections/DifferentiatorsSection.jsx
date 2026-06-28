import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function DifferentiatorsSection({ data }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.fromTo(
        "[data-diff-head]",
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
        "[data-diff-card]",
        { opacity: 0.01, y: 52, scale: 0.93, rotateX: 9, transformPerspective: 800 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "back.out(1.5)",
          immediateRender: false,
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: ref.current, start: "top 76%", once: true },
        },
      );
    },
    { scope: ref, dependencies: [reducedMotion] },
  );

  return (
    <section id="method" ref={ref} className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1120px] px-5 md:px-8">
        <div data-diff-head>
          <h2 className="max-w-4xl font-display text-3xl uppercase leading-[0.96] tracking-[0.01em] text-white md:text-5xl">
            {data.title}
          </h2>
          <p className="mt-5 max-w-2xl text-balance text-base leading-relaxed text-[var(--muted)] md:text-lg">
            {data.intro}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-4">
          {data.cards.map((card, idx) => (
            <article
              key={idx}
              data-diff-card="true"
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[rgba(14,14,14,0.84)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--red)] hover:shadow-[0_0_30px_rgba(255,30,30,0.16)] md:p-7"
            >
              {/* Hover radial glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(255,30,30,0.1),transparent_62%)]" />

              {/* Number accent */}
              <p className="relative mb-4 inline-block font-heading text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[var(--red-bright)]">
                {String(idx + 1).padStart(2, "0")}
                <span className="mt-1.5 block h-px w-6 bg-[var(--red)]" />
              </p>

              <p className="relative text-[0.86rem] leading-relaxed text-[rgba(255,244,234,0.86)] md:text-[0.88rem]">
                {card}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
