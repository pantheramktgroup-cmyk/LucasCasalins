export default function HeroInteractiveBackground({ reducedMotion }) {
  return (
    <div data-h="bg" className="pointer-events-none absolute inset-0 -z-10">
      {/* Base gradient: deep black with a red top glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,rgba(255,30,30,0.16),transparent_60%),linear-gradient(180deg,#070303_0%,#050202_42%,#030303_100%)]" />

      {/* Faint grid */}
      <div data-bg-parallax className="bg-grid-faint absolute inset-0 opacity-60" />

      {/* Red dot pattern */}
      <div data-bg-parallax className="bg-dots-red absolute inset-0 opacity-70" />

      {/* Mouse-reactive red glow */}
      <div
        data-bg-parallax
        className="absolute inset-0"
        style={{
          opacity: reducedMotion ? 0.3 : 0.6,
          background:
            "radial-gradient(620px 400px at calc(var(--mouse-x, 50) * 1%) calc(var(--mouse-y, 24) * 1%), rgba(255, 30, 30, 0.26), rgba(184, 0, 0, 0.08) 42%, transparent 70%)",
          transition: reducedMotion ? "none" : "opacity 280ms ease",
        }}
      />

      {/* Diffuse red blob — left */}
      <div
        data-bg-parallax
        className="absolute -left-24 top-[20%] h-[320px] w-[440px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,30,30,0.18), transparent 68%)",
          filter: "blur(46px)",
        }}
      />

      {/* Diffuse red/orange blob — right */}
      <div
        data-bg-parallax
        className="absolute -right-20 top-[34%] h-[260px] w-[360px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,106,0,0.1), transparent 65%)",
          filter: "blur(54px)",
        }}
      />

      {/* Fine grain / noise */}
      <div
        className="bg-noise absolute inset-0"
        style={{ opacity: 0.08, mixBlendMode: "soft-light" }}
      />

      {/* Edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 92% 92% at 50% 45%, transparent 52%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
