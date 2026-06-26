import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import SectionLabel from "../ui/SectionLabel";

export default function VideoProof({ data }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const reducedMotion = useReducedMotion();

  // Duplicate items for seamless infinite loop
  const loopItems = [...data.items, ...data.items];

  useGSAP(
    () => {
      if (reducedMotion) return;

      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const tween = gsap.to(track, {
        xPercent: -50,
        duration: 60,
        ease: "none",
        repeat: -1,
      });

      const pause = () => tween.pause();
      const resume = () => tween.resume();

      section.addEventListener("mouseenter", pause);
      section.addEventListener("mouseleave", resume);

      return () => {
        section.removeEventListener("mouseenter", pause);
        section.removeEventListener("mouseleave", resume);
      };
    },
    { scope: sectionRef },
  );

  return (
    <section id="proof" ref={sectionRef} className="relative overflow-hidden py-14 md:py-16">
      <SectionLabel className="ml-5 md:ml-8">{data.eyebrow}</SectionLabel>

      {/* Gradient masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-[var(--bg)] to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-[var(--bg)] to-transparent md:w-40" />

      <div
        ref={trackRef}
        className="mt-5 flex gap-3 will-change-transform md:gap-4"
        style={{ width: "max-content" }}
      >
        {loopItems.map((item, idx) => (
          <article
            key={idx}
            className="group relative w-[170px] flex-shrink-0 overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--bg-soft)] transition-all duration-400 hover:-translate-y-1 hover:border-[var(--red)] hover:shadow-[0_0_28px_rgba(255,30,30,0.2)] sm:w-[200px]"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-3">
              <p className="font-heading text-sm font-bold uppercase tracking-[0.09em] text-white">
                {item.name}
              </p>
              <p className="mt-0.5 text-[0.6rem] uppercase tracking-[0.16em] text-[rgba(255,255,255,0.55)]">
                {item.role}
              </p>
              <p className="mt-0.5 text-[0.6rem] uppercase tracking-[0.16em] text-[var(--orange-soft)]">
                {item.duration}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
