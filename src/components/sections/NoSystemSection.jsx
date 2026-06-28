import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import PremiumCTA from "../ui/PremiumCTA";
import SectionLabel from "../ui/SectionLabel";

/**
 * NoSystemSection — "No te falta disciplina. Te falta un sistema."
 * Dark-gray section that contrasts the surrounding page.
 * Three editorial problem blocks + closing statement + CTA (left-aligned).
 */
export default function NoSystemSection({ data, cta }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.fromTo(
        "[data-ns-head]",
        { opacity: 0.01, y: 36, filter: "blur(10px)" },
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
        "[data-ns-block]",
        { opacity: 0.01, y: 56, scale: 0.94, rotateX: 9, transformPerspective: 800 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.7,
          stagger: { each: 0.14 },
          ease: "back.out(1.5)",
          immediateRender: false,
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: "[data-ns-grid]", start: "top 80%", once: true },
        },
      );

      gsap.fromTo(
        "[data-ns-close]",
        { opacity: 0.01, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.62,
          ease: "power3.out",
          immediateRender: false,
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: "[data-ns-grid]", start: "top 60%", once: true },
        },
      );
    },
    { scope: ref, dependencies: [reducedMotion] },
  );

  return (
    <section
      id="no-system"
      ref={ref}
      className="relative overflow-hidden pb-24 pt-16 md:py-28"
      style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #0d0d0d 50%, #0a0a0a 100%)" }}
    >
      {/* Top & bottom borders with red tint */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,30,30,0.35) 30%, rgba(255,30,30,0.35) 70%, transparent)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,30,30,0.18) 40%, rgba(255,30,30,0.18) 60%, transparent)" }}
      />

      {/* Subtle ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,30,30,0.07), transparent 65%)" }}
      />

      <div className="mx-auto w-full max-w-[1140px] px-5 md:px-8">
        {/* Section heading */}
        <div data-ns-head>
          <SectionLabel>{data.eyebrow}</SectionLabel>
          <h2 className="mt-3 max-w-3xl font-display text-3xl uppercase leading-[0.95] tracking-[0.01em] text-white md:text-5xl">
            {data.title}
          </h2>
          <p className="mt-4 max-w-2xl text-balance text-[0.96rem] leading-relaxed text-[var(--muted)] md:text-[1.04rem]">
            {data.subtitle}
          </p>
        </div>

        {/* Red divider */}
        <div
          aria-hidden="true"
          className="mt-10 h-px w-full"
          style={{ background: "linear-gradient(90deg, rgba(255,30,30,0.55) 0%, rgba(255,30,30,0.12) 55%, transparent 100%)" }}
        />

        {/* Three problem blocks */}
        <div
          data-ns-grid
          className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6 lg:gap-10"
        >
          {data.blocks.map((block) => (
            <div key={block.number} data-ns-block="true" className="flex flex-col">
              {/* Number */}
              <span
                aria-hidden="true"
                className="font-display text-[3.2rem] leading-none text-[rgba(255,30,30,0.30)] md:text-[3.8rem]"
              >
                {block.number}
              </span>

              {/* Red rule */}
              <div
                aria-hidden="true"
                className="mt-3 h-[2px] w-10"
                style={{ background: "linear-gradient(90deg, var(--red), transparent)" }}
              />

              {/* Heading */}
              <h3 className="mt-4 font-heading text-[1.06rem] font-bold uppercase tracking-[0.06em] text-white md:text-[1.12rem]">
                {block.heading}
              </h3>

              {/* Description */}
              <p className="mt-3 text-[0.9rem] leading-[1.7] text-[rgba(232,224,213,0.70)]">
                {block.text}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom divider */}
        <div
          aria-hidden="true"
          className="mt-12 h-px w-full"
          style={{ background: "linear-gradient(90deg, rgba(255,30,30,0.18) 0%, rgba(255,30,30,0.05) 55%, transparent 100%)" }}
        />

        {/* Closing block + CTA */}
        <div data-ns-close className="mt-10">
          <div className="rounded-xl border-l-[3px] border-[var(--red)] bg-[rgba(255,30,30,0.06)] px-6 py-5">
            <p className="text-[1.02rem] font-semibold leading-relaxed text-[var(--red-bright)] md:text-[1.1rem]">
              {data.closing}
            </p>
          </div>
          <div className="mt-7">
            <PremiumCTA
              href={cta.href}
              label={cta.primaryLabel}
              ariaLabel={cta.ariaLabel}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
