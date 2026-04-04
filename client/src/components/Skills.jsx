import { useRef } from "react";
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
import webrtc from "../assets/webrtc.png";
import opencv from "../assets/opencv.png";
import pytorch from "../assets/pytorch.png";
import chromadb from "../assets/chromadb.png";
import beautifulsoup from "../assets/beautifulsoup.png";

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
      { name: "OpenCV", img: opencv },
      { name: "PyTorch", img: pytorch },
      { name: "BeautifulSoup", img: beautifulsoup },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "PostgreSQL", img: postgres },
      { name: "MongoDB", img: mongodb },
      { name: "MySQL", img: mysql },
      { name: "ChromaDB", img: chromadb },
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
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    useGSAP(() => {
        const section = sectionRef.current;
        const container = containerRef.current;

        const pin = gsap.to(container, {
            x: () => -(container.scrollWidth - window.innerWidth + container.offsetLeft), 
            ease: "none",
            scrollTrigger: {
                trigger: section,
                pin: true,
                scrub: 1,
                start: "top top",
                end: () => `+=${container.scrollWidth}`, // Robust distance
                invalidateOnRefresh: true,
            },
        });

        const skillCards = gsap.utils.toArray(".skill-card");
        skillCards.forEach((card) => {
            gsap.from(card.querySelectorAll(".skill-item"), {
                y: 30,
                opacity: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "left 90%",
                    containerAnimation: pin,
                    toggleActions: "play none none reset"
                }
            });
        });

        return () => pin.kill();
    }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="overflow-hidden bg-[#0a0a0a]" id="skills">
      <div className="flex items-center h-screen">
        <div className="flex items-center px-[10vw]">
          <div className="mr-20 md:mr-40 lg:mr-60 flex-shrink-0">
            <h2 className="text-[clamp(5rem,15vw,20rem)] font-bold tracking-tighter leading-none text-white/5 uppercase select-none">
                Skills
            </h2>
          </div>
          
          {/* Added min-w-max to ensure correct width calculation Status */}
          <div ref={containerRef} className="flex min-w-max gap-[15vw] pr-[30vw] md:pr-[40vw]"> 
            {skillsData.map((skill, index) => (
              <div 
                key={skill.category} 
                className="skill-card relative flex flex-col justify-center min-w-[70vw] md:min-w-[500px] flex-shrink-0 group"
              >
                <div className="flex flex-col gap-6 md:gap-10 mb-12">
                    <span className="text-xl md:text-2xl font-mono text-purple-400/60 uppercase tracking-widest">
                        {`0${index + 1}`}
                    </span>
                    <h3 className="text-5xl md:text-7xl lg:text-9xl font-bold text-white tracking-tighter leading-none whitespace-nowrap">
                        {skill.category}
                    </h3>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-6 md:gap-x-6 md:gap-y-8 max-w-2xl">
                    {skill.items.map((item) => (
                      <div key={item.name} className="skill-item flex items-center gap-4 group/item">
                        <div className="w-10 h-10 md:w-14 md:h-14 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover/item:bg-white/10 group-hover/item:-translate-y-1">
                            <img src={item.img} alt={item.name} className="h-6 w-6 md:h-8 md:w-8 object-contain opacity-60 md:opacity-40 group-hover/item:opacity-100 transition-opacity" /> 
                        </div>
                        <span className="text-sm md:text-lg font-light text-white/40 group-hover/item:text-white transition-colors duration-300">
                            {item.name}
                        </span>
                      </div>
                    ))}
                </div>

                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-600/[0.03] rounded-full blur-[100px] pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;