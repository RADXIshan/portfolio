import { useLayoutEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navContainerRef = useRef(null);
  const navLinksRef = useRef(null);
  const tl = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([".logo img", ".menu-icon"], {
        delay: 0.8,
        duration: 1,
        ease: "power2.out",
        y: -50,
        opacity: 0,
        stagger: 0.1,
      });

      tl.current = gsap.timeline({ paused: true });

      tl.current.to(navLinksRef.current, {
        duration: 0.6,
        delay: 0.2,
        height: "100vh",
        ease: "power3.out",
      });

      tl.current.fromTo(
        ".nav-link-item",
        { y: -300, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.1,
          ease: "power2.out",
          stagger: 0.1,
        },
        "-=0.4"
      );

      tl.current.fromTo(
        ".close-icon",
        { y: 0, opacity: 0 },
        { y: -300, opacity: 1, duration: 0.3 },
        "-=0.5"
      );
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

  return (
    <>
      <nav
        ref={navContainerRef}
        className="fixed top-0 left-0 flex w-full items-center justify-between px-[7.5vw] py-[2vw] font-semibold max-w-screen z-[100]"
      >
        <div className="logo active:scale-90 mix-blend-difference">
          <a className="nav-link active:scale-90" href="#home">
            <img
              src={logo}
              alt="logo"
              className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center"
            />
          </a>
        </div>

        <div
          className="menu-icon-container flex items-center justify-center text-[#FAF9F6] w-11 h-11 md:w-14 md:h-14 rounded-full cursor-pointer p-2 transition-all duration-300 ease-in-out hover:bg-[rgba(251,211,161,0.1)] active:bg-[rgba(251,211,161,0.2)] active:scale-75"
          onClick={toggleMenu}
        >
          <Menu className="menu-icon h-8 w-8" />
        </div>
      </nav>

      {/* Fullscreen menu */}
      <div
        ref={navLinksRef}
        className="nav-links fixed top-0 left-0 w-full h-0 overflow-hidden flex flex-col items-center justify-center gap-[2vw] bg-[#131313] z-[101]"
      >
        <X
          className="
            absolute flex h-12 w-12 cursor-pointer items-center justify-center 
            rounded-full p-2 text-[#FAF9F6]                                 
            transition-all duration-300 ease-in-out                         
            hover:bg-amber-200/10                                         
            top-2.5 right-7                                                                               
            lg:top-[2.2rem] lg:right-[7rem]  active:bg-[rgba(251,211,161,0.2)] active:scale-75                           
          "
          onClick={toggleMenu}
          aria-label="Close"
        />

        {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
          <a
            key={item}
            className="nav-link nav-link-item relative text-[3.5rem] text-[#FAF9F6] transition-all duration-300 ease-in-out transform hover:text-[rgb(251,211,161)] hover:scale-115 after:content-[''] after:absolute after:w-full after:h-[2px] after:bottom-0 after:left-0 after:bg-[rgb(251,211,161)] after:origin-bottom-right after:scale-x-0 after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100 active:scale-90"
            href={`#${item.toLowerCase()}`}
            onClick={toggleMenu}
          >
            {item}
          </a>
        ))}
      </div>
    </>
  );
};

export default Navbar;