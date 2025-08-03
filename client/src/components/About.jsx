import "../styles/About.css";
import aboutImage from "../assets/ishan.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    const element = aboutRef.current;
    const leftSide = element.querySelector(".about-leftSide");
    const rightSide = element.querySelector(".about-rightSide");

    // Timeline for staggered entrance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 50%",
        end: "top 40%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      leftSide,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, delay: 0.1, ease: "power2.out" }
    ).fromTo(
      rightSide,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, delay: 0.1, ease: "power2.out" },
      "-=0.5"
    );
  }, []);

  return (
    <div id="about" className="about" ref={aboutRef}>
      <div className="about-leftSide">
        <img src={aboutImage} alt="About" />
      </div>
      <div className="about-rightSide">
        <h2>About Me</h2>
        <p>
          Hi, I’m Ishan Roy, a FullStack Developer passionate about turning
          ideas into impactful, user-friendly web applications. I focus on
          building scalable solutions while constantly exploring new
          technologies to make a real difference.
        </p>
      </div>
    </div>
  );
};

export default About;
