import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  scrollTo: (target: string) => void;
}

const productLinks = [
  "Custom Sofas",
  "Beds & Cots",
  "Wardrobes",
  "Dining Sets",
  "Office Furniture",
  "Modular Kitchens",
];

const areaLinks = [
  "Arekere",
  "HSR Layout",
  "Koramangala",
  "JP Nagar",
  "BTM Layout",
  "All Bangalore",
];

const quickLinks = [
  { label: "About Us", target: "#about" },
  { label: "How It Works", target: "#process" },
  { label: "Reviews", target: "#reviews" },
  { label: "FAQ", target: "#faq" },
  { label: "Contact", target: "#contact" },
  {
    label: "Google Reviews",
    href: "https://maps.app.goo.gl/M1EoQKtTkWR27ar9A",
  },
];

export default function Footer({ scrollTo }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-col",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-navy pt-16 md:pt-20 pb-8">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Top Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-10">
          {/* Brand Column */}
          <div className="footer-col">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full bg-crimson flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">
                  N
                </span>
              </div>
              <span className="font-display font-bold text-xl text-white">
                New Falcon Furniture
              </span>
            </div>
            <p className="font-sans text-sm text-[#D4C5B0] leading-relaxed mb-5">
              Family-run custom furniture manufacturer serving Bangalore since
              2004. Factory-direct pricing, free home visits, and furniture
              tailored to your space.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/918050979891"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4C5B0] hover:text-gold transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href="https://maps.app.goo.gl/M1EoQKtTkWR27ar9A"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4C5B0] hover:text-gold transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Products Column */}
          <div className="footer-col">
            <h4 className="font-sans font-semibold text-base text-white mb-4">
              Products
            </h4>
            <ul className="flex flex-col gap-2.5">
              {productLinks.map((link) => (
                <li key={link}>
                  <span className="font-sans text-sm text-[#D4C5B0] hover:text-gold transition-colors cursor-default">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas Column */}
          <div className="footer-col">
            <h4 className="font-sans font-semibold text-base text-white mb-4">
              Service Areas
            </h4>
            <ul className="flex flex-col gap-2.5">
              {areaLinks.map((link) => (
                <li key={link}>
                  <span className="font-sans text-sm text-[#D4C5B0] hover:text-gold transition-colors cursor-default">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="footer-col">
            <h4 className="font-sans font-semibold text-base text-white mb-4">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) =>
                "href" in link ? (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-sm text-[#D4C5B0] hover:text-gold transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollTo(link.target)}
                      className="font-sans text-sm text-[#D4C5B0] hover:text-gold transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-[#D4C5B0]">
            &copy; 2025 New Falcon Furniture. All rights reserved.
          </p>
          <p className="font-sans text-xs text-[#D4C5B0]">
            Designed with care in Bangalore | Founded by Rizwan Pasha
          </p>
        </div>
      </div>
    </footer>
  );
}
