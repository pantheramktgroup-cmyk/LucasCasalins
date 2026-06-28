import { useRef } from "react";
import { X } from "lucide-react";
import { gsap, useGSAP } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import PremiumCTA from "../ui/PremiumCTA";

export default function PainSection({ data, cta }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.fromTo(
        "[data-pain-head]",
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
        "[data-pain-card]",
        { opacity: 0.01, y: 44, scale: 0.94, rotateX: 8, transformPerspective: 800 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.66,
          stagger: { each: 0.09, from: "start" },
          ease: "back.out(1.5)",
          immediateRender: false,
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: ref.current, start: "top 74%", once: true },
        },
      );

      // Very subtle organic parallax on the dots layer
      gsap.to("[data-dots-layer]", {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.8,
        },
      });
    },
    { scope: ref, dependencies: [reducedMotion] },
  );

  return (
    <section id="pain" ref={ref} className="relative overflow-hidden py-16 md:py-24">
      {/* Atmospheric blobs — large, blurred, slowly animated — NO repeating pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 will-change-transform"
        data-dots-layer="true"
        style={{ filter: "blur(58px)" }}
      >
        <div
          className="absolute"
          style={{
            left: "2%", top: "8%", width: "54%", height: "62%",
            background: "radial-gradient(ellipse, rgba(255,30,30,0.15), transparent 68%)",
            animation: "blobDrift1 18s ease-in-out infinite",
          }}
        />
        <div
          className="absolute"
          style={{
            right: "-4%", top: "24%", width: "50%", height: "55%",
            background: "radial-gradient(ellipse, rgba(200,10,10,0.11), transparent 70%)",
            animation: "blobDrift2 24s ease-in-out infinite",
          }}
        />
        <div
          className="absolute"
          style={{
            left: "26%", bottom: "-8%", width: "54%", height: "48%",
            background: "radial-gradient(ellipse, rgba(180,5,5,0.09), transparent 72%)",
            animation: "blobDrift3 20s ease-in-out infinite",
          }}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,30,30,0.07),transparent_52%)]"
        aria-hidden="true"
      />
      <div className="mx-auto w-full max-w-[1080px] px-5 md:px-8">
        <h2 data-pain-head className="max-w-2xl font-display text-3xl uppercase leading-[0.96] tracking-[0.01em] text-white md:text-5xl">
          {data.title}
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          {data.items.map((item) => (
            <article
              key={item}
              data-pain-card="true"
              className="group relative flex items-start gap-3.5 overflow-hidden rounded-xl border border-[var(--line)] bg-[rgba(14,14,14,0.82)] p-5 backdrop-blur-[1px] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-warm)] hover:shadow-[0_0_26px_rgba(255,30,30,0.16)]"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_25%_25%,rgba(255,30,30,0.08),transparent_65%)]" />
              <span className="relative mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[rgba(255,30,30,0.45)] bg-[rgba(255,30,30,0.12)]">
                <X className="h-3.5 w-3.5 text-[var(--red-bright)]" strokeWidth={3} />
              </span>
              <p className="relative text-[0.9rem] leading-relaxed text-[var(--text)]">{item}</p>
            </article>
          ))}
        </div>

        {/* Bridge statement — text only, no CTA inside */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--line-warm)] bg-[rgba(255,30,30,0.07)] px-6 py-7 md:px-10 md:py-9">
          <p className="max-w-3xl text-lg font-medium leading-relaxed text-[var(--red-bright)] md:text-xl">
            {data.bridge}
          </p>
        </div>

        {/* CTA — outside the card, left-aligned */}
        {cta ? (
          <div className="mt-7">
            <PremiumCTA href={cta.href} label={cta.primaryLabel} ariaLabel={cta.ariaLabel} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
