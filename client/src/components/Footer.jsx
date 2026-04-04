import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const date = new Date().getFullYear();

  const socialLinks = [
    { icon: faLinkedin, href: "https://www.linkedin.com/in/ishanroy-radx/", label: "LinkedIn" },
    { icon: faGithub, href: "https://github.com/RADXIshan", label: "GitHub" },
    { icon: faEnvelope, href: "mailto:ishanroy3118107@gmail.com", label: "Email" },
  ];

  return (
    <footer className="relative z-50 bg-[#0a0a0a] text-white py-20 px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-20">
            <h2 className="text-[clamp(3rem,10vw,10rem)] font-bold tracking-tighter leading-none mb-8 mix-blend-difference">
                LET'S BUILD <br />
                <span className="text-white/20 italic font-light">TOGETHER.</span>
            </h2>
            <a href="mailto:ishanroy3118107@gmail.com" className="text-xl md:text-2xl font-mono hover:text-purple-400 transition-colors duration-300">
                ishanroy3118107@gmail.com
            </a>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-white/5">
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
