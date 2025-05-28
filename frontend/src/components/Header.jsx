import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import { motion } from 'framer-motion'
import '../styles/Header.css'

const Header = ({ toggleMobileMenu, isMobileMenuOpen }) => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <motion.div 
            className="logo-icon"
            whileHover={{ rotate: 10 }}
            transition={{ duration: 0.2 }}
          >
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 10V22C7 23.1046 7.89543 24 9 24H23C24.1046 24 25 23.1046 25 22V10C25 8.89543 24.1046 8 23 8H9C7.89543 8 7 8.89543 7 10Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M7 10L16 17L25 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
          <span className="logo-text">TempMail</span>
        </Link>
        
        <nav className="desktop-nav">
          <ul className="nav-links">
            <li><a href="https://github.com" target="_blank" rel="noopener">GitHub</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#premium" className="premium-link">Premium</a></li>
          </ul>
        </nav>
        
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
    </header>
  )
}

export default Header