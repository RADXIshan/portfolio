import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ArrowUpRight, Github } from "lucide-react";
import syncspace from "../assets/syncspace.png";
import ainews from "../assets/ainews.png";
import mindtrace from "../assets/mindtrace.png";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const sectionRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);

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

        mm.add("(min-width: 1024px)", () => {
            // Pin the right side (images)
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom bottom",
                pin: rightRef.current,
                pinSpacing: false,
            });

            // Cross-fade and Parallax Scale images
            const cards = gsap.utils.toArray(".project-text-block");
            const images = gsap.utils.toArray(".sticky-image-item");
            const innerImages = gsap.utils.toArray(".inner-img");

            cards.forEach((card, i) => {
                // Text animation for each card
                gsap.from(card.querySelectorAll("h3, p, .flex-wrap, .flex.gap-6"), {
                    y: 100,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 1.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    }
                });

                if (i === 0) {
                    // Initial parallax for first image
                    gsap.to(innerImages[0], {
                        y: -50,
                        scale: 1.1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            start: "top top",
                            end: "bottom top",
                            scrub: true,
                        }
                    });
                    return;
                }

                // Smooth clipPath + opacity transition
                gsap.fromTo(images[i], 
                    { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
                    { 
                        clipPath: "inset(0% 0% 0% 0%)", 
                        opacity: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 95%",
                            end: "top 15%",
                            scrub: 1,
                        }
                    }
                );

                // Zoom Parallax for current image
                gsap.fromTo(innerImages[i],
                    { scale: 1.4, y: 80 },
                    { 
                        scale: 1, 
                        y: 0,
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 95%",
                            end: "top 15%",
                            scrub: 1,
                        }
                    }
                );
                
                // Exit effect for previous image (soft blur and fade)
                gsap.to(images[i-1], {
                    opacity: 0,
                    filter: "blur(20px)",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 95%",
                        end: "top 15%",
                        scrub: 1,
                    }
                });
            });
        });

        return () => mm.revert();
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative w-full bg-[#0a0a0a]" id="projects">
            <div className="flex flex-col lg:flex-row w-full min-h-screen">
                
                {/* LEFT COLUMN: Scrollable Content */}
                <div ref={leftRef} className="w-full lg:w-1/2 px-8 py-24 md:px-16 lg:pl-24 lg:pr-12 md:py-32">
                    <div className="mb-20 lg:mb-32">
                        <h2 className="text-sm font-mono text-purple-400 uppercase tracking-widest mb-4">/ Projects</h2>
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white">Selected Work.</h1>
                    </div>

                    <div className="projects-list flex flex-col gap-[30vh] lg:gap-[60vh] pb-[20vh]">
                        {projects.map((project, index) => (
                            <div key={project.id} className="project-text-block flex flex-col gap-8 group">
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl font-mono text-white/20">{`0${index + 1}`}</span>
                                    <div className="h-[1px] w-12 bg-white/10 group-hover:w-24 transition-all duration-500" />
                                </div>
                                <h3 className="text-5xl md:text-7xl font-bold text-white group-hover:text-purple-400 transition-colors duration-500">
                                    {project.name}
                                </h3>
                                <p className="text-xl text-white/50 leading-relaxed max-w-md font-light">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {project.technologies.map((tech, i) => (
                                        <span key={i} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs text-white/40">{tech}</span>
                                    ))}
                                </div>
                                <div className="flex gap-6 mt-8">
                                    <a href={project.githublink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-white transition-all duration-300 group/link">
                                        <Github size={24} />
                                        <span className="text-sm font-mono uppercase tracking-widest hidden md:block">Source</span>
                                    </a>
                                    {project.liveLink && (
                                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-white transition-all duration-300 group/link">
                                            <ArrowUpRight size={24} className="group-hover/link:rotate-45 transition-transform duration-300" />
                                            <span className="text-sm font-mono uppercase tracking-widest hidden md:block">Live Demo</span>
                                        </a>
                                    )}
                                </div>
                                
                                {/* MOBILE ONLY IMAGE */}
                                <div className="mt-12 lg:hidden w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/5">
                                    <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT COLUMN: Sticky Images */}
                <div ref={rightRef} className="hidden lg:flex w-1/2 h-screen items-center justify-center pointer-events-none p-24 pl-12 pr-24">
                    <div className="relative w-full h-[80%] max-w-2xl rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-[#111111]">
                        {projects.map((project, index) => (
                            <div 
                                key={project.id} 
                                className={`sticky-image-item absolute inset-0 w-full h-full ${index === 0 ? 'opacity-100' : 'opacity-0'}`}
                            >
                                <img 
                                    src={project.image} 
                                    alt={project.name} 
                                    className="inner-img w-full h-full object-cover transition-all duration-300"
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