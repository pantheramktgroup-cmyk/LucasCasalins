import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function DifferentiatorsSection({ data }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.from("[data-diff-card]", {
        autoAlpha: 0,
        y: 22,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
    },
    { scope: ref },
  );

  return (
    <section id="method" ref={ref} className="py-20 md:py-24">
      <div className="mx-auto w-full max-w-[1220px] px-5 md:px-8">
        <h2 className="max-w-5xl font-display text-4xl uppercase leading-[0.92] tracking-[0.01em] text-white md:text-5xl lg:text-[3.6rem]">
          {data.title}
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
          {data.intro}
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          {data.cards.map((card, idx) => (
            <article
              key={idx}
              data-diff-card="true"
              className={`group relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-7 transition-all duration-400 hover:border-[var(--line-warm)] hover:bg-[rgba(255,30,30,0.05)] hover:shadow-[0_0_34px_rgba(255,30,30,0.14)] lg:p-8 ${
                idx === 0
                  ? "lg:col-span-7"
                  : idx === 1
                    ? "lg:col-span-5"
                    : "lg:col-span-12"
              }`}
            >
              {/* Hover radial glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_50%,rgba(255,30,30,0.12),transparent_60%)]" />

              {/* Number accent */}
              <p className="relative mb-5 inline-block font-heading text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[var(--orange-soft)]">
                {String(idx + 1).padStart(2, "0")}
                <span className="mt-1.5 block h-px w-5 bg-[var(--orange-soft)]" />
              </p>

              <p className="relative text-[0.95rem] leading-relaxed text-[var(--text)] lg:text-base">
                {card}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
