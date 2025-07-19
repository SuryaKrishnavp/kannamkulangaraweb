import Navbar from '../../components/Navbar';
import { useState, useEffect } from 'react';

const HomeApplianceBusiness = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (section) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
    setActiveSection(section);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="homeappliance-business">
      <Navbar
        isScrolled={isScrolled}
        activeSection={activeSection}
        isMobileMenuOpen={isMobileMenuOpen}
        handleNavClick={handleNavClick}
        toggleMobileMenu={toggleMobileMenu}
      />
      <div className="section-header">
        <h2>Home Appliance Division</h2>
        <p>Innovative solutions for modern homes</p>
      </div>
      <div className="homeappliance-content">
        <div className="homeappliance-hero">
          <div className="homeappliance-hero-text">
            <h3>Smart Home Solutions</h3>
            <p>We bring cutting-edge technology and innovative design to create appliances that make your home smarter, more efficient, and more comfortable. Our products combine functionality with style.</p>
          </div>
          <div className="homeappliance-hero-stats">
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Product Varieties</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15,000+</div>
              <div className="stat-label">Installations</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support Available</div>
            </div>
          </div>
        </div>
        <div className="homeappliance-products">
          <h3>Our Product Categories</h3>
          <div className="products-grid">
            <div className="product-card card">
              <div className="product-icon">🍳</div>
              <h4>Kitchen Appliances</h4>
              <p>Modern kitchen appliances including refrigerators, washing machines, dishwashers, and cooking equipment.</p>
            </div>
            <div className="product-card card">
              <div className="product-icon">🏠</div>
              <h4>Smart Home Systems</h4>
              <p>Integrated smart home solutions for lighting, security, climate control, and entertainment.</p>
            </div>
            <div className="product-card card">
              <div className="product-icon">⚡</div>
              <h4>Energy Efficient Products</h4>
              <p>Eco-friendly appliances designed to reduce energy consumption and environmental impact.</p>
            </div>
            <div className="product-card card">
              <div className="product-icon">🔧</div>
              <h4>After-Sales Support</h4>
              <p>Comprehensive maintenance and repair services to ensure long-lasting performance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeApplianceBusiness 