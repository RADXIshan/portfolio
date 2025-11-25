import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ArrowRight } from "lucide-react";
import syncspace from "../assets/syncspace.png";
import ainews from "../assets/ainews.png";
import echelon from "../assets/echelon.png";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const projectsRef = useRef(null);

  const data = [
    { id: 1, name: "SyncSpace", description: "A comprehensive real-time team collaboration platform with video conferencing, messaging, polls, voice messages, AI assistance, and advanced productivity tools.", image: syncspace, link: "https://github.com/RADXIshan/SyncSpace" },
    { id: 2, name: "AI News Aggregator", description: "An intelligent, automated news aggregation system that scrapes, processes, and curates AI-related content from multiple sources, then delivers personalized daily digests via email.", image: ainews, link: "https://github.com/RADXIshan/AI-News-Aggregator" },
    { id: 3, name: "Echelon", description: "A modern, full-stack RAG (Retrieval-Augmented Generation) chatbot that indexes websites and answers questions based on the indexed content.", image: echelon, link: "https://github.com/RADXIshan/Echelon" },
  ];

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(".projects-title", {
        scrollTrigger: {
          trigger: ".projects",
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
        duration: 0.8,
        y: 100,
        opacity: 0,
        ease: "power2.out",
      });

      const cards = gsap.utils.toArray(".stack-card");

      cards.forEach((card, index) => {
        if (index === cards.length - 1) return;

        const nextCard = cards[index + 1];

        gsap.to(card, {
          scale: 0.9,
          opacity: 0,
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
    <div ref={projectsRef} className="projects-container relative">
      <div className="projects px-4 sm:px-8 md:px-16 flex justify-center md:justify-end border-b border-white/25 pb-10" id="projects">
        <h2 className="projects-title text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold mb-7">Projects</h2>
      </div>

      <div className="cards-wrapperContainer relative flex flex-col">
        {data.map(({ id, name, description, image, link }, index) => (
          <div 
            key={id} 
            className="stack-card sticky top-0 w-full min-h-screen bg-[#131313] border-t border-white/25 flex flex-col justify-center"
            style={{ zIndex: index + 1 }}
          >
            <div className="px-4 sm:px-8 md:px-12 lg:px-[6rem] overflow-hidden">
              <div className="card-header p-4 md:p-8 pb-0">
                <div className="flex items-baseline gap-4">
                  <h3 className="text-xl sm:text-2xl opacity-80">{id.toString().padStart(2, '0')}</h3>
                  <a href={link} target="_blank" rel="noopener noreferrer" className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tighter mix-blend-difference cursor-pointer hover:opacity-80 transition-opacity">{name}</a>
                </div>
              </div>

              <div className="card-body p-4 md:p-8 mb-8">
                <div className="flex flex-col md:flex-row w-full items-start gap-8 md:gap-0">
                  <div className="w-full md:w-1/2 md:pr-10">
                    <p className="text-base md:text-lg opacity-70 leading-relaxed pt-2 mb-8">{description}</p>
                    <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-base md:text-lg p-3 md:p-4 border border-white/25 rounded-full cursor-pointer hover:bg-white/25 hover:opacity-100 opacity-70 transition-all duration-300">
                      <span>View Project</span>
                      <ArrowRight className="h-5 w-5" />
                    </a>
                  </div>

                  <div className="w-full md:w-1/2 p-0 md:p-4">
                    <div className="h-60 sm:h-72 md:h-80 rounded-lg overflow-hidden border border-white/10">
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        <img
                          src={image}
                          alt={`${name} project screenshot`}
                          className="h-full w-full object-cover transition-all duration-300 hover:scale-105"
                          onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/600x400/131313/FFFFFF?text=${name}`; }}
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