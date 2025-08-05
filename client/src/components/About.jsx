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
    const leftSide = element.querySelector(".about-leftSide");
    const rightSide = element.querySelector(".about-rightSide");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 50%",
        end: "top 45%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(leftSide, {
      duration: 0.8,
      opacity: 0,
      x: -300,
      ease: "power3.out",
    }).from(rightSide, {
      duration: 0.8,
      opacity: 0,
      x: 300,
      ease: "power3.out",
    });
  }, { scope: aboutRef });

  return (
    <div
      id="about"
      ref={aboutRef}
      className="relative max-h-[screen] w-full bg-[#131313] flex justify-center items-center px-[4vw] py-[3vw] overflow-hidden"
    >
      {/* Left side (Image) */}
      <div className="about-leftSide h-full w-[50%] flex items-center justify-center">
        <img
          src={aboutImage}
          alt="About"
          className="w-[400px] h-[400px] object-cover rounded-full mt-[10%]"
        />
      </div>

      {/* Right side (Text) */}
      <div className="about-rightSide h-full w-[50%] flex flex-col justify-center items-start gap-[2vw] px-[3.5vw] tracking-[0.15vw]">
        <h2 className="text-[5.5vw] font-bold text-white">About Me</h2>
        <p className="text-[1.5vw] text-left text-white">
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
