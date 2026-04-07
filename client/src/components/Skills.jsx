import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
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
    const triggerRef = useRef(null);
    const sectionRef = useRef(null);

    useGSAP(() => {
        const trigger = triggerRef.current;
        const section = sectionRef.current;

        if (!trigger || !section) return;

        const pin = gsap.fromTo(section, 
            { x: 0 },
            {
                x: () => -(section.offsetWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: trigger,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                    invalidateOnRefresh: true,
                }
            }
        );

        // Individual Animations for cards within the scroll
        const cards = gsap.utils.toArray(".skill-card");
        cards.forEach((card) => {
            const h3 = card.querySelector("h3");
            const items = card.querySelectorAll(".skill-item");

            if (h3) {
                const split = new SplitType(h3, { types: 'chars' });
                gsap.from(split.chars, {
                    y: 20,
                    opacity: 0,
                    stagger: 0.02,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        containerAnimation: pin,
                        start: "left 80%",
                        toggleActions: "restart none none reset",
                    }
                });
            }

            if (items.length > 0) {
                gsap.from(items, {
                    y: 30,
                    opacity: 0,
                    stagger: 0.05,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        containerAnimation: pin,
                        start: "left 80%",
                        toggleActions: "restart none none reset",
                    }
                });
            }
        });

    }, { scope: triggerRef });

    return (
        <section ref={triggerRef} className="relative h-[300vh] bg-[#0a0a0a]" id="skills">
            <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
                <div ref={sectionRef} className="flex h-full items-center px-[10vw] min-w-max">
                    {/* Header */}
                    <div className="mr-8 md:mr-16 lg:mr-24 flex-shrink-0">
                        <h2 className="text-[clamp(5rem,15vw,20rem)] font-black tracking-wide leading-none text-white/5 uppercase select-none">
                            Skills
                        </h2>
                    </div>

                    {/* Cards */}
                    <div className="flex gap-[20vw] pr-[20vw] items-center h-full"> 
                        {skillsData.map((skill, index) => (
                            <div 
                                key={skill.category} 
                                className="skill-card flex flex-col pt-[20vh] w-max h-full"
                            >
                                <div className="mb-12">
                                    <span className="text-2xl md:text-3xl font-mono text-purple-500/50 uppercase tracking-[0.2em] block">
                                        {`0${index + 1}`}
                                    </span>
                                    <h3 className="text-5xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter mt-2 whitespace-nowrap leading-tight pb-4">
                                        {skill.category}
                                    </h3>
                                </div>

                                <div className={`grid gap-x-8 gap-y-10 transition-all duration-500 ${
                                    skill.items.length > 6 
                                    ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 max-w-4xl md:max-w-5xl" 
                                    : "grid-cols-2 sm:grid-cols-3 max-w-2xl"
                                }`}>
                                    {skill.items.map((item) => (
                                        <div key={item.name} className="skill-item flex items-center gap-6 group/item">
                                            <div className="w-10 h-10 md:w-14 md:h-14 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover/item:bg-white/10 group-hover/item:-translate-y-1">
                                                <img src={item.img} alt={item.name} className="h-5 w-5 md:h-7 md:w-7 object-contain opacity-40 group-hover/item:opacity-100 transition-opacity" /> 
                                            </div>
                                            <span className="text-base md:text-xl font-light text-white/30 group-hover/item:text-white transition-colors duration-300">
                                                {item.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Scroll Indicator */}
                <div className="absolute bottom-12 left-[10vw] flex items-center gap-8 opacity-40 hover:opacity-100 transition-opacity duration-500 group">
                    <div className="flex flex-col">
                        <span className="text-[11px] uppercase tracking-[0.5em] text-white/70 font-black">Scroll</span>
                        <span className="text-[9px] uppercase tracking-[0.5em] text-purple-500 font-black">Horizontal</span>
                    </div>
                    <div className="relative w-48 h-[1px] bg-white/10 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite]"></div>
                    </div>
                </div>
            </div>
            
            <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </section>
    );
};

export default Skills;