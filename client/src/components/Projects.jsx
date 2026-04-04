import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ArrowUpRight, Github } from "lucide-react";
import SplitType from "split-type";
import syncspace from "../assets/syncspace.png";
import ainews from "../assets/ainews.png";
import mindtrace from "../assets/mindtrace.png";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const sectionRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const titleRef = useRef(null);

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

        // Section Title Reveal
        if (titleRef.current) {
            const split = new SplitType(titleRef.current, { types: 'chars' });
            gsap.from(split.chars, {
                y: 100,
                rotateX: -90,
                opacity: 0,
                stagger: 0.02,
                duration: 1.5,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 90%",
                    toggleActions: "play none none reset"
                }
            });
        }

        // DESKTOP: Unified pinned timeline for perfect transitions
        mm.add("(min-width: 1024px)", () => {
            const cards = gsap.utils.toArray(".project-text-block");
            const images = gsap.utils.toArray(".sticky-image-item");
            const innerImages = gsap.utils.toArray(".inner-img");

            // Create a main timeline pinned to the section
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 2.5, // Ultra-silky momentum
                    pin: rightRef.current,
                    pinSpacing: false,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                }
            });

            // Set initial z-indices
            images.forEach((img, i) => {
                gsap.set(img, { zIndex: 10 + i });
            });

            // Transition 1 -> 2 (MindTrace -> AI News)
            // Progressive atmospheric reveal over a 40% window
            tl.to(images[0], {
                filter: "blur(40px) brightness(0.3) grayscale(1)",
                scale: 1.6,
                opacity: 0.5,
                ease: "power3.inOut",
                force3D: true,
                duration: 5
            }, 2); // Starts at "time" 2

            tl.fromTo(images[1], 
                { opacity: 0, scale: 1.5, filter: "blur(30px) brightness(0) grayscale(1)" },
                { 
                    opacity: 1, 
                    scale: 1, 
                    filter: "blur(0px) brightness(1) grayscale(0)",
                    ease: "expo.out", 
                    force3D: true,
                    duration: 6 
                },
                3 // Slight delay for the entrance to feel more natural
            );

            tl.fromTo(innerImages[1],
                { scale: 1.5, y: 150 },
                { scale: 1, y: 0, ease: "expo.out", force3D: true, duration: 6 },
                3
            );

            // Transition 2 -> 3 (AI News -> SyncSpace)
            tl.to(images[1], {
                filter: "blur(40px) brightness(0.3) grayscale(1)",
                scale: 1.6,
                opacity: 0.5,
                ease: "power3.inOut",
                force3D: true,
                duration: 5
            }, 12); // Starts at "time" 12

            tl.fromTo(images[2], 
                { opacity: 0, scale: 1.5, filter: "blur(30px) brightness(0) grayscale(1)" },
                { 
                    opacity: 1, 
                    scale: 1, 
                    filter: "blur(0px) brightness(1) grayscale(0)",
                    ease: "expo.out", 
                    force3D: true,
                    duration: 6
                },
                13
            );

            tl.fromTo(innerImages[2],
                { scale: 1.5, y: 150 },
                { scale: 1, y: 0, ease: "expo.out", force3D: true, duration: 6 },
                13
            );

            // First project initial parallax
            tl.to(innerImages[0], {
                y: -150,
                scale: 1.3,
                ease: "power2.out",
                force3D: true,
                duration: 4
            }, 0);
        });

        // MOBILE: Card stacking effect
        mm.add("(max-width: 1023px)", () => {
            const cards = gsap.utils.toArray(".project-card");
            cards.forEach((card, i) => {
                if (i === cards.length - 1) return;
                
                gsap.to(card, {
                    scale: 0.9,
                    opacity: 0.5,
                    filter: "blur(4px)",
                    scrollTrigger: {
                        trigger: cards[i + 1],
                        start: "top 95%",
                        end: "top 30%",
                        scrub: true,
                    }
                });
            });
        });

        // Project Name Reveal (SplitType)
        const projectNames = gsap.utils.toArray(".project-name");
        projectNames.forEach((name) => {
            const split = new SplitType(name, { types: 'chars' });
            gsap.from(split.chars, {
                y: 30,
                opacity: 0,
                stagger: 0.02,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: name,
                    start: "top 90%",
                    toggleActions: "play none none reset"
                }
            });
        });

        // Text reveal for other blocks
        const textBlocks = gsap.utils.toArray(".project-text-block");
        textBlocks.forEach((block) => {
            gsap.from(block.querySelectorAll("p, .flex-wrap, .flex.gap-6"), {
                y: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: block,
                    start: "top 90%",
                    toggleActions: "play none none reset"
                }
            });
        });

        return () => mm.revert();
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative w-full bg-[#0a0a0a]" id="projects">
            <div className="flex flex-col lg:flex-row w-full min-h-screen">
                
                <div ref={leftRef} className="w-full lg:w-1/2 px-6 py-24 md:px-16 lg:pl-24 lg:pr-12 md:py-32">
                    <div className="mb-20 lg:mb-32 overflow-hidden">
                        <h2 className="text-sm font-mono text-purple-400 uppercase tracking-widest mb-4">/ Projects</h2>
                        <h1 ref={titleRef} className="text-6xl md:text-8xl font-bold tracking-tighter text-white py-2">Selected <br /> Work.</h1>
                    </div>

                    <div className="projects-list flex flex-col gap-[80vh] lg:gap-[60vh] pb-[40vh] md:pb-[30vh] lg:pb-[20vh]">
                        {projects.map((project, index) => (
                            <div 
                                key={project.id} 
                                className="project-card sticky top-[8vh] w-full bg-[#111111] border border-white/5 rounded-[2rem] p-6 md:p-12 shadow-2xl transition-all duration-500 hover:border-purple-500/20 lg:static lg:bg-transparent lg:border-none lg:p-0 lg:rounded-none lg:shadow-none lg:top-auto"
                                style={{ top: `calc(8vh + ${index * 15}px)`, zIndex: index + 1 }}
                            >
                                <div className="project-text-block flex flex-col gap-6 group">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl font-mono text-white/20">{`0${index + 1}`}</span>
                                        <div className="h-[1px] w-10 bg-white/10 group-hover:w-20 transition-all duration-500" />
                                    </div>
                                    <h3 className="project-name text-4xl md:text-7xl font-bold text-white group-hover:text-purple-400 transition-colors duration-500 overflow-hidden py-2 whitespace-nowrap">
                                        {project.name}
                                    </h3>
                                    <p className="text-lg text-white/50 leading-snug max-w-md font-light">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {project.technologies.map((tech, i) => (
                                            <span key={i} className="px-2 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] text-white/40">{tech}</span>
                                        ))}
                                    </div>
                                    <div className="flex gap-6 mt-4">
                                        <a href={project.githublink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-white transition-all duration-300 group/link">
                                            <Github size={20} />
                                            <span className="text-xs font-mono uppercase tracking-widest hidden md:block">Source</span>
                                        </a>
                                        {project.liveLink && (
                                            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-white transition-all duration-300 group/link">
                                                <ArrowUpRight size={20} className="group-hover/link:rotate-45 transition-transform duration-300" />
                                                <span className="text-xs font-mono uppercase tracking-widest hidden md:block">Live Demo</span>
                                            </a>
                                        )}
                                    </div>
                                    
                                    <div className="mt-8 lg:hidden w-full aspect-video rounded-xl overflow-hidden border border-white/5 bg-zinc-900/50">
                                        <img 
                                            src={project.image} 
                                            alt={project.name} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                            onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/800x450/1a1a1a/FFFFFF?text=${project.name}`; }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div ref={rightRef} className="hidden lg:flex w-1/2 h-screen items-center justify-center pointer-events-none p-24 pl-12 pr-24">
                    <div className="relative w-full h-[80%] max-w-2xl rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a]">
                        {projects.map((project, index) => (
                            <div 
                                key={project.id} 
                                className={`sticky-image-item absolute inset-0 w-full h-full will-change-[transform,filter] ${index === 0 ? 'opacity-100' : 'opacity-0'}`}
                                style={{ zIndex: 10 + index }}
                            >
                                <img 
                                    src={project.image} 
                                    alt={project.name} 
                                    className="inner-img w-full h-full object-cover transition-all duration-300 will-change-transform"
                                    onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/800x1200/1a1a1a/FFFFFF?text=${project.name}`; }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;