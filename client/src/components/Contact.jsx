import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const contactRef = useRef(null);
  const API_URL = import.meta.env.VITE_APP_API_URL || "";
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!API_URL) {
      toast.error("API endpoint is not configured.");
      return;
    }
    setLoading(true);
    const toastId = toast.loading("Sending message...");
    try {
      const response = await axios.post(`${API_URL}/api/contact`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success(response.data.message || "Message sent!", { id: toastId });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.response?.data?.error || "An unexpected error occurred", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { icon: faLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/ishanroy-radx/" },
    { icon: faGithub, label: "GitHub", href: "https://github.com/RADXIshan" },
    { icon: faEnvelope, label: "Email", href: "mailto:ishanroy3118107@gmail.com" },
  ];

  const useMagnetic = (ref) => {
    useGSAP(() => {
      if (!window.matchMedia("(hover: hover)").matches) return;
      const element = ref.current;
      if (!element) return;

      const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
      const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = element.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        xTo(x * 0.3);
        yTo(y * 0.3);
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, { scope: ref });
  };

  const submitBtnRef = useRef(null);
  useMagnetic(submitBtnRef);

  useGSAP(() => {
    // Optimized SplitType with cleanup
    const splitTitle = new SplitType(".contact-title", { types: "words" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contactRef.current,
        start: "top 95%",
        toggleActions: "play none none reset",
      }
    });

    // Title Reveal (Faster)
    tl.fromTo(splitTitle.words, {
      y: 20,
      opacity: 0,
      rotateX: -30,
    }, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      stagger: 0.03,
      duration: 0.5,
      ease: "power3.out",
    }, 0);

    // Subtitle Reveal (Faster)
    tl.fromTo(".contact-subtitle", {
      y: 15,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power3.out",
    }, 0.1);

    // Cards Reveal (Faster, force3D for performance)
    tl.fromTo(".contact-card", {
      y: 30,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      force3D: true,
    }, 0.05);

    // Social Links Stagger (Ensuring visibility)
    tl.fromTo(".social-link-item", {
      scale: 0.7,
      opacity: 0,
    }, {
      scale: 1,
      opacity: 1,
      stagger: 0.05,
      duration: 0.5,
      ease: "back.out(2)",
    }, 0.2);

    // Form Fields Reveal (Faster)
    tl.fromTo(".form-group", {
      x: 15,
      opacity: 0,
    }, {
      x: 0,
      opacity: 1,
      stagger: 0.05,
      duration: 0.6,
      ease: "power2.out",
    }, 0.15);

    // Submit Button Reveal
    tl.fromTo(".submit-btn", {
      y: 10,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    }, 0.3);

    // Contact Background Glow
    gsap.to(".contact-bg-glow", {
        x: 60,
        y: -30,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    ScrollTrigger.refresh();

    return () => {
        splitTitle.revert();
    };
  }, { scope: contactRef });

  return (
    <div
      id="contact"
      ref={contactRef}
      className="min-h-screen w-full flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background Gradient */}
      <div className="contact-bg-glow absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-12 w-full max-w-7xl relative z-10">
        
        {/* Left Card: "Get in Touch" */}
        <div className="contact-card w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-500 hover:bg-white/10 group/card will-change-transform">
          <div>
            <h2 className="contact-title text-5xl sm:text-7xl font-bold mb-6 tracking-tighter">Let's Talk</h2>
            <p className="contact-subtitle text-xl text-white/60 font-light max-w-md leading-relaxed">
              Have a project in mind or just want to say hi? I'm always open to discussing new ideas and opportunities.
            </p>
          </div>

          <div className="social-links-container flex flex-wrap gap-4 mt-12">
            {socialLinks.map((link, index) => {
              const iconRef = useRef(null);
              useMagnetic(iconRef);
              return (
                <a
                  key={index}
                  ref={iconRef}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="social-link-item w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:scale-110 transition-all duration-300"
                >
                  <FontAwesomeIcon icon={link.icon} className="text-xl" />
                </a>
              );
            })}
          </div>
        </div>
        
        {/* Right Card: Form */}
        <div className={`contact-card w-full lg:w-1/2 p-6 sm:p-10 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-500 will-change-transform ${loading ? "border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.2)]" : "hover:bg-white/10"}`}>
          <form onSubmit={handleSubmit} className={`flex flex-col gap-8 h-full justify-center transition-opacity duration-300 ${loading ? "opacity-50 pointer-events-none" : "opacity-100"}`}>
            <div className="form-group group">
              <label htmlFor="name" className="block text-sm font-medium text-white/40 mb-2 uppercase tracking-widest group-focus-within:text-white transition-colors">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Ishan Roy" 
                required 
                disabled={loading}
                className="w-full px-2 bg-transparent border-b border-white/20 py-4 text-xl text-white placeholder-white/20 outline-none focus:border-white transition-colors duration-300 disabled:cursor-not-allowed" 
              />
            </div>
            <div className="form-group group">
              <label htmlFor="email" className="block text-sm font-medium text-white/40 mb-2 uppercase tracking-widest group-focus-within:text-white transition-colors">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="ishan@example.com" 
                required 
                disabled={loading}
                className="w-full px-2 bg-transparent border-b border-white/20 py-4 text-xl text-white placeholder-white/20 outline-none focus:border-white transition-colors duration-300 disabled:cursor-not-allowed" 
              />
            </div>
            <div className="form-group group">
              <label htmlFor="message" className="block text-sm font-medium text-white/40 mb-2 uppercase tracking-widest group-focus-within:text-white transition-colors">Message</label>
              <textarea 
                id="message" 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                rows="4" 
                placeholder="Send me a message..." 
                required 
                disabled={loading}
                className="w-full bg-transparent border-b border-white/20 px-2 py-4 text-xl text-white placeholder-white/20 outline-none focus:border-white transition-colors duration-300 resize-none disabled:cursor-not-allowed" 
              />
            </div>
            <button 
              type="submit" 
              ref={submitBtnRef}
              disabled={loading}
              className={`submit-btn mt-4 py-4 px-10 bg-white text-black font-bold rounded-full text-lg transition-all duration-300 hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95 self-start flex items-center gap-2 cursor-none ${loading ? "opacity-80 cursor-not-allowed" : ""}`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;