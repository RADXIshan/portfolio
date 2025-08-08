import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import your images as before
import express from "../assets/express.png";
import react from "../assets/react.png";
import node from "../assets/node.png";
import python from "../assets/python.png";
import java from "../assets/java.png";
import javascript from "../assets/javascript.png";
import tailwind from "../assets/tailwind.png";
import git from "../assets/git.png";
import bootstrap from "../assets/bootstrap.png";
import restapi from "../assets/restapi.png";
import postman from "../assets/postman.png";
import xampp from "../assets/xampp.png";
import postgres from "../assets/postgres.png";
import mongodb from "../assets/mongodb.png";
import mysql from "../assets/mysql.png";
import next from "../assets/next.png";
import vscode from "../assets/vscode.png";
import gsapImg from "../assets/gsap.png";
import github from "../assets/github.png";

gsap.registerPlugin(ScrollTrigger);

// Data array for skills to keep the JSX clean (DRY principle)
const skillsData = [
  {
    category: "Languages",
    items: [
      { name: "JavaScript", img: javascript },
      { name: "Java", img: java },
      { name: "Python", img: python },
    ],
  },
  {
    category: "Frameworks",
    items: [
      { name: "React", img: react },
      { name: "Node.js", img: node },
      { name: "Express.js", img: express },
      { name: "Next.js", img: next },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "PostgreSQL", img: postgres },
      { name: "MongoDB", img: mongodb },
      { name: "MySQL", img: mysql },
    ],
  },
  {
    category: "Tools & Technologies",
    items: [
      { name: "Git", img: git },
      { name: "GitHub", img: github },
      { name: "Tailwind CSS", img: tailwind },
      { name: "GSAP", img: gsapImg },
      { name: "Bootstrap", img: bootstrap },
      { name: "VS Code", img: vscode },
      { name: "Postman", img: postman },
      { name: "XAMPP", img: xampp },
      { name: "RESTful API", img: restapi },
    ],
  },
];

const Skills = () => {
  const containerRef = useRef(null);
  
  // State to manage which accordion item is open on mobile
  const [openAccordion, setOpenAccordion] = useState(null);

  // State to track if the screen is desktop-sized
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  // Toggle accordion item
  const handleAccordionToggle = (index) => {
    // If the clicked item is already open, close it. Otherwise, open it.
    setOpenAccordion(openAccordion === index ? null : index);
  };

  // Effect to check screen size for responsiveness
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", checkScreenSize);
    
    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Floating info on hover (ONLY FOR DESKTOP)
  useEffect(() => {
    // If it's not desktop, don't attach hover listeners
    if (!isDesktop) return;

    const elems = containerRef.current.querySelectorAll(".elem");
    
    elems.forEach((elem) => {
      const info = elem.querySelector(".info-desktop");
      if (!info) return; // Guard against element not found

      const handleMouseMove = (e) => {
        const rect = elem.getBoundingClientRect();
        gsap.to(info, {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          duration: 0.5,
          ease: "power3.out",
        });
      };
      
      const handleMouseEnter = () => {
        gsap.to(info, { autoAlpha: 1, scale: 1, duration: 0.3 });
      };
      
      const handleMouseLeave = () => {
        gsap.to(info, { autoAlpha: 0, scale: 0.8, duration: 0.2 });
      };

      elem.addEventListener("mousemove", handleMouseMove);
      elem.addEventListener("mouseenter", handleMouseEnter);
      elem.addEventListener("mouseleave", handleMouseLeave);

      // Cleanup function to remove listeners
      return () => {
        elem.removeEventListener("mousemove", handleMouseMove);
        elem.removeEventListener("mouseenter", handleMouseEnter);
        elem.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, [isDesktop]); // Re-run this effect if screen size changes across the breakpoint

  // GSAP Scroll Animations (no changes needed here)
  useGSAP(
    () => {
      const elems = containerRef.current.querySelectorAll(".elem");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "top 10%",
          toggleActions: "play none none reverse",
          scrub: 1,
        },
      });

      tl.from(".skills-title", { y: 150, opacity: 0, ease: "power2.inOut" });
      
      tl.from(elems, {
        y: 100,
        opacity: 0,
        ease: "power2.out",
        stagger: 0.1,
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <h2
        id="skills"
        className="skills-title text-[15vw] md:text-[10vw] lg:text-[15vw] font-extrabold border-b border-white/25 px-6 md:px-10 lg:px-[4vw] mb-0"
      >
        Skills
      </h2>

      <div className="skills w-full px-6 md:px-10 lg:px-[7.5vw] py-8 lg:py-[2vw] mb-24 md:mb-48 relative">
        {skillsData.map((skill, index) => (
          <div
            key={skill.category}
            className="elem-wrapper border-b-2 lg:border-b-4 border-white"
          >
            <div
              className="elem relative h-32 md:h-40 lg:h-[200px] w-full flex items-center justify-between cursor-pointer group"
              onClick={() => !isDesktop && handleAccordionToggle(index)}
            >
              <h3 className="relative text-4xl md:text-6xl lg:text-8xl font-semibold z-[2]">
                {skill.category}
              </h3>
              
              {/* Accordion Icon for Mobile */}
              {!isDesktop && (
                 <svg
                  className={`w-8 h-8 transition-transform duration-300 ${openAccordion === index ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}

              {/* DESKTOP: Floating info box */}
              {isDesktop && (
                <div className="info-desktop absolute bg-white/10 backdrop-blur-md text-white px-8 py-6 rounded-2xl pointer-events-none opacity-0 transform -translate-x-1/2 -translate-y-1/2 scale-80 flex flex-wrap justify-center gap-x-8 gap-y-4 items-center whitespace-nowrap">
                  {skill.items.map((item) => (
                    <p key={item.name} className="text-xl flex items-center gap-2">
                      <img src={item.img} alt={item.name} className="h-7 w-7" /> {item.name}
                    </p>
                  ))}
                </div>
              )}
            </div>
            
            {/* MOBILE: Accordion content panel */}
            {!isDesktop && (
              <div
                className={`info-mobile overflow-hidden transition-all duration-500 ease-in-out ${
                  openAccordion === index ? "max-h-[500px] py-6" : "max-h-0"
                }`}
              >
                <div className="flex flex-wrap justify-start gap-x-6 gap-y-4 items-center">
                  {skill.items.map((item) => (
                    <p key={item.name} className="text-lg flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg">
                      <img src={item.img} alt={item.name} className="h-6 w-6" /> {item.name}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;