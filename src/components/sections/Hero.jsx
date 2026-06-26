import { useRef, useState } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import MagneticCTA from "../ui/MagneticCTA";
import ScrollArrow from "../ui/ScrollArrow";
import HeroInteractiveBackground from "./hero/HeroInteractiveBackground";

function formatMetric(value, n) {
  const rounded = Math.round(n);

  if (value === "+2.500") {
    return `+${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  }
  if (value === "+15") return `+${rounded}`;
  if (value === "100%") return `${rounded}%`;
  return `${rounded}`;
}

// Splits at " en sólo " and includes that phrase in line2 so both
// lines are driven purely from LandingCopy — no hardcoded Spanish in JSX.
function splitTitle(title) {
  const idx = title.search(/ en s[\u00f3o]lo /i);
  if (idx === -1) return [title, ""];
  return [title.slice(0, idx).trim(), title.slice(idx + 1).trim()];
}

export default function Hero({ data, cta, header }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const [videoReady, setVideoReady] = useState(false);

  useGSAP(
    (context, contextSafe) => {
      const heroEl = ref.current;
      if (!heroEl) return;

      const clampX = gsap.utils.clamp(8, 92);
      const clampY = gsap.utils.clamp(10, 86);

      if (!reducedMotion) {
        const xTo = gsap.quickTo(heroEl, "--mouse-x", {
          duration: 0.45,
          ease: "power3.out",
        });
        const yTo = gsap.quickTo(heroEl, "--mouse-y", {
          duration: 0.45,
          ease: "power3.out",
        });

        const onPointerMove = contextSafe((event) => {
          const bounds = heroEl.getBoundingClientRect();
          const xPercent = ((event.clientX - bounds.left) / bounds.width) * 100;
          const yPercent = ((event.clientY - bounds.top) / bounds.height) * 100;
          xTo(clampX(xPercent));
          yTo(clampY(yPercent));
        });

        const onPointerLeave = contextSafe(() => {
          xTo(50);
          yTo(24);
        });

        heroEl.addEventListener("pointermove", onPointerMove);
        heroEl.addEventListener("pointerleave", onPointerLeave);

        context.add(() => {
          heroEl.removeEventListener("pointermove", onPointerMove);
          heroEl.removeEventListener("pointerleave", onPointerLeave);
        });
      }

      if (reducedMotion) return;

      const introTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.08,
      });

      introTl
        .from("[data-h='bg']", { autoAlpha: 0, duration: 0.8 })
        .from(
          "[data-h='logo']",
          { autoAlpha: 0, y: -18, duration: 0.58 },
          "-=0.56",
        )
        .from(
          "[data-h='ey']",
          {
            autoAlpha: 0,
            scaleX: 0.92,
            transformOrigin: "50% 50%",
            duration: 0.46,
          },
          "<0.05",
        )
        .from(
          "[data-h='line-1'] .line-inner",
          {
            yPercent: 105,
            rotationX: 7,
            transformPerspective: 640,
            transformOrigin: "50% 100%",
            duration: 0.86,
            ease: "power4.out",
          },
          "-=0.1",
        )
        .from(
          "[data-h='line-2'] .line-inner",
          {
            yPercent: 105,
            rotationX: 7,
            transformPerspective: 640,
            transformOrigin: "50% 100%",
            duration: 0.86,
            ease: "power4.out",
          },
          "<0.14",
        )
        .from("[data-h='sub']", { autoAlpha: 0, y: 18, filter: "blur(8px)", duration: 0.62, clearProps: "filter" }, "-=0.4")
        .from("[data-h='sup']", { autoAlpha: 0, y: 12, duration: 0.44 }, "<0.08")
        .from(
          "[data-h='cta']",
          {
            autoAlpha: 0,
            y: 12,
            scale: 0.93,
            duration: 0.58,
            ease: "back.out(1.35)",
          },
          "-=0.18",
        )
        .from(
          "[data-h='video-shell']",
          {
            autoAlpha: 0,
            y: 24,
            clipPath: "inset(8% 0% 0% 0% round 24px)",
            duration: 0.86,
          },
          "-=0.06",
        )
        .from("[data-h='metrics-wrap']", { autoAlpha: 0, y: 16, duration: 0.58 }, "-=0.44")
        .from(
          "[data-metric-item]",
          { autoAlpha: 0, y: 12, duration: 0.42, stagger: { each: 0.07 } },
          "<0.08",
        )
        .from("[data-h='arrow']", { autoAlpha: 0, y: 8, duration: 0.44 }, "-=0.1");

      gsap.to("[data-h='video-shell']", {
        yPercent: -2.8,
        ease: "none",
        scrollTrigger: {
          trigger: heroEl,
          start: "top top",
          end: "bottom top",
          scrub: 0.7,
        },
      });

      gsap.to("[data-bg-parallax]", {
        yPercent: -7,
        ease: "none",
        scrollTrigger: {
          trigger: heroEl,
          start: "top top",
          end: "bottom top",
          scrub: 0.9,
        },
      });

      data.proofStrip.forEach((metric, index) => {
        const el = heroEl.querySelector(`[data-metric-idx="${index}"]`);
        if (!el) return;

        if (!metric.countTo) {
          gsap.from(el, {
            autoAlpha: 0,
            scale: 0.9,
            duration: 0.45,
            delay: index * 0.06,
            scrollTrigger: {
              trigger: "[data-h='metrics-wrap']",
              start: "top 84%",
              once: true,
            },
          });
          return;
        }

        const counter = { n: 0 };
        gsap.to(counter, {
          n: metric.countTo,
          duration: 1.95,
          ease: "power2.out",
          delay: index * 0.07,
          onUpdate: () => {
            el.textContent = formatMetric(metric.value, counter.n);
          },
          onComplete: () => {
            gsap.fromTo(
              el,
              { scale: 1 },
              {
                scale: 1.055,
                duration: 0.16,
                repeat: 1,
                yoyo: true,
                ease: "power1.out",
                transformOrigin: "50% 50%",
              },
            );
          },
          scrollTrigger: {
            trigger: "[data-h='metrics-wrap']",
            start: "top 84%",
            once: true,
          },
        });
      });
    },
    { scope: ref, dependencies: [reducedMotion] },
  );

  const [line1Raw, line2Raw] = splitTitle(data.title);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative overflow-hidden"
      style={{
        "--mouse-x": 50,
        "--mouse-y": 24,
      }}
    >
      <HeroInteractiveBackground reducedMotion={reducedMotion} />

      {/* Top header bar */}
      <header
        data-h="logo"
        className="relative z-20 mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-5 py-5 md:px-8"
      >
        <img
          src={header?.logo || data.logo}
          alt={header?.logoAlt || "ARETÉ"}
          className="h-10 w-auto object-contain md:h-12"
          fetchPriority="high"
          decoding="async"
        />

        {header?.nav?.length ? (
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegación">
            {header.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-[var(--red-bright)]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        ) : null}

        <a
          href={header?.ctaHref || cta.href}
          aria-label={cta.ariaLabel}
          className="hidden items-center gap-2 rounded-full border border-[var(--red)] bg-[rgba(255,30,30,0.1)] px-5 py-2.5 font-heading text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[var(--red-bright)] transition duration-300 hover:bg-[var(--red)] hover:text-white hover:shadow-glow sm:inline-flex"
        >
          {header?.ctaLabel || cta.primaryLabel}
        </a>
      </header>

      {/* Hero content — two columns */}
      <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-10 px-5 pb-10 pt-6 md:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 lg:pt-8">
        {/* Left: copy + CTA */}
        <div className="text-center lg:text-left">
          <div data-h="ey" className="flex justify-center lg:justify-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--red)] bg-[rgba(255,30,30,0.08)] px-5 py-2 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[var(--red-bright)] md:text-[0.64rem]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--red)] shadow-[0_0_10px_rgba(255,30,30,0.9)]" />
              {data.eyebrow}
            </span>
          </div>

          <h1 className="mx-auto mt-6 max-w-[640px] font-display uppercase leading-[0.9] tracking-[0.005em] text-[clamp(2.3rem,9vw,3rem)] lg:mx-0 lg:text-[clamp(3rem,4.4vw,4.2rem)]">
            <span
              data-h="line-1"
              className="block overflow-hidden pb-[0.05em] transform-gpu will-change-transform"
            >
              <span className="line-inner block text-white">{line1Raw.toUpperCase()}</span>
            </span>
            <span
              data-h="line-2"
              className="block overflow-hidden pb-[0.05em] transform-gpu will-change-transform"
            >
              <span className="line-inner block text-[var(--red)] text-glow-red">
                {line2Raw.toUpperCase()}
              </span>
            </span>
          </h1>

          <p
            data-h="sub"
            className="mx-auto mt-6 max-w-[560px] text-[0.98rem] font-normal leading-[1.6] text-[rgba(255,244,234,0.82)] lg:mx-0 md:text-[1.04rem]"
          >
            {data.subtitle}
          </p>

          <p
            data-h="sup"
            className="mx-auto mt-4 max-w-[520px] text-[0.86rem] font-semibold leading-[1.5] text-[var(--red-bright)] lg:mx-0 md:text-[0.92rem]"
          >
            {data.supportText}
          </p>

          <div data-h="cta" className="mt-8 flex justify-center lg:justify-start">
            <MagneticCTA
              href={cta.href}
              label={cta.primaryLabel}
              ariaLabel={cta.ariaLabel}
              className="!min-h-[58px] !px-[36px] !py-0 !whitespace-nowrap !text-[0.74rem] md:!min-h-[64px] md:!px-[44px] md:!text-[0.8rem]"
            />
          </div>
        </div>

        {/* Right: video teaser card */}
        <div data-h="video-shell" className="mx-auto w-full max-w-[460px] lg:mx-0 lg:ml-auto">
          <div
            className="relative overflow-hidden rounded-3xl bg-[#050202]"
            style={{
              border: "1px solid rgba(255,30,30,0.45)",
              boxShadow:
                "0 0 0 1px rgba(255,30,30,0.1), 0 0 50px rgba(255,30,30,0.22), 0 18px 60px rgba(0,0,0,0.7)",
            }}
          >
            <div className="relative aspect-[4/5]">
              {videoReady ? (
                <iframe
                  src={data.video.embedUrl}
                  title={data.title}
                  className="absolute inset-0 h-full w-full"
                  loading="eager"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              ) : (
                <>
                  <img
                    src={data.video.poster}
                    alt={data.title}
                    className="h-full w-full object-cover object-top"
                    fetchPriority="high"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/65" />
                  <button
                    type="button"
                    onClick={() => setVideoReady(true)}
                    aria-label="Reproducir video"
                    className="group absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                  >
                    <span className="absolute inset-[-16px] scale-95 rounded-full border border-[var(--red)] opacity-30 transition-all duration-500 group-hover:scale-110 group-hover:opacity-60" />
                    <span className="flex h-[68px] w-[68px] items-center justify-center rounded-full border-2 border-[var(--red)] bg-[rgba(0,0,0,0.35)] backdrop-blur-sm transition-all duration-300 group-hover:bg-[rgba(255,30,30,0.12)] group-hover:shadow-[0_0_34px_rgba(255,30,30,0.5)] md:h-[80px] md:w-[80px]">
                      <svg
                        width="20"
                        height="24"
                        viewBox="0 0 18 22"
                        fill="none"
                        className="translate-x-[2px]"
                        aria-hidden="true"
                      >
                        <path
                          d="M1 1L17 11L1 21V1Z"
                          stroke="var(--red)"
                          strokeWidth="1.6"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Metrics strip — full width */}
      <div data-h="metrics-wrap" className="relative mx-auto mt-6 w-full max-w-[1280px] px-5 md:px-8">
        <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-[var(--line)] bg-[rgba(255,30,30,0.03)] backdrop-blur-sm sm:grid-cols-3 lg:grid-cols-6">
          {data.proofStrip.map((item, idx) => (
            <article
              key={item.label}
              data-metric-item="true"
              className="group flex min-h-[80px] flex-col items-center justify-center border-b border-r border-[var(--line)] px-3 py-[14px] text-center transition-colors duration-300 hover:bg-[rgba(255,30,30,0.08)] last:border-r-0 lg:min-h-[92px] lg:border-b-0"
            >
              <p
                data-metric-idx={idx}
                className="font-display text-[1.5rem] leading-none text-[var(--red)] transition duration-300 group-hover:brightness-125 md:text-[1.7rem]"
              >
                {item.value}
              </p>
              <p className="mt-2 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-[rgba(232,224,213,0.74)] md:text-[0.6rem]">
                {item.label}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div data-h="arrow" className="relative mt-10 flex justify-center pb-12">
        <ScrollArrow />
      </div>
    </section>
  );
}
