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
    category: "Tools & Tech",
    items: [
      { name: "Git", img: git },
      { name: "GitHub", img: github },
      { name: "Tailwind", img: tailwind },
      { name: "GSAP", img: gsapImg },
      { name: "REST API", img: restapi },
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
  const wrapperRef      = useRef(null); // full section scope
  const triggerRef      = useRef(null); // the tall scroll-pinned div
  const sectionRef      = useRef(null); // inner horizontal content
  const indicatorRef    = useRef(null);
  const introSectionRef = useRef(null);
  const mainTitleRef    = useRef(null);

  useGSAP(() => {
    const trigger = triggerRef.current;
    const section = sectionRef.current;
    if (!trigger || !section) return;

    const splits = [];
    let isCleanedUp = false;

    const initAnimations = () => {
      if (isCleanedUp) return;

      const isMobile = window.innerWidth < 768;

      // ── "Tech Stack." intro title ──────────────────────────────────────────
      if (mainTitleRef.current) {
        // Desktop & Mobile: SplitType char reveal
        const splitIntro = new SplitType(mainTitleRef.current, { types: "chars" });
        splits.push(splitIntro);
        
        gsap.fromTo(splitIntro.chars, {
          y: isMobile ? 80 : 150,
          rotateX: isMobile ? -45 : -90,
          opacity: 0,
        }, {
          y: 0,
          rotateX: 0,
          opacity: 1,
          stagger: isMobile ? 0.03 : 0.05,
          duration: isMobile ? 1.0 : 1.5,
          ease: "power4.out",
          force3D: true,
          scrollTrigger: {
            trigger: mainTitleRef.current,
            start: isMobile ? "top 85%" : "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        // Scrub exit — only on desktop
        if (!isMobile) {
          gsap.to(mainTitleRef.current, {
            y: -100,
            scale: 0.9,
            opacity: 0,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: introSectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      }

      // ── Horizontal scroll (ALL screen sizes) ──────────────────────────────
      const pin = gsap.fromTo(
        section,
        { x: 0 },
        {
          x: () => -(section.offsetWidth - window.innerWidth),
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: trigger,
            start: "top top",
            end: "bottom bottom",
            scrub: isMobile ? 0.8 : 1, // smooth momentum on mobile, smoothed on desktop
            invalidateOnRefresh: true,
          },
        }
      );

      // ── Card header + item reveal (scoped to containerAnimation) ──────────
      const cards = gsap.utils.toArray(".skill-card");
      cards.forEach((card) => {
        const h3    = card.querySelector("h3");
        const items = card.querySelectorAll(".skill-item");

        if (h3) {
          // Desktop & Mobile: SplitType chars
          const splitCard = new SplitType(h3, { types: "chars" });
          splits.push(splitCard);
          
          gsap.fromTo(splitCard.chars, {
            y: 20,
            opacity: 0,
          }, {
            y: 0,
            opacity: 1,
            stagger: 0.02,
            duration: 0.8,
            ease: "power2.out",
            force3D: true,
            scrollTrigger: {
              trigger: card,
              containerAnimation: pin,
              start: isMobile ? "left 95%" : "left 80%",
              toggleActions: "play none none reverse",
            },
          });
        }

        if (items.length > 0) {
          gsap.fromTo(
            items,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.04,
              duration: 0.7,
              ease: "power3.out",
              force3D: true,
              scrollTrigger: {
                trigger: card,
                containerAnimation: pin,
                start: isMobile ? "left 95%" : "left 90%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      // ── Scroll indicator ───────────────────────────────────────────────────
      if (indicatorRef.current) {
        gsap.fromTo(
          indicatorRef.current,
          { opacity: 0, x: -20 },
          {
            opacity: 0.4,
            x: 0,
            force3D: true,
            scrollTrigger: {
              trigger: trigger,
              start: "top center",
              end: "top top",
              scrub: true,
            },
          }
        );
        gsap.to(indicatorRef.current, {
          opacity: 0,
          x: -20,
          force3D: true,
          scrollTrigger: {
            trigger: trigger,
            start: "bottom 30%",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      ScrollTrigger.refresh();
    };

    if (document.fonts) {
      document.fonts.ready.then(initAnimations);
    } else {
      initAnimations();
    }

    return () => {
      isCleanedUp = true;
      splits.forEach((s) => s.revert());
    };
  }, { scope: wrapperRef, dependencies: [] });

  return (
    <section ref={wrapperRef} className="relative bg-[#0a0a0a]" id="skills">

      {/* ── Intro screen ──────────────────────────────────────────────────── */}
      <div
        ref={introSectionRef}
        className="h-screen w-full flex flex-col px-6 md:px-20 overflow-hidden relative border-b border-white/5"
      >
        <div className="pt-12 md:pt-20 flex-shrink-0">
          <span className="text-[10px] md:text-sm font-mono text-purple-400 uppercase tracking-[0.5em]">
            / Skills
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center">
          <h1
            ref={mainTitleRef}
            className="text-[clamp(4rem,18vw,25rem)] font-black tracking-tighter text-white leading-[0.9] uppercase select-none text-center flex flex-col items-center"
          >
            <span className="whitespace-nowrap">Tech</span>
            <span className="whitespace-nowrap">Stack.</span>
          </h1>
        </div>

        <div className="pb-10 md:pb-20 flex flex-col items-end gap-2 text-right opacity-30 flex-shrink-0">
          <span className="text-[10px] font-mono text-white uppercase tracking-widest leading-none font-bold">
            CORE — TOOLS
          </span>
          <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest leading-none font-bold">
            FRONTEND — BACKEND — AI/ML
          </span>
        </div>
      </div>

      {/* ── Horizontal scroll (all screen sizes) ──────────────────────────── */}
      {/*
        h-[280vh] on mobile gives a tighter and more comfortable scroll distance
        than h-[400vh] to avoid scrolling too far past content.
        On desktop h-[300vh] is enough.
      */}
      <div ref={triggerRef} className="relative h-[280vh] md:h-[300vh]">
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          <div
            ref={sectionRef}
            className="flex h-full items-center min-w-max"
            style={{ paddingLeft: "clamp(1.5rem, 8vw, 25vw)", paddingRight: "clamp(1.5rem, 8vw, 15vw)" }}
          >
            <div
              className="flex items-center h-full"
              style={{ gap: "clamp(2rem, 8vw, 15vw)" }}
            >
              {skillsData.map((skill, index) => (
                <div
                  key={skill.category}
                  className="skill-card flex flex-col justify-start h-full"
                  style={{ paddingTop: "clamp(12vh, 14vh, 16vh)" }}
                >
                  {/* Category label + heading */}
                  <div className="flex items-baseline gap-3 md:gap-6 mb-6 md:mb-12 flex-nowrap">
                    <span className="text-xl sm:text-2xl md:text-5xl lg:text-6xl font-mono text-purple-500/50 uppercase tracking-[0.2em]">
                      {`0${index + 1}`}
                    </span>
                    <h3 className="text-3xl sm:text-5xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter whitespace-nowrap leading-none pb-2 md:pb-4">
                      {skill.category}
                    </h3>
                  </div>

                  {/* Skill items grid */}
                  <div
                    className={`grid ${
                      skill.items.length > 6
                        ? "grid-cols-3 sm:grid-cols-3 lg:grid-cols-4"
                        : "grid-cols-2 sm:grid-cols-3"
                    }`}
                    style={{ gap: "clamp(0.9rem, 2.5vw, 2rem)" }}
                  >
                    {skill.items.map((item) => (
                      <div
                        key={item.name}
                        className="skill-item flex items-center gap-3 sm:gap-3.5 md:gap-4 group/item"
                      >
                        <div
                          className={`${
                            item.name === "BeautifulSoup"
                              ? "flex-none p-1"
                              : "p-2 md:p-3"
                          } bg-white/[0.05] border border-white/10 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-500 group-hover/item:bg-white/10 group-hover/item:-translate-y-1 overflow-hidden flex-shrink-0`}
                          style={{
                            width:  "clamp(3.0rem, 6vw, 4.5rem)",
                            height: "clamp(3.0rem, 6vw, 4.5rem)",
                          }}
                        >
                          <img
                            src={item.img}
                            alt={item.name}
                            className="object-contain opacity-80 group-hover/item:opacity-100 transition-opacity h-full w-full"
                          />
                        </div>
                        <span
                          className="font-light text-white/60 group-hover/item:text-white transition-colors duration-300 whitespace-nowrap"
                          style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.25rem)" }}
                        >
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator — visible on all screen sizes */}
          <div
            ref={indicatorRef}
            className="flex absolute bottom-8 md:bottom-12 items-center gap-4 md:gap-8 opacity-40 hover:opacity-100 transition-opacity duration-500"
            style={{ left: "clamp(1.5rem, 8vw, 25vw)" }}
          >
            <div className="flex flex-col">
              <span className="text-[9px] md:text-[11px] uppercase tracking-[0.3em] md:tracking-[0.5em] text-white/70 font-black leading-tight">Keep</span>
              <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] md:tracking-[0.5em] text-purple-500 font-black leading-tight">Scrolling</span>
            </div>
            <div className="relative w-24 sm:w-36 md:w-48 h-[1px] bg-white/10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite]" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default Skills;