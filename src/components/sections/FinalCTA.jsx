import MagneticCTA from "../ui/MagneticCTA";

export default function FinalCTA({ data, cta }) {
  return (
    <section id="final-cta" className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1020px] px-5 md:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--line)] p-10 text-center md:p-14 lg:p-16">
          {/* Radial glow layers */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(255,30,30,0.16),transparent)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(5,5,5,0.45))]" />

          <div className="relative">
            <h2 className="mx-auto max-w-3xl font-display text-4xl uppercase leading-[0.92] tracking-[0.01em] text-white text-glow-red md:text-[4rem]">
              {data.title}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
              {data.text}
            </p>
            <div className="mt-8 flex justify-center">
              <MagneticCTA href={cta.href} label={cta.primaryLabel} ariaLabel={cta.ariaLabel} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
