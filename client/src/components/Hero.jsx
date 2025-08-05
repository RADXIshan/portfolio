import { gsap } from "gsap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from "react";

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray('.hero-title, .hero-subtitle, .social-links');

      gsap.from(elements, {
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

  const socialLinks = [
    { icon: faLinkedin, label: "Linkedin", href: "https://www.linkedin.com/in/ishanroy-radx/" },
    { icon: faGithub, label: "Github", href: "https://github.com/RADXIshan" },
    { icon: faEnvelope, label: "Gmail", href: "mailto:ishanroy3118107@gmail.com" },
    { icon: faFileArrowDown, label: "Resume", href: "https://drive.google.com/file/d/1qezM_fIhEwKwdKJ8hg7-7LZNIdMpeeZM/view?usp=sharing" },
  ];

  return (
    <div
      id="hero"
      ref={heroRef}
      className="flex flex-col items-center justify-center relative h-screen gap-[1vw] p-8 text-center overflow-hidden"
    >
      <h1 className="hero-title text-[10vw] tracking-[0.1rem] font-bold mb-[-2vw]">Ishan Roy</h1>
      <p className="hero-subtitle text-[2.3vw] tracking-[0.2rem] text-[#c7c7c7] transition-colors duration-300 hover:text-white">
        I am a Software Developer
      </p>

      <div className="social-links flex gap-[1.5vw] mt-4">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            data-label={link.label}
            className="relative w-14 h-14 sm:w-16 sm:h-16 text-[#c7c7c7] rounded-full flex items-center justify-center 
                       text-[clamp(1.5rem,4vw,2.2rem)] transition-all duration-300 ease-in-out
                       hover:text-white hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]
                       after:content-[attr(data-label)] after:absolute after:-bottom-[2.5vw] after:left-1/2 after:-translate-x-1/2 
                       after:text-white after:text-[1vw] after:opacity-0 after:pointer-events-none after:whitespace-nowrap 
                       after:transition-all after:duration-300 after:ease-in-out
                       hover:after:opacity-100 hover:after:-translate-y-[5px]"
          >
            <FontAwesomeIcon icon={link.icon} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Hero;
