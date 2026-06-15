import { gsap } from "gsap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

// ─── Hero ─────────────────────────────────────────────────────────────────────
// Animation strategy:
//   Desktop  → whole-element y+opacity fade on title & subtitle (no SplitType on
//              the hero title, because GPU-composited transforms from force3D
//              escape overflow:hidden containers in all browsers and Chrome).
//              SplitType stays only for scroll-triggered sections lower on the page.
//   Mobile   → same whole-element fade, lighter easing.
//
//   Social icons are hidden via CSS `visibility:hidden` on their wrapper and made
//   visible by React state toggle, so GSAP never sets a global `opacity:0` inline
//   style that survives matchMedia cleanup and revert cycles.
// ──────────────────────────────────────────────────────────────────────────────

const Hero = ({ isLoading }) => {

  const heroRef    = useRef(null);
  const textRef    = useRef(null);
  const subtitleRef = useRef(null);
  const socialRef  = useRef(null);

  useGSAP(() => {
    if (isLoading || !textRef.current || !subtitleRef.current) return;

    const mm = gsap.matchMedia();
    let activeListeners = [];
    let glowTween = null;
    let isCleanedUp = false;

    const runAnimation = () => {
      if (isCleanedUp) return;

      // Make social wrapper visible — it starts CSS-invisible to avoid FOUC
      if (socialRef.current) {
        socialRef.current.style.visibility = "visible";
      }

      mm.add({
        isDesktop: "(min-width: 768px)",
        isMobile:  "(max-width: 767px)",
      }, (context) => {
        const { isDesktop } = context.conditions;

        // ── Grab scoped social items (not global .social-link-item) ──────────
        const socialItems = socialRef.current
          ? Array.from(socialRef.current.children)
          : [];

        // ── Initial states ────────────────────────────────────────────────────
        gsap.set(textRef.current,    { opacity: 0, y: isDesktop ? "8%" : "30%" });
        gsap.set(subtitleRef.current, { opacity: 0, y: isDesktop ? 12 : 15 });
        if (socialItems.length) {
          gsap.set(socialItems, {
            opacity: 0,
            y:     isDesktop ? 30 : 15,
            scale: isDesktop ? 0.5 : 0.8,
          });
        }

        // ── Timeline ─────────────────────────────────────────────────────────
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        // Title — simple whole-element reveal (no SplitType chars on hero)
        tl.to(textRef.current, {
          opacity: 1,
          y: 0,
          duration: isDesktop ? 1.2 : 1.0,
          force3D: true,
          onComplete: () => gsap.set(textRef.current, { clearProps: "all" }),
        });

        // Subtitle
        tl.to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: isDesktop ? 1.0 : 0.8,
          ease: "power3.out",
          force3D: true,
          onComplete: () => gsap.set(subtitleRef.current, { clearProps: "all" }),
        }, isDesktop ? "-=0.8" : "-=0.6");

        // Social icons
        if (socialItems.length) {
          tl.to(socialItems, {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: isDesktop ? 0.08 : 0.05,
            duration: isDesktop ? 1.0 : 0.6,
            ease: isDesktop ? "elastic.out(1, 0.75)" : "power2.out",
            force3D: true,
            onComplete: () => gsap.set(socialItems, { clearProps: "all" }),
          }, "-=0.6");
        }

        // ── Desktop only: glow pulse + magnetic social effect ────────────────
        if (isDesktop) {
          // Glow pulse — desktop only, mobile gets a static glow to avoid GPU load
          glowTween = gsap.to(".bg-glow", {
            scale: 1.2, duration: 4, repeat: -1,
            yoyo: true, ease: "sine.inOut", force3D: true,
          });

          if (window.matchMedia("(hover: hover)").matches && socialRef.current) {
            const magneticItems = Array.from(socialRef.current.children);
            magneticItems.forEach(item => {
              const xTo = gsap.quickTo(item, "x", { duration: 1, ease: "elastic.out(1, 0.3)", force3D: true });
              const yTo = gsap.quickTo(item, "y", { duration: 1, ease: "elastic.out(1, 0.3)", force3D: true });
              let rect = null;

              const onEnter  = ()  => { rect = item.getBoundingClientRect(); };
              const onMove   = (e) => {
                if (!rect) rect = item.getBoundingClientRect();
                xTo((e.clientX - (rect.left + rect.width  / 2)) * 0.3);
                yTo((e.clientY - (rect.top  + rect.height / 2)) * 0.3);
              };
              const onLeave  = ()  => { rect = null; xTo(0); yTo(0); };

              item.addEventListener("mouseenter", onEnter);
              item.addEventListener("mousemove",  onMove);
              item.addEventListener("mouseleave", onLeave);
              activeListeners.push({ item, onEnter, onMove, onLeave });
            });
          }
        } // end isDesktop

        // ── matchMedia cleanup ────────────────────────────────────────────────
        return () => {
          if (glowTween) { glowTween.kill(); glowTween = null; }
          activeListeners.forEach(({ item, onEnter, onMove, onLeave }) => {
            item.removeEventListener("mouseenter", onEnter);
            item.removeEventListener("mousemove",  onMove);
            item.removeEventListener("mouseleave", onLeave);
          });
          activeListeners = [];
        };
      });
    };

    // Wait for fonts so SplitType measurements elsewhere are correct
    if (document.fonts) {
      document.fonts.ready.then(runAnimation);
    } else {
      runAnimation();
    }

    return () => {
      isCleanedUp = true;
      mm.revert();
    };

  }, { scope: heroRef, dependencies: [isLoading] });

  const socialLinks = [
    { icon: faLinkedin,     label: "LinkedIn", href: "https://www.linkedin.com/in/ishanroy-radx/" },
    { icon: faGithub,       label: "GitHub",   href: "https://github.com/RADXIshan" },
    { icon: faEnvelope,     label: "Email",    href: "mailto:ishanroy3118107@gmail.com" },
    { icon: faFileArrowDown,label: "Resume",   href: "https://drive.google.com/file/d/1_X79WIINx7SmFOyGYLFEvio_YyIVO2nt/view?usp=sharing" },
  ];

  return (
    <div
      id="home"
      ref={heroRef}
      className="flex flex-col items-center justify-center min-h-[100svh] gap-6 px-4 sm:px-8 py-4 text-center overflow-hidden relative"
    >
      {/* Background Glow — cheaper blur on mobile */}
      <div className="bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(200px,70vw,600px)] h-[clamp(200px,70vw,600px)] bg-blue-500/5 rounded-full blur-[80px] md:blur-[140px] pointer-events-none transform-gpu" />
      <div className="bg-glow hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(200px,50vw,400px)] h-[clamp(200px,50vw,400px)] bg-zinc-400/5 rounded-full blur-[100px] pointer-events-none transform-gpu" />

      {/* Title — no overflow-hidden wrapper needed (no char-split animation) */}
      <h1
        ref={textRef}
        className="hero-title text-[clamp(3rem,12vw,15rem)] font-bold tracking-tighter leading-[1.15] z-10 whitespace-nowrap will-change-transform"
      >
        Ishan Roy
      </h1>

      <p
        ref={subtitleRef}
        className="hero-subtitle text-[clamp(0.75rem,2.5vw,1.4rem)] font-light tracking-[0.15em] sm:tracking-[0.35em] text-white/50 uppercase z-10 whitespace-nowrap"
      >
        Software Developer
      </p>

      {/*
        visibility:hidden hides without removing from layout — avoids FOUC.
        GSAP animates opacity/scale/y to show them; clearProps then returns
        control to CSS so mm.revert() never snaps them back to invisible.
      */}
      <div
        ref={socialRef}
        style={{ visibility: "hidden" }}
        className="flex gap-4 sm:gap-10 mt-6 sm:mt-8 z-10"
      >
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="group relative flex items-center justify-center w-12 h-12 sm:w-20 sm:h-20 text-white/40 hover:text-white transition-colors duration-500"
          >
            <div className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out" />
            <FontAwesomeIcon
              icon={link.icon}
              className="text-xl sm:text-4xl relative z-10 transform group-hover:scale-110 transition-transform duration-500"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Hero;
