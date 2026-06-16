export default function Careers() {
  return (
    <div className="careers-section">
      <div className="hero" style={{ textAlign: "left", padding: "20px 0" }}>
        <h1>Careers at LibraryMS</h1>
        <p className="muted">
          Join our mission to cultivate knowledge and learning. We are looking for talented,
          passionate individuals to help run and maintain our facilities.
        </p>
      </div>

      <div className="card" style={{ marginBottom: "24px" }}>
        <h3>Sweeper / Housekeeping Staff</h3>
        <p className="muted" style={{ fontWeight: 600, color: "var(--primary)" }}>Full-time / Part-time</p>
        
        <div style={{ marginTop: "16px" }}>
          <strong>Responsibilities:</strong>
          <ul style={{ paddingLeft: "20px", marginTop: "8px", color: "var(--muted)", lineHeight: "1.6" }}>
            <li>Clean library floors, tables, chairs and washrooms.</li>
            <li>Maintain cleanliness and hygiene throughout the library.</li>
            <li>Assist in keeping the study environment neat and organized.</li>
          </ul>
        </div>
        
        <div style={{ marginTop: "16px", marginBottom: "16px" }}>
          <strong>Requirements:</strong>
          <ul style={{ paddingLeft: "20px", marginTop: "8px", color: "var(--muted)", lineHeight: "1.6" }}>
            <li>Basic reading and communication skills.</li>
            <li>Honest, punctual and hardworking.</li>
          </ul>
        </div>
        
        <button className="btn btn-sm">Apply Now</button>
      </div>

      <div className="card" style={{ marginBottom: "24px" }}>
        <h3>Computer Operator</h3>
        <p className="muted" style={{ fontWeight: 600, color: "var(--primary)" }}>Full-time</p>
        
        <div style={{ marginTop: "16px" }}>
          <strong>Responsibilities:</strong>
          <ul style={{ paddingLeft: "20px", marginTop: "8px", color: "var(--muted)", lineHeight: "1.6" }}>
            <li>Manage student registrations and records.</li>
            <li>Handle fee entries and attendance records.</li>
            <li>Operate the Library Management System software.</li>
            <li>Assist students with basic technical issues.</li>
          </ul>
        </div>
        
        <div style={{ marginTop: "16px", marginBottom: "16px" }}>
          <strong>Requirements:</strong>
          <ul style={{ paddingLeft: "20px", marginTop: "8px", color: "var(--muted)", lineHeight: "1.6" }}>
            <li>Basic computer knowledge.</li>
            <li>Familiarity with MS Office and internet usage.</li>
            <li>Good communication skills.</li>
          </ul>
        </div>
        
        <button className="btn btn-sm">Apply Now</button>
      </div>
    </div>
  );
}
