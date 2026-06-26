export default function MarqueeStrip({ items = [], className = "" }) {
  if (!items.length) return null;

  // Duplicate the sequence so the -50% translate loop is seamless.
  const sequence = [...items, ...items, ...items, ...items];

  return (
    <div
      className={`relative overflow-hidden border-y border-[var(--line)] bg-[linear-gradient(90deg,rgba(255,30,30,0.1),rgba(0,0,0,0.4),rgba(255,30,30,0.1))] py-4 ${className}`}
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee items-center will-change-transform">
        {sequence.map((item, idx) => (
          <span key={idx} className="flex items-center">
            <span className="px-6 font-display text-xl uppercase tracking-[0.08em] text-[rgba(255,244,234,0.85)] md:text-2xl">
              {item}
            </span>
            <span className="h-2 w-2 rotate-45 bg-[var(--red)] shadow-[0_0_12px_rgba(255,30,30,0.8)]" />
          </span>
        ))}
      </div>

      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[var(--bg)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[var(--bg)] to-transparent" />
    </div>
  );
}
