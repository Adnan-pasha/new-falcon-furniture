import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const areas = [
  { name: "Arekere", subtitle: "Our home base" },
  { name: "HSR Layout", subtitle: "10+ projects delivered" },
  { name: "Koramangala", subtitle: "Premium residences" },
  { name: "JP Nagar", subtitle: "Custom apartments" },
  { name: "BTM Layout", subtitle: "Space-saving solutions" },
  { name: "Bommanahalli", subtitle: "Family homes" },
  { name: "Electronic City", subtitle: "IT professionals" },
  { name: "Whitefield", subtitle: "Villa and apartment" },
  { name: "Marathahalli", subtitle: "Modern homes" },
  { name: "Jayanagar", subtitle: "Traditional and modern" },
  { name: "Indiranagar", subtitle: "Designer furniture" },
  { name: "All Bangalore", subtitle: "City-wide service" },
];

export default function ServiceAreas() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".areas-header > *",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".area-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".areas-grid",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="areas"
      ref={sectionRef}
      className="bg-navy py-20 md:py-28"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="areas-header text-center mb-12">
          <p className="font-sans font-medium text-[0.8125rem] uppercase tracking-[0.15em] text-gold mb-3">
            SERVICE AREAS
          </p>
          <h2 className="font-display font-bold text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-white mb-3">
            Areas We Serve in Bangalore
          </h2>
          <p className="font-sans text-base text-white/70">
            Free home visits and delivery across Bengaluru
          </p>
        </div>

        {/* Areas Grid */}
        <div className="areas-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {areas.map((area) => (
            <div
              key={area.name}
              className="area-card bg-white/[0.06] border border-white/10 rounded-xl p-5 transition-all duration-300 hover:bg-white/10 hover:border-gold/40 hover:-translate-y-1 cursor-default"
            >
              <MapPin size={16} className="text-gold mb-2" />
              <h3 className="font-sans font-semibold text-base text-white">
                {area.name}
              </h3>
              <p className="font-sans text-sm text-white/60 mt-1">
                {area.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
