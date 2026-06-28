import { useEffect } from "react";
import { landingCopy } from "./content/LandingCopy";
import PageShell from "./components/layout/PageShell";
import SmoothScrollProvider from "./components/layout/SmoothScrollProvider";
import Hero from "./components/sections/Hero";
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
import EntryOfferPopup from "./components/ui/EntryOfferPopup";
import MarqueeStrip from "./components/ui/MarqueeStrip";
import NoSystemSection from "./components/sections/NoSystemSection";

function App() {
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
          <MarqueeStrip items={landingCopy.marquee.items} className="mt-9 mb-8 md:mt-16 md:mb-0" />
          <SuccessCases data={landingCopy.successCases} cta={landingCopy.cta} />
          <TestimonialCarousel data={landingCopy.testimonials} ui={landingCopy.ui} />
          <PainSection data={landingCopy.pain} cta={landingCopy.cta} />
          <NoSystemSection data={landingCopy.noSystem} cta={landingCopy.cta} />
          <OutcomesSection data={landingCopy.outcomes} cta={landingCopy.cta} />
          <MarqueeStrip items={landingCopy.marquee.items} className="my-8 md:my-0" />
          <MethodSection data={landingCopy.method} />
          <AboutLucas data={landingCopy.about} cta={landingCopy.cta} />
          <BookingSection data={landingCopy.booking} cta={landingCopy.cta} />
          <FAQSection data={landingCopy.faq} />
          <FinalCTA data={landingCopy.finalCta} cta={landingCopy.cta} />
        </main>
        <Footer data={landingCopy.footer} ui={landingCopy.ui} />
      </PageShell>
    </SmoothScrollProvider>
  );
}

export default App;
