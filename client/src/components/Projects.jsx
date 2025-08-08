import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import multiai from "../assets/multiai.png";
import langly from "../assets/langly.png";
import realtime_tracker from "../assets/realtime_tracker.png";
import pokedex from "../assets/pokedex.png";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const projectsRef = useRef(null);

  const data = [
    { id: 1, name: "Multi.AI", description: "This is a project demonstrating AI capabilities in a modern web interface, focusing on user interaction and data processing.", image: multiai },
    { id: 2, name: "Langly", description: "A language learning platform with interactive exercises and real-time feedback to enhance user fluency and retention.", image: langly },
    { id: 3, name: "Realtime Tracker", description: "A full-stack application for live tracking, utilizing WebSockets and modern backend technologies for instant updates.", image: realtime_tracker },
    { id: 4, name: "My Pokedex", description: "A classic Pokedex application built to showcase API integration and state management within a client-side framework.", image: pokedex },
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
        paddingTop: -10,
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
        {data.map(({ id, name, description, image }) => (
          <div key={id} className="stack-card border-b border-white/25 overflow-hidden">
            
            <div className="card-header p-8 pb-0">
              <div className="flex items-baseline gap-4">
                <h3 className="text-2xl opacity-80">{id.toString().padStart(2, '0')}</h3>
                <h3 className="text-6xl font-semibold tracking-tighter mix-blend-difference">{name}</h3>
              </div>
            </div>

            <div className="card-body p-8 mb-8 h-[45vh]">
              <div className="flex w-full items-start">

                <div className="w-1/2 pr-10">
                  <p className="text-lg opacity-70 leading-relaxed pt-2">{description}</p>
                </div>

                <div className="w-1/2 p-4">
                  <div className="h-80 rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`${name} project screenshot`}
                      className="h-full w-full object-cover"
                    />
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