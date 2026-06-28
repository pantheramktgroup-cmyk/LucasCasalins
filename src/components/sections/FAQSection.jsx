import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import SectionLabel from "../ui/SectionLabel";
import Accordion from "../ui/Accordion";

export default function FAQSection({ data }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.fromTo(
        "[data-faq-head] > *",
        { opacity: 0.01, y: 26, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.75,
          stagger: 0.1,
          ease: "power4.out",
          immediateRender: false,
          clearProps: "opacity,transform,filter",
          scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        },
      );

      gsap.fromTo(
        "[data-faq-shell]",
        { opacity: 0.01, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          immediateRender: false,
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: ref.current, start: "top 78%", once: true },
        },
      );

      // Staggered FAQ items entering one after another.
      gsap.fromTo(
        "[data-faq-shell] .space-y-4 > *",
        { opacity: 0.01, x: -40, y: 14 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.6,
          stagger: 0.09,
          ease: "back.out(1.6)",
          immediateRender: false,
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: "[data-faq-shell]", start: "top 80%", once: true },
        },
      );
    },
    { scope: ref, dependencies: [reducedMotion] },
  );

  return (
    <section id="faq" ref={ref} className="section-padding pb-20">
      <div className="premium-container max-w-[1080px]">
        <div data-faq-head>
          <SectionLabel>{data.eyebrow}</SectionLabel>
          <h2 className="mb-8 font-display text-3xl uppercase tracking-[0.01em] text-white md:text-5xl">
            {data.title}
          </h2>
        </div>
        <div data-faq-shell="true" className="rounded-[1.8rem] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-3 md:p-5">
          <Accordion items={data.items} />
        </div>
      </div>
    </section>
  );
}
