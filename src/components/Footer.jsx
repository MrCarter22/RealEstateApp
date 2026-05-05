import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import './Footer.css'
function Footer() {
  return (
    <footer className="footer">
      <div className="footerContent">
        <div className="footerLeft">
          <p>Phone: (281)-744-2361</p>
          <p>Email: dericcarter@hotmail.com</p>
          <p>License: 123456789</p>
        </div>
        <nav>
          <Link to="/about">About</Link>
          <Link to="/schedule">Schedule</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <div className="socialIcons">
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaInstagram /></a>
          <a href="https://www.linkedin.com/in/deric-carter-3740a812/" target="_blank"><FaLinkedin /></a>
        </div>
      </div>
      <p className="footerBottom">© 2026 Real Estate. All rights reserved.</p>
    </footer>
  )
}

export default Footer;