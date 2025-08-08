import aboutImage from "../assets/ishan.jpg";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Register the GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);

  // useGSAP hook for animations
  useGSAP(() => {
    const element = aboutRef.current;
    if (!element) return;

    const leftSide = element.querySelector(".about-leftSide");
    const rightSide = element.querySelector(".about-rightSide");

    // Create a GSAP timeline for the scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 60%", // Start animation when the top of the element is 60% from the top of the viewport
        end: "top 55%",   // End animation
        toggleActions: "play none none reverse", // Animation behavior on scroll
      },
    });

    // Animate the left side (image)
    tl.from(leftSide, {
      duration: 0.8,
      opacity: 0,
      x: -300,
      ease: "power3.out",
    })
    // Animate the right side (text), starting slightly after the left side
    .from(rightSide, {
      duration: 0.8,
      opacity: 0,
      x: 300,
      ease: "power3.out",
    }, "-=0.6"); // Overlap the start of this animation with the previous one

  }, { scope: aboutRef });

  return (
    <div
      id="about"
      ref={aboutRef}
      // --- Responsive Changes ---
      // Default: flex-col for mobile layout.
      // md:flex-row: Switch to a row layout on medium screens and up.
      // min-h-screen: Ensures the section takes at least the full viewport height.
      // Padding: Responsive padding for different screen sizes.
      className="relative w-full min-h-screen bg-[#131313] flex flex-col md:flex-row justify-center items-center px-6 py-16 sm:px-8 md:px-[4vw] md:py-[3vw] overflow-hidden"
    >
      {/* Left side (Image) */}
      <div className="about-leftSide w-full md:w-1/2 flex items-center justify-center p-4">
        <img
          src={aboutImage}
          alt="About"
          // --- Responsive Changes ---
          // Image size adapts to screen width for better scaling.
          className="w-60 h-60 sm:w-72 sm:h-72 lg:w-96 lg:h-96 object-cover rounded-full"
          // Added a placeholder in case the image fails to load
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/131313/FFFFFF?text=Ishan'; }}
        />
      </div>

      {/* Right side (Text) */}
      <div
        // --- Responsive Changes ---
        // On mobile, text is centered. On larger screens, it's aligned to the start (left).
        className="about-rightSide w-full md:w-1/2 flex flex-col justify-center items-center md:items-start gap-5 md:gap-[2vw] p-4 md:px-[3.5vw]"
      >
        <h2
          // --- Responsive Changes ---
          // Font size scales with breakpoints for better readability.
          // Text is centered on mobile and left-aligned on larger screens.
          className="text-4xl sm:text-5xl lg:text-[5.5vw] font-bold text-white text-center md:text-left tracking-wide"
        >
          About Me
        </h2>
        <p
          // --- Responsive Changes ---
          // Font size scales with breakpoints.
          // Text is centered on mobile, left-aligned on larger screens.
          // max-w-md on mobile improves readability by constraining line length.
          className="text-base sm:text-lg lg:text-[1.5vw] text-center md:text-left text-white max-w-md md:max-w-none tracking-normal"
        >
          Hi, I’m Ishan Roy, a FullStack Developer passionate about turning
          ideas into impactful, user-friendly web applications. I focus on
          building scalable solutions while constantly exploring new
          technologies to make a real difference.
        </p>
      </div>
    </div>
  );
};

export default About;
