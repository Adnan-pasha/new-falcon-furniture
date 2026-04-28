import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Rahul K.",
    location: "HSR Layout, Bangalore",
    avatar: "/avatar-rahul.jpg",
    quote:
      "Excellent quality furniture at very reasonable prices. Rizwan Pasha personally oversaw our custom sofa order and the craftsmanship is outstanding. Highly recommended for anyone in Bangalore looking for custom furniture.",
  },
  {
    name: "Priya M.",
    location: "Koramangala, Bangalore",
    avatar: "/avatar-priya.jpg",
    quote:
      "We got our entire modular kitchen done by New Falcon. The team was professional from design to installation. The price was much better than showroom quotes and the quality is top-notch. Very happy with the service!",
  },
  {
    name: "Sanjay R.",
    location: "Arekere, Bangalore",
    avatar: "/avatar-sanjay.jpg",
    quote:
      "The staff including Rizwan Pasha were very friendly and helpful. They understood exactly what we wanted for our bedroom wardrobe and delivered beyond expectations. Free home visit was a big plus. Will definitely recommend!",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonials-header > *",
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
        ".testimonial-card",
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".testimonials-carousel",
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
      id="reviews"
      ref={sectionRef}
      className="bg-cream py-20 md:py-28"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="testimonials-header text-center mb-12">
          <p className="font-sans font-medium text-[0.8125rem] uppercase tracking-[0.15em] text-crimson mb-3">
            TESTIMONIALS
          </p>
          <h2 className="font-display font-bold text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-navy mb-3">
            What Our Customers Say
          </h2>
          <p className="font-sans text-base text-text-secondary">
            296+ five-star reviews from happy families across Bangalore
          </p>
        </div>

        {/* Carousel */}
        <div className="testimonials-carousel relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${current * 100}%)`,
              }}
            >
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="testimonial-card w-full flex-shrink-0 px-0 md:px-8"
                >
                  <div className="bg-white rounded-xl shadow-card overflow-hidden max-w-3xl mx-auto">
                    <div className="flex flex-col md:flex-row">
                      {/* Avatar */}
                      <div className="md:w-[30%] h-48 md:h-auto relative">
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Quote Content */}
                      <div className="md:w-[70%] p-6 md:p-8 relative">
                        {/* Decorative quote */}
                        <span className="absolute top-4 left-6 font-display font-bold text-6xl text-gold/20 leading-none select-none">
                          &ldquo;
                        </span>

                        {/* Stars */}
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className="fill-gold text-gold"
                            />
                          ))}
                        </div>

                        <p className="font-sans text-base text-text-primary leading-[1.7] italic relative z-10">
                          {t.quote}
                        </p>

                        <div className="mt-5">
                          <p className="font-sans font-semibold text-base text-navy">
                            {t.name}
                          </p>
                          <p className="font-sans text-sm text-text-secondary">
                            {t.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-navy transition-all duration-300 hover:bg-navy hover:text-white hover:border-navy focus:outline-none z-10"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-navy transition-all duration-300 hover:bg-navy hover:text-white hover:border-navy focus:outline-none z-10"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none ${
                i === current ? "bg-crimson w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Read all reviews link */}
        <div className="text-center mt-6">
          <a
            href="https://www.google.com/search?q=New+Falcon+Furniture+Arekere"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans font-medium text-sm text-crimson hover:underline transition-all"
          >
            Read all 296+ reviews on Google &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
