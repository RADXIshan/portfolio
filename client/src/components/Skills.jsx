import "../styles/Skills.css";
import { useEffect } from "react";
import express from "../assets/express.png";
import react from "../assets/react.png";
import node from "../assets/node.png";
import python from "../assets/python.png";
import java from "../assets/java.png";
import javascript from "../assets/javascript.png";
import tailwind from "../assets/tailwind.png";
import git from "../assets/git.png";
import bootstrap from "../assets/bootstrap.png";
import restapi from "../assets/restapi.png";
import postman from "../assets/postman.png";
import xampp from "../assets/xampp.png";
import postgres from "../assets/postgres.png";
import mongodb from "../assets/mongodb.png";
import mysql from "../assets/mysql.png";
import next from "../assets/next.png";
import vscode from "../assets/vscode.png";
import gsap from "../assets/gsap.png";
import github from "../assets/github.png";

const Skills = () => {
  useEffect(() => {
    const elems = document.querySelectorAll(".elem");

    elems.forEach((elem) => {
      const info = elem.querySelector(".info");

      const handleMouseMove = (e) => {
        const rect = elem.getBoundingClientRect();
        info.style.left = `${e.clientX - rect.left}px`;
        info.style.top = `${e.clientY - rect.top}px`;
      };

      const handleMouseEnter = () => {
        info.style.opacity = 1;
        info.style.transform = "translate(-50%, -50%) scale(1)";
      };

      const handleMouseLeave = () => {
        info.style.opacity = 0;
        info.style.transform = "translate(-50%, -50%) scale(0.8)";
      };

      elem.addEventListener("mousemove", handleMouseMove);
      elem.addEventListener("mouseenter", handleMouseEnter);
      elem.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        elem.removeEventListener("mousemove", handleMouseMove);
        elem.removeEventListener("mouseenter", handleMouseEnter);
        elem.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, []);

  return (
    <div id="skills" className="skills">
      <h2>Skills</h2>

      {/* Languages */}
      <div id="elem1" className="elem">
        <h3>Languages</h3>
        <div className="info">
          <p><img src={javascript} alt="javascript" /> JavaScript</p>
          <p><img src={java} alt="java" /> Java</p>
          <p><img src={python} alt="python" /> Python</p>
        </div>
      </div>

      {/* Frameworks */}
      <div id="elem2" className="elem">
        <h3>Frameworks</h3>
        <div className="info">
          <p><img src={react} alt="react" /> React</p>
          <p><img src={node} alt="node" /> Node.js</p>
          <p><img src={express} alt="express" /> Express.js</p>
          <p><img src={next} alt="next" /> Next.js</p>
        </div>
      </div>

      {/* Databases */}
      <div id="elem3" className="elem">
        <h3>Databases</h3>
        <div className="info">
          <p><img src={postgres} alt="postgres" /> PostgreSQL</p>
          <p><img src={mongodb} alt="mongodb" /> MongoDB</p>
          <p><img src={mysql} alt="mysql" /> MySQL</p>
        </div>
      </div>

      {/* Tools & Technologies */}
      <div id="elem4" className="elem">
        <h3>Tools & Technologies</h3>
        <div className="info">
          <p><img src={git} alt="git" /> Git</p>
          <p><img src={github} alt="github" /> GitHub</p>
          <p><img src={tailwind} alt="tailwind" /> Tailwind CSS</p>
          <p><img src={gsap} alt="gsap" /> GSAP</p>
          <p><img src={bootstrap} alt="bootstrap" />Bootstrap</p>
          <p><img src={vscode} alt="vscode" /> VS Code</p>
          <p><img src={postman} alt="postman" /> Postman</p>
          <p><img src={xampp} alt="xampp" /> XAMPP</p>
          <p><img src={restapi} alt="restapi" /> RESTful API</p>
        </div>
      </div>
    </div>
  );
};

export default Skills;
