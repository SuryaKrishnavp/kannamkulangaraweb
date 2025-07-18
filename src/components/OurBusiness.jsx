import React, { useState } from 'react'
import './OurBusiness.css'

const OurBusiness = () => {
  const [activeBusiness, setActiveBusiness] = useState('overview')

  const businessUnits = [
    {
      id: 'homeappliance',
      name: 'Home Appliance Division',
      icon: '🏠',
      description: 'Innovative home solutions that make everyday life easier',
      color: '#3b82f6'
    }
  ]

  const renderBusinessContent = () => {
    switch (activeBusiness) {
      case 'homeappliance':
        return <HomeApplianceBusiness />
      default:
        return <BusinessOverview />
    }
  }

  return (
    <div className="our-business-page">
      {/* Hero Section */}
      <section className="business-hero">
        <div className="container">
          <div className="business-hero-content">
            <h1>Our Business Portfolio</h1>
            <p>Excellence in home appliances for modern living</p>
          </div>
        </div>
      </section>

      {/* Business Navigation */}
      <section className="business-navigation">
        <div className="container">
          <div className="business-nav-tabs">
            <button 
              className={`nav-tab ${activeBusiness === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveBusiness('overview')}
            >
              Overview
            </button>
            {businessUnits.map(unit => (
              <button 
                key={unit.id}
                className={`nav-tab ${activeBusiness === unit.id ? 'active' : ''}`}
                onClick={() => setActiveBusiness(unit.id)}
                style={{ '--accent-color': unit.color }}
              >
                {unit.icon} {unit.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Business Content */}
      <section className="business-content">
        <div className="container">
          {renderBusinessContent()}
        </div>
      </section>
    </div>
  )
}

// Business Overview Component
const BusinessOverview = () => {
  const businessUnits = [
    {
      name: 'Home Appliance Division',
      icon: '🏠',
      description: 'Innovative home appliances and smart home solutions for modern living.',
      features: ['Kitchen Appliances', 'Smart Home Systems', 'Energy Efficient Products', 'After-Sales Support'],
      color: '#3b82f6'
    }
  ]

  return (
    <div className="business-overview">
      <div className="section-header">
        <h2>Our Business Division</h2>
        <p>Explore our excellence in home appliances</p>
      </div>
      <div className="business-overview-grid">
        {businessUnits.map((unit, index) => (
          <div key={index} className="business-overview-card" style={{ '--accent-color': unit.color }}>
            <div className="business-overview-icon">{unit.icon}</div>
            <h3>{unit.name}</h3>
            <p>{unit.description}</p>
            <div className="business-features">
              <h4>Key Features:</h4>
              <ul>
                {unit.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Home Appliance Business Component
const HomeApplianceBusiness = () => {
  return (
    <div className="homeappliance-business">
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
            <div className="product-card">
              <div className="product-icon">🍳</div>
              <h4>Kitchen Appliances</h4>
              <p>Modern kitchen appliances including refrigerators, washing machines, dishwashers, and cooking equipment.</p>
            </div>
            <div className="product-card">
              <div className="product-icon">🏠</div>
              <h4>Smart Home Systems</h4>
              <p>Integrated smart home solutions for lighting, security, climate control, and entertainment.</p>
            </div>
            <div className="product-card">
              <div className="product-icon">⚡</div>
              <h4>Energy Efficient Products</h4>
              <p>Eco-friendly appliances designed to reduce energy consumption and environmental impact.</p>
            </div>
            <div className="product-card">
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

export default OurBusiness 