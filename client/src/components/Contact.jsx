import "../styles/Contact.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  return (
    <div id='contact' className='contact'>
        <div className='left-side'>
          <h2>Get In Touch</h2>
          <p>I would love to hear from you!</p>
          <div className="contact-details">
            <a className='social-link' href='https://www.linkedin.com/in/ishanroy-radx/' target='_blank' rel='noopener noreferrer' data-label="Linkedin">
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a className='social-link' href='https://github.com/RADXIshan' target='_blank' rel='noopener noreferrer' data-label="Github">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
                <a className='social-link' href='mailto:ishanroy3118107@gmail.com' data-label="Gmail">
                    <FontAwesomeIcon icon={faEnvelope} />
                </a>
                <a className='social-link' href="tel:+919007195462" data-label="Phone">
                    <FontAwesomeIcon icon={faPhone} />
                </a>
          </div>
        </div>
        <div className="right-side">
          <form>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" required />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required />

            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="4" placeholder="Type your message here..." required></textarea>

            <button type="submit">Submit</button>
          </form>
        </div>
    </div>
  )
}

export default Contact