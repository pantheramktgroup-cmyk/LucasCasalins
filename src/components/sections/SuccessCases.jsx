import { useRef, useState } from "react";
import { X } from "lucide-react";
import { gsap, useGSAP } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import SectionLabel from "../ui/SectionLabel";
import MagneticCTA from "../ui/MagneticCTA";

export default function SuccessCases({ data, cta, ui = {} }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(null);

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.from("[data-case-item]", {
        autoAlpha: 0,
        x: 40,
        stagger: 0.06,
        duration: 0.75,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 72%",
        },
      });
    },
    { scope: ref },
  );

  return (
    <section id="cases" ref={ref} className="section-padding overflow-hidden">
      <div className="premium-container max-w-[1320px]">
        <SectionLabel>{data.eyebrow}</SectionLabel>
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <h2 className="max-w-5xl font-display text-4xl uppercase leading-[0.95] tracking-[0.01em] text-white md:text-6xl lg:text-7xl">
            {data.title}
          </h2>
          <MagneticCTA href={cta.href} label={cta.primaryLabel} ariaLabel={cta.ariaLabel} />
        </div>

        <div className="scrollbar-hide mt-12 overflow-x-auto pb-4">
          <div className="flex w-max min-w-full snap-x snap-mandatory gap-4 md:gap-5">
            {data.items.map((item, index) => (
              <button
                key={item.name + index}
                type="button"
                data-case-item="true"
                aria-label={ui.viewImage || item.name}
                onClick={() => setActive(index)}
                className="group relative w-[calc(50vw-1.4rem)] snap-start overflow-hidden rounded-[1.2rem] border border-[var(--line)] bg-[var(--bg-soft)] text-left sm:w-[calc(33.333vw-1.6rem)] lg:w-[calc(16.666vw-1rem)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <p className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-text">{item.name}</p>
                  <p className="mt-1 text-[0.66rem] uppercase tracking-[0.18em] text-muted">
                    {item.role} • {item.duration}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {active !== null ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/88 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[var(--bg-soft)]">
            <img
              src={data.items[active].image}
              alt={data.items[active].name}
              className="max-h-[78vh] w-full object-contain"
              decoding="async"
            />
            <div className="flex items-end justify-between gap-6 border-t border-[var(--line)] p-5">
              <div>
                <p className="font-heading text-lg font-semibold uppercase text-text">{data.items[active].name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">
                  {data.items[active].role} • {data.items[active].duration}
                </p>
              </div>
              <button
                type="button"
                aria-label={ui.close}
                onClick={() => setActive(null)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] text-text transition hover:border-[var(--line-warm)]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
