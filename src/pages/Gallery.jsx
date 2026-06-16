export default function Gallery() {
  const images = [
    {
      url: "/images/library_interior.png",
      title: "Main Study Hall",
      description: "Our spacious, naturally lit study environment equipped with high-speed internet, premium study desks, and power outlets."
    },
    {
      url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      title: "Group Collaboration Area",
      description: "Dedicated discussion spaces for students to collaborate on group projects, share study resources, and work together."
    },
    {
      url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
      title: "Seminars & Guest Lectures",
      description: "Regular academic and guest presentations, book readings, and skill enhancement workshops hosted in our halls."
    },
    {
      url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80",
      title: "Reference & Archive Zone",
      description: "An extensive selection of reference catalogs, journals, magazines, and classical literature open for library members."
    }
  ];

  return (
    <div className="gallery-section">
      <div className="hero" style={{ textAlign: "left", padding: "20px 0" }}>
        <h1>Library Gallery & Activities</h1>
        <p className="muted">
          Explore our modern facilities, collaborative spaces, and learning initiatives.
        </p>
      </div>

      <div className="gallery-grid">
        {images.map((item, idx) => (
          <div key={idx} className="gallery-card card">
            <div className="gallery-img-container">
              <img src={item.url} alt={item.title} className="gallery-img" />
            </div>
            <div className="gallery-content">
              <h3>{item.title}</h3>
              <p className="muted">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
