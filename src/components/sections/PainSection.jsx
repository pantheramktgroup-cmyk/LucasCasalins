import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function PainSection({ data }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.from("[data-pain-card]", {
        autoAlpha: 0,
        y: 26,
        scale: 0.97,
        stagger: { each: 0.08, from: "start" },
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 72%" },
      });
    },
    { scope: ref },
  );

  return (
    <section id="pain" ref={ref} className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <h2 className="max-w-4xl font-display text-3xl uppercase leading-[0.95] tracking-[0.01em] text-white md:text-5xl lg:text-[3.4rem]">
          {data.title}
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item) => (
            <article
              key={item}
              data-pain-card="true"
              className="group relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.03)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(255,90,95,0.3)] hover:bg-[rgba(229,9,20,0.04)]"
            >
              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_30%,rgba(229,9,20,0.07),transparent_65%)]" />

              {/* Icon */}
              <div className="relative mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(229,9,20,0.4)] bg-[rgba(229,9,20,0.1)]">
                <span className="text-[0.85rem] font-bold leading-none text-[var(--red-bright)]">✕</span>
              </div>

              <p className="relative text-[0.95rem] leading-relaxed text-[var(--text)]">{item}</p>
            </article>
          ))}
        </div>

        {/* Bridge statement */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--line-warm)] bg-[rgba(255,30,30,0.06)]">
          <p className="px-7 py-6 text-lg leading-relaxed text-[var(--red-bright)] md:text-xl">
            {data.bridge}
          </p>
        </div>
      </div>
    </section>
  );
}
