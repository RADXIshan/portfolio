import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Contact = () => {
  const contactRef = useRef(null);
  const API_URL = import.meta.env.VITE_APP_API_URL;

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      className="min-h-screen flex items-center justify-center px-[6vw] gap-[3.5vw]"
    >
      {/* Left Side */}
      <div className="w-1/2 h-full flex flex-col items-center justify-center p-[5vw_2.5vw] rounded-xl backdrop-blur-md transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(0,0,0,0.6),0_0_25px_rgba(255,255,255,0.05)_inset]">
        <h2 className="text-[5.5vw] font-semibold mb-[0.5vw] tracking-wider">Get In Touch</h2>
        <p className="text-[1.5vw] text-[rgba(250,249,246,0.7)] transition-colors duration-300 hover:text-white">
          I would love to hear from you!
        </p>

        <div className="flex gap-[1.5vw] mt-[1.8vw] w-full items-center justify-center">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              data-label={link.label}
              className="relative w-14 h-14 sm:w-16 sm:h-16 text-[#c7c7c7] rounded-full flex items-center justify-center 
                         text-[clamp(1.5rem,4vw,2.2rem)] transition-all duration-300 ease-in-out
                         hover:text-white hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]
                         after:content-[attr(data-label)] after:absolute after:-bottom-[2.5vw] after:left-1/2 after:-translate-x-1/2 
                         after:text-white after:text-[1vw] after:opacity-0 after:pointer-events-none after:whitespace-nowrap 
                         after:transition-all after:duration-300 after:ease-in-out
                         hover:after:opacity-100 hover:after:-translate-y-[5px]"
            >
              <FontAwesomeIcon icon={link.icon} />
            </a>
          ))}
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 h-full flex flex-col items-center justify-center p-[5vw_2.5vw] rounded-xl backdrop-blur-md transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(0,0,0,0.6),0_0_25px_rgba(255,255,255,0.05)_inset]">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[30vw] flex flex-col gap-[1.2vw]"
        >
          <label htmlFor="name" className="self-start text-[1.3vw] text-[#FAF9F6]">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            className="w-full p-[1vw] border border-[rgba(255,255,255,0.1)] rounded-[1.5vw] bg-[rgba(255,255,255,0.02)] text-[#FAF9F6] text-[1vw] outline-none transition duration-300 focus:border-[rgba(255,255,255,0.25)] focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[0_0_12px_rgba(255,255,255,0.05),0_0_5px_#FAF9F6_inset]"
          />

          <label htmlFor="email" className="self-start text-[1.3vw] text-[#FAF9F6]">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full p-[1vw] border border-[rgba(255,255,255,0.1)] rounded-[1.5vw] bg-[rgba(255,255,255,0.02)] text-[#FAF9F6] text-[1vw] outline-none transition duration-300 focus:border-[rgba(255,255,255,0.25)] focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[0_0_12px_rgba(255,255,255,0.05),0_0_5px_#FAF9F6_inset]"
          />

          <label htmlFor="message" className="self-start text-[1.3vw] text-[#FAF9F6]">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            placeholder="Type your message here..."
            required
            className="w-full p-[1vw] border border-[rgba(255,255,255,0.1)] rounded-[1.5vw] bg-[rgba(255,255,255,0.02)] text-[#FAF9F6] text-[1vw] outline-none transition duration-300 focus:border-[rgba(255,255,255,0.25)] focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[0_0_12px_rgba(255,255,255,0.05),0_0_5px_#FAF9F6_inset]"
          />

          <button
            type="submit"
            className="mt-2 py-[1vw] px-[2vw] bg-gradient-to-r from-[#FAF9F6] to-[#d6d6d6] text-[#131313] font-semibold border-none rounded-[1.5vw] text-[1.1vw] cursor-pointer transition duration-300 hover:from-white hover:to-[#e4e4e4] hover:-translate-y-[3px] hover:scale-[1.03] hover:shadow-[0_5px_15px_rgba(255,255,255,0.1)]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
