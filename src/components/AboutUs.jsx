import React from 'react'
import './AboutUs.css'

const AboutUs = () => {
  return (
    <div className="about-us-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1>About Kannamkulangara Group</h1>
            <p>A Legacy of Excellence Since 1990</p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="container">
          <div className="mission-vision-grid">
            <div className="mission-card">
              <div className="card-icon">🎯</div>
              <h2>Our Mission</h2>
              <p>To create sustainable value for our stakeholders while contributing to the growth and development of our communities through innovative solutions and unwavering commitment to excellence.</p>
            </div>
            <div className="vision-card">
              <div className="card-icon">🔮</div>
              <h2>Our Vision</h2>
              <p>To be the leading diversified business group, recognized for innovation, integrity, and positive impact on society, while maintaining our core values and traditions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="core-values">
        <div className="container">
          <div className="section-header">
            <h2>Our Core Values</h2>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">💎</div>
              <h3>Integrity</h3>
              <p>We conduct our business with honesty, transparency, and ethical practices in all our dealings.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🚀</div>
              <h3>Innovation</h3>
              <p>We continuously strive to improve and innovate, embracing new technologies and methodologies.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Excellence</h3>
              <p>We maintain the highest standards of quality and service in everything we do.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3>Sustainability</h3>
              <p>We are committed to environmental responsibility and sustainable business practices.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">👥</div>
              <h3>Community</h3>
              <p>We actively contribute to the development and well-being of our communities.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Customer Focus</h3>
              <p>We prioritize our customers' needs and satisfaction in all our business decisions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="leadership">
        <div className="container">
          <div className="section-header">
            <h2>Our Leadership Team</h2>
          </div>
          <div className="leadership-grid">
            <div className="leader-card">
              <div className="leader-photo">
                <div className="photo-placeholder">Chairman</div>
              </div>
              <h3>Mr. Kannamkulangara</h3>
              <p className="position">Chairman & CEO</p>
              <p className="bio">Leading the group with over 30 years of experience in business development and strategic planning.</p>
            </div>
            <div className="leader-card">
              <div className="leader-photo">
                <div className="photo-placeholder">Director</div>
              </div>
              <h3>Mrs. Kannamkulangara</h3>
              <p className="position">Director - Operations</p>
              <p className="bio">Overseeing day-to-day operations and ensuring operational excellence across all business units.</p>
            </div>
            <div className="leader-card">
              <div className="leader-photo">
                <div className="photo-placeholder">CFO</div>
              </div>
              <h3>Mr. Finance Director</h3>
              <p className="position">Chief Financial Officer</p>
              <p className="bio">Managing financial strategy and ensuring sustainable growth through sound financial practices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="company-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">30+</div>
              <div className="stat-label">Years of Excellence</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Employees</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Satisfied Customers</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">15+</div>
              <div className="stat-label">Business Locations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="awards">
        <div className="container">
          <div className="section-header">
            <h2>Awards & Recognition</h2>
          </div>
          <div className="awards-grid">
            <div className="award-card">
              <div className="award-icon">🏆</div>
              <h3>Best Business Group 2023</h3>
              <p>Kerala Business Excellence Awards</p>
            </div>
            <div className="award-card">
              <div className="award-icon">⭐</div>
              <h3>Customer Service Excellence</h3>
              <p>National Customer Service Awards</p>
            </div>
            <div className="award-card">
              <div className="award-icon">🌱</div>
              <h3>Green Business Award</h3>
              <p>Environmental Excellence Recognition</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutUs 