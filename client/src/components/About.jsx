import aboutImage from "../assets/ishan.jpg";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import SplitType from 'split-type';
import {
  ZOOM_O_ENTER,
  ZOOM_TEXT_END,
  ZOOM_PARA_END,
  ZOOM_CTA_END,
  zoomScrollStart,
  zoomScrollEnd,
} from "../constants/zoomTransition";

gsap.registerPlugin(ScrollTrigger);

const About = ({ isReady = true, transitionRef }) => {
  const aboutRef = useRef(null);
  const imageRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const headerRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const paragraphRef = useRef(null);
  const ctaRef = useRef(null);

  useGSAP(() => {
    if (!isReady) return;

    const splits = [];
    let isCleanedUp = false;
    const isDesktop = window.innerWidth >= 768;

    const initAnimations = () => {
      if (isCleanedUp) return;

      const transitionEl = transitionRef?.current;
      const eyebrow = eyebrowRef.current;
      const titleLine1 = titleLine1Ref.current;
      const titleLine2 = titleLine2Ref.current;
      const paragraph = paragraphRef.current;
      const imageWrapper = imageWrapperRef.current;
      const cta = ctaRef.current;

      if (!transitionEl) return;

      const revealChars = (element, { startPct, endPct, stagger = 0.012, fromY = "110%" }) => {
        const splitText = new SplitType(element, { types: "words,chars" });
        splits.push(splitText);

        if (!splitText.chars?.length) return null;

        gsap.set(splitText.chars, { y: fromY, opacity: 0, force3D: true });

        const charTl = gsap.timeline({
          scrollTrigger: {
            trigger: transitionEl,
            start: zoomScrollStart(startPct),
            end: zoomScrollEnd(endPct),
            scrub: true,
            invalidateOnRefresh: true,
            onLeave: () => gsap.set(splitText.chars, { opacity: 1, y: "0%" }),
            onLeaveBack: () => gsap.set(splitText.chars, { opacity: 0, y: fromY }),
          },
        });

        splitText.chars.forEach((char, i) => {
          charTl.to(char, { y: "0%", opacity: 1, ease: "none", duration: 0.12 }, i * stagger);
        });

        return splitText;
      };

      // ── Set initial hidden states explicitly ──────────────────────────────
      if (imageWrapper) {
        gsap.set(imageWrapper, {
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
          scale: 1.05,
          force3D: true,
        });
      }

      // ── Text reveals — scrubbed to the same scroll as the O zoom ──────────
      // Using the transition wrapper ensures animations fire during the pin.
      if (eyebrow) {
        revealChars(eyebrow, {
          startPct: ZOOM_O_ENTER,
          endPct: ZOOM_O_ENTER + 0.1,
          stagger: isDesktop ? 0.025 : 0.035,
          fromY: "100%",
        });
      }

      if (titleLine1) {
        revealChars(titleLine1, {
          startPct: ZOOM_O_ENTER + 0.02,
          endPct: ZOOM_TEXT_END - 0.03,
          stagger: isDesktop ? 0.012 : 0.018,
        });
      }

      if (titleLine2) {
        revealChars(titleLine2, {
          startPct: ZOOM_O_ENTER + 0.05,
          endPct: ZOOM_TEXT_END,
          stagger: isDesktop ? 0.012 : 0.018,
        });
      }

      if (paragraph) {
        gsap.set(paragraph, { opacity: 1, y: 0, clearProps: "transform" });

        const split = new SplitType(paragraph, { types: "lines,words" });
        splits.push(split);
        if (split.lines?.length) {
          gsap.set(split.lines, { y: 24, opacity: 0, force3D: true });

          gsap.to(split.lines, {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.8,
            ease: "power3.out",
            force3D: true,
            scrollTrigger: {
              trigger: paragraph,
              start: "top 85%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
            },
          });
        }
      }

      if (cta) {
        gsap.set(cta, { opacity: 0, y: 16, force3D: true });

        gsap.to(cta, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: cta,
            start: "top 90%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        });
      }

      // ── Photo — own trigger, plays when image enters viewport ───────────
      if (imageWrapper) {
        gsap.to(imageWrapper, {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          scale: 1,
          duration: 1.8,
          ease: "power4.inOut",
          force3D: true,
          onComplete: () => gsap.set(imageWrapper, { clearProps: "will-change" }),
          scrollTrigger: {
            trigger: imageWrapper,
            start: isDesktop ? "top 78%" : "top 85%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        });
      }

      // Parallax on photo — desktop only
      if (isDesktop && imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 15,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }

      ScrollTrigger.refresh();
    };

    const setup = () => {
      // Wait for the zoom pin ScrollTrigger to be registered first
      requestAnimationFrame(() => {
        requestAnimationFrame(initAnimations);
      });
    };

    if (document.fonts) {
      document.fonts.ready.then(setup);
    } else {
      setup();
    }

    return () => {
      isCleanedUp = true;
      splits.forEach((split) => split.revert());
    };

  }, { scope: aboutRef, dependencies: [isReady] });

  return (
    <div
      id="about"
      ref={aboutRef}
      className="about-section relative w-full min-h-screen flex flex-col lg:flex-row items-center justify-center px-8 py-20 sm:px-12 md:px-20 lg:px-[5vw] gap-12 lg:gap-24 overflow-hidden z-[1]"
    >
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative order-2 lg:order-1">
        <div ref={imageWrapperRef} className="relative w-full max-w-md aspect-[3/4] overflow-hidden rounded-2xl group transform-gpu">
           <div className="w-full h-full relative overflow-hidden">
             <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center p-4 sm:p-8 overflow-hidden underline-offset-4">
                  <pre className="text-green-500/80 font-mono text-[min(3.5vw,14px)] sm:text-base leading-relaxed">
                    {`const ishan = {
  role: "Dev/AI-ML/Backend",
  passion: "Build, Innovate, Solve",
  skills: ["Python", "JavaScript", "Java"],
  status: "Ready"
};`}
                  </pre>
             </div>

            <img
                ref={imageRef}
                src={aboutImage}
                alt="Ishan Roy"
                className="relative z-10 w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0 scale-110 will-change-transform"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x800/131313/FFFFFF?text=Ishan'; }}
            />
           </div>
           <div className="absolute -bottom-6 -left-6 w-24 h-24 border-l-2 border-b-2 border-white/20 hidden md:block"></div>
           <div className="absolute -top-6 -right-6 w-24 h-24 border-r-2 border-t-2 border-white/20 hidden md:block"></div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-start gap-8 order-1 lg:order-2">
        <div ref={headerRef} className="about-header overflow-hidden">
            <h2
              ref={eyebrowRef}
              className="text-sm font-mono text-purple-400 uppercase tracking-[0.3em] mb-2 overflow-hidden"
            >
                / WHO I AM
            </h2>
            <h1
              className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tighter overflow-hidden"
            >
              <span className="block overflow-hidden pb-1 sm:pb-2">
                <span ref={titleLine1Ref} className="inline-block whitespace-nowrap">Crafting digital</span>
              </span>
              <span className="block overflow-hidden">
                <span ref={titleLine2Ref} className="inline-block text-white/40 italic font-light whitespace-nowrap">experiences.</span>
              </span>
            </h1>
        </div>
        
        <div className="space-y-6 max-w-xl">
            <p ref={paragraphRef} className="text-xl sm:text-2xl text-gray-300 leading-snug font-light overflow-hidden">
            I’m <span className="text-white font-medium">Ishan Roy</span>, a software developer driven by the intersection of design and engineering. I don't just write code; I build immersive, high-performance applications that leave a lasting impression.
            From full-stack architectures to AI-powered systems, I thrive on solving complex problems with elegant solutions.
            </p>
        </div>

        <div ref={ctaRef} className="pt-4">
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
