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
    { id: 1, name: "Multi.AI", description: "All-in-One AI Platform – Generate images, remove backgrounds, write content, and review resumes.", image: multiai, link: "https://github.com/RADXIshan/pern-multiai" },
    { id: 2, name: "Langly", description: "Language Learning App – Connecting users from all over the world to learn languages together.", image: langly, link: "https://github.com/RADXIshan/mern-langly" },
    { id: 3, name: "Realtime Tracker", description: "Live Location Tracking – Track movement in real time with an interactive map.", image: realtime_tracker, link: "https://github.com/RADXIshan/Real-Time-Tracker" },
    { id: 4, name: "My Pokedex", description: "Pokémon Explorer – Search, filter, and view Pokémon stats with a sleek UI.", image: pokedex, link: "https://github.com/RADXIshan/My-Pokedex" },
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
        paddingTop: 0, // Changed from -10 to 0 for a smoother collapse
        paddingBottom: 0,
        opacity: 0,
        stagger: 0.5,
      });
      
    }, projectsRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={projectsRef}>
      <div className="projects px-16 flex justify-end border-b border-white/25" id="projects">
        <h2 className="projects-title text-[15vw] font-bold">Projects</h2>
      </div>

      <div className="cards-wrapperContainer h-screen overflow-hidden">
        {data.map(({ id, name, description, image, link }) => (
          <div key={id} className="stack-card px-[6rem] border-b border-white/25 overflow-hidden">
            
            <div className="card-header p-8 pb-0">
              <div className="flex items-baseline gap-4">
                <h3 className="text-2xl opacity-80">{id.toString().padStart(2, '0')}</h3>
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-6xl font-semibold tracking-tighter mix-blend-difference cursor-pointer">{name}</a>
              </div>
            </div>

            <div className="card-body p-8 mb-8 h-[45vh]">
              <div className="flex w-full items-start">

                <div className="w-1/2 pr-10">
                  <p className="text-lg opacity-70 leading-relaxed pt-2 mb-8">{description}</p>
                  {/* --- FIX IS HERE --- */}
                  <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-lg p-4 border border-white/25 rounded-full cursor-pointer hover:bg-white/25 hover:opacity-100 opacity-70 transition-all duration-300">
                    <span>View Project</span>
                    <ArrowRight className="h-5 w-5" />
                  </a>
                  {/* --- END FIX --- */}
                </div>

                <div className="w-1/2 p-4">
                  <div className="h-80 rounded-lg overflow-hidden">
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      <img
                        src={image}
                        alt={`${name} project screenshot`}
                        className="h-full w-full object-cover transition-all duration-300 hover:scale-105" // Changed hover effect for better UX
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