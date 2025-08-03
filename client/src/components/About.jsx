import "../styles/About.css"
import aboutImage from "../assets/ishan.jpg"

const About = () => {
  return (
    <div id='about' className="about">
        <div className="about-leftSide">
          <img src={aboutImage} alt="About" />
        </div>
        <div className="about-rightSide">
          <h1>About Me</h1>
          <p>Hi, I’m Ishan Roy, a FullStack Developer passionate about transforming ideas into impactful, real world products. I specialize in building scalable, intuitive, and user friendly web applications. Driven by curiosity, I’m constantly exploring new technologies and refining my skills to craft solutions that truly make a difference.</p>
        </div>
    </div>
  )
}

export default About