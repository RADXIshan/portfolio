import { useEffect, useRef } from "react";
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
import next from "../assets/next.png";
import vscode from "../assets/vscode.png";
import gsapImg from "../assets/gsap.png";
import github from "../assets/github.png";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const skillsRef = useRef(null);

  // Floating info on hover
  useEffect(() => {
    const elems = document.querySelectorAll(".elem");

    elems.forEach((elem) => {
      const info = elem.querySelector(".info");

      const handleMouseMove = (e) => {
        const rect = elem.getBoundingClientRect();
        info.style.left = `${e.clientX - rect.left}px`;
        info.style.top = `${e.clientY - rect.top}px`;
      };

      const handleMouseEnter = () => {
        info.style.opacity = 1;
        info.style.transform = "translate(-50%, -50%) scale(1)";
      };

      const handleMouseLeave = () => {
        info.style.opacity = 0;
        info.style.transform = "translate(-50%, -50%) scale(0.8)";
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
  }, []);

  // GSAP Scroll Animations
  useGSAP(
    () => {
      const skills = skillsRef.current;
      const elems = skills.querySelectorAll(".elem");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: skills,
          start: "top 70%",
          end: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".skills-title", {
        duration: 0.8,
        y: 300,
        opacity: 0,
        ease: "power2.inOut",
      });

      elems.forEach((elem) => {
        tl.from(elem, {
          duration: 0.4,
          y: 100,
          opacity: 0,
          ease: "power2.out",
          stagger: 0.1,
        });
      });
    },
  );

  return (
    <>
      <h2
        id="skills"
        className="skills-title text-[15vw] font-bold border-b border-white/25 px-[4vw] py-0 mb-0"
      >
        Skills
      </h2>

      <div
        ref={skillsRef}
        className="skills min-h-screen w-full px-[7.5vw] py-[2vw] mb-[200px] relative overflow-hidden"
      >
        {/* Languages */}
        <div className="elem relative h-[200px] w-full border-b-4 border-white flex items-center justify-start cursor-pointer">
          <h3 className="relative text-[4.5vw] z-[2]">Languages</h3>
          <div className="info absolute bg-[rgba(255,255,255,0.12)] backdrop-blur-md text-white px-[2.5vw] py-[2vw] rounded-[2vw] pointer-events-none opacity-0 transform -translate-x-1/2 -translate-y-1/2 scale-[0.8] transition-all duration-200 ease-in-out min-w-[60%] max-w-[85%] flex flex-wrap justify-center gap-[2vw] items-center whitespace-normal">
            <p className="m-[0.4rem_0] text-[2vw] flex items-center gap-[0.5vw]">
              <img src={javascript} alt="javascript" className="h-[2.5vw] w-[2.5vw]" /> JavaScript
            </p>
            <p className="m-[0.4rem_0] text-[2vw] flex items-center gap-[0.5vw]">
              <img src={java} alt="java" className="h-[2.5vw] w-[2.5vw]" /> Java
            </p>
            <p className="m-[0.4rem_0] text-[2vw] flex items-center gap-[0.5vw]">
              <img src={python} alt="python" className="h-[2.5vw] w-[2.5vw]" /> Python
            </p>
          </div>
        </div>

        {/* Frameworks */}
        <div className="elem relative h-[200px] w-full border-b-4 border-white flex items-center justify-start cursor-pointer">
          <h3 className="relative text-[4.5vw] z-[2]">Frameworks</h3>
          <div className="info absolute bg-[rgba(255,255,255,0.12)] backdrop-blur-md text-white px-[2.5vw] py-[2vw] rounded-[2vw] pointer-events-none opacity-0 transform -translate-x-1/2 -translate-y-1/2 scale-[0.8] transition-all duration-200 ease-in-out min-w-[60%] max-w-[85%] flex flex-wrap justify-center gap-[2vw] items-center whitespace-normal">
            <p className="m-[0.4rem_0] text-[2vw] flex items-center gap-[0.5vw]">
              <img src={react} alt="react" className="h-[2.5vw] w-[2.5vw]" /> React
            </p>
            <p className="m-[0.4rem_0] text-[2vw] flex items-center gap-[0.5vw]">
              <img src={node} alt="node" className="h-[2.5vw] w-[2.5vw]" /> Node.js
            </p>
            <p className="m-[0.4rem_0] text-[2vw] flex items-center gap-[0.5vw]">
              <img src={express} alt="express" className="h-[2.5vw] w-[2.5vw]" /> Express.js
            </p>
            <p className="m-[0.4rem_0] text-[2vw] flex items-center gap-[0.5vw]">
              <img src={next} alt="next" className="h-[2.5vw] w-[2.5vw]" /> Next.js
            </p>
          </div>
        </div>

        {/* Databases */}
        <div className="elem relative h-[200px] w-full border-b-4 border-white flex items-center justify-start cursor-pointer">
          <h3 className="relative text-[4.5vw] z-[2]">Databases</h3>
          <div className="info absolute bg-[rgba(255,255,255,0.12)] backdrop-blur-md text-white px-[2.5vw] py-[2vw] rounded-[2vw] pointer-events-none opacity-0 transform -translate-x-1/2 -translate-y-1/2 scale-[0.8] transition-all duration-200 ease-in-out min-w-[60%] max-w-[85%] flex flex-wrap justify-center gap-[2vw] items-center whitespace-normal">
            <p className="m-[0.4rem_0] text-[2vw] flex items-center gap-[0.5vw]">
              <img src={postgres} alt="postgres" className="h-[2.5vw] w-[2.5vw]" /> PostgreSQL
            </p>
            <p className="m-[0.4rem_0] text-[2vw] flex items-center gap-[0.5vw]">
              <img src={mongodb} alt="mongodb" className="h-[2.5vw] w-[2.5vw]" /> MongoDB
            </p>
            <p className="m-[0.4rem_0] text-[2vw] flex items-center gap-[0.5vw]">
              <img src={mysql} alt="mysql" className="h-[2.5vw] w-[2.5vw]" /> MySQL
            </p>
          </div>
        </div>

        {/* Tools & Technologies */}
        <div className="elem relative h-[200px] w-full border-b-4 border-white flex items-center justify-start cursor-pointer">
          <h3 className="relative text-[4.5vw] z-[2]">Tools & Technologies</h3>
          <div className="info absolute bg-[rgba(255,255,255,0.12)] backdrop-blur-md text-white px-[2.5vw] py-[2vw] rounded-[2vw] pointer-events-none opacity-0 transform -translate-x-1/2 -translate-y-1/2 scale-[0.8] transition-all duration-200 ease-in-out min-w-[60%] max-w-[85%] flex flex-wrap justify-center gap-[2vw] items-center whitespace-normal">
            {[
              [git, "Git"],
              [github, "GitHub"],
              [tailwind, "Tailwind CSS"],
              [gsapImg, "GSAP"],
              [bootstrap, "Bootstrap"],
              [vscode, "VS Code"],
              [postman, "Postman"],
              [xampp, "XAMPP"],
              [restapi, "RESTful API"],
            ].map(([img, name]) => (
              <p key={name} className="m-[0.4rem_0] text-[2vw] flex items-center gap-[0.5vw]">
                <img src={img} alt={name} className="h-[2.5vw] w-[2.5vw]" /> {name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Skills;
