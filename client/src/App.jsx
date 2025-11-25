import { useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import Lenis from 'lenis';
import gsap from 'gsap';
import Home from './pages/Home';

const App = () => {
  const location = useLocation();
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);

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

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

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
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      <div ref={cursorDotRef} className="cursor-dot hidden md:block"></div>
      <div ref={cursorOutlineRef} className="cursor-outline hidden md:block"></div>
      
      <Routes location={location} key={location.pathname}>
        <Route index element={<Home />} />
      </Routes>
    </>
  );
};

export default App;