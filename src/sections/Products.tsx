import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    title: "Custom Sofas",
    description:
      "L-shape, sectional, 3-seater, 2-seater, and recliner sofas tailored to your living room dimensions and fabric choice.",
    image: "/product-sofa.jpg",
    tag: "Most Popular",
    tags: ["L-Shape", "Sectional", "Recliner", "Fabric Choice"],
  },
  {
    title: "Beds & Cots",
    description:
      "King, queen, and single beds with storage options. Custom headboards and premium wood finishes.",
    image: "/product-bed.jpg",
    tag: "Best Value",
    tags: ["Storage Beds", "King Size", "Queen Size", "Wooden"],
  },
  {
    title: "Wardrobes & Storage",
    description:
      "Sliding door wardrobes, walk-in closets, and built-in storage solutions customized to your room layout.",
    image: "/product-wardrobe.jpg",
    tag: null,
    tags: ["Sliding Door", "Walk-in", "Built-in", "Mirror"],
  },
  {
    title: "Dining Sets",
    description:
      "4-seater, 6-seater, and 8-seater dining tables with matching chairs. Extendable and space-saving designs.",
    image: "/product-dining.jpg",
    tag: null,
    tags: ["4-Seater", "6-Seater", "8-Seater", "Extendable"],
  },
  {
    title: "Office Furniture",
    description:
      "Office tables, chairs, workstations, and storage cabinets designed for productivity and comfort.",
    image: "/product-office.jpg",
    tag: null,
    tags: ["Workstations", "Executive", "Ergonomic", "Storage"],
  },
  {
    title: "Modular Kitchens",
    description:
      "Complete kitchen solutions — design, manufacture, install, and support. L-shaped, U-shaped, parallel, and island layouts.",
    image: "/product-kitchen.jpg",
    tag: "Premium",
    tags: ["L-Shaped", "U-Shaped", "Island", "Parallel"],
  },
];

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".products-header > *",
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
        ".product-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".products-grid",
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
      id="products"
      ref={sectionRef}
      className="bg-cream py-20 md:py-28"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="products-header text-center mb-14">
          <p className="font-sans font-medium text-[0.8125rem] uppercase tracking-[0.15em] text-crimson mb-3">
            OUR COLLECTION
          </p>
          <h2 className="font-display font-bold text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-navy mb-3">
            Custom Furniture for Every Space
          </h2>
          <p className="font-sans text-base text-text-secondary max-w-[560px] mx-auto">
            From living rooms to offices — custom-made furniture for every space
            in your home.
          </p>
        </div>

        {/* Product Grid */}
        <div className="products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.title}
              className="product-card bg-white rounded-xl shadow-card overflow-hidden transition-all duration-[400ms] hover:-translate-y-2 hover:shadow-card-deep group"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.tag && (
                  <span className="absolute top-3 left-3 bg-crimson text-white font-sans font-medium text-xs px-3 py-1 rounded-full">
                    {product.tag}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-sans font-semibold text-lg text-navy">
                  {product.title}
                </h3>
                <p className="font-sans text-sm text-text-secondary mt-2 leading-relaxed">
                  {product.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-navy/[0.06] text-navy font-sans text-xs px-2.5 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
