import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";

/**
 * MethodSectionB — Landing B variant of the "Why ARETÉ" section.
 * Uses a vertical numbered-step layout (borrowed from the former OutcomesB style)
 * to explain the 3 differentiators with more narrative depth.
 */
export default function MethodSectionB({ data }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.fromTo(
        "[data-mb-head]",
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
        "[data-mb-step]",
        { opacity: 0.01, x: -64, rotateX: 7, transformPerspective: 800 },
        {
          opacity: 1,
          x: 0,
          rotateX: 0,
          duration: 0.72,
          stagger: { each: 0.14 },
          ease: "back.out(1.5)",
          immediateRender: false,
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: ref.current, start: "top 72%", once: true },
        },
      );
    },
    { scope: ref, dependencies: [reducedMotion] },
  );

  return (
    <section id="method" ref={ref} className="py-16 md:py-28">
      <div className="mx-auto w-full max-w-[1080px] px-5 md:px-8">
        {/* Heading block */}
        <div data-mb-head>
          <h2 className="max-w-3xl font-display text-3xl uppercase leading-[0.96] tracking-[0.01em] text-white md:text-5xl">
            {data.title}
          </h2>
          <p className="mt-5 max-w-2xl text-[0.97rem] leading-relaxed text-[var(--muted)] md:text-[1.05rem]">
            {data.intro}
          </p>
        </div>

        {/* Vertical steps — number integrated inside each card */}
        <div className="relative mt-12 md:mt-14">
          <div className="space-y-5 md:space-y-4">
            {data.cards.map((card, idx) => (
              <article
                key={idx}
                data-mb-step="true"
                className="group relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[rgba(14,14,14,0.82)] p-6 transition-all duration-300 hover:border-[rgba(255,30,30,0.32)] hover:bg-[rgba(14,14,14,0.95)] hover:shadow-[0_0_28px_rgba(255,30,30,0.16)] md:p-7"
              >
                {/* Number + horizontal rule */}
                <div className="mb-4 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="font-display text-[2.8rem] leading-none text-[rgba(255,30,30,0.32)] transition-colors duration-300 group-hover:text-[rgba(255,30,30,0.58)] md:text-[3.2rem]"
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div
                    aria-hidden="true"
                    className="h-px flex-1"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,30,30,0.40) 0%, rgba(255,30,30,0.10) 55%, transparent 100%)",
                    }}
                  />
                </div>

                <p className="text-[0.92rem] leading-[1.72] text-[rgba(255,244,234,0.88)] md:text-[0.96rem]">
                  {card}
                </p>

                {/* Bottom energy bar on hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[var(--red)] via-[var(--red-bright)] to-transparent transition-all duration-500 group-hover:w-3/4"
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
