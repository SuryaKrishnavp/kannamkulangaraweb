import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar';
import AOS from 'aos';
import 'aos/dist/aos.css';

function useScrollAnimations() {
  const location = useLocation();
  useEffect(() => {
    const selectors = [
      '.category-card', '.scheme-card', '.feature-card', '.about-content-grid > *', '.chairman-content-grid > *', '.brand-logo', '.section-header'
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

const applianceCategories = [
  {
    name: 'Kitchen Appliances',
    image: '/kitchenappliances.png',
    description: 'Refrigerators, ovens, dishwashers, and more for a modern kitchen.'
  },
  {
    name: 'Essential Furnitures',
    image: '/essentialfurniture.png',
    description: 'Chairs, tables, beds, and more for comfortable living.'
  },
  
  {
    name: 'Electronic Gadgets',
    image: '/electronicgadjets.png',
    description: 'Smartphones, laptops, smart TVs, and more.'
  },
  {
    name: 'After-Sales Support',
    image: '/aftersalessupport.png',
    description: 'Comprehensive maintenance and repair services.'
  }
]

const categoryRoutes = [
  '/kitchen-appliances',
  '/essential-furniture',
  '/electronic-gadgets',
  '/after-sales-support'
];

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      const scrollProgress = document.querySelector('.scroll-progress')
      if (scrollProgress) {
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        if (docHeight > 0) {
          const scrollPercent = (scrollTop / docHeight) * 100
          scrollProgress.style.width = `${scrollPercent}%`
        } else {
          scrollProgress.style.width = '0%'
        }
      }
      const sections = ['home', 'about', 'categories', 'brands', 'chairman', 'contact']
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
    // Initialize scroll progress bar on mount
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }
    return () => document.body.classList.remove('menu-open')
  }, [isMobileMenuOpen])

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      offset: 40,
      easing: 'ease-in-out',
      disable: function() {
        return window.innerWidth < 480;
      }
    });
    AOS.refresh();
  }, []);

  useEffect(() => {
    function setVh() {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    }
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  useScrollAnimations()

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

  return (
    <div className="app">
      {/* Navigation */}
      <Navbar
        isScrolled={isScrolled}
        activeSection={activeSection}
        isMobileMenuOpen={isMobileMenuOpen}
        handleNavClick={handleNavClick}
        toggleMobileMenu={toggleMobileMenu}
      />
      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-background">
          <img src="/webback.webp" alt="Hero background" className="hero-img" />
        </div>
        <div className="hero-content animate" data-aos="fade-up" data-aos-duration="1200">
          <h1 className="hero-title" data-aos="fade-down" data-aos-delay="200">Welcome to Kannamkulangara Home Appliances
            <span className="subtitle" data-aos="fade-left" data-aos-delay="400">Modern Living Starts Here</span>
          </h1>
          <p className="hero-subtext" data-aos="fade-up" data-aos-delay="600">
            Discover the best in home appliances, smart systems, and energy-saving solutions for your home.
          </p>
          <button className="cta-button" onClick={() => handleNavClick('categories')} data-aos="zoom-in" data-aos-delay="800">
            Shop Categories
          </button>
        </div>
        <div className="scroll-indicator" data-aos="fade-up" data-aos-delay="1000">
          <div className="scroll-arrow"></div>
        </div>
      </section>
      {/* About Us Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="section-header">
            <h2>About Us</h2>
          </div>
          <div className="about-content-grid">
            <div className="about-text">
              <p>
                Kannamkulangara Home Appliances is dedicated to bringing the latest in home technology and comfort to families across India. With a legacy of trust and innovation, we offer a wide range of appliances and smart solutions designed to make your life easier, more efficient, and more enjoyable.
              </p>
              <p>
                Our mission is to deliver quality, reliability, and style in every product, while providing exceptional customer service and after-sales support. We believe in making modern living accessible to everyone.
              </p>
            </div>
            <div className="about-image">
              <img src="/logo.png" alt="About Kannamkulangara Home Appliances Logo" className="about-logo-img" />
            </div>
          </div>
        </div>
      </section>
      {/* Categories Section */}
      <section id="categories" className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Shop by Category</h2>
          </div>
          <div className="categories-grid">
            {applianceCategories.map((cat, idx) => (
              <div className="category-card" key={cat.name} data-aos="fade-up" data-aos-delay={`${idx * 100 + 200}`}>
                <img src={cat.image} alt={cat.name} className="category-img" />
                <h3>{cat.name}</h3>
                <p>{cat.description}</p>
                <Link to={categoryRoutes[idx]} className="learn-more">Explore</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Purchase Schemes Section */}
      <section id="purchase-schemes" className="purchase-schemes-section">
        <div className="container">
          <div className="section-header">
            <h2>Purchase Schemes</h2>
            <p>Flexible and customer-friendly payment options for every need</p>
          </div>
          <div className="schemes-grid">
            <div className="scheme-card" data-aos="fade-up" data-aos-delay="200">
              <span className="scheme-icon">💰</span>
              <h4>Ready Cash Payment</h4>
              <p>Pay the full amount upfront and enjoy instant ownership of your appliance.</p>
            </div>
            <div className="scheme-card" data-aos="fade-up" data-aos-delay="300">
              <span className="scheme-icon">📆</span>
              <h4>10 Week EMI</h4>
              <p>Spread your payments over 10 weeks with zero hassle and easy approval.</p>
            </div>
            <div className="scheme-card" data-aos="fade-up" data-aos-delay="400">
              <span className="scheme-icon">🗓️</span>
              <h4>6 Months EMI (Low Interest)</h4>
              <p>Enjoy your appliance now and pay over 6 months with a very low interest rate.</p>
            </div>
            <div className="scheme-card" data-aos="fade-up" data-aos-delay="500">
              <span className="scheme-icon">🤝</span>
              <h4>Customer Friendly EMI Schemes</h4>
              <p>Choose from a variety of EMI plans designed to suit your budget and needs.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Brand Partners Section */}
      <section id="brands" className="brands-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Brand Partners</h2>
            <p>We offer products from the world's leading home appliance brands</p>
          </div>
          <div className="brands-logos-grid">
            <img src="/lglogo.png" alt="LG" className="brand-logo" />
            <img src="/samsunglogo.svg" alt="Samsung" className="brand-logo" />
            <img src="/whirpool logo.svg" alt="Whirlpool" className="brand-logo" />
            <img src="/godrejlogo.png" alt="Godrej" className="brand-logo" />
            <img src="/sujathalogo.png" alt="Sujatha" className="brand-logo" />
            <img src="/ushalogo.svg" alt="Usha" className="brand-logo" />
            {/* Add more logos here if you add more files */}
          </div>
        </div>
      </section>
      {/* Chairman's Message & Vision Section */}
      <section id="chairman" className="chairman-section">
        <div className="container">
          <div className="section-header">
            <h2>Chairman's Message & Vision</h2>
          </div>
          <div className="chairman-content-grid">
            <div className="chairman-photo">
              <img src="/chairman.jpg" alt="Chairman" className="chairman-img" />
            </div>
            <div className="chairman-message-text">
              <blockquote>
                "At Kannamkulangara Home Appliances, our vision is to empower every home with smart, sustainable, and beautiful solutions. We are committed to innovation, quality, and customer satisfaction. Thank you for trusting us to be a part of your home."
              </blockquote>
              <div className="chairman-signature">
                <span>SALESH K C</span>
                <div className="chairman-title">Chairman & Founder</div>
              </div>
              <div className="vision-statement">
                <h4>Our Vision</h4>
                <p>
                  To be the most trusted and innovative home appliances brand, making modern living accessible and enjoyable for all.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="container">
          <div className="footer-content-grid">
            <div className="footer-brand">
              <h2>Kannamkulangara Home Appliances</h2>
              <p>Modern Living Starts Here</p>
            </div>
            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home" onClick={() => handleNavClick('home')}>Home</a></li>
                <li><a href="#about" onClick={() => handleNavClick('about')}>About Us</a></li>
                <li><a href="#categories" onClick={() => handleNavClick('categories')}>Categories</a></li>
                <li><a href="#brands" onClick={() => handleNavClick('brands')}>Partners</a></li>
                <li><a href="#chairman" onClick={() => handleNavClick('chairman')}>Chairman</a></li>
                <li><a href="#contact" onClick={() => handleNavClick('contact')}>Contact</a></li>
                <li><a href="/privacy-policy" style={{cursor:'pointer'}}>Privacy Policy</a></li>
                <li><a href="/terms-and-conditions" style={{cursor:'pointer'}}>Terms & Conditions</a></li>
              </ul>
            </div>
            <div className="footer-contact">
              <h4>Contact</h4>
              <p>Thalore, Thaikkatusseri road<br />Thrissur, Kerala</p>
              <p>Phone: 8891966806</p>
              <p>Email: info@kannamkulangara.com</p>
            </div>
            <div className="footer-social">
              <h4>Follow Us</h4>
              <div className="social-links">
                <a href="https://www.linkedin.com/" className="social-link" target="_blank" rel="noopener" aria-label="LinkedIn">
                  {/* LinkedIn SVG */}
                  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
                </a>
                <a href="https://www.instagram.com/kannamkulangara_homeappliances/" className="social-link" target="_blank" rel="noopener" aria-label="Instagram">
                  {/* Instagram SVG */}
                  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.782 2.225 7.148 2.163 8.414 2.105 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.771.128 4.659.388 3.678 1.37 2.697 2.351 2.437 3.463 2.379 4.744 2.321 6.024 2.309 6.433 2.309 12c0 5.567.012 5.976.07 7.256.058 1.281.318 2.393 1.299 3.374.981.981 2.093 1.241 3.374 1.299 1.28.058 1.689.07 7.256.07s5.976-.012 7.256-.07c1.281-.058 2.393-.318 3.374-1.299.981-.981 1.241-2.093 1.299-3.374.058-1.28.07-1.689.07-7.256s-.012-5.976-.07-7.256c-.058-1.281-.318-2.393-1.299-3.374C21.393.388 20.281.128 19 .07 17.72.012 17.311 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
                </a>
                <a href="https://wa.me/918891966806" className="social-link" target="_blank" rel="noopener" aria-label="WhatsApp">
                  {/* WhatsApp SVG */}
                  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.63A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.68-.5-5.25-1.44l-.37-.22-3.69.97.99-3.59-.24-.37A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.27-7.4c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.19-.34.21-.63.07-.29-.15-1.22-.45-2.33-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.54-.88-2.11-.23-.56-.47-.48-.64-.49-.17-.01-.36-.01-.56-.01-.19 0-.5.07-.76.36-.26.29-1 1-.99 2.43.01 1.43 1.03 2.81 1.18 3.01.15.19 2.03 3.1 4.92 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.7-.7 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.34z"/></svg>
                </a>
                <a href="https://www.youtube.com/" className="social-link" target="_blank" rel="noopener" aria-label="YouTube">
                  {/* YouTube SVG */}
                  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.458 3.5 12 3.5 12 3.5s-7.458 0-9.386.574A2.994 2.994 0 0 0 .502 6.186C0 8.114 0 12 0 12s0 3.886.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.542 20.5 12 20.5 12 20.5s7.458 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 15.886 24 12 24 12s0-3.886-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Kannamkulangara Home Appliances. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home 