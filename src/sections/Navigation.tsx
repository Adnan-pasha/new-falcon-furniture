import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  scrollTo: (target: string) => void;
}

const navLinks = [
  { label: "About", target: "#about" },
  { label: "Products", target: "#products" },
  { label: "Process", target: "#process" },
  { label: "Areas", target: "#areas" },
  { label: "Reviews", target: "#reviews" },
  { label: "FAQ", target: "#faq" },
];

export default function Navigation({ scrollTo }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (target: string) => {
    scrollTo(target);
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-nav"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 w-full flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo("#hero")}
            className="flex items-center gap-2.5 focus:outline-none"
          >
            <div className="w-9 h-9 rounded-full bg-crimson flex items-center justify-center">
              <span className="text-white font-display font-bold text-lg">
                N
              </span>
            </div>
            <span
              className={`font-display font-bold text-xl transition-colors duration-300 ${
                scrolled ? "text-navy" : "text-white"
              }`}
            >
              New Falcon
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.target)}
                className={`font-sans font-medium text-[0.9375rem] tracking-[0.02em] transition-colors duration-200 hover:text-crimson focus:outline-none ${
                  scrolled ? "text-navy" : "text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => handleNavClick("#contact")}
              className="bg-crimson text-white font-sans font-semibold text-sm px-6 py-2.5 rounded-lg transition-all duration-300 hover:bg-[#A82020] hover:-translate-y-0.5 focus:outline-none"
            >
              Get Quote
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 focus:outline-none ${
              scrolled ? "text-navy" : "text-white"
            }`}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-navy flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.target)}
              className="text-white font-sans font-medium text-xl focus:outline-none hover:text-gold transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick("#contact")}
            className="bg-crimson text-white font-sans font-semibold text-base px-8 py-3 rounded-lg mt-4"
          >
            Get Quote
          </button>
        </div>
      )}
    </>
  );
}
