import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const checklist = [
  "100% Custom Design",
  "Factory Direct Pricing",
  "Free Home Visits",
  "Quality Warranty",
  "Professional Installation",
  "After-Sales Support",
];

const images = [
  { src: "/about-factory.jpg", alt: "Craftsman in factory" },
  { src: "/about-sofa.jpg", alt: "Finished custom sofa" },
  { src: "/about-wardrobe.jpg", alt: "Modern wardrobe" },
  { src: "/about-bedroom.jpg", alt: "Bedroom furniture set" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-text > *",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".about-image",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
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
    <section id="about" ref={sectionRef} className="bg-white py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left Column - Text */}
          <div className="w-full lg:w-1/2 about-text">
            <p className="font-sans font-medium text-[0.8125rem] uppercase tracking-[0.15em] text-crimson mb-3">
              ABOUT US
            </p>
            <h2 className="font-display font-bold text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-navy mb-6">
              A Family Legacy of Craftsmanship in Bangalore
            </h2>
            <p className="font-sans text-base text-text-primary leading-[1.7] mb-4">
              New Falcon Furniture began as a small family shop in Nyanappana
              Halli, Bengaluru, founded by{" "}
              <strong className="font-semibold">Rizwan Pasha</strong> in{" "}
              <strong className="font-semibold">2004</strong>. With a simple
              mission — to bring quality, custom-designed furniture to every home
              in the city — what started as a modest showroom has grown into a
              trusted manufacturing unit, serving hundreds of families across
              Bengaluru.
            </p>
            <p className="font-sans text-base text-text-primary leading-[1.7] mb-6">
              Today, we have evolved beyond the traditional showroom model. By
              working directly with our factory, you get better prices, faster
              delivery, and furniture made exactly how you want it — with the
              same personal touch and quality that earned us{" "}
              <strong className="font-semibold">296 five-star reviews</strong>.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-2 gap-3">
              {checklist.map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                  <span className="font-sans font-medium text-[0.9375rem] text-text-primary">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image Grid */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-2 gap-3">
              {images.map((img) => (
                <div
                  key={img.src}
                  className="about-image rounded-xl overflow-hidden shadow-card group"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-40 md:h-48 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
