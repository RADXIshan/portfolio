import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import multiai from "../assets/multiai.png";
import langly from "../assets/langly.png";
import realtime_tracker from "../assets/realtime_tracker.png";
import pokedex from "../assets/pokedex.png";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const projectsRef = useRef(null);

  const data = [
    { id: 1, name: "Multi.AI", description: "An all-in-one AI platform to generate images, remove backgrounds, write content, and review resumes.", image: multiai, link: "https://github.com/RADXIshan/pern-multiai" },
    { id: 2, name: "Langly", description: "A language learning app connecting users from all over the world to learn languages together.", image: langly, link: "https://github.com/RADXIshan/mern-langly" },
    { id: 3, name: "Realtime Tracker", description: "Track movement in real-time with an interactive map, built for live location sharing.", image: realtime_tracker, link: "https://github.com/RADXIshan/Real-Time-Tracker" },
    { id: 4, name: "My Pokedex", description: "A sleek Pokémon explorer to search, filter, and view detailed stats of your favorite Pokémon.", image: pokedex, link: "https://github.com/RADXIshan/My-Pokedex" },
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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".cards-wrapperContainer",
          pin: true,
          scrub: 1,
          start: "top top",
          end: "+=200%",
        },
      });

      tl.to(".stack-card .card-body", {
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
        opacity: 0,
        stagger: 0.5,
      });
      
    }, projectsRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={projectsRef}>

      <div className="projects px-4 sm:px-8 md:px-16 flex justify-center md:justify-end border-b border-white/25" id="projects">

      <h2 className="projects-title text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold mb-7">Projects</h2>
      </div>

      <div className="cards-wrapperContainer h-screen overflow-hidden">
        {data.map(({ id, name, description, image, link }) => (
          <div key={id} className="stack-card px-4 sm:px-8 md:px-12 lg:px-[6rem] border-b border-white/25 overflow-hidden">
            
            <div className="card-header p-4 md:p-8 pb-0">
              <div className="flex items-baseline gap-4">
                
                <h3 className="text-xl sm:text-2xl opacity-80">{id.toString().padStart(2, '0')}</h3>
               
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tighter mix-blend-difference cursor-pointer">{name}</a>
              </div>
            </div>

      
            <div className="card-body p-4 md:p-8 mb-8 h-[65vh] sm:h-[55vh] md:h-[45vh]">
              
              <div className="flex flex-col md:flex-row w-full items-start gap-8 md:gap-0">

                <div className="w-full md:w-1/2 md:pr-10">
                  <p className="text-base md:text-lg opacity-70 leading-relaxed pt-2 mb-8">{description}</p>
                  <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-base md:text-lg p-3 md:p-4 border border-white/25 rounded-full cursor-pointer hover:bg-white/25 hover:opacity-100 opacity-70 transition-all duration-300">
                    <span>View Project</span>
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </div>

                <div className="w-full md:w-1/2 p-0 md:p-4">
                  <div className="h-60 sm:h-72 md:h-80 rounded-lg overflow-hidden">
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
        ))}
      </div>
    </div>
  );
};

export default Projects;