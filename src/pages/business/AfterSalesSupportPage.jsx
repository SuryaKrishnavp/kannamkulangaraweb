import Navbar from '../../components/Navbar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AfterSalesSupportPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
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

  const supportProducts = [
    { name: 'Installation Service', image: '/services/installation.png' },
    { name: 'Maintenance', image: '/services/maintenance.png' },
    { name: 'Warranty Service', image: '/services/warrenty.png' },
    { name: 'Customer Helpline', image: '/services/helpline.png' },
    // ...add up to 50 products
  ];
  const whatsappNumber = '8891966806';
  const [search, setSearch] = useState('');
  const filteredProducts = supportProducts.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="after-sales-support-page" style={{paddingTop:80}}>
      <Navbar
        isScrolled={isScrolled}
        activeSection={activeSection}
        isMobileMenuOpen={isMobileMenuOpen}
        handleNavClick={handleNavClick}
        toggleMobileMenu={toggleMobileMenu}
        showBackArrow={true}
        onBack={() => navigate('/', {replace: true})}
        minimal={true}
      />
      <div style={{maxWidth:600,margin:'1.5rem auto 2rem auto',padding:'0 1rem'}}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{width:'100%',padding:'0.7rem 1rem',fontSize:'1.1rem',borderRadius:8,border:'1px solid #ccc',marginBottom:0}}
        />
      </div>
      <div className="section-header" style={{marginBottom:'2.5rem'}}>
        <h2 style={{fontFamily:'Playfair Display,serif',fontWeight:600,fontSize:'2rem',color:'#1e3a8a',marginBottom:'0.5rem'}}>After-Sales Support</h2>
        <p style={{fontSize:'1.1rem',color:'#64748b',margin:0}}>Comprehensive care for your products</p>
      </div>
      {filteredProducts.length === 0 ? (
        <div style={{textAlign:'center',color:'#64748b',fontSize:'1.1rem',margin:'2rem 0'}}>No product available in this name.</div>
      ) : (
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'1.5rem',padding:'0 1rem 2rem 1rem'}}>
          {filteredProducts.map(product => (
            <div key={product.name} style={{background:'#fff',borderRadius:12,boxShadow:'0 2px 12px rgba(30,58,138,0.07)',padding:'1.2rem',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-start'}}>
              <img src={product.image} alt={product.name} style={{width:'100%',height:140,objectFit:'cover',borderRadius:8,marginBottom:12}} />
              <h4 style={{margin:'0 0 0.5rem 0',fontWeight:600,fontSize:'1.1rem',color:'#1e3a8a',textAlign:'center'}}>{product.name}</h4>
              <a
                href={`https://wa.me/91${whatsappNumber}?text=Hi%2C%20I%20am%20interested%20in%20this%20product%3A%20${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Enquire on WhatsApp"
                className="whatsapp-tab-btn"
              >
                <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24" style={{marginRight:6}}><path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.63A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.68-.5-5.25-1.44l-.37-.22-3.69.97.99-3.59-.24-.37A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.27-7.4c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.19-.34.21-.63.07-.29-.15-1.22-.45-2.33-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.54-.88-2.11-.23-.56-.47-.48-.64-.49-.17-.01-.36-.01-.56-.01-.19 0-.5.07-.76.36-.26.29-1 1-.99 2.43.01 1.43 1.03 2.81 1.18 3.01.15.19 2.03 3.1 4.92 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.7-.7 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.34z"/></svg>
                WhatsApp Enquiry
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AfterSalesSupportPage; 