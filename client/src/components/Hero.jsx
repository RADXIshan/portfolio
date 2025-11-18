import { gsap } from "gsap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from "react";

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
    
      gsap.from('.animate-in', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Social links data
  const socialLinks = [
    { icon: faLinkedin, label: "Linkedin", href: "https://www.linkedin.com/in/ishanroy-radx/" },
    { icon: faGithub, label: "Github", href: "https://github.com/RADXIshan" },
    { icon: faEnvelope, label: "Gmail", href: "mailto:ishanroy3118107@gmail.com" },
    { icon: faFileArrowDown, label: "Resume", href: "https://drive.google.com/file/d/1WBMMzgVGutZBwhtOqLpSVm_VX0nR1wzf/view" },
  ];

  return (
    <div
      id="home"
      ref={heroRef}
      className="flex flex-col items-center justify-center h-screen gap-4 p-4 text-center overflow-hidden"
    >
      <h1 
        className="animate-in hero-title text-[clamp(3.5rem,10vw,8rem)] font-bold tracking-tight mb-[-0.5rem] md:mb-[-1rem]"
      >
        Ishan Roy
      </h1>
      <p 
        className="animate-in hero-subtitle text-[clamp(1rem,2.5vw,1.5rem)] tracking-wider text-slate-400 transition-colors duration-300 hover:text-white"
      >
        I am a Software Developer
      </p>

      <div className="animate-in social-links flex gap-6 mt-6">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            data-label={link.label}
            className="
              relative 
              w-14 h-14 sm:w-16 sm:h-16 
              text-slate-400 rounded-full 
              flex items-center justify-center
              text-[clamp(1.5rem,4vw,2rem)]
              transition-all duration-300 ease-in-out
              hover:text-white hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]
              
              /* Tooltip styles */
              after:content-[attr(data-label)] 
              after:absolute after:-bottom-10 after:left-1/2 after:-translate-x-1/2
              after:px-3 after:py-1 after:rounded-md
              after:bg-slate-800/80 after:backdrop-blur-sm
              after:text-white after:text-sm after:font-medium
              after:opacity-0 after:pointer-events-none after:whitespace-nowrap
              after:transition-all after:duration-300 after:ease-in-out
              hover:after:opacity-100 hover:after:-translate-y-1
            "
          >
            <FontAwesomeIcon icon={link.icon} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Hero;
