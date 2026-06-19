import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import logo from '../assets/logo.png';

const Preloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const counterRef = useRef(null);
  const lineRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const wrapperRef = useRef(null);
  const panelsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        }
      });

      // Initial State
      gsap.set(logoRef.current, { opacity: 0, y: 40, scale: 0.95 });
      gsap.set(textRef.current, { opacity: 0, y: 10 });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(panelsRef.current, { scaleY: 1 });

      // Entrance
      tl.to(logoRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.8,
        ease: 'power4.out'
      })
      .to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out'
      }, "-=1.4")
      .to(lineRef.current, {
        scaleX: 1,
        duration: 2.8,
        ease: 'power2.inOut'
      }, "-=1.6");

      // Counter animation
      let count = { value: 0 };
      gsap.to(count, {
        value: 100,
        duration: 2.8,
        ease: 'power2.inOut',
        delay: 0.2,
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = Math.round(count.value);
          }
        }
      });

      // Exit Animation
      // Fade and blur the central content
      tl.to(wrapperRef.current, {
        opacity: 0,
        scale: 1.1,
        filter: 'blur(15px)',
        duration: 1,
        ease: 'power3.inOut',
        delay: 0.2
      })
      // Slide panels up
      .to(panelsRef.current, {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1.2,
        stagger: 0.05,
        ease: 'expo.inOut'
      }, "-=0.6");

    }, preloaderRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-[20000] flex items-center justify-center overflow-hidden pointer-events-none"
    >
      {/* Background Panels for elegant exit */}
      <div className="absolute inset-0 flex z-0">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            ref={el => panelsRef.current[i] = el}
            className="flex-1 h-full bg-[#0a0a0a]"
          ></div>
        ))}
      </div>

      {/* Noise Overlay */}
      <div className="absolute inset-0 z-10 opacity-[0.03] bg-noise pointer-events-none mix-blend-overlay"></div>

      {/* Content */}
      <div ref={wrapperRef} className="relative z-20 flex flex-col items-center justify-center w-full px-6">
        
        {/* Elegant Logo Container */}
        <div 
          ref={logoRef} 
          className="mb-14 flex flex-col items-center"
        >
          <div className="relative p-7 rounded-[2rem] bg-white/[0.01] border border-white/5 backdrop-blur-3xl shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-20"></div>
            <img 
              src={logo} 
              alt="iR Logo" 
              className="w-16 h-auto md:w-24 relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]"
            />
          </div>
        </div>

        {/* Typography & Progress */}
        <div className="flex flex-col items-center w-full max-w-[240px] md:max-w-[300px]">
          <div className="flex items-end mb-6 overflow-hidden">
            <span 
              ref={counterRef} 
              className="text-6xl md:text-8xl font-light text-white tracking-tighter leading-none"
              style={{ fontFamily: '"Outfit", sans-serif', fontVariantNumeric: 'tabular-nums' }}
            >
              0
            </span>
            <span className="text-2xl md:text-3xl text-white/40 font-light ml-2 mb-1 md:mb-2 leading-none">%</span>
          </div>

          {/* Very thin, elegant progress line */}
          <div className="w-full h-[1px] bg-white/10 relative overflow-hidden rounded-full">
            <div 
              ref={lineRef}
              className="absolute top-0 left-0 h-full w-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            ></div>
          </div>

          <div className="mt-8 flex items-center justify-between w-full">
             <div className="h-[1px] w-8 bg-white/20"></div>
             <div 
              ref={textRef}
              className="text-[9px] md:text-[10px] font-medium uppercase tracking-[0.5em] text-white/30 pl-[0.5em]"
             >
               Initializing
             </div>
             <div className="h-[1px] w-8 bg-white/20"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Preloader;
