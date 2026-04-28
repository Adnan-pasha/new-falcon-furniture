import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CTABannerProps {
  scrollTo: (target: string) => void;
}

export default function CTABanner({ scrollTo: _scrollTo }: CTABannerProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        ".cta-description",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        ".cta-buttons",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-crimson py-16 md:py-20">
      <div className="max-w-[1280px] mx-auto px-6 text-center">
        <h2 className="cta-heading font-display font-bold text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-white mb-3">
          Ready to Transform Your Space?
        </h2>
        <p className="cta-description font-sans text-[1.0625rem] text-white/90 max-w-[560px] mx-auto mb-8">
          Get a free quote today. No showroom markups — just honest pricing and
          assured quality from Bangalore's trusted furniture makers.
        </p>
        <div className="cta-buttons flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://wa.me/918050979891?text=Hi%20New%20Falcon%20Furniture,%20I%20want%20to%20get%20a%20free%20quote%20for%20custom%20furniture"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-crimson font-sans font-semibold px-7 py-3.5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
          >
            <span>Chat on WhatsApp</span>
          </a>
          <a
            href="tel:+918050979891"
            className="inline-flex items-center gap-2 bg-transparent text-white font-sans font-semibold px-7 py-3.5 rounded-lg border border-white/40 transition-all duration-300 hover:bg-white/15"
          >
            <span>Call: 80509 79891</span>
          </a>
        </div>
      </div>
    </section>
  );
}
