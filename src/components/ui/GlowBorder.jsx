export default function GlowBorder({ children, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.4rem] border border-[var(--line)] bg-[var(--surface)] backdrop-blur-lg ${className}`}
    >
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,30,30,0.2),transparent_55%)]" />
      {children}
    </div>
  );
}
