export default function Contact() {
  return (
    <div className="contact-section">
      <div className="hero" style={{ textAlign: "left", padding: "20px 0" }}>
        <h1>Contact Us</h1>
        <p className="muted">
          Get in touch with <strong>The King's Library</strong> (An Ideal Place For Learners). We are here to help you access physical,
          digital, and architectural spaces for learning and research.
        </p>
      </div>

      <div className="hero-cards">
        <div className="card">
          <h3>Contact Details</h3>
          <p style={{ margin: "12px 0" }}>
            <strong>👤 Contact Person:</strong> Rajat Keshari
          </p>
          <p style={{ margin: "12px 0" }}>
            <strong>📞 Phone:</strong>{" "}
            <a href="tel:8382829192" className="contact-link">8382829192</a>, <a href="tel:7355904515" className="contact-link">7355904515</a>, <a href="tel:8707245876" className="contact-link">8707245876</a>
          </p>
          <p style={{ margin: "12px 0" }}>
            <strong>✉️ Email:</strong>{" "}
            <a href="mailto:00kinglibrary@gmail.com" className="contact-link">00kinglibrary@gmail.com</a>
          </p>
          <p style={{ margin: "12px 0" }}>
            <strong>📍 Address:</strong> 20D/1E/13, C.Y. Chintamani Road, George Town, (Near Priti Nursing Home)
          </p>
        </div>

        <div className="card">
          <h3>Library Timings</h3>
          <p style={{ margin: "12px 0" }}>
            <strong>🕒 Open 24 Hours a Day</strong>
          </p>
          <p style={{ margin: "12px 0" }}>
            <strong>📅 Open 7 Days a Week</strong>
          </p>
          <p style={{ margin: "12px 0", color: "var(--muted)", fontSize: "0.88rem", lineHeight: "1.5" }}>
            * The library remains closed only on the last date of every month for maintenance and administrative work.
          </p>
        </div>
      </div>

      <div className="card" style={{ marginTop: "24px", padding: "24px" }}>
        <h3>Location on Google Maps</h3>
        <iframe
          src="https://maps.google.com/maps?q=The%20King's%20Library%20George%20Town%20Prayagraj&t=&z=16&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="350"
          style={{ border: 0, borderRadius: "12px", display: "block" }}
          allowFullScreen=""
          loading="lazy"
          title="The King's Library Location Map"
        ></iframe>
        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <a
            href="https://share.google/etRc2pSyCWktPE2pT"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm"
          >
            Get Directions / View on Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
