import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar minimal={true} showBackArrow={true} onBack={() => navigate('/', {replace: true})} />
      <div className="policy-container">
        <h1 className="policy-title">Privacy Policy</h1>
        <p>We value your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.</p>
        <h2>Information We Collect</h2>
        <ul>
          <li>Personal information you provide (such as name, email, phone number, etc.)</li>
          <li>Information collected automatically (such as IP address, browser type, device information, etc.)</li>
        </ul>
        <h2>How We Use Your Information</h2>
        <ul>
          <li>To provide and improve our services</li>
          <li>To communicate with you about your inquiries or orders</li>
          <li>To ensure the security of our website</li>
        </ul>
        <h2>Information Sharing</h2>
        <p>We do not sell or share your personal information with third parties except as required by law or to provide our services.</p>
        <h2>Contact Us</h2>
        <p>If you have any questions about our Privacy Policy, please contact us at info@kannamkulangara.com.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 