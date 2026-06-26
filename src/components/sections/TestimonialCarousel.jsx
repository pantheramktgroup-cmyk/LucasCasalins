import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionLabel from "../ui/SectionLabel";

export default function TestimonialCarousel({ data, ui = {} }) {
  const [index, setIndex] = useState(0);
  const total = data.items.length;
  const current = data.items[index];

  return (
    <section id="testimonials" className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1080px] px-5 md:px-8">
        <SectionLabel>{data.label}</SectionLabel>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_260px]">
          {/* Quote block */}
          <div className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[linear-gradient(140deg,rgba(255,255,255,0.04),rgba(12,12,12,0.88))] p-8 md:p-10">
            {/* Decorative quote mark */}
            <span
              className="pointer-events-none absolute -top-4 left-6 select-none font-display text-[9rem] leading-none text-[rgba(255,30,30,0.1)]"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <div className="relative">
              <p className="text-[1.2rem] leading-[1.55] text-[var(--text)] md:text-[1.35rem]">
                &ldquo;{current.quote}&rdquo;
              </p>
              <div className="mt-7 border-t border-[var(--line)] pt-5">
                <p className="font-heading text-base font-bold uppercase tracking-[0.1em] text-[var(--text)]">
                  {current.name}
                </p>
                <p className="mt-1 text-[0.68rem] uppercase tracking-[0.22em] text-[var(--muted)]">
                  {current.role}
                </p>
              </div>
            </div>
          </div>

          {/* Counter + nav */}
          <div className="flex flex-row items-center justify-between rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.025)] px-6 py-5 lg:flex-col lg:items-start lg:justify-between lg:py-8">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[var(--muted)]">
                Testimonio
              </p>
              <p className="mt-2 font-heading text-4xl font-black tabular-nums text-[var(--orange-soft)]">
                {String(index + 1).padStart(2, "0")}
                <span className="text-base text-[var(--muted)]">
                  {" "}/ {String(total).padStart(2, "0")}
                </span>
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIndex((p) => (p === 0 ? total - 1 : p - 1))}
                aria-label={ui.previous}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-[var(--text)] transition-all hover:border-[var(--line-warm)] hover:text-[var(--orange-soft)]"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setIndex((p) => (p + 1) % total)}
                aria-label={ui.next}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-[var(--text)] transition-all hover:border-[var(--line-warm)] hover:text-[var(--orange-soft)]"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
