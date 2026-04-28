import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Factory, Truck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  scrollTo: (target: string) => void;
}

export default function Hero({ scrollTo: _scrollTo }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const images = imagesRef.current;
    if (!section || !text || !images) return;

    const ctx = gsap.context(() => {
      // Entrance animations
      gsap.fromTo(
        ".hero-subheading",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2 }
      );
      gsap.fromTo(
        ".hero-headline span",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.35,
        }
      );
      gsap.fromTo(
        ".hero-description",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.7 }
      );
      gsap.fromTo(
        ".hero-badge",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.9 }
      );
      gsap.fromTo(
        ".hero-cta",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 1.1 }
      );
      gsap.fromTo(
        ".hero-image",
        { opacity: 0, scale: 0.9, x: 30 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
          delay: 0.4,
        }
      );

      // Parallax on scroll
      gsap.to(text, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(images, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen bg-navy flex items-center overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-6 py-32 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* Left Column - Text */}
          <div ref={textRef} className="w-full lg:w-[55%]">
            <p className="hero-subheading font-sans font-medium text-[0.8125rem] uppercase tracking-[0.15em] text-gold mb-4 opacity-0">
              BENGALURU'S TRUSTED FURNITURE MAKERS
            </p>

            <h1 className="hero-headline font-display font-bold text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] mb-6">
              <span className="block text-white opacity-0">
                Custom Furniture
              </span>
              <span className="block text-gold opacity-0">
                Manufactured in
              </span>
              <span className="block text-gold opacity-0">Bangalore</span>
            </h1>

            <p className="hero-description font-sans text-lg text-white/80 max-w-[480px] leading-relaxed opacity-0">
              Family-run furniture makers serving Bengaluru since 2004.
              Factory-direct pricing, free home visits, and furniture tailored
              exactly to your space.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 mt-7">
              <div className="hero-badge inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-sm font-sans font-medium px-4 py-2 rounded-full border border-white/10 opacity-0">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className="fill-gold text-gold"
                    />
                  ))}
                </div>
                <span>4.9/5 (296 Reviews)</span>
              </div>
              <div className="hero-badge inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-sm font-sans font-medium px-4 py-2 rounded-full border border-white/10 opacity-0">
                <Factory size={14} className="text-gold" />
                <span>Factory Direct</span>
              </div>
              <div className="hero-badge inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-sm font-sans font-medium px-4 py-2 rounded-full border border-white/10 opacity-0">
                <Truck size={14} className="text-gold" />
                <span>Free Home Visit</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="https://wa.me/918050979891?text=Hi%20New%20Falcon%20Furniture,%20I%20want%20to%20get%20a%20quote%20for%20custom%20furniture"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta inline-flex items-center gap-2 bg-crimson text-white font-sans font-semibold px-7 py-3.5 rounded-lg transition-all duration-300 hover:bg-[#A82020] hover:-translate-y-0.5 hover:shadow-cta opacity-0"
              >
                <span>Get Free Quote on WhatsApp</span>
              </a>
              <a
                href="tel:+918050979891"
                className="hero-cta inline-flex items-center gap-2 bg-transparent text-white font-sans font-semibold px-7 py-3.5 rounded-lg border border-white/30 transition-all duration-300 hover:bg-white/10 opacity-0"
              >
                <span>Call Now</span>
              </a>
            </div>
          </div>

          {/* Right Column - Image Collage */}
          <div ref={imagesRef} className="w-full lg:w-[45%] relative">
            <div className="relative">
              {/* Main Image */}
              <div className="hero-image relative z-10 rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)] opacity-0">
                <img
                  src="/hero-main.jpg"
                  alt="Custom L-shaped sofa handcrafted by New Falcon Furniture, Arekere Bangalore"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Secondary Images */}
              <div className="hero-image absolute -bottom-6 -left-6 w-[45%] z-20 rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.25)] border-2 border-navy opacity-0">
                <img
                  src="/hero-secondary-1.jpg"
                  alt="Custom beds showroom at New Falcon Furniture workshop Arekere Bangalore"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="hero-image absolute -bottom-6 right-0 w-[45%] z-20 rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.25)] border-2 border-navy opacity-0">
                <img
                  src="/hero-secondary-2.jpg"
                  alt="Custom bedroom furniture manufactured by New Falcon Furniture Bangalore"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Gold accent line */}
              <div className="absolute top-1/4 -left-4 w-[2px] h-1/2 bg-gradient-to-b from-gold/60 to-transparent hidden lg:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
