import "../styles/Footer.css";

const Footer = () => {

  const date = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>© {date} Ishan Roy. All rights reserved.</p>
    </footer>
  )
}

export default Footer