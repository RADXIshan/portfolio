import { useLayoutEffect, useRef, useState } from "react";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navContainerRef = useRef(null); // For gsap context
  const navLinksRef = useRef(null); // For menu container
  const tl = useRef(null); // GSAP timeline

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({ paused: true });

      // 1. Animate the container height
      tl.current.to(navLinksRef.current, {
        duration: 0.8,
        delay: 0.2,
        height: "100vh",
        ease: "power3.inOut",
      });

      // 2. Animate the nav links
      tl.current.fromTo(
        ".nav-link-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.2,
          ease: "power2.out",
          stagger: 0.1,
        },
        "-=0.4"
      );

      // 3. Animate the close icon
      tl.current.fromTo(
        ".close-icon",
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
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
        <div onClick={toggleMenu}>
          <Menu className="menu-icon" />
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
