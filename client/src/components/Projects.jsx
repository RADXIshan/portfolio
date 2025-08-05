import {useGSAP} from '@gsap/react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

const Projects = () => {

  const data = [
    {
      id: 1,
      name: "Multi.AI",
      description: "This is a project",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 2,
      name: "Project 2",
      description: "This is a project",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 3,
      name: "Project 3",
      description: "This is a project",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 4,
      name: "Project 4",
      description: "This is a project",
      image: "https://picsum.photos/200/300",
    },
  ]

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".cards-wrapperContainer",
        start: "top 10%",
        end: "bottom 10%",
        pin: true,
        scrub: 1,
        ease: "linear",
      }
    });

    tl.to(".stack-card", {
      height: 140,
      stagger: 0.5,
    })
  })

  return (
    <>
      <div className="projects px-16 flex flex-end justify-end mb-10 border-b border-white/25" id="projects">
        <h2 className="text-[15vw] font-bold flex-end">Projects</h2>
      </div>
      <div className="cards-wrapperContainer max-h-screen px-10 py-0 overflow-hidden mb-0">
        {data.map((card) => {
          return(
            <div className="stack-card p-4 border-b border-white/25 overflow-hidden">
              <div className="flex gap-4 items-center h-32">
                <h3 className="text-2xl -translate-y-4 opacity-80">{card.id}</h3>
                <h3 className="text-6xl font-semibold">{card.name}</h3>
              </div>

              <div className="flex items-center justify-between">
                <p className="w-[450px] opacity-70">{card.description}</p>
                <div className="w-56 h-56">
                  <img src={card.image} alt="card-image" className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Projects