import { FaHome } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { isAuthenticated, logout } from '../api/auth'
import './Navbar.css'


function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen)
    const loggedIn = isAuthenticated()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        setDropdownOpen(false)
        navigate('/agent-login')
    }

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
        <li className="dropdown">
            <button onClick={toggleDropdown}>Agent ▼</button>
            {dropdownOpen && (
            <ul className="dropdownMenu">
                {loggedIn ? (
                <>
                    <li><Link to="/agent-dashboard" onClick={() => setDropdownOpen(false)}>Dashboard</Link></li>
                    <li><button onClick={handleLogout}>Log Out</button></li>
                </>
                ) : (
                    <li><Link to="/agent-login" onClick={() => setDropdownOpen(false)}>Log In</Link></li>
                )}
            </ul>
            )}
        </li>
      </ul>
    </nav>
  )
}

export default Navbar