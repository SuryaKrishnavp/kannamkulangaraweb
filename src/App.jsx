import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './Home'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import KitchenAppliancesPage from './pages/business/KitchenAppliancesPage';
import EssentialFurniturePage from './pages/business/EssentialFurniturePage';
import ElectronicGadgetsPage from './pages/business/ElectronicGadgetsPage';
import AfterSalesSupportPage from './pages/business/AfterSalesSupportPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';

// Business subpages (reuse previous code or create simple placeholders)
const HomeAppliancePage = () => (
  <div className="business-detail-page">
    <nav className="business-detail-navbar">
      <div className="container">
        <div className="logo">Kannamkulangara Home Appliances</div>
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    </nav>
    <div className="business-detail-hero">
      <span className="icon">🏠</span>
      <h1>Home Appliance Division</h1>
      <p>Innovative solutions for modern homes.</p>
    </div>
    <div className="business-detail-content">
      <div className="business-detail-cards">
        <div className="business-detail-card">
          <span className="icon">🍳</span>
          <h3>Kitchen Appliances</h3>
          <p>Modern kitchen appliances including refrigerators, washing machines, dishwashers, and cooking equipment.</p>
        </div>
        <div className="business-detail-card">
          <span className="icon">🏠</span>
          <h3>Smart Home Systems</h3>
          <p>Integrated smart home solutions for lighting, security, climate control, and entertainment.</p>
        </div>
        <div className="business-detail-card">
          <span className="icon">⚡</span>
          <h3>Energy Efficient Products</h3>
          <p>Eco-friendly appliances designed to reduce energy consumption and environmental impact.</p>
        </div>
        <div className="business-detail-card">
          <span className="icon">🔧</span>
          <h3>After-Sales Support</h3>
          <p>Comprehensive maintenance and repair services to ensure long-lasting performance.</p>
        </div>
      </div>
    </div>
  </div>
)

function App() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: false, // Allow animation every time element enters viewport
      offset: 40,
      easing: 'ease-in-out',
      disable: false // Always enable AOS, even on mobile
    })
  }, [])
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home-appliance" element={<HomeAppliancePage />} />
          <Route path="/kitchen-appliances" element={<KitchenAppliancesPage />} />
          <Route path="/essential-furniture" element={<EssentialFurniturePage />} />
          <Route path="/electronic-gadgets" element={<ElectronicGadgetsPage />} />
          <Route path="/after-sales-support" element={<AfterSalesSupportPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        </Routes>
      </Router>
    </div>
  )
}

function useScrollAnimations() {
  const location = useLocation();
  useEffect(() => {
    const selectors = [
      '.about', '.chairman-message', '.business', '.journey', '.testimonials', '.section-header',
      '.business-card', '.timeline-item', '.testimonial-card'
    ]
    const elements = Array.from(document.querySelectorAll(selectors.join(',')))
    const observer = new window.IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    elements.forEach(el => {
      if (!el.classList.contains('animate')) {
        observer.observe(el)
      }
    })
    return () => observer.disconnect()
  }, [location.pathname])
}

function AppWithRouter() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Add/remove .menu-open class to body when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }
    return () => document.body.classList.remove('menu-open')
  }, [isMobileMenuOpen])

  // Only handle scroll progress and active section (not animations)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      const scrollProgress = document.querySelector('.scroll-progress')
      if (scrollProgress) {
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const scrollPercent = (scrollTop / docHeight) * 100
        scrollProgress.style.width = `${scrollPercent}%`
      }
      const sections = ['home', 'about', 'business', 'journey', 'testimonials']
      const scrollPosition = window.scrollY + 100
      sections.forEach(section => {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
          }
        }
      })
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intersection Observer for scroll animations
  useScrollAnimations()

  // Scroll to section if coming from a subpage
  useEffect(() => {
    if (location.pathname === '/' && location.state && location.state.scrollTo) {
      setTimeout(() => {
        const el = document.getElementById(location.state.scrollTo)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [location])

  const handleNavClick = (section) => {
    if (location.pathname === '/') {
      const el = document.getElementById(section)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
      setIsMobileMenuOpen(false)
    } else {
      navigate('/', { state: { scrollTo: section } })
      setIsMobileMenuOpen(false)
    }
  }
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Main landing page content
  const MainPage = () => (
    <div>
      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-background">
          <div className="particles"></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            Kannamkulangara Group
            <span className="subtitle">A Legacy of Trust, A Vision for the Future</span>
          </h1>
          <p className="hero-subtext">
            From home solutions to financial services, we build businesses that build communities.
          </p>
          <button className="cta-button" onClick={() => handleNavClick('business')}>
            Explore Our Businesses
          </button>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="about" data-aos="fade-up">
        <div className="container">
          <div className="section-header">
            <h2>Who We Are</h2>
          </div>
          <div className="about-content">
            <div className="about-text">
              <p>
                For over three decades, Kannamkulangara Group has been at the forefront of innovation and excellence. 
                Our mission is to create sustainable value for our stakeholders while contributing to the growth and 
                development of our communities. We believe in building lasting relationships based on trust, integrity, 
                and mutual respect.
              </p>
              <p>
                Our core values of excellence, innovation, and community service drive everything we do. 
                As we look to the future, we remain committed to expanding our horizons while staying true 
                to the principles that have made us successful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chairman's Message */}
      <section className="chairman-message" data-aos="fade-up">
        <div className="container">
          <div className="section-header">
            <h2>From the Desk of Our Chairman</h2>
          </div>
          <div className="chairman-content">
            <div className="chairman-photo">
              <div className="photo-placeholder">
                <span>Chairman Photo</span>
              </div>
            </div>
            <div className="chairman-text">
              <div className="signature-animation">
                <span className="signature">Mr. Kannamkulangara</span>
              </div>
              <blockquote>
                "Our journey has been one of continuous growth and adaptation. We have always believed that 
                success is not just about financial returns, but about creating positive impact in the lives 
                of our customers, employees, and communities. As we move forward, we remain committed to 
                innovation, excellence, and sustainable growth."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Our Business Section */}
      <section id="business" className="business" data-aos="fade-up">
        <div className="container">
          <div className="section-header">
            <h2>Our Business</h2>
          </div>
          <div className="business-grid">
            <div className="business-card">
              <div className="business-icon">
                <i className="icon-home"></i>
              </div>
              <h3>Home Appliances</h3>
              <p>Providing innovative home solutions that make everyday life easier and more comfortable.</p>
              <Link to="/home-appliance" className="learn-more">Learn More</Link>
            </div>
            <div className="business-card">
              <div className="business-icon">
                <i className="icon-finance"></i>
              </div>
              <h3>Financial Services</h3>
              <p>Comprehensive financial solutions to help individuals and businesses achieve their goals.</p>
              <Link to="/finance" className="learn-more">Learn More</Link>
            </div>
            <div className="business-card">
              <div className="business-icon">
                <i className="icon-food"></i>
              </div>
              <h3>Food and Manufacturing</h3>
              <p>Quality food products and manufacturing solutions that meet the highest standards.</p>
              <Link to="/kairali-foods" className="learn-more">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section id="journey" className="journey" data-aos="fade-up">
        <div className="container">
          <div className="section-header">
            <h2>Our Journey</h2>
          </div>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>1990</h3>
                <h4>Company Founded</h4>
                <p>Started with a vision to create value and build lasting relationships.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>2000</h3>
                <h4>First Major Expansion</h4>
                <p>Expanded into home appliances and established strong market presence.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>2010</h3>
                <h4>Financial Services Launch</h4>
                <p>Diversified into financial services to provide comprehensive solutions.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>2020</h3>
                <h4>Digital Transformation</h4>
                <p>Embraced technology and digital solutions for enhanced customer experience.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>2024</h3>
                <h4>Future Vision</h4>
                <p>Continuing to innovate and expand while maintaining our core values.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials" data-aos="fade-up">
        <div className="container">
          <div className="section-header">
            <h2>Trusted by Thousands</h2>
          </div>
          <div className="testimonials-carousel">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Kannamkulangara Group has been our trusted partner for over 15 years. Their commitment to quality and customer service is unmatched."</p>
                <div className="testimonial-author">
                  <h4>Rajesh Kumar</h4>
                  <span>CEO, Tech Solutions Ltd.</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The financial services provided by Kannamkulangara Group have helped us grow our business significantly. Highly recommended!"</p>
                <div className="testimonial-author">
                  <h4>Priya Sharma</h4>
                  <span>Director, Green Energy Co.</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Their home appliances division has transformed our living spaces. Quality products with excellent after-sales support."</p>
                <div className="testimonial-author">
                  <h4>Anil Patel</h4>
                  <span>Homeowner</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#home" onClick={() => handleNavClick('home')}>Home</a></li>
                <li><a href="#about" onClick={() => handleNavClick('about')}>About</a></li>
                <li><a href="#business" onClick={() => handleNavClick('business')}>Our Business</a></li>
                <li><a href="#contact" onClick={() => handleNavClick('contact')}>Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Contact Information</h3>
              <p><strong>Address:</strong><br />
              Kannamkulangara Group<br />
              123 Business District<br />
              Kerala, India 682001</p>
              <p><strong>Phone:</strong> +91 123 456 7890</p>
              <p><strong>Email:</strong> info@kannamkulangara.com</p>
            </div>
            <div className="footer-section">
              <h3>Follow Us</h3>
              <div className="social-links">
                <a href="#" className="social-link linkedin">LinkedIn</a>
                <a href="#" className="social-link instagram">Instagram</a>
                <a href="#" className="social-link whatsapp">WhatsApp</a>
                <a href="#" className="social-link youtube">YouTube</a>
              </div>
            </div>
            <div className="footer-section">
              <h3>Newsletter</h3>
              <div className="newsletter">
                <input type="email" placeholder="Enter your email" />
                <button type="submit">Subscribe</button>
              </div>
            </div>
          </div>
          <div className="footer-map">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.1234567890123!2d76.12345678901234!3d9.12345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDcnMjMuMCJOIDc2wrAwNycwMC4wIkU!5e0!3m2!1sen!2sin!4v1234567890123" 
              width="100%" 
              height="200" 
              style={{border: 0}} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Kannamkulangara Group. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )

  return (
    <div className="app">
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo">
            <h2>Kannamkulangara Group</h2>
          </div>
          <ul className={`nav-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <li><a href="#home" onClick={() => handleNavClick('home')} className={activeSection === 'home' ? 'active' : ''}>Home</a></li>
            <li><a href="#about" onClick={() => handleNavClick('about')} className={activeSection === 'about' ? 'active' : ''}>About</a></li>
            <li><a href="#business" onClick={() => handleNavClick('business')} className={activeSection === 'business' ? 'active' : ''}>Our Business</a></li>
            <li><a href="#journey" onClick={() => handleNavClick('journey')} className={activeSection === 'journey' ? 'active' : ''}>Our Journey</a></li>
            <li><a href="#contact" onClick={() => handleNavClick('contact')} className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
          </ul>
          <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="scroll-progress"></div>
      </nav>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/home-appliance" element={<HomeAppliancePage />} />
      </Routes>
    </div>
  )
}

export default App
