import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import logo from '../assets/logo.png';

const Preloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const curtainRef = useRef(null);
  const ringRef = useRef(null);
  const ringProgressRef = useRef(null);
  const monogramRef = useRef(null);
  const nameRef = useRef(null);
  const taglineRef = useRef(null);
  const counterRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete });

      gsap.set(curtainRef.current, { scaleY: 1, transformOrigin: 'top center' });
      gsap.set(ringRef.current, { opacity: 0, scale: 0.92 });
      gsap.set(ringProgressRef.current, { strokeDashoffset: 283 });
      gsap.set(monogramRef.current, { opacity: 0, y: 24 });
      gsap.set(nameRef.current, { opacity: 0, y: 12 });
      gsap.set(taglineRef.current, { opacity: 0, y: 8 });
      gsap.set(counterRef.current, { opacity: 0 });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' });

      // Entrance — refined, unhurried
      tl.to(ringRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.4,
        ease: 'power3.out',
      })
      .to(ringProgressRef.current, {
        strokeDashoffset: 0,
        duration: 2.6,
        ease: 'power2.inOut',
      }, '-=1.1')
      .to(monogramRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
      }, '-=2.2')
      .to(nameRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      }, '-=1.6')
      .to(taglineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
      }, '-=0.7')
      .to(counterRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.8')
      .to(lineRef.current, {
        scaleX: 1,
        duration: 2.4,
        ease: 'power2.inOut',
      }, '-=2.4');

      let count = { value: 0 };
      gsap.to(count, {
        value: 100,
        duration: 2.6,
        ease: 'power2.inOut',
        delay: 0.15,
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = String(Math.round(count.value)).padStart(2, '0');
          }
        },
      });

      // Exit — curtain lifts, content fades
      tl.to([ringRef.current, monogramRef.current, nameRef.current, taglineRef.current, counterRef.current, lineRef.current], {
        opacity: 0,
        y: -12,
        duration: 0.7,
        stagger: 0.04,
        ease: 'power2.inOut',
        delay: 0.15,
      })
      .to(curtainRef.current, {
        scaleY: 0,
        duration: 1.1,
        ease: 'power4.inOut',
      }, '-=0.35');

    }, preloaderRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="preloader-root fixed inset-0 z-[20000] flex items-center justify-center overflow-hidden"
    >
      <div ref={curtainRef} className="preloader-curtain absolute inset-0 bg-[#080808]" />

      <div className="preloader-grain absolute inset-0 opacity-[0.04] bg-noise pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Circular progress ring */}
        <div ref={ringRef} className="relative mb-10 md:mb-12">
          <svg className="w-36 h-36 md:w-44 md:h-44 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r="45"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="0.5"
            />
            <circle
              ref={ringProgressRef}
              cx="50" cy="50" r="45"
              fill="none"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeDasharray="283"
              strokeDashoffset="283"
            />
          </svg>

          <div
            ref={monogramRef}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img
              src={logo}
              alt="IR"
              className="w-14 h-14 md:w-[4.5rem] md:h-[4.5rem] rounded-full object-cover ring-1 ring-white/10"
            />
          </div>
        </div>

        <div ref={nameRef} className="text-center mb-6">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.55em] text-white/35 mb-3 pl-[0.55em]">
            Portfolio
          </p>
          <h1 className="text-2xl md:text-3xl font-light tracking-[0.18em] text-white/90 uppercase">
            Ishan Roy
          </h1>
        </div>

        <p
          ref={taglineRef}
          className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-white/25 mb-8 pl-[0.4em]"
        >
          Curating Experience
        </p>

        <div className="flex flex-col items-center w-full max-w-[200px]">
          <span
            ref={counterRef}
            className="text-sm font-mono text-white/40 tracking-[0.3em] mb-4 tabular-nums"
          >
            00
          </span>
          <div className="w-full h-px bg-white/[0.06] relative overflow-hidden">
            <div
              ref={lineRef}
              className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
