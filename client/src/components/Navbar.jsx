import { useLayoutEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navContainerRef = useRef(null);
  const menuOverlayRef = useRef(null);
  const menuLinksRef = useRef(null);
  const socialLinksRef = useRef(null);
  const overlayLogoRef = useRef(null);
  const tl = useRef(null);

  const logoRef = useRef(null);
  const menuBtnRef = useRef(null);
  const closeBtnRef = useRef(null);

  const menuItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/ishanroy-radx/", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/RADXIshan", label: "GitHub" },
    { icon: Mail, href: "mailto:ishanroy3118107@gmail.com", label: "Email" },
  ];

  // Magnetic Effect Helper
  const useMagnetic = (ref) => {
    useGSAP(() => {
      const element = ref.current;
      if (!element) return;

      const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
      const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = element.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        xTo(x * 0.35);
        yTo(y * 0.35);
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

  useMagnetic(logoRef);
  useMagnetic(menuBtnRef);
  useMagnetic(closeBtnRef);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({ paused: true });

      tl.current.to(menuOverlayRef.current, {
        duration: 1.2,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power4.inOut",
      });

      tl.current.from(".menu-link-item", {
        y: 100,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      }, "-=0.8");

      if (socialLinksRef.current) {
        tl.current.from(socialLinksRef.current.children, {
          y: 20,
          opacity: 0,
          filter: "blur(10px)",
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        }, "-=0.8");
      }

      if (overlayLogoRef.current) {
        tl.current.from(overlayLogoRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 1,
          ease: "power3.out",
        }, "-=1");
      }
    }, navContainerRef);

    return () => ctx.revert();
  }, []);

  const toggleMenu = () => {
    if (isMenuOpen) {
      tl.current && tl.current.reverse();
    } else {
      tl.current && tl.current.play();
    }
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav
        ref={navContainerRef}
        className="fixed top-0 left-0 w-full px-6 py-4 md:px-10 md:py-6 flex justify-between items-center z-[100] mix-blend-difference text-white"
      >
        <div ref={logoRef} className="cursor-pointer">
          <a href="#home" className="block">
            <img
              src={logo}
              alt="Logo"
              className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
            />
          </a>
        </div>

        <div
          ref={menuBtnRef}
          onClick={toggleMenu}
          className="cursor-pointer flex items-center gap-3 group"
        >
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
            <Menu className="w-6 h-6 md:w-8 md:h-8" />
          </div>
        </div>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <div
        ref={menuOverlayRef}
        className="fixed inset-0 bg-[#0a0a0a] z-[101] flex flex-col justify-between px-6 pt-4 pb-10 md:px-10 md:pt-6 md:pb-14 clip-path-polygon-[0%_0%,_100%_0%,_100%_0%,_0%_0%]"
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
      >
        {/* Top Bar: Logo & Close Button */}
        <div className="flex justify-between items-center w-full">
          <div ref={overlayLogoRef}>
            <img
              src={logo}
              alt="Logo"
              className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>

          <div
            ref={closeBtnRef}
            onClick={toggleMenu}
            className="cursor-pointer w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 ml-auto"
          >
            <X className="w-6 h-6 md:w-8 md:h-8" />
          </div>
        </div>

        {/* Main Content: Links (closer to logo) */}
        <div
          className="flex-1 flex flex-col justify-center items-start pl-6 md:pl-40 pt-16 md:pt-10"
          ref={menuLinksRef}
        >
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={toggleMenu}
              className="menu-link-item group relative flex items-center gap-4 cursor-pointer mb-4 md:mb-2"
            >
              <span className="text-sm md:text-xl font-mono text-white/30 group-hover:text-white transition-colors duration-300">
                {`0${index + 1}`}
              </span>

              <span className="text-5xl md:text-8xl font-bold text-white/70 group-hover:text-white leading-none tracking-tight transition-all duration-300 group-hover:translate-x-2">
                {item.label}
              </span>
            </a>
          ))}
        </div>

        {/* Bottom Bar: Socials & Info (lifted up) */}
        <div className="flex flex-col md:flex-row justify-between items-end w-full gap-8">
          <div className="text-white/40 text-sm font-mono hidden md:block pl-10">
            <p>BASED IN INDIA</p>
            <p>AVAILABLE FOR WORK</p>
          </div>

          <div ref={socialLinksRef} className="flex gap-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
              >
                <link.icon className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-300" />
                <span className="hidden md:block text-sm font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
