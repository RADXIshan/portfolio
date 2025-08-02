import "../styles/Hero.css";
import { gsap } from "gsap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from "react";

const Hero = () => {
    const heroRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const elements = gsap.utils.toArray('.hero-title, .hero-subtitle, .social-links');
            
            gsap.from(elements, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: 0.3,
                stagger: 0.2, 
                ease: "power3.out",
            });
        }, heroRef); 

        return () => ctx.revert(); 
    }, []);

    return (
        <div className='hero' id='hero' ref={heroRef}>
            <h1 className="hero-title">Ishan Roy</h1>
            <p className="hero-subtitle">I am a Software Developer</p>
            <div className='social-links'>
                <a className='social-link' href='https://www.linkedin.com/in/ishanroy-radx/' target='_blank' rel='noopener noreferrer' data-label="Linkedin">
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a className='social-link' href='https://github.com/RADXIshan' target='_blank' rel='noopener noreferrer' data-label="Github">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
                <a className='social-link' href='mailto:ishanroy3118107@gmail.com' data-label="Gmail">
                    <FontAwesomeIcon icon={faEnvelope} />
                </a>
                <a className='social-link' href="https://drive.google.com/file/d/1qezM_fIhEwKwdKJ8hg7-7LZNIdMpeeZM/view?usp=sharing" target='_blank' rel='noopener noreferrer' data-label="Resume">
                    <FontAwesomeIcon icon={faFileArrowDown} />
                </a>
            </div>
        </div>
    );
}

export default Hero;