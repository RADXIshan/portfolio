import { useLayoutEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  const navContainerRef = useRef(null);
  const menuOverlayRef = useRef(null);
  const menuLinksRef = useRef(null);
  const tl = useRef(null);

  const menuItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
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

  const logoRef = useRef(null);
  const menuBtnRef = useRef(null);
  const closeBtnRef = useRef(null);

  useMagnetic(logoRef);
  useMagnetic(menuBtnRef);
  useMagnetic(closeBtnRef);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({ paused: true });

      tl.current.to(menuOverlayRef.current, {
        duration: 1,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power4.inOut",
      });

      tl.current.from(".menu-link-item", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      }, "-=0.5");

    }, navContainerRef);

    return () => ctx.revert();
  }, []);

  const toggleMenu = () => {
    if (isMenuOpen) {
      tl.current.reverse();
    } else {
      tl.current.play();
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkHover = (index) => {
    setHoveredLink(index);
  };

  const handleLinkLeave = () => {
    setHoveredLink(null);
  };



  return (
    <>
      <nav
        ref={navContainerRef}
        className="fixed top-0 left-0 w-full px-6 py-4 md:px-10 md:py-6 flex justify-between items-center z-[100] mix-blend-difference text-white"
      >
        <div ref={logoRef} className="cursor-pointer">
          <a href="#home" className="block">
            <img src={logo} alt="Logo" className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover" />
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
        className="fixed inset-0 bg-[#0a0a0a] z-[101] flex items-center justify-center clip-path-polygon-[0%_0%,_100%_0%,_100%_0%,_0%_0%]"
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
      >
        {/* Close Button */}
        <div 
          ref={closeBtnRef}
          onClick={toggleMenu}
          className="absolute top-4 right-6 md:top-6 md:right-10 cursor-pointer w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 z-20"
        >
          <X className="w-6 h-6 md:w-8 md:h-8" />
        </div>

        <div className="flex w-full max-w-7xl px-8 justify-center items-center h-full">
          {/* Links Column */}
          <div className="w-full flex flex-col justify-center items-center gap-6" ref={menuLinksRef}>
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={toggleMenu}
                onMouseEnter={() => handleLinkHover(index)}
                onMouseLeave={handleLinkLeave}
                className="menu-link-item text-4xl sm:text-6xl md:text-9xl font-bold text-white/30 hover:text-white transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;