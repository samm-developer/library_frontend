import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Home() {
  const { user } = useAuth();

  const reviews = [
    {
      stars: "★★★★★",
      text: "A great library I came across by chance but got hooked to it nevertheless. A very great place to study with daily newspapers and wifi available 24/7 with every facility you can hope for.",
      author: "Amartya Samrat"
    },
    {
      stars: "★★★★★",
      text: "Experience the rare charm of a private library where the depth of the collection is matched only by the owner's approachable and engaging personality. It's a place where books and friendly conversation seamlessly intertwine.",
      author: "Mahi Maurya"
    },
    {
      stars: "★★★★★",
      text: "Very good ambiance...washroom are very clean and hygenic..perfect place for study.",
      author: "Pratiksha Rai"
    },
    {
      stars: "★★★★★",
      text: "I recently visited this library, and I must say, it's a serene haven for students. The calming atmosphere, thanks to the efficient air conditioning, made my experience truly enjoyable. What stood out even more was the owner's calm behavior.",
      author: "Ansh Pandey"
    },
    {
      stars: "★★★★★",
      text: "study in a very good environment. Library owner's good behavior towards children and good facilities.",
      author: "Subham Chauhan"
    }
  ];

  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReviewIdx((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeReviewIdx, reviews.length]);

  const prevReview = () => {
    setActiveReviewIdx((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setActiveReviewIdx((prev) => (prev + 1) % reviews.length);
  };
  
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-static-section">
        <div className="hero-static-image-container">
          <img 
            src="/images/hero_banner.png" 
            alt="Your Perfect Study Destination" 
            className="hero-static-img" 
          />
        </div>
        
        <div className="hero-content-below">
          <h1 className="hero-title-below">Your Perfect Study Destination</h1>
          <p className="hero-subtitle-below">24×7 Peaceful Study Environment</p>
          <div className="hero-buttons-below">
            {!user ? (
              <Link to="/register" className="btn btn-primary-cta">
                Register Now
              </Link>
            ) : (
              <Link to="/dashboard" className="btn btn-primary-cta">
                Go to Dashboard
              </Link>
            )}
            <Link to="/gallery" className="btn btn-secondary-cta-below">
              Explore Library
            </Link>
          </div>
        </div>
      </section>

      {/* Foundation Story Section */}
      <section className="story-section">
        <div className="story-section-container">
          <div className="story-section-header">
            <span className="story-badge">Established on 5 March 2023</span>
            <h2 className="story-section-title">Our Story</h2>
            <p className="story-section-subtitle">Founded by Rajat Keshari in Prayagraj</p>
          </div>

          <div className="story-grid">
            {/* Left Column: Owner Images Stack */}
            <div className="story-image-column">
              <div className="story-images-stack">
                <div className="story-image-wrapper">
                  <img 
                    src="/images/owner_desk_professional.jpg" 
                    alt="Rajat Keshari - Founder at Desk" 
                    className="story-main-img" 
                  />
                  <div className="story-image-caption">
                    <h4>Rajat Keshari</h4>
                    <p>Founder, at his workstation in The King's Library</p>
                  </div>
                </div>
                
                <div className="story-image-wrapper">
                  <img 
                    src="/images/owner_standing.jpg" 
                    alt="Rajat Keshari - Founder" 
                    className="story-main-img" 
                  />
                  <div className="story-image-caption">
                    <h4>Building the Future</h4>
                    <p>Dedicated to creating the perfect self-study ecosystem</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Narrative, Purpose, and Timeline */}
            <div className="story-content-column">
              <div className="story-text-block">
                <p>
                  <strong>The King's Library</strong> was established on <strong>5 March 2023</strong> in Prayagraj with a vision to create a dedicated and disciplined learning environment for students preparing for academic and competitive examinations. Founded by <strong>Rajat Keshari</strong>, the library was started with a simple yet powerful mission: to provide students with a peaceful space where they can maintain consistency, self-discipline, and focused self-study.
                </p>
                <p>
                  The library believes that success in any examination is not achieved through short-term effort but through continuous learning and regular practice. The King's Library was created to help students develop this consistency by offering a distraction-free atmosphere, quality study resources, and a community of serious learners.
                </p>
                <p>
                  The inauguration ceremony was honored by the presence of some of Prayagraj's most respected educators and mentors, who inspired students and emphasized the importance of self-study, discipline, and smart learning strategies.
                </p>
              </div>

              <div className="story-purpose">
                <h3>Our Purpose</h3>
                <p>
                  The King's Library is more than just a reading space. It is a learning ecosystem designed for students who are serious about achieving their academic and career goals. The institution promotes self-study, consistency, discipline, and continuous improvement—qualities that are essential for success in any competitive examination.
                </p>
              </div>

              {/* Timeline */}
              <div className="story-timeline">
                <div className="timeline-item">
                  <div className="timeline-badge-year">March 5, 2023</div>
                  <div className="timeline-content">
                    <h4>Foundation</h4>
                    <p>Established with a vision for consistent self-study.</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-badge-year">March 2023</div>
                  <div className="timeline-content">
                    <h4>Inauguration</h4>
                    <p>Inaugurated by leading mentors, encouraging discipline and focus.</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-badge-year">2023 - Present</div>
                  <div className="timeline-content">
                    <h4>Student Success Journey</h4>
                    <p>Providing the learning ecosystem for students to turn their aspirations into success.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Distinguished Guests Sub-Section */}
          <div className="guests-section">
            <h3 className="guests-title">Distinguished Guests at the Inauguration</h3>
            <div className="guests-grid">
              {/* Guest 1 */}
              <div className="guest-card">
                <div className="guest-image-wrapper">
                  <img src="/images/inauguration_1.jpg" alt="Mr. Wasim Sir" className="guest-img" />
                </div>
                <div className="guest-info">
                  <h4>Mr. Wasim Sir</h4>
                  <span className="guest-tagline">CEO, The Speed Coaching</span>
                  <p>
                    One of Prayagraj's most respected Mathematics educators. Known for his outstanding teaching methodology and ability to simplify complex mathematical concepts, he has guided thousands of students toward success. He motivated students to adopt smart study techniques and maintain consistency.
                  </p>
                </div>
              </div>

              {/* Guest 2 */}
              <div className="guest-card">
                <div className="guest-image-wrapper">
                  <img src="/images/inauguration_2.jpg" alt="Dr. Mrityunjay Rao Parmar" className="guest-img" />
                </div>
                <div className="guest-info">
                  <h4>Dr. Mrityunjay Rao Parmar</h4>
                  <span className="guest-tagline">Assistant Professor, Allahabad University</span>
                  <p>
                    A highly respected English educator for undergraduate students. Widely appreciated for his student-centric approach, social contributions, and dedication to mentoring young learners, he encouraged students to develop strong learning habits, self-confidence, and a long-term vision.
                  </p>
                </div>
              </div>

              {/* Guest 3 */}
              <div className="guest-card">
                <div className="guest-image-wrapper placeholder-avatar">
                  <div className="guest-avatar-fallback">AS</div>
                </div>
                <div className="guest-info">
                  <h4>Azad Sir</h4>
                  <span className="guest-tagline">Renowned Educator & Mentor</span>
                  <p>
                    A highly renowned educator whose name is well known among competitive examination aspirants across Prayagraj. Recognized for his vast experience and motivational guidance, he encouraged students to make productive use of library resources and remain dedicated.
                  </p>
                </div>
              </div>

              {/* Guest 4 */}
              <div className="guest-card">
                <div className="guest-image-wrapper">
                  <img src="/images/inauguration_3.png" alt="Mr. Anish Mishra" className="guest-img" />
                </div>
                <div className="guest-info">
                  <h4>Mr. Anish Mishra</h4>
                  <span className="guest-tagline">Mathematics Teacher, Jwala Devi Inter College</span>
                  <p>
                    A distinguished Mathematics teacher associated with Jwala Devi Inter College, one of Uttar Pradesh's well-known educational institutions. His message focused on discipline, consistency, and the importance of effective self-study for academic excellence.
                  </p>
                </div>
              </div>
            </div>
          </div>
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
            <div className="mission-vision-grid">
              <div className="card mission-card">
                <div className="card-header-with-icon">
                  <span className="card-icon">🎯</span>
                  <h3>Our Mission</h3>
                </div>
                <div className="mission-content">
                  <p>
                    Our mission is to create a peaceful, disciplined, and inspiring learning environment where students from all academic and competitive backgrounds can achieve their goals with confidence. We are committed to providing a comfortable, distraction-free, and resource-rich study space for SSC, UPSC, UPPCS, Defence, Railway, Banking, Teaching, NEET, JEE, and university students.
                  </p>
                  <p>
                    By offering modern facilities, a positive atmosphere, and a culture of dedication and hard work, we aim to support every learner in maximizing their productivity, improving their focus, and turning their aspirations into success. Our library is more than just a study space—it is a destination where dreams are nurtured, knowledge is empowered, and futures are built.
                  </p>
                </div>
              </div>
              
              <div className="card vision-card">
                <div className="card-header-with-icon">
                  <span className="card-icon">👁️‍🗨️</span>
                  <h3>Our Vision</h3>
                </div>
                <div className="vision-content">
                  <p>
                    Our vision is to become the most trusted learning destination for students preparing for SSC, UPSC, UPPCS, Defence, Banking, Railway, NEET, JEE, and academic examinations. Beyond providing a peaceful study environment, we regularly organize Republic Day, Independence Day, King's Quiz Competitions, and Prize Distribution ceremonies to motivate students. We invite successful achievers and motivational speakers to share their experiences and inspire learners. Through discipline, guidance, and modern facilities, we strive to help every student stay focused, productive, and confident in achieving their goals.
                  </p>
                </div>
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
              <h2>Student Reviews from Google Maps</h2>
              <p className="muted">Read what our serious learners and aspirants say about their study experience with us.</p>
            </div>
            
            <div className="reviews-slider-container">
              <button type="button" className="slider-nav-btn prev" onClick={prevReview} aria-label="Previous review">&#10094;</button>
              
              <div className="reviews-viewport">
                <div 
                  className="reviews-track"
                  style={{ transform: `translate3d(calc(-${activeReviewIdx} * var(--slide-width)), 0, 0)` }}
                >
                  {[...reviews, reviews[0], reviews[1]].map((rev, idx) => (
                    <div className="reviews-slide" key={idx}>
                      <div className={`testimonial-card card color-${(idx % reviews.length) + 1}`} style={{ height: "100%", margin: 0, padding: "24px" }}>
                        <div className="stars">{rev.stars}</div>
                        <p className="testimonial-text">"{rev.text}"</p>
                        <h5 className="testimonial-author">- {rev.author}</h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button type="button" className="slider-nav-btn next" onClick={nextReview} aria-label="Next review">&#10095;</button>
            </div>

            <div className="slider-dots">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`slider-dot ${idx === activeReviewIdx ? "active" : ""}`}
                  onClick={() => setActiveReviewIdx(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "32px" }}>
              <a
                href="https://share.google/etRc2pSyCWktPE2pT"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Write a Review or View All on Google Maps
              </a>
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
