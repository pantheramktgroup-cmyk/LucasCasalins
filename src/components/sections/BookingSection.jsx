import { useEffect } from "react";
import MagneticCTA from "../ui/MagneticCTA";
import SectionLabel from "../ui/SectionLabel";

export default function BookingSection({ data, cta }) {
  // Load the GoHighLevel embed script once
  useEffect(() => {
    if (document.querySelector(`script[src="${data.calendarEmbedScript}"]`)) return;
    const script = document.createElement("script");
    script.src = data.calendarEmbedScript;
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [data.calendarEmbedScript]);

  return (
    <section id="booking" className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1040px] px-5 md:px-8">
        <SectionLabel>{data.eyebrow}</SectionLabel>

        <h2 className="mt-3 font-display text-5xl uppercase leading-[0.9] tracking-[0.01em] text-white text-glow-red md:text-7xl">
          {data.title}
        </h2>

        {/* Duration pill */}
        <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--line-warm)] bg-[rgba(255,30,30,0.06)] px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.22em] text-[var(--text)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--red)] shadow-[0_0_10px_rgba(255,30,30,0.8)]" />
          {data.duration} · Consulta inicial sin cargo
        </p>

        <div className="mt-6">
          <MagneticCTA href="#booking-embed" label={cta.primaryLabel} ariaLabel={cta.ariaLabel} />
        </div>

        {/* Calendar embed inside a dark, red-glow block */}
        <div
          className="relative mt-10 overflow-hidden rounded-[1.6rem] border border-[var(--red)] bg-[#070303] p-2 md:p-3"
          style={{
            boxShadow:
              "0 0 0 1px rgba(255,30,30,0.12), 0 0 60px rgba(255,30,30,0.22), 0 18px 60px rgba(0,0,0,0.7)",
          }}
        >
          <div className="bg-dots-red pointer-events-none absolute inset-0 opacity-30" />
          <div
            id="booking-embed"
            className="relative overflow-hidden rounded-[1.2rem] border border-[var(--line)] bg-[var(--surface)]"
          >
            <iframe
              src={data.calendarEmbedUrl}
              id={data.calendarEmbedId}
              title={data.title}
              style={{ width: "100%", border: "none", overflow: "hidden" }}
              scrolling="no"
              className="min-h-[700px] w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
