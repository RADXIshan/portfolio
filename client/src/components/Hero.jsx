import { gsap } from "gsap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from "react";
import SplitType from 'split-type';
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    if (!textRef.current) return;

    // Split text into characters
    const splitTitle = new SplitType(textRef.current, { types: 'chars,words' });
    
    // Initial animation
    gsap.fromTo(splitTitle.chars, 
      { 
        y: 100, 
        rotateX: -90,
        opacity: 0
      },
      {
        y: 0,
        rotateX: 0,
        opacity: 1,
        stagger: 0.02,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.5
      }
    );

    if (heroRef.current) {
        const subtitle = new SplitType(heroRef.current.querySelector(".hero-subtitle"), { types: 'chars' });
        gsap.from(subtitle.chars, {
            opacity: 0,
            y: 10,
            stagger: 0.01,
            duration: 1,
            delay: 1.5,
            ease: "power3.out",
        });
    }

    gsap.from(".social-link-item", {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      delay: 1.5,
      ease: "back.out(1.7)",
    });

    // Background Glow Animation
    gsap.to(".bg-glow", {
        scale: 1.2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // Magnetic Effect for Social Links (Only if hover is supported)
    if (window.matchMedia("(hover: hover)").matches) {
        const socialItems = gsap.utils.toArray(".social-link-item");
        socialItems.forEach(item => {
            const xTo = gsap.quickTo(item, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
            const yTo = gsap.quickTo(item, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

            item.addEventListener("mousemove", (e) => {
                const { clientX, clientY } = e;
                const { left, top, width, height } = item.getBoundingClientRect();
                const x = clientX - (left + width / 2);
                const y = clientY - (top + height / 2);
                xTo(x * 0.3);
                yTo(y * 0.3);
            });

            item.addEventListener("mouseleave", () => {
                xTo(0);
                yTo(0);
            });
        });
    }

  }, { scope: heroRef });

  const socialLinks = [
    { icon: faLinkedin, label: "Linkedin", href: "https://www.linkedin.com/in/ishanroy-radx/" },
    { icon: faGithub, label: "Github", href: "https://github.com/RADXIshan" },
    { icon: faEnvelope, label: "Gmail", href: "mailto:ishanroy3118107@gmail.com" },
    { icon: faFileArrowDown, label: "Resume", href: "https://drive.google.com/file/d/1sL-WBKGF5TBt0vlVXanycEAFcPrPT5ph/view?usp=sharing" },
  ];

  const title = "Ishan Roy";

  return (
    <div
      id="home"
      ref={heroRef}
      className="flex flex-col items-center justify-center min-h-screen gap-6 px-8 py-4 text-center overflow-hidden relative"
    >
      {/* Background Glow */}
      <div className="bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(300px,80vw,600px)] h-[clamp(300px,80vw,600px)] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(200px,50vw,400px)] h-[clamp(200px,50vw,400px)] bg-zinc-400/5 rounded-full blur-[100px] pointer-events-none delay-700" />

      <div className="overflow-hidden py-4 px-10"> {/* Added px-10 for horizontal buffer */}
        <h1 
            ref={textRef}
            className="hero-title text-[clamp(3rem,15vw,15rem)] font-bold tracking-tighter leading-[1.2] py-2 px-2 mix-blend-difference z-10"
        >
            {title}
        </h1>
      </div>
      
      <p 
        className="hero-subtitle text-[clamp(1rem,2vw,1.4rem)] font-light tracking-[0.4em] text-white/50 uppercase z-10"
      >
        Software Developer
      </p>

      <div className="social-links flex gap-4 sm:gap-10 mt-8 z-10">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="social-link-item group relative flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 text-white/40 hover:text-white transition-colors duration-500"
          >
            <div className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out" />
            <FontAwesomeIcon icon={link.icon} className="text-2xl sm:text-4xl relative z-10 transform group-hover:scale-110 transition-transform duration-500" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Hero;
