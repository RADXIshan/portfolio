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
      className="min-h-screen w-full flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 overflow-hidden relative"
    >
      {/* Background Gradient */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-stretch justify-center gap-12 w-full max-w-7xl relative z-10">
        
        {/* Left Card: "Get in Touch" */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between p-10 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-500 hover:bg-white/10">
          <div>
            <h2 className="text-5xl sm:text-7xl font-bold mb-6 tracking-tighter">Let's Talk</h2>
            <p className="text-xl text-white/60 font-light max-w-md leading-relaxed">
              Have a project in mind or just want to say hi? I'm always open to discussing new ideas and opportunities.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-12">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:scale-110 transition-all duration-300"
              >
                <FontAwesomeIcon icon={link.icon} className="text-xl" />
              </a>
            ))}
          </div>
        </div>
        
        {/* Right Card: Form */}
        <div className="w-full lg:w-1/2 p-10 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 h-full justify-center">
            <div className="group">
              <label htmlFor="name" className="block text-sm font-medium text-white/40 mb-2 uppercase tracking-widest group-focus-within:text-white transition-colors">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Ishan Roy" 
                required 
                className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white placeholder-white/20 outline-none focus:border-white transition-colors duration-300" 
              />
            </div>
            <div className="group">
              <label htmlFor="email" className="block text-sm font-medium text-white/40 mb-2 uppercase tracking-widest group-focus-within:text-white transition-colors">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="ishan@example.com" 
                required 
                className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white placeholder-white/20 outline-none focus:border-white transition-colors duration-300" 
              />
            </div>
            <div className="group">
              <label htmlFor="message" className="block text-sm font-medium text-white/40 mb-2 uppercase tracking-widest group-focus-within:text-white transition-colors">Message</label>
              <textarea 
                id="message" 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                rows="4" 
                placeholder="Send me a message..." 
                required 
                className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white placeholder-white/20 outline-none focus:border-white transition-colors duration-300 resize-none" 
              />
            </div>
            <button 
              type="submit" 
              className="mt-4 py-4 px-8 bg-white text-black font-bold rounded-full text-lg cursor-pointer transition-all duration-300 hover:bg-gray-200 hover:scale-[1.02] active:scale-95 self-start"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;