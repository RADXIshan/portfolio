import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const date = new Date().getFullYear();

  const socialLinks = [
    { icon: faLinkedin, href: "https://www.linkedin.com/in/ishanroy-radx/", label: "LinkedIn" },
    { icon: faGithub, href: "https://github.com/RADXIshan", label: "GitHub" },
    { icon: faEnvelope, href: "mailto:ishanroy3118107@gmail.com", label: "Email" },
  ];

  return (
    <footer className="relative z-50 bg-black/20 backdrop-blur-lg border-t border-white/5 text-white py-16 px-8 pb-24 md:pb-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand / Copyright */}
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold tracking-tighter mb-2">Ishan Roy</h3>
          <p className="text-white/40 text-sm">
            © {date} All rights reserved.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-6">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-white/60 hover:text-white transition-colors duration-300 transform hover:scale-110"
            >
              <FontAwesomeIcon icon={link.icon} className="text-xl" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
