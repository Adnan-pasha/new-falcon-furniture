import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Smartphone, Mail, MapPin, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: Smartphone,
    label: "WhatsApp / Call",
    lines: ["+91 80509 79891", "+91 99862 81463"],
  },
  {
    icon: Mail,
    label: "Email",
    lines: ["newfalconfurniture@gmail.com"],
  },
  {
    icon: MapPin,
    label: "Address",
    lines: [
      "No. 422, Ground Floor, 1st Cross, Lakshmi Layout",
      "Arekere, Bannerghatta Road",
      "Bengaluru, Karnataka 560076",
    ],
  },
  {
    icon: Clock,
    label: "Business Hours",
    lines: ["Monday - Saturday: 9:30 AM - 8:00 PM", "Sunday: By Appointment"],
  },
];

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    requirements: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-left > *",
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
        ".contact-form-card",
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          subject: `New Quote Request – ${formData.service || "General"}`,
          from_name: formData.name,
          name: formData.name,
          phone: formData.phone,
          email: formData.email || "Not provided",
          service: formData.service,
          requirements: formData.requirements || "Not provided",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setFormData({ name: "", phone: "", email: "", service: "", requirements: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="bg-white py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Column - Contact Info */}
          <div className="w-full lg:w-[40%] contact-left">
            <p className="font-sans font-medium text-[0.8125rem] uppercase tracking-[0.15em] text-crimson mb-3">
              GET IN TOUCH
            </p>
            <h2 className="font-display font-bold text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-navy mb-2">
              Have a furniture project in mind?
            </h2>
            <p className="font-sans text-base text-text-secondary mb-8">
              Reach out and we will get back to you within 2 hours.
            </p>

            {/* Contact Cards */}
            <div className="flex flex-col gap-4">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <div
                    key={info.label}
                    className="bg-navy/[0.04] rounded-xl p-5 flex items-start gap-4"
                  >
                    <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-sans font-medium text-sm text-navy">
                        {info.label}
                      </p>
                      {info.lines.map((line, i) => (
                        <p
                          key={i}
                          className="font-sans text-sm text-text-secondary mt-0.5"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="w-full lg:w-[60%]">
            <div className="contact-form-card bg-white border border-gray-200 rounded-xl p-6 md:p-10 shadow-[0_4px_20px_rgba(27,40,56,0.06)]">
              <h3 className="font-sans font-semibold text-xl text-navy mb-6">
                Request a Free Quote
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block font-sans font-medium text-sm text-navy mb-1.5">
                    Your Name <span className="text-crimson">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 font-sans text-base text-navy placeholder:text-gray-400 focus:border-crimson focus:ring-[3px] focus:ring-crimson/10 focus:outline-none transition-all"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block font-sans font-medium text-sm text-navy mb-1.5">
                    Phone Number <span className="text-crimson">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 font-sans text-base text-navy placeholder:text-gray-400 focus:border-crimson focus:ring-[3px] focus:ring-crimson/10 focus:outline-none transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block font-sans font-medium text-sm text-navy mb-1.5">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 font-sans text-base text-navy placeholder:text-gray-400 focus:border-crimson focus:ring-[3px] focus:ring-crimson/10 focus:outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block font-sans font-medium text-sm text-navy mb-1.5">
                    Service Needed <span className="text-crimson">*</span>
                  </label>
                  <select
                    required
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 font-sans text-base text-navy focus:border-crimson focus:ring-[3px] focus:ring-crimson/10 focus:outline-none transition-all bg-white"
                  >
                    <option value="">Select a service</option>
                    <option value="Custom Sofa">Custom Sofa</option>
                    <option value="Bed / Cot">Bed / Cot</option>
                    <option value="Wardrobe">Wardrobe</option>
                    <option value="Dining Set">Dining Set</option>
                    <option value="Office Furniture">Office Furniture</option>
                    <option value="Modular Kitchen">Modular Kitchen</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-sans font-medium text-sm text-navy mb-1.5">
                    Your Requirements
                  </label>
                  <textarea
                    rows={4}
                    value={formData.requirements}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        requirements: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 font-sans text-base text-navy placeholder:text-gray-400 focus:border-crimson focus:ring-[3px] focus:ring-crimson/10 focus:outline-none transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-crimson text-white font-sans font-semibold py-3.5 rounded-lg transition-all duration-300 hover:bg-[#A82020] focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>

                {status === "success" && (
                  <p className="font-sans text-sm text-green-600 text-center font-medium">
                    Thank you! We will get back to you within 2 hours.
                  </p>
                )}
                {status === "error" && (
                  <p className="font-sans text-sm text-crimson text-center font-medium">
                    Something went wrong. Please call us directly or try again.
                  </p>
                )}

                <p className="font-sans text-xs text-text-secondary text-center">
                  We respect your privacy. Your information is safe with us.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
