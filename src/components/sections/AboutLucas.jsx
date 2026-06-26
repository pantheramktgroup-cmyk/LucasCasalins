import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import MagneticCTA from "../ui/MagneticCTA";
import SectionLabel from "../ui/SectionLabel";

export default function AboutLucas({ data, cta }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.from("[data-about-img]", {
        autoAlpha: 0,
        x: -24,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });

      gsap.from("[data-about-block]", {
        autoAlpha: 0,
        y: 20,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });

      gsap.to("[data-about-img] img", {
        yPercent: -5,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: ref },
  );

  return (
    <section id="about" ref={ref} className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1260px] px-5 md:px-8">
        <SectionLabel>{data.eyebrow}</SectionLabel>
        <h2 className="mt-3 max-w-4xl font-display text-4xl uppercase leading-[0.92] tracking-[0.01em] text-white md:text-6xl lg:text-[4rem]">
          {data.title}
        </h2>

        <div className="mt-10 grid gap-5 lg:grid-cols-[420px_1fr] lg:items-start xl:grid-cols-[480px_1fr]">
          {/* Image */}
          <div
            data-about-img="true"
            className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--bg-soft)]"
          >
            <img
              src={data.image}
              alt="Lucas Casalins"
              className="h-full w-full object-cover object-top"
              style={{ minHeight: "520px", maxHeight: "640px" }}
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          {/* Content grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {data.bullets.map((bullet, idx) => (
              <article
                key={idx}
                data-about-block="true"
                className="rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.03)] p-5"
              >
                <p className="text-sm leading-relaxed text-[var(--muted)] md:text-[0.95rem]">
                  {bullet}
                </p>
              </article>
            ))}

            {/* Final statement full-width */}
            <article
              data-about-block="true"
              className="rounded-2xl border border-[var(--line-warm)] bg-[rgba(255,30,30,0.07)] p-6 md:col-span-2"
            >
              <p className="text-base leading-relaxed text-[var(--orange-soft)] md:text-lg">
                {data.finalStatement}
              </p>
              <div className="mt-5">
                <MagneticCTA
                  href={cta.href}
                  label={cta.primaryLabel}
                  ariaLabel={cta.ariaLabel}
                />
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
