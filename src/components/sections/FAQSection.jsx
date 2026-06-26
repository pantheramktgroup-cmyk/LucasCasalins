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
      gsap.from("[data-faq-shell]", {
        autoAlpha: 0,
        y: 22,
        scrollTrigger: { trigger: ref.current, start: "top 78%" },
      });
    },
    { scope: ref },
  );

  return (
    <section id="faq" ref={ref} className="section-padding pb-20">
      <div className="premium-container max-w-[1080px]">
        <SectionLabel>{data.eyebrow}</SectionLabel>
        <h2 className="mb-8 font-display text-3xl uppercase tracking-[0.01em] text-white md:text-5xl">
          {data.title}
        </h2>
        <div data-faq-shell="true" className="rounded-[1.8rem] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-3 md:p-5">
          <Accordion items={data.items} />
        </div>
      </div>
    </section>
  );
}
