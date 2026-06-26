export default function SectionLabel({ children, className = "" }) {
  return (
    <p className={`mb-5 inline-flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[var(--red-bright)] ${className}`}>
      <span className="h-px w-8 bg-[var(--red)] shadow-[0_0_10px_rgba(255,30,30,0.7)]" />
      {children}
    </p>
  );
}
