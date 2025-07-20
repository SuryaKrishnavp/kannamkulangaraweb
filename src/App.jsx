import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';

// Import components
import Navbar from './components/Navbar';
import Home from './Home';

// Import pages
import AboutUsPage from './pages/AboutUsPage';
import OurBusinessPage from './pages/OurBusinessPage';
import OurJourneyPage from './pages/OurJourneyPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';

// Import business pages
import HomeAppliancePage from './pages/business/HomeAppliancePage';
import KitchenAppliancesPage from './pages/business/KitchenAppliancesPage';
import EssentialFurniturePage from './pages/business/EssentialFurniturePage';
import ElectronicGadgetsPage from './pages/business/ElectronicGadgetsPage';
import AfterSalesSupportPage from './pages/business/AfterSalesSupportPage';

const coolTips = [
  'Bringing comfort to your home…',
  'Loading a world of appliances…',
  'Making life easier, one product at a time…',
  'Almost there! Preparing your experience…',
  'Quality you can trust, loading…',
];

function App() {
  const [fullyLoaded, setFullyLoaded] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    let imagesLoaded = 0;
    const requiredImages = ['/webback.jpg', '/logo.png'];
    const handleImageLoad = () => {
      imagesLoaded++;
      if (imagesLoaded === requiredImages.length) {
        setFullyLoaded(true);
      }
    };
    // Preload both images
    requiredImages.forEach((src) => {
      const img = new window.Image();
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad;
      img.src = src;
    });
    // Also wait for window.onload (all resources loaded)
    const handleWindowLoad = () => {
      // If images already loaded, setFullyLoaded will be called above
      // If not, do nothing (wait for images)
    };
    if (document.readyState === 'complete') {
      // If already loaded, do nothing (wait for images)
    } else {
      window.addEventListener('load', handleWindowLoad);
    }
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      mirror: true,
      disable: false
    });
    // Rotate cool tips every 2.5s
    const tipInterval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % coolTips.length);
    }, 2500);
    return () => {
      window.removeEventListener('load', handleWindowLoad);
      clearInterval(tipInterval);
    };
  }, []);

  if (!fullyLoaded) {
    return (
      <div className="loader-overlay">
        <div className="cool-spinner"></div>
        <div className="cool-loading-text">Loading Kannamkulangara Web…</div>
        <div className="cool-tips">{coolTips[tipIndex]}</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/our-business" element={<OurBusinessPage />} />
          <Route path="/our-journey" element={<OurJourneyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          {/* Business Routes */}
          <Route path="/home-appliances" element={<HomeAppliancePage />} />
          <Route path="/kitchen-appliances" element={<KitchenAppliancesPage />} />
          <Route path="/essential-furniture" element={<EssentialFurniturePage />} />
          <Route path="/electronic-gadgets" element={<ElectronicGadgetsPage />} />
          <Route path="/after-sales-support" element={<AfterSalesSupportPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
