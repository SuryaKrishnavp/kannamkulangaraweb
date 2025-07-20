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
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [totalImages, setTotalImages] = useState(0);

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
      
      // Critical images to preload
      const criticalImages = [
        '/src/assets/webback.jpg',
        '/src/assets/logo.png',
        '/src/assets/chairman.jpg',
        '/src/assets/godrejlogo.png',
        '/src/assets/lglogo.png',
        '/src/assets/samsunglogo.svg',
        '/src/assets/sujathalogo.png',
        '/src/assets/ushalogo.svg',
        '/src/assets/whirpool logo.svg'
      ];
      
      setTotalImages(criticalImages.length);
      let loadedCount = 0;
      
      const checkAllImagesLoaded = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
        
        if (loadedCount >= criticalImages.length) {
          console.log('All images loaded, completing loader');
          // All images loaded, complete the loader
          setLoadingProgress(100);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }
      };
      
      // Preload all critical images
      criticalImages.forEach((src) => {
        const img = new Image();
        img.onload = () => {
          console.log('Image loaded:', src);
          checkAllImagesLoaded();
        };
        img.onerror = () => {
          console.log('Image failed to load:', src);
          checkAllImagesLoaded();
        };
        img.src = src;
      });
      
      // Start progress animation with smoother updates
      let currentProgress = 0;
      const targetProgress = 90; // Only go to 90% until images are loaded
      const totalDuration = 3000; // 3 seconds for smoother animation
      const updateInterval = 100; // Update every 100ms to reduce blinking
      const progressPerUpdate = (targetProgress * updateInterval) / totalDuration;
      
      const updateProgress = () => {
        if (currentProgress >= targetProgress) {
          setLoadingProgress(targetProgress);
          return;
        }
        
        currentProgress += progressPerUpdate;
        setLoadingProgress(Math.min(currentProgress, targetProgress));
        setTimeout(updateProgress, updateInterval);
      };
      
      // Start the progress animation
      setTimeout(updateProgress, 300);
    }

    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      mirror: true,
      disable: false
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
          {loadingProgress >= 75 && loadingProgress < 90 && "Loading images and assets..."}
          {loadingProgress >= 90 && "Almost ready..."}
        </div>
        
        <div className="loading-status">
          {totalImages > 0 && `Loading assets: ${imagesLoaded}/${totalImages}`}
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
