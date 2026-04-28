import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "./sections/Navigation";
import Hero from "./sections/Hero";
import Stats from "./sections/Stats";
import About from "./sections/About";
import Products from "./sections/Products";
import Process from "./sections/Process";
import ServiceAreas from "./sections/ServiceAreas";
import Testimonials from "./sections/Testimonials";
import FAQ from "./sections/FAQ";
import CTABanner from "./sections/CTABanner";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import WhatsAppButton from "./sections/WhatsAppButton";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  const scrollTo = (target: string) => {
    lenisRef.current?.scrollTo(target, { offset: -72 });
  };

  return (
    <div className="relative">
      <Navigation scrollTo={scrollTo} />
      <Hero scrollTo={scrollTo} />
      <Stats />
      <About />
      <Products />
      <Process />
      <ServiceAreas />
      <Testimonials />
      <FAQ />
      <CTABanner scrollTo={scrollTo} />
      <Contact />
      <Footer scrollTo={scrollTo} />
      <WhatsAppButton />
    </div>
  );
}

export default App;
