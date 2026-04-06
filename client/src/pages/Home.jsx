import { Toaster } from "react-hot-toast";
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const Home = ({ isLoading }) => {

  const mainRef = useRef(null);
  const [activeSection, setActiveSection] = useState("home");

  useGSAP(() => {
    const sections = [
      { id: "home", color: "#0a0a0a" },
      { id: "about", color: "#0a0a0a" },
      { id: "skills", color: "#0a0a0a" },
      { id: "projects", color: "#0a0a0a" },
      { id: "contact", color: "#0a0a0a" },
    ];

    sections.forEach(({ id, color }) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => {
          gsap.to(document.body, { "--bg-color": color, duration: 0.8 });
          setActiveSection(id);
        },
        onEnterBack: () => {
          gsap.to(document.body, { "--bg-color": color, duration: 0.8 });
          setActiveSection(id);
        },
      });
    });
  }, { scope: mainRef });

  return (
    <main ref={mainRef}>
      <Navbar activeSection={activeSection} />
      <Hero isLoading={isLoading} />

      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />    

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </main>
  );
};

export default Home;