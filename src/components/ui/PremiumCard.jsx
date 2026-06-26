import GlowBorder from "./GlowBorder";

export default function PremiumCard({ children, className = "", ...props }) {
  return (
    <GlowBorder
      {...props}
      className={`transition-transform duration-500 hover:-translate-y-1 hover:border-[var(--line-warm)] ${className}`}
    >
      <div className="relative z-10 p-7 md:p-8">{children}</div>
    </GlowBorder>
  );
}
