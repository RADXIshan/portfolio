import aboutImage from "../assets/ishan.jpg";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 70%",
        end: "bottom 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      imageRef.current,
      { clipPath: "polygon(0 0, 0 100%, 0 100%, 0 0)", scale: 1.2 },
      { clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0)", scale: 1, duration: 1.5, ease: "power4.out" }
    )
    .fromTo(
      ".about-text-item", 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" },
      "-=1"
    );

  }, { scope: aboutRef });

  return (
    <div
      id="about"
      ref={aboutRef}
      className="relative w-full min-h-screen flex flex-col lg:flex-row items-center justify-center px-8 py-20 sm:px-12 md:px-20 lg:px-[5vw] gap-12 lg:gap-24 overflow-hidden"
    >
      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
        <div className="relative w-full max-w-md aspect-[3/4] overflow-hidden rounded-2xl">
           <div ref={imageRef} className="w-full h-full relative group cursor-crosshair">
             {/* Easter Egg Code */}
             <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center p-8 overflow-hidden">
                <pre className="text-green-500/80 font-mono text-sm sm:text-base leading-relaxed">
                  {`const ishan = {
  role: "Developer",
  passion: "Building",
  skills: [
    "React", 
    "Node", 
    "Express", 
    "FastAPI", 
    "Python", 
    "JavaScript", 
    "AI"
  ],
  status: "Ready"
};`}
                </pre>
             </div>

            <img
                src={aboutImage}
                alt="Ishan Roy"
                className="relative z-10 w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x800/131313/FFFFFF?text=Ishan'; }}
            />
           </div>
           {/* Decorative Elements */}
           <div className="absolute -bottom-6 -left-6 w-24 h-24 border-l-2 border-b-2 border-white/20 hidden md:block"></div>
           <div className="absolute -top-6 -right-6 w-24 h-24 border-r-2 border-t-2 border-white/20 hidden md:block"></div>
        </div>
      </div>

      {/* Text Section */}
      <div ref={textRef} className="w-full lg:w-1/2 flex flex-col items-start gap-8">
        <div className="overflow-hidden">
            <h2 className="about-text-item text-sm font-mono text-purple-300 uppercase tracking-widest mb-2">
            Who I Am
            </h2>
        </div>
        
        <div className="overflow-hidden">
            <h1 className="about-text-item text-4xl sm:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tighter">
            Crafting digital <br />
            <span className="text-white/60">experiences.</span>
            </h1>
        </div>

        <div className="space-y-6 max-w-lg">
            <p className="about-text-item text-lg sm:text-xl text-gray-200 leading-relaxed font-light">
            I’m <span className="text-white font-medium">Ishan Roy</span>, a software developer driven by the intersection of design and engineering. I don't just write code; I build immersive, high-performance applications that leave a lasting impression.
            </p>
            <p className="about-text-item text-lg sm:text-xl text-gray-200 leading-relaxed font-light">
            From full-stack architectures to AI-powered systems, I thrive on solving complex problems with elegant solutions. Always learning, always evolving.
            </p>
        </div>

        <div className="about-text-item pt-4">
            <a href="#contact" className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all duration-300">
                <span>Let's Talk</span>
                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
            </a>
        </div>
      </div>
    </div>
  );
};

export default About;
