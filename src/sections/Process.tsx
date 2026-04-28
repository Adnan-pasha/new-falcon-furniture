import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Home, Ruler, Factory, Truck, Wrench } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Home,
    title: "Free Home Visit",
    description:
      "We bring material samples and take precise measurements at your home.",
  },
  {
    icon: Ruler,
    title: "Custom Design",
    description: "3D visualization of your furniture in your actual space.",
  },
  {
    icon: Factory,
    title: "Manufacturing",
    description: "Crafted by experienced artisans in our Bangalore factory.",
  },
  {
    icon: Truck,
    title: "Delivery & Install",
    description: "Professional setup at your home with perfect fitting.",
  },
  {
    icon: Wrench,
    title: "After-Sales Support",
    description: "Warranty service and maintenance whenever you need.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".process-header > *",
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
        ".step-circle",
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".steps-container",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".step-content",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".steps-container",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="bg-white py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="process-header text-center mb-14">
          <p className="font-sans font-medium text-[0.8125rem] uppercase tracking-[0.15em] text-crimson mb-3">
            OUR PROCESS
          </p>
          <h2 className="font-display font-bold text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-navy mb-3">
            How It Works
          </h2>
          <p className="font-sans text-base text-text-secondary">
            From concept to completion — your furniture journey in 5 simple
            steps.
          </p>
        </div>

        {/* Steps */}
        <div className="steps-container relative">
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-7 left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-gold/40" />

          {/* Connecting Line - Mobile */}
          <div className="lg:hidden absolute left-7 top-0 bottom-0 w-[2px] border-l-2 border-dashed border-gold/40" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="flex lg:flex-col items-start lg:items-center gap-4 lg:gap-0 relative">
                  {/* Step Circle */}
                  <div className="step-circle w-14 h-14 rounded-full bg-gold flex items-center justify-center flex-shrink-0 z-10">
                    <span className="font-display font-bold text-xl text-white">
                      {index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="step-content lg:text-center lg:mt-4 pt-1 lg:pt-0">
                    <Icon
                      size={28}
                      className="text-navy mb-3 hidden lg:block mx-auto"
                    />
                    <h3 className="font-sans font-semibold text-base text-navy">
                      {step.title}
                    </h3>
                    <p className="font-sans text-sm text-text-secondary mt-2 lg:max-w-[180px] lg:mx-auto leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
