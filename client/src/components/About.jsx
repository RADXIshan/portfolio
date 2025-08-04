import "../styles/About.css";
import aboutImage from "../assets/ishan.jpg";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import {useGSAP} from '@gsap/react'
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

const About = () => {

  const aboutRef = useRef(null);

  useGSAP(() => {
    const element = aboutRef.current;
    const leftSide = element.querySelector(".about-leftSide");
    const rightSide = element.querySelector(".about-rightSide");

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 50%",
        end: "top 40%",
        toggleActions: "play none none reverse"
      }
    });

    tl.from(leftSide, {
      duration: 0.8,
      x: -300,
      opacity: 0,
      ease: "power3.inOut",
    })
    .from(rightSide, {
      duration: 0.8,
      x: 300,
      opacity: 0,
      ease: "power3.inOut",
    })
    
  }, {scope: aboutRef});

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
