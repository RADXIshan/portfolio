import { Toaster } from "react-hot-toast";
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { ZOOM_O_ENTER } from "../constants/zoomTransition";

gsap.registerPlugin(ScrollTrigger);

const PIN_SCROLL_DISTANCE = "+=100%";

const Home = ({ isLoading, setActiveSection }) => {

  const mainRef = useRef(null);
  const transitionRef = useRef(null);
  const stickyRef = useRef(null);
  const heroLayerRef = useRef(null);
  const portalLayerRef = useRef(null);
  const zoomTextRef = useRef(null);
  const scrollCueRef = useRef(null);

  useGSAP(() => {
    if (isLoading) return;

    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile:  "(max-width: 767px)",
    }, (context) => {
      const { isDesktop } = context.conditions;

      const transitionWrapper = transitionRef.current;
      const sticky = stickyRef.current;
      const heroLayer = heroLayerRef.current;
      const portalLayer = portalLayerRef.current;
      const zoomText = zoomTextRef.current;
      const scrollCue = scrollCueRef.current;

      if (!transitionWrapper || !sticky || !heroLayer || !portalLayer || !zoomText) return;

      const scaleMid   = isDesktop ? 22 : 14;
      const scaleFinal = isDesktop ? 70 : 42;

      const setZoomOrigin = () => {
        const oEl = zoomText.querySelector(".zoom-o");
        if (!oEl) return;

        const textRect = zoomText.getBoundingClientRect();
        const oRect = oEl.getBoundingClientRect();
        if (!textRect.width || !textRect.height) return;

        const originX = ((oRect.left + oRect.width / 2) - textRect.left) / textRect.width * 100;
        const originY = ((oRect.top + oRect.height / 2) - textRect.top) / textRect.height * 100;

        gsap.set(zoomText, {
          transformOrigin: `${originX}% ${originY}%`,
          force3D: true,
        });
      };

      // Scroll cue — fades in after hero entrance, stays for entire zoom
      let scrollCueTl = null;
      let arrowTween = null;
      if (scrollCue) {
        gsap.set(scrollCue, { opacity: 0, y: 12 });

        scrollCueTl = gsap.timeline({ delay: isDesktop ? 2.8 : 2.2 });
        scrollCueTl.to(scrollCue, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
        });

        const scrollArrow = scrollCue.querySelector(".scroll-arrow");
        if (scrollArrow) {
          arrowTween = gsap.to(scrollArrow, {
            y: 8,
            duration: 0.9,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
          });
        }
      }

      gsap.set(heroLayer, { opacity: 1, force3D: true });
      gsap.set(portalLayer, { opacity: 0, force3D: true });
      gsap.set(zoomText, { scale: 1, opacity: 1, force3D: true });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: transitionWrapper,
          start: "top top",
          end: PIN_SCROLL_DISTANCE,
          pin: sticky,
          pinSpacing: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          id: "hero-zoom",
          onRefresh: setZoomOrigin,
          onLeave: () => {
            if (scrollCue) gsap.set(scrollCue, { opacity: 0 });
          },
          onEnterBack: () => {
            if (scrollCue) gsap.set(scrollCue, { opacity: 1 });
          },
        },
      });

      tl.to({}, { duration: 0.01 });
      tl.to(heroLayer, { opacity: 0, duration: 0.05 }, 0.01);
      tl.to(portalLayer, { opacity: 1, duration: 0.05 }, 0.01);
      tl.to(zoomText, { scale: scaleMid, opacity: 1, duration: 0.30 }, ZOOM_O_ENTER);
      tl.to(zoomText, { scale: scaleFinal, opacity: 0, duration: 0.20 }, 0.36);
      tl.to(portalLayer, { opacity: 0, duration: 0.10 }, 0.56);

      setZoomOrigin();

      const onResize = () => {
        setZoomOrigin();
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", onResize);

      const fontsReady = document.fonts?.ready ?? Promise.resolve();
      fontsReady.then(() => {
        setZoomOrigin();
        ScrollTrigger.refresh();
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        window.removeEventListener("resize", onResize);
        scrollCueTl?.kill();
        arrowTween?.kill();
      };
    });

    return () => mm.revert();

  }, { scope: mainRef, dependencies: [isLoading] });

  useGSAP(() => {
    const sections = [
      { id: "home", color: "#0a0a0a" },
      { id: "about", color: "#0a0a0a" },
      { id: "skills", color: "#0a0a0a" },
      { id: "projects", color: "#0a0a0a" },
      { id: "contact", color: "#0a0a0a" },
    ];

    let currentColor = "";

    sections.forEach(({ id, color }) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => {
          if (currentColor !== color) {
            currentColor = color;
            gsap.to(document.body, { "--bg-color": color, duration: 0.8 });
          }
          setActiveSection(id);
        },
        onEnterBack: () => {
          if (currentColor !== color) {
            currentColor = color;
            gsap.to(document.body, { "--bg-color": color, duration: 0.8 });
          }
          setActiveSection(id);
        },
      });
    });
  }, { scope: mainRef });

  return (
    <main ref={mainRef}>
      <div ref={transitionRef} id="hero-transition" className="hero-transition-wrapper">
        <div ref={stickyRef} className="hero-transition-sticky">
          <div ref={heroLayerRef} className="hero-layer">
            <Hero isReady={!isLoading} />
          </div>

          <div ref={portalLayerRef} className="portal-layer">
            <div className="portal-layout">
              <h1
                ref={zoomTextRef}
                className="zoom-portal-text"
                aria-hidden="true"
              >
                ISHAN R<span className="zoom-o">O</span>Y
              </h1>
              <p className="portal-spacer text-[clamp(0.75rem,2.5vw,1.4rem)] font-light tracking-[0.15em] sm:tracking-[0.35em] uppercase">
                Software Developer
              </p>
              <div className="portal-spacer h-12 sm:h-20 mt-6 sm:mt-8" />
            </div>
          </div>

          {/* Cue persists through hero + portal zoom — above all layers */}
          <div ref={scrollCueRef} className="scroll-cue zoom-scroll-cue">
            <span className="scroll-cue-text">Keep Scrolling</span>
            <div className="scroll-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <About isReady={!isLoading} transitionRef={transitionRef} />
      <Skills isReady={!isLoading} />
      <Projects isReady={!isLoading} />
      <Contact />
      <Footer />

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </main>
  );
};

export default Home;
