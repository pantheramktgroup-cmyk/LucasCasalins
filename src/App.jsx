import { useEffect } from "react";
import { landingCopy } from "./content/LandingCopy";
import PageShell from "./components/layout/PageShell";
import SmoothScrollProvider from "./components/layout/SmoothScrollProvider";
import Hero from "./components/sections/Hero";
import VideoProof from "./components/sections/VideoProof";
import SuccessCases from "./components/sections/SuccessCases";
import TestimonialCarousel from "./components/sections/TestimonialCarousel";
import PainSection from "./components/sections/PainSection";
import OutcomesSection from "./components/sections/OutcomesSection";
import MethodSection from "./components/sections/MethodSection";
import AboutLucas from "./components/sections/AboutLucas";
import BookingSection from "./components/sections/BookingSection";
import FAQSection from "./components/sections/FAQSection";
import FinalCTA from "./components/sections/FinalCTA";
import Footer from "./components/sections/Footer";
import MagneticCTA from "./components/ui/MagneticCTA";
import EntryOfferPopup from "./components/ui/EntryOfferPopup";
import MarqueeStrip from "./components/ui/MarqueeStrip";
import FloatingCTA from "./components/ui/FloatingCTA";
import { useIsMobile } from "./hooks/useIsMobile";

function App() {
  const isMobile = useIsMobile();

  useEffect(() => {
    document.title = landingCopy.meta.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", landingCopy.meta.description);
    }
  }, []);

  return (
    <SmoothScrollProvider>
      <PageShell>
        <EntryOfferPopup data={landingCopy.popup} />
        <main>
          <Hero data={landingCopy.hero} cta={landingCopy.cta} header={landingCopy.header} />
          <MarqueeStrip items={landingCopy.marquee.items} />
          <VideoProof data={landingCopy.successCases} />
          <SuccessCases data={landingCopy.successCases} cta={landingCopy.cta} ui={landingCopy.ui} />
          <TestimonialCarousel data={landingCopy.testimonials} ui={landingCopy.ui} />
          <PainSection data={landingCopy.pain} />
          <OutcomesSection data={landingCopy.outcomes} cta={landingCopy.cta} />
          <MarqueeStrip items={landingCopy.marquee.items} />
          <MethodSection data={landingCopy.method} />
          <AboutLucas data={landingCopy.about} cta={landingCopy.cta} />
          <BookingSection data={landingCopy.booking} cta={landingCopy.cta} />
          <FAQSection data={landingCopy.faq} />
          <FinalCTA data={landingCopy.finalCta} cta={landingCopy.cta} />
        </main>
        <Footer data={landingCopy.footer} ui={landingCopy.ui} />

        <FloatingCTA
          label={landingCopy.floatingCta.label}
          href={landingCopy.floatingCta.href}
          ariaLabel={landingCopy.floatingCta.ariaLabel}
        />

        {isMobile ? (
          <div className="fixed inset-x-4 bottom-4 z-40 md:hidden">
            <MagneticCTA
              href={landingCopy.cta.href}
              label={landingCopy.cta.primaryLabel}
              ariaLabel={landingCopy.cta.ariaLabel}
              className="w-full justify-center"
            />
          </div>
        ) : null}
      </PageShell>
    </SmoothScrollProvider>
  );
}

export default App;
