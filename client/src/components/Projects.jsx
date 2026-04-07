import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Github } from "lucide-react";
import SplitType from "split-type";
import syncspace from "../assets/syncspace.png";
import ainews from "../assets/ainews.png";
import mindtrace from "../assets/mindtrace.png";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const containerRef = useRef(null);
    const rightRef = useRef(null);
    const mainTitleRef = useRef(null);
    const introSectionRef = useRef(null);

    const projects = [
        {
            id: 1,
            name: "MindTrace",
            description: "An AI memory assistant for Ray-Ban Meta smart glasses and similar wearables, providing real-time face recognition and context-aware support to navigate social interactions confidently.",
            image: mindtrace,
            githublink: "https://github.com/RADXIshan/mindtrace",
            technologies: ["FastAPI", "OpenCV", "PyTorch", "Gemini 2.5"]
        },
        {
            id: 2,
            name: "AI News",
            description: "An intelligent, automated news aggregation system that scrapes, processes, and curates AI-related content from multiple sources with daily personalized digests.",
            image: ainews,
            githublink: "https://github.com/RADXIshan/AI-News-Aggregator",
            liveLink: "https://ai-news-aggregator-digest.vercel.app",
            technologies: ["Python", "BS4", "Gemini API", "PostgreSQL"]
        },
        {
            id: 3,
            name: "SyncSpace",
            description: "A comprehensive real-time team collaboration platform with video conferencing, messaging, and AI productivity tools built for modern teams.",
            image: syncspace,
            githublink: "https://github.com/RADXIshan/SyncSpace",
            liveLink: "https://syncspace-client.vercel.app",
            technologies: ["Node.js", "Socket.io", "WebRTC", "PostgreSQL"]
        }
    ];

    useGSAP(() => {
        const mm = gsap.matchMedia();

        // 1. Massive Intro Title Reveal
        if (mainTitleRef.current) {
            const split = new SplitType(mainTitleRef.current, { types: 'chars' });
            gsap.from(split.chars, {
                y: 150,
                rotateX: -90,
                opacity: 0,
                stagger: 0.05,
                duration: 1.5,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: introSectionRef.current,
                    start: "top 80%",
                    toggleActions: "restart none none reset"
                }
            });

            gsap.to(mainTitleRef.current, {
                y: -100,
                scale: 0.9,
                opacity: 0.2,
                ease: "none",
                scrollTrigger: {
                    trigger: introSectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        }

        // 2. DESKTOP ANIMATIONS (lg and above)
        mm.add("(min-width: 1024px)", () => {
            const images = gsap.utils.toArray(".sticky-image-item");
            const projectSections = gsap.utils.toArray(".project-full-section");
            
            // Set initial state for images
            gsap.set(images, { clipPath: "inset(100% 0% 0% 0%)", opacity: 1 });
            gsap.set(images[0], { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 });

            projectSections.forEach((section, i) => {
                if (i === 0) return;

                gsap.to(images[i], {
                    clipPath: "inset(0% 0% 0% 0%)",
                    scale: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "top top",
                        scrub: true,
                    }
                });

                gsap.to(images[i-1], {
                    yPercent: -20,
                    opacity: 0.3,
                    filter: "blur(15px)",
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "top top",
                        scrub: true,
                    }
                });
            });

            projectSections.forEach((section) => {
                const content = section.querySelector(".project-content");
                gsap.from(content, {
                    x: -50,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 70%",
                        toggleActions: "restart none none reset",
                    }
                });
            });
        });

        // 3. MOBILE ANIMATIONS (below lg)
        mm.add("(max-width: 1023px)", () => {
            const cards = gsap.utils.toArray(".project-full-section");
            
            cards.forEach((card, i) => {
                const isLast = i === cards.length - 1;
                if (isLast) return;

                // Improved Stacking Timing: lasts through full transition
                gsap.to(card, {
                    scale: 0.85,
                    opacity: 0.2,
                    filter: "blur(12px)",
                    yPercent: -15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: cards[i + 1],
                        start: "top 60%",
                        end: "top top",
                        scrub: true,
                    }
                });
            });

            // Reveal each card's components
            cards.forEach((card) => {
                const content = card.querySelector(".project-content");
                gsap.from(content, {
                    y: 30,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "restart none none reset"
                    }
                });
            });
        });

        return () => mm.revert();
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative w-full bg-[#0a0a0a]" id="projects">
            {/* Massive Full-Width Hero Title */}
            <div ref={introSectionRef} className="h-[70vh] lg:h-screen w-full flex flex-col justify-center items-center px-6 md:px-20 overflow-hidden relative border-b border-white/5">
                <div className="absolute top-12 md:top-20 left-6 md:left-20">
                    <span className="text-sm font-mono text-purple-400 uppercase tracking-[0.5em]">/ Selected Projects</span>
                </div>
                
                <h1 ref={mainTitleRef} className="text-[clamp(4.5rem,18vw,25rem)] font-black tracking-tighter text-white leading-none uppercase select-none text-center">
                    Selected<br/>Work.
                </h1>

                <div className="absolute bottom-12 md:bottom-20 right-6 md:right-20 flex flex-col items-end gap-2 text-right opacity-30">
                    <span className="text-[10px] font-mono text-white uppercase tracking-widest leading-none underline-offset-4 decoration-purple-500 font-bold">2025 — 2026</span>
                    <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest leading-none font-bold">INDIA</span>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row w-full relative">
                {/* Scrollable Sections */}
                <div className="w-full lg:w-1/2 flex flex-col">
                    {projects.map((project, index) => (
                        <div 
                            key={project.id} 
                            className="project-full-section sticky top-0 lg:relative h-screen flex flex-col justify-center px-6 md:px-16 lg:pl-24 lg:pr-12 bg-[#0a0a0a]"
                            style={{ 
                                zIndex: index + 1,
                                top: `${index * 12}px` // Reduced stack offset for tighter feel on mobile
                            }}
                        >
                            {/* Card Glow/Shadow on Mobile */}
                            <div className="absolute inset-x-4 inset-y-12 lg:hidden bg-white/[0.015] border border-white/5 rounded-[4rem] -z-10" />

                            <div className="project-content flex flex-col gap-6 group">
                                <div className="flex items-center gap-3">
                                    <span className="text-xl md:text-3xl font-mono text-purple-500/50 uppercase tracking-[0.2em] font-black">
                                        {`0${index + 1}`}
                                    </span>
                                    <div className="h-[1px] w-12 bg-purple-500/10 group-hover:w-24 transition-all duration-700" />
                                </div>
                                <h3 className="text-4xl md:text-7xl lg:text-9xl font-bold text-white group-hover:text-purple-400 transition-colors duration-500 leading-tight tracking-tighter">
                                    {project.name}
                                </h3>
                                <p className="text-lg md:text-xl text-white/50 leading-relaxed max-w-lg font-light">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-3 mt-4">
                                    {project.technologies.map((tech, i) => (
                                        <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[11px] font-mono text-white/40 tracking-wider hover:text-white transition-colors">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-8 mt-8">
                                    <a href={project.githublink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/40 hover:text-white transition-all duration-300 group/link">
                                        <div className="p-3 bg-white/5 rounded-full group-hover:bg-purple-500/20 transition-colors">
                                            <Github size={20} />
                                        </div>
                                        <span className="text-xs font-mono uppercase tracking-[0.3em] font-black hidden md:block">Source</span>
                                    </a>
                                    {project.liveLink && (
                                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/40 hover:text-white transition-all duration-300 group/link">
                                            <div className="p-3 bg-white/5 rounded-full group-hover:bg-purple-500/20 transition-colors">
                                                <ArrowUpRight size={22} className="group-hover/link:rotate-45 transition-transform duration-500" />
                                            </div>
                                            <span className="text-xs font-mono uppercase tracking-[0.3em] font-black hidden md:block">Live Demo</span>
                                        </a>
                                    )}
                                </div>

                                {/* Mobile Image Display */}
                                <div className="mt-12 lg:hidden w-full aspect-video rounded-[3rem] overflow-hidden border border-white/5 bg-zinc-950/20">
                                    <img 
                                        src={project.image} 
                                        alt={project.name} 
                                        className="w-full h-full object-cover grayscale md:grayscale-0" 
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Side: Sticky Images (Desktop Only) */}
                <div ref={rightRef} className="hidden lg:flex w-1/2 h-screen sticky top-0 items-center justify-center p-24 pl-12 pr-24 pointer-events-none">
                    <div className="relative w-full h-[85%] max-w-2xl rounded-[4rem] overflow-hidden border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.5)] bg-black">
                        {projects.map((project, index) => (
                            <div 
                                key={project.id} 
                                className="sticky-image-item absolute inset-0 w-full h-full will-change-transform"
                                style={{ zIndex: 10 + index }}
                            >
                                <img 
                                    src={project.image} 
                                    alt={project.name} 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;