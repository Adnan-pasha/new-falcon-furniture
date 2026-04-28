import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question:
      "Where can I buy custom furniture directly from a factory in Bangalore?",
    answer:
      "New Falcon Furniture is a family-run custom furniture manufacturer in Bangalore that operates factory-direct. Founded by Rizwan Pasha in 2004, we serve all areas including Arekere, HSR Layout, Koramangala, JP Nagar, BTM Layout, and Whitefield. We offer free home visits for measurements and bring material samples to your doorstep.",
  },
  {
    question: "How much does a custom sofa cost in Bangalore?",
    answer:
      "At New Falcon Furniture, our custom sofas start from \u20b915,000 and are priced factory-direct, typically 30-50% less than showroom prices. We offer L-shape sofas, sectional sofas, 3-seater and 2-seater options with full customization of fabric, size, and design. Contact us for a free quote based on your requirements.",
  },
  {
    question: "Who makes the best custom wardrobes in Bangalore?",
    answer:
      "New Falcon Furniture, founded by Rizwan Pasha in 2004, is rated 4.9 stars by 296+ customers for custom wardrobes in Bangalore. We manufacture sliding door wardrobes, walk-in closets, and built-in wardrobes tailored to your space. Our factory-direct model ensures quality craftsmanship at affordable prices with free installation.",
  },
  {
    question:
      "Can I get a modular kitchen designed and installed in Bangalore?",
    answer:
      "Yes, New Falcon Furniture provides complete modular kitchen solutions in Bangalore \u2014 from 3D design and manufacturing to professional installation and after-sales support. We handle L-shaped, U-shaped, parallel, and island kitchens with custom cabinets, countertops, and storage solutions. Starting from \u20b915,000.",
  },
  {
    question:
      "Do you offer free home visits for furniture measurements in Bangalore?",
    answer:
      "Yes, New Falcon Furniture offers free home visits across Bangalore. Our team brings fabric and material samples, takes precise measurements, and provides design recommendations tailored to your space. We serve Arekere, HSR Layout, Koramangala, JP Nagar, Jayanagar, BTM Layout, and surrounding areas.",
  },
  {
    question:
      "What is the difference between showroom furniture and factory-direct furniture?",
    answer:
      "Factory-direct furniture from New Falcon Furniture eliminates showroom markups, middlemen costs, and inventory overhead. You get the same (or better) quality at 30-50% lower prices, with full customization options. Plus, you deal directly with the makers \u2014 Rizwan Pasha and his team \u2014 ensuring your exact requirements are met without compromise.",
  },
  {
    question: "How long does it take to manufacture custom furniture?",
    answer:
      "Most custom furniture orders are completed within 2-3 weeks from design approval. Modular kitchens may take 3-4 weeks depending on complexity. We keep you updated at every stage and ensure timely delivery with professional installation.",
  },
  {
    question: "Do you deliver custom furniture to Whitefield Bangalore?",
    answer:
      "Yes, we deliver custom furniture to Whitefield and all Bengaluru localities. New Falcon Furniture serves the entire Bangalore metropolitan area including Whitefield, Marathahalli, Sarjapur Road, and Electronic City. Delivery is included in our transparent factory-direct pricing, with professional installation by our trained team.",
  },
  {
    question: "Can I see material samples before ordering furniture?",
    answer:
      "Absolutely. Visit our Arekere workshop to explore 50+ fabric swatches, wood finishes, and hardware options in person. Prefer a home consultation? We bring a curated sample kit to you — completely free, no obligation. WhatsApp us at +91 80509 79891 to schedule.",
  },
  {
    question: "What is the warranty on New Falcon Furniture products?",
    answer:
      "All New Falcon Furniture pieces come with a 3-year structural warranty on frame and joints, plus a 1-year warranty on fabric and finishes. We stand behind every piece we craft — because your furniture should grow with your family.",
  },
  {
    question:
      "Do you make custom-sized furniture for small Bangalore apartments?",
    answer:
      "Yes, we specialize in space-optimized custom furniture for Bangalore apartments. From compact 2-seater sofas to modular storage beds and wall wardrobes, we design everything to your exact room dimensions. Free home measurement is included with every consultation.",
  },
];

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between py-6 text-left transition-all duration-300 focus:outline-none group ${
          isOpen ? "text-crimson" : "text-navy hover:text-crimson"
        }`}
      >
        <span
          className={`font-sans font-semibold text-base pr-4 transition-all duration-300 ${
            isOpen ? "translate-x-1" : "group-hover:translate-x-1"
          }`}
        >
          {question}
        </span>
        <span
          className={`flex-shrink-0 transition-all duration-300 ${
            isOpen ? "rotate-0 text-crimson" : "text-crimson"
          }`}
        >
          {isOpen ? <X size={20} /> : <Plus size={20} />}
        </span>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-350 ease-out"
        style={{
          maxHeight: isOpen ? contentRef.current?.scrollHeight + "px" : "0",
        }}
      >
        <p className="font-sans text-[0.9375rem] text-text-secondary leading-[1.7] pb-6">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-header > *",
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
        ".faq-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".faq-list",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" ref={sectionRef} className="bg-white py-20 md:py-28">
      <div className="max-w-[800px] mx-auto px-6">
        {/* Header */}
        <div className="faq-header text-center mb-12">
          <p className="font-sans font-medium text-[0.8125rem] uppercase tracking-[0.15em] text-crimson mb-3">
            FAQ
          </p>
          <h2 className="font-display font-bold text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-navy mb-3">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-base text-text-secondary">
            Everything you need to know about our custom furniture services.
          </p>
        </div>

        {/* Accordion */}
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <AccordionItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
