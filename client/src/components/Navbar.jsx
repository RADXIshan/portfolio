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
        className="fixed top-0 left-0 z-[100] flex w-full items-center justify-between px-[7.5vw] py-[2vw] font-semibold"
      >
        <div className="logo">
          <a className="nav-link" href="#home">
            <img
              src={logo}
              alt="logo"
              className="w-[4.2vw] h-[4.2vw] rounded-full flex items-center justify-center"
            />
          </a>
        </div>

        <div
          className="menu-icon-container flex items-center justify-center text-[#FAF9F6] w-[4.8vw] h-[4.8vw] rounded-full cursor-pointer p-[1vw] transition-all duration-300 ease-in-out hover:bg-[rgba(251,211,161,0.1)]"
          onClick={toggleMenu}
        >
          <Menu className="menu-icon" size={36} />
        </div>
      </nav>

      {/* Fullscreen menu */}
      <div
        ref={navLinksRef}
        className="nav-links fixed top-0 left-0 w-full h-0 overflow-hidden flex flex-col items-center justify-center gap-[2vw] bg-[#131313] z-[101]"
      >
        <X
          className="close-icon absolute top-[2vw] right-[7.5vw] w-[4.8vw] h-[4.8vw] rounded-full cursor-pointer text-[#FAF9F6] p-[1vw] transition-all duration-300 ease-in-out hover:bg-[rgba(251,211,161,0.1)]"
          onClick={toggleMenu}
        />

        {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
          <a
            key={item}
            className="nav-link nav-link-item relative text-[4vw] text-[#FAF9F6] transition-all duration-300 ease-in-out transform hover:text-[rgb(251,211,161)] hover:scale-115 after:content-[''] after:absolute after:w-full after:h-[2px] after:bottom-0 after:left-0 after:bg-[rgb(251,211,161)] after:origin-bottom-right after:scale-x-0 after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
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
