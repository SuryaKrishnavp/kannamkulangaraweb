import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const TermsAndConditions = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar minimal={true} showBackArrow={true} onBack={() => navigate('/', {replace: true})} />
      <div className="policy-container">
        <h1 className="policy-title">Terms & Conditions</h1>
        <p>Welcome to Kannamkulangara Home Appliances. By using our website and services, you agree to the following terms and conditions:</p>
        <h2>Use of Website</h2>
        <ul>
          <li>You agree to use this website for lawful purposes only.</li>
          <li>You must not misuse or attempt to disrupt the website or its services.</li>
        </ul>
        <h2>Intellectual Property</h2>
        <p>All content on this website, including text, images, and logos, is the property of Kannamkulangara Home Appliances and may not be used without permission.</p>
        <h2>Limitation of Liability</h2>
        <p>We strive to provide accurate information, but we do not guarantee the completeness or accuracy of the content. We are not liable for any damages resulting from the use of our website.</p>
        <h2>Changes to Terms</h2>
        <p>We may update these terms and conditions at any time. Please review this page regularly for updates.</p>
        <h2>Contact Us</h2>
        <p>If you have any questions about these Terms & Conditions, please contact us at info@kannamkulangara.com.</p>
      </div>
    </div>
  );
};

export default TermsAndConditions; 