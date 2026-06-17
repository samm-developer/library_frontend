import { useState, useEffect } from "react";

export default function Gallery() {
  const images = [
    {
      url: "/images/library_interior_v2.png",
      title: "Main Study Hall",
      description: "Our spacious, naturally lit study environment equipped with high-speed internet, premium study desks, and power outlets."
    },
    {
      url: "/images/infra_1.jpg",
      title: "Premium Study Cubicles",
      description: "Clean, individual study desks designed with power sockets and comfortable seating along our signature brick accent wall."
    },
    {
      url: "/images/infra_2.png",
      title: "AC Quiet Study Zone",
      description: "Air-conditioned quiet zone with fully partition-separated cubicles for focused, distraction-free self-study."
    },
    {
      url: "/images/infra_3.png",
      title: "12-Hour & Full-Day Study Desks",
      description: "Numbered study rows (51-63) allocated exclusively for 12-hour or full-day shift students. Short-term study is not allowed, ensuring an uninterrupted study environment."
    },
    {
      url: "/images/infra_4.jpg",
      title: "Unreserved Study Desks",
      description: "Open study rows allocated on a flexible basis without time-slot bookings, offering students unreserved seating options for self-study."
    },
    {
      url: "/images/locker_desks.png",
      title: "Premium Locker Desks",
      description: "Dedicated study desks for full-time students featuring personal lockable cabinets and keys to safely store laptops, chargers, and notebooks."
    },
    {
      url: "/images/panel_1.png",
      title: "BPSC APO Success - Satyendra Kumar",
      description: "Celebrating our student Satyendra Kumar on his success in BPSC APO examinations, representing the dedication of our members."
    },
    {
      url: "/images/panel_3.png",
      title: "Quiz Competition 2024 - 1st Prize Winner",
      description: "Bhupendra Chaudhary receiving the 1st prize trophy for outstanding performance in the King's Quiz Competition 2024."
    },
    {
      url: "/images/panel_4.png",
      title: "Quiz Competition 2024 - 2nd Prize Winner",
      description: "Pooja Soni receiving the 2nd prize trophy in the annual library academic quiz competition."
    },
    {
      url: "/images/panel_5.png",
      title: "Quiz Competition 2024 - 3rd Prize Winner",
      description: "Richa Chaudhary receiving the 3rd prize trophy, showcasing the competitive and learning atmosphere of our community."
    },
    {
      url: "/images/panel_2.png",
      title: "SSC CGL Success - Anshu Singh",
      description: "Congratulating Anshu Singh on cracking the SSC CGL examinations, adding to the achievements board of The King's Library."
    },
    {
      url: "/images/achievements.png",
      title: "The King's Library Achievements Board",
      description: "Our wall of honor celebrating student milestones, competitive successes, and academic achievements."
    },
    {
      url: "/images/sandeep_wasim_inauguration.jpg",
      title: "Inauguration Day Guest Meet",
      description: "Sandeep Kushwaha Ji (Founder of Allahabadi Bhaukal channel) meeting with Wasim Sir on the official inauguration day of The King's Library."
    },
    {
      url: "/images/republic_day_police.jpg",
      title: "Republic Day Celebration - Chief Guest SI Amit Yadav",
      description: "Library members celebrating Republic Day with chief guest Amit Yadav Sir, Sub-Inspector (SI) of George Town police station."
    },
    {
      url: "/images/republic_day_map.jpg",
      title: "Student Rangoli - India Map",
      description: "A beautiful hand-drawn India map Rangoli created by the students of The King's Library to celebrate Republic Day."
    },
    {
      url: "/images/republic_day_doctor.jpg",
      title: "Republic Day Celebration - Guest Dr. Prashant Shukla",
      description: "Students and staff celebrating Republic Day with distinguished guest Dr. Prashant Shukla Sir (MBBS, Physician)."
    },
    {
      url: "/images/visiting_card.png",
      title: "Official Library Info Card",
      description: "The official visiting card of The King's Library outlining key amenities, contact numbers, and our address at George Town, Prayagraj."
    },
    {
      url: "/images/motivation_hindi.png",
      title: "Motivational Study Quote",
      description: "An inspiring motivational message in Hindi encouraging students to dedicate themselves to consistency and self-preparation."
    },
    {
      url: "/images/students_heartbeat.png",
      title: "Library Advertisement Poster",
      description: "Promotional advertisement poster of The King's Library highlighting 'The Students' Heartbeat' along with the contact details for admission queries."
    },
    {
      url: "/images/library_full_form.png",
      title: "LIBRARY Full Form Poster",
      description: "An educational poster detailing the full form of LIBRARY, representing the values of Learning, Intelligence, Behavior, Rationality, Ability, Reading, and Yield of knowledge."
    },
    {
      url: "/images/logo.png",
      title: "Official Brand Logo",
      description: "The official emblem and brand logo of The King's Library, representing our core values of academic excellence, peaceful study environment, and modern facilities."
    }
  ];

  const [selectedIdx, setSelectedIdx] = useState(null);

  // Key listeners for lightbox navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIdx === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIdx]);

  const openLightbox = (idx) => {
    setSelectedIdx(idx);
    document.body.style.overflow = "hidden"; // Prevent background scroll
  };

  const closeLightbox = () => {
    setSelectedIdx(null);
    document.body.style.overflow = "unset";
  };

  const prevImage = (e) => {
    if (e) e.stopPropagation();
    setSelectedIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    setSelectedIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="gallery-page-container">
      <div className="gallery-header-section">
        <h1 className="gallery-page-title">Library Gallery & Activities</h1>
        <div className="title-divider"></div>
        <p className="gallery-page-subtitle">
          Take a look at our state-of-the-art facilities, celebrate our students' achievements,
          and explore the learning activities and quiz events hosted at The King's Library.
        </p>
      </div>

      <div className="gallery-grid-container">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="gallery-item-card"
            onClick={() => openLightbox(idx)}
          >
            <div className="gallery-img-wrapper">
              <img 
                src={img.url} 
                alt={img.title} 
                className={`gallery-grid-img ${img.url.includes("logo.png") ? "gallery-logo-img" : ""}`} 
              />
              <div className="gallery-img-overlay">
                <span className="zoom-icon">🔍</span>
                <span className="view-text">Preview Image</span>
              </div>
            </div>
            <div className="gallery-item-info">
              <h3 className="gallery-item-title">{img.title}</h3>
              <p className="gallery-item-desc">{img.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIdx !== null && (
        <div className="lightbox-modal" onClick={closeLightbox}>
          <button className="lightbox-close-btn" onClick={closeLightbox} aria-label="Close lightbox">
            &times;
          </button>
          
          <button
            className="lightbox-nav-btn prev"
            onClick={prevImage}
            aria-label="Previous image"
          >
            &#10094;
          </button>

          <div className="lightbox-content-wrapper" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[selectedIdx].url}
              alt={images[selectedIdx].title}
              className={`lightbox-main-img ${images[selectedIdx].url.includes("logo.png") ? "lightbox-logo-img" : ""}`}
            />
            <div className="lightbox-caption">
              <span className="lightbox-counter">
                {selectedIdx + 1} / {images.length}
              </span>
              <h3 className="lightbox-title">{images[selectedIdx].title}</h3>
              <p className="lightbox-desc">{images[selectedIdx].description}</p>
            </div>
          </div>

          <button
            className="lightbox-nav-btn next"
            onClick={nextImage}
            aria-label="Next image"
          >
            &#10095;
          </button>
        </div>
      )}
    </div>
  );
}
