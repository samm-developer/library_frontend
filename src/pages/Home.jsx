import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Home() {
  const { user } = useAuth();
  
  const slides = [
    "/images/hero_banner.png",
    "/images/library_interior.png",
    "/images/achievements.png"
  ];
  
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-slider-section">
        <div className="slideshow-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? "active" : ""}`}
              style={{ backgroundImage: `url(${slide})` }}
            />
          ))}
          <div className="slider-overlay"></div>
        </div>
        
        <div className="hero-content-wrapper">
          <h1 className="hero-title">Your Perfect Study Destination</h1>
          <p className="hero-subtitle">24×7 Peaceful Study Environment</p>
          <div className="hero-buttons">
            {!user ? (
              <Link to="/register" className="btn btn-primary-cta">
                Register Now
              </Link>
            ) : (
              <Link to="/dashboard" className="btn btn-primary-cta">
                Go to Dashboard
              </Link>
            )}
            <Link to="/gallery" className="btn btn-secondary-cta">
              Explore Library
            </Link>
          </div>
        </div>
        
        <div className="slide-indicators">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`indicator-dot ${idx === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      <div className="container">
        {/* Why Choose Our Library Section */}
        <section className="features-section">
          <div className="section-container">
            <div className="section-header">
              <h2>Why Choose Our Library?</h2>
              <p className="muted">Premium features designed to boost concentration and learning.</p>
            </div>
            
            <div className="features-grid">
              <div className="feature-card card">
                <div className="feature-icon">✓</div>
                <h4>24×7 Study Access</h4>
                <p>Study anytime according to your schedule.</p>
              </div>
              <div className="feature-card card">
                <div className="feature-icon">✓</div>
                <h4>Peaceful Environment</h4>
                <p>Noise-free and distraction-free study atmosphere.</p>
              </div>
              <div className="feature-card card">
                <div className="feature-icon">✓</div>
                <h4>High-Speed Wi-Fi</h4>
                <p>Fast and reliable internet connectivity.</p>
              </div>
              <div className="feature-card card">
                <div className="feature-icon">✓</div>
                <h4>CCTV Security</h4>
                <p>Safe and monitored environment for peace of mind.</p>
              </div>
              <div className="feature-card card">
                <div className="feature-icon">✓</div>
                <h4>Comfortable Seating</h4>
                <p>Spacious desks and ergonomic seating arrangements.</p>
              </div>
              <div className="feature-card card">
                <div className="feature-icon">✓</div>
                <h4>Parking Facility</h4>
                <p>Hassle-free parking slots for students.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission and Vision Section */}
        <section className="about-section">
          <div className="section-container">
            <div className="mission-vision-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              <div className="card mission-card">
                <div className="card-icon">🎯</div>
                <h3>Our Mission</h3>
                <p style={{ fontSize: "1.05rem", lineHeight: "1.6", margin: "12px 0 0 0" }}>
                  To provide students with a peaceful, comfortable and productive study environment that helps them achieve academic success.
                </p>
              </div>
              
              <div className="card vision-card">
                <div className="card-icon">👁️‍🗨️</div>
                <h3>Our Vision</h3>
                <p style={{ fontSize: "1.05rem", lineHeight: "1.6", margin: "12px 0 0 0" }}>
                  To become the most trusted study destination for students by offering world-class facilities and a distraction-free learning atmosphere.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Facilities Available Section */}
        <section className="facilities-section">
          <div className="section-container">
            <div className="section-header">
              <h2>Facilities Available</h2>
              <p className="muted">All features included in your study subscription.</p>
            </div>
            <div className="facilities-grid">
              <div className="facility-item card">
                <span className="facility-badge">📰</span>
                <span>Newspaper Reading Area</span>
              </div>
              <div className="facility-item card">
                <span className="facility-badge">📚</span>
                <span>Monthly Magazines</span>
              </div>
              <div className="facility-item card">
                <span className="facility-badge">🔌</span>
                <span>Mobile Charging Points</span>
              </div>
              <div className="facility-item card">
                <span className="facility-badge">⚡</span>
                <span>High-Speed Wi-Fi</span>
              </div>
              <div className="facility-item card">
                <span className="facility-badge">🛡️</span>
                <span>CCTV Security</span>
              </div>
              <div className="facility-item card">
                <span className="facility-badge">🪑</span>
                <span>Comfortable Tables & Chairs</span>
              </div>
              <div className="facility-item card">
                <span className="facility-badge">🚗</span>
                <span>Parking Facility</span>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials (Student Success Stories) */}
        <section className="testimonials-section">
          <div className="section-container">
            <div className="section-header">
              <h2>Student Success Stories</h2>
              <p className="muted">Hear what our hard-working students say about their experience.</p>
            </div>
            
            <div className="testimonials-grid">
              <div className="testimonial-card card">
                <div className="stars">★★★★★</div>
                <p className="testimonial-text">
                  "The best study environment I have ever experienced. The peaceful atmosphere helps me stay focused for long hours."
                </p>
                <h5 className="testimonial-author">- Rahul Kumar</h5>
              </div>
              <div className="testimonial-card card">
                <div className="stars">★★★★★</div>
                <p className="testimonial-text">
                  "Clean facilities, comfortable seating and excellent management. Highly recommended for serious students."
                </p>
                <h5 className="testimonial-author">- Priya Sharma</h5>
              </div>
              <div className="testimonial-card card">
                <div className="stars">★★★★★</div>
                <p className="testimonial-text">
                  "The 24-hour access and high-speed Wi-Fi make this library perfect for competitive exam preparation."
                </p>
                <h5 className="testimonial-author">- Aman Singh</h5>
              </div>
              <div className="testimonial-card card">
                <div className="stars">★★★★★</div>
                <p className="testimonial-text">
                  "Affordable fees and excellent facilities. The staff is very supportive and professional."
                </p>
                <h5 className="testimonial-author">- Neha Verma</h5>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="homepage-cta-section">
          <div className="cta-container">
            <h2>Ready to Achieve Your Goals?</h2>
            <p>Join hundreds of students who trust our library for their academic success.</p>
            {!user ? (
              <Link to="/register" className="btn btn-cta-light">
                Register Today
              </Link>
            ) : (
              <Link to="/dashboard" className="btn btn-cta-light">
                Open Dashboard
              </Link>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
