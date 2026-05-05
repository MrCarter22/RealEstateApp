import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import './Navbar.css'


function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen)
    const isLoggedIn = true // hardcoded for now
  return (
    <nav className="navbar">
      
      <Link to="/" className="navBrand">
        <FaHome />
        <span>Deric Carter</span>
      </Link>
      
      <ul className="navMenu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/properties">Properties</Link></li>
        <li><Link to="/schedule">Schedule</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {isLoggedIn && (
        <li className="dropdown">
            <button onClick={toggleDropdown}>Agent ▼</button>
            {dropdownOpen && (
            <ul className="dropdownMenu">
                <li><Link to="/agent-dashboard">Dashboard</Link></li>
            </ul>
            )}
        </li>
)}
      </ul>
    </nav>
  )
}

export default Navbar