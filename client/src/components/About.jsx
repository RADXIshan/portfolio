import aboutImage from "../assets/ishan.jpg";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);

  useGSAP(() => {
    const element = aboutRef.current;
    if (!element) return;

    const leftSide = element.querySelector(".about-leftSide");
    const rightSide = element.querySelector(".about-rightSide");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 60%", 
        end: "top 55%",   
        toggleActions: "play none none reverse", 
      },
    });

    tl.from(leftSide, {
      duration: 0.8,
      opacity: 0,
      x: -300,
      ease: "power3.out",
    })
    
    .from(rightSide, {
      duration: 0.8,
      opacity: 0,
      x: 300,
      ease: "power3.out",
    }, "-=0.6"); 

  }, { scope: aboutRef });

  return (
    <div
      id="about"
      ref={aboutRef}
    
      className="relative w-full min-h-screen flex flex-col md:flex-row justify-center items-center px-6 py-16 sm:px-8 md:px-[4vw] md:py-[3vw] overflow-hidden mix-blend-difference"
    >

      <div className="about-leftSide w-full md:w-1/2 flex items-center justify-center p-4">
        <img
          src={aboutImage}
          alt="About"
          
          className="w-60 h-60 sm:w-72 sm:h-72 lg:w-96 lg:h-96 object-cover rounded-full"
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/131313/FFFFFF?text=Ishan'; }}
        />
      </div>

      <div
        className="about-rightSide w-full md:w-1/2 flex flex-col justify-center items-center md:items-start gap-5 md:gap-[2vw] p-4 md:px-[3.5vw]"
      >
        <h2
          className="text-4xl sm:text-5xl lg:text-[5.5vw] font-bold text-white text-center md:text-left tracking-wide"
        >
          About Me
        </h2>
        <p
          className="text-base sm:text-lg lg:text-[1.5vw] text-center md:text-left text-white max-w-md md:max-w-none tracking-normal"
        >
          Hey, I’m Ishan Roy, a software developer passionate about creating modern, high-performance experiences that merge great design with smart tech. I love building fullstack apps and AI systems that feel ahead of their time. I am fueled by curiosity and the thrill of turning ideas into reality.
        </p>
      </div>
    </div>
  );
};

export default About;
