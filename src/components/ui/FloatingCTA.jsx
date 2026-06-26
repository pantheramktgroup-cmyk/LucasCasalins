import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function FloatingCTA({ label, href, ariaLabel }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.9);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={`fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full bg-[var(--red)] px-6 py-3.5 font-heading text-xs font-bold uppercase tracking-[0.16em] text-white shadow-glow transition-all duration-300 hover:bg-[var(--red-bright)] hover:shadow-glow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--red-bright)] md:inline-flex ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <span className="animate-red-pulse absolute inset-0 rounded-full" aria-hidden="true" />
      <span className="relative">{label}</span>
      <ArrowRight className="relative h-4 w-4" />
    </a>
  );
}
