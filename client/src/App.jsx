import { useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import Lenis from 'lenis';
import gsap from 'gsap';
import Home from './pages/Home';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import { useState } from 'react';


const App = () => {
  const location = useLocation();
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");


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

    if (isLoading) {
      lenis.stop();
    }

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
      // Entrance animation for content
      gsap.fromTo(".app-content", 
        { opacity: 0, scale: 1.05, filter: 'blur(20px)' },
        { 
          opacity: 1, 
          scale: 1, 
          filter: 'blur(0px)', 
          duration: 1.5, 
          ease: 'power3.out',
          onComplete: () => {
            document.body.classList.remove('no-scroll');
            window.lenis?.start();
            gsap.set(".app-content", { clearProps: "filter,scale" });
          }
        }
      );
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

    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      
      gsap.to(cursorDot, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: "power2.out"
      });

      gsap.to(cursorOutline, {
        x: clientX,
        y: clientY,
        duration: 0.5,
        ease: "power3.out"
      });

      // Context Awareness
      const target = e.target;
      const isProject = target.closest('.project-card');
      const isClickable = target.closest('a, button, .cursor-pointer, input, textarea');
      const isHero = target.closest('#home');

      if (isProject) {
        cursorDot.classList.add('project-active');
        cursorOutline.classList.add('hidden');
      } else if (isClickable) {
        cursorDot.classList.add('active');
        cursorOutline.classList.add('active');
        cursorDot.classList.remove('project-active');
        cursorOutline.classList.remove('hidden');
      } else {
        cursorDot.classList.remove('active', 'project-active');
        cursorOutline.classList.remove('active', 'hidden');
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