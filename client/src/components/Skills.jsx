import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
import vscode from "../assets/vscode.png";
import gsapImg from "../assets/gsap.png";
import github from "../assets/github.png";
import cursor from "../assets/cursor.png";
import fastapi from "../assets/fastapi.png";
import numpy from "../assets/numpy.png";
import pandas from "../assets/pandas.png";
import matplotlib from "../assets/matplotlib.png";
import langchain from "../assets/langchain.png";
import socketio from "../assets/socketio.png";
import { ChevronDown } from "lucide-react";
import webrtc from "../assets/webrtc.png";

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  {
    category: "Languages",
    items: [
      { name: "JavaScript", img: javascript },
      { name: "Python", img: python },
      { name: "Java", img: java },
    ],
  },
  {
    category: "Frameworks & Libraries",
    items: [
      { name: "React.js", img: react },
      { name: "Node.js", img: node },
      { name: "Express.js", img: express },
      { name: "FastAPI", img: fastapi },
      { name: "LangChain", img: langchain },
      { name: "NumPy", img: numpy },
      { name: "Pandas", img: pandas },
      { name: "Matplotlib", img: matplotlib },
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
      { name: "RESTful API", img: restapi },
      { name: "Socket.io", img: socketio },
      { name: "WebRTC", img: webrtc },
      { name: "Bootstrap", img: bootstrap },
      { name: "VS Code", img: vscode },
      { name: "Cursor", img: cursor },
      { name: "Postman", img: postman },
      { name: "XAMPP", img: xampp },
    ],
  },
];

const Skills = () => {
  const containerRef = useRef(null);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  const handleAccordionToggle = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const elems = containerRef.current.querySelectorAll(".elem");
    
    elems.forEach((elem) => {
      const info = elem.querySelector(".info-desktop");
      if (!info) return;

      const handleMouseMove = (e) => {
        const rect = elem.getBoundingClientRect();
        // Calculate position relative to the element, but offset it slightly
        // so it doesn't overlap the cursor exactly
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(info, {
          x: x,
          y: y,
          duration: 0.6,
          ease: "power3.out",
        });
      };
      
      const handleMouseEnter = () => {
        gsap.to(info, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" });
      };
      
      const handleMouseLeave = () => {
        gsap.to(info, { autoAlpha: 0, scale: 0.8, duration: 0.3, ease: "power2.in" });
      };

      elem.addEventListener("mousemove", handleMouseMove);
      elem.addEventListener("mouseenter", handleMouseEnter);
      elem.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        elem.removeEventListener("mousemove", handleMouseMove);
        elem.removeEventListener("mouseenter", handleMouseEnter);
        elem.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, [isDesktop]); 

  useGSAP(
    () => {
      const elems = containerRef.current.querySelectorAll(".elem-wrapper");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          end: "bottom 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".skills-title", { 
        y: 100, 
        opacity: 0, 
        duration: 1,
        ease: "power4.out" 
      });
      
      tl.from(elems, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      }, "-=0.5");
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative w-full py-20 lg:py-32">
      <h2
        id="skills"
        className="skills-title text-[15vw] md:text-[10vw] lg:text-[12vw] font-bold border-b border-white/10 px-6 md:px-10 lg:px-[4vw] mb-0 leading-none tracking-tight text-white/90"
      >
        Skills
      </h2>

      <div className="skills w-full px-6 md:px-10 lg:px-[7.5vw] py-8 lg:py-12 mb-24 md:mb-48 relative">
        {skillsData.map((skill, index) => (
          <div
            key={skill.category}
            className="elem-wrapper border-b border-white/10 group/row"
          >
            <div
              className="elem relative py-12 md:py-16 lg:py-20 w-full flex items-center justify-between transition-colors duration-300 hover:bg-white/[0.02]"
              onClick={() => !isDesktop && handleAccordionToggle(index)}
            >
              <h3 className="relative text-4xl md:text-5xl lg:text-7xl font-semibold tracking-wide text-white/80 group-hover/row:text-white group-hover/row:translate-x-4 transition-all duration-500 ease-out z-[2]">
                {skill.category}
              </h3>
              
              {/* Accordion Icon for Mobile */}
              {!isDesktop && (
                 <ChevronDown
                  className={`w-6 h-6 text-white/50 transition-transform duration-300 mr-4 ${openAccordion === index ? 'rotate-180 text-white' : ''}`}
                />
              )}

              {/* DESKTOP: Floating Glass Card */}
              {isDesktop && (
                <div className="info-desktop absolute z-50 pointer-events-none opacity-0 transform -translate-x-1/2 -translate-y-1/2 scale-90 w-[400px]">
                  <div className="bg-neutral-900/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-wrap gap-3">
                    {skill.items.map((item) => (
                      <div key={item.name} className="flex items-center gap-2 bg-white/5 border border-white/5 px-4 py-2 rounded-full">
                        <img src={item.img} alt={item.name} className="h-5 w-5 object-contain" /> 
                        <span className="text-md font-medium text-white/90">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* MOBILE: Accordion content panel */}
            {!isDesktop && (
              <div
                className={`info-mobile overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  openAccordion === index ? "max-h-[500px] opacity-100 pb-8" : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex flex-wrap gap-3 pt-2">
                  {skill.items.map((item) => (
                    <div key={item.name} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2.5 rounded-full">
                      <img src={item.img} alt={item.name} className="h-5 w-5 object-contain" /> 
                      <span className="text-sm font-medium text-white/90">{item.name}</span>
                    </div>
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