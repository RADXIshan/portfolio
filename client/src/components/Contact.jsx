import "../styles/Contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import toast from "react-hot-toast";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const contactRef = useRef(null);
  const API_URL = import.meta.env.VITE_APP_API_URL;

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const element = contactRef.current;
    gsap.fromTo(
      element,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

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

  return (
    <div id="contact" className="contact" ref={contactRef}>
      <div className="left-side">
        <h2>Get In Touch</h2>
        <p>I would love to hear from you!</p>
        <div className="contact-details">
          <a className="social-link" href="https://www.linkedin.com/in/ishanroy-radx/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a className="social-link" href="https://github.com/RADXIshan" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a className="social-link" href="mailto:ishanroy3118107@gmail.com">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
          <a className="social-link" href="tel:+919007195462">
            <FontAwesomeIcon icon={faPhone} />
          </a>
        </div>
      </div>

      <div className="right-side">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />

          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Type your message here..." required />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
