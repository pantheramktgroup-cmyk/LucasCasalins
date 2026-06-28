export default function HeroInteractiveBackground({ reducedMotion }) {
  return (
    <div data-h="bg" className="pointer-events-none absolute inset-0 -z-10">
      {/* Base gradient: very deep black with red ambient glow at top */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_96%_62%_at_50%_0%,rgba(255,30,30,0.28),transparent_55%),linear-gradient(180deg,#060202_0%,#040101_40%,#030303_100%)]" />

      {/* Mouse-reactive red glow */}
      <div
        data-bg-parallax
        className="absolute inset-0"
        style={{
          opacity: reducedMotion ? 0.3 : 0.70,
          background:
            "radial-gradient(720px 480px at calc(var(--mouse-x, 50) * 1%) calc(var(--mouse-y, 24) * 1%), rgba(255, 30, 30, 0.30), rgba(184, 0, 0, 0.10) 44%, transparent 70%)",
          transition: reducedMotion ? "none" : "opacity 280ms ease",
        }}
      />

      {/* Large atmospheric smoke — left side, primary color red */}
      <div
        data-bg-parallax
        aria-hidden="true"
        className={`hero-smoke-a absolute -left-40 top-[10%] h-[520px] w-[620px] rounded-full`}
        style={{
          background: "radial-gradient(circle, rgba(255,30,30,0.24), transparent 65%)",
          filter: "blur(62px)",
        }}
      />

      {/* Large atmospheric smoke — right side, secondary warm red */}
      <div
        data-bg-parallax
        aria-hidden="true"
        className={`hero-smoke-b absolute -right-28 top-[22%] h-[420px] w-[520px] rounded-full`}
        style={{
          background: "radial-gradient(circle, rgba(220,50,0,0.16), transparent 62%)",
          filter: "blur(72px)",
        }}
      />

      {/* Center bottom haze — red smoke rising */}
      <div
        data-bg-parallax
        aria-hidden="true"
        className="hero-smoke-a absolute bottom-[-8%] left-1/2 h-[340px] w-[700px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse 82% 75% at 50% 100%, rgba(255,30,30,0.18), transparent 70%)",
          filter: "blur(48px)",
        }}
      />

      {/* Small hot-spot — upper-right energy */}
      <div
        aria-hidden="true"
        className="hero-smoke-b absolute right-[12%] top-[6%] h-[200px] w-[260px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,60,0,0.14), transparent 60%)",
          filter: "blur(44px)",
        }}
      />

      {/* Drifting red smoke cloud — soft parallax driven by the mouse position */}
      <div
        aria-hidden="true"
        className="hero-smoke-a absolute h-[460px] w-[560px] rounded-full"
        style={{
          left: "calc(var(--mouse-x, 50) * 1% - 280px)",
          top: "calc(var(--mouse-y, 24) * 0.7% + 60px)",
          background:
            "radial-gradient(circle, rgba(255,40,20,0.12), transparent 64%)",
          filter: "blur(70px)",
          opacity: reducedMotion ? 0.18 : 0.42,
          transition: reducedMotion ? "none" : "left 520ms ease-out, top 520ms ease-out",
        }}
      />


      {/* Fine grain / noise texture */}
      <div
        className="bg-noise absolute inset-0"
        style={{ opacity: 0.11, mixBlendMode: "soft-light" }}
      />

      {/* Vignette — dark corners, bottom fade to near-black */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 86% 86% at 50% 40%, transparent 42%, rgba(8,0,0,0.72) 100%)",
        }}
      />

      {/* Side darkening — keeps text legible against blobs */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(4,0,0,0.45) 0%, transparent 22%, transparent 78%, rgba(4,0,0,0.45) 100%)",
        }}
      />

      {/* Top red light strip */}
      <div
        className="absolute inset-x-0 top-0 h-48"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,15,15,0.10) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
