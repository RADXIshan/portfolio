import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ArrowRight, ExternalLink } from "lucide-react";
import syncspace from "../assets/syncspace.png";
import ainews from "../assets/ainews.png";
import echelon from "../assets/echelon.png";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const projectsRef = useRef(null);

  const projects = [
    {
      id: 1,
      name: "SyncSpace",
      description: "A comprehensive real-time team collaboration platform with video conferencing, messaging, polls, voice messages, AI assistance, and advanced productivity tools.",
      image: syncspace,
      githublink: "https://github.com/RADXIshan/SyncSpace",
      liveLink: "https://syncspace-client.vercel.app",
      technologies: ["React.js", "Node.js", "Express.js", "Socket.io", "WebRTC", "Tailwind CSS", "PostgreSQL", "Gemini API", "GMAIL SMTP"]
    },
    {
      id: 2,
      name: "AI News Aggregator",
      description: "An intelligent, automated news aggregation system that scrapes, processes, and curates AI-related content from multiple sources, then delivers personalized daily digests via email.",
      image: ainews,
      githublink: "https://github.com/RADXIshan/AI-News-Aggregator",
      liveLink: "https://ai-news-aggregator-digest.vercel.app",
      technologies: ["React.js", "Python", "FastAPI", "BeautifulSoup", "Gemini API", "PostgreSQL", "Tailwind CSS", "GMAIL SMTP"]
    },
    {
      id: 3,
      name: "Echelon",
      description: "A modern, full-stack RAG (Retrieval-Augmented Generation) chatbot that indexes websites and answers questions based on the indexed content.",
      image: echelon,
      githublink: "https://github.com/RADXIshan/Echelon",
      liveLink: "https://ragchatbot-client.vercel.app",
      technologies: ["React.js", "FastAPI", "LangChain", "Qdrant", "Tailwind CSS"]
    },
  ];

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(".projects-title", {
        scrollTrigger: {
          trigger: ".projects",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        duration: 1,
        y: 100,
        opacity: 0,
        ease: "power3.out",
      });

      const cards = gsap.utils.toArray(".stack-card");

      cards.forEach((card, index) => {
        if (index === cards.length - 1) return;

        const nextCard = cards[index + 1];

        gsap.to(card, {
          scale: 0.9,
          opacity: 0.5,
          filter: "blur(5px)",
          ease: "none",
          scrollTrigger: {
            trigger: nextCard,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, projectsRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={projectsRef} className="projects-container relative w-full">
      <div className="projects px-8 sm:px-8 md:px-16 flex justify-center md:justify-end border-b border-white/10 pb-10 mb-10" id="projects">
        <h2 className="projects-title text-[12vw] font-bold mb-7 text-white/90">Projects</h2>
      </div>

      <div className="cards-wrapperContainer relative flex flex-col items-center w-full">
        {projects.map(({ id, name, description, image, githublink, liveLink, technologies }, index) => (
          <div 
            key={id} 
            className="stack-card sticky top-0 w-full min-h-screen flex flex-col justify-center py-10"
            style={{ zIndex: index + 1 }}
          >
            <div className="w-[95%] md:w-[90%] mx-auto bg-[#1a1a1a] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
              <div className="card-header p-6 md:p-12 pb-0 flex justify-between items-start">
                <div className="flex items-baseline gap-4">
                  <h3 className="text-xl sm:text-2xl opacity-50 font-mono">{id.toString().padStart(2, '0')}</h3>
                  <a href={githublink} target="_blank" rel="noopener noreferrer" className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tighter hover:text-purple-400 transition-colors duration-300">{name}</a>
                </div>
                <div className="hidden md:flex items-center gap-3">
                  <a href={liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 group">
                    <span className="text-sm font-medium uppercase tracking-wider">Live Link</span>
                    <ExternalLink className="h-4 w-4 transform rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </a>
                  <a href={githublink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 group">
                    <span className="text-sm font-medium uppercase tracking-wider">View Github</span>
                    <ArrowRight className="h-4 w-4 transform group-hover:-rotate-45 transition-transform duration-300" />
                  </a>
                </div>
              </div>

              <div className="card-body p-6 md:p-12">
                <div className="flex flex-col lg:flex-row w-full items-start gap-12">
                  <div className="w-full lg:w-1/3">
                    <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light">{description}</p>
                    
                    <div className="mt-8 flex flex-wrap gap-3">
                       {technologies.map((tech, i) => (
                         <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/50 border border-white/5">{tech}</span>
                       ))}
                    </div>

                    <div className="md:hidden mt-8 flex flex-col gap-3">
                      <a href={liveLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 group">
                        <span className="text-sm font-medium uppercase tracking-wider">Live Link</span>
                        <ExternalLink className="h-4 w-4 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                      </a>
                      <a href={githublink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 group">
                        <span className="text-sm font-medium uppercase tracking-wider">View Github</span>
                        <ArrowRight className="h-4 w-4 transform group-hover:-rotate-45 transition-transform duration-300" />
                      </a>
                    </div>
                  </div>

                  <div className="w-full lg:w-2/3">
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                      <a href={liveLink} target="_blank" rel="noopener noreferrer">
                        <img
                          src={image}
                          alt={`${name} project screenshot`}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/600x400/1a1a1a/FFFFFF?text=${name}`; }}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;