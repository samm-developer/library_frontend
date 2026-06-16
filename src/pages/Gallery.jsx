import { useState, useEffect } from "react";

export default function Gallery() {
  const images = [
    {
      url: "/images/library_interior.png",
      title: "Main Study Hall",
      description: "Our spacious, naturally lit study environment equipped with high-speed internet, premium study desks, and power outlets."
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
              <img src={img.url} alt={img.title} className="gallery-grid-img" />
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
              className="lightbox-main-img"
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
