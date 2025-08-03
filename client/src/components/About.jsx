import "../styles/About.css"
import aboutImage from "../assets/ishan.jpg"

const About = () => {
  return (
    <div id='about' className="about">
        <div className="about-leftSide">
          <img src={aboutImage} alt="About" />
        </div>
        <div className="about-rightSide">
          <h1>About</h1>
          <p>Hello! I'm Ishan Roy, a passionate web developer with a love for creating dynamic and user-friendly websites. I have a strong foundation in HTML, CSS, and JavaScript, and I'm always eager to learn new technologies and frameworks.</p>
        </div>
    </div>
  )
}

export default About