import { gsap } from "gsap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from "react";
import SplitType from 'split-type';
import { useGSAP } from "@gsap/react";

const Hero = ({ isLoading }) => {

  const heroRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    if (isLoading || !textRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: "power4.out" }
    });

    // 1. Split text into characters
    const splitTitle = new SplitType(textRef.current, { types: 'chars,words' });
    
    // 2. Title Animation (Mask Reveal)
    tl.fromTo(splitTitle.chars, 
      { 
        y: "110%", 
        opacity: 0,
        scaleY: 1.5,
        transformOrigin: "bottom"
      },
      {
        y: 0,
        opacity: 1,
        scaleY: 1,
        stagger: 0.03,
        duration: 1.2,
        force3D: true,
      }
    );

    // 3. Subtitle Animation
    const subtitle = new SplitType(heroRef.current.querySelector(".hero-subtitle"), { types: 'chars' });
    tl.from(subtitle.chars, {
        opacity: 0,
        y: 10,
        scale: 0.8,
        stagger: 0.01,
        duration: 1,
        ease: "power3.out",
    }, "-=0.8");

    // 4. Social Links Animation
    tl.from(".social-link-item", {
      y: 30,
      opacity: 0,
      scale: 0.5,
      stagger: 0.08,
      duration: 1,
      ease: "elastic.out(1, 0.75)",
    }, "-=0.6");

    // 5. Background Glow Animation
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

  }, { scope: heroRef, dependencies: [isLoading] });

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
      <div className="bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(300px,80vw,600px)] h-[clamp(300px,80vw,600px)] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none will-change-transform transform-gpu" />
      <div className="bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(200px,50vw,400px)] h-[clamp(200px,50vw,400px)] bg-zinc-400/5 rounded-full blur-[100px] pointer-events-none delay-700 will-change-transform transform-gpu" />

      <div className="overflow-hidden py-4 px-10"> {/* Added px-10 for horizontal buffer */}
        <h1 
            ref={textRef}
            className="hero-title text-[clamp(2.5rem,15vw,15rem)] font-bold tracking-tighter leading-[1.2] py-2 px-2 mix-blend-difference z-10 whitespace-nowrap will-change-transform"
        >
            {title}
        </h1>
      </div>
      
      <p 
        className="hero-subtitle text-[clamp(0.9rem,2vw,1.4rem)] font-light tracking-[0.2em] sm:tracking-[0.4em] text-white/50 uppercase z-10 whitespace-nowrap"
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
