import "../styles/Navbar.css"
import { Link, Navigate } from 'react-router';

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <img src="#" alt="logo" />
        <p>Ishan Roy</p>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  )
}

export default Navbar