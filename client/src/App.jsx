import { useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Home from './pages/Home';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import { useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const location = useLocation();
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  // Immediately hide app-content to prevent flash before preloader takes over
  useEffect(() => {
    gsap.set(".app-content", { opacity: 0 });
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    window.lenis = lenis;

    // Always stop lenis initially — preloader is always shown first
    lenis.stop();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Smooth scroll for anchor links
    const handleAnchorClick = (e) => {
      const link = e.target.closest('a');
      if (link && link.hash && link.pathname === window.location.pathname) {
        const target = document.querySelector(link.hash);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.classList.add('no-scroll');
      window.lenis?.stop();
    } else {
      // Remove scroll lock first so lenis can work
      document.body.classList.remove('no-scroll');

      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        // On mobile: simple fade-in only, no scale/blur (GPU-heavy and buggy)
        gsap.fromTo(".app-content",
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            onComplete: () => {
              gsap.set(".app-content", { clearProps: "opacity" });
              window.lenis?.start();
              // Recalculate all scroll triggers now layout is visible
              ScrollTrigger.refresh();
            }
          }
        );
      } else {
        // Desktop: full entrance animation
        gsap.fromTo(".app-content",
          { opacity: 0, scale: 1.05, filter: 'blur(20px)' },
          {
            opacity: 1,
            scale: 1,
            filter: 'none',
            duration: 1.5,
            ease: 'power3.out',
            onComplete: () => {
              gsap.set(".app-content", { clearProps: "all" });
              window.lenis?.start();
              // Recalculate all scroll triggers now layout is visible
              ScrollTrigger.refresh();
            }
          }
        );
      }
    }

    return () => {
      document.body.classList.remove('no-scroll');
      window.lenis?.start();
    };
  }, [isLoading]);

  useEffect(() => {
    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;

    if (!cursorDot || !cursorOutline) return;

    // Set centering properties to avoid inline override of translate(-50%, -50%)
    gsap.set(cursorDot, { xPercent: -50, yPercent: -50, force3D: true });
    gsap.set(cursorOutline, { xPercent: -50, yPercent: -50, force3D: true });

    const xToDot = gsap.quickTo(cursorDot, "x", { duration: 0.08, ease: "power2.out", force3D: true });
    const yToDot = gsap.quickTo(cursorDot, "y", { duration: 0.08, ease: "power2.out", force3D: true });
    const xToOutline = gsap.quickTo(cursorOutline, "x", { duration: 0.35, ease: "power3.out", force3D: true });
    const yToOutline = gsap.quickTo(cursorOutline, "y", { duration: 0.35, ease: "power3.out", force3D: true });

    let currentCursorState = "default";

    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      
      xToDot(clientX);
      yToDot(clientY);
      xToOutline(clientX);
      yToOutline(clientY);

      // Context Awareness
      const target = e.target;
      const isProject = target.closest('.project-card');
      const isClickable = target.closest('a, button, .cursor-pointer, input, textarea');

      if (isProject) {
        if (currentCursorState !== "project") {
          currentCursorState = "project";
          gsap.to(cursorDot, { scale: 5, duration: 0.3, ease: "power2.out", overwrite: "auto" });
          gsap.to(cursorOutline, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" });
        }
      } else if (isClickable) {
        if (currentCursorState !== "clickable") {
          currentCursorState = "clickable";
          gsap.to(cursorDot, { scale: 1.5, duration: 0.3, ease: "power2.out", overwrite: "auto" });
          gsap.to(cursorOutline, { scale: 1.5, opacity: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });
        }
      } else {
        if (currentCursorState !== "default") {
          currentCursorState = "default";
          gsap.to(cursorDot, { scale: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });
          gsap.to(cursorOutline, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });
        }
      }
    };

    if (window.matchMedia("(hover: hover)").matches) {
      window.addEventListener("mousemove", moveCursor);
    }

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      <Navbar activeSection={activeSection} isLoading={isLoading} />
      
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      <div ref={cursorDotRef} className="cursor-dot hidden md:flex items-center justify-center"></div>
      <div ref={cursorOutlineRef} className="cursor-outline hidden md:block"></div>

      <div 
        className="app-content"
      >
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home isLoading={isLoading} setActiveSection={setActiveSection} />} />
        </Routes>
      </div>
    </>
  );
};

export default App;