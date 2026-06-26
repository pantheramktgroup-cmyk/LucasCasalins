export default function UrgencyBar({ text }) {
  return (
    <div className="fixed inset-x-0 top-0 z-50 border-b border-white/20 bg-[var(--danger)] py-2">
      <p className="text-center font-heading text-xs font-bold uppercase tracking-[0.22em] text-white">
        {text}
      </p>
    </div>
  );
}
