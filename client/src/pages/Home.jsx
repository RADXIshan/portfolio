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
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const mainRef = useRef(null);

  useGSAP(() => {
    const sections = [
      { id: "#home", color: "#0a0a0a" },
      { id: "#about", color: "#1a1a1a" },
      { id: "#skills", color: "#0f0f0f" },
      { id: "#projects", color: "#131313" },
      { id: "#contact", color: "#050505" },
    ];

    sections.forEach(({ id, color }) => {
      ScrollTrigger.create({
        trigger: id,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => gsap.to("body", { "--bg-color": color, duration: 0.8 }),
        onEnterBack: () => gsap.to("body", { "--bg-color": color, duration: 0.8 }),
      });
    });
  }, { scope: mainRef });

  return (
    <main ref={mainRef}>
      <Navbar />
      <Hero />
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
  )
}

export default Home