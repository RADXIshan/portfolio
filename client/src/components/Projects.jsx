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
        // 1. Initial State
        const images = gsap.utils.toArray(".sticky-image-item");
        gsap.set(images, { 
            clipPath: "inset(100% 0% 0% 0%)",
            opacity: 1 
        });
        gsap.set(images[0], { 
            clipPath: "inset(0% 0% 0% 0%)", 
            opacity: 1 
        });

        // 2. STICKY IMAGES TRANSITION
        // We trigger based on each project-section's entrance
        const projectSections = gsap.utils.toArray(".project-full-section");
        
        projectSections.forEach((section, i) => {
            if (i === 0) return; // First image is already visible

            // Reveal current image (Slide up effect)
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

            // Subtle parallax/hide for previous image
            gsap.to(images[i-1], {
                yPercent: -20,
                opacity: 0.5,
                filter: "blur(10px)",
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "top top",
                    scrub: true,
                }
            });
        });

        // 3. Text Reveal for each section
        projectSections.forEach((section) => {
            const content = section.querySelector(".project-content");
            gsap.from(content, {
                y: 100,
                opacity: 0,
                duration: 1.2,
                splitType: "chars",
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 60%",
                    toggleActions: "play none none reverse",
                }
            });
        });

        // 4. Main Title Reveal
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
                    toggleActions: "play none none reverse"
                }
            });
        }

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative w-full bg-[#0a0a0a]" id="projects">
            <div className="flex flex-col lg:flex-row w-full">
                
                {/* Left Side: Full-Height Sections */}
                <div className="w-full lg:w-1/2 flex flex-col">
                    <div className="h-screen flex flex-col justify-center px-6 md:px-16 lg:pl-24 lg:pr-12">
                        <div className="overflow-hidden">
                            <h2 className="text-sm font-mono text-purple-400 uppercase tracking-widest mb-4">/ Projects</h2>
                            <h1 ref={titleRef} className="text-6xl md:text-8xl font-bold tracking-tighter text-white py-2">Selected <br /> Work.</h1>
                        </div>
                    </div>

                    {projects.map((project, index) => (
                        <div 
                            key={project.id} 
                            className="project-full-section relative h-screen flex flex-col justify-center px-6 md:px-16 lg:pl-24 lg:pr-12"
                        >
                            <div className="project-content flex flex-col gap-6 group">
                                <div className="flex items-center gap-3">
                                    <span className="text-xl font-mono text-purple-500/50">{`0${index + 1}`}</span>
                                    <div className="h-[1px] w-10 bg-white/10 group-hover:w-20 transition-all duration-500" />
                                </div>
                                <h3 className="text-4xl md:text-7xl font-bold text-white group-hover:text-purple-400 transition-colors duration-500 py-2">
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

                                {/* Mobile Image */}
                                <div className="mt-8 lg:hidden w-full aspect-video rounded-xl overflow-hidden border border-white/5 bg-zinc-900/50">
                                    <img 
                                        src={project.image} 
                                        alt={project.name} 
                                        className="w-full h-full object-cover" 
                                        onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/800x450/1a1a1a/FFFFFF?text=${project.name}`; }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Side: Sticky Images (Slide-Up Stacking) */}
                <div ref={rightRef} className="hidden lg:flex w-1/2 h-screen sticky top-0 items-center justify-center p-24 pl-12 pr-24 pointer-events-none">
                    <div className="relative w-full h-[80%] max-w-2xl rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a]">
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
                                    onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/800x1200/1a1a1a/FFFFFF?text=${project.name}`; }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;