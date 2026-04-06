import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const date = new Date().getFullYear();

  const socialLinks = [
    { icon: faLinkedin, href: "https://www.linkedin.com/in/ishanroy-radx/", label: "LinkedIn" },
    { icon: faGithub, href: "https://github.com/RADXIshan", label: "GitHub" },
    { icon: faEnvelope, href: "mailto:ishanroy3118107@gmail.com", label: "Email" },
  ];

  const footerRef = useRef(null);

  useGSAP(() => {
    // Big Headline Reveal
    const splitText = new SplitType(".footer-headline", { types: "chars,words" });
    
    gsap.fromTo(splitText.chars, {
      y: 100,
      opacity: 0,
      rotateX: -90,
    }, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      stagger: 0.02,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".footer-headline",
        start: "top 95%",
        toggleActions: "play none none reset",
      },
    });

    // Email Reveal
    gsap.fromTo(".footer-email", {
      y: 20,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay: 0.5,
      scrollTrigger: {
        trigger: ".footer-email",
        start: "top 95%",
        toggleActions: "play none none reset",
      },
    });

    // Bottom Bar Stagger
    gsap.fromTo(".footer-bottom > *", {
      y: 30,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".footer-bottom",
        start: "top 98%",
        toggleActions: "play none none reset",
      },
    });

    ScrollTrigger.refresh();
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="relative z-50 bg-[#0a0a0a] text-white py-20 px-8 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-20">
            <h2 className="footer-headline text-[clamp(3rem,10vw,10rem)] font-bold tracking-tighter leading-none mb-8 mix-blend-difference">
                LET'S BUILD <br />
                <span className="text-white/20 italic font-light">TOGETHER.</span>
            </h2>
            <a href="mailto:ishanroy3118107@gmail.com" className="footer-email text-xl md:text-2xl font-mono hover:text-purple-400 transition-colors duration-300 inline-block">
                ishanroy3118107@gmail.com
            </a>
        </div>

        <div className="footer-bottom flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-white/5">
          {/* Brand / Copyright */}
          <div className="text-center md:text-left">
            <p className="text-white/30 text-sm font-mono tracking-widest uppercase">
              © {date} Ishan Roy — India
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-8">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="group flex flex-col items-center gap-2 text-white/40 hover:text-white transition-all duration-300"
              >
                <FontAwesomeIcon icon={link.icon} className="text-xl group-hover:-translate-y-1 transition-transform duration-300" />
                <span className="text-[10px] font-mono tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {link.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
