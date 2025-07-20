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

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem('hasVisitedKannamkulangara');
    
    console.log('Has visited before:', hasVisited);
    
    if (hasVisited) {
      // Not first visit - skip loader
      console.log('Skipping loader - not first visit');
      setIsLoading(false);
    } else {
      // First time visitor - show loader
      console.log('Showing loader - first visit');
      setIsLoading(true);
      
      // Mark as visited immediately
      localStorage.setItem('hasVisitedKannamkulangara', 'true');
      
      // Simple smooth loading animation
      let currentProgress = 0;
      const targetProgress = 100;
      const totalDuration = 3000; // 3 seconds
      const updateInterval = 30; // Update every 30ms
      const progressPerUpdate = (targetProgress * updateInterval) / totalDuration;
      
      const updateProgress = () => {
        currentProgress += progressPerUpdate;
        
        if (currentProgress >= targetProgress) {
          setLoadingProgress(100);
          console.log('Loading complete, hiding loader');
          // Hide loader after reaching 100%
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
          return;
        }
        
        setLoadingProgress(currentProgress);
        setTimeout(updateProgress, updateInterval);
      };
      
      // Start the progress animation
      setTimeout(updateProgress, 100);
    }

    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      mirror: true,
      disable: false
    });

    // Preload critical images
    const criticalImages = [
      '/src/assets/webback.jpg',
      '/src/assets/logo.png',
      '/src/assets/chairman.jpg'
    ];

    criticalImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

  }, []);

  // Loading Screen Component
  const LoadingScreen = () => (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-logo">
          <img src="/src/assets/logo.png" alt="Kannamkulangara" />
          <h2>Kannamkulangara</h2>
          <p>Home Appliances</p>
        </div>
        
        <div className="loading-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <div className="progress-text">{Math.round(loadingProgress)}%</div>
        </div>

        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>

        <div className="loading-message">
          {loadingProgress < 25 && "Welcome to Kannamkulangara..."}
          {loadingProgress >= 25 && loadingProgress < 50 && "Loading your experience..."}
          {loadingProgress >= 50 && loadingProgress < 75 && "Preparing everything..."}
          {loadingProgress >= 75 && "Almost ready..."}
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return <LoadingScreen />;
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
