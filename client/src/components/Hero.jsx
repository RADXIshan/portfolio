import { gsap } from "gsap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from "react";
import SplitType from 'split-type';
import { useGSAP } from "@gsap/react";

const Hero = ({ isLoading }) => {

  const heroRef = useRef(null);
  const textRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    if (isLoading || !textRef.current || !subtitleRef.current) return;

    // Immediately hide social items to prevent FOUC before fonts.ready resolves
    gsap.set(".social-link-item", { opacity: 0 });

    const mm = gsap.matchMedia();
    let splitTitle = null;
    let subtitle = null;
    let activeListeners = [];
    let isCleanedUp = false;

    const runAnimation = () => {
      if (isCleanedUp) return;

      mm.add({
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)"
      }, (context) => {
        const { isDesktop } = context.conditions;
        const tl = gsap.timeline({
          defaults: { ease: "power4.out" }
        });

        if (isDesktop) {
          // 1. Split text into characters (Desktop only)
          splitTitle = new SplitType(textRef.current, { types: 'chars,words' });
          
          // 2. Title Animation (Mask Reveal)
          tl.fromTo(splitTitle.chars, 
            { 
              y: "110%", 
              opacity: 0,
              scaleY: 1.5,
              transformOrigin: "bottom"
            },
            {
              y: 0,
              opacity: 1,
              scaleY: 1,
              stagger: 0.03,
              duration: 1.2,
              force3D: true,
            }
          );

          // 3. Subtitle Animation
          subtitle = new SplitType(subtitleRef.current, { types: 'chars' });
          tl.from(subtitle.chars, {
              opacity: 0,
              y: 10,
              scale: 0.8,
              stagger: 0.01,
              duration: 1,
              ease: "power3.out",
              force3D: true,
          }, "-=0.8");

          // 5. Background Glow Animation (Pulsing scale on desktop only)
          gsap.set(".bg-glow", { xPercent: -50, yPercent: -50, scale: 1 });
          gsap.to(".bg-glow", {
              scale: 1.2,
              duration: 4,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              force3D: true,
          });

          // Magnetic Effect for Social Links (Only if hover is supported - desktop)
          if (window.matchMedia("(hover: hover)").matches) {
              const socialItems = gsap.utils.toArray(".social-link-item");
              socialItems.forEach(item => {
                  const xTo = gsap.quickTo(item, "x", { duration: 1, ease: "elastic.out(1, 0.3)", force3D: true });
                  const yTo = gsap.quickTo(item, "y", { duration: 1, ease: "elastic.out(1, 0.3)", force3D: true });

                  let rect = null;

                  const handleMouseEnter = () => {
                      rect = item.getBoundingClientRect();
                  };

                  const handleMouseMove = (e) => {
                      if (!rect) {
                          rect = item.getBoundingClientRect();
                      }
                      const { clientX, clientY } = e;
                      const x = clientX - (rect.left + rect.width / 2);
                      const y = clientY - (rect.top + rect.height / 2);
                      xTo(x * 0.3);
                      yTo(y * 0.3);
                  };

                  const handleMouseLeave = () => {
                      rect = null;
                      xTo(0);
                      yTo(0);
                  };

                  item.addEventListener("mouseenter", handleMouseEnter);
                  item.addEventListener("mousemove", handleMouseMove);
                  item.addEventListener("mouseleave", handleMouseLeave);
                  activeListeners.push({ item, handleMouseEnter, handleMouseMove, handleMouseLeave });
              });
          }
        } else {
          // Mobile Animation (Single line opacity and simple reveal)
          tl.fromTo(textRef.current,
            {
              y: "30%",
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1.0,
              ease: "power4.out",
              force3D: true,
            }
          );

          tl.fromTo(subtitleRef.current,
            {
              y: 15,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              force3D: true,
            },
            "-=0.6"
          );

          // Position background glow statically (no heavy scale/pulsing on mobile)
          gsap.set(".bg-glow", { xPercent: -50, yPercent: -50, scale: 1 });
        }

        // 4. Social Links Animation (Shared, optimized stagger)
        tl.fromTo(".social-link-item",
          {
            y: isDesktop ? 30 : 15,
            opacity: 0,
            scale: isDesktop ? 0.5 : 0.8,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: isDesktop ? 0.08 : 0.05,
            duration: isDesktop ? 1 : 0.6,
            ease: isDesktop ? "elastic.out(1, 0.75)" : "power2.out",
            force3D: true,
            onComplete: () => {
              // Release GSAP's ownership of these props so they stay
              // visible even if mm.revert() or ScrollTrigger.refresh()
              // is called later (e.g. when scrolling back to the top).
              gsap.set(".social-link-item", { clearProps: "all" });
            },
          }, "-=0.6"
        );

        // Return cleanup inside the matchMedia block
        return () => {
          if (splitTitle) {
            splitTitle.revert();
            splitTitle = null;
          }
          if (subtitle) {
            subtitle.revert();
            subtitle = null;
          }
          activeListeners.forEach(({ item, handleMouseEnter, handleMouseMove, handleMouseLeave }) => {
              item.removeEventListener("mouseenter", handleMouseEnter);
              item.removeEventListener("mousemove", handleMouseMove);
              item.removeEventListener("mouseleave", handleMouseLeave);
          });
          activeListeners = [];
        };
      });
    };

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
    { icon: faLinkedin, label: "Linkedin", href: "https://www.linkedin.com/in/ishanroy-radx/" },
    { icon: faGithub, label: "Github", href: "https://github.com/RADXIshan" },
    { icon: faEnvelope, label: "Gmail", href: "mailto:ishanroy3118107@gmail.com" },
    { icon: faFileArrowDown, label: "Resume", href: "https://drive.google.com/file/d/1_X79WIINx7SmFOyGYLFEvio_YyIVO2nt/view?usp=sharing" },
  ];

  const title = "Ishan Roy";

  return (
    <div
      id="home"
      ref={heroRef}
      className="flex flex-col items-center justify-center min-h-screen gap-6 px-8 py-4 text-center overflow-hidden relative"
    >
      {/* Background Glow */}
      <div className="bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(300px,80vw,600px)] h-[clamp(300px,80vw,600px)] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none will-change-transform transform-gpu" />
      <div className="bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(200px,50vw,400px)] h-[clamp(200px,50vw,400px)] bg-zinc-400/5 rounded-full blur-[100px] pointer-events-none delay-700 will-change-transform transform-gpu" />

      <div className="overflow-hidden py-4 px-4 sm:px-10"> {/* Added responsive padding for horizontal buffer */}
        <h1 
            ref={textRef}
            className="hero-title text-[clamp(2.5rem,10vw,15rem)] font-bold tracking-tighter leading-[1.2] py-2 px-2 z-10 whitespace-nowrap will-change-transform"
        >
            {title}
        </h1>
      </div>
      
      <p 
        ref={subtitleRef}
        className="hero-subtitle text-[clamp(0.9rem,2vw,1.4rem)] font-light tracking-[0.2em] sm:tracking-[0.4em] text-white/50 uppercase z-10 whitespace-nowrap"
      >
        Software Developer
      </p>

      <div className="social-links flex gap-4 sm:gap-10 mt-8 z-10">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="social-link-item group relative flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 text-white/40 hover:text-white transition-colors duration-500"
          >
            <div className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out" />
            <FontAwesomeIcon icon={link.icon} className="text-2xl sm:text-4xl relative z-10 transform group-hover:scale-110 transition-transform duration-500" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Hero;
