import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 296, suffix: "+", label: "Happy Customers", isDecimal: false },
  { value: 4.9, suffix: "\u2605", label: "Average Rating", isDecimal: true },
  { value: 20, suffix: "+", label: "Years Experience", isDecimal: false },
  { value: 30, suffix: "-50%", label: "Savings vs Showroom", isDecimal: false, prefix: "" },
];

function AnimatedCounter({
  value,
  suffix,
  isDecimal,
  inView,
}: {
  value: number;
  suffix: string;
  isDecimal: boolean;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);
  const countRef = useRef({ val: 0 });

  useEffect(() => {
    if (!inView) return;

    const obj = countRef.current;
    gsap.to(obj, {
      val: value,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        setCount(isDecimal ? parseFloat(obj.val.toFixed(1)) : Math.round(obj.val));
      },
    });
  }, [inView, value, isDecimal]);

  return (
    <span className="font-display font-bold text-4xl md:text-[2.5rem] text-gold">
      {isDecimal ? count.toFixed(1) : count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      onEnter: () => setInView(true),
      once: true,
    });

    return () => trigger.kill();
  }, []);

  return (
    <section ref={sectionRef} className="bg-cream py-10 md:py-12">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center ${
                index < stats.length - 1
                  ? "md:border-r md:border-gray-200"
                  : ""
              }`}
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                isDecimal={stat.isDecimal}
                inView={inView}
              />
              <span className="font-sans font-medium text-sm text-navy mt-2">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
