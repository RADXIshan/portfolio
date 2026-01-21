import { gsap } from "gsap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from "react";

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Mask Reveal Animation for Title
      gsap.fromTo(".hero-title-char", 
        { 
          y: 100, 
          opacity: 0,
          rotateX: -90,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.05,
          duration: 1,
          ease: "power4.out",
          delay: 0.5,
        }
      );

      gsap.from(".hero-subtitle", {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 1.2,
        ease: "power3.out",
      });

      gsap.from(".social-link-item", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        delay: 1.5,
        ease: "back.out(1.7)",
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    { icon: faLinkedin, label: "Linkedin", href: "https://www.linkedin.com/in/ishanroy-radx/" },
    { icon: faGithub, label: "Github", href: "https://github.com/RADXIshan" },
    { icon: faEnvelope, label: "Gmail", href: "mailto:ishanroy3118107@gmail.com" },
    { icon: faFileArrowDown, label: "Resume", href: "https://drive.google.com/file/d/1U3GIER3YIW8Xi8v0eWLkKL0l4JXTruG1/view?usp=sharing" },
  ];

  const title = "Ishan Roy";

  return (
    <div
      id="home"
      ref={heroRef}
      className="flex flex-col items-center justify-center min-h-screen gap-6 px-8 py-4 text-center overflow-hidden relative"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gray-600/20 rounded-full blur-[120px] pointer-events-none" />

      <h1 
        ref={textRef}
        className="hero-title text-[clamp(3rem,12vw,12rem)] font-bold tracking-tighter leading-none mb-2 mix-blend-difference z-10"
        aria-label={title}
      >
        <div className="overflow-hidden flex p-2">
          {title.split("").map((char, index) => (
            <span key={index} className="hero-title-char inline-block origin-bottom">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
      </h1>
      
      <p 
        className="hero-subtitle text-[clamp(1.2rem,3vw,1.8rem)] font-light tracking-widest text-white/60 uppercase z-10"
      >
        Software Developer
      </p>

      <div className="social-links flex gap-4 sm:gap-8 mt-4 z-10">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="social-link-item group relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 text-white/50 hover:text-white transition-colors duration-300"
          >
            <div className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out" />
            <FontAwesomeIcon icon={link.icon} className="text-2xl sm:text-4xl relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Hero;
