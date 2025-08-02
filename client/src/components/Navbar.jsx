import { useLayoutEffect, useRef, useState } from "react";
import "../styles/Navbar.css";
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
      gsap.from([".logo img", ".menu-icon-container"], {
        delay: 0.8,
        duration: 1,
        ease: "power2.out",
        y: -50,
        opacity: 0,
        stagger: 0.1,
      });
      tl.current = gsap.timeline({ paused: true });

      tl.current.to(navLinksRef.current, {
        duration: 0.8,
        delay: 0.2,
        height: "100vh",
        ease: "power3.inOut",
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
        { y:0 ,opacity: 0 },
        { y: -300 , opacity: 1, duration: 0.3 },
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
      <nav ref={navContainerRef}>
        <div className="logo">
          <a className="nav-link" href="#hero">
            <img src={logo} alt="logo" />
          </a>
        </div>
        <div className="menu-icon-container" onClick={toggleMenu}>
          <Menu className="menu-icon" size={36} />
        </div>
      </nav>

      <div className="nav-links" ref={navLinksRef}>
        <X className="close-icon" onClick={toggleMenu} />
        <a className="nav-link nav-link-item" href="#hero" onClick={toggleMenu}>
          Home
        </a>
        <a className="nav-link nav-link-item" href="#about" onClick={toggleMenu}>
          About
        </a>
        <a
          className="nav-link nav-link-item"
          href="#projects"
          onClick={toggleMenu}
        >
          Projects
        </a>
        <a
          className="nav-link nav-link-item"
          href="#contact"
          onClick={toggleMenu}
        >
          Contact
        </a>
      </div>
    </>
  );
};

export default Navbar;
