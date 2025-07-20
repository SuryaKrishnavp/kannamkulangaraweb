import React, { useEffect, useState } from 'react';
import '../App.css';
import { FaLinkedin, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';

const Navbar = ({ isScrolled, activeSection, isMobileMenuOpen, handleNavClick, toggleMobileMenu, showBackArrow, onBack, minimal }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="logo">
          <img src="/logo.png" alt="Kannamkulangara Logo" className="header-logo-img" />
          <h2 className="logo-text-nowrap">
            <span className="logo-full">Kannamkulangara Home Appliances</span>
            <span className="logo-mobile">Kannamkulangara</span>
          </h2>
        </div>
        {minimal ? (
          showBackArrow && (
            <button className="back-arrow" onClick={onBack} style={{background:'none',border:'none',cursor:'pointer',marginLeft:'1rem',alignItems:'center',padding:0}} aria-label="Back to Home">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{transition:'stroke 0.2s'}} className="back-arrow-svg">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )
        ) : (
          <>
            <ul className={`nav-menu${isMobile && isMobileMenuOpen ? ' mobile-open' : ''}`}>
              <li><a href="#home" onClick={() => handleNavClick('home')} className={activeSection === 'home' ? 'active' : ''}>Home</a></li>
              <li><a href="#about" onClick={() => handleNavClick('about')} className={activeSection === 'about' ? 'active' : ''}>About Us</a></li>
              <li><a href="#categories" onClick={() => handleNavClick('categories')} className={activeSection === 'categories' ? 'active' : ''}>Categories</a></li>
              <li><a href="#brands" onClick={() => handleNavClick('brands')} className={activeSection === 'brands' ? 'active' : ''}>Partners</a></li>
              <li><a href="#chairman" onClick={() => handleNavClick('chairman')} className={activeSection === 'chairman' ? 'active' : ''}>Chairman</a></li>
              <li><a href="#contact" onClick={() => handleNavClick('contact')} className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
            </ul>
            {showBackArrow ? (
              <button className="back-arrow mobile-only" onClick={onBack} style={{background:'none',border:'none',cursor:'pointer',marginLeft:'1rem',alignItems:'center',padding:0}} aria-label="Back to Home">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{transition:'stroke 0.2s'}} className="back-arrow-svg">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            ) : (
              <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </>
        )}
      </div>
      <div className="scroll-progress"></div>
    </nav>
  );
};

export default Navbar;

/* Add to App.css or a global CSS file:
.mobile-only { display: none; }
@media (max-width: 768px) { .mobile-only { display: flex !important; } }
*/ 