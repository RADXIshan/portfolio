import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Contact = () => {
  const contactRef = useRef(null);
  const API_URL = import.meta.env.VITE_APP_API_URL || "";
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!API_URL) {
      toast.error("API endpoint is not configured.");
      return;
    }
    const toastId = toast.loading("Sending message...");
    try {
      const response = await axios.post(`${API_URL}/api/contact`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success(response.data.message || "Message sent!", { id: toastId });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.response?.data?.error || "An unexpected error occurred", { id: toastId });
    }
  };

  const socialLinks = [
    { icon: faLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/ishanroy-radx/" },
    { icon: faGithub, label: "GitHub", href: "https://github.com/RADXIshan" },
    { icon: faEnvelope, label: "Email", href: "mailto:ishanroy3118107@gmail.com" },
    { icon: faPhone, label: "Phone", href: "tel:+919007195462" },
  ];

  return (
    <div
      id="contact"
      ref={contactRef}
      // The parent ensures vertical centering for the content inside
      className="min-h-screen w-full flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* KEY CHANGES HERE:
        - Removed h-[40vh] to allow height to be determined by content.
        - The container is now h-auto by default.
        - Gap is now responsive: smaller on mobile (gap-8), larger on desktop (md:gap-12).
      */}
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-12 w-full max-w-6xl">
        
        {/* Left Card: "Get in Touch"
          - Removed h-full. The height will now adapt to its content.
          - items-stretch on the parent div above makes this card match the height of the form card on desktop.
        */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center p-8 rounded-xl backdrop-blur-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(0,0,0,0.6),0_0_25px_rgba(255,255,255,0.05)_inset]">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-2 tracking-wider">Get In Touch</h2>
          <p className="text-lg text-[rgba(250,249,246,0.7)] transition-colors duration-300 hover:text-white">
            I would love to hear from you!
          </p>

          <div className="flex flex-wrap gap-6 mt-8 w-full items-center justify-center">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                data-label={link.label}
                className="relative w-16 h-16 text-[#c7c7c7] rounded-full flex items-center justify-center 
                           text-[clamp(1.8rem,5vw,2.5rem)] transition-all duration-300 ease-in-out
                           hover:text-white hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]
                           after:content-[attr(data-label)] after:absolute after:-bottom-10 after:left-1/2 after:-translate-x-1/2 
                           after:text-white after:text-sm after:opacity-0 after:pointer-events-none after:whitespace-nowrap 
                           after:transition-all after:duration-300 after:ease-in-out
                           hover:after:opacity-100 hover:after:-translate-y-1"
              >
                <FontAwesomeIcon icon={link.icon} />
              </a>
            ))}
          </div>
        </div>
        
        {/* Right Card: Form
          - Removed h-full. The form now dictates its own height, preventing overflow.
        */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 rounded-xl backdrop-blur-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(0,0,0,0.6),0_0_25px_rgba(255,255,255,0.05)_inset]">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md flex flex-col gap-5"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#FAF9F6] mb-1">Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required className="w-full p-3 border border-[rgba(255,255,255,0.1)] rounded-lg bg-[rgba(255,255,255,0.02)] text-[#FAF9F6] text-base outline-none transition duration-300 focus:border-[rgba(255,255,255,0.25)] focus:bg-[rgba(255,255,255,0.06)] focus:ring-1 focus:ring-white/20" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#FAF9F6] mb-1">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required className="w-full p-3 border border-[rgba(255,255,255,0.1)] rounded-lg bg-[rgba(255,255,255,0.02)] text-[#FAF9F6] text-base outline-none transition duration-300 focus:border-[rgba(255,255,255,0.25)] focus:bg-[rgba(255,255,255,0.06)] focus:ring-1 focus:ring-white/20" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#FAF9F6] mb-1">Message</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Type your message here..." required className="w-full p-3 border border-[rgba(255,255,255,0.1)] rounded-lg bg-[rgba(255,255,255,0.02)] text-[#FAF9F6] text-base outline-none transition duration-300 focus:border-[rgba(255,255,255,0.25)] focus:bg-[rgba(255,255,255,0.06)] focus:ring-1 focus:ring-white/20" />
            </div>
            <button type="submit" className="mt-2 py-3 px-6 bg-gradient-to-r from-[#FAF9F6] to-[#d6d6d6] text-[#131313] font-semibold border-none rounded-lg text-base cursor-pointer transition duration-300 hover:from-white hover:to-[#e4e4e4] hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_5px_15px_rgba(255,255,255,0.1)] active:scale-100 active:translate-y-0">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;