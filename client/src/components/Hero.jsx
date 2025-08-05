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

  return (
    <div
      id="hero"
      ref={heroRef}
      className="hero flex flex-col items-center justify-center relative h-screen gap-[1vw] p-8 box-border text-center overflow-hidden"
    >
      <h1 className="hero-title text-[8vw] tracking-[0.2rem] font-bold">Ishan Roy</h1>
      <p className="hero-subtitle text-[2.3vw] text-[#c7c7c7] transition-colors duration-300 hover:text-white">
        I am a Software Developer
      </p>

      <div className="social-links flex gap-[1vw] mt-4">
        <a
          className="social-link relative text-[#c7c7c7] rounded-full p-[1vw] text-[clamp(1.5rem,4vw,2.2rem)] transition-all duration-300 ease-in-out hover:text-white hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] 
          after:content-[attr(data-label)] after:absolute after:-bottom-[2.5vw] after:left-1/2 after:-translate-x-1/2 after:text-white after:py-[0.2vw] after:px-[5vw] after:text-[1vw] after:opacity-0 after:pointer-events-none after:whitespace-nowrap after:transition-all after:duration-300 after:ease-in-out
          hover:after:opacity-100 hover:after:-translate-y-[5px]"
          href="https://www.linkedin.com/in/ishanroy-radx/"
          target="_blank"
          rel="noopener noreferrer"
          data-label="Linkedin"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </a>

        <a
          className="social-link relative text-[#c7c7c7] rounded-full p-[1vw] text-[clamp(1.5rem,4vw,2.2rem)] transition-all duration-300 ease-in-out hover:text-white hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] 
          after:content-[attr(data-label)] after:absolute after:-bottom-[2.5vw] after:left-1/2 after:-translate-x-1/2 after:text-white after:py-[0.2vw] after:px-[5vw] after:text-[1vw] after:opacity-0 after:pointer-events-none after:whitespace-nowrap after:transition-all after:duration-300 after:ease-in-out
          hover:after:opacity-100 hover:after:-translate-y-[5px]"
          href="https://github.com/RADXIshan"
          target="_blank"
          rel="noopener noreferrer"
          data-label="Github"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>

        <a
          className="social-link relative text-[#c7c7c7] rounded-full p-[1vw] text-[clamp(1.5rem,4vw,2.2rem)] transition-all duration-300 ease-in-out hover:text-white hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] 
          after:content-[attr(data-label)] after:absolute after:-bottom-[2.5vw] after:left-1/2 after:-translate-x-1/2 after:text-white after:py-[0.2vw] after:px-[5vw] after:text-[1vw] after:opacity-0 after:pointer-events-none after:whitespace-nowrap after:transition-all after:duration-300 after:ease-in-out
          hover:after:opacity-100 hover:after:-translate-y-[5px]"
          href="mailto:ishanroy3118107@gmail.com"
          data-label="Gmail"
        >
          <FontAwesomeIcon icon={faEnvelope} />
        </a>

        <a
          className="social-link relative text-[#c7c7c7] rounded-full p-[1vw] text-[clamp(1.5rem,4vw,2.2rem)] transition-all duration-300 ease-in-out hover:text-white hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] 
          after:content-[attr(data-label)] after:absolute after:-bottom-[2.5vw] after:left-1/2 after:-translate-x-1/2 after:text-white after:py-[0.2vw] after:px-[5vw] after:text-[1vw] after:opacity-0 after:pointer-events-none after:whitespace-nowrap after:transition-all after:duration-300 after:ease-in-out
          hover:after:opacity-100 hover:after:-translate-y-[5px]"
          href="https://drive.google.com/file/d/1qezM_fIhEwKwdKJ8hg7-7LZNIdMpeeZM/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          data-label="Resume"
        >
          <FontAwesomeIcon icon={faFileArrowDown} />
        </a>
      </div>
    </div>
  );
};

export default Hero;
