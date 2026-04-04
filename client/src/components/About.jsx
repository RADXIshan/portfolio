import aboutImage from "../assets/ishan.jpg";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const paragraphRef = useRef(null);

  useGSAP(() => {
    // Image Reveal with Parallax
    gsap.fromTo(
      imageRef.current,
      { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", scale: 1.4 },
      { 
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", 
        scale: 1, 
        duration: 1.8, 
        ease: "power4.inOut",
        scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 60%",
            toggleActions: "play none none reset"
        }
      }
    );

    // Parallax effect on scroll
    gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
            trigger: aboutRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    // Text Split Animation
    if (paragraphRef.current) {
        const split = new SplitType(paragraphRef.current, { types: 'lines' });
        
        gsap.from(split.lines, {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: paragraphRef.current,
                start: "top 80%",
                toggleActions: "play none none reset"
            }
        });
    }

    gsap.from(".about-header", {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 70%",
            toggleActions: "play none none reset"
        }
    });

  }, { scope: aboutRef });

  return (
    <div
      id="about"
      ref={aboutRef}
      className="relative w-full min-h-screen flex flex-col lg:flex-row items-center justify-center px-8 py-20 sm:px-12 md:px-20 lg:px-[5vw] gap-12 lg:gap-24 overflow-hidden"
    >
      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
        <div className="relative w-full max-w-md aspect-[3/4] overflow-hidden rounded-2xl group cursor-crosshair">
           <div className="w-full h-full relative overflow-hidden">
             {/* Easter Egg Code */}
             <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center p-8 overflow-hidden">
                 <pre className="text-green-500/80 font-mono text-[min(3vw,14px)] sm:text-base leading-relaxed">
                   {`const ishan = {
                   role: "Dev",
                   passion: "Build",
                   skills: ["JS", "Py", "Go"],
                   status: "Ready"
                 };`}
                 </pre>
             </div>

            <img
                ref={imageRef}
                src={aboutImage}
                alt="Ishan Roy"
                className="relative z-10 w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0 scale-110"
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
        <div className="about-header overflow-hidden">
            <h2 className="text-sm font-mono text-purple-400 uppercase tracking-[0.3em] mb-2">
                / WHO I AM
            </h2>
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold leading-[0.85] tracking-tighter">
                Crafting digital <br />
                <span className="text-white/40 italic font-light">experiences.</span>
            </h1>
        </div>
        
        <div className="space-y-6 max-w-xl">
            <p ref={paragraphRef} className="text-xl sm:text-2xl text-gray-300 leading-snug font-light">
            I’m <span className="text-white font-medium">Ishan Roy</span>, a software developer driven by the intersection of design and engineering. I don't just write code; I build immersive, high-performance applications that leave a lasting impression.
            From full-stack architectures to AI-powered systems, I thrive on solving complex problems with elegant solutions.
            </p>
        </div>

        <div className="pt-4">
            <a href="#contact" className="group relative inline-flex items-center gap-4 px-10 py-5 bg-white text-black rounded-full font-bold overflow-hidden transition-all duration-300 hover:pr-14">
                <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1">Let's Talk</span>
                <ArrowUpRight className="w-6 h-6 relative z-10 transition-all duration-300 group-hover:rotate-45 group-hover:translate-x-2" />
                <div className="absolute inset-0 bg-purple-500 scale-x-0 origin-right transition-transform duration-500 ease-out group-hover:scale-x-100 group-hover:origin-left" />
            </a>
        </div>
      </div>
    </div>
  );
};

export default About;
