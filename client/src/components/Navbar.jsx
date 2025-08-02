import { useRef, useState } from "react"; 
import "../styles/Navbar.css";
import { Link } from 'react-router'; 
import logo from "../assets/logo.png";
import { Menu, X } from "lucide-react"; 
import { gsap } from "gsap";

const Navbar = () => {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navLinksRef = useRef(null);

  const toggleMenu = () => {

    gsap.to(navLinksRef.current, {
      duration: 0.8,
      height: isMenuOpen ? "0" : "100vh", 
      ease: "power3.inOut",
    });
 
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav>
        <div className="logo">
          <Link className="nav-link" to="#hero"><img src={logo} alt="logo" /></Link>
        </div>
        <div onClick={toggleMenu}>
          {isMenuOpen ? <X className="menu-icon"/> : <Menu className="menu-icon"/>}
        </div>
      </nav>
      
      <div className="nav-links" ref={navLinksRef}>
          <Link className="nav-link" to="#hero">Home</Link>
          <Link className="nav-link" to="#about">About</Link>
          <Link className="nav-link" to="#projects">Projects</Link>
          <Link className="nav-link" to="#contact">Contact</Link>
      </div>
    </>
  )
}

export default Navbar;