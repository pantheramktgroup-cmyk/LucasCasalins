import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function RevealText({ as: Tag = "div", children, className = "" }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) {
        gsap.set(ref.current, { autoAlpha: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, y: 28, clipPath: "inset(0 0 100% 0)" },
        {
          autoAlpha: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.95,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 92%",
            once: true,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
