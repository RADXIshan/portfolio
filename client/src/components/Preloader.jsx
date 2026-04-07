import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import logo from '../assets/logo.png';

const Preloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const logoRef = useRef(null);
  const containerRef = useRef(null);
  const panelsRef = useRef([]);
  const hundredRef = useRef(null);
  const tensRef = useRef(null);
  const onesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        }
      });

      // 1. Initial State
      gsap.set(panelsRef.current, { yPercent: 0, willChange: 'transform' });
      gsap.set(logoRef.current, { opacity: 0, scale: 0.8, filter: 'invert(1)' });
      gsap.set([hundredRef.current, tensRef.current, onesRef.current], { y: 0 });
      gsap.set(hundredRef.current, { opacity: 0, width: 0 });
      
      // 2. Entrance
      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out'
      })
      
      // 3. SUPERCHARGED COUNTER ANIMATION
      .to(onesRef.current, {
        y: '-90.9090909091%', // Precision for 11 items (0-9-0) -> (10/11)
        duration: 2.5,
        ease: 'power4.inOut'
      }, "-=0.2")
      
      .to(tensRef.current, {
        y: '-90.9090909091%', 
        duration: 2.5,
        ease: 'power4.inOut'
      }, "<") 
      
      .to(hundredRef.current, {
        opacity: 1,
        width: window.innerWidth < 768 ? '2.4rem' : '4.2rem',
        duration: 0.4,
        ease: 'power2.out'
      }, "-=0.6")
      
      // 4. Final Flash / Exit Start
      .to(containerRef.current, {
        opacity: 0,
        scale: 0.9,
        y: -40,
        filter: 'blur(10px)',
        duration: 0.8,
        ease: 'power3.inOut',
        delay: 0.2
      })
      
      // 5. OPTIMIZED PANEL EXIT
      .to(panelsRef.current, {
        yPercent: -100,
        duration: 1.2,
        stagger: {
          amount: 0.4,
          from: "random"
        },
        ease: 'expo.inOut'
      }, "-=0.2");

    }, preloaderRef);

    return () => ctx.revert();
  }, [onComplete]);

  const reel = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-[20000] flex items-center justify-center overflow-hidden pointer-events-none"
    >
      {/* Optimized Single Noise Layer */}
      <div className="absolute inset-0 bg-[#0a0a0a] z-0">
        <div className="absolute inset-[-100%] w-[300%] h-[300%] opacity-[0.03] bg-noise pointer-events-none"></div>
      </div>

      {/* Background Staggered Panels */}
      <div className="absolute inset-0 flex z-10">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={el => panelsRef.current[i] = el}
            className="flex-1 h-full bg-[#0a0a0a] border-r border-white/5 last:border-r-0"
          ></div>
        ))}
      </div>

      {/* Center Content */}
      <div ref={containerRef} className="relative z-20 flex flex-col items-center gap-4 md:gap-6 pointer-events-auto">
        <div className="relative">
          <div 
            ref={logoRef}
            className="p-3 md:p-5 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] bg-white/[0.03] backdrop-blur-xl flex items-center justify-center transform-gpu"
          >
            <img 
              src={logo} 
              alt="iR Logo" 
              className="w-24 md:w-32 h-auto rounded-xl md:rounded-2xl"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-center h-[140px] md:h-[200px] select-none px-4 gap-0 overflow-hidden">
          {/* Hundreds Digit */}
          <div ref={hundredRef} className="opacity-0 w-0 h-full flex flex-col items-center overflow-hidden">
            <span className="h-full flex items-center justify-center text-7xl md:text-9xl font-black text-white leading-none text-center" style={{ fontFamily: '"Outfit", sans-serif' }}>
              1
            </span>
          </div>

          {/* Tens Reel */}
          <div className="relative h-full overflow-hidden w-[3.6rem] md:w-[6.2rem] flex flex-col items-center">
            <div ref={tensRef} className="flex flex-col items-center">
              {reel.map((d, i) => (
                <span key={i} className="h-[140px] md:h-[200px] flex items-center justify-center text-7xl md:text-9xl font-black text-white leading-none text-center" style={{ fontFamily: '"Outfit", sans-serif' }}>
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Ones Reel */}
          <div className="relative h-full overflow-hidden w-[3.6rem] md:w-[6.2rem] flex flex-col items-center">
            <div ref={onesRef} className="flex flex-col items-center">
              {reel.map((d, i) => (
                <span key={i} className="h-[140px] md:h-[200px] flex items-center justify-center text-7xl md:text-9xl font-black text-white leading-none text-center" style={{ fontFamily: '"Outfit", sans-serif' }}>
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Percent Symbol */}
          <div className="flex flex-col self-center ml-2">
            <span className="text-4xl md:text-6xl font-black text-white/30" style={{ fontFamily: '"Outfit", sans-serif' }}>
              %
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
             <div className="h-[1px] w-16 bg-white/20"></div>
             <div className="tracking-[0.8em] text-white/20 uppercase text-[9px] md:text-xs font-bold pl-[0.8em]">
                Initializing
             </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
